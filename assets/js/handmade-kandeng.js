(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const badges = Array.from(document.querySelectorAll(".kandeng-badge"));
    const img = document.getElementById("kandengProofImage");
    const title = document.getElementById("kandengProofTitle");
    if (!badges.length || !img || !title) return;

    badges.forEach((btn) => {
      btn.addEventListener("click", () => {
        badges.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const src = btn.getAttribute("data-image");
        const name = btn.getAttribute("data-title") || btn.textContent.trim();
        if (src) img.src = src;
        img.alt = name;
        title.textContent = name;
      });
    });
  });
})();
