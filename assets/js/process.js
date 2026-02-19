(function () {
  function bindCarousel(root) {
    const track = root.querySelector(".craft-carousel-track");
    const prev = root.querySelector(".craft-carousel-btn.prev");
    const next = root.querySelector(".craft-carousel-btn.next");
    if (!track || !prev || !next) return;

    const getStep = () => track.getBoundingClientRect().width;
    const getCount = () => track.querySelectorAll("img").length;
    const getIndex = () => Math.round(track.scrollLeft / Math.max(1, getStep()));
    const count = getCount();
    if (count <= 1) {
      prev.style.display = "none";
      next.style.display = "none";
    }

    prev.addEventListener("click", () => {
      const count = getCount();
      if (!count) return;
      const idx = getIndex();
      const nextIdx = (idx - 1 + count) % count;
      track.scrollTo({ left: nextIdx * getStep(), behavior: "smooth" });
    });
    next.addEventListener("click", () => {
      const count = getCount();
      if (!count) return;
      const idx = getIndex();
      const nextIdx = (idx + 1) % count;
      track.scrollTo({ left: nextIdx * getStep(), behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(bindCarousel);
  });
})();
