/* ═══════════════════════════════════════════════════════════════
   app.js — Application orchestrator
   
   Depends on: WORDS (data.js), SRS (srs.js), UI (ui.js)
   
   This is the glue. It wires SRS callbacks to UI updates.
   No business logic lives here — just the event loop.
   ═══════════════════════════════════════════════════════════════ */

function showNextCard() {
  const skill = SRS.getNextSkill();
  if (!skill) {
    UI.showEmpty(continueSession);
    return;
  }

  const sentence = SRS.pickSentence(skill);
  if (!sentence) {
    UI.showEmpty(continueSession);
    return;
  }

  // Update paradigm panel if word changed
  if (UI.currentParadigmWordId !== skill.wordId) {
    UI.showParadigm(skill.wordId);
    UI.renderWordNav();
  }

  UI.updateProgressBar();
  UI.renderStats();

  UI.renderCard(sentence, skill, {
    onCorrect(usedF1, usedF2, wrongThisRound) {
      SRS.recordCorrect(skill, usedF1, usedF2);

      // Check for word unlock
      const unlocked = SRS.checkUnlocks();
      if (unlocked) {
        UI.showUnlockToast(unlocked);
        UI.renderWordNav();
      }

      const word = WORDS.find(w => w.id === skill.wordId);
      UI.addTrail(sentence, wrongThisRound, word, usedF1, usedF2);
      UI.updateProgressBar();
      UI.renderStats();
      UI.renderWordNav();

      setTimeout(showNextCard, 850);
    },

    onWrong() {
      SRS.recordWrong(skill);
    },
  });
}

function continueSession() {
  SRS.continueSession();
  showNextCard();
}

function resetProgress() {
  if (!confirm('This will erase all progress. Are you sure?')) return;
  SRS.reset();
  location.reload();
}

// ── Init ──

function init() {
  SRS.init();
  UI.initToggle();

  // Global keyboard: Escape closes popup
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') UI.closePopup();
  });

  UI.renderWordNav();
  showNextCard();
}

init();
