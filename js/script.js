gsap.registerPlugin(ScrollTrigger);

function createExplosion(amount, where) {
	for (let i = 0; i < amount; i++) {
		let div = document.createElement("div");
    div.className = "cuadritos";
    document.getElementById(where).appendChild(div);
	}
}
createExplosion(25, "explode-1");
createExplosion(70, "explode-2");
createExplosion(140, "explode-3");
createExplosion(200, "explode-4");
gsap.set(".cuadritos", {width: "random(5%, 20%)", height: "random(5%, 20%)", marginRight: "random(1%, 10%)", transformOrigin: "center center"});


function windowSize(){
  // let iglesia = document.querySelector('.nop');
  // let iglesiaBox = document.querySelector('.old-box');
  // let iglesiaW = iglesia.clientWidth + "px";
  // iglesiaBox.style.width = iglesiaW;
  // alert(iglesiaW);

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


gsap.fromTo("h1 span", {yPercent: 100}, {
  yPercent: -25,
  scrollTrigger: {
    trigger: "h1 span",
    start: "top 90%",
    end: "bottom 10%",
    scrub: true
  }
});

function fotoOld() {
  let tl = gsap.timeline({
    defaults: {duration: 30, ease: "power2.out"}
  });
  tl.from(".foto-old-5b", {y: innerHeight, delay: 2}, "iglesiaStart")
    .from(".foto-old-5", {y: innerHeight}, "<")
    .from(".foto-old-4b", {y: innerHeight}, "iglesiaStart+=20")
    .from(".foto-old-4", {y: innerHeight}, "<")
    .from(".foto-old-3b", {y: innerHeight}, "iglesiaStart+=30")
    .from(".foto-old-3", {y: innerHeight}, "<")
    .from(".foto-old-2b", {y: innerHeight}, "iglesiaStart+=46")
    .from(".foto-old-2", {y: innerHeight}, "<")
    .from(".foto-old-1b", {y: innerHeight}, "iglesiaStart+=65")
    .from(".foto-old-1", {y: innerHeight}, "<");
  return tl;
}

function iglesiaShot(fotoTarget, colorFondo) {
  let tl = gsap.timeline({
    defaults: {duration: 2, ease: "power2.out"}
  });
  tl
  .to(fotoTarget, {opacity: 1, delay: 80})
  .to(".old-container", {scale: 0.9, transformOrigin: "center center"})
  .to(".iglesia", {fill: "var(--color-red)"})
  .to(".old", {background: "var(--color-red)"}, "<")
  .to(".old-container", {scale: 1, transformOrigin: "center center"})
  .to(".iglesia", {fill: colorFondo})
  .to(".old", {background: colorFondo}, "<")
  ;
  return tl;
}

let tlOld = gsap.timeline({
  scrollTrigger: {
    trigger: ".old",
    start: "20% 20%",
    end: "bottom top",
    scrub: true,
    pin: ".old"
  }
});
tlOld
  // .add.pause()
  .add(fotoOld())
  .add(iglesiaShot(".foto-old-3 .foto-red", "var(--color-red1)"))
  .add(iglesiaShot(".foto-old-4 .foto-red", "var(--color-red2)"))
  .add(iglesiaShot(".foto-old-1 .foto-red", "var(--color-red3)"))
  .add(iglesiaShot(".foto-old-5 .foto-red", "var(--color-red4)"))
  .to(".old", {"--border-color":"var(--main-bg-color)", duration: 1}, "<")
  .add(iglesiaShot(".foto-old-2 .foto-red", "var(--color-red)"))
  .to(".old-container", {scale: 0.9, transformOrigin: "center center", duration: 10, repeat: 20})
  .to(".old-container", {scale: 1, transformOrigin: "center center", duration: 1})
  // .to(".fotoBack", {opacity: 0}, "<")
  // .fromTo(".cuadritos", {xPercent: 0, yPercent: 0, scale: 1, opacity: 1}, {xPercent: "random(-300, 300)", yPercent: "random(-300, 300)", scale: "random(2, 4)", opacity: 0, duration: 200}, "<")
  // .to(".explode-box", {opacity: 1}, "<")
  
  ;
  
  







