/* ═══════════════════════════════════════════════════════════════
   data/building.js — Module: Word building (słowotwórstwo)

   Suffixes, diminutives, adjectives, adverbs, participles and
   compounds. Families here are grouped by base word (dom, ręka, lód…)
   or by theme (places, tools, grammar words…).

   Member rows: [word, 'seg|ment|-ation', 'meaning', 'RULE', 'base', { extra }]
   extra.fm = meaning of the base, if the base is not in the lexicon.
   ═══════════════════════════════════════════════════════════════ */

PL.module('building', {
  t: 'Word building', pl: 'Słowotwórstwo',
  blurb: 'Suffixes and compounds: kawa → kawiarnia, lód → lodówka.',
  intro: 'Polish builds most of its vocabulary from a few thousand roots and a few dozen suffixes. *-arnia* is a shop (*kawiarnia*), *-arka* a machine (*zmywarka*), *-ość* turns an adjective into a quality (*młody → młodość*), *-ek / -ka* make things small and dear (*dom → domek*). Root vowels and consonants shift along the way (*ręka → rączka, ręczny*) — the "find the base word" exercises train exactly that. Once you see the pieces, a word like *bezprzewodowy* reads itself: *bez-* without, *przewód* wire, *-owy* adjective ending → wireless.',
});

PL.groups('building', [
  { id: 'NOUNV', t: 'Nouns from verbs', pl: 'od czasowników', intro: 'Almost every verb has a noun of the action in *-nie / -cie*, and prefixed verbs give short nouns without any suffix (*wyjechać → wyjazd*).' },
  { id: 'PEOPLE', t: 'People', pl: 'nazwy osób', intro: 'Who does it, who lives there, and the feminine forms.' },
  { id: 'THINGS', t: 'Places and things', pl: 'miejsca i przedmioty', intro: 'Shops and rooms, open spaces, machines and tools.' },
  { id: 'ABSTR', t: 'Qualities and states', pl: 'cechy i stany', intro: 'Abstract nouns: *-ość* (young → youth), *-stwo* (rich → wealth).' },
  { id: 'DIM', t: 'Small and big', pl: 'zdrobnienia i zgrubienia', intro: 'Polish speech is full of diminutives — affectionate, polite, or simply naming a smaller thing (and sometimes a different one: *wódka* is "little water").' },
  { id: 'ADJ', t: 'Adjectives', pl: 'przymiotniki', intro: 'Adjectives from nouns (*dom → domowy*), from verbs (*pić → pitny*), negative ones (*bez-, nie-*), comparison and "-ish".' },
  { id: 'ADV', t: 'Adverbs', pl: 'przysłówki', intro: 'How something is done: *szybki → szybko, dobry → dobrze*, and the languages: *po polsku*.' },
  { id: 'VRB', t: 'Verbs from adjectives', pl: 'czasowniki odprzymiotnikowe', intro: 'Becoming something (*biały → bieleć*, turn white) and making something so (*biały → wybielić*, to whiten).' },
  { id: 'PART', t: 'Participles', pl: 'imiesłowy', intro: 'Verbs used as adjectives: *-ący* (reading), *-ny / -ty* (read, closed), and *-ąc* (while reading).' },
  { id: 'NPFX', t: 'Prefixes on nouns', pl: 'przedrostki w rzeczownikach', intro: 'Most of these are prepositions you know from the cases, fused with a noun — read the word as the phrase it came from: *przed wojną* (before the war) → *przedwojenny*, *za granicą* (beyond the border) → *zagranica*, *pod ziemią* (under the ground) → *podziemie*. *przed-* = before, *po-* = after or along, *pod-* = under, *za-* = beyond, *nad-* = over, *przeciw-* = against. Three are prefixes only — *współ-* (co-), *pra-* (great-; age-old), *arcy-* (arch-) — and they go on verbs and adjectives too: *współpracować* (to cooperate), *współczesny* (contemporary), *prastary* (age-old), *arcyciekawy* (extremely interesting).' },
  { id: 'CMP', t: 'Compounds and calques', pl: 'złożenia i kalki', intro: 'Two roots joined with *-o-* (*samochód* "self-goer"), and Latin or German words rebuilt from Polish parts — including the names of the cases.' },
  { id: 'ROOT', t: 'Find the base word', pl: 'wyraz podstawowy', pattern: 'alternations', intro: 'Working backwards through the sound changes: *rączka → ręka, nożny → noga, męski → mąż*.' },
]);

PL.affixes({
  '-nie': '(noun of the action)', '-cie': '(noun of the action)', '-anie': '(noun of the action)', '-enie': '(noun of the action)', '-ienie': '(noun of the action)',
  '-arz': 'person (trade)', '-nik': 'person / thing', '-ik': 'small; thing', '-yk': 'small', '-ca': 'one who', '-iec': 'one who', '-ec': 'one who',
  '-ciel': 'one who', '-yciel': 'one who', '-iciel': 'one who', '-acz': 'one who / device', '-ak': 'person, thing', '-anin': 'inhabitant',
  '-ka': 'small / female / thing', '-ek': 'small; result', '-tek': 'result', '-ko': 'small', '-eczka': 'tiny', '-eczko': 'tiny', '-uszko': 'tiny, dear',
  '-arnia': 'shop, place', '-iarnia': 'shop, place', '-alnia': 'room for…', '-elnia': 'room for…', '-nia': 'place', '-isko': 'place, ground', '-owisko': 'place, ground', '-nisko': 'place, ground',
  '-arka': 'machine', '-ówka': 'thing', '-dło': 'tool', '-ość': '-ness', '-ność': '-ness', '-stwo': '-hood, -dom', '-ctwo': '-hood, -dom', '-two': '-hood, -dom', '-estwo': '-dom', '-ota': '-ness',
  '-owy': 'of, made of', '-ny': 'of, -al', '-czny': 'of, -al', '-ni': 'of', '-ski': 'of (a place, people)', '-cki': 'of (a place, people)', '-cy': 'of',
  '-aty': 'having', '-isty': 'full of', '-liwy': 'tending to', '-ity': 'full of', '-alny': '-able', '-awy': '-ish', '-utki': 'very (fondly)', '-iutki': 'very (fondly)', '-uteńki': 'very (fondly)', '-eńki': 'very (fondly)', '-ysty': 'full of', '-ina': 'poor, dear',
  '-szy': '-er', '-ejszy': '-er', '-iejszy': '-er', 'naj-': 'most',
  '-ący': '-ing', '-ąc': 'while …-ing', '-ony': '-ed', '-any': '-ed', '-ty': '-ed', '-eć': '(verb)', '-ieć': '(verb)', '-nąć': '(verb)', '-o': '-ly (adverb)', '-ie': '-ly (adverb)', 'przed-': 'before, in front',
  'współ-': 'co-, together', 'pra-': 'great-; age-old', 'arcy-': 'arch-, supreme', 'przeciw-': 'against',
  '-ować': 'to do / make', '-owiec': 'specialist', '-ownik': '-er (person / thing)', '-aniec': 'inhabitant', '-czyni': '(female)', '-yni': '(female)', '-ini': '(female)', '-owa': '(female; soup)',
});

/* ══ Rules ══ */

PL.rules('building', 'NOUNV', {
  'NOM:vn': { o: 1, f: 3, t: '*-nie / -cie*: the action as a noun',
    x: 'Almost every verb has a noun for the action: *czytać → czytanie* (reading), *pić → picie*, *wyjść → wyjście* (exit). Many of these have turned into ordinary things: *mieszkanie* (a "living" = flat), *zadanie* (task), *zdanie* (sentence), *ubranie* (clothes).' },
  'NOM:zero': { o: 2, f: 3, t: 'Short nouns from prefixed verbs: wyjazd, podpis',
    x: 'Prefixed verbs give nouns with no suffix at all — just the prefix and root, often with a vowel change: *wyjechać → wyjazd*, *podpisać → podpis*, *wybrać → wybór* (the root shows up as *bór*), *wschodzić → wschód*. If you know the verb, you can read the noun.' },
  'NOM:ek': { o: 7, f: 2, t: 'Nouns in *-ek, -tek, -ka* from verbs',
    x: 'A result or an event: *wydać → wydatek* (expense), *dodać → dodatek* (supplement), *wnieść → wniosek*, *przystanąć → przystanek* (stop), *przesyłać → przesyłka* (parcel), *przeprowadzić się → przeprowadzka* (a move).' },
});

PL.rules('building', 'PEOPLE', {
  'SFX:arz': { o: 3, f: 3, t: '*-arz*: someone whose trade it is',
    x: 'A person (often a trade) connected with the base: *lek* (medicine) → *lekarz* (doctor), *piec* (to bake) → *piekarz*, *pisać → pisarz* (writer), *kuchnia → kucharz* (cook), *bramka* (goal) → *bramkarz*.' },
  'SFX:nik': { o: 4, f: 3, t: '*-nik*: a person — or a thing',
    x: 'Someone or something connected with the base: *praca → pracownik* (employee), *ogród → ogrodnik* (gardener), *przewodzić → przewodnik* (guide). Often a thing: *słowo → słownik* (dictionary), *dzień → dziennik* (diary; daily paper), *ręka → ręcznik* (towel).' },
  'SFX:agent': { o: 9, f: 2, t: 'Who does it: *-acz, -ca, -ciel, -ec*',
    x: 'Nouns for the doer of an action: *słuchać → słuchacz* (listener), *palić → palacz* (smoker), *kierować → kierowca* (driver), *sprzedawać → sprzedawca*, *nauczyć → nauczyciel*, *kupić → kupiec* (merchant).' },
  'SFX:fem': { o: 5, f: 3, t: 'Women: *-ka, -yni, -owa*',
    x: 'Most feminine forms add *-ka*: *student → studentka, Polak → Polka, lekarz → lekarka*, with a consonant change where needed (*kolega → koleżanka*). Nouns in *-ca* take *-czyni* (*sprzedawca → sprzedawczyni*); a few take *-yni* or *-owa* (*mistrz → mistrzyni, król → królowa*).' },
  'SFX:inhab': { o: 14, f: 2, t: 'Where people are from: *-anin, -ak, -ec*',
    x: 'Inhabitants and nationalities: *Polska → Polak*, *Ameryka → Amerykanin* (plural *-anie*: *Amerykanie*), *Warszawa → warszawiak*, *Kraków → krakowianin*, *Ukraina → Ukrainiec*, *mieszkać → mieszkaniec* (resident). Women add *-ka*: *Polka, Amerykanka*.' },
});

PL.rules('building', 'THINGS', {
  'SFX:place': { o: 6, f: 3, t: 'Places: *-arnia, -alnia, -nia*',
    x: '*-arnia* is a shop or workshop: *kawa → kawiarnia* (café), *księga → księgarnia* (bookshop), *piec → piekarnia* (bakery). *-alnia* is a room or place for an activity: *sypiać* (sleep) *→ sypialnia* (bedroom), *jeść → jadalnia* (dining room), *czekać → poczekalnia* (waiting room).' },
  'SFX:isko': { o: 10, f: 2, t: 'Grounds and sites: *-isko*',
    x: 'An open place where something happens: *lot* (flight) → *lotnisko* (airport), *lód → lodowisko* (ice rink), *kąpiel → kąpielisko* (bathing area), *ogień → ognisko* (bonfire). *-isko* can also make things big and rough: *pies → psisko*.' },
  'SFX:tool': { o: 8, f: 3, t: 'Machines and tools: *-arka, -acz, -ówka, -dło*',
    x: '*-arka* is a machine: *zmywać → zmywarka* (dishwasher), *drukować → drukarka* (printer), *ładować → ładowarka* (charger). *-acz* a device: *odkurzać → odkurzacz* (vacuum cleaner). *-ówka*: *lód → lodówka* (fridge). *-dło* an old tool suffix: *myć → mydło* (soap).' },
});

