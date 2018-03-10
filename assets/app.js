console.log("app.js loaded");

var getTemplateHtml = template => {
	document.getElementById('iframe').src = "about:blank";
	fetch('template/'+template+'.html')
	.then(function(response) {
		return response.text()
	})
	.then(function(html) {
		document.getElementById('iframe').contentWindow.document.write(html);
		console.log(document.getElementById('iframe').contentWindow.document)
	});
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