console.log("app.js loaded");

var getTemplateHtml = (template, primary_color="#ffffff", secondary_color="#ffffff") => {
	document.getElementById('iframe').src = "about:blank";
	fetch('template/'+template+'.html')
	.then(function(response) {
		return response.text()
	})
	.then(function(html) {
		document.getElementById('iframe').contentWindow.document.write(html);
		// console.log(document.getElementById('iframe').contentWindow.document)
		primary_elements = document.getElementById('iframe').contentWindow.document.getElementsByClassName("primary_color");
		applyColor(primary_elements, primary_color);

		secondary_elements = document.getElementById('iframe').contentWindow.document.getElementsByClassName("secondary_color");
		applyColor(secondary_elements, secondary_color);
		document.getElementById("primary").value = primary_color
		document.getElementById("secondary").value = secondary_color
	});
}

var changeColor = (el) => {
	color = el.value
	iframe_doc = document.getElementById('iframe').contentWindow.document
	if(el.id == "primary")
	{
		divs = iframe_doc.getElementsByClassName("primary_color")
	}
	else
	{
		divs = iframe_doc.getElementsByClassName("secondary_color")
	}
	applyColor(divs, color);
}

var applyColor = (elements, color) => {
	var i;
	for (i = 0; i < elements.length; i++) { 
	  elements[i].style["background-color"] = color;
	}
}
var valueChange = value => {
	var iframehtml = document.getElementById('iframe').contentWindow.document.getElementById(value);
	val = document.getElementById(value).value;
	iframehtml.innerHTML = val
}

var downloadPage = () => {
	var pageContents = new XMLSerializer().serializeToString(document.getElementById('iframe').contentWindow.document)
	pageContents = pageContents.replace("rep_DEVNAME", document.getElementById("devname").value)
	pageContents = pageContents.replace("rep_SNAME", document.getElementById("sitename").value)
	pageContents = pageContents.replace("rep_SURL", document.getElementById("url").value)

	download(pageContents, "index.html", "text/html")
}
getTemplateHtml("original");