PL.rules('building', 'ABSTR', {
  'SFX:osc': { o: 11, f: 3, t: '*-ość*: adjective → quality',
    x: 'Turns an adjective into an abstract noun, like English *-ness / -ity*: *młody → młodość* (youth), *wolny → wolność* (freedom), *szybki → szybkość* (speed), *wysoki → wysokość* (height). All are feminine: *ta wolność*.' },
  'SFX:stwo': { o: 15, f: 2, t: '*-stwo / -ctwo*: state, domain, group',
    x: 'A state, a field or a collective: *bogaty → bogactwo* (wealth), *dziecko → dzieciństwo* (childhood), *rolnik → rolnictwo* (agriculture), *król → królestwo* (kingdom), *pan → państwo* (the state; ladies and gentlemen). All neuter.' },
});

PL.rules('building', 'DIM', {
  'DIM:m': { o: 12, f: 3, t: 'Diminutives in *-ek, -ik, -yk*',
    x: 'Masculine nouns get small with *-ek* (*dom → domek, kot → kotek*) or *-ik / -yk* after some consonants (*stół → stolik, klucz → kluczyk*). The fleeting *e* of *-ek* disappears again in other forms: *domek → domku*.' },
  'DIM:fn': { o: 13, f: 3, t: 'Diminutives in *-ka, -ko*',
    x: 'Feminine *-a* → *-ka*, neuter *-o / -e* → *-ko*, often with a vowel or consonant change: *ręka → rączka, noga → nóżka, głowa → główka, okno → okienko, piwo → piwko*. Some became new words: *woda → wódka* ("little water"), *karta → kartka* (sheet of paper).' },
  'DIM:pet': { o: 20, f: 2, t: 'Pet names: Kasia, Tomek, mamusia',
    x: 'Polish first names have everyday short forms, used among friends and family: *Katarzyna → Kasia, Tomasz → Tomek, Jan → Janek / Jaś, Małgorzata → Gosia, Jakub → Kuba, Aleksandra → Ola*. Family words too: *mama → mamusia, tata → tatuś*.' },
  'DIM:aug': { o: 24, f: 1, t: 'Big and rough: *-isko, -ina*',
    x: '*-isko* makes things big and rough — but often fondly or with pity: *pies → psisko* (big dog; dear old dog), *chłop → chłopisko* (*biedne chłopisko* = the poor guy). *-ina* adds pity or tenderness: *pies → psina* (poor dog).' },
});

PL.rules('building', 'ADJ', {
  'ADJ:owy': { o: 16, f: 3, t: '*-owy*: made of, belonging to, for',
    x: 'The most common way to turn a noun into an adjective: *dom → domowy* (home-made, domestic), *owoc → owocowy* (fruit), *zima → zimowy* (winter), *papier → papierowy*. Soups are adjectives with *zupa* left out: *pomidor → pomidorowa* (tomato soup).' },
  'ADJ:ny': { o: 17, f: 3, t: '*-ny, -czny*: of, connected with',
    x: 'Another adjective suffix, often with a consonant change: *ręka → ręczny* (manual), *noga → nożny* (*piłka nożna* = football), *mleko → mleczny* (dairy), *słońce → słoneczny* (sunny), *rok → roczny* (annual), *głowa → główny* (main).' },
  'ADJ:ski': { o: 18, f: 3, t: '*-ski, -cki*: of a place or people',
    x: 'Places and people: *Polska → polski, Kraków → krakowski, miasto → miejski* (urban), *wieś → wiejski* (rural), *morze → morski*, *mąż → męski* (men\'s, male), *ludzie → ludzki* (human). Before *-ski*, k / c fuse into *-cki* (*Niemcy → niemiecki*), d / dz into *-dzki* (*ludzie → ludzki*, *Łódź → łódzki*); g just drops (*Bóg → boski*, *Praga → praski*).' },
  'ADJ:aty': { o: 25, f: 1, t: 'Having or full of: *-aty, -isty*',
    x: '*-aty* = having (a lot of) something: *broda → brodaty* (bearded), *skrzydło → skrzydlaty* (winged). *-isty* = full of: *piasek → piaszczysty* (sandy), *mgła → mglisty* (misty), *góra → górzysty* (mountainous).' },
  'ADJ:liwy': { o: 22, f: 2, t: 'Inclined to: *-liwy, -ity*',
    x: 'A tendency: *gadać → gadatliwy* (talkative), *cierpieć → cierpliwy* (patient — "able to suffer"), *płakać → płaczliwy* (tearful), *troska → troskliwy* (caring), *praca → pracowity* (hard-working).' },
  'ADJ:alny': { o: 23, f: 2, t: 'Can be done: *-alny, -ny*',
    x: 'Like English *-able*: *jeść → jadalny* (edible), *pić → pitny* (*woda pitna* = drinking water), *czytać → czytelny* (legible), *słyszeć → słyszalny* (audible), *przenosić → przenośny* (portable).' },
  'ADJ:neg': { o: 19, f: 3, t: '*nie-* and *bez-*: not, without',
    x: '*nie-* = not: *możliwy → niemożliwy*. *bez-* = without (+ *-ny / -owy*): *dom → bezdomny* (homeless), *płacić* (pay; stem *płat-* as in *płatny*) → *bezpłatny* (free of charge), *przewód → bezprzewodowy* (wireless). They stack: *bezpieczny* (safe — "without worry") → *niebezpieczny* (dangerous).' },
  'ADJ:comp': { o: 21, f: 3, t: 'Comparison: *-szy, -ejszy, naj-*',
    x: 'Add *-szy* (*nowy → nowszy, młody → młodszy*) or, after a cluster, *-ejszy* (*ładny → ładniejszy, trudny → trudniejszy*); consonants shift before them (*drogi → droższy, wysoki → wyższy*). The superlative adds *naj-*: *najnowszy*. Irregular: *dobry → lepszy, zły → gorszy, duży → większy, mały → mniejszy*.' },
  'ADJ:dim': { o: 26, f: 1, t: '*-utki* (very, fondly) and *-awy* (-ish)',
    x: '*-utki / -uteńki* = "very", said fondly: *mały → malutki* (tiny), *cichy → cichutki* (very quiet), *młody → młodziutki* (very young). *-awy* = -ish: *zielony → zielonkawy* (greenish), *słodki → słodkawy* (sweetish).' },
});

PL.rules('building', 'ADV', {
  'ADV:o': { o: 27, f: 3, t: 'Adverbs: *-o, -e, -ie*',
    x: 'Most adjectives make an adverb with *-o* (*szybki → szybko, cichy → cicho*) or *-e / -ie* with a softened consonant (*ładny → ładnie, mądry → mądrze*). *dobry → dobrze* follows *mądrze* (r → rz); irregular: *zły → źle*. Many are also used as "it is…": *zimno* (it\'s cold), *trudno* (it\'s hard).' },
  'ADV:po': { o: 28, f: 2, t: '*po* + *-u*: po polsku, po cichu',
    x: 'Languages and manners: *po polsku* (in Polish), *po angielsku, po fińsku*; *po cichu* (quietly), *po prostu* (simply), *po kolei* (in turn), *po swojemu* (your own way).' },
});

PL.rules('building', 'VRB', {
  'VRB:eć': { o: 29, f: 1, t: 'Becoming: *-eć, -nąć*',
    x: 'Verbs for turning into something: *biały → bieleć* (turn white), *czerwony → czerwienieć* (go red, blush), *stary → starzeć się* (age), *chudy → chudnąć* (lose weight), *siwy → siwieć* (go grey).' },
  'VRB:ić': { o: 30, f: 2, t: 'Making: *-ić, -ować* (and from comparatives!)',
    x: 'Verbs for making something so: *czysty → czyścić* (clean), *suchy → suszyć* (dry), *słodki → słodzić* (sweeten). Even from comparatives: *lepszy → ulepszyć* (improve), *gorszy → pogorszyć* (worsen), *większy → powiększyć* (enlarge). And *gotowy* (ready) → *gotować* (to cook — "make ready").' },
});

PL.rules('building', 'PART', {
  'PART:acy': { o: 31, f: 2, t: '*-ący* (…-ing) and *-ąc* (while …-ing)',
    x: 'From the "they" form of an imperfective verb: *czytają → czytający* (reading — an adjective), *czytając* (while reading). *Śpiąca Królewna* = Sleeping Beauty; *latający talerz* = flying saucer; *Idąc do pracy, kupiłem gazetę* = walking to work, I bought a paper.' },
  'PART:ny': { o: 32, f: 2, t: '*-ny, -ony, -ty*: done (passive)',
    x: 'What has been done to something: *przeczytany* (read), *zrobiony* (made), *zamknięty* (closed), *otwarty* (open), *zmęczony* (tired — "worn out"). In the kitchen: *pieczony* (roast), *smażony* (fried), *gotowany* (boiled).' },
});

PL.rules('building', 'CMP', {
  'CMP:compound': { o: 33, f: 1, t: 'Compounds: two roots joined by *-o-*',
    x: 'Two roots joined with a linking *-o-*: *długopis* ("long-writer" → pen), *listonosz* ("letter-carrier" → postman), *śrubokręt* ("screw-turner" → screwdriver), *korkociąg* ("cork-puller" → corkscrew).' },
  'CMP:calque': { o: 34, f: 1, t: 'Calques: foreign words rebuilt in Polish',
    x: 'Many learned words copy a Latin, Greek or German original piece by piece: *samochód* (auto-mobile), *przenośnia* (meta-phor), *przypadek* (casus, "a falling" → a case). Even the case names are calques: *mianownik* ("naming") = nominative, *narzędnik* ("tool") = instrumental, *miejscownik* ("place") = locative.' },
});

PL.rules('building', 'NPFX', {
  'NPFX:time': { o: 17.5, f: 2, t: '*przed-* and *po-*: before and after',
    x: 'With time words *przed-* means before and *po-* after: *wczoraj → przedwczoraj* (the day before yesterday), *jutro → pojutrze* (the day after tomorrow), *południe* (noon) → *przedpołudnie* (late morning), *popołudnie* (afternoon); *wojna → przedwojenny, powojenny* (pre-war, post-war); *szkoła → przedszkole* (nursery school).' },
  'NPFX:place': { o: 23.5, f: 2, t: 'Places: *przed-, pod-, za-, po-* fused with a noun',
    x: 'Prepositions of place fused with their noun into one word — read it as the phrase (*pod ziemią* = under the ground, *za granicą* = beyond the border): *przedpokój* (hall — "before the room"), *przedmieście* (suburb — "before the town"), *podziemie* (underground — "under the earth"), *podręcznik* (textbook — the book "at hand"), *zagranica* (foreign countries — "beyond the border"), *Pomorze* (Pomerania — "along the sea").' },
  'NPFX:degree': { o: 32.5, f: 1, t: '*współ-, pra-, arcy-, nad-, przeciw-*',
    x: '*współ-* = co-, together: *praca → współpraca* (cooperation), *lokator → współlokator* (flatmate). *pra-* goes one generation further: *dziadek → pradziadek* (great-grandfather), *wnuk → prawnuk* (great-grandson); elsewhere it means age-old, proto-: *prastary* (ancient), *prahistoria* (prehistory). *arcy-* = arch-, supreme: *dzieło → arcydzieło* (masterpiece); on adjectives, "extremely": *arcyciekawy*. *nad-* = over, too much: *waga → nadwaga* (overweight), *godziny → nadgodziny* (overtime). *przeciw-* = against: *ból → przeciwbólowy* (painkilling).' },
});

PL.rules('building', 'ROOT', {
  'ROOT:base': { o: 9.5, f: 2, t: 'Find the base word',
    x: 'A derived word often hides its base behind a sound change. Undo it: *rączka → ręka* (ą ↔ ę, cz ↔ k), *nóżka → noga* (ó ↔ o, ż ↔ g), *męski → mąż*, *miejski → miasto*, *piekarz → piec*. Look up the base and the meaning usually falls into place.' },
});

/* ══ Families by base word ══ */

