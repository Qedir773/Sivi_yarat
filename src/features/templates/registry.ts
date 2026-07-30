import type { ComponentType } from "react";
import type { CVData } from "@/types/cv";
import { ProfessionalTemplate } from "@/components/templates/professional";
import { ModernTemplate } from "@/components/templates/modern";
import { MinimalTemplate } from "@/components/templates/minimal";
import { AtsTemplate } from "@/components/templates/ats";
import { AcademicTemplate } from "@/components/templates/academic";
import { CreativeTemplate } from "@/components/templates/creative";
import { StudentTemplate } from "@/components/templates/student";
import { ItTemplate } from "@/components/templates/it";
import { ExecutiveClassicTemplate } from "@/components/templates/executive-classic";
import { ExecutiveModernTemplate } from "@/components/templates/executive-modern";

export type TemplateCategoryId =
  | "professional"
  | "modern"
  | "minimal"
  | "ats"
  | "academic"
  | "creative"
  | "student"
  | "it"
  | "executive";

export const templateCategoryIds: TemplateCategoryId[] = [
  "professional",
  "modern",
  "minimal",
  "ats",
  "academic",
  "creative",
  "student",
  "it",
  "executive",
];

export interface TemplateComponentMeta {
  id: string;
  category: TemplateCategoryId;
  component: ComponentType<{ data: CVData }>;
}

export interface TemplateMeta extends TemplateComponentMeta {
  isPro: boolean;
}

/**
 * Static, non-DB part of the registry: which component renders which
 * template id, and which category it belongs to. Cannot live in the
 * database since components aren't serializable.
 */
export const templateComponents: TemplateComponentMeta[] = [
  { id: "professional-1", category: "professional", component: ProfessionalTemplate },
  { id: "modern-1", category: "modern", component: ModernTemplate },
  { id: "minimal-1", category: "minimal", component: MinimalTemplate },
  { id: "ats-1", category: "ats", component: AtsTemplate },
  { id: "academic-1", category: "academic", component: AcademicTemplate },
  { id: "creative-1", category: "creative", component: CreativeTemplate },
  { id: "student-1", category: "student", component: StudentTemplate },
  { id: "it-1", category: "it", component: ItTemplate },
  { id: "executive-classic", category: "executive", component: ExecutiveClassicTemplate },
  { id: "executive-modern", category: "executive", component: ExecutiveModernTemplate },
];

/**
 * Default Free/Pro flags — used only to seed the `template_pricing` table
 * in SQLite the first time it's empty. After seeding, the database is the
 * source of truth (admin panel will read/write it in a later phase).
 */
export const defaultTemplatePricing: Record<string, boolean> = {
  "professional-1": false,
  "modern-1": true,
  "minimal-1": false,
  "ats-1": false,
  "academic-1": true,
  "creative-1": true,
  "student-1": false,
  "it-1": true,
  "executive-classic": true,
  "executive-modern": true,
};
