(function () {
  function renderItems(items) {
    const grid = document.getElementById("proofsGrid");
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = "<p>目前沒有可顯示的證明。</p>";
      return;
    }
    grid.innerHTML = items
      .map(
        (w) => `
      <article class="work">
        <button type="button" class="proof-thumb lightbox-trigger" data-image="${w.image}" data-title="${w.title}">
          <img src="${w.image}" alt="${w.title}">
        </button>
        <div class="work-body">
          <h3>${w.title}</h3>
          <p>${w.description || ""}</p>
        </div>
      </article>`
      )
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const data = Array.isArray(window.PROOFS_DATA) ? window.PROOFS_DATA : [];
    renderItems(data);
  });
})();