PL.nest({
  id: 'dom', root: 'dom-', gloss: 'house, home', mod: 'building',
  intro: 'A small family that shows the main suffix types at once: a diminutive, an adjective, a person, and *bez-*.',
  m: [
    ['dom', 'dom', 'house, home', null, null],
    ['domek', 'dom|-ek', 'little house, cottage', 'DIM:m', 'dom', { ex: [['Mamy mały {domek} nad jeziorem.', 'We have a little cottage by the lake.']] }],
    ['domowy', 'dom|-owy', 'home-made; domestic, household', 'ADJ:owy', 'dom', { n: '*ciasto domowe* = home-made cake; *zadanie domowe* = homework.' }],
    ['domownik', 'dom|-ownik', 'member of the household', 'SFX:nik', 'dom'],
    ['bezdomny', 'bez-|dom|-ny', 'homeless', 'ADJ:neg', 'dom', { pos: 'adj' }],
    ['domator', 'dom|-ator', 'homebody', 'SFX:agent', 'dom', { n: 'Someone who prefers to stay at home.' }],
  ],
});

PL.nest({
  id: 'reka', root: 'ręk- · rąk- · ręcz-', gloss: 'hand', mod: 'building',
  roots: { 'ręk': 'hand', 'rącz': 'hand', 'ręcz': 'hand', 'ręczn': 'hand' },
  intro: 'One root, four faces: *ręk-* (ręka), *rąk-* (rąk), *rącz-* (rączka) and *ręcz-* (ręczny). Spotting these alternations is half of reading Polish.',
  m: [
    ['ręka', 'ręk|-a', 'hand, arm', null, null],
    ['rączka', 'rącz|-ka', 'little hand; handle', 'DIM:fn', 'ręka', { n: 'ę → ą and k → cz: the diminutive also names the handle of a bag, a suitcase or a pram (a cup\'s handle is *ucho*, "ear").' }],
    ['ręczny', 'ręcz|-ny', 'hand-, manual', 'ADJ:ny', 'ręka', { pos: 'adj', n: '*hamulec ręczny* = handbrake; *bagaż ręczny* = hand luggage.' }],
    ['ręcznik', 'ręcz|-nik', 'towel', 'SFX:nik', 'ręka', { lit: 'the hand-thing' }],
    ['ręcznie', 'ręczn|-ie', 'by hand', 'ADV:o', 'ręczny', { pos: 'adv' }],
    ['rękaw', 'ręk|-aw', 'sleeve', null, null],
    ['rękawiczka', 'ręk|-aw|-iczka', 'glove', 'DIM:fn', 'rękawica', { fm: 'glove, mitten (big: work, boxing)', lit: 'little glove', n: '*rękaw* (sleeve) → *rękawica* (glove) → *rękawiczka*; c → cz before *-ka*.' }],
  ],
});

PL.nest({
  id: 'noga', root: 'nog- · nóż- · noż-', gloss: 'leg, foot', mod: 'building',
  roots: { 'nog': 'leg', 'nóż': 'leg', 'noż': 'leg' },
  m: [
    ['noga', 'nog|-a', 'leg, foot', null, null],
    ['nóżka', 'nóż|-ka', 'little leg; leg (of furniture); stem (of a glass)', 'DIM:fn', 'noga'],
    ['nożny', 'noż|-ny', 'foot-, of the foot', 'ADJ:ny', 'noga', { pos: 'adj', n: '*piłka nożna* = football ("foot-ball"); *hamulec nożny* = footbrake.' }],
    ['nogawka', 'nog|-awka', 'trouser leg', null, null],
  ],
});

PL.nest({
  id: 'glowa', root: 'głow- · główn-', gloss: 'head', mod: 'building',
  roots: { 'głow': 'head', 'głów': 'head', 'główn': 'head' },
  m: [
    ['głowa', 'głow|-a', 'head', null, null],
    ['główka', 'głów|-ka', 'little head; header (football)', 'DIM:fn', 'głowa'],
    ['główny', 'głów|-ny', 'main, chief', 'ADJ:ny', 'głowa', { pos: 'adj', lit: 'head-', n: 'The "head" one: *dworzec główny* = main station, *wejście główne* = main entrance.' }],
    ['głównie', 'główn|-ie', 'mainly', 'ADV:o', 'główny', { pos: 'adv' }],
    ['łamigłówka', 'łam|-i-|głów|-ka', 'puzzle, brain-teaser', 'CMP:compound', null, { lit: 'break-head' }],
  ],
});

PL.nest({
  id: 'kawa', root: 'kaw-', gloss: 'coffee', mod: 'building',
  m: [
    ['kawa', 'kaw|-a', 'coffee', null, null],
    ['kawiarnia', 'kaw|-iarnia', 'café', 'SFX:place', 'kawa', { lit: 'coffee-place', ex: [['Spotkajmy się w {kawiarni}.', 'Let\'s meet at the café.']] }],
    ['kawka', 'kaw|-ka', 'a (nice little) coffee', 'DIM:fn', 'kawa', { n: '*Wpadniesz na kawkę?* = Will you pop in for a coffee? — the diminutive is friendly, not small.' }],
    ['kawowy', 'kaw|-owy', 'coffee-, coffee-coloured', 'ADJ:owy', 'kawa', { pos: 'adj' }],
    ['kawiarka', 'kaw|-iarka', 'stovetop coffee maker (moka pot)', 'SFX:tool', 'kawa'],
  ],
});

PL.nest({
  id: 'ksiega', root: 'księg- · książ-', gloss: 'book', mod: 'building',
  roots: { 'księg': 'book', 'książ': 'book', 'księgow': 'book-keeping' },
  intro: 'A diminutive chain: *księga* (a big, old book) → *książka* (book) → *książeczka* (booklet). Today\'s ordinary word was once the "little" one.',
  m: [
    ['księga', 'księg|-a', 'book (large, old, formal); ledger', null, null],
    ['książka', 'książ|-ka', 'book', 'DIM:fn', 'księga', { lit: 'little book', n: 'Once the diminutive of *księga*, now the normal word.' }],
    ['książeczka', 'książ|-eczka', 'booklet; little book', 'DIM:fn', 'książka', { n: 'A diminutive of a diminutive. *książeczka zdrowia* = health record booklet.' }],
    ['księgarnia', 'księg|-arnia', 'bookshop', 'SFX:place', 'księga', { ex: [['Kupiłam ten słownik w {księgarni}.', 'I (f.) bought this dictionary in a bookshop.']] }],
    ['księgowy', 'księg|-owy', 'accountant', 'ADJ:owy', 'księga', { lit: 'the book (keeping) one', n: 'An adjective used as a noun: the one who keeps the books (*księgi*). *księgowa* = female accountant.' }],
    ['księgowość', 'księg|-owość', 'accounting, book-keeping', 'SFX:osc', 'księgowy'],
  ],
});

PL.nest({
  id: 'lod', root: 'lód · lod-', gloss: 'ice', mod: 'building',
  roots: { 'lod': 'ice', 'lód': 'ice', 'lodz': 'ice' },
  m: [
    ['lód', 'lód', 'ice', null, null],
    ['lody', 'lod|-y', 'ice cream', null, null, { n: 'Simply the plural of *lód*: "ices".' }],
    ['lodówka', 'lod|-ówka', 'fridge', 'SFX:tool', 'lód', { lit: 'the ice-thing', ex: [['Mleko jest w {lodówce}.', 'The milk is in the fridge.']] }],
    ['lodowisko', 'lod|-owisko', 'ice rink', 'SFX:isko', 'lód'],
    ['lodowaty', 'lod|-owaty', 'icy, ice-cold', 'ADJ:aty', 'lód', { pos: 'adj' }],
    ['lodowiec', 'lod|-owiec', 'glacier', null, null, { gl: ['ice', '(thing)'] }],
    ['lodziarnia', 'lodz|-iarnia', 'ice-cream parlour', 'SFX:place', 'lody'],
  ],
});

PL.nest({
  id: 'woda', root: 'wod- · wód-', gloss: 'water', mod: 'building',
  roots: { 'wod': 'water', 'wód': 'water' },
  m: [
    ['woda', 'wod|-a', 'water', null, null],
    ['wódka', 'wód|-ka', 'vodka', 'DIM:fn', 'woda', { lit: 'little water', n: 'Yes, really: a diminutive of *woda* (o → ó).' }],
    ['wodny', 'wod|-ny', 'water-, aquatic', 'ADJ:ny', 'woda', { pos: 'adj', n: '*sporty wodne* = water sports.' }],
    ['wodnisty', 'wod|-nisty', 'watery', 'ADJ:aty', 'woda', { pos: 'adj' }],
    ['podwodny', 'pod-|wod|-ny', 'underwater', 'ADJ:ny', 'woda', { pos: 'adj', noroot: true }],
    ['wodospad', 'wod|-o-|spad', 'waterfall', 'CMP:compound', null, { lit: 'water-fall' }],
  ],
});

PL.nest({
  id: 'piec', root: 'piec · piek-', gloss: 'bake', mod: 'building',
  roots: { 'piek': 'bake', 'piecz': 'bake', 'piec': 'bake; stove' },
  intro: '*piec* is both "to bake" and "a stove". Watch *c / k / cz*: *piec, piekę, pieczesz*.',
  m: [
    ['piec', 'piec', 'to bake; a stove, oven', null, null],
    ['piekarz', 'piek|-arz', 'baker', 'SFX:arz', 'piec'],
    ['piekarnia', 'piek|-arnia', 'bakery', 'SFX:place', 'piec', { ex: [['Chleb kupuję zawsze w tej {piekarni}.', 'I always buy bread at this bakery.']] }],
    ['piekarnik', 'piek|-arnik', 'oven', 'SFX:nik', 'piec'],
    ['pieczywo', 'piecz|-ywo', 'bread and rolls, baked goods', null, null],
    ['pieczony', 'piecz|-ony', 'roast, baked', 'PART:ny', 'piec', { pos: 'adj', n: '*pieczony kurczak* = roast chicken.' }],
  ],
});

PL.nest({
  id: 'lek', root: 'lek- · lecz-', gloss: 'medicine, cure', mod: 'building',
  roots: { 'lek': 'medicine', 'lecz': 'heal', 'lekar': 'doctor' },
  m: [
    ['lek', 'lek', 'medicine, drug', null, null],
    ['lekarz', 'lek|-arz', 'doctor', 'SFX:arz', 'lek', { lit: 'the medicine-man' }],
    ['lekarka', 'lekar|-ka', 'doctor (woman)', 'SFX:fem', 'lekarz'],
    ['lekarstwo', 'lek|-arstwo', 'medicine (a remedy)', 'SFX:stwo', 'lekarz'],
    ['leczyć', 'lecz|-yć', 'to treat, cure', 'VRB:ić', 'lek', { n: 'k → cz before *-yć*.' }],
  ],
});

PL.nest({
  id: 'mlody', root: 'młod- · młodz-', gloss: 'young', mod: 'building',
  roots: { 'młod': 'young', 'młodz': 'young' },
  m: [
    ['młody', 'młod|-y', 'young', null, null, { pos: 'adj' }],
    ['młodość', 'młod|-ość', 'youth', 'SFX:osc', 'młody'],
    ['młodzież', 'młodz|-ież', 'young people, youth (collective)', null, null],
    ['młodszy', 'młod|-szy', 'younger', 'ADJ:comp', 'młody', { pos: 'adj' }],
    ['młodnieć', 'młod|-nieć', 'to grow younger, look younger', 'VRB:eć', 'młody'],
    ['odmłodzić', 'od-|młodz|-ić', 'to rejuvenate', 'VRB:ić', 'młody'],
    ['młodziutki', 'młodz|-iutki', 'very young', 'ADJ:dim', 'młody', { pos: 'adj' }],
  ],
});

