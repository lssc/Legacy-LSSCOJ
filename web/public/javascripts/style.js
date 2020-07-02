// Render markdown
var markdown_area = document.getElementsByClassName('markdown');
for(var i = 0 ; i < markdown_area.length ; i++ ) {
    var element = markdown_area[i];
    var result = marked(element.innerHTML);
    element.innerHTML = result;
}

// Setup Codemirror
var code_area = document.getElementsByClassName('codearea');
for(var i = 0 ; i < code_area.length ; i++ ) {
    var element = code_area[i];
    var editor = CodeMirror.fromTextArea(element, {
        lineNumbers: true,
        mode: "python"
    });
}
