/* ═══════════════════════════════════════════════════════════════
   data/smallwords.js — Module: Small words (słówka i zwroty)

   The "pikkusanat" of Polish: greetings, politeness, reactions,
   particles, linking words and the stock phrases of everyday
   situations. Three kinds of content:
     PL.phrases(rule, [[polish, english, { lit, use, say, alt }], …])
       → phrasebook + "what does it mean?" (+ "what do you say?" if say)
     { type: 'respond', s: 'dialogue with {reply}', o: [distractors] }
       → pick the reply that fits (translation shown afterwards)
     { type: 'choice', s: 'sentence with {word}', o: [distractors] }
       → pick the word that fits (translation shown)
   Distractors in dialogues are chosen to be wrong *for the situation*,
   not merely the opposite answer.
   ═══════════════════════════════════════════════════════════════ */

PL.module('small', {
  t: 'Small words', pl: 'Słówka i zwroty',
  blurb: 'Greetings, reactions, particles — the glue of conversation.',
  intro: 'The little words that grammar books leave for later and real conversations use in every sentence: how to say hello and goodbye at the right level of politeness, how to react (*Szkoda! Trudno! No coś ty!*), and the particles that give a sentence its colour — *przecież, chyba, właśnie, dopiero*. Literal meanings are shown wherever they help: *Nie ma za co* is "there is nothing for (which to thank)", *Smacznego* is "(I wish you) something tasty".',
});

PL.groups('small', [
  { id: 'MEET', t: 'Meeting and parting', pl: 'powitania i pożegnania' },
  { id: 'POLITE', t: 'Politeness', pl: 'zwroty grzecznościowe' },
  { id: 'ANSWER', t: 'Yes, no, maybe', pl: 'tak, nie, może' },
  { id: 'REACT', t: 'Reactions', pl: 'reakcje' },
  { id: 'PARTICLE', t: 'Particles', pl: 'partykuły', intro: 'Short words that change the colour of a sentence. They are best learned in sentences — always check the translation.' },
  { id: 'LINK', t: 'Linking words', pl: 'spójniki i wtrącenia' },
  { id: 'ASK', t: 'Asking and checking', pl: 'pytania' },
  { id: 'WISH', t: 'Wishes and occasions', pl: 'życzenia' },
  { id: 'PLACES', t: 'In shops, cafés, on the phone', pl: 'w sklepie, w kawiarni, przez telefon' },
  { id: 'FEEL', t: 'How you feel: …mi', pl: 'odczucia' },
  { id: 'CASUAL', t: 'Casual Polish', pl: 'potocznie', intro: 'What friends say. Fine among friends — too casual for the office or older strangers.' },
]);

/* ══ Rules ══ */

PL.rules('small', 'MEET', {
  'SW:greet': { o: 1, f: 3, t: 'Hello and goodbye',
    x: 'Formal: *Dzień dobry* (until evening), *Dobry wieczór*, *Do widzenia*. With friends: *Cześć* (both hi and bye), *Hej*, *Na razie*, *Pa!* Polish greets with the same phrase back: *— Dzień dobry! — Dzień dobry!*' },
});
PL.rules('small', 'POLITE', {
  'SW:polite': { o: 2, f: 3, t: 'Please, thank you, sorry',
    x: '*Proszę* does three jobs: please, here you are, and pardon? *Dziękuję* — thank you; the answer is *Nie ma za co* or *Proszę bardzo*. *Przepraszam* — sorry / excuse me; the answer is *Nic nie szkodzi*.' },
});
PL.rules('small', 'ANSWER', {
  'SW:yes': { o: 3, f: 3, t: 'Yes, sure, agreed',
    x: '*Tak* is yes, but in speech you will hear *no* just as often (it means "yeah"). Stronger: *Jasne! Oczywiście! Pewnie!* Accepting an invitation: *Chętnie!* (I\'d love to). Agreeing: *Zgoda!* (Deal!), *Masz rację* (you\'re right).' },
  'SW:no': { o: 4, f: 3, t: 'No, not really, no way',
    x: '*Nie* — no. Softer: *Raczej nie* (probably not), *Chyba nie* (I don\'t think so), *Niestety* (unfortunately). Stronger: *Wcale nie!* (not at all), *Ależ skąd!* (of course not!), *Nie ma mowy!* (no way!).' },
});
PL.rules('small', 'REACT', {
  'SW:react': { o: 5, f: 3, t: 'Reacting: Naprawdę? Szkoda! Trudno!',
    x: 'Surprise: *Naprawdę? Serio? No coś ty!* Sympathy: *Szkoda!* (what a pity). Resignation: *Trudno* (oh well — it can\'t be helped). Joy: *Super! Świetnie! Brawo!* And the very Polish shrug: *Zależy* (it depends).' },
});
PL.rules('small', 'PARTICLE', {
  'SW:particles': { o: 6, f: 3, t: '*chyba, przecież, właśnie, nawet, aż…*',
    x: '*chyba* = I guess, probably · *przecież* = but (obviously), after all · *właśnie* = exactly; just now · *nawet* = even · *aż* = as much as (more than expected) · *tylko* = only · *też* = too · *podobno* = apparently · *raczej* = rather, probably · *przynajmniej* = at least.' },
  'SW:when': { o: 9, f: 3, t: 'Time words: już, jeszcze, dopiero, zaraz',
    x: '*już* = already, now (*już idę* — I\'m coming) · *jeszcze* = still, yet, more (*jeszcze nie* — not yet) · *dopiero* = only just; not until (*dopiero jutro* — not until tomorrow) · *zaraz* = in a moment · *od razu* = straight away · *wreszcie* = at last · *kiedyś* = once; some day.' },
});
PL.rules('small', 'LINK', {
  'SW:link': { o: 10, f: 2, t: 'Linking words: więc, bo, czyli, jednak…',
    x: '*więc* = so · *bo* = because · *ale* = but · *czyli* = so, that is · *jednak* = however; after all · *żeby* = so that · *dlatego* = that\'s why · *zresztą* = anyway · *poza tym* = besides · *w sumie* = actually, all in all · *na przykład* = for example.' },
});
PL.rules('small', 'ASK', {
  'SW:ask': { o: 7, f: 3, t: 'Asking: Słucham? Co słychać? Jak to?',
    x: '*Słucham?* ("I\'m listening") = pardon?, and how you answer the phone. *Co słychać?* ("what\'s heard?") = what\'s new? *Jak to?* = how come? *Co się stało?* = what happened? *O co chodzi?* = what\'s the matter?' },
});
PL.rules('small', 'WISH', {
  'SW:wish': { o: 8, f: 3, t: 'Wishes: Smacznego! Na zdrowie! Powodzenia!',
    x: 'Most wishes are in the genitive, because an unspoken *Życzę (ci)…* (I wish you…) takes the genitive: *Smacznego!* (enjoy your meal), *Powodzenia!* (good luck), *Wszystkiego najlepszego!* (all the best), *Wesołych Świąt!* (Merry Christmas). *Na zdrowie!* is for toasts and sneezes; *Sto lat!* is the birthday song.' },
});
PL.rules('small', 'PLACES', {
  'SW:shop': { o: 11, f: 3, t: 'In a shop or café',
    x: 'Ask with *Poproszę…* + accusative: *Poproszę kawę*. You will hear *Coś jeszcze?* (anything else?), *Na miejscu czy na wynos?* (eat in or take away?), *Kartą czy gotówką?* (card or cash?). You might answer *To wszystko* (that\'s all) or *Reszty nie trzeba* (keep the change).' },
  'SW:phone': { o: 12, f: 2, t: 'On the phone and in messages',
    x: 'Answering: *Halo?* or *Słucham?* Asking who it is: *Kto mówi?* Wrong number: *Pomyłka*. Ending: *Do usłyszenia!* ("until hearing") — in writing: *Pozdrawiam* (best regards); in speech and messages alike: *Daj znać* (let me know), *Odezwę się* (I\'ll be in touch).' },
});
PL.rules('small', 'FEEL', {
  'SW:feel': { o: 13, f: 3, t: 'Feelings with *mi*: zimno mi, przykro mi',
    x: 'Polish says how you feel with the person in the dative: *Zimno mi* (I\'m cold — "it\'s cold to me"), *Przykro mi* (I\'m sorry), *Wszystko mi jedno* (I don\'t mind), *Nie chce mi się* (I can\'t be bothered), *Głupio mi* (I feel awkward), *Brakuje mi ciebie* (I miss you).' },
});
PL.rules('small', 'CASUAL', {
  'SW:casual': { o: 14, f: 2, t: 'Casual: spoko, luz, siema, masakra',
    x: '*Spoko* (from *spokojnie*, calmly) = no worries · *Luz* = relax · *Siema* = hi · *Nara* = see ya (*na razie*) · *Masakra* = a nightmare · *Kurczę!* = darn! (a polite stand-in for a swear word) · *Nie ma sprawy* = no problem.' },
});

