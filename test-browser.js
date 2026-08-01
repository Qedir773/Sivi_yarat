// Live AI test — opens browser, navigates to /builder, fills summary,
// clicks "AI ilə Gücləndir", screenshots each step.
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: "az-AZ",
  });
  const page = await context.newPage();

  // Log console messages from the page so we can see what's happening
  page.on("console", (msg) => {
    console.log(`[browser ${msg.type()}]`, msg.text());
  });
  page.on("pageerror", (err) => {
    console.log(`[browser error]`, err.message);
  });

  try {
    console.log("\n=== Step 1: Navigate to /builder ===");
    await page.goto("http://localhost:3000/builder", { waitUntil: "networkidle", timeout: 30000 });
    await page.screenshot({ path: "step1-builder.png", fullPage: false });
    console.log("Screenshot saved: step1-builder.png");

    // Wait for the form to render
    await page.waitForSelector('textarea, [contenteditable="true"]', { timeout: 10000 });
    console.log("Form rendered.");

    console.log("\n=== Step 2: Fill summary field ===");
    // The summary field — try by label, placeholder, or first textarea
    const summaryTextarea = await page.locator('textarea').first();
    await summaryTextarea.fill(
      "men telebeyem, programlashdirma oyrenirem, komandada islheyirem"
    );
    await page.waitForTimeout(500);
    await page.screenshot({ path: "step2-filled.png", fullPage: false });
    console.log("Screenshot saved: step2-filled.png");

    console.log("\n=== Step 3: Click 'AI ilə Gücləndir' button ===");
    const aiButton = await page.getByRole("button", { name: /AI ilə/i }).first();
    await aiButton.click();

    console.log("Waiting for dialog to open...");
    await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "step3-dialog-open.png", fullPage: false });
    console.log("Screenshot saved: step3-dialog-open.png");

    console.log("\n=== Step 4: Wait for AI to respond (up to 60s) ===");
    // Wait for the result textarea to have content, or for the apply button to enable
    let result = "";
    let attempt = 0;
    while (attempt < 30) {
      await page.waitForTimeout(2000);
      const errorVisible = await page.locator('text="ai-api-unavailable"').count();
      if (errorVisible > 0) {
        result = "ERROR: ai-api-unavailable";
        break;
      }
      const errorVisible502 = await page.locator('text="502"').count();
      if (errorVisible502 > 0) {
        result = "ERROR: 502";
        break;
      }
      // Check the textarea inside dialog has content
      const dialogTextarea = await page.locator('[role="dialog"] textarea').first();
      const value = await dialogTextarea.inputValue().catch(() => "");
      const applyBtn = await page.getByRole("button", { name: /Tətbiq et/i }).first();
      const isDisabled = await applyBtn.isDisabled().catch(() => true);
      if (value.length > 5 && !isDisabled) {
        result = value;
        break;
      }
      attempt++;
      console.log(`  Attempt ${attempt}: value="${value.slice(0, 50)}..." disabled=${isDisabled}`);
    }

    await page.screenshot({ path: "step4-result.png", fullPage: false });
    console.log("Screenshot saved: step4-result.png");
    console.log("\n=== FINAL RESULT ===");
    console.log(result || "(timeout — no result captured)");

  } catch (err) {
    console.error("Test failed:", err.message);
    await page.screenshot({ path: "error.png", fullPage: false }).catch(() => {});
  } finally {
    await browser.close();
  }
})();
