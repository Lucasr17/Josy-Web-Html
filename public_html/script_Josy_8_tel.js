
window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        var photodrone = document.querySelector('.photodrone');

        if (scrollTop > 100) { // Ajustez la valeur selon vos besoins
        photodrone.style.opacity = "0";
    } else {
        photodrone.style.opacity = "1";
    }
                    
        
        gsap.registerPlugin(ScrollTrigger);


        if (scrollTop >= 6000 && scrollTop <= 6390) {
            photodrone_text.style.opacity = "1";
            
        } else {
            photodrone_text.style.opacity = "0";
        }

    

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
    if (scrollTop <= 30) {
        text1.style.opacity = "1";
    } else {
        text1.style.opacity = "0";
    }
    
            
    
            // Vérifier les styles appliqués
       //     console.log("🔍 Opacity appliquée :", getComputedStyle(button).opacity);
        });
    
    
    
    });
