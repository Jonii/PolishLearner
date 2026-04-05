/* ═══════════════════════════════════════════════════════════════
   ui.js — DOM rendering (reads from SRS.state, never writes localStorage)

   Depends on: WORDS (data.js), SRS (srs.js)

   Exports (all global):
     UI.renderWordNav()
     UI.renderStats()
     UI.showParadigm(wordId)
     UI.updateProgressBar()
     UI.renderCard(sentence, skill, callbacks)
       callbacks: { onCorrect(usedF1, usedF2), onWrong() }
     UI.addTrail(sentence, wrongs, word, usedF1, usedF2)
     UI.showEmpty(onContinue)
     UI.showUnlockToast(wordId)
     UI.openPopup(wordId)
     UI.closePopup()
     UI.currentParadigmWordId  (read-only)
   ═══════════════════════════════════════════════════════════════ */

const UI = (() => {
  let currentParadigmWordId = null;
  let paradigmOpen = false;

  // ── Word nav pills ──

  function renderWordNav() {
    const nav = document.getElementById('wordNav');
    nav.innerHTML = '';
    WORDS.forEach(w => {
      const pill = document.createElement('div');
      const unlocked = SRS.state.unlockedWords.includes(w.id);
      const mastery = unlocked ? SRS.getWordMastery(w.id) : 0;
      pill.className = `word-pill ${unlocked ? 'unlocked' : 'locked'} ${w.id === currentParadigmWordId ? 'active' : ''}`;
      pill.textContent = w.base;
      pill.innerHTML += `<div class="pill-mastery" style="width:${mastery * 100}%"></div>`;
      if (unlocked) {
        pill.addEventListener('click', () => {
          showParadigm(w.id);
          renderWordNav();
        });
      }
      nav.appendChild(pill);
    });
  }

  // ── Session stats ──

  function renderStats() {
    const s = SRS.state;
    let html = `<span class="stat-item"><span class="stat-num">${s.sessionReviewed}</span> reviewed</span>`;
    html += `<span class="stat-item"><span class="stat-num">${SRS.getDueCount()}</span> due</span>`;
    if (s.streak >= 5) html += `<span class="stat-item">🔥 <span class="stat-num">${s.streak}</span></span>`;
    document.getElementById('sessionStats').innerHTML = html;
  }

  // ── Paradigm panel ──

  function showParadigm(wordId) {
    currentParadigmWordId = wordId;
    const w = WORDS.find(x => x.id === wordId);
    if (!w) return;
    document.getElementById('paradigmToggleLeft').innerHTML =
      `<span class="p-word">${w.base}</span><span class="p-meta">${w.pos}</span><span class="p-meaning">"${w.meaning}"</span>`;
    document.getElementById('paradigmBody').innerHTML = buildParadigmHTML(w);
  }

  function buildParadigmHTML(w) {
    const p = w.paradigm;
    let h = '';
    if (p.type === "noun") {
      h += buildTable("Singular", p.singular, w.id, "noun");
      h += buildTable("Plural", p.plural, w.id, "noun");
    } else if (p.type === "verb") {
      h += buildTable("Present", p.present, w.id, "verb");
      if (p.past_masc) h += buildTable("Past — masc.", p.past_masc, w.id, "verb");
      if (p.past_fem) h += buildTable("Past — fem./neut.", p.past_fem, w.id, "verb");
    } else if (p.type === "adj") {
      const labels = { masc: "Masculine", fem: "Feminine", neut: "Neuter", pl: "Plural" };
      ["masc", "fem", "neut", "pl"].forEach(k => {
        if (p[k]) h += buildTable(labels[k], p[k], w.id, "adj");
      });
    }
    return h;
  }

  function skillMark(wordId, skill) {
    const x = SRS.state.skills[SRS.skillKey(wordId, skill)];
    if (!x) return '';
    if (x.level >= 3) return '<span class="skill-check">✓✓</span>';
    if (x.level >= 2) return '<span class="skill-check">✓</span>';
    return '';
  }

  function buildTable(label, rows, wordId, type) {
    const cols = type === "noun"
      ? '<th>Case</th><th>Question</th><th>Form</th><th>Used for</th>'
      : type === "verb"
        ? '<th>Person</th><th>Pronoun</th><th>Form</th>'
        : '<th>Case</th><th>Form</th><th></th>';

    let t = `<table class="paradigm" style="margin-bottom:0.8rem">
      <thead>
        <tr><th colspan="4" style="color:var(--ink);font-family:'IBM Plex Sans';font-size:0.73rem;text-transform:none;letter-spacing:0;padding-bottom:0.3rem">${label}</th></tr>
        <tr>${cols}</tr>
      </thead><tbody>`;

    rows.forEach((r, i) => {
      const m = skillMark(wordId, r.skill);
      const cls = i % 2 ? 'highlight-row' : '';
      if (type === "noun") {
        t += `<tr class="${cls}"><td class="case-name">${r.abbr}</td><td class="case-question">${r.question}</td><td class="case-form">${r.form}${m}</td><td class="case-usage">${r.usage}</td></tr>`;
      } else if (type === "verb") {
        t += `<tr class="${cls}"><td class="case-name">${r.abbr}</td><td class="case-question">${r.question}</td><td class="case-form">${r.form}${m}</td></tr>`;
      } else {
        t += `<tr class="${cls}"><td class="case-name">${r.abbr}</td><td class="case-form">${r.form}${m}</td><td class="case-usage">${r.usage || ''}</td></tr>`;
      }
    });
    return t + '</tbody></table>';
  }

  function updateProgressBar() {
    if (!currentParadigmWordId) return;
    const mastery = SRS.getWordMastery(currentParadigmWordId);
    document.getElementById('progressFill').style.width = `${mastery * 100}%`;
  }

  // ── Paradigm popup (F1) ──

  function openPopup(wordId) {
    const w = WORDS.find(x => x.id === wordId);
    if (!w) return;
    document.getElementById('paradigmPopupInner').innerHTML =
      `<button class="popup-close" onclick="UI.closePopup()">✕</button>` +
      `<h3>${w.base} <span style="font-weight:400;font-size:0.82rem;color:var(--muted)">${w.pos} — "${w.meaning}"</span></h3>` +
      buildParadigmHTML(w);
    document.getElementById('paradigmPopup').classList.add('show');
  }

  function closePopup() {
    document.getElementById('paradigmPopup').classList.remove('show');
  }

  // ── Unlock toast ──

  function showUnlockToast(wordId) {
    const w = WORDS.find(x => x.id === wordId);
    if (!w) return;
    const toast = document.getElementById('unlockToast');
    toast.textContent = `🔓 New word unlocked: ${w.base} — "${w.meaning}"`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // ── Flashcard rendering ──

  function renderCard(sentence, skill, callbacks) {
    const area = document.getElementById('flashcardArea');
    const existing = area.querySelector('.sentence-card');
    if (existing) {
      existing.classList.remove('visible');
      existing.classList.add('exiting');
      setTimeout(() => buildCard(sentence, skill, callbacks), 250);
    } else {
      buildCard(sentence, skill, callbacks);
    }
  }

  function buildCard(sentence, skill, callbacks) {
    const area = document.getElementById('flashcardArea');
    const word = WORDS.find(w => w.id === skill.wordId);
    const level = skill.level;
    const levelLabels = ['new', 'learning', 'familiar', 'mastered'];

    area.innerHTML = `
      <div class="sentence-card entering" id="activeCard">
        <div class="card-word-label">
          <span>${word.base}</span>
          <span class="skill-level-badge">${levelLabels[level] || ''}</span>
        </div>
        <div class="sentence-line">
          ${sentence.before ? `<span class="sentence-word">${sentence.before}</span>` : ''}
          <span class="blank-wrap"><input class="blank" id="activeInput" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="?" /></span>
          ${sentence.after ? `<span class="sentence-word">${sentence.after}</span>` : ''}
        </div>
        <div class="translation">${sentence.translation}</div>
        <div class="card-actions">
          <button class="check-btn" id="activeBtn">Check</button>
          <div class="hint-keys">
            <button class="hint-key" id="hintF1" title="Show paradigm table (F1)"><kbd>F1</kbd>table</button>
            <button class="hint-key" id="hintF2" title="Show which case/form (F2)"><kbd>F2</kbd>case</button>
          </div>
        </div>
        <div class="hint-text" id="activeHint"></div>
      </div>`;

    const card = document.getElementById('activeCard');
    const inp = document.getElementById('activeInput');
    const btn = document.getElementById('activeBtn');
    const hint = document.getElementById('activeHint');
    const f1Btn = document.getElementById('hintF1');
    const f2Btn = document.getElementById('hintF2');
    let answered = false, wrongThisRound = 0, usedF1 = false, usedF2 = false;

    // Animate in
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.classList.remove('entering');
      card.classList.add('visible');
      inp.focus();
    }));

    // F1: show paradigm table popup
    f1Btn.addEventListener('click', () => {
      if (answered) return;
      usedF1 = true;
      f1Btn.classList.add('used');
      openPopup(skill.wordId);
    });

    // F2: reveal which case/form (NOT the answer)
    f2Btn.addEventListener('click', () => {
      if (answered) return;
      usedF2 = true;
      f2Btn.classList.add('used');
      hint.innerHTML = `<span class="case-tag-revealed">${sentence.skill}</span> ${sentence.hint}`;
      hint.className = 'hint-text';
      inp.focus();
    });

    function doCheck() {
      if (answered) return;
      const val = inp.value.trim().toLowerCase();
      const correct = sentence.blank.toLowerCase();

      if (val === correct) {
        answered = true;
        inp.classList.add('correct');
        card.classList.add('correct');
        btn.textContent = '✓';
        btn.classList.add('done');
        hint.innerHTML = `<span class="case-tag-revealed">${sentence.skill}</span> ${sentence.hint}`;
        hint.className = 'hint-text show-correct';
        inp.disabled = true;
        callbacks.onCorrect(usedF1, usedF2, wrongThisRound);
      } else {
        wrongThisRound++;
        if (wrongThisRound === 1) callbacks.onWrong();
        inp.classList.add('wrong');
        card.classList.add('wrong-flash', 'shaking');
        if (!usedF2) hint.textContent = 'Not quite — try again';
        else hint.innerHTML = `<span class="case-tag-revealed">${sentence.skill}</span> ${sentence.hint} — try again`;
        hint.className = 'hint-text show-wrong';
        setTimeout(() => {
          inp.classList.remove('wrong');
          card.classList.remove('wrong-flash', 'shaking');
          inp.value = '';
          inp.focus();
        }, 550);
      }
    }

    btn.addEventListener('click', doCheck);
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') doCheck();
      else if (e.key === 'F1') { e.preventDefault(); f1Btn.click(); }
      else if (e.key === 'F2') { e.preventDefault(); f2Btn.click(); }
    });
  }

  // ── Answer trail ──

  function addTrail(sentence, wrongs, word, usedF1, usedF2) {
    const trail = document.getElementById('completedTrail');
    const item = document.createElement('div');
    item.className = 'trail-item';
    const full = `${sentence.before} <span class="trail-answer">${sentence.blank}</span> ${sentence.after}`.trim();
    const miss = wrongs > 0 ? `<span class="trail-mistake">${wrongs}×</span>` : '';
    const hints = (usedF1 || usedF2)
      ? `<span class="trail-hints">${usedF1 ? 'F1' : ''}${usedF1 && usedF2 ? '+' : ''}${usedF2 ? 'F2' : ''}</span>`
      : '';
    item.innerHTML = `<span class="trail-check">✓</span><span class="trail-sentence">${full}</span>${miss}${hints}<span class="trail-case">${sentence.skill}</span>`;
    trail.prepend(item);
    while (trail.children.length > 25) trail.removeChild(trail.lastChild);
  }

  // ── Empty / all-done state ──

  function showEmpty(onContinue) {
    document.getElementById('flashcardArea').innerHTML = `
      <div style="text-align:center;padding:2rem">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.2rem;margin-bottom:0.4rem">Świetna robota!</h3>
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:1rem">All skills reviewed for now.</p>
        <button class="check-btn" id="continueBtn" style="border-color:var(--accent);color:var(--accent)">Continue</button>
      </div>`;
    document.getElementById('continueBtn').addEventListener('click', onContinue);
  }

  // ── Paradigm toggle setup ──

  function initToggle() {
    document.getElementById('paradigmToggle').addEventListener('click', () => {
      paradigmOpen = !paradigmOpen;
      document.getElementById('paradigmWrap').classList.toggle('open', paradigmOpen);
    });
  }

  // ── Public API ──

  return {
    get currentParadigmWordId() { return currentParadigmWordId; },
    renderWordNav,
    renderStats,
    showParadigm,
    updateProgressBar,
    renderCard,
    addTrail,
    showEmpty,
    showUnlockToast,
    openPopup,
    closePopup,
    initToggle,
  };
})();
