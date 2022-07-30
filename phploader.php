<?php
if($_GET['url'] != "" && !file_exists($_GET["url"])){
    header("Content-type:application/json; charset=utf-8");
    $getFile = file_get_contents($_GET['url']);
    if(!$getFile){
        echo '{"echec":1}';
    } else {
        echo $getFile;
    }
}