<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · **Français** · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Ajustements de Kick Stream - Journal des modifications

Notes de version pour [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), un script utilisateur qui mémorise les préférences du lecteur Kick et ajoute un panneau de contrôle configurable.

## v1.3.1 — 06/11/2026

> Renforcement de la mise en page pour chaque langue et taille de texte, un style minimal vraiment distinct, des récompenses et des aides à la mise en page, une alarme de gel du joueur et une langue par défaut plus intelligente.

### Ajouté

- **Alarme de gel du lecteur.** Détecte un lecteur bloqué ou un écran noir (temps vidéo en mouvement sans images décodées), émet un son d'alarme fort et affiche une notification, même lorsque l'onglet est réduit. Temps de détection configurable (5 à 60 s), bascule sonore indépendante et bouton de test.
- **Réclamation automatique des récompenses** (désactivé par défaut) : ouvre la fenêtre des récompenses, réclame ce qui est disponible, la referme et revient au flux. Les butins qui apparaissent dans le panneau des récompenses sont également réclamés. Comprend un bouton *Réclamez maintenant*.
- **Calendrier des récompenses.** Par défaut, le script attend la propre notification de Kick « réclamez votre récompense » et la réclame immédiatement (avec un délai facultatif de 0 à 60 s), au lieu de l'interroger. Un mode programmé (toutes les 5 à 60 minutes) est également disponible.
- **Bouton de réclamation rapide.** Un petit bouton flottant sur le flux qui réclame votre récompense en un clic. Faites-le glisser n'importe où (la position est mémorisée), choisissez l'un des quatre modèles (Orbe, Pilule, Verre, Plat), cinq icônes intégrées, une taille et une opacité, et éventuellement affichez-le uniquement lorsqu'une récompense est disponible. Il brille et affiche un point lorsque la notification de récompense de Kick apparaît. La page des paramètres a un aperçu en direct.
- **Votre propre icône.** Téléchargez un fichier PNG, JPG, WebP, GIF ou SVG (jusqu'à 2 Mo) comme icône du bouton, en remplissant éventuellement tout le bouton. L'image est réencodée dans un petit carré et stockée uniquement dans votre navigateur.
- **Molette de la souris sur les curseurs.** Chaque curseur peut être ajusté avec la molette de la souris tout en le survolant, sans faire défiler le panneau.
- **Référence de fonction.** Le nouveau `en_FUNCTIONS.md` documente l'architecture, chaque paramètre, chaque fonction et les parties de la page de Kick dont dépend le script.
- **Sauvegarde guidée des chaînes.** Une carte étape par étape « Comment fonctionnent les chaînes enregistrées », un seul bouton **Enregistrer cette chaîne** qui stocke la qualité, le volume, la vitesse et le son actuels de la chaîne que vous regardez, un indice en un clic dans la lecture pour les chaînes non enregistrées, un toast de confirmation, des boutons étiquetés *Modifier* / *Terminé* dans la liste et un commutateur pour mettre en pause les paramètres enregistrés sans les supprimer.
- **Lecture silencieuse.** Met le flux en silence sans couper le son du lecteur, afin qu'il continue de jouer dans un onglet en arrière-plan. Fonctionne globalement et par chaîne enregistrée (une balise *Silent* est affichée dans la liste des chaînes).
- **Recherche de paramètres multilingues.** La recherche est insensible aux accents et correspond également aux noms anglais, donc en tapant `volume`, vous trouvez le paramètre dans n'importe quelle langue de l'interface. La recherche par section ou par titre de carte affiche la section entière.
- **Contrôles de mise en page** : masquez le chat et réduisez le menu de gauche depuis le panneau ou avec les raccourcis clavier (`Alt+C`, `Alt+S`), avec une option pour mémoriser la mise en page de chaque flux.
- **Animations d'icônes** pour la barre latérale, les icônes de réinitialisation et d'aide, avec leur propre commutateur (fait également partie des préréglages d'animation).
- Les **avatars de chaîne** sont capturés à partir de Kick et affichés dans la liste des chaînes enregistrée.
- 14 couleurs d'accent (au lieu de 6).
- Boîte de dialogue de confirmation dans le panneau qui semble identique dans tous les navigateurs.

### Modifié

- La **Langue de l'interface** suit désormais la langue du navigateur lors de la première exécution. Une fois que vous avez choisi une langue, elle est mémorisée. Les paramètres migrés à partir d'anciennes versions suivent le navigateur jusqu'à ce qu'une langue soit choisie explicitement.
- Le script démarre désormais à `document-start` donc son isolation clavier est enregistrée avant les propres écouteurs de la page.
- Les lignes de paramètres sont empilées (étiquette au-dessus du contrôle) afin que le texte ne puisse jamais se chevaucher ou se couper, quelle que soit la langue, la taille du texte ou la largeur du panneau. Les étiquettes de la barre latérale s'enroulent autour des limites des mots.
- Les sélecteurs d'animation sont reconstruits sous forme de lignes pleine largeur avec des icônes, pour que les longues traductions s'adaptent.
- Le style de panneau **Minimal** est désormais plat et carré, sans lueur, les bordures étant remplacées par des séparateurs et une sélection de style souligné, la différence avec **Kick** est donc évidente.
- Le panneau a une largeur fixe de 680 px (il se rétrécit pour s'adapter aux petites fenêtres). Le paramètre de largeur du panneau et la poignée de redimensionnement ont été supprimés, les dispositions sont donc les mêmes pour tout le monde.
- Le titre de l'animation de l'indicateur ne dit plus "vert" lorsqu'une couleur d'accent différente est utilisée.

### Corrigé

- La modification du volume, la sourdine, la lecture silencieuse, le volume automatique ou la vitesse ont également réappliqué la qualité (réouverture du menu de qualité et affichage d'une notification). Ces paramètres ne concernent désormais que ce que vous avez modifié ; la qualité est réappliquée uniquement lorsqu’un paramètre de qualité change.
- Taper dans la recherche des paramètres pourrait déclencher les raccourcis clavier de Kick (par exemple, Space a basculé le flux en plein écran). Les frappes à l’intérieur du panneau n’atteignent plus la page.
- Le volume préféré a été écrasé lorsque Kick a réinitialisé le lecteur à 50 % après un rechargement, et le curseur du panneau a affiché 50 %. Les modifications apportées par la page seule sont désormais rétablies dans votre volume enregistré ; seules vos propres actions le mettent à jour.
- Découpage et chevauchement de texte dans l'apparence, les animations et les raccourcis clavier (étiquettes longues, textes de grande taille, panneaux étroits, traductions longues).
- Le style Minimal a désactivé silencieusement le paramètre de flou d'arrière-plan ; le flou fonctionne désormais dans les deux styles.
- La modification de l'opacité du bouton de réclamation rapide n'a pas mis à jour l'aperçu.
- Les curseurs ne réagissaient pas à la molette de la souris.
- Des tuiles d'animation ("Scale", "Pop") débordant de leurs cartes.
- La confirmation de suppression du profil a utilisé la boîte de dialogue native du navigateur.
- Les puces de la minuterie de mise en veille n'étaient pas localisées.
- Les chaînes enregistrées n'affichaient aucun avatar, et la chaîne actuelle n'en affichait aucun jusqu'à ce que son profil soit enregistré.

### Compatibilité

- Les paramètres existants et les chaînes enregistrées sont conservés lors de la mise à jour à partir de v1.3.0, v1.2.0 et v1.1.0.
- Le script n'envoie toujours aucune télémétrie et n'effectue aucune requête réseau.

### Liens

- [Dépôt](https://github.com/ebayybe/kick-stream-tweaks)
- [Communiqués](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problèmes](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 03/11/2026

> Refonte complète, structure de paramètres logique, système d'animation reconstruit et série de correctifs de fiabilité pour l'automatisation du lecteur.

### Ajouté

- Panneau repensé avec une barre latérale regroupée : **Lecteur** (Lecture, Chaînes, Outils), **Alertes** (Notifications, Sons), **Interface** (Apparence, Animations, Raccourcis) et **Système** (Diagnostics, Données et à propos).
- Nouvelle page **Animations** : une étape de prévisualisation en direct, trois préréglages en un clic (Complet, Réduit, Désactivé) et des sélecteurs séparés pour l'effet d'ouverture (Aucun, Fondu, Diapositive, Échelle, Pop), l'effet de survol, l'animation des indicateurs et la vitesse.
- Préréglages rapides pour économiser la bande passante, la meilleure qualité, la visualisation silencieuse et la VOD, appliqués instantanément.
- Récupérateur de qualité repensé sous forme de grille à copeaux ; la vitesse, l'échelle du texte et la minuterie de mise en veille utilisent des puces et des commandes segmentées au lieu de listes déroulantes.
- Gestionnaire de canaux en ligne : recherche, tri, épinglage, groupes, notes, édition par canal et sauvegarde/restauration complète, le tout sans boîtes de dialogue imbriquées.
- Paramètres sonores en ligne avec un commutateur par événement, un bouton de volume et de prévisualisation.
- Scan qualité en diagnostic : ouvre le menu du lecteur, enregistre les qualités disponibles et le referme.
- Les raccourcis clavier fonctionnent désormais sur n'importe quelle disposition de clavier (ils correspondent à une touche physique).
- Synchronisation des paramètres entre les onglets Kick ouverts.
- Accentuez les échantillons de couleurs à côté du sélecteur de couleurs personnalisé, une plage d'échelle de texte plus élevée et une protection contre les mouvements réduits.

### Modifié

- Les paramètres sont stockés dans un format plus simple ; la configuration 1.2.x, les raccourcis clavier et les choix d'animation sont migrés automatiquement.
- La vitesse de lecture n'est appliquée que lorsqu'elle diffère de 1×, de sorte que le rattrapage live-edge de Kick n'est plus annulé.
- L'historique des annulations est conservé en mémoire au lieu d'être écrit sur le stockage local.
- Les événements sonores, les notifications et les raccourcis clavier partagent un ensemble cohérent de commandes.
- Le sélecteur "Profil de situation" est remplacé par des préréglages en un clic.

### Corrigé

- Fermer le menu du lecteur après avoir appliqué la qualité ne risque plus de le rouvrir.
- Une qualité de repli (par exemple 720p au lieu d'un 1080p indisponible) n'écrase plus la qualité préférée enregistrée pour une chaîne.
- Seuls les clics réels sur les articles de qualité mettent à jour la qualité « dernière utilisation » ; les clics automatisés sont ignorés.
- La recherche des paramètres n'échoue plus après la saisie (la cible de l'événement a été perdue dans le Shadow DOM).
- Les modifications apportées dans un onglet ne peuvent plus écraser les paramètres d'un autre onglet.
- Les raccourcis clavier du panneau ne s'interrompent plus sur les mises en page non latines.
- Étiquettes incorrectes dans les contrôles du journal de diagnostic et mot coréen parasite dans le titre en script japonais.
- Vérifications de lecture bloquée et pause de synchronisation du flux pendant que l'onglet est masqué.

### Supprimé

- Fonctionnalités qui n'ont pas pu être vérifiées par rapport au lecteur Kick ou qui ont été dupliquées : préférence de faible latence, masquage des contrôles du lecteur en cas d'inactivité et vérification des mises à jour dans le panneau basée sur GitHub (utilisez les mises à jour de votre gestionnaire de script utilisateur ou la page Releases).
- Options sur-conçues : profils d'apparence enregistrés, affichage/masquage/réorganisation des sections, modes de navigation alternatifs, vérifications de compatibilité et de couverture de traduction, animations aléatoires/défilement/section, durées de notification par événement, avatars de chaîne, couleurs de groupe, commande manuelle, sélection groupée, historique par chaîne et nettoyage automatique.

### Compatibilité

- Les paramètres existants et les chaînes enregistrées sont conservés lors de la mise à jour à partir de la version 1.2.0 et de la version 1.1.0.
- Les paramètres restent locaux au navigateur ; le script n'envoie pas de télémétrie et n'effectue pas de requêtes réseau.

### Liens

- [Dépôt](https://github.com/ebayybe/kick-stream-tweaks)
- [Communiqués](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problèmes](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 07/10/2026

> Extension de l'assistant de qualité et de volume d'origine en une boîte à outils complète de paramètres de lecteur.

### Ajouté

- Profils par canal pour la qualité, le volume, la vitesse de lecture et l'état muet.
- Liste de chaînes enregistrée avec notes, groupes, édition de profil et importation/exportation.
- Effets sonores avec un commutateur global, des commutateurs d'événements individuels, des aperçus et un volume par événement.
- Notifications pour les changements de qualité, le volume restauré et les actions ayant échoué.
- Historique des notifications, journal des actions et outils de diagnostic avec des contrôles clairs.
- Contrôles de disponibilité qualité, contrôles de conflits et contrôles de compatibilité.
- Mode sans échec pour désactiver temporairement les changements automatiques de joueur.
- Raccourcis clavier, déplacement du panneau, redimensionnement du panneau et action sur le panneau central.
- Styles de panneaux Kick et Minimal, disposition compacte et commandes d'animation.
- Minuterie de mise en veille, mode de mise au point plein écran, resynchronisation du lecteur et commandes de lecture.
- Import/export de paramètres et de profils de chaînes.
- Navigation au clavier, mise à l'échelle du texte, annonces du lecteur d'écran et contraste élevé.
- Localisation de l'interface pour 38 langues prises en charge.

### Corrigé

- Empêche plusieurs boîtes de dialogue secondaires d'apparaître en même temps.
- Correction d'une boîte de dialogue vide apparaissant au-dessus de la fenêtre des paramètres sonores.
- Messages de notification vides ignorés au lieu d'afficher des superpositions vierges.
- Amélioration de l'emballage des étiquettes longues sur les panneaux étroits et les mises en page localisées.
- Correction du remplacement des espaces réservés `{quality}` et `{q}` dans les notifications.
- Mise à jour de l'étiquette de version intégrée au panneau et mise à jour de la comparaison vers 1.2.0.

### Compatibilité

- Les paramètres existants sont conservés lors de la mise à jour à partir de la v1.1.0.
- Les paramètres restent locaux au navigateur ; le script n'envoie pas de télémétrie.
- Le vérificateur de mise à jour lit la dernière balise de version GitHub et n'installe pas automatiquement les mises à jour.

### Liens

- [Dépôt](https://github.com/ebayybe/kick-stream-tweaks)
- [Communiqués](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problèmes](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

La version publique originale se concentrait sur la mémorisation de la qualité et du volume vidéo sur Kick, en les appliquant automatiquement aux nouveaux flux et en fournissant un panneau de paramètres F2.
