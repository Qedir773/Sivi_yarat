import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, SkillBar, formatDateRange } from "./shared";

export function ProfessionalTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white p-8 text-[11px] leading-snug text-neutral-800">
      <header className="border-b-2 border-neutral-800 pb-4 text-center">
        <h1 className="text-2xl font-bold tracking-wide text-neutral-900 uppercase">
          {personalInfo.fullName}
        </h1>
        <p className="mt-1 text-sm font-medium text-neutral-600">{personalInfo.title}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <Mail className="size-3" /> {personalInfo.email}
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-3" /> {personalInfo.phone}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" /> {personalInfo.location}
          </span>
          {personalInfo.website && (
            <span className="inline-flex items-center gap-1">
              <Globe className="size-3" /> {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      <div className="mt-5 grid flex-1 grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          {summary && (
            <TemplateSection title="Xülasə" titleClassName="text-neutral-900">
              <p className="text-neutral-600">{summary}</p>
            </TemplateSection>
          )}

          <TemplateSection title="İş Təcrübəsi" titleClassName="text-neutral-900">
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold text-neutral-900">{exp.role}</p>
                    <span className="text-[10px] text-neutral-500">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-neutral-600 italic">{exp.company}</p>
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

          <TemplateSection title="Təhsil" titleClassName="text-neutral-900">
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
        </div>

        <div className="space-y-5">
          <TemplateSection title="Bacarıqlar" titleClassName="text-neutral-900">
            <div className="space-y-1.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-neutral-700">{skill.name}</p>
                  <SkillBar level={skill.level} className="text-neutral-800" />
                </div>
              ))}
            </div>
          </TemplateSection>

          {languages && languages.length > 0 && (
            <TemplateSection title="Dillər" titleClassName="text-neutral-900">
              <div className="space-y-1 text-neutral-600">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-neutral-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </TemplateSection>
          )}

          {certifications && certifications.length > 0 && (
            <TemplateSection title="Sertifikatlar" titleClassName="text-neutral-900">
              <div className="space-y-1 text-neutral-600">
                {certifications.map((cert) => (
                  <p key={cert.id}>{cert.name}</p>
                ))}
              </div>
            </TemplateSection>
          )}
        </div>
      </div>
    </div>
  );
}