/* ══ Phrasebook ══ */

PL.phrases('SW:greet', [
  ['Dzień dobry', 'Good morning / good afternoon (formal hello)', { lit: 'good day', use: 'Used until evening, to anyone you would call *pan / pani*, and when entering a shop.', say: 'You walk into a small shop in the morning. You say:' }],
  ['Dobry wieczór', 'Good evening', { lit: 'good evening', use: 'A greeting on arrival — not a goodbye.', say: 'You walk into a restaurant at 8 pm. You greet the waiter:' }],
  ['Cześć', 'Hi; bye (informal)', { lit: 'honour', use: 'With friends and anyone you call *ty* — both for hello and goodbye.', say: 'You meet a friend in the street. You say hi:', alt: ['Hej', 'Siema', 'Hejka', 'Siemka'] }],
  ['Hej', 'Hey, hi', { use: 'Casual, very common among younger people and in messages.' }],
  ['Do widzenia', 'Goodbye (formal)', { lit: 'until seeing', use: 'The formal goodbye: leaving a shop, an office, a doctor.', say: 'You leave the doctor\'s surgery. You say:', alt: ['Dziękuję, do widzenia', 'Do widzenia, dziękuję'] }],
  ['Do zobaczenia', 'See you (later)', { lit: 'until seeing', use: 'Neutral; when you expect to meet again.' }],
  ['Na razie', 'Bye for now', { lit: 'for the time being', use: 'Casual goodbye. Inside a sentence it means "for now, so far": *na razie wszystko dobrze* (so far so good).' }],
  ['Do jutra', 'See you tomorrow', { lit: 'until tomorrow' }],
  ['Pa!', 'Bye! (casual, affectionate)', { use: 'Often doubled: *Pa pa!* Used with family and friends.' }],
  ['Dobranoc', 'Good night', { lit: 'good night', use: 'Only when going to bed or very late — not a greeting.', say: 'Your child is going to bed. You say:', alt: ['Śpij dobrze', 'Dobranoc, śpij dobrze', 'Kolorowych snów'] }],
  ['Witam', 'Welcome; hello (from a host)', { lit: 'I welcome', use: 'Properly said by a host to guests. Very common at the start of e-mails, but many Poles find it presumptuous from a stranger — open a formal e-mail with *Dzień dobry*. *Witaj!* = welcome! / hello!' }],
]);

PL.phrases('SW:polite', [
  ['Proszę', 'Please; here you are; pardon?', { lit: 'I ask', use: 'Three jobs in one word: asking for something, handing something over, and asking someone to repeat.' }],
  ['Dziękuję', 'Thank you', { lit: 'I thank', use: 'Said alone in answer to an offer (*Jeszcze kawy?*) it is often taken as "no, thank you" — unlike Finnish *kiitos*. To accept: *Tak, poproszę* or *Chętnie*.', say: 'Someone holds the door for you. You say:', alt: ['Dzięki', 'Dziękuję bardzo', 'Bardzo dziękuję'] }],
  ['Dzięki', 'Thanks (casual)', { lit: 'thanks (plural noun)' }],
  ['Nie ma za co', 'You\'re welcome; don\'t mention it', { lit: 'there\'s nothing for which (to thank)', use: 'The standard reply to *dziękuję*.', say: 'Someone thanks you for your help. You answer:', alt: ['Proszę bardzo', 'Proszę', 'Nie ma sprawy', 'Drobiazg', 'Spoko'] }],
  ['Proszę bardzo', 'You\'re welcome; here you are; go ahead', { lit: 'I ask very much' }],
  ['Przepraszam', 'Excuse me; sorry (apologising)', { lit: 'I apologise', use: 'Also to get past someone or to get attention: *Przepraszam, gdzie jest dworzec?*', say: 'You need to get past someone on a crowded tram. You say:', alt: ['Przepraszam, wysiadam', 'Przepraszam bardzo'] }],
  ['Nic nie szkodzi', 'Never mind; no harm done', { lit: 'nothing harms', use: 'The reply to *przepraszam*.' }],
  ['Bardzo mi miło', 'Nice to meet you', { lit: '(it is) very nice to me' }],
  ['Mnie również', 'Likewise (= nice to meet you too)', { lit: 'to me also', use: 'The answer to *Bardzo mi miło* / *Miło mi* — *mnie* matches the *mi*. After *Lubię jazz*, "me too" is *Ja też*.' }],
  ['Z przyjemnością', 'With pleasure; gladly', { lit: 'with pleasure' }],
  ['Nie trzeba', 'There\'s no need; it\'s not necessary', { lit: 'it is not needed', use: '*Dziękuję, nie trzeba* = no thanks (e.g. to a bag or a receipt).' }],
]);

