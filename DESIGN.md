# Polski — Design & Architecture Document (v2)

## Philosophy

**Grammar-first, depth-before-breadth.** Most language apps teach wide vocabulary with
shallow grammar. Polski inverts this: master every form of one word through real sentences
before moving to the next. You *feel* how "dom" bends through all seven cases before
you ever see "kobieta."

**Skills, not sentences.** Progress is tracked at the grammar-skill level (word × case/form),
not at the individual sentence level. Sentences are disposable examples that exercise a
skill. You master "dom × INS" — not "Przed ___ stoi samochód."

---

## Core Concepts

### 1. Word

A word with its paradigm and a large pool of example sentences.

```
Word {
  id: string
  base: string
  pos: string
  meaning: string
  paradigm: Paradigm
  sentences: Sentence[]     // large pool (30-50+ per word)
}
```

### 2. Sentence

A fill-in-the-blank exercise. Each sentence targets exactly one grammar skill.

```
Sentence {
  before: string
  blank: string            // correct answer
  after: string
  translation: string
  skill: string            // grammar skill key, e.g. "GEN", "3sg·f"
  hint: string             // grammar explanation (shown based on proficiency)
}
```

### 3. Grammar Skill

The unit of progress. Identified by `wordId + skill key`.

```
SkillState {
  wordId: string
  skill: string            // e.g. "GEN", "ACC·PL", "1sg", "3sg·f"
  correct: number          // total correct answers across all sentences
  wrong: number            // total wrong answers
  streak: number           // current consecutive correct
  lastSeen: number         // session position when last practiced
  interval: number         // SRS spacing (in session positions)
  ease: number             // SM-2 ease factor
  level: number            // 0=new, 1=learning, 2=familiar, 3=mastered
}
```

**Skill levels:**
- Level 0 (New): Never seen. Full hint shown (case tag + explanation).
- Level 1 (Learning): streak 1-2. Case tag shown, hint on wrong only.
- Level 2 (Familiar): streak 3-5. Case tag hidden. Hint on wrong only.
- Level 3 (Mastered): streak 6+. No hints. Card appears rarely.

### 4. SRS Scheduling (skill-level)

The scheduler picks which **skill** to practice next, then picks a random
unseen (or least-recently-used) sentence from that skill's pool.

**Algorithm (SM-2 variant on skills):**

On correct:
  - skill.streak++
  - skill.correct++
  - skill.interval = max(1, skill.interval * skill.ease)
  - skill.ease = min(3.0, skill.ease + 0.1)
  - skill.lastSeen = sessionPosition
  - Recalculate skill.level from streak

On wrong:
  - skill.streak = 0
  - skill.wrong++
  - skill.interval = 0 (skill re-enters soon)
  - skill.ease = max(1.3, skill.ease - 0.2)
  - skill.lastSeen = sessionPosition

**Card selection:**
1. Compute `priority = skill.lastSeen + skill.interval` for each skill
2. Skills where `priority <= sessionPosition` are "due"
3. Pick the skill with lowest priority (random tiebreak)
4. From that skill's sentence pool, pick a sentence the learner hasn't
   seen recently (track last 3 sentence indices per skill)

### 5. Progressive Word Unlocking

Words unlock in teaching order when the previous word reaches mastery:

**Mastery condition:** ≥80% of the word's skills are at level ≥ 2 (familiar)

When a word unlocks:
- Its skills are initialized at level 0
- Its sentences enter the pool
- A toast notification appears
- All unlocked words' skills are interleaved in one deck

### 6. Hint Fading

The hint system adapts to skill level:

| Skill Level | Case Tag | Hint Text    | On Wrong         |
|-------------|----------|--------------|------------------|
| 0 (New)     | Shown    | Always shown | Full explanation  |
| 1 (Learning)| Shown    | Hidden       | Full explanation  |
| 2 (Familiar)| Hidden   | Hidden       | Brief hint        |
| 3 (Mastered)| Hidden   | Hidden       | Brief hint        |

This means early on you see "INS — Instrumental after 'przed'" but later
you just see the bare sentence and have to figure it out yourself.

### 7. Session Flow

```
┌─────────────────────────────────────────┐
│  Pick next due skill                    │
│  Pick random sentence for that skill    │
│  Display card (hints based on level)    │
│  Learner types answer                   │
│  → Correct: update skill, advance       │
│  → Wrong: update skill, stay on card    │
│  Update paradigm panel if word changed  │
│  Loop                                   │
└─────────────────────────────────────────┘
```

### 8. Persistence

localStorage key: `polski_srs_v2`

```
{
  skills: { [wordId_skill]: SkillState },
  unlockedWords: string[],
  sessionPosition: number,
  totalReviewed: number,
  recentSentences: { [wordId_skill]: number[] },  // last N indices
}
```

---

## UI Structure

```
┌──────────────────────────────────────────┐
│  Header: "Polski" + tagline              │
├──────────────────────────────────────────┤
│  Word pills with mastery bars            │
│  (locked ones grayed + lock icon)        │
├──────────────────────────────────────────┤
│  Session stats: reviewed · due · streak  │
├──────────────────────────────────────────┤
│  Paradigm reference (collapsible)        │
│  Switches when card's word changes       │
│  Cells with mastered skills highlighted  │
├──────────────────────────────────────────┤
│  Mastery progress bar (current word)     │
├──────────────────────────────────────────┤
│  Active flashcard                        │
│  - Case tag (shown/hidden by level)      │
│  - Sentence with blank                   │
│  - Translation                           │
│  - Check button + hint area              │
├──────────────────────────────────────────┤
│  Recent answers trail                    │
├──────────────────────────────────────────┤
│  Footer + reset link                     │
└──────────────────────────────────────────┘
```

---

## Teaching Order

1. **dom** — m. inanimate noun, 7 cases clearly distinct, ACC=NOM
2. **kobieta** — f. noun, ACC≠NOM, vocative is memorable
3. **dobry** — adjective, agreement across genders
4. **mieć** — common verb, present + gendered past
5. **iść** — irregular verb, suppletive past stem (szedł/szła)
6. **książka** — f. noun, reinforces feminine patterns
7. **być** — essential verb "to be", irregular
8. **nowy** — adjective, reinforces agreement patterns

---

## Data: Sentence Pool Design

Each word needs **3-5 sentences per grammar skill** to prevent memorization.
For a noun with ~10 tracked skills (7 sg cases + 3 key pl): ~30-50 sentences.

Sentences should:
- Cover different prepositions/triggers for the same case
- Vary from simple to complex
- Sound natural, not textbook-artificial
- Include everyday situations

---

## Future Extensions

- **Reverse mode:** see full sentence, name the case
- **Multi-word blanks:** adjective + noun agreement in one sentence
- **LLM sentence generation:** generate fresh sentences on demand
- **Learner model:** Bayesian knowledge tracing per skill
- **Confusable cases:** specifically drill GEN vs LOC when learner mixes them
- **Audio / TTS:** pronunciation on correct
- **Dark mode**
- **Stats dashboard:** accuracy heatmap by case, weakest forms
- **Export/import progress**
