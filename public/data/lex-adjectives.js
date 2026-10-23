/* ═══════════════════════════════════════════════════════════════
   data/lex-adjectives.js — Adjectives, determiners, pronouns

   Regular adjectives: the whole paradigm is generated from the
   masculine form + the virile plural (vir), which has its own
   consonant changes (dobry → dobrzy, polski → polscy, duży → duzi).
   comp = comparative (its paradigm is generated too).
   ═══════════════════════════════════════════════════════════════ */

PL.pattern('adj', {
  t: 'Adjective endings', kind: 'adj',
  models: ['nowy', 'polski', 'dobry'],
  note: 'Hard stems (nowy): *-y, -ego, -emu, -ym · -a, -ej, -ą · -e · -ych, -ym, -ymi*. After k/g the y becomes i (polski, polskiego, polskich). The masculine accusative is *nowy* for things but *nowego* for people and animals. The virile plural (men or mixed groups) has its own ending with consonant changes: nowi, dobrzy, polscy, drodzy, duzi.',
});

PL.pattern('det', {
  t: 'Determiners: ten, mój, nasz', kind: 'adj',
  models: ['nasz', 'mój', 'ten'],
  note: '*ten* (this): feminine accusative is *tę* in careful Polish (*tę książkę*), instrumental *tą*. Virile plural: *ci* (ci panowie), *moi*, *nasi*.',
});

PL.pattern('pron', {
  t: 'Personal pronouns', kind: 'pron',
  models: ['ja', 'ty', 'on', 'ona', 'my', 'wy', 'oni'],
  note: 'Short forms (*mi, ci, mu, go, cię*) are the normal unstressed ones; long forms (*mnie, tobie, jemu, jego, ciebie*) are for emphasis or the start of a sentence. After a preposition, third-person pronouns take an **n-**: do niego, z nim, o niej, dla nich.',
});

/* ── Regular adjectives ── */

