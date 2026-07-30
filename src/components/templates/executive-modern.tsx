import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { formatDateRange, Avatar } from "./shared";

export function ExecutiveModernTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white text-[11px] leading-relaxed text-neutral-800 shadow-sm ring-1 ring-black/5">
      <header className="flex items-center gap-5 bg-slate-950 px-10 py-8">
        <Avatar
          photoUrl={personalInfo.photoUrl}
          fullName={personalInfo.fullName}
          className="rounded-full bg-white/10 ring-1 ring-amber-500/50"
          textClassName="text-white"
        />
        <div>
          <h1 className="font-[family-name:var(--font-playfair-display)] text-3xl font-semibold text-white">
            {personalInfo.fullName}
          </h1>
          <p className="mt-1 text-[11px] font-medium tracking-[0.3em] text-amber-500 uppercase">
            {personalInfo.title}
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-neutral-200 px-10 py-3 text-[10px] text-neutral-500">
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

      <div className="flex-1 space-y-6 px-10 py-6">
        {summary && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-900 uppercase">
              Xülasə
            </h2>
            <p className="mt-2 text-neutral-600">{summary}</p>
          </section>
        )}

        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-900 uppercase">
            İş Təcrübəsi
          </h2>
          <div className="mt-3 space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 bg-amber-500" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold text-slate-900">
                      {exp.role} <span className="font-normal text-neutral-400">— {exp.company}</span>
                    </p>
                    <span className="text-[10px] text-amber-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.highlights && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-neutral-600">
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-900 uppercase">
            Təhsil
          </h2>
          <div className="mt-3 space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between">
                <p className="font-semibold text-slate-900">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ""}{" "}
                  <span className="font-normal text-neutral-400">— {edu.institution}</span>
                </p>
                <span className="text-[10px] whitespace-nowrap text-amber-600">
                  {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-900 uppercase">
              Bacarıqlar
            </h2>
            <p className="mt-3 text-neutral-600">{skills.map((s) => s.name).join(" · ")}</p>
          </section>

          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-900 uppercase">
                Dillər
              </h2>
              <p className="mt-3 text-neutral-600">
                {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
              </p>
            </section>
          )}
        </div>

        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-900 uppercase">
              Sertifikatlar
            </h2>
            <p className="mt-3 text-neutral-600">
              {certifications.map((c) => c.name).join(" · ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
