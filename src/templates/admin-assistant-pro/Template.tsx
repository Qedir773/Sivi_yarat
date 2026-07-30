import type { ReactNode } from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { formatDateRange, Avatar } from "@/components/templates/shared";

function PillHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold tracking-[0.1em] text-sky-800 uppercase">
      {children}
    </div>
  );
}

function SidebarHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-1.5 text-[11px] font-bold tracking-[0.1em] text-sky-800 uppercase">
      {children}
    </h3>
  );
}

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white text-[11px] leading-snug text-neutral-800">
      <header className="relative overflow-hidden bg-white px-6 pt-6 pb-8">
        <div
          className="absolute inset-x-0 top-0 h-28 bg-sky-100/70"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 100%)" }}
        />
        <div className="relative flex items-center gap-4">
          <Avatar
            photoUrl={personalInfo.photoUrl}
            fullName={personalInfo.fullName}
            className="size-20 shrink-0 ring-4 ring-white"
          />
          <div>
            <p className="text-2xl leading-tight font-bold text-pretty text-neutral-900">
              {personalInfo.fullName}
            </p>
            <p className="mt-0.5 font-medium text-sky-700">{personalInfo.title}</p>
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[34%_1fr]">
        <aside className="space-y-5 bg-sky-50/60 p-5">
          {summary && (
            <section>
              <SidebarHeading>Haqqımda</SidebarHeading>
              <p className="text-neutral-600">{summary}</p>
            </section>
          )}

          <section>
            <SidebarHeading>Əlaqə</SidebarHeading>
            <div className="space-y-1.5 break-words text-neutral-600">
              <p className="flex items-center gap-1.5">
                <Mail className="size-3 shrink-0 text-sky-700" />
                <span className="break-all">{personalInfo.email}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="size-3 shrink-0 text-sky-700" /> {personalInfo.phone}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="size-3 shrink-0 text-sky-700" /> {personalInfo.location}
              </p>
              {personalInfo.website && (
                <p className="flex items-center gap-1.5">
                  <Globe className="size-3 shrink-0 text-sky-700" /> {personalInfo.website}
                </p>
              )}
            </div>
          </section>

          <section>
            <SidebarHeading>Təhsil</SidebarHeading>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <p className="font-semibold text-neutral-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <p className="text-neutral-600">{edu.institution}</p>
                  <p className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SidebarHeading>Bacarıqlar</SidebarHeading>
            <ul className="space-y-1 text-neutral-600">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-1.5">
                  <span className="size-1 shrink-0 rounded-full bg-sky-600" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="space-y-5 p-5">
          {certifications && certifications.length > 0 && (
            <section>
              <PillHeading>Sertifikatlar</PillHeading>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="break-inside-avoid">
                    <p className="font-semibold text-neutral-900">{cert.name}</p>
                    <p className="text-[10px] text-neutral-500">
                      {[cert.issuer, cert.date].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <PillHeading>Peşə Təcrübəsi</PillHeading>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <p className="font-semibold text-neutral-900">{exp.role}</p>
                    <span className="text-[10px] tabular-nums text-neutral-400">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-sky-700">
                    {exp.company}
                    {exp.location ? ` — ${exp.location}` : ""}
                  </p>
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
          </section>
        </main>
      </div>
    </div>
  );
}
