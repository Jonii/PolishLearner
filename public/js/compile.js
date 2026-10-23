/* ═══════════════════════════════════════════════════════════════
   compile.js — Turns registered content into practice items

   Runs once after all data/*.js files are loaded:
     1. finishes the lexicon (prefixed verbs, reverse form index)
     2. compiles hand-written items (sentences with a {blank})
     3. generates extra items automatically:
          identify — "which case / which form is this?"   (from sentences)
          lemma    — "what is the dictionary form?"        (from sentences)
          build    — "pisać → ? 'to sign'"                 (from nests)
          decode   — "what does przepisać mean?"           (from nests)
          meaning  — "what does 'Trudno' mean?"            (from phrases)
          say      — "someone sneezes: you say …"          (from phrases)
     4. builds indexes and collects warnings

   Depends on: PL (core.js)
   Adds to PL: compile(), ITEMS, ITEM, BY_RULE, FORM_INDEX, optionsFor(), …
   ═══════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const ITEMS = [];
  const ITEM = {};
  const BY_RULE = {};
  const FORM_INDEX = {};     // norm(form) → [{ lemma, key }]
  const NEST = {};           // nest id → nest
  const MEMBER = {};         // word → [{ nest, member }]

  const RECOGNITION = new Set(['decode', 'identify', 'meaning', 'respond']);

  function addItem(it) {
    if (!PL.RULES[it.rule]) { PL.warn(`item for unknown rule "${it.rule}": ${it.pre || ''}{${it.a}}${it.post || ''}`); return null; }
    it.module = PL.RULES[it.rule].module;
    it.id = it.id || `${it.type[0]}${PL.hash(`${it.rule}|${it.type}|${it.pre || ''}|${it.a}|${it.post || ''}|${it.word || ''}`)}`;
    if (ITEM[it.id]) { PL.warn(`duplicate item ${it.rule}: ${it.pre || ''}{${it.a}}${it.post || ''}`); return null; }
    it.recog = RECOGNITION.has(it.type);
    ITEMS.push(it);
    ITEM[it.id] = it;
    (BY_RULE[it.rule] = BY_RULE[it.rule] || []).push(it);
    return it;
  }

  /* ── Lexicon ── */

  function finishLexicon() {
    PL.pendingDerived.forEach(lemma => PL.resolveDerived(lemma, 0));
    Object.values(PL.LEX).forEach(L => {
      Object.entries(L.forms || {}).forEach(([key, vals]) => {
        vals.forEach(v => {
          const k = PL.norm(v);
          const list = FORM_INDEX[k] = FORM_INDEX[k] || [];
          if (!list.some(x => x.lemma === L.lemma && x.key === key)) list.push({ lemma: L.lemma, key });
        });
      });
    });
  }

  // All forms of a lexeme as a flat list of distinct strings.
  function formsOf(lemma) {
    const L = PL.LEX[lemma];
    if (!L || !L.forms) return [];
    const out = [];
    Object.values(L.forms).forEach(vals => vals.forEach(v => { if (!out.includes(v)) out.push(v); }));
    return out;
  }

  // Keys under which `form` appears in lexeme `lemma`.
  function keysOf(lemma, form) {
    return (FORM_INDEX[PL.norm(form)] || []).filter(x => x.lemma === lemma).map(x => x.key);
  }

  // Lexemes (other than via prefixes) that a form could belong to.
  function lemmasOf(form) {
    return [...new Set((FORM_INDEX[PL.norm(form)] || []).map(x => x.lemma))];
  }

  // Does lexeme `lemma` derive (through prefixes) from `base`?
  function derivesFrom(lemma, base) {
    let L = PL.LEX[lemma];
    for (let i = 0; L && i < 6; i++) {
      if (L.lemma === base) return true;
      L = L.base ? PL.LEX[L.base] : null;
    }
    return false;
  }

  /* ── Parsing "text with {blank}" ── */

  function parseBlank(text) {
    const m = /^([\s\S]*?)\{([^}]+)\}([\s\S]*)$/.exec(text);
    if (!m) return null;
    const answers = m[2].split('|').map(s => s.trim());
    return { pre: m[1], a: answers[0], alt: answers.slice(1), post: m[3] };
  }

  /* ── Hand-written items ── */

  function compileRaw() {
    PL.RAW_ITEMS.forEach(({ rule, entry }) => {
      if (Array.isArray(entry)) {
        const [cue, text, tr, extra] = entry;
        compileCloze(rule, Object.assign({ cue, s: text, t: tr }, extra || {}));
      } else if (entry.type === 'respond') {
        compileRespond(rule, entry);
      } else if (entry.type === 'say') {
        compileSay(rule, entry);
      } else if (entry.type === 'choice') {
        compileChoice(rule, entry);
      } else {
        compileCloze(rule, entry);
      }
    });
  }

  function compileCloze(rule, d) {
    const b = parseBlank(d.s);
    if (!b) { PL.warn(`${rule}: no {blank} in "${d.s}"`); return; }
    const alt = b.alt.concat(d.alt || []);
    const it = {
      type: 'cloze', fmt: 'type', rule,
      cue: d.cue || '', lemma: d.lem || d.cue || '',
      pre: b.pre, a: b.a, alt, post: b.post,
      tr: d.t || '', note: d.n || '', c: d.c || null, opts: d.o || null,
      hand: true,
    };
    validateCloze(it, d);
    addItem(it);
    return it;
  }

  // The answer must be a real form of the cue word (or of a prefixed verb built on it).
  function validateCloze(it, d) {
    if (d.free) return;
    const cueL = PL.LEX[it.cue];
    const answers = [it.a].concat(it.alt);
    answers.forEach(ans => {
      const owners = lemmasOf(ans);
      if (!owners.length) {
        if (cueL || PL.LEX[it.lemma]) PL.warn(`${it.rule}: "${ans}" is not a known form (cue "${it.cue}") in "${it.pre}{…}${it.post}"`);
        return;
      }
      if (cueL && !owners.some(o => o === it.cue || derivesFrom(o, it.cue) || o === it.lemma)) {
        PL.warn(`${it.rule}: "${ans}" is a form of ${owners.join('/')}, not of cue "${it.cue}"`);
      }
    });
    // Remember which lexeme the answer belongs to, for hints and diagnostics.
    if (!PL.LEX[it.lemma] || !keysOf(it.lemma, it.a).length) {
      const owners = lemmasOf(it.a);
      const best = owners.find(o => o === it.cue) || owners.find(o => derivesFrom(o, it.cue)) || owners[0];
      if (best) it.lemma = best;
    }
  }

  function compileRespond(rule, d) {
    const b = parseBlank(d.s);
    if (!b) { PL.warn(`${rule}: respond item without {blank}: "${d.s}"`); return; }
    const opts = (d.o || []).filter(o => PL.norm(o) !== PL.norm(b.a));
    if (opts.length < 2) PL.warn(`${rule}: respond item needs 2+ distractors: "${d.s}"`);
    addItem({
      type: 'respond', fmt: 'choice', rule,
      pre: b.pre, a: b.a, alt: b.alt, post: b.post, opts,
      tr: d.t || '', note: d.n || '', q: d.q || 'Choose the best reply', hand: true,
    });
  }

  // Free multiple-choice item: { type:'choice', q, s (optional sentence with {blank}), a, o: [distractors], t, n }
  function compileChoice(rule, d) {
    const b = d.s ? parseBlank(d.s) : null;
    addItem({
      type: 'respond', fmt: 'choice', rule,
      pre: b ? b.pre : '', a: b ? b.a : d.a, alt: [], post: b ? b.post : '',
      opts: d.o || [], tr: d.t || '', note: d.n || '', q: d.q || '', hand: true,
    });
  }

  // Situation → type the phrase.  { type:'say', q: 'Someone sneezes. You say:', a: 'Na zdrowie', alt, o, t, n }
  function compileSay(rule, d) {
    addItem({
      type: 'say', fmt: 'type', rule,
      q: d.q, a: d.a, alt: d.alt || [], opts: d.o || null,
      tr: d.t || '', note: d.n || '', hand: true,
    });
  }

  /* ── Generated: identify the case / form ── */

  function caseOf(it) {
    if (it.c) return it.c;
    const r = PL.RULES[it.rule];
    if (r.kind && PL.CASES.includes(r.kind)) return r.kind;
    const L = PL.LEX[it.lemma];
    if (!L || (L.pos !== 'noun' && L.pos !== 'pron' && L.pos !== 'adj')) return null;
    const cs = [...new Set(keysOf(L.lemma, it.a).map(k => k.split('.').pop()))];
    return cs.length === 1 ? cs[0] : null;
  }

  function genIdentify() {
    ITEMS.filter(it => it.type === 'cloze' && it.hand).forEach(src => {
      const L = PL.LEX[src.lemma];
      if (!L) return;
      if (src.module === 'cases' && (L.pos === 'noun' || L.pos === 'pron' || L.pos === 'adj')) {
        const cs = caseOf(src);
        if (!cs) return;
        // distractors: cases where this word looks the same first (they are the real trap)
        const same = [...new Set(keysOf(L.lemma, src.a).map(k => k.split('.').pop()))].filter(c => c !== cs);
        addItem({
          type: 'identify', fmt: 'choice', rule: src.rule, src: src.id,
          pre: src.pre, word: src.a, post: src.post, tr: src.tr, lemma: src.lemma, cue: src.cue,
          a: PL.CASE_NAME[cs], idCase: cs, trap: same.map(c => PL.CASE_NAME[c]),
          q: 'Which case is the highlighted word in?', note: src.note,
        });
      } else if (src.module === 'verbs' && L.pos === 'verb') {
        const keys = keysOf(L.lemma, src.a);
        const labels = [...new Set(keys.map(k => PL.formLabel(L, k)))];
        if (labels.length !== 1 || keys[0] === 'inf') return;
        addItem({
          type: 'identify', fmt: 'choice', rule: src.rule, src: src.id,
          pre: src.pre, word: src.a, post: src.post, tr: src.tr, lemma: src.lemma, cue: src.cue,
          a: labels[0], idKey: keys[0],
          q: 'Which form is the highlighted word?', note: src.note,
        });
      }
    });
  }

  /* ── Generated: find the dictionary form ── */

  function stemOf(lemma) {
    return PL.norm(lemma)
      .replace(/ się$/, '')
      .replace(/(ować|ywać|iwać|awać|nąć|ąć|ać|eć|ić|yć|uć|ść|źć|c|ć)$/, '')
      .replace(/[aeiouyąęó]+$/, '');
  }

  function nontrivial(form, lemma) {
    const f = PL.norm(form), l = PL.norm(lemma).replace(/ się$/, '');
    if (f === l) return false;
    const st = stemOf(lemma);
    return st.length < 2 || !f.startsWith(st);
  }

  function genLemma() {
    const nounRule = PL.RULES['LEM:noun'], verbRule = PL.RULES['LEM:verb'], pverbRule = PL.RULES['LEM:pverb'];
    const seen = new Set();
    ITEMS.filter(it => it.type === 'cloze' && it.hand).forEach(src => {
      const L = PL.LEX[src.lemma];
      if (!L || L.hidden) return;
      let rule = null;
      if (L.pos === 'noun' && nounRule) rule = nounRule.id;
      if (L.pos === 'verb') rule = (L.base && pverbRule) ? pverbRule.id : (verbRule ? verbRule.id : null);
      if (!rule || !nontrivial(src.a, L.lemma)) return;
      const key = `${PL.norm(src.a)}>${L.lemma}`;
      if (seen.has(key)) return;   // one item per form is plenty
      seen.add(key);
      addItem({
        type: 'lemma', fmt: 'type', rule, src: src.id,
        pre: src.pre, word: src.a, post: src.post, tr: src.tr,
        a: L.lemma, alt: [], lemma: L.lemma,
        q: 'What is the dictionary form of the highlighted word?',
        note: L.note || '',
      });
    });
  }

  /* ── Nests: build + decode ── */

  function memberPos(m) {
    if (m.pos) return m.pos;
    const r = m.rules[0] || '';
    if (/^ADJ:|^PART:ny/.test(r)) return 'adj';
    if (/^ADV:/.test(r)) return 'adv';
    return /^to /.test(m.m) ? 'v' : 'n';
  }

  function compileNests() {
    PL.NESTS.forEach(nest => {
      NEST[nest.id] = nest;
      nest.members = nest.m.map((row, i) => {
        const [w, seg, m, rule, from, extra] = row;
        const mem = Object.assign({ w, seg, m, from: from || null, i }, extra || {});
        mem.rules = !rule ? [] : Array.isArray(rule) ? rule : [rule];
        mem.pos = memberPos(mem);
        mem.nest = nest.id;
        (MEMBER[w] = MEMBER[w] || []).push(mem);
        mem.rules.forEach(r => { if (!PL.RULES[r]) PL.warn(`nest ${nest.id}: unknown rule "${r}" for ${w}`); });
        return mem;
      });
    });
    PL.NESTS.forEach(nest => {
      nest.members.forEach(mem => {
        if (mem.from && !meaningOf(mem.from, nest)) PL.warn(`nest ${nest.id}: base "${mem.from}" of ${mem.w} has no meaning (add it to the nest or the lexicon)`);
        const rule = mem.rules[0];
        if (!rule || !PL.RULES[rule]) return;
        if (mem.from && !mem.nobuild) {
          addItem({
            type: 'build', fmt: 'type', rule, nest: nest.id, member: mem.i,
            cue: mem.from, cueM: meaningOf(mem.from, nest) || '',
            a: mem.w, alt: mem.alt || [], tr: mem.m, lit: mem.lit || '',
            q: 'Build the word', note: mem.n || '', seg: mem.seg,
          });
        }
        if (!mem.nodecode) {
          addItem({
            type: 'decode', fmt: 'choice', rule, nest: nest.id, member: mem.i,
            word: mem.w, seg: mem.seg, a: mem.m, lit: mem.lit || '',
            q: 'What does it mean?', note: mem.n || '',
          });
        }
        const exs = !mem.ex ? [] : Array.isArray(mem.ex[0]) ? mem.ex : [mem.ex];
        exs.forEach(([text, tr]) => {
          const b = parseBlank(text);
          if (!b) { PL.warn(`nest ${nest.id}: example without {blank}: ${text}`); return; }
          // in context, read it …
          addItem({
            type: 'decode', fmt: 'choice', rule, nest: nest.id, member: mem.i, ctx: true,
            pre: b.pre, word: b.a, post: b.post, tr, seg: mem.seg, a: mem.m, lit: mem.lit || '',
            q: `What does *${b.a}* mean here?`, note: mem.n || '', base: mem.w,
          });
          // … and produce it
          if (mem.from && !mem.nobuild) {
            const it = {
              type: 'cloze', fmt: 'type', rule, nest: nest.id, member: mem.i,
              cue: rootCue(mem, nest), lemma: mem.w,
              pre: b.pre, a: b.a, alt: b.alt, post: b.post, tr, note: mem.n || '', seg: mem.seg,
            };
            if (lemmasOf(b.a).length) validateCloze(it, {});
            addItem(it);
          }
        });
      });
    });
  }

  // For a sentence built on a derived word, show the plainest family word as the cue.
  function rootCue(mem, nest) {
    return nest.cue || mem.from || nest.base || nest.root;
  }

  function meaningOf(word, nest) {
    const inNest = nest && nest.members && nest.members.find(x => x.w === word);
    if (inNest) return inNest.m;
    const other = MEMBER[word] && MEMBER[word][0];
    if (other) return other.m;
    const L = PL.LEX[word];
    if (L && L.m) return L.m;
    return '';
  }

  /* ── Phrases: meaning + say ── */

  function compilePhrases() {
    PL.PHRASES.forEach(p => {
      if (!PL.RULES[p.rule]) { PL.warn(`phrase for unknown rule ${p.rule}: ${p.pl}`); return; }
      if (!p.nomeaning) {
        addItem({
          type: 'meaning', fmt: 'choice', rule: p.rule, word: p.pl, a: p.en,
          lit: p.lit || '', q: 'What does it mean?', note: p.use || '', phrase: p,
        });
      }
      if (p.say) {
        addItem({
          type: 'say', fmt: 'type', rule: p.rule, q: p.say,
          a: p.pl, alt: p.alt || [], tr: p.en, lit: p.lit || '', note: p.use || '', phrase: p,
        });
      }
    });
  }

  /* ── Options for multiple choice (built fresh each time a card is shown) ── */

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickDistinct(pool, n, exclude) {
    const ex = new Set(exclude.map(PL.norm));
    const out = [];
    shuffle(pool.slice()).forEach(x => {
      if (out.length >= n) return;
      const k = PL.norm(x);
      if (ex.has(k)) return;
      ex.add(k);
      out.push(x);
    });
    return out;
  }

  // Returns the options (answer included, shuffled) for an item, or null.
  function optionsFor(it) {
    const n = 3;
    let wrong = [];
    const answers = [it.a].concat(it.alt || []);
    if (it.type === 'respond') {
      wrong = it.opts.slice(0, 4);
    } else if (it.type === 'identify') {
      if (it.idCase) {
        const others = PL.CASES.filter(c => c !== it.idCase).map(c => PL.CASE_NAME[c]);
        wrong = pickDistinct(it.trap, 2, answers);
        wrong = wrong.concat(pickDistinct(others, n - wrong.length, answers.concat(wrong)));
      } else {
        const L = PL.LEX[it.lemma];
        const [tense] = it.idKey.split('.');
        const keys = Object.keys(L.forms).filter(k => k.includes('.') && !L.forms[k].some(v => PL.norm(v) === PL.norm(it.word)));
        const same = keys.filter(k => k.startsWith(tense + '.')).map(k => PL.formLabel(L, k));
        const other = keys.filter(k => !k.startsWith(tense + '.') && !k.startsWith('cond')).map(k => PL.formLabel(L, k));
        wrong = pickDistinct(same, 2, answers);
        wrong = wrong.concat(pickDistinct(other, n - wrong.length, answers.concat(wrong)));
      }
    } else if (it.type === 'decode') {
      wrong = decodeDistractors(it, n);
    } else if (it.type === 'meaning') {
      const pool = PL.PHRASES.filter(p => p.rule !== it.rule && p.en !== it.a).map(p => p.en);
      wrong = pickDistinct(pool, n, answers);
    } else if (it.type === 'cloze') {
      wrong = clozeDistractors(it, n);
    } else if (it.type === 'build') {
      const nest = NEST[it.nest];
      const me = nest.members[it.member];
      const pool = nest.members.filter(x => x.i !== it.member && x.pos === me.pos && x.w !== it.cue).map(x => x.w);
      wrong = pickDistinct(pool, n, answers.concat([it.cue]));
    } else if (it.type === 'lemma') {
      const L = PL.LEX[it.a];
      const pool = Object.values(PL.LEX)
        .filter(x => x.pos === L.pos && !x.hidden && x.lemma !== L.lemma && x.lemma[0] === L.lemma[0])
        .map(x => x.lemma);
      wrong = pickDistinct(pool, n, answers.concat([it.word]));
      if (wrong.length < n) {
        const more = Object.values(PL.LEX).filter(x => x.pos === L.pos && !x.hidden).map(x => x.lemma);
        wrong = wrong.concat(pickDistinct(more, n - wrong.length, answers.concat(wrong, [it.word])));
      }
    } else if (it.type === 'say') {
      const pool = it.opts && it.opts.length ? it.opts
        : PL.PHRASES.filter(p => p.rule !== it.rule).map(p => p.pl);
      wrong = pickDistinct(pool, n, answers);
    }
    if (!wrong.length) return null;
    return shuffle([it.a].concat(wrong.slice(0, n)));
  }

  function clozeDistractors(it, n) {
    const answers = [it.a].concat(it.alt || []);
    if (it.opts && it.opts.length) return pickDistinct(it.opts, n, answers);
    const L = PL.LEX[it.lemma];
    // Derived (prefixed) verb in a nest: offer the same form with sibling prefixes.
    if (it.nest != null && L && L.base) {
      const keys = keysOf(L.lemma, it.a);
      const sibs = Object.values(PL.LEX).filter(x => x.base === L.base && x.lemma !== L.lemma && x.forms);
      const pool = [];
      sibs.forEach(x => keys.forEach(k => (x.forms[k] || []).forEach(v => pool.push(v))));
      const got = pickDistinct(pool, n, answers);
      if (got.length >= 2) return got;
    }
    if (it.nest != null) {
      const nest = NEST[it.nest];
      const me = nest.members[it.member];
      const pool = nest.members.filter(x => x.i !== it.member && x.pos === me.pos).map(x => x.w);
      return pickDistinct(pool, n, answers);
    }
    if (!L) return [];
    const keys = keysOf(L.lemma, it.a);
    const first = keys[0] || '';
    const prefix = first.split('.')[0];
    const all = Object.entries(L.forms).filter(([k]) => k !== 'inf' && k !== 'vn' && k !== 'pa' && k !== 'pp' && k !== 'ap');
    const near = all.filter(([k]) => k.split('.')[0] === prefix).flatMap(([, v]) => v);
    const far = all.flatMap(([, v]) => v);
    let out = pickDistinct(near, n, answers);
    if (out.length < n) out = out.concat(pickDistinct(far, n - out.length, answers.concat(out)));
    return out;
  }

  function decodeDistractors(it, n) {
    const answers = [it.a];
    const nest = NEST[it.nest];
    const me = nest.members[it.member];
    const sameNest = nest.members.filter(x => x.i !== it.member && x.m !== me.m);
    let out = pickDistinct(sameNest.filter(x => x.pos === me.pos).map(x => x.m), n, answers);
    if (out.length < n) out = out.concat(pickDistinct(sameNest.map(x => x.m), n - out.length, answers.concat(out)));
    if (out.length < n) {
      const pool = [];
      PL.NESTS.forEach(ns => ns.members.forEach(x => { if (ns.id !== nest.id && x.pos === me.pos) pool.push(x.m); }));
      out = out.concat(pickDistinct(pool, n - out.length, answers.concat(out)));
    }
    return out;
  }

  /* ── Hint data ── */

  // The declension / conjugation pattern table for an item's word, if any.
  function patternFor(it) {
    const L = PL.LEX[it.lemma];
    const r = PL.RULES[it.rule];
    if (r && r.pattern && PL.PATTERNS[r.pattern]) return PL.PATTERNS[r.pattern];
    if (L && L.cls && PL.PATTERNS[L.cls]) return PL.PATTERNS[L.cls];
    const g = r && PL.GROUP[r.group];
    if (g && g.pattern && PL.PATTERNS[g.pattern]) return PL.PATTERNS[g.pattern];
    return null;
  }

  /* ── Compile ── */

  function compile() {
    finishLexicon();
    compileRaw();
    compileNests();
    compilePhrases();
    genIdentify();
    genLemma();
    PL.RULE_LIST.forEach(r => {
      const list = BY_RULE[r.id] || [];
      r.count = list.length;
      r.handCount = list.filter(x => x.hand || x.type === 'build' || x.type === 'decode' || x.type === 'meaning').length;
      if (!list.length) PL.warn(`rule "${r.id}" has no items`);
    });
    return { items: ITEMS.length, warnings: PL.WARNINGS.length };
  }

  Object.assign(PL, {
    compile, ITEMS, ITEM, BY_RULE, FORM_INDEX, NEST, MEMBER,
    optionsFor, patternFor, formsOf, keysOf, lemmasOf, derivesFrom, parseBlank, shuffle, nontrivial, meaningOf,
  });
})();
