/* ═══════════════════════════════════════════════════════════════
   data/lex-verbs.js — Verbs with complete conjugations + patterns

   pres  : 6 forms ja ty on my wy oni (for perfective verbs = future)
   past  : 3rd person  m f n virile non-virile  (others are generated:
           czytał → czytałem/czytałeś, czytała → czytałam …, czytali →
           czytaliśmy …; the conditional is generated the same way)
   past1 : masculine stem for "I / you" if it differs (mógł → mogłem)
   imp   : imperative  ty my wy
   vn / pa / pp / ap : verbal noun, -ący, passive participle, -ąc
   from  : [prefix, base] for prefixed verbs — forms are built by
           adding the prefix to every form of the base verb
   ═══════════════════════════════════════════════════════════════ */

/* ── Patterns ── */

PL.pattern('v-am', {
  t: 'Present tense: -am, -asz, -ają', kind: 'verb', tense: 'pres',
  rows: ['-am', '-asz', '-a', '-amy', '-acie', '-ają'],
  models: ['czytać', 'mieszkać', 'pytać', 'mieć'],
  note: 'Most verbs in *-ać* keep the *a*: czyt-am, czyt-asz … czyt-ają. *mieć* (to have) also goes this way: mam, masz, mają.',
});
PL.pattern('v-em', {
  t: 'Present tense: -em, -esz', kind: 'verb', tense: 'pres',
  rows: ['-em', '-esz', '-e', '-emy', '-ecie', '-eją / -dzą'],
  models: ['umieć', 'rozumieć', 'jeść', 'wiedzieć'],
  note: '*umieć, rozumieć*: -eją in "they". The two old irregulars *jeść* and *wiedzieć* (and *powiedzieć*) also have -em but end in *-dzą*: jedzą, wiedzą.',
});
PL.pattern('v-uje', {
  t: 'Present tense: -ować → -uję', kind: 'verb', tense: 'pres',
  rows: ['-uję', '-ujesz', '-uje', '-ujemy', '-ujecie', '-ują'],
  models: ['pracować', 'kupować', 'dziękować', 'pokazywać'],
  note: 'Practically every verb in *-ować* swaps *-owa-* for *-uj-*: prac-ować → prac-uję (exception: *chować → chowam*). Many in *-ywać / -iwać* do the same (*pokazywać → pokazuję*), but not all: *odpoczywać → odpoczywam, nazywać się → nazywam się*. Thousands of verbs, including new loans: *mailować → mailuję*.',
});
PL.pattern('v-aje', {
  t: 'Present tense: -awać → -aję', kind: 'verb', tense: 'pres',
  rows: ['-aję', '-ajesz', '-aje', '-ajemy', '-ajecie', '-ają'],
  models: ['dawać', 'wstawać', 'sprzedawać'],
  note: 'Verbs in *-awać* drop *-wa-* in the present: da-wa-ć → da-ję, wsta-wa-ć → wsta-ję (the imperative keeps it: dawaj!, wstawaj!).',
});
PL.pattern('v-isz', {
  t: 'Present tense: -ę, -isz', kind: 'verb', tense: 'pres',
  rows: ['-ę', '-isz', '-i', '-imy', '-icie', '-ą'],
  models: ['mówić', 'robić', 'chodzić', 'widzieć'],
  note: 'Verbs in *-ić* and many in *-eć*. In "I" and "they", s/z/c/dz/ś/ź/ć/dź before the ending turn hard: prosić → proszę, chodzić → chodzę, płacić → płacę, jeździć → jeżdżę.',
});
PL.pattern('v-ysz', {
  t: 'Present tense: -ę, -ysz', kind: 'verb', tense: 'pres',
  rows: ['-ę', '-ysz', '-y', '-ymy', '-ycie', '-ą'],
  models: ['uczyć', 'słyszeć', 'leżeć', 'tańczyć'],
  note: 'The same as -isz, written with *y* after cz, sz, ż, rz: uczysz, słyszysz, leżysz.',
});
PL.pattern('v-esz', {
  t: 'Present tense: -ę, -esz, -ą', kind: 'verb', tense: 'pres',
  rows: ['-ę', '-esz', '-e', '-emy', '-ecie', '-ą'],
  models: ['pisać', 'pić', 'jechać', 'brać'],
  note: 'The stem often changes: it is one shape in "I / they" and another in the other persons: pisać → piszę / piszesz (s → sz everywhere), jechać → jadę / jedziesz, brać → biorę / bierzesz, móc → mogę / możesz, iść → idę / idziesz.',
});
PL.pattern('v-byc', {
  t: 'być — to be (irregular)', kind: 'verb', tense: 'pres',
  rows: ['jestem', 'jesteś', 'jest', 'jesteśmy', 'jesteście', 'są'],
  models: ['mieć'],
  note: 'Unique, so it simply has to be learned. Future: będę, będziesz, będzie, będziemy, będziecie, będą. Past: był, była, było, byli, były.',
});
PL.pattern('v-past', {
  t: 'Past tense: -ł + person ending', kind: 'verb', tense: 'past',
  models: ['czytać', 'mieć', 'pisać'],
  note: 'Take the infinitive, replace *-ć* with *-ł*, then add the endings. Most verbs in *-eć* show *a* everywhere except the virile plural: *miał, miała* but *mieli*. A few have their own stem: iść → szedł/szła/szli, móc → mógł/mogła, jeść → jadł/jedli, nieść → niósł/niosła/nieśli, wziąć → wziął/wzięła.',
});
PL.pattern('v-cond', {
  t: 'Conditional: -ł + by + person ending', kind: 'verb', tense: 'cond',
  models: ['chcieć', 'czytać', 'mieć'],
  note: 'Take the past-tense "he/she/they" form and add *by* + the person ending: chciał → chciałbym, chciała → chciałabym, chcieli → chcielibyśmy. *Chciałbym / chciałabym* = I would like.',
});
PL.pattern('v-imp', {
  t: 'Imperative', kind: 'verb', tense: 'imp',
  rows: ['he / she form − last vowel', '+ -my (let’s)', '+ -cie (you all)'],
  models: ['czytać', 'pisać', 'chodzić', 'robić'],
  note: 'Start from the "he / she" form and drop the last vowel; a soft consonant stays soft: pisze → pisz!, mówi → mów!, robi → rób! (o → ó), chodzi → chodź!, idzie → idź!, bierze → bierz!, pomoże → pomóż! After *-a* add *-j*: czyta → czytaj! If what remains is hard to pronounce, add *-ij / -yj*: zamknie → zamknij!, śpi → śpij! Learn separately: bądź, miej, jedz, weź, powiedz, and -awać → -awaj (dawaj!, wstawaj!).',
});
PL.pattern('v-fut', {
  t: 'Future of być + compound future', kind: 'verb', tense: 'fut',
  rows: ['będę', 'będziesz', 'będzie', 'będziemy', 'będziecie', 'będą'],
  models: ['być'],
  note: 'Imperfective verbs form the future with *będę* + infinitive (*będę czytać*) or + the past-tense form (*będę czytał / czytała*). Perfective verbs need no helper: their present-tense forms already mean the future (*przeczytam* = I will read).',
});

