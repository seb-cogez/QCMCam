/*
 * QCMCamLibrary
 * Moteur javascript de QCMCam
 * By Sebastien COGEZ 2018,2019
 */
"use strict";
CKEDITOR.disableAutoInline = true;
var lang = navigator.language || navigator.userLanguage;
lang = lang.substring(0, 2);
var reponses = {
    0: "C",
    1: "D",
    2: "A",
    3: "B"
};
var //qlarge = 500,
    nbQ = 1,
    editor, detector, liendirect;
/*var selectedSourceResolution = -1;
var webcamResolutions = [[480, 360], [640, 360], [640, 480], [704, 480], [720, 480], [800, 480], [800, 600], [960, 720], [1024, 768], [1280, 720], [1280, 800], [1280, 960], [1280, 1024], [1600, 1200], [1920, 1080]];
*/
var myWindow, reponseAction, wait = {
    nexted: false,
    updateClasse: false,
    addQuestion: false
};
var usersChangeDetected = false,
    reponsesChangeDetected = false,
    changeQuestionFocus = false,
    changeNombreQuestions = false; // pour tracer le changement de la liste des utilisateurs pendant la session avec un portable/tablette
var stopSessionRequest = false; // variable pour indiquer la demande d'arrêt de la session avec le smartphone
var stylesheets = {};
var validrep = {}; // permet de valider une réponse donnée, pour tenter d'éviter les fausses détections assez nombreuses.
// datas : données de réponses des élèves de la question en cours
// qdatas : données des réponses du diaporama complet.
// qreponses : données contenant les bonnes réponses indiquées dans l'interface.
// reponseSimple : mode de réponse réponsesimple si true, réponse multiple si false
var datas = {},
    datasdemo = {},
    qdatas = {},
    qreponses = {},
    totaux = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0
    },
    scan = false,
    namesvisible = true,
    reponseSimple = true;
