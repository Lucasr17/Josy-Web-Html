var scrollPosition = window.scrollY;



document.addEventListener("DOMContentLoaded", () => {


    const textEffect = document.querySelector(".text-effect");
    const textContent = textEffect.textContent;

    // Remplace chaque lettre ET espace par un <span>
    textEffect.innerHTML = textContent
        .split("")
        .map(letter => 
            letter === " " ? `<span class="space">&nbsp;</span>` : `<span>${letter}</span>`
        )
        .join("");

    const letters = textEffect.querySelectorAll("span");




    window.addEventListener('scroll', function() {
    //document.getElementById('scroll-position').textContent = `Pos: ${scrollPosition}px - Larg: ${sreen_largeur}`;
    scrollPosition = window.scrollY;
    
     console.log(`❎Pos: ${scrollPosition}px`);


    if (scrollPosition >= 311) {

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


/*
    const textEffect = document.querySelector(".text-effect");
    const textContent = textEffect.textContent.trim(); // Évite les espaces parasites

    // Transforme chaque lettre en <span>
    textEffect.innerHTML = textContent
        .split("")
        .map(letter => 
            letter === " " ? `<span class="space">&nbsp;</span>` : `<span>${letter}</span>`
        )
        .join("");

    const letters = textEffect.querySelectorAll("span");*/

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const startScroll = 1220;
        const endScroll = 1800;
        const scrollRange = endScroll - startScroll;

        if (scrollY < startScroll) {
            // Réinitialisation si on est avant 50px
            letters.forEach(letter => {
                letter.style.transform = "scale(1) translateY(0px)";
            });
            return;
        }

        // Calcul de la progression entre 0 et 1
        let progress = Math.min(Math.max((scrollY - startScroll) / scrollRange, 0), 1);

        // Déterminer l'index de la lettre actuellement affectée
        let affectedIndex = Math.floor(progress * letters.length);

        letters.forEach((letter, index) => {
            // Lettre principale qui grossit
            if (index === letters.length - affectedIndex - 1) {
                letter.style.transform = "scale(1.55) translateY(-14px)";
            } 
            // Lettres voisines à gauche et à droite
            else if (index === letters.length - affectedIndex && index - 1 >= 0) {
                letters[index - 1].style.transform = "scale(1.35) translateY(-8px)";
            }
            else if (index === letters.length - affectedIndex - 2 && index + 1 < letters.length) {
                letters[index + 1].style.transform = "scale(1.35) translateY(-8px)";
            } 
            // Lettres voisines des voisines (à deux indices de distance)
            else if (index === letters.length - affectedIndex - 3 && index + 2 < letters.length) {
                letters[index + 2].style.transform = "scale(1.25) translateY(-5px)";
            } 
            else if (index === letters.length - affectedIndex + 3 && index - 2 >= 0) {
                letters[index - 2].style.transform = "scale(1.25) translateY(-5px)";
            }
            // Toutes les autres reviennent à la normale
            else {
                letter.style.transform = "scale(1) translateY(0px)";
            }
        });
    });




});




const boxes = document.querySelectorAll('.box');

// Définit les déclencheurs spécifiques par boîte
const triggerValues = {
    box1: 0.32, // 60% de la hauteur de l'écran
    box2: 0.55,
    box3: 0.4,
    box4: 0.50,
    box5: 0.45,
};

function checkBoxes() {
    const windowHeight = window.innerHeight;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        const boxBottom = box.getBoundingClientRect().bottom;

        // Récupère la valeur de déclenchement spécifique à cette boîte
        const triggerBottom = windowHeight * (triggerValues[box.classList[1]] || 0.85);
        const triggerTop = windowHeight * 0.45; // Disparition vers le haut

        if (boxTop < triggerBottom && boxBottom > triggerTop) {
            box.classList.add('visible');
            box.classList.remove('hidden');

            // Effet de zoom uniquement pour "BOUM ! Josy"
            const zoomText = box.querySelector('.zoom-text');
            if (zoomText) {
                zoomText.classList.add('zoom-in');
                setTimeout(() => {
                    zoomText.classList.remove('zoom-in');
                }, 1000);
            }

        } else {
            box.classList.remove('visible');
            box.classList.add('hidden');
        }
    });
}

window.addEventListener('scroll', checkBoxes);
checkBoxes(); // Pour afficher les boîtes déjà visibles au chargement


let nb_img_caroussel = 3; // Nombre total d'éléments du carrousel (y compris la vidéo)
let currentIndex = nb_img_caroussel; // Position actuelle

