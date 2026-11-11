<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · **Italiano** · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)

</div>

# Modifiche Kick Stream: registro delle modifiche

Note di rilascio per [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), uno script utente che ricorda le preferenze del giocatore Kick e aggiunge un pannello di controllo configurabile.

## v1.3.2 — 10-11-2026

> La richiesta automatica delle ricompense ora funziona mentre Kick è aperto in una scheda in background.

### Risolto

- Le ricompense di richiesta automatica non facevano nulla mentre Kick era aperto in una scheda in background e funzionava solo dopo essere ritornati ad essa. Il programmatore di ricompense ora continua a funzionare in background, reagisce alla notifica della ricompensa di Kick nel momento in cui appare e le sue attese non vengono più allungate dalla limitazione del timer della scheda in background del browser.

### Modificato

- In una scheda in background vengono eseguiti solo il monitor di blocco e il programmatore di ricompense. Il lavoro del player (qualità, volume, velocità) attende che la scheda diventi visibile e viene applicato immediatamente quando si torna indietro.

### Compatibilità

- Verificato in Firefox con la scheda stream in background. Si prevede che i browser basati su Chromium si comportino allo stesso modo.
- Le impostazioni esistenti e i canali salvati vengono conservati durante l'aggiornamento da v1.3.1, v1.3.0, v1.2.0 e v1.1.0.
- Lo script continua a non inviare dati di telemetria e non effettua richieste di rete proprie.

### Collegamenti

-ZXQPROTETTO1QXZ
-ZXQPROTETTO2QXZ
-ZXQPROTETTO3QXZ

## v1.3.1 — 06-11-2026

> Rafforzamento del layout per ogni lingua e dimensione del testo, uno stile Minimal davvero distinto, premi e aiutanti per il layout, un allarme di blocco del giocatore e una lingua predefinita più intelligente.

### Aggiunto

- **Allarme blocco lettore.** Rileva un lettore bloccato o una schermata nera (il tempo del video si muove senza fotogrammi decodificati), riproduce un suono di allarme forte e mostra una notifica, anche quando la scheda è ridotta a icona. Tempo di rilevamento configurabile (5–60 s), attivazione/disattivazione del suono indipendente e pulsante di test.
- **Richiedi automaticamente premi** (disattivato per impostazione predefinita): apre la finestra dei premi, richiede ciò che è disponibile, la chiude di nuovo e torna allo streaming. Vengono riscattati anche i premi visualizzati nel pannello delle ricompense. Include un pulsante *Richiedi ora*.
- **Pianificazione dei premi.** Per impostazione predefinita, lo script attende la notifica "richiedi il tuo premio" di Kick e lo richiede immediatamente (con un ritardo opzionale di 0–60 s), invece di eseguire il polling. È disponibile anche una modalità programmata (ogni 5–60 minuti).
- **Pulsante di richiesta rapida.** Un piccolo pulsante mobile sullo stream che richiede il tuo premio con un clic. Trascinalo ovunque (la posizione viene ricordata), scegli uno dei quattro design (Orb, Pill, Glass, Flat), cinque icone integrate, una dimensione e un'opacità, facoltativamente mostralo solo quando è disponibile una ricompensa. Si illumina e mostra un punto quando viene visualizzata la notifica della ricompensa di Kick. La pagina delle impostazioni ha un'anteprima dal vivo.
- **La tua icona.** Carica un PNG, JPG, WebP, GIF o SVG (fino a 2 MB) come icona del pulsante, facoltativamente riempiendo l'intero pulsante. L'immagine viene ricodificata in un piccolo quadrato e memorizzata solo nel tuo browser.
- **Rotellina del mouse sugli slider.** Ogni slider può essere regolato con la rotellina del mouse mentre si passa sopra, senza scorrere il pannello.
- **Riferimento alle funzioni.** Il nuovo `en_FUNCTIONS.md` documenta l'architettura, ogni impostazione, ogni funzione e le parti della pagina di Kick da cui dipende lo script.
- **Salvataggio guidato dei canali.** Una scheda passo passo "Come funzionano i canali salvati", un singolo pulsante **Salva questo canale** che memorizza la qualità, il volume, la velocità e l'audio correnti del canale che stai guardando, un suggerimento con un clic in Riproduzione per i canali non salvati, un avviso di conferma, pulsanti etichettati *Modifica* / *Fine* nell'elenco e un interruttore per mettere in pausa le impostazioni salvate senza eliminarle.
- **Riproduzione silenziosa.** Disattiva lo streaming senza disattivare l'audio del lettore, in modo che continui a riprodurre in una scheda in background. Funziona a livello globale e per canale salvato (nell'elenco dei canali viene visualizzato il tag *Silent*).
- **Ricerca di impostazioni multilingue.** La ricerca non tiene conto dell'accento e corrisponde anche ai nomi inglesi, quindi digitando "volume" troverai l'impostazione in qualsiasi lingua dell'interfaccia. La ricerca per sezione o titolo della scheda mostra l'intera sezione.
- **Controlli del layout della pagina**: nascondi la chat e comprimi il menu a sinistra dal pannello o con i tasti di scelta rapida (`Alt+C`, `Alt+S`), con un'opzione per ricordare il layout per ogni streaming.
- **Animazioni di icone** per la barra laterale, le icone di ripristino e di aiuto, con il proprio interruttore (anche parte delle preimpostazioni di animazione).
- Gli **avatar dei canali** vengono catturati da Kick e mostrati nell'elenco dei canali salvati.
- 14 colori accentati (erano 6).
- Finestra di dialogo di conferma nel pannello che appare identica in ogni browser.