PL.nest({
  id: 'stary', root: 'star-', gloss: 'old', mod: 'building',
  roots: { 'star': 'old', 'starz': 'old' },
  m: [
    ['stary', 'star|-y', 'old', null, null, { pos: 'adj' }],
    ['starość', 'star|-ość', 'old age', 'SFX:osc', 'stary'],
    ['starszy', 'star|-szy', 'older', 'ADJ:comp', 'stary', { pos: 'adj', n: '*starszy pan* = an elderly gentleman (politer than *stary*).' }],
    ['starzec', 'starz|-ec', 'old man', 'SFX:agent', 'stary', { n: 'Literary (*Starzec i morze* — The Old Man and the Sea); in everyday speech *staruszek* or *starszy pan*.' }],
    ['starzeć się', 'starz|-eć', 'to age, grow old', 'VRB:eć', 'stary', { gl: ['old', 'become'] }],
    ['staruszek', 'star|-uszek', 'little old man', 'DIM:m', 'stary'],
  ],
});

PL.nest({
  id: 'czysty', root: 'czyst- · czyść-', gloss: 'clean', mod: 'building',
  roots: { 'czyst': 'clean', 'czyść': 'clean' },
  m: [
    ['czysty', 'czyst|-y', 'clean', null, null, { pos: 'adj' }],
    ['czystość', 'czyst|-ość', 'cleanliness', 'SFX:osc', 'czysty'],
    ['czysto', 'czyst|-o', 'cleanly; (it is) clean', 'ADV:o', 'czysty', { pos: 'adv' }],
    ['czyścić', 'czyść|-ić', 'to clean', 'VRB:ić', 'czysty', { n: 'st → ść before *-ić*.' }],
    ['wyczyścić', 'wy-|czyść|-ić', 'to clean (thoroughly, pf.)', 'PFX:wy', 'czyścić'],
    ['nieczysty', 'nie-|czyst|-y', 'unclean, impure', 'ADJ:neg', 'czysty', { pos: 'adj' }],
  ],
});

PL.nest({
  id: 'bialy', root: 'biał- · biel-', gloss: 'white', mod: 'building',
  roots: { 'biał': 'white', 'biel': 'white' },
  m: [
    ['biały', 'biał|-y', 'white', null, null, { pos: 'adj' }],
    ['biel', 'biel', 'whiteness, (the colour) white', null, null],
    ['bieleć', 'biel|-eć', 'to turn white', 'VRB:eć', 'biały', { gl: ['white', 'become'], n: 'ał → el before *-eć*.' }],
    ['wybielić', 'wy-|biel|-ić', 'to whiten, bleach', 'VRB:ić', 'biały'],
    ['białawy', 'biał|-awy', 'whitish', 'ADJ:dim', 'biały', { pos: 'adj' }],
    ['białko', 'biał|-ko', 'egg white; protein', null, null, { gl: ['white', '(the thing)'], lit: 'the white (part)', n: 'Not "small": *-ko* names the white thing — like *żółtko* (yolk) from *żółty*.' }],
  ],
});

PL.nest({
  id: 'ziemia', root: 'ziem-', gloss: 'earth, land', mod: 'building',
  m: [
    ['ziemia', 'ziem|-ia', 'earth, ground, land; the Earth', null, null],
    ['ziemniak', 'ziem|-niak', 'potato', 'SFX:nik', 'ziemia', { lit: 'the earth-thing', n: 'Like French *pomme de terre* — "earth apple".' }],
    ['ziemski', 'ziem|-ski', 'earthly, of the Earth', 'ADJ:ski', 'ziemia', { pos: 'adj' }],
    ['podziemny', 'pod-|ziem|-ny', 'underground', 'ADJ:ny', 'ziemia', { pos: 'adj', n: '*przejście podziemne* = underpass.' }],
    ['cudzoziemiec', 'cudz|-o-|ziem|-iec', 'foreigner', 'CMP:compound', null, { lit: 'one from another\'s land', n: '*cudzy* = someone else\'s.' }],
  ],
});

PL.nest({
  id: 'slonce', root: 'słońc- · słonecz-', gloss: 'sun', mod: 'building',
  roots: { 'słońc': 'sun', 'słonecz': 'sun' },
  m: [
    ['słońce', 'słońc|-e', 'sun', null, null],
    ['słoneczko', 'słonecz|-ko', 'little sun; sweetheart', 'DIM:fn', 'słońce', { n: 'Also a term of endearment, like "sunshine".' }],
    ['słoneczny', 'słonecz|-ny', 'sunny; solar', 'ADJ:ny', 'słońce', { pos: 'adj', n: '*układ słoneczny* = the solar system.' }],
    ['słonecznik', 'słonecz|-nik', 'sunflower', 'SFX:nik', 'słońce'],
  ],
});

PL.nest({
  id: 'praca', root: 'prac-', gloss: 'work', mod: 'building',
  roots: { 'prac': 'work' },
  m: [
    ['praca', 'prac|-a', 'work, job', null, null],
    ['pracownik', 'prac|-ownik', 'employee, worker', 'SFX:nik', 'praca'],
    ['pracownia', 'prac|-ownia', 'workshop, studio, lab', 'SFX:place', 'praca'],
    ['pracowity', 'prac|-owity', 'hard-working', 'ADJ:liwy', 'praca', { pos: 'adj' }],
    ['pracodawca', 'prac|-o-|daw|-ca', 'employer', 'CMP:compound', null, { lit: 'work-giver' }],
    ['bezrobotny', 'bez-|robot|-ny', 'unemployed', 'ADJ:neg', 'robota', { pos: 'adj', fm: 'work (colloquial)', n: 'From *robota* (work), not *praca* — the family of *robić*.' }],
  ],
});

PL.nest({
  id: 'gotowy', root: 'gotow-', gloss: 'ready', mod: 'building',
  roots: { 'gotow': 'ready', 'gotów': 'ready' },
  intro: 'A family with a surprise: cooking (*gotować*) is "making ready", and cash (*gotówka*) is "ready money".',
  m: [
    ['gotowy', 'gotow|-y', 'ready', null, null, { pos: 'adj' }],
    ['gotować', 'gotow|-ać', 'to cook; to boil', 'VRB:ić', 'gotowy', { lit: 'make ready' }],
    ['przygotować', 'przy-|gotow|-ać', 'to prepare', 'PFX:przy', 'gotować', { ex: [['Kto {przygotował} kolację?', 'Who prepared dinner?']] }],
    ['gotowanie', 'gotow|-anie', 'cooking', 'NOM:vn', 'gotować'],
    ['gotowany', 'gotow|-any', 'boiled', 'PART:ny', 'gotować', { pos: 'adj', n: '*jajko gotowane* = boiled egg.' }],
    ['gotówka', 'gotów|-ka', 'cash', null, null, { lit: '"ready" (money)', n: '*Płacę gotówką* = I\'m paying in cash.' }],
  ],
});
PL.verb('przygotować', { from: ['przy', 'gotować'], m: 'to prepare', asp: 'pf' });

PL.nest({
  id: 'polska', root: 'Polsk- · Polak · polszcz-', gloss: 'Poland', mod: 'building',
  roots: { 'Pol': 'Pole', 'pol': 'Polish', 'polszcz': 'Polish' },
  m: [
    ['Polska', 'Pol|-ska', 'Poland', null, null],
    ['Polak', 'Pol|-ak', 'Pole (man)', 'SFX:inhab', 'Polska'],
    ['Polka', 'Pol|-ka', 'Pole (woman)', 'SFX:fem', 'Polak'],
    ['polski', 'pol|-ski', 'Polish', 'ADJ:ski', 'Polska', { pos: 'adj', n: 'Adjectives of nationality are written with a small letter: *język polski*. *Polska* is itself this adjective: *(ziemia) polska*, "the Polish land".' }],
    ['po polsku', 'po|pol|-sku', 'in Polish', 'ADV:po', 'polski', { pos: 'adv', ex: [['Mówisz {po polsku}?', 'Do you speak Polish?']] }],
    ['polszczyzna', 'polszcz|-yzna', 'the Polish language (as a whole)', null, null],
  ],
});

PL.nest({
  id: 'finlandia', root: 'Fin-', gloss: 'Finland', mod: 'building',
  m: [
    ['Finlandia', 'Fin|-landia', 'Finland', null, null],
    ['Fin', 'Fin', 'Finn (man)', null, null],
    ['Finka', 'Fin|-ka', 'Finn (woman)', 'SFX:fem', 'Fin'],
    ['fiński', 'fiń|-ski', 'Finnish', 'ADJ:ski', 'Fin', { pos: 'adj', n: 'n → ń before *-ski*.' }],
    ['po fińsku', 'po|fiń|-sku', 'in Finnish', 'ADV:po', 'fiński', { pos: 'adv' }],
  ],
});

/* ══ Thematic families ══ */

PL.nest({
  id: 'places', root: '-arnia · -alnia · -nia', gloss: 'shops and rooms', mod: 'building',
  intro: '*-arnia* (often a shop or workshop) and *-alnia / -elnia* (a room or place for doing something).',
  m: [
    ['kwiaciarnia', 'kwiac|-iarnia', 'florist\'s', 'SFX:place', 'kwiat', { fm: 'flower', n: 't → c before *-iarnia*.' }],
    ['cukiernia', 'cukier|-nia', 'pastry shop, cake shop', 'SFX:place', 'cukier'],
    ['sypialnia', 'sypi|-alnia', 'bedroom', 'SFX:place', 'sypiać', { fm: 'to sleep (regularly)', lit: 'sleeping-room', n: 'Built on *sypiać*, the "repeatedly" form of *spać* (to sleep).' }],
    ['jadalnia', 'jad|-alnia', 'dining room', 'SFX:place', 'jeść', { lit: 'eating-room' }],
    ['pralnia', 'pra|-lnia', 'laundry, dry cleaner\'s', 'SFX:place', 'prać', { fm: 'to wash (clothes)' }],
    ['poczekalnia', 'po-|czek|-alnia', 'waiting room', 'SFX:place', 'poczekać'],
    ['przebieralnia', 'prze-|bier|-alnia', 'changing room', 'SFX:place', 'przebierać się', { fm: 'to change (clothes)' }],
    ['wypożyczalnia', 'wy-|pożycz|-alnia', 'rental shop; lending library', 'SFX:place', 'wypożyczać', { fm: 'to hire, borrow' }],
    ['kopalnia', 'kop|-alnia', 'mine (coal, salt)', 'SFX:place', 'kopać', { fm: 'to dig', n: '*kopalnia soli w Wieliczce* = the Wieliczka salt mine.' }],
  ],
});

PL.nest({
  id: 'grounds', root: '-isko', gloss: 'grounds and sites', mod: 'building',
  intro: 'Open places where something happens — and one surprise: *środowisko* (environment), literally "the middle-place" around you.',
  m: [
    ['lotnisko', 'lot|-nisko', 'airport', 'SFX:isko', 'lot', { fm: 'flight', lit: 'flight-ground', ex: [['Jadę na {lotnisko}.', 'I\'m going to the airport.']] }],
    ['kąpielisko', 'kąpiel|-isko', 'bathing area, lido', 'SFX:isko', 'kąpiel', { fm: 'bath, swim' }],
    ['targowisko', 'targ|-owisko', 'marketplace', 'SFX:isko', 'targ', { fm: 'market' }],
    ['ognisko', 'ogn|-isko', 'bonfire, campfire', 'SFX:isko', 'ogień', { fm: 'fire', n: 'Fleeting e: *ogień → ognia → ognisko*.' }],
    ['schronisko', 's-|chron|-isko', 'shelter; mountain hostel', 'SFX:isko', 'schronić się', { fm: 'to take shelter', n: '*schronisko dla zwierząt* = animal shelter.' }],
    ['środowisko', 'środ|-owisko', 'environment; milieu', 'SFX:isko', 'środek', { fm: 'middle, centre', lit: 'middle-place', n: 'What is all around you — you are in the middle of it.' }],
  ],
});

