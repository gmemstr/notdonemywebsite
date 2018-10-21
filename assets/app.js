console.log("app.js loaded");

const placeHolders = [];

const getTemplates = () => {
    fetch('templates.json')
        .then(function(response) {
            return response.json()
        })
        .then(function(templates) {
            populateTemplates(templates);
            getTemplateHtml(templates[0].id, templates[0].colors);
        });
};

const populateTemplates = templates => {
    const templatesContainer = document.getElementById('themebtns');
    templates.forEach(template => {
       const button = document.createElement('button');
       button.setAttribute("class", "themebtn");
       button.setAttribute('id', template.id);
       button.addEventListener("click", () => {
           getTemplateHtml(template.id, template.colors);
       });
       button.textContent = template.name + ' (by ' + template.author + ')';
       templatesContainer.appendChild(button);
    });
};

const getTemplateHtml = (template, colors = []) => {
    var i, option_html;
    document.getElementById('iframe').src = "about:blank";
    fetch('template/'+template+'.html')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        html = parseContent(html);
        document.getElementById('iframe').contentWindow.document.write(html);
        document.getElementById('themeclrs').classList.add("hidden");
        if(colors.length > 0)
        {
            document.getElementById('themeclrs').classList.remove("hidden");
            document.getElementById("color_selection").value = colors[0].default;
        }
        document.getElementById("object_selection").innerHTML = "";
        for (i = 0; i < colors.length; i++) { 
            color = colors[i]
            elements = document.getElementById('iframe').contentWindow.document.getElementById(color.id);
            option_html = "<option data-color='" + color.default + "' data-target='" + color.id + "' >" + color.name + "</option>";
            document.getElementById("object_selection").innerHTML += option_html;
            applyColor(elements, color.default);
        }
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
    color = el.value;
    iframe_doc = document.getElementById('iframe').contentWindow.document;
    target_option = document.getElementById('object_selection');
    target_id = target_option.options[target_option.selectedIndex].getAttribute("data-target");
    div = iframe_doc.getElementById(target_id);
    applyColor(div, color);
};

const changeSelectedColor = (el) => {
    target_option = document.getElementById('object_selection');
    target_color = target_option.options[target_option.selectedIndex].getAttribute("data-color");
    document.getElementById("color_selection").value = target_color;
};

const applyColor = (element, color) => {
    if(element != null && element != undefined)
    {
        element.style["background-color"] = color;
    }
};

getTemplates();

loadPlaceholder();
