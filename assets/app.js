console.log("app.js loaded");

const placeHolders = [];

const getTemplates = () => {
    fetch('templates.json')
        .then(function(response) {
            return response.json()
        })
        .then(function(templates) {
            populateTemplates(templates);
            getTemplateHtml(templates[0].id);
        });
};

const populateTemplates = templates => {
    const templatesContainer = document.getElementById('themebtns');
    templates.forEach(template => {
       const button = document.createElement('button');
       button.setAttribute("class", "themebtn");
       button.setAttribute('id', template.id);
       button.addEventListener("click", () => {
           getTemplateHtml(template.id, template.primary_color, template.secondary_color);
       });
       button.textContent = template.name + ' (by ' + template.author + ')';
       templatesContainer.appendChild(button);
    });
};

const getTemplateHtml = (template, primary_color="#ffffff", secondary_color="#ffffff") => {
    document.getElementById('iframe').src = "about:blank";
    fetch('template/'+template+'.html')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        html = parseContent(html);
        document.getElementById('iframe').contentWindow.document.write(html);
        primary_elements = document.getElementById('iframe').contentWindow.document.getElementsByClassName("primary_color");
                applyColor(primary_elements, primary_color);

                secondary_elements = document.getElementById('iframe').contentWindow.document.getElementsByClassName("secondary_color");
                applyColor(secondary_elements, secondary_color);
                document.getElementById("primary").value = primary_color
                document.getElementById("secondary").value = secondary_color
    });
};

const valueChange = value => {
    const iframehtml = document.getElementById('iframe').contentWindow.document.getElementById(value);
    if(!iframehtml) return;
    const val = document.getElementById(value).value;
    iframehtml.innerHTML = val
};

const downloadPage = () => {
    let pageContents = new XMLSerializer().serializeToString(document.getElementById('iframe').contentWindow.document);
    pageContents = parseContent(pageContents);
    download(pageContents, "index.html", "text/html")
};

const parseContent = pageContents => {
    placeHolders.forEach(ph => {
        const val = document.getElementById(ph.id).value;
        if(val) {
            const re = new RegExp(ph.text, 'g');
            pageContents = pageContents.replace(re, val);
        }
    });
    return pageContents
};

const loadPlaceholder = () => {
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

const changeColor = (el) => {
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
};

const applyColor = (elements, color) => {
    var i;
    for (i = 0; i < elements.length; i++) { 
      elements[i].style["background-color"] = color;
    }
};

getTemplates();

loadPlaceholder();