/* ── -am, -asz ── */

PL.verb('czytać', { m: 'to read', asp: 'impf', pair: 'przeczytać', cls: 'v-am',
  pres: 'czytam czytasz czyta czytamy czytacie czytają', past: 'czytał czytała czytało czytali czytały',
  imp: 'czytaj czytajmy czytajcie', vn: 'czytanie', pa: 'czytający', pp: 'czytany', ap: 'czytając' });
PL.verb('mieszkać', { m: 'to live (somewhere)', asp: 'impf', cls: 'v-am',
  pres: 'mieszkam mieszkasz mieszka mieszkamy mieszkacie mieszkają', past: 'mieszkał mieszkała mieszkało mieszkali mieszkały',
  imp: 'mieszkaj mieszkajmy mieszkajcie', vn: 'mieszkanie', pa: 'mieszkający', ap: 'mieszkając' });
PL.verb('pytać', { m: 'to ask', asp: 'impf', pair: 'zapytać', cls: 'v-am',
  pres: 'pytam pytasz pyta pytamy pytacie pytają', past: 'pytał pytała pytało pytali pytały',
  imp: 'pytaj pytajmy pytajcie', vn: 'pytanie' });
PL.verb('czekać', { m: 'to wait', asp: 'impf', pair: 'poczekać', cls: 'v-am',
  pres: 'czekam czekasz czeka czekamy czekacie czekają', past: 'czekał czekała czekało czekali czekały',
  imp: 'czekaj czekajmy czekajcie', vn: 'czekanie', ap: 'czekając' });
PL.verb('słuchać', { m: 'to listen', asp: 'impf', pair: 'posłuchać', cls: 'v-am',
  pres: 'słucham słuchasz słucha słuchamy słuchacie słuchają', past: 'słuchał słuchała słuchało słuchali słuchały',
  imp: 'słuchaj słuchajmy słuchajcie', vn: 'słuchanie', pa: 'słuchający', ap: 'słuchając' });
PL.verb('znać', { m: 'to know (someone / something)', asp: 'impf', cls: 'v-am',
  pres: 'znam znasz zna znamy znacie znają', past: 'znał znała znało znali znały', pa: 'znający' });
PL.verb('mieć', { m: 'to have', asp: 'impf', cls: 'v-am',
  pres: 'mam masz ma mamy macie mają', past: 'miał miała miało mieli miały', imp: 'miej miejmy miejcie',
  note: 'Infinitive in *-eć*, but conjugated like *-am* verbs. Past: e → a except *mieli*.' });
PL.verb('grać', { m: 'to play', asp: 'impf', pair: 'zagrać', cls: 'v-am',
  pres: 'gram grasz gra gramy gracie grają', past: 'grał grała grało grali grały', imp: 'graj grajmy grajcie', vn: 'granie' });
PL.verb('kochać', { m: 'to love', asp: 'impf', pair: 'pokochać', cls: 'v-am',
  pres: 'kocham kochasz kocha kochamy kochacie kochają', past: 'kochał kochała kochało kochali kochały', imp: 'kochaj kochajmy kochajcie' });
PL.verb('wracać', { m: 'to come back, return', asp: 'impf', pair: 'wrócić', cls: 'v-am',
  pres: 'wracam wracasz wraca wracamy wracacie wracają', past: 'wracał wracała wracało wracali wracały', imp: 'wracaj wracajmy wracajcie' });
PL.verb('latać', { m: 'to fly (around, regularly)', asp: 'impf', cls: 'v-am',
  pres: 'latam latasz lata latamy latacie latają', past: 'latał latała latało latali latały', imp: 'lataj latajmy latajcie', pa: 'latający' });
PL.verb('biegać', { m: 'to run (around, regularly)', asp: 'impf', cls: 'v-am',
  pres: 'biegam biegasz biega biegamy biegacie biegają', past: 'biegał biegała biegało biegali biegały', imp: 'biegaj biegajmy biegajcie' });
PL.verb('pływać', { m: 'to swim (generally, regularly)', asp: 'impf', cls: 'v-am',
  pres: 'pływam pływasz pływa pływamy pływacie pływają', past: 'pływał pływała pływało pływali pływały', imp: 'pływaj pływajmy pływajcie', vn: 'pływanie' });
PL.verb('śpiewać', { m: 'to sing', asp: 'impf', pair: 'zaśpiewać', cls: 'v-am',
  pres: 'śpiewam śpiewasz śpiewa śpiewamy śpiewacie śpiewają', past: 'śpiewał śpiewała śpiewało śpiewali śpiewały',
  imp: 'śpiewaj śpiewajmy śpiewajcie', pa: 'śpiewający', ap: 'śpiewając' });
