/* ═══════════════════════════════════════════════════════════════
   data/prefixes.js — Module: Prefixes & aspect (przedrostki)

   The heart of the site: verb families. One root + a prefix = a new
   verb with a guessable meaning (wy-jść = go out, przy-jść = come),
   and from those verbs come nouns (wyjazd, podpis, przepis…).

   Nest member rows:
     [word, 'seg-|ment|-ation', 'meaning', 'RULE' or null, 'from', { extra }]
   seg:  "pod-" = prefix, "pis" = root, "-ać" = suffix/ending, "-o-" = link
   extra: lit (literal gloss), n (note), ipf (imperfective partner),
          ex: [['sentence with {form}', 'translation'], …], nobuild, pos
   ═══════════════════════════════════════════════════════════════ */

/* ══ Prefixed verbs: conjugations (so sentences can be checked) ══ */

// Hidden bases: stems that only live inside prefixed verbs.
PL.verb('łożyć', { m: 'to put (only in prefixed verbs: położyć, włożyć…)', asp: 'pf', hidden: true, cls: 'v-ysz',
  pres: 'łożę łożysz łoży łożymy łożycie łożą', past: 'łożył łożyła łożyło łożyli łożyły', imp: 'łóż łóżmy łóżcie' });
PL.verb('kładać', { m: 'to put (only in prefixed verbs)', asp: 'impf', hidden: true, cls: 'v-am',
  pres: 'kładam kładasz kłada kładamy kładacie kładają', past: 'kładał kładała kładało kładali kładały', imp: 'kładaj kładajmy kładajcie' });
PL.verb('pisywać', { m: 'to write (now and then)', asp: 'impf', hidden: true, cls: 'v-uje',
  pres: 'pisuję pisujesz pisuje pisujemy pisujecie pisują', past: 'pisywał pisywała pisywało pisywali pisywały', imp: 'pisuj pisujmy pisujcie' });
PL.verb('jeżdżać', { m: 'to ride (only in prefixed verbs: wyjeżdżać…)', asp: 'impf', hidden: true, cls: 'v-am',
  pres: 'jeżdżam jeżdżasz jeżdża jeżdżamy jeżdżacie jeżdżają', past: 'jeżdżał jeżdżała jeżdżało jeżdżali jeżdżały', imp: 'jeżdżaj jeżdżajmy jeżdżajcie' });
PL.verb('bierać', { m: 'to take (only in prefixed verbs: wybierać…)', asp: 'impf', hidden: true, cls: 'v-am',
  pres: 'bieram bierasz biera bieramy bieracie bierają', past: 'bierał bierała bierało bierali bierały', imp: 'bieraj bierajmy bierajcie' });
PL.verb('mawiać', { m: 'to say (now and then)', asp: 'impf', hidden: true, cls: 'v-am',
  pres: 'mawiam mawiasz mawia mawiamy mawiacie mawiają', past: 'mawiał mawiała mawiało mawiali mawiały', imp: 'mawiaj mawiajmy mawiajcie' });
PL.verb('powiadać', { m: 'to say (old)', asp: 'impf', hidden: true, cls: 'v-am',
  pres: 'powiadam powiadasz powiada powiadamy powiadacie powiadają', past: 'powiadał powiadała powiadało powiadali powiadały', imp: 'powiadaj powiadajmy powiadajcie' });
PL.verb('glądać', { m: 'to look (only in prefixed verbs: oglądać…)', asp: 'impf', hidden: true, cls: 'v-am',
  pres: 'glądam glądasz gląda glądamy glądacie glądają', past: 'glądał glądała glądało glądali glądały', imp: 'glądaj glądajmy glądajcie' });
PL.verb('jrzeć', { m: 'to look (only in prefixed verbs: obejrzeć…)', asp: 'pf', hidden: true, cls: 'v-ysz',
  pres: 'jrzę jrzysz jrzy jrzymy jrzycie jrzą', past: 'jrzał jrzała jrzało jrzeli jrzały', imp: 'jrzyj jrzyjmy jrzyjcie' });
PL.verb('myślić', { m: 'to think (only in prefixed verbs: wymyślić…)', asp: 'pf', hidden: true, cls: 'v-isz',
  pres: 'myślę myślisz myśli myślimy myślicie myślą', past: 'myślił myśliła myśliło myślili myśliły', imp: 'myśl myślmy myślcie' });

// Real base verbs that the families need.
PL.verb('prowadzić', { m: 'to lead; to drive (a car); to run (a business)', asp: 'impf', cls: 'v-isz',
  pres: 'prowadzę prowadzisz prowadzi prowadzimy prowadzicie prowadzą', past: 'prowadził prowadziła prowadziło prowadzili prowadziły',
  imp: 'prowadź prowadźmy prowadźcie' });
PL.verb('patrzeć', { m: 'to look', asp: 'impf', cls: 'v-ysz',
  pres: 'patrzę patrzysz patrzy patrzymy patrzycie patrzą', past: 'patrzył patrzyła patrzyło patrzyli patrzyły',
  imp: 'patrz patrzmy patrzcie' });
PL.verb('rozmawiać', { m: 'to talk, have a conversation', asp: 'impf', cls: 'v-am',
  pres: 'rozmawiam rozmawiasz rozmawia rozmawiamy rozmawiacie rozmawiają', past: 'rozmawiał rozmawiała rozmawiało rozmawiali rozmawiały',
  imp: 'rozmawiaj rozmawiajmy rozmawiajcie' });
PL.verb('płakać', { m: 'to cry', asp: 'impf', cls: 'v-esz',
  pres: 'płaczę płaczesz płacze płaczemy płaczecie płaczą', past: 'płakał płakała płakało płakali płakały', imp: 'płacz płaczmy płaczcie' });
PL.verb('gadać', { m: 'to chat, natter (colloquial)', asp: 'impf', cls: 'v-am',
  pres: 'gadam gadasz gada gadamy gadacie gadają', past: 'gadał gadała gadało gadali gadały', imp: 'gadaj gadajmy gadajcie' });
PL.verb('chorować', { m: 'to be ill', asp: 'impf', cls: 'v-uje',
  pres: 'choruję chorujesz choruje chorujemy chorujecie chorują', past: 'chorował chorowała chorowało chorowali chorowały' });

// iść family — irregular, so given in full.
PL.verb('wyjść', { m: 'to go out, leave', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'wyjdę wyjdziesz wyjdzie wyjdziemy wyjdziecie wyjdą', past: 'wyszedł wyszła wyszło wyszli wyszły', imp: 'wyjdź wyjdźmy wyjdźcie' });
PL.verb('wejść', { m: 'to go in, enter', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'wejdę wejdziesz wejdzie wejdziemy wejdziecie wejdą', past: 'wszedł weszła weszło weszli weszły', imp: 'wejdź wejdźmy wejdźcie' });
PL.verb('przyjść', { m: 'to come, arrive', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'przyjdę przyjdziesz przyjdzie przyjdziemy przyjdziecie przyjdą', past: 'przyszedł przyszła przyszło przyszli przyszły', imp: 'przyjdź przyjdźmy przyjdźcie' });
PL.verb('odejść', { m: 'to walk away, leave', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'odejdę odejdziesz odejdzie odejdziemy odejdziecie odejdą', past: 'odszedł odeszła odeszło odeszli odeszły', imp: 'odejdź odejdźmy odejdźcie' });
PL.verb('dojść', { m: 'to get to, reach', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'dojdę dojdziesz dojdzie dojdziemy dojdziecie dojdą', past: 'doszedł doszła doszło doszli doszły', imp: 'dojdź dojdźmy dojdźcie' });
PL.verb('przejść', { m: 'to cross, go through', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'przejdę przejdziesz przejdzie przejdziemy przejdziecie przejdą', past: 'przeszedł przeszła przeszło przeszli przeszły', imp: 'przejdź przejdźmy przejdźcie' });
PL.verb('zejść', { m: 'to go down', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'zejdę zejdziesz zejdzie zejdziemy zejdziecie zejdą', past: 'zszedł zeszła zeszło zeszli zeszły', imp: 'zejdź zejdźmy zejdźcie' });
PL.verb('podejść', { m: 'to walk up to, approach', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'podejdę podejdziesz podejdzie podejdziemy podejdziecie podejdą', past: 'podszedł podeszła podeszło podeszli podeszły', imp: 'podejdź podejdźmy podejdźcie' });
PL.verb('nadejść', { m: 'to come, arrive (of time, news)', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'nadejdę nadejdziesz nadejdzie nadejdziemy nadejdziecie nadejdą', past: 'nadszedł nadeszła nadeszło nadeszli nadeszły' });
PL.verb('obejść', { m: 'to walk around', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'obejdę obejdziesz obejdzie obejdziemy obejdziecie obejdą', past: 'obszedł obeszła obeszło obeszli obeszły', imp: 'obejdź obejdźmy obejdźcie' });
PL.verb('zajść', { m: 'to drop in; to set (sun)', asp: 'pf', base: 'iść', cls: 'v-esz', pres: 'zajdę zajdziesz zajdzie zajdziemy zajdziecie zajdą', past: 'zaszedł zaszła zaszło zaszli zaszły', imp: 'zajdź zajdźmy zajdźcie' });

// Imperfective partners of the iść family: regular, built on chodzić.
[['wy', 'wychodzić', 'to go out, leave (impf.)'], ['w', 'wchodzić', 'to go in (impf.)'], ['przy', 'przychodzić', 'to come (impf.)'],
 ['od', 'odchodzić', 'to walk away (impf.)'], ['do', 'dochodzić', 'to reach (impf.)'], ['prze', 'przechodzić', 'to cross (impf.)'],
 ['s', 'schodzić', 'to go down (impf.)'], ['pod', 'podchodzić', 'to approach (impf.)'], ['nad', 'nadchodzić', 'to approach (of time) (impf.)'],
 ['ob', 'obchodzić', 'to go round; to celebrate; to concern'], ['za', 'zachodzić', 'to set (sun); to drop in (impf.)'],
 ['ws', 'wschodzić', 'to rise (sun) (impf.)'], ['roz', 'rozchodzić', 'to disperse (impf., with się)'], ['u', 'uchodzić', 'to escape; to be considered (impf.)'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'chodzić'], m, asp: 'impf' }));

// jechać family — regular: prefix + jechać; imperfectives on -jeżdżać.
[['wy', 'wyjechać', 'to leave, go away (by vehicle)'], ['przy', 'przyjechać', 'to arrive (by vehicle)'], ['od', 'odjechać', 'to depart'],
 ['do', 'dojechać', 'to get to (by vehicle)'], ['prze', 'przejechać', 'to drive across; to run over'], ['z', 'zjechać', 'to drive down; to exit'],
 ['w', 'wjechać', 'to drive in'], ['ob', 'objechać', 'to drive around'], ['pod', 'podjechać', 'to drive up to'],
 ['roz', 'rozjechać', 'to run over; (się) to drive off in all directions'], ['na', 'najechać', 'to run into; to invade'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'jechać'], m, asp: 'pf' }));
[['wy', 'wyjeżdżać'], ['przy', 'przyjeżdżać'], ['od', 'odjeżdżać'], ['do', 'dojeżdżać'], ['prze', 'przejeżdżać'], ['z', 'zjeżdżać'],
 ['w', 'wjeżdżać'], ['ob', 'objeżdżać'], ['pod', 'podjeżdżać'],
].forEach(([p, w]) => PL.verb(w, { from: [p, 'jeżdżać'], m: `(impf. of ${p}jechać)`, asp: 'impf' }));

// nieść family — prefix + nieść; imperfectives on nosić.
[['przy', 'przynieść', 'to bring'], ['wy', 'wynieść', 'to carry out'], ['w', 'wnieść', 'to carry in'], ['od', 'odnieść', 'to take back; to achieve'],
 ['prze', 'przenieść', 'to move, transfer'], ['pod', 'podnieść', 'to lift'], ['z', 'znieść', 'to bring down; to bear; to abolish'],
 ['do', 'donieść', 'to deliver; to report'], ['roz', 'roznieść', 'to deliver around'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'nieść'], m, asp: 'pf' }));
[['przy', 'przynosić'], ['wy', 'wynosić'], ['w', 'wnosić'], ['od', 'odnosić'], ['prze', 'przenosić'], ['pod', 'podnosić'], ['z', 'znosić'], ['do', 'donosić']]
  .forEach(([p, w]) => PL.verb(w, { from: [p, 'nosić'], m: `(impf. of ${p}nieść)`, asp: 'impf' }));

// pisać family — prefix + pisać; imperfectives on -pisywać.
[['za', 'zapisać', 'to write down; to sign up'], ['wy', 'wypisać', 'to write out; to discharge'], ['prze', 'przepisać', 'to copy; to prescribe'],
 ['o', 'opisać', 'to describe'], ['pod', 'podpisać', 'to sign'], ['do', 'dopisać', 'to add (in writing)'], ['od', 'odpisać', 'to write back'],
 ['w', 'wpisać', 'to write in, enter'], ['s', 'spisać', 'to list, write down'], ['nad', 'nadpisać', 'to overwrite'], ['przy', 'przypisać', 'to attribute'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'pisać'], m, asp: 'pf' }));
[['za', 'zapisywać'], ['wy', 'wypisywać'], ['prze', 'przepisywać'], ['o', 'opisywać'], ['pod', 'podpisywać'], ['do', 'dopisywać'],
 ['od', 'odpisywać'], ['w', 'wpisywać'], ['s', 'spisywać'], ['nad', 'nadpisywać'], ['przy', 'przypisywać'],
].forEach(([p, w]) => PL.verb(w, { from: [p, 'pisywać'], m: `(impf. of ${p}pisać)`, asp: 'impf' }));

// dać family — prefix + dać; imperfectives on dawać.
[['od', 'oddać', 'to give back'], ['po', 'podać', 'to pass, hand; to serve'], ['do', 'dodać', 'to add'], ['wy', 'wydać', 'to spend; to publish'],
 ['z', 'zdać', 'to pass (an exam)'], ['za', 'zadać', 'to set (homework); to ask (a question)'], ['roz', 'rozdać', 'to hand out'],
 ['na', 'nadać', 'to send; to broadcast'], ['pod', 'poddać', 'to subject; (się) to give up'], ['u', 'udać', '(się) to succeed; to go'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'dać'], m, asp: 'pf' }));
[['od', 'oddawać'], ['po', 'podawać'], ['do', 'dodawać'], ['wy', 'wydawać'], ['z', 'zdawać'], ['za', 'zadawać'], ['roz', 'rozdawać'],
 ['na', 'nadawać'], ['pod', 'poddawać'], ['u', 'udawać'],
].forEach(([p, w]) => PL.verb(w, { from: [p, 'dawać'], m: w === 'udawać' ? 'to pretend' : `(impf. of ${p}dać)`, asp: 'impf' }));

// łożyć family — prefix + łożyć; imperfectives on -kładać.
[['w', 'włożyć', 'to put in; to put on (clothes)'], ['wy', 'wyłożyć', 'to lay out'], ['prze', 'przełożyć', 'to move; to postpone; to translate'],
 ['od', 'odłożyć', 'to put aside; to save'], ['z', 'złożyć', 'to fold; to assemble; to submit'], ['za', 'założyć', 'to put on; to found'],
 ['do', 'dołożyć', 'to add'], ['roz', 'rozłożyć', 'to spread out'], ['u', 'ułożyć', 'to arrange'], ['na', 'nałożyć', 'to put on top; to impose'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'łożyć'], m, asp: 'pf' }));
[['w', 'wkładać'], ['wy', 'wykładać'], ['prze', 'przekładać'], ['od', 'odkładać'], ['s', 'składać'], ['za', 'zakładać'], ['do', 'dokładać'],
 ['roz', 'rozkładać'], ['u', 'układać'], ['na', 'nakładać'], ['przy', 'przykładać'],
].forEach(([p, w]) => PL.verb(w, { from: [p, 'kładać'], m: { wykładać: 'to lay out; to lecture', składać: 'to put together; to fold', układać: 'to arrange', przykładać: 'to put against, apply' }[w] || `(impf. of ${p}łożyć)`, asp: 'impf' }));

