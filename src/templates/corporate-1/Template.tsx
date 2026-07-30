import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange, initialsOf } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full bg-white text-[11px] leading-snug text-neutral-800 shadow-sm ring-1 ring-black/5">
      <aside className="flex w-[34%] flex-col">
        <div className="relative flex flex-1 items-center justify-center bg-neutral-200">
          {personalInfo.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-neutral-400">
              {initialsOf(personalInfo.fullName)}
            </span>
          )}
        </div>
        <div className="space-y-4 bg-blue-700 p-5 text-blue-50">
          <TemplateSection title="Əlaqə" titleClassName="text-blue-100" divider={false}>
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5">
                <Phone className="size-3 shrink-0" /> {personalInfo.phone}
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 size-3 shrink-0" /> {personalInfo.location}
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="size-3 shrink-0" />{" "}
                <span className="break-all">{personalInfo.email}</span>
              </p>
              {personalInfo.website && (
                <p className="flex items-center gap-1.5">
                  <Globe className="size-3 shrink-0" /> {personalInfo.website}
                </p>
              )}
            </div>
          </TemplateSection>

          {languages && languages.length > 0 && (
            <TemplateSection title="Dillər" titleClassName="text-blue-100" divider={false}>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-blue-200">{lang.level}</span>
                  </div>
                ))}
              </div>
            </TemplateSection>
          )}
        </div>
      </aside>

      <main className="flex-1 p-7">
        <h1 className="text-3xl leading-[1.1] font-extrabold text-blue-700">
          {personalInfo.fullName}
        </h1>
        <p className="mt-2 text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
          {personalInfo.title}
        </p>
        <div className="mt-3 h-0.5 w-full bg-blue-700" />

        <div className="mt-5 grid grid-cols-2 gap-6">
          {summary && (
            <TemplateSection title="Profil" titleClassName="text-blue-700">
              <p className="text-neutral-600">{summary}</p>
            </TemplateSection>
          )}

          <TemplateSection title="Əsas Bacarıqlar" titleClassName="text-blue-700">
            <ul className="list-disc space-y-1 pl-4 text-neutral-600">
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </TemplateSection>
        </div>

        <div className="mt-5">
          <TemplateSection title="İş Tarixçəsi" titleClassName="text-blue-700">
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_2fr] gap-3">
                  <div>
                    <p className="font-bold text-neutral-900 uppercase">{exp.role}</p>
                    <p className="text-neutral-500 italic">{exp.company}</p>
                    <p className="text-[10px] text-neutral-400">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </p>
                  </div>
                  {exp.highlights && (
                    <ul className="list-disc space-y-1 pl-4 text-neutral-600">
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

        <div className="mt-5">
          <TemplateSection title="Təhsil Tarixçəsi" titleClassName="text-blue-700">
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[1fr_2fr] gap-3">
                  <div>
                    <p className="font-bold text-neutral-900 uppercase">{edu.degree}</p>
                    <p className="text-[10px] text-neutral-400">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </p>
                  </div>
                  <p className="text-neutral-600">
                    {edu.field ? `${edu.field} — ` : ""}
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </TemplateSection>
        </div>
      </main>
    </div>
  );
}
