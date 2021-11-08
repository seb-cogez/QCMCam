<?php
// Upload
if(!empty($_FILES)) {
    $f = $_FILES;
    $path = $_SERVER['DOCUMENT_ROOT'] . '/repository/temp';
    $ds = DIRECTORY_SEPARATOR;

    $errors = 0;
    $uploads = 0;
    $allowed = ["txt"];

    $filename = $f['contenu']['name'];
    $tmp_name = $f['contenu']['tmp_name'];
    $file_size = $f["contenu"]["size"];
    
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $isFileAllowed = ($allowed) ? in_array($ext, $allowed) : true;

    $targetPath = $path . $ds;
    $fullPath = $targetPath . $filename;
    if ( is_writable($targetPath) ) {
        $folder = substr($fullPath, 0, strrpos($fullPath, "/"));
        if(file_exists ($fullPath)) {
            $ext_1 = $ext ? '.'.$ext : '';
            $fullPath = str_replace($ext_1, '', $fullPath) .'_'. date('ymdHis'). $ext_1;
        }

        if($_POST['desc'] != ""){
            file_put_contents(str_replace(".txt", ".dsc", $fullPath), htmlentities($_POST['desc']));
        } else {
            $reponse = array(
                'status' => 'error',
                'info' => 'description file not present'
            );
        }
        if($_POST['dest'] != ""){
            file_put_contents(str_replace(".txt", ".dest", $fullPath), htmlentities($_POST['dest']));
        } else {
            $reponse = array(
                'status' => 'error',
                'info' => 'destination path not present'
            );
        }
        if($file_size > 10485760){
            $reponse = array(
                "status" => 'error',
                'info' => 'File is too big (more than 10 Mo)'
            );
        }
        if(!empty($reponse))
            {
                echo json_encode($reponse);
                exit();
            }
        
        if (empty($f['contenu']['error']) && !empty($tmp_name) && $tmp_name != 'none' && $isFileAllowed) {
            if (move_uploaded_file($tmp_name, $fullPath)) {
                // Be sure that the file has been uploaded
                if ( file_exists($fullPath) ) {
                    $response = array (
                        'status'    => 'success',
                        'info' => "file upload successful"
                    );
                    mail("contact@qcmcam.net","Proposition QCM [envoi auto]","Descriptif :\n\t".$_POST['desc']."\n\nDestination : ".$_POST['dest']."\n".$fullPath);
                } else {
                    $response = array (
                        'status' => 'error',
                        'info'   => 'Couldn\'t upload the requested file.'
                    );
                }
            } else {
                $response = array (
                    'status'    => 'error',
                    'info'      => "Error while uploading files. Uploaded files $uploads",
                );
            }
        }
    } else {
        $response = array (
            'status' => 'error',
            'info'   => 'The specified folder for upload isn\'t writeable.'
        );
    }
    // Return the response
    echo json_encode($response);
} else {
    echo json_encode(array('status'=>'error','info'=>'Upload problem'));
}