PL.adj('dobry', { m: 'good', vir: 'dobrzy', comp: 'lepszy', adv: 'dobrze' });
PL.adj('zły', { m: 'bad; angry', vir: 'źli', comp: 'gorszy', adv: 'źle' });
PL.adj('nowy', { m: 'new', vir: 'nowi', comp: 'nowszy' });
PL.adj('stary', { m: 'old', vir: 'starzy', comp: 'starszy' });
PL.adj('młody', { m: 'young', vir: 'młodzi', comp: 'młodszy', adv: 'młodo' });
PL.adj('duży', { m: 'big', vir: 'duzi', comp: 'większy', adv: 'dużo' });
PL.adj('mały', { m: 'small', vir: 'mali', comp: 'mniejszy', adv: 'mało' });
PL.adj('wielki', { m: 'great, huge', vir: 'wielcy', comp: 'większy' });
PL.adj('ładny', { m: 'pretty, nice', vir: 'ładni', comp: 'ładniejszy', adv: 'ładnie' });
PL.adj('piękny', { m: 'beautiful', vir: 'piękni', comp: 'piękniejszy', adv: 'pięknie' });
PL.adj('miły', { m: 'nice, kind', vir: 'mili', comp: 'milszy', adv: 'miło' });
PL.adj('ciekawy', { m: 'interesting; curious', vir: 'ciekawi', comp: 'ciekawszy', adv: 'ciekawie' });
PL.adj('polski', { m: 'Polish', vir: 'polscy' });
PL.adj('fiński', { m: 'Finnish', vir: 'fińscy' });
PL.adj('angielski', { m: 'English', vir: 'angielscy' });
PL.adj('wysoki', { m: 'tall, high', vir: 'wysocy', comp: 'wyższy', adv: 'wysoko' });
PL.adj('niski', { m: 'short, low', vir: 'niscy', comp: 'niższy', adv: 'nisko' });
PL.adj('tani', { m: 'cheap', vir: 'tani', comp: 'tańszy', adv: 'tanio' });
PL.adj('drogi', { m: 'expensive; dear', vir: 'drodzy', comp: 'droższy', adv: 'drogo' });
PL.adj('szybki', { m: 'fast', vir: 'szybcy', comp: 'szybszy', adv: 'szybko' });
PL.adj('wolny', { m: 'slow; free', vir: 'wolni', comp: 'wolniejszy', adv: 'wolno' });
PL.adj('cichy', { m: 'quiet', vir: 'cisi', comp: 'cichszy', adv: 'cicho' });
PL.adj('głośny', { m: 'loud', vir: 'głośni', comp: 'głośniejszy', adv: 'głośno' });
PL.adj('ciepły', { m: 'warm', vir: 'ciepli', comp: 'cieplejszy', adv: 'ciepło' });
PL.adj('zimny', { m: 'cold', vir: 'zimni', comp: 'zimniejszy', adv: 'zimno' });
PL.adj('łatwy', { m: 'easy', vir: 'łatwi', comp: 'łatwiejszy', adv: 'łatwo' });
PL.adj('trudny', { m: 'difficult', vir: 'trudni', comp: 'trudniejszy', adv: 'trudno' });
PL.adj('smutny', { m: 'sad', vir: 'smutni', comp: 'smutniejszy', adv: 'smutno' });
PL.adj('wesoły', { m: 'cheerful', vir: 'weseli', comp: 'weselszy', adv: 'wesoło' });
PL.adj('szczęśliwy', { m: 'happy', vir: 'szczęśliwi', comp: 'szczęśliwszy', adv: 'szczęśliwie' });
PL.adj('zmęczony', { m: 'tired', vir: 'zmęczeni' });
PL.adj('gotowy', { m: 'ready', vir: 'gotowi' });
PL.adj('chory', { m: 'ill, sick', vir: 'chorzy' });
PL.adj('zdrowy', { m: 'healthy', vir: 'zdrowi', comp: 'zdrowszy', adv: 'zdrowo' });
PL.adj('czerwony', { m: 'red', vir: 'czerwoni' });
PL.adj('biały', { m: 'white', vir: 'biali', comp: 'bielszy', adv: 'biało' });
PL.adj('czarny', { m: 'black', vir: 'czarni', comp: 'czarniejszy', adv: 'czarno' });
PL.adj('zielony', { m: 'green', vir: 'zieloni' });
PL.adj('długi', { m: 'long', vir: 'dłudzy', comp: 'dłuższy', adv: 'długo' });
PL.adj('krótki', { m: 'short', vir: 'krótcy', comp: 'krótszy', adv: 'krótko' });
PL.adj('mądry', { m: 'wise, clever', vir: 'mądrzy', comp: 'mądrzejszy', adv: 'mądrze' });
PL.adj('głupi', { m: 'stupid, silly', vir: 'głupi', comp: 'głupszy', adv: 'głupio' });
PL.adj('bogaty', { m: 'rich', vir: 'bogaci', comp: 'bogatszy', adv: 'bogato' });
PL.adj('biedny', { m: 'poor', vir: 'biedni', comp: 'biedniejszy', adv: 'biednie' });
PL.adj('ostatni', { m: 'last', vir: 'ostatni' });
PL.adj('pierwszy', { m: 'first', vir: 'pierwsi' });
PL.adj('ważny', { m: 'important', vir: 'ważni', comp: 'ważniejszy' });
PL.adj('zajęty', { m: 'busy; occupied', vir: 'zajęci' });
PL.adj('jaki', { m: 'what kind of; what', vir: 'jacy' });
PL.adj('który', { m: 'which; who / that (relative)', vir: 'którzy' });

/* ── Determiners with irregular forms ── */

PL.adj('ten', { m: 'this, that', forms: {
  'm.NOM': 'ten', 'm.GEN': 'tego', 'm.DAT': 'temu', 'm.ACC': 'ten/tego', 'm.INS': 'tym', 'm.LOC': 'tym',
  'f.NOM': 'ta', 'f.GEN': 'tej', 'f.DAT': 'tej', 'f.ACC': 'tę', 'f.INS': 'tą', 'f.LOC': 'tej',
  'n.NOM': 'to', 'n.GEN': 'tego', 'n.DAT': 'temu', 'n.ACC': 'to', 'n.INS': 'tym', 'n.LOC': 'tym',
  'v.NOM': 'ci', 'v.GEN': 'tych', 'v.DAT': 'tym', 'v.ACC': 'tych', 'v.INS': 'tymi', 'v.LOC': 'tych',
  'p.NOM': 'te', 'p.GEN': 'tych', 'p.DAT': 'tym', 'p.ACC': 'te', 'p.INS': 'tymi', 'p.LOC': 'tych',
}, note: 'Feminine accusative *tę* (tę książkę) vs instrumental *tą* (z tą książką). In speech many people say *tą* for both, but *tę* is the standard.' });