// mówić / powiedzieć family.
[['za', 'zamówić', 'to order, book'], ['u', 'umówić', '(się) to arrange to meet'], ['od', 'odmówić', 'to refuse'], ['na', 'namówić', 'to persuade'],
 ['wy', 'wymówić', 'to pronounce'], ['o', 'omówić', 'to discuss'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'mówić'], m, asp: 'pf' }));
[['za', 'zamawiać'], ['u', 'umawiać'], ['od', 'odmawiać'], ['na', 'namawiać'], ['wy', 'wymawiać'], ['o', 'omawiać']]
  .forEach(([p, w]) => PL.verb(w, { from: [p, 'mawiać'], m: `(impf. of ${p}mówić)`, asp: 'impf' }));
[['od', 'odpowiedzieć', 'to answer'], ['o', 'opowiedzieć', 'to tell (a story)'], ['za', 'zapowiedzieć', 'to announce'],
 ['wy', 'wypowiedzieć', 'to express; to give notice'], ['prze', 'przepowiedzieć', 'to predict'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'powiedzieć'], m, asp: 'pf' }));
[['od', 'odpowiadać'], ['o', 'opowiadać'], ['za', 'zapowiadać'], ['wy', 'wypowiadać'], ['prze', 'przepowiadać']]
  .forEach(([p, w]) => PL.verb(w, { from: [p, 'powiadać'], m: `(impf. of ${p}powiedzieć)`, asp: 'impf' }));

// brać family — za-brać, ze-brać / z-biorę …
[['za', 'zabrać', 'to take away; to take along'], ['wy', 'wybrać', 'to choose'], ['ze/z', 'zebrać', 'to gather'], ['ode/od', 'odebrać', 'to pick up, collect'],
 ['prze', 'przebrać', '(się) to change clothes'], ['u', 'ubrać', '(się) to get dressed'], ['roze/roz', 'rozebrać', '(się) to undress'],
 ['do', 'dobrać', 'to match'], ['po', 'pobrać', 'to download; to take (a sample)'], ['na', 'nabrać', 'to scoop; to fool'],
].forEach(([p, w, m]) => PL.verb(w, { from: [p, 'brać'], m, asp: 'pf' }));
[['za', 'zabierać'], ['wy', 'wybierać'], ['z', 'zbierać'], ['od', 'odbierać'], ['prze', 'przebierać'], ['u', 'ubierać'], ['roz', 'rozbierać'],
 ['do', 'dobierać'], ['po', 'pobierać'], ['na', 'nabierać'],
].forEach(([p, w]) => PL.verb(w, { from: [p, 'bierać'], m: `(impf.)`, asp: 'impf' }));

// stać family — given in full (they conjugate like stanąć: -stanę).
PL.verb('przestać', { m: 'to stop (doing)', asp: 'pf', base: 'stać', cls: 'v-esz', pres: 'przestanę przestaniesz przestanie przestaniemy przestaniecie przestaną', past: 'przestał przestała przestało przestali przestały', imp: 'przestań przestańmy przestańcie' });
PL.verb('powstać', { m: 'to arise; to rise up', asp: 'pf', base: 'stać', cls: 'v-esz', pres: 'powstanę powstaniesz powstanie powstaniemy powstaniecie powstaną', past: 'powstał powstała powstało powstali powstały', imp: 'powstań powstańmy powstańcie' });
PL.verb('zastać', { m: 'to find (someone in)', asp: 'pf', base: 'stać', cls: 'v-esz', pres: 'zastanę zastaniesz zastanie zastaniemy zastaniecie zastaną', past: 'zastał zastała zastało zastali zastały' });

// kryć, pić, żyć, bić, myć, płynąć, ciągnąć, słać, czytać, robić, kupić, uczyć families — all regular.
const regular = (base, rows) => rows.forEach(([p, w, m, asp]) => PL.verb(w, { from: [p, base], m, asp: asp || 'pf' }));
regular('kryć', [['u', 'ukryć', 'to hide'], ['od', 'odkryć', 'to discover'], ['za', 'zakryć', 'to cover up'], ['przy', 'przykryć', 'to cover'],
  ['na', 'nakryć', 'to cover; to lay (the table)'], ['wy', 'wykryć', 'to detect'], ['po', 'pokryć', 'to cover (a surface)']]);
regular('pić', [['na', 'napić', '(się) to have a drink'], ['do', 'dopić', 'to finish (a drink)'], ['po', 'popić', 'to wash down'], ['u', 'upić', '(się) to get drunk']]);
regular('żyć', [['prze', 'przeżyć', 'to survive; to experience'], ['do', 'dożyć', 'to live to see'], ['o', 'ożyć', 'to come alive'],
  ['u', 'użyć', 'to use'], ['za', 'zażyć', 'to take (medicine)']]);
regular('bić', [['za', 'zabić', 'to kill'], ['po', 'pobić', 'to beat up; to break (a record)'], ['wy', 'wybić', 'to knock out; to strike (the hour)'],
  ['roz', 'rozbić', 'to smash; to pitch (a tent)'], ['od', 'odbić', 'to bounce back; to reflect'], ['prze', 'przebić', 'to pierce, puncture'],
  ['u', 'ubić', 'to whip (cream)'], ['z', 'zbić', 'to break (glass)'], ['do', 'dobić', 'to finish off']]);
regular('myć', [['z', 'zmyć', 'to wash off; to do the dishes'], ['prze', 'przemyć', 'to rinse, bathe'], ['wy', 'wymyć', 'to wash out']]);
regular('płynąć', [['w', 'wpłynąć', 'to flow in; to influence'], ['wy', 'wypłynąć', 'to sail out; to surface'], ['prze', 'przepłynąć', 'to swim across'],
  ['od', 'odpłynąć', 'to sail away'], ['do', 'dopłynąć', 'to reach (swimming)'], ['przy', 'przypłynąć', 'to arrive (swimming, by boat)'],
  ['u', 'upłynąć', 'to pass (time)']]);
regular('ciągnąć', [['wy', 'wyciągnąć', 'to pull out'], ['prze', 'przeciągnąć', 'to drag across; to drag out'], ['za', 'zaciągnąć', 'to draw (curtains)'],
  ['po', 'pociągnąć', 'to pull, tug'], ['roz', 'rozciągnąć', 'to stretch']]);
regular('słać', [['wy', 'wysłać', 'to send'], ['przy', 'przysłać', 'to send (here)'], ['prze', 'przesłać', 'to forward'], ['ode', 'odesłać', 'to send back'],
  ['roze', 'rozesłać', 'to send out'], ['ze', 'zesłać', 'to exile'], ['po', 'posłać', 'to send (someone for)']]);
regular('czytać', [['od', 'odczytać', 'to read out; to decipher'], ['do', 'doczytać', 'to read to the end'], ['wy', 'wyczytać', 'to find out by reading'],
  ['po', 'poczytać', 'to read for a while'], ['za', 'zaczytać', '(się) to get absorbed in reading']]);
regular('robić', [['za', 'zarobić', 'to earn'], ['prze', 'przerobić', 'to alter, remake'], ['do', 'dorobić', 'to make an extra copy; to earn extra'],
  ['od', 'odrobić', 'to make up for; to do (homework)'], ['na', 'narobić', 'to make (a lot of)'], ['wy', 'wyrobić', 'to produce; (się) to manage']]);
regular('kupić', [['wy', 'wykupić', 'to buy out; to take out (insurance)'], ['od', 'odkupić', 'to buy back; to replace'], ['do', 'dokupić', 'to buy more'],
  ['prze', 'przekupić', 'to bribe'], ['za', 'zakupić', 'to purchase']]);
regular('uczyć', [['od', 'oduczyć', '(się) to unlearn'], ['do', 'douczyć', '(się) to catch up on learning'], ['wy', 'wyuczyć', '(się) to learn thoroughly']]);
regular('prowadzić', [['w', 'wprowadzić', 'to introduce'], ['wy', 'wyprowadzić', 'to lead out; (się) to move out'], ['prze', 'przeprowadzić', 'to carry out; (się) to move house'],
  ['do', 'doprowadzić', 'to lead to'], ['od', 'odprowadzić', 'to walk someone (home), see off'], ['za', 'zaprowadzić', 'to take (someone somewhere)'],
  ['s', 'sprowadzić', 'to bring in, import']]);
regular('patrzeć', [['po', 'popatrzeć', 'to have a look']]);
regular('myśleć', [['prze', 'przemyśleć', 'to think through']]);
regular('myślić', [['wy', 'wymyślić', 'to invent, make up'], ['do', 'domyślić', '(się) to guess'], ['za', 'zamyślić', '(się) to be lost in thought'],
  ['na', 'namyślić', '(się) to think over']]);
regular('glądać', [['wy', 'wyglądać', 'to look (like)', 'impf'], ['prze', 'przeglądać', 'to look through, browse', 'impf'],
  ['za', 'zaglądać', 'to peek in', 'impf'], ['roz', 'rozglądać', '(się) to look around', 'impf'], ['przy', 'przyglądać', '(się) to watch closely', 'impf']]);
regular('jrzeć', [['obe', 'obejrzeć', 'to watch (pf.)'], ['za', 'zajrzeć', 'to peek in (pf.)'], ['prze', 'przejrzeć', 'to look through (pf.)'],
  ['roze', 'rozejrzeć', '(się) to look around (pf.)']]);
regular('jeść', [['na', 'najeść', '(się) to eat one\'s fill']]);
regular('spać', [['wy', 'wyspać', '(się) to get enough sleep']]);
regular('płakać', [['roz', 'rozpłakać', '(się) to burst into tears']]);
regular('kochać', [['za', 'zakochać', '(się) to fall in love']]);
regular('siedzieć', [['za', 'zasiedzieć', '(się) to stay too long']]);
regular('czekać', [['na', 'naczekać', '(się) to wait a long time']]);
regular('chorować', [['roz', 'rozchorować', '(się) to fall ill']]);
regular('gadać', [['na', 'nagadać', '(się) to talk one\'s fill']]);

PL.noun('wybór', { g: 'm3', m: 'choice', cls: 'n-m-hard',
  sg: 'wybór wyboru wyborowi wybór wyborem wyborze wyborze',
  pl: 'wybory wyborów wyborom wybory wyborami wyborach wybory' });

/* ══ Module ══ */

PL.module('prefixes', {
  t: 'Prefixes', pl: 'Przedrostki',
  blurb: 'One verb, many meanings: wy-jść, przy-jść, od-ejść…',
  intro: 'Polish makes new verbs by putting a **prefix** in front of an old one. The prefix usually adds a direction — *w-* in, *wy-* out, *przy-* arriving, *od-* away — and it almost always makes the verb **perfective**: one finished action. Learn the fifteen or so prefixes and words you have never seen become guessable: *wyjść* (go out), *wynieść* (carry out), *wypić* (drink up). Meanings drift over the centuries — *przepis* is a recipe, *zawód* a profession — but the original picture usually still shows through. Every family below is taken apart piece by piece.',
});

PL.groups('prefixes', [
  { id: 'PFX', t: 'Prefixes', pl: 'przedrostki', intro: 'Each prefix has a core picture (usually spatial) plus a few figurative uses. The examples come from many different roots — the point is to recognise the prefix anywhere.' },
  { id: 'ASP', t: 'Aspect', pl: 'aspekt', intro: 'Almost every verb comes as a pair: **imperfective** (ongoing, repeated, in general) and **perfective** (one complete action, with a result). Prefixes create perfectives; suffixes like *-ywać* turn them back into imperfectives.' },
  { id: 'LEMP', t: 'Dictionary form', pl: 'bezokolicznik', pattern: 'alternations', intro: 'Finding the infinitive of a prefixed verb form: *wyszła → wyjść, przyniósł → przynieść, odpowiem → odpowiedzieć*.' },
]);

PL.affixes({
  'w-': 'in', 'we-': 'in', 'wy-': 'out', 'przy-': 'to, arriving', 'od-': 'away, back', 'ode-': 'away, back',
  'do-': 'up to, extra', 'prze-': 'across, re-', 'z-': 'down, together; done', 'ze-': 'down, together', 's-': 'down, together; done',
  'za-': 'behind, begin; done', 'po-': 'a while; done', 'pó-': 'po- (set off)', 'roz-': 'apart', 'roze-': 'apart',
  'pod-': 'under, up to', 'pode-': 'under, up to', 'nad-': 'over, approaching', 'nade-': 'over, approaching',
  'o-': 'around, all over', 'ob-': 'around', 'obe-': 'around', 'u-': 'away, off; done', 'na-': 'onto, a lot',
  'ws-': 'up', 'wz-': 'up', 'wze-': 'up', 'pro-': 'forth', 'bez-': 'without', 'nie-': 'not',
});

/* ══ Rules ══ */

PL.rules('prefixes', 'PFX', {
  'PFX:w': { o: 1, f: 3, t: '*w- / we-* — in(to)',
    x: 'Movement into something: *wejść* (go in), *wjechać* (drive in), *wnieść* (carry in), *wpisać* (write in, enter), *włożyć* (put in; put on clothes). Before awkward clusters it is *we-*: *wejść*.' },
  'PFX:wy': { o: 2, f: 3, t: '*wy-* — out; all the way',
    x: 'Out of something: *wyjść* (go out), *wyjechać* (leave, go away), *wynieść* (carry out), *wysłać* (send off). Also doing something completely or achieving it: *wypić* (drink up), *wyspać się* (get enough sleep), *wymyślić* (think up).' },
  'PFX:przy': { o: 3, f: 3, t: '*przy-* — arriving; attaching',
    x: 'Coming to the speaker or to a place: *przyjść* (come), *przyjechać* (arrive), *przynieść* (bring), *przysłać* (send here). Also attaching: *przykryć* (put a cover on), *przypisać* (ascribe to).' },
  'PFX:od': { o: 4, f: 3, t: '*od- / ode-* — away; back; un-',
    x: 'Moving away: *odejść* (walk away), *odjechać* (depart). Giving or saying back: *oddać* (give back), *odpisać* (write back), *odpowiedzieć* (answer). Undoing: *odkryć* (dis-cover). Before awkward clusters it is *ode-*: *odebrać, odesłać*.' },
  'PFX:do': { o: 5, f: 3, t: '*do-* — up to, all the way; extra',
    x: 'Reaching a point: *dojść* (get to), *dojechać* (reach by car), *doczytać* (read to the end), *dożyć* (live to see). Adding more: *dodać* (add), *dopisać* (add in writing), *dokupić* (buy more).' },
  'PFX:prze': { o: 6, f: 3, t: '*prze-* — across, through; again, over',
    x: 'Across or through: *przejść* (cross), *przejechać* (drive across), *przenieść* (move elsewhere), *przeżyć* (live through, survive). Doing it again or differently: *przepisać* (rewrite, copy), *przerobić* (remake), *przełożyć* (move; postpone; translate).' },
  'PFX:z': { o: 7, f: 3, t: '*z- / s- / ze-* — down, off; together',
    x: 'Down or off: *zejść* (go down), *zjechać* (drive down), *zmyć* (wash off). Together: *zebrać* (gather), *złożyć* (put together, fold). And very often just "done" (perfective): *zrobić, zjeść*. It is *s-* before most voiceless consonants (*spisać, schodzić*), but *z-* stays before *s, sz* (*zszedł*) and becomes *ś-* before *ć* (*ściągnąć*); *ze-* before clusters (*zebrać, zejść*).' },
  'PFX:za': { o: 8, f: 3, t: '*za-* — behind; to start; closing off',
    x: 'Going behind or calling in: *zajść* (drop in; set — of the sun). Starting: *zapłakać* (burst out crying), *zakochać się* (fall in love), *zachorować* (fall ill). Covering or closing: *zakryć* (cover up), *zamknąć* (close). Getting something: *zarobić* (earn), *zamówić* (order). Writing down: *zapisać*.' },
  'PFX:po': { o: 9, f: 3, t: '*po-* — for a while; setting off; done',
    x: 'For a little while: *poczytać* (read for a bit), *popatrzeć* (have a look). Setting off: *pójść, pojechać* (go, set off). Simply completed: *pomyśleć*. Starting: *polubić* (come to like), *pokochać* (come to love). And sometimes "over to": *podać* (hand, pass).' },
  'PFX:roz': { o: 10, f: 2, t: '*roz- / roze-* — apart, spread out; un-',
    x: 'In different directions: *rozejść się* (disperse; split up), *rozdać* (hand out), *rozesłać* (send out), *rozłożyć* (spread out). Breaking or undoing: *rozbić* (smash), *rozebrać się* (undress). Bursting into: *rozpłakać się* (burst into tears). Back and forth between people: *rozmawiać* (talk, converse).' },
  'PFX:pod': { o: 11, f: 2, t: '*pod- / pode-* — under; up to',
    x: 'Under: *podpisać* (sign — write underneath). Up from below: *podnieść* (lift). Approaching: *podejść* (walk up to), *podjechać* (pull up). Giving oneself "under": *poddać się* (give up).' },
  'PFX:nad': { o: 15, f: 1, t: '*nad- / nade-* — over; approaching',
    x: 'Over the top: *nadpisać* (overwrite). Approaching (of time, news): *nadejść* (come, arrive), *nadchodzić* (be on its way). Careful: *nadać* (send a parcel) is not *nad-* — it is *na-dać*.' },
  'PFX:o': { o: 12, f: 2, t: '*o- / ob- / obe-* — around; all over',
    x: 'Around: *obejść* (walk around), *objechać* (drive around). All over the surface of something: *opisać* (describe — "write around"), *obejrzeć* (look over), *opowiedzieć* (tell — "say around").' },
  'PFX:u': { o: 13, f: 2, t: '*u-* — away, off; managed it',
    x: 'Away or off: *ujść* (escape), *ukryć* (hide away). Completing something with a result: *umyć* (wash), *ugotować* (cook), *ubić* (whip). Also *udać się* (succeed).' },
  'PFX:na': { o: 14, f: 2, t: '*na-* — onto; a lot; one\'s fill',
    x: 'Onto a surface: *nałożyć* (put on top), *nakryć* (cover; lay the table). A large amount: *narobić* (make — a mess). With *się* — to one\'s fill: *najeść się* (eat your fill), *napić się* (have a drink). Also persuading: *namówić* (talk into).' },
  'PFX:wz': { o: 16, f: 1, t: '*wz- / ws- / w-* — up',
    x: 'Upward: *wstać* (get up — the *w-* here is a worn-down *wz-*), *wzejść* (rise — of the sun), *wschód* (east — where the sun goes up).' },
});

