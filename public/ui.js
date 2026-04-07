/* ═══════════════════════════════════════════════════════════════
   ui.js — DOM rendering

   Depends on: WORDS, SKILL_RULES, CASE_ORDER (data.js), SRS (srs.js)

   Exports: UI (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const UI = (() => {
  let currentWordId = null; // word of the currently shown card (for F1 popup)

  /* ── Word selector (toggle pills) ── */

  function renderWordNav() {
    const nav = document.getElementById('wordNav');
    nav.innerHTML = '';
    // Category label
    const catLabel = document.createElement('span');
    catLabel.className = 'nav-category-label';
    catLabel.textContent = 'Nouns';
    nav.appendChild(catLabel);

    WORDS.filter(w => w.category === 'noun').forEach(w => {
      const pill = document.createElement('button');
      const enabled = SRS.isWordEnabled(w.id);
      pill.className = `word-pill ${enabled ? 'active' : ''}`;
      pill.textContent = w.base;
      pill.title = `${w.meaning} — click to ${enabled ? 'disable' : 'enable'}`;
      pill.addEventListener('click', () => {
        if (enabled) {
          // Don't allow disabling the last word
          if (SRS.state.enabledWords.length <= 1) return;
          SRS.disableWord(w.id);
        } else {
          SRS.enableWord(w.id);
        }
        renderWordNav();
        renderSkillMap();
      });
      nav.appendChild(pill);
    });
  }

  /* ── Session stats ── */

  function renderStats() {
    const s = SRS.state;
    let html = `<span class="stat-item"><span class="stat-num">${s.sessionReviewed}</span> reviewed</span>`;
    html += `<span class="stat-item"><span class="stat-num">${SRS.getDueCount()}</span> due</span>`;
    if (s.streak >= 5) html += `<span class="stat-item">🔥 <span class="stat-num">${s.streak}</span></span>`;
    document.getElementById('sessionStats').innerHTML = html;
  }

  /* ── Skill map (replaces paradigm panel) ── */

  function renderSkillMap() {
    const body = document.getElementById('paradigmBody');
    const activeSkills = SRS.getActiveSkillIds();

    let html = '';
    CASE_ORDER.forEach(caseName => {
      const rules = Object.entries(SKILL_RULES)
        .filter(([id, r]) => r.case === caseName && activeSkills.includes(id));
      if (!rules.length) return;

      html += `<div class="skill-case-group">`;
      html += `<div class="skill-case-header">${caseName}</div>`;
      rules.forEach(([id, r]) => {
        const skill = SRS.state.skills[id];
        const level = skill ? skill.level : 0;
        const levelCls = ['new', 'learning', 'familiar', 'mastered'][level];
        const check = level >= 3 ? ' ✓✓' : level >= 2 ? ' ✓' : '';
        html += `<div class="skill-rule-row">
          <span class="skill-rule-label">${r.label}<span class="skill-check">${check}</span></span>
          <span class="skill-rule-level ${levelCls}">${levelCls}</span>
        </div>`;
      });
      html += `</div>`;
    });

    body.innerHTML = html;

    // Update toggle header
    const enabledCount = SRS.state.enabledWords.length;
    const totalSkills = activeSkills.length;
    const familiarCount = activeSkills.filter(id => {
      const s = SRS.state.skills[id];
      return s && s.level >= 2;
    }).length;
    document.getElementById('paradigmToggleLeft').innerHTML =
      `<span class="p-word">Grammar Rules</span>` +
      `<span class="p-meta">${familiarCount}/${totalSkills} familiar</span>` +
      `<span class="p-meaning">${enabledCount} word${enabledCount !== 1 ? 's' : ''} active</span>`;

    // Update progress bar
    const mastery = totalSkills > 0 ? familiarCount / totalSkills : 0;
    document.getElementById('progressFill').style.width = `${mastery * 100}%`;
  }

  /* ── Paradigm popup (F1) ── */

  function openPopup(wordId) {
    const w = WORDS.find(x => x.id === wordId);
    if (!w) return;
    const p = w.paradigm;
    let html = `<button class="popup-close" onclick="UI.closePopup()">✕</button>`;
    html += `<h3>${w.base} <span style="font-weight:400;font-size:0.82rem;color:var(--muted)">${w.pos} — "${w.meaning}"</span></h3>`;

    if (p.type === 'noun') {
      html += buildParadigmTable('Singular', p.singular);
      html += buildParadigmTable('Plural', p.plural);
    }
    // Future: verb/adj paradigm tables

    document.getElementById('paradigmPopupInner').innerHTML = html;
    document.getElementById('paradigmPopup').classList.add('show');
  }

  function buildParadigmTable(label, rows) {
    let t = `<table class="paradigm" style="margin-bottom:0.8rem">
      <thead><tr><th colspan="3" style="color:var(--ink);font-family:'IBM Plex Sans';font-size:0.73rem;text-transform:none;letter-spacing:0;padding-bottom:0.3rem">${label}</th></tr>
      <tr><th>Case</th><th>Question</th><th>Form</th></tr></thead><tbody>`;
    rows.forEach((r, i) => {
      t += `<tr class="${i % 2 ? 'highlight-row' : ''}">
        <td class="case-name">${r.abbr}</td>
        <td class="case-question">${r.question || ''}</td>
        <td class="case-form">${r.form}</td>
      </tr>`;
    });
    return t + '</tbody></table>';
  }

  function closePopup() {
    document.getElementById('paradigmPopup').classList.remove('show');
  }

  /* ── Flashcard ── */

  function renderCard(picked, skill, callbacks) {
    const area = document.getElementById('flashcardArea');
    const existing = area.querySelector('.sentence-card');
    if (existing) {
      existing.classList.remove('visible');
      existing.classList.add('exiting');
      setTimeout(() => buildCard(picked, skill, callbacks), 250);
    } else {
      buildCard(picked, skill, callbacks);
    }
  }

  function buildCard(picked, skill, callbacks) {
    const area = document.getElementById('flashcardArea');
    const sentence = picked.sentence;
    const word = WORDS.find(w => w.id === picked.wordId);
    currentWordId = picked.wordId;
    const level = skill.level;
    const levelLabels = ['new', 'learning', 'familiar', 'mastered'];
    const ruleInfo = SKILL_RULES[skill.skillId];

    area.innerHTML = `
      <div class="sentence-card entering" id="activeCard">
        <div class="card-word-label">
          <span>${word.base} <span style="opacity:0.5">· ${word.meaning}</span></span>
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
            <button class="hint-key" id="hintF1" title="Show paradigm table for ${word.base} (F1)"><kbd>F1</kbd>table</button>
            <button class="hint-key" id="hintF2" title="Show which case/form is needed (F2)"><kbd>F2</kbd>case</button>
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

    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.classList.remove('entering');
      card.classList.add('visible');
      inp.focus();
    }));

    f1Btn.addEventListener('click', () => {
      if (answered) return;
      usedF1 = true;
      f1Btn.classList.add('used');
      openPopup(picked.wordId);
    });

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

  /* ── Trail ── */

  function addTrail(picked, wrongs, usedF1, usedF2) {
    const trail = document.getElementById('completedTrail');
    const item = document.createElement('div');
    item.className = 'trail-item';
    const s = picked.sentence;
    const full = `${s.before} <span class="trail-answer">${s.blank}</span> ${s.after}`.trim();
    const miss = wrongs > 0 ? `<span class="trail-mistake">${wrongs}×</span>` : '';
    const hints = (usedF1 || usedF2)
      ? `<span class="trail-hints">${usedF1 ? 'F1' : ''}${usedF1 && usedF2 ? '+' : ''}${usedF2 ? 'F2' : ''}</span>` : '';
    item.innerHTML = `<span class="trail-check">✓</span><span class="trail-sentence">${full}</span>${miss}${hints}<span class="trail-case">${s.skill}</span>`;
    trail.prepend(item);
    while (trail.children.length > 25) trail.removeChild(trail.lastChild);
  }

  /* ── Empty state ── */

  function showEmpty(onContinue) {
    document.getElementById('flashcardArea').innerHTML = `
      <div style="text-align:center;padding:2rem">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.2rem;margin-bottom:0.4rem">Świetna robota!</h3>
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:1rem">All skills reviewed for now.</p>
        <button class="check-btn" id="continueBtn" style="border-color:var(--accent);color:var(--accent)">Continue</button>
      </div>`;
    document.getElementById('continueBtn').addEventListener('click', onContinue);
  }

  /* ── Toggle setup ── */

  function initToggle() {
    let open = false;
    document.getElementById('paradigmToggle').addEventListener('click', () => {
      open = !open;
      document.getElementById('paradigmWrap').classList.toggle('open', open);
    });
  }

  return {
    get currentWordId() { return currentWordId; },
    renderWordNav,
    renderStats,
    renderSkillMap,
    renderCard,
    addTrail,
    showEmpty,
    openPopup,
    closePopup,
    initToggle,
  };
})();
