/* ═══════════════════════════════════════════════════════════════
   data/cases.js — Module: Cases (przypadki)

   Each rule is one *trigger* for a case (a preposition, a verb,
   negation, …). Sentences: [cue, 'text with {answer}', 'translation', extra?]
   The answer must be a real form of the cue word (checked against
   the lexicon). "o" = teaching order, so new rules arrive mixed
   across the cases instead of one case at a time.
   ═══════════════════════════════════════════════════════════════ */

PL.module('cases', {
  t: 'Cases', pl: 'Przypadki',
  blurb: 'Endings that show what a noun is doing in the sentence.',
  intro: 'A Polish noun changes its ending to show its role: *dom* (a house) is the subject, *domu* comes after *do* (to) or after negation, *domem* after *przed* (in front of)… There are seven cases, and each one is triggered by something you can spot: a preposition, a verb, a negation, a number. Learn the **triggers** — that is what every rule here is about. The endings themselves depend on the gender of the noun; open the tables (F1 during practice) to see the pattern on model words.',
});

PL.groups('cases', [
  { id: 'NOM', t: 'Nominative', pl: 'mianownik · kto? co?', intro: 'The dictionary form. The subject of the sentence, and what comes after *to jest*.' },
  { id: 'ACC', t: 'Accusative', pl: 'biernik · kogo? co?', intro: 'The direct object, and the goal of a movement after *na / w*. Feminine *-a* → *-ę*; masculine things look like the nominative, masculine people and animals like the genitive.' },
  { id: 'GEN', t: 'Genitive', pl: 'dopełniacz · kogo? czego?', intro: 'The busiest case: absence and negation, "of", quantities, and the most common prepositions (*do, z, od, bez, dla, u*).' },
  { id: 'DAT', t: 'Dative', pl: 'celownik · komu? czemu?', intro: 'The receiver ("to whom?"), a handful of verbs like *pomagać* and *dziękować*, and the person who feels something: *zimno mi*.' },
  { id: 'INS', t: 'Instrumental', pl: 'narzędnik · (z) kim? (z) czym?', intro: '"With" (*z*), position (*przed, za, nad, pod, między*), what someone is (*jestem lekarzem*) and the means (*jadę autobusem*). Endings: *-em* (masc. & neut.), *-ą* (fem.), *-ami* (plural).' },
  { id: 'LOC', t: 'Locative', pl: 'miejscownik · o kim? o czym?', intro: 'Only ever after a preposition: *w, na* (where?), *o* (about), *po* (after), *przy* (by).' },
  { id: 'VOC', t: 'Vocative', pl: 'wołacz · o!', intro: 'For calling or addressing someone: *Mamo! Kasiu! Panie Janie!*' },
  { id: 'PRON', t: 'Pronouns', pl: 'zaimki', pattern: 'pron', intro: 'Pronouns have their own, very frequent forms: *mnie, cię, go, jej, nam, ich…*' },
  { id: 'ADJ', t: 'Adjectives', pl: 'przymiotniki', pattern: 'adj', intro: 'Adjectives (and *ten, mój, nasz*) copy the gender, number and case of their noun.' },
  { id: 'PLUR', t: 'Plurals', pl: 'liczba mnoga', intro: 'Making the plural, including the special "virile" plural for groups of men, and the tricky genitive plural.' },
  { id: 'LEM', t: 'Dictionary form', pl: 'forma podstawowa', pattern: 'alternations', intro: 'Reading real texts means working backwards: from *psa* to *pies*, from *w mieście* to *miasto*. These exercises are generated from the sentences in all the other rules.' },
]);

PL.pattern('alternations', {
  t: 'Sound changes to undo when finding the dictionary form', kind: 'list',
  head: ['change', 'examples'],
  rows: [
    ['e ↔ (nothing)', '*pies → psa, dzień → dnia, sen → snu, ojciec → ojca, Marek → Marka* — the "fleeting e"'],
    ['ó ↔ o', '*stół → stołu, samochód → samochodu, mój → moja, móc → mogę*'],
    ['ą ↔ ę', '*ręka → rąk, mąż → męża, wziął → wzięła, miesiąc → miesięcy*'],
    ['a ↔ e', '*miasto → w mieście, las → w lesie, obiad → po obiedzie, sąsiad → sąsiedzi*'],
    ['o ↔ e', '*niosę → niesiesz, kościół → w kościele, brać → bierzesz*'],
    ['k → c / cz', '*książka → w książce, Polak → Polacy, ręka → ręczny*'],
    ['g → dz / ż', '*noga → w nodze, kolega → koledzy, noga → nóżka*'],
    ['t → ci / c', '*kobieta → kobiecie, student → studenci, płacić → płacę*'],
    ['d → dzi / dz', '*woda → wodzie, sąsiad → sąsiedzi, chodzić → chodzę*'],
    ['r → rz', '*siostra → siostrze, dobry → dobrzy, ser → serze*'],
    ['ł → l', '*stół → na stole, szkoła → w szkole, miły → mili*'],
    ['s / z → ś / ź / sz / ż', '*las → lesie, prosić → proszę, wozić → wożę*'],
    ['completely different word', '*człowiek → ludzie, rok → lata, dziecko → dzieci, iść → szedł, brać → wziąć*'],
  ],
});

/* ══ Rules ══ */

PL.rules('cases', 'NOM', {
  'NOM:subject': { o: 1, f: 3, kind: 'NOM', t: 'The subject',
    x: 'Whoever or whatever the sentence is about — the doer — stands in the nominative, the dictionary form: *Kot śpi.* (The cat is sleeping.) *Ta książka jest nowa.*' },
  'NOM:to-jest': { o: 14, f: 2, kind: 'NOM', t: '*To jest …* / *to są …*',
    x: 'After *to jest* (this is) and *to są* (these are) the noun stays in the nominative: *To jest mój brat.* Compare *być* with a noun but without *to*: *On jest lekarzem* (instrumental).' },
});