PL.phrases('SW:yes', [
  ['Tak', 'Yes'],
  ['No', 'Yeah; well…', { use: 'In speech *no* very often means "yes": *No, jasne!* (Yeah, sure!). It is also a filler, like "well".' }],
  ['Jasne', 'Sure, of course', { lit: 'clear', say: 'A friend asks if you can help. Say "Sure!":', alt: ['Pewnie', 'No jasne', 'No pewnie', 'Oczywiście'] }],
  ['Oczywiście', 'Of course', { lit: 'obviously' }],
  ['Pewnie', 'Sure; probably', { lit: 'certainly' }],
  ['Chętnie', 'Gladly; I\'d love to', { lit: 'willingly', use: 'The way to accept an invitation.', say: 'A friend asks if you want to go for a coffee. Say "I\'d love to!":', alt: ['Bardzo chętnie', 'Z przyjemnością'] }],
  ['Zgoda', 'Agreed; deal', { lit: 'agreement' }],
  ['W porządku', 'All right; fine', { lit: 'in order' }],
  ['Masz rację', 'You\'re right', { lit: 'you have reason' }],
  ['Zgadza się', 'That\'s right; correct', { lit: 'it tallies' }],
  ['Owszem', 'Yes, actually; indeed', { use: 'A bookish, emphatic "yes" — usually contradicting an expected "no" (*— Nie byłeś tam? — Owszem, byłem.*) or conceding (*Owszem, ale…* = true, but…).' }],
]);

PL.phrases('SW:no', [
  ['Nie', 'No; not'],
  ['Nie, dziękuję', 'No, thank you'],
  ['Raczej nie', 'Probably not; not really', { lit: 'rather not', use: '*raczej* = "more likely", not "prefer": "I\'d rather not" is *Wolałbym nie* (a woman: *Wolałabym nie*).' }],
  ['Chyba nie', 'I don\'t think so', { lit: 'probably not' }],
  ['Wcale nie', 'Not at all (= no, not so)', { lit: 'not at all', use: 'Contradicts: *— Jesteś zmęczony? — Wcale nie!* Not a reply to thanks — that is *Nie ma za co*.' }],
  ['Ależ skąd!', 'Not at all! Of course not!', { lit: 'but from where!' }],
  ['Nie ma mowy!', 'No way! Out of the question!', { lit: 'there is no talk (of it)' }],
  ['Niekoniecznie', 'Not necessarily'],
  ['Wątpię', 'I doubt it', { lit: 'I doubt' }],
  ['Niestety', 'Unfortunately', { use: 'People joke *stety czy niestety* (for better or worse) — as if there were a word *stety*.', say: 'You have to say "unfortunately" (before saying you can\'t come):' }],
]);

PL.phrases('SW:react', [
  ['Naprawdę?', 'Really?', { lit: 'truly?' }],
  ['Serio?', 'Seriously?'],
  ['Niemożliwe!', 'That\'s impossible! No way! (disbelief)', { lit: 'impossible!' }],
  ['Szkoda', 'What a pity; (it\'s) a shame', { lit: 'damage, loss', say: 'Your friend can\'t come to your party. You say "What a pity!":', alt: ['Jaka szkoda'] }],
  ['Trudno', 'Oh well; it can\'t be helped', { lit: '(it is) hard', use: 'Accepting something you can\'t change — your own or a shared problem. Said about someone else\'s bad luck it sounds like "tough luck".' }],
  ['Świetnie!', 'Great! Excellent!', { lit: 'brilliantly' }],
  ['Brawo!', 'Well done! Bravo!'],
  ['Nareszcie!', 'At last! Finally!'],
  ['O rany!', 'Oh my! Gosh!', { lit: 'oh, wounds!', use: 'From an old oath by Christ\'s wounds — now completely harmless.' }],
  ['No coś ty!', 'Come on, no way! (surprise); of course not!', { lit: 'well, what (are) you!' }],
  ['Nic dziwnego', 'No wonder', { lit: 'nothing strange' }],
  ['Zależy', 'It depends', { lit: '(it) depends' }],
  ['Jak miło!', 'How nice!', { lit: 'how nicely!' }],
]);

PL.phrases('SW:particles', [
  ['przecież', 'but (obviously), after all', { use: 'Points to something the listener should already know: *Przecież ci mówiłem!* (But I told you!)' }],
  ['chyba', 'probably; I guess, I think', { use: '*Chyba pada* = I think it\'s raining.' }],
  ['właśnie', 'exactly; just (now)', { use: '*No właśnie!* = Exactly! · *Właśnie wychodzę* = I\'m just leaving.' }],
  ['raczej', 'rather; probably', { use: '*Raczej nie* = probably not.' }],
  ['nawet', 'even'],
  ['aż', 'as much as, a whole…; until', { use: 'Shows more than expected: *aż sto złotych* = a whole hundred zloty. Also *aż do* = all the way to.' }],
  ['tylko', 'only, just'],
  ['też', 'too, also', { use: '*Ja też* = me too.' }],
  ['podobno', 'apparently, reportedly', { use: 'Second-hand information: *Podobno będzie padać* = apparently it\'s going to rain.' }],
  ['przynajmniej', 'at least'],
  ['akurat', 'just, exactly (then); (ironic) yeah, right', { use: '*Akurat wychodziłem* = I was just leaving. On its own, *Akurat!* = Yeah, right!' }],
  ['niby', 'supposedly; sort of', { use: '*Niby wszystko w porządku…* = Supposedly everything\'s fine…' }],
]);