const elements = document.querySelectorAll('.carousel img, .carousel video'); // Sélectionne les images et vidéos

text_fond_josy = document.getElementById('text1');

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
        currentIndex = 0;
    } else if (currentIndex < 3) {
        currentIndex = elements.length - 1;
    }

    setTimeout(() => {
if (currentIndex === 4) {
    text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong> <span style='font-size: 60px;'>entre apéro et tendance</span>";
}else if (currentIndex === 3){
    text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong> À TOUT PRIX</div>";  
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

if (scrollTop <= 30) {
    text1.style.opacity = "1";
} else {
    text1.style.opacity = "0";
}


/*T shirt cintre Debut*/

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector('.bouton_jeu_pc');

    var text1 = document.getElementById('.text1');

    if (!button) {
        console.error("❌ Bouton non trouvé !");
        return;
    }

    window.addEventListener("scroll", function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
       // console.log("Scroll détecté, position :", scrollTop);

        if (scrollTop <= 31) {
       //     console.log("✅ Bouton visible !");
        //    button.style.opacity = "1";  // Rend le bouton visible
            button.style.pointerEvents = "auto"; // Permet les interactions avec le bouton
          //  button.style.visibility = "visible"; // S'assure qu'il est visible
        } else {
       //    console.log("❌ Bouton caché !");
         //   button.style.opacity = "0";  // Cache le bouton
            button.style.pointerEvents = "none"; // Empêche les interactions
         //  button.style.visibility = "hidden"; // Cache le bouton
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


/*T Shrit cintre fin */


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

var button = document.querySelector('.bouton_jeu_pc');



gsap.fromTo(".button", {
    opacity : 1,  // Cache le bouton
    }, {
    opacity : 0,  // Cache le bouton
    scrollTrigger: {
    trigger: document.body,
    start: "0px top",
    end: "90px top",
    scrub: 0,
    markers: false
    }
    });

// Initialiser les balles à leur position initiale sur le chemin
gsap.set(".ball", { opacity:  1});

gsap.set(".ball02", {x:75, y:20});
gsap.set(".ball03", {x:530, y:154});
gsap.set(".ball04", {x:120, y:160});

// Fonction pour imiter le dessin du chemin
const path = document.querySelector("#theLine");
const pathLength = path.getTotalLength();

// Appliquer strokeDasharray et strokeDashoffset pour le chemin
gsap.set(path, {
strokeDasharray: pathLength,
strokeDashoffset: pathLength
});

const pulses = gsap.timeline({
    defaults: {
        scale: 2,
        autoAlpha: 1, /* Rend visible + opacité */
        transformOrigin: 'center', 
        ease: "elastic(1.5, 0.6)"
    }
});

// Anime les emojis avec un léger décalage dans le temps
pulses.to(".emoji01", {}, 0.04)    
      .to(".emoji02", {}, 0.6) 
      .to(".emoji03", {}, 1)
      .to(".emoji04", {}, 1.51)
      .to(".emoji05", {}, 1.98);

const main = gsap.timeline({
scrollTrigger: {
    trigger: "#svg_histoire",
    scrub: true,
    start: "top 500px", // Adapter pour mieux synchroniser
    end: "top -1200px"
}
})
.to(".ball01", {autoAlpha: 1, duration: 0.05})
.to(".theLine", { strokeDashoffset: 0, duration: 4 }, 0) // Simule le dessin de la ligne
.to(".ball01", {
motionPath: {
path: ".theLine",
align: ".theLine",
alignOrigin: [0.5, 0.5]
}, 
duration: 4
}, 0)
.add(pulses, 0);

gsap.fromTo("#svg_histoire", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "210px",
end: "220px",
scrub: 0,
markers: false
}
});


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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
    trigger: document.body,
    start: "5400px",
    end: "5700px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
trigger: document.body,
start: "5000px",
end: "5300px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
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
end: "5000px",
scrub: 0,
markers: false
}
});

gsap.fromTo("#T_shirt_1", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "4997px",
end: "4998px",
scrub: 0,
markers: false
}
});

//fin t shirt cintre

    //fion code 
}

// Exécuter la fonction au chargement
updateGSAPAnimation();

// Mettre à jour lors du redimensionnement de la fenêtre
window.addEventListener("resize", updateGSAPAnimation);


//fin chemin 

variables =  sreen_largeur * 0.30 + 0;//433;
variables_2 = sreen_largeur * 0.063 + 0;//90.7;