PL.nest({
  id: 'augment', root: '-isko · -ina', gloss: 'big, rough — or pitiful', mod: 'building',
  roots: { 'ps': 'dog', 'koc': 'cat', 'chłop': 'man', 'dom': 'house' },
  intro: 'The opposite of the diminutive: *-isko* makes things big and rough — often said fondly or with pity — and *-ina* makes them pitiful or dear.',
  m: [
    ['psisko', 'ps|-isko', 'big dog; (fondly) old dog', 'DIM:aug', 'pies', { gl: ['dog', 'big (rough or fond)'] }],
    ['kocisko', 'koc|-isko', 'big old tomcat', 'DIM:aug', 'kot', { gl: ['cat', 'big (rough or fond)'], n: 't → c before *-isko*.' }],
    ['chłopisko', 'chłop|-isko', 'big fellow; (poor / good old) chap', 'DIM:aug', 'chłop', { gl: ['man', 'big (rough or fond)'], fm: 'man, bloke (colloquial)' }],
    ['domisko', 'dom|-isko', 'huge (ugly) house', 'DIM:aug', 'dom', { gl: ['house', 'big (rough)'] }],
    ['psina', 'ps|-ina', 'poor doggy', 'DIM:aug', 'pies', { n: '*-ina* adds pity or tenderness: *biedna psina* = the poor little dog.' }],
  ],
});

PL.nest({
  id: 'tools', root: '-arka · -acz · -ka', gloss: 'machines and tools', mod: 'building',
  intro: 'Household machines are named after what they do: *zmywać* (wash up) → *zmywarka* (dishwasher), *odkurzać* (dust off) → *odkurzacz* (vacuum cleaner).',
  m: [
    ['pralka', 'pra|-lka', 'washing machine', 'SFX:tool', 'prać', { fm: 'to wash (clothes)' }],
    ['drukarka', 'druk|-arka', 'printer', 'SFX:tool', 'drukować', { fm: 'to print' }],
    ['ładowarka', 'ładow|-arka', 'charger', 'SFX:tool', 'ładować', { fm: 'to load; to charge' }],
    ['koparka', 'kop|-arka', 'excavator, digger', 'SFX:tool', 'kopać', { fm: 'to dig' }],
    ['suszarka', 'susz|-arka', 'dryer; hairdryer', 'SFX:tool', 'suszyć', { fm: 'to dry' }],
    ['wyszukiwarka', 'wy-|szuk|-iwarka', 'search engine', 'SFX:tool', 'wyszukiwać', { fm: 'to search out' }],
    ['odkurzacz', 'od-|kurz|-acz', 'vacuum cleaner', 'SFX:tool', 'odkurzać', { fm: 'to dust, to vacuum', lit: 'de-duster', n: '*kurz* (dust) → *odkurzać* (dust off) → *odkurzacz* (the device).' }],
    ['otwieracz', 'otwier|-acz', 'opener (bottle, tin)', 'SFX:tool', 'otwierać'],
    ['zapalniczka', 'za-|pal|-niczka', 'lighter', 'SFX:tool', 'zapalić', { fm: 'to light' }],
    ['budzik', 'budz|-ik', 'alarm clock', 'SFX:nik', 'budzić', { fm: 'to wake (someone)' }],
    ['czajnik', 'czaj|-nik', 'kettle', null, null, { n: 'Borrowed via Russian *чайник* — a "tea-thing", from *чай* (tea).' }],
  ],
});

PL.nest({
  id: 'people', root: '-arz · -nik · -acz · -ca', gloss: 'people at work', mod: 'building',
  m: [
    ['kucharz', 'kuch|-arz', 'cook, chef', 'SFX:arz', 'kuchnia'],
    ['malarz', 'mal|-arz', 'painter', 'SFX:arz', 'malować', { fm: 'to paint' }],
    ['bramkarz', 'bramk|-arz', 'goalkeeper; bouncer', 'SFX:arz', 'bramka', { fm: 'goal; little gate' }],
    ['ogrodnik', 'ogrod|-nik', 'gardener', 'SFX:nik', 'ogród'],
    ['kierownik', 'kier|-ownik', 'manager', 'SFX:nik', 'kierować', { fm: 'to manage, steer' }],
    ['urzędnik', 'urzęd|-nik', 'clerk, civil servant', 'SFX:nik', 'urząd', { fm: 'office (official)' }],
    ['rolnik', 'rol|-nik', 'farmer', 'SFX:nik', 'rola', { fm: 'farmland (old)' }],
    ['rolnictwo', 'rolni|-ctwo', 'agriculture', 'SFX:stwo', 'rolnik'],
    ['słuchacz', 'słuch|-acz', 'listener', 'SFX:agent', 'słuchać'],
    ['tłumacz', 'tłumacz', 'translator, interpreter', null, null, { n: 'Not *tłum* (crowd) + *-acz*: an old loanword (Turkic *tılmaç*, also the source of German *Dolmetscher*). The verb *tłumaczyć* is built from the noun.' }],
    ['kierowca', 'kier|-owca', 'driver', 'SFX:agent', 'kierować', { fm: 'to steer, drive' }],
    ['właściciel', 'właść|-iciel', 'owner', 'SFX:agent', 'własny', { fm: 'own' }],
    ['kierowniczka', 'kier|-ownicz|-ka', 'manager (woman)', 'SFX:fem', 'kierownik', { n: 'k → cz before *-ka*.' }],
    ['sprzedawczyni', 'sprzedaw|-czyni', 'shop assistant (woman)', 'SFX:fem', 'sprzedawca'],
    ['koleżanka', 'koleż|-anka', 'friend, colleague (woman)', 'SFX:fem', 'kolega', { n: 'g → ż before *-anka*.' }],
    ['przyjaciółka', 'przyjaciół|-ka', 'friend (woman)', 'SFX:fem', 'przyjaciel', { n: 'e → ó and l → ł: *przyjaciel → przyjaciółka*.' }],
    ['królowa', 'król|-owa', 'queen', 'SFX:fem', 'król', { fm: 'king' }],
    ['studentka', 'student|-ka', 'student (woman)', 'SFX:fem', 'student'],
  ],
});

PL.nest({
  id: 'inhab', root: '-anin · -ak · -iec', gloss: 'where people are from', mod: 'building',
  m: [
    ['Amerykanin', 'Ameryk|-anin', 'American (man)', 'SFX:inhab', 'Ameryka', { fm: 'America', n: 'Plural *Amerykanie* (the *-in* drops).' }],
    ['Amerykanka', 'Ameryk|-anka', 'American (woman)', 'SFX:fem', 'Amerykanin'],
    ['warszawiak', 'warszaw|-iak', 'Varsovian (man)', 'SFX:inhab', 'Warszawa'],
    ['krakowianin', 'krakow|-ianin', 'citizen of Kraków', 'SFX:inhab', 'Kraków'],
    ['Niemiec', 'Niem|-iec', 'German (man)', 'SFX:inhab', 'niemy', { fm: 'mute', n: 'From *niemy* (mute): someone who could not speak (Polish) — once any foreigner. The country *Niemcy* is simply its plural, "the Germans".' }],
    ['mieszkaniec', 'mieszk|-aniec', 'inhabitant, resident', 'SFX:inhab', 'mieszkać'],
    ['Europejczyk', 'Europ|-ejczyk', 'European (man)', 'SFX:inhab', 'Europa', { fm: 'Europe' }],
  ],
});

PL.nest({
  id: 'quality', root: '-ość · -stwo', gloss: 'qualities and states', mod: 'building',
  intro: 'Abstract nouns. *-ość* (always feminine) from adjectives; *-stwo / -ctwo* (neuter) for states, fields and collectives. Look out for *wiadomość* — "known-ness" = news, a message.',
  m: [
    ['radość', 'rad|-ość', 'joy', 'SFX:osc', 'rad', { fm: 'glad' }],
    ['miłość', 'mił|-ość', 'love', 'SFX:osc', 'miły', { lit: 'dear-ness' }],
    ['wolność', 'woln|-ość', 'freedom', 'SFX:osc', 'wolny'],
    ['szybkość', 'szybk|-ość', 'speed', 'SFX:osc', 'szybki'],
    ['wysokość', 'wysok|-ość', 'height, altitude', 'SFX:osc', 'wysoki'],
    ['ciemność', 'ciemn|-ość', 'darkness', 'SFX:osc', 'ciemny', { fm: 'dark' }],
    ['samotność', 'samotn|-ość', 'loneliness', 'SFX:osc', 'samotny', { fm: 'lonely' }],
    ['przeszłość', 'prze-|szł|-ość', 'the past', 'SFX:osc', 'przeszły', { fm: 'past, former' }],
    ['wiadomość', 'wiadom|-ość', 'message; (piece of) news', 'SFX:osc', 'wiadomy', { fm: 'known', lit: 'known-ness', n: '*wiadomości* = the news. From the *wiedzieć* (know) family.' }],
    ['bogactwo', 'boga|-ctwo', 'wealth, riches', 'SFX:stwo', 'bogaty'],
    ['dzieciństwo', 'dzieciń|-stwo', 'childhood', 'SFX:stwo', 'dziecko'],
    ['królestwo', 'król|-estwo', 'kingdom', 'SFX:stwo', 'król', { fm: 'king' }],
    ['państwo', 'pań|-stwo', 'the state; ladies and gentlemen; Mr and Mrs', 'SFX:stwo', 'pan', { n: '*-stwo* does two jobs here: the domain of a *pan* (→ the state), and *pan* + *pani* together (→ Mr and Mrs, ladies and gentlemen, the polite "you"), as in *wujostwo* = uncle and aunt.' }],
    ['małżeństwo', 'małżeń|-stwo', 'marriage; married couple', 'SFX:stwo', 'małżonek', { fm: 'spouse' }],
    ['sąsiedztwo', 'sąsiedz|-two', 'neighbourhood', 'SFX:stwo', 'sąsiad'],
    ['lenistwo', 'leni|-stwo', 'laziness', 'SFX:stwo', 'leniwy', { fm: 'lazy' }],
  ],
});

PL.nest({
  id: 'small', root: '-ek · -ka · -ko', gloss: 'little things', mod: 'building',
  intro: 'Diminutives — everyday Polish is full of them. Some still just mean "small"; many have become words of their own (*kartka, okienko, łyżeczka*).',
  m: [
    ['kotek', 'kot|-ek', 'kitty, kitten', 'DIM:m', 'kot'],
    ['piesek', 'pies|-ek', 'doggy, little dog', 'DIM:m', 'pies', { n: 'The *ie* stays here (*piesek*), though it drops in *psa*.' }],
    ['stolik', 'stol|-ik', 'little table; table (in a café)', 'DIM:m', 'stół', { n: 'ó → o and ł → l: *stół → stolik*. *Stolik dla dwóch osób* = a table for two.' }],
    ['kluczyk', 'klucz|-yk', 'small key; car key', 'DIM:m', 'klucz'],
    ['kwiatek', 'kwiat|-ek', 'little flower', 'DIM:m', 'kwiat', { fm: 'flower' }],
    ['okienko', 'okien|-ko', 'little window; ticket window, counter', 'DIM:fn', 'okno', { n: 'At the post office you queue for the counter (*kolejka do okienka*) and are served *przy okienku*.' }],
    ['piwko', 'piw|-ko', 'a (nice) beer', 'DIM:fn', 'piwo', { n: 'Friendly rather than small: *Idziemy na piwko?*' }],
    ['kartka', 'kart|-ka', 'sheet of paper; card', 'DIM:fn', 'karta', { n: '*kartka z życzeniami* = greeting card.' }],
    ['łyżeczka', 'łyż|-eczka', 'teaspoon', 'DIM:fn', 'łyżka', { fm: 'spoon' }],
    ['serduszko', 'serd|-uszko', 'little heart', 'DIM:fn', 'serce', { fm: 'heart', n: '*serce* was once *serd-ce*: the d dropped out of *serce* but is back in *serd-uszko* (compare *serdeczny* = heartfelt).' }],
    ['jabłuszko', 'jabł|-uszko', 'little apple', 'DIM:fn', 'jabłko'],
    ['oczko', 'ocz|-ko', 'little eye; stitch (knitting); small pond', 'DIM:fn', 'oko', { n: 'k → cz. Also the card game "twenty-one".' }],
    ['myszka', 'mysz|-ka', 'little mouse; (computer) mouse', 'DIM:fn', 'mysz', { fm: 'mouse' }],
  ],
});

