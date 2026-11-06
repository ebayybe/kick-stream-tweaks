<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · **Français** · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks - Référence des fonctions

Référence pour Kick Stream Tweaks 1.3.1. Il décrit ce que fait chaque zone fonctionnelle, comment les paramètres sont stockés, de quelles parties de la page Kick dépend le script et comment fonctionne chaque fonction ou méthode nommée dans le script utilisateur. Voir le [référentiel](https://github.com/ebayybe/kick-stream-tweaks) et [le journal des modifications](../CHANGELOG/en_CHANGELOG.md) .

> Les noms correspondent à la source. `void` signifie qu'une fonction agit via des effets secondaires. Une méthode écrite comme `Object.method` réside sur cet objet ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Contenu

1. [Architecture](#architecture)
2. [Comportement face à l'utilisateur](#user-facing-behavior)
3. [Référence des paramètres](#settings-reference)
4. [Utilitaires de base](#core-utilities)
5. [Stockage des paramètres](#settings-storage)
6. [Synchronisation des joueurs ( `PlayerSync` )](#player-synchronization-playersync)
7. [Extras de page ( `Extras` )](#page-extras-extras)
8. [Éléments de base de l'interface](#interface-building-blocks)
9. [Pages de paramètres ( `PAGES` )](#settings-pages-pages)
10. [Contrôleur de panneau ( `GUI` )](#panel-controller-gui)
11. [Raccourcis clavier et démarrage](#hotkeys-and-startup)
12. [Dépendances de page d'exclusion](#kick-page-dependencies)
13. [Localisation](#localization)
14. [Sécurité, confidentialité et compatibilité](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architecture

Le script utilisateur est un fichier autonome qui s'exécute au `document-start` avec `@grant none` . Il n’a aucune étape de construction et n’effectue aucune requête réseau propre.

| Couche | Objet/zone | Responsabilité |
|---|---|---|
| Données | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Traductions dans 38 langues, messages de diagnostic localisés, indicateurs SVG et noms de langues. |
| Configuration | `CONFIG` , `DEFAULTS` | Constantes (sélecteurs, limites de tentatives, préréglages, sections) et paramètres par défaut. |
| Stockage | `sanitizeSettings` , `Store` , `persist` | Valide et enregistre les paramètres dans `localStorage` ; conserve une pile d'annulations en mémoire. |
| Logique du joueur | `PlayerSync` | Trouve la vidéo, restaure la qualité, le volume, la vitesse et le mode silencieux, surveille les blocages. |
| Aides aux pages | `Extras` | Boutons de mise en page, réclamation de récompenses, avatars de chaîne et planificateur d'arrière-plan. |
| Interfaces | `PAGES` , `GUI` , aides | Panneau Shadow-DOM, notifications, sons, bouton de réclamation rapide flottant, raccourcis clavier. |

Flux de données : la boucle `PlayerSync.sync` de 1,5 seconde lit les paramètres effectifs (profil de canal d'abord, puis global), les applique au lecteur et appelle `Extras.tick` . Les actions de l'utilisateur passent par des gestionnaires `GUI` , qui mettent à jour les paramètres avec `persist` et transmettent uniquement la partie affectée au lecteur ( `media` ou `all` ).

<a id="user-facing-behavior"></a>
## Comportement face à l'utilisateur

| Zone | Comportement |
|---|---|
| Persistance du joueur | Enregistre la qualité du direct/VOD, le volume, l'état muet, le mode silencieux et la vitesse, puis les applique lorsqu'un nouveau flux est détecté. Les modifications apportées par la page elle-même (par exemple Kick réinitialisant le volume à 50 %) sont annulées ; seules les propres actions du spectateur mettent à jour les valeurs enregistrées. |
| Qualité | Sélectionne la qualité préférée via le menu du lecteur, revient à la qualité inférieure suivante (ou Auto) lorsqu'elle n'est pas disponible et ferme à nouveau le menu. Seuls les clics authentiques de l'utilisateur enseignent au script une nouvelle qualité de « dernière utilisation ». |
| Volume et lecture silencieuse | Le volume et la sourdine sont restaurés par flux. La lecture silencieuse achemine la vidéo via le moteur Web Audio avec un gain nul, de sorte que le flux continue de jouer dans un onglet en arrière-plan sans être mis en sourdine. |
| Profils de chaînes | **Enregistrer cette chaîne** stocke la qualité, le volume, la vitesse et le son actuels de la chaîne regardée. Les profils contiennent également des notes, des groupes, l'état du code PIN, un avatar et les indicateurs activés/exclus. |
| Préréglages | Économisez de la bande passante, la meilleure qualité, une visualisation silencieuse et la VOD s'appliquent en un clic. |
| Panneau | `F2` ou un raccourci clavier personnalisé ouvre un panneau de largeur fixe (680 px) avec une barre latérale groupée, des styles de recherche, Kick et Minimal, des thèmes clairs/sombres, 14 couleurs d'accent plus un sélecteur de couleurs, une mise en page compacte, un flou d'arrière-plan, une mise à l'échelle du texte, un contraste élevé et des commandes d'animation. |
| Rechercher | Insensible aux accents, correspond à la langue de l'interface et aux noms anglais, et correspond aux titres de section ou de carte. Les frappes saisies dans le panneau n'atteignent jamais les raccourcis clavier de Kick. |
| Curseurs | Chaque curseur répond aux clics, au glissement, aux flèches du clavier et à la molette de la souris. |
| Sons | Indices Web Audio pour les actions de menu, les modifications de paramètres, le succès/l'échec de la qualité et la restauration du volume, chacun avec un commutateur, un aperçu et un volume. |
| Notifications | Messages localisés qui peuvent être glissés, mis à l'échelle, rendus transparents, réduits au silence (ne pas déranger, silencieux en plein écran) et enregistrés dans l'historique. |
| Alarme gel | Détecte un lecteur bloqué ou un écran noir, déclenche une alarme forte (même dans un onglet caché, indépendant du commutateur d'effets sonores) et affiche une notification. |
| Récompenses | La réclamation automatique facultative attend la notification de récompense de Kick (ou s'exécute selon un calendrier), ouvre la fenêtre des récompenses, réclame ce qui est disponible et la ferme. Un bouton de réclamation rapide flottant et déplaçable fait la même chose en un seul clic. |
| Mise en page | Masque le chat et réduit le menu de gauche à partir du panneau ou avec des raccourcis clavier, en mémorisant éventuellement le choix pour chaque flux. |
| Outils | Minuterie de mise en veille, vue de mise au point (plein écran), resynchronisation du lecteur et mode sans échec qui met en pause chaque changement automatique. |
| Diagnostic | Statut en direct, qualités détectées, résolution vidéo, analyse de qualité, vérification des conflits, journal des actions et rapport copiable. |
| Données | Export/importation des paramètres, annulation, restauration après réinitialisation, sauvegarde/restauration des chaînes enregistrées. |
| Confidentialité | Les paramètres, profils, journaux et historiques restent dans le stockage du navigateur. Rien n'est envoyé nulle part. |

<a id="settings-reference"></a>
## Référence des paramètres

Toutes les valeurs sont validées par `sanitizeSettings` ; tout ce qui n'est pas valide revient à la valeur par défaut. Les plages sont appliquées.

### Joueur

| Clé | Type / gamme | Par défaut | Signification |
|---|---|---|---|
| `autoQualityEnabled` | booléen | `true` | Appliquez automatiquement la qualité préférée. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Qualité à appliquer pour les diffusions en direct et les VOD. `auto` signifie "souviens-toi de mon dernier choix". |
| `lastLiveQuality` , `lastVodQuality` | pareil | `auto` | Dernière qualité choisie par le spectateur à la main. |
| `qualityFallback` | `lower` , `auto` | `lower` | Que faire lorsque la qualité souhaitée n'est pas proposée. |
| `autoVolumeEnabled` | booléen | `true` | Restaurez et protégez le volume enregistré. |
| `volume` | 0–1 | `1` | Volume enregistré. |
| `muted` | booléen | `false` | État muet enregistré. |
| `silent` | booléen | `false` | Lecture silencieuse (graphique audio à gain nul, lecteur non mis en sourdine). |
| `playbackRate` | 0,25-2,5 | `1` | Vitesse enregistrée ; `1` n’est jamais forcé. |
| `warnLoudVolume` , `loudVolumeThreshold` | booléen; 60-100, étape 5 | `true` ; `85` | Avertissement de volume élevé. |
| `safeMode` | booléen | `false` | Mettez en pause chaque changement automatique. |
| `channelProfiles` | objet, jusqu'à 200 | `{}` | Profils par canal (voir ci-dessous). |

Champs de profil de chaîne : `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (uniquement `https://…kick.com/images/user/…` URL), `note` (240 caractères), `group` (40 caractères), `updatedAt` , `lastUsed` .

### Notifications et sons

| Clé | Type / gamme | Par défaut | Signification |
|---|---|---|---|
| `notificationsEnabled` | booléen | `true` | Afficher les notifications de résultats. |
| `doNotDisturb` , `quietFullscreen` | booléen | `false` , `true` | Supprimez les notifications et les sons, ou uniquement en plein écran. |
| `notificationScale` | 0,8-1,4 | `1` | Taille des notifications. |
| `notificationDuration` | 1 500 à 12 000 ms, pas de 500 | `3500` | Combien de temps une notification reste. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparence des notifications. |
| `notificationShowIcon` | booléen | `true` | Afficher l'icône d'état. |
| `notificationPosition` | `{x, y}` ou `null` | `null` | Position traînée. |
| `notificationHistoryEnabled` , `notificationHistory` | booléen; jusqu'à 30 entrées | `true` ; `[]` | Historique des notifications. |
| `soundEffectsEnabled` , `soundVolume` | booléen; 0–1 | `false` ; `0.35` | Interrupteur général et volume. |
| `soundEvents` , `soundEventVolumes` | par événement : `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | tout est allumé ; `0.35` | Commutateur et volume par événement. |

### Apparence, mouvements et raccourcis

| Clé | Type / gamme | Par défaut | Signification |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Thème de couleur. |
| `panelStyle` | `kick` , `minimal` | `kick` | Style visuel du panneau. |
| `accentColor` | `#rrggbb` | `#53fc18` | Couleur d'accent. |
| `compactMode` , `highContrast` | booléen | `false` | Densité et contraste. |
| `backdropBlur` | 0 à 12 pixels | `6` | Flou d’arrière-plan derrière le panneau (fonctionne dans les deux styles). |
| `textScale` | 0,9-1,3 | `1` | Taille du texte. |
| `language` , `languageChosen` | code local ; booléen | langue du navigateur ; `false` | L'interface suit la langue du navigateur jusqu'à ce qu'une langue soit choisie, puis le choix est mémorisé. |
| `panelPosition` | `{x, y}` ou `null` | `null` | Position du panneau déplacée. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Vitesse d'animation. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Effet ouverture/fermeture du panneau. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Effet de survol. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animation du logo/indicateur. |
| `iconAnimations` | booléen | `true` | Animez la barre latérale, réinitialisez et aidez les icônes. |
| `hotkey` | chaîne combinée | `F2` | Ouvre ou ferme le panneau. |
| `actionHotkeys` | cordes combinées | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Basculer les notifications, la vue ciblée, réinitialiser la qualité, restaurer le volume, basculer le chat, basculer le menu de gauche. |

Les combinaisons de touches sont stockées sous forme de chaînes telles que `Alt+Q` et correspondent à une touche physique, elles fonctionnent donc sur n'importe quelle disposition de clavier. Les paramètres des anciennes versions avec un raccourci clavier en forme d'objet sont automatiquement convertis. La largeur du panneau est fixée à 680 px (limitée à la taille de la fenêtre) ; l'ancien paramètre de largeur est ignoré.

### Outils

| Clé | Type / gamme | Par défaut | Signification |
|---|---|---|---|
| `autoRecoverStall` | booléen | `false` | Essayez `play()` lorsqu'un gel est détecté. |
| `freezeAlertEnabled` , `freezeSound` | booléen | `true` | Geler la notification et le son de l'alarme. |
| `freezeSeconds` | 5 à 60, étape 5 | `10` | Quelques secondes sans progrès avant l'alarme. |
| `layoutHideChat` , `layoutCollapseSidebar` | booléen | `false` | Mise en page mémorisée, appliquée une fois par page. |
| `autoClaimRewards` | booléen | `false` | Activez la réclamation automatique des récompenses. |
| `claimMode` | `notify` , `interval` | `notify` | Réclamez lorsque Kick affiche sa notification ou selon un calendrier. |
| `claimDelaySec` | 0 à 120, étape 5 | `5` | Attendez que la notification apparaisse (mode notification). |
| `claimIntervalMin` | 5–120, étape 5 | `10` | Minutes entre les contrôles (mode programmé). |

### Bouton de réclamation rapide

| Clé | Type / gamme | Par défaut | Signification |
|---|---|---|---|
| `claimWidget` | booléen | `false` | Afficher le bouton flottant. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Conception de boutons. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Icône intégrée ou propre image de l'utilisateur. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , jusqu'à 90 000 caractères | vide | Copie réencodée de l'image téléchargée. Tout le reste est rejeté. |
| `claimWidgetImageFill` | booléen | `false` | Laissez une image personnalisée remplir tout le bouton (non utilisée par la conception de la pilule). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Taille du bouton. |
| `claimWidgetOpacity` | 0,3-1 | `0.9` | Opacité du bouton (opacité totale lorsqu'une récompense est disponible). |
| `claimWidgetAutoHide` | booléen | `false` | Afficher le bouton uniquement lorsqu'une récompense est disponible. |
| `claimWidgetPos` | `{x, y}` ou `null` | `null` | Position traînée. |

### Diagnostics et état

| Clé | Type / gamme | Par défaut | Signification |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | booléen; jusqu'à 60 entrées | `true` ; `[]` | Journal des actions. |
| `activeSection` | identifiant de section | `playback` | Dernière page ouverte. |
| `resetBackup` | objet de paramètres | `null` | Instantané pris avant une réinitialisation ou une importation. |

<a id="core-utilities"></a>
## Utilitaires de base

| Fonction | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `detectLanguage` | — → paramètres régionaux | Parcourt `navigator.languages` , cartographie les variantes régionales ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) et renvoie la première locale prise en charge, ou `en` . |
| `dictFor` | langue → dictionnaire | Renvoie la table de traduction pour une langue locale, en revenant à sa langue de base, puis à l'anglais. |
| `t` / `T` | lang, clé, vars → chaîne | Résout une clé avec la substitution `{placeholder}` ; `T` utilise la langue actuelle. |
| `diagText` | index, qualité → chaîne | Renvoie l'une des phrases de diagnostic localisées. |
| `log` | …arguments → vide | Journalisation de la console avec le préfixe de script. |
| `clamp` , `sleep` , `esc` | valeur → valeur | Limitation de portée, délai basé sur les promesses et échappement HTML. |
| `normalizeQuality` | texte → chaîne | Met en minuscules une étiquette de qualité et supprime les espaces. |
| `debounce` | fn, attendre → fonction | Anti-rebond de fuite avec une méthode `flush` . |
| `onLocationChange` | rappel → annuler | Détecte la navigation sur une seule page en encapsulant `pushState` / `replaceState` , en écoutant `popstate` et en interrogeant une fois par seconde. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | événement → chaîne/booléen | Créez et comparez des combinaisons de touches à partir du code de la clé physique. |
| `mkPointer` | type, supplémentaire → événement | Crée un `PointerEvent` (ou un `MouseEvent` lorsqu'il n'est pas disponible) utilisé pour piloter les menus ARIA de Kick. |
| `waitFor` | sonde, délai d'attente, étape → valeur/null | Interroge jusqu'à ce que la sonde renvoie une valeur ou que le délai d'attente se termine. |
| `imageToDataUrl` | image → chaîne | Redimensionne une image dans un canevas carré (en gardant les proportions, `willReadFrequently` ), essaie 128, 96 et 64 px et renvoie une URL de données PNG ne dépassant pas 70 000 caractères. |

<a id="settings-storage"></a>
## Stockage des paramètres

| Fonction | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `sanitizeProfiles` | objet → objet | Conserve au maximum 200 profils avec des clés valides et bloque chaque champ ; l'avatar doit être une URL d'image Kick. |
| `sanitizeSettings` | objet, avec Sauvegarde → objet | Valide chaque paramètre (types, plages, valeurs autorisées), migre les paramètres 1.1 à 1.3 (qualité héritée, raccourci clavier, animation et touches de section) et applique la règle de langue. |
| `legacyHotkey` | valeur → chaîne | Convertit un raccourci clavier en forme d'objet en une chaîne combo. |
| `Store.load` / `Store.save` | — / paramètres → paramètres/vide | Lisez et écrivez l'objet nettoyé dans `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → annuler | Fusionne un patch, nettoie, enregistre avec un court anti-rebond et envoie éventuellement un instantané d'annulation (conservé en mémoire uniquement, jusqu'à 15). |
| écouteur `storage` | événement → vide | Recharge les paramètres lorsqu'un autre onglet Kick les modifie, afin que les onglets ne s'écrasent jamais. |

<a id="player-synchronization-playersync"></a>
## Synchronisation du joueur ( `PlayerSync` )

### Aides aux chaînes et aux profils

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `isVod` | — → booléen | Détecte une page VOD à partir de l'URL. |
| `channelKey` | — → chaîne | Construit la clé stable `channel:slug` (ou `vod:id` , `kick:home` ), en mettant le résultat en cache pendant trois secondes. Sur les pages VOD, le lien de la chaîne la plus proche du lecteur est utilisé. |
| `channelSlug` | — → chaîne | Renvoie la partie slug d'une clé de canal. |
| `profile` | clé → objet/null | Lit un profil enregistré. |
| `profileActive` | — → objet/nul | Renvoie le profil actuel uniquement lorsqu'il est activé et non exclu. |
| `isExcluded` | — → booléen | Vérifie si l'automatisation est désactivée pour ce canal. |
| `updateProfile` | patch, clé → vide | Crée ou fusionne un profil et tamponne `updatedAt` . |
| `saveCurrentChannel` | — → objet/nul | Stocke la qualité, le volume, la sourdine, la vitesse et l'état silencieux actuels du téléspectateur en tant que profil activé et analyse la page à la recherche de l'avatar de la chaîne. |
| `effective` | — → objet | Résout le volume, la sourdine, le silence, la vitesse et la qualité live/VOD à partir du profil actif ou des paramètres globaux. |
| `setStatus` | statut, résultat → nul | Met à jour les codes d’état et du dernier résultat affichés dans l’en-tête et les diagnostics. |

### Trouver et conduire le joueur de Kick

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `findMainVideo` | — → vidéo/nul | Sélectionne le plus grand `<video>` visible. |
| `streamKey` | — → chaîne | Renvoie le chemin de la page utilisé pour appliquer la qualité une fois par flux. |
| `isAccountButton` | bouton → booléen | Rejette les boutons d’en-tête, d’avatar et de compte. |
| `findSettingsButton` | vidéo → bouton/null | Recherche le bouton d'engrenage du lecteur par étiquette ou par proximité du coin inférieur droit de la vidéo. |
| `revealControls` | vidéo → vide | Répartit les événements de survol pour que les contrôles masqués apparaissent. |
| `simulateClick` | élément → vide | Envoie la séquence complète d'événements de pointeur dont les menus de Kick ont ​​besoin. |
| `menuItems` | — → élément[] | Répertorie les entrées `menuitemradio` visibles. |
| `openQualityMenu` | — → bouton/nul | Ouvre le menu d'engrenage, accède à une entrée de qualité lorsqu'un menu de niveau supérieur apparaît et attend les options. |
| `closeMenu` | bouton → Promesse | Ferme le menu uniquement s'il est toujours ouvert (un second clic aveugle pourrait le rouvrir), avec une solution de secours Escape. |
| `readMenu` | — → élément[] | Enregistre les qualités proposées et celles vérifiées. |
| `scanQualities` | — → Promesse<boolean> | Ouvre le menu, enregistre les qualités disponibles et le ferme (utilisé par le diagnostic). |
| `activate` | article → Promesse | Clique sur une option et attend qu'elle soit cochée. |
| `selectQuality` | souhaité, repli → Promesse | Sélectionne la qualité demandée, sinon la qualité immédiatement inférieure ou Auto. |
| `desiredQuality` | — → chaîne | Choisit la qualité à appliquer parmi le profil, la préférence ou le dernier choix manuel. |
| `applyQualityOnce` | streamKey → Promesse | Applique la qualité souhaitée une fois par flux, ferme le menu et informe du succès ou de l'échec. |
| `watchManualQuality` | — → vide | Apprend une nouvelle qualité « dernière utilisation » uniquement à partir des clics authentiques (de confiance), de sorte que les clics et les solutions de remplacement automatisés n'écrasent jamais les valeurs enregistrées. |

### Volume, mode silencieux, vitesse et surveillance

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `applyVolume` | vidéo, silencieux → vide | Écrit le volume effectif et l'état muet (marqué comme étant le propre changement du script). |
| `trackInput` | — → vide | Enregistre l’heure de la dernière saisie fiable du pointeur, de la molette, du toucher ou du clavier. |
| `reassertVolume` | vidéo → vide | Remet le volume enregistré lorsque la page l'a modifié sans aucune intervention de l'utilisateur (taux limité à huit rétablissements toutes les dix secondes). |
| `watchVolume` | vidéo → vide | Écoute les `volumechange` : les modifications apportées par l'utilisateur sont enregistrées, celles apportées par la page sont annulées. |
| `checkLoud` | volume, coupé → vide | Avertit une fois lorsque le volume dépasse le seuil. |
| `buildGraph` | vidéo → graphique/null | Câble la vidéo dans un `AudioContext` via un nœud de gain ; signale lorsque le site ne le permet pas. |
| `applySilent` | vidéo → vide | Règle le gain sur 0 pour une lecture silencieuse ou sur 1, reprenant le contexte si nécessaire. |
| `applyRate` | vidéo, force → vide | Définit la vitesse enregistrée ; `1` n'est pas forcé à moins que le spectateur ne l'ait choisi, donc le rattrapage en direct de Kick est respecté. |
| `applyMedia` | vidéo, `{rate}` → void | Réapplique le volume, le mode silencieux et éventuellement la vitesse sans toucher à la qualité. |
| `monitorFreeze` | vidéo → vide | Détecte un lecteur bloqué (temps bloqué) ou un écran noir (temps en mouvement sans images décodées) et déclenche l'alarme et la récupération optionnelle. Fonctionne dans les onglets cachés. |

### Boucle et cycle de vie

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `sync` | — → Promesse | La boucle principale : surveille le gel, lie les auditeurs, applique le mode silencieux, le volume, la vitesse et la qualité, respecte le mode sans échec et les exclusions, puis appelle `Extras.tick` . |
| `resync` | — → Promesse | Force une nouvelle passe (utilisée par les préréglages, les actions rapides et les changements de qualité). |
| `init` | — → vide | Démarre la première synchronisation, l'écouteur de navigation et l'intervalle de 1,5 seconde. |

<a id="page-extras-extras"></a>
## Extras de page ( `Extras` )

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `root` , `layoutState` | — → élément / `{chat, sidebar}` | Lisez l'état de mise en page de Kick à partir `data-chat` et `data-sidebar` sur le conteneur de pages. |
| `isDesktop` | — → booléen | L'automatisation de la mise en page ne s'exécute qu'à la largeur du bureau. |
| `click` | élément → booléen | Clics via `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → bouton/nul | Localisez le bouton de réduction dans la salle de discussion et le bouton « Afficher le chat » (par icône, pas par langue). |
| `setChat` , `setSidebar` | afficher → booléen | Amenez le chat ou le menu de gauche à l'état demandé en appuyant sur les propres boutons de Kick. |
| `applyLayout` | — → vide | Applique la mise en page mémorisée une fois par page, sans jamais lutter contre les modifications manuelles. |
| `isTyping` | — → booléen | True lorsque le spectateur tape dans un champ ; les réclamations automatiques attendent. |
| `rewardTrigger` , `popoverCard` | — → bouton/nul | Trouvez le bouton cadeau et la carte popover de récompense. |
| `rewardAvailable` | — → booléen | Détecte le signal « récompense disponible » de Kick (l'appel à l'action animé). |
| `isEnabled` | bouton → booléen | Visible et non désactivé. |
| `claimDrops` | — → Promesse<number> | Appuie sur les boutons de réclamation activés pour les drops terminés dans le panneau des récompenses. |
| `claimDaily` | déclencheur → Promesse<number> | Ouvre la fenêtre des récompenses, appuie une fois sur chaque bouton de réclamation activé (jamais deux fois sur le même bouton), puis ferme la fenêtre. |
| `claimRewards` | `{manual}` → Promesse<number> | Exécute une réclamation complète, rapporte le résultat et joue un son ; les exécutions manuelles ignorent la saisie et signalent lorsqu'il n'y a rien à réclamer. |
| `normName` | texte → chaîne | Normalise les noms pour qu'ils correspondent ( `_` et les espaces à `-` ). |
| `findAvatar` | limace → chaîne | Renvoie l'avatar de la chaîne visible sur la page (utilisé avant l'enregistrement d'une chaîne). |
| `scanAvatars` | — → vide | Stocke les avatars des chaînes enregistrées qui n'en possèdent pas. |
| `tick` | streamKey → annuler | Planificateur appelé depuis `sync` : applique la mise en page, scanne les avatars, attend la notification de récompense (mode de notification, avec délai et temps de recharge de deux minutes) ou vérifie l'intervalle choisi, et interroge le panneau de drop. |

<a id="interface-building-blocks"></a>
## Éléments de base de l'interface

| Fonction | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `I` | nom → svg | Icône de trait en ligne. |
| `fmtValue` | format, brut → chaîne | Formate les valeurs du curseur (pourcentage, pixels, secondes). |
| `normSearch` , `englishOf` , `searchText` | texte → chaîne | Texte de recherche insensible aux accents, y compris le nom anglais d'une étiquette traduite. |
| `row` | clé, étiquette, contrôle, options → html | Une rangée de réglage ; empilé par défaut, en ligne uniquement pour les commutateurs, avec une bascule d'aide facultative. |
| `sw` , `toggleRow` | … → html | Commande de commutateur et rangée de commutateurs prête à l'emploi. |
| `chip` , `seg` , `qualityChips` | … → html | Puces, contrôles segmentés et grille qualité. |
| `range` | attr, clé, options → html | Curseur avec piste de remplissage et valeur live. |
| `card` , `btn` , `ib` | … → html | Carte, bouton texte et bouton icône. |
| `timeStr` | horodatage → chaîne | Heure d’horloge localisée. |
| `setPref` | clé, valeur → vide | Écrit une préférence de joueur dans le profil de canal actif ou dans les paramètres globaux. |
| `fxBtn` | clé, valeur, étiquette, sur → html | Carreau de sélection d'effets avec un petit glyphe d'aperçu. |
| `avatarHtml` | nom, URL → html | Avatar avec une lettre de secours ; une image échouée est supprimée. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → valeur | Créez le balisage du bouton de revendication rapide pour le bouton actif et l'aperçu des paramètres. |

<a id="settings-pages-pages"></a>
## Pages de paramètres ( `PAGES` )

| Pages | Contenu |
|---|---|
| `playback` | Astuce pour enregistrer cette chaîne, préréglages, qualité (application automatique, direct, VOD, secours), volume (application automatique, curseur, sourdine, lecture silencieuse, avertissement fort) et vitesse. |
| `channels` | Étapes de fonctionnement, chaîne actuelle avec le bouton **Enregistrer cette chaîne** , commutateurs pause/exclusion et éditeur, puis la liste des chaînes enregistrées (recherche, tri, filtre à broches, groupes, Modifier/Terminé, supprimer) avec sauvegarde et restauration. |
| `tools` | Minuterie de mise en veille, mise en page, récompenses (réclamation automatique, mode, délai ou intervalle, réclamation maintenant), paramètres des boutons de réclamation rapide avec aperçu en direct, alarme de gel et actions rapides. |
| `notifications` | Commutateurs, taille, durée, opacité, aperçu, réinitialisation de position et historique. |
| `sounds` | Commutateur principal et volume, commutateurs par événement, volumes et aperçus. |
| `appearance` | Thème, style, couleurs d'accent, densité, contraste, taille du texte, flou, centrage et langue. |
| `motion` | Aperçu en direct, préréglages et sélecteurs pour les animations d'effet ouvert, d'effet de survol, d'indicateur, de vitesse et d'icône. |
| `shortcuts` | Touches de raccourci de menu et touches de raccourci d'action avec reliure. |
| `diagnostics` | Statut, analyse, rapport, contrôles de qualité et de conflit, mode sans échec et journal des actions. |
| `about` | Version, liens, export/import, annulation, restauration et réinitialisation. |

<a id="panel-controller-gui"></a>
## Contrôleur de panneau ( `GUI` )

### Construction et rendu

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `build` | — → vide | Crée l'hôte, le panneau, le toast et la région en direct du shadow-DOM, puis câble les événements. |
| `applyLook` | — → vide | Applique le thème, le style, l'accent, le flou, l'échelle du texte, les effets, les attributs de langue et les paramètres de toast en tant qu'attributs et variables CSS. |
| `renderChrome` | — → vide | Affiche le titre, l'espace réservé de recherche, le bouton pause, l'indice de pied de page et le bouton de réclamation rapide. |
| `renderNav` | — → vide | Rend la barre latérale groupée. |
| `renderPage` | options → annuler | Rend la page active (ou toutes les pages lors de la recherche), en préservant le défilement et le focus du clavier. |
| `filterRows` | — → vide | Applique le filtre de recherche aux lignes, cartes et pages. |
| `channelEditor` | clé, profil → html | Éditeur pour un profil de canal. |
| `refreshAll` , `onExternalChange` | — → vide | Restituez tout après une réinitialisation, une importation, une annulation ou une modification depuis un autre onglet. |

### Événements et modifications des paramètres

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `wire` | — → vide | Attache les gestionnaires délégués de clic, de saisie, de modification, de molette et de défilement ainsi que le déplacement du panneau. |
| `onClick` , `onInput` , `onChange` | événement → vide | Répartissez les clics, les mouvements de curseur et les modifications de texte vers les paramètres, les profils ou les actions. |
| `applyRange` | clé, valeur → vide | Applique une valeur de curseur (volume, flou, opacité, durées…). |
| `setSetting` , `setChannel` | clé/patch → vide | Enregistrez un paramètre ou un changement de profil et poussez la partie concernée vers le lecteur. |
| `pushToPlayer` | portée, clé → vide | `media` réapplique le volume, le mode silencieux et la vitesse ; `all` réapplique également la qualité. Le volume, la sourdine, le mode silencieux et la vitesse ne rouvrent jamais le menu qualité. |
| `act` | nom, élément → Promesse | Exécute des actions nommées : préréglages, enregistrement et suppression de chaînes, sauvegarde, importation/exportation, réclamations, minuterie de mise en veille, raccourcis, diagnostics et bien plus encore. |
| `resetSection` | identifiant → vide | Restaure les valeurs par défaut d'une section. |
| `restoreVolume` | — → vide | Réapplique le volume enregistré. |
| `toggleLayout` | lequel → vide | Masque ou affiche le chat ou le menu de gauche et mémorise le choix. |
| `confirm` , `closeModal` | message, options / résultat → Promesse/vide | Boîte de dialogue de confirmation dans le panneau (identique dans chaque navigateur). |
| `download` , `pickFile` , `pickImage` | … → vide | Enregistrez JSON, lisez JSON et choisissez une image pour le bouton de réclamation rapide. |
| `startCapture` , `finishCapture` | identifiant / combo → vide | Reliez un raccourci clavier, en rejetant les doublons. |
| `replayMock` | — → vide | Rejoue l'effet ouvert dans l'aperçu de l'animation. |

### Outils et diagnostics

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minutes / — → vide | Démarrez, annulez et affichez la minuterie de mise en veille (la vidéo est mise en pause à la fin). |
| `toggleFocusView` | — → Promesse | Entre ou quitte le mode plein écran sur le conteneur du lecteur. |
| `statusText` , `resultText` , `syncDiagnostics` | — → chaîne/vide | État localisé pour l’en-tête et la page de diagnostics. |
| `record` | message, niveau → vide | Ajoute une entrée horodatée au journal des actions. |
| `copyDiagnostics` | — → Promesse | Copie un court rapport (version, statut, qualités, type de page, agent utilisateur). |
| `checkQuality` , `checkConflicts` | — → Promesse/vide | Vérifiez que la qualité préférée est proposée et répertoriez les paramètres qui fonctionnent les uns contre les autres. |

### Bouton de réclamation rapide

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `renderClaimWidget` | — → vide | Crée, met à jour ou supprime le bouton flottant et démarre son sondage d'état d'une seconde. |
| `syncClaimWidget` | — → vide | Affiche l'anneau et le point « récompense disponible », l'état occupé et la règle de masquage automatique. |
| `placeClaimWidget` | — → vide | Positionne le bouton en le fixant à la fenêtre. |
| `wireClaimWidget` | élément → vide | Faites glisser avec un seuil de cinq pixels (un glisser ne compte jamais comme un clic), sauvegarde de la position et clic qui exécute une réclamation manuelle. |

### Notifications, son et comportement du panneau

| Méthode | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `notify` | message, genre, durée, force → vide | Affiche un toast (sauf suppression), enregistre l'historique et annonce le texte dans une région en direct. |
| `notifyQuality` | appliqué, qualité → vide | Lit le son du résultat, enregistre et affiche une notification localisée. |
| `initToastPosition` , `wireToastDrag` | — → vide | Restaurez et enregistrez la position du toast glissé. |
| `onAvatars` | — → vide | Actualise les pages qui affichent des avatars. |
| `ensureAudio` | — → contexte | Crée et reprend l' `AudioContext` partagé (débloqué au premier geste de l'utilisateur). |
| `playSound` , `stopSounds` | nom, aperçu → void | Générez et arrêtez les signaux Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | force → vide | Jouez l'alarme à cinq notes et déclenchez la notification de gel. |
| `placePanel` , `wirePanelDrag` | position → vide | Placez le panneau à l'intérieur de la fenêtre et rendez l'en-tête déplaçable. |
| `open` , `close` , `toggle` | — → vide | Contrôlez les sons du panneau, des sondages, de la mise au point et des menus. |
| `syncVolumeControls` | — → vide | Maintient le curseur de volume synchronisé avec le lecteur lorsque le panneau est ouvert. |

<a id="hotkeys-and-startup"></a>
## Raccourcis clavier et démarrage

| Fonction | Paramètres / retour | Que fait-il et comment |
|---|---|---|
| `isolateKeys` | — → vide | Enregistré au `document-start` dans la phase de capture : les événements de clavier provenant de l'intérieur du panneau cessent de se propager vers Kick (donc Espace, F, M et les flèches ne déclenchent jamais les raccourcis clavier du joueur) et Tab est piégé à l'intérieur de la boîte de dialogue. |
| `setupHotkeys` | — → vide | Gère la capture des touches pour la reliure, l'échappement (modal, liste déroulante, panneau), le raccourci clavier du menu et les raccourcis clavier d'action ; les combos avec un modificateur ou une touche F fonctionnent même pendant la frappe. |
| `init` | — → vide | Construit le panneau, installe les raccourcis clavier et démarre `PlayerSync` ; protégé contre la double injection. |

<a id="kick-page-dependencies"></a>
## Dépendances des pages d'exclusion

Le script s'appuie sur le balisage actuel de Kick. Dans la mesure du possible, il utilise des icônes, des attributs et une structure plutôt que du texte visible, de sorte qu'il continue de fonctionner dans toutes les langues de l'interface. Si Kick les modifie, la fonction de correspondance cesse de fonctionner (le reste continue de fonctionner).

| Fonctionnalité | Ce qu'il recherche |
|---|---|
| Qualité | Une `<video>` visible, les entrées du `button[aria-haspopup="menu"]` et `[role="menuitemradio"]` du joueur. |
| Mise en page | Un conteneur avec `data-sidebar` et `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , un bouton icône `CollapseRight` à l'intérieur `#channel-chatroom` et un bouton icône `MessagesOutline` pour afficher le chat. |
| Notification de récompense | Une `video` dont la source contient `reward-available` ou une carte `[role="group"]` contenant une vidéo `daily-rewards` . |
| Réclamation de récompense | Un `button[aria-haspopup="dialog"][aria-controls]` (icône cadeau), la boîte de dialogue qu'il contrôle ( `data-state` ), des boutons de réclamation activés avec un enfant `.contents` et un bouton de fermeture avec une étiquette `.sr-only` . |
| Gouttes | `#rewards-panel` répertorie les éléments avec un `[role="progressbar"][data-state="complete"]` et un bouton activé. |
| Avatars | `img[alt]` éléments dont la source est `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Localisation

Chaque étiquette, message d'aide, erreur, boîte de dialogue et notification passe par le résolveur de traduction pour 38 paramètres régionaux. Les clés manquantes reviennent à l'anglais. Le nouveau texte de l'interface est traduit dans toutes les langues prises en charge avec la fonctionnalité qui l'ajoute. Le sélecteur de langue affiche les drapeaux et les noms natifs ; l'interface suit la langue du navigateur lors de la première exécution et mémorise ensuite un choix explicite.

<a id="safety-privacy-and-compatibility"></a>
## Sécurité, confidentialité et compatibilité

- Les paramètres sont désinfectés avant le stockage ; les valeurs non valides reviennent aux valeurs par défaut sûres.
- Les noms de canaux, les notes, le texte de notification et les résultats de diagnostic sont échappés avant l'insertion HTML.
- Une icône de bouton personnalisé est réencodée à partir d'un canevas et stockée sous forme d'URL de données d'un type d'image autorisé uniquement ; il ne quitte jamais le navigateur.
- Shadow DOM maintient les styles du script isolés de Kick ; les événements de clavier du panneau sont isolés des raccourcis clavier de Kick.
- Les actions automatiques ignorent les chaînes exclues, le mode sans échec et les éléments de lecteur manquants. La réclamation de récompense n'appuie jamais deux fois sur le même bouton en une seule fois et attend que le spectateur tape.
- Le script ne fait aucune requête réseau ; les mises à jour proviennent du gestionnaire de script utilisateur ou de la page Releases.
- Les paramètres locaux existants sont conservés lors du passage de 1.1.0, 1.2.0 et 1.3.0.
