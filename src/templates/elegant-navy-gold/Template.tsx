import { MapPin, Phone, Mail } from "lucide-react";
import type { CVData } from "@/types/cv";
import {
  TemplateSection,
  SkillBar,
  formatDateRange,
  Avatar,
  initialsOf,
} from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white text-[11px] leading-snug text-neutral-800">
      <header className="space-y-3 bg-slate-900 px-7 py-6 text-center text-slate-100">
        <div className="flex size-9 items-center justify-center rounded-full border border-amber-400/50 text-[11px] font-semibold tracking-widest text-amber-400">
          {initialsOf(personalInfo.fullName)}
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-playfair-display)] text-2xl font-semibold tracking-wide text-pretty text-white">
            {personalInfo.fullName}
          </h1>
          <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-amber-400 uppercase">
            {personalInfo.title}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-300">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3 shrink-0" /> {personalInfo.location}
          </span>
          <span className="text-slate-600">|</span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-3 shrink-0" /> {personalInfo.phone}
          </span>
          <span className="text-slate-600">|</span>
          <span className="inline-flex items-center gap-1">
            <Mail className="size-3 shrink-0" /> {personalInfo.email}
          </span>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[32%_1fr]">
        <aside className="space-y-5 bg-neutral-100 p-5">
          {personalInfo.photoUrl && (
            <div className="flex justify-center">
              <Avatar
                photoUrl={personalInfo.photoUrl}
                fullName={personalInfo.fullName}
                className="size-20 ring-4 ring-white"
              />
            </div>
          )}

          <TemplateSection
            title="Təhsil"
            titleClassName="text-slate-900 font-[family-name:var(--font-playfair-display)] normal-case tracking-normal text-[12px] border-amber-500/40"
          >
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <p className="font-semibold text-neutral-900">{edu.degree}</p>
                  <p className="text-neutral-600">{edu.institution}</p>
                  <p className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </p>
                </div>
              ))}
            </div>
          </TemplateSection>

          {languages && languages.length > 0 && (
            <TemplateSection
              title="Dillər"
              titleClassName="text-slate-900 font-[family-name:var(--font-playfair-display)] normal-case tracking-normal text-[12px] border-amber-500/40"
            >
              <div className="space-y-1.5">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between">
                    <span className="text-neutral-700">{lang.name}</span>
                    <span className="text-[10px] text-amber-700">{lang.level}</span>
                  </div>
                ))}
              </div>
            </TemplateSection>
          )}
        </aside>

        <main className="space-y-5 p-6">
          {summary && <p className="text-neutral-600">{summary}</p>}

          <TemplateSection
            title="İş Təcrübəsi"
            titleClassName="text-slate-900 font-[family-name:var(--font-playfair-display)] normal-case tracking-normal text-[13px] border-amber-500/40"
          >
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <p className="font-semibold text-neutral-900">{exp.role}</p>
                    <span className="text-[10px] tabular-nums text-neutral-400">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-amber-700 italic">{exp.company}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
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

          <TemplateSection
            title="Bacarıqlar"
            titleClassName="text-slate-900 font-[family-name:var(--font-playfair-display)] normal-case tracking-normal text-[13px] border-amber-500/40"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-neutral-700">{skill.name}</p>
                  <SkillBar level={skill.level} className="text-amber-600" />
                </div>
              ))}
            </div>
          </TemplateSection>
        </main>
      </div>
    </div>
  );
}
