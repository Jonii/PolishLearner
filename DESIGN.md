# Polski — design notes

## What it is for

A grinding tool for the *system* of Polish rather than for vocabulary:

- **Rules, at a realistic mix.** Every case trigger, verb class, prefix and
  suffix is a rule; rules come up by how common they are, and a beginner
  is not kept away from the hard ones — hints carry the difficulty instead.
- **Forms early.** Course books for English speakers hide most endings
  until late. Here the full tables are one keypress away from the start
  (F1), and the feedback always names the form ("*domu* — genitive of
  *dom*").
- **Meaning from parts.** Polish builds most words from a root plus
  prefixes and suffixes. Words are shown split into their parts with a
  gloss under each part, so *pod|pis|ać* reads as "under-write → sign" even
  when the learner has never seen the word, and families (*pisać, napisać,
  podpis, przepis, opis, długopis…*) can be explored as a whole.
- **Hints that help without giving it away.** The rule, then the pattern
  on a *different* model word, then options; only "show" gives the answer.
- **Small words.** The everyday expressions and particles that make
  speech sound like speech, with literal meanings.

Static files only: free to host, nothing to patch, works offline from disk.

## Files

```
public/
  index.html          the page; script order matters
  css/style.css       all styles (light + dark via prefers-color-scheme)
  css/fonts.css       self-hosted fonts (fonts/, OFL licensed)
  js/core.js          PL: content registry, lexicon, Polish form helpers
  js/compile.js       PL.compile(): data → exercises; options for choices
  data/*.js           the content (see CONTENT.md)
  js/srs.js           SRS: scheduler, progress, localStorage
  js/input.js         Input: Polish letters (buttons, Alt+letter)
  js/card.js          Card: one exercise card, hints, checking, feedback
  js/views.js         Views: progress, reference, tables, popups
  js/app.js           App: tabs, routing, the practice loop
tools/check-content.js  content checker (Node, no packages)
```

Every file is a classic script defining one global (`PL`, `SRS`, `Input`,
`Card`, `Views`, `App`), so the page runs from `file://` without a server
or bundler.

## Content model

```
module  → group → rule → items
                   ↑
lexicon (words with full tables) · nests (word families) · phrases
```

- A **rule** is the unit of progress (e.g. "genitive after negation",
  "*wy-* = out", "*-arnia* = shop").
- The **lexicon** has every form of every word. All answers are checked
  against it, and it feeds the tables, the "which form is this?" cards and
  the wrong-answer diagnosis.
- **Items** are generated at load time by `PL.compile()`:

| Card | Made from | Asks | Kind |
|---|---|---|---|
| fill in | sentence `{blank}` | type the right form of the cue word | production |
| build | family member + its base | *pisać* + "to sign" → *podpisać* | production |
| make it imperfective | family member with `ipf` | *wyjść* → *wychodzić* | production |
| what does it mean | family member | pick the meaning of *przepis* | recognition |
| … here | family example sentence | meaning of the word in context | recognition |
| which case / form | case & verb sentences | name the case or form of the highlighted word | recognition |
| dictionary form | sentences | *poszłam* → *pójść* | production |
| find the base word | members whose base is disguised | *rączka* ← *ręka* | production |
| what does it mean | phrase | pick the meaning of *Nie ma za co* | recognition |
| choose the reply / word | dialogues, gap sentences | pick the reply or particle that fits | recognition |
| what do you say | phrase with a situation | type the phrase | production |

## Scheduling (`srs.js`)

Progress is per rule. Time is counted in cards answered ("positions"),
not days, so it works for one long session as well as for daily practice.

Each answer is graded:

| Result | When | Streak | Next time |
|---|---|---|---|
| clean | right first time, no hints | +1 | interval × ease (min. 4 cards) |
| hint | right after the rule or table hint | +½ | interval × 1.3 (min. 3) |
| choice | right after switching to options | — | 3 cards |
| wrong | a wrong attempt, or "show" | reset | 2 cards |

Level comes from the streak: learning → familiar (3) → mastered (6).

Choosing the next card:

1. **Rule.** Due rules are weighted by how overdue they are, how often
   they were missed, and how common they are. New rules come in while
   fewer than N rules are still at "learning" (N = 5 / 10 / 20 for the
   fewer / normal / more setting), with probability 20–55 % per card when
   reviews are waiting. New rules favour the section with the smallest
   share of started rules, and come roughly in teaching order.
2. **Item.** Least-seen items first, missed ones a bit more often, recent
   ones rarely, the same word seldom twice in a row; recognition cards
   are favoured while a rule is new, production cards once it is known.

Sections and groups can be switched off, and any rule or group can be
drilled on its own (Progress tab).

State lives in `localStorage` under `polski_v4` (export/import as JSON in
the Progress tab).

## The card (`card.js`)

- Typed answers are compared ignoring capitals, punctuation and extra
  spaces. An answer that is right except for the Polish letters gets one
  "Almost — only the Polish letters differ" before it counts as wrong.
- A wrong answer stays on the card with a diagnosis when the engine can
  tell what was typed ("*domem* is the instrumental singular of *dom* —
  this slot needs a different form"; "right root, different prefix").
- After answering, the card shows the answer, its form, the word's parts
  with glosses, a note, the rule, a link to the word family, and a Next
  button. **Nothing advances automatically**; Enter (after a short guard
  against a double press) or Next moves on.
- Speech uses the browser's own Polish voice when there is one.

## Checking content

`tools/check-content.js` loads the same scripts as the page in a Node `vm`
and reports: answers that aren't forms of the cue word, case/tense rules
answered with the wrong case/tense, missing translations, stray braces,
duplicate sentences, choice cards with too few options, options that give
the answer away by punctuation, word splits that don't spell the word, and
rules with too few exercises. Whether
the Polish is natural and the explanations true still needs a fluent reader.

## Possible next steps

- More families (*-wiedzieć, -nieść, -trzeć, -jąć…*) and more nouns.
- Numbers and their cases (*dwa koty, pięć kotów*) as their own module.
- Longer aspect drills: a short story where every blank is *pisałem* or
  *napisałem*.
- An offline-installable version (a service worker and a manifest — still
  no dependencies).
