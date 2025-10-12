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

/*Section Hsitoire JOSY*/

 gsap.registerPlugin(ScrollTrigger);

    // Animation des traits violets
    document.querySelectorAll(".line_section").forEach(line => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: line.closest(".section_histoire"),
          start: "top bottom",
          end: "bottom center",
          scrub: true
        }
      });
    });

    // Animation apparition emoji + texte
    document.querySelectorAll(".section_histoire").forEach(section => {
      const emoji = section.querySelector('.emoji');
      const content = section.querySelector('.content_section');

      gsap.to([emoji, content], {
        opacity: 1,
        transform: "none",
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    });

  // Split le texte en span par lettre
  document.querySelectorAll('[data-lightwave]').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    });
  });

  // GSAP animation vague
  document.querySelectorAll('[data-lightwave]').forEach(el => {
    const letters = el.querySelectorAll('span');
    gsap.to(letters, {
      opacity: 1,
      stagger: {
        each: 0.03,
        from: "start"
      },
      duration: 0.5,
      ease: "sine.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });


document.querySelectorAll(".section_histoire .content_section").forEach(content => {
  gsap.fromTo(content, {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transformOrigin: "center center"
  }, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    ease: "power4.in",  // Aspiration forte et rapide
    scrollTrigger: {
      trigger: content,
      start: "top 300px",
      end: "top 120px",
      scrub: true,
      markers: false, // Retire en prod
      invalidateOnRefresh: true // important quand tu scrolls ou redimensionnes vite
    }
  });
});



/*FIN section histoire JOSY*/


const points = [180, 2700];
let isSnapping = false;
let lastScrollY = window.scrollY;
let lastDirection = null;

window.addEventListener('scroll', () => {
  if (isSnapping) return;

  const scrollY = window.scrollY;
  const direction = scrollY > lastScrollY ? "down" : "up";
  lastScrollY = scrollY;

  let closestPoint = null;
  let closestDistance = Infinity;

  // Cherche le point le plus proche
  points.forEach(point => {
    const distance = Math.abs(scrollY - point);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPoint = point;
    }
  });

  // Rayon de magnétisation (en px)
  const radius = 100;

  // Si on est dans la zone d’un point magnétique
  if (closestDistance < radius) {
    // Si on scroll vers le bas : on ne s'accroche que si on passe AU-DESSUS du point
    if (direction === "down" && scrollY < closestPoint) {
      snapTo(closestPoint);
    }
    // Si on scroll vers le haut : on ne s'accroche que si on passe EN DESSOUS du point
    else if (direction === "up" && scrollY > closestPoint) {
      snapTo(closestPoint);
    }
  }

  function snapTo(target) {
    isSnapping = true;
    window.scrollTo({ top: target, behavior: 'smooth' });
    setTimeout(() => isSnapping = false, 800);
  }
});