PL.rules('prefixes', 'ASP', {
  'ASP:pf': { o: 1.5, f: 3, t: 'Perfective partner: na-pisać, prze-czytać, z-robić',
    x: 'Many verbs get their perfective partner from a prefix that adds no new meaning, only "finished": *pisać → napisać, czytać → przeczytać, robić → zrobić, pić → wypić, myć → umyć, uczyć → nauczyć*. Which prefix it is has to be learned with each verb.' },
  'ASP:choice': { o: 4.5, f: 3, t: 'Which aspect? Ongoing vs done',
    x: '**Imperfective** for actions in progress, repeated or habitual, or talked about in general: *Codziennie czytam. Czytałem, kiedy zadzwoniłeś.* **Perfective** for one complete action with a result, and for single future events: *Przeczytałem całą książkę. Jutro to zrobię.*' },
  'ASP:ipf': { o: 7.5, f: 2, t: 'Back to imperfective: -ywać, -iwać, -ać',
    x: 'Once a prefix has made a new perfective verb, a suffix gives it an imperfective partner with the same meaning: *podpisać → podpisywać, zapisać → zapisywać, oddać → oddawać, wstać → wstawać, zamówić → zamawiać* (o → a). Verbs of motion switch to their "regular" twin instead: *wyjść → wychodzić* (chodzić), *przynieść → przynosić* (nosić).' },
  'ASP:pairs': { o: 9.5, f: 2, t: 'Pairs from different roots: brać / wziąć',
    x: 'A few everyday aspect pairs are two unrelated words: *brać / wziąć* (take), *mówić / powiedzieć* (say), *widzieć / zobaczyć* (see), *oglądać / obejrzeć* (watch), *kłaść / położyć* (put).' },
  'ASP:sie': { o: 14.5, f: 1, t: 'Prefix + *się*: najeść się, wyspać się',
    x: 'A prefix plus *się* often adds a twist: *na- … się* = to one\'s fill (*najeść się, nagadać się*), *wy- … się* = enough of it (*wyspać się*), *roz- … się* = to burst into (*rozpłakać się, rozchorować się*), *za- … się* = to get carried away (*zaczytać się, zasiedzieć się*, *zakochać się*).' },
});

PL.rules('prefixes', 'LEMP', {
  'LEM:pverb': { o: 11.5, f: 2, t: 'Find the infinitive (prefixed verbs)',
    x: 'Strip the ending and keep the prefix: *wyszła → wyjść, przyniósł → przynieść, odpowiem → odpowiedzieć, zabierzesz → zabrać*. The forms of the base verb (*szła, niósł, powiem, bierzesz*) are the clue.' },
});

/* ══ Word families ══ */

PL.nest({
  id: 'isc', root: 'iść · chodzić', gloss: 'go on foot', cue: 'iść',
  roots: { 'iść': 'go', 'jść': 'go', 'jś': 'go', 'chodz': 'go', 'chód': 'a going', 'chod': 'go' },
  intro: 'The most important family. Every prefix comes in a pair: perfective *-jść* (one complete trip) and imperfective *-chodzić* (going on, or regularly): *wyjść / wychodzić* (go out). Nouns are built on *-chód* and *-jście*.',
  m: [
    ['iść', 'iść', 'to go (on foot), walk — now, one way', null, null, { pos: 'v' }],
    ['chodzić', 'chodz|-ić', 'to go (regularly), walk around', null, null],
    ['wyjść', 'wy-|jść', 'to go out, leave', 'PFX:wy', 'iść', { ipf: 'wychodzić', ex: [['Wczoraj {wyszłam} z domu o siódmej.', 'Yesterday I (f.) left home at seven.']] }],
    ['wejść', 'we-|jść', 'to go in, enter', 'PFX:w', 'iść', { ipf: 'wchodzić', ex: [['Proszę {wejść|wchodzić}!', 'Please come in!']] }],
    ['przyjść', 'przy-|jść', 'to come, arrive (on foot)', 'PFX:przy', 'iść', { ipf: 'przychodzić', ex: [['Kiedy {przyjdziesz}?', 'When will you come?'], ['Marek {przyszedł} za późno.', 'Marek arrived too late.']] }],
    ['odejść', 'ode-|jść', 'to walk away, leave (for good)', 'PFX:od', 'iść', { ipf: 'odchodzić', ex: [['Nie chcę, żebyś {odszedł}.', 'I don\'t want you to leave (to a man).']] }],
    ['dojść', 'do-|jść', 'to get to, reach (on foot)', 'PFX:do', 'iść', { ipf: 'dochodzić', ex: [['Jak {dojść} do dworca?', 'How do I get to the station?']] }],
    ['przejść', 'prze-|jść', 'to cross; to go through; to pass', 'PFX:prze', 'iść', { ipf: 'przechodzić', ex: [['{Przejdź} przez ulicę na światłach.', 'Cross the street at the lights.']],
      n: 'Also figurative: *ból przeszedł* (the pain has passed), *przejść na emeryturę* (to retire — "go across into retirement").' }],
    ['zejść', 'ze-|jść', 'to go down, come down', 'PFX:z', 'iść', { ipf: 'schodzić', ex: [['{Zejdź} na dół, obiad gotowy!', 'Come downstairs, lunch is ready!']] }],
    ['podejść', 'pode-|jść', 'to walk up to, approach', 'PFX:pod', 'iść', { ipf: 'podchodzić', ex: [['{Podejdź} bliżej.', 'Come closer.']] }],
    ['obejść', 'obe-|jść', 'to walk around; to get around (a rule)', 'PFX:o', 'iść', { ipf: 'obchodzić',
      n: 'The imperfective *obchodzić* also means "to celebrate" (going round in a procession) and "to concern": *Co cię to obchodzi?* — What is it to you?' }],
    ['nadejść', 'nade-|jść', 'to come, arrive (of time, news, weather)', 'PFX:nad', 'iść', { ipf: 'nadchodzić', ex: [['W końcu {nadeszła} wiosna.', 'Spring has finally come.']] }],
    ['zajść', 'za-|jść', 'to drop in; to set (the sun); to go (too) far', 'PFX:za', 'iść', { ipf: 'zachodzić', n: '*Słońce zachodzi* — the sun "goes behind" the horizon.' }],
    ['wzejść', 'wze-|jść', 'to rise (the sun); to come up (seeds)', 'PFX:wz', 'iść', { ipf: 'wschodzić', n: '*Słońce wschodzi* — the sun "goes up".' }],
    ['rozejść się', 'roze-|jść', 'to disperse; to split up', 'PFX:roz', 'iść', { ipf: 'rozchodzić się', n: '*Rozeszli się* — they went their separate ways; also: they broke up.' }],
    ['pójść', 'pó-|jść', 'to go, set off (on foot)', 'PFX:po', 'iść', { ex: [['{Pójdziemy|Idziemy} na spacer?', 'Shall we go for a walk?']], n: '*po-* marks setting off. The *ó* is old: *pójść, pójdę*, but past *poszedł*. No *-chodzić* partner here: *pochodzić* means "to come from" (*Skąd pochodzisz?*).' }],
    ['ujść', 'u-|jść', 'to escape; to get away with', 'PFX:u', 'iść', { ipf: 'uchodzić', n: '*Ujść na sucho* = to get away with it (literally "to get away dry").' }],
    ['wyjście', 'wy-|jś|-cie', 'exit, way out', 'NOM:vn', 'wyjść', { ex: [['Gdzie jest {wyjście}?', 'Where is the exit?']] }],
    ['wejście', 'we-|jś|-cie', 'entrance', 'NOM:vn', 'wejść'],
    ['przejście', 'prze-|jś|-cie', 'passage; crossing', 'NOM:vn', 'przejść', { n: '*przejście dla pieszych* = pedestrian crossing ("passage for walkers").' }],
    ['podejście', 'pode-|jś|-cie', 'approach; attitude', 'NOM:vn', 'podejść', { n: '*Ma dobre podejście do dzieci* = he is good with children ("has a good approach").' }],
    ['wschód', 'ws-|chód', 'east; sunrise', 'NOM:zero', 'wschodzić', { lit: 'the going-up', n: 'Where the sun "goes up". *Wschód słońca* = sunrise; *Europa Wschodnia* = Eastern Europe.' }],
    ['zachód', 'za-|chód', 'west; sunset', 'NOM:zero', 'zachodzić', { lit: 'the going-behind', n: 'Where the sun "goes behind" the horizon. *Zachód słońca* = sunset.' }],
    ['przychód', 'przy-|chód', 'income, revenue', 'NOM:zero', 'przychodzić', { lit: 'what comes in' }],
    ['dochód', 'do-|chód', 'income (earned)', 'NOM:zero', 'dochodzić', { lit: 'what reaches you' }],
    ['schody', 's-|chod|-y', 'stairs', 'NOM:zero', 'schodzić', { lit: 'goings-down' }],
    ['obchody', 'ob-|chod|-y', 'celebrations, commemorations', 'NOM:zero', 'obchodzić', { lit: 'goings-around', n: 'From processions that walked round a church or town.' }],
    ['samochód', 'sam|-o-|chód', 'car', 'CMP:calque', null, { lit: 'self-goer', n: 'A calque of *auto-mobile*: Greek *autós* "self" + Latin *mobilis* "moving".' }],
    ['chodnik', 'chod|-nik', 'pavement, sidewalk', 'SFX:nik', 'chodzić', { lit: 'walking-thing' }],
    ['przechodzień', 'prze-|chodz|-ień', 'passer-by', 'SFX:agent', 'przechodzić'],
  ],
});

PL.nest({
  id: 'jechac', root: 'jechać · jeździć', gloss: 'go by vehicle, ride', cue: 'jechać',
  roots: { 'jechać': 'ride, go (by vehicle)', 'jeździć': 'ride', 'jeżdż': 'ride', 'jazd': 'ride, drive', 'jazda': 'ride' },
  intro: 'The vehicle twin of *iść*. The prefixes are the same; the imperfectives end in *-jeżdżać* (*wyjechać / wyjeżdżać*), and the nouns in *-jazd* (*wyjazd, przyjazd, zjazd*).',
  m: [
    ['jechać', 'jechać', 'to go (by vehicle), ride, drive — now', null, null],
    ['jeździć', 'jeździć', 'to go by vehicle (regularly); to ride, drive', null, null],
    ['wyjechać', 'wy-|jechać', 'to leave, go away (by vehicle); to go abroad', 'PFX:wy', 'jechać', { ipf: 'wyjeżdżać', ex: [['Moja siostra {wyjechała} do Anglii.', 'My sister went away to England.']] }],
    ['przyjechać', 'przy-|jechać', 'to arrive (by vehicle)', 'PFX:przy', 'jechać', { ipf: 'przyjeżdżać', ex: [['Pociąg {przyjechał} z opóźnieniem.', 'The train arrived late.'], ['Kiedy {przyjedziecie}?', 'When will you (all) arrive?']] }],
    ['odjechać', 'od-|jechać', 'to depart, drive off', 'PFX:od', 'jechać', { ipf: 'odjeżdżać', ex: [['Autobus właśnie {odjechał}.', 'The bus has just left.']] }],
    ['dojechać', 'do-|jechać', 'to get to, reach (by vehicle)', 'PFX:do', 'jechać', { ipf: 'dojeżdżać', ex: [['Jak {dojechać} do centrum?', 'How do I get to the centre?']], n: 'The imperfective *dojeżdżać do pracy* = to commute.' }],
    ['przejechać', 'prze-|jechać', 'to drive across, through; to run over', 'PFX:prze', 'jechać', { ipf: 'przejeżdżać', ex: [['{Przejechaliśmy|Przejechałyśmy} całą Polskę w jeden dzień.', 'We drove across the whole of Poland in one day.']] }],
    ['zjechać', 'z-|jechać', 'to drive down; to come off (a road)', 'PFX:z', 'jechać', { ipf: 'zjeżdżać', ex: [['{Zjedź} z autostrady na następnym zjeździe.', 'Come off the motorway at the next exit.']] }],
    ['wjechać', 'w-|jechać', 'to drive in, pull in', 'PFX:w', 'jechać', { ipf: 'wjeżdżać', ex: [['Pociąg {wjechał} na peron.', 'The train pulled in to the platform.']] }],
    ['objechać', 'ob-|jechać', 'to drive around; to tour', 'PFX:o', 'jechać', { ipf: 'objeżdżać' }],
    ['podjechać', 'pod-|jechać', 'to drive up to, pull up', 'PFX:pod', 'jechać', { ipf: 'podjeżdżać', ex: [['Taksówka {podjechała} pod hotel.', 'The taxi pulled up at the hotel.']] }],
    ['pojechać', 'po-|jechać', 'to go, set off (by vehicle)', 'PFX:po', 'jechać', { ex: [['W lipcu {pojedziemy|jedziemy} nad morze.', 'In July we\'ll go to the seaside.']] }],
    ['najechać', 'na-|jechać', 'to run into; to invade', 'PFX:na', 'jechać', { ipf: 'najeżdżać' }],
    ['wyjazd', 'wy-|jazd', 'departure; trip (away)', 'NOM:zero', 'wyjechać', { ex: [['Mój {wyjazd} jest w piątek.', 'I\'m leaving on Friday.']] }],
    ['przyjazd', 'przy-|jazd', 'arrival', 'NOM:zero', 'przyjechać', { ex: [['Czekamy na {przyjazd} gości.', 'We\'re waiting for the guests to arrive.']] }],
    ['odjazd', 'od-|jazd', 'departure (of a vehicle)', 'NOM:zero', 'odjechać', { ex: [['{Odjazd} pociągu: 10:15.', 'Train departure: 10:15.']] }],
    ['dojazd', 'do-|jazd', 'access (by road); the commute', 'NOM:zero', 'dojechać'],
    ['przejazd', 'prze-|jazd', 'crossing (road or rail); passage, ride', 'NOM:zero', 'przejechać', { n: '*przejazd kolejowy* = level crossing.' }],
    ['zjazd', 'z-|jazd', 'exit (off a motorway); descent; reunion, congress', 'NOM:zero', 'zjechać', { n: 'Two pictures: going **down** (a slope, off the motorway) and coming **together** — *zjazd absolwentów* = alumni reunion.' }],
    ['wjazd', 'w-|jazd', 'entrance (for vehicles), driveway', 'NOM:zero', 'wjechać', { n: '*Zakaz wjazdu* = no entry (for vehicles).' }],
    ['objazd', 'ob-|jazd', 'detour, diversion', 'NOM:zero', 'objechać'],
    ['najazd', 'na-|jazd', 'invasion, raid', 'NOM:zero', 'najechać'],
    ['pojazd', 'po-|jazd', 'vehicle', 'NOM:zero', 'pojechać'],
    ['jazda', 'jazd|-a', 'ride; driving', 'NOM:zero', 'jeździć', { n: '*prawo jazdy* = driving licence ("the right of riding"); *rozkład jazdy* = timetable.' }],
  ],
});