PL.phrases('SW:when', [
  ['już', 'already; now; (with nie) any more', { use: '*Już idę!* = I\'m coming! · *Już nie palę* = I don\'t smoke any more.' }],
  ['jeszcze', 'still; yet; more', { use: '*Jeszcze nie* = not yet · *Jeszcze raz!* = once more!' }],
  ['dopiero', 'only (just); not until', { use: '*Dopiero przyszedłem* = I\'ve only just arrived · *Dopiero jutro* = not until tomorrow.' }],
  ['zaraz', 'in a moment, right away; hang on', { use: '*Zaraz wracam!* = back in a minute! · *Zaraz, zaraz…* = hang on…', say: 'Someone calls you. Say "in a moment!" (one word):', alt: ['Chwileczkę', 'Chwila', 'Moment', 'Momencik', 'Sekundę'] }],
  ['od razu', 'straight away, at once', { lit: 'from (the first) blow' }],
  ['wreszcie', 'at last, finally'],
  ['w końcu', 'finally; after all', { lit: 'in the end' }],
  ['kiedyś', 'once (in the past); some day', { use: 'Both directions: *Kiedyś tu mieszkałem* (I used to live here) · *Kiedyś pojadę do Polski* (some day I\'ll go to Poland).' }],
  ['chwileczkę', 'just a moment', { lit: 'a little moment (diminutive of chwila)' }],
  ['ciągle', 'constantly, all the time'],
  ['potem', 'afterwards, later'],
]);

PL.phrases('SW:link', [
  ['więc', 'so, therefore'],
  ['bo', 'because', { use: 'The everyday word; *ponieważ* is the formal one.' }],
  ['ale', 'but'],
  ['czyli', 'so, that is, in other words', { use: '*Czyli jutro?* = So, tomorrow then?' }],
  ['jednak', 'however; after all'],
  ['żeby', 'so that, in order to'],
  ['dlatego', 'that\'s why', { lit: 'for that' }],
  ['zresztą', 'anyway, besides'],
  ['poza tym', 'besides, apart from that', { lit: 'beyond that' }],
  ['w sumie', 'all in all; actually', { lit: 'in sum' }],
  ['w ogóle', 'at all; in general', { lit: 'in general', use: '*W ogóle nie wiem* = I have no idea at all.' }],
  ['na przykład', 'for example', { lit: 'on (the) example' }],
  ['tak naprawdę', 'actually, in fact; to tell the truth', { lit: 'so truly' }],
  ['mimo to', 'nevertheless', { lit: 'despite that' }],
]);

PL.phrases('SW:ask', [
  ['Słucham?', 'Pardon?; Hello? (answering the phone)', { lit: 'I\'m listening', say: 'You didn\'t catch what someone said. Politely ask "Pardon?":', alt: ['Proszę', 'Przepraszam'] }],
  ['Jak to?', 'How come? What do you mean?', { lit: 'how that?' }],
  ['Co słychać?', 'What\'s new? How are things?', { lit: 'what is heard?' }],
  ['Co u ciebie?', 'How are you doing?', { lit: 'what (is) at yours?' }],
  ['Jak leci?', 'How\'s it going?', { lit: 'how is it flying?' }],
  ['Jak się masz?', 'How are you?', { lit: 'how do you have yourself?' }],
  ['Co się stało?', 'What happened? What\'s wrong?', { lit: 'what has become? (*stać się* = to become, happen)' }],
  ['O co chodzi?', 'What\'s the matter? What\'s it about?', { lit: 'what does it walk about?' }],
  ['Która godzina?', 'What time is it?', { lit: 'which hour?' }],
  ['Co to znaczy?', 'What does it mean?'],
  ['Możesz powtórzyć?', 'Can you say that again?', { lit: 'can you repeat?' }],
  ['Wszystko w porządku?', 'Is everything OK?', { lit: 'everything in order?' }],
]);

PL.phrases('SW:wish', [
  ['Smacznego!', 'Enjoy your meal!', { lit: '(I wish you) something tasty', use: 'Said before eating — by the cook, the waiter, or anyone at the table.', say: 'Your friends are about to start eating. You say:' }],
  ['Na zdrowie!', 'Cheers!; Bless you!', { lit: 'to health', use: 'For a toast, and when someone sneezes.', say: 'Someone sneezes. You say:' }],
  ['Sto lat!', 'Happy birthday! (the song)', { lit: 'a hundred years', use: 'The birthday song: "may he / she live a hundred years".' }],
  ['Wszystkiego najlepszego!', 'All the best! Happy birthday!', { lit: '(I wish you) everything best' }],
  ['Powodzenia!', 'Good luck!', { lit: '(I wish you) success', say: 'Your friend has an exam tomorrow. You say:', alt: ['Trzymam kciuki', 'Połamania nóg', 'Powodzenia na egzaminie'] }],
  ['Trzymam kciuki!', 'Fingers crossed!', { lit: 'I\'m holding (my) thumbs' }],
  ['Wesołych Świąt!', 'Merry Christmas! Happy Easter!', { lit: '(I wish you) merry holidays' }],
  ['Szczęśliwego Nowego Roku!', 'Happy New Year!', { lit: '(I wish you) a happy new year' }],
  ['Miłego dnia!', 'Have a nice day!', { lit: '(I wish you) a nice day' }],
  ['Gratulacje!', 'Congratulations!'],
  ['Dobrej podróży!', 'Have a good trip!', { lit: '(I wish you) a good journey' }],
  ['Połamania nóg!', 'Break a leg!', { lit: '(I wish you) a breaking of legs', use: 'Before a performance or an exam.' }],
  ['Dobrej zabawy!', 'Have fun!', { lit: '(I wish you) good fun' }],
]);

