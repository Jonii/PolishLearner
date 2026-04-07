/* ═══════════════════════════════════════════════════════════════
   srs.js — Spaced repetition engine (pure logic, no DOM)

   Skills are grammar rules (e.g. "GEN:negation"), not word×case.
   Words are independently unlocked content pools.

   Exports: SRS (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const SRS = (() => {
  const STORAGE_KEY = 'polski_srs_v3';
  const FAMILIAR_STREAK = 3;
  const MASTERED_STREAK = 6;

  let state = null;

  /* ── Helpers ── */

  function computeLevel(streak) {
    if (streak >= MASTERED_STREAK) return 3;
    if (streak >= FAMILIAR_STREAK) return 2;
    if (streak >= 1) return 1;
    return 0;
  }

  function defaultSkillState(skillId) {
    return {
      skillId,
      correct: 0, wrong: 0, streak: 0,
      lastSeen: -999, interval: 0, ease: 2.5, level: 0,
      hintsUsed: 0, f1Used: 0, f2Used: 0,
    };
  }

  /* ── State management ── */

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        state = JSON.parse(saved);
        syncState();
        return;
      } catch (e) { /* fall through */ }
    }
    // Fresh state: first word enabled, all skills discovered
    state = {
      skills: {},
      enabledWords: [WORDS[0].id],
      sessionPosition: 0,
      totalReviewed: 0,
      sessionReviewed: 0,
      recentSentences: {},
      streak: 0,
    };
    ensureSkills();
    save();
  }

  function ensureSkills() {
    // Discover all skill IDs from enabled words' sentences
    const skillIds = new Set();
    WORDS.filter(w => state.enabledWords.includes(w.id))
      .forEach(w => w.sentences.forEach(s => skillIds.add(s.skill)));
    skillIds.forEach(id => {
      if (!state.skills[id]) state.skills[id] = defaultSkillState(id);
      // Backfill
      const sk = state.skills[id];
      if (sk.hintsUsed === undefined) { sk.hintsUsed = 0; sk.f1Used = 0; sk.f2Used = 0; }
    });
  }

  function syncState() {
    if (!state.enabledWords) state.enabledWords = state.unlockedWords || [WORDS[0].id];
    if (!state.recentSentences) state.recentSentences = {};
    if (!state.streak) state.streak = 0;
    if (!state.sessionReviewed) state.sessionReviewed = 0;
    ensureSkills();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  /* ── Word management ── */

  function enableWord(wordId) {
    if (state.enabledWords.includes(wordId)) return;
    state.enabledWords.push(wordId);
    ensureSkills();
    save();
  }

  function disableWord(wordId) {
    state.enabledWords = state.enabledWords.filter(id => id !== wordId);
    save();
  }

  function isWordEnabled(wordId) {
    return state.enabledWords.includes(wordId);
  }

  /* ── Sentence pool (respects enabled words) ── */

  function getSentencesForSkill(skillId) {
    const pool = [];
    WORDS.filter(w => state.enabledWords.includes(w.id))
      .forEach(w => {
        w.sentences.forEach((s, i) => {
          if (s.skill === skillId) pool.push({ sentence: s, wordId: w.id, index: i });
        });
      });
    return pool;
  }

  function getActiveSkillIds() {
    // Only skills that have at least one sentence from enabled words
    const ids = new Set();
    WORDS.filter(w => state.enabledWords.includes(w.id))
      .forEach(w => w.sentences.forEach(s => ids.add(s.skill)));
    return [...ids];
  }

  /* ── Scheduling ── */

  function getNextSkill() {
    const activeIds = getActiveSkillIds();
    const entries = activeIds
      .map(id => state.skills[id])
      .filter(Boolean);

    if (!entries.length) return null;

    entries.sort((a, b) => {
      const pa = a.lastSeen + a.interval;
      const pb = b.lastSeen + b.interval;
      const diff = pa - pb;
      return Math.abs(diff) < 0.5 ? Math.random() - 0.5 : diff;
    });
    return entries[0];
  }

  function pickSentence(skill) {
    const pool = getSentencesForSkill(skill.skillId);
    if (!pool.length) return null;

    const recentKey = skill.skillId;
    const recent = state.recentSentences[recentKey] || [];

    // Prefer sentences not recently shown (by their pool index)
    const unseen = pool.filter((_, i) => !recent.includes(i));
    const choices = unseen.length > 0 ? unseen : pool;
    const picked = choices[Math.floor(Math.random() * choices.length)];
    const pickedIdx = pool.indexOf(picked);

    state.recentSentences[recentKey] = [...recent, pickedIdx].slice(-3);
    return picked;
  }

  function getDueCount() {
    const activeIds = getActiveSkillIds();
    return activeIds.filter(id => {
      const s = state.skills[id];
      return s && (s.lastSeen + s.interval) <= state.sessionPosition;
    }).length;
  }

  /* ── Recording ── */

  function recordCorrect(skill, usedF1, usedF2) {
    if (usedF1 || usedF2) {
      skill.hintsUsed++;
      if (usedF1) skill.f1Used++;
      if (usedF2) skill.f2Used++;
      if (usedF2) {
        skill.correct++;
        skill.interval = Math.max(1, skill.interval * 1.2);
        skill.lastSeen = state.sessionPosition;
      } else {
        skill.streak++;
        skill.correct++;
        skill.interval = Math.max(1, skill.interval * (skill.ease * 0.6));
        skill.ease = Math.min(3.0, skill.ease + 0.05);
        skill.lastSeen = state.sessionPosition;
      }
    } else {
      skill.streak++;
      skill.correct++;
      skill.interval = Math.max(1, skill.interval * skill.ease);
      skill.ease = Math.min(3.0, skill.ease + 0.1);
      skill.lastSeen = state.sessionPosition;
    }
    skill.level = computeLevel(skill.streak);
    state.sessionPosition++;
    state.totalReviewed++;
    state.sessionReviewed++;
    if (!usedF2) state.streak++; else state.streak = 0;
    save();
  }

  function recordWrong(skill) {
    skill.streak = 0;
    skill.wrong++;
    skill.interval = 0;
    skill.ease = Math.max(1.3, skill.ease - 0.2);
    skill.lastSeen = state.sessionPosition;
    skill.level = 0;
    state.streak = 0;
    save();
  }

  /* ── Mastery queries ── */

  function getSkillMastery(skillId) {
    const s = state.skills[skillId];
    return s ? s.level : 0;
  }

  function getCaseMastery(caseName) {
    const activeIds = getActiveSkillIds();
    const caseSkills = activeIds.filter(id => {
      const rule = SKILL_RULES[id];
      return rule && rule.case === caseName;
    });
    if (!caseSkills.length) return 0;
    const familiar = caseSkills.filter(id => {
      const s = state.skills[id];
      return s && s.level >= 2;
    }).length;
    return familiar / caseSkills.length;
  }

  /* ── Session control ── */

  function continueSession() {
    const activeIds = getActiveSkillIds();
    const entries = activeIds.map(id => state.skills[id]).filter(Boolean);
    if (!entries.length) return;
    state.sessionPosition = Math.min(...entries.map(s => s.lastSeen + s.interval));
    save();
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    get state() { return state; },
    init,
    save,
    enableWord,
    disableWord,
    isWordEnabled,
    getActiveSkillIds,
    getSentencesForSkill,
    getNextSkill,
    pickSentence,
    recordCorrect,
    recordWrong,
    getSkillMastery,
    getCaseMastery,
    getDueCount,
    computeLevel,
    continueSession,
    reset,
  };
})();
