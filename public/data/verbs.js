/* ═══════════════════════════════════════════════════════════════
   data/verbs.js — Module: Verbs (czasowniki)

   Rules are conjugation PATTERNS, not single verbs: every verb that
   follows "-ować → -uję" feeds the same rule. Translations always
   pin down the person, and (for the past) the gender:
   "I (m.)" = said by a man, "(to a woman)" = addressing a woman.
   kind = the tense the answer must be in (checked by the tools).
   ═══════════════════════════════════════════════════════════════ */

PL.module('verbs', {
  t: 'Verbs', pl: 'Czasowniki',
  blurb: 'Conjugation: person, tense, gender, mood.',
  intro: 'A Polish verb ends differently for every person — *czytam* (I read), *czytasz* (you read), *czytają* (they read) — so the pronoun is usually left out. The present tense follows a handful of patterns that you can recognise from the infinitive. The past tense is regular and shows **gender**: *czytałem* (I, a man), *czytałam* (I, a woman). The future is either *będę* + verb or, for perfective verbs, simply the present-tense form. Every rule here is a pattern; the F1 table shows it on model verbs.',
});

PL.groups('verbs', [
  { id: 'PRES', t: 'Present tense', pl: 'czas teraźniejszy', intro: 'Six persons, a few patterns. Look at the infinitive to guess the pattern: *-ać → -am*, *-ować → -uję*, *-awać → -aję*, *-ić / -yć → -ę, -isz*; the rest (*-ę, -esz*) usually change their stem.' },
  { id: 'PAST', t: 'Past tense', pl: 'czas przeszły', pattern: 'v-past', intro: 'Replace *-ć* with *-ł* and add a person ending. The ending shows the gender of the subject — including "I" and "you".' },
  { id: 'FUT', t: 'Future', pl: 'czas przyszły', pattern: 'v-fut', intro: 'Imperfective verbs: *będę* + infinitive. Perfective verbs: the present-tense form already means the future.' },
  { id: 'IMP', t: 'Imperative', pl: 'tryb rozkazujący', pattern: 'v-imp', intro: 'Commands and requests: *czytaj!, czytajmy!, czytajcie!* — and the polite *proszę* + infinitive.' },
  { id: 'COND', t: 'Conditional', pl: 'tryb przypuszczający', pattern: 'v-cond', intro: 'Would / could: *chciałbym, mogłabyś, zrobilibyśmy*.' },
  { id: 'MOT', t: 'Verbs of motion', pl: 'czasowniki ruchu', intro: 'Polish distinguishes walking from riding (*iść / jechać*) and one trip now from going regularly (*iść / chodzić*). English "go" covers all four.' },
  { id: 'POL', t: 'Polite address', pl: 'forma grzecznościowa', intro: 'Strangers, shop staff and older people are addressed as *pan* (sir), *pani* (madam), *państwo* (ladies and gentlemen) — with the verb in the **third** person.' },
  { id: 'LEMV', t: 'Dictionary form', pl: 'bezokolicznik', pattern: 'alternations', intro: 'From a conjugated form back to the infinitive you would look up: *biorę → brać, szła → iść, mogę → móc*. Generated from all the verb sentences.' },
]);

/* ══ Rules ══ */

