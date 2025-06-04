// Animate Hero Section
gsap.from(".hero-content h1", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".hero-content p", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
  ease: "power2.out"
});

gsap.from(".cta-button", {
  opacity: 0,
  scale: 0.8,
  duration: 1,
  delay: 1,
  ease: "back.out(1.7)"
});

// Animate Pathways Section on Scroll
gsap.registerPlugin(ScrollTrigger);

gsap.from(".pathways .section-title h2", {
  scrollTrigger: ".pathways",
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".pathways-content p", {
  scrollTrigger: ".pathways",
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.3,
  ease: "power2.out"
});

// Animate Testimonials on Scroll
gsap.utils.toArray(".testimonial").forEach((testimonial, i) => {
  gsap.from(testimonial, {
    scrollTrigger: {
      trigger: testimonial,
      start: "top 80%"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: i * 0.2,
    ease: "power2.out"
  });
});
