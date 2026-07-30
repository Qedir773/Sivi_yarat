import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, SkillDots, formatDateRange } from "./shared";

export function ModernTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full bg-white text-[11px] leading-snug text-neutral-800">
      <aside className="flex w-[36%] flex-col gap-5 bg-blue-600 p-6 text-blue-50">
        <div className="flex size-16 items-center justify-center rounded-full bg-white/15 text-xl font-bold text-white">
          {personalInfo.fullName
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">{personalInfo.fullName}</h1>
          <p className="text-blue-100">{personalInfo.title}</p>
        </div>

        <TemplateSection title="Əlaqə" titleClassName="text-blue-100">
          <div className="space-y-1.5 text-blue-50">
            <p className="flex items-center gap-1.5">
              <Mail className="size-3 shrink-0" /> <span className="break-all">{personalInfo.email}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="size-3 shrink-0" /> {personalInfo.phone}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="size-3 shrink-0" /> {personalInfo.location}
            </p>
            {personalInfo.website && (
              <p className="flex items-center gap-1.5">
                <Globe className="size-3 shrink-0" /> {personalInfo.website}
              </p>
            )}
          </div>
        </TemplateSection>

        <TemplateSection title="Bacarıqlar" titleClassName="text-blue-100">
          <div className="space-y-1.5">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-blue-50">{skill.name}</span>
                <SkillDots level={skill.level} className="text-white" />
              </div>
            ))}
          </div>
        </TemplateSection>

        {languages && languages.length > 0 && (
          <TemplateSection title="Dillər" titleClassName="text-blue-100">
            <div className="space-y-1 text-blue-50">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-blue-200">{lang.level}</span>
                </div>
              ))}
            </div>
          </TemplateSection>
        )}
      </aside>

      <main className="flex-1 space-y-5 p-6">
        {summary && (
          <TemplateSection title="Xülasə" titleClassName="text-blue-600">
            <p className="text-neutral-600">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection title="İş Təcrübəsi" titleClassName="text-blue-600">
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-100 pl-3">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-neutral-900">{exp.role}</p>
                  <span className="text-[10px] text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-blue-600">{exp.company}</p>
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

        <TemplateSection title="Təhsil" titleClassName="text-blue-600">
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-blue-100 pl-3">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-neutral-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <span className="text-[10px] text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-neutral-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </TemplateSection>
      </main>
    </div>
  );
}