// correspondances des codes aruco avec les id de l'application, tout en prévenant les symétries d'image
// deux jeux de codes sont disponibles, ceux codés sur 5 bits, et ceux codés sur 4 bits (plus visibles).
var correspondances = {
    'p5': {
        743: 1,
        878: 1,
        366: 2,
        741: 2,
        735: 3,
        990: 3,
        734: 4,
        478: 5,
        733: 5,
        727: 6,
        862: 6,
        350: 7,
        725: 7,
        719: 8,
        974: 8,
        590: 9,
        710: 9,
        314: 10,
        689: 10,
        246: 11,
        636: 11,
        635: 12,
        950: 12,
        438: 13,
        633: 13,
        374: 14,
        629: 14,
        118: 15,
        628: 15,
        627: 16,
        822: 16,
        486: 17,
        621: 17,
        619: 18,
        934: 18,
        422: 19,
        617: 19,
        358: 20,
        613: 20,
        607: 21,
        982: 21,
        406: 22,
        601: 22,
        595: 23,
        790: 23,
        454: 24,
        589: 24,
        583: 25,
        838: 25,
        326: 26,
        581: 26,
        498: 27,
        573: 27,
        434: 28,
        569: 28,
        370: 29,
        565: 29,
        443: 30,
        978: 30,
        466: 31,
        541: 31,
        535: 32,
        850: 32,
        509: 33,
        507: 34,
        957: 34,
        189: 35,
        504: 35,
        445: 36,
        505: 36,
        502: 37,
        637: 37,
        381: 38,
        501: 38,
        495: 39,
        1005: 39,
        494: 40,
        749: 40,
        491: 41,
        941: 41,
        237: 42,
        492: 42,
        487: 43,
        877: 43,
        365: 44,
        485: 44,
        150: 45,
        600: 45
    },
    'p4': {
        106: 1,
        107: 2,
        110: 3,
        111: 4,
        122: 5,
        123: 6,
        126: 7,
        127: 8,
        142: 16,
        154: 9,
        155: 10,
        158: 11,
        159: 12,
        166: 13,
        167: 14,
        169: 15,
        170: 16,
        171: 17,
        173: 18,
        174: 19,
        175: 20,
        182: 21,
        183: 22,
        185: 23,
        186: 24,
        187: 25,
        189: 26,
        190: 27,
        191: 28,
        218: 29,
        219: 30,
        222: 31,
        223: 32,
        230: 33,
        231: 34,
        233: 35,
        234: 36,
        235: 37,
        237: 38,
        238: 39,
        239: 40,
        246: 41,
        247: 42,
        249: 43,
        250: 44,
        251: 45,
        254: 46,
        43: 47,
        46: 48,
        47: 49,
        58: 50,
        59: 51,
        62: 52,
        91: 53,
        94: 54,
        102: 55,
        103: 56,
        105: 57,
        109: 58,
        118: 59,
        121: 60,
        42: 61,
        63:62,
        90:63,
        95:64,
        119:65,
        125:66,
        138:67,
        139:68,
        217:69,
        143:70,
        150:71,
        151:72,
        153:73,
        157:74,
        162:75,
        163:76,
        165:77,
        168:78,
        172:79,
        178:80,
        179:81,
        181:82,
        184:83,
        188:84,
        202:85,
        203:86,
        206:87,
        207:88,
        214:89,
        215:90
    },
    'p3': {
        1: 1,
        2: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        10: 8,
        11: 9,
        13: 10,
        16: 11,
        17: 12,
        18: 13,
        19: 14,
        20: 15,
        21: 16,
        27: 17,
        28: 18,
        30: 19,
        32: 20,
        33: 21,
        34: 22,
        35: 23,
        36: 24,
        38: 25,
        39: 26,
        40: 27,
        42: 28,
        45: 29,
        49: 30,
        50: 31,
        52: 32,
        54: 33,
        55: 34,
        56: 35,
        57: 36,
        59: 37
    }
};
// Par défaut, on prend le jeu des codes 4x4;
// !!! variable utilisée dans aruco, ne pas la modifier sans modifier aruco.js ligne 51
var typeCode = 4;
var corres = correspondances["p" + typeCode];
var qexport = "";
// lancerDemo : met en route la démonstration du site
function lancerDemo() {
    var intro = introJs();
    intro.onbeforechange(function (targetElement) {
        var btnclick = ["btnadd", "btnkey", "btna", "btnb", "btng", "btnop"];
        var tb = ["A", "B", "C", "D"],
            alea;
        if (targetElement.id === "classes") {
            targetElement.value = "GP1";
            users.setGroup("GP1");
        } else if (targetElement.id === "goodAnswer") {
            alea = Math.floor(Math.random() * 4);
            targetElement.value = "C";
            answers.setGoodAnswer("C");
        } else if (btnclick.indexOf(targetElement.id) > -1) {
            targetElement.click();
            if (targetElement.id === "btna" && scan === true) {
                // on met des fausses réponses
                var i = 0;
                for (i = 1; i <= 30; i++) {
                    alea = Math.floor(Math.random() * 4);
                    datasdemo[i] = {
                        vote: tb[alea],
                        nbvotes: 1
                    };
                    datas = datasdemo;
                    answers.updateVotes();
                    answers.compteValeurs();
                    qdatas[QCMeditors.qFocusOn] = Object.assign({},datas);
                }
            }
        }
    });
    intro.onchange(function (tElem) {
        if (tElem.id === "questionsContener") {
            // creation d'un contenu faux
            setTimeout(function () {
                CKEDITOR.instances['editor' + QCMeditors.qFocusOn].setData("<h2>Combien font 8×7 ?</h2><p>A. 87</p><p>B. 54</p><p>C. 56</p><p>D. 63");
            }, 1000);
            // on met des fausses réponses à la première question
            for (let i = 1; i <= 30; i++) {
                let alea = Math.floor(Math.random() * 4);
                datasdemo[i] = {
                    vote: ["A", "B", "C", "D"][alea],
                    nbvotes: 1
                };
            }
            datas = Object.assign({},datasdemo);
            qreponses[QCMeditors.qFocusOn] = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
        }
        if (tElem.id === "btnadd") {
            setTimeout(function () {
                CKEDITOR.instances['editor' + QCMeditors.qFocusOn].setData("<h3>Quel est l&#39;inverse de <span class=\"math-tex\">\\dfrac37</span> ?</h3><p>A.&nbsp;<span class=\"math-tex\">-\\dfrac37</span></p><p>B.&nbsp;<span class=\"math-tex\">-\\dfrac73</span></p><p>C.&nbsp;<span class=\"math-tex\">\\dfrac73</span></p><p>D.&nbsp;<span class=\"math-tex\">\\dfrac{1}{\\dfrac73}</span></p>");
            }, 1500);
        }
    });
    intro.onafterchange(function (tElem) {
        if (tElem.id === "btnop") {
            document.getElementById('btng').click();
        }
    });
    intro.setOptions({
        "skipLabel": "stop",
        "doneLabel": "Compris",
        "nextLabel": " > ",
        "prevLabel": " < ",
        steps: [{
                intro: "Par où commencer ?"
            },
            {
                intro: "Distribuez les cartes réponses aléatoirement"
            },
            {
                element: "#classes",
                intro: "Chargez une classe factice de 30 participants"
            },
            {
                element: "#questionsContener",
                intro: "Editez rapidement la question"
            },
            {
                element: "#btnadd",
                intro: "Ajoutez éventuellement des questions"
            },
            {
                element: "#btnkey",
                intro: "Allumez la caméra"
            },
            {
                element: '#btna',
                intro: "Activez le scan des réponses et sondez les participants avec votre caméra"
            },
            {
                element: '#btna',
                intro: "Désactivez le scan des réponses."
            },
            {
                element: "#btnb",
                intro: "Affichez les statistiques des réponses"
            },
            {
                element: "#goodAnswer",
                intro: "Indiquez la bonne réponse"
            },
            {
                element: "#btnb",
                intro: "Montrez les réponses apportées par chacun. Et voilà !"
            },
            {
                intro: "Pour aller plus loin"
            },
            {
                element: "#btng",
                intro: "Utilisez ce boutons pour afficher plus d'options sur les questions"
            },
            {
                element: "#editionQuestions",
                intro: "insérez, déplacez les questions, supprimez, téléchargez vos questions, indiquez la bonne réponse..."
            },
            {
                element: "#btng",
                intro: "Cliquez à nouveau pour fermer."
            },
            {
                element: "#btnop",
                intro: "ou celui-ci pour les participants"
            },
            {
                element: "#editionParticipants",
                intro: "Videz, créez, supprimez, éditez, téléchargez les participants"
            },
            {
                element: "#btnop",
                intro: "Cliquez à nouveau pour fermer."
            },
            {
                element: "#btnstats",
                intro: "Cliquez pour voir les stats et les télécharger"
            },
            {
                intro: "Ya plus qu'à ... !"
            }
        ]
    });
    intro.start();
}
function createFakeScores(nb){
    let tb=["A","B","C","D"];
    nbQ = nb;
    qreponses = {};
    qdatas={};
    datas={};
    for(let j=0;j<nb;j++){
        for (let i = 1; i <= 30; i++) {
            let alea = Math.floor(Math.random() * 4);
            datasdemo[i] = {
                vote: tb[alea],
                nbvotes: 1
            };
        }
        if(j==0)datas = Object.assign({},datasdemo);
        else
            qdatas[j] = Object.assign({},datasdemo);
        qreponses[j] = tb[Math.floor(Math.random() * 4)];
    }
}
var QCMeditors = {
    fileJustLoaded:false,
    doRenderKatex:false,
    qFocusOn: 0,
    interval: null,
    animation: false,
    reload:[],
    checkboxes:{},
    times:[],
    editable:true,
    setEditable:function(yn){
        var elts = document.querySelectorAll('#animate .question');
        for(var i=0;i<elts.length;i++){
            elts[i].contentEditable = yn;
        }
    },
    setEditableTrue:function(){
        QCMeditors.setEditable(true);
    },
    unloadCKEDITOR:function(doKatexRender,reload){
        // si aucune instance de CKEDITOR n'existe, on arrête.
        if(utils.isEmpty(CKEDITOR.instances)) return false;
        if(doKatexRender === undefined)this.doRenderKatex = true;
        else this.doRenderKatex = doKatexRender;
        var name;
        var listequestions = [];
        for (name in CKEDITOR.instances) {
            if(reload!==undefined)
                 QCMeditors.reload.push(name);
            if(reload === undefined)
                listequestions.push(CKEDITOR.instances[name].getData());
            CKEDITOR.instances[name].destroy(true);
        }
        if(reload === undefined){
            // on recrée le DOM
            for(var i=0;i<listequestions.length;i++){
                document.getElementById('editor'+i).innerHTML = listequestions[i];
                utils.renderKatex('editor'+i);
            }
            QCMeditors.setEditable(false);
            //document.getElementById('animate').addEventListener('click', QCMeditors.loadCKEDITOR);
            QCMeditors.fileJustLoaded = true;
            utils.renderCode();
        }
        this.editable = false;
    },
    loadCKEDITOR:function(editor){
        if(QCMeditors.fileJustLoaded){
            //document.getElementById('animate').removeEventListener('click', QCMeditors.loadCKEDITOR);
            //document.getElementById('animate').removeEventListener('mouseover', QCMeditors.setEditableTrue);
            utils.revertKatex('animate');
            utils.revertHighlight('animate');
            QCMeditors.fileJustLoaded = false;
        }
        if(typeof editor === "string"){ // car click envoi un objet evt
            if(CKEDITOR.instances[editor]===undefined){
                CKEDITOR.inline(editor);
                CKEDITOR.instances[editor].on('instanceReady', function(){QCMeditors.updateCheckAnwers(editor);});
                CKEDITOR.instances[editor].on('instanceDestroyed',function(){QCMeditors.afterDestroy(editor);});
                CKEDITOR.instances[editor].on('change',function(){QCMeditors.updateCheckAnwers(editor);});
            }
        } else {
            var i;
            var editors = document.querySelectorAll('#animate > .question');
            for (i = 0; i < editors.length; i++) {
                if(CKEDITOR.instances['editor'+i]===undefined){
                    CKEDITOR.inline(editors[i]);
                    CKEDITOR.instances['editor'+i].on('instanceReady', function(){QCMeditors.updateCheckAnwers(this.name);});
                    CKEDITOR.instances['editor'+i].on('instanceDestroyed',function(){QCMeditors.afterDestroy(this.name);});
                    CKEDITOR.instances['editor'+i].on('change',function(){QCMeditors.updateCheckAnwers(this.name);});
                }
            }
        }
        QCMeditors.setEditable(true);
        this.editable = true;
    },
     /*
     * recrée les editeurs CKEDITOR avprès modification, insertion, etc.
     */
    reloadCKEDITOR: function () {
        //false permet de ne pas rendre le katex 2 fois.
        QCMeditors.unloadCKEDITOR(false,true);
        this.editable = true;
        setTimeout(QCMeditors.loadCKEDITOR,500);
    },
    afterDestroy:function(editor){
        if(this.doRenderKatex){
            utils.renderKatex(editor);
            QCMeditors.setEditable(false);
            this.editable = false;
        }
        if(this.reload.indexOf(editor)>-1){
            QCMeditors.loadCKEDITOR(editor);
            utils.removeElement(this.reload,editor);
        }
    },
    // met autant d'options check que de lignes dans la liste d'options.
    // @param (String) editorID : ID de l'éditeur concerné
    updateCheckAnwers:function(editorID){
        var childs = document.querySelectorAll("#"+editorID+" ol > li");
        var elt = document.getElementById('btnchck');
        var lettres=["A","B","C","D"],check="", type="";
        elt.innerHTML = "";
        for(var i=0;i<Math.min(4,childs.length);i++){// max 4 valeurs
            if(qreponses[QCMeditors.qFocusOn]!== undefined && qreponses[QCMeditors.qFocusOn].indexOf(lettres[i])>-1){
                check = ' checked="checked" ';
            } else check = "";
            if(reponseSimple) type = "radio";
            else type = "checkbox";
            elt.innerHTML += '<input type="'+type+'" name="reponse" value="'+lettres[i]+'" id="R'+lettres[i]+'" onclick="answers.setAnswer(this.value,this.type);"'+check+' />'+lettres[i];
            childs[i].removeEventListener('click',QCMeditors.checkAnswer);
            childs[i].addEventListener('click',QCMeditors.checkAnswer, true);
        }
    },
    // fonction appelée par event sur la ligne d'une réponse
    // @param (Object) evt : objet evenement déclenché
    checkAnswer:function(evt){
        if(evt.target.parentNode.nodeName.toLowerCase() != "ol" || evt.target.nodeName.toLowerCase() != 'li') return false;
        // check if floating image present
        let deltax=0,imgBox,objBox=evt.target.getBoundingClientRect(),elt=null,imgOutOL=true,first=true;
        let offset = objBox.left,
            sizeIndex = parseInt(window.getComputedStyle(evt.target, ':before').width);
        let imgs = document.querySelectorAll("#editor"+QCMeditors.qFocusOn+ " img");
        // prise de tête pour calculer l'emplacement du clic en cas de présence d'image flottante
        for (let i=0;i<imgs.length;i++){
            imgBox = imgs[i].getBoundingClientRect();
            if(imgBox.left<=offset && objBox.bottom>imgBox.top && imgBox.bottom>objBox.top){
                if(imgBox.width>deltax)
                    deltax += imgBox.width;
                elt = imgs[i].parentElement;
                for(let j=0;j<3;j++){
                    elt = elt.parentElement;
                    if(elt.nodeName.toLocaleLowerCase() === "li"){
                        deltax += first?offset:0;
                        first=false;
                        imgOutOL=false;
                        break;
                    }
                }
                if(imgOutOL)deltax+= first?sizeIndex:0;
                first=false;
            }
        }
        let lettres=["A","B","C","D"];
        let x = evt.clientX;
        // recherche d'un tableau avec un élément li
        let tableIsPresent = document.querySelector("#editor"+QCMeditors.qFocusOn+" table li");
        let value;
        // place du target dans son parent ol
        if(tableIsPresent === null){
            value = Array.prototype.indexOf.call(evt.target.parentNode.children,evt.target);
        } else {
        // place du target dans le tableau (si tableau)
        let cellsTable = document.querySelectorAll("#editor"+QCMeditors.qFocusOn+" table li");
            let i=0;
            for(let len=cellsTable.length;i<len;i++){
                if(cellsTable[i]===evt.target)
                    break;
            }
            value = i;
        }
        let checkboxradio = document.getElementById('R'+lettres[value]);
        if(x -30 - (deltax?deltax:offset) < 0){
            checkboxradio.click();
        }
    },
    /*
     * calcule et affecte la largeur du div comtenant les editeurs de question
     */
    setAnimationWidth: function () {
        this.setQuestionsWidth();
        this.updatenbQ();
        document.getElementById("animate").style.width = (nbQ * 100) + "%";
        document.getElementById("animate").style.marginLeft = (-QCMeditors.qFocusOn * 100) + "%";
    },
    /*
     * calcule le nombre de questions en fonction du nombre d'éditeurs
     */
    updatenbQ: function () {
        var elem = document.getElementById('animate');
        nbQ = elem.childElementCount;
    },
    /*
     * redonne les noms aux éditeurs après modification
     * @param (Integer) rang : le rand à partir duquel renomnner (en cas d'insertion)
     */
    renameEditors: function (rang) {
        // si rang est fourni, on renomme les editeurs en décalant de 1 de plus
        var e;
        if (rang !== undefined) {
            for (var i = nbQ - 1; i >= rang; i--) {
                e = document.getElementById("editor" + i);
                e.id = "editor" + (i + 1);
            }
        } else {
            var alldivs = document.querySelectorAll("#animate > div");
            for (var i = 0; i < alldivs.length; i++) {
                alldivs[i].id = "editor" + i;
            }
            this.reloadCKEDITOR();
        }
    },
    /*
     * addQ : ajoute une question dans l'interface
     * @returns {nothing}
     */
    addQ: function () {
        var elem = document.getElementById('animate');
        elem.innerHTML += '<div id="editor' + nbQ + '" contenteditable="true" class="question"><h3>Question ' + (nbQ + 1) + '&nbsp;:</h3> <ol><li>&nbsp;</li></ol></div>';
        this.setAnimationWidth();
        this.reloadCKEDITOR();
        this.myMove("last");
        qdatas[nbQ - 1] = {};
        if (comm.sessionId || comm.peerId !== false) {
            changeNombreQuestions = true;
        }
    },
    /*
     * prevQ : demande l'affichage de la question précédente
     * nextQ : demande l'affichage de la question suivante
     * firstQ : aller à la première question
     * lastQ : aller à la dernière question
     *
     */
    prevQ: function () {
        if (QCMeditors.qFocusOn === 0)
            return;
        this.myMove("r");
    },
    nextQ: function () {
        // vérifie si le cache est présent. Si oui, on l'enlève, sans passer à la question suivante.
        var cache = document.getElementById('cacheQuestions').className;
        if(cache !== "cache"){
            QCMeditors.toggleCacheQuestions();
            return;
        }
        if (QCMeditors.qFocusOn === nbQ - 1)
            return;
        this.myMove("l");
    },
    firstQ: function () {
        if (QCMeditors.qFocusOn === 0)
            return;
        this.myMove("first");
    },
    lastQ: function () {
        if (QCMeditors.qFocusOn === nbQ - 1) {
            return;
        }
        this.myMove("last");
    },
    /*
     * function supprQ
     * supprime la question affichée.
     * @returns {undefined}
     */
    supprQ: function () {
        var elem = document.getElementById("editor" + QCMeditors.qFocusOn);
        var i;
        for (i = QCMeditors.qFocusOn; i < nbQ; i++) {
            qreponses[i] = qreponses[i + 1];
        }
        if (qreponses[nbQ] !== undefined)
            delete qreponses[nbQ];
        elem.parentNode.removeChild(elem);
        this.setAnimationWidth();
        this.renameEditors();
        this.updateNav();
        if (comm.sessionId !== null || comm.peerId !== false) {
            changeNombreQuestions = true;
        }
    },
    /*
     * insère une question à l'ndroit affiché
     */
    insertQ: function () {
        // il faut changer l'id de chaque editeur qui suit celui qui va être inséré.
        this.renameEditors(QCMeditors.qFocusOn);
        var div = utils.htmlToElement('<div id="editor' + (QCMeditors.qFocusOn) + '" contenteditable="true" class="question"><h3>Question ' + (QCMeditors.qFocusOn + 1) + ':</h3> <ol><li>&nbsp;</li></ol></div>');
        var refNode = document.getElementById("editor" + (QCMeditors.qFocusOn + 1));
        for (var i = nbQ - 1; i >= QCMeditors.qFocusOn; i--) {
            qreponses[i + 1] = qreponses[i];
        }
        if (qreponses[QCMeditors.qFocusOn] !== undefined)
            delete qreponses[QCMeditors.qFocusOn];
        refNode.parentNode.insertBefore(div, refNode);
        this.setAnimationWidth();
        this.reloadCKEDITOR();
        this.updateNav();
        if (comm.sessionId !== null || comm.peerId !== false) {
            changeNombreQuestions = true;
        }
    },
    /*
     * function supprAllQ : supprime toutes les questions et remet les données enregistrées à 0.
     */
    supprAllQ: function () {
        var elem = document.getElementById("animate");
        elem.innerHTML = '<div id="editor0" contenteditable="true" class="question"><h3>Question 1 :</h3> <ol><li>&nbsp;</li></ol></div>';
        qdatas = {};
        qreponses = {};
        totaux = {
            "A": 0,
            "B": 0,
            "C": 0,
            "D": 0
        };
        nbQ = 1;
        QCMeditors.qFocusOn = 0;
        this.setAnimationWidth();
        this.updateNav();
        this.reloadCKEDITOR();
        answers.resetAll();
        if (comm.sessionId !== null || comm.peerId !== false) {
            changeNombreQuestions = true;
        }
    },
    /*
     * function moveQLeft
     * Déplace la question affichée avant la questions précédente
     */
    moveQLeft: function () {
        if (QCMeditors.qFocusOn === 0)
            return false;
        var rtemp = qreponses[QCMeditors.qFocusOn - 1];
        qreponses[QCMeditors.qFocusOn - 1] = qreponses[QCMeditors.qFocusOn];
        qreponses[QCMeditors.qFocusOn] = rtemp;
        var elem = document.getElementById("editor" + QCMeditors.qFocusOn);
        elem.parentNode.removeChild(elem);
        var refNode = document.getElementById("editor" + (QCMeditors.qFocusOn - 1));
        refNode.parentNode.insertBefore(elem, refNode);
        this.setAnimationWidth();
        this.renameEditors();
        this.updateNav();
    },
    /*
     * function moveQRight
     * Déplace la question affichée après la question suivante
     */
    moveQRight: function () {
        var rtemp, refNode;
        var elem = document.getElementById("editor" + QCMeditors.qFocusOn);
        if (QCMeditors.qFocusOn > nbQ - 1)
            return false;
        if (QCMeditors.qFocusOn < nbQ - 2) {
            rtemp = qreponses[QCMeditors.qFocusOn + 1];
            qreponses[QCMeditors.qFocusOn + 1] = qreponses[QCMeditors.qFocusOn];
            qreponses[QCMeditors.qFocusOn] = rtemp;
            elem.parentNode.removeChild(elem);
            refNode = document.getElementById("editor" + (QCMeditors.qFocusOn + 2));
            refNode.parentNode.insertBefore(elem, refNode);
        } else {
            rtemp = qreponses[QCMeditors.qFocusOn + 1];
            qreponses[QCMeditors.qFocusOn + 1] = qreponses[QCMeditors.qFocusOn];
            qreponses[QCMeditors.qFocusOn] = rtemp;
            refNode.parentNode.appendChild(elem);
        }
        this.setAnimationWidth();
        this.renameEditors();
        this.updateNav();
    },
    /*
     * function updateNav : met à jour les couleurs des boutons de navigation dans les questions
     * @returns {nothing}
     */
    updateNav: function () {
        this.updatenbQ();
        reponseSimple = true;
        if (nbQ > 1) {
            if (QCMeditors.qFocusOn > 0) {
                document.getElementById("buttonLeft").className = "";
                document.getElementById("buttonFirst").className = "";
            } else {
                document.getElementById("buttonLeft").className = "inactiv";
                document.getElementById("buttonFirst").className = "inactiv";
            }
            if (QCMeditors.qFocusOn < nbQ - 1) {
                document.getElementById("buttonRight").className = "";
                document.getElementById("buttonLast").className = "";
            } else {
                document.getElementById("buttonRight").className = "inactiv";
                document.getElementById("buttonLast").className = "inactiv";
            }
        }
        QCMeditors.updateCheckAnwers('editor'+QCMeditors.qFocusOn);
        // si la bonne réponse a été proposée, on indique qu'elle est connue
        // et on sélectionne les éléments input correspondant.
        var reponseset = qreponses[QCMeditors.qFocusOn];
        // on met à jour le temps enregistré
        var sablier = document.getElementById("sablier");
        if(QCMeditors.times[this.qFocusOn]){
            document.getElementById("temps").value = QCMeditors.times[this.qFocusOn];
            sablier.className = "";
        } else {
            document.getElementById("temps").value = "00:00";
            sablier.className = "cache";
        }
        if (reponseset !== undefined) {
            answers.showResponses(reponseset);
            // bouton radio
            if (typeof reponseset === "string") {
                // on affiche les boutons type radio
                QCMeditors.changeTypeChoice("radio");
                try{document.getElementById('R' + reponseset).checked = true;}catch(error){}
            } else if (Array.isArray(reponseset)) { // boutons checkbox
                reponseSimple = false;
                QCMeditors.changeTypeChoice("checkbox");
                // on met tous les checkbox à non check
                var elems = document.querySelectorAll("input[name='reponse']");
                for (var i = 0; i < elems.length; i++) {
                    elems[i].checked = false;
                }
                if (reponseset.length > 0) {
                    for (var i = 0; i < reponseset.length; i++) {
                        document.getElementById('R' + reponseset[i]).checked = true;
                    }
                } else {
                    elems[i-1].checked = true;
                }
            }
            if(document.getElementById("editionQuestions").className!="cache"){
                QCMeditors.addStyle(QCMeditors.qFocusOn);
            } else {
                if(utils.isEmpty(datas[QCMeditors.qFocusOn]))
                    QCMeditors.removeStyle(QCMeditors.qFocusOn);
            }
            document.getElementById('revealanswer').className = "";
            document.getElementById("goodAnswer").className = "cache";
        } else {
            QCMeditors.changeTypeChoice("radio");
            document.getElementById('revealanswer').className = "cache";
            document.getElementById("goodAnswer").className = "";
        }
        // on met à jour l'affichage du numéro de la question
        document.getElementById("numquestion").innerHTML = (QCMeditors.qFocusOn + 1) + "/" + nbQ;
        return reponseset;
    },
    /*
     * function myMove : fait glisser les questions vers la droite, la gauche ou vers la dernière
     * @param {String} direction : "l" pour gauche, "r" pour right, "last" pour aller à la dernière question
     * @returns {Boolean}
     */
    myMove: function (direction) {
        // on prévient les pb d'animation en cours
        if (QCMeditors.animation === true)
            return false;
        if (QCMeditors.qFocusOn === 0 && direction === "r")
            return false;
        camera.scanner(false);
        var elem = document.getElementById("animate");
        if (QCMeditors.qFocusOn === nbQ - 1 && direction === "l")
            return false;
        // on prévient que l'animation est en cours, pour empêcher d'appuyer à nouveau sur le bouton et pour cesser le tick
        QCMeditors.animation = true;
        //mLeft est le pourcentage prévu
        var mLeft = Number(elem.style.marginLeft.slice(0, -1));
        var espaceToGo = 100;
        if (direction === "last") {
            espaceToGo = 100 * (nbQ - QCMeditors.qFocusOn - 1);
        } else if (direction === "first") {
            espaceToGo = 100 * (QCMeditors.qFocusOn);
        }
        var pas = espaceToGo / 20;
        var pos = 0;
        utils.setChrono();
        // on stocke les datas de la question précédente
        qdatas[QCMeditors.qFocusOn] = datas;
        // on cache les datas
        datas =  {};
        // on change le numéro de la question en cours.
        if (direction === "l")
            QCMeditors.qFocusOn++;
        else if (direction === "r")
            QCMeditors.qFocusOn--;
        else if (direction === "last")
            QCMeditors.qFocusOn = nbQ - 1;
        else if (direction === "first")
            QCMeditors.qFocusOn = 0;
        answers.initAll();
        answers.updateVotes();

        QCMeditors.interval = setInterval(frame, 1);

        function frame() {
            if (pos >= espaceToGo) {
                // l'animation est terminée.
                clearInterval(QCMeditors.interval);
                QCMeditors.interval = null;
                QCMeditors.animation = false;
                // on relance la mise à jour de l'affichage de la caméra si elle est allumée
                if (camera.video !== false) {
                    camera.tick();
                }
                // s'il y a des datas enregistrés, on les affecte.
                if (qdatas[QCMeditors.qFocusOn] !== undefined)
                    datas = qdatas[QCMeditors.qFocusOn];
                // si la bonne réponse a été proposée, on l'affiche
                var reponseset = QCMeditors.updateNav();
                answers.updateVotes();
                answers.compteValeurs(reponseset);
                // on lance le scan si on vient de passer à la question et que la vidéo est en route
                if (camera.video !== false && direction === "l") {
                    // on met l'arrêt du scan en mode automatique.
                    camera.manualStopScan = false;
                    camera.scanner(true);
                }
                if (comm.sessionId !== null || comm.peerId !== false) {
                    changeQuestionFocus = true;
                }
            } else {
                pos = pos + pas;
                if (direction === "l" || direction === "last")
                    elem.style.marginLeft = (mLeft - pos) + '%';
                else
                    elem.style.marginLeft = (mLeft + pos) + '%';
            }
        }
    },
    /*
     * setQuestionsWidth : calcule la largeur du div des questions
     * @returns {Boolean}
     */
    setQuestionsWidth: function () {
        var divs = document.getElementsByClassName("question");
        if (divs.length > 0) {
            var percentLength = 1 / divs.length * 100;
            var i = 0;
            for (i = 0; i < divs.length; i++) {
                divs[i].style.width = percentLength + "%";
            }
        }
        return true;
    },
    /*
     * récupére les questions sous forme de fichier texte.
     */
    download: function (TF) {
        // on met à jour le temps de la question en cours
        utils.setChrono();
        //var content = document.getElementById("animate").innerHTML;
        var content = {};
        var nq = 0,
            nomfichier;
        var styleQuestions = document.getElementById("questions").style;
        if (styleQuestions.width !== "" || styleQuestions.height !== "") {
            content.size = {
                width: styleQuestions.width,
                height: styleQuestions.height
            };
        }
        for (var name in CKEDITOR.instances) {
            content[nq] = {
                question: CKEDITOR.instances[name].getData()
            };
            if (qreponses[nq] !== undefined)
                content[nq].reponse = qreponses[nq];
            if(QCMeditors.times[nq]){
                content[nq].time = QCMeditors.times[nq];
            }
            nq++;
        }
        content = JSON.stringify(content);
        if (utils.storageAvailable('localStorage') && TF=== undefined) {
            if (content.length < 2500000) {
                nomfichier = QCMeditors.saveToLocalStorage(content);
            }
        }
        var contentType = 'text/plain';
        var filename = (nomfichier !== undefined && nomfichier !== null && nomfichier !== "") ? nomfichier + ".txt" : "questions.txt";
        var blob = new Blob([content], {
            type: contentType
        });
        if(TF!== undefined)return blob;
        download(blob, filename, "text/plain");
    },
    /*
     * enregistre le questionnaire dans le stockage local du navigateur.
     * @param (String) content : Json stringified
     * @param (String) nomfichier : filename
     */
    saveToLocalStorage: function (content, nomfichier) {
        // stockage seulement si taille inférieur à 3Mo environ
        var lastcontent = {},
            filename;
        if (nomfichier !== undefined) {
            filename = nomfichier;
        }
        if (localStorage.lastQ !== undefined) {
            // calcul de la taille pour voir si ça rentre
            var tailleOK = (localStorage.lastQ + content).length < 2500000;
            lastcontent = JSON.parse(localStorage.lastQ);
            if (!tailleOK) {
                var tempmin = Infinity;
                for (var i in lastcontent) {
                    if (Number(i) < tempmin) tempmin = Number(i);
                    if (lastcontent[i].name === nomfichier) {
                        delete lastcontent[i];
                    }
                }
                delete lastcontent[tempmin];
            }
        }
        if (filename === undefined) {
            filename = window.prompt("Quel nom pour votre questionnaire ?\n(laisser vide ou Annuler pour ne pas garder en mémoire)");
        }
        if (filename !== null && filename !== "") {
            lastcontent[Date.now()] = {
                name: filename + ((nomfichier !== undefined) ? "" : ".txt"),
                content: content
            };
            localStorage.lastQ = JSON.stringify(lastcontent);
        }
        return filename;
    },
    /*
     * lit un fichier uploadé depuis le DD et remplace les questions
     */
    openFile: function (event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            // on cache le champ d'import
            utils.montrerPasteUrl(false);
            if (utils.storageAvailable('localStorage')) {
                if (reader.result.length < 2500000) {
                    // on stocke les données localement pour les retrouver à la prochaine ouverture de page à condition qu'il ne dépasse pas 3Mo environ
                    QCMeditors.saveToLocalStorage(reader.result, input.files[0].name);
                }
            }
            QCMeditors.replaceQuestions(reader.result);
        };
        reader.readAsText(input.files[0]);
    },
    /*
     * Insère le QCM présent dans le mémoire Local Storage si elle existe.
     */
    loadLastQCM: function () {
        if (localStorage.lastQ !== undefined && localStorage.lastQ !== "{}") {
            // on ouvre un div qui permet de choisir parmi les différents fichiers présents.
            var questionnaires = JSON.parse(localStorage.lastQ),
                cpt = 0,
                id;
            for (var i in questionnaires) {
                cpt++;
                id = i;
            }
            if (id < 10000) {
                // cas d'un vieux stockaque, on remet en forme et on renvoie
                var temp = localStorage.lastQ;
                delete localStorage.lastQ;
                QCMeditors.saveToLocalStorage(temp, "Ancien historique");
                QCMeditors.replaceQuestions(temp);
            } else if (cpt >= 1) {
                utils.class("lastcontents", "");
                var el = document.getElementById("lc-content");
                var chaine = "<ul>";
                for (var i in questionnaires) {
                    chaine += '<li><span onclick="QCMeditors.insertHistoricalQCM(' + i + ');">' + questionnaires[i].name + '</span> - <input type="image" src="css/img/process-stop.png" onclick="QCMeditors.deleteThisHistorique(' + i + ')"></li>';
                }
                chaine += "</ul>";
                el.innerHTML = chaine;
            }
        } else {
            utils.class("lastcontents", "cache");
            utils.class("btnrq", "cache");
        }
    },
    insertHistoricalQCM: function (id) {
        var quests = JSON.parse(localStorage.lastQ);
        QCMeditors.replaceQuestions(quests[id].content);
    },
    deleteThisHistorique: function (id) {
        var quests = JSON.parse(localStorage.lastQ);
        delete quests[id];
        localStorage.lastQ = JSON.stringify(quests);
        QCMeditors.loadLastQCM();
    },
    /*
     * Crée une feuille de style pour entourer la bonne réponse dans le questionnaire
     * @param (Integer) questionNumber : numéro de la question
     * @returns {undefined}
     */
    addStyle: function (questionNumber) {
        let liInOl = document.querySelectorAll("#editor"+questionNumber+".question > ol li");
        if(liInOl.length>0){
            liInOl.forEach(el=>{el.classList.remove("rondvert")});
        }
        let liInTable = document.querySelectorAll("#editor"+questionNumber+" table li");
        if(liInTable.length>0){
            liInTable.forEach(el=>{el.classList.remove("rondvert")});
        }
        if(qreponses[questionNumber] === undefined){
            //QCMeditors.removeStyle(questionNumber);
            return false;
        }
        var s = [],se=null;
        /*if (document.getElementById("stylesheet" + questionNumber) !== null) {
            se = document.getElementById("stylesheet" + questionNumber);
        }*/
        if (qreponses[questionNumber].indexOf("A") > -1)
            s.push(1);
        if (qreponses[questionNumber].indexOf("B") > -1)
            s.push(2);
        if (qreponses[questionNumber].indexOf("C") > -1)
            s.push(3);
        if (qreponses[questionNumber].indexOf("D") > -1)
            s.push(4);
        /*if (!s.length) {
            QCMeditors.removeStyle(questionNumber);
            return false;
        }*/
        //var sheet = document.createElement('style');
        //sheet.id = "stylesheet" + questionNumber;
        for (var i = 0; i < s.length; i++) {
            if(liInOl.length>0){
                liInOl[s[i]-1].classList.add("rondvert");
            }
            if(liInTable.length>0){
                liInTable[s[i]-1].classList.add("rondvert");
            }
        }
        /*
        if(stylesheets[questionNumber]){
            document.body.replaceChild(sheet,se);
        } else {
            document.body.appendChild(sheet);
        }
        stylesheets[questionNumber] = "sstylesheet" + questionNumber;*/
    },
    /*
     *  Enlève les feuilles de styles créées dynamiquement précédemment
     */
    removeStyle: function (questionNumber) {
        /*var sheet = document.getElementById("stylesheet" + questionNumber);
        if(!sheet) return false;
        var sheetParent = sheet.parentNode;
        sheetParent.removeChild(sheet);
        delete stylesheets[questionNumber];*/
        return true;
    },
    /*
     * télécharge un fichier distant dans QCMCam
     * nécessite une connexion internet
     */
    loadFile: function (url, TF) {
        let reader = new XMLHttpRequest();
        if(TF)// lecture depuis la bibliotheque
        {
            reader.open("GET", url, false);
            reader.onreadystatechange = function(){
                if(reader.readyState === 4){
                    if(reader.status === 200 || reader.status === 0){
                        try{
                            QCMeditors.replaceQuestions(reader.responseText);
                            if (myWindow !== undefined) { // on ferme la bibliothèque si elle est ouverte
                                myWindow.close();
                            }
                        }catch (err){
                            console.error(err);
                        }
                    }
                }
            }
            reader.send(null);
            return;
        } else {
            reader.onload = function () {
                // TODO : vérification du format
                try{
                    QCMeditors.replaceQuestions(reader.responseText);
                }catch(err){
                    console.error(err);
                }
            };
            reader.open("get", "phploader.php?url=" + encodeURIComponent(url), true);
            reader.send();
            if (myWindow !== undefined) { // on ferme la bibliothèque si elle est ouverte
                myWindow.close();
            }
        }
    },
    /*
     * remplace les questions par les données passées en paramètre
     * @param {type} json : chaine à parser de type {0:{"question":"html de la question", "reponse":"A"}}
     * @returns {undefined}
     */
    replaceQuestions: function (json) {
        QCMeditors.unloadCKEDITOR();
        utils.class('lastcontents', "cache");
        var questionsreponses = {},
            i;
        // ancienne version
        if (json.indexOf("|#|") > -1) {
            var qr = json.split("|json|");
            var qs = qr[0].split("|#|");
            if (qr[1] !== undefined)
                qr = JSON.parse(qr[1]);
            else {
                qr = {};
            }
            for (i = 0; i < qs.length; i++) {
                questionsreponses[i] = {
                    "question": qs[i],
                    "reponse": qr[i]
                };
            }
        } else {
            questionsreponses = JSON.parse(json);
        }
        var elem = document.getElementById("animate");
        qreponses = {};
        elem.innerHTML = "";
        nbQ = 0;
        QCMeditors.times = [];
        for (i in questionsreponses) {
            if(i === "size")continue;
            if(questionsreponses[i].time !== undefined) QCMeditors.times[i] = questionsreponses[i].time;
            nbQ++;
            if (questionsreponses[i].question !== "")
                elem.innerHTML += '<div id="editor' + i + '" contenteditable="false" class="question">' + questionsreponses[i].question + '</div>';
            if (questionsreponses[i].reponse !== undefined)
                qreponses[Number(i)] = questionsreponses[i].reponse;
        }
        // on cache les options d'édition qui peuvent contenir les réponses...
        //utils.class("editionQuestions", "cache");
        utils.closeEditionOptions();
        //this.reloadCKEDITOR();
        utils.renderKatex("animate");
        utils.renderCode();
        QCMeditors.qFocusOn = 0;
        this.setAnimationWidth();
        this.updateNav();
        // on réinitialise tous les éléments de réponses
        answers.resetAll();
        if (questionsreponses.size !== undefined) {
            var styleQuestions = document.getElementById("questions").style;
            styleQuestions.width = questionsreponses.size.width;
            styleQuestions.height = questionsreponses.size.height;
        }
        this.toggleCacheQuestions("show");
        QCMeditors.fileJustLoaded = true;
        //document.getElementById('animate').addEventListener('click', QCMeditors.loadCKEDITOR);
        //document.getElementById('animate').addEventListener('mouseover', QCMeditors.setEditableTrue);
        },
    /*
     * Montre ou cache le cache des questions
     */
    toggleCacheQuestions: function (state) {
        var cache = document.getElementById('cacheQuestions');
        let animate = document.getElementById("animate");
        // on récupère la taille du questionnaire pour lui donner sa taille
        var widthQ = document.getElementById('questions').offsetWidth;
        cache.style.width = widthQ + "px";
        if ((cache.className === "cache" && state === undefined) || state === "show") {
            cache.className = 'montre';
            animate.classList.add("blur");
        } else {
            cache.className = 'cache';
            animate.classList.remove("blur");
        }
    },
    /*
     * Changer le type de réponse simple / multiple
     */
    changeTypeChoice: function (what) {
        let btn = document.getElementById('btncc');
        let elems = document.querySelectorAll("input[name='reponse']");
        // si les input sont de type radio, on commute pour checkbox;
        // et si on demande spécifiquement un checkbox on affiche.
        if ((what === undefined && elems[0].type === "radio") || what === "checkbox") {
            reponseSimple = false;
            for (let i = 0; i < elems.length; i++) {
                elems[i].type = "checkbox";
            }
            if (what === undefined || qreponses[QCMeditors.qFocusOn] === undefined) {
                qreponses[QCMeditors.qFocusOn] = [];
                for (let i = 0; i < elems.length; i++) {
                    if (elems[i].checked && i < 4) qreponses[QCMeditors.qFocusOn].push(elems[i].value);
                }
            }
            btn.src = "css/img/32px/multiplechoice.png";
            document.getElementById("editor"+QCMeditors.qFocusOn).classList.add("multiple");
        } else {
            reponseSimple = true;
            document.getElementById('revealanswer').className = "cache";
            document.getElementById("goodAnswer").className = "";
            btn.src = "css/img/32px/onechoice.png";
            for (var i = 0; i < elems.length; i++) {
                elems[i].type = "radio";
                elems[i].checked = false;
            }
            elems[i-1].checked = true;
            if (what === undefined) {
                delete qreponses[QCMeditors.qFocusOn];
            }
            document.getElementById("editor"+QCMeditors.qFocusOn).classList.remove("multiple");
        }
    },
    setItemsiFrameDialog:function(dialog, evt){
        if(!dialog || !evt) return;
        var theiframe=null;
        var div = document.createElement("DIV");
        div.innerHTML = evt.clipboardData.getData('text/plain');
        if(theiframe = div.querySelector("iframe")){
            if(theiframe.src !== undefined)
                setTimeout(function(){dialog.setValueOf('info', 'src', theiframe.src);},50);
            if(theiframe.width !== undefined)
                dialog.setValueOf('info', 'width', theiframe.width);
            if(theiframe.height !== undefined)
                dialog.setValueOf('info', 'height', theiframe.height);
            if(theiframe.name !== undefined)
                dialog.setValueOf('info', 'name', theiframe.name);
        }
    },
    printQCM: function(){
        var content = {},nq=0;
        QCMeditors.loadCKEDITOR();
        // ouvre une fenêtre popup et copie le DOM des éléments sélectionnés.
        for (var name in CKEDITOR.instances) {
            content[nq] = {
                question: CKEDITOR.instances[name].getData()
            };
            if (qreponses[nq] !== undefined)
                content[nq].reponse = qreponses[nq];
            if(QCMeditors.times[nq]){
                content[nq].time = QCMeditors.times[nq];
            }
            nq++;
        }
        var fenetre = window.open("print.html", "QCMCam - impression");
        fenetre.onload = function(){
            fenetre.contenu = content;
            fenetre.AfficheReponses();
        }
      },
};

