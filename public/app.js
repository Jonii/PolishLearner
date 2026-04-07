/* ═══════════════════════════════════════════════════════════════
   app.js — Application orchestrator

   Depends on: WORDS (data.js), SRS (srs.js), UI (ui.js)
   ═══════════════════════════════════════════════════════════════ */

function showNextCard() {
  const skill = SRS.getNextSkill();
  if (!skill) {
    UI.showEmpty(continueSession);
    return;
  }

  const picked = SRS.pickSentence(skill);
  if (!picked) {
    UI.showEmpty(continueSession);
    return;
  }

  UI.renderStats();
  UI.renderSkillMap();

  UI.renderCard(picked, skill, {
    onCorrect(usedF1, usedF2, wrongThisRound) {
      SRS.recordCorrect(skill, usedF1, usedF2);
      UI.addTrail(picked, wrongThisRound, usedF1, usedF2);
      UI.renderStats();
      UI.renderSkillMap();
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

function init() {
  SRS.init();
  UI.initToggle();
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') UI.closePopup();
  });
  UI.renderWordNav();
  UI.renderSkillMap();
  showNextCard();
}

init();
