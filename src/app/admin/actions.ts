"use server";

import { revalidatePath } from "next/cache";
import { setTemplatePricing } from "@/lib/db/templates";
import { setProPrice } from "@/lib/db/settings";

export async function updateTemplatePricing(templateId: string, isPro: boolean) {
  setTemplatePricing(templateId, isPro);
  revalidatePath("/admin");
  revalidatePath("/templates");
}

export async function updateProPrice(price: number) {
  setProPrice(price);
  revalidatePath("/admin");
  revalidatePath("/pricing");
}