PL.phrases('SW:shop', [
  ['Poproszę…', 'I\'d like…, … please', { lit: 'I will ask (for)', use: 'Followed by the accusative: *Poproszę kawę*, *poproszę bilet*.' }],
  ['Coś jeszcze?', 'Anything else?', { lit: 'something more?' }],
  ['To wszystko', 'That\'s all', { lit: 'this (is) all' }],
  ['Ile płacę?', 'How much is it? (How much do I owe?)', { lit: 'how much do I pay?', say: 'You want to pay. Ask "How much do I owe?":', alt: ['Ile się należy?', 'Ile jestem winien?', 'Ile jestem winna?', 'Ile płacimy?', 'Ile to będzie?'] }],
  ['Ile to kosztuje?', 'How much does this cost?'],
  ['Reszty nie trzeba', 'Keep the change', { lit: 'the rest is not needed' }],
  ['Kartą czy gotówką?', 'Card or cash?', { lit: 'by card or by cash?' }],
  ['Na miejscu czy na wynos?', 'Eat in or take away?', { lit: 'on the spot or for carrying out?' }],
  ['Płacę kartą', 'I\'m paying by card', { lit: 'I pay with card' }],
  ['Poproszę rachunek', 'The bill, please', { lit: 'I will ask (for) the bill' }],
  ['Czy jest wolny stolik?', 'Is there a free table?'],
]);

PL.phrases('SW:phone', [
  ['Halo?', 'Hello? (on the phone)'],
  ['Kto mówi?', 'Who\'s speaking?', { lit: 'who speaks?', use: 'Rather blunt; politer: *Z kim rozmawiam?* (who am I speaking to?)' }],
  ['Pomyłka', 'Wrong number', { lit: 'a mistake' }],
  ['Oddzwonię', 'I\'ll call (you) back', { lit: 'I\'ll ring back' }],
  ['Daj znać', 'Let me know', { lit: 'give (me) to know' }],
  ['Odezwę się', 'I\'ll be in touch', { lit: 'I\'ll make myself heard' }],
  ['Do usłyszenia', 'Talk to you soon (on the phone)', { lit: 'until hearing' }],
  ['Pozdrawiam', 'Best regards (in writing)', { lit: 'I greet' }],
  ['Nie ma zasięgu', 'There\'s no signal', { lit: 'there\'s no reach' }],
]);

PL.phrases('SW:feel', [
  ['Zimno mi', 'I\'m cold', { lit: '(it is) cold to me', say: 'Say that you are cold (two words):', alt: ['Mnie zimno'] }],
  ['Gorąco mi', 'I\'m hot', { lit: '(it is) hot to me' }],
  ['Przykro mi', 'I\'m sorry (to hear that); I regret', { lit: '(it is) painful to me', use: 'Regret and sympathy: bad news (*Przykro mi, że tak się stało*) or a polite refusal (*Przykro mi, nie mamy już biletów*). To apologise for what you did: *przepraszam*.' }],
  ['Wszystko mi jedno', 'I don\'t mind; it\'s all the same to me', { lit: 'all (is) one to me' }],
  ['Nie chce mi się', 'I can\'t be bothered; I don\'t feel like it', { lit: 'it doesn\'t want itself to me' }],
  ['Głupio mi', 'I feel awkward, embarrassed', { lit: '(it is) stupid to me' }],
  ['Wstyd mi', 'I\'m ashamed', { lit: '(it is) shame to me' }],
  ['Nudzi mi się', 'I\'m bored', { lit: 'it bores itself to me' }],
  ['Smutno mi', 'I\'m sad', { lit: '(it is) sad to me' }],
  ['Brakuje mi ciebie', 'I miss you', { lit: '(there) is a lack of you to me', use: 'The most common "I miss you" is *Tęsknię za tobą*.' }],
  ['Podoba mi się', 'I like it', { lit: 'it pleases me', use: 'For what you see or experience (a film, a town). For food: *Smakuje mi*.' }],
  ['Jest mi dobrze', 'I feel good; I\'m comfortable', { lit: 'it is well to me' }],
]);

PL.phrases('SW:casual', [
  ['Spoko', 'No worries; cool; OK', { lit: 'from *spokojnie* — calmly' }],
  ['Luz', 'Relax; no stress', { lit: 'slack, looseness' }],
  ['Siema', 'Hi (very casual)', { lit: 'from *(jak) się masz?* — how are you?' }],
  ['Nara', 'See ya; bye (very casual)', { lit: 'from *na razie*' }],
  ['Masakra', 'A nightmare! Awful!', { lit: 'a massacre' }],
  ['Kurczę!', 'Darn! Damn!', { lit: 'chick (young chicken)', use: 'A polite stand-in for a much ruder word that starts the same way.' }],
  ['Nie ma sprawy', 'No problem', { lit: 'there\'s no matter' }],
  ['Stary', 'Dude, mate', { lit: 'old (man)', use: 'Between friends: *Stary, co ty robisz?*' }],
  ['Fajnie', 'Cool; nice', { use: 'From *fajny* (cool, nice) — from German *fein*.' }],
  ['Bez kitu', 'No kidding', { lit: 'without putty' }],
]);

/* ══ Dialogues and fill-the-gap choices ══ */

PL.items('SW:greet', [
  { type: 'respond', s: '— Dzień dobry!\n— {Dzień dobry}!', t: '— Good morning! — Good morning!', o: ['Dobranoc', 'Na zdrowie', 'Smacznego'], n: 'Polish simply returns the same greeting.' },
  { type: 'respond', s: '(Leaving a shop)\n— Dziękuję, {do widzenia}!', t: 'Thank you, goodbye!', o: ['dzień dobry', 'smacznego', 'proszę bardzo'] },
  { type: 'respond', s: '— Idę spać.\n— {Dobranoc}!', t: '— I\'m going to bed. — Good night!', o: ['Dobry wieczór', 'Dzień dobry', 'Do widzenia'] },
  { type: 'respond', s: '— To na razie, do jutra!\n— {Pa}!', t: '— Well, bye for now, see you tomorrow! — Bye!', o: ['Dzień dobry', 'Witam', 'Smacznego'] },
  { type: 'respond', s: '(9 pm, walking into a restaurant)\n— {Dobry wieczór}!', t: 'Good evening!', o: ['Dobranoc', 'Do zobaczenia', 'Na razie'], n: '*Dobranoc* is only for going to bed — on arrival it is *Dobry wieczór*.' },
]);

