import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, SkillDots, formatDateRange } from "./shared";

export function CreativeTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white text-[11px] leading-snug text-neutral-800">
      <header className="relative overflow-hidden bg-gradient-to-r from-fuchsia-600 to-violet-600 p-6 text-white">
        <div className="absolute -top-8 -right-8 size-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 right-16 size-20 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold">
            {personalInfo.fullName
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <h1 className="text-xl font-bold">{personalInfo.fullName}</h1>
            <p className="text-fuchsia-100">{personalInfo.title}</p>
          </div>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-fuchsia-50">
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

      <div className="grid flex-1 grid-cols-3 gap-6 p-6">
        <div className="col-span-2 space-y-4">
          {summary && (
            <TemplateSection title="Haqqımda" titleClassName="text-fuchsia-600">
              <p className="text-neutral-600">{summary}</p>
            </TemplateSection>
          )}

          <TemplateSection title="Təcrübə" titleClassName="text-fuchsia-600">
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3">
                  <span className="absolute top-1 left-0 size-1.5 rounded-full bg-fuchsia-500" />
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold text-neutral-900">{exp.role}</p>
                    <span className="text-[10px] text-neutral-400">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-fuchsia-600">{exp.company}</p>
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
        </div>

        <div className="space-y-4">
          <TemplateSection title="Bacarıqlar" titleClassName="text-fuchsia-600">
            <div className="space-y-1.5">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="text-neutral-700">{skill.name}</span>
                  <SkillDots level={skill.level} className="text-fuchsia-500" />
                </div>
              ))}
            </div>
          </TemplateSection>

          <TemplateSection title="Təhsil" titleClassName="text-fuchsia-600">
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold text-neutral-900">{edu.degree}</p>
                  <p className="text-neutral-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </TemplateSection>

          {languages && languages.length > 0 && (
            <TemplateSection title="Dillər" titleClassName="text-fuchsia-600">
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
        </div>
      </div>
    </div>
  );
}
