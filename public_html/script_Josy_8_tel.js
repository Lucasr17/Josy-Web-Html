
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