### Modificato

- **Lingua dell'interfaccia** ora segue la lingua del browser alla prima esecuzione. Una volta scelta una lingua, questa viene ricordata. Le impostazioni migrate dalle versioni precedenti seguono il browser finché non viene scelta esplicitamente una lingua.
- Lo script ora inizia da `document-start` quindi il suo isolamento da tastiera viene registrato prima degli ascoltatori della pagina.
- Le righe delle impostazioni sono impilate (etichetta sopra il controllo) in modo che il testo non possa mai sovrapporsi o ritagliarsi, in qualsiasi lingua, dimensione del testo o larghezza del pannello. Le etichette della barra laterale si avvolgono sui confini delle parole.
- I selettori di animazione vengono ricostruiti come righe a larghezza intera con icone, quindi si adattano le traduzioni lunghe.
- Lo stile del pannello **Minimal** è ora piatto e quadrato senza bagliore, i bordi sono sostituiti da divisori e la selezione dello stile di sottolineatura, quindi la differenza da **Kick** è evidente.
- Il pannello ha una larghezza fissa di 680 px (si restringe per adattarsi a finestre piccole). L'impostazione della larghezza del pannello e la maniglia di ridimensionamento sono state rimosse, quindi i layout sono uguali per tutti.
- Il titolo dell'animazione dell'indicatore non dice più "verde" quando viene utilizzato un colore principale diverso.

### Risolto

- La modifica del volume, la disattivazione dell'audio, la riproduzione silenziosa, il volume automatico o la velocità hanno riapplicato anche la qualità (riaprendo il menu Qualità e mostrando una notifica). Tali impostazioni ora toccano solo ciò che hai modificato; la qualità viene riapplicata solo quando viene modificata un'impostazione di qualità.
- Digitare la ricerca delle impostazioni potrebbe attivare i tasti di scelta rapida di Kick (ad esempio Space ha commutato lo streaming a schermo intero). Le sequenze di tasti all'interno del pannello non raggiungono più la pagina.
- Il volume preferito è stato sovrascritto quando Kick ha ripristinato il lettore al 50% dopo una ricarica e il cursore del pannello mostrava 50%. Le modifiche apportate dalla pagina da sola vengono ora ripristinate al volume salvato; solo le tue azioni lo aggiornano.
- Ritaglio e sovrapposizione del testo in Aspetto, Animazioni e Tasti di scelta rapida (etichette lunghe, testo di grandi dimensioni, pannelli stretti, traduzioni lunghe).
- Lo stile Minimal disabilita silenziosamente l'impostazione della sfocatura dello sfondo; la sfocatura ora funziona in entrambi gli stili.
- La modifica dell'opacità del pulsante di richiesta rapida non ha aggiornato l'anteprima.
- Gli slider non reagivano alla rotella del mouse.
- Le tessere di animazione ("Scala", "Pop") traboccano dalle loro carte.
- La conferma dell'eliminazione del profilo utilizzava la finestra di dialogo nativa del browser.
- I chip del timer di spegnimento non erano localizzati.
- I canali salvati non mostravano avatar e il canale corrente non ne mostrava nessuno finché il suo profilo non veniva salvato.

