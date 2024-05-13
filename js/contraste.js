let c = false;

function highContrast(){
    if(c) window.location.reload(true); 
    c = true;
    changeColors(document.body);
}

function changeColors(element) {
    // Apply contrasting colors to the element
    var bgColor = window.getComputedStyle(element).getPropertyValue('background-color');
    var textColor = window.getComputedStyle(element).getPropertyValue('color');
    element.style.backgroundColor = "#000";
    element.style.color = "#fff";

    // Recursively apply colors to child elements
    var children = element.children;
    for (var i = 0; i < children.length; i++) {
        changeColors(children[i]);
    }
}
