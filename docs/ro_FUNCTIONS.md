<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · **Română** · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Tweaks Kick Stream — Referință de funcție

Referință pentru Kick Stream Tweaks 1.3.1. Descrie ce face fiecare zonă funcțională, cum sunt stocate setările, de ce părți ale paginii Kick depinde scriptul și cum funcționează fiecare funcție sau metodă numită din scriptul de utilizator. Vedeți [depozitul](https://github.com/ebayybe/kick-stream-tweaks) și [jurnalul de modificări](../CHANGELOG/en_CHANGELOG.md) .

> Numele se potrivesc cu sursa. `void` înseamnă că o funcție acționează prin efecte secundare. O metodă scrisă ca `Object.method` trăiește pe acel obiect ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Cuprins

1. [Arhitectura](#architecture)
2. [Comportament față de utilizator](#user-facing-behavior)
3. [Referință pentru setări](#settings-reference)
4. [Utilități de bază](#core-utilities)
5. [Stocare setări](#settings-storage)
6. [Sincronizarea jucătorului ( `PlayerSync` )](#player-synchronization-playersync)
7. [Suplimente de pagină ( `Extras` )](#page-extras-extras)
8. [Blocuri de construcție a interfeței](#interface-building-blocks)
9. [Pagini de setări ( `PAGES` )](#settings-pages-pages)
10. [Controler de panou ( `GUI` )](#panel-controller-gui)
11. [Taste rapide și pornire](#hotkeys-and-startup)
12. [Kick page dependențele](#kick-page-dependencies)
13. [Localizare](#localization)
14. [Siguranță, confidențialitate și compatibilitate](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arhitectură

Userscript-ul este un fișier autonom care rulează la `document-start` cu `@grant none` . Nu are nicio etapă de construcție și nu face cereri proprii de rețea.

| Strat | Obiect/zonă | Responsabilitate |
|---|---|---|
| Date | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Traduceri în 38 de limbi, mesaje de diagnosticare localizate, SVG-uri de semnalizare și nume de limbi. |
| Configurare | `CONFIG` , `DEFAULTS` | Constante (selectoare, limite de reîncercare, presetări, secțiuni) și setări implicite. |
| Depozitare | `sanitizeSettings` , `Store` , `persist` | Validează și salvează setările în `localStorage` ; păstrează o stivă de anulare în memorie. |
| Logica jucătorului | `PlayerSync` | Găsește videoclipul, restabilește calitatea, volumul, viteza și modul silențios, urmărește înghețarea. |
| Ajutor de pagină | `Extras` | Butoanele de aspect, revendicarea recompenselor, avatarele canalului și programatorul de fundal. |
| Interfață | `PAGES` , `GUI` , ajutoare | Panou Shadow-DOM, notificări, sunete, buton plutitor de revendicare rapidă, taste rapide. |

Flux de date: bucla `PlayerSync.sync` de 1,5 secunde citește setările efective (profilul canalului mai întâi, apoi global), le aplică playerului și apelează `Extras.tick` . Acțiunile utilizatorului trec prin handlere `GUI` , care actualizează setările cu `persist` și împing doar partea afectată către player ( `media` sau `all` ).

<a id="user-facing-behavior"></a>
## Comportament față de utilizator

| Zona | Comportament |
|---|---|
| Persistența jucătorului | Salvează calitatea live/VOD, volumul, starea sunetului, modul silențios și viteza, apoi le aplică atunci când este detectat un nou flux. Modificările pe care pagina le face singură (de exemplu, Kick resetarea volumului la 50%) sunt anulate; numai acțiunile proprii ale vizualizatorului actualizează valorile salvate. |
| Calitate | Selectează calitatea preferată prin meniul playerului, revine la următoarea calitate inferioară (sau Auto) când nu este disponibilă și închide din nou meniul. Numai clicurile autentice ale utilizatorilor învață script-ului o nouă calitate de „ultima utilizare”. |
| Volum și redare silențioasă | Volumul și sunetul sunt restabilite pentru fiecare flux. Redarea silențioasă direcționează videoclipul prin motorul Web Audio la câștig zero, astfel încât fluxul continuă să fie redat într-o filă de fundal fără a fi dezactivat. |
| Profiluri canale | **Salvați acest canal** stochează calitatea curentă, volumul, viteza și sunetul pentru canalul urmărit. Profilurile conțin, de asemenea, note, grupuri, starea PIN, un avatar și steagurile activate/excluse. |
| Presetari | Economisiți lățime de bandă, Cea mai bună calitate, Vizionare silențioasă și VOD se aplică cu un singur clic. |
| Panou | `F2` sau o tastă rapidă personalizată deschide un panou cu lățime fixă ​​(680 px) cu o bară laterală grupată, căutare, stiluri Kick și Minimal, teme deschise/întunecate, 14 culori de accent plus un selector de culori, aspect compact, estompare fundal, scalare a textului, contrast ridicat și controale pentru animație. |
| Caută | Insensibil la accent, se potrivește cu limba interfeței și cu numele în engleză și se potrivește cu titlurile secțiunilor sau ale cardurilor. Apăsările tastelor introduse în panou nu ajung niciodată la tastele rapide ale lui Kick. |
| Glisoare | Fiecare glisor răspunde la clicuri, glisare, săgeți de la tastatură și rotiță a mouse-ului. |
| Sunete | Indicații Web Audio pentru acțiunile din meniu, modificările setărilor, succesul/eșecul calității și restaurarea volumului, fiecare cu un comutator, previzualizare și volum. |
| Notificări | Mesaje localizate care pot fi trase, scalate, făcute transparente, reduse la tăcere (nu deranjați, liniște ecran complet) și înregistrate în istorie. |
| Alarmă de îngheț | Detectează un player blocat sau un ecran negru, redă o alarmă puternică (chiar și într-o filă ascunsă, independent de comutatorul de efecte sonore) și afișează o notificare. |
| Recompense | Revendicarea automată opțională așteaptă notificarea de recompensă a lui Kick (sau rulează conform unui program), deschide fereastra de recompense, revendică ceea ce este disponibil și o închide. Un buton de revendicare rapidă plutitor, care poate fi glisat, face același lucru cu un singur clic. |
| Aspect | Ascunde chatul și restrânge meniul din stânga din panou sau cu taste rapide, opțional amintindu-și alegerea pentru fiecare flux. |
| Instrumente | Temporizator de oprire, vizualizare focalizare (ecran complet), resincronizare player și un mod sigur care întrerupe fiecare schimbare automată. |
| Diagnosticare | Starea live, calitățile detectate, rezoluția video, scanarea calității, verificarea conflictelor, jurnalul de acțiuni și un raport care poate fi copiat. |
| Date | Export/import de setări, anulare, restaurare după resetare, backup/restaurare a canalelor salvate. |
| Confidențialitate | Setările, profilurile, jurnalele și istoriile rămân în stocarea browserului. Nimic nu este trimis nicăieri. |

<a id="settings-reference"></a>
## Referință pentru setări

Toate valorile sunt validate de `sanitizeSettings` ; orice invalid revine la valoarea implicită. Intervalele sunt aplicate.

### Jucător

| Cheie | Tip/gamă | Implicit | Înțeles |
|---|---|---|---|
| `autoQualityEnabled` | boolean | `true` | Aplicați automat calitatea preferată. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Calitate de aplicat pentru streamuri live și VOD. `auto` înseamnă „amintește-ți ultima mea alegere”. |
| `lastLiveQuality` , `lastVodQuality` | la fel | `auto` | Ultima calitate aleasă de spectator manual. |
| `qualityFallback` | `lower` , `auto` | `lower` | Ce să faci când nu este oferită calitatea preferată. |
| `autoVolumeEnabled` | boolean | `true` | Restaurați și protejați volumul salvat. |
| `volume` | 0–1 | `1` | Volumul salvat. |
| `muted` | boolean | `false` | A fost salvată starea sunetului. |
| `silent` | boolean | `false` | Redare silențioasă (grafic audio cu câștig zero, playerul nu este dezactivat). |
| `playbackRate` | 0,25–2,5 | `1` | Viteza salvată; `1` nu este niciodată forțat. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolean; 60–100, pasul 5 | `true` ; `85` | Avertizare de volum mare. |
| `safeMode` | boolean | `false` | Întrerupeți fiecare schimbare automată. |
| `channelProfiles` | obiect, până la 200 | `{}` | Profiluri pe canal (vezi mai jos). |

Câmpuri de profil canal: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (doar `https://…kick.com/images/user/…` URL-uri), `note` (240 de caractere), `group` (40 de caractere), `updatedAt` , `lastUsed`

### Notificări și sunete

| Cheie | Tip/gamă | Implicit | Înțeles |
|---|---|---|---|
| `notificationsEnabled` | boolean | `true` | Afișează notificări privind rezultatele. |
| `doNotDisturb` , `quietFullscreen` | boolean | `false` , `true` | Suprimați notificările și sunetele sau numai pe ecran complet. |
| `notificationScale` | 0,8–1,4 | `1` | Dimensiunea notificării. |
| `notificationDuration` | 1500–12000 ms, pas 500 | `3500` | Cât timp rămâne o notificare. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparența notificărilor. |
| `notificationShowIcon` | boolean | `true` | Afișați pictograma de stare. |
| `notificationPosition` | `{x, y}` sau `null` | `null` | Poziție trasă. |
| `notificationHistoryEnabled` , `notificationHistory` | boolean; până la 30 de intrări | `true` ; `[]` | Istoricul notificărilor. |
| `soundEffectsEnabled` , `soundVolume` | boolean; 0–1 | `false` ; `0.35` | Comutator principal și volum. |
| `soundEvents` , `soundEventVolumes` | per eveniment: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | totul aprins; `0.35` | Comutator pe eveniment și volum. |

### Aspect, mișcare și comenzi rapide

| Cheie | Tip/gamă | Implicit | Înțeles |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema de culoare. |
| `panelStyle` | `kick` , `minimal` | `kick` | Stilul vizual al panoului. |
| `accentColor` | `#rrggbb` | `#53fc18` | Culoare de accent. |
| `compactMode` , `highContrast` | boolean | `false` | Densitate și contrast. |
| `backdropBlur` | 0–12 px | `6` | Încețoșare de fundal în spatele panoului (funcționează în ambele stiluri). |
| `textScale` | 0,9–1,3 | `1` | Dimensiunea textului. |
| `language` , `languageChosen` | cod local; boolean | limba browserului; `false` | Interfața urmează limba browserului până când este aleasă o limbă, apoi alegerea este reținută. |
| `panelPosition` | `{x, y}` sau `null` | `null` | Poziția panoului trasă. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Viteza animației. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efect de deschidere/închidere a panoului. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efect de hover. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animație logo/indicator. |
| `iconAnimations` | boolean | `true` | Animați bara laterală, resetați și pictogramele de ajutor. |
| `hotkey` | șir combinat | `F2` | Deschide sau închide panoul. |
| `actionHotkeys` | șiruri combinate | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Comutați notificări, vizualizare focalizată, resetați calitatea, restabiliți volumul, comutați prin chat, comutați meniul din stânga. |

Combinările de taste sunt stocate ca șiruri de caractere, cum ar fi `Alt+Q` și potrivite de tastele fizice, astfel încât să funcționeze pe orice aspect de tastatură. Setările din versiunile mai vechi cu o tastă rapidă în formă de obiect sunt convertite automat. Lățimea panoului este fixată la 680 px (limitată la dimensiunea ferestrei); setarea anterioară a lățimii este ignorată.

### Instrumente

| Cheie | Tip/gamă | Implicit | Înțeles |
|---|---|---|---|
| `autoRecoverStall` | boolean | `false` | Încercați `play()` când este detectată o înghețare. |
| `freezeAlertEnabled` , `freezeSound` | boolean | `true` | Înghețați notificarea și sunetul alarmei. |
| `freezeSeconds` | 5–60, pasul 5 | `10` | Secunde fără progres înainte de alarmă. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolean | `false` | Aspect reținut, aplicat o dată pe pagină. |
| `autoClaimRewards` | boolean | `false` | Activați revendicarea automată a recompensei. |
| `claimMode` | `notify` , `interval` | `notify` | Revendicați când Kick își arată notificarea sau într-un program. |
| `claimDelaySec` | 0–120, pasul 5 | `5` | Așteptați după ce apare notificarea (modul de notificare). |
| `claimIntervalMin` | 5–120, pasul 5 | `10` | Minute între verificări (modul programat). |

### Buton de revendicare rapidă

| Cheie | Tip/gamă | Implicit | Înțeles |
|---|---|---|---|
| `claimWidget` | boolean | `false` | Afișează butonul plutitor. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Design buton. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Pictogramă încorporată sau imaginea proprie a utilizatorului. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , până la 90.000 de caractere | gol | Copie re-codificată a imaginii încărcate. Orice altceva este respins. |
| `claimWidgetImageFill` | boolean | `false` | Lasă o imagine personalizată să umple întregul buton (nu este folosit de designul pilulei). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Dimensiunea butonului. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Opacitate buton (opacitate completă în timp ce o recompensă este disponibilă). |
| `claimWidgetAutoHide` | boolean | `false` | Afișați butonul numai când este disponibilă o recompensă. |
| `claimWidgetPos` | `{x, y}` sau `null` | `null` | Poziție trasă. |

### Diagnosticare și stare

| Cheie | Tip/gamă | Implicit | Înțeles |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolean; până la 60 de intrări | `true` ; `[]` | Jurnal de acțiuni. |
| `activeSection` | ID secțiune | `playback` | Ultima pagină deschisă. |
| `resetBackup` | obiect setări | `null` | Instantaneu făcut înainte de o resetare sau un import. |

<a id="core-utilities"></a>
## Utilități de bază

| Funcția | Parametri / revenire | Ce și cum face |
|---|---|---|
| `detectLanguage` | — → local | Parcurge `navigator.languages` ​​, hărțește variantele regionale ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) și returnează primul local acceptat sau `en` . |
| `dictFor` | lang → dicţionar | Returnează tabelul de traducere pentru o locație, revenind la limba de bază și apoi la engleză. |
| `t` / `T` | lang, cheie, vars → șir | Rezolvă o cheie cu înlocuirea `{placeholder}` ; `T` folosește limba curentă. |
| `diagText` | index, calitate → șir | Returnează una dintre propozițiile de diagnostic localizate. |
| `log` | …args → void | Înregistrare în consolă cu prefixul scriptului. |
| `clamp` , `sleep` , `esc` | valoare → valoare | Limitarea intervalului, întârziere bazată pe promisiuni și evadare HTML. |
| `normalizeQuality` | text → șir | Minuscule o etichetă de calitate și elimină spațiile albe. |
| `debounce` | fn, așteptați → funcție | Deboucul final cu o metodă `flush` . |
| `onLocationChange` | callback → void | Detectează navigarea pe o singură pagină prin împachetarea `pushState` / `replaceState` , ascultând `popstate` și interogând o dată pe secundă. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | eveniment → șir/boolean | Creați și comparați combinații de taste din codul cheii fizice. |
| `mkPointer` | tip, extra → eveniment | Creează un `PointerEvent` (sau un `MouseEvent` când nu este disponibil) folosit pentru a conduce meniurile ARIA ale lui Kick. |
| `waitFor` | sonda, timeout, pas → valoare/null | Interogează până când sonda returnează o valoare sau expirarea timpului se termină. |
| `imageToDataUrl` | imagine → șir | Scadează o imagine într-o pânză pătrată (păstrând proporțiile, `willReadFrequently` ), încearcă 128, 96 și 64 px și returnează o adresă URL a datelor PNG care nu depășește 70.000 de caractere. |

<a id="settings-storage"></a>
## Stocare pentru setări

| Funcția | Parametri / revenire | Ce și cum face |
|---|---|---|
| `sanitizeProfiles` | obiect → obiect | Păstrează cel mult 200 de profile cu chei valide și cleme pentru fiecare câmp; avatarul trebuie să fie o adresă URL a imaginii Kick. |
| `sanitizeSettings` | obiect, cuBackup → obiect | Validează fiecare setare (tipuri, intervale, valori permise), migrează setările 1.1–1.3 (calitate vechi, taste rapide, animație și taste de secțiune) și aplică regula limbii. |
| `legacyHotkey` | valoare → șir | Convertește o tastă rapidă în formă de obiect într-un șir combinat. |
| `Store.load` / `Store.save` | — / setări → setări/void | Citiți și scrieți obiectul dezinfectat în `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → void | Îmbină un patch, dezinfectează, salvează cu un scurt debounce și opțional împinge un instantaneu de anulare (păstrat doar în memorie, până la 15). |
| ascultător `storage` | eveniment → nul | Reîncarcă setările când o altă filă Kick le modifică, astfel încât filele să nu se suprascrie niciodată. |

<a id="player-synchronization-playersync"></a>
## Sincronizare player ( `PlayerSync` )

### Ajutor de canal și profil

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `isVod` | — → boolean | Detectează o pagină VOD de la adresa URL. |
| `channelKey` | — → șir | Construiește `channel:slug` (sau `vod:id` , `kick:home` ), memorând rezultatul timp de trei secunde. Pe paginile VOD se folosește linkul canalului cel mai apropiat de player. |
| `channelSlug` | — → șir | Returnează partea slug a unei chei de canal. |
| `profile` | cheie → obiect/null | Citește un profil salvat. |
| `profileActive` | — → obiect/null | Returnează profilul curent numai când este activat și nu exclus. |
| `isExcluded` | — → boolean | Verifică dacă automatizarea este dezactivată pentru acest canal. |
| `updateProfile` | patch, cheie → void | Creează sau îmbină un profil și ștampilă `updatedAt` . |
| `saveCurrentChannel` | — → obiect/null | Stochează calitatea curentă, volumul, sunetul, viteza și starea silențioasă a spectatorului ca profil activat și scanează pagina pentru avatarul canalului. |
| `effective` | — → obiect | Rezolvă volumul, sunetul, silențiosul, viteza și calitatea live/VOD din profilul activ sau setările globale. |
| `setStatus` | stare, rezultat → nul | Actualizează codurile de stare și ultimul rezultat afișate în antet și diagnostice. |

### Găsirea și conducerea jucătorului lui Kick

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `findMainVideo` | — → video/null | Alege cel mai mare `<video>` vizibil. |
| `streamKey` | — → șir | Returnează calea paginii folosită pentru a aplica calitatea o dată pe flux. |
| `isAccountButton` | butonul → boolean | Respinge butoanele de antet, avatar și cont. |
| `findSettingsButton` | video → buton/null | Găsește butonul roată al jucătorului după etichetă sau în apropierea colțului din dreapta jos al videoclipului. |
| `revealControls` | video → gol | Expedierile trec cu mouse-ul pe evenimente, astfel încât să apară controale ascunse. |
| `simulateClick` | element → gol | Trimite secvența completă de indicator-eveniment de care meniurile Kick au nevoie. |
| `menuItems` | — → element[] | Listează intrările vizibile `menuitemradio` . |
| `openQualityMenu` | — → buton/null | Deschide meniul roată, intră într-o intrare de calitate când apare un meniu de nivel superior și așteaptă opțiunile. |
| `closeMenu` | butonul → Promisiune | Închide meniul numai dacă este încă deschis (un al doilea clic orb îl poate redeschide), cu o rezervă Escape. |
| `readMenu` | — → element[] | Înregistrează calitățile oferite și pe cea verificată. |
| `scanQualities` | — → Promite<boolean> | Deschide meniul, înregistrează calitățile disponibile și îl închide (utilizat de diagnosticare). |
| `activate` | articol → Promisiune | Faceți clic pe o opțiune și așteaptă până când este bifată. |
| `selectQuality` | dorit, fallback → Promisiune | Selectează calitatea cerută, altfel următoarea inferioară sau Auto. |
| `desiredQuality` | — → șir | Alege calitatea de aplicat din profil, preferință sau ultima alegere manuală. |
| `applyQualityOnce` | streamKey → Promisiune | Aplică calitatea dorită o dată pe flux, închide meniul și anunță despre succes sau eșec. |
| `watchManualQuality` | — → gol | Învață o nouă calitate „ultima utilizată” numai din clicurile autentice (de încredere), astfel încât clicurile automate și alternativele nu suprascriu niciodată valorile salvate. |

### Volum, mod silențios, viteză și monitorizare

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `applyVolume` | video, liniște → gol | Scrie volumul efectiv și starea de dezactivare a sunetului (marcat ca schimbare proprie a scriptului). |
| `trackInput` | — → gol | Înregistrează ora ultimului indicator, rotiță, atingere sau tastatură de încredere. |
| `reassertVolume` | video → gol | Repune volumul salvat când pagina l-a schimbat fără nicio intervenție de utilizator (rată limitată la opt reveniri la zece secunde). |
| `watchVolume` | video → gol | Ascultă `volumechange` : modificările conduse de utilizator sunt salvate, cele bazate pe pagină sunt revocate. |
| `checkLoud` | volum, dezactivat → gol | Avertizează o dată când volumul depășește pragul. |
| `buildGraph` | video → grafic/null | Conectează videoclipul într-un `AudioContext` printr-un nod de câștig; raportează când site-ul nu permite acest lucru. |
| `applySilent` | video → gol | Setează câștigul la 0 pentru redarea silențioasă sau înapoi la 1, reluând contextul atunci când este necesar. |
| `applyRate` | video, forță → gol | Setează viteza salvată; `1` nu este forțat decât dacă spectatorul tocmai l-a ales, așa că prinderea de vârf a lui Kick este respectată. |
| `applyMedia` | videoclip, `{rate}` → void | Reaplica volumul, modul silențios și opțional viteza fără a atinge calitatea. |
| `monitorFreeze` | video → gol | Detectează un jucător blocat (timp blocat) sau un ecran negru (timpul în mișcare fără cadre decodificate) și declanșează alarma și recuperarea opțională. Funcționează în file ascunse. |

### Buclă și ciclu de viață

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `sync` | — → Promit | Bucla principală: monitorizează îngheață, leagă ascultătorii, aplică modul silentios, volum, viteză și calitate, respectă modul sigur și excluderile, apoi apelează `Extras.tick` . |
| `resync` | — → Promit | Forțează o trecere nouă (utilizată de presetări, acțiuni rapide și modificări de calitate). |
| `init` | — → gol | Pornește prima sincronizare, ascultătorul de navigare și intervalul de 1,5 secunde. |

<a id="page-extras-extras"></a>
## Suplimente de pagină ( `Extras` )

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Citiți starea aspectului lui Kick din `data-chat` și `data-sidebar` de pe containerul paginii. |
| `isDesktop` | — → boolean | Automatizarea aspectului rulează numai la lățimi de desktop. |
| `click` | element → boolean | Clicurile prin `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → buton/null | Localizează butonul de restrângere în interiorul camerei de chat și butonul „afișează chat” (după pictogramă, nu după limbă). |
| `setChat` , `setSidebar` | arată → boolean | Aduceți chatul sau meniul din stânga la starea solicitată apăsând butoanele proprii ale lui Kick. |
| `applyLayout` | — → gol | Aplica aspectul reținut o dată pe pagină, fără a lupta niciodată cu modificările manuale. |
| `isTyping` | — → boolean | Adevărat în timp ce spectatorul tastează într-un câmp; revendicări automate așteaptă. |
| `rewardTrigger` , `popoverCard` | — → buton/null | Găsiți butonul cadou și cardul popover de recompensă. |
| `rewardAvailable` | — → boolean | Detectează semnalul de „recompensă disponibilă” al lui Kick (îndemnul animat la acțiune). |
| `isEnabled` | butonul → boolean | Vizibil și nu este dezactivat. |
| `claimDrops` | — → Promite<number> | Apăsați butoanele de revendicare activate pentru picături finalizate în panoul de recompense. |
| `claimDaily` | declanșare → Promisiune<number> | Deschide fereastra de recompense, apasă fiecare buton de revendicare activat o dată (niciodată același buton de două ori), apoi închide fereastra. |
| `claimRewards` | `{manual}` → Promit<number> | Rulează o revendicare completă, raportează rezultatul și redă un sunet; rulările manuale ignoră tastarea și raportează când nu există nimic de revendicat. |
| `normName` | text → șir | Normalizează numele pentru potrivire ( `_` și spații la `-` ). |
| `findAvatar` | melc → șir | Returnează avatarul canalului vizibil pe pagină (utilizat înainte ca un canal să fie salvat). |
| `scanAvatars` | — → gol | Stochează avatare pentru canalele salvate care nu au unul. |
| `tick` | streamKey → void | Scheduler apelat de la `sync` : aplică aspectul, scanează avatarurile, așteaptă notificarea recompensei (modul de notificare, cu întârziere și o răcire de două minute) sau verifică intervalul ales și sondajează panoul de picături. |

<a id="interface-building-blocks"></a>
## Blocuri de construcție a interfeței

| Funcția | Parametri / revenire | Ce și cum face |
|---|---|---|
| `I` | nume → svg | Pictogramă congestie în linie. |
| `fmtValue` | format, brut → șir | Formatează valorile glisorului (procent, pixeli, secunde). |
| `normSearch` , `englishOf` , `searchText` | text → șir | Text de căutare fără accent, inclusiv numele în engleză al unei etichete traduse. |
| `row` | cheie, etichetă, control, opțiuni → html | Un rând de setare; stivuite în mod implicit, în linie numai pentru comutatoare, cu o comutare opțională de ajutor. |
| `sw` , `toggleRow` | … → html | Controlul comutatorului și un rând de comutatoare gata făcut. |
| `chip` , `seg` , `qualityChips` | … → html | Chipsuri, controale segmentate și grila de calitate. |
| `range` | attr, cheie, opțiuni → html | Glisor cu umplere și valoare live. |
| `card` , `btn` , `ib` | … → html | Card, buton text și butonul pictogramă. |
| `timeStr` | marca temporală → șir | Ora ceasului localizată. |
| `setPref` | cheie, valoare → void | Scrie o preferință de jucător în profilul canalului activ sau în setările globale. |
| `fxBtn` | cheie, valoare, etichetă, pe → html | Selector de efecte cu un glif mic de previzualizare. |
| `avatarHtml` | nume, url → html | Avatar cu o scrisoare de rezervă; o imagine eșuată este eliminată. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → valoare | Creați marcajul pentru butonul de revendicare rapidă atât pentru butonul live, cât și pentru previzualizarea setărilor. |

<a id="settings-pages-pages"></a>
## Pagini de setări ( `PAGES` )

| Pagina | Cuprins |
|---|---|
| `playback` | Sugestie de salvare a acestui canal, presetări, calitate (aplicare automată, live, VOD, alternativă), volum (aplicare automată, glisor, sunet, redare silențioasă, avertizare puternică) și viteză. |
| `channels` | Pași cum funcționează, canalul curent cu butonul **Salvați acest canal** , comutatoare de pauză/excludere și editor, apoi lista de canale salvate (căutare, sortare, filtru fixat, grupuri, Editare/Terminat, ștergere) cu backup și restaurare. |
| `tools` | Temporizator de oprire, aspectul paginii, recompense (revendicare automată, mod, întârziere sau interval, Revendicare acum), setări ale butonului de revendicare rapidă cu previzualizare live, alarmă de înghețare și acțiuni rapide. |
| `notifications` | Comutatoare, dimensiune, durată, opacitate, previzualizare, resetare poziție și istoric. |
| `sounds` | Comutator principal și volum, comutatoare pe eveniment, volume și previzualizări. |
| `appearance` | Tema, stilul, culorile de accent, densitatea, contrastul, dimensiunea textului, estomparea, centrarea și limbajul. |
| `motion` | Previzualizare live, presetări și selecții pentru animații pentru efect de deschidere, efect de hover, indicator, viteză și pictograme. |
| `shortcuts` | Taste rapide de meniu și taste rapide de acțiune cu relegare. |
| `diagnostics` | Starea, scanarea, raportarea, verificarea calității și a conflictelor, modul sigur și jurnalul de acțiuni. |
| `about` | Versiune, linkuri, export/import, anulare, restaurare și resetare. |

<a id="panel-controller-gui"></a>
## Controler de panou ( `GUI` )

### Construcție și randare

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `build` | — → gol | Creează gazda umbră-DOM, panoul, toast și regiunea live, apoi conectează evenimente. |
| `applyLook` | — → gol | Aplică setările pentru tema, stilul, accentul, estomparea, scara textului, efectele, atributul limbii și toast ca atribute și variabile CSS. |
| `renderChrome` | — → gol | Redă titlul, substituentul de căutare, butonul de pauză, indiciu de subsol și butonul de revendicare rapidă. |
| `renderNav` | — → gol | Redă bara laterală grupată. |
| `renderPage` | opțiuni → nul | Redă pagina activă (sau toate paginile în timpul căutării), păstrând focalizarea derulării și a tastaturii. |
| `filterRows` | — → gol | Aplică filtrul de căutare la rânduri, carduri și pagini. |
| `channelEditor` | cheie, profil → html | Editor pentru un profil de canal. |
| `refreshAll` , `onExternalChange` | — → gol | Redați totul după resetare, importare, anulare sau modificare dintr-o altă filă. |

### Evenimente și modificări ale setărilor

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `wire` | — → gol | Atașează gestionarea de clic, introducere, modificare, rotiță și derulare delegate și tragerea panoului. |
| `onClick` , `onInput` , `onChange` | eveniment → nul | Trimiteți clicuri, mișcări de glisor și editări de text către setări, profiluri sau acțiuni. |
| `applyRange` | cheie, valoare → void | Aplică o valoare de glisare (volum, estompare, opacitate, durate...). |
| `setSetting` , `setChannel` | cheie/patch → void | Salvați o setare sau o modificare a profilului și împingeți partea afectată către player. |
| `pushToPlayer` | domeniul de aplicare, cheie → nul | `media` reaplică volumul, modul silențios și viteza; `all` reaplică și calitatea. Volumul, sunetul, modul silențios și viteza nu redeschid niciodată meniul de calitate. |
| `act` | nume, element → Promisiune | Execută acțiuni denumite: presetări, salvare și ștergere canale, backup, import/export, revendicări, temporizator de repaus, comenzi rapide, diagnosticare și multe altele. |
| `resetSection` | id → nul | Restaurează valorile implicite ale unei secțiuni. |
| `restoreVolume` | — → gol | Reaplica volumul salvat. |
| `toggleLayout` | care → nul | Ascunde sau afișează chatul sau meniul din stânga și își amintește alegerea. |
| `confirm` , `closeModal` | mesaj, opțiuni / rezultat → Promisiune/nulă | Dialog de confirmare în panou (identic în fiecare browser). |
| `download` , `pickFile` , `pickImage` | … → gol | Salvați JSON, citiți JSON și alegeți o imagine pentru butonul de revendicare rapidă. |
| `startCapture` , `finishCapture` | id / combo → void | Relegați o tastă rapidă, respingând duplicatele. |
| `replayMock` | — → gol | Redă efectul deschis în previzualizarea animației. |

### Instrumente și diagnosticare

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minute / — → nul | Porniți, anulați și afișați cronometrul de repaus (oprește videoclipul la sfârșit). |
| `toggleFocusView` | — → Promit | Intră sau iese pe ecran complet în containerul playerului. |
| `statusText` , `resultText` , `syncDiagnostics` | — → șir/gol | Stare localizată pentru antet și pagina de diagnosticare. |
| `record` | mesaj, nivel → nul | Adaugă o intrare marcată de timp în jurnalul de acțiuni. |
| `copyDiagnostics` | — → Promit | Copiază un scurt raport (versiune, stare, calități, tip de pagină, agent utilizator). |
| `checkQuality` , `checkConflicts` | — → Promisiune/nul | Verificați dacă este oferită calitatea preferată și enumerați setările care funcționează una împotriva celeilalte. |

### Buton de revendicare rapidă

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `renderClaimWidget` | — → gol | Creează, actualizează sau elimină butonul plutitor și începe sondajul de stat de o secundă. |
| `syncClaimWidget` | — → gol | Afișează inelul și punctul „recompensa disponibilă”, starea de ocupat și regula de ascundere automată. |
| `placeClaimWidget` | — → gol | Poziționează butonul, fixându-l de fereastră. |
| `wireClaimWidget` | element → gol | Trageți cu un prag de cinci pixeli (o glisare nu contează niciodată ca un clic), salvarea poziției și clicul care rulează o revendicare manuală. |

### Notificări, sunet și comportamentul panoului

| Metoda | Parametri / revenire | Ce și cum face |
|---|---|---|
| `notify` | mesaj, fel, durată, forță → nul | Afișează un toast (dacă nu este suprimat), înregistrează istoricul și anunță textul într-o regiune live. |
| `notifyQuality` | aplicat, calitate → nul | Redă sunetul rezultat, înregistrează și afișează o notificare localizată. |
| `initToastPosition` , `wireToastDrag` | — → gol | Restaurați și salvați poziția de pâine prăjită trasă. |
| `onAvatars` | — → gol | Reîmprospătează paginile care arată avatare. |
| `ensureAudio` | — → context | Creează și reia `AudioContext` partajat (deblocat la primul gest al utilizatorului). |
| `playSound` , `stopSounds` | nume, previzualizare → void | Generați și opriți indicațiile Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | forță → gol | Redați alarma cu cinci note și ridicați notificarea de înghețare. |
| `placePanel` , `wirePanelDrag` | poziție → gol | Plasați panoul în interiorul ferestrei și faceți antetul trasabil. |
| `open` , `close` , `toggle` | — → gol | Controlați panoul, sondajul, focalizarea și sunetele din meniu. |
| `syncVolumeControls` | — → gol | Menține glisorul de volum sincronizat cu playerul în timp ce panoul este deschis. |

<a id="hotkeys-and-startup"></a>
## Taste rapide și pornire

| Funcția | Parametri / revenire | Ce și cum face |
|---|---|---|
| `isolateKeys` | — → gol | Înregistrat la `document-start` în faza de captură: evenimentele de la tastatură care vin din interiorul panoului nu se propagă la Kick (deci Space, F, M și săgețile nu declanșează niciodată tastele rapide ale jucătorului) și Tab este prins în interiorul dialogului. |
| `setupHotkeys` | — → gol | Se ocupă de capturarea tastelor pentru relegare, Escape (modal, dropdown, panou), tastele rapide de meniu și tastele rapide de acțiune; combo-urile cu un modificator sau o tastă F funcționează chiar și în timp ce tastați. |
| `init` | — → gol | Construiește panoul, instalează taste rapide și pornește `PlayerSync` ; ferit de dubla injectare. |

<a id="kick-page-dependencies"></a>
## Kick dependențele de pagină

Scriptul se bazează pe marcajul curent al lui Kick. Ori de câte ori este posibil, folosește pictograme, atribute și structură mai degrabă decât text vizibil, astfel încât continuă să funcționeze în fiecare limbă de interfață. Dacă Kick le modifică, funcția de potrivire nu mai funcționează (restul continuă să ruleze).

| Caracteristica | Ce caută |
|---|---|
| Calitate | Un `<video>` vizibil, `button[aria-haspopup="menu"]` și `[role="menuitemradio"]` intrări. |
| Aspect | Un container cu `data-sidebar` și `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , un buton cu pictogramă `CollapseRight` în interiorul `#channel-chatroom` și un buton cu pictogramă `MessagesOutline` pentru afișarea chatului. |
| Notificare recompensă | Un `video` a cărui sursă conține `reward-available` sau un card `[role="group"]` care conține un videoclip `daily-rewards` . |
| Pretinderea recompensei | Un `button[aria-haspopup="dialog"][aria-controls]` (pictogramă cadou), dialogul pe care îl controlează ( `data-state` ), au activat butoanele de revendicare cu un copil `.contents` și un buton de închidere cu o etichetă `.sr-only` . |
| Picături | `#rewards-panel` listează articole cu un `[role="progressbar"][data-state="complete"]` și un buton activat. |
| Avatare | `img[alt]` elemente a căror sursă este `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Localizare

Fiecare etichetă, mesaj de ajutor, eroare, dialog și notificare trece prin soluția de traducere pentru 38 de localități. Cheile lipsă revin la engleză. Noul text de interfață este tradus în toate limbile acceptate împreună cu funcția care îl adaugă. Selectorul de limbă arată steaguri și nume native; interfața urmează limba browserului la prima rulare și își amintește ulterior o alegere explicită.

<a id="safety-privacy-and-compatibility"></a>
## Siguranță, confidențialitate și compatibilitate

- Setările sunt igienizate înainte de depozitare; valorile nevalide revin la valorile implicite sigure.
- Numele canalelor, notele, textul de notificare și rezultatul de diagnosticare sunt eliminate înainte de inserarea HTML.
- O pictogramă de buton personalizat este re-codificată dintr-o pânză și stocată ca o adresă URL de date numai pentru un tip de imagine permis; nu iese niciodată din browser.
- Shadow DOM păstrează stilurile scriptului izolate de Kick; evenimentele de la tastatură din panou sunt izolate de tastele rapide ale lui Kick.
- Acțiunile automate omit canalele excluse, modul sigur și elementele jucătorului lipsă. Reclamarea recompensei nu apasă niciodată același buton de două ori într-o singură cursă și așteaptă în timp ce spectatorul scrie.
- Scriptul nu face cereri de rețea; actualizările provin din managerul de scripturi de utilizator sau din pagina Versiuni.
- Setările locale existente sunt păstrate atunci când treceți de la 1.1.0, 1.2.0 și 1.3.0.