opacitys = 0;




//hisotire
/*
gsap.fromTo(".box_histoire_1", {
scaleX: 0,  // Réduit la largeur à zéro au début
scaleY: 0,  // Réduit la hauteur à zéro au début
transformOrigin: "bottom left", // Origine de transformation en bas à gauche
opacity: 0
}, {
scaleX: 1,  // Agrandit la largeur à sa taille originale
scaleY: 1,  // Agrandit la hauteur à sa taille originale
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "256px",
end: "266px",
scrub: 0,
markers: false
}
});

gsap.fromTo(".box_histoire_2", {
scaleX: 0,  // Réduit la largeur à zéro au début
scaleY: 0,  // Réduit la hauteur à zéro au début
transformOrigin: "bottom right", // Origine de transformation en bas à gauche
opacity: 0
}, {
scaleX: 1,  // Agrandit la largeur à sa taille originale
scaleY: 1,  // Agrandit la hauteur à sa taille originale
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "468px",
end: "494px",
scrub: 0,
markers: false
}
});

gsap.fromTo(".box_histoire_3", {
scaleX: 0,  // Réduit la largeur à zéro au début
scaleY: 0,  // Réduit la hauteur à zéro au début
transformOrigin: "top left", // Origine de transformation en bas à gauche
opacity: 0
}, {
scaleX: 1,  // Agrandit la largeur à sa taille originale
scaleY: 1,  // Agrandit la hauteur à sa taille originale
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "712px",
end: "730px",
scrub: 0,
markers: false
}
});

gsap.fromTo(".box_histoire_4", {
scaleX: 0,  // Réduit la largeur à zéro au début
scaleY: 0,  // Réduit la hauteur à zéro au début
transformOrigin: "bottom right", // Origine de transformation en bas à gauche
opacity: 0
}, {
scaleX: 1,  // Agrandit la largeur à sa taille originale
scaleY: 1,  // Agrandit la hauteur à sa taille originale
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "646px",
end: "656px",
scrub: 0,
markers: false
}
});

gsap.fromTo(".box_histoire_5", {
scaleX: 0,  // Réduit la largeur à zéro au début
scaleY: 0,  // Réduit la hauteur à zéro au début
transformOrigin: "bottom right", // Origine de transformation en bas à gauche
opacity: 0
}, {
scaleX: 1,  // Agrandit la largeur à sa taille originale
scaleY: 1,  // Agrandit la hauteur à sa taille originale
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "810px",
end: "820px",
scrub: 0,
markers: false
}
});

/*
gsap.fromTo(".box_histoire_6", {
scaleX: 0,  // Réduit la largeur à zéro au début
scaleY: 0,  // Réduit la hauteur à zéro au début
opacity: 0
}, {
scaleX: 1,  // Agrandit la largeur à sa taille originale
scaleY: 1,  // Agrandit la hauteur à sa taille originale
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "1300px",
end: "1320px",
scrub: 0,
markers: false
}
});*/










//fin histoire

    // Ajoutez un gestionnaire d'événements pour réinitialiser l'opacité lorsque la page est au sommet du scroll
