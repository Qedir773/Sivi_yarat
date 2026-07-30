import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, SkillBar, formatDateRange, Avatar } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full bg-white text-[11px] leading-snug text-neutral-800">
      <aside className="flex w-[36%] shrink-0 flex-col gap-5 bg-violet-700 p-6 text-violet-100">
        <div className="flex flex-col items-center text-center">
          <Avatar
            photoUrl={personalInfo.photoUrl}
            fullName={personalInfo.fullName}
            className="size-20 ring-4 ring-violet-400/40"
          />
          <p className="mt-3 font-[family-name:var(--font-poppins)] text-lg leading-tight font-semibold text-pretty text-white">
            {personalInfo.fullName}
          </p>
          <p className="mt-0.5 text-violet-200">{personalInfo.title}</p>
        </div>

        {summary && (
          <TemplateSection title="Haqqımda" titleClassName="text-violet-200" divider={false}>
            <p className="text-violet-100">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection title="Əlaqə" titleClassName="text-violet-200" divider={false}>
          <div className="space-y-1.5 break-words">
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

        <TemplateSection title="Bacarıqlar" titleClassName="text-violet-200" divider={false}>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id}>
                <p className="text-violet-100">{skill.name}</p>
                <SkillBar level={skill.level} className="text-white" />
              </div>
            ))}
          </div>
        </TemplateSection>

        {languages && languages.length > 0 && (
          <TemplateSection title="Dil Bilgisi" titleClassName="text-violet-200" divider={false}>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] text-violet-50"
                >
                  {lang.name} · {lang.level}
                </span>
              ))}
            </div>
          </TemplateSection>
        )}
      </aside>

      <main className="flex-1 space-y-5 p-6">
        <TemplateSection
          title="Təhsil"
          titleClassName="text-violet-800 font-[family-name:var(--font-poppins)]"
        >
          <div className="space-y-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="relative border-l-2 border-violet-100 pl-4 break-inside-avoid"
              >
                <span className="absolute top-1 -left-[5px] size-2 rounded-full bg-violet-600 ring-2 ring-white" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="font-semibold text-neutral-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <span className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-neutral-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </TemplateSection>

        <TemplateSection
          title="İş Təcrübəsi"
          titleClassName="text-violet-800 font-[family-name:var(--font-poppins)]"
        >
          <div className="space-y-3">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="relative border-l-2 border-violet-100 pl-4 break-inside-avoid"
              >
                <span className="absolute top-1 -left-[5px] size-2 rounded-full bg-violet-600 ring-2 ring-white" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="font-semibold text-neutral-900">{exp.role}</p>
                  <span className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-violet-700">{exp.company}</p>
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

        {certifications && certifications.length > 0 && (
          <TemplateSection
            title="Kurslar"
            titleClassName="text-violet-800 font-[family-name:var(--font-poppins)]"
          >
            <div className="space-y-1 text-neutral-600">
              {certifications.map((cert) => (
                <p key={cert.id}>
                  {cert.name}
                  {cert.date ? ` — ${cert.date}` : ""}
                </p>
              ))}
            </div>
          </TemplateSection>
        )}
      </main>
    </div>
  );
}
