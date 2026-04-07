/* ═══════════════════════════════════════════════════════════════
   data.js — Word data and sentence pools
   
   Exports: WORDS (array)
   
   Skills are grammar rules like "GEN:negation" or "INS:prep-z".
   Words are content — each word's sentences feed into the shared
   skill pools. The SRS tracks mastery of rules, not word×case.
   
   To add a word: append to WORDS, add sentences tagged with skill keys.
   To add a skill: just use a new skill key in sentences — the engine
   discovers skills from the data automatically.
   ═══════════════════════════════════════════════════════════════ */

const WORDS = [
  {
    id: "dom", base: "dom", pos: "noun · masc. inanimate", meaning: "house, home",
    category: "noun",
    paradigm: {
      type: "noun",
      singular: [
        { abbr:"NOM", form:"dom",    question:"kto? co?" },
        { abbr:"GEN", form:"domu",   question:"kogo? czego?" },
        { abbr:"DAT", form:"domowi", question:"komu? czemu?" },
        { abbr:"ACC", form:"dom",    question:"kogo? co?" },
        { abbr:"INS", form:"domem",  question:"kim? czym?" },
        { abbr:"LOC", form:"domu",   question:"o kim? o czym?" },
        { abbr:"VOC", form:"domie",  question:"—" },
      ],
      plural: [
        { abbr:"NOM", form:"domy" },
        { abbr:"GEN", form:"domów" },
        { abbr:"DAT", form:"domom" },
        { abbr:"ACC", form:"domy" },
        { abbr:"INS", form:"domami" },
        { abbr:"LOC", form:"domach" },
        { abbr:"VOC", form:"domy" },
      ]
    },
    sentences: [
      // NOM:subject
      { before:"To jest",           blank:"dom",    after:".",            translation:"This is a house.",                      skill:"NOM:subject",          hint:"Subject of the sentence → Nominative" },
      { before:"Ten",               blank:"dom",    after:"jest stary.",  translation:"This house is old.",                    skill:"NOM:subject",          hint:"Subject of the sentence → Nominative" },
      { before:"Nasz",              blank:"dom",    after:"jest duży.",   translation:"Our house is big.",                     skill:"NOM:subject",          hint:"Subject of the sentence → Nominative" },
      { before:"Te",                blank:"domy",   after:"są piękne.",   translation:"These houses are beautiful.",           skill:"NOM:subject",          hint:"Subject of the sentence → Nominative" },
      { before:"Nowe",              blank:"domy",   after:"rosną szybko.",translation:"New houses are going up quickly.",      skill:"NOM:subject",          hint:"Subject of the sentence → Nominative" },
      // GEN:negation
      { before:"Nie ma tu żadnego", blank:"domu",   after:".",            translation:"There is no house here.",               skill:"GEN:negation",         hint:"Nie ma + negation → Genitive" },
      { before:"Nie znam tego",     blank:"domu",   after:".",            translation:"I don't know this house.",              skill:"GEN:negation",         hint:"Negated verb → Genitive" },
      { before:"Nie widzę żadnego", blank:"domu",   after:"w pobliżu.",   translation:"I don't see any house nearby.",         skill:"GEN:negation",         hint:"Negated verb → Genitive" },
      { before:"Nie ma tu dobrych", blank:"domów",  after:".",            translation:"There are no good houses here.",        skill:"GEN:negation",         hint:"Nie ma + negation → Genitive" },
      // GEN:prep-od/z/do
      { before:"Idę do",            blank:"domu",   after:".",            translation:"I'm going home.",                       skill:"GEN:prep-od/z/do",     hint:"do (to/towards) → Genitive" },
      { before:"Wracam z tego",     blank:"domu",   after:".",            translation:"I'm returning from this house.",        skill:"GEN:prep-od/z/do",     hint:"z (from) → Genitive" },
      { before:"Daleko od",         blank:"domu",   after:"jest szkoła.", translation:"The school is far from the house.",     skill:"GEN:prep-od/z/do",     hint:"od (from/away from) → Genitive" },
      // GEN:prep-bez/dla/obok
      { before:"Blisko",            blank:"domu",   after:"jest park.",   translation:"There's a park near the house.",        skill:"GEN:prep-bez/dla/obok",hint:"blisko (near) → Genitive" },
      { before:"Obok",              blank:"domu",   after:"rośnie dąb.",  translation:"An oak grows next to the house.",       skill:"GEN:prep-bez/dla/obok",hint:"obok (next to) → Genitive" },
      { before:"Bez",               blank:"domu",   after:"nie ma co robić.",translation:"Without a house there's nothing to do.",skill:"GEN:prep-bez/dla/obok",hint:"bez (without) → Genitive" },
      // GEN:quantity
      { before:"Szukam tego",       blank:"domu",   after:".",            translation:"I'm looking for this house.",           skill:"GEN:quantity",         hint:"szukać (to look for) → Genitive" },
      { before:"Na ulicy jest dużo",blank:"domów",  after:".",            translation:"There are many houses on the street.",  skill:"GEN:quantity",         hint:"dużo (many/much) → Genitive" },
      { before:"Wśród tych",        blank:"domów",  after:"jest jeden stary.",translation:"Among these houses there's one old one.",skill:"GEN:quantity",   hint:"wśród (among) → Genitive" },
      { before:"Szukamy nowych",    blank:"domów",  after:".",            translation:"We're looking for new houses.",         skill:"GEN:quantity",         hint:"szukać (to look for) → Genitive" },
      // DAT:verb-dative
      { before:"Przyglądam się temu",blank:"domowi",after:".",            translation:"I'm looking at this house closely.",    skill:"DAT:verb-dative",      hint:"przyglądać się (to scrutinize) → Dative" },
      { before:"Dziwię się temu",    blank:"domowi",after:".",            translation:"I'm surprised by this house.",          skill:"DAT:verb-dative",      hint:"dziwić się (to be surprised by) → Dative" },
      { before:"Przyglądamy się tym",blank:"domom", after:".",            translation:"We're looking at these houses closely.", skill:"DAT:verb-dative",      hint:"przyglądać się (to scrutinize) → Dative" },
      { before:"Dziwię się tym",     blank:"domom", after:".",            translation:"I'm surprised by these houses.",        skill:"DAT:verb-dative",      hint:"dziwić się (to be surprised by) → Dative" },
      // ACC:direct-object
      { before:"Widzę ten",         blank:"dom",    after:"z daleka.",    translation:"I can see that house from afar.",       skill:"ACC:direct-object",    hint:"Direct object of widzieć → Accusative" },
      { before:"Kupuję ten",        blank:"dom",    after:".",            translation:"I'm buying this house.",                skill:"ACC:direct-object",    hint:"Direct object of kupować → Accusative" },
      { before:"Znam ten",          blank:"dom",    after:"dobrze.",      translation:"I know this house well.",               skill:"ACC:direct-object",    hint:"Direct object of znać → Accusative" },
      { before:"Lubię stare",       blank:"domy",   after:".",            translation:"I like old houses.",                    skill:"ACC:direct-object",    hint:"Direct object of lubić → Accusative" },
      { before:"Buduję nowe",       blank:"domy",   after:".",            translation:"I'm building new houses.",              skill:"ACC:direct-object",    hint:"Direct object of budować → Accusative" },
      // INS:prep-location
      { before:"Przed",             blank:"domem",  after:"stoi samochód.",translation:"In front of the house stands a car.", skill:"INS:prep-location",    hint:"przed (in front of) → Instrumental" },
      { before:"Za tym",            blank:"domem",  after:"jest ogród.",  translation:"Behind this house there's a garden.",   skill:"INS:prep-location",    hint:"za (behind) → Instrumental" },
      { before:"Nad",               blank:"domem",  after:"latają ptaki.",translation:"Birds fly over the house.",             skill:"INS:prep-location",    hint:"nad (above) → Instrumental" },
      { before:"Pod",               blank:"domem",  after:"leży kamień.", translation:"A stone lies under the house.",         skill:"INS:prep-location",    hint:"pod (under) → Instrumental" },
      { before:"Między tymi",       blank:"domami", after:"jest park.",   translation:"Between these houses there's a park.",  skill:"INS:prep-location",    hint:"między (between) → Instrumental" },
      { before:"Przed tymi",        blank:"domami", after:"jest parking.",translation:"In front of these houses is a parking lot.",skill:"INS:prep-location",hint:"przed (in front of) → Instrumental" },
      // INS:verb-interest
      { before:"Interesuję się tym",blank:"domem",  after:".",            translation:"I'm interested in this house.",         skill:"INS:verb-interest",    hint:"interesować się (to be interested in) → Instrumental" },
      // LOC:prep-w/na
      { before:"Mieszkam w tym",    blank:"domu",   after:".",            translation:"I live in this house.",                 skill:"LOC:prep-w/na",        hint:"w (in, static location) → Locative" },
      { before:"W tym",             blank:"domu",   after:"jest ciepło.", translation:"It's warm in this house.",              skill:"LOC:prep-w/na",        hint:"w (in, static location) → Locative" },
      { before:"W tych",            blank:"domach", after:"mieszkają ludzie.",translation:"People live in these houses.",      skill:"LOC:prep-w/na",        hint:"w (in, static location) → Locative" },
      // LOC:prep-o
      { before:"Myślę o tym",       blank:"domu",   after:".",            translation:"I'm thinking about this house.",        skill:"LOC:prep-o",           hint:"o (about/concerning) → Locative" },
      { before:"O tych",            blank:"domach", after:"dużo się mówi.",translation:"People talk a lot about these houses.",skill:"LOC:prep-o",          hint:"o (about/concerning) → Locative" },
      { before:"Opowiadam o tym",   blank:"domu",   after:".",            translation:"I'm telling a story about this house.", skill:"LOC:prep-o",           hint:"o (about/concerning) → Locative" },
      // VOC:address
      { before:"O",                 blank:"domie",  after:", jak za tobą tęsknię!",translation:"Oh house, how I miss you!",   skill:"VOC:address",          hint:"Direct address → Vocative" },
      { before:"O",                 blank:"domy",   after:"nasze, stójcie wiecznie!",translation:"Oh our houses, stand forever!",skill:"VOC:address",       hint:"Direct address → Vocative" },
    ]
  },
  {
    id: "kobieta", base: "kobieta", pos: "noun · feminine", meaning: "woman",
    category: "noun",
    paradigm: {
      type: "noun",
      singular: [
        { abbr:"NOM", form:"kobieta",  question:"kto?" },
        { abbr:"GEN", form:"kobiety",  question:"kogo?" },
        { abbr:"DAT", form:"kobiecie", question:"komu?" },
        { abbr:"ACC", form:"kobietę",  question:"kogo?" },
        { abbr:"INS", form:"kobietą",  question:"kim?" },
        { abbr:"LOC", form:"kobiecie", question:"o kim?" },
        { abbr:"VOC", form:"kobieto!", question:"—" },
      ],
      plural: [
        { abbr:"NOM", form:"kobiety" },
        { abbr:"GEN", form:"kobiet" },
        { abbr:"DAT", form:"kobietom" },
        { abbr:"ACC", form:"kobiety" },
        { abbr:"INS", form:"kobietami" },
        { abbr:"LOC", form:"kobietach" },
        { abbr:"VOC", form:"kobiety" },
      ]
    },
    sentences: [
      // NOM:subject
      { before:"Ta",                   blank:"kobieta",  after:"jest miła.",          translation:"This woman is kind.",                       skill:"NOM:subject",          hint:"Subject → Nominative" },
      { before:"Każda",                blank:"kobieta",  after:"to wie.",             translation:"Every woman knows that.",                   skill:"NOM:subject",          hint:"Subject → Nominative" },
      { before:"Młoda",                blank:"kobieta",  after:"czeka na przystanku.",translation:"A young woman waits at the stop.",          skill:"NOM:subject",          hint:"Subject → Nominative" },
      { before:"Te",                   blank:"kobiety",  after:"są stąd.",            translation:"These women are from here.",                skill:"NOM:subject",          hint:"Subject → Nominative" },
      // GEN:negation
      { before:"Nie znam tej",         blank:"kobiety",  after:".",                   translation:"I don't know this woman.",                  skill:"GEN:negation",         hint:"Negated znać → Genitive" },
      { before:"Nie ma tu żadnej",     blank:"kobiety",  after:".",                   translation:"There's no woman here.",                    skill:"GEN:negation",         hint:"Nie ma + negation → Genitive" },
      { before:"Na sali nie ma żadnej",blank:"kobiety",  after:".",                   translation:"There's no woman in the hall.",             skill:"GEN:negation",         hint:"Nie ma + negation → Genitive" },
      // GEN:prep-bez/dla/obok
      { before:"Bez tej",             blank:"kobiety",  after:"nic nie zrobimy.",    translation:"Without this woman we won't do anything.",  skill:"GEN:prep-bez/dla/obok",hint:"bez (without) → Genitive" },
      { before:"Na sali jest wiele",  blank:"kobiet",   after:".",                   translation:"There are many women in the hall.",          skill:"GEN:prep-bez/dla/obok",hint:"wiele (many) → Genitive" },
      // GEN:quantity
      { before:"Szukam tej",          blank:"kobiety",  after:".",                   translation:"I'm looking for this woman.",                skill:"GEN:quantity",         hint:"szukać (to look for) → Genitive" },
      { before:"Słucham tych",        blank:"kobiet",   after:"z uwagą.",            translation:"I'm listening to these women carefully.",    skill:"GEN:quantity",         hint:"słuchać (to listen to) → Genitive" },
      // DAT:verb-dative
      { before:"Daję tę książkę tej", blank:"kobiecie", after:".",                   translation:"I give this book to this woman.",           skill:"DAT:verb-dative",      hint:"dawać komuś (to give to someone) → Dative" },
      { before:"Pomagam tej",         blank:"kobiecie", after:".",                   translation:"I'm helping this woman.",                   skill:"DAT:verb-dative",      hint:"pomagać komuś (to help someone) → Dative" },
      { before:"Dziękuję tej",        blank:"kobiecie", after:".",                   translation:"I'm thanking this woman.",                  skill:"DAT:verb-dative",      hint:"dziękować komuś (to thank someone) → Dative" },
      { before:"Tym",                  blank:"kobietom", after:"pomagamy.",           translation:"We're helping these women.",                skill:"DAT:verb-dative",      hint:"pomagać komuś → Dative" },
      { before:"Dziękuję tym",        blank:"kobietom", after:".",                   translation:"I'm thanking these women.",                 skill:"DAT:verb-dative",      hint:"dziękować komuś → Dative" },
      // ACC:direct-object
      { before:"Widzę tę",            blank:"kobietę",  after:"codziennie.",         translation:"I see this woman every day.",               skill:"ACC:direct-object",    hint:"Direct object of widzieć → Accusative" },
      { before:"Znam tę",             blank:"kobietę",  after:"od lat.",             translation:"I've known this woman for years.",           skill:"ACC:direct-object",    hint:"Direct object of znać → Accusative" },
      { before:"Proszę tę",           blank:"kobietę",  after:"o pomoc.",            translation:"I'm asking this woman for help.",           skill:"ACC:direct-object",    hint:"Direct object of prosić → Accusative" },
      { before:"Widzę te",            blank:"kobiety",  after:"każdego dnia.",       translation:"I see these women every day.",              skill:"ACC:direct-object",    hint:"Direct object of widzieć → Accusative" },
      // INS:prep-z
      { before:"Idę z tą",            blank:"kobietą",  after:"do kina.",            translation:"I'm going to the cinema with this woman.",  skill:"INS:prep-z",           hint:"z (together with) → Instrumental" },
      { before:"Rozmawiam z tą",      blank:"kobietą",  after:".",                   translation:"I'm talking with this woman.",              skill:"INS:prep-z",           hint:"z (together with) → Instrumental" },
      { before:"Rozmawiam z tymi",    blank:"kobietami",after:".",                   translation:"I'm talking with these women.",              skill:"INS:prep-z",           hint:"z (together with) → Instrumental" },
      // LOC:prep-o
      { before:"Rozmawiamy o tej",    blank:"kobiecie", after:".",                   translation:"We're talking about this woman.",            skill:"LOC:prep-o",           hint:"o (about/concerning) → Locative" },
      { before:"Myślę o tej",         blank:"kobiecie", after:".",                   translation:"I'm thinking about this woman.",             skill:"LOC:prep-o",           hint:"o (about/concerning) → Locative" },
      { before:"Opowiadam o tych",    blank:"kobietach",after:".",                   translation:"I'm telling about these women.",             skill:"LOC:prep-o",           hint:"o (about/concerning) → Locative" },
      // VOC:address
      { before:"",                     blank:"Kobieto",  after:", masz rację!",       translation:"Woman, you are right!",                    skill:"VOC:address",          hint:"Direct address → Vocative" },
      { before:"Droga",               blank:"kobieto",  after:", posłuchaj!",        translation:"Dear woman, listen!",                       skill:"VOC:address",          hint:"Direct address → Vocative" },
      { before:"Drogie",              blank:"kobiety",  after:", posłuchajcie!",     translation:"Dear women, listen!",                      skill:"VOC:address",          hint:"Direct address → Vocative" },
    ]
  },
  {
    id: "książka", base: "książka", pos: "noun · feminine", meaning: "book",
    category: "noun",
    paradigm: {
      type: "noun",
      singular: [
        { abbr:"NOM", form:"książka",  question:"co?" },
        { abbr:"GEN", form:"książki",  question:"czego?" },
        { abbr:"DAT", form:"książce",  question:"czemu?" },
        { abbr:"ACC", form:"książkę",  question:"co?" },
        { abbr:"INS", form:"książką",  question:"czym?" },
        { abbr:"LOC", form:"książce",  question:"o czym?" },
        { abbr:"VOC", form:"książko",  question:"—" },
      ],
      plural: [
        { abbr:"NOM", form:"książki" },
        { abbr:"GEN", form:"książek" },
        { abbr:"DAT", form:"książkom" },
        { abbr:"ACC", form:"książki" },
        { abbr:"INS", form:"książkami" },
        { abbr:"LOC", form:"książkach" },
        { abbr:"VOC", form:"książki" },
      ]
    },
    sentences: [
      // NOM:subject
      { before:"To jest dobra",     blank:"książka",  after:".",             translation:"This is a good book.",                  skill:"NOM:subject",          hint:"Subject → Nominative" },
      { before:"Ta",                blank:"książka",  after:"jest ciekawa.", translation:"This book is interesting.",              skill:"NOM:subject",          hint:"Subject → Nominative" },
      { before:"Nowa",              blank:"książka",  after:"leży na stole.",translation:"A new book is on the table.",           skill:"NOM:subject",          hint:"Subject → Nominative" },
      { before:"Te",                blank:"książki",  after:"są nowe.",      translation:"These books are new.",                   skill:"NOM:subject",          hint:"Subject → Nominative" },
      // GEN:negation
      { before:"Nie mam tej",       blank:"książki",  after:".",             translation:"I don't have this book.",                skill:"GEN:negation",         hint:"Negated mieć → Genitive" },
      { before:"Nie ma tu żadnej",  blank:"książki",  after:".",             translation:"There's no book here.",                  skill:"GEN:negation",         hint:"Nie ma + negation → Genitive" },
      // GEN:prep-bez/dla/obok
      { before:"Bez tej",           blank:"książki",  after:"nie zdam.",     translation:"Without this book I won't pass.",       skill:"GEN:prep-bez/dla/obok",hint:"bez (without) → Genitive" },
      // GEN:quantity
      { before:"Szukam tej",        blank:"książki",  after:".",             translation:"I'm looking for this book.",             skill:"GEN:quantity",         hint:"szukać → Genitive" },
      { before:"Mam dużo",          blank:"książek",  after:".",             translation:"I have many books.",                     skill:"GEN:quantity",         hint:"dużo (many) → Genitive" },
      // DAT:verb-dative
      { before:"Przyglądam się tej",blank:"książce",  after:".",             translation:"I'm looking at this book closely.",      skill:"DAT:verb-dative",      hint:"przyglądać się → Dative" },
      { before:"Nie ufam tej",      blank:"książce",  after:".",             translation:"I don't trust this book.",               skill:"DAT:verb-dative",      hint:"ufać komuś/czemuś (to trust) → Dative" },
      { before:"Tym",               blank:"książkom", after:"brakuje okładek.",translation:"These books are missing covers.",    skill:"DAT:verb-dative",      hint:"brakować czemuś (to be missing) → Dative" },
      // ACC:direct-object
      { before:"Czytam tę",         blank:"książkę",  after:".",             translation:"I'm reading this book.",                 skill:"ACC:direct-object",    hint:"Direct object of czytać → Accusative" },
      { before:"Kupuję nową",       blank:"książkę",  after:".",             translation:"I'm buying a new book.",                 skill:"ACC:direct-object",    hint:"Direct object of kupować → Accusative" },
      { before:"Lubię tę",          blank:"książkę",  after:"najbardziej.",  translation:"I like this book the most.",             skill:"ACC:direct-object",    hint:"Direct object of lubić → Accusative" },
      { before:"Kupuję te",         blank:"książki",  after:".",             translation:"I'm buying these books.",                skill:"ACC:direct-object",    hint:"Direct object of kupować → Accusative" },
      // INS:prep-location
      { before:"Pod tą",            blank:"książką",  after:"leży list.",    translation:"Under this book there's a letter.",     skill:"INS:prep-location",    hint:"pod (under) → Instrumental" },
      // INS:prep-z
      { before:"Idę z tą",          blank:"książką",  after:"do szkoły.",    translation:"I'm going to school with this book.",    skill:"INS:prep-z",           hint:"z (together with / carrying) → Instrumental" },
      { before:"Przychodzę z",      blank:"książkami",after:".",             translation:"I'm coming with (my) books.",             skill:"INS:prep-z",           hint:"z (together with) → Instrumental" },
      // LOC:prep-w/na
      { before:"W tej",             blank:"książce",  after:"jest dużo błędów.",translation:"There are many errors in this book.",skill:"LOC:prep-w/na",        hint:"w (in, static) → Locative" },
      { before:"W tych",            blank:"książkach",after:"jest mądrość.", translation:"There's wisdom in these books.",        skill:"LOC:prep-w/na",        hint:"w (in, static) → Locative" },
      // LOC:prep-o
      { before:"Piszę o tej",       blank:"książce",  after:".",             translation:"I'm writing about this book.",           skill:"LOC:prep-o",           hint:"o (about/concerning) → Locative" },
      // VOC:address
      { before:"O,",                blank:"książko",  after:", jakże jesteś piękna!",translation:"Oh book, how beautiful you are!",skill:"VOC:address",        hint:"Direct address → Vocative" },
      { before:"Drogie",            blank:"książki",  after:", uczcie nas!",translation:"Dear books, teach us!",                 skill:"VOC:address",          hint:"Direct address → Vocative" },
    ]
  },
];


