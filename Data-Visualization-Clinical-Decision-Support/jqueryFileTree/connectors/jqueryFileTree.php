<?php
//
// jQuery File Tree PHP Connector
//
// Version 1.01
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 24 March 2008
//
// History:
//
// 1.01 - updated to work with foreign characters in directory/file names (12 April 2008)
// 1.00 - released (24 March 2008)
//
// Output a list of files for jQuery File Tree
//
// Modified by Chris Lenk

$_POST['dir'] = urldecode($_POST['dir']);
$_POST['foldersOnly'] = urldecode($_POST['foldersOnly']);
//$root = $_SERVER['DOCUMENT_ROOT'];
$root = $_SERVER['DOCUMENT_ROOT'] . urldecode($_POST['path']);

$returnData = '';

if( file_exists($root . $_POST['dir']) ) {
	$files = scandir($root . $_POST['dir']);
	natcasesort($files);
	if( count($files) > 2 ) { /* The 2 accounts for . and .. */
		$returnData = $returnData . "<ul class=\"jqueryFileTree\" style=\"display: none;\">";
		// All dirs
		foreach ( $files as $file ) {
			if ( $file != '.' && $file != '..' && file_exists($root . $_POST['dir'] . $file) && !file_exists($root . $_POST['dir'] . 'ecg') ) {
				/*error_log(($root . $_POST['dir'] . $file) );
				if (file_exists($root . $_POST['dir'] . $file . '/ecg')) {error_log('true');}
				else  {error_log('false');}*/

				if (is_dir($root . $_POST['dir'] . $file)) { //dirs
					//Add a flag for folders with no data (eg. a patient's folder, containing several exercise folders)
					/*if (!($returnData[0] == 'x')) {
						//$returnData = 'x' . $returnData;
					}*/
					if (file_exists($root . $_POST['dir'] . $file . '/ecg')) {
						//error_log('AAAAAAAAA');
						$returnData = $returnData . "<li class=\"directory collapsed\"><a href=\"#\" file=\"" . $file ."\" rel=\"" . htmlentities($_POST['dir'] . $file) . "/\">" . htmlentities($file) . "</a></li>";
					} else {
						//error_log('BBBBBBBB');
						$returnData = $returnData . "<li class=\"directory collapsed\"><a href=\"#\" file=\"" . $file ."\" rel=\"x" . htmlentities($_POST['dir'] . $file) . "/\">" . htmlentities($file) . "</a></li>";
					}
					
				}
				else if (!is_dir($root . $_POST['dir'] . $file) && $_POST['foldersOnly'] == 'false') { //files; don't use for our data
					$ext = preg_replace('/^.*\./', '', $file);
					$returnData = $returnData . "<li class=\"file ext_$ext\"><a href=\"#\" rel=\"" . htmlentities($_POST['dir'] . $file) . "\">" . htmlentities($file) . "</a></li>";
				}
			}
		}
		$returnData = $returnData . "</ul>";	
	}
	else {
		$returnData = $returnData . 'Not enough files';
	}
}
else {
	$returnData = $returnData . 'Path not found: ' . $root . $_POST['dir'];
}

echo $returnData;

?>