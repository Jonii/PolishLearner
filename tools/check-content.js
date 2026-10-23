#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   tools/check-content.js — Content checker (Node, no dependencies)

   Loads the same data files as public/index.html, compiles them and
   reports anything suspicious:
     - answers that are not real forms of the cue word
     - sentences filed under a case/tense rule whose answer is not
       in that case/tense (e.g. a "genitive" rule answered with a
       locative form)
     - rules with too few exercises, items without options, …

   Usage:  node tools/check-content.js            summary + warnings
           node tools/check-content.js --strict   exit 1 on any warning
           node tools/check-content.js --rules    also list every rule
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', 'public');
const args = process.argv.slice(2);
const STRICT = args.includes('--strict');
const LIST_RULES = args.includes('--rules');

// Scripts in page order, skipping the browser-only UI files.
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1])
  .filter(src => src.startsWith('data/') || src === 'js/core.js' || src === 'js/compile.js');

const ctx = vm.createContext({ console });
scripts.forEach(src => {
  const file = path.join(ROOT, src);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: src });
});
const PL = vm.runInContext('PL', ctx);
PL.compile();

const warnings = PL.WARNINGS.slice();
const warn = msg => warnings.push(msg);

/* ── Extra checks ── */

const TENSE_OF_RULE = r => r.kind && /^(pres|past|fut|imp|cond|inf)$/.test(r.kind) ? r.kind : null;

PL.ITEMS.forEach(it => {
  const r = PL.RULES[it.rule];
  const txt = `${it.pre || ''}{${it.a}}${it.post || ''}`;

  // Case rules: the answer has to be in that case.
  if (it.type === 'cloze' && it.hand && r.module === 'cases' && r.kind && PL.CASES.includes(r.kind)) {
    const want = it.c || r.kind;
    const keys = PL.keysOf(it.lemma, it.a);
    if (keys.length && !keys.some(k => k === want || k.endsWith('.' + want))) {
      warn(`${it.rule}: "${it.a}" is ${keys.join('/')} of ${it.lemma}, not ${want} — ${txt}`);
    }
  }
  // Tense rules: the answer has to be in that tense.
  const tense = TENSE_OF_RULE(r);
  if (it.type === 'cloze' && it.hand && tense) {
    const keys = PL.keysOf(it.lemma, it.a);
    if (keys.length && !keys.some(k => k === tense || k.startsWith(tense + '.'))) {
      warn(`${it.rule}: "${it.a}" is ${keys.join('/')} of ${it.lemma}, not ${tense} — ${txt}`);
    }
  }
  // Sentences need a translation.
  if ((it.type === 'cloze' || it.type === 'respond') && it.hand && !it.tr) warn(`${it.rule}: no translation — ${txt}`);
  // Leftover braces or doubled spaces.
  if (/[{}]/.test((it.pre || '') + (it.post || ''))) warn(`${it.rule}: stray brace — ${txt}`);
  if (/ {2}/.test(txt)) warn(`${it.rule}: double space — ${txt}`);
  // Multiple-choice items must produce options.
  if (it.fmt === 'choice') {
    const opts = PL.optionsFor(it);
    if (!opts || opts.length < 3) warn(`${it.rule} [${it.type}]: only ${opts ? opts.length : 0} options — ${it.word || it.a}`);
  }
  // Hand-written options must not give the answer away by punctuation or a capital letter.
  if (it.type === 'respond' && it.opts) {
    const look = s => [(s.match(/[!?.,…]+$/) || [''])[0], /^[A-ZĄĆĘŁŃÓŚŹŻ]/.test(s)].join();
    const odd = it.opts.filter(o => look(o) !== look(it.a));
    if (odd.length) warn(`${it.rule}: options styled unlike the answer (${odd.join(' | ')}) — ${txt}`);
  }
});

// Same sentence used twice?
const seen = {};
PL.ITEMS.filter(it => it.hand && it.type === 'cloze').forEach(it => {
  const k = `${it.pre}{${it.a}}${it.post}`;
  if (seen[k]) warn(`duplicate sentence in ${seen[k]} and ${it.rule}: ${k}`);
  seen[k] = it.rule;
});

// Rules with very few exercises.
PL.RULE_LIST.forEach(r => {
  const list = PL.BY_RULE[r.id] || [];
  if (list.length && list.length < 4) warn(`rule ${r.id} has only ${list.length} exercises`);
});

/* ── Report ── */

const byType = {};
PL.ITEMS.forEach(it => { byType[it.type] = (byType[it.type] || 0) + 1; });
const lexCount = Object.values(PL.LEX).filter(l => !l.hidden).length;
console.log(`Polski content: ${PL.RULE_LIST.length} rules, ${PL.ITEMS.length} exercises, ${lexCount} words with full tables, ${PL.NESTS.length} word families, ${PL.PHRASES.length} phrases`);
console.log('  exercises by type: ' + Object.entries(byType).map(([k, v]) => `${k} ${v}`).join(', '));
PL.MODULES.forEach(m => {
  const rs = PL.RULE_LIST.filter(r => r.module === m.id);
  const n = rs.reduce((a, r) => a + (PL.BY_RULE[r.id] || []).length, 0);
  console.log(`  ${m.t.padEnd(14)} ${String(rs.length).padStart(3)} rules ${String(n).padStart(5)} exercises`);
  if (LIST_RULES) rs.forEach(r => console.log(`      ${String((PL.BY_RULE[r.id] || []).length).padStart(4)}  ${r.id.padEnd(22)} ${r.t.replace(/\*/g, '')}`));
});

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach(w => console.log('  - ' + w));
  if (STRICT) process.exit(1);
} else {
  console.log('\nNo warnings.');
}
