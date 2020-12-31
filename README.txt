2020-02-15
Modifications
* Lorsqu'on scanne le QRCode avec une lecteur de QRCode, celui-ci fonctionne également.
* Mise à jour de la bibliothèque. Elle est mieux rangée.

Ajout
* Vous pouvez à présent proposer des QCM pour les ajouter à la bibliothèque depuis l'éditeur de QCM

2019-10-29
Correctifs
* meilleure détection du clic sur les numéros de ligne de réponse
* fermeture des modes supprimer et édition des utilisateurs à la sortie de l'édition avancée des utilisateurs
* modification du comportement de l'éditeur de questions, lorsqu'on sort du mode édition, seul l'affichage est proposé.
* L'ajout automatique de formule sans passer par l'éditeur se fait en entourant la formule d'un double $, exemple: $$\sqrt2$$ insère une racine carrée de 2.
* Lors de la réinitialisation des groupe, une alerte est donnée.

Ajout
* création d'un plugin Katex pour CKEditor écrit de zéro plutôt que d'utiliser une modification du plugin MathJax. Un léger problème visuel lors du survol ou du clic d'une formule : l'élément apparait parfois trop grand.
La dernière version de Katex est ainsi utilisée pour un plus large éventail de fonctions disponibles.
* Il est possible désormais de changer la couleur des n° de marqueur dans le générateur de marqueurs.

Entre mai et novembre 2019
Correctifs
* Révision du module image qui ne fonctionnait plus très bien suite à une mise à jour de CKEditor
* La fonction d'appel ne prenait pas tous les élèves absents en compte.

Ajouts
* possibilité d'insérer du code avec coloration syntaxique
2019-05-23
Correctifs
* meilleure communication entre l'ordinateur et le smartphone
* retouche du css
* largeur du cache corrigé pour qu'il ne dépasse plus

Ajouts
* sur le smartphone, boutons pour interroger les participants
* enregistrement de la taille du questionnaire, elle est rétablie à l'ouverture du questionnaire.
* sur le smartphone, envoi de la bonne réponse si elle n'est pas pré enregistrée
* lien vers la page web pour le smartphone

2019-05-17
Correctifs
* Amélioration de l'édition des groupes : si les groupes sont dans la mémoire de l'ordinateur et qu'on les modifie, il est proposé de sauvegarder les modifs à l'aide d'un bouton disquette
* Amélioration de la suppression d'élèves : cela se fait par clic direct sur les noms des élèves plutôt que d'entrer le numéro 1 par 1
* améliorations visuelles : quelques rebords par ci par là.
* modifs de la Documentation
* réécriture du code pour le rendre plus ... lisible, mais c'est pas fini.

Ajouts
* Fonctionnalité "Appel" : cela permet de supprimer de l'affichage (mais pas de l'enregistrement du groupe) les élèves qui n'ont pas répondu. Et donc de ne pas chercher qui a répondu ou pas, les prochaines fois dans la séance
* Dans l'éditeur, on peut à présent entrer une formule LaTeX en l'entourant de signes $ sans passer par le boutons habituel (pour les experts donc)
* gros travail sur la communication avec un smartphone : remplacement de la communication via mon serveur par une communication directe entre navigateurs géré par peerJs, nécessite le port 9000 ouvert à travers les parefeu (à tester) en cas  d'échec, l'ancienne méthode prend le relai
Plus besoin d'installer un lecteur de QRCode, l'appli le fait elle même, il faut donc ouvrir le site au préalable (tjs avec firefox)
* hitorique des questions enregistrées dans le navigateur amélioré : il peut garder plusieurs QCM (reste à finaliser) et la fenêtre de choix permet de supprimer les anciens
* internationalisation en 3 langues : allemand, anglais, espagnol. Traduction personnelle à l'aide d'un traducteur en ligne qui méritera donc des retouches via des fichiers lang facile à modifier et dispos en téléchargement

2018
Ajouts
* possibilité d'importer des fichiers d'utilisateurs comportant des groupes différents
* possibilité d'importer des utilisateurs par copier/coller depuis un tableur
* Boutons pour interroger des élèves au hasard.
* Création d'une bibliothèque
* possilité de scanner avec un smartphone connecté à internet.
* changement du format d'enregistrement des diaporamas

2017
* Création du site
* listes de participants pré enreigstrés
* édition de questions, import, export au format html, avec images
* Scan avec une webcam
* bilan de séance sous forme de tableau, export vers csv tableur
