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
        let ball = document.querySelector(".ball01");
        let rect = ball.getBoundingClientRect(); // Position relative à la fenêtre
    
        let ballX = rect.left + window.scrollX; // Position absolue sur la page
        //console.log("⚽️ Pos X absolue :", ballX, " | ScrollY :", window.scrollY);
    
        const startX = 906;  // Début de l'effet
        const endX = 231;    // Fin de l'effet
        let letters = document.querySelectorAll(".text-effect span");
    
        if (letters.length === 0) return;
    
        if (ballX > startX) {
          //  console.log("🛑 Avant le début de l'effet");
            letters.forEach(letter => {
                letter.style.transform = "scale(1) translateY(0px)";
            });
            return;
        }
    
        if (ballX < endX) {
          //  console.log("🏁 Après la fin de l'effet");
            letters.forEach((letter, index) => {
                if (index === 0) {
                    letter.style.transform = "scale(1.60) translateY(14px)";
                } else {
                    letter.style.transform = "scale(1) translateY(0px)";
                }
            });
            return;
        }
    
        // Progression entre 0 et 1
        let progress = Math.min(Math.max((startX - ballX) / (startX - endX), 0), 1);

     //   console.log("📊 Progression :", progress);
    
        // Déterminer l'index de la lettre actuellement affectée
        let affectedIndex = Math.min(
            Math.floor(progress * letters.length), 
            letters.length - 1 // ✅ S'assure qu'on ne dépasse pas
        );


      //  console.log("✏️ Lettre affectée :", affectedIndex);
    
        letters.forEach((letter, index) => {
            if ((index) === letters.length - affectedIndex - 1) {
       //         console.log("✏️✏️ effet : ", index, "letter lenght : ",letters.length);
                letter.style.transform = "scale(1.60) translateY(14px)";
            } 
            else if (index === letters.length - affectedIndex && index - 1 >= 0) {
                letters[index - 1].style.transform = "scale(1.40) translateY(8px)";
            }
            else if (index === letters.length - affectedIndex - 2 && index + 1 < letters.length) {
                letters[index + 1].style.transform = "scale(1.40) translateY(8px)";
            } 
            else if (index === letters.length - affectedIndex - 3 && index + 2 < letters.length) {
                letters[index + 2].style.transform = "scale(1.27) translateY(5px)";
            } 
            else if (index === letters.length - affectedIndex + 3 && index - 2 >= 0) {
                letters[index - 2].style.transform = "scale(1.27) translateY(5px)";
            }
            else {
                letter.style.transform = "scale(1) translateY(0px)";
            }
        });
    });
    
    
    




});




const boxes = document.querySelectorAll('.box');

function calculateBox4() {
    let width = window.innerWidth;
    
    // Exemple : Plus l'écran est large, plus la valeur est basse (arrive plus tôt)
    let box4Value = 0.20 + (width * 0.001); // Ajuste le facteur selon ton besoin

    // Limites (évite des valeurs extrêmes)
    box4Value = Math.max(0.30, Math.min(0.80, box4Value));

    return box4Value;
}

// Définit les déclencheurs spécifiques par boîte
const triggerValues = {
    box1: 0.40, // 60% de la hauteur de l'écran
    box2: 0.60,
    box3: 0.37,
    box4: 0.40,
    box5: 0.38,
};
/*
window.addEventListener("resize", function () {
    triggerValues.box4 = calculateBox4();
    //console.log("Nouvelle valeur de box4 :", triggerValues.box4);
});*/

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
        currentIndex = 3;
    } else if (currentIndex < 3) {
        currentIndex = elements.length - 1;
    }

    setTimeout(() => {
if (currentIndex === 4) {
    text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong> <span style='font-size: 60px;'>entre apéro et tendance</span>";
}else if (currentIndex === 3){
    text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong> À TOUT PRIX</div>";  
}else if (currentIndex === 5){
    text_fond_josy.innerHTML = "<strong><span class='josy_text1'>JOSY</span></strong></div>";  
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
         //   button.style.pointerEvents = "auto"; // Permet les interactions avec le bouton
          //  button.style.visibility = "visible"; // S'assure qu'il est visible
        } else {
       //    console.log("❌ Bouton caché !");
         //   button.style.opacity = "0";  // Cache le bouton
         //   button.style.pointerEvents = "none"; // Empêche les interactions
         //  button.style.visibility = "hidden"; // Cache le bouton
        }

        //Début
if (scrollTop <= 30) {
  //  text1.style.opacity = "1";
} else {
  //  text1.style.opacity = "0";
}

        

        // Vérifier les styles appliqués
   //     console.log("🔍 Opacity appliquée :", getComputedStyle(button).opacity);
    });



});


