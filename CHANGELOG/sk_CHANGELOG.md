<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · **Slovenčina** · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks — Changelog

Poznámky k vydaniu pre [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), používateľský skript, ktorý si pamätá predvoľby prehrávača Kick a pridáva konfigurovateľný ovládací panel.

## v1.3.1 – 6. 11. 2026

> Spevnenie rozloženia pre každý jazyk a veľkosť textu, skutočne odlišný štýl Minimal, odmeny a pomocníci s rozložením, alarm zamrznutia hráča a inteligentnejší predvolený jazyk.

### Pridané

- **Alarm zamrznutia prehrávača.** Detekuje zastavený prehrávač alebo čiernu obrazovku (čas videa sa pohybuje bez dekódovaných snímok), prehrá hlasný zvuk budíka a zobrazí upozornenie, aj keď je karta minimalizovaná. Nastaviteľný čas detekcie (5–60 s), nezávislé prepínanie zvuku a testovacie tlačidlo.
- **Automatický nárok na odmeny** (v predvolenom nastavení vypnuté): otvorí okno s odmenami, nárokuje si, čo je k dispozícii, znova ho zatvorí a vráti sa do streamu. Nárokujú sa aj kvapky, ktoré sa objavia na paneli odmien. Obsahuje tlačidlo *Uplatniť nárok teraz*.
- **Plán odmien.** V predvolenom nastavení skript čaká na Kickove vlastné upozornenie „nárokujte si svoju odmenu“ a nárokuje si ju hneď (s voliteľným oneskorením 0 – 60 s), namiesto hlasovania. K dispozícii je aj plánovaný režim (každých 5–60 minút).
- **Tlačidlo rýchleho nároku.** Malé plávajúce tlačidlo v streame, ktoré si nárokuje vašu odmenu jediným kliknutím. Potiahnite ho kamkoľvek (pozícia sa zapamätá), vyberte si jeden zo štyroch dizajnov (Orb, Pilulka, Sklo, Plochý), päť vstavaných ikon, veľkosť a nepriehľadnosť, prípadne ho zobrazte iba vtedy, keď je k dispozícii odmena. Svieti a zobrazuje bodku, keď sa objaví Kikovo upozornenie na odmenu. Stránka nastavení má živý náhľad.
- **Vaša vlastná ikona.** Nahrajte súbor PNG, JPG, WebP, GIF alebo SVG (do 2 MB) ako ikonu tlačidla, prípadne vyplňte celé tlačidlo. Obrázok je prekódovaný na malý štvorec a uložený iba vo vašom prehliadači.
- **Koleso myši na posúvačoch.** Každý posúvač je možné upraviť pomocou kolieska myši, keď naň budete pohybovať, bez posúvania panela.
- **Odkaz na funkcie.** Nový `en_FUNCTIONS.md` dokumentuje architektúru, každé nastavenie, každú funkciu a časti stránky Kick, na ktorých skript závisí.
- **Ukladanie kanálov so sprievodcom.** Karta „Ako fungujú uložené kanály“ s podrobnými postupmi, jediné tlačidlo **Uložiť tento kanál**, ktoré ukladá aktuálnu kvalitu, hlasitosť, rýchlosť a zvuk pre kanál, ktorý práve sledujete, nápoveda jedným kliknutím v časti Prehrávanie pre neuložené kanály, prípitok s potvrdením, označené tlačidlá *Upraviť* / *Hotovo* v zozname a prepnutie na pozastavenie uložených nastavení.
- **Tiché prehrávanie.** Stlmí stream bez stlmenia prehrávača, takže sa bude naďalej prehrávať na karte na pozadí. Funguje globálne a pre každý uložený kanál (v zozname kanálov je zobrazená značka *Silent*).
- **Vyhľadávanie vo viacerých jazykoch.** Vyhľadávanie necitlivo reaguje na prízvuk a zhoduje sa aj s anglickými názvami, takže zadaním `hlasitosť` nájdete nastavenie v akomkoľvek jazyku rozhrania. Vyhľadávanie podľa sekcie alebo názvu karty zobrazí celú sekciu.
- **Ovládacie prvky rozloženia stránky**: skrytie rozhovoru a zbalenie ľavej ponuky z panela alebo pomocou klávesových skratiek (`Alt+C`, `Alt+S`) s možnosťou zapamätať si rozloženie pre každý stream.
- ** Animácie ikon** pre bočný panel, ikony resetovania a pomocníka s vlastným prepínačom (tiež súčasť predvolieb animácií).
- **Avatary kanálov** sú zachytené z Kick a zobrazené v zozname uložených kanálov.
- 14 akcentných farieb (bolo 6).
- Potvrdzovacie dialógové okno na paneli, ktoré vyzerá rovnako v každom prehliadači.