PL.rules('cases', 'ACC', {
  'ACC:object': { o: 2, f: 3, kind: 'ACC', t: 'The direct object',
    x: 'The thing the verb acts on directly (*what* do you see / have / buy?) is in the accusative. Feminine *-a* → *-ę*: *mam siostrę, piję kawę*. Masculine things and neuter nouns look like the nominative: *mam dom, otwieram okno*.' },
  'ACC:anim': { o: 9, f: 3, kind: 'ACC', t: 'Men and animals: accusative = genitive',
    x: 'For masculine people and animals the accusative borrows the genitive form: *widzę psa* (not *pies*), *znam twojego brata*. In the plural only men do this (*znam tych studentów*) — animals go back to the normal form: *lubię koty*.' },
  'ACC:motion': { o: 8, f: 3, kind: 'ACC', t: '*na / w* + accusative: where to?',
    x: 'Movement **to** a place (*dokąd?* where to?) uses *na* or *w* + accusative: *idę na pocztę, jadę w góry, połóż to na stół*. Being somewhere (*gdzie?*) uses the locative instead: *jestem na poczcie*.' },
  'ACC:prep': { o: 19, f: 2, kind: 'ACC', t: '*przez, za, po, o* + accusative',
    x: '*przez* = through, across; because of (*przez park, przez ciebie*). *za* = for — thanks or payment (*dziękuję za pomoc, płacę za kawę*), and "in" a time (*za tydzień*). *po* = to go and get (*idę po chleb*). *prosić o* = to ask for (*proszę o rachunek*).' },
  'ACC:time': { o: 24, f: 2, kind: 'ACC', t: 'Days and lengths of time',
    x: '*w* + accusative names the day: *w środę, w sobotę, w niedzielę*. *na* + accusative is a planned length of time (*jadę na tydzień* — for a week), *przez* + accusative how long something lasted (*przez godzinę*).' },
});

PL.rules('cases', 'GEN', {
  'GEN:nie-ma': { o: 4, f: 3, kind: 'GEN', t: '*nie ma* — there is no …',
    x: 'Absence is *nie ma* + genitive: *Nie ma chleba.* (There is no bread.) *Nie ma Marka w domu.* (Marek is not at home.) Past *nie było*, future *nie będzie* — still the genitive.' },
  'GEN:negation': { o: 7, f: 3, kind: 'GEN', t: 'Negated verb + genitive',
    x: 'When a verb that normally takes an accusative object is negated, the object switches to the genitive: *Mam czas* → *Nie mam czasu*. *Lubię kawę* → *Nie lubię kawy*.' },
  'GEN:of': { o: 10, f: 3, kind: 'GEN', t: '"of": owner and whole',
    x: 'The owner, or the whole something belongs to, comes **after** in the genitive: *samochód ojca* (father\'s car), *koniec filmu* (the end of the film), *centrum miasta* (the city centre).' },
  'GEN:quantity': { o: 11, f: 3, kind: 'GEN', t: 'Quantities: dużo, mało, ile, pięć…',
    x: 'After words of quantity — *dużo, mało, trochę, ile, wiele, kilka* — containers (*szklanka, kilo*) and numbers from five up, the noun is genitive (plural for things you can count): *dużo czasu, szklanka wody, pięć książek*.' },
  'GEN:do-z-od': { o: 5, f: 3, kind: 'GEN', t: '*do, z, od* — to, from',
    x: '*do* = to, into (*idę do domu, do sklepu*). *z* = from, out of (*wracam z pracy*). *od* = from a person, since a time (*list od mamy, od poniedziałku*). All three always take the genitive.' },
  'GEN:bez-dla': { o: 15, f: 2, kind: 'GEN', t: '*bez, dla, u, obok, podczas…*',
    x: 'Many prepositions always take the genitive: *bez* (without), *dla* (for), *u* (at someone\'s: *u babci*), *obok, koło, blisko* (next to, near), *podczas* (during), *zamiast* (instead of), *oprócz* (apart from), *wśród* (among), *naprzeciwko* (opposite).' },
  'GEN:verbs': { o: 17, f: 2, kind: 'GEN', t: 'Verbs that take the genitive',
    x: 'Some verbs take a genitive object: *szukać* (look for), *potrzebować* (need), *słuchać* (listen to), *bać się* (be afraid of), *uczyć się* (learn), *używać* (use), *życzyć* (wish), *spodziewać się* (expect).' },
});

PL.rules('cases', 'DAT', {
  'DAT:to-whom': { o: 12, f: 3, kind: 'DAT', t: 'To whom? — the receiver',
    x: 'The person who receives or benefits is in the dative: *daję mamie kwiaty, kupiłam dziecku lody, powiedz bratu*. The question is *komu?* (to whom?).' },
  'DAT:verbs': { o: 18, f: 2, kind: 'DAT', t: 'Verbs that take the dative',
    x: '*pomagać* (help), *dziękować* (thank), *ufać* (trust), *wierzyć* (believe), *przeszkadzać* (disturb), *przyglądać się* (look closely at), *podobać się* (to please = to be liked) and *smakować* (to taste good to) take the dative: *pomagam bratu, dziękuję pani*.' },
  'DAT:feel': { o: 21, f: 2, kind: 'DAT', t: 'Feelings: zimno mi, dziecku jest smutno',
    x: 'States and feelings put the person in the dative: *Zimno mi* (I\'m cold), *Dziecku jest smutno* (the child is sad), *Podoba mi się* (I like it — "it pleases me"), *Chce mi się pić* (I feel like a drink).' },
  'DAT:prep': { o: 31, f: 1, kind: 'DAT', t: '*dzięki, przeciwko, wbrew, ku*',
    x: 'A few prepositions take the dative: *dzięki* (thanks to), *przeciw(ko)* (against), *wbrew* (contrary to), *ku* (towards — literary).' },
});

PL.rules('cases', 'INS', {
  'INS:z': { o: 3, f: 3, kind: 'INS', t: '*z* + instrumental = with',
    x: '*z* meaning "together with" takes the instrumental: *kawa z mlekiem, idę z bratem, rozmawiam z mamą*. (*z* meaning "from" takes the genitive.)' },
  'INS:place': { o: 13, f: 3, kind: 'INS', t: '*przed, za, nad, pod, między* — where?',
    x: 'For position these prepositions take the instrumental: *przed domem* (in front of), *za domem* (behind), *nad morzem* (above; at the seaside), *pod stołem* (under), *między* (between). With movement towards, *za / pod / nad / przed* take the accusative.' },
  'INS:byc': { o: 16, f: 3, kind: 'INS', t: '*być / zostać* + a noun: what someone is',
    x: 'Saying what someone **is** — job, role, nationality — with *być* or *zostać* uses the instrumental: *Jestem studentem. Ona jest lekarką. Marek został ojcem.* (But *To jest Marek* — nominative after *to*.)' },
  'INS:means': { o: 20, f: 2, kind: 'INS', t: 'By what means: autobusem, kartą',
    x: 'The tool or the means of transport, with no preposition, is in the instrumental: *jadę autobusem, piszę długopisem, płacę kartą*.' },
  'INS:verbs': { o: 23, f: 2, kind: 'INS', t: 'Verbs that take the instrumental',
    x: '*interesować się* (be interested in), *zajmować się* (deal with, look after), *opiekować się* (take care of), *cieszyć się* (enjoy), *zachwycać się* (be delighted with), *kierować* (manage, steer) take the instrumental: *interesuję się muzyką*.' },
});

