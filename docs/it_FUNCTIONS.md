<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · **Italiano** · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Tweaks Kick Stream - Riferimento alle funzioni

Riferimento per le modifiche al Kick Stream 1.3.1. Descrive cosa fa ogni area funzionale, come vengono memorizzate le impostazioni, da quali parti della pagina di Kick dipende lo script e come funziona ciascuna funzione o metodo con nome nello script utente. Consulta il [repository](https://github.com/ebayybe/kick-stream-tweaks) e [il registro delle modifiche](../CHANGELOG/en_CHANGELOG.md) .

> I nomi corrispondono alla fonte. `void` significa che una funzione agisce attraverso effetti collaterali. Un metodo scritto come `Object.method` risiede su quell'oggetto ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Contenuto

1. [Architettura](#architecture)
2. [Comportamento rivolto all'utente](#user-facing-behavior)
3. [Riferimento alle impostazioni](#settings-reference)
4. [Utilità principali](#core-utilities)
5. [Memorizzazione delle impostazioni](#settings-storage)
6. [Sincronizzazione del lettore ( `PlayerSync` )](#player-synchronization-playersync)
7. [Extra della pagina ( `Extras` )](#page-extras-extras)
8. [Elementi costitutivi dell'interfaccia](#interface-building-blocks)
9. [Pagine delle impostazioni ( `PAGES` )](#settings-pages-pages)
10. [Controller del pannello ( `GUI` )](#panel-controller-gui)
11. [Tasti di scelta rapida e avvio](#hotkeys-and-startup)
12. [Dipendenze delle pagine kick](#kick-page-dependencies)
13. [Localizzazione](#localization)
14. [Sicurezza, privacy e compatibilità](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architettura

Lo script utente è un file autonomo che viene eseguito `document-start` con `@grant none` . Non prevede fasi di creazione e non effettua richieste di rete proprie.

| Strato | Oggetto/area | Responsabilità |
|---|---|---|
| Dati | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Traduzioni per 38 lingue, messaggi diagnostici localizzati, flag SVG e nomi delle lingue. |
| Configurazione | `CONFIG` , `DEFAULTS` | Costanti (selettori, limiti di tentativi, preimpostazioni, sezioni) e impostazioni predefinite. |
| Stoccaggio | `sanitizeSettings` , `Store` , `persist` | Convalida e salva le impostazioni in `localStorage` ; mantiene uno stack di annullamento in memoria. |
| Logica del giocatore | `PlayerSync` | Trova il video, ripristina la qualità, il volume, la velocità e la modalità silenziosa, controlla i blocchi. |
| Aiutanti della pagina | `Extras` | Pulsanti di layout, richiesta di premi, avatar dei canali e pianificazione in background. |
| Interfaccia | `PAGES` , `GUI` , aiutanti | Pannello Shadow-DOM, notifiche, suoni, pulsante mobile di richiesta rapida, tasti di scelta rapida. |

Flusso di dati: il loop `PlayerSync.sync` da 1,5 secondi legge le impostazioni effettive (prima il profilo del canale, poi globale), le applica al lettore e chiama `Extras.tick` . Le azioni dell'utente passano attraverso i gestori `GUI` , che aggiornano le impostazioni con `persist` e inviano solo la parte interessata al lettore ( `media` o `all` ).

<a id="user-facing-behavior"></a>
## Comportamento rivolto all'utente

| Zona | Comportamento |
|---|---|
| Persistenza del giocatore | Salva la qualità live/VOD, il volume, lo stato muto, la modalità silenziosa e la velocità, quindi li applica quando viene rilevato un nuovo streaming. Le modifiche apportate dalla pagina stessa (ad esempio Kick che reimposta il volume al 50%) vengono annullate; solo le azioni dello spettatore aggiornano i valori salvati. |
| Qualità | Seleziona la qualità preferita tramite il menu del lettore, torna a quella successiva inferiore (o Auto) quando non disponibile e chiude nuovamente il menu. Solo i clic autentici degli utenti insegnano allo script una nuova qualità "ultimo utilizzato". |
| Volume e riproduzione silenziosa | Il volume e la disattivazione dell'audio vengono ripristinati per flusso. La riproduzione silenziosa indirizza il video attraverso il motore Web Audio con guadagno zero, quindi lo streaming continua a essere riprodotto in una scheda in background senza essere disattivato. |
| Profili dei canali | **Salva questo canale** memorizza la qualità, il volume, la velocità e l'audio correnti del canale che si sta guardando. I profili contengono anche note, gruppi, stato pin, un avatar e flag abilitati/esclusi. |
| Preimpostazioni | Risparmia larghezza di banda, migliore qualità, visualizzazione silenziosa e VOD applicati in un clic. |
| Pannello | `F2` o un tasto di scelta rapida personalizzato apre un pannello a larghezza fissa (680 px) con una barra laterale raggruppata, ricerca, stili Kick e Minimal, temi chiaro/scuro, 14 colori principali più un selettore di colori, layout compatto, sfocatura dello sfondo, ridimensionamento del testo, contrasto elevato e controlli di animazione. |
| Cerca | Insensibile all'accento, corrisponde alla lingua dell'interfaccia e ai nomi inglesi e corrisponde ai titoli delle sezioni o delle schede. Le sequenze di tasti digitate nel pannello non raggiungono mai i tasti di scelta rapida di Kick. |
| Cursori | Ogni cursore risponde ai clic, al trascinamento, alle frecce della tastiera e alla rotellina del mouse. |
| Suoni | Segnali audio Web per azioni di menu, modifiche alle impostazioni, successo/fallimento della qualità e ripristino del volume, ciascuno con interruttore, anteprima e volume. |
| Notifiche | Messaggi localizzati che possono essere trascinati, ridimensionati, resi trasparenti, silenziati (non disturbare, silenzia a schermo intero) e registrati nella cronologia. |
| Allarme congelamento | Rileva un giocatore in stallo o uno schermo nero, riproduce un allarme forte (anche in una scheda nascosta, indipendentemente dall'interruttore degli effetti sonori) e mostra una notifica. |
| Premi | La richiesta automatica opzionale attende la notifica della ricompensa di Kick (o viene eseguita secondo un programma), apre la finestra delle ricompense, richiede ciò che è disponibile e la chiude. Un pulsante di richiesta rapida mobile e trascinabile fa lo stesso con un clic. |
| Disposizione | Nasconde la chat e comprime il menu di sinistra dal pannello o con i tasti di scelta rapida, opzionalmente ricordando la scelta per ogni flusso. |
| Strumenti | Sleep timer, visualizzazione focus (schermo intero), risincronizzazione del lettore e modalità provvisoria che mette in pausa ogni modifica automatica. |
| Diagnostica | Stato in tempo reale, qualità rilevate, risoluzione video, scansione della qualità, controllo dei conflitti, registro delle azioni e un rapporto copiabile. |
| Dati | Esportazione/importazione di impostazioni, annullamento, ripristino dopo ripristino, backup/ripristino di canali salvati. |
| Privacy | Impostazioni, profili, registri e cronologie rimangono nella memoria del browser. Niente viene inviato da nessuna parte. |

<a id="settings-reference"></a>
## Riferimento alle impostazioni

Tutti i valori sono convalidati da `sanitizeSettings` ; tutto ciò che non è valido ritorna al valore predefinito. Gli intervalli vengono applicati.

### Giocatore

| Chiave | Tipo/gamma | Predefinito | Significato |
|---|---|---|---|
| `autoQualityEnabled` | booleano | `true` | Applica automaticamente la qualità preferita. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Qualità da applicare per live streaming e VOD. `auto` significa "ricorda la mia ultima scelta". |
| `lastLiveQuality` , `lastVodQuality` | stesso | `auto` | Ultima qualità scelta dallo spettatore a mano. |
| `qualityFallback` | `lower` , `auto` | `lower` | Cosa fare quando non viene offerta la qualità preferita. |
| `autoVolumeEnabled` | booleano | `true` | Ripristina e proteggi il volume salvato. |
| `volume` | 0–1 | `1` | Volume salvato. |
| `muted` | booleano | `false` | Stato muto salvato. |
| `silent` | booleano | `false` | Riproduzione silenziosa (grafico audio a guadagno zero, lettore non disattivato). |
| `playbackRate` | 0,25–2,5 | `1` | Velocità salvata; `1` non è mai forzato. |
| `warnLoudVolume` , `loudVolumeThreshold` | booleano; 60–100, passo 5 | `true` ; `85` | Avviso di volume elevato. |
| `safeMode` | booleano | `false` | Metti in pausa ogni modifica automatica. |
| `channelProfiles` | oggetto, fino a 200 | `{}` | Profili per canale (vedi sotto). |

Campi del profilo canale: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (solo `https://…kick.com/images/user/…` URL), `note` (240 caratteri), `group` (40 caratteri), `updatedAt` , `lastUsed` .

### Notifiche e suoni

| Chiave | Tipo/gamma | Predefinito | Significato |
|---|---|---|---|
| `notificationsEnabled` | booleano | `true` | Mostra notifiche sui risultati. |
| `doNotDisturb` , `quietFullscreen` | booleano | `false` , `true` | Elimina notifiche e suoni o solo a schermo intero. |
| `notificationScale` | 0,8–1,4 | `1` | Dimensioni della notifica. |
| `notificationDuration` | 1500–12000 ms, passo 500 | `3500` | Quanto dura una notifica. |
| `notificationOpacity` | 0,35–1 | `0.95` | Trasparenza delle notifiche. |
| `notificationShowIcon` | booleano | `true` | Mostra l'icona di stato. |
| `notificationPosition` | `{x, y}` o `null` | `null` | Posizione trascinata. |
| `notificationHistoryEnabled` , `notificationHistory` | booleano; fino a 30 voci | `true` ; `[]` | Storia delle notifiche. |
| `soundEffectsEnabled` , `soundVolume` | booleano; 0–1 | `false` ; `0.35` | Interruttore principale e volume. |
| `soundEvents` , `soundEventVolumes` | per evento: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | tutto acceso; `0.35` | Interruttore e volume per evento. |

### Aspetto, movimento e scorciatoie

| Chiave | Tipo/gamma | Predefinito | Significato |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema del colore. |
| `panelStyle` | `kick` , `minimal` | `kick` | Stile visivo del pannello. |
| `accentColor` | `#rrggbb` | `#53fc18` | Colore accento. |
| `compactMode` , `highContrast` | booleano | `false` | Densità e contrasto. |
| `backdropBlur` | 0–12px | `6` | Sfocatura dello sfondo dietro il pannello (funziona in entrambi gli stili). |
| `textScale` | 0,9–1,3 | `1` | Dimensione del testo. |
| `language` , `languageChosen` | codice locale; booleano | lingua del browser; `false` | L'interfaccia segue la lingua del browser finché non viene scelta una lingua, poi la scelta viene ricordata. |
| `panelPosition` | `{x, y}` o `null` | `null` | Posizione del pannello trascinato. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Velocità di animazione. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Effetto apertura/chiusura pannello. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Effetto hover. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animazione logo/indicatore. |
| `iconAnimations` | booleano | `true` | Anima la barra laterale, reimposta e icone di aiuto. |
| `hotkey` | stringa combinata | `F2` | Apre o chiude il pannello. |
| `actionHotkeys` | stringhe combinate | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Attiva/disattiva notifiche, visualizzazione focalizzata, ripristina qualità, ripristina volume, attiva/disattiva chat, attiva/disattiva menu a sinistra. |

Le combinazioni di tasti vengono memorizzate come stringhe come `Alt+Q` e abbinate a un tasto fisico, quindi funzionano su qualsiasi layout di tastiera. Le impostazioni delle versioni precedenti con un tasto di scelta rapida a forma di oggetto vengono convertite automaticamente. La larghezza del pannello è fissa a 680 px (limitata alla dimensione della finestra); la precedente impostazione della larghezza viene ignorata.

### Utensili

| Chiave | Tipo/gamma | Predefinito | Significato |
|---|---|---|---|
| `autoRecoverStall` | booleano | `false` | Prova `play()` quando viene rilevato un blocco. |
| `freezeAlertEnabled` , `freezeSound` | booleano | `true` | Blocca la notifica e il suono dell'allarme. |
| `freezeSeconds` | 5–60, passaggio 5 | `10` | Secondi di non progresso prima dell'allarme. |
| `layoutHideChat` , `layoutCollapseSidebar` | booleano | `false` | Layout ricordato, applicato una volta per pagina. |
| `autoClaimRewards` | booleano | `false` | Abilita la richiesta automatica del premio. |
| `claimMode` | `notify` , `interval` | `notify` | Richiedi quando Kick mostra la sua notifica o secondo un programma. |
| `claimDelaySec` | 0–120, passaggio 5 | `5` | Attendi la visualizzazione della notifica (modalità di notifica). |
| `claimIntervalMin` | 5–120, passaggio 5 | `10` | Minuti tra i controlli (modalità programmata). |

### Pulsante di richiesta rapida

| Chiave | Tipo/gamma | Predefinito | Significato |
|---|---|---|---|
| `claimWidget` | booleano | `false` | Mostra il pulsante mobile. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Progettazione di pulsanti. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Icona incorporata o immagine dell'utente. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , fino a 90.000 caratteri | vuoto | Copia ricodificata dell'immagine caricata. Tutto il resto viene rifiutato. |
| `claimWidgetImageFill` | booleano | `false` | Lascia che un'immagine personalizzata riempia l'intero pulsante (non utilizzata dal design della pillola). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Dimensione del pulsante. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Opacità del pulsante (opacità completa mentre è disponibile una ricompensa). |
| `claimWidgetAutoHide` | booleano | `false` | Mostra il pulsante solo quando è disponibile un premio. |
| `claimWidgetPos` | `{x, y}` o `null` | `null` | Posizione trascinata. |

### Diagnostica e stato

| Chiave | Tipo/gamma | Predefinito | Significato |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | booleano; fino a 60 voci | `true` ; `[]` | Registro delle azioni. |
| `activeSection` | ID sezione | `playback` | Ultima pagina aperta. |
| `resetBackup` | oggetto impostazioni | `null` | Istantanea scattata prima di un ripristino o di un'importazione. |

<a id="core-utilities"></a>
## Utilità principali

| Funzione | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `detectLanguage` | — → locale | Esegue `navigator.languages` , mappa le varianti regionali ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) e restituisce la prima locale supportata, ovvero `en` . |
| `dictFor` | lang → dizionario | Restituisce la tabella di traduzione per una locale, tornando alla lingua di base e quindi all'inglese. |
| `t` / `T` | lang, chiave, vars → stringa | Risolve una chiave con la sostituzione `{placeholder}` ; `T` utilizza la lingua corrente. |
| `diagText` | indice, qualità → stringa | Restituisce una delle frasi diagnostiche localizzate. |
| `log` | …argomenti → vuoto | Registrazione della console con il prefisso dello script. |
| `clamp` , `sleep` , `esc` | valore → valore | Limitazione dell'intervallo, ritardo basato sulla promessa ed escape HTML. |
| `normalizeQuality` | testo → stringa | Rende minuscolo un'etichetta di qualità e rimuove gli spazi bianchi. |
| `debounce` | fn, aspetta → funzione | Rimbalzo finale con metodo `flush` . |
| `onLocationChange` | richiamata → vuoto | Rileva la navigazione a pagina singola eseguendo il wrapper `pushState` / `replaceState` , ascoltando `popstate` ed effettuando il polling una volta al secondo. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | evento → stringa/booleano | Costruisci e confronta combinazioni di tasti dal codice chiave fisico. |
| `mkPointer` | tipo, extra → evento | Crea un `PointerEvent` (o un `MouseEvent` quando non disponibile) utilizzato per gestire i menu ARIA di Kick. |
| `waitFor` | sonda, timeout, passo → valore/null | Esegue il polling fino a quando la sonda non restituisce un valore o termina il timeout. |
| `imageToDataUrl` | immagine → stringa | Ridimensiona un'immagine in una tela quadrata (mantenendo le proporzioni, `willReadFrequently` ), prova 128, 96 e 64 px e restituisce un URL di dati PNG non più grande di 70.000 caratteri. |

<a id="settings-storage"></a>
## Memorizzazione delle impostazioni

| Funzione | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `sanitizeProfiles` | oggetto → oggetto | Mantiene al massimo 200 profili con chiavi valide e blocca ogni campo; l'avatar deve essere un URL dell'immagine Kick. |
| `sanitizeSettings` | oggetto, conBackup → oggetto | Convalida ogni impostazione (tipi, intervalli, valori consentiti), migra le impostazioni 1.1–1.3 (qualità legacy, tasti di scelta rapida, animazioni e tasti di sezione) e applica la regola della lingua. |
| `legacyHotkey` | valore → stringa | Converte un tasto di scelta rapida a forma di oggetto in una stringa combinata. |
| `Store.load` / `Store.save` | — / impostazioni → impostazioni/void | Leggere e scrivere l'oggetto ripulito in `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → void | Unisce una patch, disinfetta, salva con un breve rimbalzo e facoltativamente invia un'istantanea di annullamento (mantenuta solo in memoria, fino a 15). |
| ascoltatore `storage` | evento → vuoto | Ricarica le impostazioni quando un'altra scheda Kick le modifica, in modo che le schede non si sovrascrivano mai a vicenda. |

<a id="player-synchronization-playersync"></a>
## Sincronizzazione del lettore ( `PlayerSync` )

### Aiutanti del canale e del profilo

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `isVod` | — → booleano | Rileva una pagina VOD dall'URL. |
| `channelKey` | — → stringa | Costruisce il `channel:slug` key (o `vod:id` , `kick:home` ), memorizzando nella cache il risultato per tre secondi. Nelle pagine VOD viene utilizzato il collegamento al canale più vicino al lettore. |
| `channelSlug` | — → stringa | Restituisce la parte slug di una chiave di canale. |
| `profile` | tasto → oggetto/null | Legge un profilo salvato. |
| `profileActive` | — → oggetto/nullo | Restituisce il profilo corrente solo quando è abilitato e non escluso. |
| `isExcluded` | — → booleano | Controlla se l'automazione è disabilitata per questo canale. |
| `updateProfile` | patch, chiave → void | Crea o unisce un profilo e timbra `updatedAt` . |
| `saveCurrentChannel` | — → oggetto/nullo | Memorizza la qualità, il volume, l'audio, la velocità e lo stato silenzioso attuali dello spettatore come profilo abilitato ed esegue la scansione della pagina per l'avatar del canale. |
| `effective` | — → oggetto | Risolve volume, disattivazione audio, silenzioso, velocità e qualità live/VOD dal profilo attivo o dalle impostazioni globali. |
| `setStatus` | stato, risultato → void | Aggiorna lo stato e i codici dell'ultimo risultato visualizzati nell'intestazione e nella diagnostica. |

### Trovare e guidare il giocatore di Kick

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `findMainVideo` | — → video/null | Sceglie il `<video>` visibile più grande. |
| `streamKey` | — → stringa | Restituisce il percorso della pagina utilizzato per applicare la qualità una volta per flusso. |
| `isAccountButton` | pulsante → booleano | Rifiuta i pulsanti di intestazione, avatar e account. |
| `findSettingsButton` | video → pulsante/null | Trova il pulsante dell'ingranaggio del lettore in base all'etichetta o alla vicinanza all'angolo inferiore destro del video. |
| `revealControls` | video → vuoto | Invia eventi al passaggio del mouse in modo che vengano visualizzati i controlli nascosti. |
| `simulateClick` | elemento → vuoto | Invia la sequenza puntatore-evento completa necessaria ai menu di Kick. |
| `menuItems` | — → elemento[] | Elenca le voci `menuitemradio` visibili. |
| `openQualityMenu` | — → pulsante/null | Apre il menu a forma di ingranaggio, entra in una voce di qualità quando viene visualizzato un menu di livello superiore e attende le opzioni. |
| `closeMenu` | pulsante → Prometti | Chiude il menu solo se è ancora aperto (un secondo clic cieco potrebbe riaprirlo), con fallback Escape. |
| `readMenu` | — → elemento[] | Registra le qualità offerte e quelle controllate. |
| `scanQualities` | — → Promesso<boolean> | Apre il menu, registra le qualità disponibili e lo chiude (utilizzato dalla diagnostica). |
| `activate` | elemento → Promessa | Fa clic su un'opzione e attende finché non viene selezionata. |
| `selectQuality` | desiderato, fallback → Promessa | Seleziona la qualità richiesta, altrimenti quella immediatamente inferiore, oppure Auto. |
| `desiredQuality` | — → stringa | Sceglie la qualità da applicare dal profilo, dalla preferenza o dall'ultima scelta manuale. |
| `applyQualityOnce` volta | streamKey → Promessa | Applica la qualità desiderata una volta per flusso, chiude il menu e avvisa in caso di successo o fallimento. |
| `watchManualQuality` | — → vuoto | Apprende la nuova qualità "ultimo utilizzo" solo dai clic autentici (attendibili), in modo che i clic automatici e i fallback non sovrascrivano mai i valori salvati. |

### Volume, modalità silenziosa, velocità e monitoraggio

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `applyVolume` | video, silenzioso → vuoto | Scrive il volume effettivo e lo stato di disattivazione audio (contrassegnato come modifica dello script). |
| `trackInput` | — → vuoto | Registra l'ora dell'ultimo puntatore, rotella, tocco o input da tastiera attendibile. |
| `reassertVolume` | video → vuoto | Ripristina il volume salvato quando la pagina lo ha modificato senza alcun input da parte dell'utente (velocità limitata a otto ripristini ogni dieci secondi). |
| `watchVolume` | video → vuoto | Ascolta il `volumechange` : le modifiche guidate dall'utente vengono salvate, quelle guidate dalla pagina vengono annullate. |
| `checkLoud` | volume, disattivato → void | Avvisa una volta quando il volume supera la soglia. |
| `buildGraph` | video → grafico/nullo | Collega il video a un `AudioContext` tramite un nodo di guadagno; segnala quando il sito non lo consente. |
| `applySilent` | video → vuoto | Imposta il guadagno su 0 per la riproduzione silenziosa o su 1, riprendendo il contesto quando necessario. |
| `applyRate` | video, forza → vuoto | Imposta la velocità salvata; `1` non è forzato a meno che lo spettatore non lo scelga, quindi il recupero dal vivo di Kick viene rispettato. |
| `applyMedia` | video, `{rate}` → void | Riapplica volume, modalità silenziosa e, facoltativamente, velocità senza toccare la qualità. |
| `monitorFreeze` | video → vuoto | Rileva un lettore in stallo (tempo bloccato) o uno schermo nero (tempo che si muove senza fotogrammi decodificati) e attiva l'allarme e il ripristino opzionale. Funziona in schede nascoste. |

### Ciclo e ciclo di vita

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `sync` | — → Promessa | Il ciclo principale: monitora si blocca, vincola gli ascoltatori, applica la modalità silenziosa, il volume, la velocità e la qualità, rispetta la modalità provvisoria e le esclusioni, quindi chiama `Extras.tick` . |
| `resync` | — → Promessa | Forza un nuovo passaggio (utilizzato da preimpostazioni, azioni rapide e modifiche alla qualità). |
| `init` | — → vuoto | Avvia la prima sincronizzazione, il listener di navigazione e l'intervallo di 1,5 secondi. |

<a id="page-extras-extras"></a>
## Extra della pagina ( `Extras` )

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `root` , `layoutState` | — → elemento / `{chat, sidebar}` | Leggi lo stato del layout di Kick dalla `data-chat` e `data-sidebar` nel contenitore della pagina. |
| `isDesktop` | — → booleano | L'automazione del layout viene eseguita solo alle larghezze del desktop. |
| `click` | elemento → booleano | Clic tramite `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → pulsante/null | Individua il pulsante di compressione all'interno della chat e il pulsante "mostra chat" (per icona, non per lingua). |
| `setChat` , `setSidebar` | mostra → booleano | Porta la chat o il menu di sinistra allo stato richiesto premendo i pulsanti di Kick. |
| `applyLayout` | — → vuoto | Applica il layout memorizzato una volta per pagina, senza mai ostacolare le modifiche manuali. |
| `isTyping` | — → booleano | True mentre l'utente sta digitando in un campo; attesa dei reclami automatici. |
| `rewardTrigger` , `popoverCard` | — → pulsante/null | Trova il pulsante regalo e la carta popover premio. |
| `rewardAvailable` | — → booleano | Rileva il segnale di "ricompensa disponibile" di Kick (l'invito all'azione animato). |
| `isEnabled` | pulsante → booleano | Visibile e non disabilitato. |
| `claimDrops` | — → Promesso<number> | Premi i pulsanti di richiesta abilitati per i premi completati nel pannello dei premi. |
| `claimDaily` | trigger → Promessa<number> | Apre la finestra dei premi, preme ogni pulsante di richiesta abilitato una volta (mai lo stesso pulsante due volte), quindi chiude la finestra. |
| `claimRewards` | `{manual}` → Promessa<number> | Esegue un reclamo completo, riporta il risultato e riproduce un suono; le esecuzioni manuali ignorano la digitazione e segnalano quando non c'è nulla da reclamare. |
| `normName` | testo → stringa | Normalizza i nomi per la corrispondenza ( `_` e spazi in `-` ). |
| `findAvatar` | lumaca → stringa | Restituisce l'avatar del canale visibile sulla pagina (utilizzato prima che un canale venga salvato). |
| `scanAvatars` | — → vuoto | Memorizza gli avatar per i canali salvati che ne mancano. |
| `tick` | streamKey → void | Scheduler richiamato dalla `sync` : applica il layout, scansiona gli avatar, attende la notifica della ricompensa (modalità di notifica, con ritardo e raffreddamento di due minuti) o controlla l'intervallo scelto e interroga il pannello dei drop. |

<a id="interface-building-blocks"></a>
## Elementi costitutivi dell'interfaccia

| Funzione | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `I` | nome→svg | Icona del tratto in linea. |
| `fmtValue` | formato, raw → stringa | Formatta i valori del dispositivo di scorrimento (percentuale, pixel, secondi). |
| `normSearch` , `englishOf` , `searchText` | testo → stringa | Testo di ricerca senza accento che include il nome inglese di un'etichetta tradotta. |
| `row` | chiave, etichetta, controllo, opzioni → html | Una riga di impostazione; impilati per impostazione predefinita, in linea solo per gli interruttori, con un interruttore di aiuto opzionale. |
| `sw` , `toggleRow` | …→html | Controllo dell'interruttore e una fila di interruttori già pronta. |
| `chip` , `seg` , `qualityChips` | …→html | Chips, controlli segmentati e griglia di qualità. |
| `range` | attr, chiave, opzioni → html | Dispositivo di scorrimento con traccia di riempimento e valore live. |
| `card` , `btn` , `ib` | …→html | Scheda, pulsante testo e pulsante icona. |
| `timeStr` | timestamp → stringa | Orario dell'orologio localizzato. |
| `setPref` | chiave, valore → vuoto | Scrive una preferenza del lettore nel profilo del canale attivo o nelle impostazioni globali. |
| `fxBtn` | chiave, valore, etichetta, su → html | Riquadro di selezione effetti con un piccolo glifo di anteprima. |
| `avatarHtml` | nome, URL → html | Avatar con una lettera di riserva; un'immagine non riuscita viene rimossa. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → valore | Crea il markup del pulsante di richiesta rapida sia per il pulsante live che per l'anteprima delle impostazioni. |

<a id="settings-pages-pages"></a>
## Pagine delle impostazioni ( `PAGES` )

| Pagina | Contenuto |
|---|---|
| `playback` | Suggerimento per salvare questo canale, preimpostazioni, qualità (applicazione automatica, live, VOD, fallback), volume (applicazione automatica, cursore, disattivazione audio, riproduzione silenziosa, avviso forte) e velocità. |
| `channels` | Passaggi di funzionamento, canale corrente con il pulsante **Salva questo canale** , interruttori di pausa/esclusione ed editor, quindi l'elenco dei canali salvati (ricerca, ordinamento, filtro pin, gruppi, Modifica/Fine, elimina) con backup e ripristino. |
| `tools` | Sleep timer, layout di pagina, premi (richiesta automatica, modalità, ritardo o intervallo, Richiedi ora), impostazioni dei pulsanti di richiesta rapida con anteprima dal vivo, allarme di blocco e azioni rapide. |
| `notifications` | Interruttori, dimensioni, durata, opacità, anteprima, ripristino della posizione e cronologia. |
| `sounds` | Interruttore principale e volume, interruttori per evento, volumi e anteprime. |
| `appearance` | Tema, stile, colori in risalto, densità, contrasto, dimensione del testo, sfocatura, centratura e lingua. |
| `motion` | Anteprima dal vivo, preimpostazioni e selettori per effetti di apertura, effetti al passaggio del mouse, animazioni di indicatori, velocità e icone. |
| `shortcuts` | Tasti di scelta rapida del menu e tasti di scelta rapida delle azioni con riassociazione. |
| `diagnostics` | Stato, scansione, report, controlli di qualità e conflitti, modalità provvisoria e registro delle azioni. |
| `about` | Versione, collegamenti, esportazione/importazione, annullamento, ripristino e ripristino. |

<a id="panel-controller-gui"></a>
## Controller del pannello ( `GUI` )

### Costruzione e rendering

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `build` | — → vuoto | Crea l'host shadow-DOM, il pannello, il toast e la regione live, quindi collega gli eventi. |
| `applyLook` | — → vuoto | Applica temi, stile, accento, sfocatura, scala del testo, effetti, attributi della lingua e impostazioni di avviso popup come attributi e variabili CSS. |
| `renderChrome` | — → vuoto | Visualizza il titolo, il segnaposto di ricerca, il pulsante di pausa, il suggerimento nel piè di pagina e il pulsante di richiesta rapida. |
| `renderNav` | — → vuoto | Rende la barra laterale raggruppata. |
| `renderPage` | opzioni → annulla | Renderizza la pagina attiva (o tutte le pagine durante la ricerca), preservando lo scorrimento e il focus della tastiera. |
| `filterRows` | — → vuoto | Applica il filtro di ricerca a righe, schede e pagine. |
| `channelEditor` | chiave, profilo → html | Editor per un profilo di canale. |
| `refreshAll` , `onExternalChange` | — → vuoto | Eseguire nuovamente il rendering di tutto dopo il ripristino, l'importazione, l'annullamento o una modifica da un'altra scheda. |

### Modifiche agli eventi e alle impostazioni

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `wire` | — → vuoto | Collega i gestori delegati di clic, input, modifica, rotellina e scorrimento e il trascinamento del pannello. |
| `onClick` , `onInput` , `onChange` | evento → vuoto | Invia clic, spostamenti del dispositivo di scorrimento e modifiche del testo a impostazioni, profili o azioni. |
| `applyRange` | chiave, valore → vuoto | Applica un valore al cursore (volume, sfocatura, opacità, durate...). |
| `setSetting` , `setChannel` | chiave/patch → void | Salva un'impostazione o una modifica al profilo e invia la parte interessata al lettore. |
| `pushToPlayer` | ambito, chiave → vuoto | `media` riapplicano volume, modalità silenziosa e velocità; `all` riapplica anche la qualità. Volume, disattivazione audio, modalità silenziosa e velocità non riapriranno mai il menu qualità. |
| `act` | nome, elemento → Promessa | Esegue azioni denominate: preimpostazioni, salvataggio e rimozione di canali, backup, importazione/esportazione, richieste, timer di spegnimento, scorciatoie, diagnostica e altro ancora. |
| `resetSection` | id → vuoto | Ripristina le impostazioni predefinite di una sezione. |
| `restoreVolume` | — → vuoto | Riapplica il volume salvato. |
| `toggleLayout` | quale → vuoto | Nasconde o mostra la chat o il menu di sinistra e ricorda la scelta. |
| `confirm` , `closeModal` | messaggio, opzioni/risultato → Promessa/annullamento | Finestra di dialogo di conferma nel pannello (identica in ogni browser). |
| `download` , `pickFile` , `pickImage` | … → vuoto | Salva JSON, leggi JSON e scegli un'immagine per il pulsante di richiesta rapida. |
| `startCapture` , `finishCapture` | id / combo → vuoto | Riassocia un tasto di scelta rapida, rifiutando i duplicati. |
| `replayMock` | — → vuoto | Riproduce l'effetto aperto nell'anteprima dell'animazione. |

### Strumenti e diagnostica

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minuti / — → nullo | Avvia, annulla e visualizza il timer di spegnimento (mette in pausa il video alla fine). |
| `toggleFocusView` | — → Promessa | Entra o esce dalla modalità a schermo intero nel contenitore del lettore. |
| `statusText` , `resultText` , `syncDiagnostics` | — → corda/vuoto | Stato localizzato per l'intestazione e la pagina di diagnostica. |
| `record` | messaggio, livello → vuoto | Aggiunge una voce con timestamp al registro azioni. |
| `copyDiagnostics` | — → Promessa | Copia un breve rapporto (versione, stato, qualità, tipo di pagina, agente utente). |
| `checkQuality` , `checkConflicts` | — → Promessa/nulla | Verificare che venga offerta la qualità preferita ed elencare le impostazioni che funzionano l'una contro l'altra. |

### Pulsante di richiesta rapida

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `renderClaimWidget` | — → vuoto | Crea, aggiorna o rimuove il pulsante mobile e avvia il sondaggio sullo stato di un secondo. |
| `syncClaimWidget` | — → vuoto | Mostra l'anello e il punto "premio disponibile", lo stato occupato e la regola di nascondimento automatico. |
| `placeClaimWidget` | — → vuoto | Posiziona il pulsante fissandolo alla finestra. |
| `wireClaimWidget` | elemento → vuoto | Trascinamento con soglia di cinque pixel (un trascinamento non conta mai come un clic), salvataggio della posizione e clic che esegue una rivendicazione manuale. |

### Notifiche, suoni e comportamento del pannello

| Metodo | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `notify` | messaggio, tipo, durata, forza → vuoto | Mostra un brindisi (a meno che non sia soppresso), registra la cronologia e annuncia il testo in una regione live. |
| `notifyQuality` | applicato, qualità → vuoto | Riproduce il suono del risultato, registra e mostra una notifica localizzata. |
| `initToastPosition` , `wireToastDrag` | — → vuoto | Ripristina e salva la posizione del toast trascinato. |
| `onAvatars` | — → vuoto | Aggiorna le pagine che mostrano gli avatar. |
| `ensureAudio` | — → contesto | Crea e riprende l' `AudioContext` condiviso (sbloccato al primo gesto dell'utente). |
| `playSound` , `stopSounds` | nome, anteprima → void | Genera e interrompe i segnali audio Web. |
| `playFreezeAlarm` , `alertFrozen` | forza → vuoto | Riproduci l'allarme a cinque note e attiva la notifica di blocco. |
| `placePanel` , `wirePanelDrag` | posizione → vuoto | Posiziona il pannello all'interno della finestra e rendi l'intestazione trascinabile. |
| `open` , `close` , attiva `toggle` | — → vuoto | Controlla il pannello, il polling, la messa a fuoco e i suoni del menu. |
| `syncVolumeControls` | — → vuoto | Mantiene il cursore del volume sincronizzato con il lettore mentre il pannello è aperto. |

<a id="hotkeys-and-startup"></a>
## Tasti di scelta rapida e avvio

| Funzione | Parametri / ritorno | Cosa e come fa |
|---|---|---|
| `isolateKeys` | — → vuoto | Registrato `document-start` nella fase di acquisizione: gli eventi della tastiera che provengono dall'interno del pannello smettono di propagarsi a Kick (quindi Spazio, F, M e le frecce non attivano mai i tasti di scelta rapida del giocatore) e Tab viene intrappolato all'interno della finestra di dialogo. |
| `setupHotkeys` | — → vuoto | Gestisce l'acquisizione dei tasti per il riassociazione, Escape (modale, a discesa, pannello), il tasto di scelta rapida del menu e i tasti di scelta rapida dell'azione; le combo con un modificatore o un tasto F funzionano anche durante la digitazione. |
| `init` | — → vuoto | Costruisce il pannello, installa i tasti di scelta rapida e avvia `PlayerSync` ; protetto contro la doppia iniezione. |

<a id="kick-page-dependencies"></a>
## Elimina le dipendenze della pagina

Lo script si basa sul markup attuale di Kick. Ove possibile utilizza icone, attributi e struttura anziché testo visibile, quindi continua a funzionare in ogni lingua dell'interfaccia. Se Kick li modifica, la funzione di corrispondenza smette di funzionare (il resto continua a funzionare).

| Caratteristica | Cosa cerca |
|---|---|
| Qualità | Un `<video>` visibile, il `button[aria-haspopup="menu"]` e le voci `[role="menuitemradio"]` . |
| Disposizione | Un contenitore con `data-sidebar` e `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , un pulsante con l'icona `CollapseRight` all'interno `#channel-chatroom` e un pulsante con l'icona `MessagesOutline` per mostrare la chat. |
| Notifica premio | Un `video` la cui fonte contiene `reward-available` o una scheda `[role="group"]` contenente un video `daily-rewards` . |
| Richiesta di ricompensa | Un `button[aria-haspopup="dialog"][aria-controls]` (icona regalo), la finestra di dialogo che controlla ( `data-state` ), ha abilitato i pulsanti di richiesta con un elemento secondario `.contents` e un pulsante di chiusura con un'etichetta `.sr-only` . |
| Gocce | Elementi dell'elenco `#rewards-panel` con una `[role="progressbar"][data-state="complete"]` e un pulsante abilitato. |
| Avatar | `img[alt]` elementi la cui fonte è `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Localizzazione

Ogni etichetta, messaggio di aiuto, errore, finestra di dialogo e notifica passa attraverso il risolutore di traduzione per 38 lingue. Le chiavi mancanti ricadono in inglese. Il nuovo testo dell'interfaccia viene tradotto in tutte le lingue supportate insieme alla funzionalità che lo aggiunge. Il selettore della lingua mostra bandiere e nomi nativi; l'interfaccia segue la lingua del browser al primo avvio e ricorda successivamente una scelta esplicita.

<a id="safety-privacy-and-compatibility"></a>
## Sicurezza, privacy e compatibilità

- Gli ambienti vengono igienizzati prima dello stoccaggio; i valori non validi ritornano ai valori predefiniti sicuri.
- I nomi dei canali, le note, il testo di notifica e l'output diagnostico vengono sottoposti a escape prima dell'inserimento dell'HTML.
- L'icona di un pulsante personalizzato viene ricodificata da un'area di disegno e archiviata come URL di dati solo di un tipo di immagine consentito; non lascia mai il browser.
- Shadow DOM mantiene gli stili dello script isolati da Kick; gli eventi della tastiera dal pannello sono isolati dai tasti di scelta rapida di Kick.
- Le azioni automatiche saltano i canali esclusi, la modalità provvisoria e gli elementi mancanti del giocatore. La richiesta di ricompensa non preme mai lo stesso pulsante due volte in una volta e attende mentre lo spettatore digita.
- Lo script non effettua richieste di rete; gli aggiornamenti provengono dal gestore degli script utente o dalla pagina Rilasci.
- Le impostazioni locali esistenti vengono conservate quando si passa da 1.1.0, 1.2.0 e 1.3.0.
