<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · **Română** · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Playerul tău Kick, reținut.** Calitatea, volumul și viteza sunt restaurate automat pe fiecare flux, cu un panou de control rapid, complet localizat.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Instala](#installation) · [Caracteristici](#features) · [Harta setărilor](#settings-map) · [Comenzi rapide](#shortcuts) · [Referința funcției](../docs/ro_FUNCTIONS.md) · [Jurnalul modificărilor](../CHANGELOG/ro_CHANGELOG.md) · [Lansări](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Caracteristici

- **Calitate care rămâne.** Alegeți o calitate live și o calitate VOD o dată; se aplică fiecărui flux nou. Dacă lipsește calitatea exactă, scriptul revine la următoarea inferioară (sau la Auto).
- **Volum care rămâne.** Volumul și sunetul sunt restabilite pentru fiecare flux, cu o avertizare de volum puternic și un glisor live care rămâne sincronizat cu playerul.
- **Profiluri pe canal.** Deschideți un flux, apăsați pe **Salvați acest canal** și canalul respectiv își amintește propria calitate, volum, viteză și sunet. Adăugați un grup și o notă, întrerupeți setările salvate sau excludeți complet canalul de la automatizare.
- **Presetări rapide.** Economisiți lățime de bandă, Cea mai bună calitate, Vizionare silențioasă și VOD cu un singur clic.
- **Instrumente.** Temporizator de oprire, vizualizare de focalizare, resincronizare player, comenzi pentru aspectul paginii (ascunde chat-ul, restrânge meniul din stânga) și un mod sigur care întrerupe toate modificările automate.
- **Alarma înghețată.** Redă o alarmă puternică și afișează o notificare când playerul îngheață sau afișează un ecran negru, chiar dacă fila este minimizată.
- **Buton de revendicare rapidă.** Un buton plutitor, care poate fi trasat, care vă revendică recompensa cu un singur clic. Patru modele, cinci pictograme sau propria imagine, dimensiune și opacitate reglabile.
- **Revendicare automată a recompenselor.** Opțional: așteaptă notificarea de recompensă de la Kick (sau verifică un program), revendică ceea ce este disponibil și închide fereastra din nou (dezactivat în mod implicit).
- **Redare silențioasă.** Dezactivează un flux fără a dezactiva sunetul playerului, astfel încât redarea continuă într-o filă de fundal. Setați-l global sau pe canal salvat.
- **Alerte.** Notificări pe care le puteți trage, redimensiona și dezactiva, plus efecte sonore opționale cu volum pentru fiecare eveniment.
- **Interfață reproiectată.** Bară laterală grupată, căutare de setări, teme deschise și întunecate, culori de accent, modul compact, scalarea textului și contrast ridicat.
- **Animări pe care le controlați.** Previzualizare live, trei presetări și efecte separate de deschidere, trecere cu mouse-ul și indicator. Respectă setarea sistemului „reduce mișcarea”.
- **38 de limbi** cu steaguri. Interfața urmează limba browserului dvs. la prima rulare și își amintește alegerea dvs. după aceea.
- **Privat prin design.** Totul rămâne în browser. Fără telemetrie, fără solicitări de rețea.

<a id="installation"></a>
## Instalare

1. Instalați un manager de script de utilizator: [Tampermonkey](https://www.tampermonkey.net/) sau [Violentmonkey](https://violentmonkey.github.io/).
2. Deschide [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) și confirmați instalarea.
3. Deschide orice flux activat [kick.com](https://kick.com) și apăsați **F2**.

Actualizările sunt furnizate de managerul dvs. de scripturi de utilizator. De asemenea, puteți viziona [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) pagină.

## Salvarea setărilor pentru un canal

1. Deschideți fluxul canalului pe care doriți să îl personalizați.
2. Deschide panoul (`F2`) și apăsați pe **Salvați acest canal** (pe pagina **Canale** sau din indicația de pe pagina **Redare**). Setările curente de calitate, volum, viteză și sunet sunt stocate pentru canalul respectiv.
3. Reglați-le fin în editorul de sub butonul. Acestea sunt aplicate automat de fiecare dată când deschideți canalul respectiv.

Utilizați comutatorul **Aplicați setările salvate pe acest canal** pentru a întrerupe un profil fără a-l șterge sau **Eliminați** pentru a-l șterge. Toate canalele salvate sunt listate sub **Canale → Canale salvate**, unde le puteți căuta, sorta, fixa, grupează, adăuga note, le puteți face copii de rezervă și le puteți restaura.

<a id="settings-map"></a>
## Harta setărilor

| Grup | Pagină | Ce este înăuntru |
| --- | --- | --- |
| Player | **Redare** | Presetari, calitate live/VOD, fallback, volum, sunet, avertizare de volum puternic, viteza |
| Player | **Canale** | Profil de canal curent, canale salvate, căutare, grupuri, note, backup |
| Player | **Unelte** | Temporizator de oprire, aspectul paginii, recompense de revendicare automată, buton de revendicare rapidă, alarmă de înghețare, acțiuni rapide, vizualizare focalizată |
| Alerte | **Notificări** | Nu deranjați, dimensiunea, durata, opacitatea, poziția, istoricul |
| Alerte | **Sunete** | Comutator principal și volum, comutator per eveniment, volum și previzualizare |
| Interfață | **Aspect** | Temă, stil panou, culoare de accent, densitate, contrast, estompare, scară text, limbă |
| Interfață | **Animații** | Previzualizare live, presetări, efecte de deschidere/hover/indicator, viteză |
| Interfață | **Comenzi rapide** | Taste rapide pentru meniu și taste rapide pentru acțiune |
| Sistem | **Diagnosticare** | Starea live, scanarea calității, verificarea conflictelor, modul sigur, jurnalul de acțiuni |
| Sistem | **Date și despre** | Exportați, importați, anulați, resetați, restaurați backup, linkuri |

Fiecare glisor răspunde, de asemenea, la rotița mouse-ului în timp ce îl treceți. Utilizați caseta de căutare din partea de sus a panoului pentru a găsi orice setare după nume. Căutarea înțelege și numele în engleză, așa că funcționează la fel în fiecare limbă a interfeței, iar tastele introduse acolo nu ajung niciodată la pagină.

## Buton de revendicare rapidă

Activați-l în **Instrumente → Butonul de revendicare rapidă de pe pagină**. Un mic buton apare pe flux:

- **Trage** oriunde; poziția sa este amintită.
- **Faceți clic** pe el pentru a vă revendica recompensa (se deschide fereastra de recompense, apasă pe *Revendicare*, închide fereastra și revine la flux).
- **luminează și arată un punct roșu** când apare notificarea de recompensă a lui Kick. Activați *Afișați numai când este disponibilă o recompensă* pentru a o păstra ascunsă în restul timpului.
- Alegeți un **stil** (Orb, Pill, Glass, Flat), o **pictogramă** încorporată sau **propria imagine** (PNG, JPG, WebP, GIF sau SVG de până la 2 MB; imaginile pătrate cu fundal transparent arată cel mai bine), o **dimensiune** și o **opacitate**. O previzualizare live arată fiecare schimbare.

Butonul este separat de *Revendicare automată a recompenselor*, așa că puteți revendica manual, automat sau ambele.

<a id="shortcuts"></a>
## Comenzi rapide

| Acţiune | Implicit |
| --- | --- |
| Deschide/închide panoul | `F2` |
| Comutați notificările | `Alt+N` |
| Comută chat | `Alt+C` |
| Comutați meniul din stânga | `Alt+S` |
| Vedere focalizată | `Alt+F` |
| Resetați calitatea | `Alt+Q` |
| Restabiliți volumul | `Alt+V` |

Fiecare comandă rapidă poate fi revenită în **Comenzi rapide**. Legăturile urmează tasta fizică, așa că funcționează pe orice aspect de tastatură.

<a id="languages"></a>
## Limbi

Arabă, belarusă, bulgară, chineză (simplificată), chineză (tradițională), croată, cehă, daneză, olandeză, engleză (India), finlandeză, franceză, germană, greacă, hindi, maghiară, indoneziană, italiană, japoneză, coreeană, letonă, lituaniană, macedoneană, malaeză, mongolă, norvegiană, poloneză, portugheză, română, rusă, suedeză, slovacă, turcă, rusă, suedeză, slovacă, turcă și vietnameză.

## Depanare

- **Calitatea nu este aplicată.** Deschideți **Diagnosticare**, apăsați pe *Actualizați diagnosticarea* pentru a scana calitățile oferite de Kick, apoi *Verificați calitatea selectată*. Dacă un canal este exclus sau modul sigur este activat, linia de stare spune acest lucru.
- **Recompensele nu sunt revendicate.** Revendicarea automată este dezactivată în mod prestabilit. Activați-l în **Instrumente → Recompense** și încercați *Revendicați acum*. Funcționează doar pe canalele live, în timp ce fila este vizibilă și nu tastați în chat. În modul *notificare*, scenariul reacționează la propriul banner de recompensă al lui Kick.
- **Redare silențioasă și audio.** Redarea silențioasă direcționează videoclipul prin motorul audio al browserului cu câștig zero. Dacă un site blochează acest lucru, panoul vă spune și sunetul normal este lăsat neatins.
- **Ceva se comportă ciudat.** Rulați *Verificați dacă există conflicte* sau utilizați *Secțiunea Resetare* pe pagina în cauză.
- **Setările arată greșit după o actualizare.** Utilizați **Date și despre → Anulați** sau **Restaurează backup**.
- **Ați găsit o eroare?** Apăsați pe *Copiați diagnosticarea* și atașați-o la a [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Confidențialitate

Setările și profilurile canalelor sunt stocate în spațiul de stocare local al browserului dvs. pe kick.com. Scriptul nu trimite niciodată date nicăieri și nu solicită permisiuni suplimentare (`@grant none`).

## Contribuind

Problemele și solicitările de extragere sunt binevenite. Scriptul este un singur fișier autonom, deci nu este necesar niciun pas de construire pentru a încerca o modificare: editați `kick-stream-tweaks.user.js` și reîncărcați pagina.

## Licenţă

[MIT](./LICENSE)