PL.rules('cases', 'LOC', {
  'LOC:w-na': { o: 3.5, f: 3, kind: 'LOC', t: '*w / na* + locative: where?',
    x: 'Being somewhere (*gdzie?* where?) is *w* (in) or *na* (on, at) + locative: *w domu, w Polsce, w szkole, na stole, na poczcie, na wsi*. Movement **to** a place uses the accusative instead (*idę na pocztę*).' },
  'LOC:o': { o: 6, f: 3, kind: 'LOC', t: '*o* + locative = about',
    x: '*o* meaning "about" takes the locative: *myślę o pracy, książka o Polsce, mówimy o filmie*.' },
  'LOC:po-przy': { o: 22, f: 2, kind: 'LOC', t: '*po* (after, around) and *przy* (by, at)',
    x: '*po* + locative = after (*po obiedzie, po pracy*) or all around a place (*spacer po mieście*). *przy* = by, at (*przy oknie, przy stole*).' },
});

PL.rules('cases', 'VOC', {
  'VOC:address': { o: 27, f: 1, kind: 'VOC', t: 'Calling someone: the vocative',
    x: 'When you address someone directly, names and titles take the vocative: *Mamo! Tato! Kasiu! Panie doktorze!* Feminine *-a* → *-o* (*Anno*), pet names in *-ia / -sia* → *-u* (*Kasiu, babciu*), masculine names → *-e* or *-u* (*Piotrze, Marku*). In casual speech men\'s names often stay unchanged.' },
});

PL.rules('cases', 'PRON', {
  'PRON:short': { o: 9.5, f: 3, t: 'Pronoun objects: mnie, cię, go, jej…',
    x: 'Personal pronouns have their own case forms. The everyday unstressed ones: *mi / mnie, ci / cię, mu / go, jej / ją, nam / nas, wam / was, im / ich*. *Kocham cię. Daj mi. Znam go. Pomóż jej.*' },
  'PRON:n-forms': { o: 18.5, f: 2, t: 'After a preposition: do niego, z nią',
    x: 'After a preposition, *on, ona, ono, oni, one* gain an **n-**: *do niego, z nim, o niej, dla nich, u niej*. (*jego → niego, ją → nią, ich → nich*)' },
  'PRON:sie': { o: 25, f: 2, t: '*siebie, sobie, sobą* — myself, yourself…',
    x: 'One reflexive pronoun serves every person; it points back to the subject: *kupiłem sobie, mówi o sobie, jestem z siebie dumna, weź to ze sobą*. The case decides the form: *siebie* (GEN/ACC), *sobie* (DAT/LOC), *sobą* (INS).' },
});

PL.rules('cases', 'ADJ', {
  'ADJ:agree': { o: 7.5, f: 3, t: 'Adjectives agree: nowy dom, nowa książka',
    x: 'An adjective copies the gender, number and case of its noun: *nowy dom, nowa książka, nowe okno; w nowym domu, z nową książką*. The same goes for *ten / ta / to* and *mój / moja / moje*.' },
  'ADJ:virile': { o: 26, f: 2, t: 'Virile plural: dobrzy panowie, dobre panie',
    x: 'In the plural Polish separates groups with at least one man ("virile") from everything else. Virile adjectives have their own ending, with consonant changes: *nowi, dobrzy, polscy, mali, wysocy*; all other plurals just take *-e*: *nowe, dobre, polskie*. The same with *ci / te* and *moi / moje*.' },
});

PL.rules('cases', 'PLUR', {
  'PL:nom': { o: 12.5, f: 3, t: 'Making the plural: -y, -i, -e, -a',
    x: 'Most masculine and feminine nouns take *-y* or *-i* (*domy, kobiety, książki*), soft stems *-e* (*pokoje, ulice*), neuter nouns *-a* (*okna, miasta*). Men get special virile forms: *student → studenci, Polak → Polacy, pan → panowie*.' },
  'PL:gen': { o: 28, f: 2, t: 'Genitive plural: domów, książek, okien',
    x: 'Masculine nouns mostly take *-ów* (*domów, panów*). Feminine and neuter nouns in *-a / -o* simply lose the ending, often slipping in an *e* or turning *o* into *ó*: *kobiet, książek, okien, sióstr, szkół*. Soft stems take *-i / -y*: *lekcji, nocy, kluczy*.' },
});

PL.rules('cases', 'LEM', {
  'LEM:noun': { o: 16.5, f: 2, t: 'Find the dictionary form (nouns, pronouns)',
    x: 'To look a word up you need its nominative singular. Undo the ending, then undo the sound changes: fleeting *e* (*psa → pies*), *o → ó* (*stołu → stół*), *ę → ą* (*rąk → ręka*), softening (*w mieście → miasto*), and remember the few irregular plurals (*ludzie → człowiek*).' },
});

/* ══ Sentences ══ */

PL.items('NOM:subject', [
  ['dom', 'Ten {dom} jest bardzo stary.', 'This house is very old.'],
  ['kobieta', 'Ta {kobieta} jest moją sąsiadką.', 'This woman is my neighbour.'],
  ['książka', 'Nowa {książka} leży na stole.', 'A new book is lying on the table.'],
  ['pies', 'Nasz {pies} bardzo lubi dzieci.', 'Our dog really likes children.'],
  ['dziecko', 'Małe {dziecko} płacze w pokoju.', 'A small child is crying in the room.'],
  ['człowiek', 'Ci {ludzie} czekają na autobus.', 'These people are waiting for the bus.'],
  ['kot', 'Gdzie jest {kot}?', 'Where is the cat?'],
  ['pociąg', '{Pociąg} do Krakowa odjeżdża o ósmej.', 'The train to Kraków leaves at eight.'],
  ['siostra', 'Moja {siostra} mieszka w Gdańsku.', 'My sister lives in Gdańsk.'],
  ['pogoda', 'Dzisiaj {pogoda} jest piękna.', 'The weather is beautiful today.'],
]);

PL.items('NOM:to-jest', [
  ['brat', 'To jest mój {brat}.', 'This is my brother.'],
  ['książka', 'To jest bardzo ciekawa {książka}.', 'This is a very interesting book.'],
  ['dziecko', 'To są moje {dzieci}.', 'These are my children.'],
  ['przyjaciel', 'To są moi {przyjaciele}.', 'These are my friends.'],
  ['miasto', 'Kraków to piękne {miasto}.', 'Kraków is a beautiful city.'],
  ['kawa', 'Co to jest? — To jest {kawa}.', 'What is this? — It\'s coffee.'],
  ['problem', 'To jest duży {problem}.', 'This is a big problem.'],
]);