PL.rules('verbs', 'PRES', {
  'PRES:byc-miec': { o: 1, f: 3, kind: 'pres', pattern: 'v-byc', t: '*być* (to be) and *mieć* (to have)',
    x: '*być*: jestem, jesteś, jest, jesteśmy, jesteście, są. *mieć*: mam, masz, ma, mamy, macie, mają. Age uses *mieć*: *Mam trzydzieści lat* ("I have thirty years").' },
  'PRES:am': { o: 2, f: 3, kind: 'pres', pattern: 'v-am', t: 'Present: -ać → -am, -asz, -ają',
    x: 'Most verbs in *-ać* keep the *a*: czyt-am, czyt-asz, czyt-a, czyt-amy, czyt-acie, czyt-ają. (Some *-ać* verbs change their stem instead — see *-ę, -esz*.)' },
  'PRES:uje': { o: 3, f: 3, kind: 'pres', pattern: 'v-uje', t: 'Present: -ować → -uję, -ujesz',
    x: 'Every verb in *-ować* swaps *-owa-* for *-uj-*: prac-ować → prac-uję, prac-ujesz … prac-ują. Many verbs in *-ywać / -iwać* do the same: pokaz-ywać → pokaz-uję.' },
  'PRES:isz': { o: 4, f: 3, kind: 'pres', pattern: 'v-isz', t: 'Present: -ić / -yć / -eć → -ę, -isz / -ysz',
    x: '*mówić → mówię, mówisz, mówi … mówią*; *uczyć → uczę, uczysz*; *widzieć → widzę, widzisz*. "I" ends in *-ę*, "they" in *-ą*; the others have *i* (or *y* after cz, sz, rz, ż).' },
  'PRES:modal': { o: 5, f: 3, kind: 'pres', t: '*chcieć, móc, musieć, woleć* + infinitive',
    x: 'These verbs are followed by an infinitive: *Chcę iść. Mogę pomóc. Muszę pracować. Wolę zostać.* Their own forms: chcę / chcesz; mogę / możesz (g → ż); muszę / musisz; wolę / wolisz.' },
  'PRES:esz': { o: 6, f: 3, kind: 'pres', pattern: 'v-esz', t: 'Present: -ę, -esz with a changing stem',
    x: 'Endings *-ę, -esz, -e, -emy, -ecie, -ą*, but the stem shifts: *pisać → piszę, piszesz*; *brać → biorę, bierzesz*; *jechać → jadę, jedziesz*; *iść → idę, idziesz*; *pić → piję, pijesz*. Learn the "I" and "you" forms and the rest follows.' },
  'PRES:em': { o: 7, f: 2, kind: 'pres', pattern: 'v-em', t: 'Present: -em, -esz (rozumieć, jeść, wiedzieć)',
    x: '*umieć, rozumieć*: -em, -esz … -eją (*rozumiem, rozumieją*). The old irregulars *jeść, wiedzieć* and *powiedzieć* also start with *-em* but end in *-dzą*: *jem … jedzą, wiem … wiedzą*.' },
  'PRES:aje': { o: 8, f: 2, kind: 'pres', pattern: 'v-aje', t: 'Present: -awać → -aję',
    x: 'Verbs in *-awać* lose the *w*: *dawać → daję, dajesz*; *wstawać → wstaję*; *sprzedawać → sprzedaję*; *dostawać → dostaję*.' },
  'PRES:alt': { o: 9, f: 2, kind: 'pres', pattern: 'v-isz', t: 'Shift in "I" and "they": chodzę, proszę, płacę',
    x: 'In *-ić* verbs whose stem ends in s, z, c, dz, ść, źdź, the "I" and "they" forms harden the consonant: *prosić → proszę / proszą* (but *prosisz*), *chodzić → chodzę*, *płacić → płacę*, *wozić → wożę*, *jeździć → jeżdżę*.' },
});

PL.rules('verbs', 'PAST', {
  'PAST:sg': { o: 10, f: 3, kind: 'past', t: 'Past: -łem / -łam, -ł / -ła / -ło',
    x: 'Replace *-ć* with *-ł*, then: a man says *-łem* (czytałem), a woman *-łam* (czytałam); to a man *-łeś*, to a woman *-łaś*; he *-ł*, she *-ła*, it *-ło*.' },
  'PAST:pl': { o: 11, f: 3, kind: 'past', t: 'Past plural: -li (men, mixed) / -ły (others)',
    x: 'In the plural the split is not masculine/feminine but **virile**: *-li* if the group contains at least one man (*byliśmy, czytali*), *-ły* for women, children, animals and things (*byłyśmy, dzieci czytały*).' },
  'PAST:e-a': { o: 12, f: 2, kind: 'past', t: '-eć verbs: miał, chciała — but mieli',
    x: 'Verbs in *-eć* show *a* in the past (*mieć → miał, miała; chcieć → chciał*), except in the virile plural, where the *e* returns: *mieli, chcieli, widzieli*.' },
  'PAST:irr': { o: 13, f: 2, kind: 'past', t: 'Irregular past: szedł, mógł, jadł, wziął',
    x: 'A few common verbs have their own past stem: *iść → szedł / szła / szli*, *móc → mógł / mogła*, *jeść → jadł / jedli*, *nieść → niósł / niosła*, *wziąć → wziął / wzięła*, *zacząć → zaczął / zaczęła*, *pomóc → pomógł*.' },
});

PL.rules('verbs', 'FUT', {
  'FUT:bede': { o: 14, f: 3, kind: 'fut', t: '*będę, będziesz…* — future of *być*',
    x: '*być* has its own future: *będę, będziesz, będzie, będziemy, będziecie, będą*. It also makes the future of every imperfective verb: *będę pracować* (I will be working), *będzie padać* (it will rain).' },
  'FUT:pf': { o: 15, f: 3, kind: 'pres', t: 'Perfective verbs: present form = future',
    x: 'Perfective verbs (*zrobić, kupić, przeczytać*…) have no present tense: their "present" forms already mean the future. *Zrobię to jutro* = I\'ll do it tomorrow. *Kupię chleb* = I\'ll buy bread.' },
});

