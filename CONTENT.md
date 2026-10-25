# Writing content

Everything the learner sees comes from the files in `public/data/`. You write
words, rules, sentences, word families and phrases; the engine
(`public/js/compile.js`) turns them into exercises. One sentence usually
becomes one exercise; one word-family member becomes three or four.

After any change run:

```
node tools/check-content.js            # summary + warnings
node tools/check-content.js --rules    # also list every rule with its exercise count
node tools/check-content.js --strict   # exit code 1 on any warning (for scripts)
```

## Files

Loaded in this order by `public/index.html` (a new data file must be added
there too, before `js/srs.js`):

| File | What's in it |
|---|---|
| `data/lex-nouns.js` | nouns with all 14 forms, noun ending tables |
| `data/lex-adjectives.js` | adjectives, pronouns, determiners (*ten, mój…*) |
| `data/lex-verbs.js` | verbs with their forms, verb tables |
| `data/cases.js` | module **Cases**: rules + sentences |
| `data/verbs.js` | module **Verbs** |
| `data/prefixes.js` | module **Prefixes**: prefixed verbs, prefix rules, verb families |
| `data/building.js` | module **Word building**: suffix rules and word families |
| `data/smallwords.js` | module **Small words**: phrases and dialogues |

## Mini-markup

Used in rule explanations, notes and intros:

- `*szkoła*` — Polish, shown in italics
- `**this**` — bold
- `{answer}` — the blank in a sentence; `{answer|other|third}` lists other
  accepted answers (the first one is shown when revealing)

Translations: mark the speaker's gender when the Polish shows it —
`'I (f.) was tired.'` — and the addressee's when it matters —
`'Sit down (to a woman).'`. Without the marker the learner can't know which
form you want.

## Modules, groups, rules

```js
PL.module('cases', { t: 'Cases', pl: 'Przypadki', blurb: 'one line', intro: 'a paragraph' });

PL.groups('cases', [
  { id: 'GEN', t: 'Genitive', pl: 'dopełniacz', intro: '…', pattern: 'n-m-hard' },
]);

PL.rules('cases', 'GEN', {
  'GEN:negation': { o: 3, f: 3, kind: 'GEN', t: 'Negation → genitive',
    x: 'After a negated verb the object goes into the genitive: *mam czas → nie mam czasu*.' },
});
```

A **rule** is the unit of progress: the learner's level is tracked per rule,
and every exercise belongs to exactly one rule.

| Field | |
|---|---|
| `t` | short title (shown on the card and in hints) |
| `x` | the explanation: what the rule is, with 2–5 examples |
| `f` | how common it is, 1–3 (common rules come up more often) |
| `o` | teaching order inside the module (lower = earlier); without it, file order |
| `kind` | for case rules the case (`'GEN'`), for verb rules the tense (`'pres'`, `'past'`, `'fut'`, `'imp'`, `'cond'`, `'inf'`). The checker then verifies every answer really is in that case / tense. |
| `pattern` | the table shown by the F1 hint, if not derived from the answer word |

## Words

Nouns — seven forms in case order **NOM GEN DAT ACC INS LOC VOC**, singular
and plural; `a/b` for variants, `-` for a missing form:

```js
PL.noun('dom', { g: 'm3', m: 'house, home', cls: 'n-m-hard',
  sg: 'dom domu domowi dom domem domu domie',
  pl: 'domy domów domom domy domami domach domy',
  note: '*Do domu* = (going) home, *w domu* = at home.' });
```

`g` is `m1` (masculine personal), `m2` (animate), `m3` (inanimate), `f`, `n`
or `pt` (plural only). `cls` names the ending table (`PL.pattern`) used for
the F1 hint.

Adjectives — the whole table is generated from the masculine form and the
virile plural (*dobrzy*); `comp` adds the comparative (and *naj-* superlative):

```js
PL.adj('dobry', { m: 'good', vir: 'dobrzy', comp: 'lepszy', adv: 'dobrze' });
```

Verbs — six present forms (the future for perfective verbs), five past
forms (3rd person m / f / n / virile / non-virile), three imperative forms
(ty / my / wy). First- and second-person past and all conditional forms
are generated from these.

```js
PL.verb('czytać', { m: 'to read', asp: 'impf', pair: 'przeczytać', cls: 'v-am',
  pres: 'czytam czytasz czyta czytamy czytacie czytają',
  past: 'czytał czytała czytało czytali czytały',
  imp: 'czytaj czytajmy czytajcie',
  vn: 'czytanie', pa: 'czytający', pp: 'czytany', ap: 'czytając' });
```

`past1` gives the 1st/2nd-person masculine stem when it differs
(*mógł → mogłem*: `past1: 'mogł'`). `refl: true` marks a *się* verb.

Prefixed verbs can be **derived** — every form of the base gets the prefix
(`data/prefixes.js` declares them in short lists, family by family):

```js
PL.verb('przepisać', { from: ['prze', 'pisać'], m: 'to copy out, rewrite', asp: 'pf' });
PL.verb('zebrać', { from: ['ze/z', 'brać'], m: 'to collect', asp: 'pf' });   // zebrać, zebrał — but zbiorę, zbierz
```

