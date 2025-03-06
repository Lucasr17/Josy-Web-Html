

// Fonction pour convertir automatiquement le texte en minuscules
function convertToLowercase(input) {
    input.value = input.value.toLowerCase();
}

               // Ajoutez un gestionnaire d'événements pour réinitialiser l'opacité lorsque la page est au sommet du scroll
               window.addEventListener('scroll', function() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;


            //    var button_one = document.querySelector('.buttons .button');

            gsap.registerPlugin(ScrollTrigger);

  /*      if (scrollTop <= 31) {
    button_one.style.opacity = '1';
} else {
    button_one.style.opacity = '0';
}*/

          
                        


            var text1 = document.getElementById('text1');
            var text2 = document.getElementById('text2');
            var txt_josy_histoire_amis = document.getElementById('txt_josy_histoire_amis');
            var text3 = document.getElementById('text3');
            var photodrone_text = document.getElementById('photodrone_text');
            var descriptif_tshirt = document.getElementById('descriptif_tshirt');
            
            var image = document.querySelector('.image');
            
            
            var gallery = document.querySelector('.gallery');
         /*   var T_shirt_Josy_1 = document.querySelector('.T_shirt_Josy_1');
            var T_shirt_Josy_1 = document.querySelector('.T_shirt_Josy_2');
            var T_shirt_Josy_1 = document.querySelector('.Pull_Josydole');
            var T_shirt_Josy_1 = document.querySelector('.Casquette_1');
            var T_shirt_Josy_1 = document.querySelector('.T_shirt_Josyimaginaire');*/
    
  
        });
        
        
  

//

let sreen_largeur = window.innerWidth;

window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    //document.getElementById('scroll-position').textContent = `Pos: ${scrollPosition}px - Larg: ${sreen_largeur}`;

     console.log(`❎Pos: ${scrollPosition}px - Larg: ${sreen_largeur}`);
});


window.addEventListener('resize', () => {
    // Recalcule la largeur et met à jour la position x
sreen_largeur = window.innerWidth;
  //  document.getElementById('scroll-position').textContent = `Scroll position: ${sreen_largeur}px`;

let scrollPosition = window.scrollY;

    //document.getElementById('scroll-position').textContent = `Pos: ${scrollPosition}px - Larg: ${sreen_largeur}`;

    console.log(`❎Pos: ${scrollPosition}px - Larg: ${sreen_largeur}`);

// Recharger la page
// location.reload();

/*window.scrollTo({
    top: scrollPosition,
   // behavior: 'smooth' // défilement fluide
});*/

//fin refresh 
});