PL.rules('verbs', 'IMP', {
  'IMP:sg': { o: 16, f: 3, kind: 'imp', t: 'Commands: czytaj! pisz! mów!',
    x: 'Take the "they" form and drop *-ą*: *czytaj-ą → czytaj!*, *pisz-ą → pisz!*, *mówi-ą → mów!*, *robi-ą → rób!* If the leftover ends awkwardly, add *-ij / -yj*: *zamkn-ą → zamknij!*' },
  'IMP:pl': { o: 20, f: 2, kind: 'imp', t: 'Let\'s (-my) and you all (-cie)',
    x: 'Add *-my* for "let\'s" (*chodźmy! zróbmy!*) and *-cie* for several people (*czytajcie! zamknijcie!*).' },
  'IMP:irr': { o: 18, f: 2, kind: 'imp', t: 'Irregular commands: bądź, jedz, jedź, weź',
    x: 'Learn these by heart: *bądź!* (be), *miej!* (have), *jedz!* (eat), *jedź!* (go / drive), *weź!* (take), *daj!* (give), *chodź!* (come), *idź!* (go), *pomóż!* (help), *powiedz!* (say), *usiądź!* (sit down), *śpij!* (sleep).' },
  'IMP:polite': { o: 17, f: 3, kind: 'inf', t: 'Polite requests: *Proszę* + infinitive',
    x: 'Signs, officials and polite speech use *proszę* (please) + infinitive instead of a command: *Proszę usiąść. Proszę czekać. Proszę mówić wolniej.*' },
});

PL.rules('verbs', 'COND', {
  'COND:by': { o: 19, f: 2, kind: 'cond', t: 'Would: chciałbym, mogłabyś, zrobilibyśmy',
    x: 'Take the past-tense form for he / she / they and add *by* + the person ending: *chciał → chciałbym* (I\'d like, man), *chciała → chciałabym* (woman), *mógł → mógłbyś?* (could you?), *chcieli → chcielibyśmy*. In "if" clauses *by* joins *gdy*: *gdybym miał czas…*' },
});

PL.rules('verbs', 'MOT', {
  'MOT:det': { o: 21, f: 3, t: 'Now, one way (iść) vs regularly (chodzić)',
    x: 'Pairs of motion verbs: *iść / chodzić* (on foot), *jechać / jeździć* (by vehicle), *lecieć / latać* (fly), *biec / biegać* (run), *płynąć / pływać* (swim, sail), *nieść / nosić* (carry). The first is one trip in one direction, happening now; the second is habitual, back and forth, or ability: *Idę do szkoły* (I\'m on my way) vs *Chodzę do szkoły* (I attend school).' },
  'MOT:foot': { o: 22, f: 3, t: 'On foot (iść) or by vehicle (jechać)',
    x: '*iść / chodzić* = to go on foot; *jechać / jeździć* = to go by car, bus, train, bike. *Idę do sklepu* (walking), *jadę do pracy* (driving / by bus).' },
});

PL.rules('verbs', 'POL', {
  'POL:pan': { o: 23, f: 3, t: 'Polite "you": *pan / pani / państwo* + 3rd person',
    x: 'Polite "you" is *pan* (to a man), *pani* (to a woman), *państwo* (to a group or a couple), and the verb goes in the **third** person: *Czy pani ma czas?* (Do you have time?), *Skąd pan jest?*, *Co państwo piją?* (plural).' },
});

PL.rules('verbs', 'LEMV', {
  'LEM:verb': { o: 16.5, f: 2, t: 'Find the infinitive',
    x: 'Dictionaries list verbs by the infinitive (*-ć*, a few *-c*). Undo the person ending and any stem change: *piszę → pisać, biorę → brać, jedzą → jeść, mogę → móc*; and the irregular past forms: *szła → iść, wziął → wziąć*.' },
});

/* ══ Sentences ══ */

PL.items('PRES:byc-miec', [
  ['być', '{Jestem} zmęczony.', 'I\'m tired (m.).'],
  ['być', 'Gdzie {jesteś}?', 'Where are you?'],
  ['być', 'Moi rodzice {są} w domu.', 'My parents are at home.'],
  ['być', '{Jesteśmy} z Finlandii.', 'We\'re from Finland.'],
  ['być', 'Czy {jesteście} gotowi?', 'Are you (all) ready?'],
  ['mieć', '{Mam} dwa koty.', 'I have two cats.'],
  ['mieć', 'Ile {masz} lat?', 'How old are you?', { n: 'Literally "how many years do you have?"' }],
  ['mieć', 'Oni {mają} duży dom.', 'They have a big house.'],
  ['mieć', '{Macie} czas w sobotę?', 'Do you (all) have time on Saturday?'],
  ['mieć', 'Moja siostra {ma} trzy lata.', 'My sister is three years old.'],
  ['być', 'To {jest} mój pokój.', 'This is my room.'],
]);