PL.verb('oglądać', { m: 'to watch', asp: 'impf', pair: 'obejrzeć', cls: 'v-am',
  pres: 'oglądam oglądasz ogląda oglądamy oglądacie oglądają', past: 'oglądał oglądała oglądało oglądali oglądały',
  imp: 'oglądaj oglądajmy oglądajcie', ap: 'oglądając' });
PL.verb('odpoczywać', { m: 'to rest', asp: 'impf', pair: 'odpocząć', cls: 'v-am',
  pres: 'odpoczywam odpoczywasz odpoczywa odpoczywamy odpoczywacie odpoczywają', past: 'odpoczywał odpoczywała odpoczywało odpoczywali odpoczywały',
  imp: 'odpoczywaj odpoczywajmy odpoczywajcie' });
PL.verb('zamykać', { m: 'to close (impf.)', asp: 'impf', pair: 'zamknąć', cls: 'v-am',
  pres: 'zamykam zamykasz zamyka zamykamy zamykacie zamykają', past: 'zamykał zamykała zamykało zamykali zamykały', imp: 'zamykaj zamykajmy zamykajcie' });
PL.verb('otwierać', { m: 'to open (impf.)', asp: 'impf', pair: 'otworzyć', cls: 'v-am',
  pres: 'otwieram otwierasz otwiera otwieramy otwieracie otwierają', past: 'otwierał otwierała otwierało otwierali otwierały', imp: 'otwieraj otwierajmy otwierajcie' });
PL.verb('zaczynać', { m: 'to begin (impf.)', asp: 'impf', pair: 'zacząć', cls: 'v-am',
  pres: 'zaczynam zaczynasz zaczyna zaczynamy zaczynacie zaczynają', past: 'zaczynał zaczynała zaczynało zaczynali zaczynały', imp: 'zaczynaj zaczynajmy zaczynajcie' });
PL.verb('pomagać', { m: 'to help (impf.)', asp: 'impf', pair: 'pomóc', cls: 'v-am',
  pres: 'pomagam pomagasz pomaga pomagamy pomagacie pomagają', past: 'pomagał pomagała pomagało pomagali pomagały', imp: 'pomagaj pomagajmy pomagajcie' });
PL.verb('dać', { m: 'to give (pf.)', asp: 'pf', pair: 'dawać', cls: 'v-am',
  pres: 'dam dasz da damy dacie dadzą', past: 'dał dała dało dali dały', imp: 'daj dajmy dajcie',
  note: 'Like the -am verbs, but "they" is irregular: *dadzą*.' });
PL.verb('spotkać', { m: 'to meet (pf.)', asp: 'pf', pair: 'spotykać', cls: 'v-am',
  pres: 'spotkam spotkasz spotka spotkamy spotkacie spotkają', past: 'spotkał spotkała spotkało spotkali spotkały', imp: 'spotkaj spotkajmy spotkajcie',
  vn: 'spotkanie', pp: 'spotkany' });

/* ── -em, -esz ── */

PL.verb('umieć', { m: 'to know how to, can', asp: 'impf', cls: 'v-em',
  pres: 'umiem umiesz umie umiemy umiecie umieją', past: 'umiał umiała umiało umieli umiały' });
PL.verb('rozumieć', { m: 'to understand', asp: 'impf', pair: 'zrozumieć', cls: 'v-em',
  pres: 'rozumiem rozumiesz rozumie rozumiemy rozumiecie rozumieją', past: 'rozumiał rozumiała rozumiało rozumieli rozumiały' });
PL.verb('jeść', { m: 'to eat', asp: 'impf', pair: 'zjeść', cls: 'v-em',
  pres: 'jem jesz je jemy jecie jedzą', past: 'jadł jadła jadło jedli jadły', imp: 'jedz jedzmy jedzcie',
  vn: 'jedzenie', pa: 'jedzący', ap: 'jedząc',
  note: 'Irregular: *jem … jedzą*; past *jadł, jadła* but *jedli*. Imperative *jedz!* (eat!) — not to be confused with *jedź!* (go / drive!).' });
PL.verb('wiedzieć', { m: 'to know (a fact)', asp: 'impf', cls: 'v-em',
  pres: 'wiem wiesz wie wiemy wiecie wiedzą', past: 'wiedział wiedziała wiedziało wiedzieli wiedziały',
  note: 'Irregular: *wiem … wiedzą*. Compare *znać* (to know a person or place).' });
PL.verb('powiedzieć', { m: 'to say, tell (pf.)', asp: 'pf', pair: 'mówić', cls: 'v-em',
  pres: 'powiem powiesz powie powiemy powiecie powiedzą', past: 'powiedział powiedziała powiedziało powiedzieli powiedziały',
  imp: 'powiedz powiedzmy powiedzcie',
  note: 'Built on *wiedzieć* (to know): to say = "to make known". It conjugates like wiedzieć: powiem … powiedzą.' });

/* ── -ować → -uję ── */

PL.verb('pracować', { m: 'to work', asp: 'impf', cls: 'v-uje',
  pres: 'pracuję pracujesz pracuje pracujemy pracujecie pracują', past: 'pracował pracowała pracowało pracowali pracowały',
  imp: 'pracuj pracujmy pracujcie', pa: 'pracujący', ap: 'pracując' });
PL.verb('kupować', { m: 'to buy (impf.)', asp: 'impf', pair: 'kupić', cls: 'v-uje',
  pres: 'kupuję kupujesz kupuje kupujemy kupujecie kupują', past: 'kupował kupowała kupowało kupowali kupowały',
  imp: 'kupuj kupujmy kupujcie', pa: 'kupujący' });