PL.nest({
  id: 'niesc', root: 'nieść · nosić', gloss: 'carry', cue: 'nieść',
  roots: { 'nieść': 'carry', 'nosić': 'carry', 'nos': 'carry', 'noś': 'carry', 'nosz': 'carry', 'nios': 'carry' },
  intro: 'Carrying: *nieść* (now, one way) and *nosić* (around, regularly; also "to wear"). Prefixed: perfective *-nieść*, imperfective *-nosić*.',
  m: [
    ['nieść', 'nieść', 'to carry (now, one way)', null, null],
    ['nosić', 'nos|-ić', 'to carry (around); to wear', null, null],
    ['przynieść', 'przy-|nieść', 'to bring', 'PFX:przy', 'nieść', { ipf: 'przynosić', ex: [['{Przynieś} mi wodę, proszę.', 'Bring me some water, please.'], ['Kto {przyniósł} te kwiaty?', 'Who brought these flowers?']] }],
    ['wynieść', 'wy-|nieść', 'to carry out, take out', 'PFX:wy', 'nieść', { ipf: 'wynosić', ex: [['{Wynieś} śmieci!', 'Take the rubbish out!']], n: '*Na wynos* = takeaway ("for carrying out").' }],
    ['wnieść', 'w-|nieść', 'to carry in; to bring in (a contribution)', 'PFX:w', 'nieść', { ipf: 'wnosić', ex: [['Pomóż mi {wnieść} walizki.', 'Help me carry the suitcases in.']] }],
    ['odnieść', 'od-|nieść', 'to take back; to achieve (success)', 'PFX:od', 'nieść', { ipf: 'odnosić', ex: [['Muszę {odnieść} książki do biblioteki.', 'I have to take the books back to the library.']], n: '*Odnieść sukces* = to achieve success; *odnieść wrażenie* = to get the impression.' }],
    ['przenieść', 'prze-|nieść', 'to move, transfer (carry across)', 'PFX:prze', 'nieść', { ipf: 'przenosić', ex: [['Firma {przeniosła} biuro do Krakowa.', 'The company moved its office to Kraków.']] }],
    ['podnieść', 'pod-|nieść', 'to lift, pick up; to raise', 'PFX:pod', 'nieść', { ipf: 'podnosić', ex: [['{Podnieś} rękę, jeśli wiesz.', 'Raise your hand if you know.']] }],
    ['znieść', 'z-|nieść', 'to carry down; to bear, stand; to abolish', 'PFX:z', 'nieść', { ipf: 'znosić', ex: [['Nie mogę tego {znieść}!', 'I can\'t stand it!']], n: 'Three pictures: carrying something down, *bearing* a load (*nie znoszę poniedziałków* = I can\'t stand Mondays), and carrying something off for good (*znieść wizy* = to abolish visas).' }],
    ['donieść', 'do-|nieść', 'to deliver; to report, inform (on)', 'PFX:do', 'nieść', { ipf: 'donosić' }],
    ['roznieść', 'roz-|nieść', 'to deliver around; to spread', 'PFX:roz', 'nieść'],
    ['wniosek', 'w-|nios|-ek', 'conclusion; application, motion', 'NOM:ek', 'wnieść', { lit: 'something brought in', n: '*Złożyć wniosek* = to submit an application; *wyciągnąć wnioski* = to draw conclusions.' }],
    ['donos', 'do-|nos', 'denunciation (to the authorities)', 'NOM:zero', 'donieść'],
    ['przenośnia', 'prze-|noś|-nia', 'metaphor', 'CMP:calque', null, { gl: ['across', 'carry', '(noun)'], lit: 'a carrying-over', n: 'Exactly the Greek *meta-phorá*, "carrying across" — a word moved to a new place.' }],
    ['przenośny', 'prze-|noś|-ny', 'portable; figurative', 'ADJ:alny', 'przenosić', { pos: 'adj', lit: 'carry-across-able' }],
    ['nosze', 'nosz|-e', 'stretcher', 'NOM:zero', 'nosić', { lit: 'carriers' }],
  ],
});

PL.nest({
  id: 'pisac', root: 'pis-', gloss: 'write', cue: 'pisać',
  intro: 'One root, a whole office: *podpis* (signature), *przepis* (recipe), *opis* (description), *długopis* (pen). Prefixed verbs are perfective; their imperfectives end in *-pisywać*.',
  m: [
    ['pisać', 'pis|-ać', 'to write', null, null],
    ['napisać', 'na-|pis|-ać', 'to write (and finish)', 'ASP:pf', 'pisać', { gl: ['(done)', 'write', ''], ex: [['Wczoraj {napisałam} długi list.', 'Yesterday I (f.) wrote a long letter.']] }],
    ['zapisać', 'za-|pis|-ać', 'to write down, note; (się) to sign up, enrol', 'PFX:za', 'pisać', { ipf: 'zapisywać', ex: [['{Zapisz} mój numer telefonu.', 'Write down my phone number.'], ['{Zapisałem} się na kurs polskiego.', 'I (m.) signed up for a Polish course.']] }],
    ['wypisać', 'wy-|pis|-ać', 'to write out; to discharge (from hospital)', 'PFX:wy', 'pisać', { ipf: 'wypisywać', ex: [['Lekarz {wypisał} mnie ze szpitala.', 'The doctor discharged me from hospital.']], n: 'Writing someone **out** of the register. *Wypisać się* = to unsubscribe.' }],
    ['przepisać', 'prze-|pis|-ać', 'to copy out, rewrite; to prescribe', 'PFX:prze', 'pisać', { ipf: 'przepisywać', ex: [['Lekarz {przepisał} mi nowe lekarstwo.', 'The doctor prescribed me a new medicine.'], ['{Przepisz} ten tekst do zeszytu.', 'Copy this text into your exercise book.']] }],
    ['opisać', 'o-|pis|-ać', 'to describe', 'PFX:o', 'pisać', { ipf: 'opisywać', lit: 'write around', ex: [['{Opisz} swój dom.', 'Describe your house.']] }],
    ['podpisać', 'pod-|pis|-ać', 'to sign', 'PFX:pod', 'pisać', { ipf: 'podpisywać', lit: 'write underneath', ex: [['Proszę {podpisać} tutaj.', 'Please sign here.']], n: 'You sign at the bottom — under the text. Latin had the same picture: *sub-scribere* → English *subscribe*.' }],
    ['dopisać', 'do-|pis|-ać', 'to add (in writing)', 'PFX:do', 'pisać', { ipf: 'dopisywać', ex: [['{Dopisz} mnie do listy.', 'Add me to the list.']] }],
    ['odpisać', 'od-|pis|-ać', 'to write back, reply', 'PFX:od', 'pisać', { ipf: 'odpisywać', ex: [['Dlaczego nie {odpisałeś}?', 'Why didn\'t you write back? (to a man)']], n: 'Also "to copy" (from a classmate in a test): *odpisywać od kolegi*.' }],
    ['wpisać', 'w-|pis|-ać', 'to write in, enter (into a form)', 'PFX:w', 'pisać', { ipf: 'wpisywać', ex: [['{Wpisz} hasło.', 'Enter the password.']] }],
    ['spisać', 's-|pis|-ać', 'to list, write everything down', 'PFX:z', 'pisać', { ipf: 'spisywać' }],
    ['nadpisać', 'nad-|pis|-ać', 'to overwrite', 'PFX:nad', 'pisać', { ipf: 'nadpisywać', lit: 'write over the top' }],
    ['przypisać', 'przy-|pis|-ać', 'to attribute, ascribe; to assign', 'PFX:przy', 'pisać', { ipf: 'przypisywać' }],
    ['podpis', 'pod-|pis', 'signature', 'NOM:zero', 'podpisać'],
    ['opis', 'o-|pis', 'description', 'NOM:zero', 'opisać'],
    ['przepis', 'prze-|pis', 'recipe; regulation, rule', 'NOM:zero', 'przepisać', { ex: [['Masz dobry {przepis} na pierogi?', 'Do you have a good recipe for pierogi?']], n: 'Something prescribed: in the kitchen a recipe, in law a regulation (*przepisy drogowe* = traffic rules).' }],
    ['zapis', 'za-|pis', 'record, entry; enrolment', 'NOM:zero', 'zapisać', { n: '*zapisy* = registration (for a course).' }],
    ['napis', 'na-|pis', 'inscription, sign; caption', 'NOM:zero', 'napisać', { lit: 'something written on', n: '*napisy* = subtitles.' }],
    ['wpis', 'w-|pis', 'entry (in a register); blog post', 'NOM:zero', 'wpisać'],
    ['spis', 's-|pis', 'list, register; census', 'NOM:zero', 'spisać', { n: '*spis treści* = table of contents.' }],
    ['pismo', 'pis|-mo', 'writing, handwriting; official letter; magazine', null, null],
    ['pisarz', 'pis|-arz', 'writer', 'SFX:arz', 'pisać'],
    ['pisemny', 'pis|-em|-ny', 'written (exam, test)', 'ADJ:ny', 'pismo', { pos: 'adj', n: '*egzamin pisemny* = written exam; *ustny* = oral.' }],
    ['długopis', 'dług|-o-|pis', 'ballpoint pen', 'CMP:compound', null, { lit: 'long-writer', n: 'It writes for a "long" time without dipping in ink.' }],
    ['rękopis', 'ręk|-o-|pis', 'manuscript', 'CMP:calque', null, { lit: 'hand-writing', n: 'A calque of Latin *manu-scriptum*.' }],
    ['czasopismo', 'czas|-o-|pis|-mo', 'magazine, periodical', 'CMP:calque', null, { lit: 'time-writing', n: 'A calque of German *Zeitschrift* (*Zeit* time + *Schrift* writing).' }],
  ],
});

PL.nest({
  id: 'dac', root: 'da-', gloss: 'give', cue: 'dać',
  roots: { 'da': 'give', 'daw': 'give' },
  intro: '*dać / dawać* (give) with prefixes covers a surprising amount of daily life: selling (*sprzedać*), passing exams (*zdać*), spending (*wydać*), homework (*zadanie*), and even "data" (*dane*).',
  m: [
    ['dać', 'da|-ć', 'to give (pf.)', null, null],
    ['dawać', 'daw|-ać', 'to give (impf.)', null, null],
    ['oddać', 'od-|da|-ć', 'to give back, return; to hand in', 'PFX:od', 'dać', { ipf: 'oddawać', ex: [['Kiedy mi {oddasz} książkę?', 'When will you give me the book back?']] }],
    ['podać', 'po-|da|-ć', 'to pass, hand; to serve (food)', 'PFX:po', 'dać', { ipf: 'podawać', ex: [['{Podaj} mi sól, proszę.', 'Pass me the salt, please.']] }],
    ['dodać', 'do-|da|-ć', 'to add', 'PFX:do', 'dać', { ipf: 'dodawać', ex: [['{Dodaj} trochę cukru.', 'Add a little sugar.']] }],
    ['wydać', 'wy-|da|-ć', 'to spend (money); to publish; to issue', 'PFX:wy', 'dać', { ipf: 'wydawać', ex: [['Ile {wydałeś} na prezenty?', 'How much did you spend on presents? (to a man)']], n: 'Giving **out**: money out of your pocket, a book out to the public. *Wydawać się* = to seem.' }],
    ['sprzedać', 's-|prze-|da|-ć', 'to sell', 'PFX:prze', 'dać', { ipf: 'sprzedawać', lit: 'give across', ex: [['{Sprzedałem} stary samochód.', 'I (m.) sold my old car.']] }],
    ['zdać', 'z-|da|-ć', 'to pass (an exam); to hand over', 'PFX:z', 'dać', { ipf: 'zdawać', ex: [['{Zdałam} egzamin!', 'I (f.) passed the exam!']], n: 'Aspect matters here: *zdawać egzamin* (impf.) = to **take** an exam; *zdać* (pf.) = to **pass** it — the perfective means you got the result.' }],
    ['zadać', 'za-|da|-ć', 'to set (homework); to ask (a question)', 'PFX:za', 'dać', { ipf: 'zadawać', ex: [['Mogę {zadać} pytanie?', 'May I ask a question?']] }],
    ['rozdać', 'roz-|da|-ć', 'to hand out, give away', 'PFX:roz', 'dać', { ipf: 'rozdawać', ex: [['Nauczycielka {rozdała} testy.', 'The teacher handed out the tests.']] }],
    ['nadać', 'na-|da|-ć', 'to send (a parcel); to broadcast; to give (a name)', 'PFX:na', 'dać', { ipf: 'nadawać', ex: [['Muszę {nadać} paczkę na poczcie.', 'I have to send a parcel at the post office.']] }],
    ['poddać się', 'pod-|da|-ć', 'to give up, surrender', 'PFX:pod', 'dać', { ipf: 'poddawać się', lit: 'give oneself under', ex: [['Nigdy się nie {poddam}!', 'I will never give up!']] }],
    ['udać się', 'u-|da|-ć', 'to succeed, work out; to go (formal)', 'PFX:u', 'dać', { ipf: 'udawać się', ex: [['{Udało} się!', 'It worked!']], n: 'Impersonal: *udało mi się* = I managed (it "gave itself" to me). Careful: without *się* the verb means **to pretend**: *udawać* (impf.), *udać* (pf.: *udał, że śpi* = he pretended to be asleep).' }],
    ['zadanie', 'za-|da|-nie', 'task, exercise; *zadanie domowe* = homework', 'NOM:vn', 'zadać'],
    ['zdanie', 'z-|da|-nie', 'sentence; opinion', 'NOM:vn', 'zdać', { n: '*Moim zdaniem* = in my opinion. Linked to *zdawać się* (to seem): an opinion is how things seem to you. Latin *sententia* made the same jump from "opinion" to "sentence".' }],
    ['wydanie', 'wy-|da|-nie', 'edition, issue', 'NOM:vn', 'wydać'],
    ['podanie', 'po-|da|-nie', 'application (letter); serving; pass (sport)', 'NOM:vn', 'podać'],
    ['dodatek', 'do-|da|-tek', 'supplement, extra; additive', 'NOM:ek', 'dodać', { n: '*Na dodatek* = on top of that.' }],
    ['wydatek', 'wy-|da|-tek', 'expense', 'NOM:ek', 'wydać'],
    ['sprzedaż', 's-|prze-|da|-ż', 'sale', 'NOM:zero', 'sprzedać'],
    ['dane', 'da|-ne', 'data', 'PART:ny', 'dać', { lit: 'the given (things)', n: 'The passive participle of *dać* (*dany* = given) — exactly like Latin *data* "given things". *Dane osobowe* = personal data.' }],
    ['sprzedawca', 's-|prze-|daw|-ca', 'shop assistant, seller', 'SFX:agent', 'sprzedawać'],
    ['nadawca', 'na-|daw|-ca', 'sender', 'SFX:agent', 'nadawać'],
  ],
});