### Compatibilità

- Le impostazioni esistenti e i canali salvati vengono conservati durante l'aggiornamento da v1.3.0, v1.2.0 e v1.1.0.
- Lo script continua a non inviare dati di telemetria e non effettua richieste di rete proprie.

### Collegamenti

-ZXQPROTETTO0QXZ
-ZXQPROTETTO1QXZ
-ZXQPROTETTO2QXZ

## v1.3.0 — 03-11-2026

> Riprogettazione completa, struttura logica delle impostazioni, sistema di animazione ricostruito e una serie di correzioni di affidabilità per l'automazione del giocatore.

### Aggiunto

- Pannello ridisegnato con una barra laterale raggruppata: **Lettore** (Riproduzione, Canali, Strumenti), **Avvisi** (Notifiche, Suoni), **Interfaccia** (Aspetto, Animazioni, Scorciatoie) e **Sistema** (Diagnostica, Dati e informazioni).
- Nuova pagina **Animazioni**: una fase di anteprima dal vivo, tre preimpostazioni con un clic (Completo, Ridotto, Disattivato) e selettori separati per l'effetto di apertura (Nessuno, Dissolvenza, Diapositiva, Scala, Pop), effetto hover, animazione dell'indicatore e velocità.
- Preimpostazioni rapide per Risparmia larghezza di banda, Migliore qualità, Visualizzazione silenziosa e VOD, applicate immediatamente.
- Selettore qualità riprogettato come griglia di chip; la velocità, la scala del testo e il timer di spegnimento utilizzano chip e controlli segmentati invece dei menu a discesa.
- Channel manager in linea: ricerca, ordinamento, blocco, gruppi, note, modifica per canale e backup/ripristino completo, il tutto senza finestre di dialogo nidificate.
- Impostazioni audio in linea con interruttore per evento, pulsante volume e anteprima.
- Scansione qualità nella diagnostica: apre il menu del lettore, registra le qualità disponibili e lo chiude di nuovo.
- I tasti di scelta rapida ora funzionano su qualsiasi layout di tastiera (sono abbinati al tasto fisico).
- Sincronizzazione delle impostazioni tra le schede Kick aperte.
- Accentua i campioni di colore accanto al selettore di colori personalizzato, un intervallo di scala del testo più elevato e una protezione dal movimento ridotto.

### Modificato

- Le impostazioni vengono memorizzate in un formato più snello; la configurazione 1.2.x, i tasti di scelta rapida e le scelte di animazione vengono migrati automaticamente.
- La velocità di riproduzione viene applicata solo quando differisce da 1×, quindi il recupero del bordo live di Kick non viene più ignorato.
- La cronologia degli annullamenti viene mantenuta in memoria anziché essere scritta nella memoria locale.
- Eventi sonori, notifiche e tasti di scelta rapida condividono un set coerente di controlli.
- Il selettore "Profilo situazione" è sostituito da preimpostazioni con un clic.

### Risolto

- La chiusura del menu del giocatore dopo aver applicato la qualità non rischia più di riaprirlo.
- Una qualità di fallback (ad esempio 720p invece di 1080p non disponibile) non sovrascrive più la qualità preferita salvata per un canale.
- Solo i clic reali sugli articoli di qualità aggiornano la qualità "ultimo utilizzato"; i clic automatici vengono ignorati.
- La ricerca delle impostazioni non fallisce più dopo la digitazione (il target dell'evento è stato perso all'interno dello Shadow DOM).
- Le modifiche apportate in una scheda non possono più sovrascrivere le impostazioni di un'altra scheda.
- I tasti di scelta rapida del pannello non si interrompono più sui layout non latini.
- Etichette errate nei controlli del registro di diagnostica e una parola coreana nel titolo in caratteri giapponesi.
- Controlli della riproduzione bloccata e pausa della sincronizzazione dello streaming mentre la scheda è nascosta.