PL.items('ACC:object', [
  ['książka', 'Czytam ciekawą {książkę}.', 'I\'m reading an interesting book.'],
  ['kawa', 'Poproszę {kawę} z mlekiem.', 'A coffee with milk, please.'],
  ['dom', 'Kupujemy nowy {dom}.', 'We\'re buying a new house.'],
  ['okno', 'Otwórz {okno}, proszę.', 'Open the window, please.'],
  ['siostra', 'Mam starszą {siostrę}.', 'I have an older sister.'],
  ['herbata', 'Pijesz {herbatę} czy kawę?', 'Are you drinking tea or coffee?'],
  ['list', 'Piszę {list} do babci.', 'I\'m writing a letter to grandma.'],
  ['zdjęcie', 'Zrób mi {zdjęcie}!', 'Take a photo of me!'],
  ['gazeta', 'Codziennie rano czytam {gazetę}.', 'I read the newspaper every morning.'],
  ['muzyka', 'Bardzo lubię polską {muzykę}.', 'I really like Polish music.'],
  ['pomoc', 'Dostałem {pomoc} od sąsiada.', 'I got help from a neighbour.'],
]);

PL.items('ACC:anim', [
  ['pies', 'Mam małego {psa}.', 'I have a small dog.'],
  ['brat', 'Znasz mojego {brata}?', 'Do you know my brother?'],
  ['kot', 'Widzę czarnego {kota} na dachu.', 'I can see a black cat on the roof.'],
  ['lekarz', 'Musimy wezwać {lekarza}.', 'We need to call a doctor.'],
  ['Marek', 'Kocham {Marka}.', 'I love Marek.'],
  ['student', 'Nauczyciel pyta nowego {studenta}.', 'The teacher is asking the new student.'],
  ['syn', 'Mają jednego {syna} i dwie córki.', 'They have one son and two daughters.'],
  ['przyjaciel', 'Zapraszam {przyjaciela} na kolację.', 'I\'m inviting a friend to dinner.'],
  ['student', 'Znam tych {studentów}.', 'I know these students.'],
  ['kot', 'Lubię {koty}, ale wolę psy.', 'I like cats, but I prefer dogs.', { n: 'Plural animals go back to the ordinary accusative (= nominative): *lubię koty, widzę psy*. Only men keep ACC = GEN in the plural.' }],
  ['mąż', 'Przedstawię ci mojego {męża}.', 'Let me introduce my husband to you.'],
]);

PL.items('ACC:motion', [
  ['poczta', 'Idę na {pocztę}.', 'I\'m going to the post office.'],
  ['góra', 'W sierpniu jedziemy w {góry}.', 'In August we\'re going to the mountains.'],
  ['stół', 'Połóż klucze na {stół}.', 'Put the keys on the table.', { n: 'Movement onto the table → accusative. Once they are lying there: *klucze leżą na stole* (locative).' }],
  ['koncert', 'Idziemy dziś na {koncert}.', 'We\'re going to a concert today.'],
  ['plaża', 'Dzieci biegną na {plażę}.', 'The children are running to the beach.'],
  ['mecz', 'Idziesz z nami na {mecz}?', 'Are you coming with us to the match?'],
  ['spacer', 'Chodźmy na {spacer}!', 'Let\'s go for a walk!'],
  ['dworzec', 'Jadę taksówką na {dworzec}.', 'I\'m taking a taxi to the station.'],
  ['wycieczka', 'Jutro jedziemy na {wycieczkę}.', 'Tomorrow we\'re going on a trip.'],
  ['uniwersytet', 'Rano jadę na {uniwersytet}.', 'In the morning I go to the university.'],
]);

PL.items('ACC:prep', [
  ['park', 'Chodzę do pracy przez {park}.', 'I walk to work through the park.'],
  ['pomoc', 'Dziękuję za {pomoc}!', 'Thanks for the help!'],
  ['rachunek', 'Poproszę o {rachunek}.', 'Could I have the bill, please?', { n: 'Literally "I ask for the bill": *prosić o* + accusative.' }],
  ['chleb', 'Idę do sklepu po {chleb}.', 'I\'m going to the shop to get bread.'],
  ['tydzień', 'Wracam za {tydzień}.', 'I\'ll be back in a week.'],
  ['kawa', 'Ile płacę za {kawę}?', 'How much do I pay for the coffee?'],
  ['ulica', 'Przejdź przez {ulicę} na zielonym świetle.', 'Cross the street on the green light.'],
  ['ty', 'Spóźniłem się przez {ciebie}!', 'I was late because of you!'],
]);

PL.items('ACC:time', [
  ['sobota', 'W {sobotę} idziemy do kina.', 'On Saturday we\'re going to the cinema.'],
  ['środa', 'Mam egzamin w {środę}.', 'I have an exam on Wednesday.'],
  ['niedziela', 'Co robisz w {niedzielę}?', 'What are you doing on Sunday?'],
  ['poniedziałek', 'W {poniedziałek} sklep jest zamknięty.', 'On Monday the shop is closed.'],
  ['tydzień', 'Jadę do Polski na {tydzień}.', 'I\'m going to Poland for a week.'],
  ['miesiąc', 'Byłam w Krakowie przez {miesiąc}.', 'I was in Kraków for a month.'],
  ['piątek', 'Spotkajmy się w {piątek}.', 'Let\'s meet on Friday.'],
  ['godzina', 'Czekałem na ciebie przez {godzinę}!', 'I waited for you for an hour!'],
]);

PL.items('GEN:nie-ma', [
  ['chleb', 'Nie ma już {chleba}.', 'There\'s no bread left.'],
  ['Marek', 'Nie ma {Marka} w domu.', 'Marek isn\'t at home.'],
  ['woda', 'W lodówce nie ma {wody}.', 'There\'s no water in the fridge.'],
  ['problem', 'Nie ma {problemu}!', 'No problem!'],
  ['mleko', 'Nie było {mleka}, więc piłem czarną kawę.', 'There was no milk, so I drank black coffee.'],
  ['autobus', 'Dzisiaj nie będzie {autobusu}.', 'There won\'t be a bus today.'],
  ['pieniądze', 'Nie ma {pieniędzy} na koncie.', 'There\'s no money in the account.'],
  ['czas', 'Szybko, nie ma {czasu}!', 'Quick, there\'s no time!'],
  ['mama', '{Mamy} jeszcze nie ma.', 'Mum isn\'t here yet.'],
]);

