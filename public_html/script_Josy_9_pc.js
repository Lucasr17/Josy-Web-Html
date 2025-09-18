//Variable dimension tel 
var dim_tel = 768;




function debugScrollOverflow() {
  const all = document.querySelectorAll('*');

  all.forEach(el => {
    // Forcer visibilité
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.pointerEvents = 'auto';
    el.style.outline = '';

    // Ajoute une couleur aléatoire pour mieux visualiser
    const r = Math.floor(Math.random() * 150 + 50);
    const g = Math.floor(Math.random() * 150 + 50);
    const b = Math.floor(Math.random() * 150 + 50);
    el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;

    // Test de dépassement du viewport
    const rect = el.getBoundingClientRect();
    if (rect.right > window.innerWidth || rect.left < 0) {
      el.style.outline = '2px solid red';
      console.warn('❗ Dépassement horizontal :', el);
    }
  });

  console.log("✅ Tous les éléments sont maintenant visibles et les dépassements sont encadrés en rouge.");
}



var scrollPosition = window.scrollY;



/*- ----------- vague texte survol -----------------
/*
document.addEventListener("DOMContentLoaded", () => {


    var textEffect = document.querySelector(".text-effect");
   // const textContent = textEffect.textContent;

    // Remplace chaque lettre ET espace par un <span>
    textEffect.innerHTML = textContent
        .split("")
        .map(letter => 
            letter === " " ? `<span class="space">&nbsp;</span>` : `<span>${letter}</span>`
        )
        .join("");

    const letters = textEffect.querySelectorAll("span");

    let initialDocumentHeight = document.documentElement.scrollHeight;

    window.addEventListener('scroll', function() {
    //document.getElementById('scroll-position').textContent = `Pos: ${scrollPosition}px - Larg: ${sreen_largeur}`;
    let scrollPosition = window.scrollY;
 //   console.log(`❎ Position du scroll : ${scrollPosition}px`);




    if (scrollPosition >= 1411) {

    textEffect.addEventListener("mousemove", (e) => {
        const rect = textEffect.getBoundingClientRect();
        const mouseX = e.clientX - rect.left; // Position X relative au texte
        let closestIndex = 0;
        let minDistance = Infinity;

        letters.forEach((letter, index) => {
            const letterRect = letter.getBoundingClientRect();
            const letterCenter = letterRect.left + letterRect.width / 2;
            const distance = Math.abs(mouseX - letterCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        letters.forEach((letter, index) => {
            const distanceFromHovered = Math.abs(index - closestIndex);

            if (distanceFromHovered === 0) {
                letter.style.transform = "scale(1.45) translateY(-10px)";
            } else if (distanceFromHovered === 1) {
                letter.style.transform = "scale(1.25) translateY(-5px)";
            } else {
                letter.style.transform = "scale(1)";
            }
        });
    });

    // Réinitialisation quand la souris quitte le texte
    textEffect.addEventListener("mouseleave", () => {
        letters.forEach(letter => {
            letter.style.transform = "scale(1)";
        });
    });

}
});


});*/


/*----------------fin ------------------- */

let nb_img_caroussel = 3; // Nombre total d'éléments du carrousel (y compris la vidéo)
let currentIndex = nb_img_caroussel; // Position actuelle

const elements = document.querySelectorAll('.carousel img, .carousel video'); // Sélectionne les images et vidéos

text_fond_josy = document.getElementById('text1');

function updateJosyText() {
  if (currentIndex === 5) {
    if (window.innerWidth >= 500) {
      text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong>";
    } else {
      text_fond_josy.innerHTML = ""; // Vide
    }
  }

      txt_josy_histoire_amis.innerHTML = `
  <strong>
  <span class='txt_josy_histoire_amis' style='font-size: clamp(16px, 2.5vw, 60px);'>
    JOSY...
  </span>
  </strong>
  <span style='font-size: clamp(12px, 1.9vw, 50px);'>
    une histoire d'amis
  </span>
`;

}

document.getElementById("txt_josy_histoire_amis").innerHTML = `
  <strong>
  <span class='txt_josy_histoire_amis' style='font-size: clamp(16px, 2.5vw, 60px);'>
    JOSY...
  </span>
  </strong>
  <span style='font-size: clamp(12px, 1.9vw, 50px);'>
    une histoire d'amis
  </span>
`;


// Quand tu changes de slide :
if (currentIndex === 5) {
  updateJosyText();
}

// Quand la taille de la fenêtre change :
window.addEventListener('resize', updateJosyText);


function changeImage(direction) {
    const currentElement = elements[currentIndex]; // Élément actuel
    currentElement.classList.remove('active');
    currentElement.style.left = direction === 1 ? "-100%" : "100%";
    currentElement.style.opacity = "0";

    text_fond_josy.style.opacity = "0"; 

    // Si l'élément actuel est une vidéo, on la met en pause
    if (currentElement.tagName === "VIDEO") {
        currentElement.pause();
    }

    // Correction du calcul du nouvel index
    currentIndex += direction;
    if (currentIndex >= elements.length) {
        currentIndex = 3;
    } else if (currentIndex < 3) {
        currentIndex = elements.length - 1;
    }

    setTimeout(() => {
if (currentIndex === 4) {


if (window.innerWidth >= dim_tel) {
text_fond_josy.innerHTML = `
  <strong><span class="josy_text1">JOSY</span></strong>
  <span style="font-size: clamp(30px, 3vw, 70px);">
    entre apéro et tendance
  </span>
`;
    } else{
text_fond_josy.innerHTML = `
  <strong><span class="josy_text1">JOSY</span></strong><br>
  <span style="font-size: clamp(25px, 3vw, 60px); display: inline-block; margin-left: 20px;">
    entre apéro et tendance
  </span>
`;
    }

}else if (currentIndex === 3){
    text_fond_josy.innerHTML = `
  <strong><span class="josy_text1">JOSY</span></strong>
  <span style="font-size: clamp(30px, 4vw, 90px);">
    À TOUT PRIX
  </span>
  `;
}else if (currentIndex === 5){

        if (window.innerWidth >= dim_tel) {
        text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong></div>"; 
    } else{
      text_fond_josy.innerHTML = "<strong><span class='josy_text1'></span></strong></div>"; 
    }
}
text_fond_josy.style.opacity = "1"; 
}, 400);

    const nextElement = elements[currentIndex]; // Élément suivant
    nextElement.style.transition = "none";
    nextElement.style.left = direction === 1 ? "100%" : "-100%";
    nextElement.style.opacity = "0";

    setTimeout(() => {
        nextElement.style.transition = "left 0.5s ease-in-out, opacity 0.5s ease-in-out";
        nextElement.classList.add('active');
        nextElement.style.left = "0";
        nextElement.style.opacity = "1";

        // Si l'élément suivant est une vidéo, on la lance automatiquement
        if (nextElement.tagName === "VIDEO") {
            nextElement.play();
        }
    }, 50);
}


var text1 = document.getElementById('text1');

var scrollTop = window.scrollY || document.documentElement.scrollTop;

/*T shirt cintre Debut*/

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector('.bouton_jeu_pc');

    var text1 = document.getElementById('.text1');

    if (!button) {
        console.error("❌ Bouton non trouvé !");
        return;
    }



});


/*T Shrit cintre fin */

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


const tl = gsap.fromTo("#text1", 
  { opacity: 1 }, 
  { 
    opacity: 0,
    scrollTrigger: {
      trigger: document.body,
      start: "0px top",
      end: "90px top",
      scrub: 0,
      markers: false,
      onUpdate: self => {
        const el = document.querySelector("#text1");
        if (self.progress >= 1) {
          el.style.pointerEvents = "none";
        } else {
          el.style.pointerEvents = "auto";
        }
      }
    }
  }
);


gsap.fromTo(".btn-11", {
    opacity: 0.7,
    pointerEvents: "auto", // Autorise le hover
    cursor: "pointer",
}, {
    opacity: 0,
    pointerEvents: "none", // Désactive le hover
    cursor: "none",
    scrollTrigger: {
    trigger: document.body,
    start: "0px top",
    end: "90px top",
    scrub: 0,
    markers: false
    }
});
/*
gsap.to(".bouton_boutique_pc", {
  scale: 1.03,
  boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
  repeat: -1,
  yoyo: true,
  duration: 1.2,
  ease: "power1.inOut"
});*/









// Créer les animations au chargement de la page
//updateTriggers3();

window.addEventListener("resize", function () {

    var iframe = document.querySelector(".iframe-jeu");

   // iframe.contentWindow.location.reload();

  //  document.querySelector(".resizeOverlay").classList.remove("hide");
  //  document.querySelector(".resizeOverlay").classList.add("show");

    console.log("🔄 Redimensionnement détecté !");
    
});







// Anime les emojis avec un léger décalage dans le temps
      



