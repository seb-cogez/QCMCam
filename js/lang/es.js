QCMCam.lang['es'] = {
  "generalPanel" : {
    'logo': "QCMCam, escáner de QCM con la webcam",
    'startstop' : "Activar/parar la camara",
    'smartphone' : 'Comenzar a escanear con un smartphone o una tableta (use Firefox en el dispositivo)',
    'changecam' : 'Cambiar cámara (se detectan varias cámaras)',
    'stopsmartphone':'Dejar de escanear con el smartphone',
    'help' : '¿Cómo empezar?',
    'about' : 'Sobre el sitio web',
    'library' : 'Acceder a la biblioteca de QCMCam',
    'group':'Grupo',
    'usersload' : 'Cargar participantes desde el ordenador',
    'userstoggleedit' : 'Editar la lista de participantes.',
    'fullscreen' : 'Pantalla completa (ALT+Z)',
    'usersempty' : 'Vaciar la lista de participantes.',
    'usersadd' : 'Añadir participantes',
    'usersdelete' : 'Eliminar participantes',
    'usersedit' : 'Editar los nombres y números de los participantes.',
    'usersdownload': 'Descarguar los participantes mostrados en el ordenador',
    'userspaste' : 'Pegar sus listas de la hoja de cálculo aquí',
    'pastehere' : 'Pegar aquí',
    'groupsdownload' : 'Descargar los grupos a su ordenador',
    'restoredefault' :'Restaurar grupos predeterminados',
    'userssavelists' : 'Grabar la lista de grupos',
    'setFullHD' : 'Activar la cámara web en modo Full HD (si es compatible)',
    'source': 'Codigo en github'
  },
  "navigationPanel":{
    'firstquestion' : 'Ir a la primera pregunta',
    'prevquestion' : 'Pregunta anterior',
    'nextquestion' : 'Siguiente pregunta (ALT+G)',
    'lastquestion' : 'Ir a la última pregunta',
    'startscan' : 'Escanear las respuestas (ALT+C)',
    'correctanswer' : 'Respuesta ✅',
    'answerA' : 'respuesta A',
    'answerB' : 'respuesta B',
    'answerC' : 'respuesta C',
    'answerD' : 'respuesta D',
    'showstats' : 'Ver estadísticas de respuesta (ALT+V)',
    'showcorrectanswer' : 'Muestra la respuesta correcta a la pregunta (después de guardarla)',
    'tableofanswers' : 'Tabla general de respuestas',
    'answersreset' : 'Reiniciar las respuestas'
  },
  "questions" :{
    'addquestion' : 'Añadir una pregunta',
    'loadquestions' : 'Cargar preguntas desde su ordenador',
    'togglequestionsptions' : 'Más opciones - no utilizar si se han realizado evaluaciones',
    'hidequestion' : 'Ocultar la pregunta',
    'loadlastquestions' : 'Recargar el último cuestionario utilizado',
    'insertbefore' : 'Insertar antes de esta pregunta',
    'movetoleft' : 'Mover la pregunta a la izquierda',
    'movetoright' : 'Mover la pregunta a la derecha',
    'deletequestion' : 'Eliminar pregunta',
    'deleteallquestions' : 'Eliminar todas las preguntas',
    'downloadquestions' : 'Descargar preguntas a su computadora',
    'thegoodanswer': 'Respuesta correcta',
    'noanswer': 'sin respuesta',
    'defaultquestion': 'Primera pregunta',
    'clickwhenready' : 'Haga clic aquí cuando esté listo',
    'bottommessage': 'Haga clic y arrastre para cambiar el tamaño',
    'changetypechoice':"Invertir respuesta única/respuesta múltiple",
    'timetoanswer':"Tiempo para responder",
    'pasteurl':"o dirección web",
    'pastehere':"Pegar aquí"
  },
  "startPanel":{
    'startdescription' : "la aplicación web para <b>sondear</b> con una <b>cámara web</b> o un smartphone",
    'licence':'licencia <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a>',
    'demo' : 'Demostración',
    'titleinfo':"Todo lo que necesita saber sobre esta aplicación",
    'info' : 'Información sobre el sitio',
    'source':'Código fuente y comunidad',
    'titleyoutube':"Ir al canal PeerTube de QCMcam.net",
    'youtube' : 'canal de PeerTube',
    'titlemarkers':"Descargar marcadores para jugar con QCMCam",
    'markers' : 'Marcadores de formato A4',
    'titledocumentation':"Descargar la documentación",
    'documentation' : 'PDF de la Documentación',
    'titlegenerator':"Acceda al generador de marcadores si ha perdido el suyo",
    'generator' : 'Generador de marcadores',
    'smartphone': 'Dirección para el smartphone',
    'noneedqrscan':'No se necesita lector de QRCode, escanee desde la página.',
    'raspberry':'Imagen de disco para el Raspberry Pi',
    'raspberry2': 'hecha por Johannes Holstein',
    'mailto':'Preguntas o comentarios'
},
  "usersPanel":{
    'interrogatewrong' : 'Designar a un participante que ha contestado mal',
    'interrogatetrue' : 'Designar a un participante que ha contestado correctamente',
    'interrogaterandom' : 'Designar a un participante al azar',
    'deleteabsentees' : 'Eliminar usuarios que no han respondido',
    'toggleusersnames' : 'Ocultar/mostrar nombres',
    'userseditionmessage' : 'Haga clic en los números o Nombres para cambiarlos. <br />Cuidado con no dejar un <b>doble número</b> al salir del modo de edición.',
    'restoreDefaults' : 'Está a punto de restaurar los grupos predeterminados. ¿ Lo confirmas ?'
  },
  "messages" : {
    'cameralist':"lista de cámaras detectadas",
    'onedetectedcam' : '<b>Una sola cámara</b> detectada, haga clic en <img src="css/img/32px/camera-web.png" onclick="camera.start();" /> para mostrar la imagen. <br />O click <img src="css/img/32px/camera-refresh.png" onclick="camera.detect();" /> después de conectar otra.',
    'manycam' :'<b>Varias cámaras</b> detectadas, la 2ª es la que se utiliza por defecto, puede cambiar haciendo clic en <img src="css/img/32px/gnome-session-switch.png" /> una vez que la imagen se muestre. También puede seleccionar directamente el que desee utilizar: <br />',
    'nocamdetected':'<b>No hay cámara </b>detectado, puede reiniciar la detección haciendo clic en <img src="css/img/32px/camera-refresh.png" onclick="camera.detect();" /> después de conectar una.<br>También puede usar un dispositivo externo haciendo clic en <img src="css/img/32px/phone.png" onclick="comm.loadSession();" />.',
    "deleteabsentees":"¿Quieres eliminar los ausentes?",
    "nothingtoedit":"No hay elemento a editar.",
    'twicenumber':"El número {} se utiliza varias veces! cambie el valor antes de continuar.",
    'nostudent':"No hay estudiantes en el grupo {}",
    'noclass':"Ningún grupo a mostrar",
    "empty":"Está a punto de borrar la lista de participantes. ¿Lo confirmas?",
    "adduser":"¿Cuántos participantes desea agregar?",
    'participant':"Participante",
    "groupmusthave":"Tienes que cargar una clase antes de \npoder entrevistar a un estudiante al azar.",
    "nogroup":"No hay grupo para descargar.",
    "goodanswer":"Respuesta correcta",
    "groupneeded":"Debe haber importado una clase y preguntas antes de iniciar el escaneo.",
    "connexionestablished":"Conexión establecida con el dispositivo.",
    "connexionfailed":"Fallo en la conexión al servidor",
    "deconnectionSmartphone":"Desconectado del smartphone",
    "connexionclosed":"conexión cerrada",
    "confirmbeforestart":'Sólo se propone una pregunta, ¿ continuar ?\n(no : Cancelar, sí : OK)',
    'goodanswermusthave':"Debe haber indicado la respuesta correcta para esto.",
    "importgroups":"importación de grupos realizada : "
  },
  "about" : {
    'text': `<p><img src="css/img/QCMCam-logo.png" title="QCMCam, escáner QCM con webcam" alt="QCMCam logo" /> Logo, creación y adaptaciones por <a href="mailto:sebastien.cogez@gmail.com">S. COGEZ</a> - Colegio OLIBO en St Cyprien.<br />
    Copyright 2019 Sébastien COGEZ licencia <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a></p>
    <p>Este software se desarrolla de forma experimental. Ha habido muchos cambios desde que se puso en línea por primera vez en junio de 2017. La última importante se realizó el 20/08/2018 cuando los marcadores básicos (4x4) utilizados para votar fueron
      cambiados.
      Por lo tanto, será necesario imprimirlos de nuevo para aquellos que tengan juegos antiguos. Este cambio se debe a problemas de falsos positivos en la votación en clase. Espero no tener que volver sobre esto en el futuro. <br />
      Si desea compartir sus cuestionarios a través de la biblioteca, o solicitar mejoras al software, por favor escríbame.</p>
    <p><img src="css/img/32px/info.png" alt="Información adicional" />El QRVote se lee usando una webcam o un smartphone/tablet. <br />Un tuto es directamente accesible haciendo clic en el icono de "vía de escape". </p>
    <p><img src="css/img/32px/disk7.png" alt="File management engineering" /> <a href="QCMCam.zip">Descargar la aplicación </a> para uso local o para modificar lo que quieras.</p>
    <h4>R.G.P.P.P.D. </h4>
    <ul>
      <li>No se recoge ningún dato a menos que me lo envíe por correo electrónico. La única cookie utilizada es la que se requiere para las sesiones con un smartphone.</li>
      <li>Dado que la mayoría de las operaciones son locales, la carga de los archivos de preguntas o participantes es inmediata.</li>
      <li>Puede copiar/pegar imágenes directamente en el editor en línea.</li>
      <li>Los archivos usados son archivos de texto, es muy fácil intercambiarlos...</li>
      <li>Es posible cargar un archivo de pregunta desde la red añadiendo ?url=thelienverslefiche.txt al final de la dirección.</li>
      <li>Por su parte, recuerde declarar sus archivos personales a su RPD (responsable de la protección de datos) con el fin de estar en regla con respecto a la RGPD.</li>
    </ul>
    <h4>Agradecimientos </h4>
    <ul>
      <li>a <b>Claire Savinas</b> para la adaptación del plugin de MathJax para CKeditor a Katex del que no me las arreglaba. </li>
      <li>a <b>Arnaud Durand</b> (problemas con el sitio) <a href="https://mathix.org/linux/">mathix.org</a> para sus ayudas al desarrollo, y la publicidad que hizo para el sitio </li>
      <li>a <b>Stéphane Guyon</b> por su <a href="https://twitter.com/mathsguyon/status/1052476020190838784">tweet</a> quien alertó a Arnaud. </li>
      <li>a <b>mi esposa </b> que no tiene red en su universidad y quería una alternativa a Plickers. </li>
      <li>a los colegas del círculo de estudio de recursos digitales para matemáticas en Montpellier que participaron en la biblioteca.</li>
      <li>Thierry Maréchal, profesor de CM en Ambleteuse por sus cuestionarios para el CM.</li>
      <li>...y a todos los usuarios que me saludan por cierto.</li>
    </ul>
    <h4>Traducción</h4>
    <p>La traducción se realizó en gran medida utilizando <a href="https://www.deepl.com">Deeple Translator</a>. Si ve algún error, por favor infórmeme rápidamente escaneando el archivo de traducción correspondiente:
      <ul>
        <li>Alemán <a href="js/lang/de.js">Archivo de.js</a></li>
        <li>Inglés <a href="js/lang/es.js">Archivo en.js</a></li>
        <li>Español <a href="js/lang/es.js">Archivo es.js</a></li>
        <li>Francés <a href="js/lang/fr.js">Archivo fr.js</a> este archivo, ya que uno de los otros puede permitirle empezar a traducir a otro idioma.</li>
      </ul>
      Enlaces directos para favoritos : <a href="index.html?lang=es">Castellano</a> | <a href="index.html?lang=en">Inglés</a> | <a href="index.html?lang=de">Alemán</a> | <a href="index.html?lang=fr">Francés</a>
    <p> <p><img src="css/img/32px/film.png" alt="Tutos online" /> <a href="https://tube-numerique-educatif.apps.education.fr/w/p/1iP6p5WAzH9TWZF5DPX3YG" target="_blank" rel="no openener">Videos to learn</a> how to use QCMCam</p>
    <p><img src="css/img/32px/trombone.png" alt="Files to print" /> Los marcadores se distribuirán a los participantes según el número indicado en la solicitud.
      Puede elegir entre: </p>
    <ul>
    <li><a href="resources/QCMCam marqueurs 1_30 - A5 sur A4.pdf" target="_blank">marcadores del 1 al 30</a> 2 marcadores por página A4.</li>
    <li><a href="ressources/QCMCam marqueurs 31_60 - A5 sur A4.pdf" target="_blank">marcadores 31 al 60</a> 2 marcadores por página A4.</li>
    <li><a href="ressources/QCMCam marqueurs 61_90 - A5 sur A4.pdf" target="_blank">marcadores 61 al 90</a> 2 marcadores por página A4.</li>
    <li><a href="ressources/QCMCam marqueurs 1_30 - A4.pdf" target="_blank">marcadores 1 al 30</a> formato A4.</li>
    <li><a href="ressources/QCMCam marqueurs 31_90 - A4.pdf" target="_blank">marcadores al to 90</a> formato A4.</li>
      <li><a href="resources/plane 37 aruco codes 3x3.pdf" target="_blank">37 marcadores codificados en formato 3 bits</a> A5 (recomendado para cámaras de baja resolución).</li>
      </li><a href="generador/" target="_blank">4x4 marcador generador</a>, para los estudiantes que perderían el suyo por ejemplo.</li>
    </ul>
    <p><img src="css/img/32px/options.png" alt="Cambio de modo" /> Cambiar a <a href="#" onclick="changeCode(5);">5-bit mode</a> o cambiar a <a href="#" onclick="changeCode(4);">4-bit mode</a> (configuración por defecto) o <a href="#" onclick="changeCode(3);">mode
        3 bits </a>.</p>
    <p>Editor de texto en línea: <a href="https://ckeditor.com/ckeditor-4/">CKEditor 4 inline</a> con el <a href="https://github.com/claire-savinas/ckeditor-dev/tree/major/plugins/mathjax">plugin de fórmula KaTeX</a> adaptado por Claire Savinas.</p>
    <p><img src="css/img/32px/design.png" alt="iconos dibujados por Aleksandra Wolska" /> iconos de <a href="http://www.softicons.com/system-icons/human-o2-grunge-icons-by-aleksandra-wolska">Aleksandra Wolska</a> y por <a href="https://www.iconfinder.com/iconsets/Hand_Drawn_Web_Icon_Set">Pawel
        Kadysz </a>.</p>
    <p><img src="css/img/Ellipsis-2.6s-100px.gif" alt='page loading' height="32" width="32" /> Logotipo de carga de la aplicación <a href="https://loading.io/spinner/ellipsis">Ellipsis by loadding.io</a></p>
    <p><img src="css/img/32px/photo.png" alt="Reconocimiento de ingeniería" /> Reconocimiento de marcadores con <a href="https://github.com/jcmellado/js-aruco">JS Aruco</a> derivado de <a href="https://www.uco.es/investiga/grupos/ava/node/26">Aruco</a>,
      un sistema de código abierto creado por investigadores españoles, utilizando el software <a href="https://opencv.org/">opencv</a>.</p>
    <p><img src="css/img/32px/disk7.png" alt="Ingeniería, carga y análisis de archivos" /> <a href="http://danml.com/download.html">Biblioteca "download.js"</a> para descargar el archivo de preguntas.</p>
    <p><img src="css/img/32px/help.png" alt="Button demonstration engineering" /><a href="https://introjs.com">Biblioteca "intro.js"</a> para guiar el uso del sitio.</p>`
  },
  "statsPanel":{
    "download":"Descarga en tu ordenador"
  }
};