var utils = {
    intervaldecompte: null,
    startScanAfterAnime:false,
    animationMenustart:false,
    optionMenu:null,
    /*
    * Montre ou cache le champ de copie d'url
    */
    montrerPasteUrl: function(TF){
        var elt = document.getElementById('pasteUrl');
        var elt2 = document.getElementById('inputurl');
        if(TF){
            elt.className = "";
            elt2.focus();
            elt2.value="";
            elt2.addEventListener("paste", utils.urlVerify);
        } else {
            elt.className = "cache";
            elt2.removeEventListener("paste", utils.urlVerify);
        }
    },
    gotoGitHub(){
        window.location.href="https://github.com/seb-cogez/QCMCam";
    },
    /*
    * setterFullHD : hide or show FullHD option
    */
    setterFullHD:function(bool){
        if(bool){
            document.getElementById('setterFullHD').className = '';
        } else {
            document.getElementById('setterFullHD').className = 'cache';
        }
    },
    /*
    * 
    */
    affichageStyle:function(taille){
        document.getElementById('questionsContener').style.fontSize = taille+"em";
    },
    urlVerify : function(evt){
        utils.montrerPasteUrl(false);
        var url = evt.clipboardData.getData('text/plain');
        var regex = /^http/i;
        var regexDrive = /drive\.google\.com/;
        var regexDropbox = /dropbox.com/;
        if(regex.test(url)){
            if(regexDrive.test(url)){
                url = url.replace("/open?", "/uc?export=download&");
            }
            if(regexDropbox.test(url)){
                url = url.replace("dl=0","dl=1");
            }
            QCMeditors.loadFile(url);
        } else {
            alert(url+' n\'est pas une url valide');
        }
    },
    /*
     * Affiche ou cache les commandes supplémentaires pour gérer les questions/participants.
     * @param (DOMObject) appelant : element du dom pour modifier son style
     * @param (String) id : id du div à afficher
     * @returns {undefined}
     */
    toggleOptions: function (id) {
        var elem = document.getElementById(id);
        if (elem.className === "cache") {
            // on ajoute l'écouteur de copier/Coller
            if (id === "editionParticipants") {
                this.openParticipantsOptions();
            } else {
                this.openEditionOptions();
            }
        } else {
            // on affiche à nouveau le menu de navigation si les deux menus sont fermés.
            if (id === "editionParticipants") {
                this.closeParticipantsOptions();
            } else {
                this.closeEditionOptions();
            }
        }
    },
    openEditionOptions:function(){
        QCMeditors.toggleCacheQuestions(false);
        document.getElementById('commandeslive').className = "cache";
        QCMeditors.loadCKEDITOR();
        QCMeditors.addStyle(QCMeditors.qFocusOn);
        document.getElementById("btng").style.opacity = 0.5;
        document.getElementById("editionQuestions").className = "";
    },
    closeEditionOptions:function(){
        QCMeditors.unloadCKEDITOR(true);
        document.getElementById('commandeslive').className = "";
        QCMeditors.removeStyle(QCMeditors.qFocusOn);
        document.getElementById("btng").style.opacity = 1;
        document.getElementById("editionQuestions").className = "cache";
    },
    openParticipantsOptions:function(){
        document.getElementById("importliste").addEventListener("paste", users.pasteUsersImport);
        document.getElementById("navigation").className = "cache";
        document.getElementById("btnop").style.opacity = 0.5;
        document.getElementById("editionParticipants").className = "";
    },
    closeParticipantsOptions:function(){
        document.getElementById("importliste").removeEventListener("paste", users.pasteUsersImport);
        document.getElementById("navigation").className = "";
        users.edit(true);//on ferme l'édition des utilisateurs si ouvert
        users.setDeleteMode(true); // on enleve le mode de suppression
        document.getElementById("btnop").style.opacity = 1;
        document.getElementById("editionParticipants").className = "cache";
    },
    /*
     * transforme un texte html en objet du DOM
     * @param (String) html : html à transformer
     */
    htmlToElement: function (html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    },
    // isEmpty, teste si un objet est vide ou pas
    // @param (Object) obj : objet ou tableau à analyser
    // return true pour vide
    // return false sinon
    isEmpty: function (obj) {
        var x;
        for (x in obj) {
            return false;
        }
        return true;
    },
    /**
     * shuffle an array
     * @param {Array} arr 
     */
    shuffle : function(arr){
        if(!Array.isArray(arr))return false;
        arr.sort(()=>Math.random()-0.5);
        return arr;
    },
    /*
     * Supprime un élément d'un tableau
     */
    removeElement: function (array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    },
    /*
     * Compare deux tableau simples
     * @param (Array) a1 : premier tableau
     * @param (Array) a2 : deuxième tableau
     */
    compareArrays: function (a1, a2) {
        // s'ils n'ont pas la même longueur, il ne peuvent être égaux.
        if (a1.length !== a2.length)
            return false;
        // ils ont la même longueur, on suppose qu'ils sont égaux.
        for (var i = 0; i < a1.length; i++) {
            if (a2.indexOf(a1[i]) < 0) // l'un des éléments de a1 n'est pas dans a2 !!!
                return false;
        }
        return true;
    },
    // changeCode, change le type de marler utilisé.
    // @var num = 3, 4 ou 5
    changeCode: function (num) {
        if ([3, 4, 5].indexOf(num) >= 0) {
            typeCode = num;
            corres = correspondances["p" + num];
            alert("Mode " + num + " bits activé.");
            return true;
        } else
            return false;
    },
    // storageAvailable :  detect la disponibilité de stockage local des données
    // return true si storage local est fonctionnel
    storageAvailable: function (type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED');
        }
    },
    // function afficheAccueil, Affiche ou non les icones d'accueil
    // @truefalse : true, false
    afficheAccueil: function (truefalse) {
        if (truefalse === undefined) {
            truefalse = true;
        }
        if (utils.class("messageacceuil") === "cache" && truefalse) {
            utils.class("messageacceuil", "flex");
            utils.class("listeeleves", "cache");
            utils.class("boutonsuserslive", "cache");
        } else {
            utils.class("messageacceuil", "cache");
            utils.class("listeeleves", "");
            utils.class("boutonsuserslive", "");
        }
    },
    /*
     * pleinEcran : passe la page en plein écran.
     * @returns {undefined}
     */
    pleinEcran: function () {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    },
    animeMenuFin: function () {
        var elt1 = document.getElementById("commandesQuestions");
            elt1.removeEventListener('animationend', utils.animeMenuFin);
        if (!scan && utils.startScanAfterAnime) {
            scan = true;
            validrep = {};
            camera.canvas.style.opacity = '1';
            camera.interval = setInterval(answers.tests, 1000);
        } else if(!utils.startScanAfterAnime) {
            scan = false;
        }
        utils.animationMenustart = false;
        utils.optionMenu = null;
    },/*
    removeListener:function(){
        var elt1 = document.getElementById("commandesQuestions");
        utils.animeMenu(utils.optionMenu);
        elt1.removeEventListener('animationend', utils.removeListener);
    },*/
    /*
     * cache ou montre les menus
     * @param (Boolean) option : false => hide, true => show
     */
    animeMenu: function (option) {
        var elt1 = document.getElementById("commandesQuestions"),
            elt2 = document.getElementById('panneauHautDroite'),
            elt3 = document.getElementById('footersmartphone');
        if(utils.animationMenustart){ // animation en cours
            /*utils.optionMenu = option;
            elt1.addEventListener('animationend', utils.removeListener);
            return;*/
            if(utils.optionMenu !== option)
            utils.animeMenuFin();
        } else {
            utils.optionMenu = null;
        }
        var tous = [elt1, elt2];
        for (var i = 0; i < tous.length; i++) {
            if (option === "down"){
                tous[i].className = "animated slideInDown";
                elt3.className = "animated slideInUp";
                utils.startScanAfterAnime = false;
            }else{
                tous[i].className = "animated slideOutUp";
                elt3.className = "animated slideOutDown";
                utils.startScanAfterAnime = true;
            }
        }
        utils.animationMenustart = true;
        utils.optionMenu = option;
        elt1.addEventListener('animationend', utils.animeMenuFin);
    },
    /*
     *
     * @param {String} option : si "open" affiche la page "à propos"
     * @returns {nothing}
     */
    Infos: function (option) {
        if (option === "open") {
            document.getElementById("infos").className = "";
        } else {
            document.getElementById("infos").className = "cache";
        }
    },
    /*
     * Crée une sélection de l'élément passé en paramètre
     * @param (DomObject) elem : element à sélectionner
     */
    select: function (elem) {
        //Create a range (a range is a like the selection but invisible)
        var range = document.createRange();
        // Select the entire contents of the element
        range.selectNodeContents(elem);
        // Don't select, just positioning caret:
        // In front
        // range.collapse();
        // Behind:
        // range.collapse(false);

        // Get the selection object
        var selection = window.getSelection();
        // Remove any current selections
        selection.removeAllRanges();
        // Make the range you have just created the visible selection
        selection.addRange(range);
    },
    /*
     * Récupère les données fournies en paramètre GET dans l'url
     * @return : (Object) {nom:valeur}
     */
    getUrlVars: function () {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var len = hashes.length;
        for (var i = 0; i < len; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    /*
     * Lance la fonction qui enlève le cache
     */
    lancerReveal: function () {
        utils.intervaldecompte = setInterval(utils.reveal, 10);
    },
    /*
     * Cache le div blanc et le logo après 1s. pour simulter un chargement de page.
     * @returns {undefined}
     */
    reveal: function () {
        var decompte = Number(document.getElementById("intro").style.opacity);
        if (decompte <= 0.001) {
            document.getElementById("intro").style.display = "none";
            clearInterval(utils.intervaldecompte);
        } else {
            document.getElementById("intro").style.opacity = decompte - 0.01;
        }
    },
    /*
     * function sortTable : trie la table HTML selon le titre de la colonne cliqué
     * @param (Integer) : le numéro de la colonne à trier
     */
    sortTable: function (n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("tableau");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
         no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /* Loop through all table rows (except the
             first, which contains table headers): */
            for (i = 2; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                 one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                 based on the direction, asc or desc: */
                if (dir === "asc") {
                    if (this.isNumeric(x.innerHTML) && this.isNumeric(y.innerHTML)) {
                        if (Number(x.innerHTML) > Number(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (this.isNumeric(x.innerHTML) && this.isNumeric(y.innerHTML)) {
                        if (Number(x.innerHTML) < Number(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                 and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /* If no switching has been done AND the direction is "asc",
                 set the direction to "desc" and run the while loop again. */
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    },
    /*
     * Ouvre la fenêtre de bibliothèque
     * @returns {undefined}
     */
    openLibrary: function () {
        if (myWindow === undefined)
            myWindow = window.open("repository/index.html", "QCMCamLibrary", "menubar=no,status=no,toolbar=no,scrollbars=yes");
        else if (myWindow.closed) {
            myWindow = window.open("repository/index.html", "QCMCamLibrary", "menubar=no,status=no,toolbar=no,scrollbars=yes");
            myWindow.focus();
        } else {
            myWindow.focus();
        }
    },
    /*
     * ferme la fenêtre de la librairie, appelée par la fenêtre de librairie
     */
    closeLibrary: function () {
        if (myWindow !== undefined)
            myWindow.close();
    },
    isNumeric: function (value) {
        return /^-{0,1}\d+$/.test(value);
    },
    /*
     * set the class of an object
     * @param (String) id : id du DOMElement
     * @param (String) className : nom de la classe à donner, si omis, renvoie le nom
     * @return ; className if omitted
     */
    class: function (id, className) {
        if (className === undefined)
            return document.getElementById(id).className;
        else
            document.getElementById(id).className = className;
    },
    addScript: function (src, callback) {
        var s, r;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.onload = s.onreadystatechange = function () {
            //console.log( this.readyState ); //uncomment this line to see which ready states are called.
            if (!r && (!this.readyState || this.readyState === 'complete')) {
                r = true;
                callback();
            }
        };
        document.head.appendChild(s);
    },
    /*
     * render Katex
    */
    renderKatex: function(eltId) {
        var elTex = document.querySelectorAll("#"+eltId+" .math-tex"), Tex;
        for(var i=0;i<elTex.length;i++){
            if(elTex[i].querySelector("span.katex") !== null){
                Tex = utils.decodeHtmlEntity(elTex[i].querySelector("annotation").innerHTML.trim());
            }
            else Tex = utils.decodeHtmlEntity(elTex[i].innerHTML.trim());
            Tex = Tex.replace(/\\[\(\)]/g,"");
            try{
                katex.render(Tex, elTex[i],{
                    throwOnError: false,
                    errorColor: "#FFF"
                });
            } catch (err){
                elTex[i].innerHTML = err+" erreur de rendu avec "+Tex;
            }
        }
      },
    revertKatex:function(eltId){
        var elKtex = document.querySelectorAll("#"+eltId+" .math-tex"), Tex=null;
        for(var i = 0;i<elKtex.length;i++){
            Tex = utils.decodeHtmlEntity(elKtex[i].querySelector("annotation").innerHTML);
            elKtex[i].innerHTML = Tex;
            //elKtex[i].setAttribute("data-tex", Tex);
        }
    },
    renderCode:function(){
        document.querySelectorAll('pre code').forEach(function(block){
            block.dataset.code = block.innerHTML;
            hljs.highlightBlock(block);
          });
    },
    revertHighlight:function(eltId){
        var eltcode = document.querySelectorAll("#"+eltId+" pre code").forEach(function(block){
            block.innerHTML = block.dataset.code;
        });
    },
    decodeHtmlEntity : function(str) {
        str = str.replace(/\&amp;/g, "&");
        str = str.replace(/\&lt;/g, "<");
        return str.replace(/\&gt;/g, ">");
      },
    encodeHtmlEntity : function(str) {
    return buf.join('');
    },
    convertTimeToms:function(nb){
        if(typeof nb === "number" && nb>1000){
            nb = nb*1e-3;
            var minutes = Math.floor(nb/60);
            var secondes = nb%60;
            nb = ((minutes>=10)?minutes:"0"+minutes)+":"+ ((secondes>=10)?secondes:"0"+secondes);
            return nb;
        } else if(typeof nb === "string" && nb.indexOf(":")>-1){
            nb = Math.round(Number(nb.substring(0,nb.indexOf(":")))*60000+Number(nb.substring(nb.indexOf(":")+1))*1000);
            return nb;
        } else return false;
    },
    /*
    * Récupère le temps du champ de la question en cours.
    */
    setChrono:function(){
        var temps = document.getElementById("temps").value;
        if(temps !== "" && temps !== "00:00" && temps !== "00:00:00"){
            QCMeditors.times[QCMeditors.qFocusOn] = temps;
        } else {
            delete QCMeditors.times[QCMeditors.qFocusOn];
        }
    },
    /*
    * Démarre le chronomètre si le temps est indiqué.
    */
    startChrono:function(){
        if(!QCMeditors.times[QCMeditors.qFocusOn])
            return false;
        document.getElementById("sablier").className = "";
        utils.now = Date.now();
        utils.endChrono = utils.now + utils.convertTimeToms(QCMeditors.times[QCMeditors.qFocusOn]);
        utils.duree = utils.endChrono - utils.now;
        let barre = document.getElementById("chronorect");
        barre.style.width = "100%";
        barre.style.backgroundColor = null;
        utils.intervalChrono = setInterval(utils.checkTime, 100);
    },
    /*
    * Vérifie le temps qui passe
    * Si la durée prévue du chrnono est dépassée, arrête
    */
    checkTime(){
        var now = Date.now();
        var barre = document.getElementById("chronorect");
        var decompte = document.getElementById("decompte");
        if(now > utils.endChrono){
            // on arrête le chrono et on arrête la camera;
            camera.scanner(false);
            utils.intervalChrono = null;
            barre.style.backgroundColor = null;
            barre.style.width = 0;
            decompte.innerHTML = "00:00";
        } else {
            if(utils.endChrono - now > 9825 && utils.endChrono - now < 10075){
                barre.style.backgroundColor = "red";
            }
            decompte.innerHTML = utils.convertTimeToms(Math.ceil((utils.endChrono - now)*1e-3)*1e3);
            barre.style.width = Math.ceil((utils.endChrono-now)/utils.duree*10000)*1e-2+"%";
        }
    },
    /*
    * Affiche le sablier en fonction de la valeur
    * @param (String) value : valeur du champ temps
    */
    showSablier:function(value){
        var elt = document.getElementById("sablier");
        if(value === "" || !utils.convertTimeToms(value)){
            elt.className = "cache";
            QCMeditors.times[QCMeditors.qFocusOn] = value;
        } else {
            elt.className = "";
            QCMeditors.times[QCMeditors.qFocusOn] = undefined;
        }
    }
};
var QCMCam = {
    lang: {
        //
        text: function () {
            var chaine = arguments[0];
            if (arguments[1] !== undefined) {
                for (var i = 1; i < arguments.length; i++) {
                    chaine = chaine.replace("{}", arguments[i]);
                }
            }
            return chaine;
        },
        /*
         * traduit le HTML
         */
        translate: function () {
            if (!QCMCam.lang.loadLang(true)) return;
            CKEDITOR.config.language = lang;
            var els = document.querySelectorAll("*[data-translate]");
            var json, attr, chaine;
            els.forEach(function (item) {
                json = JSON.parse(item.dataset.translate);
                for (var i in json) {
                    attr = json[i].split(".");
                    chaine = QCMCam.lang[lang][attr[0]][attr[1]];
                    if (i === "html")
                        item.innerHTML = chaine;
                    else
                        item[i] = chaine;
                }
            })
            if(!utils.isEmpty(CKEDITOR.instances)){ // on recrée les editeurs s'ils existent.
                QCMeditors.reloadCKEDITOR();
            }
        },
        loadLang: function (force) {
            // au premier chargement si le navigateur est français, on ne touche à rien
            if (lang === "fr" && force === undefined) return false;
            // si la langue n'existe pas, on arrête.
            if (["en", "es", "fr", "de","it"].indexOf(lang) < 0) {
                lang = "fr";
                alert('Your language is not supported, default is french.\n\nYou can switch to Spanish, English, Italian or German\nin the bottom.\n\nOr you can help translating. See Info');
                return false;
            }
            // sinon, on teste l'existence des éléménts de Traduction
            // si n'existe pas, on charge le script puis relance la traduction.
            if (QCMCam.lang[lang] === undefined) {
                var script = "js/lang/" + lang + ".js";
                var callback = function () {
                    return false;
                };
                if (force) callback = QCMCam.lang.translate;
                utils.addScript(script, callback);
                // on ne fait pas la traduction tout de suite, elle sera lancée par le callback
                return false;
            } else // le fichier de langue a déjà été chargé
                return true;
        },
        changeLanguage: function (newlang) {
            lang = newlang;
            QCMCam.lang.translate(true);
        }
    }
};
// on charge le fichier de langue pour qu'il soit dispo de suite;
QCMCam.lang.loadLang();


/*
 *  Objet users : toute les fonctions et variables en lien avec les participants
 */
var users = {
    // supprMode : false ou true, selon que l'on est en mode suppression des utilisateurs par clic ou non
    supprMode: false,
    absents: {},
    college: null,
    classe: null,
    eleves: {},
    // pour la sélection d'élèves interrogés.
    interroges1:[], // table des participants interrogés une fois
    interroges2:[], // table des participants interrogés une deuxième fois
    listeTirages:[], // table des tirages
    collegeinit: {
        "GP1": {
            "1": "Participant 1",
            "2": "Participant 2",
            "3": "Participant 3",
            "4": "Participant 4",
            "5": "Participant 5",
            "6": "Participant 6",
            "7": "Participant 7",
            "8": "Participant 8",
            "9": "Participant 9",
            "10": "Participant 10",
            "11": "Participant 11",
            "12": "Participant 12",
            "13": "Participant 13",
            "14": "Participant 14",
            "15": "Participant 15",
            "16": "Participant 16",
            "17": "Participant 17",
            "18": "Participant 18",
            "19": "Participant 19",
            "20": "Participant 20",
            "21": "Participant 21",
            "22": "Participant 22",
            "23": "Participant 23",
            "24": "Participant 24",
            "25": "Participant 25",
            "26": "Participant 26",
            "27": "Participant 27",
            "28": "Participant 28",
            "29": "Participant 29",
            "30": "Participant 30",
            "effectif": 30
        },
        "GP2": {
            "1": "Di Alain",
            "2": "Onyme Anne",
            "3": "Chaud Artie",
            "4": "Malaki Ben",
            "5": "Onxa Cécile",
            "6": "Obscur Clair",
            "7": "Zore Dino",
            "8": "Cicode David",
            "9": "Coptaire Eli",
            "10": "Rice Edith",
            "11": "Oposte Fidel",
            "12": "Gafatoy Fabien",
            "13": "Mansoif Gérard",
            "14": "Héparbal Gilles",
            "15": "Bol Guy",
            "16": "Perret Inès",
            "17": "Peuplu Jean",
            "18": "Instant Justin",
            "19": "Dioci Kelly",
            "20": "Chevée Lyna",
            "21": "Dévous Laurent",
            "22": "Nord Paul",
            "23": "Tounet Patrice",
            "24": "Sagratte Sandra",
            "25": "Stickey Sophie",
            "26": "Jasmin Théo",
            "27": "Hate Tom",
            "28": "Timaitre Vincent",
            "29": "Elnypoivre Yannis",
            "30": "Débobe Yvan",
            "effectif": 30
        }
    },
    pasteUsersImport: function(evt){
        users.import(evt.clipboardData.getData('text/plain'));
    },
    /*
     * Supprime un participant
     *
     */
    setDeleteMode: function (force) {
        if (!this.supprMode && !force) {
            this.addSuprrButton();
        } else {
            this.removeSupprButton();
        }
    },
    /*
     * addSupprButton affiche le bouton de suppression des utilisateurs
     */
    addSuprrButton: function () {
        this.supprMode = true;
        var elements = document.getElementsByClassName('eleve');
        if (elements.length === undefined) return false;
        var i;
        for (i = 0; i < elements.length; i++) {
            elements[i].childNodes[1].className = "supprButton";
        }
    },
    /*
     * removeSupprButton cache le bouton de suppression des utilisateurs
     */
    removeSupprButton: function () {
        this.supprMode = false;
        var elements = document.getElementsByClassName('eleve');
        if (!elements.length) return;
        var i;
        for (i = 0; i < elements.length; i++) {
            elements[i].childNodes[1].className = "cache";
        }
    },
    /*
     * switche entre l'affichage des réponses apportées par les élèves
     * et la liste des élèves
     * @param (Bolean) doIt : true si undefined
     * @returns {nothing}
     */
    afficheReponses: function (doIt) {
        if (doIt === undefined) {
            doIt = true;
        }
        var btn = document.getElementById("btnb");
        if (utils.class('colonnes') === "cache" && doIt) {
            utils.class('colonnes', "inline-block");
            utils.class('conteneureleves', "cache");
            btn.src = "css/img/32px/students.png";
            btn.title = "Voir les élèves (ALT+V)";
            // on arrête le scan des réponses s'il est en cours.
            if (scan)
                camera.scanner(false);
        } else {
            utils.class('colonnes', "cache");
            utils.class('conteneureleves', "");
            btn.src = "css/img/32px/stats.png";
            btn.title = "Voir les réponses (ALT+V)";
        }
    },
    /*
     * delete : supprime un utilisateur et remet l'affichage à jour
     * @param (Integer) id : l'id de l'élève à Supprimer
     * @param (Boolean) saveok : non nécessaire, si false ne propose pas de sauvegarder
     */
    delete: function (id, saveok) {
        if (saveok === undefined)
            saveok = true;
        if (users.eleves[id] !== undefined) {
            delete users.eleves[id];
            users.eleves.effectif--;
            if (datas[id] !== undefined)
                delete datas[id];
            users.show();
            if (users.classe && saveok)
                utils.class('btnsaveclasses', "");
        }
        answers.updateVotes();
    },
    /*
     * supprime les utilisateurs qui n'ont pas répondu.
     */
    appel: function () {
        if (confirm(QCMCam.lang[lang].messages.deleteabsentees)) {
            // on stoppe le scan
            camera.scanner(false);
            if (utils.isEmpty(users.eleves)) return false;
            var i;
            users.absents = {
                effectif: 0
            };
            for(i in users.eleves){
                if(i !== "effectif"){
                    if (datas[i] === undefined) {
                        users.absents[i] = users.eleves[i];
                        users.absents.effectif++;
                        users.delete(i, false);
                    }    
                }
            }
            answers.updateVotes();
        }
    },
    /*
     * insère les noms des élèves dans le DOM
     * @returns {undefined}
     */
    show: function () {
        document.getElementById('messageacceuil').className = "cache";
        document.getElementById('boutonsuserslive').className = "";
        var txt = "";
        var classSuppr = "cache";
        if (users.supprMode) {
            classSuppr = "supprButton";
        }
        for (var i in users.eleves) {
            if (i === "effectif")
                continue;
            if (namesvisible === true)
                txt += '<div class="eleve" id="el' + i + '" title="' + users.eleves[i] + '"><span class="numero">' + i + "</span><span id='delete" + i + "' class='" + classSuppr + "' onclick='users.delete(" + i + ");'>×</span><span class='cache' id='addrep" + i + "'>+</span><span class='cache' id='supprrep" + i + "'>‒</span><span class='participant'>" + users.eleves[i] + "</span></div>";
            else
                txt += '<div class="eleve" id="el' + i + '" title="' + users.eleves[i] + '"><span class="numero">' + i + "</span><span id='delete" + i + "' class='" + classSuppr + "' onclick='users.delete(" + i + ");'>×</span><span class='cache' id='addrep" + i + "'>+</span><span class='cache' id='supprrep" + i + "'>‒</span><span class='participant' style='display:none;'>" + users.eleves[i] + "</span></div>";
        }
        document.getElementById("listeeleves").innerHTML = txt;
    },
    /*
     * récupère la liste des élèves à partir d'un fichier csv obtenu à partir de PRONOTE
     * on prend soin de bien enlever les accents dans l'entête du fichier
     * @returns {Boolean}
     */
    firstImport: function () {
        if (utils.storageAvailable('localStorage')) {
            if (localStorage.college !== undefined) {
                users.college = JSON.parse(localStorage.college);
                users.peuplerSelectClasses("fromMemory");
                // on affiche le bouton permettant de revenir à la liste précédente
                document.getElementById("btnresetclasses").className = "";
                return;
            }
        }
        users.college = Object.assign({}, users.collegeinit);
        users.peuplerSelectClasses("basic");
        return true;
    },
    /*
     * Supprime le collège en cache et recrée le collège par défaut
     */
    resetCollege: function () {
        if(confirm(QCMCam.lang[lang].usersPanel.restoreDefaults)){
        users.college = Object.assign({}, users.collegeinit);
        users.peuplerSelectClasses("basic");
        document.getElementById("btnresetclasses").className = "cache";
        if (utils.storageAvailable('localStorage')) {
            if (localStorage.college !== undefined)
                delete localStorage.college;
        }} else {return false;}
    },
    /*
     * Met en mode édition la liste des participants
     * @param {type} elem
     * @returns {Boolean}
     */
    edit: function (forceclose) {
        var elem = document.getElementById("btnednames");
        var participants = document.getElementsByClassName("eleve");
        if (participants.length === 0) {
            alert(QCMCam.lang[lang].messages.nothingtoedit);
            return false;
        }
        var i = 0,
            c1, c2, ceditable = "#ffe6b3",
            cuneditable = "#FFF",
            cborder = "1px dotted #333",
            cborderoff = "",
            focus = function () {
                utils.select(this);
            },
            focusoff = null;
        var editable = participants[0].childNodes[0].isContentEditable || forceclose;
        if (editable) { // on sort du mode édition
            elem.style.opacity = 1;
            document.getElementById("messageedition").className = "cache";
            //sauvegarde et rechargement de la liste dans l'objet javascript

        } else { // on entre dans le mode édition
            elem.style.opacity = 0.4;
            document.getElementById("messageedition").className = "";
        }
        for (i = 0; i < participants.length; i++) {
            c1 = participants[i].childNodes[0];
            c2 = participants[i].childNodes[4];
            if (editable) {
                c1.contentEditable = false;
                c1.style.backgroundColor = cuneditable;
                c1.style.border = cborderoff;
                c1.onfocus = focusoff;
                c1.onchange = null;
                c2.contentEditable = false;
                c2.style.backgroundColor = cuneditable;
                c2.style.border = cborderoff;
                c2.onfocus = focusoff;
                c2.onchange = null;
            } else {
                c1.contentEditable = true;
                c1.style.backgroundColor = ceditable;
                c1.style.border = cborder;
                c1.onfocus = focus;
                c2.contentEditable = true;
                c2.style.backgroundColor = ceditable;
                c2.style.border = cborder;
                c2.onfocus = focus;
                if (users.classe) {
                    c1.onfocus = function () {
                        this.data_origin = this.innerHTML
                    };
                    c2.onfocus = function () {
                        this.data_origin = this.innerHTML
                    };
                    c1.onblur = function () {
                        if (this.innerHTML !== this.data_origin) document.getElementById('btnsaveclasses').className = "";
                    };
                    c2.onblur = function () {
                        if (this.innerHTML !== this.data_origin) document.getElementById('btnsaveclasses').className = "";
                    };
                }
            }
        }
        if (editable) { // on sort du mode édition
            users.updateAfterEdit();
        }
    },
    /*
     * recrée la table eleves en fonction du DOM affiché et modifié
     */
    updateAfterEdit: function () {
        var participants = document.getElementsByClassName("eleve");
        if (participants.length === 0) {
            return false;
        }
        var id, nom, ok = true,
            i;
        users.eleves = {
            effectif: 0
        };
        for (i = 0; i < participants.length; i++) {
            id = Number(participants[i].childNodes[0].innerHTML);
            nom = participants[i].childNodes[4].innerHTML;
            if (users.eleves[id] === undefined) {
                users.eleves[id] = nom;
                users.eleves.effectif++;
            } else {
                ok = false;
                alert(QCMCam.lang.text(QCMCam.lang[lang].messages.twicenumber, id));
            }
        }
        if (ok) {
            answers.resetAll();
        }
    },
    /*
     * affiche les noms des élèves d'une classe sélectionnée.
     * @param {String} classe : chaine avec le nom de la classe à afficher
     */
    setGroup: function (classe) {
        utils.afficheAccueil(false);
        utils.class('btnsaveclasses', "cache");
        // remises à zéro
        this.interroges1=[]; // table des participants interrogés une fois
        this.interroges2=[]; // table des participants interrogés une deuxième fournies
        this.listeTirages=[];
        if (classe !== undefined) {
            if (users.college[classe] !== undefined) {
                // on stocke la classe affichée en cours
                if (classe !== "uploaded")
                    users.classe = classe;
                users.eleves = users.college[classe];
                // vide les données et affiche le groupe selectionné
                answers.resetAll();
            } else
                document.getElementById("listeeleves").innerHTML = QCMCam.lang.text(QCMCam.lang[lang].messages.nostudent, classe);
        } else
            document.getElementById("listeeleves").innerHTML = QCMCam.lang[lang].messages.noclass;
    },
    /*
     * Supprime la liste affichée des participants
     */
    emtpy: function () {
        if (confirm(QCMCam.lang[lang].messages.empty)) {
            users.eleves = {};
            answers.resetAll();
            users.classe = null;
        }
    },
    /*
     * Ajoute des participants
     */
    add: function () {
        var nb = Number(prompt(QCMCam.lang[lang].messages.adduser));
        if (nb === "")
            nb = 1;
        var usersNb = Object.keys(users.eleves).length;
        if (nb > 60 || usersNb + nb > 60) {
            alert("Votre nombre est trop grand. Vous ne devez pas dépasser 60 utilisateurs");
            return false;
        }
        var i = 0;
        var maxKey = 0,
            keytemp = 0;
        for (i = 0; i < usersNb; i++) {
            keytemp = Number(Object.keys(users.eleves)[i]);
            if (keytemp > maxKey)
                maxKey = keytemp;
        }
        for (i = 0; i < nb; i++) {
            users.eleves[maxKey + i + 1] = QCMCam.lang[lang].messages.participant + " " + (maxKey + i + 1);
        }
        answers.resetAll();
        if (users.classe) {
            document.getElementById('btnsaveclasses').className = "";
        }
    },
    /*
     * affiche ou non les noms des participants
     * @returns nothing
     */
    toggle: function () {
        var i = 0;
        var noms = document.getElementsByClassName('participant');
        for (i = 0; i < noms.length; i++) {
            if (namesvisible === true) {
                noms[i].style.display = "none";
            } else {
                noms[i].style.display = "inline-block";
            }
        }
        if (namesvisible === true) {
            namesvisible = false;
            document.getElementById("btnnames").src = "css/img/32px/if_user_search_66914.png";
        } else {
            namesvisible = true;
            document.getElementById("btnnames").src = "css/img/32px/if_user_delete_66908.png";
        }
    },
    /*
     * Tire un utilisateur au hasard et le met en évidence quelques secondes.
     * @returns {undefined}
     */
    alea: function (type) {
        if (users.eleves.effectif === undefined) {
        // pas de groupe sélectionné.
        alert(QCMCam.lang[lang].messages.groupmusthave);
            return;
        } else if ((type === false || type === true) && qreponses[QCMeditors.qFocusOn] === undefined) {
            alert(QCMCam.lang[lang].messages.goodanswermusthave);
            return;
        }
        let i = 0;
        let table = [];
        for (i in datas) {
            // parcours des résultats
            if (Number(i) > 0) {
                if (type === undefined) {
                    table.push(i);
                } else if (type && (datas[i].vote === qreponses[QCMeditors.qFocusOn] || utils.compareArrays(datas[i].vote, qreponses[QCMeditors.qFocusOn]))) { // bonne réponse
                    table.push(i);
                } else if (!type && ((reponseSimple && datas[i].vote !== qreponses[QCMeditors.qFocusOn]) || (!reponseSimple && !utils.compareArrays(datas[i].vote, qreponses[QCMeditors.qFocusOn])))) {
                    table.push(i);
                }
            }
        }
        if (table.length === 0 && type === undefined) { // cas où personne n'a répondu, on pioche dans la liste des élèves
            // permet de poser une question a priori
            for (i in users.eleves) {
                if (Number(i) > 0)
                    table.push(i);
            }
        } else if (table.length === 0) {
            alert("Personne n'ayant répondu, action impossible");
            return;
        }
        let alea = 0;
        let ok=false;
        let breakafter500=0;
        if(type === undefined){
            do{
                alea = Math.floor(Math.random() * table.length);
                breakafter500++;
                if(this.interroges1.indexOf(alea)<0){
                    // pas encore interrogé
                    ok=true;
                    this.interroges1.push(alea);
                    if(this.interroges1.length === table.length)
                    // tout le monde a été interrogé une fois, on vide le cache
                    this.interroges1 = [];
                } else if(table.length>5 && this.interroges2.indexOf(alea)<0 && this.listeTirages.indexOf(alea)<this.listeTirages.length-5){
                    // on accepte une deuxième interrogation si interrogé depuis 5 personnes au moins
                    ok=true;
                    this.interroges2.push(alea);
                    // tout le monde a été interrogé 2 fois, on vide le cache
                    if(this.interroges2.length === table.length)
                        this.interroges2 = [];
                }
                if(breakafter500>500){console.error("oups");break;}
            } while(!ok)
            this.listeTirages.push(alea);
        } else {
            alea = Math.floor(Math.random() * table.length);
        }
        // on ne prend que si la personne a voté (pour éviter les absents)
        document.getElementById("el" + table[alea]).className = "eleveevident";
        setTimeout(function () {
            document.getElementById("el" + table[alea]).className = "eleve";
        }, 5000);
    },
    /*
     * Télécharge les participants sur l'ordinateur
     */
    download: function () {
        var content = "",
            i = 0;
        var participants = document.getElementsByClassName("eleve");
        if (participants.length === 0) {
            alert("pas de participant à télécharger.");
            return false;
        }
        for (i = 0; i < participants.length; i++) {
            content += participants[i].childNodes[0].innerHTML + "\t" + participants[i].childNodes[4].innerHTML + "\r\n";
        }
        var contentType = 'text/plain';
        var filename = "participants.txt";
        var blob = new Blob([content], {
            type: contentType
        });
        download(blob, filename, "text/plain");
    },
    savelist: function () {
        if (!users.classe) return;
        users.college[users.classe] = users.eleves;
        document.getElementById('btnsaveclasses').className = 'cache';
        if (utils.storageAvailable('localStorage')) { // on stocke les données localement pour les retrouver à la prochaine ouverture de page
            localStorage.college = JSON.stringify(users.college);
        }
    },
    /*
     * Télécharge un fichier de id / nom / groupe
     * @param {type} event
     * @returns {false}
     */
    groupsDownload: function () {
        var content = "",
            i, j;
        if (!users.college) {
            alert(QCMCam.lang[lang].messages.nogroup);
            return false;
        }
        for (i in users.college) {
            if (i === "uploaded")
                continue;
            if (users.college[i].effectif === undefined)
                continue;
            for (j in users.college[i]) {
                if (j !== "effectif")
                    content += j + "\t" + users.college[i][j] + "\t" + i + "\r\n";
            }
        }
        if (content === "") {
            alert("Pas de données à télécharger.");
            return false;
        }

        var contentType = 'text/plain';
        var filename = "participants.txt";
        var blob = new Blob([content], {
            type: contentType
        });
        download(blob, filename, "text/plain");
    },
    /*
     * charge le fichier donné en paramètre du champ input (event)
     */
    openFile: function (event) {
        // le fichier est un txt avec lignes au format Numero\tNom[\tclasse] ou Nom seul
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            users.import(reader.result);
        };
        reader.readAsText(input.files[0]);
    },
    /*
     * importe les données dans la variable college
     * @param (String) liste : une chaine de type tableur obetnue par copier/coller
     */
    import: function (liste) {
        users.classe = null;
        var withClasses = false;
        var nomsClasses = [];
        var compteurIds = 1;
        var lines = liste.split(/[\r\n]+/g); // pour que ça marche à partir de fichiers créés avec des systèmes différents de Windows.
        users.college.uploaded = {
            effectif: 0
        };
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].trim() === "")
                continue; // ligne vide
            var text = lines[i].split("\t");
            if (text.length === 3) { // 3e colonne = classe
                withClasses = true;
                if (nomsClasses.indexOf(text[2].trim()) < 0) {
                    nomsClasses.push(text[2].trim());
                    users.college[text[2].trim()] = {};
                    users.college[text[2].trim()].effectif = 0;
                }
                users.college[text[2].trim()][text[0].trim()] = text[1].trim();
                users.college[text[2].trim()].effectif++;
            } else if (text.length === 1) {
                //on imagine une liste de noms sans numéro
                users.college.uploaded[compteurIds++] = text[0].trim();
                users.college.uploaded.effectif++;
            } else {
                users.college.uploaded[text[0].trim()] = text[1].trim();
                users.college.uploaded.effectif++;
            }
        }
        if (withClasses) {
            // suppression des classes qui ne sont pas dans la liste des classes chargées
            for (var classe in users.college) {
                if (nomsClasses.indexOf(classe) < 0) {
                    delete users.college[classe];
                }
            }
            users.peuplerSelectClasses("new");
            // on montre le bouton permettant de reseter la liste
            document.getElementById("btnresetclasses").className = "";
            if (utils.storageAvailable('localStorage')) { // on stocke les données localement pour les retrouver à la prochaine ouverture de page
                localStorage.college = JSON.stringify(users.college);
            }
        } else
            users.setGroup("uploaded");
    },
    /*
     * Création du select des groupes d'utilisateurs
     * @param (String) action : "new" -> charge les classes qui ne sont pas celles par défaut
     *                          "basic" -> charge les classes par défaut
     */
    peuplerSelectClasses: function (action) {
        var message="";
        if(action === "new")
            message = QCMCam.lang[lang]['messages']['importgroups']+"<ul>";
        var x = document.getElementById("classes"),
            option, nomClasse;
        var opts = x.getElementsByTagName('option');
        // on vide le select
        while (opts[1]) {
            x.removeChild(opts[1]);
        }
        // on remplit avec les noms de classes
        for (nomClasse in users.college) {
            if ((nomClasse !== "uploaded" && nomClasse !== "GP1" && nomClasse !== "GP2" && (action === "new" || action === "fromMemory")) || (action === "basic" && nomClasse !== "uploaded")) {
                option = document.createElement("option");
                option.text = nomClasse;
                option.value = nomClasse;
                x.add(option);
                message += "<li>"+nomClasse+"</li>";
            }
        }
        // on prévient que l'opération est terminée.
        if(action === "new"){
            message += "</ul>";
            document.getElementById("listeeleves").innerHTML = message;
            utils.afficheAccueil(false);
            }
    },
    /**
     * Permet de créer des groupes à partir de la classe affichée.
     */
    manageGroups:function(action){
        if(action === "open"){
            if(!utils.isEmpty(qdatas)){
                answers.fillTable();// calcule les résultats.
                document.getElementById("group-with-score").className = "";
            } else {
                document.getElementById("group-with-score").className = "cache";
            }
            document.getElementById("group-manager").className = "";
            users.workgroup = new groupe(users.eleves);
            users.workgroup.display();
        } else {
            document.getElementById("group-manager").className = "cache";
        }
    }
};
/*
 * Objet answers : toutes les fonctions et variables concernant les réponses données par les participants
 */
var answers = {
    /*
     * Variables
     */
    vuesMin: 4,
    canvas: null,
    context: null,
    nbColors: 11,
    scores:{},
    contextInit: function () {
        this.context = this.canvas.getContext("2d");
        this.context.font = "30px Arial";
        this.context.textAlign = "center";
        this.context.fillText("A", 25, 460);
        this.context.fillText("B", 75, 460);
        this.context.fillText("C", 125, 460);
        this.context.fillText("D", 175, 460);
        this.context.font = "16px Arial";
    },
    /*
     * resetAll : efface toutes les données de suivi
     * enlève la marque des bonnes réponses dans le QCM
     * supprime les données de réponse de tous les utilisateurs
     * @returns {undefined}
     */
    resetAll: function () {
        this.initAll();
        var i;
        // on déaffiche le corrigé
        document.querySelectorAll(".question").forEach(el=>{el.classList.remove("corrige")});
        qdatas = {};
        this.scores={};
        // en cas de gestion avec le portable
        if (comm.sessionId > 0 || comm.peerId !== false) {
            usersChangeDetected = true;
        }
    },
    /*
     * initAll : réinitialise les données de question en cours
     *
     * @returns {nothing}
     */
    initAll: function (move) {
        if (move === undefined) {
            move = true;
        }
        validrep = {};
        datas = {};
        totaux = {
            "A": 0,
            "B": 0,
            "C": 0,
            "D": 0
        };
        document.getElementById("goodAnswer").options[0].selected = 'selected';
        answers.compteValeurs();
        if (stylesheets[QCMeditors.qFocusOn] !== undefined && !move)
            QCMeditors.removeStyle(QCMeditors.qFocusOn);
        if (users.eleves !== undefined) {
            var nbeleves = 0;
            // on compte combien il y a d'élèves
            for (var i in users.eleves) {
                if (!isNaN(parseFloat(i)) && isFinite(i))
                    nbeleves++;
            }
            users.eleves.effectif = nbeleves;
            users.show();
        }
    },
    /*
     * met les numéros des élèves qui ont voté en couleur.
     * @returns {undefined}
     */
    updateVotes: function () {
        for (var i in datas) {
            if (datas[i].nbvotes > 0) {
                document.querySelector("#el" + i + " > span:first-of-type").className = "numerobleu";
                if (datas[i].nbvotes > 1) { // on n'indique les votes supplémentaires qu'à partir du 2e
                    // on regarde si c'est un nouveau vote
                    if (!datas[i].newvote) {
                        continue;
                    } else if (datas[i].newvote === true) {
                        // on ne prend que si la personne a voté (pour éviter les absents)
                        document.getElementById("addrep" + i).className = "addrep";
                    } else if (datas[i].newvote === "reset") {
                        document.getElementById("supprrep" + i).className = "supprrep";
                    }
                    datas[i].newvote = false;
                }
            }
        }
    },
    // fonction qui teste si le nombre de vote a été atteint pour arrêt du scan automatiquement
    // et réinitialise l'affichage des élèves après  3 s.
    tests: function (iswebcam) {
        if (iswebcam === undefined) iswebcam = true;
        var nbvals = 0;
        var now = Date.now();
        for (var i in datas) {
            if (datas[i].timestamp + 3000 < now) {
                document.getElementById("addrep" + i).className = "cache";
                document.getElementById("supprrep" + i).className = "cache";
            }
            if (reponseSimple && datas[i].vote !== "")
                nbvals++;
        }
        if (iswebcam)
            if (nbvals === users.eleves.effectif && !camera.manualStopScan && reponseSimple) { // on n'arête pas le scan automatiquement si plusieurs réponses sont à donner.
                camera.scanner(false);
                camera.manualStopScan = true;
            }
    },
    /*
     * crée l'image avec les statistiques des réponses.
     * et met la colonne de la bonne réponse en vert si elle est fournie
     * @param {String} value = la bonne réponse
     * @returns {undefined}
     */
    compteValeurs: function (value) {
        if (value === undefined) value = "Z";
        totaux = {
            "A": 0,
            "B": 0,
            "C": 0,
            "D": 0
        };
        for (var i in datas) {
            if (reponseSimple)
                totaux[datas[i].vote]++;
            else {
                for (var j = 0; j < datas[i].vote.length; j++) {
                    totaux[datas[i].vote[j]]++;
                }
            }
        }
        var h = 430; // base des colonnes
        var colorsDefault = {
            face: "#50D4FD",
            right: "#3da6c6",
            top: "#68dbff"
        }; // couleurs par défaut
        var colorsGood = {
            face: "#66ff33",
            right: "#4cbf26",
            top: "#8dff68"
        }; // couleurs par défaut
        var colorsA = colorsDefault,
            colorsB = colorsDefault,
            colorsC = colorsDefault,
            colorsD = colorsDefault;
        answers.context.clearRect(0, 0, 200, h + 3);
        answers.context.textAlign = "center";
        var hA = 10 * totaux.A,
            hB = 10 * totaux.B,
            hC = 10 * totaux.C,
            hD = 10 * totaux.D;
        if (value.indexOf("A") > -1)
            colorsA = colorsGood;
        if (value.indexOf("B") > -1)
            colorsB = colorsGood;
        if (value.indexOf("C") > -1)
            colorsC = colorsGood;
        if (value.indexOf("D") > -1)
            colorsD = colorsGood;
        answers.traceColonne(10, h, hA, colorsA);
        answers.traceColonne(60, h, hB, colorsB);
        answers.traceColonne(110, h, hC, colorsC);
        answers.traceColonne(160, h, hD, colorsD);
        // valeurs
        answers.context.fillStyle = "#0033cc";
        answers.context.fillText(totaux.A, 25, h - hA - 10);
        answers.context.fillText(totaux.B, 75, h - hB - 10);
        answers.context.fillText(totaux.C, 125, h - hC - 10);
        answers.context.fillText(totaux.D, 175, h - hD - 10);
    },
    /*
     * affecte une réponse à un marker et compte le nombre de réponses différentes fournies
     * @param {Integer} markerID
     * @param {String} valeur
     * @returns {Boolean}
     */
    affecte: function (markerID, valeur) {
        markerID = String(markerID);
        var timestamp = Date.now();
        if (comm.peerId === false && comm.sessionId === null) { // cas du scan par webcam
            // on prévient les erreur de lecture de marker
            if (users.eleves[markerID] === undefined)
                return false;
            if (datas[markerID] === undefined) { // création du premier vote
                if (!reponseSimple) // vote : tableau de valeurs A,B,C,D, nbvotes : nb de votes différents, timestamp : date en ms,
                    // newvote : true (nouveau) false : pas nouveau, "reset" : annule un vote, voteTemp : vote A,B,C,D en attente de stockage dans vote
                    // vues : nb de fois où voteTemp a été repéré. si > answers.vuesMin => valide
                    datas[markerID] = {
                        vote: [],
                        nbvotes: 0,
                        timestamp: timestamp,
                        newvote: true,
                        voteTemp: valeur,
                        vues: 1
                    };
                else
                    datas[markerID] = {
                        vote: "",
                        nbvotes: 0,
                        voteTemp: valeur,
                        vues: 1,
                        timestamp: timestamp
                    };
            } else if (datas[markerID].voteTemp !== valeur) { // le vote a changé, on réinitialise le nb de vues
                datas[markerID].voteTemp = valeur;
                datas[markerID].vues = 1; // ça augmente juste après :P
            } else { // le vote n'a pas changé depuis le nombre de vues mini
                datas[markerID].vues++;
                if (datas[markerID].vues > answers.vuesMin) {
                    if (reponseSimple && datas[markerID].vote !== valeur) { // QCM à 1 seule réponse
                        if (datas[markerID].nbvotes === 0) { // la valeur n'existe pas, on affecte la valeur
                            datas[markerID].vote = valeur;
                            datas[markerID].nbvotes++;
                        } else if (datas[markerID].timestamp + 1000 < timestamp) { // sinon, on vérifie que la valeur a été donnée pdt plus de 1s.
                            datas[markerID].vote = valeur; // cela pour éviter les faux mouvements
                            datas[markerID].nbvotes++;
                            datas[markerID].timestamp = timestamp;
                            datas[markerID].newvote = true;
                        }
                    } else if (!reponseSimple) { // QCM à réponses multiples
                        if (datas[markerID].nbvotes === 0) { // la valeur n'est pas dans le tableau et c'est la première, on l'ajoute
                            datas[markerID].vote.push(valeur);
                            datas[markerID].newvote = true;
                            datas[markerID].nbvotes++;
                            datas[markerID].timestamp = timestamp;
                        } else if (datas[markerID].timestamp + 3500 < timestamp) { // sinon, on regarde si 3.5 secondes sont passées depuis le dernier enregistrement.
                            datas[markerID].vues = 1;
                            datas[markerID].nbvotes++;
                            datas[markerID].timestamp = timestamp;
                            if (datas[markerID].vote.indexOf(valeur) < 0) { // la valeur n'y est pas, on l'ajoute
                                datas[markerID].vote.push(valeur);
                                datas[markerID].newvote = true;
                            } else { // la valeur y est, on la retire
                                utils.removeElement(datas[markerID].vote, valeur);
                                datas[markerID].newvote = "reset";
                            }
                        }
                    }
                }
            }
        } else { // si données envoyées par device
            if (users.eleves[markerID] === undefined)
                return false;
            datas[markerID].nbvotes++;
            if (datas[markerID].vote.indexOf(valeur) < 0) {
                if (!reponseSimple) {
                    datas[markerID].vote.push(valeur);
                    datas[markerID].newvote = true;
                    datas[markerID].timestamp = timestamp;
                } else {
                    datas[markerID].vote = valeur;
                }
            } else if (!reponseSimple) {
                utils.removeElement(datas[markerID].vote, valeur);
                datas[markerID].newvote = 'reset';
                datas[markerID].timestamp = timestamp;
            }
        }
    },
    /*
     * Montre les réponses apportées par les élèves.
     * @param value : la réponse correcte (donnée par le prof) qui peut être un tableau
     */
    showResponses: function (value) {
        if (reponseSimple) {
            for (var i in datas) {
                if(datas[i].vote !== "")
                    document.querySelector("#el" + i + " > span:first-of-type").innerHTML = datas[i].vote;
                if (datas[i].vote !== value) {
                    document.querySelector("#el" + i + " > span:first-of-type").className = "numerorouge";
                } else {
                    document.querySelector("#el" + i + " > span:first-of-type").className = "numerovert";
                }
            }
        } else {
            for (var i in datas) {
                if (utils.compareArrays(value, datas[i].vote)) {
                    document.querySelector("#el" + i + " > span:first-of-type").className = "numerovert";
                } else {
                    document.querySelector("#el" + i + " > span:first-of-type").className = "numerorouge";
                }
            }
        }
        return true;
    },
    /*
     * setGoodAnswer
     * @var : la bonne réponse
     * - Affiche les réponses des élèves dans leur numéro et colore rouge si erreur
     * Appelé par le menu déroulant, réponse affichée directement
     * - colore la colonne de la bonne réponse.
     */
    setGoodAnswer: function (value) {
        qreponses[QCMeditors.qFocusOn] = value;
        this.showResponses(qreponses[QCMeditors.qFocusOn]);
        this.compteValeurs(qreponses[QCMeditors.qFocusOn]);
        QCMeditors.addStyle(QCMeditors.qFocusOn);
        this.giveGoodAnswer()
        if(arguments[1] === false)return;// on évite de communiquer si on a reçu le changement de réponse par le device
        if (comm.sessionId > 0 || comm.peerId !== false) {
            reponsesChangeDetected = true;
        }
    },
    /*
     * affecte la bonne réponse au QCM
     * appelé par l'utilisateur (case à cocher)
     */
    setAnswer: function (value, type) {
        if (type === "radio") {
            // type radio, une seule réponse possible
            if (value !== "0") {
                qreponses[QCMeditors.qFocusOn] = value;
                document.getElementById('revealanswer').className = "";
                document.getElementById("goodAnswer").className = "cache";
            } else {
                delete qreponses[QCMeditors.qFocusOn];
                document.getElementById('revealanswer').className = "cache";
                document.getElementById("goodAnswer").className = "";
            }
        } else { // type checkbox, plusieurs réponses possibles
            if (value !== "0") {
                var elem = document.querySelector("input[name='reponse'][value='0']");
                elem.checked = false;
                elem = document.querySelector("input[name='reponse'][value='" + value + "']");
                if (elem.checked)
                    qreponses[QCMeditors.qFocusOn].push(value);
                else {
                    utils.removeElement(qreponses[QCMeditors.qFocusOn], value);
                }
                document.getElementById('revealanswer').className = "";
                document.getElementById("goodAnswer").className = "cache";
            } else {
                // on remet les éléments input à false
                var elems = document.querySelectorAll("input[name='reponse']");
                qreponses[QCMeditors.qFocusOn] = [];
                for (var i = 0; i < elems.length - 1; i++) {
                    elems[i].checked = false;
                }
                document.getElementById('revealanswer').className = "";
                document.getElementById("goodAnswer").className = "cache";
            }
        }
        QCMeditors.addStyle(QCMeditors.qFocusOn);
    },
    /*
     * Appelée par le bouton indiquant la bonne réponse au clic de l'utilisateur
     */
    giveGoodAnswer: function () {
        if(qreponses[QCMeditors.qFocusOn] === undefined)return;
        var value = qreponses[QCMeditors.qFocusOn];
        this.showResponses(value);
        this.compteValeurs(value);
        QCMeditors.addStyle(QCMeditors.qFocusOn);
        document.getElementById("editor"+QCMeditors.qFocusOn).classList.add("corrige");
    },
    /*
     * fillTable : remplit la variable qexport et
     * le tableau d'affichage des résultats des élèves
     */
    fillTable: function () {
        var tableau = document.getElementById("tableau");
        tableau.innerHTML = "";
        var row = tableau.insertRow(0);
        var color = "red";
        var cmptr = 2;
        var cells = [];
        var i;
        // si les datas de la question en cours existent, on les mets dans l'objet qui va être parcouru
        if (datas !== undefined)
            qdatas[QCMeditors.qFocusOn] = datas;
        qexport = '"id"\t"Nom"';
        cells.push("id");
        cells.push("Nom");
        for (i = 0; i < nbQ; i++) {
            // ligne des question
            // ideleve;nom élève;Q1;...
            qexport += '\t"Q' + (i + 1) + '"';
            cells.push("Q" + (i + 1));
        }
        qexport += '\t"Score"';
        cells.push("score");
        this.completeEntete(cells, row);
        // ligne des bonnes réponses
        row = tableau.insertRow(1);
        cells = ["", "<i>" + QCMCam.lang[lang].messages.goodanswer + "</i>"];
        qexport += '\r\n""\t"' + QCMCam.lang[lang].messages.goodanswer + '"';
        for (i = 0; i < nbQ; i++) {
            qexport += "\t";
            if (qreponses[i] !== undefined && qdatas[i] !== undefined) {
                // on n'affiche pas la réponse s'il n'y a pas eu de sondage effectué
                qexport += '"' + qreponses[i] + '"';
                cells.push("<b>" + qreponses[i] + "</b>");
            } else
                cells.push("");
        }
        this.completeLigne(cells, row);
        for (i in users.eleves) {
            if (i === "effectif")
                continue;
            var score = 0;
            cells = [i, users.eleves[i]];
            qexport += "\r\n" + i + "\t" + '"' + users.eleves[i] + '"';
            for (var j = 0; j < nbQ; j++) {
                qexport += "\t";
                if (qdatas[j] === undefined) {
                    qexport += "\t";
                    cells.push("");
                    continue;
                }
                if (qdatas[j][Number(i)] !== undefined) {
                    if (Array.isArray(qdatas[j][i].vote)) qdatas[j][i].vote.sort();
                    qexport += '"' + qdatas[j][i].vote + '"';
                    if (qreponses[j] !== undefined) {
                        if (qreponses[j] === qdatas[j][i].vote || (Array.isArray(qreponses[j]) && utils.compareArrays(qreponses[j], qdatas[j][i].vote))) {
                            score++;
                            color = "green";
                        } else
                            color = "red";
                    }
                    cells.push("<span class='text-" + color + "'>" + qdatas[j][i].vote + "</span>");
                } else {
                    cells.push("");
                }
            }
            qexport += "\t" + score;
            cells.push(score);
            answers.scores[i] = score;
            row = tableau.insertRow(cmptr);
            this.completeLigne(cells, row);
            cmptr++;
        }
        // création des liens pour le tri
        var entetes = document.querySelectorAll("#tableau th");
        for (var k = 0; k < entetes.length; k++) {
            entetes[k].colnum = k;
            entetes[k].addEventListener("click", function (e) {
                utils.sortTable(e.target.colnum);
            });
        }
    },
    /*
     * affiche ou cache le tableau des réponses aux différents QCM
     */
    afficherStats: function () {
        var divResults = document.getElementById("resultats");
        if (divResults.className === "cache responsive") {
            // création du fichier et remplissage du tableau
            this.fillTable();
            // on affiche la page
            divResults.className = "responsive";
        } else {
            divResults.className = "cache responsive";
        }
    },
    /*
     * insère des données dans un ligne de table html
     * @param (array) cells : tableau contenant les données d'une ligne
     * @param (DOMObject) row : objet du DOM de type ligne de table HTML qui va recevoir les cellules
     */
    completeLigne: function (cells, row) {
        var cel;
        for (var i = 0; i < cells.length; i++) {
            cel = row.insertCell(i);
            cel.innerHTML = cells[i];
        }
    },
    /*
     * insère des données dans un ligne de table html
     * @param (array) cells : tableau contenant les données de la ligne de titre
     * @param (DOMObject) row : objet du DOM de type ligne de table HTML qui va recevoir les cellules
     */
    completeEntete: function (cells, row) {
        var cel;
        for (var i = 0; i < cells.length; i++) {
            cel = document.createElement("TH");
            cel.innerHTML = cells[i];
            row.appendChild(cel);
        }
    },
    /*
     * télécharge un fichier csv comportant les réponses aux QCM
     */
    telechargerStats: function () {
        if (qexport === "")
            return false;
        var contentType = 'text/plain';
        var filename = "resultats.csv";
        var blob = new Blob([qexport], {
            type: contentType
        });
        download(blob, filename, "text/plain");
    },
    /*
     * trace une colone en 3D dans le context
     * @param (Integer) x, h, hx
     * @param (Object) colors {face:(Sting)#color, right:(Sting)#color, top:(Sting)#color}
     */
    traceColonne: function (x, h, hx, colors) {
        var dxy = 7;
        this.context.fillStyle = colors.face;
        this.context.strokeStyle = colors.face;
        this.context.fillRect(x, h - hx, 30, hx);
        this.context.beginPath();
        this.context.fillStyle = colors.right;
        // parallélogramme à droite
        this.context.moveTo(x + 30, h);
        this.context.lineTo(x + 30 + dxy, h - dxy);
        this.context.lineTo(x + 30 + dxy, h - dxy - hx);
        this.context.lineTo(x + 30, h - hx);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        // parallélogramme en haut
        this.context.fillStyle = colors.top;
        this.context.beginPath();
        this.context.moveTo(x, h - hx);
        this.context.lineTo(x + 30, h - hx);
        this.context.lineTo(x + 30 + dxy, h - hx - dxy);
        this.context.lineTo(x + dxy, h - hx - dxy);
        this.context.lineTo(x, h - hx);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
};
/*
 * objet camera : fonctions permettant de gérer, afficher, analyser l'image de la camera
 */
var camera = {
    /*
     * variables
     */
    manualStopScan: false,
    canvas: null,
    context: null,
    interval: null,
    video: null,
    videoReady: false,
    videoSources: [],
    selectedSource: 0,
    resol:1280,
    /*
     * met en route le scan de l'image ou le désactive
     * @returns {undefined}
     */
     scanner: function (doIt) {
        if (!camera.video)
            return false;
        var start = true;
        if (doIt === false)
            start = false;
        if (scan === true && doIt === undefined)
            start = false;
        if (start) { // démarrage du scan
            // on se met en mode affichage
            QCMeditors.unloadCKEDITOR();
            utils.montrerPasteUrl(false);
            QCMeditors.toggleCacheQuestions(true);
            document.getElementById("btna").src = "css/img/32px/scan-marker-stop.png";
            users.afficheReponses(false); //on enlève l'affichage des réponses.
            // on cache les menus
            utils.animeMenu("up");
            utils.setChrono();
            utils.startChrono();
        } else {
            //scan = false; on arrête de scanner
            if(scan) // on ne baisse que si en haut
                utils.animeMenu("down");
            document.getElementById("btna").src = "css/img/32px/scan-marker.png";
            this.canvas.style.opacity = '0.5';
            clearInterval(camera.interval);
            answers.compteValeurs();
            if(utils.intervalChrono){
                clearInterval(utils.intervalChrono);
                utils.intervalChrono = null;
            }
        }
    },
    /*
     * relance le scan des images à chaque rafraichissement
     * @returns {undefined}
     */
    tick: function () {
        if (!camera.video) return false;
        var ok = false;
        if (QCMeditors.animation === true)
            return false;
        if (camera.video.readyState === 4) {
            if (camera.videoReady === false && camera.video.videoWidth > 0) {
                camera.videoReady = true;
                camera.canvas.width = parseInt(camera.video.videoWidth);
                camera.canvas.height = parseInt(camera.video.videoHeight);
                camera.canvas.style.width = 320 + "px";
                // mise à l'échelle de la hauteur en fonction du format de la vidéo
                var hauteurImage = Math.round(320 * parseInt(camera.video.videoHeight) / parseInt(camera.video.videoWidth));
                camera.canvas.style.height = hauteurImage + "px";
                // on ajuste l'affichage de la liste des participants
                document.getElementById("conteneureleves").style.marginTop = (hauteurImage - 110) + "px";
                if (camera.videoSources.length > 1) {
                    // on affiche le bouton permettant de changer de caméra
                    document.getElementById("btnchangecamera").className = "";
                    document.getElementById("btnportable").className = "cache";
                }
            }
            if (camera.canvas.width > 0) {
                //snapshot
                // copie l'image venant de la caméra dans le canvas d'affichage.
                camera.context.drawImage(camera.video, 0, 0, camera.canvas.width, camera.canvas.height);
                ok = true;
            }
        }
        if (scan && ok) {
            // var imageData ici permet d'optimiser la mémoire (la variable est nouvellement déclarée à chaque fois)
            var imageData = camera.context.getImageData(0, 0, camera.canvas.width, camera.canvas.height);
            var markers = detector.detect(imageData);
            camera.drawMarkers(markers);
        }
        //requestAnimationFrame(camera.tick);
        setTimeout(camera.tick,83);
    },
    /*
     * drawMarkers : dessine le contour des marqueurs
     * @param {Array} markers : tableau des marqueurs trouvés dans l'image.
     * @return : nothing
     */
    drawMarkers: function (markers) {
        var corners, corner, i, j, x, y, xmax, ymax;
        this.context.strokeStyle = "red";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        for (i = 0; i !== markers.length; ++i) {
            answers.affecte(corres[markers[i].id], camera.derterminateResponse(markers[i].corners));
            corners = markers[i].corners;
            x = Infinity;
            y = Infinity;
            xmax = -Infinity;
            ymax = -Infinity;
            this.context.beginPath();
            this.context.moveTo(corners[0].x, corners[0].y);
            this.context.lineWidth = 3;
            this.context.fillStyle = "rgba(0,0,5,0.6)";
            for (j = 0; j < 4; j++) {
                corner = corners[(j + 1) % 4];
                this.context.lineTo(corner.x, corner.y);
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
                xmax = Math.max(xmax, corner.x);
                ymax = Math.max(ymax, corner.y);
            }
            this.context.closePath();
            this.context.stroke();
            this.context.fill();
            // id du marker
            this.context.fillStyle = "white";
            this.context.lineWidth = 1;
            this.context.font = Math.max((ymax - y) / 2) + "px Arial"; // defaut : 25 px
            if (corres[markers[i].id] !== undefined)
                this.context.fillText(corres[markers[i].id], (x + xmax) / 2, (y + ymax) / 2);
            else
                this.context.fillText("# " + markers[i].id + " #", (x + xmax) / 2, (y + ymax) / 2);
        }
        answers.updateVotes();
    },
    /*
     * Détecte et démarre l'affichage de la camera reliée à l'ordinateur
     * @returns {undefined}
     */
    start: function () {
        utils.setterFullHD(false);
        if (camera.videoSources.length === 0) {
            this.detect();
            return;
        }
        var videoSource = camera.videoSources[camera.selectedSource][0]; //deviceId de la camera sélectionnée.
        if (!camera.video) { // pas de video affichée, on lance la machine
            camera.video = document.getElementById("video");
            if (window.stream) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            var constraints = {
                video: {
                    width: {
                        min: 640,
                        ideal: camera.resol
                    },
                    deviceId: videoSource ? {
                        exact: videoSource
                    } : undefined
                }
            };
            camera.video.onerror = function () {
                if (camera.videoSources.length > 1) {
                    console.log("Erreur de lancement de la vidéo");
                    // on affiche le bouton permettant de changer de caméra
                    document.getElementById("btnchangecamera").className = "";
                    document.getElementById("btnportable").className = "cache";
                }
            };
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                    // on cache le div d'info sur les caméras détectées
                    document.getElementById("cameras-list").className = "cache";
                    window.stream = stream;
                    if ("srcObject" in camera.video) {
                        camera.video.srcObject = stream;
                    } else {
                        camera.video.src = window.URL.createObjectURL(stream);
                    }
                    camera.canvas.style.opacity = '0.5';
                    document.getElementById('commandeslive').className = "";
                    document.getElementById("editionQuestions").className = "cache";
                    document.getElementById("btng").style.opacity = 1;
                    QCMeditors.removeStyle(QCMeditors.qFocusOn);
                    camera.tick();
                    // au cas où on aurait branché une nouvelle caméra
                    return navigator.mediaDevices.enumerateDevices();
                })
                .catch(function (err) {
                    console.log(err.name + ": " + err.message);
                    if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
                        //required track is missing 
                    } else if (err.name == "NotReadableError" || err.name == "TrackStartError") {
                        //webcam or mic are already in use 
                    } else if (err.name == "OverconstrainedError" || err.name == "ConstraintNotSatisfiedError") {
                        //constraints can not be satisfied by avb. devices 
                    } else if (err.name == "NotAllowedError" || err.name == "PermissionDeniedError") {
                        //permission denied in browser 
                    } else if (err.name == "TypeError" || err.name == "TypeError") {
                        //empty constraints object 
                    } else {
                        //other errors 
                    }
                });
        } else { // la vidéo était affichée, on coupe le jus
            document.getElementById("conteneureleves").style.marginTop = "";
            this.scanner(false);
            camera.videoReady = false;
            if (window.stream) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            if (camera.video.srcObject.active)
                camera.video.srcObject.getTracks()[0].stop();
            camera.video = null;
            camera.canvas.width = 0;
            camera.canvas.height = 0;
            camera.canvas.style.height = null;
            camera.canvas.style.width = null;
            if (camera.videoSources.length > 1) {
                document.getElementById("btnchangecamera").className = "cache";
                document.getElementById("btnportable").className = "";
            }
        }
    },
    /*
     * affiche l'erreur rencontrée passée en paramètre
     */
    handleError: function (error) {
        console.log('navigator.getUserMedia error: ', error);
    },
    /*
     * détecte les caméras et lance la suite.
     */
    detect: function () {
        navigator.mediaDevices.enumerateDevices().then(camera.gotVideoDevices).catch(camera.handleError);
    },
    /*
     * Affiche les messages en fonction des caméras détectéelse et sélectionne la première de la liste ou celle gardée en mémoire.
     * @param (Object) deviceInfos
     */
    gotVideoDevices: function (deviceInfos) {
        // Handles being called several times to update labels. Preserve values.
        camera.videoSources = [];
        for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === 'videoinput') {
                var leLabel = deviceInfo.label || "camera " + (camera.videoSources.length + 1);
                camera.videoSources.push([deviceInfo.deviceId, leLabel]);
            }
        }
        var divcameras = document.getElementById("cameras-list");
        if (camera.videoSources.length === 1) {
            camera.selectedSource = 0;
            divcameras.innerHTML = QCMCam.lang[lang].messages.onedetectedcam;
            divcameras.className = 'gris';
            if (utils.storageAvailable('localStorage')) { // on stocke les données localement pour les retrouver à la prochaine ouverture de page
                localStorage.camera = camera.selectedSource;
            }
        } else if (camera.videoSources.length === 0) {
            divcameras.innerHTML = QCMCam.lang[lang].messages.nocamdetected;
            divcameras.className = 'yellow';
            if (utils.storageAvailable('localStorage')) { // on stocke les données localement pour les retrouver à la prochaine ouverture de page
                delete localStorage.camera;
            }
        } else {
            if (localStorage.camera === undefined) {
                camera.selectedSource = 1; // 2e camera.
            }
            divcameras.className = 'gris';
            divcameras.innerHTML = QCMCam.lang[lang].messages.manycam;
            for (i = 0; i < camera.videoSources.length; i++) {
                divcameras.innerHTML += " <input type='radio' name='cameraRadio' onClick='camera.selectedSource=" + i + ";' value='" + (i + 1) + "' title='" + camera.videoSources[i][1] + "' " + ((camera.selectedSource === i) ? "checked" : "") + "> " + (i + 1);
            }
        }
    },
    /*
     * change de caméra s'il y en a eu plusieurs détectées
     */
    change: function () {
        if (camera.videoSources.length === 1)
            return false; //pas la peine de faire quoique ce soit, si une seule caméra
        this.start(); //arrête la vidéo
        if (camera.videoSources.length > 1) {
            camera.selectedSource = (camera.selectedSource + 1) % camera.videoSources.length;
        }
        if (utils.storageAvailable('localStorage')) { // on stocke les données localement pour les retrouver à la prochaine ouverture de page
            localStorage.camera = camera.selectedSource;
        }
        this.start(); //relance la vidéo
    },
    /*
     * détermine la réponse apportée par la direction(dir) du marker et des coordonnées
     * des coins du marker (vertex)
     * @param (Array) corners : tableau contenant les coordonnées d'un carré corners[i].x et .y
     */
    derterminateResponse: function (corners) {
        var reponse;
        var dx = corners[0].x - corners[2].x,
            dy = corners[0].y - corners[2].y;
        if (dx > 0) {
            if (dy > 0) {
                reponse = "C";
            } else if (dy < 0) {
                reponse = "D";
            }
        } else if (dx < 0) {
            if (dy > 0) {
                reponse = "B";
            } else if (dy < 0) {
                reponse = "A";
            }
        }
        return reponse;
    },
    /*
     * détermine la taille du marqueur en fonction de son vertex en calculant sa largeur et sa longueur
     * @return (Boolean)
     */
    determinateSize: function (vertex) {
        var lcarre = vertex[0][0] * vertex[0][0] - vertex[1][0] * vertex[1][0] + vertex[0][1] * vertex[0][1] - vertex[1][1] * vertex[1][1];
        var Lcarre = vertex[0][0] * vertex[0][0] - vertex[3][0] * vertex[3][0] + vertex[0][1] * vertex[0][1] - vertex[3][1] * vertex[3][1];
        // si l'un des côtés est inférieur à 10 px, on signale une erreur
        if (lcarre < 100 || Lcarre < 100)
            return false;
        else
            return true;
    }
};
/*
 * Objet comportant toutes les fonctions et variables de communication
 * pour un usage avec un smartphone
 */
var comm = {
    /*
     * variables
     */
    sessionId:null,
    interval: null,
    peer: null,
    peerId: false,
    peerConnexion: null,
    intervalSession: null,
    httprelayChannel:null,
    // cache des commandes reçues, pour éviter de les traiter plusieurs fois.
    cache: [],
    httprelayReceive : function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var datas = JSON.parse(this.responseText);
        }
        };
        xhttp.open("GET", "http://httprelay.io/link/"+comm.httprelayChannel1, true);
        xhttp.send();
    },
    httprelayPost : function(data){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            this.responseText;
        }
        };
        xhttp.open("POST", "http://httprelay.io/link/"+comm.httprelayChannel2, true);
        http.setRequestHeader('Content-type', 'text/plain');
        xhttp.send();
    },
    /*
     * Récupère un fichier txt depuis une url pour en récupérer le numéro de fichier d'échange
     *
     */
    loadSession: function () {
        if (location.href.indexOf("file:") > -1) {
            alert('Fonctionnement immpossible sans serveur web.');
            return false;
        }
        // on ne peut pas travailler sans avoir chargé une classe
        if (users.eleves.effectif === undefined) {
            alert(QCMCam.lang[lang].messages.groupneeded);
            return false;
        }
        if (nbQ === 1) {
            var rep = confirm(QCMCam.lang[lang].messages.confirmbeforestart);
            if (!rep)
                return false;
        }
        // si une session existe déjà, on la reprend
        if (comm.sessionId !== null) {
            this.deporterScan();
            return;
        }
        if (!usePeerJs) {
            this.loadSessionPhp();
        } else {
            // tentative de connexion WEBRTC (utilise peer.js), connexion directe entre navigateurs.
            // https://peerjs.com/docs.html#start
            comm.peer = new Peer();
            comm.peer.on('open', function (id) {
                comm.peerId = id;
                comm.showQRCode(comm.peerId);
                comm.peer.on('connection', function (conn) {
                    document.getElementById("btnportable").className = "cache";
                    document.getElementById("btnstopportable").className = "";
                    comm.peerConnexion = conn;
                    comm.peerConnexion.on('data', function (data) {
                        // usage des datas reçus
                        // premier envoi : confirmation et envoi des infos de based
                        if (data.connexion === "paired") {
                            document.getElementById("cameras-list").innerHTML = QCMCam.lang[lang].messages.connexionestablished;
                             //+' '+data.mypeer+' <button onclick="comm.stopPeer();">stop</button>'
                            // confirmation de la connexion, on envoi les premiers datas
                            var datas = comm.initialDatas();
                            if (document.getElementById('qrious').className === "montre") {
                                document.getElementById('qrious').className = "cache";
                                //document.getElementById("lienqr").innerHTML = "";
                            }
                            // on enlève le cache gris des question si présent
                            QCMeditors.toggleCacheQuestions(true);
                            comm.peerConnexion.send(datas);
                            //console.log(datas);
                        }
                        // lecture des données...
                        comm.traiteJSON(data);
                        //console.log(data);
                    });
                    var checkState = function () {
                        var json = comm.updateState();
                        answers.tests(false);
                        if (!utils.isEmpty(json)) {
                            //console.log(json);
                            comm.peerConnexion.send(json);
                        }
                    };
                    comm.interval = setInterval(checkState, 1633);
                });
            });
            comm.peer.on('error', function (err) {
                // peer = undefined;
                // en cas d'impossibilité d'utiliser peerjs, on utilise ajax
                if (err === "browser-incompatible") {
                    this.loadSessionPhp();
                } else {
                    var infoBox = document.getElementById('cameras-list');
                    infoBox.innerHTML = 'Erreur de connexion peerJS : ' + err;
                }
            });
            comm.peer.on('disconnected', function () {
                var infoBox = document.getElementById('cameras-list');
                infoBox.innerHTML = QCMCam.lang[lang].messages.deconnectionSmartphone;
                if (comm.interval)
                    clearInterval(comm.interval);
                if (comm.peerId !== false) {
                    console.log("Déconnexion, tentative de reconnexion");
                    comm.peer.id = comm.peerId;
                    comm.peer._lastServerId = comm.peerId;
                    comm.peer.reconnect();
                }
            });
            comm.peer.on('close', function () {
                if (comm.interval)
                    clearInterval(comm.interval);
                comm.peerId = false;
                comm.peerConnexion = null;
                document.getElementById("cameras-list").innerHTML = QCMCam.lang[lang].messages.connexionclosed;
            });
        }
    },
    loadSessionPhp: function () {
        var reader = new XMLHttpRequest();
        reader.onload = function () {
            var rep = JSON.parse(reader.responseText);
            if (rep.connexion === "failed") {
                document.getElementById("lienqr").innerHTML = "<span class='text-red'>" + QCMCam.lang[lang].messages.connexionfailed + "</span>";
                return false;
            }
            comm.sessionId = rep.id;
            document.getElementById("btnportable").className = "cache";
            document.getElementById("btnstopportable").className = "";
            comm.deporterScan();
        };
        reader.open("get", "sessionapp.php", true);
        reader.send();
    },
    /*
      stopPeer:function(){
        if(comm.peerId !== false){
          comm.peerConnexion.send({commande:"stop"});
          comm.peer.destroy();
        }
      },*/
    deporterScan: function () {
        var datas = this.initialDatas();
        // si pas possible d'utiliser peerjs
        var reader = new XMLHttpRequest();
        reader.onload = function () {
            return true;
        };
        reader.open("get", "sessionapp.php?s=" + comm.sessionId + "&json=" + JSON.stringify(datas), true);
        reader.send();
        this.showQRCode();
        // on lance un appel répété de la lecture du fichier de session toutes les 3 secondes;
        if (comm.sessionId && !comm.intervalSession) {
            comm.intervalSession = setTimeout(comm.getSessionData, 2333);
        }
    },
    showQRCode: function (peerId) {
        if (peerId === undefined) peerId = false;
        // comm.sessionId est le numéro de session disponible sur le serveur, il servira ensuite pour tous les échanges jusqu'au prochain rechargement de la page principale de qcmcam.
        // on affiche le qrcode à lire avec le smartphone
        //var urlappli = window.location.protocol + "//" + window.location.host + window.location.pathname.slice(0, -10) + ((window.location.port !== "") ? ":" + window.location.port : "");
        //var url = urlappli + "p.html?s=" + comm.sessionId;
        //if(peerId !== false) url += "&p="+peerId;
        // Affichage du QRCode (c)
        document.getElementById('qrious').className = "montre";
        document.getElementById('qrious').setAttribute('onClick', "window.open('app/index.html?" + ((peerId)?"p=" + peerId:"s="+comm.sessionId)+"')", 'testsmartphone');
        var lieu = window.location.href;
        var indexIndex = lieu.indexOf('index.html');
        var qr = new QRious({
            element: document.getElementById('qrious'),
            size: 200,
            value: ((indexIndex<0)?lieu:lieu.substring(0,indexIndex)) + "app/index.html?" + ((peerId)?"p=" + peerId:"s="+comm.sessionId)
        });
    },
    initialDatas: function () {
        // on envoie la liste des numéros d'id d'élèves, le nombre de questions et la question en cours.
        var ids = {},
            reponses = {};
        for (var i in users.eleves) {
            if (i !== "effectif") {
                ids[i] = i;
                if (datas[i] !== undefined) {
                    reponses[i] = datas[i];
                }
            }
        }
        return {
            ids: ids,
            reps: qreponses,
            nbq: nbQ,
            qFocusOn: QCMeditors.qFocusOn,
            reponses: reponses
        };
    },
    stopSession: function () {
        if (comm.peerId !== false) {
            comm.peerConnexion.send({
                commande: "stop"
            });
            comm.peer.destroy();
        } else {
            stopSessionRequest = true;
        }
        document.getElementById("btnportable").className = "";
        document.getElementById("btnstopportable").className = "cache";
    },
    updateState: function () {
        var json = {};
        if (usersChangeDetected) {
            json.ids = {};
            for (var i in users.eleves) {
                if (i !== "effectif") {
                    json.ids[i] = i;
                }
            }
            usersChangeDetected = false;
            wait.updateClasse = true;
        }
        if (changeQuestionFocus) {
            json.qFocusOn = QCMeditors.qFocusOn;
            changeQuestionFocus = false;
            if (reponseAction !== "nexted")
                wait.nexted = true;
        }
        if (changeNombreQuestions) {
            json.nbq = nbQ;
            changeNombreQuestions = false;
            wait.addQuestion = true;
        }
        if (reponsesChangeDetected) {
            json.reps = qreponses;
            reponsesChangeDetected = false;
        }
        if (reponseAction !== undefined) {
            json.ok = reponseAction;
            reponseAction = undefined;
        }
        if (stopSessionRequest) {
            json.stopSession = true;
        }
        return json;
    },
    // lecture des infos mises à jour par le smartphone
    // ajax mode
    getSessionData: function () {
        var json = comm.updateState();
        var reader = new XMLHttpRequest();
        reader.onload = function () {
            if (reader.responseText !== "") {
                // on sépare les lignes de réponse
                var lignesjson = reader.responseText.split("\n");
                for (var i = 0; i < lignesjson.length; i++) {
                    if (lignesjson[i] !== "") {
                        comm.traiteJSON(lignesjson[i]);
                    }
                }
            }
            // en cas de demande d'arrêt de la session on arrête l'échange de données avec le serveur
            if (stopSessionRequest) {
                stopSessionRequest = false;
                comm.intervalSession = null;
                return;
            }
            comm.intervalSession = setTimeout(comm.getSessionData, 2333);
        };
        reader.open("get", "sessionapp.php?s=" + comm.sessionId + "&json=" + JSON.stringify(json), true);
        reader.send();
    },
    /*
     * analyse la chaine json récupérée par l'autre dispositif
     */
    traiteJSON: function (json) {
        if (typeof json === "string") {
            json = JSON.parse(json);
        }
        if (comm.peerConnexion) {
            comm.peerConnexion.send({
                "received": json.date
            });
        }
        if (json.ok === "received") {
            if (document.getElementById('qrious').className === "montre") {
                document.getElementById('qrious').className = "cache";
                document.getElementById("lienqr").innerHTML = "";
            }
        }
        // on empêche la récupération de données si il y a eu un chamgement qui implique une réinitialisation des datas.
        if (json.nexted !== undefined) {
            wait.nexted = false;
        }
        if (json.chgQuestion !== undefined) {
            wait.chgQuestion = false;
        }
        if (json.updateClasse !== undefined) {
            wait.updateClasse = false;
        }
        // si on attend la réponse d'un changement envoyé au dispositif, on ne récupère surtout pas les données de réponse
        if (wait.nexted || wait.chgQuestion || wait.updateClasse) {
            delete json.datas;
        }
        this.setReponses(json);
    },
    // Mise à jour des réponses après réception des données du smartphone
    // @param (String) lesDatas : json
    setReponses: function (lesDatas) {
        var dataUpdated = false;
        var alreadyReceived = false;
        var now = Date.now();
        for (var i in lesDatas.dataR) {
            if (lesDatas.dataR[i] === undefined || lesDatas.dataR[i] === "") continue;
            if (datas[Number(i)] === undefined) {
                if (!reponseSimple) {
                    datas[Number(i)] = {
                        vote: [],
                        nbvotes: 0
                    };
                } else {
                    datas[Number(i)] = {
                        vote: "",
                        nbvotes: 0
                    };
                }
            }
            datas[Number(i)].vues = answers.vuesMin + 5;
            answers.affecte(Number(i), lesDatas.dataR[i]);
            dataUpdated = true;
        }
        if (dataUpdated) {
            answers.updateVotes();
            answers.compteValeurs();
        }
        if (lesDatas.action !== undefined) {
            // vérification de la réception ou non de la commande envoyée
            // si déjà reçue, on renvoie juste le signal de bonne réception
            if(lesDatas.date !== undefined) // cas de la comm par peerconnexion
                if (comm.cache.indexOf(lesDatas.date) > -1) {
                    alreadyReceived = true;
                } else {
                    comm.cache.push(lesDatas.date);
                }
            if(lesDatas.action === "startscan"){
                // on enlève le cache gris des question si présent
                QCMeditors.toggleCacheQuestions(true);
                reponseAction = "scanstarted";
            } else if (lesDatas.action === "end") {
                reponseAction = "ended";
                return true;
            } else if (lesDatas.action === "next") {
                if (!alreadyReceived) {
                    QCMeditors.nextQ();
                    users.afficheReponses(false);
                }
                reponseAction = "nexted";
            } else if (lesDatas.action === "stats") {
                if (!alreadyReceived)
                    users.afficheReponses();
                reponseAction = "statsed";
            } else if (lesDatas.action === "correct") {
                if (!alreadyReceived)
                    answers.giveGoodAnswer();
                reponseAction = "corrected";
            } else if (lesDatas.action === "reset") {
                if (!alreadyReceived)
                    answers.initAll(false);
                reponseAction = "reseted";
            } else if (lesDatas.action.indexOf("alea") > -1) {
                var what = lesDatas.action.substring(4);
                var trueFalse;
                if (what === "true") trueFalse = true;
                else if (what === "false") trueFalse = false;
                if (!alreadyReceived)
                    users.alea(trueFalse);
                reponseAction = "aleaed";
            } else if (["A", "B", "C", "D"].indexOf(lesDatas.action) > -1 || Array.isArray(lesDatas.action)) {
                answers.setGoodAnswer(lesDatas.action, false);//false indique de ne pas envoyer de message pour ce changement
            }
        }
    }
};
/**
 * Creation de groupes de travail
 */
