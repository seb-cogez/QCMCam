QCMCam.lang['en'] = {
  "generalPanel" : {
    'logo': "QCMCam, QCM scanner with a webcam",
    'startstop' : "Start/Stop the camera device",
    'smartphone' : 'Start scanning with a smartphone or tablet (use Firefox on the device)',
    'changecam' : 'Change camera (several cameras detected)',
    'stopsmartphone':'Stop scanning with the smartphone',
    'help' : 'How to get started?',
    'about' : 'About the website',
    'library' : 'Access to the QCMCam library',
    'group':'Group',
    'usersload' : 'Load participants from the computer',
    'userstoggleedit' : 'Edit the list of partcipants',
    'fullscreen' : 'Full screen (ALT+Z)',
    'usersempty' : 'Empty the list of participants',
    'usersadd' : 'Adding participants',
    'usersdelete' : 'Delete participants',
    'usersedit' : 'Edit names and numbers of the participants',
    'usersdownload': 'Download the participants on your computer',
    'userspaste' : 'Paste your list from your spreadsheet here',
    'pastehere' : 'Paste here',
    'groupsdownload' : 'Download the groups to your computer',
    'restoredefault' :'Restore default groups',
    'userssavelists' : 'Save the group list',
    'setFullHD' : 'Starts webcam in Full HD mode (if compatible)',
    'source': 'Source code on github'
  },
  "navigationPanel":{
    'firstquestion' : 'Go to the first question',
    'prevquestion' : 'Previous question',
    'nextquestion' : 'Next question (ALT+G)',
    'lastquestion' : 'Go to the last question',
    'startscan' : 'Scan the answers (ALT+C)',
    'correctanswer' : 'Answer ✅',
    'answerA' : 'answer A',
    'answerB' : 'answer B',
    'answerC' : 'answer C',
    'answerD' : 'answer D',
    'showstats' : 'See response stats (ALT+V)',
    'showcorrectanswer' : 'Displays the correct answer to the question (when recorded)',
    'tableofanswers' : 'General table of responses',
    'answersreset' : 'Reset the answers to zero'
  },
  "questions" :{
    'addquestion' : 'Add a question',
    'loadquestions' : 'Load questions from your computer',
    'togglequestionsptions' : 'More options - do not use if evaluations have been done',
    'hidequestion' : 'Hide the question',
    'loadlastquestions' : 'Reload the last questionnaire used',
    'insertbefore' : 'Insert before this question',
    'movetoleft' : 'Move question to the left',
    'movetoright' : 'Move question to the right',
    'deletequestion' : 'Delete question',
    'deleteallquestions' : 'Delete all questions',
    'downloadquestions' : 'Download questions to your computer',
    'thegoodanswer': 'Correct Answer',
    'noanswer': 'no answer',
    'defaultquestion': 'First question',
    'clickwhenready' : 'Click here when you\'re ready',
    'bottommessage': 'Click&drag to change size',
    'changetypechoice':"switch single response/multiple response",
    'timetoanswer':"Time to respond",
    'pasteurl':"or web address",
    'pastehere':"Paste here"
  },
  "startPanel":{
    'startdescription' : "the web'app to <b>probe</b> with a <b>webcam</b> or a smartphone",
    'licence':'<a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a> licence',
    'demo' : 'Demonstration',
    'titleinfo':"Everything you need to know about this app",
    'info' : 'Site Information on the website',
    'source':'Source code and community',
    'titleyoutube':"Go to the QCMcam.net's PeerTube channel",
    'youtube' : 'PeerTube channel',
    'titlemarkers':"Download markers to play with QCMCam",
    'markers' : 'A4 format markers',
    'titledocumentation':"Download documentation",
    'documentation' : 'PDF of Documentation',
    'titlegenerator':"Access the marker generator if you have lost yours",
    'generator' : 'Marker generator',
    'smartphone': 'Address for the smartphone',
    'noneedqrscan':'No need for a QRCode reader, scan from the page.',
    'raspberry':'Disk image for Raspberry Pi',
    'raspberry2': 'made by Johannes Holstein',
    'mailto':'Questions & requests'
  },
  "usersPanel":{
    'interrogatewrong' : 'Designate a participant who voted wrong',
    'interrogatetrue' : 'Designate a participant who voted fair',
    'interrogaterandom' : 'Designate a random participant',
    'deleteabsentees' : 'Delete users who have not responded',
    'toggleusersnames' : 'Hide/show the names',
    'userseditionmessage' : 'Click on the numbers or Names to change them. <br />Caution not to leave a <b>double number</b> when exiting the edit mode',
    'restoreDefaults' : 'You are about to restore the default groups. Do you confirm ?'
  },
  "messages" : {
    'cameralist':"List of detected cameras",
    'onedetectedcam' : '<b>A single camera</b> detected, click on <img src="css/img/32px/camera-web.png" onclick="camera.start();" /> to display the image.<br />Or click <img src="css/img/32px/camera-refresh.png" onclick="camera.detect();" /> after connecting another one.',
    'manycam' :'<b>Many cameras</b>detected, the 2nd is the one used by default, you can switch by clicking on <img src="css/img/32px/gnome-session-switch.png" /> once the image is displayed. You can also directly select the one you want to use: <br />',
    'nocamdetected':'<b>No camera</b> detected, you can restart the detection by clicking <img src="css/img/32px/camera-refresh.png" onclick="camera.detect();" /> after connecting one.<br>You can also use an external device by clicking on <img src="css/img/32px/phone.png" onclick="comm.loadSession();" />.',
    "deleteabsentees":"Do you want to delete the absent ones?",
    "nothingtoedit":"No item to edit",
    'twicenumber':"The number {} is used several times! change the value before continuing.",
    'nostudent':"No students in the group {}",
    'noclass':"No group to show",
    "empty":"You are about to delete the list of participants. Do you confirm ?",
    "adduser":"How many participants do you want to add?",
    'participant':"Participant",
    "groupmusthave":"You have to load a class before you can interview a student at random.",
    "nogroup":"No group to download.",
    "goodanswer":"Good answer",
    "groupneeded":"You must have imported a class and questions before starting the scan.",
    "connexionestablished":"Connexion established with the smartphone",
    "connexionfailed":"Server connexion failure",
    "deconnectionSmartphone":"Disconnected from the smartphone",
    "connexionclosed":"Connection closed",
    "confirmbeforestart":'Only one question proposed, continue ?\n(no: Cancel, yes: OK)',
    'goodanswermusthave':"You must have indicated the correct answer for this.",
    "importgroups":"group import done :"
  },
  "about" : {
    'text': `<p><img src="css/img/QCMCam-logo.png" title="QCMCam, QCM scanner with webcam" alt="QCMCam logo" /> Logo, creation and adaptations by <a href="mailto:sebastien.cogez@gmail.com">S. COGEZ</a> - OLIBO college in St Cyprien.<br />
    Copyright 2019 Sébastien COGEZ <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a> licence</p>
    <p>This software is developed in an experimental way. There have been many changes since it was first put online in June 2017. The last important one was carried out on 20/08/2018 when the basic markers (4x4) used to vote were
      changed.
      It will therefore be necessary to print them again for those who have old games. This change is due to problems of false positives in class voting. I hope I won't have to come back to this in the future. <br />
      If you want to share your questionnaires through the library, or request improvements to the software, please write to me.
    <p><img src="css/img/32px/info.png" alt="Additional information" />The QRVote is read using a webcam or a smartphone/tablet device. <br />A tuto is directly accessible by clicking on the "lifeline" icon. </p>
    <p><img src="css/img/32px/disk7.png" alt="File management engineering" /> <a href="QCMCam.zip">Download the app</a> for local use or to modify what you want.</p>
    <h4>R.G.P.P.D. </h4>
    <ul>
      <li>No data is collected unless you send them to me by email. The only cookie used is the one required for sessions with a smartphone.</li>
      <li>Since most operations are local, the loading of question or participant files is immediate.</li>
      <li>You can copy/paste images directly into the online editor. </li>
      <li>The files used being text files, it is very easy to exchange them...</li>
      <li>It is possible to load a question file from the net by adding ?url=thelienverslefiche.txt at the end of the address.</li>
      <li>For your part, remember to declare your personal files to your DPO (Data Protection Officer) in order to be in good standing with regard to the RGPD. </li>
    </ul>
    <h4>Acknowledgements</h4>
    <ul>
      <li>to <b>Claire Savinas</b> for the adaptation of the MathJax plugin for CKeditor to Katex from which I was not getting by. </li>
      <li>to <b>Arnaud Durand</b> (problems with the site) <a href="https://mathix.org/linux/">mathix.org</a> for his development aids, and the publicity he did for the site</li>
      <li>to <b>Stéphane Guyon</b> for his <a href="https://twitter.com/mathsguyon/status/1052476020190838784">tweet</a> who alerted Arnaud. </li>
      <li>A <b>my wife</b> who has no network in her college and wanted an alternative to Plickers. </li>
      <li>To colleagues in the study circle of digital resources for mathematics in Montpellier who participated in the library. </li>
      <li>A Thierry Maréchal, CM teacher at Ambleteuse for his questionnaires for the CM.</li>
      <li>...and to all users who say hello to me by the way. </li>
    </ul>
    <h4>Translation</h4>
    <p>The translation was largely done using <a href="https://www.deepl.com">Deeple Translator</a>. If you see any errors, please report them to me quickly by scanning the corresponding translation file:
      <ul>
        <li>German <a href="js/lang/de.js">File de.js</a></li>
        <li>English <a href="js/lang/en.js">File en.js</a></li>
        <li>Spanish <a href="js/lang/es.js">File es.js</a></li>
        <li>French <a href="js/lang/fr.js">File fr.js</a> this file, as one of the others can allow you to start translating into another language.</li>
      </ul>
      Direct links for bookmarks : <a href="index.html?lang=es">Spanish</a> | <a href="index.html?lang=en">English</a> | <a href="index.html?lang=de">German</a> | <a href="index.html?lang=fr">French</a>
    </p>
    <p><img src="css/img/32px/film.png" alt="Tutos online" /> <a href="https://tube-numerique-educatif.apps.education.fr/w/p/1iP6p5WAzH9TWZF5DPX3YG" target="_blank" rel="noopener">Videos to learn</a> how to use QCMCam</p>
    <p><img src="css/img/32px/trombone.png" alt="Files to print" /> The markers are to be distributed to participants according to the number indicated in the application.
      You can choose between: </p>
    <ul>
    <li><a href="resources/QCMCam marqueurs 1_30 - A5 sur A4.pdf" target="_blank">Markers from 1 to 30</a> 2 markers per page A4.</li>
    <li><a href="ressources/QCMCam marqueurs 31_60 - A5 sur A4.pdf" target="_blank">Markers 31 to 60</a> 2 markers per page A4.</li>
    <li><a href="ressources/QCMCam marqueurs 61_90 - A5 sur A4.pdf" target="_blank">Markers 61 to 90</a> 2 markers per page A4.</li>
    <li><a href="ressources/QCMCam marqueurs 1_30 - A4.pdf" target="_blank">Markers 1 to 30</a> A4 format.</li>
    <li><a href="ressources/QCMCam marqueurs 31_90 - A4.pdf" target="_blank">Markers 31 to 90</a> A4 format.</li>
      <li><a href="resources/plane 37 aruco codes 3x3.pdf" target="_blank">37 markers encoded on 3 bits</a> A5 format (recommended for low resolution cameras).</li>
      <li><a href="generator/" target="_blank">4x4 marker generator, for students who would lose theirs for example.</a></li>
    </ul>
    <p><img src="css/img/32px/options.png" alt="Mode change" /> Switch to <a href="#" onclick="changeCode(5);">5-bit mode</a> or switch to <a href="#" onclick="changeCode(4);">4-bit mode</a> (default configuration) or <a href="#" onclick="changeCode(3);">mode
        3 bits</a>.</p>
    <p>Online text editor: <a href="https://ckeditor.com/ckeditor-4/">CKEditor 4 inline</a> with the <a href="https://github.com/claire-savinas/ckeditor-dev/tree/major/plugins/mathjax">plugin of formula KaTeX</a> adapted by Claire Savinas.</p>
    <p><img src="css/img/32px/design.png" alt="icons drawn by Aleksandra Wolska" /> Icons by <a href="http://www.softicons.com/system-icons/human-o2-grunge-icons-by-aleksandra-wolska">Aleksandra Wolska</a> and by <a href="https://www.iconfinder.com/iconsets/Hand_Drawn_Web_Icon_Set">Pawel
        Kadysz</a>.</p>
    <p><img src="css/img/Ellipsis-2.6s-100px.gif" alt='page loading' height="32" width="32" /> Application loading logo : <a href="https://loading.io/spinner/ellipsis">Ellipsis by loadding.io</a></p>
    <p><img src="css/img/32px/photo.png" alt="Engineering recognition" /> Marker recognition with <a href="https://github.com/jcmellado/js-aruco">JS Aruco</a> derived from <a href="https://www.uco.es/investiga/grupos/ava/node/26">Aruco</a>,
      an opensource system created by Spanish researchers, using the software <a href="https://opencv.org/">opencv</a>.</p>
    <p><img src="css/img/32px/disk7.png" alt="Engineering, loading and analysis of files" /> <a href="http://danml.com/download.html">Library "download.js"</a> to download the question file.</p>
    <p><img src="css/img/32px/help.png" alt="Button demonstration engineering" /><a href="https://introjs.com">Library "intro.js"</a> to guide the use of the site.</p>`
  },
  "statsPanel":{
    "download":"Download to your computer"
  }
};
