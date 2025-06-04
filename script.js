const track = document.getElementById('logoTrack');
let scrollAmount = 0;

  // Duplicate logos for seamless loop
track.innerHTML += track.innerHTML;
function scrollLogos() {
    scrollAmount += 1;
    track.style.transform = `translateX(-${scrollAmount}px)`;

    // Reset scroll when first half has moved completely
    if (scrollAmount >= track.scrollWidth / 2) {
      scrollAmount = 0;
    }

    requestAnimationFrame(scrollLogos);
}

scrollLogos();