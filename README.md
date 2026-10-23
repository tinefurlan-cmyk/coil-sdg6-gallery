# COIL – predloga interaktivne spletne galerije

**Predloga za delo v paru (1. letnik).** Končna spletna stran mora biti **v angleščini**. Slovenska navodila so samo v tej datoteki.

## 1. Kaj vsebuje predloga?
- Naslovnica in izbrani SDG.
- Opis težave.
- Fotogalerija s filtri in povečanjem fotografij.
- Delujoč kviz z rezultatom.
- Demonstracijska anketa s takojšnjim grafom.
- Predlogi rešitev, potek projekta, predstavitev obeh dijakov, zaključek.
- Prilagoditev mobilnim napravam.

## 2. Kako jo prilagodita?
1. Odprite `index.html` in zamenjajte vse primere besedil z lastno vsebino v angleščini.
2. V `assets/images/` naložita **vsaj 12 svojih fotografij** (6 na dijaka), npr. `ana-01.jpg`, `luka-01.jpg`. Fotografije predhodno obdelajta in zmanjšajta za splet.
3. V `gallery-data.js` zamenjajta poti do vzorčnih slik (`assets/images/sample-01.svg` itd.) s potmi do svojih fotografij. Popravita naslove, opise, kategorije in avtorje.
4. V `style.css` prilagodita barve, tipografijo in oblikovanje.
5. V `script.js` spremenita vprašanja kviza (`questions`) in možnosti. Preverita, ali se pravilni odgovor (`answer`) ujema z indeksom možnosti, ki se začne pri **0**.
6. Za anketo spremenita vprašanje in možnosti v `index.html`; če spreminjata možnosti, uskladita tudi `choices`, `votes` in oznake v `script.js`.
7. Zamenjajta označena mesta za video z vdelavo obeh predstavitvenih videoposnetkov iz 3. naloge. Za YouTube uporabita URL za **embed**, ne običajne povezave do videa. Primer: `<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="Student introduction" loading="lazy" allowfullscreen></iframe>`. Priporočamo `aspect-ratio:16/9; width:100%; border:0;`.
8. Dodajta lastno interaktivno rešitev ali nadgradita kviz/anketo.
9. Preverita povezave, prikaz na telefonu, delovanje kviza in fotografij.

**Pomembno glede ankete:** prikazani glasovi se shranjujejo le v brskalniku obiskovalca (`localStorage`). To **ni skupna anketa** in ne zbira glasov vseh obiskovalcev. Za skupne rezultate je potrebna podatkovna zbirka in storitev/backend (npr. Supabase ali Firebase) z ustrezno varnostjo in zasebnostjo. Kviz deluje brez strežnika.

## 3. Skupno delo na GitHubu
1. Dijak A ustvari **Public** repozitorij in vanj naloži vse datoteke iz te mape (tako da je `index.html` v korenu repozitorija).
2. V `Settings → Collaborators → Add people` povabi dijaka B; dijak B povabilo sprejme.
3. Priporočeno: vsak ustvari svojo vejo iz `main`, npr. `feature/photos-ana` in `feature/quiz-luka`.
4. Vsak ureja svoj del in shranjuje spremembe z razumljivimi *commit* sporočili.
5. Vsak ustvari *Pull Request* v `main`; sošolec spremembe pregleda in po potrebi komentira.
6. Združita spremembe (*Merge*) in preverita delovanje.
7. **Pozor:** ne urejajta istih vrstic `index.html` ali `style.css` istočasno, sicer lahko nastanejo konflikti pri združevanju.

## 4. Objava na GitHub Pages
V repozitoriju: `Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save`. Objava lahko traja nekaj minut. Povezava je običajno `https://uporabnisko-ime.github.io/ime-repozitorija/`.

## 5. Obvezno zamenjajta
- [ ] SDG in naslov galerije
- [ ] Vse vzorčne opise in napise ✎ REPLACE
- [ ] Vseh 12 vzorčnih SVG-slik s svojimi fotografijami
- [ ] Vprašanja interaktivnega kviza ali lastno interaktivno rešitev
- [ ] Oba predstavitvena videoposnetka
- [ ] Imeni obeh dijakov in njun prispevek
- [ ] Končno sporočilo in relevantne vire
- [ ] Preverita delovanje GitHub Pages

## 6. Viri
- https://docs.github.com/en/pages
- https://github.com/skills/introduction-to-github
- https://github.com/skills/review-pull-requests

Vzorčne slike so **grafični nadomestki**, ne fotografije za oddajo. Predloga ne vsebuje zunanjih knjižnic JavaScript; spletna pisava se naloži prek Google Fonts (če ni povezave, se uporabi nadomestna pisava).
