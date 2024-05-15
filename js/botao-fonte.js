document.getElementById('increase-font').addEventListener('click', function() {
    changeFontSize(2);
});

document.getElementById('decrease-font').addEventListener('click', function() {
    changeFontSize(-2);
});

function changeFontSize(amount) {
    var currentFontSize = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
    document.body.style.fontSize = (currentFontSize + amount) + 'px';
}