PL.items('GEN:negation', [
  ['czas', 'Przepraszam, nie mam {czasu}.', 'Sorry, I don\'t have time.'],
  ['kawa', 'Nie piję {kawy} wieczorem.', 'I don\'t drink coffee in the evening.'],
  ['film', 'Nie widziałem tego {filmu}.', 'I haven\'t seen this film.'],
  ['książka', 'Nie znam tej {książki}.', 'I don\'t know this book.'],
  ['samochód', 'Nie mamy {samochodu}.', 'We don\'t have a car.'],
  ['brat', 'Nie mam {brata}, tylko siostrę.', 'I don\'t have a brother, only a sister.', { n: 'Same verb, two cases: *nie mam brata* (negated → genitive), *mam siostrę* (accusative).' }],
  ['telefon', 'Nie słyszę {telefonu}.', 'I can\'t hear the phone.'],
  ['pies', 'Nie lubię tego {psa}.', 'I don\'t like this dog.'],
  ['herbata', 'Dziękuję, nie chcę {herbaty}.', 'No thanks, I don\'t want any tea.'],
  ['pogoda', 'Nie lubię takiej {pogody}.', 'I don\'t like weather like this.'],
]);

PL.items('GEN:of', [
  ['ojciec', 'To jest samochód mojego {ojca}.', 'This is my father\'s car.'],
  ['film', 'Nie pamiętam końca {filmu}.', 'I don\'t remember the end of the film.'],
  ['miasto', 'Mieszkamy w centrum {miasta}.', 'We live in the city centre.'],
  ['Anna', 'To jest pokój {Anny}.', 'This is Anna\'s room.'],
  ['kobieta', 'Znasz imię tej {kobiety}?', 'Do you know this woman\'s name?'],
  ['szkoła', 'Dyrektor {szkoły} jest bardzo miły.', 'The school\'s headteacher is very nice.'],
  ['tydzień', 'Na początku {tygodnia} zawsze mam dużo pracy.', 'At the beginning of the week I always have a lot of work.'],
  ['dziecko', 'Zabawki {dzieci} leżą wszędzie.', 'The children\'s toys are lying everywhere.'],
  ['Polska', 'Warszawa jest stolicą {Polski}.', 'Warsaw is the capital of Poland.'],
  ['brat', 'To jest żona mojego {brata}.', 'This is my brother\'s wife.'],
]);

PL.items('GEN:quantity', [
  ['czas', 'Mam dużo {czasu}.', 'I have a lot of time.'],
  ['woda', 'Poproszę szklankę {wody}.', 'A glass of water, please.'],
  ['książka', 'Na półce stoi pięć {książek}.', 'There are five books on the shelf.'],
  ['jabłko', 'Kupiłam kilo {jabłek}.', 'I bought a kilo of apples.'],
  ['człowiek', 'Na koncercie było mnóstwo {ludzi}.', 'There were loads of people at the concert.'],
  ['pieniądze', 'Ile {pieniędzy} potrzebujesz?', 'How much money do you need?'],
  ['dzień', 'Byliśmy tam kilka {dni}.', 'We were there for a few days.'],
  ['kobieta', 'W tej firmie pracuje wiele {kobiet}.', 'Many women work in this company.'],
  ['mleko', 'Dodaj trochę {mleka}.', 'Add a little milk.'],
  ['wino', 'Poprosimy butelkę czerwonego {wina}.', 'A bottle of red wine, please.'],
]);

PL.items('GEN:do-z-od', [
  ['dom', 'Wracam do {domu}.', 'I\'m going back home.'],
  ['praca', 'Wracam z {pracy} o piątej.', 'I get back from work at five.'],
  ['mama', 'Dostałem list od {mamy}.', 'I got a letter from mum.'],
  ['sklep', 'Idę do {sklepu}.', 'I\'m going to the shop.'],
  ['Kraków', 'Jutro jedziemy do {Krakowa}.', 'Tomorrow we\'re going to Kraków.'],
  ['poniedziałek', 'Od {poniedziałku} zaczynam dietę.', 'From Monday I\'m starting a diet.'],
  ['Finlandia', 'Jestem z {Finlandii}.', 'I\'m from Finland.'],
  ['szkoła', 'Dzieci wracają ze {szkoły}.', 'The children are coming back from school.'],
  ['lekarz', 'Muszę iść do {lekarza}.', 'I have to go to the doctor.'],
  ['Niemcy', 'Mój sąsiad pochodzi z {Niemiec}.', 'My neighbour comes from Germany.'],
  ['Warszawa', 'Ten pociąg jedzie do {Warszawy}.', 'This train goes to Warsaw.'],
]);

PL.items('GEN:bez-dla', [
  ['cukier', 'Piję herbatę bez {cukru}.', 'I drink tea without sugar.'],
  ['mama', 'Kupiłem kwiaty dla {mamy}.', 'I bought flowers for mum.'],
  ['babcia', 'W niedzielę jemy obiad u {babci}.', 'On Sunday we have lunch at grandma\'s.'],
  ['dom', 'Obok {domu} jest mały park.', 'Next to the house there\'s a small park.'],
  ['lekcja', 'Podczas {lekcji} nie wolno używać telefonu.', 'You can\'t use your phone during the lesson.'],
  ['kawa', 'Zamiast {kawy} piję teraz herbatę.', 'Instead of coffee I now drink tea.'],
  ['kościół', 'Spotkajmy się koło {kościoła}.', 'Let\'s meet near the church.'],
  ['przyjaciel', 'Mam prezent dla mojego {przyjaciela}.', 'I have a present for my friend.'],
  ['problem', 'Zrobiłem to bez {problemu}.', 'I did it without any problem.'],
  ['lekarz', 'Byłam dziś u {lekarza}.', 'I was at the doctor\'s today.'],
]);

PL.items('GEN:verbs', [
  ['klucz', 'Szukam {kluczy}.', 'I\'m looking for my keys.'],
  ['pomoc', 'Potrzebuję {pomocy}.', 'I need help.'],
  ['pies', 'Moja córka boi się {psów}.', 'My daughter is afraid of dogs.'],
  ['muzyka', 'Lubię słuchać polskiej {muzyki}.', 'I like listening to Polish music.'],
  ['zdrowie', 'Życzę ci {zdrowia}!', 'I wish you good health!'],
  ['język', 'Uczę się {języka} polskiego.', 'I\'m learning the Polish language.'],
  ['telefon', 'Mogę użyć twojego {telefonu}?', 'Can I use your phone?'],
  ['gość', 'Spodziewamy się {gości}.', 'We\'re expecting guests.'],
  ['radio', 'Rano słucham {radia}.', 'In the morning I listen to the radio.'],
]);