PL.nest({
  id: 'klad', root: 'kład- · łoż-', gloss: 'put, lay', cue: 'położyć',
  roots: { 'łoż': 'put, lay', 'łóż': 'put', 'kład': 'putting, laying', 'kładać': 'put', 'kłaść': 'put, lay' },
  intro: 'Two roots share the work: perfective *-łożyć* and imperfective *-kładać* (*włożyć / wkładać*). The nouns in *-kład* are everywhere: *przykład* (example), *wykład* (lecture), *rozkład* (timetable), *zakład* (bet; plant).',
  m: [
    ['kłaść', 'kłaść', 'to put, lay (impf.)', null, null],
    ['położyć', 'po-|łoż|-yć', 'to put, lay (pf.)', 'ASP:pairs', 'kłaść', { ex: [['Gdzie {położyłeś} klucze?', 'Where did you put the keys? (to a man)']] }],
    ['włożyć', 'w-|łoż|-yć', 'to put in; to put on (clothes)', 'PFX:w', 'położyć', { ipf: 'wkładać', ex: [['{Włóż|Załóż} kurtkę, jest zimno.', 'Put your jacket on, it\'s cold.']] }],
    ['wyłożyć', 'wy-|łoż|-yć', 'to lay out; to line, cover (a surface)', 'PFX:wy', 'położyć', { ipf: 'wykładać', n: 'The imperfective *wykładać* also means to lecture — laying out the material.' }],
    ['przełożyć', 'prze-|łoż|-yć', 'to move (elsewhere); to postpone; to translate', 'PFX:prze', 'położyć', { ipf: 'przekładać', ex: [['Musimy {przełożyć} spotkanie na piątek.', 'We have to postpone the meeting to Friday.']], n: 'Put something **across**: to another place, another day, another language — like Latin *trans-latio*, "carrying across".' }],
    ['odłożyć', 'od-|łoż|-yć', 'to put aside; to put off; to save (money)', 'PFX:od', 'położyć', { ipf: 'odkładać', ex: [['{Odłóż} telefon i jedz!', 'Put the phone down and eat!']] }],
    ['złożyć', 'z-|łoż|-yć', 'to fold; to assemble; to submit; to offer (wishes)', 'PFX:z', 'położyć', { ipf: 'składać', ex: [['Chcę ci {złożyć} życzenia.', 'I want to give you my best wishes.']], n: 'Putting things **together**: folding, assembling, *złożyć wniosek* (submit an application), *składać życzenia* (offer wishes).' }],
    ['założyć', 'za-|łoż|-yć', 'to put on; to set up, found; to assume', 'PFX:za', 'położyć', { ipf: 'zakładać', ex: [['Mój dziadek {założył} tę firmę.', 'My grandad founded this company.']], n: '*Załóżmy, że…* = let\'s assume that…' }],
    ['dołożyć', 'do-|łoż|-yć', 'to add (put more)', 'PFX:do', 'położyć', { ipf: 'dokładać', n: 'Related: *dokładny* = precise, *dokładnie* = exactly.' }],
    ['rozłożyć', 'roz-|łoż|-yć', 'to spread out, unfold; to break down', 'PFX:roz', 'położyć', { ipf: 'rozkładać', ex: [['{Rozłóż} mapę na stole.', 'Spread the map out on the table.']] }],
    ['ułożyć', 'u-|łoż|-yć', 'to arrange, put in order', 'PFX:u', 'położyć', { ipf: 'układać' }],
    ['nałożyć', 'na-|łoż|-yć', 'to put on top; to impose; to serve (food)', 'PFX:na', 'położyć', { ipf: 'nakładać', ex: [['{Nałóż} sobie więcej sałatki.', 'Help yourself to more salad.']] }],
    ['układ', 'u-|kład', 'arrangement, system; deal', 'NOM:zero', 'układać', { n: '*układ słoneczny* = the solar system.' }],
    ['wykład', 'wy-|kład', 'lecture', 'NOM:zero', 'wykładać', { lit: 'a laying-out', ex: [['Jutro mam {wykład} o ósmej.', 'Tomorrow I have a lecture at eight.']] }],
    ['przekład', 'prze-|kład', 'translation', 'NOM:zero', 'przekładać', { lit: 'a putting-across' }],
    ['zakład', 'za-|kład', 'bet; plant, works; institution', 'NOM:zero', 'zakładać', { n: '*Idę o zakład!* = I bet you! *zakład pracy* = workplace.' }],
    ['skład', 's-|kład', 'composition, line-up; warehouse', 'NOM:zero', 'składać', { n: 'What is put together: ingredients on a label, a team line-up, a storehouse.' }],
    ['rozkład', 'roz-|kład', 'timetable; layout; decomposition', 'NOM:zero', 'rozkładać', { n: '*Rozkład jazdy* = timetable ("the layout of the rides").' }],
    ['wkład', 'w-|kład', 'contribution; refill, insert', 'NOM:zero', 'wkładać'],
    ['przykład', 'przy-|kład', 'example', 'NOM:zero', 'przykładać', { lit: 'something laid next to', n: '*Na przykład* = for example. An example is laid **next to** the rule.' }],
    ['wykładowca', 'wy-|kład|-ow|-ca', 'lecturer', 'SFX:agent', 'wykładać'],
    ['zakładka', 'za-|kład|-ka', 'bookmark; tab', 'SFX:tool', 'zakładać'],
  ],
});

PL.nest({
  id: 'mowic', root: 'mów- · wiedz-', gloss: 'speak · make known', cue: 'mówić',
  roots: { 'mów': 'speak', 'mow': 'speech', 'mawi': 'speak', 'wiedz': 'make known', 'wiedź': 'a saying', 'wiad': 'say', 'wied': 'say' },
  intro: 'Two roots: *mówić* (speak) and *-wiedzieć* (make known, from *wiedzieć* "to know"): *powiedzieć* is literally "to make known". Together they give answering, ordering food, arranging meetings and refusing.',
  m: [
    ['mówić', 'mów|-ić', 'to speak, talk, say', null, null],
    ['powiedzieć', 'po-|wiedz|-ieć', 'to say, tell (pf.)', 'ASP:pairs', 'mówić', { lit: 'make known', n: 'Built on *wiedzieć* (to know). *mówić / powiedzieć* is an aspect pair from two different roots.' }],
    ['odpowiedzieć', 'od-|po-|wiedz|-ieć', 'to answer, reply', 'PFX:od', 'powiedzieć', { ipf: 'odpowiadać', lit: 'say back', ex: [['Nie {odpowiedział} na moje pytanie.', 'He didn\'t answer my question.']] }],
    ['opowiedzieć', 'o-|po-|wiedz|-ieć', 'to tell (a story), recount', 'PFX:o', 'powiedzieć', { ipf: 'opowiadać', lit: 'say all around', ex: [['{Opowiedz} mi o swojej podróży.', 'Tell me about your trip.']] }],
    ['zapowiedzieć', 'za-|po-|wiedz|-ieć', 'to announce (in advance)', 'PFX:za', 'powiedzieć', { ipf: 'zapowiadać', n: '*Zapowiada się piękny dzień* = it promises to be a lovely day.' }],
    ['wypowiedzieć', 'wy-|po-|wiedz|-ieć', 'to express, utter; to give notice (on a contract)', 'PFX:wy', 'powiedzieć', { ipf: 'wypowiadać' }],
    ['przepowiedzieć', 'prze-|po-|wiedz|-ieć', 'to predict, foretell', 'PFX:prze', 'powiedzieć', { ipf: 'przepowiadać' }],
    ['zamówić', 'za-|mów|-ić', 'to order (food, a taxi), book', 'PFX:za', 'mówić', { ipf: 'zamawiać', ex: [['Co {zamówiłaś}?', 'What did you order? (to a woman)'], ['Chciałbym {zamówić} pizzę.', 'I (m.) would like to order a pizza.']] }],
    ['umówić się', 'u-|mów|-ić', 'to arrange to meet, make an appointment', 'PFX:u', 'mówić', { ipf: 'umawiać się', ex: [['{Umówiłem} się z nią na kawę.', 'I (m.) arranged to meet her for coffee.']] }],
    ['odmówić', 'od-|mów|-ić', 'to refuse, decline', 'PFX:od', 'mówić', { ipf: 'odmawiać', lit: 'speak away', ex: [['Nie mogłem {odmówić}.', 'I (m.) couldn\'t say no.']] }],
    ['namówić', 'na-|mów|-ić', 'to persuade, talk into', 'PFX:na', 'mówić', { ipf: 'namawiać', ex: [['Kasia {namówiła} mnie na wycieczkę.', 'Kasia talked me into the trip.']] }],
    ['wymówić', 'wy-|mów|-ić', 'to pronounce; to give notice', 'PFX:wy', 'mówić', { ipf: 'wymawiać', lit: 'speak out' }],
    ['omówić', 'o-|mów|-ić', 'to discuss, go over', 'PFX:o', 'mówić', { ipf: 'omawiać', lit: 'talk around' }],
    ['rozmawiać', 'roz-|mawi|-ać', 'to talk, have a conversation', 'PFX:roz', 'mówić', { ex: [['Często {rozmawiamy} przez telefon.', 'We often talk on the phone.']], n: 'Built on *mawiać* (to keep saying). Perfective: *porozmawiać* (have a chat).' }],
    ['odpowiedź', 'od-|po-|wiedź', 'answer', 'NOM:zero', 'odpowiedzieć', { ex: [['Dziękuję za {odpowiedź}.', 'Thanks for the answer.']] }],
    ['opowiadanie', 'o-|po-|wiad|-anie', 'short story; telling', 'NOM:vn', 'opowiadać'],
    ['rozmowa', 'roz-|mow|-a', 'conversation; (job) interview', 'NOM:zero', 'rozmawiać', { n: '*Rozmowa kwalifikacyjna* = job interview.' }],
    ['zamówienie', 'za-|mów|-ienie', 'order (in a shop, online)', 'NOM:vn', 'zamówić'],
    ['wymowa', 'wy-|mow|-a', 'pronunciation', 'NOM:zero', 'wymówić'],
    ['umowa', 'u-|mow|-a', 'contract, agreement', 'NOM:zero', 'umówić się', { lit: 'what was talked into place' }],
    ['wypowiedź', 'wy-|po-|wiedź', 'statement, utterance', 'NOM:zero', 'wypowiedzieć'],
    ['zapowiedź', 'za-|po-|wiedź', 'announcement; trailer (film)', 'NOM:zero', 'zapowiedzieć'],
    ['mowa', 'mow|-a', 'speech; language', null, null],
  ],
});

PL.nest({
  id: 'brac', root: 'bra- · bior- · bór', gloss: 'take', cue: 'brać',
  roots: { 'bra': 'take', 'bier': 'take', 'bior': 'take', 'bór': 'a taking', 'bor': 'taking' },
  intro: 'Taking: choosing is "taking out" (*wybrać*), collecting is "taking together" (*zebrać*), dressing is *ubrać się*. The perfective partner of plain *brać* is a different word: *wziąć*.',
  m: [
    ['brać', 'bra|-ć', 'to take (impf.)', null, null],
    ['wziąć', 'wziąć', 'to take (pf.)', 'ASP:pairs', 'brać', { n: 'A different root — learn *brać / wziąć* as a pair.' }],
    ['zabrać', 'za-|bra|-ć', 'to take away; to take along', 'PFX:za', 'brać', { ipf: 'zabierać', ex: [['{Zabierz|Weź} parasol, będzie padać.', 'Take an umbrella, it\'s going to rain.'], ['Kto {zabrał|wziął} moje okulary?', 'Who took my glasses?']] }],
    ['wybrać', 'wy-|bra|-ć', 'to choose', 'PFX:wy', 'brać', { ipf: 'wybierać', lit: 'take out (of a set)', ex: [['{Wybrałeś} już prezent?', 'Have you chosen the present yet? (to a man)']] }],
    ['zebrać', 'ze-|bra|-ć', 'to gather, collect; to pick', 'PFX:z', 'brać', { ipf: 'zbierać', lit: 'take together', ex: [['Dzieci {zebrały} dużo grzybów.', 'The children picked a lot of mushrooms.']] }],
    ['odebrać', 'ode-|bra|-ć', 'to pick up, collect; to take away (from someone)', 'PFX:od', 'brać', { ipf: 'odbierać', ex: [['Możesz mnie {odebrać} z dworca?', 'Can you pick me up from the station?']], n: '*Odebrać telefon* = to answer the phone.' }],
    ['przebrać się', 'prze-|bra|-ć', 'to change (clothes); to dress up (as)', 'PFX:prze', 'brać', { ipf: 'przebierać się', ex: [['Muszę się {przebrać}.', 'I have to get changed.']] }],
    ['ubrać się', 'u-|bra|-ć', 'to get dressed', 'PFX:u', 'brać', { ipf: 'ubierać się', ex: [['{Ubierz} się ciepło!', 'Dress warmly!']] }],
    ['rozebrać się', 'roze-|bra|-ć', 'to undress; (without się) to take apart', 'PFX:roz', 'brać', { ipf: 'rozbierać się' }],
    ['dobrać', 'do-|bra|-ć', 'to match, choose (to fit)', 'PFX:do', 'brać', { ipf: 'dobierać' }],
    ['pobrać', 'po-|bra|-ć', 'to download; to take (a sample); to charge (a fee)', 'PFX:po', 'brać', { ipf: 'pobierać', ex: [['{Pobierz} aplikację za darmo!', 'Download the app for free!']], n: '*Pobrać się* = to get married ("take each other").' }],
    ['nabrać', 'na-|bra|-ć', 'to scoop up; to gain; to fool, trick', 'PFX:na', 'brać', { ipf: 'nabierać', n: '*Nabrać kogoś* = to fool someone ("take them in").' }],
    ['wybór', 'wy-|bór', 'choice', 'NOM:zero', 'wybrać', { ex: [['Nie mam {wyboru}.', 'I have no choice.']] }],
    ['wybory', 'wy-|bor|-y', 'elections', 'NOM:zero', 'wybrać', { lit: 'choices', n: 'The plural of *wybór*: elections are literally "choices".' }],
    ['zbiór', 'z-|biór', 'collection; harvest; set (maths)', 'NOM:zero', 'zebrać'],
    ['odbiór', 'od-|biór', 'pickup, collection; reception (signal)', 'NOM:zero', 'odebrać'],
    ['ubranie', 'u-|bra|-nie', 'clothes', 'NOM:vn', 'ubrać się', { lit: 'a dressing' }],
    ['przebranie', 'prze-|bra|-nie', 'disguise, costume', 'NOM:vn', 'przebrać się'],
    ['odbiorca', 'od-|bior|-ca', 'recipient', 'SFX:agent', 'odbierać'],
  ],
});

