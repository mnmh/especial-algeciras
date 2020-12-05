gsap.registerPlugin(ScrollTrigger);

function windowSize(){

  let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  if(viewportWidth > 0) { 
    document.getElementById("sizeW").innerHTML = "small " + viewportWidth;
  }
  if(viewportWidth >= 640) { 
    document.getElementById("sizeW").innerHTML = "medium " + viewportWidth;
  }
  if(viewportWidth >= 1024) { 
    document.getElementById("sizeW").innerHTML = "large " + viewportWidth;
  }
  if(viewportWidth >= 1200) { 
    document.getElementById("sizeW").innerHTML = "Xlarge " + viewportWidth;
  } 
  if(viewportWidth >= 1440) { 
    document.getElementById("sizeW").innerHTML = "xXlarge " + viewportWidth;
  } 
}
windowSize();
window.addEventListener('resize', windowSize, false);

gsap.to(".scrollArrow", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".hero",
    start: "50 top",
    end: "100 top",
    scrub: true
  }
});

ScrollTrigger.create({
  trigger: ".hero-img-left",
  start: "top bottom", 
  end: "bottom 38%",
  pin: ".hero-letters-pin"
});

ScrollTrigger.create({
  trigger: ".hero-img-left",
  start: "top bottom", 
  end: "bottom 30%",
  pin: ".hero-letters"
});
ScrollTrigger.create({
  trigger: ".hero-img-left",
  start: "top bottom", 
  end: "bottom 30%",
  pin: ".hero-dpto-pin"
});

gsap.from(".hero-dpto", {
  y: '20vh',
  scrollTrigger: {
    trigger: ".hero-letters_box",
    start: "top top",
    end: "bottom 60%",
    scrub: true
  }
});

// Hero letters
ScrollTrigger.matchMedia({
	// desktop
	"(min-width: 800px)": function() {
    gsap.from(".hero-letter", {
      yPercent: "random(-500, 10)", 
      xPercent: "random(-750, 750)",
      scale: "random(2, 7)",
      opacity: 1,
      force3D: false,
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "top 5%",
        end: "90% 60%",
        scrub: true
      }
    });
  }, 
	// mobile
	"(max-width: 799px)": function() {
    gsap.from(".hero-letter", {
      yPercent: "random(-600, 150)", 
      xPercent: "random(-350, 350)",
      scale: "random(2, 6)",
      opacity: 1,
      force3D: false,
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "top 5%",
        end: "90% 60%",
        scrub: true
      }
    });
  }
});

const tlMap = gsap.timeline({
  defaults: {ease: "power4.out"},
  scrollTrigger: {
    trigger: ".context",
    start: "top 40%",
    end: "bottom top",
    scrub: true,
    pin: ".context-map"
  }
});
tlMap
.addLabel("map")
.from(".map-algeciras", {duration: 0.7, scale: 100, xPercent:-100, transformOrigin: "center center"})
.from(".map-huila", {duration: 0.4, scale: 40, transformOrigin: "center center"}, "map")
.from(".map-colombia", {duration: 0.3, scale: 40,transformOrigin: "center center"}, "map")
.from(".map-colombia", {duration: 0.3, fill: "#faf7f0"}, "ma+=0.35")
.from(".location-pin", {duration: 0.1, scale: 0, yPercent: 2, transformOrigin: "center bottom"}, "-=.3");

gsap.to(".context-text blockquote", {
  yPercent: 50,
  scrollTrigger: {
    trigger: ".context-text blockquote",
    start: "top 90%",
    end: "top top",
    scrub: true
  }
});
gsap.to(".context-text blockquote svg", {
  yPercent: 120,
  scrollTrigger: {
    trigger: ".context-text blockquote",
    start: "top 90%",
    end: "top top",
    scrub: true
  }
});
gsap.from(".context-text p", {
  yPercent: 100,
  scrollTrigger: {
    trigger: ".context-text blockquote",
    start: "top 90%",
    end: "top top",
    scrub: true
  }
});

gsap.fromTo("h1 span", {yPercent: 100}, {
  yPercent: -25,
  scrollTrigger: {
    trigger: "h1 span",
    start: "top 90%",
    end: "bottom 10%",
    scrub: true
  }
});

gsap.set(".old-red", { autoAlpha: 0 });
gsap.set(".ruinas", { autoAlpha: 0 });
gsap.set(".nav", { autoAlpha: 0 });

let select = (selector) => {
	return document.querySelector(selector);
};
let next_btn = select("#next_btn");
next_btn.addEventListener("click", () => shots.play());

