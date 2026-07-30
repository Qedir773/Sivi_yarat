import type { CVData } from "@/types/cv";

export interface AtsIssue {
  id: string;
  message: string;
}

export interface AtsResult {
  score: number;
  completenessScore: number;
  keywordMatchScore: number | null;
  matchedKeywords: string[];
  missingKeywords: string[];
  issues: AtsIssue[];
}

const STOPWORDS = new Set([
  "və", "ilə", "üçün", "bir", "bu", "the", "and", "for", "with", "a", "an", "of", "to",
  "in", "on", "at", "is", "are", "was", "were", "be", "as", "that", "this", "it",
]);

function tokenize(text: string): string[] {
  // No Unicode normalization here: NFKD would decompose Azerbaijani letters
  // like "ü"/"ö" into base letter + combining diacritic, and the next step
  // would then strip the (non-\p{L}) combining mark and corrupt the word
  // (e.g. "büdcə" -> "dcə"). \p{L} already matches precomposed accented
  // letters directly, so no decomposition is needed.
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

function cvSearchableText(data: CVData): string {
  return [
    data.summary ?? "",
    ...data.experience.map(
      (exp) => `${exp.role} ${exp.company} ${exp.description ?? ""} ${(exp.highlights ?? []).join(" ")}`,
    ),
    ...data.education.map((edu) => `${edu.degree} ${edu.field ?? ""} ${edu.institution}`),
    ...data.skills.map((skill) => skill.name),
    ...(data.projects ?? []).map((project) => `${project.name} ${project.description ?? ""}`),
    ...(data.certifications ?? []).map((cert) => cert.name),
  ]
    .filter(Boolean)
    .join(" ");
}

interface CompletenessCheck {
  id: string;
  weight: number;
  pass: boolean;
  message: string;
}

/** Pure, client-side ATS scoring — no external API, so this stays free and works offline. */
export function analyzeCv(data: CVData, jobDescription = ""): AtsResult {
  const checks: CompletenessCheck[] = [
    {
      id: "summary",
      weight: 15,
      pass: Boolean(data.summary && data.summary.trim().length >= 40),
      message: "Xülasə bölməsi ya boşdur, ya da çox qısadır (minimum 40 simvol tövsiyə olunur).",
    },
    {
      id: "experience-count",
      weight: 20,
      pass: data.experience.length > 0,
      message: "Ən azı bir iş təcrübəsi qeydi əlavə edin.",
    },
    {
      id: "experience-highlights",
      weight: 15,
      pass: data.experience.length === 0 || data.experience.every((exp) => (exp.highlights ?? []).length > 0),
      message: "Bəzi iş təcrübəsi qeydlərində konkret nailiyyət (bullet) yoxdur — ölçülə bilən nəticələr əlavə edin.",
    },
    {
      id: "education-count",
      weight: 10,
      pass: data.education.length > 0,
      message: "Ən azı bir təhsil qeydi əlavə edin.",
    },
    {
      id: "skills-count",
      weight: 15,
      pass: data.skills.length >= 3,
      message: "Ən azı 3 bacarıq əlavə edin ki, açar söz uyğunluğu artsın.",
    },
    {
      id: "contact-info",
      weight: 15,
      pass: Boolean(data.personalInfo.email && data.personalInfo.phone && data.personalInfo.location),
      message: "Əlaqə məlumatları (e-poçt, telefon, ünvan) tam deyil.",
    },
    {
      id: "dates",
      weight: 10,
      pass: data.experience.every((exp) => Boolean(exp.endDate) || exp.current),
      message: "Bəzi iş təcrübəsi qeydlərində bitmə tarixi yoxdur və 'hazırda davam edir' işarələnməyib.",
    },
  ];

  const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
  const passedWeight = checks.reduce((sum, check) => sum + (check.pass ? check.weight : 0), 0);
  const completenessScore = Math.round((passedWeight / totalWeight) * 100);
  const issues: AtsIssue[] = checks
    .filter((check) => !check.pass)
    .map((check) => ({ id: check.id, message: check.message }));

  let keywordMatchScore: number | null = null;
  let matchedKeywords: string[] = [];
  let missingKeywords: string[] = [];

  const trimmedJobDescription = jobDescription.trim();
  if (trimmedJobDescription.length > 0) {
    const jobKeywords = Array.from(new Set(tokenize(trimmedJobDescription)));
    const cvTokens = new Set(tokenize(cvSearchableText(data)));

    matchedKeywords = jobKeywords.filter((word) => cvTokens.has(word));
    missingKeywords = jobKeywords.filter((word) => !cvTokens.has(word));
    keywordMatchScore =
      jobKeywords.length > 0 ? Math.round((matchedKeywords.length / jobKeywords.length) * 100) : 100;

    if (keywordMatchScore < 50) {
      issues.unshift({
        id: "keyword-match",
        message: "İş elanındakı açar sözlərin yarıdan azı CV-də görünür — bacarıq və təcrübə bölmələrini uyğunlaşdırın.",
      });
    }
  }

  const score =
    keywordMatchScore !== null
      ? Math.round(completenessScore * 0.6 + keywordMatchScore * 0.4)
      : completenessScore;

  return {
    score,
    completenessScore,
    keywordMatchScore,
    matchedKeywords: matchedKeywords.slice(0, 30),
    missingKeywords: missingKeywords.slice(0, 30),
    issues,
  };
}