PL.items('PRES:am', [
  ['czytać', 'Codziennie {czytam} gazetę.', 'I read the newspaper every day.'],
  ['mieszkać', 'Gdzie {mieszkasz}?', 'Where do you live?'],
  ['czekać', 'Anna {czeka} na autobus.', 'Anna is waiting for the bus.'],
  ['słuchać', 'Wieczorem {słuchamy} muzyki.', 'In the evening we listen to music.'],
  ['pytać', 'Dlaczego {pytacie}?', 'Why are you (all) asking?'],
  ['znać', 'Moi rodzice {znają} twoich rodziców.', 'My parents know your parents.'],
  ['grać', 'Czy {grasz} na gitarze?', 'Do you play the guitar?'],
  ['kochać', '{Kocham} moją pracę.', 'I love my job.'],
  ['oglądać', 'Dzieci {oglądają} bajkę.', 'The children are watching a cartoon.'],
  ['wracać', 'O której {wracasz} do domu?', 'What time do you get home?'],
  ['zaczynać', 'Lekcja {zaczyna} się o ósmej.', 'The lesson starts at eight.'],
]);

PL.items('PRES:uje', [
  ['pracować', 'Mój brat {pracuje} w banku.', 'My brother works in a bank.'],
  ['kupować', 'Zawsze {kupuję} chleb w tej piekarni.', 'I always buy bread at this bakery.'],
  ['studiować', 'Co {studiujesz}?', 'What are you studying?'],
  ['dziękować', '{Dziękuję} za wszystko.', 'Thank you for everything.', { n: '*Dziękuję* is literally "I thank".' }],
  ['gotować', 'W niedzielę mama {gotuje} rosół.', 'On Sundays mum makes chicken soup.'],
  ['potrzebować', 'Czego {potrzebujecie}?', 'What do you (all) need?'],
  ['podróżować', 'Często {podróżujemy} po Europie.', 'We often travel around Europe.'],
  ['interesować', 'Czym się {interesujesz}?', 'What are you interested in?'],
  ['budować', 'Sąsiedzi {budują} nowy dom.', 'The neighbours are building a new house.'],
  ['pokazywać', 'Przewodnik {pokazuje} nam stare miasto.', 'The guide is showing us the old town.'],
]);

PL.items('PRES:isz', [
  ['mówić', '{Mówisz} po polsku?', 'Do you speak Polish?'],
  ['robić', 'Co {robicie} w weekend?', 'What are you (all) doing at the weekend?'],
  ['lubić', 'Bardzo {lubię} pierogi.', 'I really like pierogi.'],
  ['uczyć', 'Moja mama {uczy} w szkole.', 'My mum teaches at a school.'],
  ['myśleć', 'Co o tym {myślisz}?', 'What do you think about it?'],
  ['słyszeć', 'Nic nie {słyszę}!', 'I can\'t hear anything!'],
  ['widzieć', '{Widzisz} tego psa?', 'Do you see that dog?'],
  ['leżeć', 'Książki {leżą} na stole.', 'The books are lying on the table.'],
  ['tańczyć', 'Ona pięknie {tańczy}.', 'She dances beautifully.'],
  ['dzwonić', 'Kto {dzwoni}?', 'Who\'s calling?'],
  ['mówić', 'Moi dziadkowie {mówią} tylko po polsku.', 'My grandparents only speak Polish.'],
]);

PL.items('PRES:modal', [
  ['chcieć', '{Chcę} iść do kina.', 'I want to go to the cinema.'],
  ['móc', 'Czy {mogę} otworzyć okno?', 'May I open the window?'],
  ['musieć', '{Muszę} już iść.', 'I have to go now.'],
  ['chcieć', 'Co {chcesz} robić w sobotę?', 'What do you want to do on Saturday?'],
  ['móc', 'Niestety nie {możemy} przyjść.', 'Unfortunately we can\'t come.'],
  ['musieć', 'Dzieci {muszą} już iść spać.', 'The children have to go to bed now.'],
  ['woleć', '{Wolę} herbatę niż kawę.', 'I prefer tea to coffee.'],
  ['móc', '{Możesz} mi pomóc?', 'Can you help me?'],
  ['chcieć', 'Oni nie {chcą} czekać.', 'They don\'t want to wait.'],
  ['musieć', 'Czy {musisz} pracować w weekend?', 'Do you have to work at the weekend?'],
]);

PL.items('PRES:esz', [
  ['pisać', 'Teraz {piszę} list.', 'I\'m writing a letter now.'],
  ['brać', 'Zawsze {biorę} parasol.', 'I always take an umbrella.'],
  ['jechać', 'Dokąd {jedziesz}?', 'Where are you going? (by car, bus…)'],
  ['pić', 'Co {pijesz}?', 'What are you drinking?'],
  ['iść', '{Idę} do domu.', 'I\'m going home (on foot).'],
  ['pisać', 'Studenci {piszą} egzamin.', 'The students are writing an exam.'],
  ['brać', 'Ile {bierzesz} za lekcję?', 'How much do you charge for a lesson?', { n: '*brać* (to take) also means to charge money.' }],
  ['jechać', 'Jutro {jadę} do Krakowa.', 'Tomorrow I\'m going to Kraków.'],
  ['iść', 'Dokąd {idziecie}?', 'Where are you (all) going?'],
  ['pić', 'Polacy {piją} dużo herbaty.', 'Poles drink a lot of tea.'],
  ['nieść', 'Co {niesiesz} w tej torbie?', 'What are you carrying in that bag?'],
  ['żyć', 'Jak {żyjesz}?', 'How\'s life?', { n: 'Literally "how do you live?" — a casual greeting.' }],
]);

