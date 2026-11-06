<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · **Slovenčina** · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Váš prehrávač Kick, zapamätaný.** Kvalita, hlasitosť a rýchlosť sa automaticky obnovia pri každom streame s rýchlym, plne lokalizovaným ovládacím panelom.

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Inštalovať](#installation) · [Vlastnosti](#features) · [Mapa nastavení](#settings-map) · [Skratky](#shortcuts) · [Odkaz na funkciu](../docs/sk_FUNCTIONS.md) · [Denník zmien](../CHANGELOG/sk_CHANGELOG.md) · [Vydania](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Vlastnosti

- **Kvalita, ktorá sa drží.** Vyberte si živú kvalitu a kvalitu VOD raz; aplikuje sa na každý nový stream. Ak chýba presná kvalita, skript sa vráti na najbližšiu nižšiu (alebo na Auto).
- **Hlasitosť, ktorá sa drží.** Hlasitosť a stlmenie sa obnovia pri každom streame s hlasným upozornením na hlasitosť a živým posúvačom, ktorý zostáva synchronizovaný s prehrávačom.
- **Profily pre jednotlivé kanály.** Otvorte stream, stlačte **Uložiť tento kanál** a daný kanál si zapamätá svoju vlastnú kvalitu, hlasitosť, rýchlosť a zvuk. Pridajte skupinu a poznámku, pozastavte uložené nastavenia alebo úplne vylúčte kanál z automatizácie.
- **Rýchle predvoľby.** Šetrite šírku pásma, najlepšiu kvalitu, tiché sledovanie a VOD jediným kliknutím.
- **Nástroje.** Časovač spánku, zobrazenie zamerania, opätovná synchronizácia prehrávača, ovládacie prvky rozloženia stránky (skryť chat, zbaliť ľavú ponuku) a núdzový režim, ktorý pozastaví všetky automatické zmeny.
- **Alarm zmrazenia.** Prehrá hlasný budík a zobrazí upozornenie, keď prehrávač zamrzne alebo sa zobrazí čierna obrazovka, aj keď je karta minimalizovaná.
- **Tlačidlo rýchleho nároku.** Plávajúce, presúvateľné tlačidlo, ktoré si nárokuje vašu odmenu jedným kliknutím. Štyri dizajny, päť ikon alebo vlastný obrázok, nastaviteľná veľkosť a nepriehľadnosť.
- **Automatický nárok na odmeny.** Voliteľné: čaká na Kickove upozornenie na odmenu (alebo skontroluje plán), nárokuje si, čo je k dispozícii, a znova zatvorí okno (štandardne vypnuté).
- **Tiché prehrávanie.** Stlmí stream bez stlmenia prehrávača, takže sa bude naďalej prehrávať na karte na pozadí. Nastavte ho globálne alebo podľa uloženého kanála.
- **Upozornenia.** Upozornenia, ktoré môžete presunúť, zmeniť veľkosť a stlmiť, plus voliteľné zvukové efekty s hlasitosťou pre jednotlivé udalosti.
- **Prepracované rozhranie.** Zoskupený bočný panel, vyhľadávanie nastavení, svetlé a tmavé motívy, zvýrazňujúce farby, kompaktný režim, mierka textu a vysoký kontrast.
- **Animácie, ktoré ovládate.** Živý náhľad, tri predvoľby a samostatné efekty otvárania, vznášania a indikátora. Rešpektuje nastavenie systému „znížiť pohyb“.
- **38 jazykov** s príznakmi. Rozhranie sa pri prvom spustení riadi jazykom vášho prehliadača a potom si zapamätá vašu voľbu.
- **Súkromné ​​od návrhu.** Všetko zostane vo vašom prehliadači. Žiadna telemetria, žiadne sieťové požiadavky.

<a id="installation"></a>
## Inštalácia

1. Nainštalujte správcu používateľských skriptov: [Tampermonkey](https://www.tampermonkey.net/) alebo [Violentmonkey](https://violentmonkey.github.io/).
2. OTVORENÉ [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) a potvrďte inštaláciu.
3. Otvorte ľubovoľný stream [kick.com](https://kick.com) a stlačte **F2**.

Aktualizácie doručuje váš manažér používateľských skriptov. Môžete tiež sledovať [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) stránku.

## Ukladanie nastavení pre kanál

1. Otvorte stream kanála, ktorý chcete prispôsobiť.
2. Otvorte panel (`F2`) a stlačte **Uložiť tento kanál** (na stránke **Kanály** alebo z rady na stránke **Prehrávanie**). Pre daný kanál sa uložia aktuálne nastavenia kvality, hlasitosti, rýchlosti a zvuku.
3. Dolaďte ich v editore pod tlačidlom. Použijú sa automaticky pri každom otvorení daného kanála.

Pomocou prepínača **Použiť uložené nastavenia na tomto kanáli** pozastavte profil bez toho, aby ste ho odstránili, alebo pomocou prepínača **Odstrániť** ho odstráňte. Všetky uložené kanály sú uvedené v časti **Kanály → Uložené kanály**, kde ich môžete vyhľadávať, triediť, pripínať, zoskupovať, pridávať poznámky, zálohovať a obnovovať.

<a id="settings-map"></a>
## Mapa nastavení

| Skupina | Stránka | Čo je vo vnútri |
| --- | --- | --- |
| Hráč | **Prehrávanie** | Predvoľby, kvalita naživo/VOD, záložný režim, hlasitosť, stlmenie zvuku, upozornenie na hlasitú hlasitosť, rýchlosť |
| Hráč | **Kanály** | Aktuálny profil kanála, uložené kanály, vyhľadávanie, skupiny, poznámky, záloha |
| Hráč | **Nástroje** | Časovač spánku, rozloženie stránky, automatické získanie odmien, tlačidlo rýchleho nároku, alarm zmrazenia, rýchle akcie, zobrazenie zamerania |
| Upozornenia | **Upozornenia** | Nerušiť, veľkosť, trvanie, nepriehľadnosť, poloha, história |
| Upozornenia | **Zvuky** | Hlavný prepínač a hlasitosť, prepínač podľa udalosti, hlasitosť a náhľad |
| Rozhranie | **Vzhľad** | Téma, štýl panela, farba zvýraznenia, hustota, kontrast, rozmazanie, mierka textu, jazyk |
| Rozhranie | **Animácie** | Živý náhľad, predvoľby, efekty otvárania/ukazovania/ukazovania, rýchlosť |
| Rozhranie | **Skratky** | Klávesová skratka ponuky a klávesové skratky akcií |
| systém | **Diagnostika** | Živý stav, kontrola kvality, kontrola konfliktov, bezpečný režim, denník akcií |
| systém | **Údaje a informácie** | Exportovať, importovať, vrátiť späť, resetovať, obnoviť zálohu, odkazy |

Každý posúvač reaguje aj na koliesko myši, keď naň podržíte. Pomocou vyhľadávacieho poľa v hornej časti panela vyhľadajte ľubovoľné nastavenie podľa názvu. Vyhľadávanie rozumie aj anglickým názvom, takže funguje rovnako v každom jazyku rozhrania a klávesy, ktoré tam zadáte, sa nikdy nedostanú na stránku.

## Tlačidlo rýchleho nároku

Povoľte ho v **Nástroje → Tlačidlo rýchleho nároku na stránke**. V streame sa zobrazí malé tlačidlo:

- **Pretiahnite** kdekoľvek; jeho poloha sa zapamätá.
- **Kliknutím** naň získate odmenu (otvorí sa okno s odmenami, stlačí tlačidlo *Vyžiadať*, okno sa zatvorí a vráti sa do streamu).
- Keď sa zobrazí Kickove upozornenie na odmenu, **svieti a zobrazí červenú bodku**. Zapnite *Zobraziť iba vtedy, keď je k dispozícii odmena*, aby bola po zvyšok času skrytá.
- Vyberte si **štýl** (Orb, Pill, Glass, Flat), vstavanú **ikonu** alebo **svoj vlastný obrázok** (PNG, JPG, WebP, GIF alebo SVG do 2 MB; najlepšie vyzerajú štvorcové obrázky s priehľadným pozadím), **veľkosť** a **nepriehľadnosť**. Živý náhľad zobrazuje každú zmenu.

Tlačidlo je oddelené od *Automatického nároku na odmeny*, takže si môžete nárokovať ručne, automaticky alebo oboje.

<a id="shortcuts"></a>
## Skratky

| Akcia | Predvolené |
| --- | --- |
| Otvorte / zatvorte panel | `F2` |
| Prepnúť upozornenia | `Alt+N` |
| Prepnúť čet | `Alt+C` |
| Prepnúť ponuku doľava | `Alt+S` |
| Zamerajte pohľad | `Alt+F` |
| Obnoviť kvalitu | `Alt+Q` |
| Obnovte hlasitosť | `Alt+V` |

Každá skratka sa dá odraziť v **Skratkách**. Väzby sledujú fyzický kláves, takže fungujú na akomkoľvek rozložení klávesnice.

<a id="languages"></a>
## Jazyky

arabčina, bieloruština, bulharčina, čínština (zjednodušená), čínština (tradičná), chorvátčina, čeština, dánčina, holandčina, angličtina, angličtina (India), fínčina, francúzština, nemčina, gréčtina, hindčina, maďarčina, indonézština, taliančina, japončina, kórejčina, lotyština, litovčina, macedónčina, malajčina, mongolčina, nórčina, poľština, portugalčina, rumunčina, švédčina, španielčina, taliančina, turečtina, thajčina.

## Riešenie problémov

- **Kvalita sa neuplatňuje.** Otvorte **Diagnostika**, stlačte *Obnoviť diagnostiku*, aby ste naskenovali kvality, ktoré Kick ponúka, a potom *Skontrolujte vybranú kvalitu*. Ak je kanál vylúčený alebo je zapnutý bezpečný režim, stavový riadok to povie.
- **Odmeny sa nenárokujú.** Automatické nárokovanie je predvolene vypnuté. Povoľte ho v **Nástroje → Odmeny** a vyskúšajte *Nárokovať teraz*. Funguje to iba na živých kanáloch, zatiaľ čo karta je viditeľná a nepíšete do chatu. V režime *upozornenia* skript reaguje na Kickov vlastný banner s odmenou.
- **Tiché prehrávanie a zvuk.** Tiché prehrávanie smeruje video cez zvukový modul prehliadača s nulovým ziskom. Ak to stránka zablokuje, panel vám to oznámi a normálny zvuk zostane nedotknutý.
- **Niečo sa správa zvláštne.** Spustite *Skontrolovať konflikty* alebo použite *sekciu Obnoviť* na príslušnej stránke.
- **Nastavenia po aktualizácii vyzerajú nesprávne.** Použite **Údaje a informácie → Späť** alebo **Obnoviť zálohu**.
- **Našli ste chybu?** Stlačte *Kopírovať diagnostiku* a pripojte ju k a [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Ochrana osobných údajov

Nastavenia a profily kanálov sú uložené v lokálnom úložisku vášho prehliadača na kick.com. Skript nikdy nikam neposiela údaje a nevyžaduje žiadne ďalšie povolenia (`@grant none`).

## Prispievanie

Problémy a žiadosti o stiahnutie sú vítané. Skript je jeden samostatný súbor, takže na pokus o zmenu nie je potrebný žiadny krok zostavenia: upraviť `kick-stream-tweaks.user.js` a znova načítajte stránku.

## Licencia

[MIT](./LICENSE)
