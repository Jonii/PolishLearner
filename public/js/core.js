/* ═══════════════════════════════════════════════════════════════
   core.js — Content registry and Polish morphology helpers

   Pure logic, no DOM. Loaded first. The files in data/ register
   content through the functions exported here; compile.js then
   turns everything into practice items (PL.compile()).

   Content model (see CONTENT.md for the authoring guide):
     module  — a practice section (Cases, Verbs, Prefixes, …)
     group   — a heading inside a module (Genitive, Past tense, …)
     rule    — the unit of progress: one grammar / word-building rule
     lexeme  — a dictionary word with its full paradigm
     item    — one exercise; always practises exactly one rule
     nest    — a word family around one root (podpisać, przepis, …)
     phrase  — a small word / everyday expression

   Exports: PL (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const PL = (() => {
  'use strict';

  /* ── Grammar vocabulary ── */

  const CASES = ['NOM', 'GEN', 'DAT', 'ACC', 'INS', 'LOC', 'VOC'];
  const CASE_NAME = {
    NOM: 'nominative', GEN: 'genitive', DAT: 'dative', ACC: 'accusative',
    INS: 'instrumental', LOC: 'locative', VOC: 'vocative',
  };
  const CASE_PL = {
    NOM: 'mianownik', GEN: 'dopełniacz', DAT: 'celownik', ACC: 'biernik',
    INS: 'narzędnik', LOC: 'miejscownik', VOC: 'wołacz',
  };
  const CASE_Q = {
    NOM: 'kto? co?', GEN: 'kogo? czego?', DAT: 'komu? czemu?', ACC: 'kogo? co?',
    INS: '(z) kim? (z) czym?', LOC: 'o kim? o czym?', VOC: 'o!',
  };
  const PERSONS = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
  const PERSON_EN = {
    '1sg': 'I', '2sg': 'you', '3sg': 'he / she / it',
    '1pl': 'we', '2pl': 'you (pl.)', '3pl': 'they',
  };
  const PERSON_PL = { '1sg': 'ja', '2sg': 'ty', '3sg': 'on / ona / ono', '1pl': 'my', '2pl': 'wy', '3pl': 'oni / one' };
  const GENDER_EN = {
    m1: 'masc. personal', m2: 'masc. animate', m3: 'masc. inanimate',
    f: 'feminine', n: 'neuter', pt: 'plural only',
  };
  // Adjective cell keys: gender/number slot + case.
  //   m = masc. sg, f = fem. sg, n = neut. sg, v = virile pl (groups with a man), p = non-virile pl
  const ADJ_SLOTS = ['m', 'f', 'n', 'v', 'p'];
  const ADJ_SLOT_EN = { m: 'masc. sg.', f: 'fem. sg.', n: 'neut. sg.', v: 'pl. virile', p: 'pl. non-virile' };

  /* ── Registries ── */

  const modules = [];
  const moduleById = {};
  const groups = [];
  const groupById = {};
  const rules = {};
  const ruleList = [];
  const lex = {};
  const pendingDerived = [];
  const patterns = {};
  const rawItems = [];
  const nests = [];
  const phrases = [];
  const affix = {};          // 'pod-' → 'under; up to',  '-arnia' → 'place where … is sold'
  const warnings = [];

  function warn(msg) { warnings.push(msg); }

  /* ── Text helpers ── */

  const DIACRITICS = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };

  function stripDiacritics(s) {
    return s.replace(/[ąćęłńóśźż]/g, ch => DIACRITICS[ch]);
  }

  // Normalise a typed or stored answer for comparison:
  // lowercase, unify quotes/dashes, drop punctuation, collapse spaces.
  function norm(s) {
    return String(s)
      .normalize('NFC')
      .toLocaleLowerCase('pl')
      .replace(/[‘’`´]/g, "'")
      .replace(/[.,!?;:…"„”“«»()\[\]—–]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Small stable hash (FNV-1a) → base36, used for item ids.
  function hash(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Tiny markup for explanations: *polish word* → italic, **x** → bold,
  // line breaks kept. Everything else is escaped.
  function md(s) {
    if (!s) return '';
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="pl">$1</em>')
      .replace(/\n/g, '<br>');
  }

  /* ── Modules, groups, rules ── */

  // PL.module('cases', { t: 'Cases', pl: 'Przypadki', blurb: '…' })
  function module(id, def) {
    if (moduleById[id]) { warn(`module "${id}" registered twice`); return; }
    const m = { id, t: def.t, pl: def.pl || '', blurb: def.blurb || '', intro: def.intro || '' };
    modules.push(m);
    moduleById[id] = m;
  }

  // PL.groups('cases', [{ id: 'GEN', t: 'Genitive', pl: 'dopełniacz', intro: '…' }, …])
  function groupList(moduleId, list) {
    list.forEach(g => {
      const id = `${moduleId}:${g.id}`;
      if (groupById[id]) { warn(`group "${id}" registered twice`); return; }
      const grp = { id, key: g.id, module: moduleId, t: g.t, pl: g.pl || '', intro: g.intro || '', pattern: g.pattern || null };
      groups.push(grp);
      groupById[id] = grp;
    });
  }

  // PL.rules('cases', 'GEN', { 'GEN:negation': { t, x, f, ex } , … })
  //   t  = short title, x = explanation (mini-markup), f = frequency 1..3,
  //   ex = optional pattern line shown in tables, e.g. "nie mam *czasu*"
  function ruleSet(moduleId, groupKey, defs) {
    const groupId = `${moduleId}:${groupKey}`;
    if (!groupById[groupId]) warn(`rules: unknown group "${groupId}"`);
    Object.entries(defs).forEach(([id, d]) => {
      if (rules[id]) { warn(`rule "${id}" registered twice`); return; }
      const r = {
        id, module: moduleId, group: groupId,
        t: d.t, x: d.x || '', f: d.f || 2, ex: d.ex || '',
        kind: d.kind || null,     // e.g. the case a case-rule belongs to
        pattern: d.pattern || null,
        // teaching order inside the module: o if given, else declaration order
        ord: d.o != null ? d.o : 100 + ruleList.length,
      };
      rules[id] = r;
      ruleList.push(r);
    });
  }

  /* ── Lexicon ── */

  function splitTokens(s, n, what) {
    const toks = String(s).trim().split(/\s+/);
    if (n && toks.length !== n) warn(`${what}: expected ${n} forms, got ${toks.length} ("${s}")`);
    return toks.map(t => (t === '-' ? [] : t.split('/')));
  }

  function addLex(lemma, L) {
    if (lex[lemma]) { warn(`lexeme "${lemma}" registered twice`); return; }
    L.lemma = lemma;
    lex[lemma] = L;
  }

  // PL.noun('dom', { g: 'm3', m: 'house, home', sg: '7 forms', pl: '7 forms', cls: 'm-hard' })
  // Forms in case order NOM GEN DAT ACC INS LOC VOC; variants with "/", missing with "-".
  function noun(lemma, d) {
    const forms = {};
    if (d.sg) splitTokens(d.sg, 7, `noun ${lemma} sg`).forEach((f, i) => { if (f.length) forms[`sg.${CASES[i]}`] = f; });
    if (d.pl) splitTokens(d.pl, 7, `noun ${lemma} pl`).forEach((f, i) => { if (f.length) forms[`pl.${CASES[i]}`] = f; });
    addLex(lemma, { pos: 'noun', g: d.g, m: d.m, cls: d.cls || null, note: d.note || '', forms, hidden: !!d.hidden });
  }

  // Pronouns use the same layout as nouns (sg = the only row).
  function pronoun(lemma, d) {
    const forms = {};
    splitTokens(d.forms, 7, `pronoun ${lemma}`).forEach((f, i) => { if (f.length) forms[CASES[i]] = f; });
    addLex(lemma, { pos: 'pron', m: d.m, note: d.note || '', forms, hidden: !!d.hidden });
  }

  // Adjective paradigm generated from the masc. nominative and the virile plural.
  //   hard:  nowy  → nowego, nowemu, nowym; nowa, nowej, nową; nowe; nowych, nowymi
  //   k/g:   polski→ polskiego, polskiemu, polskim; polska, polskiej, polską; polskie
  //   soft:  tani  → taniego …; tania, taniej, tanią; tanie
  function adjForms(lemma, vir) {
    let base, y, e, a;
    if (lemma.endsWith('y')) { base = lemma.slice(0, -1); y = 'y'; e = 'e'; a = 'a'; }
    else if (/[kg]i$/.test(lemma)) { base = lemma.slice(0, -1); y = 'i'; e = 'ie'; a = 'a'; }
    else if (lemma.endsWith('i')) { base = lemma.slice(0, -1); y = 'i'; e = 'ie'; a = 'ia'; }
    else { warn(`adjective "${lemma}" must end in -y or -i`); return {}; }
    const ego = e + 'go', emu = e + 'mu', ej = e + 'j';
    const ych = y + 'ch', ym = y + 'm', ymi = y + 'mi';
    const aa = a.slice(0, -1) + 'ą';   // a → ą, ia → ią
    const f = {};
    const put = (slot, cs, form) => { f[`${slot}.${cs}`] = [form]; };
    put('m', 'NOM', lemma);      put('m', 'GEN', base + ego);   put('m', 'DAT', base + emu);
    put('m', 'ACC', lemma);      put('m', 'INS', base + ym);    put('m', 'LOC', base + ym);
    f['m.ACC'] = [lemma, base + ego];  // inanimate = NOM, animate = GEN
    put('f', 'NOM', base + a);   put('f', 'GEN', base + ej);    put('f', 'DAT', base + ej);
    put('f', 'ACC', base + aa);  put('f', 'INS', base + aa);    put('f', 'LOC', base + ej);
    put('n', 'NOM', base + e);   put('n', 'GEN', base + ego);   put('n', 'DAT', base + emu);
    put('n', 'ACC', base + e);   put('n', 'INS', base + ym);    put('n', 'LOC', base + ym);
    put('v', 'NOM', vir);        put('v', 'GEN', base + ych);   put('v', 'DAT', base + ym);
    put('v', 'ACC', base + ych); put('v', 'INS', base + ymi);   put('v', 'LOC', base + ych);
    put('p', 'NOM', base + e);   put('p', 'GEN', base + ych);   put('p', 'DAT', base + ym);
    put('p', 'ACC', base + e);   put('p', 'INS', base + ymi);   put('p', 'LOC', base + ych);
    return f;
  }

  // PL.adj('dobry', { m: 'good', vir: 'dobrzy', comp: 'lepszy', adv: 'dobrze' })
  // or with an explicit table for irregular words (ten, mój): { forms: { 'm.NOM': 'ten', … } }
  function adj(lemma, d) {
    let forms;
    if (d.forms) {
      forms = {};
      Object.entries(d.forms).forEach(([k, v]) => { forms[k] = String(v).split('/'); });
    } else {
      if (!d.vir) warn(`adjective "${lemma}" needs vir (virile plural)`);
      forms = adjForms(lemma, d.vir || lemma);
    }
    addLex(lemma, {
      pos: 'adj', m: d.m, comp: d.comp || null, sup: d.comp ? 'naj' + d.comp : null,
      adv: d.adv || null, note: d.note || '', forms, hidden: !!d.hidden,
    });
    if (d.comp && !lex[d.comp]) {
      // comparative: -szy → -si (lepszy → lepsi, ładniejszy → ładniejsi)
      const cvir = d.comp.replace(/szy$/, 'si');
      addLex(d.comp, { pos: 'adj', m: `${d.m} (comparative)`, compOf: lemma, forms: adjForms(d.comp, cvir), hidden: true });
    }
  }

  // Verb forms from compact strings.
  //   pres:  'czytam czytasz czyta czytamy czytacie czytają' (the future for perfective verbs)
  //   past:  'czytał czytała czytało czytali czytały'  (3rd person m f n virile non-virile)
  //   past1: masc. stem for 1st/2nd sg if it differs (mógł → mogł-em, niósł → niosł-em)
  //   imp:   'czytaj czytajmy czytajcie'
  //   fut:   only for być: 'będę będziesz …'
  function verbForms(lemma, d) {
    const f = { inf: [lemma] };
    if (d.pres) splitTokens(d.pres, 6, `verb ${lemma} pres`).forEach((x, i) => { if (x.length) f[`pres.${PERSONS[i]}`] = x; });
    if (d.fut) splitTokens(d.fut, 6, `verb ${lemma} fut`).forEach((x, i) => { if (x.length) f[`fut.${PERSONS[i]}`] = x; });
    if (d.past) {
      const [m, fe, n, v, p] = splitTokens(d.past, 5, `verb ${lemma} past`).map(x => x[0]);
      const m1 = d.past1 || m;
      Object.assign(f, {
        'past.1sg.m': [m1 + 'em'], 'past.2sg.m': [m1 + 'eś'], 'past.3sg.m': [m],
        'past.1sg.f': [fe + 'm'], 'past.2sg.f': [fe + 'ś'], 'past.3sg.f': [fe],
        'past.3sg.n': [n],
        'past.1pl.v': [v + 'śmy'], 'past.2pl.v': [v + 'ście'], 'past.3pl.v': [v],
        'past.1pl.p': [p + 'śmy'], 'past.2pl.p': [p + 'ście'], 'past.3pl.p': [p],
        'cond.1sg.m': [m + 'bym'], 'cond.2sg.m': [m + 'byś'], 'cond.3sg.m': [m + 'by'],
        'cond.1sg.f': [fe + 'bym'], 'cond.2sg.f': [fe + 'byś'], 'cond.3sg.f': [fe + 'by'],
        'cond.3sg.n': [n + 'by'],
        'cond.1pl.v': [v + 'byśmy'], 'cond.2pl.v': [v + 'byście'], 'cond.3pl.v': [v + 'by'],
        'cond.1pl.p': [p + 'byśmy'], 'cond.2pl.p': [p + 'byście'], 'cond.3pl.p': [p + 'by'],
      });
    }
    if (d.imp) {
      const [s2, p1, p2] = splitTokens(d.imp, 3, `verb ${lemma} imp`);
      if (s2.length) f['imp.2sg'] = s2;
      if (p1.length) f['imp.1pl'] = p1;
      if (p2.length) f['imp.2pl'] = p2;
    }
    // optional derived forms
    if (d.vn) f.vn = d.vn.split('/');        // verbal noun: czytanie
    if (d.pa) f.pa = d.pa.split('/');        // active participle: czytający
    if (d.pp) f.pp = d.pp.split('/');        // passive participle: czytany
    if (d.ap) f.ap = d.ap.split('/');        // adverbial participle: czytając
    return f;
  }

  // PL.verb('czytać', { m: 'to read', asp: 'impf', pair: 'przeczytać', cls: 'am', pres, past, imp })
  // Prefixed verbs can be derived:  { from: ['prze', 'czytać'], m: 'to read (through)', asp: 'pf' }
  //   'ze/z' = long prefix (infinitive, past) / short prefix (present, imperative): zebrać, zbiorę
  function verb(lemma, d) {
    const L = {
      pos: 'verb', m: d.m, asp: d.asp || null, pair: d.pair || null, cls: d.cls || null,
      refl: !!d.refl, note: d.note || '', hidden: !!d.hidden, from: d.from || null,
      base: d.base || null,      // for irregular prefixed verbs given in full (wyjść ← iść)
    };
    if (d.from) {
      L.forms = null;
      L.def = d;
      pendingDerived.push(lemma);
      if (!L.cls) L.inheritCls = true;
    } else {
      L.forms = verbForms(lemma, d);
    }
    addLex(lemma, L);
  }

  function resolveDerived(lemma, depth) {
    const L = lex[lemma];
    if (!L || L.forms) return L;
    if (depth > 5) { warn(`derived verb loop at "${lemma}"`); return L; }
    const [pfx, baseLemma] = L.from;
    const base = resolveDerived(baseLemma, (depth || 0) + 1);
    if (!base || !base.forms) { warn(`verb "${lemma}" derives from unknown "${baseLemma}"`); L.forms = { inf: [lemma] }; return L; }
    const [long, short] = pfx.includes('/') ? pfx.split('/') : [pfx, pfx];
    const f = {};
    Object.entries(base.forms).forEach(([k, vals]) => {
      // perfective verbs have no present participles (czytający, czytając)
      if ((k === 'pa' || k === 'ap') && L.asp === 'pf') return;
      const p = (k.startsWith('pres.') || k.startsWith('imp.')) ? short : long;
      f[k] = vals.map(v => p + v);
    });
    f.inf = [lemma];
    // explicit overrides in the derived definition win
    const own = verbForms(lemma, L.def);
    Object.entries(own).forEach(([k, v]) => { if (k !== 'inf') f[k] = v; });
    if (`${long}${baseLemma}` !== lemma) warn(`derived verb "${lemma}" ≠ "${long}" + "${baseLemma}"`);
    L.forms = f;
    if (L.inheritCls) L.cls = base.cls;
    L.base = baseLemma;
    return L;
  }

  // Declension / conjugation pattern tables used by the "table" hint and the reference.
  // PL.pattern('f-a', { t, kind: 'noun'|'verb'|'adj', rows: [[label, ending], …], models: ['kobieta', 'szkoła'], note })
  function pattern(id, d) {
    if (patterns[id]) { warn(`pattern "${id}" registered twice`); return; }
    patterns[id] = Object.assign({ id }, d);
  }

  /* ── Items, nests, phrases ── */

  // PL.items('GEN:negation', [ [cue, 'Nie mam {czasu}.', 'I have no time.', extra?], {…}, … ])
  function items(ruleId, list) {
    list.forEach(entry => rawItems.push({ rule: ruleId, entry }));
  }

  // PL.nest({ id, root, gloss, base, intro, m: [ [word, seg, meaning, rule, from, extra?], … ] })
  function nest(def) {
    if (nests.some(n => n.id === def.id)) { warn(`nest "${def.id}" registered twice`); return; }
    nests.push(def);
  }

  // PL.phrases('SW:polite', [ ['Nie ma za co', "You're welcome", { lit, use }], … ])
  function phraseList(ruleId, list) {
    list.forEach(p => {
      const [pl, en, extra] = p;
      phrases.push(Object.assign({ rule: ruleId, pl, en }, extra || {}));
    });
  }

  // Glosses shown under word-anatomy chips.
  // PL.affixes({ 'pod-': 'under', '-arnia': 'shop / place', 'pis': 'write' })
  function affixes(map) {
    Object.entries(map).forEach(([k, v]) => {
      if (affix[k] && affix[k] !== v) warn(`affix "${k}" glossed twice`);
      affix[k] = v;
    });
  }

  /* ── Labels ── */

  function formLabel(L, key) {
    if (!L) return key;
    if (L.pos === 'noun') {
      const [num, cs] = key.split('.');
      return `${CASE_NAME[cs]} ${num === 'sg' ? 'singular' : 'plural'}`;
    }
    if (L.pos === 'pron') return CASE_NAME[key] || key;
    if (L.pos === 'adj') {
      const [slot, cs] = key.split('.');
      return `${CASE_NAME[cs]}, ${ADJ_SLOT_EN[slot]}`;
    }
    if (L.pos === 'verb') {
      if (key === 'inf') return 'infinitive';
      if (key === 'vn') return 'verbal noun';
      if (key === 'pa') return 'active participle (-ący)';
      if (key === 'pp') return 'passive participle';
      if (key === 'ap') return 'adverbial participle (-ąc)';
      const [t, p, g] = key.split('.');
      let tense = { pres: 'present', fut: 'future', past: 'past', cond: 'conditional', imp: 'imperative' }[t];
      if (t === 'pres' && L.asp === 'pf') tense = 'future (perfective)';
      let who = PERSON_EN[p] || p;
      if (t === 'imp') who = { '2sg': 'you', '1pl': "let's", '2pl': 'you (pl.)' }[p];
      if (p === '3sg' && g) who = { m: 'he', f: 'she', n: 'it' }[g];
      if (p === '3pl' && g) who = 'they';
      let gl = '';
      if (g === 'm' && p !== '3sg') gl = ' (m.)';
      if (g === 'f' && p !== '3sg') gl = ' (f.)';
      if (g === 'v') gl = ' (men / mixed)';
      if (g === 'p') gl = ' (women / things)';
      return `${tense}: ${who}${gl}`;
    }
    return key;
  }

  return {
    // vocabulary
    CASES, CASE_NAME, CASE_PL, CASE_Q, PERSONS, PERSON_EN, PERSON_PL, GENDER_EN, ADJ_SLOTS, ADJ_SLOT_EN,
    // registries (read by compile.js and the UI)
    MODULES: modules, MODULE: moduleById, GROUPS: groups, GROUP: groupById,
    RULES: rules, RULE_LIST: ruleList, LEX: lex, PATTERNS: patterns,
    RAW_ITEMS: rawItems, NESTS: nests, PHRASES: phrases, AFFIX: affix, WARNINGS: warnings,
    warn, pendingDerived, resolveDerived,
    // registration API (used by data/*.js)
    module, groups: groupList, rules: ruleSet, noun, pronoun, adj, verb, pattern, items, nest,
    phrases: phraseList, affixes,
    // helpers
    norm, stripDiacritics, hash, esc, md, formLabel, adjForms, verbForms,
  };
})();

if (typeof module !== 'undefined') module.exports = PL;
