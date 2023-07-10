window.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('.randomize-text');
    for (let i = 0; i < textElements.length; i++) {
        const textElement = textElements[i]
        const text = textElement.textContent;
        const randomizedText = text
        .split('')
        .map(char => `<span style="animation-delay: ${Math.random() * 1}s">${char}</span>`)
        .join('');
        textElement.innerHTML = randomizedText;
    }
});


window.onresize = function() {
    document.querySelectorAll(".image").each(function() {
        this.style.display = "none";
        this.offsetWidth = this.style.width;
        this.style.display= "inline-block";
    })
}