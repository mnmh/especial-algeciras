gsap.registerPlugin(ScrollTrigger);

// if (history.scrollRestoration) {
//   history.scrollRestoration = 'manual';
// } else {
//   window.onbeforeunload = function () {
//       window.scrollTo(0, 0);
//   }
// }

ScrollTrigger.config({ limitCallbacks: true });

// var wavesurfer = WaveSurfer.create({
//   container: '#waveform',
//   backend: 'MediaElement',
//   responsive: true,
//   barWidth: 1,
//   barHeight: 1,
//   barGap: 2,
//   cursorWidth: 0,
//   dragSelection: true,
//   height: 38,
//   hideScrollbar: true,
//   interact: true,
//   normalize: true,
//   progressColor: '#5b4231'
// });
// wavesurfer.load('images/MarioGuzman-1.mp3');

// function playAudio1() {
//   wavesurfer.playPause();
// }

// const audio = document.querySelector('.playPause')
// const audioIcons = document.querySelectorAll('.audioIcon');
// audio.onclick = function () {
//   playAudio1();
//   // audioIcons.forEach(x => x.classList.toggle('off'))
//   audioIcons.forEach(function(icon) {
//     if (icon.classList.contains('off')) {
//       icon.classList.remove('off');
//     } else {
//         icon.classList.add('off');
//     }
//   });
// };

// ScrollTrigger.create({
//   trigger: ".waveform",
//   start: "bottom bottom",
//   endTrigger: "#titulo",
//   end: "top bottom",
//   pinSpacing: false,
//   pin: true,
//   onEnter: playAudio1,
//   onLeave: playAudio1,
//   onEnterBack: playAudio1,
//   onLeaveBack: playAudio1
// });

gsap.set(".ruinas", { autoAlpha: 0 });
gsap.to(".attack", { autoAlpha: 0, scale: 0.8, duration: 0.5 });
gsap.set(".arrow-box", { autoAlpha: 1 });

new Splide( '.splideOld', {
  type: 'fade',
  rewind: true,
  height: '85vh',
  cover: false,
  speed: '800',
  lazyLoad: 'nearby',
  arrowPath: 'M13.86,37a.85.85,0,0,1-.61-.25.87.87,0,0,1,0-1.22L28.92,20,13.25,4.47a.87.87,0,0,1,0-1.22.88.88,0,0,1,1.22,0L30.75,19.39a.87.87,0,0,1,0,1.22L14.47,36.75A.85.85,0,0,1,13.86,37Z'
}).mount();
new Splide( '.splideNew', {
  type: 'fade',
  rewind: true,
  height: '85vh',
  cover: true,
  speed: '800',
  arrowPath: 'M13.86,37a.85.85,0,0,1-.61-.25.87.87,0,0,1,0-1.22L28.92,20,13.25,4.47a.87.87,0,0,1,0-1.22.88.88,0,0,1,1.22,0L30.75,19.39a.87.87,0,0,1,0,1.22L14.47,36.75A.85.85,0,0,1,13.86,37Z'
}).mount();
new Splide( '.splideObras', {
  type: 'fade',
  rewind: true,
  height: '100vh',
  cover: false,
  speed: '1000',
  arrowPath: 'M13.86,37a.85.85,0,0,1-.61-.25.87.87,0,0,1,0-1.22L28.92,20,13.25,4.47a.87.87,0,0,1,0-1.22.88.88,0,0,1,1.22,0L30.75,19.39a.87.87,0,0,1,0,1.22L14.47,36.75A.85.85,0,0,1,13.86,37Z'
} ).mount();

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

gsap.fromTo(".arrow-box", { autoAlpha: 1 }, {
  autoAlpha: 0,
  scrollTrigger: {
    trigger: ".hero-img",
    start: "top 95%",
    end: "top 85%",
    scrub: true
  }
});

// let sections = gsap.utils.toArray('.paragraph');
// sections.forEach((section) => {
//   gsap.from(section, {
//     autoAlpha: 0,
//     yPercent: 100, 
//     ease: "power3.out",
//     scrollTrigger: {
//       markers: true,
//       trigger: section,
//       start: 'top 70%',
//       end: 'top 60%',
//       scrub: 2
//     }
//   });
// })