PL.items('DAT:to-whom', [
  ['mama', 'Daję {mamie} kwiaty.', 'I\'m giving mum flowers.'],
  ['dziecko', 'Kupiłam {dziecku} lody.', 'I bought the child some ice cream.'],
  ['brat', 'Powiedz {bratu}, że zadzwonię.', 'Tell your brother I\'ll call.'],
  ['pan', 'Pokażę {panu} drogę.', 'I\'ll show you the way (sir).'],
  ['kolega', 'Pożyczyłem {koledze} rower.', 'I lent my friend a bike.'],
  ['siostra', 'Wysłałem {siostrze} zdjęcia.', 'I sent my sister the photos.'],
  ['Kasia', 'Kup {Kasi} coś na urodziny.', 'Buy Kasia something for her birthday.'],
  ['ojciec', 'Daliśmy {ojcu} nowy zegarek.', 'We gave father a new watch.'],
  ['babcia', 'Opowiedz {babci}, co się stało.', 'Tell grandma what happened.'],
  ['tata', 'Zrobiłam {tacie} kawę.', 'I made dad a coffee.'],
]);

PL.items('DAT:verbs', [
  ['brat', 'Zawsze pomagam {bratu}.', 'I always help my brother.'],
  ['pani', 'Dziękuję {pani} bardzo!', 'Thank you very much (madam)!'],
  ['lekarz', 'Ufam mojemu {lekarzowi}.', 'I trust my doctor.'],
  ['dziecko', 'Nie przeszkadzaj {dziecku}, ono śpi.', 'Don\'t disturb the child, it\'s asleep.'],
  ['człowiek', 'Nie wierzę temu {człowiekowi}.', 'I don\'t believe this man.'],
  ['mama', 'Ta sukienka bardzo podoba się {mamie}.', 'Mum really likes this dress.', { n: '*podobać się* works "backwards": the dress *pleases* mum. The thing liked is the subject; the person is in the dative.' }],
  ['sąsiad', 'Przyglądam się nowemu {sąsiadowi}.', 'I\'m taking a good look at the new neighbour.'],
  ['kot', 'Czy {kotu} smakuje ta karma?', 'Does the cat like this food?'],
  ['przyjaciel', 'Dziękuję mojemu {przyjacielowi} za wszystko.', 'I thank my friend for everything.'],
]);

PL.items('DAT:feel', [
  ['dziecko', '{Dziecku} jest zimno.', 'The child is cold.'],
  ['mama', '{Mamie} jest smutno.', 'Mum is sad.'],
  ['pies', 'Chyba {psu} jest gorąco.', 'I think the dog is hot.'],
  ['brat', '{Bratu} nie chce się iść do szkoły.', 'My brother doesn\'t feel like going to school.'],
  ['Kasia', '{Kasi} podoba się Kraków.', 'Kasia likes Kraków.'],
  ['kolega', 'Mojemu {koledze} jest wszystko jedno.', 'My friend doesn\'t mind either way.'],
  ['babcia', '{Babci} jest dziś lepiej.', 'Grandma is feeling better today.'],
]);

PL.items('DAT:prep', [
  ['pomoc', 'Dzięki twojej {pomocy} wszystko się udało.', 'Thanks to your help everything worked out.'],
  ['wojna', 'Protestujemy przeciwko {wojnie}.', 'We\'re protesting against the war.'],
  ['przyjaciel', 'Dzięki {przyjacielowi} znalazłem pracę.', 'Thanks to a friend I found a job.'],
  ['mama', 'Zrobił to wbrew {mamie}.', 'He did it against mum\'s wishes.'],
  ['morze', 'Szliśmy powoli ku {morzu}.', 'We walked slowly towards the sea.'],
]);

PL.items('INS:z', [
  ['mleko', 'Piję kawę z {mlekiem}.', 'I drink coffee with milk.'],
  ['brat', 'Idę do kina z {bratem}.', 'I\'m going to the cinema with my brother.'],
  ['mama', 'Rozmawiam z {mamą} przez telefon.', 'I\'m talking with mum on the phone.'],
  ['przyjaciel', 'Mieszkam z {przyjacielem}.', 'I live with a friend.'],
  ['pies', 'Codziennie wychodzę z {psem}.', 'I go out with the dog every day.'],
  ['ser', 'Poproszę kanapkę z {serem}.', 'A cheese sandwich, please.'],
  ['dziecko', 'Rozmawiałam z {dziećmi} o szkole.', 'I talked with the children about school.'],
  ['cukier', 'Herbata z {cukrem} czy bez?', 'Tea with sugar or without?'],
  ['siostra', 'Jadę na wakacje z {siostrą}.', 'I\'m going on holiday with my sister.'],
  ['żona', 'Przyszedł z {żoną}.', 'He came with his wife.'],
]);

PL.items('INS:place', [
  ['dom', 'Przed {domem} stoi samochód.', 'A car is parked in front of the house.'],
  ['stół', 'Kot śpi pod {stołem}.', 'The cat is sleeping under the table.'],
  ['morze', 'Latem mieszkamy nad {morzem}.', 'In summer we live by the sea.'],
  ['ogród', 'Pies czeka przed {ogrodem}.', 'The dog is waiting in front of the garden.'],
  ['okno', 'Biurko stoi pod {oknem}.', 'The desk stands under the window.'],
  ['kino', 'Czekam na ciebie przed {kinem}.', 'I\'m waiting for you in front of the cinema.'],
  ['drzwi', 'Ktoś stoi za {drzwiami}.', 'Someone\'s standing behind the door.'],
  ['łóżko', 'Twoje buty są pod {łóżkiem}.', 'Your shoes are under the bed.'],
  ['miasto', 'Mieszkamy za {miastem}.', 'We live just outside the town.', { n: '*za miastem* — literally "behind the town" — means out of town, in the countryside nearby.' }],
  ['góra', 'Nad {górami} latają ptaki.', 'Birds are flying over the mountains.'],
]);

PL.items('INS:byc', [
  ['lekarz', 'Mój brat jest {lekarzem}.', 'My brother is a doctor.'],
  ['nauczycielka', 'Moja mama jest {nauczycielką}.', 'My mum is a teacher.'],
  ['student', 'Jestem {studentem}.', 'I am a student (said by a man).'],
  ['Polak', 'Mój mąż jest {Polakiem}.', 'My husband is Polish.'],
  ['Finka', 'Jestem {Finką}.', 'I am Finnish (said by a woman).'],
  ['ojciec', 'Marek został {ojcem}.', 'Marek has become a father.'],
  ['inżynier', 'Chcę zostać {inżynierem}.', 'I want to become an engineer.'],
  ['przyjaciel', 'Był moim najlepszym {przyjacielem}.', 'He was my best friend.'],
  ['studentka', 'Kasia jest {studentką}.', 'Kasia is a student.'],
  ['lekarka', 'Moja siostra chce być {lekarką}.', 'My sister wants to be a doctor.'],
]);