window.addEventListener('scroll', function() {
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
var text2 = document.getElementById('text2');
var txt_josy_histoire_amis = document.getElementById('txt_josy_histoire_amis');
var txt_les_variantes = document.getElementById('txt_les_variantes');
var text3 = document.getElementById('text3');
var descriptif_tshirt = document.getElementById('descriptif_tshirt');
var photodrone_text = document.getElementById('photodrone_text');

var circle = document.querySelector('.circle');

var carree3 = document.querySelector('.carree3');

var T_shirt_Josy_1 = document.querySelector('.T_shirt_Josy_1');
var T_shirt_Josy_1_ = document.querySelector('.T_shirt_Josy_1_');
var T_shirt_Josy_2 = document.querySelector('.T_shirt_Josy_2');
/*var T_shirt_Josy_1 = document.querySelector('.Pull_Josydole');
var T_shirt_Josy_1 = document.querySelector('.Casquette_1');*/
var T_shirt_Josyimaginaire = document.querySelector('.T_shirt_Josyimaginaire');

//var photodrone = document.querySelector('.photodrone');
var carouselcontainer = document.getElementById('.carouselcontainer');
var scroll_bar_container = document.getElementById('.scroll_bar_container');

            

gsap.registerPlugin(ScrollTrigger);



document.addEventListener("DOMContentLoaded", () => {

var tshirt = document.querySelector('.tshirtss');

var rack = document.querySelector('.rack');

    
//const tshirts = document.querySelectorAll(".tshirtss");

// Fonction pour activer/désactiver les événements selon la position du scroll
//const handleScroll = () => {
const scrollTop = window.scrollY; // Obtenir la position actuelle du scroll


let tshirts = document.querySelectorAll(".tshirtss");

// Vérifie si les éléments sont bien détectés
//console.log(`🧐 Nombre de t-shirts détectés: ${tshirts.length}`);

function enableHoverEffect() {
    tshirts.forEach((tshirt) => {
        tshirt.style.pointerEvents = "auto"; // Active le hover
    });
  //  console.log("✅ Hover ACTIVÉ (scroll entre 5300 et 5400)");
}

function disableHoverEffect() {
    tshirts.forEach((tshirt) => {
        tshirt.style.pointerEvents = "none"; // Désactive le hover
    });
  //  console.log("❌ Hover DÉSACTIVÉ (scroll hors de 5300-5400)");
}

// Effet au survol
function hoverEffect(event) {
    let index = Array.from(tshirts).indexOf(event.target);
   // console.log(`🖱️ Survol détecté sur ${event.target.className} - Index: ${index}`);

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
    console.log("🔄 Reset des effets de hover");
    tshirts.forEach((other) => {
        other.style.transform = "translateX(0px)";
        other.style.opacity = "1";
    });
}

// Ajout des événements de survol sur tous les éléments
tshirts.forEach((tshirt) => {
    tshirt.addEventListener("mouseover", hoverEffect);
    tshirt.addEventListener("mouseleave", resetEffect);
 //   console.log(`🎯 Event ajouté sur ${tshirt.className}`);
});

// Détection du scroll et activation/désactivation des interactions
window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
   // console.log(`📜 Scroll actuel: ${scrollTop}px`);

    if (scrollTop >= 5300 && scrollTop <= 5400) {
        enableHoverEffect(); // Active le survol
    } else {
        disableHoverEffect(); // Bloque toute interaction
    }
});



//};

// Écouter l'événement de scroll
//window.addEventListener("scroll", handleScroll);
});







if (scrollTop >= 4999 && scrollTop <= 5705) {
    T_shirt_1.style.opacity = "1"; // Permet les interactions*/
    T_shirt_2.style.opacity = "1";
    T_shirt_3.style.opacity = "1";
    T_shirt_4.style.opacity = "1";
    T_shirt_5.style.opacity = "1";
    T_shirt_6.style.opacity = "1";
    T_shirt_7.style.opacity = "1";
    T_shirt_8.style.opacity = "1";
    T_shirt_9.style.opacity = "1";
    T_shirt_10.style.opacity = "1";
} else {
   // tshirt.style.pointerEvents = "none"; // Désactive les interactions
   T_shirt_1.style.zIndex = "10";
   T_shirt_2.style.zIndex = "9";
   T_shirt_3.style.zIndex = "8";
   T_shirt_4.style.zIndex = "7";
   T_shirt_5.style.zIndex = "6";
   T_shirt_6.style.zIndex = "5";
   T_shirt_7.style.zIndex = "4";
   T_shirt_8.style.zIndex = "3";
   T_shirt_9.style.zIndex = "2";
   T_shirt_10.style.zIndex = "1";

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

if (scrollTop >= 0 && scrollTop <= 5000) {

T_shirt_1.style.transformx = variables ;
T_shirt_2.style.transformx = variables - variables_2;
T_shirt_3.style.transformx = variables - variables_2*2;

function disableMouseOver() {
tshirts.forEach((tshirt) => {
tshirt.removeEventListener("mouseover", handleMouseOver);
tshirt.removeEventListener("mouseleave", handleMouseLeave);
});
}
}



//galerie histoire josy

if (scrollTop >= 180 && scrollTop <= 1600) {
  txt_josy_histoire_amis.style.opacity = "1";
} else {
  txt_josy_histoire_amis.style.opacity = "0";
}

// Les variantes 
if (scrollTop >= 5300 && scrollTop <= 5400) {
    txt_les_variantes.style.opacity = "1";
  } else {
    txt_les_variantes.style.opacity = "0";
  }

//autres

 
 if (scrollTop >= 1100 && scrollTop <= 2000) {
    text3.style.opacity = "0";
} else {
    text3.style.opacity = "0";
}

if (scrollTop >= 4200 && scrollTop <= 4500) {
    descriptif_tshirt.style.opacity = "1";
} else {
    descriptif_tshirt.style.opacity = "0";
}

if (scrollTop >= 4450 && scrollTop <= 4999) {
    T_shirt_Josy_1_.style.opacity = "1";
} else {
    T_shirt_Josy_1_.style.opacity = "0";
}

if (scrollTop >= 6480 && scrollTop <= 6800) {
    vous_josy.style.opacity = "1";
} else {
    vous_josy.style.opacity = "0";
}


if (scrollTop >= 6490 && scrollTop <= 6800) {
    vous_josy_2.style.opacity = "1";
} else {
    vous_josy_2.style.opacity = "0";
}

if (scrollTop >= 6500 && scrollTop <= 6800) {
    four.style.opacity = "1";
} else {
    four.style.opacity = "0";
}


if (scrollTop >= 4880 && scrollTop <= 4950) {
    circle.style.opacity = "0.7";
    
} else {
    circle.style.opacity = "0";
}

if (scrollTop >= 6000 && scrollTop <= 6390) {
    photodrone_text.style.opacity = "0";
    
} else {
    photodrone_text.style.opacity = "0";
}

/*
if (scrollTop >= 10 && scrollTop <= 150) {
    carouselcontainer.style.opacity = "1";
    
} else {
    carouselcontainer.style.opacity = "0";
}*/


/* if (scrollTop >= 4900 && scrollTop <= 6300) {
    T_shirt_Josy_2.style.opacity = "1";
    T_shirt_Josyimaginaire.style.opacity = "1";
} else {
    T_shirt_Josy_2.style.opacity = "0";
    T_shirt_Josyimaginaire.style.opacity = "0";
}*/



});



