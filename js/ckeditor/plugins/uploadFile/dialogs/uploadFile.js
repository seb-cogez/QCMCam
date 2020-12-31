CKEDITOR.dialog.add('uploadFileDialog', function(editor){
    createProgressBar = function(){
        // crée une barre de progression
        var prog = document.createElement("progress");
        prog.id="progressbarupload";
        prog.value=0;
        prog.max=100;
        var label = document.createElement("label");
        label.for="progressbarupload";
        label.textContent="Avancement du chargement : ";
        var div = document.createElement("div");
        div.id="progressdiv";
        div.appendChild(label);
        div.appendChild(prog);
        document.body.appendChild(div);
    };
    destroyProgressBar = function(){
        // supprime la barre de progression
        document.getElementById('progressdiv').remove();
    };
    return {
        'title': "Partager votre QCM avec la communauté",
        width: 500,
        height: 250,
        contents:[
            {
                id:'tab-explain',
                label:'Explications',
                elements:[
                    {
                        type:'html',
                        html:'<p>Vous vous apprêtez à envoyer votre QCM à la bibliothèque de <strong>QCMCam</strong>.</p>'+
                        '<p>Avant de cliquer sur <strong style="color:green;">OK</strong> :<ul style="padding-left:20px;margin:10px 0;">'+
                        '<li>Vous reconnaissez être l\'<strong>auteur</strong> du QCM</li>'+
                        '<li>Vous reconnaissez avoir utilisé des médias du <strong>domaine public</strong><br>ou cité vos sources en respectant leurs <strong>droits de partage</strong>.</li>'+
                        '<li>Vous avez indiqué vos <strong>nom</strong>, <strong>mail</strong> et <strong>licence</strong> de partage dans l\'une des diapos.</li>'+
                        '</ul></p>'+
                        "<p>Si toutes ces conditions ne sont pas réunies, veuillez cliquer sur <strong>Annuler</strong>.<br>Le partage n'est malheureusement pas un acte annondin au regard des lois.</p>"+
                        '<p style="margin-top:10px;">Suggestion de licence que vous pouvez copier/coller dans l\'une des diapos :<br><a href="https://creativecommons.org/licenses/by-nc/3.0/fr/"><img src="https://licensebuttons.net/l/by-nc/3.0/88x31.png" alt="" width="88" height="31"><br><strong>Attribution - Pas d’Utilisation Commerciale<br>CC BY-NC FR</strong></a></p>'
                    }
                ]
            },
            {
                id:'tab-dest',
                label:'Destination *',
                elements:[
                    {
                        type:'text',
                        id:'name',
                        setup: function(element){element.setAttribute('placeholder','Youpi')},
                        label:'Nom du fichier (*) (contient des mots clés)',
                        validate:CKEDITOR.dialog.validate.notEmpty('Vous devez indiquer un nom au fichier')
                    },
                    {
                    type:'text',
                    id:'destination',
                    label:'Catégorie (*) (Matière/Niveau/chapitre) du QCM',
                    validate:CKEDITOR.dialog.validate.notEmpty("Vous devez indiquer la destination")
                }
                ]
            },
            {
                id:'tab-desc',
                label:'Descriptif *',
                elements:[{
                    type:'textarea',
                    id:"description",
                    label:'Description (*)',
                    validate:CKEDITOR.dialog.validate.notEmpty("Merci de décrire brièvement le contenu du QCM")
                }
                ]
            }
        ],
        onOk:function(){
            var dialog = this;
            var chemin = dialog.getValueOf('tab-dest', 'destination');
            var descriptif = dialog.getValueOf('tab-desc', 'description');
            var fileName = dialog.getValueOf('tab-dest', 'name');
            var blob = QCMeditors.download(true);
            if(blob.size > 10*1024*1024){
                alert('Votre QCM est trop gros. Il ne peut pas être partagé');
                return false;
            }
            var datasToSend = new FormData();
            datasToSend.append('dest', chemin);
            datasToSend.append('desc', descriptif);
            datasToSend.append('contenu',blob, fileName+".txt");
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "postQCM.php", true);
            createProgressBar();
            xhttp.upload.addEventListener("progress", function(e){
                var pc=parseInt(e.loaded/e.total*100);
                document.getElementById("progressbarupload").value = pc;
                console.log(pc);
            }, false);
            xhttp.onreadystatechange = function(){
                if(this.readyState === 4 && this.status === 200){
                    // message envoyé par postQCM.php
                    var message = JSON.parse(this.responseText);
                    if(message.status === 'success') alert('Fichier bien reçu, merci');
                    else alert('Un problème a été rencontré :\n'+message.info);
                    destroyProgressBar();
                }
            }
            xhttp.send(datasToSend);
        }
    };
});