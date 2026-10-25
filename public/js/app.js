/* ═══════════════════════════════════════════════════════════════
   app.js — Application orchestrator

   Depends on: PL (core + compile + data), SRS, Input, Card, Views
   ═══════════════════════════════════════════════════════════════ */

const App = (() => {
  'use strict';

  const esc = PL.esc;
  let view = 'practice';
  let waitingForCard = false;

  /* ── Practice ── */

  function nextCard() {
    renderBars();
    const pick = SRS.next();
    if (!pick) {
      document.getElementById('cardArea').innerHTML =
        '<div class="empty">Nothing to practise — switch some sections back on in <a href="#progress">Progress</a>.</div>';
      return;
    }
    Card.show(pick, (item, result) => {
      addTrail(item, result);
      nextCard();
    });
  }

  function renderBars() {
    // Section switches
    const bar = document.getElementById('moduleBar');
    bar.innerHTML = PL.MODULES.filter(m => PL.RULE_LIST.some(r => r.module === m.id && r.count)).map(m => {
      const on = !SRS.state.off.modules[m.id];
      const ids = PL.RULE_LIST.filter(r => r.module === m.id && r.count).map(r => r.id);
      const c = SRS.counts(ids);
      const pct = c.total ? Math.round(100 * c.familiar / c.total) : 0;
      return `<button class="mod-pill ${on ? 'active' : ''}" data-mod="${m.id}" type="button" aria-pressed="${on}" title="${on ? 'Click to leave out' : 'Click to include'} — ${c.familiar}/${c.total} rules familiar">
        ${esc(m.t)}<span class="mod-bar"><span style="width:${pct}%"></span></span></button>`;
    }).join('');
    bar.querySelectorAll('.mod-pill').forEach(b => b.addEventListener('click', () => {
      const on = SRS.state.off.modules[b.dataset.mod];
      SRS.setModule(b.dataset.mod, !!on);
      renderBars();
      // Switching a section off while its card is showing: move on.
      const cur = Card.active();
      if (cur && cur.state === 'ask' && !SRS.isRuleOn(cur.rule)) nextCard();
    }));
    if (SRS.state.focus) bar.classList.add('dimmed'); else bar.classList.remove('dimmed');

    // Drill (focus) banner
    const fb = document.getElementById('focusBar');
    if (SRS.state.focus) {
      fb.hidden = false;
      fb.innerHTML = `<span>Drilling: <strong>${PL.md(SRS.state.focus.label)}</strong></span><button class="link-btn" id="stopFocus" type="button">back to mixed practice ✕</button>`;
      document.getElementById('stopFocus').addEventListener('click', () => {
        SRS.setFocus(null);
        nextCard();
      });
    } else {
      fb.hidden = true;
      fb.innerHTML = '';
    }

    // Stats line
    const S = SRS.state.stats;
    const today = new Date().toISOString().slice(0, 10);
    const dayN = S.day === today ? S.dayN : 0;
    let html = `<span class="stat-item"><span class="stat-num">${dayN}</span> today</span>`;
    html += `<span class="stat-item"><span class="stat-num">${SRS.dueCount()}</span> rules due</span>`;
    const all = SRS.counts(PL.RULE_LIST.filter(r => r.count).map(r => r.id));
    html += `<span class="stat-item"><span class="stat-num">${all.started}</span>/${all.total} rules met</span>`;
    if (S.run >= 5) html += `<span class="stat-item" title="clean answers in a row">🔥 <span class="stat-num">${S.run}</span></span>`;
    document.getElementById('sessionStats').innerHTML = html;
  }

  function addTrail(it, result) {
    const trail = document.getElementById('trail');
    const row = document.createElement('div');
    row.className = `trail-item ${result}`;
    const icon = { clean: '✓', hint: '✓', choice: '✓', wrong: '✗' }[result];
    let text;
    if (it.type === 'cloze') text = Card.sentence(it, it.a);
    else if (it.type === 'identify') text = `${Card.sentence(it, it.word)} <span class="muted">— ${esc(it.a)}</span>`;
    else if (it.type === 'lemma') text = `<strong class="ans">${esc(it.word)}</strong> → ${esc(it.a)}`;
    else if (it.type === 'build') text = `${esc(it.cue)} → <strong class="ans">${esc(it.a)}</strong> <span class="muted">‘${esc(it.tr)}’</span>`;
    else if (it.type === 'decode') text = `<strong class="ans">${esc(it.ctx ? it.word : it.word)}</strong> <span class="muted">‘${esc(it.a)}’</span>`;
    else if (it.type === 'meaning') text = `<strong class="ans">${esc(it.word)}</strong> <span class="muted">‘${esc(it.a)}’</span>`;
    else if (it.type === 'respond') text = (it.pre || it.post) ? Card.sentence(it, it.a).replace(/<br>/g, ' ') : `<strong class="ans">${esc(it.a)}</strong>`;
    else text = `<strong class="ans">${esc(it.a)}</strong>`;
    const r = PL.RULES[it.rule];
    row.innerHTML = `<span class="trail-check">${icon}</span><span class="trail-sentence">${text}</span>${result !== 'clean' ? `<span class="trail-res">${esc(SRS.RESULT_LABEL[result])}</span>` : ''}<span class="trail-case">${PL.md(r.t)}</span>`;
    trail.prepend(row);
    while (trail.children.length > 30) trail.removeChild(trail.lastChild);
  }

  /* ── Views ── */

  function show(v) {
    if (!['practice', 'progress', 'reference'].includes(v)) v = 'practice';
    view = v;
    document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === `view-${v}`));
    document.querySelectorAll('#tabs [data-view]').forEach(b => {
      const on = b.dataset.view === v;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on);
    });
    if (v === 'progress') Views.renderProgress();
    if (v === 'reference') Views.renderReference();
    if (v === 'practice') {
      renderBars();
      if (waitingForCard || !Card.active()) { waitingForCard = false; nextCard(); }
      else {
        const input = document.getElementById('cardInput');
        if (input && !input.disabled) input.focus({ preventScroll: true });
      }
    }
  }

  function route() {
    show((location.hash || '#practice').slice(1));
  }

  /* ── Start ── */

  function init() {
    const res = PL.compile();
    if (PL.WARNINGS.length) {
      console.warn(`Polski: ${PL.WARNINGS.length} content warnings`);
      PL.WARNINGS.slice(0, 50).forEach(w => console.warn('  ' + w));
    }
    SRS.load();
    document.getElementById('itemCount').textContent = `${PL.RULE_LIST.filter(r => r.count).length} rules · ${res.items} exercises · ${Object.values(PL.LEX).filter(l => !l.hidden).length} words with full tables`;

    document.querySelectorAll('#tabs [data-view]').forEach(b => b.addEventListener('click', () => {
      if (location.hash === `#${b.dataset.view}`) route();
      else location.hash = b.dataset.view;
    }));
    window.addEventListener('hashchange', route);

    Views.setOnChange(goTo => {
      // settings changed in Progress: the current card may no longer fit
      waitingForCard = true;
      if (goTo === 'practice') location.hash = 'practice';
    });

    const popup = document.getElementById('popup');
    popup.addEventListener('click', e => { if (e.target === popup) Views.closePopup(); });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && Views.popupOpen()) { e.preventDefault(); Views.closePopup(); return; }
      if (view === 'practice') Card.onKey(e);
    });

    route();
  }

  return { init, nextCard };
})();

App.init();