PL.adj('mój', { m: 'my, mine', forms: {
  'm.NOM': 'mój', 'm.GEN': 'mojego/mego', 'm.DAT': 'mojemu/memu', 'm.ACC': 'mój/mojego', 'm.INS': 'moim', 'm.LOC': 'moim',
  'f.NOM': 'moja', 'f.GEN': 'mojej', 'f.DAT': 'mojej', 'f.ACC': 'moją', 'f.INS': 'moją', 'f.LOC': 'mojej',
  'n.NOM': 'moje', 'n.GEN': 'mojego/mego', 'n.DAT': 'mojemu/memu', 'n.ACC': 'moje', 'n.INS': 'moim', 'n.LOC': 'moim',
  'v.NOM': 'moi', 'v.GEN': 'moich', 'v.DAT': 'moim', 'v.ACC': 'moich', 'v.INS': 'moimi', 'v.LOC': 'moich',
  'p.NOM': 'moje', 'p.GEN': 'moich', 'p.DAT': 'moim', 'p.ACC': 'moje', 'p.INS': 'moimi', 'p.LOC': 'moich',
}, note: 'ó → o before endings: moja, mojego. *twój* and *swój* go exactly the same way.' });

PL.adj('twój', { m: 'your, yours (one person)', forms: {
  'm.NOM': 'twój', 'm.GEN': 'twojego/twego', 'm.DAT': 'twojemu/twemu', 'm.ACC': 'twój/twojego', 'm.INS': 'twoim', 'm.LOC': 'twoim',
  'f.NOM': 'twoja', 'f.GEN': 'twojej', 'f.DAT': 'twojej', 'f.ACC': 'twoją', 'f.INS': 'twoją', 'f.LOC': 'twojej',
  'n.NOM': 'twoje', 'n.GEN': 'twojego/twego', 'n.DAT': 'twojemu/twemu', 'n.ACC': 'twoje', 'n.INS': 'twoim', 'n.LOC': 'twoim',
  'v.NOM': 'twoi', 'v.GEN': 'twoich', 'v.DAT': 'twoim', 'v.ACC': 'twoich', 'v.INS': 'twoimi', 'v.LOC': 'twoich',
  'p.NOM': 'twoje', 'p.GEN': 'twoich', 'p.DAT': 'twoim', 'p.ACC': 'twoje', 'p.INS': 'twoimi', 'p.LOC': 'twoich',
} });

PL.adj('swój', { m: "one's own (my/your/his… own)", forms: {
  'm.NOM': 'swój', 'm.GEN': 'swojego/swego', 'm.DAT': 'swojemu/swemu', 'm.ACC': 'swój/swojego', 'm.INS': 'swoim', 'm.LOC': 'swoim',
  'f.NOM': 'swoja', 'f.GEN': 'swojej', 'f.DAT': 'swojej', 'f.ACC': 'swoją', 'f.INS': 'swoją', 'f.LOC': 'swojej',
  'n.NOM': 'swoje', 'n.GEN': 'swojego/swego', 'n.DAT': 'swojemu/swemu', 'n.ACC': 'swoje', 'n.INS': 'swoim', 'n.LOC': 'swoim',
  'v.NOM': 'swoi', 'v.GEN': 'swoich', 'v.DAT': 'swoim', 'v.ACC': 'swoich', 'v.INS': 'swoimi', 'v.LOC': 'swoich',
  'p.NOM': 'swoje', 'p.GEN': 'swoich', 'p.DAT': 'swoim', 'p.ACC': 'swoje', 'p.INS': 'swoimi', 'p.LOC': 'swoich',
}, note: '*swój* refers back to the subject: *Marek kocha swoją żonę* (his own wife) vs *Marek kocha jego żonę* (someone else\'s).' });