//t shirt josy


gsap.fromTo(".T_shirt_Josy_1", {
x: 0,
y: 0,
opacity: 1 // Taille initiale à 100%
}, {
x: 0,
y: 0, // Ajout de l'animation sur l'axe Y
opacity: 0, // Grossissement de 10% (taille à 110%)
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4449px",  // Démarre après la première animation
end: "4450px",    // Garde la position pendant 200px
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});




//FIN LEVÉE : 



// Fonction pour recalculer la position du T-shirt
function updateTshirtPosition() {

var sreen_largeur = window.innerWidth;
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

if (scrollTop >= 4450 && scrollTop <= 4500) {

gsap.fromTo(".T_shirt_Josy_1_", {
x: sreen_largeur * 0.29,
}, {
x: sreen_largeur * 0.29,
scrollTrigger: {
trigger: document.body, 
start: "4450px",  
end: "4500px", 
scrub: 0,  
markers: false
}
});

}


if (scrollTop >= 4450 && scrollTop <= 4900) {

gsap.fromTo(".T_shirt_Josy_1_", {
x: sreen_largeur * 0.19,
y: 50,
width: "30vw",
}, {
x: 0,
y: 0, 
width: "42vw",
scrollTrigger: {
trigger: document.body, 
start: "4500px",  
end: "4900px", 
scrub: 0,  
markers: false
}
});

}

/*
if (rack.style.opacity = 1) {
rack.style.left = sreen_largeur * 0.29;
}*/

if (scrollTop >= 4900 && scrollTop <= 5300) {
/*    
gsap.fromTo(".T_shirt_Josyimaginaire", {
x: sreen_largeur * 0.10 + 66,
opacity: 0
}, {
x: sreen_largeur * 0.10 + 66,
opacity: 1,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4900px",
end: "4940px",
scrub: 0, 
markers: false
}
});

gsap.fromTo(".T_shirt_Josyimaginaire", {
x: sreen_largeur * 0.10 + 66,
y: -42,
scale: 0.7,
transform: "translateX(0) translateY(0) rotate(0deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: 0, // Pas de changement de position, seulement la rotation
scale: 1,
transform: "translateX(0) translateY(0) rotate(-35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4950px",  // Démarre après la première animation
end: "5300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});

gsap.fromTo(".T_shirt_Josy_2", {
x: - sreen_largeur * 0.10 - 66,
opacity: 0
}, {
x: - sreen_largeur * 0.10 - 66,
opacity: 1,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4900px",
end: "4940px",
scrub: 0, 
markers: false
}
});

gsap.fromTo(".T_shirt_Josy_2", {
x: - sreen_largeur * 0.10 - 66,
y: -42,
scale: 0.7,
transform: "translateX(0) translateY(0) rotate(0deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: 0, // Pas de changement de position, seulement la rotation
scale: 1,
transform: "translateX(0) translateY(0) rotate(35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4950px",  // Démarre après la première animation
end: "5300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});*/

}

}
/*
gsap.fromTo(".T_shirt_Josy_1_", {
x: 0,
y: 0,
scale: 1.2 // Taille initiale à 100%
}, {
x: 0,
y: -1070, // Ajout de l'animation sur l'axe Y
scale: 1.2, // Grossissement de 10% (taille à 110%)
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "5700px",  // Démarre après la première animation
end: "6300px",    // Garde la position pendant 200px
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});
*/
// Réinitialiser la position au scroll
window.addEventListener('scroll', updateTshirtPosition);


