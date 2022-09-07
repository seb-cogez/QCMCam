<?php
session_start(); // permet de stoquer des données le temps de la session et de reprendre les données en cas de déconnexion ou relecture de la page.
header("Content-type:application/json; charset=utf-8");
/*if (!isset($_SERVER['HTTP_REFERER']) or empty($_SERVER['HTTP_REFERER'])) {
    session_destroy();
    die('{"connexion":"failed"}');
}
if (strpos($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME']) == false) {
    session_destroy();
    die('{"connexion":"failed"}');
}*/
if (htmlspecialchars($_GET['s']) === "") {
    // on regarde dans le dossier sessions si un fichier numéroté existe et on imcrémente de 1 ou on lit la fin d'un fichier, ou le contenu...
    die('{"connexion":"failed"}');
} else {
    // un petite protection de rien du tout
    $idsession = htmlspecialchars($_GET['s']);
    if (!isset($_SESSION['idsession'])) {
        $_SESSION['idsession'] = $idsession;
        $_SESSION['app'] = false;
    } elseif ($idsession !== $_SESSION['idsession']) {
        $_SESSION['idsession'] = $idsession;
    }
    $rfile = "../sessions/" . $idsession . "_app.txt";
    $wfile = "../sessions/" . $idsession . "_dispo.txt";
    // lecture du fichier
    $messageapp = file_get_contents($rfile);
    // on vide le fichier
    file_put_contents($rfile, "", LOCK_EX);
    echo $messageapp;
    if (!empty($_GET["json"])) {
        file_put_contents($wfile, $_GET['json']."\n", FILE_APPEND | LOCK_EX);
    } else {
        // on ne touche pas au fichier
        die();
    }
}