`'ze/z'` means: long prefix before the infinitive and past, short before
the present and imperative. Any form given explicitly overrides the
generated one. Irregular ones (*wyjść, wejść*) are written out in full with
`base: 'iść'` so the engine still knows they belong to *iść*.

`hidden: true` keeps a word out of the word tables — used for bound bases
like *-kładać* or *-glądać* that only exist with a prefix.

## Sentences (cloze)

```js
PL.items('GEN:negation', [
  ['czas', 'Nie mam {czasu}.', 'I have no time.'],
  ['ty', 'Kocham {cię|ciebie}.', 'I love you.'],
  ['brat', 'Nie mam {brata}.', "I don't have a brother.", { n: 'A note shown after answering.' }],
]);
```

`[cue, sentence, translation, extra]`. The **cue** is the dictionary word
shown in brackets; the answer must be one of its forms — the checker
complains otherwise. Extras:

| | |
|---|---|
| `n` | note shown with the answer |
| `c` | the case, if it differs from the rule's `kind` (an address inside a nominative rule…) |
| `lem` | the lexeme the answer belongs to, if not the cue |
| `free: true` | skip the form check (fixed expressions) |
| `o` | your own distractors for the F3 options |

One sentence = one blank = one rule. Prefer sentences a person would really
say, and vary the trigger (different prepositions, verbs, word orders) so
the rule is learned, not the sentence.

## Dialogues, choices, situations

```js
// pick the reply; translation shown only afterwards
{ type: 'respond', s: '— Dziękuję za pomoc!\n— {Nie ma za co}.', t: '— Thanks for the help! — You\'re welcome.',
  o: ['Smacznego', 'Na zdrowie', 'Dobranoc'], n: 'note' }

// pick the word that fits; translation shown
{ type: 'choice', s: '— Gdzie jest Marek?\n— Nie wiem, {chyba} w domu.', t: '…', o: ['przecież', 'nawet', 'aż'] }

// situation → type the phrase
{ type: 'say', q: 'Someone sneezes. You say:', a: 'Na zdrowie', alt: ['Na zdrowie!'], t: 'Bless you' }
```

Wrong options must be wrong **for that situation**, and must look like the
answer (same punctuation and capitals — the checker warns if they don't).

## Word families (nests)

A family is a root with the words built on it. Each member becomes a
"build the word" card (from its base), a "what does it mean" card, and,
for each example sentence, a "what does it mean here" and a fill-in card.

```js
PL.nest({
  id: 'pisac', root: 'pis-', gloss: 'write', cue: 'pisać',
  roots: { 'pis': 'write', 'pisz': 'write' },     // glosses for each root shape
  intro: 'shown at the top of the family popup',
  m: [
    ['pisać', 'pis|-ać', 'to write', null, null],
    ['podpisać', 'pod-|pis|-ać', 'to sign', 'PFX:pod', 'pisać', {
      lit: 'write under', ipf: 'podpisywać',
      n: 'Your signature goes *under* the text: *podpis*.',
      ex: [['{Podpisz} tutaj, proszę.', 'Sign here, please.']] }],
  ],
});
```

Member row: `[word, segmentation, meaning, rule, base, extra]`.

- **segmentation**: `prefix-|root|-suffix`; a linking vowel is `-o-`
  (`wod|-o-|spad`, waterfall). Prefix and suffix chips show the glosses from
  `PL.affixes({...})`; root chips use `roots` (or the family `gloss`).
- **rule**: the rule the word illustrates (`null` for the plain root word);
  an array if it shows several.
- **base**: the word it is built from — needed for the "build" cards.

| extra | |
|---|---|
| `ex` | example sentences, the family word as `{blank}` |
| `ipf` | imperfective partner → a "make it imperfective" card |
| `lit` | literal reading of the parts ("write under") |
| `n` | note |
| `fm` | meaning of the base if the base is not a family member or in the lexicon |
| `gl` | per-chip glosses for this one word, if the general ones mislead |
| `alt` | other accepted answers for the build card |
| `rootAlt` | other accepted answers for the "find the base word" card |
| `pos` | `'n'`, `'v'`, `'adj'`, `'adv'` if the guess from the rule is wrong |
| `nobuild`, `nodecode`, `noroot` | skip that kind of card for this word |

"Find the base word" cards are generated for members whose base is hidden
by a sound change (*rączka ← ręka, wschód ← wschodzić*); a prefix alone
doesn't count (*współpraca ← praca* gets no card).

## Phrases

```js
PL.phrases('SW:polite', [
  ['Nie ma za co', "You're welcome", { lit: "there's nothing for which (to thank)", use: 'The reply to *dziękuję*.',
    say: 'Someone thanks you for your help. You answer:', alt: ['Proszę bardzo'] }],
]);
```

Each phrase gives a "what does it mean" card (the other options are
meanings of other phrases), and with `say` a typed "what do you say" card;
`alt` lists the other answers to accept there. `nomeaning: true` skips the
meaning card.

## What the checker can't check

It verifies forms, cases, tenses, blanks, options and counts. It can't tell
whether a sentence sounds natural, whether a translation is right, or
whether an explanation is true — have a fluent speaker read new content.
