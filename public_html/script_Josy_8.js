function convertToLowercase(input) {
    input.value = input.value.toLowerCase();
}

window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    document.getElementById('scroll-position').textContent = `Pos: ${scrollPosition}px`;
});

document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('navButtons').classList.toggle('show-menu');
});

function sendForm(event) {
    event.preventDefault();
    alert("Formulaire envoyé !");
}

window.addEventListener('resize', () => {
    let screenWidth = window.innerWidth;
    document.getElementById('scroll-position').textContent = `Larg: ${screenWidth}px`;
});