### Zmenené

- **Jazyk rozhrania** sa teraz pri prvom spustení riadi jazykom prehliadača. Keď si vyberiete jazyk, zapamätá si ho. Nastavenia migrované zo starších verzií sa riadia prehliadačom, kým sa výslovne nevyberie jazyk.
- Skript teraz začína na `document-start`, takže jeho izolácia klávesnice je zaregistrovaná pred vlastnými poslucháčmi stránky.
- Riadky nastavení sú na sebe (menovka nad ovládacím prvkom), takže text sa nikdy nemôže prekrývať ani orezávať v žiadnom jazyku, veľkosti textu alebo šírke panela. Menovky na bočnom paneli sa zakrývajú na hraniciach slov.
- Nástroje na výber animácií sú prestavané ako riadky s plnou šírkou s ikonami, takže sa hodia dlhé preklady.
- Štýl panelu **Minimal** je teraz plochý a štvorcový bez lesku, okraje nahradené oddeľovačmi a výber štýlu podčiarknutia, takže rozdiel oproti **Kick** je zrejmý.
- Panel má pevnú šírku 680 px (zmenší sa, aby sa zmestil na malé okná). Nastavenie šírky panela a rukoväť na zmenu veľkosti boli odstránené, takže rozloženia sú rovnaké pre všetkých.
- V názve animácie indikátora sa už nehovorí „zelená“, keď sa použije iná farba zvýraznenia.

### Opravené

- Zmena hlasitosti, stlmenie zvuku, tiché prehrávanie, automatická hlasitosť alebo rýchlosť tiež znova použili kvalitu (opätovné otvorenie ponuky kvality a zobrazenie upozornenia). Tieto nastavenia sa teraz dotýkajú len toho, čo ste zmenili; kvalita sa znova použije len vtedy, keď sa zmení nastavenie kvality.
- Zadanie do vyhľadávania nastavení môže spustiť Kickove klávesové skratky (napríklad Space prepol stream na celú obrazovku). Stlačenia klávesov na paneli sa už nedostanú na stránku.
- Preferovaná hlasitosť bola prepísaná, keď Kick po opätovnom načítaní resetoval prehrávač na jeho vlastných 50% a posúvač panela ukázal 50%. Zmeny, ktoré stránka vykoná sama, sa teraz vrátia do vášho uloženého zväzku; aktualizujú ho iba vaše vlastné akcie.
- Orezávanie a prekrývanie textu vo vzhľade, animáciách a klávesových skratkách (dlhé štítky, veľké veľkosti textu, úzke panely, dlhé preklady).
- Minimálny štýl ticho deaktivoval nastavenie rozostrenia pozadia; rozostrenie teraz funguje v oboch štýloch.
- Zmena nepriehľadnosti tlačidla rýchleho nároku neaktualizovala náhľad.
- Posuvníky nereagovali na koliesko myši.
- Animačné dlaždice ("Scale", "Pop") prepĺňajú svoje karty.
- Potvrdenie vymazania profilu použilo natívny dialóg prehliadača.
- Čipy časovača spánku neboli lokalizované.
- Uložené kanály nezobrazovali žiadne avatary a aktuálny kanál nezobrazoval žiadne, kým sa jeho profil neuložil.

### Kompatibilita