class groupe {
    /**
     * 
     * @param {object} liste objet contenant les participants à répartir dans des groupes {clé:nom}
     */
    constructor(liste){
        this.liste = liste;
        this.isoles = {};
        this.effectif = liste.effectif;
        this.roles = [];
        this.ignore = 0;
        this.nbpergroup = 4;
        this.nbgroups = this.calcnbgroups(4);
        this.editedValue = "nbpergroup"; // other value : nbgroups
        //uncheck all rôles
        this.checkAllRoles(false);
    }
    /**
     * check or uncheck all roles
     * @param {boolean} bool
     */
    checkAllRoles(bool){
        let listeRoles = ["time","speak", "ideas","calm","instr","material", "all"];
        if(!bool) this.roles = [];
        else this.roles = ["T","P","I","S","C","M"];
        for(let i=0,len=listeRoles.length;i<len;i++){
            document.getElementById("resp-"+listeRoles[i]).checked = bool;
        }
    }
    /**
     * hide or show block users
     */
    show(){
        if(document.getElementById("initial-group").className === ""){
            document.getElementById("initial-group").className = "cache";
            document.getElementById("isolated-users").className = "cache";
        } else {
            document.getElementById("initial-group").className = "";
            document.getElementById("isolated-users").className = "";
        }
    }
    showScore(){
        let spans = document.querySelectorAll("#group-manager span[data-score='1']");
        let classname = "cache";
        if(!spans.length) return;
        if(spans[0].className === "cache"){
            classname = "";
        }
        for(let i=0,len=spans.length;i<len;i++){
            spans[i].className = classname;
        }
    }
    /**
     * affiche la liste et les isolés
     */
    display(){
        let initial = document.getElementById("initial-group");
        initial.innerHTML = "";
        let isolated = document.getElementById("isolated-users");
        isolated.innerHTML = "";
        this.effectif = 0;
        this.ignore = 0;
        this.ids = [];
        for(let i in this.liste){
            if(isNaN(i)) continue;// avoid effectif
            if(this.isoles[i] === undefined){
                this.ids.push(i);
                initial.appendChild(this.createDomElement(i,"out"));
                this.effectif++;
            } else {
                isolated.appendChild(this.createDomElement(i,"in"));
                this.ignore++;
            }
        }
        document.getElementById("repartir").innerHTML = this.effectif;
        document.getElementById("ignorer").innerHTML = this.ignore;
        if(this.editedValue === "nbpergroup")
            this.calcnbgroups(this.nbpergroup);
        else
            this.calcnbpergroup(this.nbgroups);
    }
    createDomElement(userId,action){
        let div = document.createElement("div");
        div.className = "groupUser";
        div.dataset.id = userId;
        let span = document.createElement("span");
        span.innerHTML = userId;
        span.className = "numero";
        div.appendChild(span);
        div.appendChild(document.createTextNode(this.liste[userId]));
        if(!isNaN(answers.scores[userId])){
            let span = document.createElement("span");
            span.className = "cache";
            span.dataset.score = "1";
            span.innerHTML ="("+answers.scores[userId]+")";
            div.appendChild(span);
        }
        if(action ==="out" )
            div.addEventListener("click",function(evt){users.workgroup.isolate(this.dataset.id)});
        else if(action ==="in")
            div.addEventListener("click",function(evt){users.workgroup.unisolate(this.dataset.id)});
        else if(action !== ""){
            // chaine de codes de groupe
            let associtions = {"T":"bleu","P":"violet","I":"orange","S":"vert","C":"rouge","M":"azur"};
            for(let i=0,len=action.length;i<len;i++){
                let span = document.createElement("span");
                span.className = associtions[action[i]];
                span.textContent = action[i];
                div.appendChild(span);
            }
        }
        return div;
    }
    isolate(id){
        this.isoles[id] = this.liste[id];
        this.display();
    }
    unisolate(id){
        delete this.isoles[id];
        this.display();
    }
    calcnbgroups(value){
        this.editedValue = "nbpergroup";
        this.nbpergroup = value;
        this.nbgroups = Math.ceil(this.effectif/value);
        document.getElementById("nb-groups").value = this.nbgroups;
    }
    calcnbpergroup(value){
        this.editedValue = "nbgroups";
        this.nbgroups = value;
        this.nbpergroup = Math.ceil(this.effectif/value);
        document.getElementById("nb-per-group").value = this.nbpergroup;
    }
    setRole(value,bool){
        if(bool){
            this.roles.push(value);
        } else {
            this.roles.splice(this.roles.indexOf(value),1);
        }
    }
    /**
     * Crée des groupes répartis de manière aléatoire
     */
    alea(){
        // mélange des ids
        this.ids = utils.shuffle(this.ids);
        this.groups = [];
        // création des groupes
        for(let i=0;i<this.nbgroups;i++){
            this.groups.push([]);
        }
        for(let i=0,len=this.ids.length;i<len;i++){
            // distribution alternative dans chaque groupe
            const j=i%this.nbgroups;
            this.groups[j].push(this.ids[i]);
        }
        // affichage des groupes
        this.displayGroups();
    }
    /**
     * Crée des groupes hétérogènes
     * pas très efficace, à revoir
     */
    hetero(){
        if(utils.isEmpty(qdatas)){
            alert("Pas de score pour répartir les élèves");
            return false;
        } else {
            let tables = {};
            let values = [];
            for(let i in answers.scores){
                if(isNaN(answers.scores[i]) || this.ids.indexOf(i)<0) continue;
                let score = answers.scores[i];
                if(tables[score] === undefined){
                    tables[score] = [];
                    values.push(score);
                }
                tables[score].push(i);
            }
            values.sort(); // rangement des valeurs dans l'ordre croissant
            this.ids = [];
            for(let i=0;i<values.length;i++){
                tables[values[i]]= utils.shuffle(tables[values[i]]);
                this.ids = this.ids.concat(tables[values[i]]);
            }
            this.groups = [];
            // création des groupes
            for(let i=0;i<this.nbgroups;i++){
                this.groups.push([]);
            }
            for(let i=0,len=this.ids.length;i<len;i++){
                // distribution alternative dans chaque groupe
                const j=i%this.nbgroups;
                this.groups[j].push(this.ids[i]);
            }
            // affichage des groupes
            this.displayGroups();
        }
    }
    /**
     * Crée des groupes "homogènes"
     */
    homo(){
        if(utils.isEmpty(qdatas)){
            alert("Pas de score pour répartir les élèves");
            return false;
        } else {
            let tables = {};
            let values = [];
            for(let i in answers.scores){
                if(isNaN(answers.scores[i]) || this.ids.indexOf(i)<0) continue;
                let score = answers.scores[i]
                if(tables[score] === undefined){
                    tables[score] = [];
                    values.push(score);
                }
                tables[score].push(i);
            }
            values.sort();
            this.ids = [];
            for(let i=0;i<values.length;i++){
                tables[values[i]]= utils.shuffle(tables[values[i]]);
                this.ids = this.ids.concat(tables[values[i]]);
            }
            this.groups = [];
            // création des groupes
            for(let i=0;i<this.nbgroups;i++){
                this.groups.push([]);
            }
            for(let i=0,len=this.ids.length;i<len;i++){
                // remplissage de chaque groupe jusqu'à plein. => pb pour le dernier groupe.
                const j=Math.floor(i/this.nbpergroup);
                this.groups[j].push(this.ids[i]);
            }
            // affichage des groupes
            this.displayGroups();
        }
    }
    /**
     * Affiche les groupes créés
     */
    displayGroups(){
        let dest = document.getElementById("resulted-groups");
        dest.innerHTML = "";
        for(let i=0,len=this.groups.length;i<len;i++){
            let fieldset = document.createElement("fieldset");
            let legend = document.createElement("legend");
            legend.innerHTML = "Groupe "+(i+1);
            fieldset.appendChild(legend);
            for(let j=0,len2=this.groups[i].length;j<len2;j++){
                fieldset.appendChild(this.createDomElement(this.groups[i][j],this.giveRole(j,len2)));
            }
            dest.appendChild(fieldset);
        }
    }
    /**
     * Crée un groupe de la taille passée en paramètre
     */
    createOneGroup(eff){
        if(!isNaN(eff)){
            // mélange des ids
            this.ids = utils.shuffle(this.ids);
            // création d'un groupe
            this.groups = [[]];
            for(let i=0;i<eff;i++){
                // Affectation des n premiers éléments dans le groupe
                this.groups[0].push(this.ids[i]);
            }
            // affichage des groupes
            this.displayGroups();
        }
    }
    /**
     * Vide les groupes
     */
    emptyGroups(){
        this.groups = [];
        this.displayGroups();
    }
    /**
     * donne un ou des rôles à l'utilisateur en fonction de sa place et de la taille du groupe
     * @param {integer} index place dans le groupe
     * @param {integer} taille taille du groupe
     */
    giveRole(index,taille){
        let nbRoles = this.roles.length;
        if(taille>=nbRoles){ // il y a assez d'utilisateurs pour le nb de rôles prévus
            if(this.roles[index] !== undefined)
                return this.roles[index];
            else return "";
        } else { // il y a moins d'utilisateurs que de rôles prévus, on donne plusieurs rôles.
            let chaine ="";
            for(let i=index;i<nbRoles;i=i+taille){
                chaine += this.roles[i];
            }
            return chaine;
        }
    }
}
/*
 * créations initiales au chargement de la page web.
 * @returns {undefined}
 */