PL.items('INS:means', [
  ['autobus', 'Jeżdżę do pracy {autobusem}.', 'I go to work by bus.'],
  ['długopis', 'Proszę pisać {długopisem}.', 'Please write in pen.'],
  ['karta', 'Czy mogę zapłacić {kartą}?', 'Can I pay by card?'],
  ['pociąg', 'Do Gdańska pojedziemy {pociągiem}.', 'We\'ll go to Gdańsk by train.'],
  ['samolot', 'Lecę do Finlandii {samolotem}.', 'I\'m flying to Finland.'],
  ['rower', 'Latem jeżdżę {rowerem}.', 'In summer I go by bike.'],
  ['tramwaj', 'Pojedziemy {tramwajem} czy pójdziemy pieszo?', 'Shall we take the tram or walk?'],
]);

PL.items('INS:verbs', [
  ['muzyka', 'Interesuję się {muzyką}.', 'I\'m interested in music.'],
  ['sport', 'Mój brat interesuje się {sportem}.', 'My brother is into sport.'],
  ['dziecko', 'Babcia opiekuje się {dzieckiem}.', 'Grandma is looking after the child.'],
  ['pies', 'Kto zajmuje się {psem}, kiedy jesteście na wakacjach?', 'Who looks after the dog when you\'re on holiday?'],
  ['pogoda', 'Cieszymy się piękną {pogodą}.', 'We\'re enjoying the beautiful weather.'],
  ['film', 'Wszyscy zachwycają się tym {filmem}.', 'Everyone is raving about this film.'],
  ['język', 'Interesuję się {językami}.', 'I\'m interested in languages.'],
]);

PL.items('LOC:w-na', [
  ['dom', 'Jestem w {domu}.', 'I\'m at home.'],
  ['Polska', 'Mieszkam w {Polsce}.', 'I live in Poland.'],
  ['szkoła', 'Dzieci są w {szkole}.', 'The children are at school.'],
  ['stół', 'Klucze leżą na {stole}.', 'The keys are lying on the table.'],
  ['poczta', 'Pracuję na {poczcie}.', 'I work at the post office.'],
  ['miasto', 'W {mieście} jest dużo ludzi.', 'There are lots of people in town.'],
  ['Kraków', 'Studiuję w {Krakowie}.', 'I study in Kraków.'],
  ['las', 'Spacerujemy w {lesie}.', 'We\'re walking in the forest.'],
  ['uniwersytet', 'Moja siostra pracuje na {uniwersytecie}.', 'My sister works at the university.'],
  ['wieś', 'Dziadkowie mieszkają na {wsi}.', 'My grandparents live in the countryside.'],
  ['lodówka', 'Mleko jest w {lodówce}.', 'The milk is in the fridge.'],
  ['Niemcy', 'Mój kuzyn pracuje w {Niemczech}.', 'My cousin works in Germany.'],
]);

PL.items('LOC:o', [
  ['praca', 'Nie chcę teraz rozmawiać o {pracy}.', 'I don\'t want to talk about work now.'],
  ['Polska', 'Czytam książkę o {Polsce}.', 'I\'m reading a book about Poland.'],
  ['kot', 'Dzieci ciągle mówią o {kocie}.', 'The kids keep talking about the cat.'],
  ['film', 'Co myślisz o tym {filmie}?', 'What do you think of this film?'],
  ['wakacje', 'Marzę o {wakacjach}.', 'I\'m dreaming of the holidays.'],
  ['brat', 'Opowiedz mi o swoim {bracie}.', 'Tell me about your brother.'],
  ['przyszłość', 'Musimy pomyśleć o {przyszłości}.', 'We have to think about the future.'],
  ['rzecz', 'Zapomniałem o jednej {rzeczy}.', 'I forgot about one thing.'],
]);

PL.items('LOC:po-przy', [
  ['obiad', 'Po {obiedzie} idziemy na spacer.', 'After lunch we\'re going for a walk.'],
  ['praca', 'Spotkajmy się po {pracy}.', 'Let\'s meet after work.'],
  ['okno', 'Siedzę przy {oknie}.', 'I\'m sitting by the window.'],
  ['stół', 'Cała rodzina siedzi przy {stole}.', 'The whole family is sitting at the table.'],
  ['miasto', 'Lubię spacerować po {mieście}.', 'I like walking around town.'],
  ['lekcja', 'Po {lekcji} pójdziemy na kawę.', 'After the lesson we\'ll go for a coffee.'],
  ['park', 'Dzieci biegają po {parku}.', 'The children are running around the park.'],
  ['śniadanie', 'Po {śniadaniu} zawsze piję kawę.', 'After breakfast I always have a coffee.'],
]);

PL.items('VOC:address', [
  ['mama', '{Mamo}, gdzie są moje klucze?', 'Mum, where are my keys?'],
  ['Kasia', '{Kasiu}, chodź tutaj!', 'Kasia, come here!'],
  ['pan', 'Dzień dobry, {panie} doktorze!', 'Good morning, doctor!'],
  ['Piotr', '{Piotrze}, pomóż mi, proszę.', 'Piotr, help me please.'],
  ['babcia', 'Dziękuję, {babciu}!', 'Thank you, grandma!'],
  ['Anna', '{Anno}, masz chwilę?', 'Anna, have you got a moment?'],
  ['tata', '{Tato}, możesz mnie odebrać?', 'Dad, can you pick me up?'],
  ['syn', '{Synu}, jestem z ciebie dumny.', 'Son, I\'m proud of you.'],
  ['Marek', '{Marku}, szef do ciebie dzwoni.', 'Marek, the boss is calling you.'],
]);

PL.items('PRON:short', [
  ['ty', 'Kocham {cię}.', 'I love you.'],
  ['ja', 'Daj {mi} spokój!', 'Leave me alone!', { n: 'Literally "give me peace".' }],
  ['on', 'Znam {go} od lat.', 'I\'ve known him for years.'],
  ['ona', 'Pomóż {jej}, proszę.', 'Help her, please.'],
  ['my', 'Odwiedź {nas} w sobotę!', 'Visit us on Saturday!'],
  ['oni', 'Widziałem {ich} wczoraj w kinie.', 'I saw them at the cinema yesterday.'],
  ['wy', 'Dziękuję {wam} za wszystko.', 'Thank you (all) for everything.'],
  ['ona', 'Bardzo {ją} lubię.', 'I like her a lot.'],
  ['on', 'Powiedz {mu}, że czekam.', 'Tell him I\'m waiting.'],
  ['ty', 'Czy mogę {ci} pomóc?', 'Can I help you?'],
  ['ja', 'Możesz {mnie} odwieźć do domu?', 'Can you drive me home?'],
  ['one', 'Dzieci? Widzę {je} w ogrodzie.', 'The kids? I can see them in the garden.', { n: '*dzieci* are not a group of men, so "them" is *je* (non-virile), not *ich*.' }],
]);

