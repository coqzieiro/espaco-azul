document.getElementById('increase-font').addEventListener('click', function() {
    changeFontSize(1);
});

document.getElementById('decrease-font').addEventListener('click', function() {
    changeFontSize(-1);
});

function changeFontSize(amount) {
    var elements = document.querySelectorAll('*');

    elements.forEach(function(element) {
        var computedStyle = window.getComputedStyle(element);

        var currentFontSize = parseFloat(computedStyle.fontSize);

        if (!isNaN(currentFontSize)) { 
            var newFontSize = currentFontSize + amount; 
            element.style.fontSize = newFontSize + 'px';
        }
    });
}
