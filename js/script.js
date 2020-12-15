gsap.registerPlugin(ScrollTrigger);

let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

let attack = false;

// call this to Disable
function disableScroll() {
  if (attack == false) {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    attack = true;
  }
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

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
  "(min-width: 800px)": function () {
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
  "(max-width: 799px)": function () {
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
  defaults: { ease: "power4.out" },
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
  .from(".map-algeciras", { duration: 0.7, scale: 100, xPercent: -100, transformOrigin: "center center" })
  .from(".map-huila", { duration: 0.4, scale: 40, transformOrigin: "center center" }, "map")
  .from(".map-colombia", { duration: 0.3, scale: 40, transformOrigin: "center center" }, "map")
  .from(".map-colombia", { duration: 0.3, fill: "#faf7f0" }, "ma+=0.35")
  .from(".location-pin", { duration: 0.1, scale: 0, yPercent: 2, transformOrigin: "center bottom" }, "-=.3");

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

gsap.fromTo("h1 span", { yPercent: 100 }, {
  yPercent: -25,
  scrollTrigger: {
    trigger: "h1 span",
    start: "top 90%",
    end: "bottom 10%",
    scrub: true
  }
});

gsap.set(".ruinas, .old-red, .shot-old, .new-red, .old-fixed", { autoAlpha: 0 });
gsap.to(".attack", { autoAlpha: 0, scale: 0.8, duration: 0.5 });

// let select = (selector) => {
// 	return document.querySelector(selector);
// };
// let next_btn = select("#next_btn");
// next_btn.addEventListener("click", () => shots.play());

document.querySelectorAll('.shot-old').forEach(item => {
  item.addEventListener('click', event => {
    shots.play();
  })
})

let shotInit = false;

function shotPlay() {
  if (shotInit == false) {
    shots.play();
    shotInit = true;
  }
}

function shot(foto, fotoRed, attack, bgColor, prevShot, nextShot) {
  let tl = gsap.timeline({
    defaults: { duration: 0.05, transformOrigin: "center center", easy: "none" }
  });
  tl
    .to(prevShot, { background: "#16006F", duration: 0.1 })
    .to(prevShot, { autoAlpha: 0, padding: "1.5%", duration: 0.2, force3D: false}, "<0.05")
    .to(".old-container", { scale: 0.9, skewX: "3deg", yoyo: true, repeat: 1 }, "+=0.04")
    .to(".old", { backgroundColor: "#f73868" }, "<")
    .to(attack, { autoAlpha: 1, scale: 1, ease: "power4.out", duration: 2 }, "<")
    
    .to(fotoRed, { autoAlpha: 1 }, "<")
    .to(".old", { backgroundColor: bgColor, duration: 3, ease: "power2.out" }, "+=0.5")
    .to(foto, { autoAlpha: 0, duration: 3, ease: "power2.out" }, "<")
    .to(fotoRed, { autoAlpha: 0, yPercent: 2, duration: 3.2, ease: "power2.out" }, "<-0.2")
    .to(nextShot, { autoAlpha: 1, duration: 0.2 }, ">-0.5")
    .addPause()
  return tl;
}

function shotAttack() {
  let tl = gsap.timeline();
  tl
    .fromTo(".attack", { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.9, ease: "power4.out", duration: 2 })
  return tl;
}

const shots = gsap.timeline({
  paused: true
})
  .to(".shot-3", { autoAlpha: 1, duration: 0.2 })
  .addPause()
  .add(shot(".old-3, .border-3", ".old-3-red", ".attack-3", "#fdd8e1", ".shot-3", ".shot-4"))
  .to(".border", { stroke: "#faf7f0", duration: 1, ease: "power2.out"}, ">-2.2")
  .addPause()
  .add(shot(".old-4, .border-4", ".old-4-red", ".attack-4", "#fcb1c3", ".shot-4", ".shot-1"))
  .addPause()
  .add(shot(".old-1, .border-1", ".old-1-red", ".attack-1", "#fa89a6", ".shot-1", ".shot-5"))
  .addPause()
  .add(shot(".old-5, .border-5", ".old-5-red", ".attack-5", "#f86288", ".shot-5", ".shot-2"))
  .addPause()
  .call(enableScroll)
  .add(shot(".old-2, .border-2", ".old-2-red", ".attack-2", "#f73868", ".shot-2"))
  .addPause()
  ;

const fotoOld = gsap.timeline({
  scrollTrigger: {
    trigger: ".old",
    start: "20% 20%",
    end: "bottom -2000%",
    pin: ".old",
    scrub: 0.5,
    onUpdate: self => console.log("direction:", self.direction)
  }
})
  .from(".old-5, .border-5", { y: innerHeight, ease: "power2.out" })
  .from(".old-4, .border-4", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .from(".old-3, .border-3", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .from(".old-2, .border-2", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .from(".old-1, .border-1", { y: innerHeight, ease: "power2.out" }, "-=0.15")
  .to(".shot-old", { autoAlpha: 0, duration: 0.5 })
  .call(shotPlay)
  .call(disableScroll)
  .to(".attack", { autoAlpha: 0, scale: 0.5, ease: "power4.out", duration: 1.5, delay: "random(0.5, 1)" })
  .to(".ruinas-3", { autoAlpha: 1 })
  .to(".iglesia-old", { scale: 1.8, xPercent: 20, duration: 1, ease: "power2.out" }, "<")
  .to(".ruinas-3", { autoAlpha: 0, delay: 1 })
  .to(".ruinas-1", { autoAlpha: 1 }, "<")
  .to(".iglesia-old", { xPercent: -20, yPercent: -25, duration: 1, ease: "power2.out" }, "<")
  .to(".ruinas-1", { autoAlpha: 0, delay: 1 })
  .to(".ruinas-2", { autoAlpha: 1 }, "<")
  .to(".iglesia-old", { xPercent: 0, yPercent: 22, duration: 1, ease: "power2.out" }, "<")
  .to(".ruinas-2", { autoAlpha: 0, delay: 1 })
  .to(".ruinas-4", { autoAlpha: 1 }, "<")
  .to(".iglesia-old", { xPercent: 20, yPercent: -20, duration: 1, ease: "power2.out" }, "<")
  .to(".ruinas-4", { autoAlpha: 0, delay: 1 })
  .to(".iglesia-old", { scale: 1, xPercent: 0, yPercent: 0 }, "<")
  .to(".iglesia-old", { autoAlpha: 0, delay: 0.5 })
  .to(".old-fixed", { autoAlpha: 1 }, "<-0.5")
  .call(enableScroll)
  // .to({}, {duration: 2})
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
  defaults: { ease: "power4.out" },
  scrollTrigger: {
    trigger: ".guzman-info.obra",
    start: "top 70%",
    end: "bottom -80%",
    pin: true,
    scrub: 0.2
  }
})
  .from(".cristo-2", { duration: 10, yPercent: 40 })
  .from(".cristo-2", { duration: 0.5, opacity: 0 }, "<")
  .from(".cristo-4", { duration: 10, yPercent: 50 }, "<2")
  .from(".cristo-4", { duration: 0.5, opacity: 0 }, "<")
  .from(".guzman-info.obra p", { duration: 8, yPercent: 40, opacity: 0 }, "<")
  .from(".cristo-1", { duration: 10, yPercent: 40 }, "-=3")
  .from(".cristo-1", { duration: 0.5, opacity: 0 }, "<")
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

gsap.from(".hoy h2", {
  yPercent: -750,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".hoy",
    start: "top 110%",
    end: "bottom 40%",
    scrub: true
  }
});

gsap.to(".hoy-attack svg", { opacity: 0, duration: 0.02 });

const tlHoy = gsap.timeline({
  scrollTrigger: {
    trigger: ".hoy",
    start: "top 55%",
    toggleActions: "play none reverse reverse"
  }
})
  .fromTo(".hoy-attack div", { scale: 1 }, { scale: 0.4, duration: 0.5, ease: "power2.in" })
  .addLabel("bomb", ">")
  .fromTo(".hoy-attack div", { scale: 1, color: "#f73868" }, { scale: 1.4, color: "#B50026", duration: 2 }, "bomb")
  .to(".circle-attack", { scale: 1.6, opacity: 1, duration: 0.2, ease: "linear" }, "bomb")
  .to(".circle-attack", { scale: 1.8, duration: 3 }, "bomb+=0.2")
  .to(".circle-attack-2", { scale: 1.7, opacity: 1, duration: 0.2 }, "bomb")
  .to(".circle-attack-2", { scale: 2, opacity: 0, duration: 2 }, "bomb+=0.2")
  ;

function shotPlayNew() {
  shotsNew.play();
}

const shotsNew = gsap.timeline({
  paused: true
})
  .fromTo(".shot-new", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
  .addPause()
  ;

const fotoNew = gsap.timeline({
  scrollTrigger: {
    trigger: ".old-new",
    start: "10% 10%",
    end: "bottom -500%",
    pin: ".old-new",
    scrub: 0.5
  }
})
  .addLabel("new")
  .to(".iglesia-fixed", { autoAlpha: 0 })
  .fromTo(".lines-new", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
  .from(".new-6, .border-new-6", { y: innerHeight + 200, ease: "power2.out" }, "new")
  .from(".new-5, .border-new-5", { y: innerHeight + 200, ease: "power2.out" }, ">")
  .from(".new-4, .border-new-4", { y: innerHeight + 200, ease: "power2.out" }, "-=0.15")
  .from(".new-3, .border-new-3", { y: innerHeight + 200, ease: "power2.out" }, "-=0.15")
  .from(".new-1, .border-new-1", { y: innerHeight + 200, ease: "power2.out" }, "-=0.15")
  .from(".new-2, .border-new-2", { y: innerHeight + 200, ease: "power2.out" }, "-=0.15")
  .call(shotPlayNew)
  ;







