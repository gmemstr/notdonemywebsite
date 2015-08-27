<!DOCTYPE html>
<!-- Not Done My Website (c) 2015 Gabriel Simmer
    This is still being worked on so make sure to git pull
    from time to time! -->
<?php 
	// Setting variables
	$_site = "Not Done My Website";
    $_page = "Home";
    $_title = $_site . ' | ' . $_page;
?>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php echo $_title ?></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="styling/css.css">
    </head>
	<body>
        <div id="header">
            <h1><?php echo $_site ?></h1>
            <h2>Quickly generate temporary webpages</h2>
        </div>
        
        <div class="creation">
            <h3>Variables for web page</h3>
            <!-- Most of the magic takes place in make.php - look there -->
            <form action="make.php" method="POST">
                <div id="var">Site name: <input type="text" name="sname" placeholder="Not Done My Website">
                </div>
                <div id="var">Site URL: <input type="text" name="surl" placeholder="notdonemy.website">
                </div>
                <div id="var">Webmaster: <input type="text" name="devname" placeholder="John D. Oh">
                </div>
                <div id="var">Primary Colour: <input type="color" name="pcolour" placeholder="#333333">
                </div>
                <div id="var">Secondary Colour: <input type="color" name="scolour" placeholder="#eeeeee">
                </div>
                <div id="var">Template: <input list="templates" name="template">
                <datalist id="templates">
                    <option value="The Original">
                    <option value="Forked">
                </datalist>
                </div>

                <button type="submit" value="Check">Generate</button>
                
           </form>
            
         </div>
	</body>
</html>
    