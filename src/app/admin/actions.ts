"use server";

import { revalidatePath } from "next/cache";
import { setTemplatePricing, setTemplateOrder } from "@/lib/db/templates";
import { setProPrice } from "@/lib/db/settings";

export async function updateTemplatePricing(templateId: string, isPro: boolean) {
  setTemplatePricing(templateId, isPro);
  revalidatePath("/admin");
  revalidatePath("/templates");
}

export async function updateTemplateOrder(orderedIds: string[]) {
  setTemplateOrder(orderedIds);
  revalidatePath("/admin");
  revalidatePath("/templates");
}

export async function updateProPrice(price: number) {
  setProPrice(price);
  revalidatePath("/admin");
  revalidatePath("/pricing");
}