// Fonction pour recalculer et mettre à jour GSAP
function updateGSAPAnimation() {
    let sreen_largeur = window.innerWidth; // Récupère la largeur actuelle de l'écran
    let variables = sreen_largeur * 0.30; 
    let variables_2 = sreen_largeur * 0.063;

   // console.log(`🔄 Mise à jour : variables = ${variables}, variables_2 = ${variables_2}`);

    // Supprime l'animation précédente
    gsap.killTweensOf("#T_shirt_1"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_2"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_3"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_4"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_5"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_6"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_7"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_8"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_9"); // Permet d'éviter les conflits avec l'ancienne animation
    gsap.killTweensOf("#T_shirt_10"); // Permet d'éviter les conflits avec l'ancienne animation

    // Recrée l'animation GSAP avec les nouvelles valeurs

    if (window.innerWidth > dim_tel) {

//sortie t shirt cintre

gsap.fromTo("#T_shirt_1", {
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    y: -1500,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=820px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=950px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

//retour t shirt cintre

gsap.fromTo("#T_shirt_1", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_2", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_3", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*2,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_4", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*3,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_5", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*4,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_6", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*5,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_7", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*6,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_8", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*7,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_9", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*8,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });

gsap.fromTo("#T_shirt_10", {
    scale: 1,  // Réduit la largeur à zéro au début
    x: 0,//
    y: 0,
    // transformOrigin: "bottom left", // Origine de transformation en bas à gauche
    }, {
    scale: 1,  // Agrandit la largeur à sa taille originale
    x: variables - variables_2*9,
    y: 0,
    scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=700px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 
    scrub: 0,
    markers: false
    }
    });


//debut t shirt cintre

gsap.fromTo("#T_shirt_1", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables,//
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_2", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_3", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*2,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_4", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*3,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_5", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*4,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_6", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*5,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_7", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*6,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_8", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*7,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_9", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*8,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_10", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*9,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
scale: 1,  // Agrandit la largeur à sa taille originale
x: 0,
y: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=500px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});


gsap.fromTo("#T_shirt_1", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables + 0.01,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_2", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_3", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*2,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*2,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_4", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*3,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*3,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_5", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*4,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*4,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_6", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*5,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*5,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_7", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*6,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*6,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_8", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*7,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*7,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_9", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*8,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*8,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: "0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_10", {
scale: 1,  // Réduit la largeur à zéro au début
x: variables - variables_2*9,// sreen_largeur * 0.40 + 60,
y: 0,
// transformOrigin: "bottom left", // Origine de transformation en bas à gauche
}, {
x: variables - variables_2*9,// sreen_largeur * 0.40 + 60,
scrollTrigger: {
trigger: document.body,
start: "0px",
end: " 0px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_1", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_2", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_3", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_4", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_5", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_6", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_7", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_8", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_9", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_10", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=399px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport 
scrub: 0,
markers: false
}
});



//fin t shirt cintre

    //fion code 
}

}

let tshirts = document.querySelectorAll(".tshirtss");

// Vérifie si les éléments sont bien détectés
//console.log(`🧐 Nombre de t-shirts détectés: ${tshirts.length}`);
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// Crée un cache d’images chargées dans le canvas
const imageCanvases = new Map();

function enableHoverEffect() {
   if (window.innerWidth > dim_tel) {
 // console.log("✅ Hover ACTIVÉ");

  tshirts.forEach((tshirt) => {
    tshirt.style.pointerEvents = "auto";

    // Ajoute un écouteur de mouvement de souris sur chaque image
    tshirt.addEventListener("mousemove", handleMouseMove);
  });
}
}

function disableHoverEffect() {
  tshirts.forEach((tshirt) => {
    tshirt.style.pointerEvents = "none";

    // Retire les écouteurs quand le hover est désactivé
    tshirt.removeEventListener("mousemove", handleMouseMove);
  });
}

// Fonction qui vérifie si le pixel sous la souris est opaque
/*function handleMouseMove(e) {
  const img = e.currentTarget;

  if (!imageCanvases.has(img)) {
    const tempCanvas = document.createElement("canvas");
   //ancien code == const tempCtx = tempCanvas.getContext("2d");
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });


    tempCanvas.width = img.naturalWidth;
    tempCanvas.height = img.naturalHeight;
    tempCtx.drawImage(img, 0, 0);

    imageCanvases.set(img, { canvas: tempCanvas, ctx: tempCtx });
  }

  const { canvas, ctx } = imageCanvases.get(img);
  const rect = img.getBoundingClientRect();
  const scaleX = img.naturalWidth / rect.width;
  const scaleY = img.naturalHeight / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
  const alpha = pixel[3];

  if (alpha > 1) {
    //img.style.pointerEvents = "auto"; // Zone visible → bloque les événements sous-jacents
    img.style.cursor = "pointer";
  } else {
    //img.style.pointerEvents = "none"; // Zone transparente → laisse passer les events dessous
    img.style.cursor = "default";
  }
}
*/

function handleMouseMove(e) {
  const img = e.currentTarget;

  if (!imageCanvases.has(img)) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });

    tempCanvas.width = img.naturalWidth;
    tempCanvas.height = img.naturalHeight;
    tempCtx.drawImage(img, 0, 0);

    imageCanvases.set(img, { canvas: tempCanvas, ctx: tempCtx });
  }

  const { canvas, ctx } = imageCanvases.get(img);
  const rect = img.getBoundingClientRect();
  const scaleX = img.naturalWidth / rect.width;
  const scaleY = img.naturalHeight / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
  const alpha = pixel[3];

  if (alpha > 1) {
    // Zone visible → reste sur ce t-shirt
    img.style.cursor = "pointer";
     //console.log(`🖱️ ${alpha} `);
     hoverEffect(e);
  } else {
    // Zone transparente → passer au suivant
    img.style.cursor = "default";
  //  console.log(`📜 zone transparent handleMouseMove`);
   // showNextTshirt(img);
   hoverEffect(e);
  }
}



// Effet au survol 
function hoverEffect(event) {

  var index = 0;

  const img = event.currentTarget;

  if (!imageCanvases.has(img)) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });

    tempCanvas.width = img.naturalWidth;
    tempCanvas.height = img.naturalHeight;
    tempCtx.drawImage(img, 0, 0);

    imageCanvases.set(img, { canvas: tempCanvas, ctx: tempCtx });
  }

  const { canvas, ctx } = imageCanvases.get(img);
  const rect = img.getBoundingClientRect();
  const scaleX = img.naturalWidth / rect.width;
  const scaleY = img.naturalHeight / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
  const alpha = pixel[3];

//console.log(`🖱️ ${alpha} `);

  if (alpha > 1) {
    // Zone visible → reste sur ce t-shirt
    img.style.cursor = "pointer";

     index = Array.from(tshirts).indexOf(event.target);
  //  console.log(`🖱️ Survol principal détecté sur ${event.target.className} - Index: ${index}`);


  } else {
    // Zone transparente → passer au suivant
    img.style.cursor = "default";
 //   console.log(`📜 zone transparent`);
   // showNextTshirt(img);

    index = Array.from(tshirts).indexOf(event.target) + 1;
  //  console.log(`🖱️ Survol arrière détecté sur ${event.target.className} - Index: ${index}`);


  }


    tshirts.forEach((other, i) => {
        if (i > index) {
            other.style.transform = `translateX(0px)`;
            other.style.opacity = "0.5";
        } else if (i === index) {
            other.style.transform = "translateX(7%)";
            other.style.opacity = "1";
        } else {
            other.style.transform = "translateX(-20%)";
            other.style.opacity = "0.5";
        }
    });
}



// Effet quand on quitte le survol
function resetEffect() {
 //   console.log("🔄 Reset des effets de hover");
    tshirts.forEach((other) => {
        other.style.transform = "translateX(0px)";
        other.style.opacity = "1";
    });
}

// Ajout des événements de survol sur tous les éléments
tshirts.forEach((tshirt) => {
    tshirt.addEventListener("mouseover", hoverEffect);
    tshirt.addEventListener("mouseleave", resetEffect);
    console.log(`🎯 Event ajouté sur ${tshirt.className}`);
});


let scrollStart, scrollEnd;

function updateScrollBounds() {
  const trigger = document.querySelector(".section_histoire:nth-child(5)");
  const rect = trigger.getBoundingClientRect();

  const absoluteBottom = window.scrollY + rect.bottom;

  // ⛔️ NE PAS redeclarer avec const ici !
  scrollStart = absoluteBottom + 500;
  scrollEnd = absoluteBottom + 700;
}

// Met à jour les bornes au chargement et au resize
window.addEventListener("load", updateScrollBounds);
window.addEventListener("resize", updateScrollBounds);

// Vérifie à chaque scroll
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;

  // Assure-toi que les bornes ont été initialisées
  if (typeof scrollStart === "number" && typeof scrollEnd === "number") {
    if (scrollTop >= scrollStart && scrollTop <= scrollEnd) {
      enableHoverEffect();
    } else {
      disableHoverEffect();
    }
  }
});

// Exécuter la fonction au chargement
updateGSAPAnimation();

// Mettre à jour lors du redimensionnement de la fenêtre
window.addEventListener("resize", updateGSAPAnimation);


//fin chemin 

variables =  sreen_largeur * 0.30 + 0;//433;
variables_2 = sreen_largeur * 0.063 + 0;//90.7;

opacitys = 0;




    // Ajoutez un gestionnaire d'événements pour réinitialiser l'opacité lorsque la page est au sommet du scroll
