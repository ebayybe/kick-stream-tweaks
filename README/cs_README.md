<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · **Čeština** · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Váš přehrávač Kick, zapamatováno.** Kvalita, hlasitost a rychlost se automaticky obnoví u každého streamu s rychlým, plně lokalizovaným ovládacím panelem.

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Instalovat](#installation) · [Vlastnosti](#features) · [Mapa nastavení](#settings-map) · [Zkratky](#shortcuts) · [Odkaz na funkci](../docs/cs_FUNCTIONS.md) · [Seznam změn](../CHANGELOG/cs_CHANGELOG.md) · [Vydání](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Vlastnosti

- **Kvalita, která se drží.** Vyberte si živou a VOD kvalitu jednou; aplikuje se na každý nový stream. Pokud přesná kvalita chybí, skript přejde zpět na nejbližší nižší (nebo na Auto).
- **Hlasitost, která se drží.** Hlasitost a ztlumení se obnoví u každého streamu s hlasitým upozorněním na hlasitost a živým posuvníkem, který zůstává synchronizován s přehrávačem.
- **Profily pro jednotlivé kanály.** Otevřete stream, stiskněte **Uložit tento kanál** a daný kanál si zapamatuje svou vlastní kvalitu, hlasitost, rychlost a zvuk. Přidejte skupinu a poznámku, pozastavte uložená nastavení nebo zcela vylučte kanál z automatizace.
- **Rychlé předvolby.** Ušetřete šířku pásma, nejlepší kvalitu, tiché sledování a VOD jediným kliknutím.
- **Nástroje.** Časovač spánku, zobrazení zaměření, opětovná synchronizace přehrávače, ovládací prvky rozvržení stránky (skrýt chat, sbalit levou nabídku) a nouzový režim, který pozastaví všechny automatické změny.
- **Alarm zmrazení.** Přehraje hlasitý alarm a zobrazí upozornění, když přehrávač zamrzne nebo zobrazí černou obrazovku, i když je karta minimalizovaná.
- **Tlačítko rychlého vyzvednutí.** Plovoucí, přetahovací tlačítko, které si nárokuje odměnu jedním kliknutím. Čtyři designy, pět ikon nebo vlastní obrázek, nastavitelná velikost a neprůhlednost.
- **Automatické nárokování odměn.** Volitelné: čeká na Kickovo oznámení o odměně (nebo kontroluje plán), nárokuje si, co je k dispozici, a znovu zavře okno (ve výchozím nastavení vypnuto).
- **Tiché přehrávání.** Ztiší stream bez ztlumení přehrávače, takže se nadále přehrává na kartě na pozadí. Nastavte jej globálně nebo podle uloženého kanálu.
- **Upozornění.** Oznámení, která můžete přetáhnout, změnit velikost a ztlumit, plus volitelné zvukové efekty s hlasitostí pro jednotlivé události.
- **Přepracované rozhraní.** Seskupený postranní panel, vyhledávání nastavení, světlé a tmavé motivy, zvýrazňující barvy, kompaktní režim, měřítko textu a vysoký kontrast.
- **Animace, které ovládáte.** Živý náhled, tři předvolby a samostatné efekty otevírání, vznášení a indikátoru. Respektuje systémové nastavení „redukovat pohyb“.
- **38 jazyků** s příznaky. Rozhraní se při prvním spuštění řídí jazykem vašeho prohlížeče a poté si pamatuje vaši volbu.
- **Private by design.** Vše zůstane ve vašem prohlížeči. Žádná telemetrie, žádné síťové požadavky.

<a id="installation"></a>
## Instalace

1. Nainstalujte správce uživatelských skriptů: [Tampermonkey](https://www.tampermonkey.net/) nebo [Violentmonkey](https://violentmonkey.github.io/).
2. OTEVŘENO [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) a potvrďte instalaci.
3. Otevřete libovolný stream [kick.com](https://kick.com) a stiskněte **F2**.

Aktualizace doručuje váš správce uživatelských skriptů. Můžete také sledovat [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) strana.

## Ukládání nastavení kanálu

1. Otevřete stream kanálu, který chcete přizpůsobit.
2. Otevřete panel (`F2`) a stiskněte **Uložit tento kanál** (na stránce **Kanály** nebo z nápovědy na stránce **Přehrávání**). Pro daný kanál se uloží aktuální nastavení kvality, hlasitosti, rychlosti a zvuku.
3. Dolaďte je v editoru pod tlačítkem. Použijí se automaticky při každém otevření daného kanálu.

Pomocí přepínače **Použít uložená nastavení na tomto kanálu** pozastavíte profil, aniž byste jej smazali, nebo pomocí přepínače **Odstranit** jej smažte. Všechny uložené kanály jsou uvedeny v části **Kanály → Uložené kanály**, kde je můžete vyhledávat, třídit, připínat, seskupovat, přidávat poznámky, zálohovat a obnovovat je.

<a id="settings-map"></a>
## Mapa nastavení

| Skupina | Strana | Co je uvnitř |
| --- | --- | --- |
| Hráč | **Přehrávání** | Předvolby, kvalita živě/VOD, záložní, hlasitost, ztlumení, upozornění na hlasitost, rychlost |
| Hráč | **Kanály** | Aktuální profil kanálu, uložené kanály, vyhledávání, skupiny, poznámky, záloha |
| Hráč | **Nástroje** | Časovač spánku, rozvržení stránky, automatické získání odměn, tlačítko rychlého nároku, alarm zmrazení, rychlé akce, zobrazení zaměření |
| Upozornění | **Oznámení** | Nerušit, velikost, trvání, neprůhlednost, poloha, historie |
| Upozornění | **Zvuky** | Hlavní přepínač a hlasitost, přepínač podle události, hlasitost a náhled |
| Rozhraní | **Vzhled** | Motiv, styl panelu, barva zvýraznění, hustota, kontrast, rozostření, měřítko textu, jazyk |
| Rozhraní | **Animace** | Živý náhled, předvolby, efekty otevření/nájezdu/indikátoru, rychlost |
| Rozhraní | **Zkratky** | Klávesové zkratky nabídky a klávesové zkratky akcí |
| Systém | **Diagnostika** | Živý stav, kontrola kvality, kontrola konfliktů, bezpečný režim, protokol akcí |
| Systém | **Údaje a informace** | Exportovat, importovat, vrátit zpět, resetovat, obnovit zálohu, odkazy |

Každý posuvník také reaguje na kolečko myši, když na něj najedete. Pomocí vyhledávacího pole v horní části panelu vyhledejte libovolné nastavení podle názvu. Vyhledávání také rozumí anglickým názvům, takže funguje stejně ve všech jazycích rozhraní a klíče zadané tam nikdy nedosáhnou stránky.

## Tlačítko rychlého nároku

Povolte jej v **Nástroje → Tlačítko Rychlý nárok na stránce**. Na streamu se objeví malé tlačítko:

- **Přetáhněte** kamkoli; jeho poloha je zapamatována.
- **Kliknutím** na něj získáte odměnu (otevře se okno s odměnami, stiskne *Claim*, zavře okno a vrátí se do streamu).
- Když se objeví Kickovo oznámení o odměně, **svítí a zobrazí červenou tečku**. Zapněte *Zobrazit, pouze když je k dispozici odměna*, aby byla po zbytek času skrytá.
- Vyberte si **styl** (Orb, Pill, Glass, Flat), vestavěnou **ikonu** nebo **vlastní obrázek** (PNG, JPG, WebP, GIF nebo SVG do velikosti 2 MB; čtvercové obrázky s průhledným pozadím vypadají nejlépe), **velikost** a **neprůhlednost**. Živý náhled ukazuje každou změnu.

Tlačítko je oddělené od *Automaticky nárokovat odměny*, takže je můžete nárokovat ručně, automaticky nebo obojí.

<a id="shortcuts"></a>
## Zkratky

| Akce | Výchozí |
| --- | --- |
| Otevřete/zavřete panel | `F2` |
| Přepnout oznámení | `Alt+N` |
| Přepnout chat | `Alt+C` |
| Přepnout nabídku doleva | `Alt+S` |
| Zaměření pohledu | `Alt+F` |
| Obnovit kvalitu | `Alt+Q` |
| Obnovit hlasitost | `Alt+V` |

Každou zkratku lze odrazit v **Zkratky**. Vazby sledují fyzickou klávesu, takže fungují na jakémkoli rozložení klávesnice.

<a id="languages"></a>
## Jazyky

Arabština, běloruština, bulharština, čínština (zjednodušená), čínština (tradiční), chorvatština, čeština, dánština, holandština, angličtina, angličtina (Indie), finština, francouzština, němčina, řečtina, hindština, maďarština, indonéština, italština, japonština, korejština, lotyština, litevština, makedonština, malajština, mongolština, norština, polština, portugalština, rumunština, ruština, švédština, vietnamština, ruština, srbština, turečtina

## Odstraňování problémů

- **Kvalita se nepoužije.** Otevřete **Diagnostika**, stiskněte *Obnovit diagnostiku* pro skenování kvalit, které Kick nabízí, a poté *Zkontrolujte vybranou kvalitu*. Pokud je kanál vyloučen nebo je zapnutý bezpečný režim, stavový řádek to říká.
- **Odměny nejsou nárokovány.** Automatické nárokování je ve výchozím nastavení vypnuto. Povolte jej v **Nástroje → Odměny** a vyzkoušejte *Nárokovat nyní*. Funguje pouze na živých kanálech, zatímco karta je viditelná a nepíšete do chatu. V režimu *notifikace* skript reaguje na Kickův vlastní banner s odměnou.
- **Tiché přehrávání a zvuk.** Tiché přehrávání vede video přes zvukový modul prohlížeče s nulovým ziskem. Pokud to web zablokuje, panel vám to sdělí a normální zvuk zůstane nedotčen.
- **Něco se chová divně.** Spusťte *Zkontrolovat konflikty* nebo použijte *sekci Obnovit* na příslušné stránce.
- **Nastavení vypadá po aktualizaci špatně.** Použijte **Data a informace → Vrátit zpět** nebo **Obnovit zálohu**.
- **Našli jste chybu?** Stiskněte *Kopírovat diagnostiku* a připojte ji k a [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Soukromí

Nastavení a profily kanálů jsou uloženy v místním úložišti vašeho prohlížeče na kick.com. Skript nikdy nikam neposílá data a nevyžaduje žádná další oprávnění (`@grant none`).

## Přispívání

Problémy a žádosti o stažení jsou vítány. Skript je jeden samostatný soubor, takže pro pokus o změnu není potřeba žádný krok sestavení: upravit `kick-stream-tweaks.user.js` a znovu načíst stránku.

## Licence

[MIT](./LICENSE)
