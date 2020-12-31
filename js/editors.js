var qreponses = {}, stylesheets={}, myWindow, nbQ=1;
CKEDITOR.disableAutoInline = true;
var lang = navigator.language || navigator.userLanguage;
lang = lang.substring(0, 2);
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
            if (["en", "es", "fr", "de"].indexOf(lang) < 0) {
                lang = "fr";
                alert('Your language is not suported, default is french.\n\nYou can switch to Spanish, English or German\nin the bottom.\n\nOr you can help translating. See Info');
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
var utils = {
    editQuestion: true,
    /*
    * Montre ou cache le champ de copie d'url
    */
   findParentId:function(elt){
       var prt = elt.parentNode;
       while(prt.id.indexOf("editor")<0){
           prt = prt.parentNode;
       }
       return prt.id.substring(6);
   },
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
urlVerify : function(evt){
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
     * transforme un texte html en objet du DOM
     * @param (String) html : html à transformer
     */
    htmlToElement: function (html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    },
    // isEmpty, teste si un objet est vide ou pas
    // return true pour vide
    // return false sinon
    isEmpty: function (obj) {
        var x;
        for (x in obj) {
            return false;
        }
        return true;
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
            myWindow = window.open("bibliotheque.html", "QCMCamLibrary", "menubar=no,status=no,toolbar=no,scrollbars=yes");
        else if (myWindow.closed) {
            myWindow = window.open("bibliotheque.html", "QCMCamLibrary", "menubar=no,status=no,toolbar=no,scrollbars=yes");
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
        var elTex = document.querySelectorAll("#"+eltId+" .math-tex");
        for(var i=0;i<elTex.length;i++){
            var textTex = elTex[i].innerHTML;
            try{
                katex.render(utils.decodeHtmlEntity(textTex.replace("\\\(","").replace("\\\)","")), elTex[i],{
                    throwOnError: false,
                    errorColor: "#FFF"
                });
            } catch (err){
                elTex[i].innerHTML = err+" erreur de rendu avec "+textTex;
            }
        }
      },
    revertKatex:function(eltId){
        var elKtex = document.querySelectorAll("#"+eltId+" .math-tex"), Tex=null;
        for(var i = 0;i<elKtex.length;i++){
            Tex = elKtex[i].querySelector("annotation").innerHTML;
            elKtex[i].innerHTML = "\\("+Tex+"\\)";
        }
    },
    decodeHtmlEntity : function(str) {
        str = str.replace(/\&lt;/, "<");
        return str.replace(/\&gt;/, ">");
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
    setChrono:function(id){
        var temps = document.getElementById("temps"+id).value;
        if(temps !== "" && temps !== "00:00" && temps !== "00:00:00"){
            QCMeditors.times[id] = temps;
        } else {
            delete QCMeditors.times[id];
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
        document.getElementById("chronorect").style.width = "100%";
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
    showSablier:function(value, id){
        console.log(value);
        if(value === "" || !utils.convertTimeToms(value)){
            QCMeditors.times[id] = undefined;
        } else {
            QCMeditors.times[id] = value;
        }
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
        /*
     * Affiche ou cache les commandes supplémentaires pour gérer les questions/participants.
     * @param (DOMObject) appelant : element du dom pour modifier son style
     * @param (String) id : id du div à afficher
     * @returns {undefined}
     */
    toggleOptions: function (appelant, id) {
        if (this.editQuestion) {
            // on ajoute l'écouteur de copier/Coller
            QCMeditors.loadCKEDITOR();
            QCMeditors.addStyle();
            appelant.style.opacity = 0.5;
            this.editQuestion = false;
        } else {
            // on affiche à nouveau le menu de navigation si les deux menus sont fermés.
            this.editQuestion = true;
            appelant.style.opacity = 1;
            QCMeditors.unloadCKEDITOR(true);
            QCMeditors.removeStyle();
        }
    }
};
// on charge le fichier de langue pour qu'il soit dispo de suite;
QCMCam.lang.loadLang();

var QCMeditors = {
    fileJustLoaded:false,
    doRenderKatex:false,
    qFocusOn: 0,
    interval: null,
    animation: false,
    reload:[],
    checkboxes:{},
    times:[],
    getContents:function(){
        QCMeditors.loadCKEDITOR();
        var content = {};
        var nq = 0;
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
        return content;
    },
    setEditable:function(yn){
        var elts = document.querySelectorAll('#editors .question');
        for(var i=0;i<elts.length;i++){
            elts[i].contentEditable = yn;
        }
    },
    setEditableTrue:function(){
        QCMeditors.setEditable(true);
    },
    unloadCKEDITOR:function(doKatexRender,reload){
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
            document.getElementById('editors').addEventListener('click', QCMeditors.loadCKEDITOR);
            QCMeditors.fileJustLoaded = true;
        }
    },
    loadCKEDITOR:function(editor){
        if(QCMeditors.fileJustLoaded){
            document.getElementById('editors').removeEventListener('click', QCMeditors.loadCKEDITOR);
            document.getElementById('editors').removeEventListener('mouseover', QCMeditors.setEditableTrue);
            utils.revertKatex('editors');
            QCMeditors.fileJustLoaded = false;
        }
        if(typeof editor === "string"){ // car click envoi un objet evt
            if(CKEDITOR.instances[editor]===undefined){
                CKEDITOR.inline(editor);
                CKEDITOR.instances[editor].on('instanceReady', function(){QCMeditors.updateCheckAnwers(editor, editor.substring(6));});
                CKEDITOR.instances[editor].on('instanceDestroyed',function(){QCMeditors.afterDestroy(editor, editor.substring(6));});
                CKEDITOR.instances[editor].on('change',function(){QCMeditors.updateCheckAnwers(editor, editor.substring(6));});
            }
        } else {
            var i;
            var editors = document.querySelectorAll('#editors > .question');
            for (i = 0; i < editors.length; i++) {
                if(CKEDITOR.instances['editor'+i]===undefined){
                    CKEDITOR.inline(editors[i]);
                    CKEDITOR.instances['editor'+i].on('instanceReady', function(){QCMeditors.updateCheckAnwers(this.name,this.name.substring(6));});
                    CKEDITOR.instances['editor'+i].on('instanceDestroyed',function(){QCMeditors.afterDestroy(this.name);});
                    CKEDITOR.instances['editor'+i].on('change',function(){QCMeditors.updateCheckAnwers(this.name,this.name.substring(6));});
                }
            }
        }
        QCMeditors.setEditable(true);
    },
     /*
     * recrée les editeurs CKEDITOR avprès modification, insertion, etc.
     */
    reloadCKEDITOR: function () {
        //false permet de ne pas rendre le katex 2 fois.
        QCMeditors.unloadCKEDITOR(false,true);
        setTimeout(QCMeditors.loadCKEDITOR,500);
    },
    afterDestroy:function(editor){
        if(this.doRenderKatex){
            utils.renderKatex(editor);
            QCMeditors.setEditable(false);
        }
        if(this.reload.indexOf(editor)>-1){
            QCMeditors.loadCKEDITOR(editor);
            utils.removeElement(this.reload,editor);
        }
    },
    // met autant d'options check que de lignes dans la liste d'options.
    // @param (String) editorID : ID de l'éditeur concerné
    updateCheckAnwers:function(editorID, id){
        var childs = document.querySelectorAll("#"+editorID+" ol > li");
        var elt = document.getElementById('btnchck'+id);
        var lettres=["A","B","C","D"],check="", type="";
        elt.innerHTML = "";
        for(var i=0;i<Math.min(4,childs.length);i++){// max 4 valeurs
            if(qreponses[id]!== undefined && qreponses[id].indexOf(lettres[i])>-1){
                check = ' checked="checked" ';
            } else check = "";
            if(!Array.isArray(qreponses[id])) type = "radio";
            else type = "checkbox";
            elt.innerHTML += '<input type="'+type+'" name="reponse" value="'+lettres[i]+'" id="R'+lettres[i]+id+'" onclick="answers.setAnswer(this.value,this.type, '+id+');"'+check+' />'+lettres[i];
            childs[i].removeEventListener('click',QCMeditors.checkAnswer);
            childs[i].addEventListener('click',QCMeditors.checkAnswer, true);
        }
    },
    // fonction appelée par event sur la ligne d'une réponse
    // @param (Object) evt : objet evenement déclenché
    checkAnswer:function(evt){
        // check if floating image present
        var deltax=0,imgBox,objBox=evt.target.getBoundingClientRect();
        var offset = objBox.left;
        var id = utils.findParentId(evt.target);
        var imgs = document.querySelectorAll("#editor"+id+ " img");
        for (var i=0;i<imgs.length;i++){
            imgBox = imgs[i].getBoundingClientRect();
            if(imgBox.left<=offset && objBox.bottom>imgBox.top && imgBox.bottom>objBox.top){
                if(imgBox.width>deltax)
                    deltax += imgBox.width;
            }
        }
        var lettres=["A","B","C","D"];
        var x = evt.clientX;
        var value = Array.prototype.indexOf.call(evt.target.parentNode.children,evt.target);
        var checkboxradio = document.getElementById('R'+lettres[value]+id);
        if(x - deltax - offset < 28){
            checkboxradio.click();
        }
    },
    /*
     * calcule et affecte la largeur du div comtenant les editeurs de question
     */
    setAnimationWidth: function () {
        //this.setQuestionsWidth();
        this.updatenbQ();
        //document.getElementById("editors").style.width = (nbQ * 100) + "%";
       // document.getElementById("editors").style.marginLeft = (-QCMeditors.qFocusOn * 100) + "%";
    },
    /*
     * calcule le nombre de questions en fonction du nombre d'éditeurs
     */
    updatenbQ: function () {
        var elems = document.querySelectorAll('.question');
        nbQ = elems.length;
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
            var alldivs = document.querySelectorAll("#editors > .question");
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
        var elem = document.getElementById('editors');
        elem.innerHTML += QCMeditors.insertCommandes(nbQ)+'<div id="editor' + nbQ + '" contenteditable="true" class="question"><h3>Question ' + (nbQ + 1) + '&nbsp;:</h3> <ol><li>&nbsp;</li></ol></div>';
        this.setAnimationWidth();
        this.reloadCKEDITOR();
        this.myMove("last");
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
    supprQ: function (id) {
        var contents = this.getContents();
        var newcontents = {};
        delete contents[id];
        var increm = 0;
        for(var obj in contents){
            newcontents[increm] = contents[obj];
            increm++;
        }
        QCMeditors.replaceQuestions(newcontents);
    },
    insertCommandes : function(id){
        var txt = '<div id="editionQuestions'+id+'" class="editionQuestions">';
        txt += "<span class='numero'>"+(Number(id)+1)+"</span>";
        txt += '<img src="css/img/32px/if_file_add_66760.png" alt="Insérer" title="Insérer avant cette question" onclick="QCMeditors.insertQ('+id+');" data-translate=\'{"title":"questions.insertbefore"}\' />';
        txt += '<img src="css/img/32px/document-import.png" alt="Déplacer à gauche" title="Déplacer la question vers la gauche" onclick="QCMeditors.moveQLeft('+id+');" data-translate=\'{"title":"questions.movetoleft"}\' />';
        txt += '<img src="css/img/32px/document-export.png" alt="Déplacer à droite" onclick="QCMeditors.moveQRight('+id+');" title="Déplacer la question vers la droite" data-translate=\'{"title":"questions.movetoright"}\' />';
        txt += '<img src="css/img/32px/if_file_deny_66762.png" alt="Supprimer" title="Supprimer la question" onclick="QCMeditors.supprQ('+id+');" data-translate=\'{"title":"questions.deletequestion"}\' />';
        txt += '<img src="css/img/32px/if_folder_deny_66791.png" alt="Tout supprimer" title="Supprimer toutes les questions" onclick="QCMeditors.supprAllQ();" data-translate=\'{"title":"questions.deleteallquestions"}\' />';
        txt += '<label for="temps'+id+'" title="Temps pour apporter sa réponse" data-translate=\'{"title":"questions.timetoanswer"}\'>⏳</label><input type="time" value="00:00" min="00:00" step="60" id="temps'+id+'" name="temps'+id+'" title="Temps pour apporter sa réponse" data-translate=\'{"title":"questions.timetoanswer"}\' onchange="utils.showSablier(this.value,'+id+');" />';
        txt += 'Type :';
        txt += '<input type="image" id=\'btncc'+id+'\' onclick="QCMeditors.changeTypeChoice('+id+');" title="Commuter réponse simple/réponse multiple" data-translate=\'{"title":"questions.changetypechoice"}\' src="css/img/32px/onechoice.png" width="32" height="32" style="vertical-align: middle" />';
        txt += '<span data-translate=\'{"html":"questions.thegoodanswer"}\'>Bonne réponse</span> : <span id="btnchck'+id+'"><input type=\'radio\' name=\'reponse\' value="A" id=\'RA'+id+'\' onclick="answers.setAnswer(this.value,this.type,'+id+');" />A<input type="radio" id="RB'+id+'" name="reponse" value="B" onclick="answers.setAnswer(this.value,this.type,'+id+');" />B';
        txt += '<input type="radio" id="RC'+id+'" name="reponse" value="C" onclick="answers.setAnswer(this.value,this.type,'+id+');" />C<input type="radio" id="RD'+id+'" name="reponse" value="D" onclick="answers.setAnswer(this.value,this.type,'+id+');" />D</span>';
        txt += '<input type="radio" id="R0'+id+'" name="reponse" title="pas de réponse" value="0" onclick="answers.setAnswer(this.value,this.type,'+id+');" />Ø';
        txt += '</div>';
        return txt;
    },
    /*
     * insère une question à l'endroit affiché
     */
    insertQ: function (id) {
        var contents = this.getContents(), increm=0, newcontent={};
        for (var obj in contents){
            if(String(obj) === String(id)){
                newcontent[increm] = {'question':"<h3>Question "+(increm+1)+" :</h3> <ol><li>&nbsp;</li></ol>"};
                increm++;
            }
            newcontent[increm]=contents[obj];
            increm++;
        }
        console.log(newcontent);
        QCMeditors.replaceQuestions(newcontent);
    },
    /*
     * function supprAllQ : supprime toutes les questions et remet les données enregistrées à 0.
     */
    supprAllQ: function () {
        var elem = document.getElementById("editors");
        elem.innerHTML = '<div id="editor0" contenteditable="true" class="question"><h3>Question 1 :</h3> <ol><li>&nbsp;</li></ol></div>';
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
    },
    /*
     * function moveQLeft
     * Déplace la question affichée avant la questions précédente
     */
    moveQLeft: function (id) {
        if (id === 0)
            return false;
        var contents = this.getContents();
        var temp = contents[id-1];
        contents[id-1] = contents[id];
        contents[id] = temp;
        QCMeditors.replaceQuestions(contents);
    },
    /*
     * function moveQRight
     * Déplace la question affichée après la question suivante
     */
    moveQRight: function (id) {
        if (id > nbQ - 1)
            return false;
        var contents = this.getContents();
        var temp = contents[id+1];
        contents[id+1] = contents[id];
        contents[id] = temp;
        QCMeditors.replaceQuestions(contents);
    },
    /*
     * function updateNav : met à jour les couleurs des boutons de navigation dans les questions
     * @returns reponseset
     */
    updateNav: function () {
        this.updatenbQ();
        for(var id=0;id<nbQ;id++){
            QCMeditors.updateCheckAnwers('editor'+id, id);
            // si la bonne réponse a été proposée, on indique qu'elle est connue
            // et on sélectionne les éléments input correspondant.
            var reponseset = qreponses[id];
            if(QCMeditors.times[id]){
                document.getElementById("temps"+id).value = QCMeditors.times[id];
            } else {
                document.getElementById("temps"+id).value = "00:00";
            }
            if (reponseset !== undefined) {
                // bouton radio
                if (typeof reponseset === "string") {
                    // on affiche les boutons type radio
                    QCMeditors.changeTypeChoice(id,"radio");
                    document.getElementById('R' + reponseset+id).checked = true;
                } else if (Array.isArray(reponseset)) { // boutons checkbox
                    QCMeditors.changeTypeChoice(id,"checkbox");
                    // on met tous les checkbox à non check
                    var elems = document.querySelectorAll("#editionQuestions"+id+" input[name='reponse']");
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].checked = false;
                    }
                    if (reponseset.length > 0) {
                        for (var i = 0; i < reponseset.length; i++) {
                            document.getElementById('R' + reponseset[i]+id).checked = true;
                        }
                    } else {
                        elems[i-1].checked = true;
                    }
                }
                QCMeditors.addStyle(id);
            } else {
                QCMeditors.changeTypeChoice(id,"radio");
            }
        }
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
        if (QCMeditors.qFocusOn === nbQ - 1 && direction === "l")
            return false;
        // on prévient que l'animation est en cours, pour empêcher d'appuyer à nouveau sur le bouton et pour cesser le tick
        QCMeditors.animation = true;
        //mLeft est le pourcentage prévu
        //utils.setChrono();
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
    download: function () {
        // on met à jour le temps de la question en cours
        //utils.setChrono();
        //var content = document.getElementById("animate").innerHTML;
        var content = QCMeditors.getContents(), nomfichier;
        content = JSON.stringify(content);
        if (utils.storageAvailable('localStorage')) {
            if (content.length < 2500000) {
                nomfichier = QCMeditors.saveToLocalStorage(content);
            }
        }
        var contentType = 'text/plain';
        var filename = (nomfichier !== undefined && nomfichier !== null && nomfichier !== "") ? nomfichier + ".txt" : "questions.txt";
        var blob = new Blob([content], {
            type: contentType
        });
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
        if(qreponses[questionNumber] === undefined){
            QCMeditors.removeStyle(questionNumber);
            return;
        }
        var s = [],se=null;
        if (document.getElementById("stylesheet" + questionNumber) !== null) {
            se = document.getElementById("stylesheet" + questionNumber);
        }
        if (qreponses[questionNumber].indexOf("A") > -1)
            s.push(1);
        if (qreponses[questionNumber].indexOf("B") > -1)
            s.push(2);
        if (qreponses[questionNumber].indexOf("C") > -1)
            s.push(3);
        if (qreponses[questionNumber].indexOf("D") > -1)
            s.push(4);
        if (!s.length) {
            QCMeditors.removeStyle(questionNumber);
            return false;
        }
        var sheet = document.createElement('style');
        sheet.id = "stylesheet" + questionNumber;
        for (var i = 0; i < s.length; i++) {
            sheet.innerHTML += "#editor" + questionNumber + " ol > li:nth-child(" + s[i] + ")::before{border-radius:20px 20px 20px 20px;border:3px solid green;}";
        }
        if(stylesheets[questionNumber]){
            document.body.replaceChild(sheet,se);
        } else {
            document.body.appendChild(sheet);
        }
        stylesheets[questionNumber] = "sstylesheet" + questionNumber;
    },
    /*
     *  Enlève les feuilles de styles créées dynamiquement précédemment
     */
    removeStyle: function (questionNumber) {
        var sheet = document.getElementById("stylesheet" + questionNumber);
        if(!sheet) return false;
        var sheetParent = sheet.parentNode;
        sheetParent.removeChild(sheet);
        delete stylesheets[questionNumber];
    },
    /*
     * télécharge un fichier distant dans QCMCam
     * nécessite une connexion internet
     */
    loadFile: function (url) {
        var reader = new XMLHttpRequest();
        reader.onload = function () {
            QCMeditors.replaceQuestions(reader.responseText);
        };
        reader.open("get", "phploader.php?url=" + encodeURIComponent(url), true);
        reader.send();
        if (myWindow !== undefined) {
            myWindow.close();
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
        if(typeof json === "string"){
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
        }} else questionsreponses = json;
        var elem = document.getElementById("editors");
        qreponses = {};
        elem.innerHTML = "";
        nbQ = 0;
        QCMeditors.times = [];
        for (i in questionsreponses) {
            if(questionsreponses[i].time !== undefined) QCMeditors.times[i] = questionsreponses[i].time;
            nbQ++;
            if (questionsreponses[i].question !== "")
                elem.innerHTML += QCMeditors.insertCommandes(i)+'<div id="editor' + i + '" contenteditable="false" class="question">' + questionsreponses[i].question + '</div>';
            if (questionsreponses[i].reponse !== undefined)
                qreponses[Number(i)] = questionsreponses[i].reponse;
        }
        // on cache les options d'édition qui peuvent contenir les réponses...
        //utils.class("editionQuestions", "cache");
        //this.reloadCKEDITOR();
        utils.renderKatex("editors");
        QCMeditors.qFocusOn = 0;
        this.setAnimationWidth();
        this.updateNav();
        // on réinitialise tous les éléments de réponses
        //answers.resetAll();
        if (questionsreponses.size !== undefined) {
            var styleQuestions = document.getElementById("questions").style;
            styleQuestions.width = questionsreponses.size.width;
            styleQuestions.height = questionsreponses.size.height;
        }
        //this.toggleCacheQuestions("show");
        QCMeditors.fileJustLoaded = true;
        document.getElementById('editors').addEventListener('click', QCMeditors.loadCKEDITOR);
        document.getElementById('editors').addEventListener('mouseover', QCMeditors.setEditableTrue);
        },
    /*
     * Montre ou cache le cache des questions
     */
    toggleCacheQuestions: function (state) {
        var cache = document.getElementById('cacheQuestions');
        // on récupère la taille du questionnaire pour lui donner sa taille
        var widthQ = document.getElementById('questions').offsetWidth;
        cache.style.width = widthQ + "px";
        if ((cache.className === "cache" && state === undefined) || state === "show") {
            cache.className = 'montre';
        } else {
            cache.className = 'cache';
        }
    },
    /*
     * Changer le type de réponse simple / multiple
     */
    changeTypeChoice: function (id, what) {
        var btn = document.getElementById('btncc'+id);
        var elems = document.querySelectorAll("#editionQuestions"+id+" input[name='reponse']");
        // si les input sont de type radio, on commute pour checkbox;
        // et si on demande spécifiquement un checkbox on affiche.
        if ((what === undefined && elems[0].type === "radio") || what === "checkbox") {
            for (var i = 0; i < elems.length; i++) {
                elems[i].type = "checkbox";
            }
            if (what === undefined || qreponses[id] === undefined) {
                qreponses[id] = [];
                for (var i = 0; i < elems.length; i++) {
                    if (elems[i].checked && i < 4) qreponses[id].push(elems[i].value);
                }
            }
            btn.src = "css/img/32px/multiplechoice.png";
        } else {
            btn.src = "css/img/32px/onechoice.png";
            for (var i = 0; i < elems.length; i++) {
                elems[i].type = "radio";
                elems[i].checked = false;
            }
            elems[i-1].checked = true;
            if (what === undefined) {
                delete qreponses[id];
            }
        }
        QCMeditors.addStyle(id);
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
    }
};
var answers = {
        /*
     * affecte la bonne réponse au QCM
     * appelé par l'utilisateur (case à cocher)
     */
    setAnswer: function (value, type, id) {
        if (type === "radio") {
            // type radio, une seule réponse possible
            if (value !== "0") {
                qreponses[id] = value;
            } else {
                delete qreponses[id];
            }
        } else { // type checkbox, plusieurs réponses possibles
            if (value !== "0") {
                var elem = document.querySelector("#editionQuestions"+id+" input[name='reponse'][value='0']");
                elem.checked = false;
                elem = document.querySelector("#editionQuestions"+id+" input[name='reponse'][value='" + value + "']");
                if (elem.checked)
                    qreponses[id].push(value);
                else {
                    utils.removeElement(qreponses[id], value);
                }
            } else {
                // on remet les éléments input à false
                var elems = document.querySelectorAll("#editionQuestions"+id+" input[name='reponse']");
                qreponses[id] = [];
                for (var i = 0; i < elems.length - 1; i++) {
                    elems[i].checked = false;
                }
            }
        }
        QCMeditors.addStyle(id);
    },    
    /*
    * resetAll : efface toutes les données de suivi
    * enlève la marque des bonnes réponses dans le QCMC
    * supprime les données de réponse de tous les utilisateurs
    * @returns {undefined}
    */
   resetAll: function () {
       this.initAll();
       var i;
       for (i in stylesheets) {
           QCMeditors.removeStyle(i);
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
       if (stylesheets[QCMeditors.qFocusOn] !== undefined && !move)
           QCMeditors.removeStyle(QCMeditors.qFocusOn);
   }
};
/*
 * créations initiales au chargement de la page web.
 * @returns {undefined}
 */
function onLoad() {
    document.getElementById("temps0").value = "00:00";
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
    if (liendirect < 0 && lang !== "fr") {
        QCMCam.lang.translate();
    }
    if(liendirect < 0){
        QCMeditors.loadCKEDITOR();
    }
    setTimeout(utils.lancerReveal, 1000);
    // détection des touches
    document.onkeydown = function (evt) {
        if (evt.altKey) {
            switch (evt.keyCode) {
                case 75: // K
                    users.alea();
                    break;
                case 73: //I
                    utils.Infos('open');
                    break;
                case 90: //Z
                    utils.pleinEcran();
                    break;
                case 71: //G
                    QCMeditors.nextQ();
                    break;
                case 86: //V
                    users.afficheReponses();
                    break;
                case 82: //R
                    answers.initAll();
                    break;
                case 88: //ALT X
                    QCMeditors.addQ();
            }
        }
    };
    document.onkeyup = function (evt) {
        if (evt.keyCode === 164) { // code du $
            // remplace le code compris entre 2 $ par du latex
            var editor = CKEDITOR.instances["editor" + evt.target.id.substring(6)];
            var content = editor.getData();
            if (content.split("$$").length - 1 === 2) {
                content = content.replace(/\$\$([^$]*)\$\$/i, '<span class="math-tex">\\($1\\)</span> <span id="bukmrk">.</span>');
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