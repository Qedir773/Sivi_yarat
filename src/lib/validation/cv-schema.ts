import { z } from "zod";
import type { CVData } from "@/types/cv";

const optionalString = z.string().optional().or(z.literal(""));

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Şirkət adı tələb olunur"),
  role: z.string().min(1, "Vəzifə tələb olunur"),
  location: optionalString,
  startDate: z.string().min(1, "Başlama tarixi tələb olunur"),
  endDate: optionalString,
  current: z.boolean(),
  description: optionalString,
  /** One highlight per line — kept as raw textarea text in the form layer. */
  highlightsText: optionalString,
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Təhsil müəssisəsi tələb olunur"),
  degree: z.string().min(1, "Dərəcə tələb olunur"),
  field: optionalString,
  startDate: z.string().min(1, "Başlama tarixi tələb olunur"),
  endDate: optionalString,
  current: z.boolean(),
  description: optionalString,
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Bacarıq adı tələb olunur"),
  level: z.number().min(1).max(5),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Dil adı tələb olunur"),
  level: z.string().min(1, "Səviyyə tələb olunur"),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Layihə adı tələb olunur"),
  description: optionalString,
  url: optionalString,
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Sertifikat adı tələb olunur"),
  issuer: optionalString,
  date: optionalString,
});

export const cvFormSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Ad Soyad tələb olunur"),
    title: z.string().min(1, "Vəzifə tələb olunur"),
    email: z.string().email("Düzgün email daxil edin"),
    phone: z.string().min(1, "Telefon tələb olunur"),
    location: z.string().min(1, "Ünvan tələb olunur"),
    website: optionalString,
    photoUrl: optionalString,
  }),
  summary: optionalString,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
});

export type CVFormValues = z.infer<typeof cvFormSchema>;

function stripEmpty(value?: string): string | undefined {
  return value && value.length > 0 ? value : undefined;
}

/** Converts the RHF-shaped form values (e.g. highlights as {value}[]) into the plain CVData used by templates. */
export function formValuesToCVData(values: CVFormValues): CVData {
  return {
    personalInfo: {
      fullName: values.personalInfo.fullName,
      title: values.personalInfo.title,
      email: values.personalInfo.email,
      phone: values.personalInfo.phone,
      location: values.personalInfo.location,
      website: stripEmpty(values.personalInfo.website),
      photoUrl: stripEmpty(values.personalInfo.photoUrl),
    },
    summary: stripEmpty(values.summary),
    experience: values.experience.map((exp) => ({
      id: exp.id,
      company: exp.company,
      role: exp.role,
      location: stripEmpty(exp.location),
      startDate: exp.startDate,
      endDate: stripEmpty(exp.endDate),
      current: exp.current,
      description: stripEmpty(exp.description),
      highlights: (exp.highlightsText ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
    })),
    education: values.education.map((edu) => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      field: stripEmpty(edu.field),
      startDate: edu.startDate,
      endDate: stripEmpty(edu.endDate),
      current: edu.current,
      description: stripEmpty(edu.description),
    })),
    skills: values.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      level: skill.level as 1 | 2 | 3 | 4 | 5,
    })),
    languages: values.languages.map((lang) => ({
      id: lang.id,
      name: lang.name,
      level: lang.level,
    })),
    projects: values.projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: stripEmpty(project.description),
      url: stripEmpty(project.url),
    })),
    certifications: values.certifications.map((cert) => ({
      id: cert.id,
      name: cert.name,
      issuer: stripEmpty(cert.issuer),
      date: stripEmpty(cert.date),
    })),
  };
}

export function emptyFormValues(): CVFormValues {
  return {
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      photoUrl: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    certifications: [],
  };
}
