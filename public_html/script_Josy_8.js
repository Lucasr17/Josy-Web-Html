/*function convertToLowercase(input) {
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
*/
/*

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector('.bouton_participer_jeux');

    var text1 = document.getElementById('text1');

    if (!button) {
        console.error("❌ Bouton non trouvé !");
        return;
    }

    window.addEventListener("scroll", function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
       // console.log("Scroll détecté, position :", scrollTop);

        if (scrollTop <= 31) {
          //  console.log("✅ Bouton visible !");
            button.style.opacity = "1";  // Rend le bouton visible
            button.style.pointerEvents = "auto"; // Permet les interactions avec le bouton
            button.style.visibility = "visible"; // S'assure qu'il est visible
        } else {
          //  console.log("❌ Bouton caché !");
            button.style.opacity = "0";  // Cache le bouton
            button.style.pointerEvents = "none"; // Empêche les interactions
            button.style.visibility = "hidden"; // Cache le bouton
        }

        //Début
if (scrollTop <= 30) {
    text1.style.opacity = "1";
} else {
    text1.style.opacity = "0";
}
    

        // Vérifier les styles appliqués
    //    console.log("🔍 Opacity appliquée :", getComputedStyle(button).opacity);
    });



});

*/