PL.items('PRES:em', [
  ['rozumieć', 'Nie {rozumiem}.', 'I don\'t understand.'],
  ['umieć', 'Czy {umiesz} pływać?', 'Can you swim?'],
  ['jeść', 'Co {jesz} na śniadanie?', 'What do you eat for breakfast?'],
  ['wiedzieć', 'Nie {wiem}, gdzie on jest.', 'I don\'t know where he is.'],
  ['jeść', 'Polacy {jedzą} dużo chleba.', 'Poles eat a lot of bread.'],
  ['wiedzieć', 'Czy {wiecie}, która jest godzina?', 'Do you (all) know what time it is?'],
  ['rozumieć', 'Dzieci dobrze {rozumieją} po polsku.', 'The children understand Polish well.'],
  ['umieć', 'Mój syn już {umie} czytać.', 'My son can already read.'],
  ['jeść', 'Wieczorem nic nie {jemy}.', 'We don\'t eat anything in the evening.'],
]);

PL.items('PRES:aje', [
  ['dawać', 'Babcia zawsze {daje} nam cukierki.', 'Grandma always gives us sweets.'],
  ['wstawać', 'Codziennie {wstaję} o szóstej.', 'I get up at six every day.'],
  ['dostawać', 'Dzieci {dostają} prezenty pod choinkę.', 'The children get presents under the Christmas tree.'],
  ['wstawać', 'O której {wstajesz}?', 'What time do you get up?'],
  ['sprzedawać', 'Ten sklep {sprzedaje} tylko polskie produkty.', 'This shop sells only Polish products.'],
  ['dawać', '{Dajemy} sobie prezenty na święta.', 'We give each other presents at Christmas.'],
  ['sprzedawać', 'Co {sprzedajecie} na targu?', 'What are you (all) selling at the market?'],
]);

PL.items('PRES:alt', [
  ['chodzić', 'Codziennie {chodzę} na basen.', 'I go to the swimming pool every day.'],
  ['prosić', '{Proszę} o pomoc.', 'Please help me.', { n: 'Literally "I ask for help".' }],
  ['płacić', 'Dziś ja {płacę}.', 'Today I\'m paying.'],
  ['jeździć', 'Do pracy {jeżdżę} rowerem.', 'I cycle to work.'],
  ['nosić', 'Dzieci {noszą} mundurki do szkoły.', 'The children wear uniforms to school.'],
  ['siedzieć', 'Cały dzień {siedzę} przy komputerze.', 'I sit at the computer all day.'],
  ['chodzić', 'Moje dzieci {chodzą} do przedszkola.', 'My children go to kindergarten.'],
  ['wozić', 'Codziennie {wożę} syna do szkoły.', 'I drive my son to school every day.'],
  ['płacić', 'Ile {płacą} za mieszkanie?', 'How much do they pay for the flat?'],
  ['jeździć', 'Latem {jeżdżą} nad morze.', 'In summer they go to the seaside.'],
]);

PL.items('PAST:sg', [
  ['czytać', 'Wczoraj {czytałem} ciekawą książkę.', 'Yesterday I (m.) read an interesting book.'],
  ['pisać', 'Anna {pisała} list do babci.', 'Anna was writing a letter to grandma.'],
  ['być', 'Gdzie {byłeś} wczoraj?', 'Where were you yesterday? (to a man)'],
  ['mieszkać', 'Kiedyś {mieszkałam} w Gdańsku.', 'I (f.) used to live in Gdańsk.'],
  ['robić', 'Co {robiłaś} w weekend?', 'What did you do at the weekend? (to a woman)'],
  ['kupić', 'Marek {kupił} nowy samochód.', 'Marek bought a new car.'],
  ['grać', 'Kto {grał} na pianinie?', 'Who was playing the piano?'],
  ['zrobić', 'Dziecko {zrobiło} piękny rysunek.', 'The child made a beautiful drawing.'],
  ['spać', 'Dobrze {spałeś}?', 'Did you sleep well? (to a man)'],
  ['dzwonić', 'Ktoś do ciebie {dzwonił}.', 'Someone called you.'],
  ['być', 'Wczoraj {byłam} u lekarza.', 'Yesterday I (f.) was at the doctor\'s.'],
]);

