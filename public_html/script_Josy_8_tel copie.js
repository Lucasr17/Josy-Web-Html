
let currentIndex_tel = 0;
const images_tel = document.querySelectorAll('.carousel img');

function changeImage(direction) {
    images_tel[currentIndex_tel].classList.remove('active');
    images_tel[currentIndex_tel].style.left = direction === 1 ? "-100%" : "100%";
    images_tel[currentIndex_tel].style.opacity = "0";
    
    currentIndex_tel = (currentIndex_tel + direction + images_tel.length) % images_tel.length;
    
    images_tel[currentIndex_tel].style.transition = "none";
    images_tel[currentIndex_tel].style.left = direction === 1 ? "100%" : "-100%";
    images_tel[currentIndex_tel].style.opacity = "0";
    
    setTimeout(() => {
        images_tel[currentIndex_tel].style.transition = "left 0.5s ease-in-out, opacity 0.5s ease-in-out";
        images_tel[currentIndex_tel].classList.add('active');
        images_tel[currentIndex_tel].style.left = "0";
        images_tel[currentIndex_tel].style.opacity = "1";
    }, 50);
}


window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    
        
        gsap.registerPlugin(ScrollTrigger);




    

    });


    document.addEventListener("DOMContentLoaded", function () {
        var button = document.querySelector('.bouton_jeu_tel');
    
        var text1 = document.getElementById('text1');
    
        if (!button) {
            console.error("❌ Bouton non trouvé !");
            return;
        }
    
        window.addEventListener("scroll", function () {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
           // console.log("Scroll détecté, position :", scrollTop);
    
            if (scrollTop <= 31) {
           //     console.log("✅ Bouton visible !");
                button.style.opacity = "1";  // Rend le bouton visible
                button.style.pointerEvents = "auto"; // Permet les interactions avec le bouton
                button.style.visibility = "visible"; // S'assure qu'il est visible
            } else {
           //    console.log("❌ Bouton caché !");
                button.style.opacity = "0";  // Cache le bouton
                button.style.pointerEvents = "none"; // Empêche les interactions
                button.style.visibility = "hidden"; // Cache le bouton
            }
    
            //Début
   /* if (scrollTop <= 30) {
        text1.style.opacity = "1";
    } else {
        text1.style.opacity = "0";
    }*/
    
            
    
            // Vérifier les styles appliqués
       //     console.log("🔍 Opacity appliquée :", getComputedStyle(button).opacity);
        });
    
    
    
    });
