<?php
	$sname = $_POST['sname'];
	$surl = $_POST['surl'];
	$devname = $_POST['devname'];
	$pcolour = $_POST['pcolour'];
	$scolour = $_POST['scolour'];

	$template = fopen("template/template.html", "r+");
	$tempContents = fread($template, filesize("template/template.html"));
	
	$keywords = array("rep_PCOLOUR", "rep_SCOLOUR", "rep_SNAME", "rep_URL", "rep_DEVNAME");
	$replacement = array($pcolour, $scolour, $sname, $surl, $devname);
	
	$contents = str_replace($keywords, $replacement, $tempContents);
	
	fclose($template);

	/*
	echo "<?php ";
	echo "$sname ";
	echo "$surl ";
	echo "$devname ";
	echo "$pcolour ";
	echo "$scolour ";
	echo "?> ";
	*/
	
	echo $contents;

	$indexfile = fopen("index.html", "w");
	fwrite($indexfile, NULL);
	fclose($indexfile);
	
	header('Content-Type: text/plain');
	header('Content-Disposition: attachment; filename=index.html');
	readfile("index.html");

?>