PL.verb('studiować', { m: 'to study (at university)', asp: 'impf', cls: 'v-uje',
  pres: 'studiuję studiujesz studiuje studiujemy studiujecie studiują', past: 'studiował studiowała studiowało studiowali studiowały',
  imp: 'studiuj studiujmy studiujcie' });
PL.verb('dziękować', { m: 'to thank', asp: 'impf', pair: 'podziękować', cls: 'v-uje',
  pres: 'dziękuję dziękujesz dziękuje dziękujemy dziękujecie dziękują', past: 'dziękował dziękowała dziękowało dziękowali dziękowały',
  imp: 'dziękuj dziękujmy dziękujcie' });
PL.verb('gotować', { m: 'to cook', asp: 'impf', pair: 'ugotować', cls: 'v-uje',
  pres: 'gotuję gotujesz gotuje gotujemy gotujecie gotują', past: 'gotował gotowała gotowało gotowali gotowały',
  imp: 'gotuj gotujmy gotujcie', vn: 'gotowanie', pp: 'gotowany',
  note: 'From *gotowy* (ready): to cook = "to make ready".' });
PL.verb('budować', { m: 'to build', asp: 'impf', pair: 'zbudować', cls: 'v-uje',
  pres: 'buduję budujesz buduje budujemy budujecie budują', past: 'budował budowała budowało budowali budowały',
  imp: 'buduj budujmy budujcie', pp: 'budowany' });
PL.verb('podróżować', { m: 'to travel', asp: 'impf', cls: 'v-uje',
  pres: 'podróżuję podróżujesz podróżuje podróżujemy podróżujecie podróżują', past: 'podróżował podróżowała podróżowało podróżowali podróżowały',
  imp: 'podróżuj podróżujmy podróżujcie' });
PL.verb('potrzebować', { m: 'to need', asp: 'impf', cls: 'v-uje',
  pres: 'potrzebuję potrzebujesz potrzebuje potrzebujemy potrzebujecie potrzebują', past: 'potrzebował potrzebowała potrzebowało potrzebowali potrzebowały' });
PL.verb('interesować', { m: 'to interest (się: to be interested in)', asp: 'impf', cls: 'v-uje',
  pres: 'interesuję interesujesz interesuje interesujemy interesujecie interesują', past: 'interesował interesowała interesowało interesowali interesowały',
  imp: 'interesuj interesujmy interesujcie' });
PL.verb('denerwować', { m: 'to annoy (się: to get nervous / annoyed)', asp: 'impf', cls: 'v-uje',
  pres: 'denerwuję denerwujesz denerwuje denerwujemy denerwujecie denerwują', past: 'denerwował denerwowała denerwowało denerwowali denerwowały',
  imp: 'denerwuj denerwujmy denerwujcie' });
PL.verb('rysować', { m: 'to draw', asp: 'impf', cls: 'v-uje',
  pres: 'rysuję rysujesz rysuje rysujemy rysujecie rysują', past: 'rysował rysowała rysowało rysowali rysowały', imp: 'rysuj rysujmy rysujcie' });
PL.verb('pokazywać', { m: 'to show (impf.)', asp: 'impf', pair: 'pokazać', cls: 'v-uje',
  pres: 'pokazuję pokazujesz pokazuje pokazujemy pokazujecie pokazują', past: 'pokazywał pokazywała pokazywało pokazywali pokazywały',
  imp: 'pokazuj pokazujmy pokazujcie',
  note: '-ywać → -uję, like the -ować verbs: pokaz-ywać → pokaz-uję.' });

/* ── -awać → -aję ── */

PL.verb('dawać', { m: 'to give (impf.)', asp: 'impf', pair: 'dać', cls: 'v-aje',
  pres: 'daję dajesz daje dajemy dajecie dają', past: 'dawał dawała dawało dawali dawały', imp: 'dawaj dawajmy dawajcie' });
PL.verb('wstawać', { m: 'to get up (impf.)', asp: 'impf', pair: 'wstać', cls: 'v-aje',
  pres: 'wstaję wstajesz wstaje wstajemy wstajecie wstają', past: 'wstawał wstawała wstawało wstawali wstawały', imp: 'wstawaj wstawajmy wstawajcie' });
PL.verb('sprzedawać', { m: 'to sell (impf.)', asp: 'impf', pair: 'sprzedać', cls: 'v-aje',
  pres: 'sprzedaję sprzedajesz sprzedaje sprzedajemy sprzedajecie sprzedają', past: 'sprzedawał sprzedawała sprzedawało sprzedawali sprzedawały',
  imp: 'sprzedawaj sprzedawajmy sprzedawajcie' });
PL.verb('dostawać', { m: 'to get, receive (impf.)', asp: 'impf', pair: 'dostać', cls: 'v-aje',
  pres: 'dostaję dostajesz dostaje dostajemy dostajecie dostają', past: 'dostawał dostawała dostawało dostawali dostawały' });

/* ── -ę, -isz / -ysz ── */

PL.verb('mówić', { m: 'to speak, say', asp: 'impf', pair: 'powiedzieć', cls: 'v-isz',
  pres: 'mówię mówisz mówi mówimy mówicie mówią', past: 'mówił mówiła mówiło mówili mówiły',
  imp: 'mów mówmy mówcie', pa: 'mówiący', ap: 'mówiąc' });
PL.verb('robić', { m: 'to do, make', asp: 'impf', pair: 'zrobić', cls: 'v-isz',
  pres: 'robię robisz robi robimy robicie robią', past: 'robił robiła robiło robili robiły',
  imp: 'rób róbmy róbcie', ap: 'robiąc' });
PL.verb('lubić', { m: 'to like', asp: 'impf', pair: 'polubić', cls: 'v-isz',
  pres: 'lubię lubisz lubi lubimy lubicie lubią', past: 'lubił lubiła lubiło lubili lubiły' });