window.addEventListener('resize', () => {
// Recalcule la largeur et met à jour la position x
sreen_largeur = window.innerWidth;

ScrollTrigger.refresh();
//  document.getElementById('scroll-position').textContent = `Scroll position: ${sreen_largeur}px`;

updateTshirtPosition();  // Réactualiser la position du t-shirt
/*  
gsap.fromTo(".T_shirt_Josyimaginaire", {
x: sreen_largeur * 0.10 + 66,
opacity: 0
}, {
x: sreen_largeur * 0.10 + 66,
opacity: 1,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4900px",
end: "4940px",
scrub: 0, 
markers: false
}
});

gsap.fromTo(".T_shirt_Josyimaginaire", {
x: sreen_largeur * 0.10 + 66,
y: -42,
scale: 0.7,
transform: "translateX(0) translateY(0) rotate(0deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: 0, // Pas de changement de position, seulement la rotation
scale: 1,
transform: "translateX(0) translateY(0) rotate(-35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4950px",  // Démarre après la première animation
end: "5300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});

//Josy 2
gsap.fromTo(".T_shirt_Josy_2", {
x: - sreen_largeur * 0.10 - 66,
opacity: 0
}, {
x: - sreen_largeur * 0.10 - 66,
opacity: 1,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4900px",
end: "4940px",
scrub: 0, 
markers: false
}
});

gsap.fromTo(".T_shirt_Josy_2", {
x: - sreen_largeur * 0.10 - 66,
y: -42,
scale: 0.7,
transform: "translateX(0) translateY(0) rotate(0deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: 0, // Pas de changement de position, seulement la rotation
scale: 1,
transform: "translateX(0) translateY(0) rotate(35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4950px",  // Démarre après la première animation
end: "5300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});*/

ScrollTrigger.refresh();

//fin refresh 
});

/*
gsap.fromTo(".T_shirt_Josyimaginaire", {
x: 0,
y: 0,
scale: 1,
transform: "translateX(0) translateY(0) rotate(-35deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: -1100, 
scale: 1,
transform: "translateX(0) translateY(0) rotate(-35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "5700px",  // Démarre après la première animation
end: "6300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});

gsap.fromTo(".T_shirt_Josy_2", {
x: 0,
y: 0,
scale: 1,
transform: "translateX(0) translateY(0) rotate(35deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: -1100, 
scale: 1,
transform: "translateX(0) translateY(0) rotate(35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "5700px",  // Démarre après la première animation
end: "6300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});



//JOSYmaginaire
gsap.fromTo(".T_shirt_Josyimaginaire", {
x: sreen_largeur * 0.10 + 66,
opacity: 0
}, {
x: sreen_largeur * 0.10 + 66,
opacity: 1,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4900px",
end: "4940px",
scrub: 0, 
markers: false
}
});

gsap.fromTo(".T_shirt_Josyimaginaire", {
x: sreen_largeur * 0.10 + 66,
y: -42,
scale: 0.7,
transform: "translateX(0) translateY(0) rotate(0deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: 0, // Pas de changement de position, seulement la rotation
scale: 1,
transform: "translateX(0) translateY(0) rotate(-35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4950px",  // Démarre après la première animation
end: "5300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});


//Josy 2
gsap.fromTo(".T_shirt_Josy_2", {
x: - sreen_largeur * 0.10 - 66,
opacity: 0
}, {
x: - sreen_largeur * 0.10 - 66,
opacity: 1,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4900px",
end: "4940px",
scrub: 0, 
markers: false
}
});

gsap.fromTo(".T_shirt_Josy_2", {
x: - sreen_largeur * 0.10 - 66,
y: -42,
scale: 0.7,
transform: "translateX(0) translateY(0) rotate(0deg)" // Ajout de la rotation initiale
}, {
x: 0,
y: 0, // Pas de changement de position, seulement la rotation
scale: 1,
transform: "translateX(0) translateY(0) rotate(35deg)", // Ajout de la rotation finale
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4950px",  // Démarre après la première animation
end: "5300px",    // Fin de l'animation à 5200px
scrub: 0,  
markers: false // Pour désactiver les repères de démarrage et de fin
}
});

*/

