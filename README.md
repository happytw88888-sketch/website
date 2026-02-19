# 鳳麟工作室官網 v2（靜態多頁）

## 目錄
- `index.html` 首頁
- `about.html` 關於
- `services.html` 服務
- `portfolio.html` 作品
- `contact.html` 聯絡/詢價
- `assets/css/main.css` 共用樣式
- `assets/js/site.js` 共用行為
- `assets/js/portfolio.js` 作品頁
- `assets/js/contact.js` 表單送單
- `content/site-config.js` 站點設定（實際使用）
- `content/site-config.json` 設定參考
- `content/portfolio-data.js` 作品資料（實際使用）
- `content/portfolio-data.json` 資料參考

## 本機預覽
直接雙擊 `index.html` 即可。

## 先改這些資料
編輯 `content/site-config.js`：
1. `phone`
2. `lineId`
3. `lineUrl`
4. `email`
5. `address`
6. `businessHours`
7. `sheetEndpoint`

## 作品替換
1. 把真實圖片放到 `assets/img/`
2. 在 `content/portfolio-data.js` 修改 `image/title/description/category`

## Google Sheet 詢價串接
### 1) 準備 Sheet 欄位
建議欄位：
- `createdAt`
- `name`
- `phone`
- `lineId`
- `serviceType`
- `budget`
- `message`
- `source`

### 2) 建立 Apps Script（Web App）
在 Google Sheet → Extensions → Apps Script，貼上：

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var data = JSON.parse(e.postData.contents || "{}");
  sheet.appendRow([
    data.createdAt || "",
    data.name || "",
    data.phone || "",
    data.lineId || "",
    data.serviceType || "",
    data.budget || "",
    data.message || "",
    data.source || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3) 發佈
1. Deploy → New deployment
2. Type: Web app
3. Who has access: `Anyone`
4. 複製 URL，貼到 `content/site-config.js` 的 `sheetEndpoint`

## 上線前要改
1. `sitemap.xml` 的 `https://example.com` 換成你的正式網域
2. `robots.txt` 的 Sitemap URL 換成正式網域
3. Open Graph 圖檔可替換 `assets/img/og-cover.svg`

## 驗收清單
1. 手機與桌機都可正常瀏覽
2. 導覽列 active 狀態正確
3. 聯絡表單可送出並進 Sheet
4. 作品分類篩選正常
5. 聯絡資訊與頁尾文案顯示正確
