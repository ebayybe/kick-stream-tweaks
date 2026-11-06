<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · **Magyar** · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks — Változásnapló

Kiadási megjegyzések a [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks) felhasználói szkripthez, amely megjegyzi a Kick játékos beállításait, és hozzáad egy konfigurálható vezérlőpanelt.

## v1.3.1 – 2026-11-06

> Elrendezés keményítése minden nyelvhez és szövegmérethez, igazán egyedi Minimal stílus, jutalmak és elrendezési segédletek, játékos lefagyás riasztás és intelligensebb alapértelmezett nyelv.

### Hozzáadva

- **A lejátszó lefagyás riasztása.** Érzékeli az elakadt lejátszót vagy a fekete képernyőt (dekódolt képkockák nélkül mozgó videóidő), hangos riasztási hangot ad le, és értesítést jelenít meg, még akkor is, ha a fül kicsinyített. Konfigurálható érzékelési idő (5-60 s), független hangkapcsoló és tesztgomb.
- **Jutalmak automatikus igénylése** (alapértelmezés szerint ki): megnyitja a jutalmak ablakát, igényli a rendelkezésre álló tartalmat, újra bezárja és visszatér a streamhez. A jutalmak panelen megjelenő cseppek is igényelhetők. Tartalmaz egy *Igénylés most* gombot.
- **Jutalmazás ütemezése.** Alapértelmezés szerint a szkript megvárja Kick saját „igényeld a jutalmad” értesítését, és azonnal igényli azt (opcionális 0–60 másodperces késleltetéssel), a szavazás helyett. Ütemezett mód (5-60 percenként) is elérhető.
- **Gyorsigénylés gomb.** Egy kis lebegő gomb az adatfolyamon, amely egyetlen kattintással igényelheti jutalmadat. Húzza bárhová (a pozíciót a rendszer megjegyzi), válasszon egyet a négy dizájn (Orb, Pill, Glass, Flat), öt beépített ikon, egy méret és egy átlátszóság közül, opcionálisan csak akkor jelenítse meg, ha jutalom elérhető. Világít és egy pont jelenik meg, amikor megjelenik a Kick jutalomértesítése. A beállítások oldalon van egy élő előnézet.
- **Saját ikon.** PNG, JPG, WebP, GIF vagy SVG (legfeljebb 2 MB) feltöltése gombikonként, opcionálisan kitöltve a teljes gombot. A kép egy kis négyzetre kerül újrakódolásra, és csak a böngészőben tárolódik.
- **Egérgörgő a csúszkákon.** Minden csúszka állítható az egérgörgővel, miközben lebegteti, anélkül, hogy a panelt görgetné.
- **Funkció hivatkozás.** Az új `en_FUNCTIONS.md` dokumentálja az architektúrát, minden beállítást, minden funkciót és a Kick oldalának azon részeit, amelyektől a szkript függ.
- **Irányított csatornamentés.** Lépésről lépésre „Hogyan működnek a mentett csatornák” kártya, egyetlen **Csatorna mentése** gomb, amely eltárolja az éppen nézett csatorna minőségét, hangerejét, sebességét és hangját, egy kattintásos utalás a Lejátszás menüben a nem mentett csatornák esetén, egy megerősítő köszöntő, a *Szerkesztés* / *Készen mentett* gomb a beállítások törlése nélkül.
- **Csendes lejátszás.** Elnémítja az adatfolyamot a lejátszó némítása nélkül, így a lejátszás a háttérben folytatódik. Globálisan és mentett csatornánként működik (a *Silent* címke látható a csatornalistában).
- **Többnyelvű beállítások keresése.** A keresés nem érzékeny az ékezetekre, és megegyezik az angol nevekkel is, így a `volume` beírásával a beállítás bármely felület nyelvén megtalálható. A szakasz vagy a kártya címe szerinti keresés a teljes szakaszt mutatja.
- **Oldalelrendezési vezérlők**: elrejtheti a csevegést, és összecsukhatja a bal oldali menüt a panelről vagy gyorsbillentyűkkel (`Alt+C`, `Alt+S`), és lehetőség van minden adatfolyam elrendezésére.
- **Ikonanimációk** az oldalsávhoz, alaphelyzetbe állítás és súgóikonok, saját kapcsolóval (szintén az animációs beállítások része).
- A **Csatorna avatarok** a Kickből kerülnek rögzítésre, és megjelennek a mentett csatornalistában.
- 14 hangsúlyos szín (6 volt).
- A panelen belüli megerősítő párbeszédpanel, amely minden böngészőben azonosan néz ki.