PL.items('SW:polite', [
  { type: 'respond', s: '— Dziękuję za pomoc!\n— {Nie ma za co}.', t: '— Thanks for the help! — You\'re welcome.', o: ['Smacznego', 'Przepraszam', 'Na zdrowie'] },
  { type: 'respond', s: '— Przepraszam, że się spóźniłem.\n— {Nic nie szkodzi}.', t: '— Sorry I\'m late. — Never mind.', o: ['Na zdrowie', 'Smacznego', 'Bardzo mi miło'], n: '*Nic nie szkodzi* or *Nic się nie stało* answer an apology; *Nie ma za co* is the answer to thanks.' },
  { type: 'respond', s: '— To jest mój brat, Piotr.\n— {Bardzo mi miło}.', t: '— This is my brother, Piotr. — Nice to meet you.', o: ['Nic nie szkodzi', 'Smacznego', 'Nie ma za co'] },
  { type: 'respond', s: '— Bardzo mi miło.\n— {Mnie również}.', t: '— Nice to meet you. — Likewise.', o: ['Nie ma za co', 'Przepraszam', 'Na zdrowie'] },
  { type: 'respond', s: '(Handing someone their coffee)\n— {Proszę}.\n— Dziękuję!', t: '— Here you are. — Thank you!', o: ['Przepraszam', 'Dziękuję', 'Nie ma za co'] },
  { type: 'respond', s: '(On a crowded tram)\n— {Przepraszam}, wysiadam.', t: 'Excuse me, I\'m getting off.', o: ['Dziękuję', 'Proszę bardzo', 'Na zdrowie'] },
]);

PL.items('SW:yes', [
  { type: 'respond', s: '— Pójdziemy na kawę?\n— {Chętnie}!', t: '— Shall we go for a coffee? — I\'d love to!', o: ['Smacznego', 'Wcale nie', 'Szkoda'] },
  { type: 'respond', s: '— Możesz mi pomóc?\n— {Jasne}!', t: '— Can you help me? — Sure!', o: ['Smacznego', 'Pomyłka', 'Na zdrowie'] },
  { type: 'respond', s: '— Spotkamy się o piątej?\n— {Zgoda}.', t: '— Shall we meet at five? — Agreed.', o: ['Szkoda', 'Na zdrowie', 'Smacznego'] },
  { type: 'respond', s: '— Ona ma rację, prawda?\n— {Zgadza się}.', t: '— She\'s right, isn\'t she? — That\'s right.', o: ['Smacznego', 'Dobranoc', 'Gratulacje'] },
  { type: 'respond', s: '— Wszystko jasne?\n— Tak, {oczywiście}.', t: '— Is everything clear? — Yes, of course.', o: ['przepraszam', 'smacznego', 'pomyłka'] },
]);

PL.items('SW:no', [
  { type: 'respond', s: '— Jeszcze kawy?\n— {Nie, dziękuję}.', t: '— More coffee? — No, thank you.', o: ['Na zdrowie', 'Dobranoc', 'Pomyłka'] },
  { type: 'respond', s: '— Pożyczysz mi samochód?\n— {Nie ma mowy}!', t: '— Will you lend me your car? — No way!', o: ['Smacznego', 'Nie ma za co', 'Do usłyszenia'] },
  { type: 'respond', s: '— Jesteś na mnie zły?\n— {Ależ skąd}!', t: '— Are you angry with me? — Not at all!', o: ['Smacznego', 'Pomyłka', 'Sto lat'] },
  { type: 'respond', s: '— Przyjdziesz jutro?\n— {Raczej nie}, mam dużo pracy.', t: '— Will you come tomorrow? — Probably not, I\'ve got a lot of work.', o: ['Smacznego', 'Na zdrowie', 'Brawo'] },
  { type: 'respond', s: '— Możesz przyjść w sobotę?\n— {Niestety} nie mogę.', t: '— Can you come on Saturday? — Unfortunately I can\'t.', o: ['Nareszcie', 'Smacznego', 'Brawo'] },
]);

PL.items('SW:react', [
  { type: 'respond', s: '— Wygrałem na loterii!\n— {Naprawdę}?', t: '— I won the lottery! — Really?', o: ['Smacznego', 'Dobranoc', 'Nie ma za co'] },
  { type: 'respond', s: '— Nie mogę przyjść na twoje urodziny.\n— {Szkoda}!', t: '— I can\'t come to your birthday party. — What a pity!', o: ['Brawo', 'Smacznego', 'Na zdrowie'] },
  { type: 'respond', s: '— Uciekł nam pociąg.\n— {Trudno}, pojedziemy następnym.', t: '— We\'ve missed the train. — Oh well, we\'ll take the next one.', o: ['Brawo', 'Smacznego', 'Sto lat'], n: '*Trudno* — literally "(it is) hard" — is how Poles shrug off what can\'t be changed.' },
  { type: 'respond', s: '— Zdałem egzamin!\n— {Brawo}!', t: '— I passed the exam! — Well done!', o: ['Szkoda', 'Przykro mi', 'Pomyłka'] },
  { type: 'respond', s: '— Jest bardzo zmęczony, bo pracował całą noc.\n— {Nic dziwnego}!', t: '— He\'s very tired because he worked all night. — No wonder!', o: ['Smacznego', 'Gratulacje', 'Na zdrowie'] },
  { type: 'respond', s: '— Pójdziesz z nami?\n— {Zależy}. Dokąd idziecie?', t: '— Will you come with us? — It depends. Where are you going?', o: ['Smacznego', 'Dobranoc', 'Brawo'] },
]);

PL.items('SW:particles', [
  { type: 'choice', s: '— Gdzie jest Marek?\n— Nie wiem, {chyba} w domu.', t: '— Where\'s Marek? — I don\'t know, probably at home.', o: ['przecież', 'nawet', 'aż'] },
  { type: 'choice', s: '{Przecież} ci mówiłem!', t: 'But I told you!', o: ['Chyba', 'Nawet', 'Podobno'], n: '*przecież* points to something the listener should already know.' },
  { type: 'choice', s: 'On {nawet} nie wie, jak masz na imię.', t: 'He doesn\'t even know your name.', o: ['chyba', 'przecież', 'właśnie'] },
  { type: 'choice', s: '{Właśnie} wychodzę.', t: 'I\'m just leaving.', o: ['Nawet', 'Aż', 'Chyba'] },
  { type: 'choice', s: 'Ten bilet kosztuje {aż} sto złotych!', t: 'This ticket costs a whole hundred zloty!', o: ['tylko', 'chyba', 'też'], n: '*aż* = more than you would expect; *tylko* = less.' },
  { type: 'choice', s: 'Mam {tylko} pięć minut.', t: 'I only have five minutes.', o: ['aż', 'nawet', 'też'] },
  { type: 'choice', s: '— Lubię jazz.\n— Ja {też}!', t: '— I like jazz. — Me too!', o: ['tylko', 'nawet', 'aż'] },
  { type: 'choice', s: '{Podobno} jutro będzie padać.', t: 'Apparently it\'s going to rain tomorrow.', o: ['Przecież', 'Właśnie', 'Aż'] },
  { type: 'choice', s: '{Raczej} nie przyjdę.', t: 'I probably won\'t come.', o: ['Nawet', 'Aż', 'Też'] },
  { type: 'choice', s: '{Przynajmniej} spróbuj!', t: 'At least try!', o: ['Aż', 'Chyba', 'Też'] },
]);

