import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange } from "./shared";

export function AcademicTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col gap-4 bg-white p-8 text-[11px] leading-snug text-neutral-800">
      <header className="text-center">
        <h1 className="text-xl font-semibold tracking-wide text-neutral-900">
          {personalInfo.fullName}
        </h1>
        <p className="text-neutral-600">{personalInfo.title}</p>
        <p className="mt-1 text-[10px] text-neutral-500">
          {personalInfo.email} · {personalInfo.phone} · {personalInfo.location}
        </p>
        <div className="mx-auto mt-3 h-px w-24 bg-neutral-300" />
      </header>

      {summary && <p className="text-center text-neutral-600 italic">{summary}</p>}

      <TemplateSection title="Təhsil" titleClassName="text-neutral-900 border-b border-neutral-300 pb-1">
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-baseline justify-between">
              <div>
                <p className="font-semibold text-neutral-900">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ""}
                </p>
                <p className="text-neutral-600">{edu.institution}</p>
              </div>
              <span className="text-[10px] whitespace-nowrap text-neutral-500">
                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
              </span>
            </div>
          ))}
        </div>
      </TemplateSection>

      <TemplateSection title="Akademik / İş Təcrübəsi" titleClassName="text-neutral-900 border-b border-neutral-300 pb-1">
        <div className="space-y-2">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-neutral-900">
                  {exp.role}, {exp.company}
                </p>
                <span className="text-[10px] text-neutral-500">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
              </div>
              {exp.highlights && (
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-neutral-600">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </TemplateSection>

      {certifications && certifications.length > 0 && (
        <TemplateSection title="Nailiyyətlər / Sertifikatlar" titleClassName="text-neutral-900 border-b border-neutral-300 pb-1">
          <ul className="list-disc space-y-0.5 pl-4 text-neutral-600">
            {certifications.map((c) => (
              <li key={c.id}>
                {c.name}
                {c.issuer ? `, ${c.issuer}` : ""} {c.date ? `(${c.date})` : ""}
              </li>
            ))}
          </ul>
        </TemplateSection>
      )}

      <div className="grid grid-cols-2 gap-6">
        <TemplateSection title="Bacarıqlar" titleClassName="text-neutral-900 border-b border-neutral-300 pb-1">
          <p className="text-neutral-600">{skills.map((s) => s.name).join(", ")}</p>
        </TemplateSection>
        {languages && languages.length > 0 && (
          <TemplateSection title="Dillər" titleClassName="text-neutral-900 border-b border-neutral-300 pb-1">
            <p className="text-neutral-600">
              {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
            </p>
          </TemplateSection>
        )}
      </div>
    </div>
  );
}