window.addEventListener('scroll', function() {

//updateBallPosition()

var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
var text2 = document.getElementById('text2');
var txt_josy_histoire_amis = document.getElementById('txt_josy_histoire_amis');
var txt_les_variantes = document.getElementById('txt_les_variantes');
var txt_tel_qualite = document.getElementById('txt_tel_qualite');
var text3 = document.getElementById('text3');
var descriptif_tshirt = document.getElementById('descriptif_tshirt');
var photodrone_text = document.getElementById('photodrone_text');

var circle = document.querySelector('.circle_tshirt');

var carree3 = document.querySelector('.carree3');

var T_shirt_Josy_1 = document.querySelector('.T_shirt_Josy_1');
var T_shirt_Josy_1_ = document.querySelector('.T_shirt_Josy_1_');
var carousel_tshirt_tel = document.querySelector('#carousel_tshirt_tel');
var T_shirt_Josy_2 = document.querySelector('.T_shirt_Josy_2');
var T_shirt_Josyimaginaire = document.querySelector('.T_shirt_Josyimaginaire');

var carouselcontainer = document.getElementById('.carouselcontainer');
var scroll_bar_container = document.getElementById('.scroll_bar_container');

            

gsap.registerPlugin(ScrollTrigger);



document.addEventListener("DOMContentLoaded", () => {

var tshirt = document.querySelector('.tshirtss');

var rack = document.querySelector('.rack');

    
//const tshirts = document.querySelectorAll(".tshirtss");
let tshirts = document.querySelectorAll(".tshirtss");

// Fonction pour activer/désactiver les événements selon la position du scroll
//const handleScroll = () => {
const scrollTop = window.scrollY; // Obtenir la position actuelle du scroll

// Détection du scroll et activation/désactivation des interactions

   // console.log(`📜 Scroll actuel: ${scrollTop}px`);

   /* if (scrollTop >= 2300 && scrollTop <= 5400) {
        enableHoverEffect(); // Active le survol
    } else {
        disableHoverEffect(); // Bloque toute interaction
    }*/

//gsap.registerPlugin(ScrollTrigger);









});


ScrollTrigger.create({
  trigger: ".section_histoire:nth-child(5)",
  start: "bottom+=320px top",
  end: "bottom+=390px top",
  onEnter: () => txt_tel_qualite.style.opacity = "1",
  onLeave: () => txt_tel_qualite.style.opacity = "0",
  onEnterBack: () => txt_tel_qualite.style.opacity = "1",
  onLeaveBack: () => txt_tel_qualite.style.opacity = "0"
});


let trigger = ScrollTrigger.create({

    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start2: "bottom+=300px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=800px top", // Quand le bas de la section 3 touche le haut du viewport 

  onUpdate: self => {
    let scrollTop = window.scrollY || window.pageYOffset;

    const start = self.start;
    const end = self.end;
    const endPlus = end + 50;


if (window.innerWidth > dim_tel) {

  if (scrollTop >= start && scrollTop <= end) {

    txt_les_variantes.style.opacity = "1";
    support_titre.style.zIndex = "10";
    txt_les_variantes.style.zIndex = "11";

    if (T_shirt_2.style.opacity === "0"){
      T_shirt_1.style.opacity = "1";
      T_shirt_2.style.opacity = "1";
      T_shirt_3.style.opacity = "1";
      T_shirt_4.style.opacity = "1";
      T_shirt_5.style.opacity = "1";
      T_shirt_6.style.opacity = "1";
      T_shirt_7.style.opacity = "1";
      T_shirt_8.style.opacity = "1";
      T_shirt_9.style.opacity = "1";
      T_shirt_10.style.opacity = "1";


T_shirt_1.style.zIndex = "100 000";
  T_shirt_2.style.zIndex = "90 000";
  T_shirt_3.style.zIndex = "80 000";
  T_shirt_4.style.zIndex = "70 000";
  T_shirt_5.style.zIndex = "60 000";
  T_shirt_6.style.zIndex = "50 000";
  T_shirt_7.style.zIndex = "40 000";
  T_shirt_8.style.zIndex = "30 000";
  T_shirt_9.style.zIndex = "20 000";
  T_shirt_10.style.zIndex = "10 000";

 console.log("🔄 ok ajustement 2 ");

    }

    }else{

       if (scrollTop >= start && scrollTop <= endPlus) {
       }else{
      txt_les_variantes.style.opacity = "0";

       }
       
        T_shirt_2.style.opacity = "0";
        T_shirt_3.style.opacity = "0";
        T_shirt_4.style.opacity = "0";
        T_shirt_5.style.opacity = "0";
        T_shirt_6.style.opacity = "0";
        T_shirt_7.style.opacity = "0";
        T_shirt_8.style.opacity = "0";
        T_shirt_9.style.opacity = "0";
        T_shirt_10.style.opacity = "0";
      //  T_shirt_1.style.opacity = "0"; 

// Affiche T_shirt_1 immédiatement
T_shirt_1.style.zIndex = "1000000";

// Affiche les autres 100 ms plus tard
//setTimeout(() => {
  T_shirt_2.style.zIndex = "90 000";
  T_shirt_3.style.zIndex = "80 000";
  T_shirt_4.style.zIndex = "70 000";
  T_shirt_5.style.zIndex = "60 000";
  T_shirt_6.style.zIndex = "50 000";
  T_shirt_7.style.zIndex = "40 000";
  T_shirt_8.style.zIndex = "30 000";
  T_shirt_9.style.zIndex = "20 000";
  T_shirt_10.style.zIndex = "10 000";

 console.log("🔄 ok ajustement" );

    }
//   console.log("🔄 ok ajustement");
//}, 10);


    }else{
       T_shirt_1.style.opacity = "0";
        T_shirt_2.style.opacity = "0";
        T_shirt_3.style.opacity = "0";
        T_shirt_4.style.opacity = "0";
        T_shirt_5.style.opacity = "0";
        T_shirt_6.style.opacity = "0";
        T_shirt_7.style.opacity = "0";
        T_shirt_8.style.opacity = "0";
        T_shirt_9.style.opacity = "0";
        T_shirt_10.style.opacity = "0";
    }
  }
});


if (scrollTop >= 0 && scrollTop <= 5000) {

  
T_shirt_1.style.transformx = variables ;
T_shirt_2.style.transformx = variables - variables_2;
T_shirt_3.style.transformx = variables - variables_2*2;

function disableMouseOver() {

    if (window.innerWidth > dim_tel) {
tshirts.forEach((tshirt) => {
tshirt.removeEventListener("mouseover", handleMouseOver);
tshirt.removeEventListener("mouseleave", handleMouseLeave);
});
}
}
}

//txt_josy_histoire_amis
ScrollTrigger.create({
  trigger: document.body,
  start: "150px",
  endTrigger: ".section_histoire:nth-child(5)",
  end: "bottom+=90px top",
  onEnter: () => {
    txt_josy_histoire_amis.style.opacity = "1"; // Devient visible quand on entre dans la zone
  },
  onLeave: () => {
    txt_josy_histoire_amis.style.opacity = "0"; // Devient invisible quand on quitte la zone vers le bas
  },
  onEnterBack: () => {
    txt_josy_histoire_amis.style.opacity = "1"; // Quand on remonte et rentre à nouveau dans la zone
  },
  onLeaveBack: () => {
    txt_josy_histoire_amis.style.opacity = "0"; // Quand on sort vers le haut
  },
  markers: false
});



//autres

 
 if (scrollTop >= 1100 && scrollTop <= 2000) {
    text3.style.opacity = "0";
} else {
    text3.style.opacity = "0";
}

//vous_josy
ScrollTrigger.create({
  trigger: ".section_histoire:nth-child(5)",
  start: "bottom+=900px top",
  end: "bottom+=1000px top",
  onEnter: () => {
    vous_josy.style.opacity = "1"; // Devient visible quand on entre dans la zone
    vous_josy.style.pointerEvents = "auto";
  },
  onLeave: () => {
    vous_josy.style.opacity = "0"; // Devient invisible quand on quitte la zone vers le bas
    vous_josy.style.pointerEvents = "none";
  },
  onEnterBack: () => {
    vous_josy.style.opacity = "1"; // Quand on remonte et rentre à nouveau dans la zone
    vous_josy.style.pointerEvents = "auto";
  },
  onLeaveBack: () => {
    vous_josy.style.opacity = "0"; // Quand on sort vers le haut
    vous_josy.style.pointerEvents = "none";
  },
  markers: false
});


//vous_josy_2
ScrollTrigger.create({
  trigger: ".section_histoire:nth-child(5)",
  start: "bottom+=920px top",
  end: "bottom+=1000px top",
  onEnter: () => {
    vous_josy_2.style.opacity = "1"; // Devient visible quand on entre dans la zone
    vous_josy_2.style.pointerEvents = "auto";
  },
  onLeave: () => {
    vous_josy_2.style.opacity = "0"; // Devient invisible quand on quitte la zone vers le bas
    vous_josy_2.style.pointerEvents = "none";
  },
  onEnterBack: () => {
    vous_josy_2.style.opacity = "1"; // Quand on remonte et rentre à nouveau dans la zone
    vous_josy_2.style.pointerEvents = "auto";
  },
  onLeaveBack: () => {
    vous_josy_2.style.opacity = "0"; // Quand on sort vers le haut
    vous_josy_2.style.pointerEvents = "none";
  },
  markers: false
});


if (scrollTop >= 6500 && scrollTop <= 6800) {
   // four.style.opacity = "1";
} else {
    four.style.opacity = "0";
}

});



//FIN LEVÉE : 



// Fonction pour recalculer la position du T-shirt
function updateTshirtPosition() {

var sreen_largeur = window.innerWidth;
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;


////if (scrollTop >= 3150 && scrollTop <= 4900) {

//const screen_largeur = window.innerWidth;
const tshirt = document.querySelector(".T_shirt_Josy_1");

// Récupère la position du bas de l'élément (par rapport au viewport)
const rect = tshirt.getBoundingClientRect();
const yStart = rect.top; //+ rect.height;


if (window.innerWidth >= dim_tel) {

gsap.fromTo(".T_shirt_Josy_1_", {
x: sreen_largeur * 0.332,
y: yStart - window.innerHeight * 0.24,
width: "40vw",
}, {
x: 0,
y: 0, 
width: "42vw",
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=265px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=350px top", // Quand le bas de la section 3 touche le haut du viewport 

scrub: 0,  
markers: false
}
});

gsap.fromTo("#carousel_tshirt_tel", {
opacity: 0,
}, {
opacity: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=455px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=456px top", // Quand le bas de la section 3 touche le haut du viewport 

scrub: 0,  
markers: false
}
});