PL.items('SW:when', [
  { type: 'choice', s: '— Jesteś gotowy?\n— {Jeszcze} nie.', t: '— Are you ready? — Not yet.', o: ['Już', 'Dopiero', 'Zaraz'] },
  { type: 'choice', s: '{Już} jestem!', t: 'I\'m here now!', o: ['Jeszcze', 'Dopiero', 'Kiedyś'] },
  { type: 'choice', s: 'Film zaczyna się {dopiero} o dziewiątej.', t: 'The film doesn\'t start until nine.', o: ['już', 'jeszcze', 'zaraz'], n: '*dopiero* = later than you might expect; *już* = earlier.' },
  { type: 'choice', s: '{Zaraz} wracam!', t: 'I\'ll be right back!', o: ['Dopiero', 'Jeszcze', 'Kiedyś'] },
  { type: 'choice', s: 'Musisz to zrobić {od razu}.', t: 'You have to do it straight away.', o: ['na razie', 'w końcu', 'kiedyś'] },
  { type: 'choice', s: '{Wreszcie} piątek!', t: 'Friday at last!', o: ['Jeszcze', 'Dopiero', 'Zaraz'] },
  { type: 'choice', s: '{Kiedyś} tu mieszkałem.', t: 'I used to live here.', o: ['Zaraz', 'Już', 'Wreszcie'] },
  { type: 'choice', s: 'On się {ciągle} spóźnia.', t: 'He\'s always late.', o: ['dopiero', 'zaraz', 'wreszcie'] },
]);

PL.items('SW:link', [
  { type: 'choice', s: 'Pada, {więc} zostaję w domu.', t: 'It\'s raining, so I\'m staying at home.', o: ['bo', 'ale', 'żeby'] },
  { type: 'choice', s: 'Zostaję w domu, {bo} pada.', t: 'I\'m staying at home because it\'s raining.', o: ['więc', 'ale', 'czyli'] },
  { type: 'choice', s: 'Chciałem przyjść, {ale} nie miałem czasu.', t: 'I wanted to come, but I didn\'t have time.', o: ['bo', 'więc', 'czyli'] },
  { type: 'choice', s: '— Spotkanie jest w piątek.\n— {Czyli} pojutrze?', t: '— The meeting is on Friday. — So, the day after tomorrow?', o: ['Bo', 'Ale', 'Żeby'] },
  { type: 'choice', s: 'Mówił, że nie przyjdzie, ale {jednak} przyszedł.', t: 'He said he wouldn\'t come, but he came after all.', o: ['czyli', 'więc', 'bo'] },
  { type: 'choice', s: 'Lubię owoce, {na przykład} jabłka i gruszki.', t: 'I like fruit, for example apples and pears.', o: ['w ogóle', 'mimo to', 'dlatego'] },
  { type: 'choice', s: 'Uczę się polskiego, {żeby} rozmawiać z babcią.', t: 'I\'m learning Polish so that I can talk with my grandma.', o: ['bo', 'więc', 'czyli'] },
  { type: 'choice', s: 'Byłem chory, {dlatego} nie przyszedłem.', t: 'I was ill, that\'s why I didn\'t come.', o: ['żeby', 'bo', 'czyli'] },
  { type: 'choice', s: 'Nie lubię go. {Zresztą} nikt go nie lubi.', t: 'I don\'t like him. Anyway, nobody likes him.', o: ['Żeby', 'Czyli', 'Na przykład'] },
]);

PL.items('SW:ask', [
  { type: 'respond', s: '(You didn\'t catch what was said)\n— {Słucham}?', t: 'Pardon?', o: ['Smacznego', 'Dziękuję', 'Na zdrowie'] },
  { type: 'respond', s: '— Cześć! {Co słychać}?\n— Wszystko dobrze, dzięki.', t: '— Hi! What\'s new? — All good, thanks.', o: ['Ile płacę', 'Kto mówi', 'Która godzina'] },
  { type: 'respond', s: '— Wyglądasz na smutną. {Co się stało}?\n— Zgubiłam telefon.', t: '— You look sad. What happened? — I lost my phone.', o: ['Ile płacę', 'Kto mówi', 'Która godzina'] },
  { type: 'respond', s: '— {Która godzina}?\n— Wpół do piątej.', t: '— What time is it? — Half past four.', o: ['Co słychać', 'Kto mówi', 'O co chodzi'], n: '*Wpół do piątej* = half past four — literally "half to five".' },
  { type: 'respond', s: '— Jutro nie ma lekcji.\n— {Jak to}? Dlaczego?', t: '— There are no lessons tomorrow. — What do you mean? Why?', o: ['Smacznego', 'Na zdrowie', 'Dobranoc'] },
]);

