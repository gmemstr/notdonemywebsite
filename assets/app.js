console.log("app.js loaded");

const placeHolders = [];

var getTemplateHtml = template => {
    document.getElementById('iframe').src = "about:blank";
    fetch('template/'+template+'.html')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        html = parseContent(html);
        document.getElementById('iframe').contentWindow.document.write(html);
        console.log(document.getElementById('iframe').contentWindow.document)
    });
};

var valueChange = value => {
    var iframehtml = document.getElementById('iframe').contentWindow.document.getElementById(value);
    var val = document.getElementById(value).value;
    iframehtml.innerHTML = val
};

var downloadPage = () => {
    var pageContents = new XMLSerializer().serializeToString(document.getElementById('iframe').contentWindow.document);
    pageContents = parseContent(pageContents);
    download(pageContents, "index.html", "text/html")
};

var parseContent = pageContents => {
    placeHolders.forEach(ph => {
        const val = document.getElementById(ph.id).value;
        if(val) {
            const re = new RegExp(ph.text, 'g');
            pageContents = pageContents.replace(re, val);
        }
    });
    return pageContents
};

var loadPlaceholder = () => {
    const inputs = document.querySelectorAll('#inputs [type=text]');
    inputs.forEach(input => {
        const ph = {}
        const attrs = input.attributes;
        for(let i = attrs.length - 1; i >= 0; i--) {
            if(attrs[i].name === 'id') {
                ph['id'] = attrs[i].value;
            } else if( attrs[i].name === 'data-placeholder') {
                ph['text'] = attrs[i].value;
            }
        }
        placeHolders.push(ph);
    });
};

loadPlaceholder();

getTemplateHtml("original");