- Existujúce nastavenia a uložené kanály sa zachovajú pri aktualizácii z verzie 1.3.0, v1.2.0 a v1.1.0.
- Skript stále neposiela žiadnu telemetriu a nevytvára žiadne vlastné sieťové požiadavky.

### Odkazy

- [Úložisko](https://github.com/ebayybe/kick-stream-tweaks)
- [Vydania](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémy](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Kompletný redizajn, logická štruktúra nastavení, prestavaný animačný systém a množstvo opráv spoľahlivosti pre automatizáciu prehrávača.

### Pridané

- Prepracovaný panel so zoskupeným bočným panelom: **Prehrávač** (Prehrávanie, Kanály, Nástroje), **Upozornenia** (Upozornenia, zvuky), **Rozhranie** (Vzhľad, animácie, skratky) a **Systém** (Diagnostika, údaje a informácie).
- Nová stránka **Animácie**: scéna živého náhľadu, tri predvoľby na jedno kliknutie (Plné, Zmenšené, Vypnuté) a samostatné výbery pre otvárací efekt (Žiadne, Miznutie, Snímanie, Mierka, Pop), efekt vznášania, animáciu indikátora a rýchlosť.
- Rýchle predvoľby pre úsporu šírky pásma, najlepšiu kvalitu, tiché prezeranie a VOD, aplikované okamžite.
- Kvalitný zberač prepracovaný ako mriežka čipov; rýchlosť, mierka textu a časovač spánku používajú čipy a segmentované ovládacie prvky namiesto rozbaľovacích zoznamov.
- Inline správca kanálov: vyhľadávanie, triedenie, pripínanie, skupiny, poznámky, úpravy jednotlivých kanálov a úplné zálohovanie/obnovenie, všetko bez vnorených dialógov.
- Inline nastavenia zvuku s prepínačom pre jednotlivé udalosti, tlačidlom hlasitosti a náhľadu.
- Kontrola kvality v diagnostike: otvorí ponuku prehrávača, zaznamená dostupné kvality a znova ju zatvorí.
- Klávesové skratky teraz fungujú na akomkoľvek rozložení klávesnice (zodpovedajú fyzickému klávesu).
- Synchronizácia nastavení medzi otvorenými kartami Kick.
- Zvýraznenie vzorkovníkov farieb vedľa vlastného výberu farieb, väčší rozsah mierky textu a ochrana pred preferenciou s obmedzením pohybu.

### Zmenené

- Nastavenia sú uložené v štíhlejšom formáte; konfigurácia 1.2.x, klávesové skratky a voľby animácií sa migrujú automaticky.
- Rýchlosť prehrávania sa použije len vtedy, keď sa líši od 1×, takže Kickove vlastné dobiehanie na hrane už nie je prepísané.
- História vrátenia sa uchováva v pamäti namiesto zapisovania do lokálneho úložiska.
- Zvukové udalosti, upozornenia a klávesové skratky zdieľajú jednu konzistentnú sadu ovládacích prvkov.
- Selektor "Profil situácie" je nahradený predvoľbami na jedno kliknutie.

### Opravené

- Zatvorením ponuky prehrávača po použití kvality už nehrozí jej opätovné otvorenie.
- Záložná kvalita (napríklad 720p namiesto nedostupného 1080p) už neprepisuje preferovanú kvalitu uloženú pre kanál.
- Iba skutočné kliknutia na kvalitné položky aktualizujú kvalitu "naposledy použité"; automatické kliknutia sa ignorujú.
- Vyhľadávanie nastavení už po zadaní nezlyhá (cieľ udalosti sa stratil v rámci Shadow DOM).
- Zmeny vykonané na jednej karte už nemôžu prepísať nastavenia z inej karty.
- Klávesové skratky panela sa už nekazia na rozložení bez latinky.
- Nesprávne označenia v ovládacích prvkoch protokolu diagnostiky a nesprávne kórejské slovo v názve japonského písma.
- Kontroly zastaveného prehrávania a synchronizácia streamu sa pozastavia, kým je karta skrytá.

### Odstránené

- Funkcie, ktoré nebolo možné overiť proti Kickovmu prehrávaču alebo ho duplikovať: preferencia nízkej latencie, skrytie ovládacích prvkov prehrávača pri nečinnosti a kontrola aktualizácií na paneli GitHub (použite aktualizácie správcu používateľských skriptov alebo stránku Vydania).
- Prepracované možnosti: uložené profily vzhľadu, zobrazenie/skrytie/zmena poradia sekcií, alternatívne režimy navigácie, kontroly kompatibility a pokrytia prekladu, animácie náhodného/posúvania/sekcií, trvanie upozornení na jednotlivé udalosti, avatary kanálov, farby skupín, manuálne usporiadanie, hromadný výber, história jednotlivých kanálov a automatické čistenie.

### Kompatibilita

- Pri aktualizácii z verzie 1.2.0 a verzie 1.1.0 sa zachovajú existujúce nastavenia a uložené kanály.
- Nastavenia zostávajú lokálne pre prehliadač; skript neposiela telemetriu ani nevytvára sieťové požiadavky.

### Odkazy

- [Úložisko](https://github.com/ebayybe/kick-stream-tweaks)
- [Vydania](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémy](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 07. 10. 2026

> Rozšíril pôvodného pomocníka kvality a hlasitosti na kompletnú sadu nástrojov na nastavenie prehrávača.

### Pridané

- Profily pre jednotlivé kanály pre kvalitu, hlasitosť, rýchlosť prehrávania a stav stlmenia.
- Uložený zoznam kanálov s poznámkami, skupinami, úpravou profilu a importom/exportom.
- Zvukové efekty s globálnym prepínačom, prepínačmi jednotlivých udalostí, ukážkami a hlasitosťou pre jednotlivé udalosti.
- Upozornenia na zmeny kvality, obnovený objem a neúspešné akcie.
- História upozornení, denník akcií a diagnostické nástroje s jasnými ovládacími prvkami.
- Kontroly dostupnosti kvality, kontroly konfliktov a kontroly kompatibility.
- Núdzový režim na dočasné vypnutie automatických zmien prehrávača.
- Klávesové skratky, ťahanie panela, zmena veľkosti panela a akcia na stredovom paneli.
- Štýly panelov Kick a Minimal, kompaktné rozloženie a ovládanie animácií.
- Časovač vypnutia, režim zaostrenia na celú obrazovku, opätovná synchronizácia prehrávača a ovládanie prehrávania.
- Import/export nastavení a profilov kanálov.
- Navigácia pomocou klávesnice, škálovanie textu, hlásenia čítačky obrazovky a vysoký kontrast.
- Lokalizácia rozhrania pre 38 podporovaných jazykov.

### Opravené

- Zabránené zobrazovaniu viacerých sekundárnych dialógov súčasne.
- Opravené prázdne dialógové okno zobrazené nad oknom nastavení zvuku.
- Ignorované prázdne oznamovacie správy namiesto zobrazovania prázdnych prekrytí.
- Vylepšené balenie dlhých štítkov na úzkych paneloch a lokalizovaných rozloženiach.
- Opravené nahradenie zástupných symbolov `{quality}` a `{q}` v upozorneniach.
- Aktualizovaný štítok verzie na paneli a porovnanie aktualizácie na 1.2.0.

### Kompatibilita

- Existujúce nastavenia sa pri aktualizácii z verzie 1.1.0 zachovajú.
- Nastavenia zostávajú lokálne pre prehliadač; skript neposiela telemetriu.
- Kontrola aktualizácií číta najnovšiu značku vydania GitHub a neinštaluje aktualizácie automaticky.

### Odkazy

- [Úložisko](https://github.com/ebayybe/kick-stream-tweaks)
- [Vydania](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémy](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Pôvodná verejná verzia sa zamerala na zapamätanie kvality a hlasitosti videa na Kick, ich automatickú aplikáciu na nové streamy a poskytnutie panela nastavení F2.
