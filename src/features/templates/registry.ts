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

export interface TemplateMeta {
  id: string;
  category: TemplateCategoryId;
  isPro: boolean;
  component: ComponentType<{ data: CVData }>;
}

export const templateRegistry: TemplateMeta[] = [
  { id: "professional-1", category: "professional", isPro: false, component: ProfessionalTemplate },
  { id: "modern-1", category: "modern", isPro: true, component: ModernTemplate },
  { id: "minimal-1", category: "minimal", isPro: false, component: MinimalTemplate },
  { id: "ats-1", category: "ats", isPro: false, component: AtsTemplate },
  { id: "academic-1", category: "academic", isPro: true, component: AcademicTemplate },
  { id: "creative-1", category: "creative", isPro: true, component: CreativeTemplate },
  { id: "student-1", category: "student", isPro: false, component: StudentTemplate },
  { id: "it-1", category: "it", isPro: true, component: ItTemplate },
  { id: "executive-classic", category: "executive", isPro: true, component: ExecutiveClassicTemplate },
  { id: "executive-modern", category: "executive", isPro: true, component: ExecutiveModernTemplate },
];
