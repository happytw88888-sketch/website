(function () {
  const cfg = window.SITE_CONFIG || {};
  const year = new Date().getFullYear();

  function text(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }
  function textAll(selector, value) {
    if (value === undefined || value === null) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function html(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) el.innerHTML = value;
  }

  function setLink(id, href, label) {
    const el = document.getElementById(id);
    if (!el) return;
    if (href) el.href = href;
    if (label) el.textContent = label;
  }

  function applyConfig() {
    text("brandZh", cfg.brandZh);
    textAll("[data-bind='brandZh']", cfg.brandZh);
    text("brandAlias", cfg.brandAlias);
    text("brandEn", cfg.brandEn);
    text("foundedText", cfg.foundedText);
    text("tagline", cfg.tagline);
    text("subtitle", cfg.subtitle);
    text("aboutShort", cfg.aboutShort);
    text("contactPhoneText", cfg.phone);
    text("contactLineText", cfg.lineId);
    text("contactEmailText", cfg.email);
    text("contactAddressText", cfg.address);
    text("contactHoursText", cfg.businessHours);
    text("footerBrand", cfg.brandZh || "");
    text("footerYear", year);
    text("footerTagline", cfg.tagline || "");

    const cleanPhone = (cfg.phone || "").replace(/\s+/g, "");
    setLink("contactPhoneLink", cleanPhone ? `tel:${cleanPhone}` : "#", cfg.phone);
    setLink("contactLineLink", cfg.lineUrl || "#", cfg.lineId || "LINE");
    setLink("ctaLine", cfg.lineUrl || "#", "LINE 詢價");
    setLink("ctaPhone", cleanPhone ? `tel:${cleanPhone}` : "#", "電話洽詢");

    if (cfg.social && cfg.social.facebook) setLink("socialFacebook", cfg.social.facebook, "Facebook");
    if (cfg.social && cfg.social.instagram) setLink("socialInstagram", cfg.social.instagram, "Instagram");

    const titlePrefix = cfg.brandZh ? `${cfg.brandZh}｜` : "";
    const pageTitle = document.body.getAttribute("data-page-title");
    if (pageTitle) document.title = `${titlePrefix}${pageTitle}`;

    injectLocalBusinessSchema(cfg);
  }

  function injectLocalBusinessSchema(config) {
    if (!config.brandZh) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: config.brandZh,
      alternateName: config.brandAlias || "",
      image: config.ogImage || "",
      telephone: config.phone || "",
      email: config.email || "",
      address: config.address || "",
      openingHours: config.businessHours || "",
      url: location.origin
    };
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  }

  function initNav() {
    const page = document.body.getAttribute("data-page");
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });

    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  function ensureLightbox() {
    let box = document.getElementById("lightbox");
    if (box) return box;
    box = document.createElement("div");
    box.id = "lightbox";
    box.className = "lightbox";
    box.innerHTML = `
      <div class="lightbox-dialog" role="dialog" aria-modal="true">
        <button class="lightbox-close" type="button" aria-label="關閉">✕</button>
        <img src="" alt="">
      </div>
    `;
    document.body.appendChild(box);
    return box;
  }

  function openLightbox(src, title) {
    const box = ensureLightbox();
    const img = box.querySelector("img");
    img.src = src;
    img.alt = title || "";
    box.classList.add("open");
    box.addEventListener("click", onBackdropClick);
  }

  function closeLightbox() {
    const box = document.getElementById("lightbox");
    if (!box) return;
    box.classList.remove("open");
    box.removeEventListener("click", onBackdropClick);
  }

  function onBackdropClick(e) {
    if (e.target.id === "lightbox" || e.target.classList.contains("lightbox-close")) {
      closeLightbox();
    }
  }

  function bindLightbox() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".lightbox-trigger");
      if (!btn) return;
      const src = btn.getAttribute("data-image");
      const title = btn.getAttribute("data-title");
      openLightbox(src, title);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  window.AppConfig = cfg;
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initNav();
    bindLightbox();
  });
})();
