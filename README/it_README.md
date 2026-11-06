<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · **Italiano** · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Il tuo lettore Kick, ricordalo.** Qualità, volume e velocità vengono ripristinati automaticamente su ogni streaming, con un pannello di controllo veloce e completamente localizzato.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Installare](#installation) · [Caratteristiche](#features) · [Mappa delle impostazioni](#settings-map) · [Scorciatoie](#shortcuts) · [Riferimento alla funzione](../docs/it_FUNCTIONS.md) · [Registro delle modifiche](../CHANGELOG/it_CHANGELOG.md) · [Rilasci](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Caratteristiche

- **Qualità che rimane.** Scegli una qualità live e una qualità VOD una volta; viene applicato a ogni nuovo flusso. Se manca la qualità esatta, lo script ritorna a quello immediatamente inferiore (o ad Auto).
- **Volume persistente.** Il volume e la disattivazione dell'audio vengono ripristinati per ogni streaming, con un avviso di volume alto e un cursore live che rimane sincronizzato con il lettore.
- **Profili per canale.** Apri uno streaming, premi **Salva questo canale** e quel canale ricorderà la propria qualità, volume, velocità e suono. Aggiungi un gruppo e una nota, metti in pausa le impostazioni salvate o escludi completamente il canale dall'automazione.
- **Preimpostazioni rapide.** Risparmia larghezza di banda, migliore qualità, visualizzazione silenziosa e VOD in un clic.
- **Strumenti.** Sleep timer, visualizzazione focus, risincronizzazione del lettore, controlli del layout della pagina (nascondi chat, comprimi il menu a sinistra) e una modalità provvisoria che mette in pausa tutte le modifiche automatiche.
- **Allarme blocco.** Riproduce un allarme forte e mostra una notifica quando il lettore si blocca o mostra una schermata nera, anche se la scheda è ridotta a icona.
- **Pulsante di richiesta rapida.** Un pulsante mobile e trascinabile che richiede il tuo premio con un clic. Quattro disegni, cinque icone o la tua immagine, dimensioni e opacità regolabili.
- **Richiedi automaticamente i premi.** Opzionale: attende la notifica del premio di Kick (o controlla un programma), richiede ciò che è disponibile e chiude nuovamente la finestra (disattivata per impostazione predefinita).
- **Riproduzione silenziosa.** Disattiva uno streaming senza disattivare l'audio del lettore, in modo da continuare la riproduzione in una scheda in background. Impostalo globalmente o per canale salvato.
- **Avvisi.** Notifiche che puoi trascinare, ridimensionare e disattivare, oltre a effetti sonori opzionali con volume per evento.
- **Interfaccia ridisegnata.** Barra laterale raggruppata, ricerca delle impostazioni, temi chiari e scuri, colori in risalto, modalità compatta, ridimensionamento del testo e contrasto elevato.
- **Animazioni che controlli tu.** Anteprima dal vivo, tre preimpostazioni ed effetti di apertura, passaggio del mouse e indicatori separati. Rispetta l'impostazione del sistema "riduci movimento".
- **38 lingue** con bandiere. L'interfaccia segue la lingua del tuo browser al primo avvio e ricorda la tua scelta in seguito.
- **Privato per definizione.** Tutto rimane nel tuo browser. Nessuna telemetria, nessuna richiesta di rete.

<a id="installation"></a>
## Installazione

1. Installa un gestore di script utente: [Tampermonkey](https://www.tampermonkey.net/) O [Violentmonkey](https://violentmonkey.github.io/).
2. Aprire [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) e confermare l'installazione.
3. Apri qualsiasi flusso su [kick.com](https://kick.com) e premi **F2**.

Gli aggiornamenti vengono forniti dal tuo gestore di script utente. Puoi anche guardare il [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) pagina.

## Salvataggio delle impostazioni per un canale

1. Apri lo stream del canale che desideri personalizzare.
2. Aprire il pannello (`F2`) e premi **Salva questo canale** (nella pagina **Canali** o dal suggerimento nella pagina **Riproduzione**). Le impostazioni correnti di qualità, volume, velocità e suono vengono memorizzate per quel canale.
3. Perfezionali nell'editor sotto il pulsante. Vengono applicati automaticamente ogni volta che apri quel canale.

Utilizza l'interruttore **Applica le impostazioni salvate su questo canale** per mettere in pausa un profilo senza eliminarlo oppure **Rimuovi** per eliminarlo. Tutti i canali salvati sono elencati in **Canali → Canali salvati**, dove puoi cercarli, ordinarli, appuntarli, raggrupparli, aggiungere note, eseguirne il backup e ripristinarli.

<a id="settings-map"></a>
## Mappa delle impostazioni

| Gruppo | Pagina | Cosa c'è dentro |
| --- | --- | --- |
| Giocatore | **Riproduzione** | Preimpostazioni, qualità live/VOD, fallback, volume, disattivazione audio, avviso volume alto, velocità |
| Giocatore | **Canali** | Profilo canale corrente, canali salvati, ricerca, gruppi, note, backup |
| Giocatore | **Utensili** | Sleep timer, layout di pagina, riscossione automatica dei premi, pulsante di riscossione rapida, allarme blocco, azioni rapide, visualizzazione focus |
| Avvisi | **Notifiche** | Non disturbare, dimensione, durata, opacità, posizione, storia |
| Avvisi | **Suoni** | Interruttore principale e volume, interruttore per evento, volume e anteprima |
| Interfaccia | **Aspetto** | Tema, stile del pannello, colore principale, densità, contrasto, sfocatura, scala del testo, lingua |
| Interfaccia | **Animazioni** | Anteprima dal vivo, preimpostazioni, effetti di apertura/passaggio del mouse/indicatore, velocità |
| Interfaccia | **Scorciatoie** | Tasti di scelta rapida del menu e tasti di scelta rapida delle azioni |
| Sistema | **Diagnostica** | Stato in tempo reale, scansione di qualità, controllo dei conflitti, modalità provvisoria, registro delle azioni |
| Sistema | **Dati e informazioni** | Esporta, importa, annulla, reimposta, ripristina backup, collegamenti |

Ogni cursore risponde anche alla rotellina del mouse mentre ci passi sopra. Utilizza la casella di ricerca nella parte superiore del pannello per trovare qualsiasi impostazione in base al nome. La ricerca comprende anche i nomi inglesi, quindi funziona allo stesso modo in ogni lingua dell'interfaccia e le chiavi digitate non raggiungono mai la pagina.

## Pulsante di richiesta rapida

Abilitalo in **Strumenti → Pulsante di richiesta rapida nella pagina**. Nello stream appare un piccolo pulsante:

- **Trascina**lo ovunque; la sua posizione viene ricordata.
- **Fai clic** su di esso per richiedere il tuo premio (si apre la finestra dei premi, premi *Richiedi*, chiude la finestra e torna allo streaming).
- **si illumina e mostra un punto rosso** quando viene visualizzata la notifica della ricompensa di Kick. Attiva *Mostra solo quando un premio è disponibile* per tenerlo nascosto per il resto del tempo.
- Scegli uno **stile** (Sfera, Pillola, Vetro, Piatto), un'**icona** integrata o **la tua immagine** (PNG, JPG, WebP, GIF o SVG fino a 2 MB; le immagini quadrate con uno sfondo trasparente sembrano migliori), una **dimensione** e un'**opacità**. Un'anteprima dal vivo mostra ogni modifica.

Il pulsante è separato da *Richiedi premi automaticamente*, quindi puoi richiederli manualmente, automaticamente o entrambi.

<a id="shortcuts"></a>
## Scorciatoie

| Azione | Predefinito |
| --- | --- |
| Aprire/chiudere il pannello | `F2` |
| Attiva/disattiva le notifiche | `Alt+N` |
| Attiva/disattiva la chat | `Alt+C` |
| Attiva/disattiva il menu a sinistra | `Alt+S` |
| Vista focalizzata | `Alt+F` |
| Ripristina la qualità | `Alt+Q` |
| Ripristina il volume | `Alt+V` |

Ogni scorciatoia può essere ripristinata in **Scorciatoie**. Le associazioni seguono la chiave fisica, quindi funzionano su qualsiasi layout di tastiera.

<a id="languages"></a>
## Lingue

Arabo, bielorusso, bulgaro, cinese (semplificato), cinese (tradizionale), croato, ceco, danese, olandese, inglese, inglese (India), finlandese, francese, tedesco, greco, hindi, ungherese, indonesiano, italiano, giapponese, coreano, lettone, lituano, macedone, malese, mongolo, norvegese, polacco, portoghese, rumeno, russo, serbo, slovacco, spagnolo, svedese, tailandese, turco e vietnamita.

## Risoluzione dei problemi

- **La qualità non è applicata.** Apri **Diagnostica**, premi *Aggiorna diagnostica* per scansionare le qualità offerte da Kick, quindi *Controlla la qualità selezionata*. Se un canale è escluso o la modalità provvisoria è attiva, lo indica la riga di stato.
- **I premi non vengono riscossi.** La riscossione automatica è disattivata per impostazione predefinita. Abilitalo in **Strumenti → Premi** e prova *Richiedi ora*. Funziona solo sui canali live, mentre la scheda è visibile e non stai digitando in chat. Nella modalità *notifica* lo script reagisce al banner di ricompensa di Kick.
- **Riproduzione silenziosa e audio.** La riproduzione silenziosa indirizza il video attraverso il motore audio del browser senza guadagno. Se un sito lo blocca, te lo dice il pannello e il suono normale rimane intatto.
- **Qualcosa si comporta in modo strano.** Esegui *Verifica conflitti* o utilizza la *Sezione Reimposta* nella pagina in questione.
- **Le impostazioni sembrano errate dopo un aggiornamento.** Utilizza **Dati e informazioni → Annulla** o **Ripristina backup**.
- **Trovato un bug?** Premi *Copia diagnostica* e allegalo a un file [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privacy

Le impostazioni e i profili dei canali vengono archiviati nella memoria locale del tuo browser su kick.com. Lo script non invia mai dati da nessuna parte e non richiede autorizzazioni aggiuntive (`@grant none`).

## Contribuire

Problemi e richieste pull sono i benvenuti. Lo script è un singolo file autonomo, quindi non è richiesto alcun passaggio di creazione per provare una modifica: modifica `kick-stream-tweaks.user.js` e ricaricare la pagina.

## Licenza

[MIT](./LICENSE)
