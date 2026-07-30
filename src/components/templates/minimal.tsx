import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange } from "./shared";

export function MinimalTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col gap-6 bg-white p-9 text-[11px] leading-relaxed font-light text-neutral-700">
      <header>
        <h1 className="text-xl font-normal tracking-wide text-neutral-900">
          {personalInfo.fullName}
        </h1>
        <p className="mt-0.5 text-neutral-500">{personalInfo.title}</p>
        <div className="mt-3 flex flex-wrap gap-x-3 text-[10px] text-neutral-400">
          <span>{personalInfo.email}</span>
          <span>·</span>
          <span>{personalInfo.phone}</span>
          <span>·</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && (
            <>
              <span>·</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </header>

      {summary && <p className="text-neutral-500">{summary}</p>}

      <TemplateSection title="İş Təcrübəsi" titleClassName="font-normal text-neutral-400" divider={false}>
        <div className="space-y-3">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex items-baseline justify-between">
                <p className="text-neutral-900">
                  {exp.role} <span className="text-neutral-400">— {exp.company}</span>
                </p>
                <span className="text-[10px] text-neutral-400">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
              </div>
              {exp.highlights && (
                <ul className="mt-1 space-y-0.5 text-neutral-500">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </TemplateSection>

      <TemplateSection title="Təhsil" titleClassName="font-normal text-neutral-400" divider={false}>
        <div className="space-y-1.5">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-baseline justify-between">
              <p className="text-neutral-900">
                {edu.degree}
                {edu.field ? `, ${edu.field}` : ""}{" "}
                <span className="text-neutral-400">— {edu.institution}</span>
              </p>
              <span className="text-[10px] whitespace-nowrap text-neutral-400">
                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
              </span>
            </div>
          ))}
        </div>
      </TemplateSection>

      <div className="grid grid-cols-2 gap-6">
        <TemplateSection title="Bacarıqlar" titleClassName="font-normal text-neutral-400" divider={false}>
          <p className="text-neutral-500">{skills.map((s) => s.name).join(" · ")}</p>
        </TemplateSection>

        {languages && languages.length > 0 && (
          <TemplateSection title="Dillər" titleClassName="font-normal text-neutral-400" divider={false}>
            <p className="text-neutral-500">
              {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </TemplateSection>
        )}
      </div>
    </div>
  );
}
