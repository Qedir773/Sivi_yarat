import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import type { CVData } from "@/types/cv";

const HEADING_COLOR = "1D4ED8";

function sectionHeading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: HEADING_COLOR })],
  });
}

function bulletParagraph(text: string) {
  return new Paragraph({ text, bullet: { level: 0 } });
}

function dateRange(startDate: string, endDate?: string, current?: boolean) {
  return `${startDate} — ${current ? "hazırda" : endDate || ""}`.trim();
}

/** Maps CVData to a plain, ATS-friendly structured Word document (no visual template styling). */
export async function generateCvDocx(data: CVData): Promise<Blob> {
  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: data.personalInfo.fullName, bold: true, size: 48 })],
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({ text: data.personalInfo.title, size: 28, color: HEADING_COLOR }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location,
            data.personalInfo.website,
          ]
            .filter(Boolean)
            .join("  |  "),
          size: 20,
        }),
      ],
    }),
  ];

  if (data.summary) {
    children.push(sectionHeading("Xülasə"));
    children.push(new Paragraph({ text: data.summary }));
  }

  if (data.experience.length > 0) {
    children.push(sectionHeading("İş təcrübəsi"));
    for (const exp of data.experience) {
      children.push(
        new Paragraph({
          spacing: { before: 120 },
          children: [
            new TextRun({ text: `${exp.role} — ${exp.company}`, bold: true }),
            new TextRun({ text: `   ${dateRange(exp.startDate, exp.endDate, exp.current)}`, italics: true }),
          ],
        }),
      );
      if (exp.description) children.push(new Paragraph({ text: exp.description }));
      for (const highlight of exp.highlights ?? []) {
        children.push(bulletParagraph(highlight));
      }
    }
  }

  if (data.education.length > 0) {
    children.push(sectionHeading("Təhsil"));
    for (const edu of data.education) {
      children.push(
        new Paragraph({
          spacing: { before: 120 },
          children: [
            new TextRun({ text: `${edu.degree}${edu.field ? `, ${edu.field}` : ""} — ${edu.institution}`, bold: true }),
            new TextRun({ text: `   ${dateRange(edu.startDate, edu.endDate, edu.current)}`, italics: true }),
          ],
        }),
      );
      if (edu.description) children.push(new Paragraph({ text: edu.description }));
    }
  }

  if (data.skills.length > 0) {
    children.push(sectionHeading("Bacarıqlar"));
    children.push(new Paragraph({ text: data.skills.map((skill) => skill.name).join(", ") }));
  }

  if (data.languages && data.languages.length > 0) {
    children.push(sectionHeading("Dillər"));
    children.push(
      new Paragraph({
        text: data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", "),
      }),
    );
  }

  if (data.projects && data.projects.length > 0) {
    children.push(sectionHeading("Layihələr"));
    for (const project of data.projects) {
      children.push(
        new Paragraph({
          spacing: { before: 80 },
          children: [
            new TextRun({ text: project.name, bold: true }),
            ...(project.url ? [new TextRun({ text: `   ${project.url}`, italics: true })] : []),
          ],
        }),
      );
      if (project.description) children.push(new Paragraph({ text: project.description }));
    }
  }

  if (data.certifications && data.certifications.length > 0) {
    children.push(sectionHeading("Sertifikatlar"));
    for (const cert of data.certifications) {
      children.push(
        new Paragraph({
          text: [cert.name, cert.issuer, cert.date].filter(Boolean).join(" — "),
        }),
      );
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
