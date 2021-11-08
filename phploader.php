<?php
if($_GET['url'] != ""){
    header("Content-type:application/json; charset=utf-8");
    //echo file_get_contents(substr($_SERVER['QUERY_STRING'],4));
    $getFile = file_get_contents($_GET['url']);
    if(!$getFile){
        echo '{"echec":1}';
    } else {
        echo $getFile;
    }
}