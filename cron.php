<?php
// cron pour supprimer les fichiers de la veille
if(!file_exists("sessions/testcron")){
    file_put_contents("sessions/testcron", "");
}
$mdate = date("Ymd", filemtime("sessions/testcron"));
$date = date("Ymd");
if($mdate < $date or $_GET['force']=='1'){
    unlink("sessions/testcron");
    file_put_contents("sessions/testcron", "");
    // delete all files older than today
    $handle = opendir("sessions");
    while($fn = readdir($handle)){
        if($fn == '.' || $fn == '..' || $fn == "index.html" || $fn == "testcron") continue;
        if(date("Ymd",filemtime("session/".$fn)) < $date){
            unlink("sessions/$fn");
        }
    }
}