PL.items('PRON:n-forms', [
  ['on', 'Jutro idę do {niego}.', 'Tomorrow I\'m going to his place.'],
  ['ona', 'Rozmawiałem z {nią} wczoraj.', 'I talked to her yesterday.'],
  ['oni', 'To prezent dla {nich}.', 'This is a present for them.'],
  ['ona', 'Często myślę o {niej}.', 'I often think about her.'],
  ['on', 'Bez {niego} nie pojadę.', 'I won\'t go without him.'],
  ['oni', 'Mieszkam u {nich} od tygodnia.', 'I\'ve been staying at their place for a week.'],
  ['on', 'Idę z {nim} do kina.', 'I\'m going to the cinema with him.'],
  ['ona', 'Mam coś dla {niej}.', 'I have something for her.'],
]);

PL.items('PRON:sie', [
  ['siebie', 'Kupiłem {sobie} nowy telefon.', 'I bought myself a new phone.'],
  ['siebie', 'On mówi tylko o {sobie}.', 'He only talks about himself.'],
  ['siebie', 'Jestem z {siebie} dumna.', 'I\'m proud of myself (f.).'],
  ['siebie', 'Weź parasol ze {sobą}.', 'Take an umbrella with you.'],
  ['siebie', 'Zrób {sobie} przerwę.', 'Take a break.', { n: 'Literally "make yourself a break".' }],
  ['siebie', 'Nie mam przy {sobie} pieniędzy.', 'I don\'t have any money on me.'],
]);

PL.items('ADJ:agree', [
  ['nowy', 'Mieszkamy w {nowym} domu.', 'We live in a new house.'],
  ['ciekawy', 'Czytam {ciekawą} książkę.', 'I\'m reading an interesting book.'],
  ['dobry', 'Szukam {dobrego} lekarza.', 'I\'m looking for a good doctor.'],
  ['stary', 'Lubię {stare} filmy.', 'I like old films.'],
  ['ten', 'Znasz {tę} kobietę?', 'Do you know this woman?'],
  ['mój', 'To jest {moja} siostra.', 'This is my sister.'],
  ['polski', 'Uczę się {polskiego}.', 'I\'m learning Polish.', { n: 'Short for *uczę się (języka) polskiego* — the adjective takes the genitive of *język*.' }],
  ['duży', 'Mieszkam w {dużym} mieście.', 'I live in a big city.'],
  ['zimny', 'Poproszę {zimne} piwo.', 'A cold beer, please.'],
  ['ładny', 'Masz bardzo {ładną} sukienkę.', 'You have a very pretty dress.'],
  ['ten', 'Z {tym} panem już rozmawiałem.', 'I\'ve already spoken to this gentleman.'],
  ['twój', 'Gdzie są {twoje} klucze?', 'Where are your keys?'],
  ['zmęczony', 'Anna jest dziś bardzo {zmęczona}.', 'Anna is very tired today.'],
]);

PL.items('ADJ:virile', [
  ['polski', '{Polscy} studenci są bardzo mili.', 'Polish students are very nice.'],
  ['nowy', 'To są moi {nowi} koledzy.', 'These are my new colleagues (men).'],
  ['nowy', 'To są moje {nowe} koleżanki.', 'These are my new colleagues (women).'],
  ['zmęczony', 'Wszyscy są {zmęczeni}.', 'Everyone is tired.'],
  ['dobry', 'To {dobrzy} ludzie.', 'They are good people.'],
  ['ten', '{Ci} panowie czekają na pana.', 'These gentlemen are waiting for you (sir).'],
  ['mały', 'Chłopcy są jeszcze {mali}.', 'The boys are still little.'],
  ['szczęśliwy', 'Byliśmy bardzo {szczęśliwi}.', 'We were very happy.'],
  ['zmęczony', 'Dziewczyny są {zmęczone}.', 'The girls are tired.'],
  ['wysoki', 'Moi bracia są bardzo {wysocy}.', 'My brothers are very tall.'],
  ['drogi', '{Drodzy} Państwo!', 'Ladies and gentlemen!'],
]);

PL.items('PL:nom', [
  ['dom', 'Te {domy} są bardzo stare.', 'These houses are very old.'],
  ['książka', 'Gdzie są moje {książki}?', 'Where are my books?'],
  ['okno', 'Wszystkie {okna} są otwarte.', 'All the windows are open.'],
  ['student', 'Wszyscy {studenci} są już na sali.', 'All the students are already in the hall.'],
  ['Polak', '{Polacy} lubią pierogi.', 'Poles like pierogi.'],
  ['pan', 'Ci {panowie} są z Niemiec.', 'These gentlemen are from Germany.'],
  ['ulica', 'W centrum {ulice} są wąskie.', 'In the centre the streets are narrow.'],
  ['kot', 'Moje {koty} śpią cały dzień.', 'My cats sleep all day.'],
  ['przyjaciel', 'Moi {przyjaciele} mieszkają w Warszawie.', 'My friends live in Warsaw.'],
  ['dziecko', '{Dzieci} bawią się w ogrodzie.', 'The children are playing in the garden.'],
  ['sąsiad', 'Nasi {sąsiedzi} są bardzo mili.', 'Our neighbours are very nice.'],
  ['ręka', 'Umyj {ręce} przed jedzeniem!', 'Wash your hands before eating!'],
]);

PL.items('PL:gen', [
  ['dom', 'W tej wsi jest tylko pięć {domów}.', 'There are only five houses in this village.'],
  ['książka', 'Mam w domu dużo {książek}.', 'I have a lot of books at home.'],
  ['okno', 'Ile {okien} ma ten pokój?', 'How many windows does this room have?'],
  ['kobieta', 'Na sali było dwadzieścia {kobiet}.', 'There were twenty women in the hall.'],
  ['siostra', 'Nie mam {sióstr}.', 'I don\'t have any sisters.'],
  ['szkoła', 'W mieście jest kilka {szkół}.', 'There are several schools in town.'],
  ['lekcja', 'Dzisiaj mam sześć {lekcji}.', 'Today I have six lessons.'],
  ['noga', 'Pająk ma osiem {nóg}.', 'A spider has eight legs.'],
  ['zdjęcie', 'Zrobiłam sto {zdjęć}!', 'I took a hundred photos!'],
  ['miesiąc', 'Czekam już sześć {miesięcy}.', 'I\'ve been waiting for six months already.'],
  ['pan', 'Na spotkaniu było pięciu {panów} i trzy panie.', 'There were five men and three women at the meeting.'],
]);
