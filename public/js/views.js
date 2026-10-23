/* ═══════════════════════════════════════════════════════════════
   views.js — Popups, the Progress view and the Reference view

   Popups:   pattern tables (F1 hint), word families, full paradigms
   Progress: what you have practised, section/group switches, "drill"
   Reference: the learning material — every rule with examples,
              ending tables, prefix map, word families, phrasebook,
              and complete declension/conjugation tables for every word

   Depends on: PL, SRS, Card (anatomy helper)
   Exports: Views (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const Views = (() => {
  'use strict';

  const esc = PL.esc;
  const md = PL.md;
  let refSection = null;
  let onChange = null;     // app callback when progress settings change

  /* ══ Popup ══ */

  function popupOpen() {
    return document.getElementById('popup').classList.contains('show');
  }

  function openPopup(html) {
    const inner = document.getElementById('popupInner');
    inner.innerHTML = `<button class="popup-close" type="button" aria-label="Close">✕</button>${html}`;
    inner.querySelector('.popup-close').addEventListener('click', closePopup);
    wireLexLinks(inner);
    const pop = document.getElementById('popup');
    pop.classList.add('show');
    pop.setAttribute('aria-hidden', 'false');
    inner.scrollTop = 0;
    inner.focus({ preventScroll: true });
  }

  function closePopup() {
    const pop = document.getElementById('popup');
    pop.classList.remove('show');
    pop.setAttribute('aria-hidden', 'true');
    const input = document.getElementById('cardInput');
    if (input && !input.disabled) input.focus({ preventScroll: true });
    else {
      const nb = document.getElementById('nextBtn');
      if (nb) nb.focus({ preventScroll: true });
    }
  }

  // Any element with data-lex="lemma" opens that word's full table.
  function wireLexLinks(root) {
    root.querySelectorAll('[data-lex]').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); popupLexeme(el.dataset.lex); });
    });
  }

  /* ══ Pattern tables ══ */

  function forms(L, key) {
    return L && L.forms && L.forms[key] ? L.forms[key].join(' / ') : '—';
  }

  function patternHTML(p, exclude) {
    const models = (p.models || []).filter(m => m !== exclude && PL.LEX[m]);
    let html = `<h3>${md(p.t)}</h3>`;
    if (p.intro) html += `<p class="p-intro">${md(p.intro)}</p>`;
    if (p.kind === 'noun') html += nounPattern(p, models.slice(0, 2));
    else if (p.kind === 'verb') html += verbPattern(p, models.slice(0, p.tense === 'pres' ? 2 : 1));
    else if (p.kind === 'adj') html += adjTable(PL.LEX[models[0]]);
    else if (p.kind === 'list') html += listPattern(p);
    else if (p.kind === 'pron') html += pronPattern(p);
    if (p.note) html += `<p class="p-note">${md(p.note)}</p>`;
    return html;
  }

  function nounPattern(p, models) {
    const head = `<tr><th>case</th><th>ending</th>${models.map(m => `<th><a href="#" data-lex="${esc(m)}">${esc(m)}</a></th>`).join('')}</tr>`;
    const rows = (num, ends) => PL.CASES.map((c, i) => `
      <tr><td class="case-name">${c}<span class="case-q">${num === 'sg' ? esc(PL.CASE_Q[c]) : ''}</span></td>
        <td class="end">${esc(ends[i] || '')}</td>
        ${models.map(m => `<td class="form">${esc(forms(PL.LEX[m], `${num}.${c}`))}</td>`).join('')}</tr>`).join('');
    let t = `<table class="ptable"><thead>${head}</thead><tbody>`;
    if (p.sg) t += `<tr class="sub"><td colspan="${2 + models.length}">singular</td></tr>${rows('sg', p.sg)}`;
    if (p.pl) t += `<tr class="sub"><td colspan="${2 + models.length}">plural</td></tr>${rows('pl', p.pl)}`;
    return t + '</tbody></table>';
  }

  const PAST_END = {
    '1sg': ['-łem', '-łam'], '2sg': ['-łeś', '-łaś'], '3sg': ['-ł', '-ła', '-ło'],
    '1pl': ['-liśmy', '-łyśmy'], '2pl': ['-liście', '-łyście'], '3pl': ['-li', '-ły'],
  };

  function verbPattern(p, models) {
    const tense = p.tense || 'pres';
    if (tense === 'pres' || tense === 'fut') {
      const ends = p.rows || [];
      const key = tense === 'fut' ? 'fut' : 'pres';
      const head = `<tr><th></th><th>ending</th>${models.map(m => `<th><a href="#" data-lex="${esc(m)}">${esc(m)}</a></th>`).join('')}</tr>`;
      const body = PL.PERSONS.map((ps, i) => `<tr><td class="case-name">${esc(PL.PERSON_PL[ps])}</td><td class="end">${esc(ends[i] || '')}</td>
        ${models.map(m => `<td class="form">${esc(forms(PL.LEX[m], `${key}.${ps}`))}</td>`).join('')}</tr>`).join('');
      return `<table class="ptable"><thead>${head}</thead><tbody>${body}</tbody></table>`;
    }
    if (tense === 'imp') {
      const ends = p.rows || [];
      const head = `<tr><th></th><th>ending</th>${models.map(m => `<th><a href="#" data-lex="${esc(m)}">${esc(m)}</a></th>`).join('')}</tr>`;
      const lab = { '2sg': 'ty', '1pl': 'my (let’s)', '2pl': 'wy' };
      const body = ['2sg', '1pl', '2pl'].map((ps, i) => `<tr><td class="case-name">${lab[ps]}</td><td class="end">${esc(ends[i] || '')}</td>
        ${models.map(m => `<td class="form">${esc(forms(PL.LEX[m], `imp.${ps}`))}</td>`).join('')}</tr>`).join('');
      return `<table class="ptable"><thead>${head}</thead><tbody>${body}</tbody></table>`;
    }
    // past / conditional: person × gender grid for one model verb
    const m = models[0];
    const L = PL.LEX[m];
    const t = tense === 'cond' ? 'cond' : 'past';
    const suffix = t === 'cond' ? condEnd : (e => e);
    const cell = (ps, g, end) => `<td><span class="end">${esc(suffix(end))}</span><span class="form">${esc(forms(L, `${t}.${ps}.${g}`))}</span></td>`;
    let html = `<p class="p-model">Model: <a href="#" data-lex="${esc(m)}">${esc(m)}</a></p>`;
    html += `<table class="ptable grid"><thead><tr><th></th><th>masculine</th><th>feminine</th><th>neuter</th></tr></thead><tbody>`;
    html += `<tr><td class="case-name">ja</td>${cell('1sg', 'm', PAST_END['1sg'][0])}${cell('1sg', 'f', PAST_END['1sg'][1])}<td></td></tr>`;
    html += `<tr><td class="case-name">ty</td>${cell('2sg', 'm', PAST_END['2sg'][0])}${cell('2sg', 'f', PAST_END['2sg'][1])}<td></td></tr>`;
    html += `<tr><td class="case-name">on / ona / ono</td>${cell('3sg', 'm', PAST_END['3sg'][0])}${cell('3sg', 'f', PAST_END['3sg'][1])}${cell('3sg', 'n', PAST_END['3sg'][2])}</tr>`;
    html += `</tbody><thead><tr><th></th><th>virile<br><small>men / mixed</small></th><th>non-virile<br><small>women, things</small></th><th></th></tr></thead><tbody>`;
    html += `<tr><td class="case-name">my</td>${cell('1pl', 'v', PAST_END['1pl'][0])}${cell('1pl', 'p', PAST_END['1pl'][1])}<td></td></tr>`;
    html += `<tr><td class="case-name">wy</td>${cell('2pl', 'v', PAST_END['2pl'][0])}${cell('2pl', 'p', PAST_END['2pl'][1])}<td></td></tr>`;
    html += `<tr><td class="case-name">oni / one</td>${cell('3pl', 'v', PAST_END['3pl'][0])}${cell('3pl', 'p', PAST_END['3pl'][1])}<td></td></tr>`;
    return html + '</tbody></table>';
  }

  function condEnd(pastEnd) {
    // -łem → -łbym, -łam → -łabym, -ł → -łby, -liśmy → -libyśmy …
    const map = {
      '-łem': '-łbym', '-łam': '-łabym', '-łeś': '-łbyś', '-łaś': '-łabyś', '-ł': '-łby', '-ła': '-łaby', '-ło': '-łoby',
      '-liśmy': '-libyśmy', '-łyśmy': '-łybyśmy', '-liście': '-libyście', '-łyście': '-łybyście', '-li': '-liby', '-ły': '-łyby',
    };
    return map[pastEnd] || pastEnd;
  }

  // All personal pronouns side by side (the point is comparing them, so nothing is hidden).
  function pronPattern(p) {
    const ms = (p.models || []).filter(m => PL.LEX[m]);
    const head = `<tr><th>case</th>${ms.map(m => `<th><a href="#" data-lex="${esc(m)}">${esc(m)}</a></th>`).join('')}</tr>`;
    const body = PL.CASES.slice(1, 6).map(c => `<tr><td class="case-name">${c}<span class="case-q">${esc(PL.CASE_Q[c])}</span></td>${ms.map(m => `<td class="form">${esc(forms(PL.LEX[m], c)).replace(/ \/ /g, '<br>')}</td>`).join('')}</tr>`).join('');
    return `<table class="ptable pron"><thead>${head}</thead><tbody>${body}</tbody></table>`;
  }

  function listPattern(p) {
    const head = p.head ? `<thead><tr>${p.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>` : '';
    const body = p.rows.map(r => `<tr>${r.map((c, i) => `<td class="${i === 0 ? 'end' : ''}">${md(c)}</td>`).join('')}</tr>`).join('');
    return `<table class="ptable list">${head}<tbody>${body}</tbody></table>`;
  }

  /* ══ Full paradigm tables (any lexeme) ══ */

  function nounTable(L) {
    const has = n => PL.CASES.some(c => L.forms[`${n}.${c}`]);
    const nums = ['sg', 'pl'].filter(has);
    let t = `<table class="ptable"><thead><tr><th>case</th>${nums.map(n => `<th>${n === 'sg' ? 'singular' : 'plural'}</th>`).join('')}</tr></thead><tbody>`;
    PL.CASES.forEach(c => {
      t += `<tr><td class="case-name">${c}<span class="case-q">${esc(PL.CASE_Q[c])}</span></td>${nums.map(n => `<td class="form">${esc(forms(L, `${n}.${c}`))}</td>`).join('')}</tr>`;
    });
    return t + '</tbody></table>';
  }

  function pronTable(L) {
    let t = '<table class="ptable"><thead><tr><th>case</th><th>forms</th></tr></thead><tbody>';
    PL.CASES.forEach(c => {
      if (L.forms[c]) t += `<tr><td class="case-name">${c}<span class="case-q">${esc(PL.CASE_Q[c])}</span></td><td class="form">${esc(forms(L, c))}</td></tr>`;
    });
    return t + '</tbody></table>';
  }

  function adjTable(L) {
    if (!L) return '';
    const slots = PL.ADJ_SLOTS;
    let t = `<table class="ptable adj"><thead><tr><th>case</th>${slots.map(s => `<th>${esc(PL.ADJ_SLOT_EN[s])}</th>`).join('')}</tr></thead><tbody>`;
    PL.CASES.slice(0, 6).forEach(c => {
      t += `<tr><td class="case-name">${c}</td>${slots.map(s => `<td class="form">${esc(forms(L, `${s}.${c}`))}</td>`).join('')}</tr>`;
    });
    t += '</tbody></table>';
    if (L.comp) t += `<p class="p-note">Comparative <strong>${esc(L.comp)}</strong>, superlative <strong>${esc(L.sup)}</strong>${L.adv ? `; adverb <strong>${esc(L.adv)}</strong>` : ''}.</p>`;
    else if (L.adv) t += `<p class="p-note">Adverb <strong>${esc(L.adv)}</strong>.</p>`;
    return t;
  }

  function verbTable(L) {
    const f = k => forms(L, k);
    const has = k => L.forms && L.forms[k];
    let html = '';
    const presName = L.asp === 'pf' ? 'Future (perfective verbs have no present)' : 'Present';
    if (has('pres.1sg')) {
      html += `<h4>${presName}</h4><table class="ptable"><tbody>`;
      PL.PERSONS.forEach(p => { html += `<tr><td class="case-name">${esc(PL.PERSON_PL[p])}</td><td class="form">${esc(f('pres.' + p))}</td></tr>`; });
      html += '</tbody></table>';
    }
    if (has('fut.1sg')) {
      html += `<h4>Future</h4><table class="ptable"><tbody>`;
      PL.PERSONS.forEach(p => { html += `<tr><td class="case-name">${esc(PL.PERSON_PL[p])}</td><td class="form">${esc(f('fut.' + p))}</td></tr>`; });
      html += '</tbody></table>';
    }
    if (has('past.3sg.m')) {
      html += `<h4>Past</h4><table class="ptable grid"><thead><tr><th></th><th>masc.</th><th>fem.</th><th>neut.</th></tr></thead><tbody>
        <tr><td class="case-name">ja</td><td class="form">${esc(f('past.1sg.m'))}</td><td class="form">${esc(f('past.1sg.f'))}</td><td></td></tr>
        <tr><td class="case-name">ty</td><td class="form">${esc(f('past.2sg.m'))}</td><td class="form">${esc(f('past.2sg.f'))}</td><td></td></tr>
        <tr><td class="case-name">on/ona/ono</td><td class="form">${esc(f('past.3sg.m'))}</td><td class="form">${esc(f('past.3sg.f'))}</td><td class="form">${esc(f('past.3sg.n'))}</td></tr>
        </tbody><thead><tr><th></th><th>virile</th><th>non-virile</th><th></th></tr></thead><tbody>
        <tr><td class="case-name">my</td><td class="form">${esc(f('past.1pl.v'))}</td><td class="form">${esc(f('past.1pl.p'))}</td><td></td></tr>
        <tr><td class="case-name">wy</td><td class="form">${esc(f('past.2pl.v'))}</td><td class="form">${esc(f('past.2pl.p'))}</td><td></td></tr>
        <tr><td class="case-name">oni/one</td><td class="form">${esc(f('past.3pl.v'))}</td><td class="form">${esc(f('past.3pl.p'))}</td><td></td></tr>
        </tbody></table>`;
    }
    if (has('imp.2sg')) {
      html += `<h4>Imperative</h4><table class="ptable"><tbody>
        <tr><td class="case-name">ty</td><td class="form">${esc(f('imp.2sg'))}</td></tr>
        <tr><td class="case-name">my</td><td class="form">${esc(f('imp.1pl'))}</td></tr>
        <tr><td class="case-name">wy</td><td class="form">${esc(f('imp.2pl'))}</td></tr></tbody></table>`;
    }
    if (has('cond.3sg.m')) {
      html += `<h4>Conditional</h4><p class="p-note">${esc(f('cond.1sg.m'))} / ${esc(f('cond.1sg.f'))} (I would …), ${esc(f('cond.3sg.m'))} / ${esc(f('cond.3sg.f'))}, ${esc(f('cond.1pl.v'))} …</p>`;
    }
    const extra = [['vn', 'verbal noun'], ['pa', 'active participle'], ['ap', 'adverbial participle'], ['pp', 'passive participle']]
      .filter(([k]) => has(k)).map(([k, lab]) => `${lab}: <strong>${esc(f(k))}</strong>`);
    if (extra.length) html += `<p class="p-note">${extra.join(' · ')}</p>`;
    return html;
  }

  function lexemeHTML(L) {
    let sub = '';
    if (L.pos === 'noun') sub = `noun, ${PL.GENDER_EN[L.g] || L.g || ''}`;
    else if (L.pos === 'verb') sub = `verb${L.asp ? `, ${L.asp === 'pf' ? 'perfective' : 'imperfective'}` : ''}${L.pair ? ` (pair: <a href="#" data-lex="${esc(L.pair)}">${esc(L.pair)}</a>)` : ''}`;
    else if (L.pos === 'adj') sub = 'adjective';
    else if (L.pos === 'pron') sub = 'pronoun';
    let html = `<h3>${esc(L.lemma)} <span class="h-sub">${sub}${L.m ? ` — ‘${esc(L.m)}’` : ''}</span></h3>`;
    if (L.base) html += `<p class="p-note">Built on <a href="#" data-lex="${esc(L.base)}">${esc(L.base)}</a>.</p>`;
    if (L.note) html += `<p class="p-note">${md(L.note)}</p>`;
    if (L.pos === 'noun') html += nounTable(L);
    else if (L.pos === 'pron') html += pronTable(L);
    else if (L.pos === 'adj') html += adjTable(L);
    else if (L.pos === 'verb') html += verbTable(L);
    return html;
  }

  function popupLexeme(lemma) {
    const L = PL.LEX[lemma];
    if (!L) return;
    openPopup(lexemeHTML(L));
  }

  /* ══ Hint popups (F1) ══ */

  function popupHint(t, it) {
    let html = '';
    if (t.kind === 'pattern') {
      html = patternHTML(t.p, it.lemma);
      html += `<p class="hint-foot">A pattern, not the answer: apply it to <strong>${esc(it.cue || it.lemma)}</strong>.</p>`;
    } else if (t.kind === 'affixes') {
      html = affixHTML(it);
    } else if (t.kind === 'alternations') {
      const p = PL.PATTERNS.alternations;
      html = p ? patternHTML(p) : '<p>No table.</p>';
    } else if (t.kind === 'phrases') {
      const r = PL.RULES[it.rule];
      const list = PL.PHRASES.filter(p => p.rule === it.rule);
      html = `<h3>${md(r.t)}</h3>${phraseTable(list)}`;
    }
    openPopup(html);
  }

  // For word-family items: the meanings of every affix in this group,
  // with examples from other families (never the word being asked).
  function affixHTML(it) {
    const r = PL.RULES[it.rule];
    const g = PL.GROUP[r.group];
    const word = it.a && it.type !== 'decode' ? it.a : (it.base || it.word);
    const siblings = PL.RULE_LIST.filter(x => x.group === r.group);
    let html = `<h3>${esc(g.t)}</h3>${g.intro ? `<p class="p-intro">${md(g.intro)}</p>` : ''}<table class="ptable list"><tbody>`;
    siblings.forEach(x => {
      const ex = examplesFor(x.id, 3, word);
      html += `<tr class="${x.id === r.id ? '' : ''}"><td class="end">${md(x.t)}</td><td>${ex.map(e => `<em class="pl">${esc(e.w)}</em> ‘${esc(e.m)}’`).join(', ')}</td></tr>`;
    });
    html += '</tbody></table><p class="hint-foot">Examples come from other words, so the answer is not in this table.</p>';
    return html;
  }

  // Up to n nest members that use a rule, avoiding a given word and its family.
  function examplesFor(ruleId, n, avoid) {
    const out = [];
    const avoidNest = avoid && PL.MEMBER[avoid] ? new Set(PL.MEMBER[avoid].map(m => m.nest)) : new Set();
    PL.NESTS.forEach(ns => ns.members.forEach(m => {
      if (out.length >= n * 3) return;
      if (m.rules[0] === ruleId && m.w !== avoid && !avoidNest.has(ns.id)) out.push(m);
    }));
    return PL.shuffle(out).slice(0, n);
  }

  /* ══ Word family popup ══ */

  function nestHTML(nest, highlight) {
    let html = `<h3>${esc(nest.root)} <span class="h-sub">‘${esc(nest.gloss)}’</span></h3>`;
    if (nest.intro) html += `<p class="p-intro">${md(nest.intro)}</p>`;
    html += '<table class="ptable nest"><tbody>';
    nest.members.forEach(m => {
      const rule = m.rules[0] ? PL.RULES[m.rules[0]] : null;
      html += `<tr class="${m.i === highlight ? 'hl-row' : ''}">
        <td class="nest-w">${Card.anatomy(m.seg, nest.id, m.i, true)}</td>
        <td><strong class="pl">${esc(m.w)}</strong>${m.ipf ? ` <span class="muted">/ ${esc(m.ipf)}</span>` : ''}<br>‘${esc(m.m)}’${m.lit ? ` <span class="muted">lit. ‘${esc(m.lit)}’</span>` : ''}
          ${m.n ? `<div class="nest-note">${md(m.n)}</div>` : ''}</td>
        <td class="nest-rule">${rule ? esc(rule.t.replace(/\*/g, '')) : '<span class="muted">root word</span>'}</td></tr>`;
    });
    return html + '</tbody></table>';
  }

  function popupNest(nestId, highlight) {
    const nest = PL.NEST[nestId];
    if (nest) openPopup(nestHTML(nest, highlight));
  }

  function phraseTable(list) {
    return `<table class="ptable phrases"><tbody>${list.map(p => `
      <tr><td class="pl-phrase">${esc(p.pl)}</td><td>${esc(p.en)}${p.lit ? `<div class="muted">lit. ‘${esc(p.lit)}’</div>` : ''}${p.use ? `<div class="nest-note">${md(p.use)}</div>` : ''}</td></tr>`).join('')}</tbody></table>`;
  }

  /* ══ Progress view ══ */

  function renderProgress() {
    const el = document.getElementById('view-progress');
    const S = SRS.state.stats;
    const today = new Date().toISOString().slice(0, 10);
    const dayN = S.day === today ? S.dayN : 0;
    const dayOk = S.day === today ? S.dayOk : 0;
    const allRules = PL.RULE_LIST.filter(r => r.count).map(r => r.id);
    const c = SRS.counts(allRules);
    const pct = (a, b) => (b ? Math.round(100 * a / b) : 0);

    let html = `<div class="stat-grid">
      <div class="stat-box"><div class="big">${dayN}</div><div>cards today${dayN ? ` · ${pct(dayOk, dayN)}% right` : ''}</div></div>
      <div class="stat-box"><div class="big">${S.total}</div><div>cards in total${S.total ? ` · ${pct(S.ok, S.total)}% right` : ''}</div></div>
      <div class="stat-box"><div class="big">${c.started}<small>/${c.total}</small></div><div>rules started</div></div>
      <div class="stat-box"><div class="big">${c.familiar}</div><div>familiar · ${c.mastered} mastered</div></div>
    </div>
    <div class="settings-row">
      <span class="settings-label">New rules</span>
      ${Object.keys(SRS.NEW_RATE).map(k => `<button class="seg-btn ${SRS.state.newRate === k ? 'active' : ''}" data-rate="${k}" type="button">${k}</button>`).join('')}
      <span class="settings-help">How quickly unseen rules are mixed in. “more” = maximum variety.</span>
    </div>
    <p class="legend"><span class="lvl-dot new"></span>new <span class="lvl-dot learning"></span>learning <span class="lvl-dot familiar"></span>familiar (3 clean in a row) <span class="lvl-dot mastered"></span>mastered (6). Untick a group to leave it out of practice; <em>drill</em> practises one rule only.</p>`;

    PL.MODULES.forEach(m => {
      const rulesOf = PL.RULE_LIST.filter(r => r.module === m.id && r.count);
      if (!rulesOf.length) return;
      const mc = SRS.counts(rulesOf.map(r => r.id));
      const on = !SRS.state.off.modules[m.id];
      html += `<section class="prog-module ${on ? '' : 'off'}">
        <div class="prog-head">
          <label class="switch"><input type="checkbox" data-mod="${m.id}" ${on ? 'checked' : ''}> <span class="prog-title">${esc(m.t)}</span> <span class="prog-pl">${esc(m.pl)}</span></label>
          <span class="prog-count">${mc.familiar}/${mc.total} familiar</span>
        </div>`;
      PL.GROUPS.filter(g => g.module === m.id).forEach(g => {
        const rs = rulesOf.filter(r => r.group === g.id);
        if (!rs.length) return;
        const gon = !SRS.state.off.groups[g.id];
        html += `<div class="prog-group ${gon ? '' : 'off'}">
          <label class="switch small"><input type="checkbox" data-grp="${esc(g.id)}" ${gon ? 'checked' : ''}> <span>${esc(g.t)}</span></label>
          <button class="drill-btn" data-drill-group="${esc(g.id)}" type="button">drill group</button>`;
        rs.forEach(r => {
          const s = SRS.peek(r.id);
          const lvl = SRS.level(r.id);
          const name = ['new', 'learning', 'familiar', 'mastered'][lvl];
          const stat = s && s.n ? `${s.n}× · ${pct(s.ok, s.n)}%` : '';
          html += `<div class="prog-rule"><span class="lvl-dot ${name}" title="${name}"></span>
            <span class="prog-rule-t">${md(r.t)}</span><span class="prog-stat">${stat}</span>
            <button class="drill-btn" data-drill="${esc(r.id)}" type="button">drill</button></div>`;
        });
        html += '</div>';
      });
      html += '</section>';
    });

    html += `<section class="prog-data">
      <h3>Your data</h3>
      <p>Progress lives in this browser only${SRS.storageOk ? '' : ' — <strong>but storage is blocked here, so nothing will be kept</strong>'}. Save a copy to move it or keep it safe.</p>
      <button class="check-btn" id="btnExport" type="button">Export progress</button>
      <label class="check-btn file-btn">Import progress<input type="file" id="fileImport" accept="application/json,.json" hidden></label>
      <button class="reset-link" id="btnReset" type="button">Reset all progress</button>
    </section>`;

    el.innerHTML = html;

    el.querySelectorAll('[data-rate]').forEach(b => b.addEventListener('click', () => {
      SRS.setNewRate(b.dataset.rate); renderProgress(); changed();
    }));
    el.querySelectorAll('[data-mod]').forEach(cb => cb.addEventListener('change', () => {
      SRS.setModule(cb.dataset.mod, cb.checked); renderProgress(); changed();
    }));
    el.querySelectorAll('[data-grp]').forEach(cb => cb.addEventListener('change', () => {
      SRS.setGroup(cb.dataset.grp, cb.checked); renderProgress(); changed();
    }));
    el.querySelectorAll('[data-drill]').forEach(b => b.addEventListener('click', () => {
      const r = PL.RULES[b.dataset.drill];
      SRS.setFocus([r.id], r.t);
      changed('practice');
    }));
    el.querySelectorAll('[data-drill-group]').forEach(b => b.addEventListener('click', () => {
      const g = PL.GROUP[b.dataset.drillGroup];
      SRS.setFocus(PL.RULE_LIST.filter(r => r.group === g.id && r.count).map(r => r.id), `${PL.MODULE[g.module].t}: ${g.t}`);
      changed('practice');
    }));
    document.getElementById('btnExport').addEventListener('click', exportProgress);
    document.getElementById('fileImport').addEventListener('change', importProgress);
    document.getElementById('btnReset').addEventListener('click', () => {
      if (!confirm('This erases all progress in this browser. Are you sure?')) return;
      SRS.reset(); renderProgress(); changed('practice');
    });
  }

  function exportProgress() {
    const blob = new Blob([SRS.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `polski-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function importProgress(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        SRS.importJSON(String(reader.result));
        toast('Progress imported.');
        renderProgress();
        changed('practice');
      } catch (err) {
        toast(`Could not import: ${err.message}`);
      }
    };
    reader.readAsText(file);
  }

  function changed(goTo) { if (onChange) onChange(goTo); }

  /* ══ Reference view ══ */

  const REF_SECTIONS = () => PL.MODULES.map(m => ({ id: m.id, t: m.t })).concat([{ id: 'tables', t: 'Word tables' }]);

  function renderReference(section) {
    refSection = section || refSection || PL.MODULES[0].id;
    const el = document.getElementById('view-reference');
    const nav = REF_SECTIONS().map(s => `<button class="ref-tab ${s.id === refSection ? 'active' : ''}" data-sec="${s.id}" type="button">${esc(s.t)}</button>`).join('');
    let body = '';
    if (refSection === 'tables') body = tablesSection();
    else body = moduleSection(refSection);
    el.innerHTML = `<nav class="ref-nav">${nav}</nav><div class="ref-body">${body}</div>`;
    el.querySelectorAll('.ref-tab').forEach(b => b.addEventListener('click', () => renderReference(b.dataset.sec)));
    wireLexLinks(el);
    el.querySelectorAll('[data-nest]').forEach(b => b.addEventListener('click', () => popupNest(b.dataset.nest)));
    const filter = document.getElementById('lexFilter');
    if (filter) filter.addEventListener('input', () => filterLex(filter.value));
    el.querySelectorAll('details.ref-group').forEach(d => d.addEventListener('toggle', () => {
      if (d.open) wireLexLinks(d);
    }));
  }

  function exampleSentences(ruleId, n) {
    const list = (PL.BY_RULE[ruleId] || []).filter(it => it.type === 'cloze' || it.type === 'respond');
    return list.slice(0, n).map(it => `<li><span class="pl">${Card.sentence(it, it.a)}</span>${it.tr ? ` <span class="muted">— ${esc(it.tr)}</span>` : ''}</li>`).join('');
  }

  function moduleSection(modId) {
    const m = PL.MODULE[modId];
    let html = `<h2>${esc(m.t)} <span class="h-sub">${esc(m.pl)}</span></h2>`;
    if (m.intro) html += `<div class="ref-intro">${md(m.intro)}</div>`;
    PL.GROUPS.filter(g => g.module === modId).forEach(g => {
      const rs = PL.RULE_LIST.filter(r => r.group === g.id);
      html += `<details class="ref-group"><summary><span class="ref-g-t">${esc(g.t)}</span> <span class="h-sub">${esc(g.pl)}</span></summary><div class="ref-g-body">`;
      if (g.intro) html += `<p class="p-intro">${md(g.intro)}</p>`;
      if (g.pattern && PL.PATTERNS[g.pattern]) html += `<div class="ref-pattern">${patternHTML(PL.PATTERNS[g.pattern])}</div>`;
      rs.forEach(r => {
        html += `<div class="ref-rule"><div class="ref-rule-t">${md(r.t)}</div>${r.x ? `<div class="rule-x">${md(r.x)}</div>` : ''}`;
        if (r.pattern && PL.PATTERNS[r.pattern] && r.pattern !== g.pattern) html += `<div class="ref-pattern">${patternHTML(PL.PATTERNS[r.pattern])}</div>`;
        const ex = exampleSentences(r.id, 3);
        if (ex) html += `<ul class="ref-ex">${ex}</ul>`;
        const words = examplesFor(r.id, 6);
        if (words.length) html += `<p class="ref-words">${words.map(w => `<em class="pl">${esc(w.w)}</em> ‘${esc(w.m)}’`).join(' · ')}</p>`;
        const ph = PL.PHRASES.filter(p => p.rule === r.id);
        if (ph.length) html += phraseTable(ph);
        html += '</div>';
      });
      html += '</div></details>';
    });
    const nests = PL.NESTS.filter(n => (n.mod || nestModule(n)) === modId);
    if (nests.length) {
      html += `<h3 class="ref-sub">Word families</h3><p class="p-intro">One root, many words. Click a family to see how each member is built.</p><div class="nest-grid">`;
      nests.forEach(n => {
        html += `<button class="nest-card" data-nest="${esc(n.id)}" type="button"><span class="nest-root">${esc(n.root)}</span><span class="nest-gloss">‘${esc(n.gloss)}’</span><span class="nest-count">${n.members.length} words</span></button>`;
      });
      html += '</div>';
    }
    return html;
  }

  function nestModule(n) {
    const counts = {};
    n.members.forEach(m => m.rules.forEach(r => { const mod = PL.RULES[r] && PL.RULES[r].module; if (mod) counts[mod] = (counts[mod] || 0) + 1; }));
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || null;
  }

  function tablesSection() {
    const groupsOf = [['noun', 'Nouns'], ['pron', 'Pronouns'], ['adj', 'Adjectives'], ['verb', 'Verbs']];
    let html = `<h2>Word tables <span class="h-sub">odmiana</span></h2>
      <p class="p-intro">Every word the exercises use, with its complete declension or conjugation. Click a word.</p>
      <input class="lex-filter" id="lexFilter" type="search" placeholder="Filter… (e.g. pis, dom, -ać)" lang="pl" autocomplete="off">`;
    groupsOf.forEach(([pos, title]) => {
      const list = Object.values(PL.LEX).filter(L => L.pos === pos && !L.hidden).sort((a, b) => a.lemma.localeCompare(b.lemma, 'pl'));
      if (!list.length) return;
      html += `<h3 class="ref-sub">${title} <span class="h-sub">${list.length}</span></h3><div class="lex-list">`;
      html += list.map(L => `<a href="#" class="lex-chip" data-lex="${esc(L.lemma)}" data-search="${esc(PL.stripDiacritics(PL.norm(`${L.lemma} ${L.m || ''}`)))}">${esc(L.lemma)}<span>${esc(L.m || '')}</span></a>`).join('');
      html += '</div>';
    });
    return html;
  }

  function filterLex(q) {
    const n = PL.stripDiacritics(PL.norm(q)).replace(/^-/, '');
    document.querySelectorAll('.lex-chip').forEach(a => {
      a.style.display = !n || a.dataset.search.includes(n) ? '' : 'none';
    });
  }

  /* ══ Toast ══ */

  let toastTimer = null;
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }

  return {
    popupOpen, openPopup, closePopup, popupHint, popupNest, popupLexeme,
    renderProgress, renderReference, toast, patternHTML,
    setOnChange(fn) { onChange = fn; },
  };
})();