### Rimosso

- Funzionalità che non possono essere verificate rispetto al lettore di Kick o che lo hanno duplicato: preferenza a bassa latenza, nascondi i controlli del lettore in modalità inattiva e controllo degli aggiornamenti nel pannello basato su GitHub (usa gli aggiornamenti del tuo gestore script utente o la pagina Rilasci).
- Opzioni sovraingegnerizzate: profili di aspetto salvati, mostra/nascondi/riordina le sezioni, modalità di navigazione alternative, controlli di compatibilità e copertura della traduzione, animazioni casuali/scorrimento/sezione, durate delle notifiche per evento, avatar dei canali, colori dei gruppi, ordinamento manuale, selezione collettiva, cronologia per canale e pulizia automatica.

### Compatibilità

- Le impostazioni esistenti e i canali salvati vengono conservati durante l'aggiornamento da v1.2.0 e v1.1.0.
- Le impostazioni rimangono locali nel browser; lo script non invia dati di telemetria né effettua richieste di rete.

### Collegamenti

-ZXQPROTETTO0QXZ
-ZXQPROTETTO1QXZ
-ZXQPROTETTO2QXZ

## v1.2.0 — 07-10-2026

> Ampliato l'assistente originale per qualità e volume in un toolkit completo per le impostazioni del lettore.

### Aggiunto

- Profili per canale per qualità, volume, velocità di riproduzione e stato muto.
- Elenco canali salvato con note, gruppi, modifica del profilo e importazione/esportazione.
- Effetti sonori con interruttore globale, interruttori di singoli eventi, anteprime e volume per evento.
- Notifiche per modifiche alla qualità, volume ripristinato e azioni non riuscite.
- Cronologia delle notifiche, registro delle azioni e strumenti diagnostici con controlli chiari.
- Controlli di disponibilità della qualità, controlli di conflitto e controlli di compatibilità.
- Modalità provvisoria per disabilitare temporaneamente i cambi automatici del giocatore.
- Tasti di scelta rapida, trascinamento del pannello, ridimensionamento del pannello e un'azione del pannello centrale.
- Stili del pannello Kick e Minimal, layout compatto e controlli di animazione.
- Sleep timer, modalità di messa a fuoco a schermo intero, risincronizzazione del lettore e controlli di riproduzione.
- Importazione/esportazione di impostazioni e profili di canale.
- Navigazione tramite tastiera, ridimensionamento del testo, annunci tramite screen reader e contrasto elevato.
- Localizzazione dell'interfaccia per 38 lingue supportate.

### Risolto

- Impedisce la visualizzazione simultanea di più finestre di dialogo secondarie.
- Risolto il problema con la visualizzazione di una finestra di dialogo vuota sopra la finestra delle impostazioni audio.
- Ignorati i messaggi di notifica vuoti invece di mostrare sovrapposizioni vuote.
- Avvolgimento di etichette lunghe migliorato su pannelli stretti e layout localizzati.
- Risolto il problema con la sostituzione dei segnaposto "{quality}" e "{q}" nelle notifiche.
- Aggiornata l'etichetta della versione nel pannello e confronto degli aggiornamenti alla versione 1.2.0.

### Compatibilità

- Le impostazioni esistenti vengono conservate durante l'aggiornamento dalla v1.1.0.
- Le impostazioni rimangono locali nel browser; lo script non invia dati di telemetria.
- Il controllo aggiornamenti legge l'ultimo tag di rilascio di GitHub e non installa automaticamente gli aggiornamenti.

### Collegamenti

-ZXQPROTETTO3QXZ
-ZXQPROTETTO4QXZ
-ZXQPROTETTO5QXZ

## v1.1.0

La versione pubblica originale si concentrava sul ricordare la qualità e il volume del video su Kick, applicandoli automaticamente ai nuovi flussi e fornendo un pannello delle impostazioni F2.
