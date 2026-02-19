(function () {
  function renderItems(items) {
    const grid = document.getElementById("portfolioGrid");
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = "<p>目前沒有可顯示的商品。</p>";
      return;
    }
    grid.innerHTML = items
      .map(
        (w) => `
      <article class="work">
        <button type="button" class="service-media-btn lightbox-trigger" data-image="${w.image}" data-title="${w.title}">
          <img src="${w.image}" alt="${w.title}">
        </button>
      </article>`
      )
      .join("");
  }

  function bindCarousel() {
    const track = document.getElementById("portfolioGrid");
    if (!track) return;
    const carousel = track.closest(".carousel");
    if (!carousel) return;
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");
    if (!prev || !next) return;
    const gap = 0;
    const step = track.getBoundingClientRect().width + gap;
    prev.addEventListener("click", () => {
      track.scrollBy({ left: -step, behavior: "smooth" });
    });
    next.addEventListener("click", () => {
      track.scrollBy({ left: step, behavior: "smooth" });
    });

    let autoTimer = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      if (track.scrollLeft >= maxScroll) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 5000);

    carousel.addEventListener("mouseenter", () => clearInterval(autoTimer));
    carousel.addEventListener("mouseleave", () => {
      autoTimer = setInterval(() => {
        const maxScroll = track.scrollWidth - track.clientWidth - 1;
        if (track.scrollLeft >= maxScroll) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: step, behavior: "smooth" });
        }
      }, 5000);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const data = Array.isArray(window.GOODS_DATA) ? window.GOODS_DATA : [];
    renderItems(data);
    bindCarousel();
  });
})();