/* ═══════════════════════════════════════════════════════════════
   SKILL_RULES — Defines the grammar rules (skills) and their
   grouping into cases. This is what drives the rule-explanation
   panel and the skill selector UI.
   ═══════════════════════════════════════════════════════════════ */

const SKILL_RULES = {
  "NOM:subject":          { case: "NOM", label: "Subject",                     rule: "The subject of the sentence — who/what does the action — takes Nominative." },
  "GEN:negation":         { case: "GEN", label: "Negation",                    rule: "When a verb is negated (nie ma, nie znam, nie widzę…), the object shifts to Genitive." },
  "GEN:prep-od/z/do":     { case: "GEN", label: "Prepositions: do, z, od",     rule: "The prepositions do (to/towards), z (from), od (away from) always require Genitive." },
  "GEN:prep-bez/dla/obok":{ case: "GEN", label: "Prepositions: bez, dla, obok", rule: "bez (without), dla (for), obok (next to), blisko (near), wśród (among) require Genitive." },
  "GEN:quantity":         { case: "GEN", label: "Quantity & seeking",          rule: "After quantity words (dużo, wiele, mało) and verbs like szukać (seek), słuchać (listen to) → Genitive." },
  "DAT:verb-dative":      { case: "DAT", label: "Dative verbs",               rule: "Verbs meaning 'give to', 'help', 'thank', 'trust', 'look closely at' take a Dative object: pomagać, dziękować, ufać, przyglądać się, dziwić się, dawać." },
  "ACC:direct-object":    { case: "ACC", label: "Direct object",              rule: "The direct object of most verbs (widzieć, kupować, znać, lubić, czytać, budować…) takes Accusative." },
  "INS:prep-location":    { case: "INS", label: "Location prepositions",       rule: "przed (in front of), za (behind), nad (above), pod (under), między (between) → Instrumental for static location." },
  "INS:prep-z":           { case: "INS", label: "Preposition: z (with)",       rule: "z meaning 'together with' or 'accompanied by' requires Instrumental." },
  "INS:verb-interest":    { case: "INS", label: "Verbs of interest",           rule: "interesować się (to be interested in), zajmować się (to deal with) → Instrumental." },
  "LOC:prep-w/na":        { case: "LOC", label: "Prepositions: w, na (static)", rule: "w (in) and na (on/at) for static location (not motion towards) → Locative." },
  "LOC:prep-o":           { case: "LOC", label: "Preposition: o (about)",      rule: "o meaning 'about/concerning' (myśleć o, mówić o, pisać o) → Locative." },
  "VOC:address":          { case: "VOC", label: "Direct address",              rule: "When calling out to someone/something directly (O domie! Kobieto!) → Vocative. Archaic in modern speech but still used." },
};

/* Cases in display order */
const CASE_ORDER = ["NOM", "GEN", "DAT", "ACC", "INS", "LOC", "VOC"];