gsap.fromTo(".T_shirt_Josy_1", {
x: () => -sreen_largeur,
y: 500,
scale: 0.7 // Taille initiale à 100%
}, {
x: 0, // Déplacement horizontal sur 80% de la largeur de la fenêtre
y: 0, // Ajout de l'animation sur l'axe Y
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "2000px top", // Déclenche à 2680px du haut de la page
end: "4400px top",   // Fin à 4350px du haut de la page
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});

gsap.fromTo(".T_shirt_Josy_1", {
opacity : 1
}, {
opacity : 0,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "4450px top", // Déclenche à 2680px du haut de la page
end: "4451px top",   // Fin à 4350px du haut de la page
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});

gsap.fromTo(".T_shirt_Josy_1", {
    opacity : 0
    }, {
    opacity : 1,
    scrollTrigger: {
    trigger: document.body, // Déclencher par rapport au body
    start: "2100px top", // Déclenche à 2680px du haut de la page
    end: "3300px top",   // Fin à 4350px du haut de la page
    scrub: 0,  
    markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
    }
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



/*
gsap.fromTo(".photodrone_text", {
y : 1000
}, {
y : 0,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "5800px top", // Déclenche à 2680px du haut de la page
end: "6200px top",   // Fin à 4350px du haut de la page
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});*/

;

gsap.fromTo(".gallery2-container", {
opacity : 1
}, {
opacity : 0,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "6795 top", // Déclenche à 2680px du haut de la page
end: "6820 top",   // Fin à 4350px du haut de la page
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});


gsap.fromTo(".gallery2-container", {
y : 1000
}, {
y : 0,
scrollTrigger: {
trigger: document.body, // Déclencher par rapport au body
start: "6350px top", // Déclenche à 2680px du haut de la page
end: "6500px top",   // Fin à 4350px du haut de la page
scrub: 0,  
markers: false          // Pour voir les repères de démarrage et de fin (pour le debug)
}
});



/*      Sélectionnez l'image
const image = document.querySelector('.photodrone');
const text = document.getElementById('photodrone_text');

// Paramètres pour une animation plus douce
const duration = 1.5; // Durée de l'animation (en secondes)
const easing = "power1.inOut"; // Effet de transition

// Animation pour déplacer l'image vers la droite au survol
image.addEventListener('mouseenter', () => {
gsap.to(image, { xPercent: -80, duration: duration, ease: easing });
gsap.to(text, { width: '25vw', duration: duration, ease: easing });
});

// Animation pour ramener l'image à sa position initiale à la sortie du survol
image.addEventListener('mouseleave', () => {
gsap.to(image, { xPercent: -50, duration: duration, ease: easing });
gsap.to(text, { width: '45vw', duration: duration, ease: easing });
});*/

//GSAP TEST



//FIN GSAP

//fin thsirt josy

//Script galerie


slideIndex = 3;
showSlides(slideIndex);

function plusSlides(n) {
if (n == -1 && slideIndex == 3) {
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

/* if (scrollTop > 500){

    document.getElementById('scrollBar').style.height = 0.5 * reverseScrollPercentage + '%';

}*/

variables =  sreen_largeur * 0.30 + 0;//433;
variables_2 = sreen_largeur * 0.063 + 0;//90.7;
opacitys = 0;



// Mettre à jour l'opacité des points
updatePointsVisibility(scrollTop);
});


// Initialiser la barre de progression et la visibilité des points au chargement de la page
//window.dispatchEvent(new Event('scroll'));

function updatePointsVisibility(scrollTop) {
// Tableau des points avec leurs positions en pixels
const points = [
{ id: 'point100', position: 200 },
{ id: 'point200', position: 2150 },
{ id: 'point300', position: 4200 },
{ id: 'point400', position: 4880 },
{ id: 'point500', position: 5300 },
{ id: 'point600', position: 6200 },
{ id: 'point700', position: 6500 },
{ id: 'point800', position: 7000 },
{ id: 'point900', position: 9999 },
{ id: 'point1000', position: 9999 }
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
    console.error("❌ EErreur : L'élément #bouton_jeu_pc n'existe pas dans le DOM.");
} else {
    console.log("✅ Élément #bouton_jeu_pc trouvé :", boutonJeu);
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
        y: '-35vh',  // Déplace le texte vers le haut
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
        fontSize: '0.6rem',  // Agrandir la taille du texte
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
            y: '-35vh',  // Déplace le texte vers le haut
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
            fontSize: '0.6rem',  // Agrandir la taille du texte
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
        item.classList.add("tab", "left");
      } else {
        item.classList.add("tab", "right");
      }
    }
  });

  controlButtons.forEach(button => {
    const index = parseInt(button.id.split('-')[1]);
    if (index === activeIndex) {
      button.style.transform = 'scale(1.2)';
    } else {
      button.style.transform = 'scale(1)';
    }
  });
}

