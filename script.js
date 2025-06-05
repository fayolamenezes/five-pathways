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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const paths = gsap.utils.toArray('.svg-path-container svg path');

  paths.forEach(path => {
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.opacity = 1;

    ScrollTrigger.create({
      trigger: path.closest('.svg-path-container'),
      start: "top 90%", // starts sooner (e.g., top of container hits 90% of viewport)
      end: "top 40%",   // ends sooner (faster draw finish)
      scrub: true,
      onUpdate: self => {
        path.style.strokeDashoffset = pathLength * (1 - self.progress);
      },
      // markers: true,
    });
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector('.section-two-title');
  title.innerHTML = title.textContent.split('').map(char => {
    if(char === ' ') return `<span>&nbsp;</span>`;
    return `<span>${char}</span>`;
  }).join('');

  gsap.to(".section-two-title span", {
    scrollTrigger: {
      trigger: ".section-two-title",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.05,
  });
});

const label = document.querySelector(".section-three-label");
label.innerHTML = label.textContent
  .split("")
  .map(char => `<span>${char}</span>`)
  .join("");

gsap.fromTo(
  ".section-three-label span",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-three-label",
      start: "top 80%", // when label top hits 80% viewport height
      toggleActions: "play none none none",
      // markers: true, // uncomment to debug
    },
  }
);

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const heading = document.querySelector(".section-three-main-heading");
  const rawText = heading.getAttribute("data-text");
  const words = rawText.split(" ");

  heading.innerHTML = ""; // clear existing content
  const spans = [];

  words.forEach(word => {
    if (word.toLowerCase() === "your") {
      heading.appendChild(document.createElement("br")); // start new line
    }

    const span = document.createElement("span");
    span.innerHTML = word + "&nbsp;"; // preserve space
    heading.appendChild(span);
    spans.push(span);
  });

  gsap.to(spans, {
    scrollTrigger: {
      trigger: heading,
      start: "top 80%",
      toggleActions: "play none none none",
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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const sections = [
    ".section-three",
    ".section-four",
    ".section-five",
    ".section-six",
    ".section-seven"
  ];

  // Animate the entire section fade/slide on scroll with scrub
  sections.forEach(selector => {
    const section = document.querySelector(selector);
    if (!section) return;

    gsap.set(section, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: self => {
        const progress = self.progress;
        const opacity = progress <= 0.5
          ? gsap.utils.mapRange(0, 0.5, 0, 1, progress)
          : gsap.utils.mapRange(0.5, 1, 1, 0, progress);
        const y = progress <= 0.5
          ? gsap.utils.mapRange(0, 0.5, 40, 0, progress)
          : gsap.utils.mapRange(0.5, 1, 0, -40, progress);

        gsap.set(section, { opacity, y });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Select all specific headings
  const selectors = [
    ".section-eight-heading",
    ".section-ten-heading",
    ".section-thirteen-heading",
    ".hero-title",
    "h3" // assuming you want to animate all h3s too
  ];

  const headings = document.querySelectorAll(selectors.join(", "));

  headings.forEach(title => {
    const rawText = title.innerHTML.replace(/<br\s*\/?>/gi, " <br> ");
    const words = rawText.split(" ").map(word => word.trim()).filter(Boolean);

    title.innerHTML = ""; // Clear original content
    const spans = [];

    words.forEach(word => {
      if (word === "<br>") {
        title.appendChild(document.createElement("br"));
      } else {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.opacity = 0;
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";
        span.style.marginRight = "0.25em";
        title.appendChild(span);
        spans.push(span);
      }
    });

    // Animate words from center outward on scroll
    gsap.to(spans, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none none"
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
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const isActive = mobileMenu.classList.contains("active");

    menuToggle.textContent = isActive ? "Close" : "Menu";
    menuToggle.classList.toggle("open", isActive);
  });
});

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.review-cards');
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');
  let cards = Array.from(container.children);

  // Clone first and last for infinite effect
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  container.appendChild(firstClone);
  container.insertBefore(lastClone, cards[0]);

  let allCards = Array.from(container.children);
  let index = 1;
  let autoScroll;

  function getCardWidth() {
    const card = container.querySelector('.review-card');
    if (!card) return 0;
    const style = getComputedStyle(card);
    const marginRight = parseFloat(style.marginRight) || 0;
    return card.offsetWidth + marginRight;
  }

  let cardWidth = getCardWidth();

  // Set container to correct position
  gsap.set(container, { x: -index * cardWidth });

  function highlightCenter() {
    allCards.forEach(card => card.classList.remove('center'));
    if (allCards[index]) {
      allCards[index].classList.add('center');
    }
  }
  highlightCenter();

  function moveToIndex(newIndex) {
    gsap.to(container, {
      duration: 0.5,
      x: -newIndex * cardWidth,
      ease: "power2.out",
      onComplete: () => {
        if (newIndex === allCards.length - 1) {
          index = 1;
          gsap.set(container, { x: -index * cardWidth });
        } else if (newIndex === 0) {
          index = allCards.length - 2;
          gsap.set(container, { x: -index * cardWidth });
        }
        highlightCenter();
      }
    });
    index = newIndex;
  }

  function nextSlide() {
    moveToIndex(index + 1);
  }

  function prevSlide() {
    moveToIndex(index - 1);
  }

  function startAutoScroll() {
    autoScroll = setInterval(nextSlide, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  rightArrow.addEventListener('click', () => {
    stopAutoScroll();
    nextSlide();
    startAutoScroll();
  });

  leftArrow.addEventListener('click', () => {
    stopAutoScroll();
    prevSlide();
    startAutoScroll();
  });

  container.addEventListener("mouseenter", stopAutoScroll);
  container.addEventListener("mouseleave", startAutoScroll);

  window.addEventListener("resize", () => {
    cardWidth = getCardWidth();
    gsap.set(container, { x: -index * cardWidth });
  });

  startAutoScroll();
});