gsap.fromTo("#carousel_tshirt_tel", {
opacity: 0,
}, {
opacity: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=405px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=406px top", // Quand le bas de la section 3 touche le haut du viewport 

scrub: 0,  
markers: false
}
});

}else{

gsap.fromTo(".T_shirt_Josy_1_", {
}, {
opacity: 0,
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=406px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=407px top", // Quand le bas de la section 3 touche le haut du viewport 

scrub: 0,  
markers: false
}
});

gsap.fromTo(".T_shirt_Josy_1_", {
/*x: () => window.innerWidth * 0.236,*/
x: () => window.innerWidth * (0.336),
y: () => yStart - window.innerHeight * 0.24,
width: "65vw",
}, {
x: 0,
y: 0, 
width: "85vw",
scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=265px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=350px top", // Quand le bas de la section 3 touche le haut du viewport 

scrub: 0,  
markers: false
}
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)",
    start: "bottom+=405px top",
    end: "bottom+=706px top", // 405 -> 406 (fade-in) + 50px (pause) + 300px (fade-out)
    scrub: 0,
    markers: false
  }
});

tl.fromTo("#carousel_tshirt_tel", 
  { opacity: 0 }, 
  { opacity: 1, duration: 0.1, onComplete: () => carousel.reset() } // Fade-in
)
.to("#carousel_tshirt_tel", 
  { opacity: 1, duration: 50/300 } // Maintien à 1 sur ~50px
)
.to("#carousel_tshirt_tel", 
  { opacity: 0, duration: 0.5 } // Fade-out
);
  }

}

// Réinitialiser la position au scroll
window.addEventListener('scroll', updateTshirtPosition);


window.addEventListener('resize', () => {

    
// Recalcule la largeur et met à jour la position x
sreen_largeur = window.innerWidth;

//:ScrollTrigger.refresh();
//  document.getElementById('scroll-position').textContent = `Scroll position: ${sreen_largeur}px`;

/////////updateTshirtPosition();  // Réactualiser la position du t-shirt

//ScrollTrigger.refresh();

//fin refresh 
});

gsap.fromTo(".T_shirt_Josy_1_", {
 opacity: 0,
}, {
 opacity: 1,
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=259px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=261px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,
    markers: false
  }
});

if (window.innerWidth >= dim_tel) {


gsap.fromTo(".T_shirt_Josy_1_", {
}, {
 opacity: 0,
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=400px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=401px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,
    markers: false
  }
});

gsap.fromTo(".T_shirt_Josy_1", {
  x: () => -sreen_largeur,
  y: 500,
  scale: 0.7,
  opacity: 0.5,
}, {
  x: 0,
  y: 0,
  scale: 1,
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(1)", // Déclenche quand la section 1 arrive
    start: "top+=1000px bottom", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=200px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,
    markers: false
  }
});


} else {


gsap.fromTo(".T_shirt_Josy_1", {
  x: () => -sreen_largeur,
  y: 600,
  width: "55vw",
  opacity: 0.5,
}, {
  x: 0,
  y: 0,
  width: "65vw",
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(1)", // Déclenche quand la section 1 arrive
    start: "top+=1000px bottom", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=200px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,
    markers: false
  }
});

}



gsap.fromTo(".T_shirt_Josy_1", {
  opacity: 0.5,
}, {
   opacity: 1,
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=180px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=220px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,
    markers: false
  }
});

gsap.fromTo(".T_shirt_Josy_1", {
 opacity: 1,
}, {
 opacity: 0,
  scrollTrigger: {
    trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=259px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=261px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,
    markers: false
  }
});



gsap.fromTo("#descriptif_tshirt", {
    opacity : 0,
    pointerEvents: "none", 
    }, {
    opacity : 1,
    pointerEvents: "auto",
    scrollTrigger: {
   trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=210px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=225px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,  
    markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
    }
});

gsap.fromTo("#descriptif_tshirt", { 
    opacity: 1, 
    pointerEvents: "auto" 
  }, 
  { 
    opacity: 0, 
    pointerEvents: "none", 
    scrollTrigger: {
      trigger: ".section_histoire:nth-child(5)",
      start: "bottom+=245px top",
      endTrigger: ".section_histoire:nth-child(5)",
      end: "bottom+=260px top",
      scrub: 0,
      markers: false
    }
  }
);


gsap.fromTo("#descriptif_tshirt", {
    opacity : 0,
    pointerEvents: "none", 
    }, {
    opacity : 0,
    pointerEvents: "none", 
    scrollTrigger: {
   trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom-=2000px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=209px top", // Quand le bas de la section 3 touche le haut du viewport
    scrub: 0,  
    markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
    }
});

  gsap.timeline({
    scrollTrigger: {
   trigger: ".section_histoire:nth-child(5)", // Déclenche quand la section 1 arrive
    start: "bottom+=351px top", // Quand le haut de la section 1 touche le bas du viewport
    endTrigger: ".section_histoire:nth-child(5)", // Finit quand la section 3 quitte
    end: "bottom+=400px top", // Quand le bas de la section 3 touche le haut du viewport
      scrub: true,
      markers: false
    }
  })
  .fromTo(".circle_tshirt", {
    opacity: 0,
    cursor: "none",
    scale: 1.4
  }, {
    opacity: 0.75,
    cursor: "pointer",
    scale: 1,
    duration: 0.6,
    ease: "power2.out"
  })
  .to(".circle_tshirt", {
    opacity: 0,
    cursor: "none",
    scale: 0.7,
    duration: 0.3,
    ease: "power2.in"
  }, "+=0.5"); // délai avant disparition si tu veux
  



document.querySelectorAll('.circle_tshirt').forEach(circle => {
  const text = circle.dataset.tooltip;
  const side = circle.dataset.tooltipSide || "right";

  // Crée dynamiquement le tooltip
  const tooltip = document.createElement("span");
  tooltip.classList.add("tooltip_text", `tooltip_${side}`);
  tooltip.textContent = text;
  circle.appendChild(tooltip);
});



//photodrone
gsap.fromTo(".carouselcontainer", 
  {
    opacity: 1
  }, 
  {
    opacity: 0,
    scrollTrigger: {
      trigger: document.body, // Déclencheur sur le carrousel
      start: "0px top", // Déclenche quand le haut de la page atteint 0px
      end: "150px top", // Fin de l'animation quand on atteint 150px
      scrub: 0, // Animation fluide au scroll
      markers: false // Pour voir les marqueurs (à enlever en prod)
    }
  }
);

gsap.fromTo(".scroll_bar_container", 
    {
      opacity: 0
    }, 
    {
      opacity: 1,
      scrollTrigger: {
        trigger: document.body, // Déclencheur sur le carrousel
        start: "60px top", // Déclenche quand le haut de la page atteint 0px
        end: "150px top", // Fin de l'animation quand on atteint 150px
        scrub: 0, // Animation fluide au scroll
        markers: false // Pour voir les marqueurs (à enlever en prod)
      }
    }
  );

