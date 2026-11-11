<div align="center">

[English](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/en_README.md) · [العربية](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/ar_README.md) · [Беларуская](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/be_README.md) · [Български](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/bg_README.md) · [Čeština](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/cs_README.md) · [Dansk](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/da_README.md) · [Deutsch](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/de_README.md) · [Ελληνικά](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/el_README.md) · [Español](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/es_README.md) · [Suomi](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/fi_README.md) · [Français](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/fr_README.md) · [हिन्दी](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/hi_README.md) · [English (India)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/en-in_README.md) · [Hrvatski](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/hr_README.md) · **Magyar** · [Bahasa Indonesia](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/id_README.md) · [Italiano](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/it_README.md) · [日本語](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/ja_README.md) · [한국어](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/ko_README.md) · [Lietuvių](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/lt_README.md) · [Latviešu](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/lv_README.md) · [Македонски](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/mk_README.md) · [Монгол](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/mn_README.md) · [Bahasa Melayu](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/ms_README.md) · [Nederlands](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/nl_README.md) · [Norsk](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/no_README.md) · [Polski](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/pl_README.md) · [Português](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/pt_README.md) · [Română](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/ro_README.md) · [Русский](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/ru_README.md) · [Slovenčina](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/sk_README.md) · [Srpski](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/sr_README.md) · [Svenska](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/sv_README.md) · [ไทย](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/th_README.md) · [Türkçe](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/tr_README.md) · [Tiếng Việt](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/vi_README.md) · [简体中文](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/zh-cn_README.md) · [繁體中文](https://github.com/ebayybe/kick-stream-tweaks/blob/main/README/zh-tw_README.md)

# Kick Stream Tweaks

**Az Ön Kick lejátszója, emlékezett.** A minőség, a hangerő és a sebesség automatikusan visszaáll minden adatfolyamon, a gyors, teljesen lokalizált vezérlőpanellel.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.2-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Telepítés](#installation) · [Jellemzők](#features) · [Beállítások térkép](#settings-map) · [Parancsikonok](#shortcuts) · [Funkció hivatkozás](https://github.com/ebayybe/kick-stream-tweaks/blob/main/docs/hu_FUNCTIONS.md) · [Változásnapló](https://github.com/ebayybe/kick-stream-tweaks/blob/main/CHANGELOG/hu_CHANGELOG.md) · [Kiadások](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Jellemzők

- **Kapadó minőség.** Válasszon egyszer egy élő és egy VOD minőséget; minden új adatfolyamra alkalmazzák. Ha a pontos minőség hiányzik, a szkript visszaesik a következő alacsonyabbra (vagy Auto-ra).
- **Rakadó hangerő.** A hangerő és a némítás streamenként visszaáll hangos hangerő-figyelmeztetéssel és egy élő csúszkával, amely szinkronban marad a lejátszóval.
- **Csatornánkénti profilok.** Nyisson meg egy adatfolyamot, nyomja meg a **Csatorna mentése** gombot, és a csatorna megjegyzi saját minőségét, hangerejét, sebességét és hangját. Adjon hozzá egy csoportot és egy megjegyzést, szüneteltesse a mentett beállításokat, vagy zárja ki teljesen a csatornát az automatizálásból.
- **Gyors előbeállítások.** Takarítson meg sávszélességet, a legjobb minőséget, csendes megtekintést és VOD-t egyetlen kattintással.
- **Eszközök.** Elalvásidőzítő, fókusznézet, lejátszó újraszinkronizálása, oldalelrendezési vezérlők (csevegés elrejtése, bal oldali menü összecsukása) és biztonságos mód, amely szünetelteti az összes automatikus változtatást.
- **Fagyásjelző.** Hangos riasztást ad, és értesítést jelenít meg, ha a lejátszó lefagy, vagy fekete képernyőt jelenít meg, még akkor is, ha a fül kicsinyített.
- **Gyorsigénylés gomb.** Lebegő, húzható gomb, amely egyetlen kattintással igényelheti jutalmát. Négy minta, öt ikon vagy saját kép, állítható méret és átlátszóság.
- **Jutalmak automatikus igénylése.** Nem kötelező: megvárja Kick jutalomértesítését (vagy ellenőrzi az ütemezést), igényli a rendelkezésre álló mennyiséget, és újra bezárja az ablakot (alapértelmezés szerint ki van kapcsolva).
- **Csendes lejátszás.** Elnémítja az adatfolyamot a lejátszó némítása nélkül, így a lejátszás a háttérben folytatódik. Állítsa be globálisan vagy mentett csatornánként.
- **Figyelmeztetések.** Húzható, átméretezhető és elnémítható értesítések, valamint opcionális hangeffektusok eseményenkénti hangerővel.
- **Újratervezett felület.** Csoportosított oldalsáv, beállítások keresése, világos és sötét témák, kiemelő színek, kompakt mód, szövegméretezés és nagy kontraszt.
- **Az Ön által vezérelt animációk.** Élő előnézet, három előre beállított beállítás és külön nyitó, lebegtető és jelző effektusok. Betartja a rendszer „mozgáscsökkentés” beállítását.
- **38 nyelv** zászlókkal. A kezelőfelület az első futtatáskor követi a böngésző nyelvét, és utána megjegyzi a választását.
- **Kitervezés szerint privát.** Minden a böngészőben marad. Nincs telemetria, nincsenek hálózati kérések.

<a id="installation"></a>
## Telepítés

1. Felhasználói szkriptkezelő telepítése: [Tampermonkey](https://www.tampermonkey.net/) vagy [Violentmonkey](https://violentmonkey.github.io/).
2. Nyitott [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) és erősítse meg a telepítést.
3. Nyissa meg bármelyik adatfolyamot [kick.com](https://kick.com) és nyomja meg az **F2** billentyűt.

A frissítéseket a felhasználói szkript-kezelő szállítja. Meg lehet nézni a [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) oldalon.

## Csatorna beállításainak mentése

1. Nyissa meg a testreszabni kívánt csatorna adatfolyamát.
2. Nyissa ki a panelt (`F2`) és nyomja meg a **Csatorna mentése** gombot (a **Csatornák** oldalon vagy a **Lejátszás** oldalon található tippből). Az aktuális minőség-, hangerő-, sebesség- és hangbeállítások tárolásra kerülnek az adott csatornához.
3. Finomítsa őket a gomb alatti szerkesztőben. A csatorna minden megnyitásakor automatikusan alkalmazásra kerülnek.

Használja a **A mentett beállítások alkalmazása ezen a csatornán** kapcsolót a profil törlés nélküli szüneteltetéséhez, vagy az **Eltávolítás** kapcsolót a törléshez. Az összes mentett csatorna a **Csatornák → Mentett csatornák** alatt található, ahol kereshet, rendezhet, rögzíthet, csoportosíthat, jegyzeteket adhat hozzá, biztonsági másolatot készíthet és visszaállíthatja őket.

<a id="settings-map"></a>
## Beállítások térkép

| Csoport | oldal | Mi van belül |
| --- | --- | --- |
| Játékos | **Lejátszás** | Előbeállítások, élő/VOD minőség, tartalék, hangerő, némítás, hangos hangerő-figyelmeztetés, sebesség |
| Játékos | **Csatornák** | Aktuális csatornaprofil, mentett csatornák, keresés, csoportok, jegyzetek, biztonsági mentés |
| Játékos | **Eszközök** | Elalváskapcsoló, oldalelrendezés, jutalmak automatikus igénylése, gyorsigénylés gomb, lefagyás, gyors műveletek, fókusznézet |
| Figyelmeztetések | **Értesítések** | Ne zavarjanak, méret, időtartam, átlátszatlanság, pozíció, előzmények |
| Figyelmeztetések | **Hangok** | Főkapcsoló és hangerő, eseményenkénti kapcsoló, hangerő és előnézet |
| Felület | **Megjelenés** | Téma, panelstílus, kiemelő szín, sűrűség, kontraszt, elmosódás, szöveg léptéke, nyelv |
| Felület | **Animációk** | Élő előnézet, előbeállítások, nyitó/lebegő/jelző effektusok, sebesség |
| Felület | **Gyorsbillentyűk** | Menü gyorsbillentyűk és műveletek gyorsbillentyűi |
| Rendszer | **Diagnosztika** | Élő állapot, minőségellenőrzés, ütközésellenőrzés, csökkentett mód, műveletnapló |
| Rendszer | **Adatok és körülbelül** | Exportálás, importálás, visszavonás, visszaállítás, biztonsági mentés visszaállítása, hivatkozások |

Minden csúszka az egér görgőjére is reagál, miközben Ön rámutat. Használja a panel tetején található keresőmezőt bármely beállítás név szerinti megkereséséhez. A kereső az angol neveket is megérti, így minden felületi nyelven ugyanúgy működik, és az oda beírt billentyűk soha nem jutnak el az oldalra.

## Gyors igénylés gomb

Engedélyezze az **Eszközök → Gyorskövetelés gombban az oldalon**. Egy kis gomb jelenik meg az adatfolyamon:

- **Húzza** bárhová; helyzetére emlékeznek.
- **Kattintson** rá a jutalom igényléséhez (megnyitja a jutalmak ablakát, megnyomja a *Claim* gombot, bezárja az ablakot és visszatér a streamhez).
- **villog és piros pont jelenik meg**, amikor megjelenik a Kick jutalomértesítése. Kapcsolja be a *Csak akkor jelenjen meg, ha elérhető jutalom* beállítást, hogy a fennmaradó időben rejtve maradjon.
- Válasszon egy **stílust** (Orb, Pill, Glass, Flat), egy beépített **ikont** vagy **saját képet** (PNG, JPG, WebP, GIF vagy SVG 2 MB-ig; a négyzet alakú, átlátszó háttérrel rendelkező képek néznek ki a legjobban), **méretet** és **átlátszatlanságot**. Az élő előnézetben minden változás látható.

A gomb különálló az *jutalmak automatikus igénylése* funkciótól, így kézi, automatikus vagy mindkettőt igényelhet.

<a id="shortcuts"></a>
## Parancsikonok

| Akció | Alapértelmezett |
| --- | --- |
| Nyissa ki / zárja be a panelt | `F2` |
| Kapcsolja be az értesítéseket | `Alt+N` |
| Csevegés váltása | `Alt+C` |
| Váltás a bal oldali menüben | `Alt+S` |
| Fókusz nézet | `Alt+F` |
| Minőség visszaállítása | `Alt+Q` |
| Hangerő visszaállítása | `Alt+V` |

Minden parancsikon visszaállítható a **Gyorsbillentyűk** részben. A kötések a fizikai billentyűt követik, így bármilyen billentyűzetkiosztáson működnek.

<a id="languages"></a>
## Nyelvek

Arab, fehérorosz, bolgár, kínai (egyszerűsített), kínai (hagyományos), horvát, cseh, dán, holland, angol, angol (India), finn, francia, német, görög, hindi, magyar, indonéz, olasz, japán, koreai, lett, litván, macedón, maláj, mongol, svéd, norvég, lengyel, portugál, román, thai, szlovák, orosz és vietnami.

## Hibaelhárítás

- **A minőség nem érvényes.** Nyissa meg a **Diagnosztika** elemet, nyomja meg a *Diagnosztika frissítése* gombot a Kick által kínált minőségek ellenőrzéséhez, majd a *Ellenőrizze a kiválasztott minőséget*. Ha egy csatorna ki van zárva, vagy a biztonságos mód be van kapcsolva, az állapotsor ezt jelzi.
- **A jutalmak nem igényelhetők.** Az automatikus igénylés alapértelmezés szerint ki van kapcsolva. Engedélyezze az **Eszközök → Jutalmak** menüpontban, és próbálja ki az *Igénylés most* lehetőséget. Csak élő csatornákon működik, miközben a fül látható, és nem ír be a chatbe. *Értesítés* módban a szkript reagál Kick saját jutalomszalagjára.
- **Csendes lejátszás és hang.** A csendes lejátszás nulla erősítéssel továbbítja a videót a böngésző audiomotorján. Ha egy webhely ezt blokkolja, a panel jelzi, és a normál hang érintetlenül marad.
- **Valami furcsán viselkedik.** Futtassa az *Ellenőrizze az ütközéseket*, vagy használja a *Reset szakaszt* a kérdéses oldalon.
- **Frissítés után rossznak tűnnek a beállítások.** Használja az **Adatok és kb. → Visszavonás** vagy a **Biztonsági mentés visszaállítása** lehetőséget.
- **Hibát talált?** Nyomja meg a *Diagnosztika másolása* gombot, és csatolja a [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Magánélet

A beállítások és a csatornaprofilok a böngésződ helyi tárhelyén vannak tárolva a kick.com oldalon. A szkript soha nem küld adatokat sehova, és nem kér extra engedélyeket (`@grant none`).

## Hozzájárulás

A problémákat és a lehívási kéréseket szívesen fogadjuk. A szkript egyetlen önálló fájl, így nincs szükség összeépítési lépésre a módosítás kipróbálásához: szerkesztés `kick-stream-tweaks.user.js` és töltse be újra az oldalt.

## Engedély

[MIT](./LICENSE)
