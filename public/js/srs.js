/* ═══════════════════════════════════════════════════════════════
   srs.js — Scheduler and progress (pure logic, no DOM)

   Progress is tracked per RULE (e.g. "GEN after negation",
   "prefix wy- = out"), never per sentence: sentences are just
   fresh examples of a rule. Spacing is measured in cards answered
   ("positions"), so it suits grinding sessions of any length.

   Choosing the next card:
     1. pick a rule — due reviews first, plus a steady trickle of
        new rules (balanced across sections) while only a limited
        number of rules are still "learning"; frequent rules and
        rules you keep missing come up more often
     2. pick an item of that rule — least seen first, mixing
        recognition (multiple choice) and production (typing)

   Depends on: PL (core.js + compile.js)
   Exports: SRS (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const SRS = (() => {
  'use strict';

  const KEY = 'polski_v4';
  const FAMILIAR = 3;
  const MASTERED = 6;
  const NEW_RATE = {
    fewer: { learning: 5, p: 0.2 },
    normal: { learning: 10, p: 0.35 },
    more: { learning: 20, p: 0.55 },
  };
  const RESULT_LABEL = { clean: 'correct', hint: 'with hints', choice: 'with options', wrong: 'missed' };

  let st = null;
  let storageOk = true;

  /* ── State ── */

  function fresh() {
    return {
      v: 4,
      pos: 0,
      skills: {},
      items: {},
      off: { modules: {}, groups: {} },
      focus: null,
      newRate: 'normal',
      stats: { total: 0, ok: 0, day: '', dayN: 0, dayOk: 0, run: 0, best: 0 },
      lastRule: null,
      lastLemma: null,
      recent: [],
    };
  }

  function load() {
    st = fresh();
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && saved.v === 4) st = Object.assign(fresh(), saved);
      }
    } catch (e) {
      storageOk = false;
    }
    st.off = Object.assign({ modules: {}, groups: {} }, st.off);
    st.stats = Object.assign(fresh().stats, st.stats);
    if (!NEW_RATE[st.newRate]) st.newRate = 'normal';
    if (st.focus && !st.focus.rules.some(id => PL.RULES[id])) st.focus = null;
    return st;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(st));
      storageOk = true;
    } catch (e) {
      storageOk = false;
    }
  }

  function skill(id) {
    return st.skills[id] || (st.skills[id] = { n: 0, ok: 0, bad: 0, st: 0, ease: 2.3, ivl: 0, due: 0, last: -1 });
  }

  function peek(id) { return st.skills[id] || null; }

  function level(id) {
    const s = st.skills[id];
    if (!s || !s.n) return 0;
    if (s.st >= MASTERED) return 3;
    if (s.st >= FAMILIAR) return 2;
    return 1;
  }

  /* ── Which rules are in play ── */

  function isRuleOn(r) {
    if (!r.count) return false;
    if (st.focus) return st.focus.rules.includes(r.id);
    return !st.off.modules[r.module] && !st.off.groups[r.group];
  }

  function activeRules() {
    return PL.RULE_LIST.filter(isRuleOn);
  }

  function setModule(id, on) {
    st.off.modules[id] = !on;
    if (!on && !activeRules().length) st.off.modules[id] = false;   // never switch everything off
    save();
  }

  function setGroup(id, on) {
    st.off.groups[id] = !on;
    if (!on && !activeRules().length) st.off.groups[id] = false;
    save();
  }

  function setFocus(ruleIds, label) {
    st.focus = ruleIds && ruleIds.length ? { rules: ruleIds, label } : null;
    st.lastRule = null;
    save();
  }

  /* ── Picking ── */

  function weighted(list, weightFn) {
    const ws = list.map(x => Math.max(0, weightFn(x)));
    const total = ws.reduce((a, b) => a + b, 0);
    if (total <= 0) return list[Math.floor(Math.random() * list.length)];
    let r = Math.random() * total;
    for (let i = 0; i < list.length; i++) {
      r -= ws[i];
      if (r <= 0) return list[i];
    }
    return list[list.length - 1];
  }

  function pickFresh(freshRules) {
    // Balance sections: favour the module where the smallest share of rules has been started.
    const byMod = {};
    freshRules.forEach(r => { (byMod[r.module] = byMod[r.module] || []).push(r); });
    const mods = Object.keys(byMod);
    const mod = weighted(mods, m => {
      const all = PL.RULE_LIST.filter(r => r.module === m && r.count);
      const started = all.filter(r => skill(r.id).n).length;
      return 1.15 - started / all.length;
    });
    // Within a module: roughly in teaching order, but not strictly — any of the next few.
    const pool = byMod[mod].slice().sort((a, b) => a.ord - b.ord).slice(0, 3);
    return weighted(pool, r => r.f);
  }

  function pickRule() {
    const act = activeRules();
    if (!act.length) return null;
    if (act.length === 1) return act[0];
    const pos = st.pos;
    const seen = act.filter(r => skill(r.id).n);
    const freshRules = act.filter(r => !skill(r.id).n);
    const notLast = r => r.id !== st.lastRule;
    const learning = seen.filter(r => level(r.id) < 2).length;
    const due = seen.filter(r => skill(r.id).due <= pos && notLast(r));
    const cfg = NEW_RATE[st.newRate];

    const wantNew = freshRules.length && learning < cfg.learning && (!due.length || Math.random() < cfg.p);
    if (wantNew) return pickFresh(freshRules);
    if (due.length) {
      return weighted(due, r => {
        const s = skill(r.id);
        const overdue = Math.min(pos - s.due, 40);
        const weak = 1 + 2 * s.bad / (s.n + 2);
        return (1 + overdue / 6) * weak * (0.55 + 0.15 * r.f);
      });
    }
    if (freshRules.length && learning < cfg.learning * 1.5) return pickFresh(freshRules);
    // Nothing due: take one of the soonest-due rules, favouring weak ones.
    const pool = seen.filter(notLast).sort((a, b) => skill(a.id).due - skill(b.id).due).slice(0, 6);
    if (!pool.length) return freshRules.length ? pickFresh(freshRules) : act[0];
    return weighted(pool, r => {
      const s = skill(r.id);
      return (1 + 2 * s.bad / (s.n + 2)) * (0.55 + 0.15 * r.f);
    });
  }

  function pickItem(rule) {
    const list = PL.BY_RULE[rule.id] || [];
    if (!list.length) return null;
    const lvl = level(rule.id);
    const recentIds = new Set(st.recent);
    return weighted(list, it => {
      const seen = st.items[it.id];
      const n = seen ? seen.n : 0;
      let w = 1 / (1 + 1.5 * n);
      if (seen && seen.bad) w *= 1.3;                         // revisit sentences you missed
      if (recentIds.has(it.id)) w *= 0.05;
      if (it.lemma && it.lemma === st.lastLemma) w *= 0.5;
      if (it.recog) w *= lvl <= 1 ? 1.25 : 0.6;               // recognise first, produce later
      else w *= lvl <= 1 ? 0.9 : 1.3;
      if (it.type === 'identify' || it.type === 'lemma') w *= 0.7;
      return w;
    });
  }

  function next() {
    const rule = pickRule();
    if (!rule) return null;
    const item = pickItem(rule);
    if (!item) return null;
    return { rule, item, level: level(rule.id), isNew: !skill(rule.id).n };
  }

  /* ── Recording an answer ──
     result: 'clean'  — right first time, no hints
             'hint'   — right, but after the rule or table hint
             'choice' — right, but picked from options
             'wrong'  — a wrong attempt, or revealed            */

  function record(item, result) {
    const s = skill(item.rule);
    const pos = st.pos;
    s.n++;
    s.last = pos;
    if (result === 'clean') {
      s.ok++;
      s.st += 1;
      s.ease = Math.min(3, s.ease + 0.1);
      s.ivl = s.ivl < 3 ? 4 : s.ivl * s.ease;
    } else if (result === 'hint') {
      s.ok++;
      s.st += 0.5;
      s.ivl = Math.max(3, s.ivl * 1.3);
    } else if (result === 'choice') {
      s.ok++;
      s.ivl = 3;
    } else {
      s.bad++;
      s.st = 0;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.ivl = 2;
    }
    s.ivl = Math.min(s.ivl, 500);
    const jitter = 0.85 + Math.random() * 0.3;
    s.due = pos + Math.max(2, Math.round(s.ivl * jitter));

    const is = st.items[item.id] || (st.items[item.id] = { n: 0, bad: 0, last: -1 });
    is.n++;
    is.last = pos;
    if (result === 'wrong') is.bad++;

    st.pos++;
    st.lastRule = item.rule;
    st.lastLemma = item.lemma || null;
    st.recent = st.recent.concat(item.id).slice(-25);

    const today = new Date().toISOString().slice(0, 10);
    const S = st.stats;
    if (S.day !== today) { S.day = today; S.dayN = 0; S.dayOk = 0; }
    S.total++;
    S.dayN++;
    if (result !== 'wrong') { S.ok++; S.dayOk++; }
    S.run = result === 'clean' ? S.run + 1 : 0;
    S.best = Math.max(S.best, S.run);
    save();
  }

  /* ── Summaries ── */

  function counts(ruleIds) {
    const c = { total: 0, started: 0, familiar: 0, mastered: 0 };
    ruleIds.forEach(id => {
      if (!PL.RULES[id] || !PL.RULES[id].count) return;
      c.total++;
      const l = level(id);
      if (l >= 1) c.started++;
      if (l >= 2) c.familiar++;
      if (l >= 3) c.mastered++;
    });
    return c;
  }

  function dueCount() {
    return activeRules().filter(r => { const s = peek(r.id); return s && s.n && s.due <= st.pos; }).length;
  }

  /* ── Export / import / reset ── */

  function exportJSON() {
    return JSON.stringify(Object.assign({ exported: new Date().toISOString() }, st), null, 1);
  }

  function importJSON(text) {
    const data = JSON.parse(text);
    if (!data || data.v !== 4 || typeof data.skills !== 'object') throw new Error('Not a Polski progress file');
    delete data.exported;
    st = Object.assign(fresh(), data);
    save();
    load();
  }

  function reset() {
    st = fresh();
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    save();
  }

  return {
    get state() { return st; },
    get storageOk() { return storageOk; },
    RESULT_LABEL, NEW_RATE,
    load, save, skill, peek, level, isRuleOn, activeRules, setModule, setGroup, setFocus,
    next, pickItem, record, counts, dueCount, exportJSON, importJSON, reset,
    setNewRate(r) { if (NEW_RATE[r]) { st.newRate = r; save(); } },
  };
})();