### Megváltozott

- Az **Interfész nyelve** mostantól a böngésző nyelvét követi az első futtatáskor. Ha kiválaszt egy nyelvet, a rendszer emlékezni fog rá. A régebbi verziókból áttelepített beállítások követik a böngészőt, amíg a nyelvet kifejezetten meg nem választják.
- A szkript most a `document-start`-val kezdődik, így a billentyűzet elkülönítését az oldal saját figyelői előtt regisztrálja.
- A beállítási sorok egymásra vannak rakva (címke a vezérlő felett), így a szöveg soha nem fedheti át egymást vagy nem vágható össze, bármilyen nyelven, szövegméretben vagy panelszélességben. Az oldalsáv címkéi a szóhatárokon helyezkednek el.
- Az animációválasztókat teljes szélességű, ikonokkal ellátott sorokká alakítják át, így a hosszú fordítások is elférnek.
- A **Minimális** panelstílus most lapos és négyzet alakú, ragyogás nélkül, a szegélyeket elválasztók váltják fel, és aláhúzás-stílusú választás, így nyilvánvaló a különbség a **Kick**-től.
- A panel fix szélessége 680 px (zsugorodik, hogy elférjen a kis ablakokon). A panelszélesség-beállítást és az átméretező fogantyút eltávolították, így az elrendezések mindenki számára azonosak.
- Az indikátoranimáció címe már nem „zöld”, ha más kiemelő színt használ.

### Javítva

- A hangerő módosítása, a némítás, a néma lejátszás, az automatikus hangerő vagy a sebesség újra érvényre juttatta a minőséget is (újra megnyitva a minőségi menüt és megjelenítve egy értesítést). Ezek a beállítások most csak azt érintik, amit megváltoztatott; a minőség csak akkor érvényesül újra, ha a minőségi beállítás megváltozik.
- A beállítások keresésébe beírva a Kick gyorsbillentyűit indíthatja el (például a Space teljes képernyőre kapcsolta a streamet). A panelen belüli billentyűleütések már nem érik el az oldalt.
- A preferált hangerő felül lett írva, amikor a Kick visszaállította a lejátszót a saját 50%-ára az újratöltés után, és a panel csúszkája 50%-ot mutatott. Az oldal által önmagában végrehajtott módosítások most visszaállnak a mentett kötetre; csak a saját cselekedetei frissítik.
- Szövegkivágás és átfedés a Megjelenésben, Animációkban és Gyorsbillentyűkben (hosszú címkék, nagy szövegméretek, keskeny panelek, hosszú fordítások).
- A Minimal stílus csendesen letiltotta a háttér elmosódás beállítását; A blur mostantól mindkét stílusban működik.
- A gyorsigénylő gomb átlátszatlanságának módosítása nem frissítette az előnézetet.
- A csúszkák nem reagáltak az egér görgőjére.
- Animációs lapkák ("Scale", "Pop") túlcsordulnak a kártyákon.
- A profil törlésének megerősítése a böngésző natív párbeszédpaneljét használta.
- Az elalvásidőzítő chipek nincsenek lokalizálva.
- A mentett csatornákon nem volt avatar, és az aktuális csatornán sem, amíg el nem menti a profilját.

### Kompatibilitás