PL.items('PAST:pl', [
  ['być', 'Wczoraj {byliśmy} w kinie.', 'Yesterday we (a mixed group) were at the cinema.'],
  ['być', 'Dziewczyny {były} w kinie.', 'The girls were at the cinema.'],
  ['robić', 'Co {robiliście} w Krakowie?', 'What did you (guys) do in Kraków?'],
  ['tańczyć', 'Kobiety {tańczyły} całą noc.', 'The women danced all night.'],
  ['grać', 'Chłopcy {grali} w piłkę.', 'The boys were playing football.'],
  ['czekać', 'Długo {czekałyście}?', 'Did you wait long? (to a group of women)'],
  ['mieszkać', 'Moi rodzice {mieszkali} w Warszawie.', 'My parents lived in Warsaw.'],
  ['kupić', 'Anna i Ewa {kupiły} bilety.', 'Anna and Ewa bought the tickets.'],
  ['śpiewać', 'Studenci {śpiewali} polskie piosenki.', 'The students sang Polish songs.'],
  ['pracować', 'Anna i Marek {pracowali} razem.', 'Anna and Marek worked together.', { n: 'One man in the group is enough for the virile *-li*.' }],
  ['być', 'Ja i moja siostra {byłyśmy} tam razem.', 'My sister and I (both women) were there together.'],
]);

PL.items('PAST:e-a', [
  ['mieć', 'Wczoraj {miałem} dużo pracy.', 'Yesterday I (m.) had a lot of work.'],
  ['mieć', 'Oni {mieli} rację.', 'They were right.', { n: '*mieć rację* = to be right (literally "to have the reason").' }],
  ['chcieć', 'Ona {chciała} iść do kina.', 'She wanted to go to the cinema.'],
  ['chcieć', 'Studenci nie {chcieli} czekać.', 'The students didn\'t want to wait.'],
  ['widzieć', '{Widziałaś} ten film?', 'Have you seen this film? (to a woman)'],
  ['widzieć', 'Nic nie {widzieliśmy}.', 'We (m. / mixed) didn\'t see anything.'],
  ['myśleć', 'O czym {myślałeś}?', 'What were you thinking about? (to a man)'],
  ['wiedzieć', 'Nie {wiedziałam}!', 'I (f.) didn\'t know!'],
  ['rozumieć', 'Nie {rozumieli}, co mówię.', 'They didn\'t understand what I was saying.'],
  ['umieć', 'Kiedyś {umiałem} grać na gitarze.', 'I (m.) used to be able to play the guitar.'],
]);

PL.items('PAST:irr', [
  ['iść', 'Rano {szedłem} do pracy pieszo.', 'In the morning I (m.) walked to work.'],
  ['iść', 'Anna {szła} do domu.', 'Anna was walking home.'],
  ['móc', 'Nie {mogłem} spać.', 'I (m.) couldn\'t sleep.'],
  ['móc', 'Marek nie {mógł} przyjść.', 'Marek couldn\'t come.'],
  ['jeść', 'Co {jadłaś} na obiad?', 'What did you have for lunch? (to a woman)'],
  ['jeść', 'Dzieci {jadły} lody.', 'The children were eating ice cream.'],
  ['wziąć', 'Kto {wziął} moje klucze?', 'Who took my keys?'],
  ['wziąć', 'Ewa {wzięła} parasol.', 'Ewa took an umbrella.'],
  ['nieść', 'Tata {niósł} ciężką walizkę.', 'Dad was carrying a heavy suitcase.'],
  ['iść', 'Studenci {szli} na zajęcia.', 'The students were walking to class.'],
  ['pomóc', 'Sąsiad {pomógł} nam przy przeprowadzce.', 'The neighbour helped us with the move.'],
  ['zacząć', 'Film {zaczął} się o ósmej.', 'The film started at eight.'],
]);

PL.items('FUT:bede', [
  ['być', 'Jutro {będę} w domu.', 'Tomorrow I\'ll be at home.'],
  ['być', 'Gdzie {będziesz} w sobotę?', 'Where will you be on Saturday?'],
  ['być', 'Jutro {będzie} padać.', 'It will rain tomorrow.'],
  ['być', 'Wieczorem {będziemy} oglądać film.', 'In the evening we\'ll watch a film.'],
  ['być', 'Co {będziecie} robić latem?', 'What will you (all) do in the summer?'],
  ['być', 'Dzieci {będą} zadowolone.', 'The children will be pleased.'],
  ['być', 'Od jutra {będę} pracować w Krakowie.', 'From tomorrow I\'ll be working in Kraków.'],
  ['być', 'Czy {będzie} pani na spotkaniu?', 'Will you be at the meeting? (to a woman, formally)'],
]);

