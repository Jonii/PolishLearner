/* ═══════════════════════════════════════════════════════════════
   input.js — Typing Polish letters on any keyboard

   - A row of buttons (ą ć ę ł ń ó ś ź ż) that type into the field.
   - Alt (or AltGr) + letter, like the Polish "programmer" layout:
       a→ą  c→ć  e→ę  l→ł  n→ń  o→ó  s→ś  x→ź  z→ż   (+Shift for capitals)

   Exports: Input (IIFE module)
   ═══════════════════════════════════════════════════════════════ */

const Input = (() => {
  'use strict';

  const LETTERS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];
  const BY_CODE = {
    KeyA: 'ą', KeyC: 'ć', KeyE: 'ę', KeyL: 'ł', KeyN: 'ń',
    KeyO: 'ó', KeyS: 'ś', KeyX: 'ź', KeyZ: 'ż',
  };

  function insert(input, text) {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    const at = start + text.length;
    input.setSelectionRange(at, at);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // Wire Alt+letter shortcuts on an <input>.
  function attach(input) {
    input.addEventListener('keydown', e => {
      if (!e.altKey || e.metaKey) return;
      const ch = BY_CODE[e.code];
      if (!ch) return;
      e.preventDefault();
      insert(input, e.shiftKey ? ch.toLocaleUpperCase('pl') : ch);
    });
  }

  // A button row that types into `input`. Buttons never steal focus.
  function bar(input) {
    const wrap = document.createElement('div');
    wrap.className = 'dia-bar';
    wrap.setAttribute('aria-label', 'Polish letters');
    LETTERS.forEach(ch => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dia-key';
      b.textContent = ch;
      b.title = `Type ${ch} (or Alt + ${Object.keys(BY_CODE).find(k => BY_CODE[k] === ch).slice(3).toLowerCase()})`;
      b.addEventListener('mousedown', e => e.preventDefault());
      b.addEventListener('click', () => {
        if (input.disabled) return;
        insert(input, ch);
        input.focus();
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  return { attach, bar, insert, LETTERS };
})();