PL.nest({
  id: 'names', root: 'Kasia · Tomek · mamusia', gloss: 'pet names', mod: 'building',
  intro: 'Polish first names have everyday forms you will hear far more often than the full ones. Pet-name nouns in *-ia / -sia* take *-u* in the vocative: *Kasiu! Basiu!*',
  m: [
    ['Kasia', 'Kas|-ia', 'Kate (pet form)', 'DIM:pet', 'Katarzyna', { fm: 'Katherine' }],
    ['Tomek', 'Tom|-ek', 'Tom (pet form)', 'DIM:pet', 'Tomasz', { fm: 'Thomas' }],
    ['Janek', 'Jan|-ek', 'Johnny (pet form)', 'DIM:pet', 'Jan', { n: 'Also *Jaś* (as in *Jaś i Małgosia* = Hansel and Gretel).' }],
    ['Gosia', 'Gos|-ia', 'Maggie (pet form)', 'DIM:pet', 'Małgorzata', { fm: 'Margaret' }],
    ['Kuba', 'Kub|-a', 'Jake (pet form)', 'DIM:pet', 'Jakub', { fm: 'Jacob, James' }],
    ['Ola', 'Ol|-a', 'Alex (pet form, woman)', 'DIM:pet', 'Aleksandra', { fm: 'Alexandra' }],
    ['Basia', 'Bas|-ia', 'Barbie (pet form)', 'DIM:pet', 'Barbara', { fm: 'Barbara' }],
    ['Zosia', 'Zos|-ia', 'Sophie (pet form)', 'DIM:pet', 'Zofia', { fm: 'Sophia' }],
    ['Wojtek', 'Wojt|-ek', 'pet form of Wojciech', 'DIM:pet', 'Wojciech', { fm: 'Adalbert (Polish name)' }],
    ['Ania', 'An|-ia', 'Annie (pet form)', 'DIM:pet', 'Anna'],
    ['mamusia', 'mam|-usia', 'mummy', 'DIM:pet', 'mama'],
    ['tatuś', 'tat|-uś', 'daddy', 'DIM:pet', 'tata'],
  ],
});

PL.nest({
  id: 'soups', root: '-owa', gloss: 'soups', mod: 'building',
  intro: 'Polish menus are full of adjectives without their noun: *zupa* (soup) is understood. *Poproszę pomidorową* = "the tomato (one), please".',
  m: [
    ['pomidorowa', 'pomidor|-owa', 'tomato soup', 'ADJ:owy', 'pomidor', { fm: 'tomato' }],
    ['ogórkowa', 'ogórk|-owa', 'cucumber (dill pickle) soup', 'ADJ:owy', 'ogórek', { fm: 'cucumber', n: 'Fleeting e: *ogórek → ogórka → ogórkowa*.' }],
    ['grzybowa', 'grzyb|-owa', 'mushroom soup', 'ADJ:owy', 'grzyb', { fm: 'mushroom' }],
    ['owocowy', 'owoc|-owy', 'fruit-', 'ADJ:owy', 'owoc', { fm: 'fruit', pos: 'adj', n: '*sok owocowy* = fruit juice.' }],
    ['zimowy', 'zim|-owy', 'winter-', 'ADJ:owy', 'zima', { fm: 'winter', pos: 'adj' }],
    ['mleczny', 'mlecz|-ny', 'milk-, dairy', 'ADJ:ny', 'mleko', { pos: 'adj', n: 'k → cz. A *bar mleczny* ("milk bar") is a cheap traditional canteen.' }],
  ],
});

PL.nest({
  id: 'adjplace', root: '-ski · -ny', gloss: 'of a place', mod: 'building',
  m: [
    ['miejski', 'miej|-ski', 'urban, city-, municipal', 'ADJ:ski', 'miasto', { pos: 'adj', n: 'An irregular-looking pair worth memorising: *miasto → miejski*.' }],
    ['wiejski', 'wiej|-ski', 'rural, country-, village', 'ADJ:ski', 'wieś', { pos: 'adj' }],
    ['morski', 'mor|-ski', 'sea-, maritime', 'ADJ:ski', 'morze', { pos: 'adj' }],
    ['nadmorski', 'nad-|mor|-ski', 'seaside', 'ADJ:ski', 'morze', { pos: 'adj', noroot: true, n: '*nad morzem* = at the seaside (*nad* = on the shore of).' }],
    ['męski', 'mę|-ski', 'men\'s, male, masculine', 'ADJ:ski', 'mąż', { pos: 'adj', n: 'ą → ę: *mąż → męski*. *Mąż* once meant simply "man" (still in *mąż stanu* = statesman).' }],
    ['ludzki', 'ludz|-ki', 'human; humane', 'ADJ:ski', 'ludzie', { pos: 'adj', fm: 'people' }],
    ['niebieski', 'nieb|-ieski', 'blue; heavenly', 'ADJ:ski', 'niebo', { pos: 'adj', fm: 'sky, heaven', lit: 'sky-ish' }],
    ['boski', 'bo|-ski', 'divine; (colloquially) gorgeous', 'ADJ:ski', 'Bóg', { pos: 'adj', fm: 'God', n: 'ó → o, and the g disappears into *-ski*.' }],
    ['krakowski', 'krakow|-ski', 'of Kraków', 'ADJ:ski', 'Kraków', { pos: 'adj' }],
    ['dzienny', 'dzien|-ny', 'daily, day-', 'ADJ:ny', 'dzień', { pos: 'adj' }],
    ['nocny', 'noc|-ny', 'night-, nightly', 'ADJ:ny', 'noc', { pos: 'adj', n: '*autobus nocny* = night bus.' }],
    ['roczny', 'rocz|-ny', 'annual, year-long', 'ADJ:ny', 'rok', { pos: 'adj', n: 'k → cz.' }],
    ['miesięczny', 'miesięcz|-ny', 'monthly', 'ADJ:ny', 'miesiąc', { pos: 'adj', n: 'ą → ę, c → cz.' }],
    ['rodzinny', 'rodzin|-ny', 'family-', 'ADJ:ny', 'rodzina', { pos: 'adj', fm: 'family' }],
  ],
});

PL.nest({
  id: 'having', root: '-aty · -isty · -liwy', gloss: 'having, full of, inclined to', mod: 'building',
  m: [
    ['brodaty', 'brod|-aty', 'bearded', 'ADJ:aty', 'broda', { pos: 'adj', fm: 'beard; chin' }],
    ['skrzydlaty', 'skrzydl|-aty', 'winged', 'ADJ:aty', 'skrzydło', { pos: 'adj', fm: 'wing' }],
    ['piaszczysty', 'piaszcz|-ysty', 'sandy', 'ADJ:aty', 'piasek', { pos: 'adj', fm: 'sand' }],
    ['mglisty', 'mgl|-isty', 'misty, foggy', 'ADJ:aty', 'mgła', { pos: 'adj', fm: 'fog, mist' }],
    ['górzysty', 'górz|-ysty', 'mountainous', 'ADJ:aty', 'góra', { pos: 'adj' }],
    ['gadatliwy', 'gad|-atliwy', 'talkative', 'ADJ:liwy', 'gadać', { pos: 'adj' }],
    ['cierpliwy', 'cierp|-liwy', 'patient', 'ADJ:liwy', 'cierpieć', { pos: 'adj', fm: 'to suffer', lit: 'able to suffer', n: 'Like English *patient*, from Latin *pati* "to suffer".' }],
    ['płaczliwy', 'płacz|-liwy', 'tearful, whiny', 'ADJ:liwy', 'płakać', { pos: 'adj' }],
    ['troskliwy', 'trosk|-liwy', 'caring, attentive', 'ADJ:liwy', 'troska', { pos: 'adj', fm: 'care, worry' }],
    ['wątpliwy', 'wątp|-liwy', 'doubtful, questionable', 'ADJ:liwy', 'wątpić', { pos: 'adj', fm: 'to doubt' }],
  ],
});

PL.nest({
  id: 'able', root: '-alny · nie- · bez-', gloss: 'can be done; not; without', mod: 'building',
  m: [
    ['jadalny', 'jad|-alny', 'edible', 'ADJ:alny', 'jeść', { pos: 'adj', n: '*grzyby jadalne* = edible mushrooms.' }],
    ['pitny', 'pit|-ny', 'drinkable', 'ADJ:alny', 'pić', { pos: 'adj', n: '*woda pitna* = drinking water.' }],
    ['słyszalny', 'słysz|-alny', 'audible', 'ADJ:alny', 'słyszeć', { pos: 'adj' }],
    ['widoczny', 'widocz|-ny', 'visible', 'ADJ:alny', 'widok', { pos: 'adj', fm: 'view, sight' }],
    ['niemożliwy', 'nie-|moż|-liwy', 'impossible', 'ADJ:neg', 'możliwy', { pos: 'adj', fm: 'possible' }],
    ['bezpieczny', 'bez-|piecz|-ny', 'safe', 'ADJ:neg', 'piecza', { pos: 'adj', fm: 'care, worry (old)', lit: 'without worry', n: 'Free of worries → safe.' }],
    ['niebezpieczny', 'nie-|bez-|piecz|-ny', 'dangerous', 'ADJ:neg', 'bezpieczny', { pos: 'adj', lit: 'not without worry' }],
    ['bezpłatny', 'bez-|płat|-ny', 'free of charge', 'ADJ:neg', 'płacić', { pos: 'adj', lit: 'without payment', n: '*wstęp bezpłatny* = admission free.' }],
    ['bezsenny', 'bez-|sen|-ny', 'sleepless', 'ADJ:neg', 'sen', { pos: 'adj' }],
    ['bezradny', 'bez-|rad|-ny', 'helpless', 'ADJ:neg', 'rada', { pos: 'adj', fm: 'advice, help', lit: 'without counsel' }],
    ['nieznajomy', 'nie-|znaj|-omy', 'stranger; unfamiliar', 'ADJ:neg', 'znajomy', { pos: 'adj', fm: 'acquaintance; familiar' }],
  ],
});