PL.adj('nasz', { m: 'our, ours', forms: {
  'm.NOM': 'nasz', 'm.GEN': 'naszego', 'm.DAT': 'naszemu', 'm.ACC': 'nasz/naszego', 'm.INS': 'naszym', 'm.LOC': 'naszym',
  'f.NOM': 'nasza', 'f.GEN': 'naszej', 'f.DAT': 'naszej', 'f.ACC': 'naszą', 'f.INS': 'naszą', 'f.LOC': 'naszej',
  'n.NOM': 'nasze', 'n.GEN': 'naszego', 'n.DAT': 'naszemu', 'n.ACC': 'nasze', 'n.INS': 'naszym', 'n.LOC': 'naszym',
  'v.NOM': 'nasi', 'v.GEN': 'naszych', 'v.DAT': 'naszym', 'v.ACC': 'naszych', 'v.INS': 'naszymi', 'v.LOC': 'naszych',
  'p.NOM': 'nasze', 'p.GEN': 'naszych', 'p.DAT': 'naszym', 'p.ACC': 'nasze', 'p.INS': 'naszymi', 'p.LOC': 'naszych',
}, note: 'Virile plural *nasi* (sz → s): *nasi przyjaciele*. *wasz* (your, plural) goes the same way: wasi.' });

PL.adj('wasz', { m: 'your, yours (several people)', forms: {
  'm.NOM': 'wasz', 'm.GEN': 'waszego', 'm.DAT': 'waszemu', 'm.ACC': 'wasz/waszego', 'm.INS': 'waszym', 'm.LOC': 'waszym',
  'f.NOM': 'wasza', 'f.GEN': 'waszej', 'f.DAT': 'waszej', 'f.ACC': 'waszą', 'f.INS': 'waszą', 'f.LOC': 'waszej',
  'n.NOM': 'wasze', 'n.GEN': 'waszego', 'n.DAT': 'waszemu', 'n.ACC': 'wasze', 'n.INS': 'waszym', 'n.LOC': 'waszym',
  'v.NOM': 'wasi', 'v.GEN': 'waszych', 'v.DAT': 'waszym', 'v.ACC': 'waszych', 'v.INS': 'waszymi', 'v.LOC': 'waszych',
  'p.NOM': 'wasze', 'p.GEN': 'waszych', 'p.DAT': 'waszym', 'p.ACC': 'wasze', 'p.INS': 'waszymi', 'p.LOC': 'waszych',
} });

Object.values(PL.LEX).forEach(L => {
  if (L.pos === 'adj' && !L.cls) L.cls = ['ten', 'mój', 'twój', 'swój', 'nasz', 'wasz'].includes(L.lemma) ? 'det' : 'adj';
});

/* ── Personal pronouns ──
   NOM GEN DAT ACC INS LOC VOC; variants = long / short / after a preposition */

PL.pronoun('ja', { m: 'I', forms: 'ja mnie mi/mnie mnie mną mnie -' });
PL.pronoun('ty', { m: 'you (one person)', forms: 'ty ciebie/cię tobie/ci ciebie/cię tobą tobie ty' });
PL.pronoun('on', { m: 'he; it (masc.)', forms: 'on jego/go/niego jemu/mu/niemu jego/go/niego nim nim -' });
PL.pronoun('ona', { m: 'she; it (fem.)', forms: 'ona jej/niej jej/niej ją/nią nią niej -' });
PL.pronoun('ono', { m: 'it (neut.)', forms: 'ono jego/go/niego jemu/mu/niemu je/nie nim nim -' });
PL.pronoun('my', { m: 'we', forms: 'my nas nam nas nami nas -' });
PL.pronoun('wy', { m: 'you (several people)', forms: 'wy was wam was wami was wy' });
PL.pronoun('oni', { m: 'they (men / mixed)', forms: 'oni ich/nich im/nim ich/nich nimi nich -' });
PL.pronoun('one', { m: 'they (women, things)', forms: 'one ich/nich im/nim je/nie nimi nich -' });
PL.pronoun('siebie', { m: 'oneself (reflexive)', forms: '- siebie sobie siebie/się sobą sobie -',
  note: 'One reflexive pronoun for every person: *myję się* (I wash myself), *kupiłeś sobie* (you bought yourself), *mówi o sobie* (talks about himself).' });
PL.pronoun('kto', { m: 'who', forms: 'kto kogo komu kogo kim kim -' });
PL.pronoun('co', { m: 'what', forms: 'co czego czemu co czym czym -' });

Object.values(PL.LEX).forEach(L => { if (L.pos === 'pron' && !L.cls) L.cls = 'pron'; });
