<?php
	
	header('Content-Type: text/plain');
	header('Content-Disposition: attachment; filename=index.html');
	
	$sname = $_POST['sname'];
	$surl = $_POST['surl'];
	$devname = $_POST['devname'];
	$pcolour = $_POST['pcolour'];
	$scolour = $_POST['scolour'];
	$template = $_POST['template'];

	$tFile = "template/template.html";

	if($template == "The Original"){
		$tFile = "template/template.html";
	}
	if($template == "Forked"){
		$tFile = "template/template2.html";
	}

	$template = fopen($tFile, "r+"); // Change this if you have a custom template filename
	$tempContents = fread($template, filesize($tFile));
	
	// Keywords for replacement - see README
	$keywords = array("rep_PCOLOUR", "rep_SCOLOUR", "rep_SNAME", "rep_URL", "rep_DEVNAME");
	$replacement = array($pcolour, $scolour, $sname, $surl, $devname);
	// ---
	
	$contents = str_replace($keywords, $replacement, $tempContents); // Replace the contents of the variable
	
	fclose($template);

	/* Debug stuff
	echo "$sname ";
	echo "$surl ";
	echo "$devname ";
	echo "$pcolour ";
	echo "$scolour ";
	*/
	
	echo $contents; // Echo out the generated page
	
	/* Not actually needed but may need to reuse this code later on
	*
	* $indexfile = fopen("index.html", "w");
	* fwrite($indexfile, NULL);
	* fclose($indexfile);
	* 
	*/
	
	// Make the client download the file as a .html :)

?>