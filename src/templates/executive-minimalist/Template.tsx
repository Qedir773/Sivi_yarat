import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white p-10 text-[11px] leading-relaxed text-neutral-700">
      <header className="mb-8 text-center">
        <h1 className="font-[family-name:var(--font-montserrat)] text-[26px] font-semibold tracking-wide text-pretty text-neutral-900">
          {personalInfo.fullName}
        </h1>
        <p className="mt-1.5 text-[13px] tracking-[0.08em] text-emerald-700 uppercase">
          {personalInfo.title}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-neutral-500">
          <span>{personalInfo.email}</span>
          <span className="text-neutral-300">·</span>
          <span>{personalInfo.phone}</span>
          <span className="text-neutral-300">·</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && (
            <>
              <span className="text-neutral-300">·</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[92%] flex-1 flex-col gap-7">
        {summary && (
          <TemplateSection
            title="Peşəkar Xülasə"
            titleClassName="text-emerald-700 font-[family-name:var(--font-montserrat)] tracking-[0.16em] border-emerald-700/30"
          >
            <p className="text-neutral-600">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection
          title="İş Təcrübəsi"
          titleClassName="text-emerald-700 font-[family-name:var(--font-montserrat)] tracking-[0.16em] border-emerald-700/30"
        >
          <div className="space-y-5">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="relative border-l border-neutral-200 pl-4 break-inside-avoid"
              >
                <span className="absolute top-1 -left-[3.5px] size-1.5 rounded-full bg-emerald-700" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold text-neutral-900">{exp.role}</p>
                  <span className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-500 italic">
                  {exp.company}
                  {exp.location ? ` — ${exp.location}` : ""}
                </p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-neutral-600">
                    {exp.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </TemplateSection>

        <TemplateSection
          title="Təhsil"
          titleClassName="text-emerald-700 font-[family-name:var(--font-montserrat)] tracking-[0.16em] border-emerald-700/30"
        >
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex flex-wrap items-baseline justify-between gap-x-3 break-inside-avoid"
              >
                <div>
                  <p className="font-semibold text-neutral-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <p className="text-neutral-500">{edu.institution}</p>
                </div>
                <span className="text-[10px] tabular-nums text-neutral-400">
                  {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                </span>
              </div>
            ))}
          </div>
        </TemplateSection>

        <div className="grid grid-cols-2 gap-8">
          <TemplateSection
            title="Bacarıqlar"
            titleClassName="text-emerald-700 font-[family-name:var(--font-montserrat)] tracking-[0.16em] border-emerald-700/30"
          >
            <p className="text-neutral-600">{skills.map((s) => s.name).join("  ·  ")}</p>
          </TemplateSection>

          {languages && languages.length > 0 && (
            <TemplateSection
              title="Dillər"
              titleClassName="text-emerald-700 font-[family-name:var(--font-montserrat)] tracking-[0.16em] border-emerald-700/30"
            >
              <p className="text-neutral-600">
                {languages.map((l) => `${l.name} (${l.level})`).join("  ·  ")}
              </p>
            </TemplateSection>
          )}
        </div>

        {certifications && certifications.length > 0 && (
          <TemplateSection
            title="Sertifikatlar"
            titleClassName="text-emerald-700 font-[family-name:var(--font-montserrat)] tracking-[0.16em] border-emerald-700/30"
          >
            <p className="text-neutral-600">
              {certifications.map((c) => c.name).join("  ·  ")}
            </p>
          </TemplateSection>
        )}
      </div>
    </div>
  );
}
