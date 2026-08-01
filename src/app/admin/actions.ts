"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { setTemplatePricing, setTemplateOrder } from "@/lib/db/templates";
import { setProPrice } from "@/lib/db/settings";
import { requireAdmin } from "@/lib/admin-auth";

// Both /templates (V1) and /v2/templates (V2) read directly from SQLite via
// `getTemplateOrder()` / `getTemplatePricing()` — no `fetch` and no
// `'use cache'`. Next.js therefore treats them as static and serves the
// pre-rendered HTML from `.next/server/app/.../*.html` until invalidated.
//
// `revalidateTag("templates", "max")` would be the right call IF the data
// fetching was tagged (e.g. wrapped in `unstable_cache(..., { tags: [...] })`
// or a `'use cache'` function calling `cacheTag('templates')`). Without that,
// the tag matches nothing and the pre-rendered page is never refreshed — the
// admin sees their optimistic reorder, the public gallery keeps the old
// order. `revalidatePath` reaches the page-level (Full Route) cache directly,
// which is what we actually need here.
function refreshTemplatePages() {
  revalidatePath("/templates");
  revalidatePath("/v2/templates");
}

export async function updateTemplatePricing(templateId: string, isPro: boolean) {
  await requireAdmin();
  setTemplatePricing(templateId, isPro);
  refreshTemplatePages();
}

export async function updateTemplateOrder(orderedIds: string[]) {
  await requireAdmin();
  setTemplateOrder(orderedIds);
  refreshTemplatePages();
}

export async function updateProPrice(price: number) {
  await requireAdmin();
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Invalid price");
  }
  setProPrice(Math.round(price));
  // Pro price is read by the same gallery pages via `getProPrice()`.
  refreshTemplatePages();
}