PL.items('FUT:pf', [
  ['zrobić', 'Jutro to {zrobię}.', 'I\'ll do it tomorrow.'],
  ['kupić', 'Po pracy {kupię} chleb.', 'After work I\'ll buy bread.'],
  ['przeczytać', 'Kiedy {przeczytasz} tę książkę?', 'When will you finish reading this book?'],
  ['zadzwonić', '{Zadzwonię} wieczorem.', 'I\'ll call in the evening.'],
  ['napisać', 'Jutro {napiszemy} test.', 'Tomorrow we\'ll write a test.'],
  ['zobaczyć', 'Jeszcze {zobaczymy}!', 'We\'ll see about that!'],
  ['wrócić', 'Kiedy {wrócisz}?', 'When will you be back?'],
  ['pomóc', 'Na pewno ci {pomogę}.', 'I\'ll definitely help you.'],
  ['dać', '{Dam} ci znać.', 'I\'ll let you know.', { n: 'Literally "I\'ll give you a sign".' }],
  ['wziąć', '{Weźmiesz} mnie ze sobą?', 'Will you take me with you?'],
  ['zjeść', 'Co {zjecie} na obiad?', 'What will you (all) have for lunch?'],
  ['zacząć', 'Kiedy {zaczniemy}?', 'When shall we start?'],
]);

PL.items('IMP:sg', [
  ['czytać', '{Czytaj} głośno!', 'Read aloud!'],
  ['pisać', '{Pisz} wyraźnie, proszę.', 'Write clearly, please.'],
  ['mówić', '{Mów} wolniej!', 'Speak more slowly!'],
  ['czekać', '{Czekaj} na mnie!', 'Wait for me!'],
  ['słuchać', '{Słuchaj} uważnie.', 'Listen carefully.'],
  ['pić', '{Pij} dużo wody.', 'Drink lots of water.'],
  ['robić', 'Nie {rób} tego!', 'Don\'t do that!'],
  ['zamknąć', '{Zamknij} drzwi, proszę.', 'Close the door, please.'],
  ['zobaczyć', '{Zobacz}, jak tu pięknie!', 'Look how beautiful it is here!'],
  ['dzwonić', 'Nie {dzwoń} tak późno!', 'Don\'t call so late!'],
  ['kupić', '{Kup} mleko, proszę.', 'Buy some milk, please.'],
]);

PL.items('IMP:pl', [
  ['chodzić', '{Chodźmy} do kina!', 'Let\'s go to the cinema!'],
  ['czytać', '{Czytajcie} tekst na stronie dziesiątej.', 'Read the text on page ten (you all).'],
  ['zamknąć', '{Zamknijcie} okna!', 'Close the windows (you all)!'],
  ['zrobić', '{Zróbmy} sobie przerwę.', 'Let\'s take a break.'],
  ['słuchać', '{Słuchajcie}, mam pomysł!', 'Listen, everyone, I have an idea!'],
  ['mówić', 'Nie {mówcie} nikomu!', 'Don\'t tell anyone (you all)!'],
  ['zacząć', '{Zacznijmy} od początku.', 'Let\'s start from the beginning.'],
  ['pisać', '{Piszcie} do nas!', 'Write to us (you all)!'],
]);

PL.items('IMP:irr', [
  ['być', '{Bądź} cicho!', 'Be quiet!'],
  ['jeść', '{Jedz} powoli!', 'Eat slowly!'],
  ['jechać', '{Jedź} ostrożnie!', 'Drive carefully!'],
  ['wziąć', '{Weź} parasol!', 'Take an umbrella!'],
  ['dać', '{Daj} mi chwilę.', 'Give me a moment.'],
  ['chodzić', '{Chodź} tutaj!', 'Come here!'],
  ['pomóc', '{Pomóż} mi, proszę!', 'Help me, please!'],
  ['mieć', '{Miej} litość!', 'Have mercy!'],
  ['powiedzieć', '{Powiedz} prawdę!', 'Tell the truth!'],
  ['usiąść', '{Usiądź}, proszę.', 'Sit down, please.'],
  ['iść', '{Idź} już spać!', 'Go to bed now!'],
  ['spać', '{Śpij} dobrze!', 'Sleep well!'],
]);

PL.items('IMP:polite', [
  ['usiąść', 'Proszę {usiąść}.', 'Please sit down.'],
  ['czekać', 'Proszę {czekać}.', 'Please wait.'],
  ['zamknąć', 'Proszę {zamknąć} drzwi.', 'Please close the door.'],
  ['powiedzieć', 'Proszę mi {powiedzieć}, gdzie jest dworzec.', 'Please tell me where the station is.'],
  ['mówić', 'Proszę {mówić} wolniej.', 'Please speak more slowly.'],
  ['przeczytać', 'Proszę {przeczytać} ten tekst.', 'Please read this text.'],
  ['pokazać', 'Proszę {pokazać} paszport.', 'Please show your passport.'],
  ['zapłacić', 'Proszę {zapłacić} przy kasie.', 'Please pay at the till.'],
]);

