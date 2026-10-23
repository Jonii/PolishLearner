/* ═══════════════════════════════════════════════════════════════
   data/lex-nouns.js — Nouns with complete paradigms + noun patterns

   Forms in case order:  NOM GEN DAT ACC INS LOC VOC
   Variants with "/", missing forms with "-".
   g: m1 masc. personal · m2 masc. animate · m3 masc. inanimate
      f feminine · n neuter · pt plural only
   cls: the declension pattern shown by the F1 "table" hint
   ═══════════════════════════════════════════════════════════════ */

/* ── Patterns (endings + model words) ── */

PL.pattern('n-m-hard', {
  t: 'Masculine nouns, hard stem (dom, stół)', kind: 'noun',
  sg: ['—', '-u / -a', '-owi', '= NOM', '-em', '-e* / -u', '-e* / -u'],
  pl: ['-y / -i', '-ów', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['dom', 'stół', 'samochód', 'sklep'],
  note: 'GEN sg is *-u* for most things (domu, stołu) but *-a* for many everyday words (chleba, sera, Krakowa). LOC/VOC *-e* softens the stem: t→cie (świecie), d→dzie (ogrodzie), ł→le (stole), r→rze (serze), s→sie (lesie); after k, g, ch it is *-u* (w parku). *ó* in the dictionary form often becomes *o* once an ending is added: stół → stołu.',
});

PL.pattern('n-m-soft', {
  t: 'Masculine nouns, soft stem (klucz, pokój)', kind: 'noun',
  sg: ['—', '-a / -u', '-owi', '= NOM', '-em', '-u', '-u'],
  pl: ['-e', '-y / -i / -ów', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['klucz', 'pokój', 'kraj'],
  note: 'Stems ending in a soft or "historically soft" consonant (cz, sz, rz, ż, c, dz, j, l, ń, ś, ć…) take *-u* in LOC and *-e* in the plural.',
});

PL.pattern('n-m-anim', {
  t: 'Masculine animals (kot, pies)', kind: 'noun',
  sg: ['—', '-a', '-u / -owi', '= GEN', '-em', '-e* / -u', '-e* / -u'],
  pl: ['-y / -i', '-ów / -i', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['kot', 'pies', 'ptak'],
  note: 'Animate masculine nouns use the **genitive form for the accusative** in the singular: widzę kota, mam psa. In the plural only people do that; animals go back to ACC = NOM (widzę koty).',
});

PL.pattern('n-m-pers', {
  t: 'Masculine nouns for people (student, Polak)', kind: 'noun',
  sg: ['—', '-a', '-owi / -u', '= GEN', '-em', '-e* / -u', '-e* / -u'],
  pl: ['-i / -y / -owie / -e', '-ów / -i / -y', '-om', '= GEN', '-ami', '-ach', '= NOM'],
  models: ['student', 'Polak', 'lekarz', 'pan'],
  note: 'Men: ACC = GEN in **both** numbers (znam tych studentów). The plural nominative has its own "virile" endings with consonant changes: student → studenci (t→ci), Polak → Polacy (k→c), sąsiad → sąsiedzi (d→dzi); some take *-owie* (panowie, synowie) or *-e* (lekarze).',
});

PL.pattern('n-m-a', {
  t: 'Masculine nouns in -a (mężczyzna, kierowca)', kind: 'noun',
  sg: ['-a', '-y / -i', '-e* / -y', '-ę', '-ą', '-e* / -y', '-o'],
  pl: ['-i / -y', '-ów / —', '-om', '= GEN', '-ami', '-ach', '= NOM'],
  models: ['mężczyzna', 'kierowca', 'kolega'],
  note: 'Men whose nouns end in -a decline like feminine nouns in the singular, but adjectives stay masculine: *ten miły kierowca*.',
});

PL.pattern('n-f-a', {
  t: 'Feminine nouns in -a (kobieta, szkoła)', kind: 'noun',
  sg: ['-a', '-y / -i', '-e*', '-ę', '-ą', '-e*', '-o'],
  pl: ['-y / -i', '— (zero)', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['kobieta', 'szkoła', 'mama', 'książka'],
  note: '*-e in DAT and LOC softens the consonant before it: t→cie (kobiecie), d→dzie (wodzie), ł→le (szkole), r→rze (siostrze), k→ce (książce), g→dze (nodze). Genitive plural has **no ending**, often with a vowel inserted: książka → książek, matka → matek, or ó: noga → nóg.',
});

PL.pattern('n-f-soft', {
  t: 'Feminine nouns in -a, soft stem (ulica, praca, lekcja)', kind: 'noun',
  sg: ['-a', '-y / -i', '-y / -i', '-ę', '-ą', '-y / -i', '-o / -u'],
  pl: ['-e', '— / -i / -y', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['ulica', 'praca', 'lekcja', 'kuchnia'],
  note: 'After soft or hard-sounding c, cz, sz, rz, j: GEN = DAT = LOC (ulicy, lekcji). Names and pet names in -ia/-sia take *-u* in the vocative: Kasiu, babciu.',
});

PL.pattern('n-f-cons', {
  t: 'Feminine nouns ending in a consonant (noc, rzecz, miłość)', kind: 'noun',
  sg: ['—', '-y / -i', '-y / -i', '= NOM', '-ą', '-y / -i', '-y / -i'],
  pl: ['-e / -y / -i', '-y / -i', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['noc', 'rzecz', 'miłość'],
  note: 'All abstract nouns in *-ość* belong here (miłość, radość, młodość): GEN/DAT/LOC *-ości*, INS *-ością*.',
});

PL.pattern('n-n-o', {
  t: 'Neuter nouns in -o (okno, miasto)', kind: 'noun',
  sg: ['-o', '-a', '-u', '= NOM', '-em', '-e* / -u', '= NOM'],
  pl: ['-a', '— (zero)', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['okno', 'miasto', 'piwo', 'kino'],
  note: 'LOC *-e* softens like masculine nouns (w mieście, w kinie, w biurze); after k, g, ch it is *-u* (w łóżku). GEN plural has no ending: okien, miast, piw.',
});

PL.pattern('n-n-e', {
  t: 'Neuter nouns in -e / -ie (mieszkanie, morze)', kind: 'noun',
  sg: ['-e', '-a', '-u', '= NOM', '-em', '-u', '= NOM'],
  pl: ['-a', '— / -i', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['mieszkanie', 'morze', 'zdjęcie'],
  note: 'All verbal nouns in *-nie / -cie* (pytanie, mieszkanie, życie) belong here. GEN plural: mieszkań, pytań, zdjęć, mórz.',
});

PL.pattern('n-pt', {
  t: 'Plural-only nouns (drzwi, pieniądze, urodziny)', kind: 'noun',
  pl: ['-y / -e / -i', '-ów / zero / -i / -y', '-om', '= NOM', '-ami', '-ach', '= NOM'],
  models: ['drzwi', 'urodziny', 'wakacje', 'pieniądze'],
  note: 'Some things only exist in the plural, even when there is just one: *jedne drzwi* (one door), *te urodziny*.',
});

/* ── Masculine inanimate ── */

PL.noun('dom', { g: 'm3', m: 'house, home', cls: 'n-m-hard',
  sg: 'dom domu domowi dom domem domu domie',
  pl: 'domy domów domom domy domami domach domy',
  note: '*Do domu* = (going) home, *w domu* = at home. LOC is *domu*, not *domie*.' });
PL.noun('samochód', { g: 'm3', m: 'car', cls: 'n-m-hard',
  sg: 'samochód samochodu samochodowi samochód samochodem samochodzie samochodzie',
  pl: 'samochody samochodów samochodom samochody samochodami samochodach samochody',
  note: '*ó* becomes *o* as soon as an ending follows: samochodu, samochodem.' });
PL.noun('stół', { g: 'm3', m: 'table', cls: 'n-m-hard',
  sg: 'stół stołu stołowi stół stołem stole stole',
  pl: 'stoły stołów stołom stoły stołami stołach stoły',
  note: 'ó → o before endings (stołu), and ł → l in the locative: *na stole*.' });
PL.noun('sklep', { g: 'm3', m: 'shop', cls: 'n-m-hard',
  sg: 'sklep sklepu sklepowi sklep sklepem sklepie sklepie',
  pl: 'sklepy sklepów sklepom sklepy sklepami sklepach sklepy' });
PL.noun('chleb', { g: 'm3', m: 'bread', cls: 'n-m-hard',
  sg: 'chleb chleba chlebowi chleb chlebem chlebie chlebie',
  pl: 'chleby chlebów chlebom chleby chlebami chlebach chleby' });
PL.noun('ser', { g: 'm3', m: 'cheese', cls: 'n-m-hard',
  sg: 'ser sera serowi ser serem serze serze',
  pl: 'sery serów serom sery serami serach sery' });
PL.noun('czas', { g: 'm3', m: 'time', cls: 'n-m-hard',
  sg: 'czas czasu czasowi czas czasem czasie czasie',
  pl: 'czasy czasów czasom czasy czasami czasach czasy' });
PL.noun('list', { g: 'm3', m: 'letter (mail)', cls: 'n-m-hard',
  sg: 'list listu listowi list listem liście liście',
  pl: 'listy listów listom listy listami listach listy' });
PL.noun('ogród', { g: 'm3', m: 'garden', cls: 'n-m-hard',
  sg: 'ogród ogrodu ogrodowi ogród ogrodem ogrodzie ogrodzie',
  pl: 'ogrody ogrodów ogrodom ogrody ogrodami ogrodach ogrody' });
PL.noun('kościół', { g: 'm3', m: 'church', cls: 'n-m-hard',
  sg: 'kościół kościoła kościołowi kościół kościołem kościele kościele',
  pl: 'kościoły kościołów kościołom kościoły kościołami kościołach kościoły',
  note: 'ó → o (kościoła) and ł → l in the locative: *w kościele*.' });
PL.noun('telefon', { g: 'm3', m: 'phone', cls: 'n-m-hard',
  sg: 'telefon telefonu telefonowi telefon telefonem telefonie telefonie',
  pl: 'telefony telefonów telefonom telefony telefonami telefonach telefony' });
PL.noun('park', { g: 'm3', m: 'park', cls: 'n-m-hard',
  sg: 'park parku parkowi park parkiem parku parku',
  pl: 'parki parków parkom parki parkami parkach parki' });
PL.noun('pociąg', { g: 'm3', m: 'train', cls: 'n-m-hard',
  sg: 'pociąg pociągu pociągowi pociąg pociągiem pociągu pociągu',
  pl: 'pociągi pociągów pociągom pociągi pociągami pociągach pociągi' });
PL.noun('autobus', { g: 'm3', m: 'bus', cls: 'n-m-hard',
  sg: 'autobus autobusu autobusowi autobus autobusem autobusie autobusie',
  pl: 'autobusy autobusów autobusom autobusy autobusami autobusach autobusy' });
PL.noun('obiad', { g: 'm3', m: 'lunch, dinner (main meal)', cls: 'n-m-hard',
  sg: 'obiad obiadu obiadowi obiad obiadem obiedzie obiedzie',
  pl: 'obiady obiadów obiadom obiady obiadami obiadach obiady',
  note: 'a → e in the locative: *po obiedzie* (after lunch).' });
PL.noun('las', { g: 'm3', m: 'forest', cls: 'n-m-hard',
  sg: 'las lasu lasowi las lasem lesie lesie',
  pl: 'lasy lasów lasom lasy lasami lasach lasy',
  note: 'a → e in the locative: *w lesie*.' });
PL.noun('świat', { g: 'm3', m: 'world', cls: 'n-m-hard',
  sg: 'świat świata światu świat światem świecie świecie',
  pl: 'światy światów światom światy światami światach światy',
  note: 'Irregular dative *światu*; locative *na świecie* (a → e, t → ci).' });
PL.noun('sen', { g: 'm3', m: 'sleep; dream', cls: 'n-m-hard',
  sg: 'sen snu snowi sen snem śnie śnie',
  pl: 'sny snów snom sny snami snach sny',
  note: 'The *e* of *sen* disappears in every other form (snu, sny) — a "fleeting e". Locative: *we śnie* (in a dream).' });
PL.noun('dzień', { g: 'm3', m: 'day', cls: 'n-m-soft',
  sg: 'dzień dnia dniowi dzień dniem dniu dniu',
  pl: 'dni/dnie dni dniom dni/dnie dniami dniach dni/dnie',
  note: 'Fleeting *e* and a changed stem: dnia, dniu; plural dni. *Dzień dobry* = good day.' });
PL.noun('tydzień', { g: 'm3', m: 'week', cls: 'n-m-soft',
  sg: 'tydzień tygodnia tygodniowi tydzień tygodniem tygodniu tygodniu',
  pl: 'tygodnie tygodni tygodniom tygodnie tygodniami tygodniach tygodnie',
  note: 'The stem changes completely outside the nominative: tygodnia, tygodniu.' });
PL.noun('rok', { g: 'm3', m: 'year', cls: 'n-m-hard',
  sg: 'rok roku rokowi rok rokiem roku roku',
  pl: 'lata lat latom lata latami latach lata',
  note: 'The plural is a different word: *lata* (literally "summers"): dwa lata, pięć lat.' });
PL.noun('pokój', { g: 'm3', m: 'room; peace', cls: 'n-m-soft',
  sg: 'pokój pokoju pokojowi pokój pokojem pokoju pokoju',
  pl: 'pokoje pokoi/pokojów pokojom pokoje pokojami pokojach pokoje',
  note: 'ó → o before endings: pokoju, w pokoju.' });
PL.noun('klucz', { g: 'm3', m: 'key', cls: 'n-m-soft',
  sg: 'klucz klucza kluczowi klucz kluczem kluczu kluczu',
  pl: 'klucze kluczy kluczom klucze kluczami kluczach klucze' });
PL.noun('kraj', { g: 'm3', m: 'country', cls: 'n-m-soft',
  sg: 'kraj kraju krajowi kraj krajem kraju kraju',
  pl: 'kraje krajów krajom kraje krajami krajach kraje' });
PL.noun('Kraków', { g: 'm3', m: 'Kraków (city)', cls: 'n-m-hard',
  sg: 'Kraków Krakowa Krakowowi Kraków Krakowem Krakowie Krakowie',
  note: 'Many city names take *-a* in the genitive: do Krakowa, do Gdańska.' });
PL.noun('Gdańsk', { g: 'm3', m: 'Gdańsk (city)', cls: 'n-m-hard',
  sg: 'Gdańsk Gdańska Gdańskowi Gdańsk Gdańskiem Gdańsku Gdańsku' });

/* ── Masculine animate (animals) ── */

PL.noun('pies', { g: 'm2', m: 'dog', cls: 'n-m-anim',
  sg: 'pies psa psu psa psem psie psie',
  pl: 'psy psów psom psy psami psach psy',
  note: 'The *ie* of *pies* disappears in every other form: psa, psu, psem — a "fleeting e".' });
PL.noun('kot', { g: 'm2', m: 'cat', cls: 'n-m-anim',
  sg: 'kot kota kotu kota kotem kocie kocie',
  pl: 'koty kotów kotom koty kotami kotach koty',
  note: 'Dative *kotu* (not kotowi); locative *o kocie* (t → ci).' });
PL.noun('ptak', { g: 'm2', m: 'bird', cls: 'n-m-anim',
  sg: 'ptak ptaka ptakowi ptaka ptakiem ptaku ptaku',
  pl: 'ptaki ptaków ptakom ptaki ptakami ptakach ptaki' });
PL.noun('koń', { g: 'm2', m: 'horse', cls: 'n-m-anim',
  sg: 'koń konia koniowi konia koniem koniu koniu',
  pl: 'konie koni koniom konie końmi koniach konie',
  note: '*ń* is written *ni* before a vowel ending (konia, koniem); instrumental plural *końmi*.' });

/* ── Masculine personal ── */

PL.noun('brat', { g: 'm1', m: 'brother', cls: 'n-m-pers',
  sg: 'brat brata bratu brata bratem bracie bracie',
  pl: 'bracia braci braciom braci braćmi braciach bracia',
  note: 'Irregular plural: *bracia, braci, braćmi*; dative singular *bratu*.' });
PL.noun('student', { g: 'm1', m: 'student (male)', cls: 'n-m-pers',
  sg: 'student studenta studentowi studenta studentem studencie studencie',
  pl: 'studenci studentów studentom studentów studentami studentach studenci' });
PL.noun('pan', { g: 'm1', m: 'gentleman, Mr; "you" (polite, to a man)', cls: 'n-m-pers',
  sg: 'pan pana panu pana panem panu panie',
  pl: 'panowie panów panom panów panami panach panowie',
  note: 'Dative and locative *panu*; vocative *panie* (*Panie Janie!*). As a polite "you": *Czy pan wie…?*' });
PL.noun('lekarz', { g: 'm1', m: 'doctor', cls: 'n-m-pers',
  sg: 'lekarz lekarza lekarzowi lekarza lekarzem lekarzu lekarzu',
  pl: 'lekarze lekarzy lekarzom lekarzy lekarzami lekarzach lekarze' });
PL.noun('Polak', { g: 'm1', m: 'Pole (a Polish man)', cls: 'n-m-pers',
  sg: 'Polak Polaka Polakowi Polaka Polakiem Polaku Polaku',
  pl: 'Polacy Polaków Polakom Polaków Polakami Polakach Polacy',
  note: 'Virile plural: k → c, *Polacy*.' });
PL.noun('przyjaciel', { g: 'm1', m: 'friend (close)', cls: 'n-m-pers',
  sg: 'przyjaciel przyjaciela przyjacielowi przyjaciela przyjacielem przyjacielu przyjacielu',
  pl: 'przyjaciele przyjaciół przyjaciołom przyjaciół przyjaciółmi przyjaciołach przyjaciele',
  note: 'Irregular plural: *przyjaciele, przyjaciół, przyjaciółmi*.' });
PL.noun('człowiek', { g: 'm1', m: 'person, human being', cls: 'n-m-pers',
  sg: 'człowiek człowieka człowiekowi człowieka człowiekiem człowieku człowieku',
  pl: 'ludzie ludzi ludziom ludzi ludźmi ludziach ludzie',
  note: 'The plural is a different word: *ludzie* (people), *ludzi*, *ludźmi*.' });
PL.noun('syn', { g: 'm1', m: 'son', cls: 'n-m-pers',
  sg: 'syn syna synowi syna synem synu synu',
  pl: 'synowie synów synom synów synami synach synowie',
  note: 'Locative and vocative *synu*; plural *synowie*.' });
PL.noun('ojciec', { g: 'm1', m: 'father', cls: 'n-m-pers',
  sg: 'ojciec ojca ojcu ojca ojcem ojcu ojcze',
  pl: 'ojcowie ojców ojcom ojców ojcami ojcach ojcowie',
  note: 'Fleeting *ie*: ojca, ojcu; vocative *ojcze*.' });
PL.noun('chłopiec', { g: 'm1', m: 'boy', cls: 'n-m-pers',
  sg: 'chłopiec chłopca chłopcu chłopca chłopcem chłopcu chłopcze',
  pl: 'chłopcy chłopców chłopcom chłopców chłopcami chłopcach chłopcy',
  note: 'Fleeting *ie*: chłopca; vocative *chłopcze*.' });
PL.noun('nauczyciel', { g: 'm1', m: 'teacher (male)', cls: 'n-m-pers',
  sg: 'nauczyciel nauczyciela nauczycielowi nauczyciela nauczycielem nauczycielu nauczycielu',
  pl: 'nauczyciele nauczycieli nauczycielom nauczycieli nauczycielami nauczycielach nauczyciele' });
PL.noun('sąsiad', { g: 'm1', m: 'neighbour (male)', cls: 'n-m-pers',
  sg: 'sąsiad sąsiada sąsiadowi sąsiada sąsiadem sąsiedzie sąsiedzie',
  pl: 'sąsiedzi sąsiadów sąsiadom sąsiadów sąsiadami sąsiadach sąsiedzi',
  note: 'a → e before the soft ending: *o sąsiedzie*, plural *sąsiedzi*.' });
PL.noun('mężczyzna', { g: 'm1', m: 'man', cls: 'n-m-a',
  sg: 'mężczyzna mężczyzny mężczyźnie mężczyznę mężczyzną mężczyźnie mężczyzno',
  pl: 'mężczyźni mężczyzn mężczyznom mężczyzn mężczyznami mężczyznach mężczyźni' });
PL.noun('kierowca', { g: 'm1', m: 'driver', cls: 'n-m-a',
  sg: 'kierowca kierowcy kierowcy kierowcę kierowcą kierowcy kierowco',
  pl: 'kierowcy kierowców kierowcom kierowców kierowcami kierowcach kierowcy' });
PL.noun('kolega', { g: 'm1', m: 'friend, colleague (male)', cls: 'n-m-a',
  sg: 'kolega kolegi koledze kolegę kolegą koledze kolego',
  pl: 'koledzy kolegów kolegom kolegów kolegami kolegach koledzy',
  note: 'g → dz before *-e*: *koledze*, plural *koledzy*.' });
PL.noun('Marek', { g: 'm1', m: 'Marek (name)', cls: 'n-m-pers',
  sg: 'Marek Marka Markowi Marka Markiem Marku Marku',
  note: 'Fleeting *e*: Marka, Markowi.' });
PL.noun('Piotr', { g: 'm1', m: 'Piotr (name)', cls: 'n-m-pers',
  sg: 'Piotr Piotra Piotrowi Piotra Piotrem Piotrze Piotrze' });
PL.noun('Jan', { g: 'm1', m: 'Jan (name)', cls: 'n-m-pers',
  sg: 'Jan Jana Janowi Jana Janem Janie Janie' });
PL.noun('Tomek', { g: 'm1', m: 'Tomek (name; short for Tomasz)', cls: 'n-m-pers',
  sg: 'Tomek Tomka Tomkowi Tomka Tomkiem Tomku Tomku' });

/* ── Feminine ── */

PL.noun('kobieta', { g: 'f', m: 'woman', cls: 'n-f-a',
  sg: 'kobieta kobiety kobiecie kobietę kobietą kobiecie kobieto',
  pl: 'kobiety kobiet kobietom kobiety kobietami kobietach kobiety' });
PL.noun('książka', { g: 'f', m: 'book', cls: 'n-f-a',
  sg: 'książka książki książce książkę książką książce książko',
  pl: 'książki książek książkom książki książkami książkach książki',
  note: 'k → c before *-e*: *w książce*; genitive plural *książek* (an *e* slips in).' });
PL.noun('mama', { g: 'f', m: 'mum', cls: 'n-f-a',
  sg: 'mama mamy mamie mamę mamą mamie mamo',
  pl: 'mamy mam mamom mamy mamami mamach mamy' });
PL.noun('szkoła', { g: 'f', m: 'school', cls: 'n-f-a',
  sg: 'szkoła szkoły szkole szkołę szkołą szkole szkoło',
  pl: 'szkoły szkół szkołom szkoły szkołami szkołach szkoły',
  note: 'ł → l before *-e*: *w szkole*; genitive plural *szkół* (o → ó).' });
PL.noun('siostra', { g: 'f', m: 'sister', cls: 'n-f-a',
  sg: 'siostra siostry siostrze siostrę siostrą siostrze siostro',
  pl: 'siostry sióstr siostrom siostry siostrami siostrach siostry',
  note: 'r → rz before *-e*: *siostrze*; genitive plural *sióstr*.' });
PL.noun('woda', { g: 'f', m: 'water', cls: 'n-f-a',
  sg: 'woda wody wodzie wodę wodą wodzie wodo',
  pl: 'wody wód wodom wody wodami wodach wody' });
PL.noun('kawa', { g: 'f', m: 'coffee', cls: 'n-f-a',
  sg: 'kawa kawy kawie kawę kawą kawie kawo',
  pl: 'kawy kaw kawom kawy kawami kawach kawy' });
PL.noun('herbata', { g: 'f', m: 'tea', cls: 'n-f-a',
  sg: 'herbata herbaty herbacie herbatę herbatą herbacie herbato',
  pl: 'herbaty herbat herbatom herbaty herbatami herbatach herbaty' });
PL.noun('ręka', { g: 'f', m: 'hand, arm', cls: 'n-f-a',
  sg: 'ręka ręki ręce rękę ręką ręce ręko',
  pl: 'ręce rąk rękom ręce rękami/rękoma rękach ręce',
  note: 'Irregular plural *ręce, rąk*; ę alternates with ą (rąk).' });
PL.noun('noga', { g: 'f', m: 'leg, foot', cls: 'n-f-a',
  sg: 'noga nogi nodze nogę nogą nodze nogo',
  pl: 'nogi nóg nogom nogi nogami nogach nogi',
  note: 'g → dz before *-e*: *w nodze*; genitive plural *nóg*.' });
PL.noun('droga', { g: 'f', m: 'road, way', cls: 'n-f-a',
  sg: 'droga drogi drodze drogę drogą drodze drogo',
  pl: 'drogi dróg drogom drogi drogami drogach drogi',
  note: 'g → dz before *-e*: *w drodze* (on the way).' });
PL.noun('matka', { g: 'f', m: 'mother', cls: 'n-f-a',
  sg: 'matka matki matce matkę matką matce matko',
  pl: 'matki matek matkom matki matkami matkach matki' });
PL.noun('córka', { g: 'f', m: 'daughter', cls: 'n-f-a',
  sg: 'córka córki córce córkę córką córce córko',
  pl: 'córki córek córkom córki córkami córkach córki' });
PL.noun('poczta', { g: 'f', m: 'post office; mail', cls: 'n-f-a',
  sg: 'poczta poczty poczcie pocztę pocztą poczcie poczto',
  pl: 'poczty poczt pocztom poczty pocztami pocztach poczty' });
PL.noun('apteka', { g: 'f', m: 'pharmacy', cls: 'n-f-a',
  sg: 'apteka apteki aptece aptekę apteką aptece apteko',
  pl: 'apteki aptek aptekom apteki aptekami aptekach apteki' });
PL.noun('Polska', { g: 'f', m: 'Poland', cls: 'n-f-a',
  sg: 'Polska Polski Polsce Polskę Polską Polsce Polsko' });
PL.noun('Warszawa', { g: 'f', m: 'Warsaw', cls: 'n-f-a',
  sg: 'Warszawa Warszawy Warszawie Warszawę Warszawą Warszawie Warszawo' });
PL.noun('Anna', { g: 'f', m: 'Anna (name)', cls: 'n-f-a',
  sg: 'Anna Anny Annie Annę Anną Annie Anno' });
PL.noun('Ewa', { g: 'f', m: 'Ewa (name)', cls: 'n-f-a',
  sg: 'Ewa Ewy Ewie Ewę Ewą Ewie Ewo' });
PL.noun('ulica', { g: 'f', m: 'street', cls: 'n-f-soft',
  sg: 'ulica ulicy ulicy ulicę ulicą ulicy ulico',
  pl: 'ulice ulic ulicom ulice ulicami ulicach ulice' });
PL.noun('praca', { g: 'f', m: 'work, job', cls: 'n-f-soft',
  sg: 'praca pracy pracy pracę pracą pracy praco',
  pl: 'prace prac pracom prace pracami pracach prace' });
PL.noun('lekcja', { g: 'f', m: 'lesson', cls: 'n-f-soft',
  sg: 'lekcja lekcji lekcji lekcję lekcją lekcji lekcjo',
  pl: 'lekcje lekcji lekcjom lekcje lekcjami lekcjach lekcje' });
PL.noun('kuchnia', { g: 'f', m: 'kitchen; cuisine', cls: 'n-f-soft',
  sg: 'kuchnia kuchni kuchni kuchnię kuchnią kuchni kuchnio',
  pl: 'kuchnie kuchni kuchniom kuchnie kuchniami kuchniach kuchnie' });
PL.noun('Finlandia', { g: 'f', m: 'Finland', cls: 'n-f-soft',
  sg: 'Finlandia Finlandii Finlandii Finlandię Finlandią Finlandii Finlandio' });
PL.noun('babcia', { g: 'f', m: 'grandma', cls: 'n-f-soft',
  sg: 'babcia babci babci babcię babcią babci babciu',
  pl: 'babcie babć babciom babcie babciami babciach babcie',
  note: 'Pet-name nouns in *-ia / -cia / -sia* take *-u* in the vocative: *babciu!*' });
PL.noun('Kasia', { g: 'f', m: 'Kasia (name; short for Katarzyna)', cls: 'n-f-soft',
  sg: 'Kasia Kasi Kasi Kasię Kasią Kasi Kasiu' });
PL.noun('pani', { g: 'f', m: 'lady, Mrs; "you" (polite, to a woman)', cls: 'n-f-soft',
  sg: 'pani pani pani panią panią pani pani',
  pl: 'panie pań paniom panie paniami paniach panie',
  note: 'Irregular: almost every singular form is *pani*, except ACC/INS *panią*.' });
PL.noun('noc', { g: 'f', m: 'night', cls: 'n-f-cons',
  sg: 'noc nocy nocy noc nocą nocy nocy',
  pl: 'noce nocy nocom noce nocami nocach noce' });
PL.noun('rzecz', { g: 'f', m: 'thing', cls: 'n-f-cons',
  sg: 'rzecz rzeczy rzeczy rzecz rzeczą rzeczy rzeczy',
  pl: 'rzeczy rzeczy rzeczom rzeczy rzeczami rzeczach rzeczy' });
PL.noun('miłość', { g: 'f', m: 'love', cls: 'n-f-cons',
  sg: 'miłość miłości miłości miłość miłością miłości miłości',
  pl: 'miłości miłości miłościom miłości miłościami miłościach miłości' });
PL.noun('wieś', { g: 'f', m: 'village; the countryside', cls: 'n-f-cons',
  sg: 'wieś wsi wsi wieś wsią wsi wsi',
  pl: 'wsie wsi wsiom wsie wsiami wsiach wsie',
  note: 'Fleeting *ie*: *na wsi* (in the countryside), *ze wsi*.' });

/* ── Neuter ── */

PL.noun('okno', { g: 'n', m: 'window', cls: 'n-n-o',
  sg: 'okno okna oknu okno oknem oknie okno',
  pl: 'okna okien oknom okna oknami oknach okna',
  note: 'Genitive plural *okien* (an *ie* slips in).' });
PL.noun('miasto', { g: 'n', m: 'town, city', cls: 'n-n-o',
  sg: 'miasto miasta miastu miasto miastem mieście miasto',
  pl: 'miasta miast miastom miasta miastami miastach miasta',
  note: 'Locative *w mieście*: a → e and st → ści.' });
PL.noun('piwo', { g: 'n', m: 'beer', cls: 'n-n-o',
  sg: 'piwo piwa piwu piwo piwem piwie piwo',
  pl: 'piwa piw piwom piwa piwami piwach piwa' });
PL.noun('kino', { g: 'n', m: 'cinema', cls: 'n-n-o',
  sg: 'kino kina kinu kino kinem kinie kino',
  pl: 'kina kin kinom kina kinami kinach kina' });
PL.noun('biuro', { g: 'n', m: 'office', cls: 'n-n-o',
  sg: 'biuro biura biuru biuro biurem biurze biuro',
  pl: 'biura biur biurom biura biurami biurach biura' });
PL.noun('krzesło', { g: 'n', m: 'chair', cls: 'n-n-o',
  sg: 'krzesło krzesła krzesłu krzesło krzesłem krześle krzesło',
  pl: 'krzesła krzeseł krzesłom krzesła krzesłami krzesłach krzesła' });
PL.noun('wino', { g: 'n', m: 'wine', cls: 'n-n-o',
  sg: 'wino wina winu wino winem winie wino',
  pl: 'wina win winom wina winami winach wina' });
PL.noun('słowo', { g: 'n', m: 'word', cls: 'n-n-o',
  sg: 'słowo słowa słowu słowo słowem słowie słowo',
  pl: 'słowa słów słowom słowa słowami słowach słowa' });
PL.noun('jabłko', { g: 'n', m: 'apple', cls: 'n-n-o',
  sg: 'jabłko jabłka jabłku jabłko jabłkiem jabłku jabłko',
  pl: 'jabłka jabłek jabłkom jabłka jabłkami jabłkach jabłka' });
PL.noun('mleko', { g: 'n', m: 'milk', cls: 'n-n-o',
  sg: 'mleko mleka mleku mleko mlekiem mleku mleko' });
PL.noun('dziecko', { g: 'n', m: 'child', cls: 'n-n-o',
  sg: 'dziecko dziecka dziecku dziecko dzieckiem dziecku dziecko',
  pl: 'dzieci dzieci dzieciom dzieci dziećmi dzieciach dzieci',
  note: 'Irregular plural: *dzieci*, instrumental *dziećmi*.' });
PL.noun('oko', { g: 'n', m: 'eye', cls: 'n-n-o',
  sg: 'oko oka oku oko okiem oku oko',
  pl: 'oczy oczu oczom oczy oczami/oczyma oczach oczy',
  note: 'Irregular plural: *oczy, oczu*.' });
PL.noun('radio', { g: 'n', m: 'radio', cls: 'n-n-o',
  sg: 'radio radia radiu radio radiem radiu radio',
  pl: 'radia radiów radiom radia radiami radiach radia' });
PL.noun('muzeum', { g: 'n', m: 'museum', cls: 'n-n-o',
  sg: 'muzeum muzeum muzeum muzeum muzeum muzeum muzeum',
  pl: 'muzea muzeów muzeom muzea muzeami muzeach muzea',
  note: 'Latin loans in *-um* never change in the singular: *w muzeum*. Plural: muzea, muzeów.' });
PL.noun('mieszkanie', { g: 'n', m: 'flat, apartment', cls: 'n-n-e',
  sg: 'mieszkanie mieszkania mieszkaniu mieszkanie mieszkaniem mieszkaniu mieszkanie',
  pl: 'mieszkania mieszkań mieszkaniom mieszkania mieszkaniami mieszkaniach mieszkania',
  note: 'Literally "a living" — the verbal noun of *mieszkać* (to live somewhere).' });
PL.noun('morze', { g: 'n', m: 'sea', cls: 'n-n-e',
  sg: 'morze morza morzu morze morzem morzu morze',
  pl: 'morza mórz morzom morza morzami morzach morza',
  note: '*nad morzem* = at the seaside; genitive plural *mórz*.' });
PL.noun('zdjęcie', { g: 'n', m: 'photo', cls: 'n-n-e',
  sg: 'zdjęcie zdjęcia zdjęciu zdjęcie zdjęciem zdjęciu zdjęcie',
  pl: 'zdjęcia zdjęć zdjęciom zdjęcia zdjęciami zdjęciach zdjęcia',
  note: 'The verbal noun of *zdjąć* (to take off / take down): a photo is "taken" off the scene.' });
PL.noun('pytanie', { g: 'n', m: 'question', cls: 'n-n-e',
  sg: 'pytanie pytania pytaniu pytanie pytaniem pytaniu pytanie',
  pl: 'pytania pytań pytaniom pytania pytaniami pytaniach pytania' });
PL.noun('śniadanie', { g: 'n', m: 'breakfast', cls: 'n-n-e',
  sg: 'śniadanie śniadania śniadaniu śniadanie śniadaniem śniadaniu śniadanie',
  pl: 'śniadania śniadań śniadaniom śniadania śniadaniami śniadaniach śniadania' });
PL.noun('życie', { g: 'n', m: 'life', cls: 'n-n-e',
  sg: 'życie życia życiu życie życiem życiu życie',
  pl: 'życia żyć życiom życia życiami życiach życia' });
PL.noun('imię', { g: 'n', m: 'first name', cls: 'n-n-e',
  sg: 'imię imienia imieniu imię imieniem imieniu imię',
  pl: 'imiona imion imionom imiona imionami imionach imiona',
  note: 'Neuter in *-ę* gain *-en-* in the other forms: imienia, imieniem.' });

/* ── Plural only ── */

PL.noun('drzwi', { g: 'pt', m: 'door', cls: 'n-pt',
  pl: 'drzwi drzwi drzwiom drzwi drzwiami drzwiach drzwi' });
PL.noun('pieniądze', { g: 'pt', m: 'money', cls: 'n-pt',
  pl: 'pieniądze pieniędzy pieniądzom pieniądze pieniędzmi pieniądzach pieniądze',
  note: 'ą → ę in some forms: *pieniędzy*.' });
PL.noun('urodziny', { g: 'pt', m: 'birthday', cls: 'n-pt',
  pl: 'urodziny urodzin urodzinom urodziny urodzinami urodzinach urodziny' });
PL.noun('wakacje', { g: 'pt', m: 'holidays (summer)', cls: 'n-pt',
  pl: 'wakacje wakacji wakacjom wakacje wakacjami wakacjach wakacje' });
PL.noun('okulary', { g: 'pt', m: 'glasses', cls: 'n-pt',
  pl: 'okulary okularów okularom okulary okularami okularach okulary' });
PL.noun('Niemcy', { g: 'pt', m: 'Germany', cls: 'n-pt',
  pl: 'Niemcy Niemiec Niemcom Niemcy Niemcami Niemczech Niemcy',
  note: 'The country is plural ("the Germans"): *w Niemczech*, *do Niemiec*.' });

/* ── More everyday nouns (used by the exercises) ── */

PL.noun('poniedziałek', { g: 'm3', m: 'Monday', cls: 'n-m-hard',
  sg: 'poniedziałek poniedziałku poniedziałkowi poniedziałek poniedziałkiem poniedziałku poniedziałku',
  pl: 'poniedziałki poniedziałków poniedziałkom poniedziałki poniedziałkami poniedziałkach poniedziałki' });
PL.noun('piątek', { g: 'm3', m: 'Friday', cls: 'n-m-hard',
  sg: 'piątek piątku piątkowi piątek piątkiem piątku piątku',
  pl: 'piątki piątków piątkom piątki piątkami piątkach piątki' });
PL.noun('środa', { g: 'f', m: 'Wednesday', cls: 'n-f-a',
  sg: 'środa środy środzie środę środą środzie środo',
  pl: 'środy śród środom środy środami środach środy' });
PL.noun('sobota', { g: 'f', m: 'Saturday', cls: 'n-f-a',
  sg: 'sobota soboty sobocie sobotę sobotą sobocie soboto',
  pl: 'soboty sobót sobotom soboty sobotami sobotach soboty' });
PL.noun('niedziela', { g: 'f', m: 'Sunday', cls: 'n-f-soft',
  sg: 'niedziela niedzieli niedzieli niedzielę niedzielą niedzieli niedzielo',
  pl: 'niedziele niedziel niedzielom niedziele niedzielami niedzielach niedziele',
  note: 'Literally "the day of not-doing" (*nie* + *dzielać*, an old word for working).' });
PL.noun('godzina', { g: 'f', m: 'hour', cls: 'n-f-a',
  sg: 'godzina godziny godzinie godzinę godziną godzinie godzino',
  pl: 'godziny godzin godzinom godziny godzinami godzinach godziny' });
PL.noun('miesiąc', { g: 'm3', m: 'month', cls: 'n-m-soft',
  sg: 'miesiąc miesiąca miesiącowi miesiąc miesiącem miesiącu miesiącu',
  pl: 'miesiące miesięcy miesiącom miesiące miesiącami miesiącach miesiące',
  note: 'Genitive plural *miesięcy* (ą → ę).' });
PL.noun('rachunek', { g: 'm3', m: 'bill, invoice; account', cls: 'n-m-hard',
  sg: 'rachunek rachunku rachunkowi rachunek rachunkiem rachunku rachunku',
  pl: 'rachunki rachunków rachunkom rachunki rachunkami rachunkach rachunki' });
PL.noun('pomoc', { g: 'f', m: 'help', cls: 'n-f-cons',
  sg: 'pomoc pomocy pomocy pomoc pomocą pomocy pomocy' });
PL.noun('problem', { g: 'm3', m: 'problem', cls: 'n-m-hard',
  sg: 'problem problemu problemowi problem problemem problemie problemie',
  pl: 'problemy problemów problemom problemy problemami problemach problemy' });
PL.noun('język', { g: 'm3', m: 'language; tongue', cls: 'n-m-hard',
  sg: 'język języka językowi język językiem języku języku',
  pl: 'języki języków językom języki językami językach języki' });
PL.noun('gość', { g: 'm1', m: 'guest', cls: 'n-m-pers',
  sg: 'gość gościa gościowi gościa gościem gościu gościu',
  pl: 'goście gości gościom gości gośćmi gościach goście' });
PL.noun('zdrowie', { g: 'n', m: 'health', cls: 'n-n-e',
  sg: 'zdrowie zdrowia zdrowiu zdrowie zdrowiem zdrowiu zdrowie' });
PL.noun('muzyka', { g: 'f', m: 'music', cls: 'n-f-a',
  sg: 'muzyka muzyki muzyce muzykę muzyką muzyce muzyko' });
PL.noun('sport', { g: 'm3', m: 'sport', cls: 'n-m-hard',
  sg: 'sport sportu sportowi sport sportem sporcie sporcie',
  pl: 'sporty sportów sportom sporty sportami sportach sporty' });
PL.noun('film', { g: 'm3', m: 'film', cls: 'n-m-hard',
  sg: 'film filmu filmowi film filmem filmie filmie',
  pl: 'filmy filmów filmom filmy filmami filmach filmy' });
PL.noun('wojna', { g: 'f', m: 'war', cls: 'n-f-a',
  sg: 'wojna wojny wojnie wojnę wojną wojnie wojno',
  pl: 'wojny wojen wojnom wojny wojnami wojnach wojny' });
PL.noun('przyszłość', { g: 'f', m: 'the future', cls: 'n-f-cons',
  sg: 'przyszłość przyszłości przyszłości przyszłość przyszłością przyszłości przyszłości',
  note: 'From *przyszły* (coming, next): "the coming-ness".' });
PL.noun('uniwersytet', { g: 'm3', m: 'university', cls: 'n-m-hard',
  sg: 'uniwersytet uniwersytetu uniwersytetowi uniwersytet uniwersytetem uniwersytecie uniwersytecie',
  pl: 'uniwersytety uniwersytetów uniwersytetom uniwersytety uniwersytetami uniwersytetach uniwersytety' });
PL.noun('góra', { g: 'f', m: 'mountain; top, upstairs', cls: 'n-f-a',
  sg: 'góra góry górze górę górą górze góro',
  pl: 'góry gór górom góry górami górach góry' });
PL.noun('karta', { g: 'f', m: 'card', cls: 'n-f-a',
  sg: 'karta karty karcie kartę kartą karcie karto',
  pl: 'karty kart kartom karty kartami kartach karty' });
PL.noun('długopis', { g: 'm3', m: 'ballpoint pen', cls: 'n-m-hard',
  sg: 'długopis długopisu długopisowi długopis długopisem długopisie długopisie',
  pl: 'długopisy długopisów długopisom długopisy długopisami długopisach długopisy',
  note: 'Literally "long-writer": *dług-o-pis*.' });
PL.noun('tramwaj', { g: 'm3', m: 'tram', cls: 'n-m-soft',
  sg: 'tramwaj tramwaju tramwajowi tramwaj tramwajem tramwaju tramwaju',
  pl: 'tramwaje tramwajów tramwajom tramwaje tramwajami tramwajach tramwaje' });
PL.noun('rower', { g: 'm3', m: 'bicycle', cls: 'n-m-hard',
  sg: 'rower roweru rowerowi rower rowerem rowerze rowerze',
  pl: 'rowery rowerów rowerom rowery rowerami rowerach rowery' });
PL.noun('samolot', { g: 'm3', m: 'aeroplane', cls: 'n-m-hard',
  sg: 'samolot samolotu samolotowi samolot samolotem samolocie samolocie',
  pl: 'samoloty samolotów samolotom samoloty samolotami samolotach samoloty',
  note: 'Literally "self-flight": *sam-o-lot*.' });
PL.noun('pogoda', { g: 'f', m: 'weather', cls: 'n-f-a',
  sg: 'pogoda pogody pogodzie pogodę pogodą pogodzie pogodo' });
PL.noun('łóżko', { g: 'n', m: 'bed', cls: 'n-n-o',
  sg: 'łóżko łóżka łóżku łóżko łóżkiem łóżku łóżko',
  pl: 'łóżka łóżek łóżkom łóżka łóżkami łóżkach łóżka' });
PL.noun('lodówka', { g: 'f', m: 'fridge', cls: 'n-f-a',
  sg: 'lodówka lodówki lodówce lodówkę lodówką lodówce lodówko',
  pl: 'lodówki lodówek lodówkom lodówki lodówkami lodówkach lodówki',
  note: 'From *lód* (ice): "the ice-thing".' });
PL.noun('plaża', { g: 'f', m: 'beach', cls: 'n-f-soft',
  sg: 'plaża plaży plaży plażę plażą plaży plażo',
  pl: 'plaże plaż plażom plaże plażami plażach plaże' });
PL.noun('koncert', { g: 'm3', m: 'concert', cls: 'n-m-hard',
  sg: 'koncert koncertu koncertowi koncert koncertem koncercie koncercie',
  pl: 'koncerty koncertów koncertom koncerty koncertami koncertach koncerty' });
PL.noun('mecz', { g: 'm3', m: 'match (sports)', cls: 'n-m-soft',
  sg: 'mecz meczu meczowi mecz meczem meczu meczu',
  pl: 'mecze meczów meczom mecze meczami meczach mecze' });
PL.noun('spacer', { g: 'm3', m: 'walk, stroll', cls: 'n-m-hard',
  sg: 'spacer spaceru spacerowi spacer spacerem spacerze spacerze',
  pl: 'spacery spacerów spacerom spacery spacerami spacerach spacery' });
PL.noun('dworzec', { g: 'm3', m: 'station (train / bus)', cls: 'n-m-soft',
  sg: 'dworzec dworca dworcowi dworzec dworcem dworcu dworcu',
  pl: 'dworce dworców dworcom dworce dworcami dworcach dworce',
  note: 'Fleeting *e* with rz → r: *dworca, na dworcu*.' });
PL.noun('wycieczka', { g: 'f', m: 'trip, excursion', cls: 'n-f-a',
  sg: 'wycieczka wycieczki wycieczce wycieczkę wycieczką wycieczce wycieczko',
  pl: 'wycieczki wycieczek wycieczkom wycieczki wycieczkami wycieczkach wycieczki' });
PL.noun('cukier', { g: 'm3', m: 'sugar', cls: 'n-m-hard',
  sg: 'cukier cukru cukrowi cukier cukrem cukrze cukrze',
  note: 'Fleeting *ie*: *cukru, z cukrem*.' });
PL.noun('gazeta', { g: 'f', m: 'newspaper', cls: 'n-f-a',
  sg: 'gazeta gazety gazecie gazetę gazetą gazecie gazeto',
  pl: 'gazety gazet gazetom gazety gazetami gazetach gazety' });
PL.noun('tata', { g: 'm1', m: 'dad', cls: 'n-m-a',
  sg: 'tata taty tacie tatę tatą tacie tato',
  pl: 'tatowie tatów tatom tatów tatami tatach tatowie' });
PL.noun('nauczycielka', { g: 'f', m: 'teacher (female)', cls: 'n-f-a',
  sg: 'nauczycielka nauczycielki nauczycielce nauczycielkę nauczycielką nauczycielce nauczycielko',
  pl: 'nauczycielki nauczycielek nauczycielkom nauczycielki nauczycielkami nauczycielkach nauczycielki' });
PL.noun('studentka', { g: 'f', m: 'student (female)', cls: 'n-f-a',
  sg: 'studentka studentki studentce studentkę studentką studentce studentko',
  pl: 'studentki studentek studentkom studentki studentkami studentkach studentki' });
PL.noun('lekarka', { g: 'f', m: 'doctor (female)', cls: 'n-f-a',
  sg: 'lekarka lekarki lekarce lekarkę lekarką lekarce lekarko',
  pl: 'lekarki lekarek lekarkom lekarki lekarkami lekarkach lekarki' });
PL.noun('Finka', { g: 'f', m: 'Finn (woman)', cls: 'n-f-a',
  sg: 'Finka Finki Fince Finkę Finką Fince Finko',
  pl: 'Finki Finek Finkom Finki Finkami Finkach Finki' });
PL.noun('Fin', { g: 'm1', m: 'Finn (man)', cls: 'n-m-pers',
  sg: 'Fin Fina Finowi Fina Finem Finie Finie',
  pl: 'Finowie Finów Finom Finów Finami Finach Finowie' });
PL.noun('inżynier', { g: 'm1', m: 'engineer', cls: 'n-m-pers',
  sg: 'inżynier inżyniera inżynierowi inżyniera inżynierem inżynierze inżynierze',
  pl: 'inżynierowie inżynierów inżynierom inżynierów inżynierami inżynierach inżynierowie' });
PL.noun('mąż', { g: 'm1', m: 'husband', cls: 'n-m-pers',
  sg: 'mąż męża mężowi męża mężem mężu mężu',
  pl: 'mężowie mężów mężom mężów mężami mężach mężowie',
  note: 'ą → ę before endings: *męża, z mężem*.' });
PL.noun('żona', { g: 'f', m: 'wife', cls: 'n-f-a',
  sg: 'żona żony żonie żonę żoną żonie żono',
  pl: 'żony żon żonom żony żonami żonach żony' });
PL.noun('dziadek', { g: 'm1', m: 'grandad', cls: 'n-m-pers',
  sg: 'dziadek dziadka dziadkowi dziadka dziadkiem dziadku dziadku',
  pl: 'dziadkowie dziadków dziadkom dziadków dziadkami dziadkach dziadkowie',
  note: 'Plural *dziadkowie* also means "grandparents".' });