PL.verb('myśleć', { m: 'to think', asp: 'impf', pair: 'pomyśleć', cls: 'v-isz',
  pres: 'myślę myślisz myśli myślimy myślicie myślą', past: 'myślał myślała myślało myśleli myślały',
  imp: 'myśl myślmy myślcie' });
PL.verb('widzieć', { m: 'to see', asp: 'impf', pair: 'zobaczyć', cls: 'v-isz',
  pres: 'widzę widzisz widzi widzimy widzicie widzą', past: 'widział widziała widziało widzieli widziały' });
PL.verb('słyszeć', { m: 'to hear', asp: 'impf', pair: 'usłyszeć', cls: 'v-ysz',
  pres: 'słyszę słyszysz słyszy słyszymy słyszycie słyszą', past: 'słyszał słyszała słyszało słyszeli słyszały' });
PL.verb('uczyć', { m: 'to teach (się: to learn)', asp: 'impf', pair: 'nauczyć', cls: 'v-ysz',
  pres: 'uczę uczysz uczy uczymy uczycie uczą', past: 'uczył uczyła uczyło uczyli uczyły', imp: 'ucz uczmy uczcie' });
PL.verb('tańczyć', { m: 'to dance', asp: 'impf', pair: 'zatańczyć', cls: 'v-ysz',
  pres: 'tańczę tańczysz tańczy tańczymy tańczycie tańczą', past: 'tańczył tańczyła tańczyło tańczyli tańczyły', imp: 'tańcz tańczmy tańczcie' });
PL.verb('leżeć', { m: 'to lie (be lying)', asp: 'impf', cls: 'v-ysz',
  pres: 'leżę leżysz leży leżymy leżycie leżą', past: 'leżał leżała leżało leżeli leżały', imp: 'leż leżmy leżcie' });
PL.verb('chodzić', { m: 'to go on foot (regularly, back and forth); to walk', asp: 'impf', cls: 'v-isz',
  pres: 'chodzę chodzisz chodzi chodzimy chodzicie chodzą', past: 'chodził chodziła chodziło chodzili chodziły',
  imp: 'chodź chodźmy chodźcie', pa: 'chodzący',
  note: 'Soft *dzi* hardens to *dz* in "I" and "they": chodzę, chodzą (but chodzisz, chodzi). Imperative *chodź!* = come (here)!' });
PL.verb('jeździć', { m: 'to go by vehicle (regularly); to ride, drive', asp: 'impf', cls: 'v-isz',
  pres: 'jeżdżę jeździsz jeździ jeździmy jeździcie jeżdżą', past: 'jeździł jeździła jeździło jeździli jeździły',
  imp: 'jeźdź jeźdźmy jeźdźcie', note: 'źdź → żdż in "I" and "they": *jeżdżę, jeżdżą*.' });
PL.verb('płacić', { m: 'to pay', asp: 'impf', pair: 'zapłacić', cls: 'v-isz',
  pres: 'płacę płacisz płaci płacimy płacicie płacą', past: 'płacił płaciła płaciło płacili płaciły', imp: 'płać płaćmy płaćcie' });
PL.verb('prosić', { m: 'to ask (for), request', asp: 'impf', pair: 'poprosić', cls: 'v-isz',
  pres: 'proszę prosisz prosi prosimy prosicie proszą', past: 'prosił prosiła prosiło prosili prosiły', imp: 'proś prośmy proście',
  note: '*Proszę* (please) is simply "I ask".' });
PL.verb('nosić', { m: 'to carry (around, regularly); to wear', asp: 'impf', cls: 'v-isz',
  pres: 'noszę nosisz nosi nosimy nosicie noszą', past: 'nosił nosiła nosiło nosili nosiły', imp: 'noś nośmy noście' });
PL.verb('wozić', { m: 'to transport, drive someone (regularly)', asp: 'impf', cls: 'v-isz',
  pres: 'wożę wozisz wozi wozimy wozicie wożą', past: 'woził woziła woziło wozili woziły', imp: 'woź woźmy woźcie' });
PL.verb('siedzieć', { m: 'to sit, be sitting', asp: 'impf', cls: 'v-isz',
  pres: 'siedzę siedzisz siedzi siedzimy siedzicie siedzą', past: 'siedział siedziała siedziało siedzieli siedziały', imp: 'siedź siedźmy siedźcie' });
PL.verb('stać', { m: 'to stand', asp: 'impf', cls: 'v-isz',
  pres: 'stoję stoisz stoi stoimy stoicie stoją', past: 'stał stała stało stali stały', imp: 'stój stójmy stójcie',
  note: 'Present *stoję, stoisz*; imperative *stój!* (stop!).' });
PL.verb('bać się', { m: 'to be afraid', asp: 'impf', cls: 'v-isz',
  pres: 'boję boisz boi boimy boicie boją', past: 'bał bała bało bali bały', imp: 'bój bójmy bójcie',
  note: 'Always with *się*: *boję się* (I am afraid), *nie bój się!* (don\'t be afraid!). Takes the genitive: *boję się psa*.' });
PL.verb('spać', { m: 'to sleep', asp: 'impf', cls: 'v-isz',
  pres: 'śpię śpisz śpi śpimy śpicie śpią', past: 'spał spała spało spali spały', imp: 'śpij śpijmy śpijcie',
  note: 's → ś in the present: *śpię, śpisz*.' });
PL.verb('dzwonić', { m: 'to ring, call (phone)', asp: 'impf', pair: 'zadzwonić', cls: 'v-isz',
  pres: 'dzwonię dzwonisz dzwoni dzwonimy dzwonicie dzwonią', past: 'dzwonił dzwoniła dzwoniło dzwonili dzwoniły', imp: 'dzwoń dzwońmy dzwońcie' });
PL.verb('lecieć', { m: 'to fly (one trip, one direction)', asp: 'impf', cls: 'v-isz',
  pres: 'lecę lecisz leci lecimy lecicie lecą', past: 'leciał leciała leciało lecieli leciały', imp: 'leć lećmy lećcie' });