PL.items('COND:by', [
  ['chcieć', '{Chciałbym} kawę, proszę.', 'I (m.) would like a coffee, please.'],
  ['chcieć', '{Chciałabym} zapłacić.', 'I (f.) would like to pay.'],
  ['móc', 'Czy {mógłbyś} mi pomóc?', 'Could you help me? (to a man)'],
  ['móc', 'Czy {mogłabyś} zamknąć okno?', 'Could you close the window? (to a woman)'],
  ['pojechać', 'Gdybym miał czas, {pojechałbym} do Polski.', 'If I (m.) had time, I would go to Poland.'],
  ['być', 'To {byłoby} wspaniałe!', 'That would be wonderful!'],
  ['woleć', '{Wolałabym} zostać w domu.', 'I (f.) would rather stay at home.'],
  ['chcieć', '{Chcielibyśmy} zamówić.', 'We would like to order.'],
  ['pomóc', 'Czy {pomógłbyś} mi z tą walizką?', 'Would you help me with this suitcase? (to a man)'],
  ['mieć', 'Czy {mieliby} państwo chwilę?', 'Would you (ladies and gentlemen) have a moment?'],
]);

PL.items('MOT:det', [
  ['iść / chodzić', 'Teraz {idę} do sklepu.', 'I\'m going to the shop now.'],
  ['iść / chodzić', 'Codziennie {chodzę} na spacer.', 'I go for a walk every day.'],
  ['jechać / jeździć', 'Co roku {jeździmy} do Włoch.', 'Every year we go to Italy.'],
  ['jechać / jeździć', 'Właśnie {jadę} do pracy.', 'I\'m on my way to work right now (by car).'],
  ['lecieć / latać', 'Jutro {lecę} do Helsinek.', 'Tomorrow I\'m flying to Helsinki.'],
  ['lecieć / latać', 'Często {latasz} samolotem?', 'Do you fly often?'],
  ['nieść / nosić', 'Ona zawsze {nosi} okulary.', 'She always wears glasses.', { n: '*nosić* (carry around) also means "to wear" — clothes you have on habitually.' }],
  ['nieść / nosić', 'Co {niesiesz}? Pomóc ci?', 'What are you carrying? Shall I help you?'],
  ['iść / chodzić', 'Moja córka już {chodzi} do szkoły.', 'My daughter already goes to school.'],
  ['biec / biegać', 'Gdzie tak {biegniesz}?', 'Where are you rushing off to?'],
  ['biec / biegać', 'Rano {biegam} w parku.', 'In the mornings I go running in the park.'],
  ['płynąć / pływać', 'Statek {płynie} do Gdańska.', 'The ship is sailing to Gdańsk.'],
  ['płynąć / pływać', 'Dobrze {pływasz}!', 'You swim well!'],
]);

PL.items('MOT:foot', [
  ['iść / jechać', 'Do Gdańska {jedziemy} pociągiem.', 'We\'re going to Gdańsk by train.'],
  ['iść / jechać', 'Sklep jest blisko, {idę} pieszo.', 'The shop is close, I\'m walking.'],
  ['iść / jechać', 'Na lotnisko {jadę} taksówką.', 'I\'m going to the airport by taxi.'],
  ['iść / jechać', 'Dzieci {idą} do szkoły przez park.', 'The children are walking to school through the park.'],
  ['chodzić / jeździć', 'Do pracy {jeżdżę} tramwajem.', 'I go to work by tram.'],
  ['chodzić / jeździć', 'Na zakupy {chodzę} piechotą.', 'I go shopping on foot.'],
  ['iść / jechać', 'Jutro {jedziemy} na wakacje do Hiszpanii.', 'Tomorrow we\'re going on holiday to Spain.'],
  ['iść / jechać', '{Idę} na spacer z psem.', 'I\'m going for a walk with the dog.'],
]);

PL.items('POL:pan', [
  ['mieć', 'Czy pani {ma} chwilę?', 'Do you have a moment? (to a woman, formally)'],
  ['wiedzieć', 'Czy pan {wie}, gdzie jest apteka?', 'Do you know where the pharmacy is? (to a man, formally)'],
  ['mówić', 'Czy pani {mówi} po angielsku?', 'Do you speak English? (to a woman, formally)'],
  ['pić', 'Co państwo {piją}?', 'What are you drinking? (to a group, formally)'],
  ['być', 'Skąd pan {jest}?', 'Where are you from? (to a man, formally)'],
  ['móc', 'Czy {może} mi pan pomóc?', 'Could you help me? (to a man, formally)'],
  ['mieszkać', 'Gdzie pani {mieszka}?', 'Where do you live? (to a woman, formally)'],
  ['być', 'Czy państwo {są} gotowi?', 'Are you ready? (to a group, formally)'],
  ['rozumieć', 'Czy pani mnie {rozumie}?', 'Do you understand me? (to a woman, formally)'],
  ['chcieć', 'Co pan {chce} zamówić?', 'What would you like to order? (to a man, formally)'],
]);