PL.nest({
  id: 'stac', root: 'sta- · stan-', gloss: 'stand; become', cue: 'stać',
  roots: { 'sta': 'stand', 'stan': 'stand', 'stój': 'standing' },
  intro: 'Standing, stopping, becoming. The prefixed perfectives conjugate like *stanąć* (*wstanę, dostanę, przestań!*). The odd one out: *dostać* (to get) — originally "to reach".',
  m: [
    ['stać', 'sta|-ć', 'to stand', null, null],
    ['stanąć', 'stan|-ąć', 'to stand up; to stop, come to a halt', null, null],
    ['wstać', 'w-|sta|-ć', 'to get up, stand up', 'PFX:wz', 'stać', { gl: ['up', 'stand', ''], ipf: 'wstawać', lit: 'stand up', ex: [['O której dziś {wstałeś}?', 'What time did you get up today? (to a man)']], n: 'This *w-* is a worn-down *wz-* (up), not *w-* (in).' }],
    ['dostać', 'do-|sta|-ć', 'to get, receive', 'PFX:do', 'stać', { ipf: 'dostawać', ex: [['Co {dostałaś} na urodziny?', 'What did you get for your birthday? (to a woman)']], n: 'Originally "to reach": what reaches you, you get. Related: *dostatek* = plenty.' }],
    ['przestać', 'prze-|sta|-ć', 'to stop (doing something)', 'PFX:prze', 'stać', { ipf: 'przestawać', ex: [['{Przestań} płakać!', 'Stop crying!'], ['W końcu {przestało} padać.', 'It finally stopped raining.']] }],
    ['powstać', 'po-|w-|sta|-ć', 'to come into being; to rise up', 'PFX:po', 'wstać', { gl: ['', 'up', 'stand', ''], n: '*po-* + *wstać* (get up): a town "gets up" — comes into being; a nation rises up.', ipf: 'powstawać', ex: [['Miasto {powstało} w trzynastym wieku.', 'The town was founded in the thirteenth century.']] }],
    ['zastać', 'za-|sta|-ć', 'to find (someone somewhere)', 'PFX:za', 'stać', { ipf: 'zastawać', ex: [['Czy {zastałem|zastałam} pana dyrektora?', 'Is the director in? (lit. have I found him here?)']], n: 'A classic office / phone phrase: *Czy zastałem…?* — "have I caught … in?"' }],
    ['zostać', 'z-|o-|sta|-ć', 'to stay (behind); to become', null, null, { gl: ['', '', 'stand', ''], n: 'Two everyday meanings: *zostań!* (stay!) and *zostać lekarzem* (to become a doctor). Historically *z-* + *ostać* "to remain" (*o-* + *stać*).' }],
    ['przystanąć', 'przy-|stan|-ąć', 'to stop (for a moment)', 'PFX:przy', 'stanąć'],
    ['przystanek', 'przy-|stan|-ek', '(bus, tram) stop', 'NOM:ek', 'przystanąć', { lit: 'a stopping-by', ex: [['Wysiadam na następnym {przystanku}.', 'I\'m getting off at the next stop.']] }],
    ['powstanie', 'po-|w-|sta|-nie', 'uprising; coming into being', 'NOM:vn', 'powstać', { gl: ['', 'up', 'stand', '(noun of the action)'], n: '*Powstanie Warszawskie* (1944) = the Warsaw Uprising — the city "rose up".' }],
    ['postój', 'po-|stój', 'stop, halt; taxi rank', 'NOM:zero', 'stać', { n: '*Postój taksówek* = taxi rank.' }],
    ['stan', 'stan', 'state, condition', null, null],
    ['stanowisko', 'stan|-ow|-isko', 'position, post; stance', 'SFX:isko', 'stan', { lit: 'standing-place' }],
  ],
});

PL.noun('przystanek', { g: 'm3', m: '(bus, tram) stop', cls: 'n-m-hard',
  sg: 'przystanek przystanku przystankowi przystanek przystankiem przystanku przystanku',
  pl: 'przystanki przystanków przystankom przystanki przystankami przystankach przystanki' });

PL.nest({
  id: 'kryc', root: 'kry-', gloss: 'cover, hide', cue: 'kryć',
  roots: { 'kry': 'cover, hide', 'kryw': 'cover', 'kryj': 'hide', 'kryt': 'hidden' },
  intro: 'Covering and hiding: *odkryć* is literally "dis-cover", *nakryć do stołu* is "to lay the table" (cover it with a cloth).',
  m: [
    ['kryć', 'kry|-ć', 'to cover; to hide', null, null],
    ['ukryć', 'u-|kry|-ć', 'to hide (something away)', 'PFX:u', 'kryć', { ipf: 'ukrywać', ex: [['Gdzie {ukryłeś} prezent?', 'Where did you hide the present? (to a man)']] }],
    ['odkryć', 'od-|kry|-ć', 'to discover; to uncover', 'PFX:od', 'kryć', { ipf: 'odkrywać', lit: 'un-cover', ex: [['Kto {odkrył} Amerykę?', 'Who discovered America?']], n: 'Exactly like English *dis-cover*: take the cover off.' }],
    ['zakryć', 'za-|kry|-ć', 'to cover (up)', 'PFX:za', 'kryć', { ipf: 'zakrywać', ex: [['{Zakryj} oczy!', 'Cover your eyes!']] }],
    ['przykryć', 'przy-|kry|-ć', 'to cover (with a lid, a blanket)', 'PFX:przy', 'kryć', { ipf: 'przykrywać', ex: [['{Przykryj} garnek pokrywką.', 'Cover the pot with a lid.']] }],
    ['nakryć', 'na-|kry|-ć', 'to cover; to lay (the table); to catch (red-handed)', 'PFX:na', 'kryć', { ipf: 'nakrywać', ex: [['{Nakryj} do stołu, proszę.', 'Lay the table, please.']] }],
    ['wykryć', 'wy-|kry|-ć', 'to detect, find out', 'PFX:wy', 'kryć', { ipf: 'wykrywać' }],
    ['pokryć', 'po-|kry|-ć', 'to cover (a surface); to cover (costs)', 'PFX:po', 'kryć', { ipf: 'pokrywać' }],
    ['odkrycie', 'od-|kry|-cie', 'discovery', 'NOM:vn', 'odkryć'],
    ['pokrywka', 'po-|kryw|-ka', 'lid', 'SFX:tool', 'pokryć'],
    ['kryjówka', 'kryj|-ówka', 'hiding place', 'SFX:place', 'kryć'],
  ],
});

PL.nest({
  id: 'pic', root: 'pi-', gloss: 'drink', cue: 'pić',
  roots: { 'pi': 'drink', 'pij': 'drink', 'pój': 'drink', 'piw': 'beer' },
  intro: 'Drinking, from a sip to a hangover. Notice how *na- … się* means "to one\'s satisfaction".',
  m: [
    ['pić', 'pi|-ć', 'to drink', null, null],
    ['wypić', 'wy-|pi|-ć', 'to drink (up, all of it)', 'ASP:pf', 'pić', { gl: ['(done)', 'drink', ''], ex: [['Kto {wypił} moje mleko?', 'Who drank my milk?']], n: 'The usual perfective of *pić*: *wy-* = to the end.' }],
    ['napić się', 'na-|pi|-ć', 'to have a drink', 'PFX:na', 'pić', { ex: [['Czego się {napijesz}?', 'What will you have to drink?']] }],
    ['dopić', 'do-|pi|-ć', 'to finish (a drink)', 'PFX:do', 'pić', { ipf: 'dopijać', ex: [['{Dopij} herbatę, wychodzimy.', 'Finish your tea, we\'re leaving.']] }],
    ['popić', 'po-|pi|-ć', 'to wash down (with a drink)', 'PFX:po', 'pić', { ipf: 'popijać', ex: [['{Popij} tabletkę wodą.', 'Wash the pill down with water.']] }],
    ['upić się', 'u-|pi|-ć', 'to get drunk', 'PFX:u', 'pić', { ipf: 'upijać się' }],
    ['napój', 'na-|pój', 'drink, beverage', 'NOM:zero', 'napić się'],
    ['picie', 'pi|-cie', 'drinking; a drink (colloquial)', 'NOM:vn', 'pić'],
    ['pijany', 'pij|-any', 'drunk', 'PART:ny', 'pić', { pos: 'adj' }],
    ['pijak', 'pij|-ak', 'drunkard', 'SFX:agent', 'pić'],
    ['napiwek', 'na|piw|-ek', 'tip (money)', null, null, { lit: '"for a beer"', n: 'From *na piwo* (for a beer) + *-ek*. German *Trinkgeld* and French *pourboire* tell the same story.' }],
  ],
});

PL.nest({
  id: 'zyc', root: 'ży-', gloss: 'live', cue: 'żyć',
  roots: { 'ży': 'live', 'żyw': 'alive', 'żyt': 'use' },
  intro: 'Living — and, unexpectedly, using: *użyć* (to use) comes from an old sense of *żyć*, "to live off, enjoy".',
  m: [
    ['żyć', 'ży|-ć', 'to live, be alive', null, null],
    ['przeżyć', 'prze-|ży|-ć', 'to survive; to live through, experience', 'PFX:prze', 'żyć', { ipf: 'przeżywać', ex: [['Nikt nie {przeżył} katastrofy.', 'Nobody survived the crash.']], n: '*Nie przeżywaj tak!* (impf.) = Don\'t take it so hard! ("don\'t live through it so")' }],
    ['dożyć', 'do-|ży|-ć', 'to live to see (an age, a moment)', 'PFX:do', 'żyć', { ipf: 'dożywać', ex: [['Dziadek {dożył} stu lat.', 'Grandad lived to a hundred.']] }],
    ['ożyć', 'o-|ży|-ć', 'to come alive, come to life', 'PFX:o', 'żyć', { ipf: 'ożywać', ex: [['Po deszczu ogród {ożył}.', 'After the rain the garden came to life.']] }],
    ['użyć', 'u-|ży|-ć', 'to use', 'PFX:u', 'żyć', { ipf: 'używać', ex: [['Mogę {użyć} twojego telefonu?', 'Can I use your phone?']], n: 'Originally "to enjoy, live off something" → to use. It takes the genitive.' }],
    ['zażyć', 'za-|ży|-ć', 'to take (medicine)', 'PFX:za', 'żyć', { ipf: 'zażywać' }],
    ['życie', 'ży|-cie', 'life', 'NOM:vn', 'żyć'],
    ['przeżycie', 'prze-|ży|-cie', 'experience; survival', 'NOM:vn', 'przeżyć'],
    ['żywy', 'żyw|-y', 'alive, living; lively', null, null, { pos: 'adj' }],
    ['żywność', 'żyw|-ność', 'food (as a category)', 'SFX:osc', 'żywy', { lit: 'living-ness', n: '*Zdrowa żywność* = health food.' }],
    ['użytkownik', 'u-|żyt|-k|-ownik', 'user', 'SFX:nik', 'użyć'],
  ],
});

PL.nest({
  id: 'bic', root: 'bi-', gloss: 'beat, hit', cue: 'bić',
  roots: { 'bi': 'hit, beat', 'bij': 'hit', 'bój': 'fight', 'bo': 'beat' },
  intro: 'Hitting, breaking — and records, reflections and tents. *Rozbić* is both "to smash" and "to pitch (a tent)" — you hammer the pegs apart.',
  m: [
    ['bić', 'bi|-ć', 'to beat, hit', null, null],
    ['zabić', 'za-|bi|-ć', 'to kill', 'PFX:za', 'bić', { ipf: 'zabijać', ex: [['Uważaj, bo się {zabijesz}!', 'Careful, or you\'ll kill yourself!']] }],
    ['pobić', 'po-|bi|-ć', 'to beat up; to break (a record)', 'PFX:po', 'bić', { ex: [['Biegaczka {pobiła} rekord świata.', 'The runner broke the world record.']] }],
    ['wybić', 'wy-|bi|-ć', 'to knock out; to strike (the hour)', 'PFX:wy', 'bić', { ipf: 'wybijać', ex: [['Zegar {wybił} północ.', 'The clock struck midnight.']] }],
    ['rozbić', 'roz-|bi|-ć', 'to smash, break; to pitch (a tent)', 'PFX:roz', 'bić', { ipf: 'rozbijać', ex: [['Kto {rozbił|zbił} szklankę?', 'Who broke the glass?'], ['{Rozbijmy} namiot tutaj.', 'Let\'s pitch the tent here.']] }],
    ['odbić', 'od-|bi|-ć', 'to bounce back; to reflect; to win back', 'PFX:od', 'bić', { ipf: 'odbijać', n: '*Odbić się* = to bounce off; to be reflected.' }],
    ['przebić', 'prze-|bi|-ć', 'to pierce; to puncture; to outbid', 'PFX:prze', 'bić', { ipf: 'przebijać', ex: [['Ktoś {przebił} mi oponę!', 'Someone punctured my tyre!']] }],
    ['ubić', 'u-|bi|-ć', 'to whip (cream, egg whites)', 'PFX:u', 'bić', { ipf: 'ubijać', ex: [['{Ubij} białka na sztywno.', 'Whisk the egg whites until stiff.']] }],
    ['zbić', 'z-|bi|-ć', 'to break (glass); to beat (someone)', 'PFX:z', 'bić', { ipf: 'zbijać' }],
    ['dobić', 'do-|bi|-ć', 'to finish off', 'PFX:do', 'bić', { ipf: 'dobijać', n: '*Dobić targu* = to strike a deal.' }],
    ['odbicie', 'od-|bi|-cie', 'reflection; rebound', 'NOM:vn', 'odbić'],
    ['rozbitek', 'roz-|bi|-tek', 'castaway, shipwreck survivor', 'NOM:ek', 'rozbić'],
    ['zabójca', 'za-|bój|-ca', 'killer', 'SFX:agent', 'zabić'],
    ['boisko', 'bo|-isko', 'sports pitch, playing field', 'SFX:isko', 'bić', { n: 'Originally a threshing floor — the place in a barn where grain was beaten.' }],
  ],
});

PL.nest({
  id: 'wod', root: 'wod- · wadz-', gloss: 'lead', cue: 'prowadzić',
  roots: { 'wadz': 'lead', 'wodz': 'lead', 'wód': 'a leading', 'wod': 'lead', 'wieść': 'lead' },
  intro: 'Leading: moving house is "leading yourself across" (*przeprowadzić się*). The nouns in *-wód* are among the most useful words in the language: *dowód* (proof, ID), *powód* (reason), *rozwód* (divorce), *przewód* (wire), *zawód* (profession).',
  m: [
    ['prowadzić', 'pro-|wadz|-ić', 'to lead; to drive (a car); to run (a business)', null, null],
    ['wodzić', 'wodz|-ić', 'to lead (around); now mostly in set phrases', null, null, { n: '*wodzić wzrokiem* = to follow with your eyes, *wodzić za nos* = to lead by the nose.' }],
    ['wprowadzić', 'w-|pro-|wadz|-ić', 'to introduce; to lead in', 'PFX:w', 'prowadzić', { ipf: 'wprowadzać', ex: [['Rząd {wprowadził} nowe przepisy.', 'The government introduced new regulations.']] }],
    ['wyprowadzić się', 'wy-|pro-|wadz|-ić', 'to move out', 'PFX:wy', 'prowadzić', { ipf: 'wyprowadzać się', ex: [['Syn {wyprowadził} się od rodziców.', 'The son has moved out of his parents\' place.']], n: 'Without *się*: *wyprowadzić psa* = to take the dog out (for a walk).' }],
    ['przeprowadzić się', 'prze-|pro-|wadz|-ić', 'to move (house)', 'PFX:prze', 'prowadzić', { ipf: 'przeprowadzać się', ex: [['W zeszłym roku {przeprowadziliśmy|przeprowadziłyśmy} się do Krakowa.', 'Last year we moved to Kraków.']], n: 'Lead yourself **across** to a new home. Without *się*: to carry out (*przeprowadzić badanie* = to conduct a study).' }],
    ['doprowadzić', 'do-|pro-|wadz|-ić', 'to lead (up) to, bring about', 'PFX:do', 'prowadzić', { ipf: 'doprowadzać', n: '*Doprowadzasz mnie do szału!* = You\'re driving me mad!' }],
    ['odprowadzić', 'od-|pro-|wadz|-ić', 'to walk someone (home), see off', 'PFX:od', 'prowadzić', { ipf: 'odprowadzać', ex: [['{Odprowadzę} cię na dworzec.', 'I\'ll see you off at the station.']] }],
    ['zaprowadzić', 'za-|pro-|wadz|-ić', 'to take, lead (someone somewhere)', 'PFX:za', 'prowadzić', { ipf: 'zaprowadzać' }],
    ['sprowadzić', 's-|pro-|wadz|-ić', 'to bring in, import; (się) to move in', 'PFX:z', 'prowadzić', { ipf: 'sprowadzać' }],
    ['dowodzić', 'do-|wodz|-ić', 'to prove; to command', 'PFX:do', 'wodzić'],
    ['dowód', 'do-|wód', 'proof; ID card', 'NOM:zero', 'dowodzić', { lit: 'what leads (you) to (the truth)', ex: [['Proszę pokazać {dowód} osobisty.', 'Please show your ID card.']], n: '*Dowód osobisty* = identity card ("personal proof").' }],
    ['przewodzić', 'prze-|wodz|-ić', 'to conduct (electricity); to lead (a group)', 'PFX:prze', 'wodzić'],
    ['przewód', 'prze-|wód', 'wire, cable; duct, pipe', 'NOM:zero', 'przewodzić', { lit: 'what leads through', n: '*przewód pokarmowy* = digestive tract.' }],
    ['przewodnik', 'prze-|wod|-nik', 'guide; guidebook', 'SFX:nik', 'przewodzić', { lit: 'one who leads through' }],
    ['bezprzewodowy', 'bez-|prze-|wod|-owy', 'wireless', 'ADJ:neg', 'przewód', { pos: 'adj', lit: 'without-wire-ish' }],
    ['rozwieść się', 'roz-|wieść', 'to get divorced', 'PFX:roz', 'wodzić', { ipf: 'rozwodzić się', lit: 'lead apart' }],
    ['rozwód', 'roz-|wód', 'divorce', 'NOM:zero', 'rozwieść się', { lit: 'a leading-apart' }],
    ['zawieść', 'za-|wieść', 'to let down, disappoint', 'PFX:za', 'wodzić', { ipf: 'zawodzić' }],
    ['zawód', 'za-|wód', 'profession; disappointment', 'NOM:zero', 'zawieść', { n: 'Two meanings to learn: *Jaki masz zawód?* (What do you do for a living?) and *zawód miłosny* (a disappointment in love) — the second is the noun of *zawieść*.' }],
    ['powód', 'po-|wód', 'reason, cause', null, null, { n: '*Z jakiego powodu?* = For what reason? *powodować* = to cause.' }],
    ['wprowadzenie', 'w-|pro-|wadz|-enie', 'introduction', 'NOM:vn', 'wprowadzić'],
    ['przeprowadzka', 'prze-|pro-|wadz|-ka', 'move (to a new home)', 'NOM:ek', 'przeprowadzić się'],
  ],
});