PL.verb('musieć', { m: 'to have to, must', asp: 'impf', cls: 'v-isz',
  pres: 'muszę musisz musi musimy musicie muszą', past: 'musiał musiała musiało musieli musiały' });
PL.verb('woleć', { m: 'to prefer', asp: 'impf', cls: 'v-isz',
  pres: 'wolę wolisz woli wolimy wolicie wolą', past: 'wolał wolała wolało woleli wolały' });
PL.verb('wrócić', { m: 'to come back (pf.)', asp: 'pf', pair: 'wracać', cls: 'v-isz',
  pres: 'wrócę wrócisz wróci wrócimy wrócicie wrócą', past: 'wrócił wróciła wróciło wrócili wróciły', imp: 'wróć wróćmy wróćcie' });
PL.verb('kupić', { m: 'to buy (pf.)', asp: 'pf', pair: 'kupować', cls: 'v-isz',
  pres: 'kupię kupisz kupi kupimy kupicie kupią', past: 'kupił kupiła kupiło kupili kupiły', imp: 'kup kupmy kupcie', pp: 'kupiony' });
PL.verb('zobaczyć', { m: 'to see, catch sight of (pf.)', asp: 'pf', pair: 'widzieć', cls: 'v-ysz',
  pres: 'zobaczę zobaczysz zobaczy zobaczymy zobaczycie zobaczą', past: 'zobaczył zobaczyła zobaczyło zobaczyli zobaczyły',
  imp: 'zobacz zobaczmy zobaczcie' });
PL.verb('otworzyć', { m: 'to open (pf.)', asp: 'pf', pair: 'otwierać', cls: 'v-ysz',
  pres: 'otworzę otworzysz otworzy otworzymy otworzycie otworzą', past: 'otworzył otworzyła otworzyło otworzyli otworzyły',
  imp: 'otwórz otwórzmy otwórzcie', pp: 'otwarty' });
PL.verb('położyć', { m: 'to put, lay (pf.)', asp: 'pf', pair: 'kłaść', cls: 'v-ysz',
  pres: 'położę położysz położy położymy położycie położą', past: 'położył położyła położyło położyli położyły',
  imp: 'połóż połóżmy połóżcie' });

/* ── -ę, -esz, -ą (stem changes) ── */

PL.verb('pisać', { m: 'to write', asp: 'impf', pair: 'napisać', cls: 'v-esz',
  pres: 'piszę piszesz pisze piszemy piszecie piszą', past: 'pisał pisała pisało pisali pisały',
  imp: 'pisz piszmy piszcie', vn: 'pisanie', pa: 'piszący', pp: 'pisany', ap: 'pisząc',
  note: 's → sz through the whole present: piszę, piszesz.' });
PL.verb('brać', { m: 'to take (impf.)', asp: 'impf', pair: 'wziąć', cls: 'v-esz',
  pres: 'biorę bierzesz bierze bierzemy bierzecie biorą', past: 'brał brała brało brali brały', imp: 'bierz bierzmy bierzcie',
  note: 'Present stem *bior- / bierz-*: biorę, bierzesz … biorą.' });
PL.verb('wziąć', { m: 'to take (pf.)', asp: 'pf', pair: 'brać', cls: 'v-esz',
  pres: 'wezmę weźmiesz weźmie weźmiemy weźmiecie wezmą', past: 'wziął wzięła wzięło wzięli wzięły', imp: 'weź weźmy weźcie',
  note: 'A different root from *brać*. Future *wezmę, weźmiesz*; past *wziął* (he) but *wzięła* (she).' });
PL.verb('iść', { m: 'to go on foot (one trip, one direction); to walk', asp: 'impf', cls: 'v-esz',
  pres: 'idę idziesz idzie idziemy idziecie idą', past: 'szedł szła szło szli szły', imp: 'idź idźmy idźcie',
  pa: 'idący', ap: 'idąc',
  note: 'Irregular past from another root: *szedł, szła, szli*. Every prefixed verb keeps it: wyjść → wyszedł, przyjść → przyszła.' });
PL.verb('jechać', { m: 'to go by vehicle (one trip, one direction); to ride, drive', asp: 'impf', cls: 'v-esz',
  pres: 'jadę jedziesz jedzie jedziemy jedziecie jadą', past: 'jechał jechała jechało jechali jechały', imp: 'jedź jedźmy jedźcie',
  pa: 'jadący', ap: 'jadąc',
  note: 'Present stem *jad- / jedzi-*: jadę, jedziesz … jadą.' });
PL.verb('pić', { m: 'to drink', asp: 'impf', pair: 'wypić', cls: 'v-esz',
  pres: 'piję pijesz pije pijemy pijecie piją', past: 'pił piła piło pili piły', imp: 'pij pijmy pijcie',
  vn: 'picie', pa: 'pijący', ap: 'pijąc' });
PL.verb('móc', { m: 'to be able to, can', asp: 'impf', cls: 'v-esz',
  pres: 'mogę możesz może możemy możecie mogą', past: 'mógł mogła mogło mogli mogły', past1: 'mogł',
  note: 'g / ż alternation: mogę but możesz; past *mógł* but *mogłem, mogła*.' });
PL.verb('chcieć', { m: 'to want', asp: 'impf', cls: 'v-esz',
  pres: 'chcę chcesz chce chcemy chcecie chcą', past: 'chciał chciała chciało chcieli chciały',
  note: 'Past: e → a (*chciał, chciała*) except *chcieli*. Conditional *chciałbym / chciałabym* = I would like.' });
