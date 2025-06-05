document.querySelectorAll('.logo-track').forEach(track => {
  track.innerHTML += track.innerHTML;
  gsap.set(track, { x: 0 });
  gsap.to(track, {
    x: () => `-=${track.scrollWidth / 2}`,
    duration: 20,
    ease: 'none',
    repeat: -1
  });
});

gsap.to(".carousel-track", {
   x: "-50%",
   duration: 20,
   ease: "linear",
   repeat: -1,
});

gsap.registerPlugin(ScrollTrigger);
const text = new SplitType(".script-text", { types: "chars" }); 
gsap.from(text.chars, {
  scrollTrigger: {
    trigger: ".section-one-script",
    start: "top 80%", 
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 20,
  stagger: 0.05,
  duration: 0.5,
  ease: "power2.out"
});

const track = document.querySelector('.review-cards');
const cards = document.querySelectorAll('.review-card');
const leftBtn = document.querySelector('.arrow-left');
const rightBtn = document.querySelector('.arrow-right');

let cardWidth = cards[0].offsetWidth + 24; // card width + gap
let position = 0;

track.innerHTML += track.innerHTML; // Duplicate cards for seamless loop

function moveToPosition(x) {
  gsap.to(track, { x: x, duration: 1, ease: 'power1.inOut' });
  position = x;
}

function slideNext() {
  if (Math.abs(position) >= cardWidth * (cards.length)) {
    position = 0;
    gsap.set(track, { x: 0 });
  }
  moveToPosition(position - cardWidth);
}

function slidePrev() {
  if (position === 0) {
    position = -cardWidth * cards.length;
    gsap.set(track, { x: position });
  }
  moveToPosition(position + cardWidth);
}

leftBtn.addEventListener('click', slidePrev);
rightBtn.addEventListener('click', slideNext);

let autoSlide = setInterval(slideNext, 5000);

track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
  autoSlide = setInterval(slideNext, 5000);
});

const path = document.querySelector('#scrollPath path');
const pathLength = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength,
  opacity: 0
});

gsap.to(path, {
  strokeDashoffset: 0,
  opacity: 1,
  duration: 2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.svg-path-container',
    start: 'top 80%',
    end: 'bottom 60%',
    scrub: true
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    const text = link.textContent;
    link.textContent = ""; // clear original text

    const spans = text.split("").map(char => {
      const span = document.createElement("span");

      if (char === " ") {
        span.innerHTML = "&nbsp;"; // preserve the space visually
        span.classList.add("space"); // optional class
      } else {
        span.textContent = char;
      }

      link.appendChild(span);
      return span;
    });

    link.addEventListener("mouseenter", () => {
      gsap.killTweensOf(spans);

      gsap.to(spans, {
        y: -8,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.03,
        onStart: () => {
          spans.forEach(span => {
            if (!span.classList.contains("space")) {
              span.style.fontFamily = "'Great Vibes', cursive";
              span.style.fontSize = "15px";
            }
          });
        }
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.killTweensOf(spans);

      gsap.to(spans, {
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
        stagger: {
          each: 0.02,
          from: "end"
        },
        onComplete: () => {
          spans.forEach(span => {
            if (!span.classList.contains("space")) {
              span.style.fontFamily = "";
              span.style.fontSize = "11px";
            }
          });
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const title = document.getElementById("animated-title");

  // Replace <br> with token
  const rawText = title.innerHTML.replace(/<br\s*\/?>/gi, " <br> ");
  const words = rawText.split(" ").map(word => word.trim()).filter(Boolean);

  title.innerHTML = "";

  const spans = [];

  words.forEach(word => {
    if (word === "<br>") {
      title.appendChild(document.createElement("br"));
    } else {
      const span = document.createElement("span");
      span.textContent = word;
      title.appendChild(span);
      spans.push(span);
    }
  });

  // Scroll-triggered animation from center outward
  gsap.to(spans, {
    scrollTrigger: {
      trigger: "#animated-title",
      start: "top 80%",
      toggleActions: "play none none none", // play only once when scrolled into view
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: {
      each: 0.08,
      from: "center"
    }
  });
});