PL.nest({
  id: 'mysl', root: 'myśl- · mysł-', gloss: 'think', cue: 'myśleć',
  roots: { 'myśl': 'think', 'mysł': 'thought' },
  intro: 'Thinking — and the nouns in *-mysł*: an idea is a *po-mysł*, the mind an *u-mysł*, a sense a *z-mysł*, and industry a *prze-mysł*.',
  m: [
    ['myśleć', 'myśl|-eć', 'to think', null, null],
    ['myśl', 'myśl', 'thought', null, null],
    ['pomyśleć', 'po-|myśl|-eć', 'to think (for a moment)', 'PFX:po', 'myśleć', { ex: [['{Pomyśl}, zanim coś powiesz.', 'Think before you say something.']] }],
    ['wymyślić', 'wy-|myśl|-ić', 'to invent, think up, make up', 'PFX:wy', 'myśleć', { ipf: 'wymyślać', ex: [['Kto {wymyślił} internet?', 'Who invented the internet?']], n: 'Note the ending: *wymyślić, domyślić się, zamyślić się, namyślić się* end in *-ić*, but *pomyśleć, przemyśleć* keep *-eć*.' }],
    ['przemyśleć', 'prze-|myśl|-eć', 'to think through, think over', 'PFX:prze', 'myśleć', { ex: [['Muszę to {przemyśleć}.', 'I need to think it over.']] }],
    ['domyślić się', 'do-|myśl|-ić', 'to guess, figure out', 'PFX:do', 'myśleć', { ipf: 'domyślać się', ex: [['Nie {domyśliłem} się, że to ty.', 'I (m.) didn\'t guess it was you.']] }],
    ['zamyślić się', 'za-|myśl|-ić', 'to be lost in thought', 'PFX:za', 'myśleć', { ipf: 'zamyślać się' }],
    ['namyślić się', 'na-|myśl|-ić', 'to think it over, make up one\'s mind', 'PFX:na', 'myśleć', { ipf: 'namyślać się' }],
    ['pomysł', 'po-|mysł', 'idea', 'NOM:zero', 'pomyśleć', { ex: [['Mam świetny {pomysł}!', 'I have a great idea!']] }],
    ['wymysł', 'wy-|mysł', 'fabrication, made-up story', 'NOM:zero', 'wymyślić'],
    ['przemysł', 'prze-|mysł', 'industry', 'NOM:zero', 'przemyśleć', { n: 'Originally "ingenuity, resourcefulness" — just as English *industry* first meant diligence — and then the factories that ingenuity built.' }],
    ['domysł', 'do-|mysł', 'guess, conjecture', 'NOM:zero', 'domyślić się'],
    ['namysł', 'na-|mysł', 'deliberation', 'NOM:zero', 'namyślić się', { n: '*Bez namysłu* = without a second thought.' }],
    ['zmysł', 'z-|mysł', 'sense (the five senses); a feel for', null, null, { n: '*zmysł orientacji* = sense of direction, *zmysł smaku* = sense of taste. (But "sense of humour" is *poczucie humoru*.)' }],
    ['umysł', 'u-|mysł', 'mind', null, null],
    ['bezmyślny', 'bez-|myśl|-ny', 'thoughtless', 'ADJ:neg', 'myśl', { pos: 'adj' }],
  ],
});

PL.nest({
  id: 'slac', root: 'sła- · sył-', gloss: 'send', cue: 'wysłać',
  roots: { 'sła': 'send', 'sył': 'send', 'seł': 'one sent' },
  intro: '*słać* on its own is rare, but its family runs the post office: *wysłać* (send), *przesłać* (forward), *przesyłka* (parcel). Imperfectives in *-syłać*.',
  m: [
    ['słać', 'sła|-ć', 'to send (rare today)', null, null],
    ['wysłać', 'wy-|sła|-ć', 'to send (off)', 'PFX:wy', 'słać', { ipf: 'wysyłać', ex: [['{Wyślij} mi zdjęcia!', 'Send me the photos!'], ['Wczoraj {wysłałem} list.', 'Yesterday I (m.) sent a letter.']] }],
    ['przysłać', 'przy-|sła|-ć', 'to send (to the speaker)', 'PFX:przy', 'słać', { ipf: 'przysyłać', ex: [['Mama {przysłała} mi paczkę.', 'Mum sent me a parcel.']] }],
    ['przesłać', 'prze-|sła|-ć', 'to forward, send on', 'PFX:prze', 'słać', { ipf: 'przesyłać', ex: [['{Prześlę} ci tego maila.', 'I\'ll forward you that email.']] }],
    ['odesłać', 'ode-|sła|-ć', 'to send back', 'PFX:od', 'słać', { ipf: 'odsyłać', ex: [['Muszę {odesłać} te buty.', 'I have to send these shoes back.']] }],
    ['rozesłać', 'roze-|sła|-ć', 'to send out (to many)', 'PFX:roz', 'słać', { ipf: 'rozsyłać' }],
    ['zesłać', 'ze-|sła|-ć', 'to exile, send away', 'PFX:z', 'słać', { ipf: 'zsyłać', n: '*zesłanie* = exile (for example to Siberia).' }],
    ['posłać', 'po-|sła|-ć', 'to send (someone for something)', 'PFX:po', 'słać', { ipf: 'posyłać' }],
    ['przesyłka', 'prze-|sył|-ka', 'parcel, shipment', 'NOM:ek', 'przesyłać', { fm: 'to send on, forward (impf.)' }],
    ['wysyłka', 'wy-|sył|-ka', 'shipping, dispatch', 'NOM:ek', 'wysyłać', { fm: 'to send (off) (impf.)' }],
    ['poseł', 'po-|seł', 'member of parliament; envoy', 'NOM:zero', 'posłać', { lit: 'one who is sent' }],
  ],
});

PL.nest({
  id: 'plyn', root: 'płyn- · pływ-', gloss: 'swim, sail, flow', cue: 'płynąć',
  roots: { 'płyn': 'flow, swim', 'pływ': 'flow' },
  intro: 'Swimming and flowing — including time, which *upływa* (flows away), and influence, which *wpływa* (flows in).',
  m: [
    ['płynąć', 'płyn|-ąć', 'to swim, sail, flow (now, one way)', null, null],
    ['pływać', 'pływ|-ać', 'to swim (in general, regularly)', null, null],
    ['płyn', 'płyn', 'liquid, fluid', null, null],
    ['wpłynąć', 'w-|płyn|-ąć', 'to flow in, sail in; to influence (na)', 'PFX:w', 'płynąć', { ipf: 'wpływać', ex: [['Ta książka bardzo {wpłynęła} na moje życie.', 'This book had a big influence on my life.']] }],
    ['wypłynąć', 'wy-|płyn|-ąć', 'to sail out; to come to the surface', 'PFX:wy', 'płynąć', { ipf: 'wypływać', ex: [['Statek {wypłynął} z portu.', 'The ship sailed out of the harbour.']] }],
    ['przepłynąć', 'prze-|płyn|-ąć', 'to swim across, sail across', 'PFX:prze', 'płynąć', { ipf: 'przepływać', ex: [['{Przepłynąłem} jezioro w godzinę.', 'I (m.) swam across the lake in an hour.']] }],
    ['odpłynąć', 'od-|płyn|-ąć', 'to sail away; to drift off (to sleep)', 'PFX:od', 'płynąć', { ipf: 'odpływać' }],
    ['dopłynąć', 'do-|płyn|-ąć', 'to reach (swimming, by boat)', 'PFX:do', 'płynąć', { ipf: 'dopływać' }],
    ['przypłynąć', 'przy-|płyn|-ąć', 'to arrive (swimming, by boat)', 'PFX:przy', 'płynąć', { ipf: 'przypływać' }],
    ['upłynąć', 'u-|płyn|-ąć', 'to pass, go by (time); to expire', 'PFX:u', 'płynąć', { ipf: 'upływać', ex: [['{Upłynęło} już pięć lat.', 'Five years have already gone by.']] }],
    ['wpływ', 'w-|pływ', 'influence; inflow', 'NOM:zero', 'wpłynąć', { lit: 'an inflow', ex: [['Ona ma na niego zły {wpływ}.', 'She has a bad influence on him.']] }],
    ['przypływ', 'przy-|pływ', 'high tide; surge (of energy)', 'NOM:zero', 'przypłynąć'],
    ['odpływ', 'od-|pływ', 'low tide; drain (in a sink)', 'NOM:zero', 'odpłynąć'],
    ['upływ', 'u-|pływ', 'passage, lapse (of time)', 'NOM:zero', 'upłynąć'],
    ['pływalnia', 'pływ|-alnia', 'swimming pool (indoor)', 'SFX:place', 'pływać'],
    ['płynny', 'płyn|-ny', 'liquid; fluent', 'ADJ:ny', 'płyn', { pos: 'adj', n: '*Mówi płynnie po polsku* = she speaks Polish fluently ("flowingly").' }],
  ],
});

PL.nest({
  id: 'ciag', root: 'ciąg-', gloss: 'pull, draw', cue: 'ciągnąć',
  roots: { 'ciąg': 'pull' },
  intro: 'Pulling: a train (*pociąg*) is literally "a pull", a ski lift (*wyciąg*) "a pull-out".',
  m: [
    ['ciągnąć', 'ciąg|-nąć', 'to pull, drag', null, null],
    ['wyciągnąć', 'wy-|ciąg|-nąć', 'to pull out, take out; to stretch out', 'PFX:wy', 'ciągnąć', { ipf: 'wyciągać', ex: [['Dentysta {wyciągnął} mi ząb.', 'The dentist pulled my tooth out.']], n: '*Wyciągnąć wnioski* = to draw conclusions.' }],
    ['przeciągnąć', 'prze-|ciąg|-nąć', 'to drag across; to drag out (in time)', 'PFX:prze', 'ciągnąć', { ipf: 'przeciągać', n: '*Przeciągnąć się* = to stretch (after waking up).' }],
    ['zaciągnąć', 'za-|ciąg|-nąć', 'to draw (curtains); to drag (somewhere); to take out (a loan)', 'PFX:za', 'ciągnąć', { ipf: 'zaciągać', ex: [['{Zaciągnij} zasłony.', 'Draw the curtains.']] }],
    ['pociągnąć', 'po-|ciąg|-nąć', 'to pull (once), tug', 'PFX:po', 'ciągnąć', { ex: [['{Pociągnij} za sznurek.', 'Pull the string.']] }],
    ['rozciągnąć', 'roz-|ciąg|-nąć', 'to stretch (out)', 'PFX:roz', 'ciągnąć', { ipf: 'rozciągać' }],
    ['pociąg', 'po-|ciąg', 'train', 'NOM:zero', 'pociągnąć', { lit: 'a pull', n: 'The wagons pulled behind the engine. Also "attraction": *mieć pociąg do…* = to be drawn to…' }],
    ['wyciąg', 'wy-|ciąg', 'ski lift; extract; (bank) statement', 'NOM:zero', 'wyciągnąć', { n: 'Something pulled out: a lift pulls you up, an extract is pulled from a text, a statement from your account.' }],
    ['ciąg', 'ciąg', 'sequence, series; draught', null, null],
  ],
});

PL.nest({
  id: 'czyt', root: 'czyt-', gloss: 'read', cue: 'czytać',
  roots: { 'czyt': 'read' },
  intro: 'Reading, from a quick look to getting lost in a book.',
  m: [
    ['czytać', 'czyt|-ać', 'to read', null, null],
    ['przeczytać', 'prze-|czyt|-ać', 'to read (through, to the end)', 'ASP:pf', 'czytać', { gl: ['(done)', 'read', ''], ex: [['Już {przeczytałem} tę książkę.', 'I (m.) have already read this book.']] }],
    ['odczytać', 'od-|czyt|-ać', 'to read out; to decipher', 'PFX:od', 'czytać', { ipf: 'odczytywać', ex: [['Nie mogę {odczytać|przeczytać} jego pisma.', 'I can\'t make out his handwriting.']] }],
    ['doczytać', 'do-|czyt|-ać', 'to read to the end', 'PFX:do', 'czytać', { ipf: 'doczytywać', ex: [['Nie {doczytałem} do końca.', 'I (m.) didn\'t read it to the end.']] }],
    ['wyczytać', 'wy-|czyt|-ać', 'to find out by reading', 'PFX:wy', 'czytać', { ipf: 'wyczytywać', ex: [['Gdzie to {wyczytałeś|przeczytałeś}?', 'Where did you read that? (to a man)']] }],
    ['poczytać', 'po-|czyt|-ać', 'to read for a while', 'PFX:po', 'czytać', { ex: [['Wieczorem chcę trochę {poczytać}.', 'In the evening I want to read for a bit.']] }],
    ['zaczytać się', 'za-|czyt|-ać', 'to get absorbed in reading', 'ASP:sie', 'czytać'],
    ['czytanie', 'czyt|-anie', 'reading', 'NOM:vn', 'czytać'],
    ['czytelnik', 'czyt|-el|-nik', 'reader', 'SFX:nik', 'czytać'],
    ['czytelnia', 'czyt|-el|-nia', 'reading room', 'SFX:place', 'czytać'],
    ['czytelny', 'czyt|-el|-ny', 'legible, readable', 'ADJ:alny', 'czytać', { pos: 'adj' }],
    ['nieczytelny', 'nie-|czyt|-el|-ny', 'illegible', 'ADJ:neg', 'czytelny', { pos: 'adj' }],
  ],
});

