(function () {
  function setStatus(msg, ok) {
    const box = document.getElementById("formStatus");
    if (!box) return;
    box.className = `status ${ok ? "ok" : "err"}`;
    box.textContent = msg;
  }

  function validPhone(v) {
    const t = (v || "").replace(/\s+/g, "");
    return /^[0-9+\-()]{8,20}$/.test(t);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quoteForm");
    if (!form) return;
    const endpoint = (window.AppConfig && window.AppConfig.sheetEndpoint) || "";

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      setStatus("", false);

      const payload = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        lineId: form.lineId.value.trim(),
        serviceType: form.serviceType.value,
        budget: form.budget.value.trim(),
        message: form.message.value.trim(),
        createdAt: new Date().toISOString(),
        source: "fenglin_studio_site_v2"
      };

      if (!payload.name || !payload.phone || !payload.message) {
        setStatus("請填寫姓名、電話與需求說明。", false);
        return;
      }
      if (!validPhone(payload.phone)) {
        setStatus("電話格式不正確。", false);
        return;
      }
      if (payload.message.length < 10) {
        setStatus("需求說明請至少 10 個字。", false);
        return;
      }
      if (!endpoint || endpoint.includes("YOUR_SCRIPT_ID")) {
        setStatus("尚未設定 Google Sheet 串接網址，請先在 content/site-config.js 設定 sheetEndpoint。", false);
        return;
      }

      const submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = true;
      submitBtn.textContent = "送出中...";

      try {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        setStatus("已收到你的需求，我們會儘快聯絡你。", true);
        form.reset();
      } catch (err) {
        setStatus("送出失敗，請稍後再試或直接電話聯絡。", false);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "送出詢價";
      }
    });
  });
})();