gsap.fromTo(".gallery2-container", {
opacity : 1
}, {
opacity : 0,
scrollTrigger: {
  trigger: ".section_histoire:nth-child(5)",
  start: "bottom+=1000px top",
  end: "bottom+=1001px top",
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});


gsap.fromTo(".gallery2-container", {
y : 1000
}, {
y : 0,
scrollTrigger: {
  trigger: ".section_histoire:nth-child(5)",
  start: "bottom+=900px top",
  end: "bottom+=915px top",
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});

//FIN GSAP

//fin thsirt josy

//Script galerie


slideIndex = 3;
showSlides(slideIndex);

function plusSlides(n) {
if (n === -1 && slideIndex === 3) {
}else{
showSlides(slideIndex += n);
}
}

function showSlides(n) {
let slides = document.getElementsByClassName("slide");
if (n > slides.length) {
slideIndex = 3;
}
if (n < 1) {
slideIndex = slides.length;
}
let startIndex = slideIndex - 3 < 0 ? 0 : slideIndex - 3;
let endIndex = slideIndex + 2 > slides.length ? slides.length : slideIndex + 2;
for (let i = 0; i < slides.length; i++) {
if (i >= startIndex && i < endIndex) {
slides[i].style.display = "block";
} else {
slides[i].style.display = "none";
}
}
}

let scrollIndex2 = 0;

function scrollGallery(direction) {
const gallery = document.querySelector('.gallery2');
const imageWidth = gallery.querySelector('img').offsetWidth + 10; // Inclut l'espacement
const visibleImages = 4; // Nombre d'images visibles
const totalImages = gallery.children.length; // Nombre total d'images
const maxIndex = Math.ceil(totalImages / visibleImages) - 1; // Indice maximum pour le défilement

// Calculez le nouvel indice de défilement
scrollIndex2 += direction;

// Assurez-vous que l'indice de défilement reste dans les limites
if (scrollIndex2 < 0) scrollIndex2 = 0;
if (scrollIndex2 > maxIndex) scrollIndex2 = maxIndex;

// Appliquez la transformation pour déplacer la galerie
gallery.style.transform = `translateX(-${scrollIndex2 * visibleImages * imageWidth}px)`;
}

//fin galerie


// Écouter l'événement de défilement
window.addEventListener('scroll', function() {
// Calculer la hauteur de la barre de progression

let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let scrollPercentage = (scrollTop / scrollHeight) * 100;

// Inverser le pourcentage pour que la barre se remplisse de haut en bas
let reverseScrollPercentage = 100 - scrollPercentage;

// Mettre à jour la hauteur de la barre de progression
document.getElementById('scrollBar').style.height = reverseScrollPercentage + '%';

variables =  sreen_largeur * 0.3 + 0;//433;
variables_2 = sreen_largeur * 0.063 + 0;//90.7;
opacitys = 0;

// Mettre à jour l'opacité des points
updatePointsVisibility(scrollTop);
});

function updatePointsVisibility(scrollTop) {
// Tableau des points avec leurs positions en pixels
const points = [
{ id: 'point100', position: 200 },
//
// 
// 
// { id: 'point200', position: 2150 },
{ id: 'point300', position: 4200 },
{ id: 'point400', position: 4880 },
{ id: 'point500', position: 5300 },
{ id: 'point600', position: 6200 }
/*{ id: 'point700', position: 6500 },
{ id: 'point800', position: 7000 },
{ id: 'point900', position: 9999 },
{ id: 'point1000', position: 9999 }*/
];

// Mettre à jour l'opacité de chaque point en fonction du pourcentage de défilement
points.forEach(point => {
    const element = document.getElementById(point.id);
    if (scrollTop >= point.position) {
        element.style.opacity = 1;
    } else {
        element.style.opacity = 0;
    }
});
}



//window.dispatchEvent(new Event('scroll'));
let boutonJeu = document.getElementById('bouton_jeu_pc');

if (!boutonJeu) {
  //  console.error("❌ EErreur : L'élément #bouton_jeu_pc n'existe pas dans le DOM.");
} else {
 //   console.log("✅ Élément #bouton_jeu_pc trouvé :", boutonJeu);
}

let buttonsss = document.querySelectorAll("#nav-buttons button:nth-child(-n+5)");

// JavaScript pour basculer le menu
document.getElementById('menuToggle').addEventListener('click', function() {
if (document.body.classList.contains('show-menu')) {

//
buttonsss.forEach(button_ => {
    button.style.display = "none"; // Cacher complètement les boutons
    button_.style.visibility = "hidden"; // Cache visuellement*/
    button_.style.pointerEvents = "none"; // Empêche les clics
});

// Si le menu est visible, on enlève la classe show-menu et on ajoute hide-menu

document.body.classList.remove('show-menu');
document.body.classList.add('hide-menu');

setTimeout(() => {
    if (document.body.classList.contains('hide-menu')) {
    boutonJeu.style.zIndex = "1006";
    }
}, 900); // Un peu plus tard que la réduction

} else {
// Si le menu est caché, on enlève hide-menu et on ajoute show-menu
boutonJeu.style.zIndex = "1002";
document.body.classList.remove('hide-menu');
document.body.classList.add('show-menu');

buttonsss.forEach(button_ => {
    button_.style.visibility = "visible"; // Rend visible
    button_.style.pointerEvents = "auto"; // Réactive les clics
});


}
});



// Sélectionne tous les boutons avec la classe 'button'
var buttons = document.querySelectorAll('.button');

// Ajoute un écouteur d'événements pour chaque bouton
buttons.forEach(function(button) {
button.addEventListener('click', function() {
    // Récupère l'ID du bouton cliqué
    var buttonId = this.id;
    
    // Supprime toutes les classes du modal et ajoute celle correspondante au bouton cliqué
    var modalContainer = document.getElementById('modal-container');
    modalContainer.className = ''; // Supprime toutes les classes
    modalContainer.classList.add(buttonId);

    // Ajoute la classe 'modal-active' au body
    document.body.classList.add('modal-active');
});
});

// Ajoute un écouteur d'événements pour le modal pour le fermer au clic
var modalContainer = document.getElementById('modal-container');
modalContainer.addEventListener('click', function() {
// Ajoute la classe 'out' pour l'animation de fermeture
this.classList.add('out');

// Retire la classe 'modal-active' du body
document.body.classList.remove('modal-active');
});

// Empêche la fermeture du modal si l'on clique à l'intérieur
var modal = document.querySelector('.modal');
modal.addEventListener('click', function(event) {
event.stopPropagation();
});

// Ajoute un écouteur d'événements pour le bouton de fermeture
var closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function() {
// Ferme le modal en ajoutant la classe 'out'
modalContainer.classList.add('out');
document.body.classList.remove('modal-active');
});






// Fonction pour ouvrir le modal avec l'animation "four"
function open_carte() {
var modalContainer = document.getElementById('modal-container_carte');
// Retirer la classe "out" si elle est présente
modalContainer.classList.remove('out');
// Ajouter la classe "four" pour déclencher l'animation
modalContainer.classList.add('four');
}

// Fonction pour fermer le modal
function close_carte() {
var modalContainer = document.getElementById('modal-container_carte');
// Ajouter la classe "out" pour déclencher l'animation de fermeture
modalContainer.classList.add('out');

// Attendre la fin de l'animation avant de cacher le modal
setTimeout(function() {
modalContainer.classList.remove('four', 'out');
// modalContainer.style.transform = 'scale(0)';
}, 500); // La durée de l'animation est de 500ms
}

// Ajouter des écouteurs d'événements aux boutons
document.getElementById('four').addEventListener('click', open_carte);
document.getElementById('close-modal').addEventListener('click', close_carte);  


function sendForm(event) {
event.preventDefault(); // Empêcher la soumission du formulaire

const form = document.getElementById('contactForm');
const formData = new FormData(form);
const errorDiv = document.getElementById('error');

fetch('send_email.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        const popupOverlay = document.getElementById('popupOverlay');
        if (popupOverlay) {
            popupOverlay.style.display = 'flex';
        }
        form.reset(); // Effacer le formulaire
        errorDiv.textContent = ''; // Effacer le message d'erreur précédent
    } else {
        displayErrorMessage(data); // Afficher le message d'erreur détaillé
    }
})
.catch(error => {
    console.error('Erreur:', error);
    errorDiv.textContent = 'Erreur lors de l\'envoi du message: ' + error.message;
});
}

function displayErrorMessage(data) {
const errorDiv = document.getElementById('error');
if (errorDiv) {
    if (data.details) {
        errorDiv.textContent = `Erreur : ${data.message}. Détails : ${data.details.message}`;
    } else {
        errorDiv.textContent = `Erreur : ${data.message}`;
    }
}
}

function closePopup() {
const popupOverlay = document.getElementById('popupOverlay');
if (popupOverlay) {
    popupOverlay.style.display = 'none';
}
}


            // Fonction pour défiler à 2150px
function scrollToPosition_1() {
window.scrollTo({
    top: 180,
    behavior: 'smooth' // défilement fluide
});
}
    // Fonction pour défiler à 2150px
function scrollToPosition_2() {
window.scrollTo({
    top: 2150,
    behavior: 'smooth' // défilement fluide
});
}

function scrollToPosition_3() {
window.scrollTo({
    top: 4450,
    behavior: 'smooth' // défilement fluide
});
}

function scrollToPosition_4() {
window.scrollTo({
    top: 4900,
    behavior: 'smooth' // défilement fluide
});
}

function scrollToPosition_5() {
window.scrollTo({
    top: 5350,
    behavior: 'smooth' // défilement fluide
});
}

function scrollToPosition_7() {
window.scrollTo({
    top: 6500,
    behavior: 'smooth' // défilement fluide
});
}

function scrollToPosition_8() {
window.scrollTo({
    top: 7000,
    behavior: 'smooth' // défilement fluide
});
}


function ToBoutique() {
window.location.href = 'https://josyte.wixstudio.io/josys/category/all-products';
}

const openPopupButton = document.getElementById("open-popup_Jeu");
const popup = document.getElementById("popup_Jeu");
const closePopupButton = document.getElementById("close-popup_Jeu");
const gridItems = document.querySelectorAll(".grid-item");



let activeIndex = null;

    // Toggle the active state of grid items
    gridItems.forEach(item => {
        item.addEventListener("click", (e) => {
          const index = parseInt(e.currentTarget.getAttribute("data-index"));
          
          if (activeIndex === index) {
            activeIndex = null;
          } else {
            activeIndex = index;
          }
  
          updateGrid();
        });
      });