PL.verb('nieść', { m: 'to carry (one trip, one direction)', asp: 'impf', cls: 'v-esz',
  pres: 'niosę niesiesz niesie niesiemy niesiecie niosą', past: 'niósł niosła niosło nieśli niosły', past1: 'niosł',
  imp: 'nieś nieśmy nieście', note: 'o / e and ó alternations: niosę, niesiesz; niósł, niosła, nieśli.' });
PL.verb('wieźć', { m: 'to transport, drive someone (one trip, one direction)', asp: 'impf', cls: 'v-esz',
  pres: 'wiozę wieziesz wiezie wieziemy wieziecie wiozą', past: 'wiózł wiozła wiozło wieźli wiozły', past1: 'wiozł',
  imp: 'wieź wieźmy wieźcie' });
PL.verb('żyć', { m: 'to live, be alive', asp: 'impf', cls: 'v-esz',
  pres: 'żyję żyjesz żyje żyjemy żyjecie żyją', past: 'żył żyła żyło żyli żyły', imp: 'żyj żyjmy żyjcie', vn: 'życie' });
PL.verb('myć', { m: 'to wash', asp: 'impf', pair: 'umyć', cls: 'v-esz',
  pres: 'myję myjesz myje myjemy myjecie myją', past: 'mył myła myło myli myły', imp: 'myj myjmy myjcie', vn: 'mycie' });
PL.verb('kryć', { m: 'to cover, hide', asp: 'impf', cls: 'v-esz',
  pres: 'kryję kryjesz kryje kryjemy kryjecie kryją', past: 'krył kryła kryło kryli kryły', imp: 'kryj kryjmy kryjcie' });
PL.verb('bić', { m: 'to beat, hit', asp: 'impf', cls: 'v-esz',
  pres: 'biję bijesz bije bijemy bijecie biją', past: 'bił biła biło bili biły', imp: 'bij bijmy bijcie' });
PL.verb('płynąć', { m: 'to swim, sail, flow (one trip, one direction)', asp: 'impf', cls: 'v-esz',
  pres: 'płynę płyniesz płynie płyniemy płyniecie płyną', past: 'płynął płynęła płynęło płynęli płynęły', imp: 'płyń płyńmy płyńcie' });
PL.verb('biec', { m: 'to run (one trip, one direction)', asp: 'impf', cls: 'v-esz',
  pres: 'biegnę biegniesz biegnie biegniemy biegniecie biegną', past: 'biegł biegła biegło biegli biegły', imp: 'biegnij biegnijmy biegnijcie' });
PL.verb('ciągnąć', { m: 'to pull, drag', asp: 'impf', cls: 'v-esz',
  pres: 'ciągnę ciągniesz ciągnie ciągniemy ciągniecie ciągną', past: 'ciągnął ciągnęła ciągnęło ciągnęli ciągnęły', imp: 'ciągnij ciągnijmy ciągnijcie' });
PL.verb('kłaść', { m: 'to put, lay (impf.)', asp: 'impf', pair: 'położyć', cls: 'v-esz',
  pres: 'kładę kładziesz kładzie kładziemy kładziecie kładą', past: 'kładł kładła kładło kładli kładły', imp: 'kładź kładźmy kładźcie' });
PL.verb('słać', { m: 'to send', asp: 'impf', cls: 'v-esz',
  pres: 'ślę ślesz śle ślemy ślecie ślą', past: 'słał słała słało słali słały', imp: 'ślij ślijmy ślijcie',
  note: 'Rare on its own today, but the base of *wysłać* (to send), *przysłać*, *przesłać*… (*słać łóżko*, "to make the bed", is a different verb: *ścielę, ścielesz*.)' });
PL.verb('zacząć', { m: 'to begin (pf.)', asp: 'pf', pair: 'zaczynać', cls: 'v-esz',
  pres: 'zacznę zaczniesz zacznie zaczniemy zaczniecie zaczną', past: 'zaczął zaczęła zaczęło zaczęli zaczęły',
  imp: 'zacznij zacznijmy zacznijcie', note: 'Past: *zaczął* (he) but *zaczęła* (she) — ą / ę.' });
PL.verb('zamknąć', { m: 'to close (pf.)', asp: 'pf', pair: 'zamykać', cls: 'v-esz',
  pres: 'zamknę zamkniesz zamknie zamkniemy zamkniecie zamkną', past: 'zamknął zamknęła zamknęło zamknęli zamknęły',
  imp: 'zamknij zamknijmy zamknijcie', pp: 'zamknięty' });
PL.verb('odpocząć', { m: 'to rest, have a rest (pf.)', asp: 'pf', pair: 'odpoczywać', cls: 'v-esz',
  pres: 'odpocznę odpoczniesz odpocznie odpoczniemy odpoczniecie odpoczną', past: 'odpoczął odpoczęła odpoczęło odpoczęli odpoczęły',
  imp: 'odpocznij odpocznijmy odpocznijcie' });
PL.verb('usiąść', { m: 'to sit down (pf.)', asp: 'pf', cls: 'v-esz',
  pres: 'usiądę usiądziesz usiądzie usiądziemy usiądziecie usiądą', past: 'usiadł usiadła usiadło usiedli usiadły',
  imp: 'usiądź usiądźmy usiądźcie' });
PL.verb('wstać', { m: 'to get up, stand up (pf.)', asp: 'pf', pair: 'wstawać', cls: 'v-esz',
  pres: 'wstanę wstaniesz wstanie wstaniemy wstaniecie wstaną', past: 'wstał wstała wstało wstali wstały', imp: 'wstań wstańmy wstańcie' });
PL.verb('zostać', { m: 'to stay; to become (pf.)', asp: 'pf', cls: 'v-esz',
  pres: 'zostanę zostaniesz zostanie zostaniemy zostaniecie zostaną', past: 'został została zostało zostali zostały', imp: 'zostań zostańmy zostańcie' });
PL.verb('dostać', { m: 'to get, receive (pf.)', asp: 'pf', pair: 'dostawać', cls: 'v-esz',
  pres: 'dostanę dostaniesz dostanie dostaniemy dostaniecie dostaną', past: 'dostał dostała dostało dostali dostały' });
