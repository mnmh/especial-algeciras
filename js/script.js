gsap.registerPlugin(ScrollTrigger);

function windowSize(){
  // var iglesia = document.querySelector('.nop');
  // var iglesiaBox = document.querySelector('.old-box');
  // var iglesiaW = iglesia.clientWidth + "px";
  // iglesiaBox.style.width = iglesiaW;
  // alert(iglesiaW);

  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
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

gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.3 }
});

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
  // markers: true,
  trigger: ".hero-img-left",
  start: "top bottom", 
  end: "bottom 30%",
  pin: ".hero-letters"
});
ScrollTrigger.create({
  // markers: tru e,
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
      opacity: "random(0.6, 1)",
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
      opacity: "random(0.6, 1)",
      scrollTrigger: {
        trigger: ".hero-letters_box",
        start: "top 5%",
        end: "90% 60%",
        scrub: true
      }
    });
  }
});

let fotoScroll = 30;
// gsap.set(".foto-red", {opacity: 1});

const tlOld = gsap.timeline({
  defaults: {ease: "power2.out"},
  scrollTrigger: {
    trigger: ".old",
    start: "20% 20%",
    end: "bottom top",
    scrub: true,
    pin: ".old"
  }
});
tlOld.from(".foto-old-5b", {y: innerHeight, duration: fotoScroll, delay: 2}, "iglesiaStart")
  .from(".foto-old-5", {y: innerHeight, duration: fotoScroll}, "<")
  .from(".foto-old-4b", {y: innerHeight, duration: fotoScroll}, "iglesiaStart+=20")
  .from(".foto-old-4", {y: innerHeight, duration: fotoScroll}, "<")
  .from(".foto-old-3b", {y: innerHeight, duration: fotoScroll}, "iglesiaStart+=30")
  .from(".foto-old-3", {y: innerHeight, duration: fotoScroll}, "<")
  .from(".foto-old-2b", {y: innerHeight, duration: fotoScroll}, "iglesiaStart+=46")
  .from(".foto-old-2", {y: innerHeight, duration: fotoScroll}, "<")
  .from(".foto-old-1b", {y: innerHeight, duration: fotoScroll}, "iglesiaStart+=65")
  .from(".foto-old-1", {y: innerHeight, duration: fotoScroll}, "<")
  .to(".foto-old-3 .foto-red", {opacity: 1, duration: 0.8, delay: 2})
  .fromTo(".old-container", {x: -5}, {x: 5, duration: 0.8, repeat: 5, yoyo: true, ease: Quad.easeInOut}, "<")
  .to(".iglesia", {fill: "var(--color-red1)", duration: 0.8}, "<")
  .to(".old", {background: "var(--color-red1)", duration: 0.8}, "<")
  .to(".foto-old-4 .foto-red", {opacity: 1, duration: 0.8}, "+=4")
  .fromTo(".old-container", {x: -10}, {x: 10, duration: 0.8, repeat: 5, yoyo: true, ease: Quad.easeInOut}, "<")
  .to(".iglesia", {fill: "var(--color-red2)", duration: 0.8}, "<")
  .to(".old", {background: "var(--color-red2)", duration: 0.8}, "<")
  .to(".foto-old-1 .foto-red", {opacity: 1, duration: 0.8}, "+=4")
  .fromTo(".old-container", {x: -15}, {x: 15, duration: 0.8, repeat: 5, yoyo: true, ease: Quad.easeInOut}, "<")
  .to(".iglesia", {fill: "var(--color-red3)", duration: 0.8}, "<")
  .to(".old", {background: "var(--color-red3)", duration: 0.8}, "<")
  .to(".old", {"--border-color":"var(--main-bg-color)", duration: 0.8}, "<")
  .to(".foto-old-5 .foto-red", {opacity: 1, duration: 0.8}, "+=4")
  .fromTo(".old-container", {x: -20}, {x: 20, duration: 0.8, repeat: 5, yoyo: true, ease: Quad.easeInOut}, "<")
  .to(".iglesia", {fill: "var(--color-red4)", duration: 0.8}, "<")
  .to(".old", {background: "var(--color-red4)", duration: 0.8}, "<")
  .to(".foto-old-2 .foto-red", {opacity: 1, duration: 0.8}, "+=4")
  .fromTo(".old-container", {x: -25}, {x: 25, duration: 2, repeat: 5, yoyo: true, ease: Quad.easeInOut}, "<")
  .to(".iglesia", {fill: "var(--color-red)", duration: 0.8}, "<")
  .fromTo(".old-container", {x: -15}, {x: 15, duration: 3, repeat: 5, yoyo: true, ease: Quad.easeInOut}, "<")
  .to(".old", {background: "var(--color-red)", duration: 0.8}, "<");







