console.log("app.js loaded");

var getTemplateHtml = template => {
	fetch('template/template.html')
	.then(function(response) {
		return response.text()
	})
	.then(function(html) {
		document.getElementById('iframe').contentWindow.document.write(html);
	});
}

getTemplateHtml("1");

var valueChange = value => {
	var iframehtml = document.getElementById('iframe').contentWindow.document.getElementById(value);
	val = document.getElementById(value).value;
	iframehtml.innerHTML = val
}