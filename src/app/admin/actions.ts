"use server";

import { revalidateTag } from "next/cache";
import { setTemplatePricing, setTemplateOrder } from "@/lib/db/templates";
import { setProPrice } from "@/lib/db/settings";
import { requireAdmin } from "@/lib/admin-auth";

export async function updateTemplatePricing(templateId: string, isPro: boolean) {
  await requireAdmin();
  setTemplatePricing(templateId, isPro);
  revalidateTag("templates", "max");
  revalidateTag("pricing", "max");
}

export async function updateTemplateOrder(orderedIds: string[]) {
  await requireAdmin();
  setTemplateOrder(orderedIds);
  revalidateTag("templates", "max");
}

export async function updateProPrice(price: number) {
  await requireAdmin();
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Invalid price");
  }
  setProPrice(Math.round(price));
  revalidateTag("pricing", "max");
}
