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