function Close_Jeu() {
const closePopupButton = document.getElementById('close-popup_Jeu');
const popup = document.getElementById('popup_Jeu');
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



    const iframe = document.getElementById("iframe-jeu");
    const modal = document.getElementById("modal-jeu");
    const countdownText = document.getElementById("countdown-text");

    // Masquer l'iframe au départ pour éviter qu'il garde l'ancienne URL
    try {

    countdownText.style.display = "block";
    iframe.style.display = "none";
    iframe.src = ""; 

    // Afficher la modal immédiatement
    modal.style.display = "block";
    }catch{

    }

    let countdown = 2; // Durée du compte à rebours

        // Mettre à jour le compte à rebours chaque seconde
        countdownText.textContent = `Jeu dans ${countdown}...`;
        countdownText.style.opacity = 1;
        let interval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                countdownText.textContent = `Jeu dans ${countdown}...`;
            } else {
                clearInterval(interval);
                countdownText.textContent = `.`;
                countdownText.style.opacity = 0;
              //  countdownText.style.display = "none"; // Cacher le compte à rebours
                iframe.src = "https://josy2.fly.dev/Josy_Jeu"; 
                iframe.style.display = "block";
            }
        }, 1000);


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
    textContainer.innerHTML += text.charAt(i);
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

// Sélectionner les éléments
const overlay = document.getElementById('overlay');
const introImage = document.querySelector('.intro-image'); // Correspond à votre image
const verticalline = document.querySelector('.vertical-line');

// Précharger l'image en arrière-plan
const preloadImage = new Image();
preloadImage.src = '../Image/Josy - St barth 5.webp'; // Source de votre image

preloadImage.onload = () => {
console.log("Image chargée en arrière-plan !");
};
preloadImage.onerror = () => {
console.error("Erreur lors du chargement de l'image.");
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


try {
// Attendre le chargement des données JSON
const mots = await chargerJSON();


//   document.getElementById("textContainer").textContent = "3"
const motSaisi = document.getElementById("motInput").value.trim(); //.value.toLowerCase().trim();


// Supprimer les accents
let motSansAccent = motSaisi.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// Supprimer les caractères spéciaux et remplacer par une chaîne vide
let motNettoye = motSansAccent.replace(/[^a-zA-Z0-9\s]/g, "").trim();


// Recherche du mot dans la liste
//    document.getElementById("textContainer").textContent = "4"
const motTrouve = mots.find(item => (item.mot) === (motNettoye));
//   document.getElementById("textContainer").textContent = "5"

if (motTrouve) {
motTrouve.nombre++; // Incrémentation du compteur
document.getElementById("resultat").textContent = `Vous êtes la ${motTrouve.nombre}ème personne à penser à  JOSY${motSaisi}.`;

// Mettre à jour le fichier JSON avec la nouvelle valeur
mettreAJourJSON(motNettoye, motTrouve.nombre);

} else if (motSaisi == "") {

document.getElementById("resultat").textContent = `Veuillez saisir un mot`;


} else {
        // Si le mot n'existe pas, ajouter avec "valide": "non" et nombre = 1
const nouveauMot = {mot: motNettoye, nombre: 1, valide: "non" };
// mots_2.push(nouveauMot); // Ajouter à la liste locale
document.getElementById("resultat").textContent = `Le mot JOSY${motSaisi} a été ajouté à la liste à valider.`;

// Mettre à jour le fichier JSON avec le nouveau mot
ajouterNouveauMot(nouveauMot);

//document.getElementById("resultat").textContent = `Le mot JOSY${motSaisi} n'est pas dans la liste.`;
}

// Effacer le champ de saisie après comptage
document.getElementById("motInput").value = "";

}catch (error) {
console.error('Erreur lors de la gestion du mot saisi:', error);
document.getElementById("resultat").textContent = "Une erreur est survenue. Veuillez réessayer.";
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