// Update the grid styles based on active index
function updateGrid() {
    

  // Lancer les animations immédiatement
  gridItems.forEach(item => {
    const index = parseInt(item.getAttribute("data-index"));
    item.classList.remove("active", "inactive", "tab");

    const t0 = gsap.timeline();

    if (index === activeIndex) {
      item.classList.add("active");

    if(index === 0){

      t0.to('[data-index="0"]', { 
        duration: 2, 
       /* backgroundImage: "linear-gradient(135deg, #6a4cff, #ff4e7d)", 
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",*/
        width: '80vw', 
        opacity: 1, 
        background: "linear-gradient(135deg, #6a4cff, #ff4e7d)",  // Change de dégradé*/
        boxshadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
        ease: 'power2.inOut' ,
      })
      t0.to("#text_0", {
        duration: 2,
        fontSize: '4rem',  // Agrandir la taille du texte
        color: "rgb(255, 255, 255)",  // Change de dégradé
        y: '-40vh',  // Déplace le texte vers le haut
        ease: 'power2.inOut'
      }, "<") 

      t0.to('[data-index="1"]', { 
        duration: 2, /*
        backgroundImage: "none",  // Supprime le dégradé
        boxShadow: "none",          // Supprime l'ombre*/
        width: '10vw', 
        opacity: 1, 
        ease: 'power2.inOut',
        transformOrigin: "center center",
        backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))",
        boxshadow: "0 0px 0px rgba(0, 0, 0, 0)",
      },"<")      
      t0.to("#text_1", {
        duration: 2,
        fontSize: '0.0rem',  // Agrandir la taille du texte
     /*   color: transparent,  // Change de dégradé
        background: "linear-gradient(135deg, #ff4e7d, #6a4cff)",  // Change de dégradé*/
        y: '0vh',  // Déplace le texte vers le haut
        ease: 'power2.inOut'
      }, "<");

    }else if(index === 1){

        t0.to('[data-index="1"]', { 
            duration: 2, 
            width: '80vw', 
            opacity: 1, 
            ease: 'power2.inOut',
            background: "linear-gradient(135deg, #ff4e7d, #6a4cff)",  // Change de dégradé*/
            boxshadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            transformOrigin: "left center",
          })    
        t0.to("#text_1", {
            duration: 2,
            fontSize: '3rem',  // Agrandir la taille du texte
            color: "rgb(255, 255, 255)",  // Change de dégradé
            y: '-40vh',  // Déplace le texte vers le haut
            ease: 'power2.inOut'
         /*   color: transparent,  // Change de dégradé
            background: "linear-gradient(135deg, #ff4e7d, #6a4cff)",  // Change de dégradé*/
          }, "<")        

          t0.to('[data-index="0"]', { 
            duration: 2, 
            width: '10vw', 
            opacity: 1, 
            ease: 'power2.inOut',
            backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))",
            boxshadow: "0 0px 0px rgba(0, 0, 0, 0)",
            /*backgroundImage: "none",  // Supprime le dégradé
            boxShadow: "none",*/
          }, "<")      
          t0.to("#text_0", {
            duration: 2,
            fontSize: '0.0rem',  // Agrandir la taille du texte
         /*   color: transparent,  // Change de dégradé
            background: "linear-gradient(135deg, #ff4e7d, #6a4cff)",  // Change de dégradé*/
            y: '0vh',  // Déplace le texte vers le haut
            ease: 'power2.inOut'
          }, "<");
           // "<" permet de lancer cette animation en même temps que la précédente
      }

      

    } else if (activeIndex !== null) {
      item.classList.add("inactive");

      if (index < activeIndex) {

        var iframe = document.querySelector(".iframe-jeu");

        setTimeout(() => {
            var emoji_0 = document.getElementById("emoji_0");
            emoji_0.style.opacity = 1;
        }, 1100);

        var emoji_1 = document.getElementById("emoji_1");
      

        iframe.style.display = "flex"; 
        setTimeout(() => {
            iframe.style.opacity = "1";   // Rend visible avec transition
            iframe.style.zIndex = "9999";  // S'assure qu'il est au-dessus
            iframe.style.pointerEvents = "auto";
            //iframe.src="http://127.0.0.1:5500/Josy_jeu.html";
            iframe.src="https://josy2.fly.dev/Josy_Jeu";
           

            
        }, 1200);

        emoji_1.style.opacity = 0;
        
        var textContainer = document.getElementById('textContainer');
        textContainer.textContent = "";
        // 
        textContainer.style.opacity = 0;
        var gridItems = document.querySelectorAll('.spaced-element');  // Sélectionne tous les éléments avec cette classe
        gridItems.forEach(function(gridItem) {
            gridItem.style.opacity = 0;
            gridItem.style.display = 'none';
        }); 
        
        item.classList.add("tab", "left");


      } else {

        var emoji_0 = document.getElementById("emoji_0");
        var emoji_1 = document.getElementById("emoji_1");

        if (emoji_0.style.opacity === 1 || (emoji_0.style.opacity === 0 && emoji_1.style.opacity === 0)) {

        
            // Si l'index est 0, on le cache
        

        var emoji_0 = document.getElementById("emoji_0");
        emoji_0.style.opacity = 0;

        var iframe = document.querySelector(".iframe-jeu");
  
        iframe.style.opacity = "0";  // Commence la transition de disparition
        //iframe.style.zIndex = "-1";  // Place en arrière-plan
        setTimeout(() => {
        iframe.src="";
        iframe.style.display = "none"; // Cache après la transition
        iframe.bottom = "-30%";  // Affiche l'iframe
       
        setTimeout(() => {
        emoji_1.style.opacity = 1;
    }, 700);

    }, 500);


        item.classList.add("tab", "right");
        ecriture_text();

        setTimeout(() => {
          
        var textContainer = document.getElementById('textContainer');
        textContainer.style.opacity = 1;
        
        //🔍  
        var gridItems = document.querySelectorAll('.spaced-element');  // Sélectionne tous les éléments avec cette classe


        gridItems.forEach(function(gridItem) {
            gridItem.style.display = 'inline'; // ou 'flex', 'inline', etc. selon ton besoin
           gridItem.style.opacity = 1;
            console.log("Spaced element 2 OK");
        });  
        }, 1000);

      }

    }

    }
  });

/*  controlButtons.forEach(button => {
    const index = parseInt(button.id.split('-')[1]);
    if (index === activeIndex) {
      button.style.transform = 'scale(1.2)';
    } else {
      button.style.transform = 'scale(1)';
    }
  });*/
}

function Close_Jeu() {

const closePopupButton = document.getElementById('close-popup_Jeu');
const popup = document.getElementById('popup_Jeu');

var iframe = document.querySelector(".iframe-jeu");
  

iframe.style.opacity = "0";  // Commence la transition de disparition
iframe.style.display = "none"; // Cache après la transition
iframe.bottom = "-30%";  // Affiche l'iframe
iframe.src="";

var textContainer = document.getElementById('textContainer');
textContainer.style.opacity = 0;
textContainer.textContent = "";

var gridItems = document.querySelectorAll('.spaced-element');  // Sélectionne tous les éléments avec cette classe

gridItems.forEach(function(gridItem) {
    gridItem.style.display = 'none'; // ou 'flex', 'inline', etc. selon ton besoin
    gridItem.style.opacity = 0;
   
});  

var grid_Items = document.querySelectorAll(".grid-item");
grid_Items.forEach(function(gridItem) {
    gridItem.style.backgroundImage = "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))";
});  

document.querySelector('[data-index="0"]').classList.remove("active");
document.querySelector('[data-index="1"]').classList.remove("active");

document.querySelector('[data-index="0"]').classList.add("inactive");
document.querySelector('[data-index="1"]').classList.add("inactive");



// Close the popup

gsap.to(popup, { 
  opacity: 0, 
  //rotateX: 0, 
  transformOrigin: "center center", 
  //scaleY: 0, 
  duration: 0.4, 
  ease: "power2.in",
  onComplete: () => {
    popup.style.visibility = "hidden";
   // popup.classList.add("hidden");
  }
});
     ////  GridContainer.style.visibility = "hidden";

    /* const t0 = gsap.timeline();

     t0.to('[data-index="0"]', { 
        duration: 0, 
        width: '45vw', 
        opacity: 1,
        ease: 'power2.inOut',
        backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))",
        boxShadow: "none",       // Supprime l'ombre
        onStart: () => {
            document.querySelector('[data-index="0"]').classList.remove("inactive");
            document.querySelector('[data-index="0"]').classList.remove("active");
          }
      });

      t0.to('[data-index="1"]', { 
        duration: 0, 
        width: '45vw', 
        opacity: 1, 
        ease: 'power2.inOut',
        backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))",
        boxShadow: "none",        // Supprime l'ombre
        onStart: () => {
          document.querySelector('[data-index="1"]').classList.remove("inactive");
          document.querySelector('[data-index="1"]').classList.remove("active");
        }
      });

      t0.to("#text_1", {
        duration: 0,
        fontSize: '2rem',  // Agrandir la taille du texte
        color: "rgb(255, 255, 255)",  // Change de dégradé
        y: '0vh',  // Déplace le texte vers le haut
        ease: 'power2.inOut'
      }, "<")  
      
      t0.to("#text_0", {
        duration: 0,
        fontSize: '2rem',  // Agrandir la taille du texte
        color: "rgb(255, 255, 255)",  // Change de dégradé
        y: '0vh',  // Déplace le texte vers le haut
        ease: 'power2.inOut'
      }, "<")  

    activeIndex = null;*/

    document.body.style.overflow = ""; // Empêche le scroll

      
    
}

function startTyping() {


    const t0 = gsap.timeline();

    t0.to('[data-index="0"]', { 
       duration: 0, 
       width: '45vw', 
       opacity: 1,
       ease: 'power2.inOut',
       backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))",
       boxShadow: "none",       // Supprime l'ombre
       onStart: () => {
           document.querySelector('[data-index="0"]').classList.remove("inactive");
           document.querySelector('[data-index="0"]').classList.remove("active");
         }
     });

     t0.to('[data-index="1"]', { 
       duration: 0, 
       width: '45vw', 
       opacity: 1, 
       ease: 'power2.inOut',
       backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))",
       boxShadow: "none",        // Supprime l'ombre
       onStart: () => {
         document.querySelector('[data-index="1"]').classList.remove("inactive");
         document.querySelector('[data-index="1"]').classList.remove("active");
       }
     });

     t0.to("#text_1", {
       duration: 0,
       fontSize: '2rem',  // Agrandir la taille du texte
       color: "rgb(255, 255, 255)",  // Change de dégradé
       y: '0vh',  // Déplace le texte vers le haut
       ease: 'power2.inOut'
    /*   color: transparent,  // Change de dégradé
       background: "linear-gradient(135deg, #ff4e7d, #6a4cff)",  // Change de dégradé*/
     }, "<")  
     
     t0.to("#text_0", {
       duration: 0,
       fontSize: '2rem',  // Agrandir la taille du texte
       color: "rgb(255, 255, 255)",  // Change de dégradé
       y: '0vh',  // Déplace le texte vers le haut
       ease: 'power2.inOut'
    /*   color: transparent,  // Change de dégradé
       background: "linear-gradient(135deg, #ff4e7d, #6a4cff)",  // Change de dégradé*/
     }, "<")  

   activeIndex = null;