function onLoad() {
    let timestamps = {182:0,183:0};
    function preventDouble(code){
        let now = Date.now();
        if(timestamps[code] > now - 300){
            return false;
        } else {
            timestamps[code] = now;
        }
        if(code === 182){
            answers.giveGoodAnswer();
            return false;
        } else if(code === 183){
            users.afficheReponses();
            return false;
        }
    }
    document.getElementById("temps").value = "00:00";
    liendirect = location.href.indexOf("?");
    if (liendirect > 0) {
        var paramsLien = utils.getUrlVars();
        if (paramsLien.lang !== undefined) {
            //change la langue
            lang = paramsLien.lang;
            QCMCam.lang.translate();
        }
        if (paramsLien.url !== undefined) {
            QCMeditors.loadFile(location.href.substring(location.href.indexOf("url=")+4));
        }
        /*else {
                 console.log(paramsLien);
             }*/
    } else if (utils.storageAvailable('localStorage')) {
        if (localStorage.lastQ !== undefined && localStorage.lastQ !== "{}") {
            utils.class('btnrq', "");
        }
    }
    // on récupère le numéro de la caméra sélectionnée la dernière fois.
    if (utils.storageAvailable('localStorage')) {
        if (localStorage.camera > -1)
            camera.selectedSource = localStorage.camera;
    }
    if (location.href.indexOf("file:") > -1) {
        document.getElementById("btnportable").className = "cache";
    }
    users.firstImport();
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
    camera.detect();
    detector = new AR.Detector();
    camera.canvas = document.getElementById("surcouche");
    camera.context = camera.canvas.getContext("2d");
    //video = document.getElementById('video');
    answers.canvas = document.getElementById("colonnes");
    answers.contextInit();
    if (liendirect < 0 && lang !== "fr") {
        QCMCam.lang.translate();
    }
    if(liendirect < 0){
        QCMeditors.loadCKEDITOR();
    }
    setTimeout(utils.lancerReveal, 1000);
    // détection des touches ou télécommande
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        // commandes avec les touches
        // uniquement en condition de présentation. (éditeur non ouvert)
    if(QCMeditors.editable === false){
        switch (evt.key) {
            case "Up": // specific IEE/Edge
            case "ArrowUp": // up arrow
                QCMeditors.nextQ();
                break;
            case "Down": // specific IEE/Edge
            case "ArrowDown": // down arrow
                QCMeditors.prevQ();
                break;
            case "Left": // specific IEE/Edge
            case "ArrowLeft": // left arrow
                QCMeditors.prevQ();
                break;
            case "Right": // specific IEE/Edge
            case "ArrowRight": // right arrow
                QCMeditors.nextQ();
                break;
            case "PageDown": // Page down || commande laser left
                QCMeditors.prevQ();
                break;
            case "PageUp": // pages up || commande laser right
                QCMeditors.nextQ();
                break;
            case "Period": // : = Period || commande laser ecran
                users.afficheReponses();
                break;
            case "Esc": // specific IEE/Edge
            case "Escape": // escape || commande laser play
                camera.scanner();
                break;
            case "Tab" : // Tab || commande laser ?
                camera.scanner();
                break;
            case "AudioVolumeUp": // VolumeUp || commande laser
                preventDouble(183);
                break;
            case "AudioVolumeDown": // VolumeDown || commande laser
                preventDouble(182);
                break;
            case "F6":// F6 :(
                camera.scanner();
            }
            evt.preventDefault();
        }
        if (evt.altKey) {
            switch (evt.key) {
                case "k": // K
                    users.alea();
                    break;
                case "s": //S
                    camera.start();
                    break;
                case "i": //I
                    utils.Infos('open');
                    break;
                case "z": //Z
                    utils.pleinEcran();
                    break;
                case "g": //G
                    QCMeditors.nextQ();
                    break;
                case "c": //C
                    camera.scanner();
                    break;
                case "v": //V
                    users.afficheReponses();
                    break;
                case "r": //R
                    answers.initAll();
                    break;
                case "x": //ALT X
                    QCMeditors.addQ();
            }
        }
    };
    document.onkeyup = function (evt) {
        if (evt.key === "$") { // code du $
            // remplace le code compris entre 2 $ par du latex
            var editor = CKEDITOR.instances["editor" + QCMeditors.qFocusOn];
            var content = editor.getData();
            if (content.split("$$").length - 1 === 2) {
                content = content.replace(/\$\$([^$]*)\$\$/i, '<span class="math-tex" data-tex="$1">$1</span> <span id="bukmrk">.</span>');
                editor.setData(content, function () {
                    var element = editor.document.getById('bukmrk');
                    var selection = editor.getSelection();
                    selection.selectElement(element);
                    //console.log(selection);
                    var range = selection.getRanges()[0];
                    range.select();
                    element.remove();
                });
            }
        }
    };
};
// Pour debug la partie déportée
//document.getElementById("lienqr").innerHTML = '<a href="' + url + '">' + comm.sessionId + '</a>';
// on cache le div d'info sur les caméras détectées
window.onload = onLoad;