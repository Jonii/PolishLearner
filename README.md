# Polski — roots · prefixes · endings

A static site for grinding Polish grammar and word formation: cases, verb
forms, what prefixes do to a verb, how suffixes build new words from old
ones, and the small everyday words and phrases.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no requests
to other servers (the fonts are bundled). Progress is kept in the browser's
localStorage and can be exported from the Progress tab.

## Running it

- Open `public/index.html` in a browser. That's all; it works from disk.
- Or serve the `public/` folder with anything static. With Firebase:
  `firebase emulators:start` to try it, `firebase deploy` to publish.

## Using it

The Practice tab shows one card at a time. Nothing moves on by itself:
after you answer you get the answer, the rule, and the word's parts; press
**Enter** or **Next** to continue.

| Key | |
|---|---|
| Enter | check / next card |
| F2 | show the rule |
| F1 | show the pattern table (endings on a model word, prefix map, …) |
| F3 | turn the card into multiple choice |
| 1–4 | pick an option |
| Alt + a c e l n o s x z | ą ć ę ł ń ó ś ź ż (or use the buttons under the input) |

Each hint lowers the credit for the card a little; "show" counts as missed.

Sections (switch them on and off with the pills, or per group in Progress):

- **Cases** — every common trigger for each case: prepositions, verbs,
  negation, numbers; adjectives and pronouns; plurals.
- **Verbs** — present-tense classes, past, future, imperative, conditional,
  verbs of motion, Pan/Pani forms.
- **Prefixes** — w-, wy-, przy-, od-, do-, prze-, z-, za-, po-, roz-, pod-,
  nad-, o-, u-, na-, wz-, and aspect; 25 word families such as
  *iść → wyjść, przyjść, odejść…* with every word split into its parts.
- **Word building** — nouns from verbs, people, places, tools, qualities,
  diminutives, adjectives, comparatives, adverbs, participles, prefixes on
  nouns (*przedszkole, pojutrze, pradziadek*), compounds, and "find the base
  word" when a sound change hides it.
- **Small words** — greetings, politeness, reactions, particles, linking
  words, wishes, shops, phone, feelings, casual speech.

New rules are introduced gradually and mixed across sections; rules you
know come back less often, rules you miss come back sooner. The Reference
tab has every rule, every ending table and every word family.

## Adding content

See [CONTENT.md](CONTENT.md). After editing, run

```
node tools/check-content.js
```

(plain Node, no packages). It compiles everything the way the page does and
warns about answers that aren't real forms of the cue word, sentences filed
under the wrong case or tense, missing translations and the like.

How the engine works is described in [DESIGN.md](DESIGN.md).
