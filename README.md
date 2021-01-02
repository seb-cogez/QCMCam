# QCMCam
Version de développement de QCMCam
plateforme de test en ligne : https://seb-cogez.github.io/QCMCam/

QCMCam est une webapp de sondage à l'aide d'une webcam ou d'un smartphone.
Une webapp est une application web qui ne nécessite aucune installation sur l'ordinateur pour fonctionner. Il suffit de l'adresse web et c'est tout.
QCMCam fonctionne également depuis une clé USB avec certaines limitations :
* pas de possibilité d'utiliser un smartphone pour scanner
* quelques soucis avec les navigateurs basés sur Chrome.

Logo, création et adaptations par S. COGEZ - collège OLIBO de St Cyprien.
Copyright 2019 Sébastien COGEZ licence Apache 2.0

Ce logiciel est développé de manière expérimentale. Il y a eu de nombreuses modifications depuis sa première mise en ligne en juin 2017. La dernière importante a été réalisée le 20/08/2018 où les marqueurs de base (4x4) servant à voter ont été changés. Il faudra donc les imprimer à nouveau pour ceux qui auraient d'anciens jeux. Ce changement est du à des problèmes de faux positifs lors des votes en classe. J'espère ne plus avoir à revenir là-dessus à l'avenir.
Si vous voulez partager vos questionnaires via la bibliothèque, ou demander des améliorations du logiciel, merci de m'écrire.

Informations complémentaires :
* La lecture des marqueurs de vote se fait à l'aide d'une webcam ou d'un dispositif type smartphone/tablette.
Un tuto est directement accessible en cliquant sur l'icone "bouée de sauvetage".

Ingénierie de gestion des fichiers Télécharger l'appli pour un usage local ou pour modifier ce que vous voulez.
# R.G.P.D.

* Aucune donnée n'est collectée sauf si vous me les envoyez par mail. Le seul cookie utilisé est celui nécessaire aux sessions avec un smartphone.
* La plupart des opérations se faisant localement, le chargement des fichiers de question ou de participants est immédiat.
* Vous pouvez copier/coller des images directement dans l'éditeur en ligne.
* Les fichiers utilisés étant des fichiers texte, il est très facile de se les échanger...
* Il est possible de charger un fichier de questions depuis le net en ajoutant ?url=lelienverslefichier.txt à la fin de l'adresse.
* Pensez de votre côté à déclarer vos fichiers nominatifs à votre DPD (Délégué à la Protection des Données) pour être en règle par rapport au RGPD.

# Remerciements

* à Claire Savinas pour la première adaptation du plugin MathJax pour CKeditor à Katex de laquelle je ne me sortais pas. Depuis une mise à jour de Katex, j'ai complètement réécrit le plugin en repartant de zéro.
* à Arnaud Durand (des problèmes dudu) du site mathix.org pour ses suggestions au développement, et la pub qu'il a faite pour le site
* à Stéphane Guyon pour ses tweet qui ont alerté Arnaud.
* A ma femme qui n'a pas de réseau dans son collège et voulait une alternative à Plickers.
* Aux collègues du cercle d'étude de ressources numériques pour les mathématiques de Montpellier qui ont participé à la bibliothèque.
* ... et à tous les utilisateurs qui me disent bonjour en passant.

## Auteurs de la Bibliothèque

* Certains exemples de la bibliothèque ont été réalisé par moi-même
* Des QCM de Maths ont été fournis par Liouba Leroux, membre de Sesamath
* QCM de physique et chimie en lycée aimablement accordés par Laurent Crochet du site qcmweb.fr
* QCM d'histoire géo aimablement accordés par Olivier Fourrier et Catherine Lavie du site histographie.net
* Thierry Maréchal, enseignant de CM à Ambleteuse.
* Arnaud Gustin, INDSE (2-3D) à Bastogne (Belgique)

## Traduction

La traduction a été en grande partie réalisée à l'aide de Deepl translator. Si vous voyez des erreurs, merci de me les signaler rapidement en fouillant dans le fichier de traduction vous correspondant :

* Allemand Fichier de.js
* Anglais Fichier en.js
* Espagnol Fichier es.js
* Français Fichier fr.js ce fichier, comme l'un des autres peut vous permettre de vous lancer dans la traduction dans une autre langue.

## Editeur de texte en ligne
CKEditor 4 inline avec un plugin de formule KaTeX et un plugin d'upload de QCM créés par moi-même.

## icones 
dessinées par Aleksandra Wolska Icons by Aleksandra Wolska and by Pawel Kadysz.

## Logo de chargement de l'application
Ellipsis by loadding.io

## Ingénierie reconnaissance Reconnaissance des marqueurs
JS Aruco dérivé de Aruco, un système opensource créé par des chercheurs espagnols, utilisant lui-même le logiciel opencv.

## Ingénierie chargement et analyse des fichiers
Librairie "download.js" pour télécharger le fichier des questions.

## Ingénierie de démonstration des boutons
Librairie "intro.js" pour guider l'usage du site.

## Moteur de la bibliothèque
La bibliothèque est adaptée du très joli et simple Cute File Browser de Tutorialzine.com