PL.nest({
  id: 'comparison', root: '-szy · -ejszy · naj-', gloss: 'comparison', mod: 'building',
  intro: 'Comparatives in *-szy / -ejszy* and superlatives with *naj-*. The irregular four (*lepszy, gorszy, większy, mniejszy*) are the most common of all.',
  m: [
    ['lepszy', 'lep|-szy', 'better', 'ADJ:comp', 'dobry', { pos: 'adj', n: 'Irregular — another root.' }],
    ['najlepszy', 'naj-|lep|-szy', 'the best', 'ADJ:comp', 'lepszy', { pos: 'adj' }],
    ['gorszy', 'gor|-szy', 'worse', 'ADJ:comp', 'zły', { pos: 'adj', n: 'Irregular — another root.' }],
    ['większy', 'więk|-szy', 'bigger', 'ADJ:comp', 'duży', { pos: 'adj', n: 'Irregular — another root (compare *wielki*).' }],
    ['mniejszy', 'mniej|-szy', 'smaller', 'ADJ:comp', 'mały', { pos: 'adj', n: 'Irregular — another root.' }],
    ['nowszy', 'now|-szy', 'newer', 'ADJ:comp', 'nowy', { pos: 'adj' }],
    ['ładniejszy', 'ładn|-iejszy', 'prettier, nicer', 'ADJ:comp', 'ładny', { pos: 'adj', n: 'After two consonants: *-ejszy*; n softens to ń, spelt *ni*: *ładn- → ładniejszy* (compare *ciepły → cieplejszy*).' }],
    ['trudniejszy', 'trudn|-iejszy', 'more difficult', 'ADJ:comp', 'trudny', { pos: 'adj' }],
    ['cieplejszy', 'ciepl|-ejszy', 'warmer', 'ADJ:comp', 'ciepły', { pos: 'adj', n: 'ł → l before *-ejszy*.' }],
    ['droższy', 'droż|-szy', 'more expensive', 'ADJ:comp', 'drogi', { pos: 'adj', n: 'g → ż before *-szy*.' }],
    ['tańszy', 'tań|-szy', 'cheaper', 'ADJ:comp', 'tani', { pos: 'adj' }],
    ['wyższy', 'wyż|-szy', 'taller, higher', 'ADJ:comp', 'wysoki', { pos: 'adj', n: 'The *-ok-* drops and s → ż: *wysoki → wyższy*.' }],
    ['dłuższy', 'dłuż|-szy', 'longer', 'ADJ:comp', 'długi', { pos: 'adj' }],
    ['szybszy', 'szyb|-szy', 'faster', 'ADJ:comp', 'szybki', { pos: 'adj', n: 'The *-k-* simply drops: *szybki → szybszy*.' }],
    ['ulepszyć', 'u-|lep|-szyć', 'to improve', 'VRB:ić', 'lepszy', { lit: 'make better' }],
    ['pogorszyć', 'po-|gor|-szyć', 'to make worse', 'VRB:ić', 'gorszy'],
    ['powiększyć', 'po-|więk|-szyć', 'to enlarge, zoom in', 'VRB:ić', 'większy'],
    ['zmniejszyć', 'z-|mniej|-szyć', 'to reduce', 'VRB:ić', 'mniejszy'],
  ],
});

PL.nest({
  id: 'tiny', root: '-utki · -awy', gloss: 'very (fondly) and -ish', mod: 'building',
  m: [
    ['malutki', 'mal|-utki', 'tiny, teeny', 'ADJ:dim', 'mały', { pos: 'adj', n: 'Also *maleńki, malusieńki* — each more tender.' }],
    ['cichutki', 'cich|-utki', 'very quiet', 'ADJ:dim', 'cichy', { pos: 'adj' }],
    ['zielonkawy', 'zielon|-kawy', 'greenish', 'ADJ:dim', 'zielony', { pos: 'adj' }],
    ['słodkawy', 'słodk|-awy', 'sweetish', 'ADJ:dim', 'słodki', { pos: 'adj', fm: 'sweet' }],
    ['szarawy', 'szar|-awy', 'greyish', 'ADJ:dim', 'szary', { pos: 'adj', fm: 'grey' }],
  ],
});

PL.nest({
  id: 'adverbs', root: '-o · -e · po …-u', gloss: 'adverbs', mod: 'building',
  m: [
    ['szybko', 'szybk|-o', 'fast, quickly', 'ADV:o', 'szybki', { pos: 'adv', ex: [['Mówisz za {szybko}!', 'You speak too fast!']] }],
    ['cicho', 'cich|-o', 'quietly; (it is) quiet', 'ADV:o', 'cichy', { pos: 'adv', ex: [['Bądź {cicho}!', 'Be quiet!']] }],
    ['dobrze', 'dobrz|-e', 'well; OK', 'ADV:o', 'dobry', { pos: 'adv', n: 'r → rz before *-e*. *Dobrze!* = OK, fine.' }],
    ['źle', 'źl|-e', 'badly', 'ADV:o', 'zły', { pos: 'adv', n: 'Irregular: *zły → źle*.' }],
    ['ładnie', 'ładn|-ie', 'nicely, prettily', 'ADV:o', 'ładny', { pos: 'adv', ex: [['{Ładnie} dziś wyglądasz!', 'You look nice today!']] }],
    ['mądrze', 'mądrz|-e', 'wisely', 'ADV:o', 'mądry', { pos: 'adv' }],
    ['głośno', 'głośn|-o', 'loudly', 'ADV:o', 'głośny', { pos: 'adv' }],
    ['łatwo', 'łatw|-o', 'easily; (it is) easy', 'ADV:o', 'łatwy', { pos: 'adv' }],
    ['zimno', 'zimn|-o', 'coldly; (it is) cold', 'ADV:o', 'zimny', { pos: 'adv', n: '*Zimno mi* = I\'m cold.' }],
    ['wesoło', 'wesoł|-o', 'cheerfully', 'ADV:o', 'wesoły', { pos: 'adv' }],
    ['często', 'częst|-o', 'often', 'ADV:o', 'częsty', { pos: 'adv', fm: 'frequent' }],
    ['po angielsku', 'po|angiel|-sku', 'in English', 'ADV:po', 'angielski', { pos: 'adv' }],
    ['po cichu', 'po|cich|-u', 'quietly, on the quiet', 'ADV:po', 'cichy', { pos: 'adv' }],
    ['po prostu', 'po|prost|-u', 'simply, just', 'ADV:po', 'prosty', { pos: 'adv', fm: 'simple; straight', n: 'One of the most frequent phrases in spoken Polish.' }],
    ['po kolei', 'po|kolei', 'in turn, one after another', 'ADV:po', 'kolej', { pos: 'adv', fm: 'turn; railway', n: '*kolei* is just the locative of *kolej* (turn), not the *-u* pattern of *po polsku*.' }],
  ],
});

PL.nest({
  id: 'become', root: '-eć · -nąć · -ić', gloss: 'becoming and making', mod: 'building',
  m: [
    ['czerwienieć', 'czerwien|-ieć', 'to go red, blush', 'VRB:eć', 'czerwony', { gl: ['red', 'become'] }],
    ['chudnąć', 'chud|-nąć', 'to lose weight', 'VRB:eć', 'chudy', { gl: ['thin', 'become'], fm: 'thin' }],
    ['siwieć', 'siw|-ieć', 'to go grey', 'VRB:eć', 'siwy', { gl: ['grey', 'become'], fm: 'grey (hair)' }],
    ['ciemnieć', 'ciemn|-ieć', 'to get dark', 'VRB:eć', 'ciemny', { gl: ['dark', 'become'], fm: 'dark' }],
    ['łysieć', 'łys|-ieć', 'to go bald', 'VRB:eć', 'łysy', { gl: ['bald', 'become'], fm: 'bald' }],
    ['suszyć', 'susz|-yć', 'to dry', 'VRB:ić', 'suchy', { fm: 'dry', n: 'ch → sz before *-yć*.' }],
    ['słodzić', 'słodz|-ić', 'to sweeten', 'VRB:ić', 'słodki', { fm: 'sweet', n: '*Słodzisz?* = Do you take sugar?' }],
    ['ułatwić', 'u-|łatw|-ić', 'to make easier', 'VRB:ić', 'łatwy', { fm: 'easy', ipf: 'ułatwiać' }],
  ],
});

PL.nest({
  id: 'participles', root: '-ący · -ąc · -ny · -ty', gloss: 'participles', mod: 'building',
  m: [
    ['śpiący', 'śpi|-ący', 'sleeping; sleepy', 'PART:acy', 'spać', { pos: 'adj', n: '*Śpiąca Królewna* = Sleeping Beauty. *Jestem śpiący* = I\'m sleepy.' }],
    ['latający', 'lat|-ający', 'flying', 'PART:acy', 'latać', { pos: 'adj', n: '*latający talerz* = flying saucer.' }],
    ['pracujący', 'prac|-ujący', 'working', 'PART:acy', 'pracować', { pos: 'adj' }],
    ['idąc', 'id|-ąc', 'while walking, on the way', 'PART:acy', 'iść', { pos: 'adv', ex: [['{Idąc} do pracy, kupiłem gazetę.', 'On my way to work, I (m.) bought a paper.']] }],
    ['czytając', 'czyt|-ając', 'while reading', 'PART:acy', 'czytać', { pos: 'adv' }],
    ['zamknięty', 'zamknię|-ty', 'closed, shut', 'PART:ny', 'zamknąć', { pos: 'adj', ex: [['Sklep jest dziś {zamknięty}.', 'The shop is closed today.']] }],
    ['otwarty', 'otwar|-ty', 'open', 'PART:ny', 'otworzyć', { pos: 'adj', n: 'An irregular participle: *otworzyć → otwarty*.' }],
    ['zmęczony', 'zmęcz|-ony', 'tired', 'PART:ny', 'zmęczyć', { pos: 'adj', fm: 'to tire out', lit: 'worn out' }],
    ['zajęty', 'zaję|-ty', 'busy; taken (seat)', 'PART:ny', 'zająć', { pos: 'adj', fm: 'to occupy, take up', n: '*Czy to miejsce jest zajęte?* = Is this seat taken?' }],
    ['smażony', 'smaż|-ony', 'fried', 'PART:ny', 'smażyć', { pos: 'adj', fm: 'to fry' }],
    ['znany', 'zn|-any', 'well-known, famous', 'PART:ny', 'znać', { pos: 'adj', lit: 'known' }],
    ['zepsuty', 'ze-|psu|-ty', 'broken; spoiled', 'PART:ny', 'zepsuć', { pos: 'adj', fm: 'to break, spoil', ex: [['Winda jest {zepsuta}.', 'The lift is out of order.']] }],
  ],
});

PL.nest({
  id: 'compounds', root: 'X-o-Y', gloss: 'compounds', mod: 'building',
  intro: 'Two roots joined by a linking *-o-* — each one a little picture.',
  m: [
    ['samolot', 'sam|-o-|lot', 'aeroplane', 'CMP:compound', null, { lit: 'self-flier' }],
    ['listonosz', 'list|-o-|nosz', 'postman', 'CMP:compound', null, { lit: 'letter-carrier', n: '*list* (letter) + *nosić* (carry).' }],
    ['śrubokręt', 'śrub|-o-|kręt', 'screwdriver', 'CMP:compound', null, { lit: 'screw-turner', n: '*śruba* (screw) + *kręcić* (turn).' }],
    ['korkociąg', 'kork|-o-|ciąg', 'corkscrew', 'CMP:compound', null, { lit: 'cork-puller', n: '*korek* (cork) + *ciągnąć* (pull).' }],
    ['gwiazdozbiór', 'gwiazd|-o-|zbiór', 'constellation', 'CMP:compound', null, { lit: 'star-collection' }],
    ['językoznawca', 'język|-o-|znaw|-ca', 'linguist', 'CMP:compound', null, { lit: 'language-knower' }],
    ['krwiodawca', 'krw|-io-|daw|-ca', 'blood donor', 'CMP:compound', null, { lit: 'blood-giver' }],
    ['Wielkanoc', 'Wielka|noc', 'Easter', 'CMP:compound', null, { lit: 'the great night', n: 'Not a linking vowel: *Wielka* is the adjective, and it still declines — *Wielkanocy* or *Wielkiej Nocy*.' }],
    ['wszechświat', 'wszech|świat', 'universe', 'CMP:calque', null, { lit: 'all-world' }],
  ],
});