const fotoOld = gsap.timeline({
  scrollTrigger: {
    markers: true,
    trigger: ".old",
    start: "20% 20%",
    end: "bottom -2000%",
    pin: ".old",
    scrub: 0.5
  }
})
  .from(".old-5, .border-5", { y: innerHeight, ease: "power2.out", delay: 0.2 })
  .from(".old-4, .border-4", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .from(".old-3, .border-3", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .from(".old-2, .border-2", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .from(".old-1, .border-1", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .to(".nav", { autoAlpha: 1 })
  .to(".old", { autoAlpha: 1, duration: 2 })
  .to(".nav", { autoAlpha: 0 })
  .to(".fotos-old, .borders", { autoAlpha: 0 }, "<")
  .to(".ruinas-3", { autoAlpha: 1 })
  .to(".iglesia-old", { scale: 1.8, xPercent: 20, duration: 1, ease: "power3.inOut" }, "<")
  .to(".ruinas-3", { autoAlpha: 0, delay: 1 })
  .to(".ruinas-1", { autoAlpha: 1 }, "<")
  .to(".iglesia-old", { xPercent: -20, yPercent: -25, duration: 1, ease: "power3.inOut" }, "<")
  .to(".ruinas-1", { autoAlpha: 0, delay: 1 })
  .to(".ruinas-2", { autoAlpha: 1 }, "<")
  .to(".iglesia-old", { xPercent: 0, yPercent: 22, duration: 1, ease: "power3.inOut" }, "<")
  .to(".ruinas-2", { autoAlpha: 0, delay: 1 })
  .to(".ruinas-4", { autoAlpha: 1 }, "<")
  .to(".iglesia-old", { xPercent: 20, yPercent: -20, duration: 1, ease: "power3.inOut" }, "<")
  .to(".ruinas-4", { autoAlpha: 0, delay: 1 })
  .to(".iglesia-old", { scale: 1 , xPercent: 0, yPercent: 5}, "<")
  ;

function shot(foto, fotoRed, bgColor) {
  let tl = gsap.timeline({
    defaults: {duration: 0.05, transformOrigin: "center center", easy: "none"}
  });
  tl.to(".old-container", {scale: 0.9, skewX: "3deg", yoyo: true, repeat: 1}, "<")
    .to(".old", {backgroundColor: "#f73868"}, "<")
    .to(fotoRed, {autoAlpha: 1}, "<")
    .to(".old", {backgroundColor: bgColor, duration: 3, ease: "power2.out"}, "+=0.5")
    .to(foto, {autoAlpha: 0, duration: 3, ease: "power2.out"}, "<")
    .to(fotoRed, { autoAlpha: 0, yPercent: 2, duration: 3.2, ease: "power2.out" }, "<-0.2")
    .addPause()
  return tl;
}

let shots = gsap.timeline({
  paused: true
}).to(".border", { stroke: "#faf7f0", duration: 0, ease: "power2.out" })
  .add(shot(".old-3", ".old-3-red", "#fdd8e1"))
  .addPause()
  .add(shot(".old-4", ".old-4-red", "#fcb1c3"))
  .addPause()
  .add(shot(".old-1", ".old-1-red", "#fa89a6"))
  .addPause()
  .add(shot(".old-5", ".old-5-red", "#f86288"))
  .addPause()
  .add(shot(".old-2", ".old-2-red", "#f73868"))
  .addPause()

;



gsap.to(".guzman-back.new", {
  yPercent: 40,
  scrollTrigger: {
    trigger: ".guzman-back.new",
    start: "top 70%",
    end: "bottom 10%",
    scrub: true
  }
});
gsap.from(".guzman-info.new h2", {
  yPercent: 50,
  scrollTrigger: {
    trigger: ".guzman-back.new",
    start: "top 70%",
    end: "top 10%",
    scrub: true
  }
});
gsap.from(".guzman-info.new p", {
  yPercent: 50,
  autoAlpha: 0,
  scrollTrigger: {
    trigger: ".guzman-back.new",
    start: "top 30%",
    end: "bottom 55%",
    scrub: true
  }
});

gsap.from(".guzman-foto", {
  yPercent: 20,
  scrollTrigger: {
    trigger: ".guzman-foto",
    start: "top 90%",
    end: "top 50%",
    scrub: true
  }
});
gsap.from(".guzman-info.foto p", {
  yPercent: 50,
  autoAlpha: 0,
  scrollTrigger: {
    trigger: ".guzman-info.foto p",
    start: "top 70%",
    end: "top 50%",
    scrub: true
  }
});
gsap.from(".guzman-info.foto h2", {
  yPercent: -190,
  scrollTrigger: {
    trigger: ".guzman-info.foto h2",
    start: "50% 80%",
    end: "bottom 20%",
    scrub: true
  }
});
gsap.to(".guzman-info.foto h2", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".guzman-info.foto",
    start: "bottom 25%",
    end: "bottom -120%",
    pin: ".guzman-info.foto h2"
  }
});

const tlCristo = gsap.timeline({
  defaults: {ease: "power4.out"},
  scrollTrigger: {
    trigger: ".guzman-info.obra",
    start: "top 70%",
    end: "bottom -80%",
    pin: true,
    scrub: 0.2
  }
});
tlCristo
.from(".cristo-2", {duration: 10, yPercent: 40})
.from(".cristo-2", {duration: 0.5, opacity: 0}, "<")
.from(".cristo-4", {duration: 10, yPercent: 50}, "<2")
.from(".cristo-4", {duration: 0.5, opacity: 0}, "<")
.from(".guzman-info.obra p", {duration: 8, yPercent: 40,opacity: 0}, "<")
.from(".cristo-1", {duration: 10, yPercent: 40}, "-=3")
.from(".cristo-1", {duration: 0.5, opacity: 0}, "<")
;

gsap.from(".obras-box img", {
  opacity: 0,
  yPercent: "random(5%, 30%)",
  scrollTrigger: {
    trigger: ".obras-box",
    start: "top 60%",
    end: "top 40%",
    scrub: true
  }
});
gsap.from(".caido-box p", {
  yPercent: 50,
  autoAlpha: 0,
  scrollTrigger: {
    trigger: ".caido-box",
    start: "top 70%",
    end: "top 50%",
    scrub: true
  }
});
  