document.body.style.overflow = "hidden"; // Empêche le scroll


var button = document.querySelector('.bouton_jeu_pc');

const popup = document.getElementById('popup_Jeu');
//const GridContainer = document.getElementById('grid-container');
const gridItems = document.querySelectorAll('.grid-item');


//popup.classList.remove("hidden");
popup.style.visibility = "visible";

gsap.fromTo(popup, 
  { opacity: 0, /*rotateX: 0, transformOrigin: "center center", scaleY: 0 */}, 
  { opacity: 1,/* rotateX: 0, scale: 1,*/ duration: 2, ease: "power2.out" }
);

// Open the popup
button.addEventListener("click", () => {
//  popup.classList.remove("hidden");
  popup.style.visibility = "visible";
  popup.style.opacity = 1;
 // GridContainer.style.visibility = "visible";
});

}

function ecriture_text() {

    try {
        console.log("Lancement de la fonction startTyping.");
        
        // Texte à afficher progressivement
        var text = "Soyez dans le top 5 des JOSYmots et gagner un bon de réduction";
        
        // Sélection du conteneur où le texte sera affiché
        var textContainer = document.getElementById('textContainer');
        if (!textContainer) {
        throw new Error("Élément avec l'ID 'textContainer' introuvable.");
        }
        
        // Fonction pour afficher le texte progressivement
        function typeWriter(text, i) {
        if (i < text.length) {
            textContainer.textContent += text.charAt(i);
            i++;
            setTimeout(function () {
                typeWriter(text, i);
            }, 60); // Délai entre chaque caractère (en millisecondes)
        } else {
            console.log("Texte affiché avec succès.");
        }
        }
        
        // Efface le contenu précédent du conteneur de texte
        textContainer.innerHTML = '';
        console.log("Contenu précédent effacé.");
        
        // Calcule la largeur totale du texte final
        textContainer.innerHTML = text; // Place temporairement tout le texte pour mesurer
        const textWidth = textContainer.offsetWidth;
        textContainer.innerHTML = ''; // Vide après la mesure
        
        // Centrer à 50 % de la largeur finale
        textContainer.style.left = `calc(50% - ${textWidth / 2}px)`;
        textContainer.style.transform = 'translateX(0)'; // Annule le translate si ajustement précis
        
        // Délai initial avant de commencer à écrire
        setTimeout(function () {
        typeWriter(text, 0);
        }, 1000);
        } catch (error) {
        console.error("Erreur dans startTyping :", error.message);
        throw error; // Facultatif : pour arrêter le script si nécessaire
        }

}





document.addEventListener('DOMContentLoaded', () => {

console.log("chargement en cours .... !");

    // Vérifie si la page a été rechargée suite à un resize
   /*  const fromResize = sessionStorage.getItem("fromResize");

    if (fromResize) {
        console.log("Rechargement suite à un resize, pas d'animation.");
        sessionStorage.removeItem("fromResize"); // Supprime le flag après le rechargement
        document.getElementById('overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
        return; // On stoppe ici pour éviter de lancer l'animation
    }*/

// Sélectionner les éléments
const overlay = document.getElementById('overlay');
const introImage = document.querySelector('.intro-image'); // Correspond à votre image
const verticalline = document.querySelector('.vertical-line');

// Précharger l'image en arrière-plan
const preloadImage = new Image();
preloadImage.src = 'Image/Josy - St barth 5.webp'; // Source de votre image

preloadImage.onload = () => {
//console.log("Image chargée en arrière-plan !");
};
preloadImage.onerror = () => {
//console.error("Erreur lors du chargement de l'image.");
};

// Lancer les animations immédiatement
const tl = gsap.timeline();

tl.to(verticalline, { 
duration: 0.5, 
height: '40vh', 
opacity: 1, 
ease: 'power2.inOut' 
});

// Animation pour montrer l'image
tl.to(introImage, { 
duration: 1.2, 
left: '33%',
ease: 'power2.inOut' 
});

// Pause pour que l'image soit visible
tl.to({}, { duration: 1 });

// Animation pour cacher l'image
tl.to(introImage, { 
duration: 1.2, 
left: '-20%',
ease: 'power2.inOut' 
});

tl.to({}, { duration: 0.05 });

// Réduire la hauteur de la ligne verticale
tl.to(verticalline, { 
duration: 0.5, 
height: '0vh', 
opacity: 1, 
ease: 'power2.inOut' 
});

// Diminuer progressivement l'opacité de l'overlay pour révéler le contenu
tl.to(overlay, { 
duration: 0.8, 
opacity: 0, 
onComplete: () => {
// Masquer complètement l'overlay
overlay.style.display = 'none';
// Permettre le défilement
document.body.style.overflow = 'auto';
}
});
});


let mots = [];
let mots_2 = [];


document.addEventListener("DOMContentLoaded", function() {
let allData = [];

// Fonction pour récupérer les données depuis le fichier JSON
function fetchData() {
return fetch('data.json')
.then(response => response.json())
.then(data => {
    allData = data;
})
.catch(error => console.error('Erreur lors de la récupération des données:', error));
}



// Chargement des données depuis data.json
// Fonction pour charger les données depuis data.json
// Fonction pour charger les données depuis motsJOSY.json
function chargerDonnees() {
return fetch('motsJOSY.json')
.then(response => response.json())
.then(data => {
console.log('Données chargées depuis motsJOSY.json:', data);
mots = data;
return mots; // Retourne les données pour les utiliser plus tard
})
.catch(error => {
console.error('Erreur de chargement des données:', error);
throw error; // Propage l'erreur pour la gérer en aval si nécessaire
});
}

function chargerDonnees_2() {
let mots_2 = [];

return fetch('motsJOSY_A_VALIDER.json')
.then(response => response.json())
.then(data => {
console.log('Données chargées depuis motsJOSY_A_AVLIDER.json:', data);
mots_2 = data;
return mots_2; // Retourne les données pour les utiliser plus tard
})
.catch(error => {
console.error('Erreur de chargement des données motsJOSY_A_AVLIDER:', error);
throw error; // Propage l'erreur pour la gérer en aval si nécessaire
});
}



// Appel de chargerDonnees au chargement de la page
chargerDonnees()
.then(data => {
// Une fois les données chargées avec succès, vous pouvez continuer ici
console.log('Chargement des données terminé avec succès.');

// Définir les mots chargés dans une variable globale accessible
mots = data;
})
.catch(error => {
// Gérer l'erreur de chargement des données ici
console.error('Erreur lors du chargement des données:', error);
});

chargerDonnees_2()
.then(data => {
// Une fois les données chargées avec succès, vous pouvez continuer ici
console.log('Chargement des données terminé avec succès A VALIDER.');

mots_2 = data;
})
.catch(error => {
// Gérer l'erreur de chargement des données ici
console.error('Erreur lors du chargement des données A VALIDER:', error);
});

// Fonction pour sélectionner aléatoirement des éléments
function pickRandomElements(arr, count) {
if (count > arr.length) {
console.error('Le nombre demandé est supérieur au nombre d\'éléments dans le tableau.');
return [];
}
let shuffled = arr.slice();
shuffled.sort(() => 0.5 - Math.random());
return shuffled.slice(0, count);
}

// Fonction pour actualiser les éléments toutes les 20 secondes
function updateRandomElements() {
const selectedData = pickRandomElements(allData, 10);
const container = document.getElementById('randomElements');
container.innerHTML = ''; // Effacer le contenu précédent

selectedData.forEach(item => {
const p = document.createElement('p');
p.textContent = item;
container.appendChild(p);
});
}

// Initialiser les données et mettre à jour les éléments
fetchData().then(() => {
updateRandomElements();
setInterval(updateRandomElements, 40000); // Actualiser toutes les 20 secondes
});

});


// Appeler la fonction initiale au chargement de la page
//updateRandomElements();

// Actualiser les éléments toutes les 20 secondes
//setInterval(updateRandomElements, 40100); // 20 secondes en millisecondes (20 * 1000)



////JEUX JOSY MOTS----------------------------------



// Appeler la fonction pour charger les données au chargement de la page
// chargerDonnees();

// Tableau des mots initialisé



/// TEST MOT JOSY

function compterMot1() {

//  document.getElementById('Valider').addEventListener('click', function() {
const motTrouve = document.getElementById('motInput').value;
document.getElementById("resultat").textContent = '11';

if (motTrouve === '') {
document.getElementById('message').innerText = 'Veuillez entrer un mot.';
document.getElementById("resultat").textContent = 'Veuillez entrer un mot.';
return;
}

document.getElementById("resultat").textContent = '22';

// Envoyer la requête pour vérifier et mettre à jour le fichier JSON
fetch('/update-json', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ mot: motTrouve })
})
.then(response => response.json())
.then(data => {
if (data.success) {
    document.getElementById('message').innerText = 'Le mot a été ajouté ou mis à jour avec succès !';
    document.getElementById("resultat").textContent = 'Le mot a été ajouté ou mis à jour avec succès !';
} else {
    document.getElementById('message').innerText = 'Erreur lors de la mise à jour du fichier.';
    document.getElementById("resultat").textContent ='Erreur lors de la mise à jour du fichier.';
}
})
.catch(error => {
console.error('Erreur:', error);
document.getElementById('message').innerText = 'Erreur de connexion avec le serveur.';
document.getElementById("resultat").textContent = 'Erreur de connexion avec le serveur.';
});
// });

}