PL.nest({
  id: 'npfx', root: 'przed- · po- · pod- · współ- · pra-', gloss: 'prefixes on nouns', mod: 'building',
  roots: {
    'wczoraj': 'yesterday', 'jutrz': 'tomorrow', 'południ': 'noon', 'wojen': 'war', 'szkol': 'school',
    'pokój': 'room', 'mieści': 'town', 'ziemi': 'earth', 'granic': 'border', 'granicz': 'border', 'morz': 'sea',
    'ręcz': 'hand', 'prac': 'work', 'lokator': 'tenant', 'dziadek': 'grandad', 'wnuk': 'grandson',
    'dzieło': 'work, creation', 'wag': 'weight', 'godzin': 'hour', 'ból': 'pain',
  },
  intro: 'Prepositions you know from the cases, now fused with nouns, adjectives and adverbs (*współ-, pra-, arcy-* are prefixes only). *przed-* and *po-* split time into before and after; *pod-, za-, po-* place things under, beyond or along something.',
  m: [
    ['przedwczoraj', 'przed-|wczoraj', 'the day before yesterday', 'NPFX:time', 'wczoraj', { pos: 'adv', fm: 'yesterday',
      ex: [['{Przedwczoraj} byłam u lekarza.', 'The day before yesterday I (f.) was at the doctor\'s.']] }],
    ['pojutrze', 'po-|jutrz|-e', 'the day after tomorrow', 'NPFX:time', 'jutro', { pos: 'adv', fm: 'tomorrow', gl: ['after', 'tomorrow', ''],
      n: '*po* + locative = after (*po obiedzie* — after lunch); *jutrze* is the locative of the noun *jutro*, still used: *myśleć o jutrze* (to think about tomorrow).',
      ex: [['Wracamy {pojutrze} wieczorem.', 'We\'re coming back the day after tomorrow, in the evening.']] }],
    ['popołudnie', 'po-|południ|-e', 'afternoon', 'NPFX:time', 'południe', { fm: 'noon; south', gl: ['after', 'noon', ''],
      n: '*po południu* (two words) = in the afternoon. *Południe* is "mid-day" (*pół* half + *dzień* day), and also "south" — where the sun stands at noon. Likewise *północ* (*pół* + *noc*): midnight and north.',
      ex: [['Całe {popołudnie} padał deszcz.', 'It rained all afternoon.']] }],
    ['przedpołudnie', 'przed-|południ|-e', 'late morning, forenoon', 'NPFX:time', 'południe', { fm: 'noon; south',
      n: '*przed południem* = in the morning, before noon. Finnish cuts the day the same way: *przedpołudnie* = *aamupäivä*, *popołudnie* = *iltapäivä*.' }],
    ['przedwojenny', 'przed-|wojen|-ny', 'pre-war', 'NPFX:time', 'wojna', { pos: 'adj',
      n: 'An *e* slips in before *-ny*: *wojna → wojenny* (war-, of war). With no war named it means before 1939: *przedwojenna Warszawa* = Warsaw before WWII.' }],
    ['powojenny', 'po-|wojen|-ny', 'post-war', 'NPFX:time', 'wojna', { pos: 'adj', gl: ['after', 'war', 'of, -al'] }],
    ['przedszkole', 'przed-|szkol|-e', 'nursery school, kindergarten', 'NPFX:time', 'szkoła', { lit: 'the before-school',
      ex: [['Nasza córka chodzi do {przedszkola}.', 'Our daughter goes to nursery school.']] }],

    ['przedpokój', 'przed-|pokój', 'hall, entrance hall', 'NPFX:place', 'pokój', { lit: 'the before-room',
      ex: [['Zostaw buty w {przedpokoju}.', 'Leave your shoes in the hall.']] }],
    ['przedmieście', 'przed-|mieści|-e', 'suburb, outskirts', 'NPFX:place', 'miasto', { lit: 'the before-town',
      n: '*a → ie* and *st → ść*, as in *w mieście* (in town).',
      ex: [['Mieszkamy na {przedmieściach} Krakowa.', 'We live in the suburbs of Kraków.']] }],
    ['podziemie', 'pod-|ziemi|-e', 'underground (space); the (political) underground', 'NPFX:place', 'ziemia', { lit: 'under the earth',
      n: '*działać w podziemiu* = to work in the underground — the resistance in WWII, the opposition under communism.' }],
    ['podręcznik', 'pod-|ręcz|-nik', 'textbook, handbook', 'NPFX:place', 'ręka', { lit: 'the at-hand (book)', rootAlt: ['podręczny'],
      n: '*pod ręką* = at hand → *podręczny* = handy, hand- (*bagaż podręczny* = hand luggage) → *podręcznik*, the book kept at hand. Not *pod* + *ręcznik* (towel)!' }],
    ['zagranica', 'za-|granic|-a', 'foreign countries (as a whole)', 'NPFX:place', 'granica', { fm: 'border', gl: ['beyond', 'border', ''],
      n: 'The phrase is two words: *za granicą* = abroad (where), *za granicę* = abroad (where to). The noun is one: *z zagranicy* = from abroad.' }],
    ['zagraniczny', 'za-|granicz|-ny', 'foreign', 'NPFX:place', 'granica', { pos: 'adj', fm: 'border', gl: ['beyond', 'border', 'of, -al'],
      n: 'c → cz before *-ny*.',
      ex: [['Latem jest tu dużo {zagranicznych} turystów.', 'In summer there are a lot of foreign tourists here.']] }],
    ['Pomorze', 'Po-|morz|-e', 'Pomerania (the Baltic coast)', 'NPFX:place', 'morze', { lit: 'along the sea', gl: ['along', 'sea', ''],
      n: 'A region named after what it lies along. Compare *Podkarpacie* — the land below the Carpathians.' }],

    ['współpraca', 'współ-|prac|-a', 'cooperation', 'NPFX:degree', 'praca', {
      ex: [['Dziękuję za {współpracę}!', 'Thank you for your cooperation!']] }],
    ['współlokator', 'współ-|lokator', 'flatmate, roommate', 'NPFX:degree', 'lokator', { fm: 'tenant, lodger',
      n: 'A woman: *współlokatorka*.' }],
    ['pradziadek', 'pra-|dziadek', 'great-grandfather', 'NPFX:degree', 'dziadek', {
      n: '*prababcia* = great-grandmother; *prapradziadek* = great-great-grandfather.',
      ex: [['Mój {pradziadek} walczył na wojnie.', 'My great-grandfather fought in the war.']] }],
    ['prawnuk', 'pra-|wnuk', 'great-grandson', 'NPFX:degree', 'wnuk', { fm: 'grandson' }],
    ['arcydzieło', 'arcy-|dzieło', 'masterpiece', 'NPFX:degree', 'dzieło', { fm: 'work (of art), creation',
      ex: [['Ten film to prawdziwe {arcydzieło}.', 'This film is a real masterpiece.']] }],
    ['nadwaga', 'nad-|wag|-a', 'overweight, excess weight', 'NPFX:degree', 'waga', { fm: 'weight; scales', gl: ['over, too much', 'weight', ''],
      n: 'Also *nadbagaż* — excess baggage.',
      ex: [['Lekarz mówi, że mam {nadwagę}.', 'The doctor says I\'m overweight.']] }],
    ['nadgodziny', 'nad-|godzin|-y', 'overtime (hours)', 'NPFX:degree', 'godzina', { alt: ['nadgodzina'], gl: ['over, too much', 'hour', ''], n: 'Dictionary form *nadgodzina* (an hour of overtime), but usually plural: *robić nadgodziny* = to work overtime, *płatne nadgodziny* = paid overtime.' }],
    ['przeciwbólowy', 'przeciw-|ból|-owy', 'painkilling', 'NPFX:degree', 'ból', { pos: 'adj', fm: 'pain',
      ex: [['Weź tabletkę {przeciwbólową}.', 'Take a painkiller.']] }],
  ],
});

PL.nest({
  id: 'grammar', root: 'grammar words', gloss: 'the names of the cases', mod: 'building',
  intro: 'Most Polish grammar terms copy Latin piece by piece (*czasownik* copies German *Zeitwort*) — and they explain themselves. *przypadek* (case) is Latin *casus* "a falling". Three case names are Polish inventions that say what the case does: *dopełniacz, celownik, biernik*.',
  m: [
    ['przypadek', 'przy-|pad|-ek', 'case (grammar); chance, coincidence; incident', 'CMP:calque', 'przypaść', { fm: 'to fall to', lit: 'a falling-to', n: 'Latin *casus* "a fall" (from *cadere*). *Przez przypadek* = by chance.' }],
    ['mianownik', 'mian|-ownik', 'nominative', 'CMP:calque', 'mianować', { fm: 'to name', lit: 'the naming (case)' }],
    ['dopełniacz', 'do-|pełn|-iacz', 'genitive', null, 'dopełnić', { fm: 'to complete', lit: 'the completer', n: 'Not a calque — the Polish name describes what the case does. It "completes" another noun: *dom ojca*.' }],
    ['celownik', 'cel|-ownik', 'dative', null, 'cel', { fm: 'aim, target', lit: 'the aiming (case)', n: 'Not a calque — the Polish name describes what the case does. It names the target — the receiver.' }],
    ['biernik', 'bier|-nik', 'accusative', null, 'bierny', { fm: 'passive', lit: 'the passive one', n: 'Not a calque — the Polish name describes what the case does. The thing that suffers the action.' }],
    ['narzędnik', 'narzęd|-nik', 'instrumental', 'CMP:calque', 'narzędzie', { fm: 'tool', lit: 'the tool (case)' }],
    ['miejscownik', 'miejsc|-ownik', 'locative', 'CMP:calque', 'miejsce', { fm: 'place', lit: 'the place (case)' }],
    ['wołacz', 'woł|-acz', 'vocative', 'CMP:calque', 'wołać', { fm: 'to call', lit: 'the caller' }],
    ['rzeczownik', 'rzecz|-ownik', 'noun', 'CMP:calque', 'rzecz', { lit: 'thing-word' }],
    ['czasownik', 'czas|-ownik', 'verb', 'CMP:calque', 'czas', { lit: 'time-word', n: 'Like German *Zeitwort* — a word that has tenses ("times").' }],
    ['przymiotnik', 'przy-|miot|-nik', 'adjective', 'CMP:calque', 'przymiot', { fm: 'attribute, quality', lit: 'thrown-at', n: 'Latin *ad-iectivum* = "thrown to (the noun)".' }],
    ['przysłówek', 'przy-|słów|-ek', 'adverb', 'CMP:calque', 'słowo', { lit: 'by-the-word', n: 'Latin *ad-verbium* = "to the verb". (*słowo* once also meant "verb".)' }],
    ['zaimek', 'za-|im|-ek', 'pronoun', 'CMP:calque', 'imię', { gl: ['instead of', 'name', ''], lit: 'for-a-name', n: 'Latin *pro-nomen* = "for, instead of a name".' }],
    ['podmiot', 'pod-|miot', 'subject (of a sentence)', 'CMP:calque', 'miotać', { fm: 'to throw', lit: 'thrown under', n: 'Latin *sub-iectum* = "thrown under".' }],
    ['przedmiot', 'przed-|miot', 'object; (school) subject', 'CMP:calque', 'miotać', { fm: 'to throw', lit: 'thrown in front', n: 'Latin *ob-iectum* = "thrown in front of".' }],
  ],
});

/* ══ Sentences ══ */

PL.items('ADJ:comp', [
  ['duży', 'Ten dom jest {większy} niż nasz.', 'This house is bigger than ours.'],
  ['dobry', 'Kawa jest dziś {lepsza} niż wczoraj.', 'The coffee is better today than yesterday.'],
  ['tani', 'Pociąg jest {tańszy} niż samolot.', 'The train is cheaper than the plane.'],
  ['młody', 'Mam {młodszego} brata.', 'I have a younger brother.'],
  ['stary', 'Moja {starsza} siostra mieszka w Krakowie.', 'My older sister lives in Kraków.'],
  ['ładny', 'Kraków jest {ładniejszy} niż Warszawa.', 'Kraków is prettier than Warsaw.'],
  ['zły', 'Dzisiaj pogoda jest {gorsza}.', 'The weather is worse today.'],
  ['szybki', 'Pojedźmy pociągiem, będzie {szybciej}.', 'Let\'s take the train, it\'ll be quicker.', { free: true, n: 'Adverbs compare too: *szybko → szybciej*, *dobrze → lepiej*, *ciepło → cieplej*.' }],
  ['wysoki', 'Mój brat jest {wyższy} ode mnie.', 'My brother is taller than me.'],
  ['trudny', 'Polski jest {trudniejszy} niż angielski.', 'Polish is harder than English.'],
  ['dobry', 'To jest {najlepsza} pizza w mieście!', 'This is the best pizza in town!', { free: true }],
]);