- A meglévő beállítások és a mentett csatornák megmaradnak a v1.3.0, v1.2.0 és v1.1.0 verzióról történő frissítéskor.
- A szkript továbbra sem küld telemetriát, és nem küld saját hálózati kérést.

### Linkek

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Kiadások](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémák](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Teljes újratervezés, logikai beállítási struktúra, újraépített animációs rendszer és egy sor megbízhatósági javítás a lejátszó automatizálásához.

### Hozzáadva

- Újratervezett panel csoportosított oldalsávval: **Lejátszó** (Lejátszás, Csatornák, Eszközök), **Figyelmeztetések** (Értesítések, hangok), **Interfész** (Megjelenés, Animációk, Parancsikonok) és **Rendszer** (Diagnosztika, adatok és körülbelül).
- Új **Animációk** oldal: élő előnézeti szakasz, három egykattintásos előbeállítás (Teljes, Csökkentett, Ki) és külön kiválasztók a nyitó effektushoz (Nincs, Eltűnés, Csúsztatás, Méretezés, Pop), lebegési effektus, indikátoranimáció és sebesség.
- Gyors előbeállítások a sávszélesség megtakarításához, a legjobb minőséghez, a csendes megtekintéshez és a VOD-hoz, azonnal alkalmazva.
- Minőségi komissiózó forgácsrácsként újratervezve; sebesség, szöveges skála és az elalvásidőzítő chipeket és szegmentált vezérlőket használ a legördülő menük helyett.
- Soron belüli csatornakezelő: keresés, rendezés, rögzítés, csoportok, jegyzetek, csatornánkénti szerkesztés és teljes biztonsági mentés/visszaállítás, mindez beágyazott párbeszédpanelek nélkül.
- Beépített hangbeállítások eseményenkénti kapcsolóval, hangerő- és előnézeti gombbal.
- Minőségellenőrzés a diagnosztikában: megnyitja a lejátszó menüt, rögzíti az elérhető minőségeket, majd ismét bezárja.
- A gyorsbillentyűk mostantól bármilyen billentyűzetkiosztáson működnek (a fizikai billentyűvel megegyeznek).
- A beállítások szinkronizálása a nyitott Kick lapok között.
- Kiemelt színminták az egyéni színválasztó mellett, magasabb szövegskála-tartomány és előnyben részesített, csökkentett mozgású védelem.

### Megváltozott

- A beállítások karcsúbb formátumban vannak tárolva; az 1.2.x konfiguráció, a gyorsbillentyűk és az animációs lehetőségek automatikusan áttelepülnek.
- A lejátszási sebesség csak akkor kerül alkalmazásra, ha az 1×-től eltér, így a Kick saját éles szélű felzárkóztatása már nem kerül felülírásra.
- A visszavonási előzmények a memóriában maradnak, ahelyett, hogy a helyi tárhelyre írnák őket.
- A hangesemények, értesítések és gyorsbillentyűk egy egységes vezérlőkészletet használnak.
- A "Helyzetprofil" választót az egykattintásos előbeállítások váltják fel.

### Javítva

- A lejátszó menüjének bezárása a minőség alkalmazása után már nem kockáztatja annak újbóli megnyitását.
- A tartalék minőség (például 720p a nem elérhető 1080p helyett) már nem írja felül a csatornához mentett preferált minőséget.
- Csak a minőségi cikkekre történő valódi kattintások frissítik az „utoljára használt” minőséget; az automatikus kattintásokat figyelmen kívül hagyja.
- A beállítások keresése már nem sikerül beírás után (az eseménycél elveszett a Shadow DOM-ban).
- Az egyik lapon végrehajtott módosítások már nem írhatják felül a másik lap beállításait.
- A panel gyorsbillentyűi már nem törnek el a nem latin elrendezéseken.
- Helytelen címkék a diagnosztikai napló vezérlőiben és egy kósza koreai szó a japán szkript címében.
- Az elakadt lejátszás ellenőrzése és az adatfolyam szinkronizálása szünetel, amíg a lap el van rejtve.

### Eltávolítva

- Funkciók, amelyeket nem lehetett ellenőrizni a Kick játékosával szemben, vagy megkettőzték azt: alacsony késleltetési idő, lejátszóvezérlők elrejtése üresjáratban és GitHub-alapú, panelen belüli frissítésellenőrzés (használd a felhasználói szkriptkezelő frissítéseit vagy a Kiadások oldalt).
- Túltervezett lehetőségek: mentett megjelenési profilok, szakaszok megjelenítése/elrejtése/átrendezése, alternatív navigációs módok, kompatibilitási és fordítási lefedettség ellenőrzések, véletlenszerű/görgető/szakasz-animációk, eseményenkénti értesítési időtartamok, csatorna avatarok, csoportszínek, kézi rendezés, tömeges kiválasztás, csatornánkénti előzmények és automatikus tisztítás.

### Kompatibilitás

- A meglévő beállítások és a mentett csatornák megmaradnak a v1.2.0 és v1.1.0 verzióról történő frissítéskor.
- A beállítások helyi szinten maradnak a böngészőben; a szkript nem küld telemetriát és nem küld hálózati kéréseket.

### Linkek

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Kiadások](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémák](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 – 2026-10-07

> Az eredeti minőség- és hangerő-segéd egy teljes lejátszóbeállítási eszköztárrá bővült.

### Hozzáadva

- Csatornánkénti profilok a minőség, a hangerő, a lejátszási sebesség és a némítási állapot érdekében.
- Mentett csatornalista jegyzetekkel, csoportokkal, profilszerkesztéssel és importálással/exportálással.
- Hangeffektusok globális kapcsolóval, egyedi eseménykapcsolókkal, előnézetekkel és eseményenkénti hangerővel.
- Értesítések minőségi változásokról, visszaállított kötetről és sikertelen műveletekről.
- Értesítési előzmények, műveleti napló és diagnosztikai eszközök világos vezérlőkkel.
- Minőségi rendelkezésre állás ellenőrzések, ütközési ellenőrzések és kompatibilitási ellenőrzések.
- Biztonságos mód az automatikus lejátszóváltás ideiglenes letiltásához.
- Gyorsbillentyűk, panel húzása, panel átméretezése és a középső panel művelete.
- Kick és Minimal panelstílusok, kompakt elrendezés és animációs vezérlők.
- Elalváskapcsoló, teljes képernyős fókusz mód, lejátszó újraszinkronizálás és lejátszásvezérlők.
- Beállítások és csatornaprofilok importálása/exportálása.
- Billentyűzet navigáció, szövegméretezés, képernyőolvasó közlemények és nagy kontraszt.
- Interfész lokalizáció 38 támogatott nyelvhez.

### Javítva

- Több másodlagos párbeszédablak egyidejű megjelenésének megakadályozása.
- A hangbeállítások ablaka felett megjelenő üres párbeszédpanel javítása.
- Figyelmen kívül hagyta az üres értesítési üzeneteket az üres fedvények megjelenítése helyett.
- Továbbfejlesztett hosszú címkecsomagolás keskeny paneleken és lokalizált elrendezéseken.
- Javítva a `{quality}` és a `{q}` helyőrző cseréje az értesítésekben.
- Frissítettük a panelen belüli verziócímkét és frissítjük az összehasonlítást 1.2.0-ra.

### Kompatibilitás

- A meglévő beállítások megmaradnak a v1.1.0 verzióról történő frissítéskor.
- A beállítások helyi szinten maradnak a böngészőben; the script does not send telemetry.
- A frissítés-ellenőrző beolvassa a legújabb GitHub kiadási címkét, és nem telepíti automatikusan a frissítéseket.

### Linkek

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Kiadások](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémák](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Az eredeti nyilvános verzió arra összpontosított, hogy megjegyezze a videó minőségét és hangerejét a Kicknél, automatikusan alkalmazza ezeket az új streamekre, és biztosítson egy F2 beállítási panelt.