/*T Shrit cintre fin */


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


gsap.fromTo(".bouton_boutique_pc", {
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

// Fonction pour imiter le dessin du chemin
const path = document.querySelector("#dynamicPath");
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
/*
function calculateEmoji2() {
    let width = window.innerWidth;
    
    // Exemple : Plus l'écran est large, plus la valeur est basse (arrive plus tôt)
    let emoji2Value = 0 + ((width * 0.78) / 1900); // Ajuste le facteur selon ton besoin

    console.log("Nouvelle valeur de emoji 02 :",  emoji2Value);

    // Limites (évite des valeurs extrêmes)
    emoji2Value = Math.max(0.30, Math.min(0.80, emoji2Value));

    return emoji2Value;

}

function updateTriggers3() {
    triggerValues2.emoji02 = calculateEmoji2();

    // Supprime uniquement les ScrollTriggers liés aux emojis
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.classList.contains("emoji")) {
            trigger.kill();
        }
    });
    

      // **Réinitialiser l’emoji02 à opacity 0**
      gsap.set(".emoji01", { opacity: 0, scale: 1 });
      gsap.set(".emoji02", { opacity: 0, scale: 1 });
      gsap.set(".emoji03", { opacity: 0, scale: 1 });
      gsap.set(".emoji04", { opacity: 0, scale: 1 });
      gsap.set(".emoji04", { opacity: 0, scale: 1 });

    // Recréer l’animation GSAP pour .emoji02
    Object.keys(triggerValues2).forEach((emoji) => {
        gsap.to(`.${emoji}`, {
            opacity: 1,  // Apparition progressive
            scale: 2,    // Agrandissement
            rotation: 0, 
            duration: 0.8, // Animation en 0.8s
            ease: "power2.out",
            scrollTrigger: {
                trigger: `.${emoji}`, 
                start: `top ${triggerValues2[emoji] * 100}%`, // Déclenchement dynamique
                toggleActions: "play none none reset", // Apparition smooth, disparition instantanée
            }
        });
    });

    // Rafraîchir ScrollTrigger pour recalculer les positions
    ScrollTrigger.refresh();
}
*/
// Définition des déclencheurs
// Fonction pour calculer la position de scroll en fonction de la largeur
function getScrollPosition(baseSmall, baseLarge) {
    // Récupère la largeur actuelle de la page
    const width = window.innerWidth;
    return baseSmall + ((baseLarge - baseSmall) * (width - 916) / (1626 - 916));
}



// Objet avec les bases spécifiques à chaque emoji
const triggerValues2 = {
    emoji01: getScrollPosition(630, 633),
    emoji02: getScrollPosition(681, 730),
    emoji03: getScrollPosition(615, 620),
    emoji04: getScrollPosition(722, 810),
    emoji05: getScrollPosition(648, 670),
};

// Recréer l’animation GSAP pour .emoji02
Object.keys(triggerValues2).forEach((emoji) => {
    gsap.to(`.${emoji}`, {
        opacity: 1,  // Apparition progressive
        scale: 2,    // Agrandissement
        rotation: 0, 
        duration: 0.8, // Animation en 0.8s
        ease: "power2.out",
        scrollTrigger: {
            trigger: `.${emoji}`,
            start: `top ${triggerValues2[emoji]}px`, // Utilise la valeur en pixels
            toggleActions: "play none none reset", // Apparition smooth, disparition instantanée
        }
    });
});

// Déclenche l'événement lors du scroll
//window.addEventListener('scroll', checkEmojiPosition);

// Créer les animations au chargement de la page
//updateTriggers3();
getScrollPosition();

window.addEventListener("resize", function () {

    var iframe = document.querySelector(".iframe-jeu");

    iframe.contentWindow.location.reload();

    document.querySelector(".resizeOverlay").classList.remove("hide");
    document.querySelector(".resizeOverlay").classList.add("show");

    console.log("🔄 Redimensionnement détecté !");

    // Met à jour la position de scroll quand la fenêtre est redimensionnée
    triggerValues2.emoji02 = getScrollPosition();
    // Recrée l'animation avec la nouvelle position
    Object.keys(triggerValues2).forEach((emoji) => {
        gsap.to(`.${emoji}`, {
            scrollTrigger: {
                trigger: `.${emoji}`,
                start: `top ${triggerValues2[emoji]}px`, // Mise à jour du start
            }
        });
    });

    ScrollTrigger.refresh(); // Force le rafraîchissement des animations ScrollTrigger

});



// 🔹 Créer dynamiquement le carré noir s'il n'existe pas déjà
let resizeOverlay = document.createElement("div");
resizeOverlay.id = "resizeOverlay";
document.body.appendChild(resizeOverlay);
resizeOverlay.style.display = "none"; // Caché par défaut

// 🔹 Fonction qui affiche le carré noir pendant le resize
let resizeTimeout;
window.addEventListener("resize", function () {
   // clearTimeout(resizeTimeout);

    // Affiche le carré noir
  //  resizeOverlay.style.display = "block";

    // Sauvegarde la position du scroll et marque le reload comme venant d'un resize
    sessionStorage.setItem("fromResize", "true");
    sessionStorage.setItem("scrollPosition", window.scrollY);

    // Recharge après un petit délai pour éviter de trop recharger en continu
    resizeTimeout = setTimeout(() => {
       // location.reload();
        document.querySelector(".resizeOverlay").classList.add("hide");
        document.querySelector(".resizeOverlay").classList.remove("show");
    }, 500); // Recharge après 500ms sans nouvelle modification de la taille
});

// 🔹 Cacher le carré noir après le chargement
window.addEventListener("load", function () {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    // Restaure la position du scroll après le rechargement
    if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        sessionStorage.removeItem("scrollPosition");
    }

    // Vérifie si c'était un reload à cause du resize
    const fromResize = sessionStorage.getItem("fromResize");
    if (fromResize) {
        sessionStorage.removeItem("fromResize"); // Supprime le flag
    }

    // 🔥 Effet fondu pour masquer le carré noir après chargement
    resizeOverlay.style.opacity = "0";
    setTimeout(() => {
        resizeOverlay.style.display = "none";
    }, 500); // Attendre la fin de l'animation avant de le masquer
});





// Anime les emojis avec un léger décalage dans le temps
/*
pulses.to(".emoji01", {}, 0.04)    
      .to(".emoji02", {}, 0.6) 
      .to(".emoji03", {}, 1)
      .to(".emoji04", {}, 1.51)
      .to(".emoji05", {}, 1.98);
*/

      var nb_dur = 1;
      const width = window.innerWidth;
      var scrollAtLarge_svg = -1450; // à 1626px de large
      var scrollAtSmall_svg = -453; // à 903px de large
      var speedFactor = (window.innerWidth * (3.5) * nb_dur) / 1800;
      var scrollPosition_svg = scrollAtSmall_svg + ((scrollAtLarge_svg - scrollAtSmall_svg) * (width - 903) / (1626 - 903));
      
      function updateSpeedFactor() {

    // Récupère la largeur actuelle de la page
    const width = window.innerWidth;

    // Définition des points pour les largeurs spécifiées
     scrollAtLarge_svg = -1050; // à 1626px de large
     scrollAtSmall_svg = -383; // à 903px de large

    // Calcul du décalage en fonction de la largeur
     scrollPosition_svg = scrollAtSmall_svg + ((scrollAtLarge_svg - scrollAtSmall_svg) * (width - 903) / (1626 - 903));


          speedFactor = (window.innerWidth * (3.5) * nb_dur) / 1800;
         // console.log("Nouvelle vitesse :", (speedFactor/nb_dur));
      //   console.log("Nouvelle end :", (scrollPosition_svg));
      
          // Mettre à jour la durée des animations dans la timeline
          main.getChildren().forEach(tween => {
              if (tween.vars.duration) {
                  tween.duration(speedFactor / nb_dur);
              }
          });
      
          // Rafraîchir ScrollTrigger pour éviter les sauts
          ScrollTrigger.refresh();
      }
      
      // Création de l'animation GSAP avec ScrollTrigger
      var main = gsap.timeline({
          scrollTrigger: {
              trigger: "#svg_histoire",
              scrub: true,
              start: "top 630px",
            //  end: "top -800px", //"top " & scrollPosition_svg & "px"
              end: `top ${scrollPosition_svg}}px`,
             markers: false,
          }
      })
      .to(".ball01", { autoAlpha: 1, duration: 0.05 })
      .to(".theLine", { strokeDashoffset: 0, duration: (speedFactor / nb_dur) }, 0)
      .to(".ball01", {
          motionPath: {
              path: ".theLine",
              align: ".theLine",
              alignOrigin: [0.5, 0.5]
          }, 
          duration: (speedFactor / nb_dur)
      }, 0)
      .add(pulses, 0);

      updateSpeedFactor();
      
      // Mettre à jour le speedFactor et ScrollTrigger à chaque resize
      window.addEventListener("resize", updateSpeedFactor);
      
      

gsap.fromTo("#svg_histoire", {
opacity: 0
}, {
opacity: 1,
scrollTrigger: {
trigger: document.body,
start: "top 210px",
end: "top 220px",
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
function updateBallPosition() {
    let ball = document.querySelector(".ball01");
    let rect = ball.getBoundingClientRect(); // Récupère la position de l'élément
   // console.log("⚽️ Pos X :", rect.left, "Pos Y :", rect.top);
}

    // Ajoutez un gestionnaire d'événements pour réinitialiser l'opacité lorsque la page est au sommet du scroll
window.addEventListener('scroll', function() {

updateBallPosition()

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
x: sreen_largeur * 0.255,
y: 15,
width: "35vw",
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

/*
    function updatePath() {
        let width = window.innerWidth;
        let scaleFactor = Math.max(1, 40 - width / 50); // Ajuste le rayon dynamiquement

        console.log("✅✅ update line :", scaleFactor*2);
    
        let newPath = `M20,20 H500 A${scaleFactor},${scaleFactor} 0 0 1 500, 
                       160 H150 A${scaleFactor},${scaleFactor} 0 0 0 150,
                       310 H510 A${scaleFactor},${scaleFactor} 0 0 1 510,
                       460 H100`;
    
    let pathElement = document.getElementById("dynamicPath");
    if (pathElement) {
        pathElement.setAttribute("d", newPath);
    } else {
        console.error("Le path avec l'ID dynamicPath n'a pas été trouvé !");
    }
    }
    
    // Met à jour au chargement et au redimensionnement
    window.addEventListener("load", updatePath);
    window.addEventListener("resize", updatePath);
    */

    
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

gsap.fromTo(".T_shirt_Jo
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

        if (emoji_0.style.opacity == 1 || (emoji_0.style.opacity == 0 && emoji_1.style.opacity == 0)) {

        
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

    // Vérifie si la page a été rechargée suite à un resize
    const fromResize = sessionStorage.getItem("fromResize");

    if (fromResize) {
        console.log("Rechargement suite à un resize, pas d'animation.");
        sessionStorage.removeItem("fromResize"); // Supprime le flag après le rechargement
        document.getElementById('overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
        return; // On stoppe ici pour éviter de lancer l'animation
    }

// Sélectionner les éléments
const overlay = document.getElementById('overlay');
const introImage = document.querySelector('.intro-image'); // Correspond à votre image
const verticalline = document.querySelector('.vertical-line');

// Précharger l'image en arrière-plan
const preloadImage = new Image();
preloadImage.src = '../Image/Josy - St barth 5.webp'; // Source de votre image

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