PL.verb('pomóc', { m: 'to help (pf.)', asp: 'pf', pair: 'pomagać', cls: 'v-esz',
  pres: 'pomogę pomożesz pomoże pomożemy pomożecie pomogą', past: 'pomógł pomogła pomogło pomogli pomogły', past1: 'pomogł',
  imp: 'pomóż pomóżmy pomóżcie' });
PL.verb('umrzeć', { m: 'to die (pf.)', asp: 'pf', cls: 'v-esz',
  pres: 'umrę umrzesz umrze umrzemy umrzecie umrą', past: 'umarł umarła umarło umarli umarły', imp: 'umrzyj umrzyjmy umrzyjcie' });
PL.verb('być', { m: 'to be', asp: 'impf', cls: 'v-byc',
  pres: 'jestem jesteś jest jesteśmy jesteście są', fut: 'będę będziesz będzie będziemy będziecie będą',
  past: 'był była było byli były', imp: 'bądź bądźmy bądźcie' });

/* ── Perfective partners made with a prefix ("pure" aspect: same meaning, finished) ── */

PL.verb('przeczytać', { from: ['prze', 'czytać'], m: 'to read (through, to the end)', asp: 'pf', pair: 'czytać' });
PL.verb('napisać', { from: ['na', 'pisać'], m: 'to write (and finish)', asp: 'pf', pair: 'pisać' });
PL.verb('zrobić', { from: ['z', 'robić'], m: 'to do, make (pf.)', asp: 'pf', pair: 'robić', pp: 'zrobiony' });
PL.verb('zjeść', { from: ['z', 'jeść'], m: 'to eat (up)', asp: 'pf', pair: 'jeść' });
PL.verb('wypić', { from: ['wy', 'pić'], m: 'to drink (up)', asp: 'pf', pair: 'pić', pp: 'wypity' });
PL.verb('zapłacić', { from: ['za', 'płacić'], m: 'to pay (pf.)', asp: 'pf', pair: 'płacić' });
PL.verb('poczekać', { from: ['po', 'czekać'], m: 'to wait (a while)', asp: 'pf', pair: 'czekać' });
PL.verb('zapytać', { from: ['za', 'pytać'], m: 'to ask (pf.)', asp: 'pf', pair: 'pytać' });
PL.verb('posłuchać', { from: ['po', 'słuchać'], m: 'to listen (for a while)', asp: 'pf', pair: 'słuchać' });
PL.verb('ugotować', { from: ['u', 'gotować'], m: 'to cook (pf.)', asp: 'pf', pair: 'gotować' });
PL.verb('zbudować', { from: ['z', 'budować'], m: 'to build (pf.)', asp: 'pf', pair: 'budować' });
PL.verb('nauczyć', { from: ['na', 'uczyć'], m: 'to teach (pf.); (się) to learn', asp: 'pf', pair: 'uczyć' });
PL.verb('zrozumieć', { from: ['z', 'rozumieć'], m: 'to understand (pf.)', asp: 'pf', pair: 'rozumieć', imp: 'zrozum zrozummy zrozumcie' });
PL.verb('podziękować', { from: ['po', 'dziękować'], m: 'to thank (pf.)', asp: 'pf', pair: 'dziękować' });
PL.verb('zagrać', { from: ['za', 'grać'], m: 'to play (pf.)', asp: 'pf', pair: 'grać' });
PL.verb('polubić', { from: ['po', 'lubić'], m: 'to come to like', asp: 'pf', pair: 'lubić' });
PL.verb('pomyśleć', { from: ['po', 'myśleć'], m: 'to think (for a moment)', asp: 'pf', pair: 'myśleć' });
PL.verb('usłyszeć', { from: ['u', 'słyszeć'], m: 'to hear (pf.)', asp: 'pf', pair: 'słyszeć' });
PL.verb('zadzwonić', { from: ['za', 'dzwonić'], m: 'to call, ring (pf.)', asp: 'pf', pair: 'dzwonić' });
PL.verb('zaśpiewać', { from: ['za', 'śpiewać'], m: 'to sing (pf.)', asp: 'pf', pair: 'śpiewać' });
PL.verb('zatańczyć', { from: ['za', 'tańczyć'], m: 'to dance (pf.)', asp: 'pf', pair: 'tańczyć' });
PL.verb('umyć', { from: ['u', 'myć'], m: 'to wash (pf.)', asp: 'pf', pair: 'myć', pp: 'umyty' });
PL.verb('pojechać', { from: ['po', 'jechać'], m: 'to go, set off (by vehicle)', asp: 'pf' });
PL.verb('pójść', { m: 'to go, set off (on foot)', asp: 'pf', cls: 'v-esz',
  pres: 'pójdę pójdziesz pójdzie pójdziemy pójdziecie pójdą', past: 'poszedł poszła poszło poszli poszły', imp: 'pójdź pójdźmy pójdźcie',
  note: 'po + iść, with the *ó* of the old form: *pójdę* (I\'ll go), *poszedł* (he went). The imperative *pójdź!* is bookish; in speech people say *idź!* or *chodź!*.' });
PL.verb('poprosić', { from: ['po', 'prosić'], m: 'to ask for (pf.)', asp: 'pf', pair: 'prosić' });
PL.verb('pokazać', { m: 'to show (pf.)', asp: 'pf', pair: 'pokazywać', cls: 'v-esz',
  pres: 'pokażę pokażesz pokaże pokażemy pokażecie pokażą', past: 'pokazał pokazała pokazało pokazali pokazały', imp: 'pokaż pokażmy pokażcie' });
PL.verb('sprzedać', { from: ['sprze', 'dać'], m: 'to sell (pf.)', asp: 'pf', pair: 'sprzedawać' });
