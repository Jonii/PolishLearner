/* ═══════════════════════════════════════════════════════════════
   card.js — The practice card

   One card = one item. Flow:
     ask  → the learner types / picks; wrong attempts stay on the card
     done → feedback (answer, rule, word anatomy, notes) and a Next
            button. Nothing advances on its own: Enter or Next moves on.

   Hints (each one lowers the credit for the card a little):
     F2  Rule     — the rule behind the blank
     F1  Table    — the pattern (endings on a model word, prefix map, …)
     F3  Options  — turns typing into multiple choice
         Show     — reveal the answer (counts as missed)

   Depends on: PL, SRS, Input, Views (for popups)
   Exports: Card (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const Card = (() => {
  'use strict';

  const esc = PL.esc;
  const md = PL.md;
  let cur = null;          // the card being shown
  let onFinished = null;   // called with (item, result) when the learner presses Next

  /* ── Small render helpers ── */

  function nl(s) { return esc(s).replace(/\n/g, '<br>'); }

  function sentence(it, mode) {
    const pre = nl(it.pre || '');
    const post = nl(it.post || '');
    let mid;
    if (mode === 'input') mid = `<span class="blank-wrap"><input class="blank" id="cardInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="pl" aria-label="Answer" /></span>`;
    else if (mode === 'mark') mid = `<mark class="hl">${esc(it.word)}</mark>`;
    else if (mode === 'gap') mid = `<span class="gap">…</span>`;
    else mid = `<strong class="ans">${esc(mode)}</strong>`;     // the answer filled in (Reference examples)
    return `${pre}${mid}${post}`;
  }

  function moduleTitle(id) { return (PL.MODULE[id] || {}).t || id; }

  // Word anatomy chips:  pod- | pis | -ać   →  [pod][pis][ać] with glosses underneath
  function anatomy(seg, nestId, member, all) {
    if (!seg) return '';
    const nest = nestId != null ? PL.NEST[nestId] : null;
    const mem = nest && member != null ? nest.members[member] : null;
    const parts = seg.split('|');
    const own = mem && mem.gl ? mem.gl : null;
    const html = parts.map((p, i) => {
      let role = 'root', text = p;
      if (p.length > 2 && p.startsWith('-') && p.endsWith('-')) { role = 'link'; text = p.slice(1, -1); }
      else if (p.endsWith('-')) { role = 'pfx'; text = p.slice(0, -1); }
      else if (p.startsWith('-')) { role = 'sfx'; text = p.slice(1); }
      let gloss = own ? (own[i] || '') : '';
      if (!own) {
        if (role === 'root') {
          gloss = (nest && nest.roots && nest.roots[p])
            || (nest && nest.root.replace(/-/g, '') === p ? nest.gloss : '')
            || PL.AFFIX[p] || '';
        } else {
          gloss = PL.AFFIX[p] || '';
        }
      }
      if (!all && role !== 'root') gloss = '';
      return `<span class="m-chip ${role}"><span class="m-text">${esc(text)}</span>${gloss ? `<span class="m-gloss">${esc(gloss)}</span>` : ''}</span>`;
    });
    return `<div class="anatomy">${html.join('')}</div>`;
  }

  /* ── Card construction ── */

  function show(pick, finished) {
    onFinished = finished;
    const area = document.getElementById('cardArea');
    const old = area.querySelector('.card');
    if (old) {
      old.classList.add('exiting');
      setTimeout(() => build(pick), 180);
    } else {
      build(pick);
    }
  }

  function build(pick) {
    const { item: it, rule, level, isNew } = pick;
    cur = {
      it, rule, level, isNew, state: 'ask', wrongs: 0, usedRule: false, usedTable: false,
      usedOpts: false, revealed: false, nearMiss: false, result: null, opts: null, doneAt: 0,
    };
    const typed = it.fmt === 'type';
    const area = document.getElementById('cardArea');
    const lv = ['new', 'learning', 'familiar', 'mastered'][level];

    let body = '';
    let q = it.q ? `<div class="card-q">${md(it.q)}</div>` : '';
    let showTr = true;
    let cue = '';

    switch (it.type) {
      case 'cloze':
        cue = it.cue ? `<span class="cue" title="the word to use">(${esc(it.cue)})</span>` : '';
        body = `<div class="sentence">${sentence(it, 'input')} ${cue}</div>`;
        break;
      case 'build':
        body = `<div class="build-line">
            <span class="from"><span class="from-w">${esc(it.cue)}</span>${it.cueM ? `<span class="from-m">${esc(it.cueM)}</span>` : ''}</span>
            <span class="arrow">→</span>
            <span class="blank-wrap"><input class="blank wide" id="cardInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="pl" aria-label="Answer" /></span>
          </div>
          <div class="target-m">‘${esc(it.tr)}’</div>`;
        showTr = false;
        break;
      case 'decode':
        if (it.ctx) {
          body = `<div class="sentence">${sentence(it, 'mark')}</div>${anatomy(it.seg, it.nest, it.member, false)}`;
        } else {
          body = `<div class="word-big">${esc(it.word)}</div>${anatomy(it.seg, it.nest, it.member, false)}`;
        }
        showTr = false;
        break;
      case 'identify':
        body = `<div class="sentence">${sentence(it, 'mark')}</div>`;
        break;
      case 'lemma':
        if (it.root) {
          body = `<div class="build-line">
              <span class="from"><span class="from-w big">${esc(it.word)}</span><span class="from-m">${esc(it.tr)}</span></span>
              <span class="arrow">←</span>
              <span class="blank-wrap"><input class="blank" id="cardInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="pl" aria-label="Base word" /></span>
            </div>${anatomy(it.seg, it.nest, it.member, false)}`;
          showTr = false;
        } else {
          body = `<div class="sentence">${sentence(it, 'mark')}</div>
            <div class="build-line"><span class="from"><span class="from-w">${esc(it.word)}</span></span><span class="arrow">→</span>
            <span class="blank-wrap"><input class="blank" id="cardInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="pl" aria-label="Dictionary form" /></span></div>`;
        }
        break;
      case 'meaning':
        body = `<div class="word-big phrase">${esc(it.word)}</div>`;
        showTr = false;
        break;
      case 'respond':
        body = it.pre || it.post ? `<div class="sentence dialogue">${sentence(it, 'gap')}</div>` : '';
        showTr = !!it.showTr;
        break;
      case 'say':
        body = `<div class="build-line"><span class="blank-wrap"><input class="blank wide" id="cardInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="pl" aria-label="Answer" /></span></div>`;
        showTr = false;
        break;
    }

    const intro = isNew ? `<div class="card-intro">
        <div class="intro-label">New rule</div>
        <div class="intro-title">${md(rule.t)}</div>
        ${rule.x ? `<div class="intro-text">${md(rule.x)}</div>` : ''}
      </div>` : '';

    const tr = showTr && it.tr ? `<div class="translation">${esc(it.tr)}</div>` : '';
    const hasTable = !!tableFor(it);

    area.innerHTML = `
      <div class="card entering" id="card" tabindex="-1" data-type="${it.type}">
        <div class="card-top">
          <span class="card-mod">${esc(moduleTitle(it.module))}</span>
          ${cur.isNew ? '' : `<span class="card-level ${lv}">${lv}</span>`}
        </div>
        ${intro}
        ${q}
        ${body}
        ${tr}
        <div class="options" id="cardOpts" role="group" aria-label="Options"></div>
        <div class="card-actions" id="cardActions">
          ${typed ? '<button class="check-btn" id="checkBtn" type="button">Check</button>' : ''}
          <div class="hint-keys">
            ${isNew ? '' : '<button class="hint-key" id="hintRule" type="button" title="Show the rule (F2)"><kbd>F2</kbd>rule</button>'}
            ${hasTable ? '<button class="hint-key" id="hintTable" type="button" title="Show the pattern table (F1)"><kbd>F1</kbd>table</button>' : ''}
            ${typed ? '<button class="hint-key" id="hintOpts" type="button" title="Show options (F3)"><kbd>F3</kbd>options</button>' : ''}
            <button class="hint-key reveal" id="hintShow" type="button" title="Show the answer">show</button>
          </div>
        </div>
        <div class="hint-text" id="hintText" aria-live="polite"></div>
        <div class="feedback" id="feedback" aria-live="polite"></div>
      </div>`;

    const card = document.getElementById('card');
    const input = document.getElementById('cardInput');
    if (input) {
      Input.attach(input);
      document.getElementById('cardActions').insertBefore(Input.bar(input), document.querySelector('.hint-keys'));
      document.getElementById('checkBtn').addEventListener('click', () => check(input.value));
      input.addEventListener('input', () => input.classList.remove('wrong'));
    }
    if (!typed) showOptions();
    const bind = (id, fn) => { const b = document.getElementById(id); if (b) b.addEventListener('click', fn); };
    bind('hintRule', hintRule);
    bind('hintTable', hintTable);
    bind('hintOpts', hintOptions);
    bind('hintShow', reveal);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.classList.remove('entering');
      if (input) input.focus({ preventScroll: true });
      else card.focus({ preventScroll: true });
    }));
  }

  /* ── Options (multiple choice) ── */

  function showOptions() {
    const box = document.getElementById('cardOpts');
    if (!box || cur.opts) return;
    const opts = PL.optionsFor(cur.it);
    if (!opts) { box.innerHTML = '<span class="muted">No options for this one.</span>'; return; }
    cur.opts = opts;
    box.innerHTML = opts.map((o, i) =>
      `<button class="opt" type="button" data-i="${i}"><kbd>${i + 1}</kbd><span>${esc(o)}</span></button>`).join('');
    box.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => pickOption(+b.dataset.i)));
  }

  function pickOption(i) {
    if (!cur || cur.state !== 'ask' || !cur.opts || i >= cur.opts.length) return;
    const btn = document.querySelector(`.opt[data-i="${i}"]`);
    if (!btn || btn.disabled) return;
    if (cur.it.fmt === 'type') {
      const input = document.getElementById('cardInput');
      if (input) input.value = cur.opts[i];
    }
    if (isRight(cur.opts[i])) {
      btn.classList.add('right');
      done(false);
    } else {
      btn.classList.add('wrong');
      btn.disabled = true;
      miss(cur.opts[i], true);
    }
  }

  /* ── Checking ── */

  function answers() {
    return [cur.it.a].concat(cur.it.alt || []);
  }

  function isRight(v) {
    const n = PL.norm(v);
    return answers().some(a => PL.norm(a) === n);
  }

  function isNearMiss(v) {
    const n = PL.stripDiacritics(PL.norm(v));
    return answers().some(a => PL.stripDiacritics(PL.norm(a)) === n);
  }

  function check(value) {
    if (!cur || cur.state !== 'ask') return;
    if (!PL.norm(value)) return;
    if (isRight(value)) { done(false); return; }
    if (!cur.nearMiss && isNearMiss(value)) {
      cur.nearMiss = true;
      setHint('Almost — only the Polish letters differ. Check ą ę ó ł ś ć ń ź ż.', 'near');
      const input = document.getElementById('cardInput');
      if (input) input.focus();
      return;
    }
    miss(value, false);
  }

  function miss(value, fromOption) {
    cur.wrongs++;
    const card = document.getElementById('card');
    const input = document.getElementById('cardInput');
    card.classList.remove('shaking');
    void card.offsetWidth;
    card.classList.add('shaking', 'wrong-flash');
    setTimeout(() => card.classList.remove('wrong-flash'), 600);
    setHint(diagnose(value, fromOption), 'wrong');
    if (input && !fromOption) {
      input.classList.add('wrong');
      input.select();
    }
    if (cur.wrongs >= 2) document.getElementById('hintShow').classList.add('pulse');
  }

  // Explain what the wrong answer actually is, when we can tell.
  function diagnose(value, fromOption) {
    const it = cur.it;
    const v = PL.norm(value);
    if (fromOption && (it.type === 'decode' || it.type === 'meaning' || it.type === 'identify' || it.type === 'respond')) {
      return 'Not that one — try again.';
    }
    if (it.type === 'lemma') {
      if (PL.LEX[v]) return `*${value}* is a dictionary word, but not the one this form comes from.`;
      return 'Not quite. The dictionary form is the infinitive for verbs and the nominative singular for nouns.';
    }
    // another member of the same word family?
    if (it.nest != null) {
      const nest = PL.NEST[it.nest];
      const other = nest.members.find(m => PL.norm(m.w) === v);
      if (other) return `*${other.w}* means ‘${other.m}’ — close family, wrong member.`;
    }
    const hits = PL.FORM_INDEX[v] || [];
    const same = hits.filter(h => h.lemma === it.lemma);
    if (same.length) {
      const L = PL.LEX[it.lemma];
      const labels = [...new Set(same.map(h => PL.formLabel(L, h.key)))];
      return `*${value}* is the ${labels.slice(0, 2).join(' / ')} of *${it.lemma}* — this slot needs a different form.`;
    }
    if (hits.length) {
      const h = hits[0];
      const L = PL.LEX[h.lemma];
      if (L && L.base && it.lemma && PL.LEX[it.lemma] && PL.LEX[it.lemma].base === L.base) {
        return `*${value}* is a form of *${h.lemma}* (‘${L.m}’) — right root, different prefix.`;
      }
      return `*${value}* is a real word (${PL.formLabel(L, h.key)} of *${h.lemma}*), but not the one needed here.`;
    }
    return 'Not quite — try again.';
  }

  function setHint(text, kind) {
    const h = document.getElementById('hintText');
    if (!h) return;
    h.className = `hint-text ${kind ? 'show-' + kind : ''}`;
    h.innerHTML = md(text);
  }

  /* ── Hints ── */

  function hintRule() {
    if (!cur || cur.state !== 'ask') return;
    cur.usedRule = true;
    const b = document.getElementById('hintRule');
    if (b) b.classList.add('used');
    const r = cur.rule;
    const h = document.getElementById('hintText');
    h.className = 'hint-text show-rule';
    h.innerHTML = `<span class="rule-tag">${esc(ruleTag(r))}</span> <strong>${md(r.t)}</strong>${r.x ? `<div class="rule-x">${md(r.x)}</div>` : ''}`;
    focusInput();
  }

  function tableFor(it) {
    if (it.type === 'meaning' || it.type === 'respond' || it.type === 'say') return { kind: 'phrases' };
    if (it.type === 'lemma') return { kind: 'alternations' };
    if (it.nest != null) return { kind: 'affixes' };
    const p = PL.patternFor(it);
    return p ? { kind: 'pattern', p } : null;
  }

  function hintTable() {
    if (!cur || cur.state !== 'ask') return;
    const t = tableFor(cur.it);
    if (!t) return;
    cur.usedTable = true;
    const b = document.getElementById('hintTable');
    if (b) b.classList.add('used');
    Views.popupHint(t, cur.it);
  }

  function hintOptions() {
    if (!cur || cur.state !== 'ask' || cur.it.fmt !== 'type') return;
    cur.usedOpts = true;
    const b = document.getElementById('hintOpts');
    if (b) b.classList.add('used');
    showOptions();
    focusInput();
  }

  function focusInput() {
    const input = document.getElementById('cardInput');
    if (input) input.focus({ preventScroll: true });
  }

  function reveal() {
    if (!cur || cur.state !== 'ask') return;
    cur.revealed = true;
    done(true);
  }

  function ruleTag(r) {
    const g = PL.GROUP[r.group];
    return g ? g.t : moduleTitle(r.module);
  }

  /* ── Done: record + feedback ── */

  function resultOf() {
    if (cur.revealed || cur.wrongs > 0) return 'wrong';
    if (cur.usedOpts) return 'choice';
    if (cur.usedRule || cur.usedTable) return 'hint';
    return 'clean';
  }

  function done(revealed) {
    cur.state = 'done';
    cur.doneAt = Date.now();
    cur.result = resultOf();
    SRS.record(cur.it, cur.result);
    const it = cur.it;
    const card = document.getElementById('card');
    card.classList.add(revealed ? 'revealed' : 'correct');
    const input = document.getElementById('cardInput');
    if (input) {
      input.value = it.a;
      input.disabled = true;
      input.classList.remove('wrong');
      input.classList.add(revealed ? 'shown' : 'correct');
      autosize(input);
    }
    document.querySelectorAll('.opt').forEach(b => {
      b.disabled = true;
      if (cur.opts && isRight(cur.opts[+b.dataset.i])) b.classList.add('right');
    });
    document.getElementById('cardActions').classList.add('finished');
    document.getElementById('hintText').innerHTML = '';
    renderFeedback(revealed);
  }

  function answerLabel(it) {
    const L = PL.LEX[it.lemma];
    if (it.type === 'cloze' && L) {
      let keys = PL.keysOf(L.lemma, it.a);
      const kind = cur.rule.kind;
      if (kind && keys.length > 1) {
        const k2 = keys.filter(k => k.endsWith('.' + kind) || k === kind);
        if (k2.length) keys = k2;
      }
      const labels = [...new Set(keys.map(k => PL.formLabel(L, k)))].slice(0, 2);
      if (!labels.length) return '';
      return `${labels.join(' / ')} of *${L.lemma}*${L.m ? ` ‘${L.m}’` : ''}`;
    }
    if (it.type === 'identify') return it.idCase ? `${PL.CASE_NAME[it.idCase]} — ${PL.CASE_PL[it.idCase]}` : '';
    if (it.type === 'lemma' && it.root) return `${it.word} ← ${it.a}`;
    if (it.type === 'lemma') return `${it.word} → ${it.a}${L && L.m ? ` ‘${L.m}’` : ''}`;
    return '';
  }

  function renderFeedback(revealed) {
    const it = cur.it;
    const fb = document.getElementById('feedback');
    const ok = !revealed;
    const verdict = revealed ? 'The answer:' : { clean: 'Correct!', hint: 'Correct (with a hint)', choice: 'Correct (from options)', wrong: 'Got there' }[cur.result];
    const icon = revealed ? '✗' : cur.result === 'clean' ? '✓' : cur.result === 'wrong' ? '↻' : '✓';
    let head = '';
    let full = '';

    switch (it.type) {
      case 'cloze':
      case 'lemma':
      case 'identify': {
        // The sentence (and its translation) is already on the card above.
        head = `<span class="fb-answer">${esc(it.a)}</span>`;
        const lab = answerLabel(it);
        if (lab) head += `<span class="fb-label">${md(lab)}</span>`;
        break;
      }
      case 'build':
        head = `<span class="fb-answer">${esc(it.a)}</span><span class="fb-label">‘${esc(it.tr)}’${it.lit ? ` — literally ‘${esc(it.lit)}’` : ''}</span>`;
        break;
      case 'decode':
        head = `<span class="fb-answer">${esc(it.ctx ? it.base : it.word)}</span><span class="fb-label">‘${esc(it.a)}’${it.lit ? ` — literally ‘${esc(it.lit)}’` : ''}</span>`;
        if (it.ctx) full = `<div class="fb-tr">${esc(it.tr)}</div>`;
        break;
      case 'meaning':
        head = `<span class="fb-answer">${esc(it.word)}</span><span class="fb-label">‘${esc(it.a)}’${it.lit ? ` — literally ‘${esc(it.lit)}’` : ''}</span>`;
        break;
      case 'respond': {
        head = `<span class="fb-answer">${esc(it.a)}</span>`;
        const gap = document.querySelector('#card .gap');
        if (gap) gap.outerHTML = `<strong class="ans">${esc(it.a)}</strong>`;
        if (it.tr && !it.showTr) full = `<div class="fb-tr">${nl(it.tr)}</div>`;
        break;
      }
      case 'say':
        head = `<span class="fb-answer">${esc(it.a)}</span><span class="fb-label">‘${esc(it.tr)}’${it.lit ? ` — literally ‘${esc(it.lit)}’` : ''}</span>`;
        break;
    }

    // Word anatomy with every gloss: upgrade the chips already on the card, or add them here.
    let anat = '';
    if (it.seg) {
      const shown = document.querySelector('#card > .anatomy');
      if (shown) shown.outerHTML = anatomy(it.seg, it.nest, it.member, true);
      else anat = anatomy(it.seg, it.nest, it.member, true);
    }
    const family = it.nest != null ? `<button class="link-btn" id="fbFamily" type="button">see the whole family: ${esc(PL.NEST[it.nest].root)} ‘${esc(PL.NEST[it.nest].gloss)}’ →</button>` : '';
    const r = cur.rule;
    const speakText = speechText(it);

    fb.innerHTML = `
      <div class="fb-head ${ok ? 'ok' : 'missed'}">
        <span class="fb-icon">${icon}</span><span class="fb-verdict">${esc(verdict)}</span>
        ${head}
        ${speakText && Speech.available() ? '<button class="speak-btn" id="fbSpeak" type="button" title="Listen">🔊</button>' : ''}
      </div>
      ${full}
      ${anat}
      ${it.note ? `<div class="fb-note">${md(it.note)}</div>` : ''}
      <div class="fb-rule"><span class="rule-tag">${esc(ruleTag(r))}</span> <strong>${md(r.t)}</strong>${!cur.isNew && r.x ? `<div class="rule-x">${md(r.x)}</div>` : ''}</div>
      <div class="fb-foot">
        ${family}
        <button class="next-btn" id="nextBtn" type="button">Next <span aria-hidden="true">→</span></button>
      </div>`;

    document.getElementById('nextBtn').addEventListener('click', next);
    const sp = document.getElementById('fbSpeak');
    if (sp) sp.addEventListener('click', () => Speech.say(speakText));
    const fam = document.getElementById('fbFamily');
    if (fam) fam.addEventListener('click', () => Views.popupNest(it.nest, it.member));
    requestAnimationFrame(() => document.getElementById('nextBtn').focus({ preventScroll: true }));
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function speechText(it) {
    if (it.type === 'cloze') return `${it.pre}${it.a}${it.post}`;
    if (it.type === 'identify' || it.type === 'lemma') return `${it.pre}${it.word}${it.post}`;
    if (it.type === 'decode') return it.ctx ? `${it.pre}${it.word}${it.post}` : it.word;
    if (it.type === 'build') return it.a;
    if (it.type === 'meaning') return it.word;
    if (it.type === 'respond') return `${it.pre}${it.a}${it.post}`;
    if (it.type === 'say') return it.a;
    return '';
  }

  function autosize(input) {
    input.style.width = `${Math.max(5, input.value.length + 1)}ch`;
  }

  function next() {
    if (!cur || cur.state !== 'done') return;
    cur.state = 'gone';
    if (onFinished) onFinished(cur.it, cur.result);
  }

  /* ── Keyboard ── */

  function onKey(e) {
    if (!cur) return;
    if (Views.popupOpen()) return;
    const state = cur.state;
    const typed = cur.it.fmt === 'type';
    if (e.key === 'F1') { e.preventDefault(); if (state === 'ask') hintTable(); return; }
    if (e.key === 'F2') { e.preventDefault(); if (state === 'ask') hintRule(); return; }
    if (e.key === 'F3') { e.preventDefault(); if (state === 'ask') hintOptions(); return; }
    if (state === 'ask') {
      if (e.key === 'Enter' && typed) {
        e.preventDefault();
        const input = document.getElementById('cardInput');
        if (input) check(input.value);
        return;
      }
      if (/^[1-9]$/.test(e.key) && cur.opts && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        pickOption(+e.key - 1);
      }
    } else if (state === 'done' && e.key === 'Enter') {
      // Let other buttons in the feedback (family, listen) work normally.
      const ae = document.activeElement;
      if (ae && ae.tagName === 'BUTTON' && ae.id !== 'nextBtn') return;
      e.preventDefault();
      // Ignore a held key or an accidental double tap right after answering.
      if (e.repeat || Date.now() - cur.doneAt < 350) return;
      next();
    }
  }

  function active() { return cur; }

  return { show, onKey, active, anatomy, sentence };
})();

/* ── Speech (browser text-to-speech, only if a Polish voice exists) ── */

const Speech = (() => {
  'use strict';
  let voice = null;

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    voice = voices.find(v => /^pl(-|_|$)/i.test(v.lang)) || null;
  }

  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
  }

  return {
    available: () => !!voice,
    say(text) {
      if (!voice || !text) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[—–]/g, ',').replace(/\n/g, ' '));
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    },
  };
})();
