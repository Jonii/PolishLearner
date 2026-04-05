/* ═══════════════════════════════════════════════════════════════
   srs.js — Spaced repetition engine (pure logic, no DOM)
   
   Depends on: WORDS from data.js (global)
   
   Exports (all global):
     SRS.init()                           → loads/creates state
     SRS.save()                           → persists to localStorage
     SRS.state                            → current state object
     SRS.getNextSkill()                   → SkillState | null
     SRS.pickSentence(skill)              → Sentence | null
     SRS.recordCorrect(skill, f1, f2)     → void (mutates state)
     SRS.recordWrong(skill)               → void (mutates state)
     SRS.getWordMastery(wordId)           → number (0–1)
     SRS.getDueCount()                    → number
     SRS.checkUnlocks()                   → string|null (new wordId)
     SRS.getSkillsForWord(wordId)         → string[]
     SRS.skillKey(wordId, skill)          → string
     SRS.computeLevel(streak)             → 0|1|2|3
     SRS.continueSession()               → void
     SRS.reset()                          → void
   ═══════════════════════════════════════════════════════════════ */

const SRS = (() => {
  const STORAGE_KEY = 'polski_srs_v2';
  const MASTERY_THRESHOLD = 0.8;
  const FAMILIAR_STREAK = 3;
  const MASTERED_STREAK = 6;

  let state = null;

  // ── Helpers ──

  function skillKey(wordId, skill) {
    return `${wordId}__${skill}`;
  }

  function computeLevel(streak) {
    if (streak >= MASTERED_STREAK) return 3;
    if (streak >= FAMILIAR_STREAK) return 2;
    if (streak >= 1) return 1;
    return 0;
  }

  function defaultSkill(wordId, skill) {
    return {
      wordId, skill,
      correct: 0, wrong: 0, streak: 0,
      lastSeen: -999, interval: 0, ease: 2.5, level: 0,
      hintsUsed: 0, f1Used: 0, f2Used: 0,
    };
  }

  function getSkillsForWord(wordId) {
    const w = WORDS.find(x => x.id === wordId);
    if (!w) return [];
    const skills = new Set();
    w.sentences.forEach(s => skills.add(s.skill));
    return [...skills];
  }

  // ── State management ──

  function addSkillsForWord(wordId) {
    getSkillsForWord(wordId).forEach(s => {
      const k = skillKey(wordId, s);
      if (!state.skills[k]) {
        state.skills[k] = defaultSkill(wordId, s);
      }
      // Backfill hint fields for old saves
      const sk = state.skills[k];
      if (sk.hintsUsed === undefined) {
        sk.hintsUsed = 0; sk.f1Used = 0; sk.f2Used = 0;
      }
    });
  }

  function syncState() {
    state.unlockedWords.forEach(wid => addSkillsForWord(wid));
    if (!state.recentSentences) state.recentSentences = {};
    if (!state.streak) state.streak = 0;
    if (!state.sessionReviewed) state.sessionReviewed = 0;
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        state = JSON.parse(saved);
        syncState();
        return;
      } catch (e) { /* fall through */ }
    }
    state = {
      skills: {},
      unlockedWords: [WORDS[0].id],
      sessionPosition: 0,
      totalReviewed: 0,
      sessionReviewed: 0,
      recentSentences: {},
      streak: 0,
    };
    addSkillsForWord(WORDS[0].id);
    save();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ── Scheduling ──

  function getNextSkill() {
    const entries = Object.values(state.skills)
      .filter(s => state.unlockedWords.includes(s.wordId));
    entries.sort((a, b) => {
      const pa = a.lastSeen + a.interval;
      const pb = b.lastSeen + b.interval;
      const diff = pa - pb;
      return Math.abs(diff) < 0.5 ? Math.random() - 0.5 : diff;
    });
    return entries[0] || null;
  }

  function pickSentence(skill) {
    const w = WORDS.find(x => x.id === skill.wordId);
    if (!w) return null;
    const pool = w.sentences.filter(s => s.skill === skill.skill);
    if (!pool.length) return null;

    const k = skillKey(skill.wordId, skill.skill);
    const recent = state.recentSentences[k] || [];
    const unseen = pool.filter((_, i) => !recent.includes(i));
    const choices = unseen.length > 0 ? unseen : pool;
    const picked = choices[Math.floor(Math.random() * choices.length)];

    state.recentSentences[k] = [...recent, pool.indexOf(picked)].slice(-3);
    return picked;
  }

  function getDueCount() {
    return Object.values(state.skills)
      .filter(s =>
        state.unlockedWords.includes(s.wordId) &&
        (s.lastSeen + s.interval) <= state.sessionPosition
      ).length;
  }

  // ── Recording answers ──

  function recordCorrect(skill, usedF1, usedF2) {
    if (usedF1 || usedF2) {
      skill.hintsUsed++;
      if (usedF1) skill.f1Used++;
      if (usedF2) skill.f2Used++;

      if (usedF2) {
        // F2 used (case revealed) — no streak advance
        skill.correct++;
        skill.interval = Math.max(1, skill.interval * 1.2);
        skill.lastSeen = state.sessionPosition;
      } else {
        // F1 only (table shown) — half credit
        skill.streak++;
        skill.correct++;
        skill.interval = Math.max(1, skill.interval * (skill.ease * 0.6));
        skill.ease = Math.min(3.0, skill.ease + 0.05);
        skill.lastSeen = state.sessionPosition;
      }
    } else {
      // No hints — full credit
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

  // ── Mastery & unlocking ──

  function getWordMastery(wordId) {
    const skills = getSkillsForWord(wordId);
    if (!skills.length) return 0;
    const familiar = skills.filter(s => {
      const x = state.skills[skillKey(wordId, s)];
      return x && x.level >= 2;
    }).length;
    return familiar / skills.length;
  }

  function checkUnlocks() {
    const order = WORDS.map(w => w.id);
    const last = state.unlockedWords[state.unlockedWords.length - 1];
    const idx = order.indexOf(last);
    if (idx < 0 || idx >= order.length - 1) return null;

    if (getWordMastery(last) >= MASTERY_THRESHOLD) {
      const nextId = order[idx + 1];
      state.unlockedWords.push(nextId);
      addSkillsForWord(nextId);
      save();
      return nextId;
    }
    return null;
  }

  // ── Session control ──

  function continueSession() {
    const all = Object.values(state.skills)
      .filter(s => state.unlockedWords.includes(s.wordId));
    if (!all.length) return;
    state.sessionPosition = Math.min(...all.map(s => s.lastSeen + s.interval));
    save();
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // ── Public API ──

  return {
    get state() { return state; },
    init,
    save,
    getNextSkill,
    pickSentence,
    recordCorrect,
    recordWrong,
    getWordMastery,
    getDueCount,
    checkUnlocks,
    getSkillsForWord,
    skillKey,
    computeLevel,
    continueSession,
    reset,
    MASTERY_THRESHOLD,
  };
})();
