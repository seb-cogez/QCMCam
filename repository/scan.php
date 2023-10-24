<?php

$dir = "QCMCam";

// Run the recursive function 

$response = scan($dir);


// This function scans the files folder recursively, and builds a large array

function scan($dir){

	$files = array();

	// Is there actually such a folder/file?

	if(file_exists($dir)){
	
		foreach(scandir($dir) as $f) {
		
			if(!$f || $f[0] == '.') {
				continue; // Ignore hidden files
			}

			if(is_dir($dir . '/' . $f)) {

				// The path is a folder

				$files[] = array(
					"name" => $f,
					"type" => "folder",
					"path" => $dir . '/' . $f,
					"items" => scan($dir . '/' . $f) // Recursively get the contents of the folder
				);
			}
			
			else {
				$path = pathinfo($f);
				if(strtolower($path['extension']) == "txt"){
					// It is a txt file
					// check descriptif
					if(is_file($dir.'/'.$path['filename'].".dsc"))
						$desc = file_get_contents($dir.'/'.$path['filename'].".dsc");
					else
						$desc = "";
					$files[] = array(
						"name" => $f,
						"type" => "file",
						"path" => $dir . '/' . $f,
						"size" => filesize($dir . '/' . $f), // Gets the size of this file
						"desc" => substr($desc, 0, 200)
					);
				}
			}
		}
	
	}

	return $files;
}

// Output the directory listing as JSON

//header('Content-type: application/json');

/*echo*/ file_put_contents('arbo.json',json_encode(array(
	"name" => "QCMCam",
	"type" => "folder",
	"path" => $dir,
	"items" => $response
)));
echo "Arborescence mise à jour";
