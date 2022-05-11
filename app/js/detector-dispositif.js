/*
 * Copyright (C) 2019 Sébastien COGEZ Licence Apache 2.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict"
// nb de fois où il faut avoir vue un vote pour le valider et taille minimale du carton pour le valider comme vu
var nbvuesVoteMin = 4;
var infobox,infoBoxTimeout;
var attenteRepo = 0; // permet d'annuler l'attente d'une réponse de l'ordinateur si cela n'arrive pas et rétablir le bouton.
// dans la table de correspondance p4, il y a 2 fois l'id 16 pour garder la reconnaissance fonctionnelle, le marker correspondant ayant été remplacé.
var correspondances = {'p5': {743: 1, 878: 1, 366: 2, 741: 2, 735: 3, 990: 3, 734: 4, 478: 5, 733: 5, 727: 6, 862: 6, 350: 7, 725: 7, 719: 8, 974: 8, 590: 9, 710: 9, 314: 10, 689: 10, 246: 11, 636: 11, 635: 12, 950: 12, 438: 13, 633: 13,
        374: 14, 629: 14, 118: 15, 628: 15, 627: 16, 822: 16, 486: 17, 621: 17, 619: 18, 934: 18, 422: 19, 617: 19, 358: 20, 613: 20, 607: 21, 982: 21, 406: 22, 601: 22, 595: 23, 790: 23, 454: 24, 589: 24, 583: 25, 838: 25,
        326: 26, 581: 26, 498: 27, 573: 27, 434: 28, 569: 28, 370: 29, 565: 29, 443: 30, 978: 30, 466: 31, 541: 31, 535: 32, 850: 32, 509: 33, 507: 34, 957: 34, 189: 35, 504: 35, 445: 36, 505: 36, 502: 37, 637: 37, 381: 38, 501: 38,
        495: 39, 1005: 39, 494: 40, 749: 40, 491: 41, 941: 41, 237: 42, 492: 42, 487: 43, 877: 43, 365: 44, 485: 44, 150: 45, 600: 45},
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
        215:90},
    'p3': {1: 1, 2: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 10: 8, 11: 9, 13: 10, 16: 11, 17: 12, 18: 13, 19: 14, 20: 15, 21: 16, 27: 17, 28: 18, 30: 19, 32: 20, 33: 21, 34: 22, 35: 23, 36: 24, 38: 25, 39: 26, 40: 27, 42: 28, 45: 29, 49: 30, 50: 31, 52: 32, 54: 33, 55: 34, 56: 35, 57: 36, 59: 37}};
var typeCode = 4;
var corres = correspondances["p" + typeCode];
var utils = {
    intervaldecompte:null,
  // storageAvailable :  detect la disponibilité de stockage local des données
  // return true si storage local est fonctionnel
  storageAvailable:function (type) {
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
  isLocal:function(){
    if(location.href.indexOf("file")===0){return true;}
    else return false;
    },
    isEmpty:function(obj) {
        for (var x in obj) { return false; }
        return true;
        },
    getUrlVars:function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var len = hashes.length;
        var i;
        for (i = 0; i < len; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    lancerReveal:function() {
        utils.intervaldecompte = setInterval(utils.reveal, 10);
    },
    /*
        * Cache le div blanc et le logo après 1s. pour simulter un chargement de page.
        * @returns {undefined}
        */
    reveal:function() {
        var decompte = Number(document.getElementById("intro").style.opacity);
        if (decompte < 0.01) {
            document.getElementById("intro").style.display = "none";
            clearInterval(utils.intervaldecompte);
        } else {
            document.getElementById("intro").style.opacity = decompte - 0.05;
        }
    },
    removeElement:function (array, elem) {  
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    },
    compareArrays:function(a1, a2){
        // s'ils n'ont pas la même longueur, il ne peuvent être égaux.
        if(a1.length !== a2.length)
            return false;
        // ils ont la même longueur, on suppose qu'ils sont égaux.
        for(var i=0;i<a1.length;i++){
            if(a2.indexOf(a1[i])<0) // l'un des éléments de a1 n'est pas dans a2 !!!
                return false;
        }
        return true;
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
    cacherDiv:function(id){
        document.getElementById(id).className="cache";
    },
    indiquer:function(){
        if(typeof arguments[0] === "string"){
            document.getElementById('indication').className = null;
            document.getElementById('indication').innerHTML = arguments[0];
            if(typeof arguments[1] === "string")
                document.getElementById('indication').style.color = arguments[1];
        } else if(arguments[0] === false){
            document.getElementById('indication').className = "cache";
        }
    }
};
var camera = {
    detector:null,
    scan: false,
    video : false,
    videoReady : false,
    videoPause : false,
    detectQRCode : true,// on commence par scanner le QRCode depuis l'application.
    videoSources : [],
    selectedSource : null,// sur les smartphone, c'est généralement la 2e camera qui est derrière.
    manualStopScan : false,
    startActivity : false, //false temps que camera inactive. TimeStamp sinon Permet de couper le scan au bout d'une minute inactivité.
    /*
    * Détecte et démarre l'affichage de la camera reliée à l'ordinateur
    * @returns {undefined}
    */
    demarrerCamera:function() {
        if (camera.videoSources.length === 1) {
            // si une seule camera, on sélectionne la seule camera disponible.
            camera.selectedSource = 0;
        } else {
            if(camera.selectedSource === null){
                camera.selectedSource = 0;
                for(var i=0;i<camera.videoSources.length;i++){
                    //console.log(camera.videoSources[i]);
                    // on regarde si dans le label est indiqué le mot back ou l'orientation
                    if(camera.videoSources[i][1].indexOf("back")>-1 || camera.videoSources[i][1].indexOf("90")>-1 || camera.videoSources[i][1].indexOf("arrière")>-1){
                        camera.selectedSource = i;
                    }
                }
            }
        }
        var videoSource = camera.videoSources[camera.selectedSource][0] ? camera.videoSources[camera.selectedSource][0] : undefined;
        if (!camera.video) {
            camera.video = document.getElementById("video");
            // precaution
            if (window.stream) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            if (camera.videoSources.length > 1) {
                // si plus d'une camera, on ajoute le bouton pour switcher
                document.getElementById("divchangecam").className = "";
            } else if (camera.videoSources.length === 1) {
                // si plus qu'une seule camera, on enleve le couton pour switcher
                document.getElementById("divchangecam").className = "cache";
            }
            // largeur en fonction de l'orientation
            var constraints = {
                video: {
                    width: {ideal: 640}/*,
                    deviceId: videoSource ? {exact: videoSource} : undefined*/
                }
            };
            if(videoSource !== undefined){
                constraints.video.deviceId = {exact:videoSource};
            }
            navigator.mediaDevices.getUserMedia(constraints)
                    .then(function (stream) {
                        window.stream = stream;
                        if ("srcObject" in camera.video) {
                            camera.video.srcObject = stream;
                        } else {
                            camera.video.src = window.URL.createObjectURL(stream);
                        }
                        camera.video.play();
                        // on lance le scann de l'image, cela doit commencer par détecter le QRCode
                        camera.tick();
                        // au cas où on aurait branché une nouvelle caméra
                        return navigator.mediaDevices.enumerateDevices();
                    })
                    .then(camera.gotVideoDevices)
                    .catch(function (err) {
                        affichage.debug(err.name + ": " + err.message);
                    });
        } else {
            camera.scanner(false);
            camera.videoReady = false;
            if (window.stream !== undefined) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            if (camera.video.srcObject.active)
                camera.video.srcObject.getTracks()[0].stop();
            camera.video = false;
            affichage.canvas.width = 0;
            affichage.canvas.height = 0;
        }
    },
    changeCamera:function() {
        if (camera.videoSources.length === 1) {
            camera.selectedSource = 0;
            return false;//pas la peine de faire quoique ce soit, si une seule caméra
        }
        camera.demarrerCamera();//arrête la vidéo
        if (camera.videoSources.length > 1) {
            camera.selectedSource = (camera.selectedSource + 1) % camera.videoSources.length;
        }
        camera.demarrerCamera();//relance la vidéo
        /*if (utils.storageAvailable('localStorage')) { // on stocke les données localement pour les retrouver à la prochaine ouverture de page
            localStorage.camera = camera.selectedSource;
        }*/
    },
    handleError:function(error) {
        affichage.debug('navigator.getUserMedia error: ' + error);
    },
    gotVideoDevices:function(deviceInfos) {
        // Handles being called several times to update labels. Preserve values.
        camera.videoSources = [];
        var i;
        for (i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === 'videoinput') {
                var leLabel = deviceInfo.label || "camera " + (camera.videoSources.length + 1);
                camera.videoSources.push([deviceInfo.deviceId, leLabel]);
            }
        }
    },
    /*
     * détermine la réponse apportée par la direction(dir) du marker et des coordonnées
     * des coins du marker (vertex)
     *
     */
    derterminateResponse:function(corners) {
        var reponse;
        var dx = corners[0].x - corners[2].x, dy = corners[0].y - corners[2].y;
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
    clearImage:function() {
        if (affichage.context)
            affichage.context.clearRect(0, 0, affichage.canvas.width, affichage.canvas.height);
    },
    /*
     * met en route le scan de l'image ou le désactive
     * @returns {undefined}
     */
    scanner:function(doIt) {
        if (!camera.video)
            return false;
        var start = true;
        if (doIt === false)
            start = false;
        if (camera.scan === true && doIt === undefined)
            start = false;
        if (start) {// démarrage du scan
            camera.startActivity = Date.now();
          if(comm.interval)
            clearInterval(comm.interval);
          comm.interval = setInterval(affichage.compteValeurs, 1000);
          camera.scan = true;
          affichage.canvas.style.opacity = '1';
        } else {
            camera.startActivity = false;
            camera.scan = false;
            affichage.canvas.style.opacity = '0.5';
            if(comm.interval)
              clearInterval(comm.interval);
        }
    },
    /*
    * relance le scan des images à chaque rafraichissement
    * @returns {undefined}
    */
    tick:function() {
        var ok = false;
        if(camera.videoPause) return;
        if (video.readyState > 2) {
            if ((camera.videoReady === false && camera.video.videoWidth > 0) || affichage.canvas.width !== parseInt(camera.video.videoWidth)) {
                camera.videoReady = true;
                affichage.canvas.width = parseInt(camera.video.videoWidth);
                affichage.canvas.height = parseInt(camera.video.videoHeight);
                affichage.canvas.style.width = "98%";
                affichage.canvas.style.height = "auto";
                affichage.context.font = Math.round(affichage.canvas.width/20)+"px Arial";
                affichage.context.textAlign = "center";
                //affichage.debug("videoW : " + video.videoWidth + " videoH : " + video.videoHeight);
            }
            if (affichage.canvas.width > 0) {
                // copie l'image venant de la caméra dans le canvas d'affichage.
                camera.clearImage();
                if(camera.detectQRCode){
                    var w = affichage.canvas.width, h = affichage.canvas.height, taille = 200;
                    if(w>=800 || h>=800){
                        taille = 400;
                    }
                    var w1 = Math.round(w/2-taille/2), h1 = Math.round(h/2-taille/2), 
                    w2 = Math.round(w/2+taille/2), h2 = Math.round(h/2+taille/2);
                    affichage.context.drawImage(camera.video,w1,h1,taille,taille,w1,h1,taille,taille);
                    affichage.context.fillStyle = "red";
                    affichage.context.fillRect(w1-10, h1-10, 30, 3);
                    affichage.context.fillRect(w1-10, h1-10, 3, 30);
                    affichage.context.fillRect(w2-20, h1-10, 30, 3);
                    affichage.context.fillRect(w2+7, h1-10, 3, 30);
                    affichage.context.fillRect(w1-10, h2-20, 3,30);
                    affichage.context.fillRect(w1-10, h2+7, 30,3);
                    affichage.context.fillRect(w2-20,h2+7, 30,3);
                    affichage.context.fillRect(w2+7,h2-20,3,30);
                } else
                affichage.context.drawImage(camera.video, 0, 0, affichage.canvas.width, affichage.canvas.height);
                ok = true;
            }
        }
        if(camera.detectQRCode && ok){
            document.getElementById('indication').innerHTML = "Scanner le QRCode";
            var imageData = affichage.context.getImageData(0, 0, affichage.canvas.width, affichage.canvas.height);
            if(QRCode.detectQRCode(imageData)){
                // on indique qu'on a eu le QRCode et que la communication est lancée avec l'autre appareil
                camera.detectQRCode = false;
                // on arrête l'image
                camera.videoPause = true;
            }
        } else if (camera.videoPause === false && ok) {
            utils.indiquer(false);
            var imageData = affichage.context.getImageData(0, 0, affichage.canvas.width, affichage.canvas.height);
            var markers = camera.detector.detect(imageData);
            camera.drawMarkers(markers);
            affichage.updateVotes();
        }
        //requestAnimationFrame(camera.tick);
        setTimeout(camera.tick, 100);
    },
    drawMarkers:function(markers) {
        var corners, corner, i, j, x, y, xmax, ymax;
        affichage.context.strokeStyle = "red";
        affichage.context.textAlign = "center";
        affichage.context.textBaseline = "middle";
        var x,y,xmax,ymax;
        for (i = 0; i !== markers.length; ++i) {
            // on commence par affecter la réponse à l'utilisateur
            q.affecte(corres[markers[i].id], camera.derterminateResponse(markers[i].corners));
            x = Infinity;
            y = Infinity;
            xmax = -Infinity;
            ymax = -Infinity;
            corners = markers[i].corners;
            affichage.context.beginPath();
            affichage.context.moveTo(corners[0].x, corners[0].y);
            affichage.context.lineWidth = 3;
            affichage.context.fillStyle = "rgba(0,0,5,0.6)";
            for (j = 0; j < 4; j++) {
                corner = corners[(j + 1) % 4];
                affichage.context.lineTo(corner.x, corner.y);
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
                xmax = Math.max(xmax, corner.x);
                ymax = Math.max(ymax, corner.y);
            }
            affichage.context.closePath();
            affichage.context.stroke();
            affichage.context.fill();
            // id du marker
            affichage.context.fillStyle = "white";
            affichage.context.lineWidth = 1;
            affichage.context.font = Math.max((ymax - y) / 2) + "px Arial"; // defaut : 25 px
            if (corres[markers[i].id] !== undefined)
                affichage.context.fillText(corres[markers[i].id], (x + xmax) / 2, (y + ymax) / 2);
            else
                affichage.context.fillText("# " + markers[i].id + " #", (x + xmax) / 2, (y + ymax) / 2);
        }
    },
    /*
    * stoppe ou démarre la reconnaissance des marqueurs de vote
    * @param (Boolean) TF : si true, stoppe le scan
    */
   stopStartScan:function(TF) {
        if(camera.videoPause === false || TF){
            camera.videoPause = true;
            camera.scanner(false);
            document.getElementById("btn2").src = "img/128px/photo.png";
            utils.indiquer("Scan en pause...", "blue");
            // on arrête le rafraichissement de l'image
        } else {
            utils.indiquer(false);
            camera.manualStopScan = true;// pour permettre de rescanner même si le total de réponse est atteint
            camera.videoPause = false;
            camera.scanner(true);
            camera.tick();
            comm.action = "startscan";
            comm.intervalEnvoi = setTimeout(comm.sendDatas, 1800);
            document.getElementById("btn2").src = "img/128px/notphoto.png";
        }
    },
    scanQR:function(){
        document.getElementById("numquestion").className = "cache";
        document.getElementById("listeeleves").className = "cache";
        camera.scan = false;
        camera.detectQRCode = true;
        camera.videoPause = false;
        this.tick();
    }
};
var affichage = {
    canvas:null, context:null,
    imgBoutons: ["stats.png", "if_bullet_accept_66697.png", "photo.png", "if_arrow_right_66681.png"],
    btnActif : -1,
    /*
    * crée l'image avec les statistiques des réponses.
    * @param {type} value = la bonne réponse
    * @returns {undefined}
    */
    compteValeurs:function() {
        var totaux = {"A": 0, "B": 0, "C": 0, "D": 0};
        var nbvals = 0,i;
        for (i in users.datas) {
            if(q.reponseSimple && users.datas[i].vote !== ""){
                totaux[users.datas[i].vote]++;
                nbvals++;
            } else if(!q.reponseSimple){
                for(var j=0;j<users.datas[i].vote;j++){
                    totaux[users.datas[i].vote[j]]++;
                    nbvals++;
                }
            }
        }
        // test de l'inactivité de la détection
        if(nbvals>0){ // pas de pb, on a détecté des trucs
            camera.startActivity = Date.now();
        } else if(camera.startActivity + 60000 < Date.now()){
            // pas de détection depuis plus d'une minute, on arrête le scan
            camera.stopStartScan(true);

        }
        if (nbvals === users.eleves.effectif && !camera.manualStopScan && !q.reponseSimple)
            camera.stopStartScan(true);
    },
    debug:function(text) {
        infobox.innerHTML += text;
        if(infoBoxTimeout!==undefined){
        clearTimeout(infoBoxTimeout);
        }
        infoBoxTimeout = setTimeout(function(){infobox.innerHTML="";},5000);
    },
    /*
    * met les numéros des élèves qui ont voté en vert, rouge ou bleu (si on ne connait pas la bonne réponse)
    * @returns {undefined}
    */
   updateVotes:function() {
        var i;
        for (i in users.datas) {
            if (users.datas[i].nbvotes > 0) { // on ne s'occupe que des votes vus au moins 5 fois pour éviter les erreurs de lecture
                if (q.qreponses[q.qFocusOn] !== undefined) {
                    if ((q.reponseSimple && q.qreponses[q.qFocusOn] === users.datas[i].vote) || (!q.reponseSimple && utils.compareArrays(users.datas[i].vote,q.qreponses[q.qFocusOn]))) {
                        document.querySelector("#el" + i + " > span:first-of-type").className = "numerovert";
                    } else {
                        document.querySelector("#el" + i + " > span:first-of-type").className = "numerorouge";
                    }
                } else
                    document.querySelector("#el" + i + " > span:first-of-type").className = "numerobleu";
            }
        }
    },
    /*
    * toggle affichage des boutons d'interrogation d'élève.
    */
   optionsInterroger:function(){
        var elt = document.getElementById("commandesInterroger");
        if(elt.className === "cache")
            elt.className = "";
        else {
            elt.className = "cache";
        }
    },
    optionsInterface(){
        document.getElementById('commandesOptions').className = "";
    },
    updateNumeros:function () {
        if(Array.isArray(q.qreponses[q.qFocusOn]))
            q.reponseSimple = false;
        else 
            q.reponseSimple = true;
        document.getElementById("numquestion").innerHTML = "Question " + (q.qFocusOn + 1) + "/" + q.nbQ;
        if(q.qreponses[q.qFocusOn] !== undefined)
            affichage.setOnBtnAnswer(q.qreponses[q.qFocusOn]);
        else
            affichage.setOnBtnAnswer();
    },
    desactiveBtn:function() {
        if (affichage.btnActif > -1)
            document.getElementById("btn" + affichage.btnActif).src = "img/Ellipsis-2.6s-100px.gif";
    },
    // remet l'affichage du bouton de commande à son état initial
    restoreButton:function() {
        if (affichage.btnActif > -1) {
            document.getElementById("btn" + affichage.btnActif).src = "img/128px/" + affichage.imgBoutons[affichage.btnActif];
            if(affichage.btnActif === 3 && q.qFocusOn === q.nbQ){
                document.getElementById("btn" + affichage.btnActif).style.opacity = 0.4;
            }
            affichage.btnActif = -1;
        }
        affichage.updateNumeros();
    },
    // met les boutons en vert
    setOnBtnAnswer:function (values){
        if(values===undefined) values = [];
        var btns = ["A","B","C","D"];
        var i;
        for(i=0;i<btns.length;i++){
            if(values.indexOf(btns[i])>-1)
                document.getElementById('btn'+btns[i]).className="vert";
            else
                document.getElementById('btn'+btns[i]).className="";
        }
    }
};
var q = {
    qreponses: {}, nbQ:null, qFocusOn:null, reponseSimple : true,
    /*
    * affecte une réponse à un marker et compte le nombre de réponses différentes fournies
    * @param {type} markerID
    * @param {type} valeur : valeur du vote
    */
   affecte:function(markerID, valeur) {
        markerID = String(markerID);
        var timestamp = Date.now();
        // on prévient les erreur de lecture de marker
        if (users.eleves[markerID] === undefined)
            return false;
        if (users.datas[markerID] === undefined) { // création du premier vote
            if(!q.reponseSimple)
                users.datas[markerID] = {vote: [], nbvotes: 0, timestamp:timestamp, voteTemp:valeur, vues:1};
            else
                users.datas[markerID] = {vote:"", nbvotes: 0, voteTemp:valeur, vues:1, timestamp:timestamp};
        } else if(users.datas[markerID].voteTemp !== valeur){
            users.datas[markerID].voteTemp = valeur;
            users.datas[markerID].vues = 1;
        } else {
            users.datas[markerID].vues++;
            if(users.datas[markerID].vues > nbvuesVoteMin){
                if(q.reponseSimple && users.datas[markerID].vote !== valeur){
                    if(users.datas[markerID].nbvotes === 0){
                        users.datas[markerID].vote = valeur;
                        users.datas[markerID].nbvotes++;
                    } else if(users.datas[markerID].timestamp + 1000 < timestamp){
                        users.datas[markerID].vote = valeur;
                        users.datas[markerID].nbvotes++;
                        users.datas[markerID].timestamp = timestamp;
                    }
                } else if(!q.reponseSimple){
                    if(users.datas[markerID].nbvotes===0){
                        users.datas[markerID].vote.push(valeur);
                        users.datas[markerID].newvote = true;
                        users.datas[markerID].nbvotes++;
                        users.datas[markerID].timestamp = timestamp;
                    } else if(users.datas[markerID].timestamp+4800 < timestamp) {
                        users.datas[markerID].vues = 1;
                        users.datas[markerID].nbvotes++;
                        users.datas[markerID].timestamp = timestamp;
                        if(users.datas[markerID].vote.indexOf(valeur)<0){
                            users.datas[markerID].vote.push(valeur);
                            users.datas[markerID].newvote = true;
                        } else {
                            utils.removeElement(users.datas[markerID].vote, valeur);
                            users.datas[markerID].newvote = "reset";
                        }
                    }
                }
            }
        }
    },
    setGood:function(value){
        if(["A","B","C","D"].indexOf(value)<0) return false;
        else if(Array.isArray(q.qreponses[q.qFocusOn])) {
            if(q.qreponses[q.qFocusOn].indexOf(value)<0){
              q.qreponses[q.qFocusOn].push(value);
          } else {
              utils.removeElement(q.qreponses[q.qFocusOn], value);
          }
        } else {
          q.qreponses[q.qFocusOn] = value;
        }
        affichage.setOnBtnAnswer(q.qreponses[q.qFocusOn]);
        affichage.updateVotes();
        comm.action = q.qreponses[q.qFocusOn];
    }
};
var users = {
    eleves : {}, datas:{},
    /*
    * insère les noms des élèves dans le DOM
    * @returns {undefined}
    */
    usersShow :function() {
        var txt = "", i;
        for (i in users.eleves) {
            if (i === "effectif")
                continue;
            txt += '<div class="eleve" id="el' + i + '"><span class="numero">' + i + "</span></div>";
        }
        document.getElementById("listeeleves").innerHTML = txt;
    },
    setUtils:function(chaineJson) {
        var i, datasReceived;
        if(typeof chaineJson === "string"){
          var tablejson = chaineJson.split("\n");
          for (i = 0; i < tablejson.length; i++) {
              if (tablejson[i] !== "" && tablejson[i].indexOf("ids") > 0) {
                  datasReceived = JSON.parse(tablejson[i]);
              }
          }
        } else {
          datasReceived = chaineJson;
        }
        if (datasReceived === undefined)
            return false;
        if(datasReceived.ids !== undefined){
            users.eleves = {};
            var j = 0;
                for (i in datasReceived.ids) {
                users.eleves[datasReceived.ids[i]] = 'noname';
                if(datasReceived.reponses !== undefined){
                  if(datasReceived.reponses[i]!==undefined){
                    users.datas[i] = {vote:datasReceived.reponses[i].vote, nbvotes:1,vues:nbvuesVoteMin};
                    comm.datasSent[i] = users.datas[i].vote;
                }}
                j++;
            }
            users.eleves.effectif = j;
            setTimeout(function(){
              camera.clearImage();
              utils.indiquer("Connexion réussie, cliquer sur scanner les marqueurs pour démarrer ou arrêter");
            }, 1500);
            // on a reçu la liste des participants
            document.getElementById("numquestion").className = null;
            document.getElementById("listeeleves").className = null;
            comm.donneesAenvoyer.updateClasse = 1;
          }
        if (!utils.isEmpty(datasReceived.reps)) {
            q.qreponses = datasReceived.reps;
        }
        // à revoir
        if (datasReceived.stopSession !== undefined) {
            // demande d'arrêt de la part du client
            camera.stopStartScan(true);// arrêt caméra
            return;
        }
        if (datasReceived.nbq !== undefined) {
            // le nombre de questions a changé
            if (q.nbQ !== datasReceived.nbq) {
                q.nbQ = datasReceived.nbq;
                affichage.updateNumeros();
            }
            comm.donneesAenvoyer.chgQuestion = 1;
        }
        // on voit si des commandes ont été envoyées par l'appli
        if (datasReceived.qFocusOn !== undefined) {
            if (q.qFocusOn !== datasReceived.qFocusOn) { // on a changé de question !
                //changement du numéro
                q.qFocusOn = Number(datasReceived.qFocusOn);
                affichage.updateNumeros();
                if(q.qFocusOn === q.nbQ){
                    document.getElementById("btn" + affichage.btnActif).style.opacity = 0.4;
                }
                // réinitialisation des réponses utilisateurs
                users.datas = {};
                comm.datasSent = {};
                // on ré affiche les élèves
                users.usersShow();
                // on relance le scan
                camera.scanner(true);
            }
            comm.donneesAenvoyer.nexted = 1;
        }
        if(datasReceived.commande === "stop"){
            if(comm.peer)
                comm.peer.destroy();
            utils.indiquer("Déconnexion, il faudra scanner un QRCode pour se reconnecter.");
            if(comm.intervalEnvoi)
            clearTimeout(comm.intervalEnvoi);
        }
        if (datasReceived.reps !== undefined) {
            q.qreponses = datasReceived.reps;
            comm.donneesAenvoyer.updateReps = 1;
            if(q.qreponses[q.qFocusOn] !== undefined) {
                affichage.setOnBtnAnswer(q.qreponses[q.qFocusOn]);
            } else affichage.setOnBtnAnswer();
        }
        if (["ended", "started", "nexted", "corrected", "reseted", "statsed"].indexOf(datasReceived.ok) > -1) {
            if(datasReceived.ok === "nexted"){
                if(q.qreponses[q.qFocusOn] !== undefined) {
                    affichage.setOnBtnAnswer(q.qreponses[q.qFocusOn]);
                } else affichage.setOnBtnAnswer();
                // on réaffiche les utilisateurs
                users.usersShow();
                camera.manualStopScan = false;              
                camera.stopStartScan(false);
            }
            affichage.restoreButton();
        }
        users.usersShow();
        affichage.updateNumeros();
        if (!utils.isEmpty(datasReceived.reponses)) { // si on a reçu des réponses, on met les couleurs à jour
          affichage.updateVotes();
        }
        return true;
    }
};
var comm = {
    datasSent : {}, sessionId : 0, action : "", pile : {},// objet contenant les envois, pour suivre leur état et renvoyer éventuellement en cas de pb à date + 2 temps.
    peerConnexion:null, peer:null, peerId:null,
    interval : false,
    intervalEnvoi : false,
    attenteReponse : 0, // pour la connexion php
    donneesAenvoyer : {}, // cache pour ne pas envoyer 2 fois de suite la même chose.,
    peerConnexionLauncher:function(peerQCMCaId){
        comm.peer = new Peer();
        // utilisation du WEBRTC
        comm.peer.on('open',function(id){
          comm.peerId = id;
          var receptionOk = {connexion:"paired", mypeer :comm.peerId};
          comm.peerConnexion = comm.peer.connect(peerQCMCaId, {serialization:'json'});
          // indication connexion réussie
          comm.peerConnexion.on('open', function(){
            // envoi de la confirmation de la connexion
            comm.peerConnexion.send(receptionOk);
            if(comm.interval)
              clearInterval(comm.interval);
            if(comm.intervalEnvoi)
              clearTimeout(comm.intervalEnvoi);
            comm.interval = setInterval(affichage.compteValeurs, 1000);
            comm.intervalEnvoi = setTimeout(comm.sendDatas, 1800);
          });
          comm.peerConnexion.on('data',function(data){
            // précaution
            if(utils.isEmpty(data))
              return false;
            if(data.received !== undefined){
              delete comm.pile[data.received];
            }
            // traitement des datas reçus
            users.setUtils(data);
        });
        });
        comm.peer.on('disconnected', function(){
          if(comm.peerId !== false){
            affichage.debug("Déconnexion, tentative de reconnexion");
            comm.peer.id = comm.peerId;
            comm.peer._lastServerId = comm.peerId;
            comm.peer.reconnect();
          }
        });
        comm.peer.on('close', function(){
          comm.peerConnexion = null;
          comm.peerId = false;
        });
    },
    // lecture des infos mises à jour par le smartphone
    // pour connexion php
    getSession:function () {
        if(utils.isLocal()) return;
        var reader0 = new XMLHttpRequest();
        reader0.onload = function () {
            users.setUtils(reader0.responseText);
            // on peut lancer le scan etc.
            comm.interval = setInterval(affichage.compteValeurs, 1000);
            comm.intervalEnvoi = setTimeout(comm.sendDatas, 1800);
        };
        var json = {ok: "received"};
        reader0.open("get", "sessiondispo.php?s=" + comm.sessionId + "&json=" + JSON.stringify(json), true);
        reader0.send();
    },
    sendDatas:function() {
        if(utils.isLocal())return;
        var json = {};
        json.dataR = {};
        if (comm.action !== "" && comm.action !== undefined) {
            json.action = comm.action+"";
            comm.action = undefined; // on empêche un envoi futur de l'action.
            comm.attenteReponse = 1;
        }
        var i; var send = false;
        for (i in users.datas) { // on regarde s'il y a qque chose à envoyer
            if (q.reponseSimple && (comm.datasSent[i] === undefined || comm.datasSent[i] !== users.datas[i].vote)) {
                comm.datasSent[i] = users.datas[i].vote;
                json.dataR[i] = users.datas[i].vote;
                send = true;
            } else if(!q.reponseSimple &&  users.datas[i].newvote !== false && users.datas[i].newvote !== undefined){
                //comm.datasSent[i] = users.datas[i].voteTemp;
                json.dataR[i] = users.datas[i].voteTemp; 
                users.datas[i].newvote = false;
                send = true;
            }
        }
    /*  // on envoie toutes les données enregistrées au cas où certaines auraient été perdues en route.
        if(send){
        for(i in datas){
            if(reponseSimple && datas[i].vote !== "")
                json.dataR[i] = datas[i].vote;
            else if(!reponseSimple && datas[i].vues > nbvuesVoteMin){
                json.dataR[i] = {voteTemp:datas[i].voteTemp, vues:nbvuesVoteMin+4}; // assurance que cela soit pris en compte
            }
        }
        }*/
        for (i in comm.donneesAenvoyer) {
            json[i] = comm.donneesAenvoyer[i];
        }
        comm.donneesAenvoyer = {};
        // utilisation WEBRTC
        if(comm.peerConnexion !== null){
            // regarder dans la pile s'il faut envoyer des anciennes données
            if(comm.pile.length){
                for(var i in comm.pile){
                comm.peerConnexion.send(comm.pile[i]);
                }
            }
            if(json.action !== undefined || send){
                json.date = Date.now();
                comm.pile[json.date]=json;
                comm.peerConnexion.send(json);
            }
            // on s'assure que l'envoi est tjs en cours (les fichiers sont lus de façon asynchrone)
            comm.intervalEnvoi = setTimeout(comm.sendDatas, 1800);
        } else {
        var reader = new XMLHttpRequest();
        reader.onload = function () {
            var tablejson = reader.responseText.split("\n");
            var i = 0, repjson;
            for (i = 0; i < tablejson.length; i++) {
                if(comm.attenteReponse > 0) comm.attenteReponse++; // on augmente le témoin d'attente si actif
                if (tablejson[i] !== "") {
                    repjson = JSON.parse(tablejson[i]);
                    if (repjson.stopSession !== undefined) {
                        // demande d'arrêt de la part du client
                        camera.stopStartScan();// arrêt caméra
                        return;
                    }
                    // on voit si des commandes ont été envoyées par l'appli
                    if (repjson.qFocusOn !== undefined) {
                        if (q.qFocusOn !== repjson.qFocusOn) { // on a changé de question !
                            //changement du numéro
                            q.qFocusOn = Number(repjson.qFocusOn);
                            affichage.updateNumeros();
                            // réinitialisation des réponses utilisateurs
                            users.datas = {};
                            comm.datasSent = {};
                            // on ré affiche les élèves
                            users.usersShow();
                        }
                        comm.donneesAenvoyer.nexted = 1;
                    }
                    if (repjson.nbq !== undefined) {
                        // le nombre de questions a changé
                        if (q.nbQ !== repjson.nbq) {
                            q.nbQ = repjson.nbq;
                            affichage.updateNumeros();
                        }
                        comm.donneesAenvoyer.chgQuestion = 1;
                    }
                    if (repjson.ids !== undefined) {
                        var len = repjson.ids.length;
                        users.eleves = {};
                        for (i = 0; i < len; i++) {
                            users.eleves[repjson.ids[i]] = 'noname';
                        }
                        users.eleves.effectif = i;
                        comm.donneesAenvoyer.updateClasse = 1;
                    }
                    if (repjson.reps !== undefined) {
                        q.qreponses = repjson.reps;
                        comm.donneesAenvoyer.updateReps = 1;
                    }
                    if (["ended", "started", "nexted", "corrected", "reseted", "statsed", "scanstarted"].indexOf(repjson.ok) > -1) {
                        if(repjson.ok === "nexted"){
                            if(q.qreponses[q.qFocusOn] !== undefined) {
                                affichage.setOnBtnAnswer(q.qreponses[q.qFocusOn]);
                            } else affichage.setOnBtnAnswer();
                            // on réaffiche les utilisateurs
                            users.usersShow();
                            camera.manualStopScan = false;              
                            camera.stopStartScan(false);
                        }            
                        comm.attenteReponse = 0;
                        affichage.restoreButton();
                    } else if(comm.attenteReponse > 5){
                        comm.attenteReponse = 0;
                        // on a attendu l'équivalent de 5×2.5s = 11s de l'ordinateur, c'est long, on rmet l'état du bouton coincé pour éventuellement pouvoir renvoyer une réponse ensuite.
                        affichage.restoreButton();
                    }
                }
            }
            // on s'assure que l'envoi est tjs en cours (les fichiers sont lus de façon asynchrone)
            comm.intervalEnvoi = setTimeout(comm.sendDatas, 1800);
        };
        reader.open("get", "sessiondispo.php?s=" + comm.sessionId + "&json=" + JSON.stringify(json), true);
        reader.send();
    }
    },
    // Passer à la question suivante sur l'ordinateur
    questionSuivante:function() {
        camera.stopStartScan(true);
        if (affichage.btnActif > -1)
            return false;
        if (q.qFocusOn+1 >= q.nbQ)
            return false;
        else
            q.qFocusOn++;
        affichage.btnActif = 3;
        affichage.desactiveBtn();
        comm.action = 'next';
        // on efface les données de réponse
        users.datas = {};
        comm.datasSent = {};
        if(comm.peerConnexion){
            camera.scanner(false);
            setTimeout(affichage.restoreButton,2000);
        }
    },// Met en valeur un participant
    interrogate:function(param, obj){
        camera.stopStartScan(true);
        var eximg = document.getElementById(obj.id).src;
        document.getElementById(obj.id).src = "img/Ellipsis-2.6s-100px.gif";
        comm.action = param;
        setTimeout(function(){document.getElementById(obj.id).src = eximg;},1000);
      },
      // Afficher la bonne réponse sur l'ordinateur
    indiqueReponse:function () {
        camera.stopStartScan(true);
        if (affichage.btnActif > -1)
            return false;
        affichage.btnActif = 1;
        affichage.desactiveBtn();
        comm.action = 'correct';
        if(comm.peerConnexion){
            setTimeout(affichage.restoreButton,2000);
        }
    },
    // Faire afficher les stats de réponses sur l'ordinateur
    afficherStats:function() {
        camera.stopStartScan(true);
        if (affichage.btnActif > -1)
            return false;
        affichage.btnActif = 0;
        affichage.desactiveBtn();
        comm.action = 'stats';
        if(comm.peerConnexion){
        setTimeout(affichage.restoreButton,2000);
        }
    }
};
function onLoad() {
    /*if (utils.storageAvailable('localStorage')) {
        if (localStorage.camera > -1)
            camera.selectedSource = localStorage.camera;
    }*/
    // If url come from a QRCode reader, don't play QRCode reader in app.
    var liendirect = location.href.indexOf("?");
    if (liendirect > 0) {
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var len = hashes.length, hash, vars=[];
        for (var i = 0; i < len; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        if(vars.s !== undefined){
            camera.detectQRCode = false;
            comm.sessionId = vars.s;
            comm.getSession();
        } else if(vars.p !== undefined){
            camera.detectQRCode = false;
            comm.peerConnexionLauncher(vars.p);
        }
    }
    infobox = document.getElementById("infobox");
    if (typeof navigator.mediaDevices === "undefined") {
        // précaution par rapport aux appareils dont la fonctionnalité d'accès à la webcam depuis le navigateur n'est pas implémentée.
        affichage.debug("Votre appareil n'est pas compatible avec l'application, désolé");
        setTimeout(utils.lancerReveal, 1000);
        return false;
    }
    if (typeof navigator.mediaDevices.getUserMedia === "undefined") {
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
    navigator.mediaDevices.enumerateDevices().then(camera.gotVideoDevices).catch(camera.handleError);
    camera.detector = new AR.Detector();
    affichage.canvas = document.getElementById("surcouche");
    affichage.context = affichage.canvas.getContext("2d");
    setTimeout(utils.lancerReveal, 1000);
    //affichage.debug("Pas de session lancée depuis l'ordinateur. L'application ne peut pas fonctionner");
    setTimeout(camera.demarrerCamera, 800);
};

var QRCode = {
  drawLine: function (begin, end, color) {
      affichage.context.beginPath();
      affichage.context.moveTo(begin.x, begin.y);
      affichage.context.lineTo(end.x, end.y);
      affichage.context.lineWidth = 4;
      affichage.context.strokeStyle = color;
      affichage.context.stroke();
    },
    drawCarre: function(code){
      this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
    },
    detectQRCode:function(imageData){
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
      if(code){
        this.drawCarre(code);
        //affichage.debug("Code détecté : "+code.data);
        //affichage.context.fillStyle = "blue";
        //affichage.context.fillText("QRCode détecté, connexion... ", affichage.canvas.width/2, 3*affichage.canvas.height/4+100);
        utils.indiquer("QRCode détecté, connexion...","blue");
        if(code.data.indexOf("p")===0){
            var p = code.data.substring(2);
            comm.peerConnexionLauncher(p);
        }
        else if(code.data.indexOf("s")>0){
            comm.sessionId = code.data.substring(code.data.indexOf("s=")+2);
            comm.getSession();
        }
        return true;
      }
      else return false;
    }
  };

// commandes à distance
// Arrêter l'application
function stop() {
    stopEnvoi();
    comm.action = 'end';
    // on arrête le raffraichissement
    comm.sendDatas();
};

window.onload = onLoad;
