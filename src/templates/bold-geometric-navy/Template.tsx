import type { ReactNode } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { CVData } from "@/types/cv";
import { formatDateRange, Avatar } from "@/components/templates/shared";

function SectionBar({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-900 px-6 py-1.5 font-[family-name:var(--font-montserrat)] text-[11px] font-bold tracking-[0.15em] text-white uppercase">
      {children}
    </div>
  );
}

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white text-[11px] leading-snug text-neutral-800">
      <div className="grid grid-cols-[30%_1fr] items-center gap-4 p-5 pb-4">
        <div className="flex justify-center rounded-2xl bg-slate-900 p-3">
          <Avatar
            photoUrl={personalInfo.photoUrl}
            fullName={personalInfo.fullName}
            className="size-16 ring-2 ring-white"
          />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-montserrat)] text-2xl leading-tight font-extrabold text-pretty text-neutral-900 uppercase">
            {personalInfo.fullName}
          </h1>
          <p className="mt-0.5 font-medium text-neutral-500">{personalInfo.title}</p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[30%_1fr]">
        <aside className="space-y-5 bg-neutral-100 p-5">
          <section>
            <h3 className="mb-1.5 font-[family-name:var(--font-montserrat)] text-[11px] font-bold tracking-[0.1em] text-neutral-900 uppercase">
              Əlaqə
            </h3>
            <div className="space-y-1.5 break-words text-neutral-600">
              <p className="flex items-center gap-1.5">
                <Phone className="size-3 shrink-0 text-slate-700" /> {personalInfo.phone}
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="size-3 shrink-0 text-slate-700" />
                <span className="break-all">{personalInfo.email}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="size-3 shrink-0 text-slate-700" /> {personalInfo.location}
              </p>
            </div>
          </section>

          <section>
            <h3 className="mb-1.5 font-[family-name:var(--font-montserrat)] text-[11px] font-bold tracking-[0.1em] text-neutral-900 uppercase">
              Bacarıqlar
            </h3>
            <ul className="space-y-1 text-neutral-600">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-1.5">
                  <span className="size-1 shrink-0 rounded-full bg-slate-900" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="flex flex-col">
          {summary && (
            <>
              <SectionBar>Profil</SectionBar>
              <p className="p-5 pb-4 text-neutral-600">{summary}</p>
            </>
          )}

          <SectionBar>İş Təcrübəsi</SectionBar>
          <div className="space-y-3 p-5 pb-4">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="font-semibold text-neutral-900">{exp.role}</p>
                  <span className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-neutral-500">{exp.company}</p>
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

          <SectionBar>Təhsil</SectionBar>
          <div className="space-y-2.5 p-5 pb-4">
            {education.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="font-semibold text-neutral-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <span className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-neutral-500">{edu.institution}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
