QCMCam.lang['fr'] = {
  "generalPanel" : {
    'logo': "QCMCam, scanner de QCM avec une webcam",
    'startstop' : 'Démarrer/arrêter la caméra',
    'smartphone' : 'Démarrer le scan avec un smartphone ou une tablette (utiliser Firefox sur l\'appareil)',
    'changecam' : 'Changer de caméra (plusieurs caméras détectées)',
    'stopsmartphone':'Arrêter de scanner avec le smartphone',
    'help' : 'Comment démarrer ?',
    'about' : 'À propos',
    'library' : 'Accéder à la bibliothèque de QCMCam',
    'group':'Groupe',
    'usersload' : 'Charger les participants depuis son ordinateur',
    'userstoggleedit' : 'Editer la liste des participants',
    'fullscreen' : 'Plein écran (ALT+Z)',
    'usersempty' : 'Vider la liste des participants',
    'usersadd' : 'Ajouter des participants',
    'usersdelete' : 'Supprimer des participants',
    'usersedit' : 'Editer les noms et numéros des participants',
    'usersdownload': 'Télécharger les participants affichés sur l\'ordinateur',
    'userspaste' : 'Coller ici vos listes depuis votre tableur',
    'pastehere' : 'Coller ici',
    'groupsdownload' : 'Télécharger les groupes sur votre ordinateur',
    'restoredefault' : 'Restaurer les groupes par défaut',
    'userssavelists' : 'Enregistrer la liste de groupes',
    'setFullHD' : 'Démarre la caméra en Full HD (si compatible)',
    'source': 'Code source sur github'
  },
  "navigationPanel":{
    'firstquestion' : 'Aller à la première question',
    'prevquestion' : 'Question précédente',
    'nextquestion' : 'Question suivante (ALT+G)',
    'lastquestion' : 'Aller à la dernière question',
    'startscan' : 'Scanner les réponses (ALT+C)',
    'correctanswer' : 'Réponse ✅',
    'answerA' : 'Réponse A',
    'answerB' : 'Réponse B',
    'answerC' : 'Réponse C',
    'answerD' : 'Réponse D',
    'showstats' : 'Voir les statistiques de réponses (ALT+V)',
    'showcorrectanswer' : 'Affiche la bonne réponse à la question (quand enregistrée)',
    'tableofanswers' : 'Tableau général des réponses',
    'answersreset' : 'Remettre les réponses à zéro'
  },
  "questions" :{
    'addquestion' : 'Ajouter une question',
    'loadquestions' : 'Charger les questions depuis son ordinateur',
    'togglequestionsptions' : 'Plus d\'options - ne pas utiliser si des évaluations ont été faites',
    'hidequestion' : 'Cacher la question',
    'loadlastquestions' : 'Recharger le dernier questionnaire utilisé',
    'insertbefore' : 'Insérer avant cette question',
    'movetoleft' : 'Déplacer la question vers la gauche',
    'movetoright' : 'Déplacer la question vers la droite',
    'deletequestion' : 'Supprimer la question',
    'deleteallquestions' : 'Supprimer toutes les questions',
    'downloadquestions' : 'Télécharger les questions sur son ordinateur',
    'thegoodanswer': 'Bonne réponse',
    'noanswer': 'pas de réponse',
    'defaultquestion': 'Première question',
    'clickwhenready' : 'Cliquer ici quand vous êtes prêt',
    'bottommessage': 'Cliquer-glisser pour modifier la taille',
    'changetypechoice':"Commuter réponse simple/réponse multiple",
    'timetoanswer':"Temps pour apporter sa réponse",
    'pasteurl':"ou adresse web",
    'pastehere':"Coller ici"
  },
  "startPanel":{
    'demo' : 'Demonstration',
    'documentation' : 'PDF de la Documentation',
    'generator' : 'Générateur de marqueur',
    'info' : 'Informations sur le site',
    'licence':'licence <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a>',
    'mailto':'Questions ou remarques',
    'markers' : 'Marqueurs au format A4',
    'noneedqrscan':'Pas besoin de lecteur de QRCode, scanner depuis la page.',
    'raspberry':'Image pour Raspberry Pi',
    'raspberry2':'réalisée par Johannes Holstein',
    'smartphone': 'Adresse pour le smartphone',
    'source':'Code source et communauté',
    'startdescription' : "la web'app pour <b>sonder</b> avec une <b>webcam</b> ou un smartphone",
    'titledocumentation':"Télécharger la documentation",
    'titlegenerator':"Accéder au générateur de marqueur si vous avez perdu le vôtre",
    'titleinfo':"Tout ce qu'il faut savoir sur cette appli",
    'titlemarkers':"Télécharger les marqueurs pour jouer avec QCMCam",
    'titleyoutube':"Accéder à la chaine PeerTube de QCMCam.net",
    'youtube' : 'Chaine PeerTube'
  },
  "usersPanel":{
    'interrogatewrong' : 'Désigner un participant ayant voté faux',
    'interrogatetrue' : 'Désigner un participant ayant voté juste',
    'interrogaterandom' : 'Désigner un participant au hasard',
    'deleteabsentees' : 'Supprimer les utilisateurs qui n\'ont pas répondu',
    'toggleusersnames' : 'Cacher/Montrer les noms',
    'userseditionmessage' : 'Cliquer sur les numéros ou les Noms pour les modifier.<br />Attention à ne pas laisser de <b>numéro en double</b> au moment de sortir du mode édition.',
    'restoreDefaults' : 'Vous êtes sur le point de restaurer les groupes par défaut. Confirmez-vous ?'
  },
  "messages" : {
    'cameralist':"Liste des caméras détectées",
    'onedetectedcam' : '<b>Une unique caméra</b> détectée, cliquez sur <img src="css/img/32px/camera-web.png" onclick="camera.start();" /> pour afficher l\'image.<br />Ou cliquez <img src="css/img/32px/camera-refresh.png" onclick="camera.detect();" /> après en avoir branché une autre.',
    'manycam' :'<b>Plusieurs caméras</b> détectées, la 2e est celle utilisée par défaut, vous pourrez permutter en cliquant sur <img src="css/img/32px/gnome-session-switch.png" /> une fois l\'image affichée. Vous pouvez également sélectionner directement celle que vous voulez utiliser :<br />',
    'nocamdetected':'<b>Pas de caméra</b> détectée, vous pouvez relancer la détection en cliquant <img src="css/img/32px/camera-refresh.png" onclick="camera.detect();" /> après en avoir branché une.<br>Vous pouvez également utiliser un dispositif externe en cliquant sur <img src="css/img/32px/phone.png" onclick="comm.loadSession();" />.',
    "deleteabsentees":"Voulez-vous supprimer les absents ?",
    "nothingtoedit":"Pas d'élément à éditer.",
    'twicenumber':"Le numero {} est utilisé plusieurs fois ! changez la valeur avant de continuer.",
    'nostudent': "Pas d'élèves dans le groupe {}",
    'noclass': "Pas de groupe à montrer",
    'empty':"Vous êtes sur le point de supprimer la liste des participant. Confirmez-vous ?",
    'adduser':"Combien de participants voulez-vous ajouter ?",
    'participant':"Participant",
    'groupmusthave':"Il faut charger une classe avant\nd'interroger un élève au hasard.",
    'nogroup':"Pas de groupe à télécharger.",
    "goodanswer":"Bonne réponse",
    "groupneeded":"Vous devez avoir importé une classe et les questions avant de lancer le scan.",
    "connexionestablished":"Connexion établie avec le smartphone.",
    "connexionfailed":"Echec de connexion au serveur",
    "deconnectionSmartphone":"Déconnecté du smartphone",
    "connexionclosed":"Connexion fermée",
    "confirmbeforestart":'Une seule question proposée, continuer ?\n(non : Annuler, oui : OK)',
    'goodanswermusthave':"Il faut avoir indiqué la bonne réponse pour cela.",
    "importgroups":"Import des groupes effectué :"
  },
  "about" : {
    'text': `<p><img src="css/img/QCMCam-logo.png" title="QCMCam, scanner de QCM avec une webcam" alt="QCMCam logo" /> Logo, création et adaptations par <a href="mailto:sebastien.cogez@gmail.com">S. COGEZ</a> - collège OLIBO de St Cyprien.<br />
    Copyright 2019 licence <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a></p>
    <p>Ce logiciel est développé de manière expérimentale. Il y a eu de nombreuses modifications depuis sa première mise en ligne en juin 2017. La dernière importante a été réalisée le 20/08/2018 où les marqueurs de base (4x4) servant à voter ont été
      changés.
      Il faudra donc les imprimer à nouveau pour ceux qui auraient d'anciens jeux. Ce changement est du à des problèmes de faux positifs lors des votes en classe. J'espère ne plus avoir à revenir là-dessus à l'avenir.<br />
      Si vous voulez partager vos questionnaires via la bibliothèque, ou demander des améliorations du logiciel, merci de m'écrire.</p>
    <p><img src="css/img/32px/info.png" alt="Informations complémentaires" />La lecture des QRVote se fait à l'aide d'une webcam ou d'un dispositif type smartphone/tablette.<br />Un tuto est directement accessible en cliquant sur l'icone "souris".</p>
    <p><img src="css/img/32px/disk7.png" alt="Ingénierie de gestion des fichiers" /> <a href="QCMCam.zip">Télécharger l'appli</a> pour un usage local ou pour modifier ce que vous voulez.</p>
    <h4>R.G.P.D.</h4>
    <ul>
      <li>Aucune donnée n'est collectée sauf si vous me les envoyez par mail. Le seul cookie utilisé est celui nécessaire aux sessions avec un smartphone.</li>
      <li>La plupart des opérations se faisant localement, le chargement des fichiers de question ou de participants est immédiat.</li>
      <li>Vous pouvez copier/coller des images directement dans l'éditeur en ligne.</li>
      <li>Les fichiers utilisés étant des fichiers texte, il est très facile de se les échanger...</li>
      <li>Il est possible de charger un fichier de questions depuis le net en ajoutant ?url=lelienverslefichier.txt à la fin de l'adresse.</li>
      <li>Pensez de votre côté à déclarer vos fichiers nominatifs à votre DPD (Délégué à la Protection des Données) pour être en règle par rapport au RGPD.</li>
    </ul>
    <h4>Remerciements</h4>
    <ul>
      <li>à <b>Claire Savinas</b> pour l'adaptation du plugin MathJax pour CKeditor à Katex de laquelle je ne me sortais pas.</li>
      <li>à <b>Arnaud Durand</b> (des problèmes dudu) du site <a href="https://mathix.org/linux/">mathix.org</a> pour ses aides au développement, et la pub qu'il a faite pour le site</li>
      <li>à <b>Stéphane Guyon</b> pour ses <a href="https://twitter.com/mathsguyon/status/1052476020190838784">tweet</a> qui ont alerté Arnaud.</li>
      <li>A <b>ma femme</b> qui n'a pas de réseau dans son collège et voulait une alternative à Plickers.</li>
      <li>Aux collègues du cercle d'étude de ressources numériques pour les mathématiques de Montpellier qui ont participé à la bibliothèque.</li>
      <li>A Thierry Maréchal, enseignant de CM à Ambleteuse pour ses questionnaires pour les CM.</li>
      <li>...et à tous les utilisateurs qui me disent bonjour en passant.</li>
    </ul>
    <h4>Traduction</h4>
    <p>La traduction a été en grande partie réalisée à l'aide de <a href="deepl.com">Deepl translator</a>. Si vous voyez des erreurs, merci de me les signaler rapidement en fouillant dans le fichier de traduction vous correspondant :
      <ul>
        <li>Allemand <a href="js/lang/de.js">Fichier de.js</a></li>
        <li>Anglais <a href="js/lang/en.js">Fichier en.js</a></li>
        <li>Espagnol <a href="js/lang/es.js">Fichier es.js</a></li>
        <li>Français <a href="js/lang/fr.js">Fichier fr.js</a> ce fichier, comme l'un des autres peut vous permettre de vous lancer dans la traduction dans une autre langue.</li>
      </ul>
      Liens directs à mettre dans les marque page : <a href="index.html?lang=es">Espagnol</a> | <a href="index.html?lang=en">Anglais</a> | <a href="index.html?lang=de">Allemand</a> | <a href="index.html?lang=fr">Français</a>
    </p>    <p><img src="css/img/32px/film.png" alt="Tutos en ligne" /> <a href="https://tube-numerique-educatif.apps.education.fr/w/p/1iP6p5WAzH9TWZF5DPX3YG" target="_blank" rel="noopener">Vidéos pour apprendre</a> à se servir de QCMCam</p>
    <p><img src="css/img/32px/trombone.png" alt="Fichiers à imprimer" /> Les marqueurs sont à distribuer aux participants selon le numéro indiqué dans l'application.
      Vous avez le choix entre :</p>
    <ul>
    <li><a href="ressources/QCMCam marqueurs 1_30 - A5 sur A4.pdf" target="_blank">marqueurs 1 à 30</a> 2 marqueurs par page A4.</li>
    <li><a href="ressources/QCMCam marqueurs 31_60 - A5 sur A4.pdf" target="_blank">marqueurs 31 à 60</a> 2 marqueurs par page A4.</li>
    <li><a href="ressources/QCMCam marqueurs 61_90 - A5 sur A4.pdf" target="_blank">marqueurs 61 à 90</a> 2 marqueurs par page A4.</li>
    <li><a href="ressources/QCMCam marqueurs 1_30 - A4.pdf" target="_blank">marqueurs 1 à 30</a> format A4.</li>
    <li><a href="ressources/QCMCam marqueurs 31_90 - A4.pdf" target="_blank">marqueurs 31 à 90</a> format A4.</li>
    <li><a href="ressources/planche 37 codes aruco 3x3.pdf" target="_blank">37 marqueurs codés sur 3 bits</a> format A5 (recommandés pour les caméras à faible résolution).</li>
      <li><a href="generateur/" target="_blank">Générateur de marqueur 4x4, pour les élèves qui perdraient le leur par exemple.</a></li>
    </ul>
    <p><img src="css/img/32px/options.png" alt="Changement de mode" /> Passer en <a href="#" onclick="changeCode(5);">mode 5 bits</a> ou passer en <a href="#" onclick="changeCode(4);">mode 4 bits</a> (config par défaut) ou en <a href="#" onclick="changeCode(3);">mode
        3 bits</a>.</p>
    <p>Editeur de texte en ligne : <a href="https://ckeditor.com/ckeditor-4/">CKEditor 4 inline</a> avec le <a href="https://github.com/claire-savinas/ckeditor-dev/tree/major/plugins/mathjax">plugin de formule KaTeX</a> adapté par Claire Savinas.</p>
    <p><img src="css/img/32px/design.png" alt="icones dessinées par Aleksandra Wolska" /> Icons by <a href="http://www.softicons.com/system-icons/human-o2-grunge-icons-by-aleksandra-wolska">Aleksandra Wolska</a> and by <a href="https://www.iconfinder.com/iconsets/Hand_Drawn_Web_Icon_Set">Pawel
        Kadysz</a>.</p>
    <p><img src="css/img/Ellipsis-2.6s-100px.gif" alt='chargement de la page' height="32" width="32" /> Logo de chargement de l'application : <a href="https://loading.io/spinner/ellipsis">Ellipsis by loadding.io</a></p>
    <p><img src="css/img/32px/photo.png" alt="Ingénierie reconnaissance" /> Reconnaissance des marqueurs avec <a href="https://github.com/jcmellado/js-aruco">JS Aruco</a> dérivé de <a href="https://www.uco.es/investiga/grupos/ava/node/26">Aruco</a>,
      un système opensource créé par des chercheurs espagnols, utilisant lui-même le logiciel <a href="https://opencv.org/">opencv</a>.</p>
    <p><img src="css/img/32px/disk7.png" alt="Ingénierie chargement et analyse des fichiers" /> <a href="http://danml.com/download.html">Librairie "download.js"</a> pour télécharger le fichier des questions.</p>
    <p><img src="css/img/32px/help.png" alt="Ingénierie de démonstration des boutons" /><a href="https://introjs.com">Librairie "intro.js"</a> pour guider l'usage du site.</p>`
  },
  "statsPanel":{
    "download":"Sauvegarder sur son ordinateur"
  }
};