PL.items('SW:wish', [
  { type: 'respond', s: '(Just before eating)\n— {Smacznego}!', t: 'Enjoy your meal!', o: ['Na zdrowie', 'Sto lat', 'Powodzenia'], n: '*Na zdrowie* is for drinking (a toast) — before food it is *Smacznego*.' },
  { type: 'respond', s: '— Jutro mam egzamin.\n— {Powodzenia}!', t: '— I have an exam tomorrow. — Good luck!', o: ['Smacznego', 'Na zdrowie', 'Wesołych Świąt'] },
  { type: 'respond', s: '— Apsik!\n— {Na zdrowie}!', t: '— Atishoo! — Bless you!', o: ['Smacznego', 'Powodzenia', 'Dobranoc'] },
  { type: 'respond', s: '— Dzisiaj mam urodziny!\n— {Wszystkiego najlepszego}!', t: '— It\'s my birthday today! — Happy birthday!', o: ['Smacznego', 'Na zdrowie', 'Dobranoc'] },
  { type: 'respond', s: '— Jutro mam rozmowę o pracę.\n— {Trzymam kciuki}!', t: '— I have a job interview tomorrow. — Fingers crossed!', o: ['Smacznego', 'Dobranoc', 'Na zdrowie'] },
  { type: 'respond', s: '(24 December)\n— {Wesołych Świąt}!', t: 'Merry Christmas!', o: ['Sto lat', 'Smacznego', 'Powodzenia'] },
  { type: 'respond', s: '— Zostaliśmy rodzicami!\n— {Gratulacje}!', t: '— We\'ve become parents! — Congratulations!', o: ['Smacznego', 'Szkoda', 'Na zdrowie'] },
]);

PL.items('SW:shop', [
  { type: 'respond', s: '— Co dla pani?\n— {Poproszę} kawę z mlekiem.', t: '— What can I get you? — A coffee with milk, please.', o: ['Przepraszam', 'Dziękuję', 'Smacznego'] },
  { type: 'respond', s: '— Coś jeszcze?\n— Nie, {to wszystko}.', t: '— Anything else? — No, that\'s all.', o: ['nie ma za co', 'smacznego', 'na zdrowie'] },
  { type: 'respond', s: '— Na miejscu czy {na wynos}?\n— Na wynos, poproszę.', t: '— Eat in or take away? — Take away, please.', o: ['na zdrowie', 'na razie', 'na przykład'] },
  { type: 'respond', s: '— Płaci pan kartą czy {gotówką}?\n— Kartą.', t: '— Are you paying by card or in cash? — By card.', o: ['paragonem', 'resztą', 'rachunkiem'] },
  { type: 'respond', s: '— To osiemnaście pięćdziesiąt.\n— Proszę, {reszty nie trzeba}.', t: '— That\'s eighteen fifty. — Here you are, keep the change.', o: ['nie ma za co', 'smacznego', 'do usłyszenia'] },
  { type: 'respond', s: '— {Ile płacę}?\n— Trzydzieści złotych.', t: '— How much do I owe you? — Thirty zloty.', o: ['Która godzina', 'Kto mówi', 'Co słychać'] },
]);

PL.items('SW:phone', [
  { type: 'respond', s: '— Halo, czy to pan Kowalski?\n— Nie, to {pomyłka}.', t: '— Hello, is that Mr Kowalski? — No, wrong number.', o: ['smacznego', 'powodzenia', 'na zdrowie'] },
  { type: 'respond', s: '— Dzwoniła do ciebie mama.\n— Dobrze, {oddzwonię} później.', t: '— Mum rang you. — OK, I\'ll call her back later.', o: ['smacznego', 'pozdrawiam', 'gratulacje'] },
  { type: 'respond', s: '— No to {do usłyszenia}!\n— Pa!', t: '— Well, talk to you soon! — Bye!', o: ['dzień dobry', 'smacznego', 'na zdrowie'] },
  { type: 'respond', s: '— Jak już będziesz na miejscu, {daj znać}.\n— Jasne.', t: '— When you get there, let me know. — Sure.', o: ['smacznego', 'na zdrowie', 'sto lat'] },
  { type: 'respond', s: '(At the end of an e-mail)\n{Pozdrawiam},\nAnna', t: 'Best regards,\nAnna', o: ['Smacznego', 'Na zdrowie', 'Dobranoc'] },
]);

PL.items('SW:feel', [
  { type: 'choice', s: '{Zimno} mi, zamknij okno.', t: 'I\'m cold, close the window.', o: ['Gorąco', 'Smutno', 'Wstyd'] },
  { type: 'choice', s: '— Dokąd idziemy?\n— Wszystko mi {jedno}.', t: '— Where are we going? — I don\'t mind.', o: ['zimno', 'przykro', 'szkoda'] },
  { type: 'choice', s: 'Nie {chce} mi się dzisiaj gotować.', t: 'I can\'t be bothered to cook today.', o: ['ma', 'jest', 'wolno'] },
  { type: 'choice', s: '{Przykro} mi, że tak się stało.', t: 'I\'m sorry that happened.', o: ['Zimno', 'Nudno', 'Gorąco'] },
  { type: 'choice', s: '{Głupio} mi, zapomniałem, jak masz na imię.', t: 'I feel awkward, I\'ve forgotten your name.', o: ['Gorąco', 'Zimno', 'Dobrze'] },
  { type: 'choice', s: 'Bardzo mi się {podoba} ten film.', t: 'I really like this film.', o: ['brakuje', 'chce', 'nudzi'] },
  { type: 'choice', s: '{Brakuje} mi ciebie.', t: 'I miss you.', o: ['Podoba', 'Nudzi', 'Chce'] },
  { type: 'choice', s: '{Nudzi} mi się. Chodźmy gdzieś!', t: 'I\'m bored. Let\'s go somewhere!', o: ['Podoba', 'Brakuje', 'Chce'] },
]);

PL.items('SW:casual', [
  { type: 'respond', s: '— Sorry, spóźnię się dziesięć minut.\n— {Spoko}!', t: '— Sorry, I\'ll be ten minutes late. — No worries!', o: ['Smacznego', 'Wesołych Świąt', 'Pomyłka'] },
  { type: 'respond', s: '— No to {nara}!\n— Pa!', t: '— See ya! — Bye!', o: ['smacznego', 'masakra', 'gratulacje'] },
  { type: 'respond', s: '— Staliśmy w korku dwie godziny.\n— {Masakra}!', t: '— We were stuck in traffic for two hours. — What a nightmare!', o: ['Smacznego', 'Sto lat', 'Gratulacje'] },
  { type: 'respond', s: '— Ugotuję obiad, a ty zrób zakupy.\n— {Nie ma sprawy}!', t: '— I\'ll cook lunch, and you do the shopping. — No problem!', o: ['Masakra', 'Smacznego', 'Przykro mi'] },
  { type: 'respond', s: '— {Kurczę}, zapomniałem kluczy!', t: 'Darn, I forgot my keys!', o: ['Brawo', 'Smacznego', 'Gratulacje'] },
]);