///FIN TEST 


// Fonction pour compter le mot saisi
async function compterMot() {

    console.log('Compter Mot ...');


try {
// Attendre le chargement des données JSON
const mots = await chargerJSON();


//   document.getElementById("textContainer").textContent = "3"
const motSaisi = document.getElementById("motInput_").value.trim(); //.value.toLowerCase().trim();


// Supprimer les accents
let motSansAccent = motSaisi.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// Supprimer les caractères spéciaux et remplacer par une chaîne vide
let motNettoye = motSansAccent.replace(/[^a-zA-Z0-9\s]/g, "").trim();


// Recherche du mot dans la liste
//    document.getElementById("textContainer").textContent = "4"
const motTrouve = mots.find(item => (item.mot) === (motNettoye));
//   document.getElementById("textContainer").textContent = "5"

//console.log(`Compter Mot trouve : ${motSaisi}`);


if (motTrouve) {

motTrouve.nombre++; // Incrémentation du compteur
document.querySelector("p.spaced-element").textContent = `Vous êtes la ${motTrouve.nombre}ème personne à penser à JOSY${motSaisi}.`;

console.log(`Compter Mot trouve : ${motSaisi}`);

// Mettre à jour le fichier JSON avec la nouvelle valeur
mettreAJourJSON(motNettoye, motTrouve.nombre);

} else if (motSaisi == "") {

    document.querySelector("p.spaced-element").textContent = `Veuillez saisir un mot`;


} else {
        // Si le mot n'existe pas, ajouter avec "valide": "non" et nombre = 1
const nouveauMot = {mot: motNettoye, nombre: 1, valide: "non" };
// mots_2.push(nouveauMot); // Ajouter à la liste locale
document.querySelector("p.spaced-element").textContent = `Le mot JOSY${motSaisi} a été ajouté à la liste à valider.`;

// Mettre à jour le fichier JSON avec le nouveau mot
ajouterNouveauMot(nouveauMot);

//document.getElementById("resultat").textContent = `Le mot JOSY${motSaisi} n'est pas dans la liste.`;
}

// Effacer le champ de saisie après comptage
document.getElementById("motInput_").value = "";

}catch (error) {
console.error('Erreur lors de la gestion du mot saisi:', error);
document.querySelector("p.spaced-element").textContent = "Une erreur est survenue. Veuillez réessayer.";
}


}


// Fonction pour charger les données JSON existantes
function chargerJSON() {
return fetch('motsJOSY.json')
.then(response => response.json())
.then(data => {
console.log('Données chargées depuis motsJOSY.json:', data);
mots = data;
return mots; // Retourne les données pour les utiliser plus tard
})
.catch(error => {
console.error('Erreur de chargement des données:', error);
throw error; // Propage l'erreur pour la gérer en aval si nécessaire
});
}

// Fonction pour charger les données JSON existantes
function chargerJSON_2() {
return fetch('motsJOSY_A_VALIDER.json')
.then(response => response.json())
.then(data => {
console.log('Données chargées depuis motsJOSY_A_VALIDER.json:', data);
mots_2 = data;
return mots_2; // Retourne les données pour les utiliser plus tard
})
.catch(error => {
console.error('Erreur de chargement des données "A VALIDER":', error);
throw error; // Propage l'erreur pour la gérer en aval si nécessaire
});
}

function ajouterNouveauMot(nouveauMot) {
chargerJSON_2().then(data => {
// Ajouter le nouveau mot aux données
try{
data.push(nouveauMot);
}catch{
    console.error('Erreur lors de l\'ajout du mot au date :', error);   
}

// Envoie les données mises à jour au serveur pour les sauvegarder
return fetch('/update-json-2', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(data) // Envoie les données JSON mises à jour
})
.then(response => response.json())
.then(data => {
console.log('Mot ajouté avec succès dans "à valider":', data.message);
})
.catch(error => {
console.error('Erreur lors de l\'ajout du mot au fichier JSON:', error);
});
});
}

// Fonction pour mettre à jour le fichier JSON
function mettreAJourJSON(updated_mot,updated_nb ) {
chargerJSON().then(data => {
// Cherche la ligne où "mot" est "diot"
const ligne = data.find(item => item.mot === updated_mot);
if (ligne) {
// Met à jour la colonne "nombre" à 2
ligne.nombre = updated_nb;

console.log("Le mot ", updated_mot, " est valide.");
// Envoie les données mises à jour au serveur pour les sauvegarder
return fetch('/update-json', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Envoie les données JSON mises à jour
})
.then(response => response.json())
.then(data => {
    console.log(data.message);
})
.catch(error => {
    console.error('Erreur lors de la mise à jour du fichier JSON:', error);
});
} else {
console.log("Le mot ", updated_mot, " n'a pas été trouvé dans le fichier JSON.");
}
});
}



// Fonction pour sauvegarder les données mises à jour localement
function sauvegarderDonneesLocalement() {
localStorage.setItem('motsJOSY', JSON.stringify(mots));
console.log('Données mises à jour localement.');
}


function Button_open_game() {
console.log("Click bouton open game ");

window.location.href = "https://josy.fly.dev/Josy_Jeu";
};


window.addEventListener('popstate', function(event) {
// Lorsque l'utilisateur appuie sur le bouton retour du navigateur
document.querySelector("#page-container").innerHTML = "<!-- contenu initial ici -->";
});





//carousel_tshirt_tel début ---------------------------------------------------------------------------------------------------



// Class that manage the carousel
class Carousel {

    // Constructor, initialise the carousel
    constructor() {

        // Get image elements
        this.img = [];
        this.img[0] = document.getElementById("carousel-image-0");
        this.img[1] = document.getElementById("carousel-image-1");
        this.img[2] = document.getElementById("carousel-image-2");
        this.img[3] = document.getElementById("carousel-image-3");
        this.img[4] = document.getElementById("carousel-image-4");
        this.img[5] = document.getElementById("carousel-image-5");

        // Set animation key frames forward and backward
        this.animForward  = ['mv0to5', 'mv1to0', 'mv2to1', 'mv3to2', 'mv4to3', 'mv5to4'];
        this.animBackward = ['mv0to1', 'mv1to2', 'mv2to3', 'mv3to4', 'mv4to5', 'mv5to0'];

        // Reset carousel 
        this.reset();

    }



    // Set a new image (src) to image at given position (pos)
    // 0 first image on the left
    // 2 middle image
    // 4 last image
    // 5 hidden image
    setImage(pos, src) {
        this.img[(pos+this.currentImage+4)%6].src = src;
    }

    // Hide an image at given position (pos)
    // 0 first image on the left
    // 2 middle image
    // 4 last image
    // 5 hidden image
    hideImage(pos) {
        this.img[(pos+this.currentImage+4)%6].style.visibility = 'hidden';
    }

    // Show an image at given position (pos)
    // 0 first image on the left
    // 2 middle image
    // 4 last image
    // 5 hidden image    
    showImage(pos) {
        this.img[(pos+this.currentImage+4)%6].style.visibility = 'visible';
    }

    // Reset carousel, set image 2 in the middle
    reset() {
        // Remove animations
        this.img.forEach((image) => {
            this.animForward.forEach((animation) => {
                image.classList.remove( animation );            
            })
            this.animBackward.forEach((animation) => {
                image.classList.remove( animation );            
            })
        })
        this.currentImage=2;
    }

    // Animate one image forward
    // If nextImage is defined, replace the hidden image (at position 5) with the new image
    next(nextImage) {
        
        // Set new image if requested
        if (nextImage !== undefined) this.setImage( 5 , nextImage );

        //  Animate    
        this.img.forEach((image, i) => {    
            
            // Remove animation
            this.animForward.forEach((animation) => { image.classList.remove( animation ); });
            this.animBackward.forEach((animation) => { image.classList.remove( animation ); });

            // Animate to next image
            image.classList.add( this.animForward[(-this.currentImage+i+8)%6] );
        })

        // Increase index to next image
        this.currentImage = (this.currentImage+1)%6;
    }


    // Animate one image backward
    // If previousImage is defined, replace the hidden image (at position 5) with the new image
    previous(previousImage) {
        
        // Set new image if requested
        if (previousImage !== undefined) this.setImage( 5, previousImage );

        //  Animate
        this.img.forEach((image, i) => {    
        //for (let i=0 ; i<=5 ; i++) {
            
            // Remove animations
            this.animForward.forEach((animation) => { image.classList.remove( animation ); });
            this.animBackward.forEach((animation) => { image.classList.remove( animation ); });
            
            // Animate to previous image
            image.classList.add( this.animBackward[(-this.currentImage+i+8)%6] );
        })

        // Decrease index to previous image
        this.currentImage = (this.currentImage+5)%6;
    }
}
// End of class


let carousel = new Carousel();

document.addEventListener('touchstart', (event) => {
  console.log("Click next carousel ... ");
  const touch = event.touches[0];
  const y = touch.clientY;
  const x = touch.clientX;
  const screenWidth = window.innerWidth;

  // Ignore touches dans la zone haute (ex: Tab bar)
  if (y < 100) return;

  if (x < screenWidth / 2) {
    // Touche côté gauche
    carousel.previous();
  } else {
    // Touche côté droit
    carousel.showImage(5); // si tu veux toujours afficher celle-ci
    carousel.next();
  }

  event.preventDefault(); // évite les comportements par défaut (scroll, etc.)
});