PL.nest({
  id: 'rob', root: 'rob- · rab-', gloss: 'do, make, work', cue: 'robić',
  roots: { 'rob': 'work, do', 'rób': 'a making', 'rab': 'work' },
  intro: 'Doing and making. Old *robota* (work) gave the world the word *robot* — via Czech, where it meant forced labour.',
  m: [
    ['robić', 'rob|-ić', 'to do, make', null, null],
    ['zrobić', 'z-|rob|-ić', 'to do, make (pf.)', 'ASP:pf', 'robić', { gl: ['(done)', 'do, make', ''], ex: [['Kto to {zrobił}?', 'Who did this?']] }],
    ['zarobić', 'za-|rob|-ić', 'to earn', 'PFX:za', 'robić', { ipf: 'zarabiać', ex: [['W tym miesiącu {zarobiłem} więcej.', 'This month I (m.) earned more.']] }],
    ['przerobić', 'prze-|rob|-ić', 'to alter, remake; to go through (material)', 'PFX:prze', 'robić', { ipf: 'przerabiać', ex: [['Krawiec {przerobił} mi sukienkę.', 'The tailor altered my dress.']] }],
    ['dorobić', 'do-|rob|-ić', 'to make an extra (copy); to earn extra', 'PFX:do', 'robić', { ipf: 'dorabiać', ex: [['Muszę {dorobić} klucz.', 'I need to get a spare key cut.']] }],
    ['odrobić', 'od-|rob|-ić', 'to make up for; to do (homework)', 'PFX:od', 'robić', { ipf: 'odrabiać', ex: [['Czy {odrobiłeś} lekcje?', 'Have you done your homework? (to a boy)']], n: '*Odrabiać lekcje* = to do homework ("work off the lessons").' }],
    ['narobić', 'na-|rob|-ić', 'to make (a lot of — a mess, noise, trouble)', 'PFX:na', 'robić', { ex: [['Ale {narobiłeś} bałaganu!', 'What a mess you\'ve made! (to a man)']] }],
    ['wyrobić', 'wy-|rob|-ić', 'to produce; to knead (dough); (się) to manage in time', 'PFX:wy', 'robić', { ipf: 'wyrabiać', n: '*Nie wyrabiam!* (colloquial) = I can\'t cope!' }],
    ['robota', 'rob|-ota', 'work, job (colloquial)', null, null, { gl: ['do, work', '(noun)'], n: 'The source of *robot*: Czech *robota* = forced labour.' }],
    ['robotnik', 'rob|-ot|-nik', 'worker (manual)', 'SFX:nik', 'robota'],
    ['zarobki', 'za-|rob|-ki', 'earnings, wages', 'NOM:ek', 'zarobić'],
    ['wyrób', 'wy-|rób', 'product (made)', 'NOM:zero', 'wyrobić'],
    ['przeróbka', 'prze-|rób|-ka', 'alteration, conversion', 'NOM:ek', 'przerobić'],
  ],
});

PL.nest({
  id: 'glad', root: 'gląd- · patrz- · -jrzeć', gloss: 'look', cue: 'oglądać',
  roots: { 'patrz': 'look', 'gląd': 'look', 'jrz': 'look' },
  intro: 'Three roots for looking: *patrzeć* (look), the imperfective *-glądać* and the perfective *-jrzeć* (*oglądać / obejrzeć*). Swap the prefix and the meaning shifts: *wyglądać* (look like), *przeglądać* (browse), *zaglądać* (peek in).',
  m: [
    ['patrzeć', 'patrz|-eć', 'to look', null, null],
    ['popatrzeć', 'po-|patrz|-eć', 'to have a look, look for a while', 'PFX:po', 'patrzeć', { ex: [['{Popatrz} na to!', 'Look at this!']] }],
    ['oglądać', 'o-|gląd|-ać', 'to watch (TV, a film); to look over', 'PFX:o', null, { lit: 'look all over', ex: [['Wieczorem {oglądamy} film.', 'In the evening we watch a film.']] }],
    ['obejrzeć', 'obe-|jrz|-eć', 'to watch, see (pf.); to examine', 'ASP:pairs', 'oglądać', { ex: [['Czy {obejrzałeś} ten film?', 'Have you watched this film? (to a man)']], n: 'The perfective partner of *oglądać* comes from another old verb, *-jrzeć* (to look).' }],
    ['wyglądać', 'wy-|gląd|-ać', 'to look (like), appear; to look out', 'PFX:wy', 'oglądać', { ex: [['Pięknie dziś {wyglądasz}!', 'You look beautiful today!'], ['Jak on {wygląda}?', 'What does he look like?']] }],
    ['przeglądać', 'prze-|gląd|-ać', 'to look through, browse; to review', 'PFX:prze', 'oglądać', { ex: [['Codziennie {przeglądam} wiadomości.', 'I look through the news every day.']] }],
    ['zaglądać', 'za-|gląd|-ać', 'to peek, look in; to drop in', 'PFX:za', 'oglądać', { ex: [['Nie {zaglądaj} mi przez ramię!', 'Don\'t look over my shoulder!']] }],
    ['rozglądać się', 'roz-|gląd|-ać', 'to look around', 'PFX:roz', 'oglądać', { ex: [['Turyści {rozglądają} się po rynku.', 'The tourists are looking around the market square.']] }],
    ['przyglądać się', 'przy-|gląd|-ać', 'to watch closely, study', 'PFX:przy', 'oglądać', { ex: [['Dlaczego mi się tak {przyglądasz}?', 'Why are you staring at me like that?']] }],
    ['wygląd', 'wy-|gląd', 'appearance, looks', 'NOM:zero', 'wyglądać'],
    ['przegląd', 'prze-|gląd', 'review; inspection, check-up', 'NOM:zero', 'przeglądać', { n: '*Przegląd techniczny* = vehicle inspection.' }],
    ['przeglądarka', 'prze-|gląd|-arka', 'web browser', 'SFX:tool', 'przeglądać', { lit: 'a looking-through machine' }],
    ['pogląd', 'po-|gląd', 'view, opinion', null, null, { n: '*poglądy polityczne* = political views.' }],
    ['światopogląd', 'świat|-o-|po-|gląd', 'world view', 'CMP:calque', null, { lit: 'world-view', n: 'A calque of German *Weltanschauung*.' }],
  ],
});

PL.nest({
  id: 'kup', root: 'kup-', gloss: 'buy', cue: 'kupić',
  roots: { 'kup': 'buy' },
  intro: 'Buying — and bribing, which is "buying over" (*przekupić*).',
  m: [
    ['kupić', 'kup|-ić', 'to buy (pf.)', null, null],
    ['kupować', 'kup|-ować', 'to buy (impf.)', null, null],
    ['wykupić', 'wy-|kup|-ić', 'to buy up, buy out; to take out (insurance)', 'PFX:wy', 'kupić', { ipf: 'wykupywać', ex: [['Musisz {wykupić} ubezpieczenie.', 'You have to take out insurance.']] }],
    ['odkupić', 'od-|kup|-ić', 'to buy back; to replace (by buying a new one)', 'PFX:od', 'kupić', { ipf: 'odkupywać', ex: [['Zgubiłem twoją książkę, ale ci ją {odkupię}.', 'I (m.) lost your book, but I\'ll buy you a new one.']] }],
    ['dokupić', 'do-|kup|-ić', 'to buy some more', 'PFX:do', 'kupić', { ipf: 'dokupywać', ex: [['Trzeba {dokupić} chleba.', 'We need to buy some more bread.']] }],
    ['przekupić', 'prze-|kup|-ić', 'to bribe', 'PFX:prze', 'kupić', { ipf: 'przekupywać', lit: 'buy over' }],
    ['zakupić', 'za-|kup|-ić', 'to purchase (formal)', 'PFX:za', 'kupić', { ipf: 'zakupywać' }],
    ['zakupy', 'za-|kup|-y', 'shopping', 'NOM:zero', 'zakupić', { ex: [['Idę na {zakupy}.', 'I\'m going shopping.']] }],
    ['wykup', 'wy-|kup', 'buyout; redemption', 'NOM:zero', 'wykupić'],
    ['kupiec', 'kup|-iec', 'merchant', 'SFX:agent', 'kupić'],
    ['przekupny', 'prze-|kup|-ny', 'corruptible, bribable', 'ADJ:alny', 'przekupić', { pos: 'adj' }],
  ],
});

PL.nest({
  id: 'ucz', root: 'ucz- · uk-', gloss: 'teach, learn', cue: 'uczyć',
  roots: { 'ucz': 'teach, learn', 'uk': 'learning' },
  intro: '*uczyć* = to teach, *uczyć się* = to learn ("to teach oneself"). The *cz / k* alternation links *uczyć* to *nauka* (science).',
  m: [
    ['uczyć', 'ucz|-yć', 'to teach; (się) to learn', null, null],
    ['nauczyć', 'na-|ucz|-yć', 'to teach (pf.); (się) to learn (pf.)', 'ASP:pf', 'uczyć', { gl: ['(done)', 'teach', ''], ex: [['Kto cię {nauczył} grać na gitarze?', 'Who taught you to play the guitar?']] }],
    ['oduczyć się', 'od-|ucz|-yć', 'to unlearn, get out of (a habit)', 'PFX:od', 'uczyć', { ipf: 'oduczać się', ex: [['Muszę się {oduczyć} jedzenia w nocy.', 'I have to get out of the habit of eating at night.']] }],
    ['douczyć się', 'do-|ucz|-yć', 'to catch up on learning', 'PFX:do', 'uczyć', { ipf: 'douczać się' }],
    ['wyuczyć się', 'wy-|ucz|-yć', 'to learn thoroughly (off by heart)', 'PFX:wy', 'uczyć', { n: '*wyuczony zawód* = the profession you trained for.' }],
    ['nauczyciel', 'na-|ucz|-yciel', 'teacher', 'SFX:agent', 'nauczyć'],
    ['uczeń', 'ucz|-eń', 'pupil', 'SFX:agent', 'uczyć'],
    ['nauka', 'na-|uk|-a', 'science; learning; lesson', 'NOM:zero', 'nauczyć', { n: 'The *cz / k* switch: *uczyć* but *nauka* (compare *ręka / ręczny*).' }],
    ['naukowiec', 'na-|uk|-owiec', 'scientist', 'SFX:agent', 'nauka'],
    ['uczelnia', 'ucz|-el|-nia', 'university, college', 'SFX:place', 'uczyć'],
    ['nauczka', 'na-|ucz|-ka', 'a lesson (learned the hard way)', 'NOM:ek', 'nauczyć', { n: '*To dla ciebie nauczka!* = Let that be a lesson to you!' }],
  ],
});

PL.nest({
  id: 'myc', root: 'my-', gloss: 'wash', cue: 'myć',
  roots: { 'my': 'wash', 'myw': 'wash', 'myj': 'wash' },
  intro: 'Washing — including soap (*mydło*, "washing-tool") and the dishwasher (*zmywarka*, "wash-off machine").',
  m: [
    ['myć', 'my|-ć', 'to wash', null, null],
    ['umyć', 'u-|my|-ć', 'to wash (pf.)', 'ASP:pf', 'myć', { gl: ['(done)', 'wash', ''], ex: [['Obiad gotowy, {umyj} ręce!', 'Lunch is ready, wash your hands!']] }],
    ['zmyć', 'z-|my|-ć', 'to wash off; to do the dishes', 'PFX:z', 'myć', { ipf: 'zmywać', ex: [['Kto {zmyje|umyje} naczynia?', 'Who\'s going to do the dishes?']], n: '*Zmywać* = to wash up ("wash off" the plates).' }],
    ['przemyć', 'prze-|my|-ć', 'to rinse, bathe (a wound)', 'PFX:prze', 'myć', { ipf: 'przemywać' }],
    ['wymyć', 'wy-|my|-ć', 'to wash out (thoroughly)', 'PFX:wy', 'myć', { ipf: 'wymywać' }],
    ['mydło', 'my|-dło', 'soap', 'SFX:tool', 'myć', { lit: 'washing-tool' }],
    ['zmywarka', 'z-|myw|-arka', 'dishwasher', 'SFX:tool', 'zmyć'],
    ['myjnia', 'myj|-nia', 'car wash', 'SFX:place', 'myć'],
    ['umywalka', 'u-|myw|-alka', 'washbasin', 'SFX:tool', 'umyć'],
    ['mycie', 'my|-cie', 'washing', 'NOM:vn', 'myć'],
  ],
});

PL.nest({
  id: 'sie', root: 'prefix + się', gloss: 'twists with się', mod: 'prefixes',
  intro: 'Add a prefix and *się* to an ordinary verb and you get a whole new nuance: *najeść się* (eat your fill), *wyspać się* (sleep enough), *rozpłakać się* (burst into tears), *zakochać się* (fall in love).',
  m: [
    ['najeść się', 'na-|jeść| się', 'to eat one\'s fill', 'ASP:sie', 'jeść', { ex: [['{Najadłem} się do syta.', 'I\'ve (m.) eaten my fill.']] }],
    ['wyspać się', 'wy-|spać| się', 'to get enough sleep', 'ASP:sie', 'spać', { ex: [['Wreszcie się {wyspałam}!', 'I (f.) finally got a good night\'s sleep!']] }],
    ['rozpłakać się', 'roz-|płakać| się', 'to burst into tears', 'ASP:sie', 'płakać', { ex: [['Dziecko {rozpłakało} się.', 'The child burst into tears.']] }],
    ['zakochać się', 'za-|kochać| się', 'to fall in love', 'ASP:sie', 'kochać', { ex: [['{Zakochałem} się w niej od razu.', 'I (m.) fell in love with her straight away.']] }],
    ['zasiedzieć się', 'za-|siedzieć| się', 'to stay too long (as a guest)', 'ASP:sie', 'siedzieć', { ex: [['Przepraszam, {zasiedzieliśmy|zasiedziałyśmy} się!', 'Sorry, we\'ve stayed too long!']] }],
    ['naczekać się', 'na-|czekać| się', 'to wait a long time', 'ASP:sie', 'czekać', { ex: [['Ale się {naczekałem}!', 'I (m.) had to wait so long!']] }],
    ['nagadać się', 'na-|gadać| się', 'to talk to one\'s heart\'s content', 'ASP:sie', 'gadać'],
    ['rozchorować się', 'roz-|chorować| się', 'to fall (badly) ill', 'ASP:sie', 'chorować'],
    ['napić się', 'na-|pić| się', 'to have a drink', 'ASP:sie', 'pić', { nodecode: true }],
  ],
});

/* ══ Sentences: choosing the aspect ══ */

PL.items('ASP:choice', [
  ['czytać / przeczytać', 'Co wieczór {czytam} dzieciom bajkę.', 'Every evening I read the children a story.', { n: 'Every evening = repeated → imperfective.' }],
  ['czytać / przeczytać', 'Wczoraj {przeczytałem} całą książkę.', 'Yesterday I (m.) read the whole book.', { n: 'The whole book, finished → perfective.' }],
  ['pisać / napisać', 'Kiedy zadzwoniłeś, {pisałam} list.', 'When you called, I (f.) was writing a letter.', { n: 'In progress when something else happened → imperfective.' }],
  ['pisać / napisać', 'Jutro {napiszę} do niej.', 'I\'ll write to her tomorrow.', { n: 'One future event → perfective (its present form is the future).' }],
  ['robić / zrobić', 'Co teraz {robisz}?', 'What are you doing now?'],
  ['robić / zrobić', 'Już {zrobiłam} zakupy.', 'I (f.) have already done the shopping.'],
  ['kupować / kupić', 'Zawsze {kupuję} chleb w tym sklepie.', 'I always buy bread in this shop.'],
  ['kupować / kupić', 'Wczoraj {kupiłem} nowy telefon.', 'Yesterday I (m.) bought a new phone.'],
  ['jeść / zjeść', '{Zjedz} zupę, zanim wystygnie.', 'Eat up your soup before it gets cold.'],
  ['jeść / zjeść', 'Nie przeszkadzaj, {jem}.', 'Don\'t disturb me, I\'m eating.'],
  ['pić / wypić', 'Kto {wypił} całe mleko?', 'Who drank all the milk?'],
  ['brać / wziąć', 'Zawsze {biorę} ze sobą parasol.', 'I always take an umbrella with me.'],
  ['brać / wziąć', '{Weź} ze sobą parasol!', 'Take an umbrella with you!'],
  ['mówić / powiedzieć', 'Nic nie {powiedział} i wyszedł.', 'He didn\'t say a word and left.', { n: 'One completed act in a sequence → perfective.' }],
  ['mówić / powiedzieć', 'On {mówi} za szybko.', 'He speaks too fast.'],
  ['oglądać / obejrzeć', 'Co wieczór {oglądamy} wiadomości.', 'Every evening we watch the news.'],
]);