// gsap.utils.toArray('p').forEach((sec, i) => {
//   let news = gsap.timeline({
//     scrollTrigger: {
//       trigger: sec,
//       start: 'top 70%',
//       end: 'top 45%',
//       scrub: 2,
//     }
//   })
//     .from(sec.querySelectorAll('p'), {
//     yPercent: 100, 
//     ease: "power3.out"
//   });
// });

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 800px)": function () {
    // Hero letters
    gsap.from(".hero-letter", {
      yPercent: "random(-500, 10)",
      xPercent: "random(-750, 750)",
      scale: "random(2, 7)",
      // force3D: false,
      ease: "power2.out",
      opacity: 0.6,
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "top 5%",
        end: "90% 60%",
        scrub: 1.5
      }
    });

    ScrollTrigger.create({
      trigger: ".hero-letters_box",
      start: "top top",
      endTrigger: ".hero-img",
      end: "70% top",
      pin: ".hero-letters"
    });

    ScrollTrigger.create({
      trigger: ".hero-letters_box",
      start: "top top",
      endTrigger: ".hero-img",
      end: "70% top",
      pin: ".hero-dpto-pin",
    });
    
    gsap.from(".hero-dpto", {
      y: '20vh',
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "top top",
        end: "35% top",
        scrub: true
      }
    });

    // Mapa Colombia
    const tlMap = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: ".context",
        start: "top 30%",
        end: "bottom 73%",
        scrub: true,
        pin: ".context-map"
      }
    })
      .addLabel("map")
      .from(".map-algeciras", { duration: 2, scale: 110, y: -160,  transformOrigin: "center center" })
      .from(".map-huila", { duration: 1.5, scale: 40, xPercent: 120, transformOrigin: "center center" }, "map")
      .from(".map-colombia", { duration: 1.2, scale: 40, transformOrigin: "center center" }, "map")
      .from(".map-colombia", { duration: 1.2, fill: "#faf7f0" }, "map+=1")
      .from(".location-pin", { duration: 0.1, scale: 0, yPercent: 2, transformOrigin: "center bottom" }, "-=0.2")
      .to({}, { duration: 0.2 })
      ;
    
    gsap.to(".context-text blockquote", {
      yPercent: 20,
      scrollTrigger: {
        trigger: ".context-text blockquote",
        start: "top 90%",
        end: "top top",
        scrub: true
      }
    });
    
    gsap.to(".context-text blockquote svg", {
      yPercent: 140,
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

    const fotoOld = gsap.timeline({
      defaults: { duration: 1, transformOrigin: "center center" },
      scrollTrigger: {
        trigger: ".old",
        start: "top top",
        end: "+=" + (window.innerHeight * 20),
        pin: ".old",
        anticipatePin: true,
        scrub: 1.5
      }
    })
      .from(".old-5, .border-5", { y: innerHeight + 400, ease: "power1out" })
      .from(".old-4, .border-4", { y: innerHeight + 400, ease: "power1out" }, "-=0.15")
      .from(".old-3, .border-3", { y: innerHeight + 400, ease: "power1out" }, "-=0.15")
      .from(".old-2, .border-2", { y: innerHeight + 400, ease: "power1out" }, "-=0.15")
      .from(".old-1, .border-1", { y: innerHeight + 600, ease: "power1out" }, "-=0.15")
      .from(".attack-1", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 })
      .to(".attack-1", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-1", { autoAlpha: 0 }, "-=0.2")
      .to(".border-1", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#e3ddd9" }, "<")
      .from(".attack-2", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-2", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-2", { autoAlpha: 0 }, "-=0.2")
      .to(".border-2", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#aa998c" }, "<")
      .to(".border", { stroke: "#bfd5d6" }, "<")
      .from(".attack-3", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-3", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-3", { autoAlpha: 0 }, "-=0.2")
      .to(".border-3", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#aa998c" }, "<")
      .from(".attack-4", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-4", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-4", { autoAlpha: 0 }, "-=0.2")
      .to(".border-4", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#8d7766" }, "<")
      .from(".attack-5", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-5", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-5", { autoAlpha: 0 }, "-=0.2")
      .to(".border-5", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#715540" }, "<")
      .to({}, { duration: 2 })
      .to(".ruinas-3", { autoAlpha: 1 }, "-=0.5")
      .to(".iglesia-old", { scale: 1.8, xPercent: 20, duration: 1 }, "<")
      .to(".ruinas-3", { autoAlpha: 0, delay: 1 })
      .to(".ruinas-1", { autoAlpha: 1 }, "<")
      .to(".iglesia-old", { xPercent: -20, yPercent: -25, duration: 1 }, "<")
      .to(".ruinas-1", { autoAlpha: 0, delay: 1 })
      .to(".ruinas-2", { autoAlpha: 1 }, "<")
      .to(".iglesia-old", { xPercent: 0, yPercent: 22, duration: 1 }, "<")
      .to(".ruinas-2", { autoAlpha: 0, delay: 1 })
      .to(".ruinas-4", { autoAlpha: 1 }, "<")
      .to(".iglesia-old", { xPercent: 20, yPercent: -20, duration: 1 }, "<")
      .to(".ruinas-4", { autoAlpha: 0, delay: 1 })
      .to(".iglesia-old", { scale: 1, xPercent: 0, yPercent: 0 },"<")
      .to(".iglesia-old", { autoAlpha: 0})
      .to(".old-fixed", { opacity: 1 },"<-0.1")
      ;
    
    gsap.fromTo("h1 span", { yPercent: 100 }, {
      yPercent: -25,
      scrollTrigger: {
        trigger: ".news2",
        start: "20% top",
        endTrigger: "h1 span",
        end: "top top",
        scrub: true
      }
    });
    
    gsap.to(".guzman-back.new", {
      yPercent: 20,
      scrollTrigger: {
        trigger: ".news2",
        start: "bottom top",
        endTrigger: ".guzman-back.new",
        end: "20% top",
        scrub: true
      }
    });
    
    gsap.from(".guzman-info.new p", {
      yPercent: 30,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: ".guzman-info",
        start: "bottom top",
        endTrigger: ".guzman-back.new",
        end: "top top",
        scrub: true
      }
    });
    
    gsap.from(".guzman-foto", {
      yPercent: 20,
      scrollTrigger: {
        trigger: ".guzman-back.new",
        start: "10% top",
        end: "90% top",
        scrub: true
      }
    });
    
    gsap.from(".guzman-info.foto h2", {
      yPercent: -250,
      scrollTrigger: {
        trigger: ".guzman-back.new",
        start: "10% top",
        end: "80% top",
        scrub: true
      }
    });
    
    gsap.fromTo(".obra-text", { yPercent: -10, autoAlpha: 0 }, {
      yPercent: 10,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: ".obra-text",
        start: "top 80%",
        end: "top 50%",
        scrub: true
      }
    });
    
    const tlCristo = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: ".obra-box",
        start: "top 60%",
        endTrigger: ".guzman-info.obra",
        end: "bottom top",
        pin: ".guzman-info.obra",
        scrub: 0.2
      }
    })
      .from(".cristo-2", { duration: 10, yPercent: 40 })
      .from(".cristo-2", { duration: 0.5, opacity: 0 }, "<")
      .from(".cristo-4", { duration: 10, yPercent: 50 }, "<2")
      .from(".cristo-4", { duration: 0.5, opacity: 0 }, "<")
      .from(".guzman-info.obra p", { duration: 8, yPercent: 40, opacity: 0 }, "<")
      .from(".cristo-1", { duration: 10, yPercent: 40 }, "-=3")
      .from(".cristo-1", { duration: 5, opacity: 0 }, "<")
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
    
    gsap.from(".hoy h2", {
      yPercent: -750,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".caido",
        start: "80% 50%",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(".hoy-attack svg", { opacity: 0, duration: 0.02 });
    
    const tlHoy = gsap.timeline({
      scrollTrigger: {
        trigger: ".hoy-box",
        start: "top top",
        end: "bottom top",
        toggleActions: "play none reverse reverse"
      }
    })
      .fromTo(".hoy-attack div", { scale: 1 }, { scale: 0.4, duration: 0.5, ease: "power2.in" })
      .addLabel("bomb", ">")
      .fromTo(".hoy-attack div", { scale: 1, color: "#715540" }, { scale: 1.4, color: "#bfd5d6", duration: 2 }, "bomb")
      .to(".circle-attack", { scale: 1.6, opacity: 0.8, duration: 0.2, ease: "linear" }, "bomb")
      .to(".circle-attack", { scale: 1.8, duration: 3 }, "bomb+=0.2")
      .to(".circle-attack-2", { scale: 1.7, opacity: 1, duration: 0.2 }, "bomb")
      .to(".circle-attack-2", { scale: 2, opacity: 0, duration: 2 }, "bomb+=0.2")
      ;
    
    gsap.set(".attack-new", { xPercent: "random(-80, 70)", yPercent: "random(-120, 100)", scale: "random(0.2, 0.6)" });
    gsap.set(".attack-new", { autoAlpha: 0 });
    
    const fotoNew = gsap.timeline({
      scrollTrigger: {
        trigger: ".old-new",
        start: "top top",
        end: "+=" + (window.innerHeight * 6),
        pin: ".old-new",
        scrub: 1.5
      }
    })
      .from(".old-new", { autoAlpha: 0, duration: 1 })
      .from(".new-6, .border-new-6", { y: innerHeight + 600, ease:"power2.out" })
      .from(".new-5, .border-new-5", { y: innerHeight + 600, ease:"power2.out" }, ">")
      .from(".new-4, .border-new-4", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .from(".new-3, .border-new-3", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .from(".new-1, .border-new-1", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .from(".new-2, .border-new-2", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .set(".shot-new", { autoAlpha: 0 } )
      .addLabel("newText")
      .to(".old-new", { backgroundColor: "#715540", duration: "0.4" }, "newText")
      .to(".attack-new", { autoAlpha: 1, scale: "random(1, 1.8)", duration: "random(2, 4)" }, "newText")
      .to(".new-foto", { autoAlpha: 0, scale: "random(0.9, 0.7)", duration: "random(0.5, 0.8)", transformOrigin: "center center" }, "newText")
      .to(".lines-new", { stroke: "#bfd5d6", duration: "0.4" }, "newText")
      .fromTo(".new-text", { y: innerHeight + 600 }, { y: innerHeight - 550, duration: 2 }, "newText")
      .to({}, { duration: 1 })
    ;
  
  },
  
  // mobile
  "(max-width: 799px)": function () {
    // Hero letters
    gsap.from(".hero-letter", {
      yPercent: "random(-600, 150)",
      xPercent: "random(-350, 350)",
      scale: "random(2, 6)",
      opacity: 1,
      force3D: false,
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "5% top",
        end: "20% top",
        scrub: 1.5
      }
    });

    ScrollTrigger.create({
      trigger: ".hero-letters_box",
      start: "top top",
      endTrigger: ".hero-img",
      end: "75% top",
      pin: ".hero-dpto-pin",
    });

    ScrollTrigger.create({
      trigger: ".hero-letters_box",
      start: "top top",
      endTrigger: ".hero-img",
      end: "75% top",
      pin: ".hero-letters"
    });
    
    gsap.from(".hero-dpto", {
      y: '20vh',
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "top top",
        end: "35% top",
        scrub: true
      }
    });

    // Mapa Colombia
    const tlMap = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: ".hero",
        start: "80% top",
        endTrigger: ".context",
        end: "50% top",
        scrub: true,
        pin: ".context-map"
      }
    })
      .addLabel("map")
      .from(".map-algeciras", { duration: 1, scale: 100, xPercent: 400, transformOrigin: "center center" })
      .from(".map-huila", { duration: 0.5, scale: 40, transformOrigin: "center center" }, "map")
      .from(".map-colombia", { duration: 0.4, scale: 40, transformOrigin: "center center" }, "map")
      .from(".map-colombia", { duration: 0.4, fill: "#faf7f0" }, "ma+=0.35")
      .from(".location-pin", { duration: 0.1, scale: 0, yPercent: 2, transformOrigin: "center bottom" }, "-=1")
      ;
    
    gsap.fromTo(".context-text blockquote", { yPercent: -20 }, {
      yPercent: 20,
      scrollTrigger: {
        trigger: ".hero",
        start: "60% top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(".context-text blockquote svg", {
      yPercent: 280,
      scrollTrigger: {
        trigger: ".hero",
        start: "80% top",
        end: "bottom top",
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

    const fotoOld = gsap.timeline({
      defaults: { duration: 1, transformOrigin: "center center" },
      scrollTrigger: {
        trigger: ".old",
        start: "top top",
        end: "+=" + (window.innerHeight * 20),
        pin: ".old",
        anticipatePin: true,
        scrub: 1.5
      }
    })
      .from(".old-5, .border-5", { y: innerHeight + 400, ease: "power1out" })
      .from(".old-4, .border-4", { y: innerHeight + 400, ease: "power1out" }, "-=0.15")
      .from(".old-3, .border-3", { y: innerHeight + 400, ease: "power1out" }, "-=0.15")
      .from(".old-2, .border-2", { y: innerHeight + 400, ease: "power1out" }, "-=0.15")
      .from(".old-1, .border-1", { y: innerHeight + 600, ease: "power1out" }, "-=0.15")
      .from(".attack-1", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 })
      .to(".attack-1", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-1", { autoAlpha: 0 }, "-=0.2")
      .to(".border-1", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#e3ddd9" }, "<")
      .from(".attack-2", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-2", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-2", { autoAlpha: 0 }, "-=0.2")
      .to(".border-2", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#aa998c" }, "<")
      .to(".border", { stroke: "#bfd5d6" }, "<")
      .from(".attack-3", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-3", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-3", { autoAlpha: 0 }, "-=0.2")
      .to(".border-3", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#aa998c" }, "<")
      .from(".attack-4", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-4", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-4", { autoAlpha: 0 }, "-=0.2")
      .to(".border-4", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#8d7766" }, "<")
      .from(".attack-5", { autoAlpha: 0, y: innerHeight, ease: "power1out", duration: 2 }, "-=0.8")
      .to(".attack-5", { autoAlpha: 0, scale: 0.8, duration: 0.2 })
      .to(".old-5", { autoAlpha: 0 }, "-=0.2")
      .to(".border-5", { autoAlpha: 0 }, "<")
      .to(".old", { backgroundColor: "#715540" }, "<")
      .to({}, { duration: 2 })
      .to(".ruinas-3", { autoAlpha: 1 }, "-=0.5")
      .to(".iglesia-old", { scale: 1.8, xPercent: 20, duration: 1 }, "<")
      .to(".ruinas-3", { autoAlpha: 0, delay: 1 })
      .to(".ruinas-1", { autoAlpha: 1 }, "<")
      .to(".iglesia-old", { xPercent: -20, yPercent: -25, duration: 1 }, "<")
      .to(".ruinas-1", { autoAlpha: 0, delay: 1 })
      .to(".ruinas-2", { autoAlpha: 1 }, "<")
      .to(".iglesia-old", { xPercent: 0, yPercent: 22, duration: 1 }, "<")
      .to(".ruinas-2", { autoAlpha: 0, delay: 1 })
      .to(".ruinas-4", { autoAlpha: 1 }, "<")
      .to(".iglesia-old", { xPercent: 20, yPercent: -20, duration: 1 }, "<")
      .to(".ruinas-4", { autoAlpha: 0, delay: 1 })
      .to(".iglesia-old", { scale: 1, xPercent: 0, yPercent: 0 },"<")
      .to(".iglesia-old", { autoAlpha: 0})
      .to(".old-fixed", { opacity: 1 },"<-0.1")
      ;
    
    gsap.fromTo("h1 span", { yPercent: 100 }, {
      yPercent: -25,
      scrollTrigger: {
        trigger: ".news2",
        start: "20% top",
        endTrigger: "h1 span",
        end: "top top",
        scrub: true
      }
    });
    
    gsap.to(".guzman-back.new", {
      yPercent: 20,
      scrollTrigger: {
        trigger: ".news2",
        start: "bottom top",
        endTrigger: ".guzman-back.new",
        end: "20% top",
        scrub: true
      }
    });
    
    gsap.from(".guzman-info.new p", {
      yPercent: 30,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: ".guzman-info",
        start: "bottom top",
        endTrigger: ".guzman-back.new",
        end: "top top",
        scrub: true
      }
    });
    
    gsap.from(".guzman-foto", {
      yPercent: 20,
      scrollTrigger: {
        trigger: ".guzman-back.new",
        start: "10% top",
        end: "90% top",
        scrub: true
      }
    });
    
    gsap.from(".guzman-info.foto h2", {
      yPercent: -250,
      scrollTrigger: {
        trigger: ".guzman-back.new",
        start: "10% top",
        end: "80% top",
        scrub: true
      }
    });
    
    gsap.fromTo(".obra-text", { yPercent: -10, autoAlpha: 0 }, {
      yPercent: 10,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: ".guzman-foto",
        start: "60% top",
        endTrigger: ".guzman-text",
        end: "bottom top",
        scrub: true
      }
    });
    
    const tlCristo = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: ".obra-box",
        start: "top top",
        endTrigger: ".guzman-info.obra",
        end: "bottom top",
        pin: ".guzman-info.obra",
        scrub: 0.2
      }
    })
      .from(".cristo-2", { duration: 10, yPercent: 40 })
      .from(".cristo-2", { duration: 0.5, opacity: 0 }, "<")
      .from(".cristo-4", { duration: 10, yPercent: 50 }, "<2")
      .from(".cristo-4", { duration: 0.5, opacity: 0 }, "<")
      .from(".guzman-info.obra p", { duration: 8, yPercent: 40, opacity: 0 }, "<")
      .from(".cristo-1", { duration: 10, yPercent: 40 }, "-=3")
      .from(".cristo-1", { duration: 5, opacity: 0 }, "<")
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
    
    gsap.from(".hoy h2", {
      yPercent: -750,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".caido",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(".hoy-attack svg", { opacity: 0, duration: 0.02 });
    
    const tlHoy = gsap.timeline({
      scrollTrigger: {
        trigger: ".caido",
        start: "90% top",
        end: "bottom top",
        toggleActions: "play none reverse reverse"
      }
    })
      .fromTo(".hoy-attack div", { scale: 1 }, { scale: 0.4, duration: 0.5, ease: "power2.in" })
      .addLabel("bomb", ">")
      .fromTo(".hoy-attack div", { scale: 1, color: "#715540" }, { scale: 1.4, color: "#bfd5d6", duration: 2 }, "bomb")
      .to(".circle-attack", { scale: 1.6, opacity: 0.8, duration: 0.2, ease: "linear" }, "bomb")
      .to(".circle-attack", { scale: 1.8, duration: 3 }, "bomb+=0.2")
      .to(".circle-attack-2", { scale: 1.7, opacity: 1, duration: 0.2 }, "bomb")
      .to(".circle-attack-2", { scale: 2, opacity: 0, duration: 2 }, "bomb+=0.2")
    ;
    
    let playNew_btn = select(".shot-new");
    playNew_btn.addEventListener("click", clickNew);
    
    let shotNew = 1;
    gsap.set(".shot-new", { autoAlpha: 0 });
    
    function clickNew(){
      gsap.set(".shot-new", { autoAlpha: 0 });
      shotsNew.play();
      shotNew = 3;
      active = true;
    }
    
    function shotPlayNew() {
      if (shotNew == 1) {
        // shotsNew.play();
        gsap.to(".shot-new", { autoAlpha: 1, duration: 0.2 });
        shotNew = 2;
      }else if (shotNew == 2) {
        gsap.to(".shot-new", { autoAlpha: 0, duration: 0.2 });
        shotNew = 1;
      }
    }
    
    gsap.set(".attack-new", { xPercent: "random(-150, 50)", yPercent: "random(-90, 65)", scale: "random(0.2, 0.6)" });
    gsap.set(".border-bomb", { autoAlpha: 0 });
    // gsap.set(".old-new", { autoAlpha: 0 });
    gsap.set(".attack-new", { autoAlpha: 0 });
    // gsap.set(".new-text", { autoAlpha: 0 });
    
    const shotsNew = gsap.timeline({
      defaults: { duration: 0.02, transformOrigin: "center center" },
      paused: true
    })
      .set(".shot-new", { autoAlpha: 0 } )
      .to(".new-container", { scale: 0.9, skewX: "3deg", yoyo: true, repeat: 1 })
      .to(".old-new", { backgroundColor: "#715540" }, "<")
      .addLabel("newText")
      .to(".new-text", { autoAlpha: 1, duration: 3, delay: 0.5 })
      .to(".attack-new", { autoAlpha: 1, scale: "random(1, 1.8)", duration: "random(2, 4)" }, "newText")
      .to(".new-red", { autoAlpha: 1, duration: 4 }, "newText")
      .set(".new-foto, .border-new-mov", { autoAlpha: 0 })
      .set(".border-bomb", { autoAlpha: 1 }, "<")
      ;
    
    const fotoNew = gsap.timeline({
      scrollTrigger: {
        trigger: ".old-new",
        start: "top top",
        end: "+=" + (window.innerHeight * 6),
        pin: ".old-new",
        scrub: 1.5
      }
    })
      .from(".old-new", { autoAlpha: 0, duration: 1 })
      .from(".new-6, .border-new-6", { y: innerHeight + 600, ease:"power2.out" })
      .from(".new-5, .border-new-5", { y: innerHeight + 600, ease:"power2.out" }, ">")
      .from(".new-4, .border-new-4", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .from(".new-3, .border-new-3", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .from(".new-1, .border-new-1", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .from(".new-2, .border-new-2", { y: innerHeight + 600, ease:"power2.out" }, "-=0.15")
      .set(".shot-new", { autoAlpha: 0 } )
      .addLabel("newText")
      .to(".old-new", { backgroundColor: "#715540", duration: "0.4" }, "newText")
      .to(".attack-new", { autoAlpha: 1, scale: "random(1, 1.8)", duration: "random(2, 4)" }, "newText")
      .to(".new-foto", { autoAlpha: 0, scale: "random(0.9, 0.7)", duration: "random(0.5, 0.8)", transformOrigin: "center center" }, "newText")
      .to(".lines-new", { stroke: "#bfd5d6", duration: "0.4" }, "newText")
      .fromTo(".new-text", { y: innerHeight + 600 }, { y: innerHeight - 550, duration: 6 }, "newText")
      .to({}, { duration: 1 })
    ;
  }
});


// let atentadosOrder = document.querySelector(".atentados");
// for (let i = atentadosOrder.children.length; i >= 0; i--) {
//   atentadosOrder.appendChild(atentadosOrder.children[Math.random() * i | 0]);
// }

// document.querySelectorAll('.atentado:nth-child(odd)').forEach(atentadoOdd => {
//   gsap.set(atentadoOdd, { yPercent: "random(-50, 0)", xPercent: "random(-10, 20)", scale: "random(0.85, 1)" });
//   gsap.from(atentadoOdd, {
//     scrollTrigger: {
//       trigger: atentadoOdd,
//       start: "top 85%",
//       toggleActions: "play none none reverse"
//     },
//     autoAlpha: 0,
//     yPercent: 40,
//     xPercent: "random(-5, 5)",
//     scale: 0.8,
//     rotation: "random(-6, 6)",
//     transformOrigin: "center center",
//     duration: 1,
//     ease: "power2.out"
//   });
// })
// document.querySelectorAll('.atentado:nth-child(even)').forEach(atentadoEven => {
//   gsap.set(atentadoEven, { yPercent: "random(-40, 5)", xPercent: "random(-20, 10)", scale: "random(0.85, 1)" });
//   gsap.from(atentadoEven, {
//     scrollTrigger: {
//       trigger: atentadoEven,
//       start: "center 88h%",
//       toggleActions: "play none none reverse"
//     },
//     autoAlpha: 0,
//     yPercent: 40,
//     xPercent: "random(-5, 5)",
//     scale: 0.8,
//     rotation: "random(-6, 6)",
//     transformOrigin: "center center",
//     duration: 1,
//     ease: "power2.out"
//   });
// })




// gsap.from(".caido-box p", {
//   yPercent: 50,
//   autoAlpha: 0,
//   scrollTrigger: {
//     trigger: ".caido-box",
//     start: "top 70%",
//     end: "top 50%",
//     scrub: true
//   }
// });