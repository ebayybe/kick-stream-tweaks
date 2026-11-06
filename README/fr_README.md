<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · **Français** · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Votre lecteur Kick, mémorisé.** La qualité, le volume et la vitesse sont restaurés automatiquement à chaque flux, avec un panneau de contrôle rapide et entièrement localisé.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Installer](#installation) · [Caractéristiques](#features) · [Carte des paramètres](#settings-map) · [Raccourcis](#shortcuts) · [Référence de fonction](../docs/fr_FUNCTIONS.md) · [Journal des modifications](../CHANGELOG/fr_CHANGELOG.md) · [Sorties](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Caractéristiques

- **Une qualité qui colle.** Choisissez une fois une qualité live et une qualité VOD ; il est appliqué à chaque nouveau flux. Si la qualité exacte manque, le script revient au niveau immédiatement inférieur (ou à Auto).
- **Volume qui reste.** Le volume et la sourdine sont restaurés par flux, avec un avertissement de volume fort et un curseur en direct qui reste synchronisé avec le lecteur.
- **Profils par chaîne.** Ouvrez un flux, appuyez sur **Enregistrer cette chaîne** et cette chaîne mémorise sa propre qualité, son volume, sa vitesse et son son. Ajoutez un groupe et une note, mettez en pause les paramètres enregistrés ou excluez complètement la chaîne de l'automatisation.
- **Préréglages rapides.** Économisez de la bande passante, la meilleure qualité, un visionnage silencieux et de la VOD en un seul clic.
- **Outils.** Minuterie de mise en veille, vue ciblée, resynchronisation du lecteur, contrôles de mise en page (masquer le chat, réduire le menu de gauche) et un mode sans échec qui met en pause toutes les modifications automatiques.
- **Alarme de gel.** Déclenche une alarme forte et affiche une notification lorsque le lecteur se bloque ou affiche un écran noir, même si l'onglet est réduit.
- **Bouton de réclamation rapide.** Un bouton flottant et déplaçable qui réclame votre récompense en un seul clic. Quatre designs, cinq icônes ou votre propre image, taille et opacité réglables.
- **Réclamer automatiquement les récompenses.** Facultatif : attend la notification de récompense de Kick (ou vérifie un calendrier), réclame ce qui est disponible et ferme à nouveau la fenêtre (désactivée par défaut).
- **Lecture silencieuse.** Met un flux sous silence sans couper le son du lecteur, afin qu'il continue de jouer dans un onglet en arrière-plan. Définissez-le globalement ou par canal enregistré.
- **Alertes.** Notifications que vous pouvez faire glisser, redimensionner et désactiver, ainsi que des effets sonores en option avec un volume par événement.
- **Interface repensée.** Barre latérale regroupée, recherche de paramètres, thèmes clairs et sombres, couleurs d'accentuation, mode compact, mise à l'échelle du texte et contraste élevé.
- **Animations que vous contrôlez.** Aperçu en direct, trois préréglages et effets d'ouverture, de survol et d'indicateur séparés. Respecte le réglage « réduire le mouvement » du système.
- **38 langues** avec drapeaux. L'interface suit la langue de votre navigateur lors de la première exécution et mémorise ensuite votre choix.
- **Privé par conception.** Tout reste dans votre navigateur. Pas de télémétrie, pas de requêtes réseau.

<a id="installation"></a>
## Installation

1. Installez un gestionnaire de script utilisateur : [Tampermonkey](https://www.tampermonkey.net/) ou [Violentmonkey](https://violentmonkey.github.io/).
2. Ouvrir [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) et confirmez l'installation.
3. Ouvrez n'importe quel flux sur [kick.com](https://kick.com) et appuyez sur **F2**.

Les mises à jour sont fournies par votre gestionnaire de script utilisateur. Vous pouvez également regarder le [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) page.

## Enregistrer les paramètres d'une chaîne

1. Ouvrez le flux de la chaîne que vous souhaitez personnaliser.
2. Ouvrez le panneau (`F2`) et appuyez sur **Enregistrer cette chaîne** (sur la page **Chaînes** ou à partir de l'astuce sur la page **Lecture**). Les paramètres actuels de qualité, de volume, de vitesse et de son sont stockés pour cette chaîne.
3. Affinez-les dans l’éditeur sous le bouton. Ils sont appliqués automatiquement chaque fois que vous ouvrez cette chaîne.

Utilisez le bouton **Appliquer les paramètres enregistrés sur cette chaîne** pour mettre un profil en pause sans le supprimer, ou **Supprimer** pour le supprimer. Toutes les chaînes enregistrées sont répertoriées sous **Chaînes → Chaînes enregistrées**, où vous pouvez les rechercher, trier, épingler, regrouper, ajouter des notes, les sauvegarder et les restaurer.

<a id="settings-map"></a>
## Carte des paramètres

| Groupe | Page | Qu'y a-t-il à l'intérieur |
| --- | --- | --- |
| Joueur | **Lecture** | Préréglages, qualité live/VOD, repli, volume, sourdine, avertissement de volume fort, vitesse |
| Joueur | **Chaînes** | Profil de chaîne actuel, chaînes enregistrées, recherche, groupes, notes, sauvegarde |
| Joueur | **Outils** | Minuterie de mise en veille, mise en page, récompenses de réclamation automatique, bouton de réclamation rapide, alarme de gel, actions rapides, vue ciblée |
| Alertes | **Notifications** | Ne pas déranger, taille, durée, opacité, position, historique |
| Alertes | **Des sons** | Commutateur principal et volume, commutateur par événement, volume et aperçu |
| Interface | **Apparence** | Thème, style de panneau, couleur d'accentuation, densité, contraste, flou, échelle du texte, langue |
| Interface | **Animations** | Aperçu en direct, préréglages, effets d'ouverture/survol/indicateur, vitesse |
| Interface | **Raccourcis** | Touches de raccourci de menu et touches de raccourci d'action |
| Système | **Diagnostics** | Statut en direct, analyse de qualité, vérification des conflits, mode sans échec, journal des actions |
| Système | **Données et à propos** | Exporter, importer, annuler, réinitialiser, restaurer la sauvegarde, les liens |

Chaque curseur répond également à la molette de la souris lorsque vous le survolez. Utilisez le champ de recherche en haut du panneau pour rechercher n'importe quel paramètre par son nom. La recherche comprend également les noms anglais, elle fonctionne donc de la même manière dans toutes les langues de l'interface, et les clés saisies ici n'atteignent jamais la page.

## Bouton de réclamation rapide

Activez-le dans **Outils → Bouton de réclamation rapide sur la page**. Un petit bouton apparaît sur le stream :

- **Faites-le** n'importe où ; sa position est mémorisée.
- **Cliquez** dessus pour réclamer votre récompense (il ouvre la fenêtre des récompenses, appuie sur *Réclamer*, ferme la fenêtre et revient au flux).
- Il **brille et affiche un point rouge** lorsque la notification de récompense de Kick apparaît. Activez *Afficher uniquement lorsqu'une récompense est disponible* pour la garder cachée le reste du temps.
- Choisissez un **style** (Orbe, Pilule, Verre, Plat), une **icône** intégrée ou **votre propre image** (PNG, JPG, WebP, GIF ou SVG jusqu'à 2 Mo ; les images carrées avec un arrière-plan transparent sont plus belles), une **taille** et une **opacité**. Un aperçu en direct montre chaque changement.

Le bouton est distinct des *Réclamations automatiques*, vous pouvez donc les réclamer manuellement, automatiquement ou les deux.

<a id="shortcuts"></a>
## Raccourcis

| Action | Défaut |
| --- | --- |
| Ouvrir/fermer le panneau | `F2` |
| Basculer les notifications | `Alt+N` |
| Basculer le chat | `Alt+C` |
| Basculer le menu de gauche | `Alt+S` |
| Vue de mise au point | `Alt+F` |
| Réinitialiser la qualité | `Alt+Q` |
| Restaurer le volume | `Alt+V` |

Chaque raccourci peut être rebondi dans **Raccourcis**. Les liaisons suivent la touche physique et fonctionnent donc sur n'importe quelle disposition de clavier.

<a id="languages"></a>
## Langues

Arabe, biélorusse, bulgare, chinois (simplifié), chinois (traditionnel), croate, tchèque, danois, néerlandais, anglais, anglais (Inde), finnois, français, allemand, grec, hindi, hongrois, indonésien, italien, japonais, coréen, letton, lituanien, macédonien, malais, mongol, norvégien, polonais, portugais, roumain, russe, serbe, slovaque, espagnol, suédois, thaï, turc et vietnamien.

## Dépannage

- **La qualité n'est pas appliquée.** Ouvrez **Diagnostics**, appuyez sur *Actualiser les diagnostics* pour analyser les qualités proposées par Kick, puis sur *Vérifier la qualité sélectionnée*. Si un canal est exclu ou si le mode sans échec est activé, la ligne d'état l'indique.
- **Les récompenses ne sont pas réclamées.** La réclamation automatique est désactivée par défaut. Activez-le dans **Outils → Récompenses** et essayez *Réclamez maintenant*. Cela ne fonctionne que sur les chaînes en direct, tant que l'onglet est visible et que vous ne tapez pas dans le chat. En mode *notification*, le script réagit à la propre bannière de récompense de Kick.
- **Lecture et audio silencieux.** La lecture silencieuse achemine la vidéo via le moteur audio du navigateur avec un gain nul. Si un site bloque cela, le panneau vous l’indique et le son normal reste intact.
- **Quelque chose se comporte bizarrement.** Exécutez *Vérifier les conflits* ou utilisez *Réinitialiser la section* sur la page en question.
- **Les paramètres semblent incorrects après une mise à jour.** Utilisez **Données et à propos → Annuler** ou **Restaurer la sauvegarde**.
- **Vous avez trouvé un bug ?** Appuyez sur *Copier les diagnostics* et joignez-le à un [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Confidentialité

Les paramètres et les profils de chaîne sont stockés dans la mémoire locale de votre navigateur sur kick.com. Le script n'envoie jamais de données nulle part et ne demande aucune autorisation supplémentaire (`@grant none`).

## Contribuer

Les problèmes et les demandes de tirage sont les bienvenus. Le script est un fichier unique et autonome, aucune étape de construction n'est donc requise pour tenter une modification : modifier `kick-stream-tweaks.user.js` et rechargez la page.

## Licence

[MIT](./LICENSE)
