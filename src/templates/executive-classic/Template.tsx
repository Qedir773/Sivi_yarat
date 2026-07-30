import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { CVData } from "@/types/cv";
import { formatDateRange, Avatar } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white p-10 text-[11px] leading-relaxed text-neutral-800 shadow-sm ring-1 ring-black/5">
      <header className="flex flex-col items-center text-center">
        {personalInfo.photoUrl && (
          <Avatar
            photoUrl={personalInfo.photoUrl}
            fullName={personalInfo.fullName}
            className="mb-4 size-20 ring-2 ring-amber-600/60 ring-offset-2"
          />
        )}
        <h1 className="font-[family-name:var(--font-playfair-display)] text-3xl font-semibold tracking-wide text-slate-900">
          {personalInfo.fullName}
        </h1>
        <p className="mt-1.5 text-[11px] font-medium tracking-[0.3em] text-amber-700 uppercase">
          {personalInfo.title}
        </p>
        <div className="mt-3 h-px w-16 bg-amber-600/60" />
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

      <div className="mt-8 space-y-6">
        {summary && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair-display)] text-sm font-semibold text-slate-900">
              Xülasə
            </h2>
            <div className="mt-1 h-px w-8 bg-amber-600/60" />
            <p className="mt-2 text-neutral-600 italic">{summary}</p>
          </section>
        )}

        <section>
          <h2 className="font-[family-name:var(--font-playfair-display)] text-sm font-semibold text-slate-900">
            İş Təcrübəsi
          </h2>
          <div className="mt-1 h-px w-8 bg-amber-600/60" />
          <div className="mt-3 space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-slate-900">{exp.role}</p>
                  <span className="text-[10px] tracking-wide text-amber-700">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-neutral-500 italic">{exp.company}</p>
                {exp.highlights && (
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-neutral-600">
                    {exp.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="font-[family-name:var(--font-playfair-display)] text-sm font-semibold text-slate-900">
              Təhsil
            </h2>
            <div className="mt-1 h-px w-8 bg-amber-600/60" />
            <div className="mt-3 space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold text-slate-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <p className="text-neutral-500">{edu.institution}</p>
                  <p className="text-[10px] text-amber-700">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-playfair-display)] text-sm font-semibold text-slate-900">
              Bacarıqlar
            </h2>
            <div className="mt-1 h-px w-8 bg-amber-600/60" />
            <p className="mt-3 text-neutral-600">{skills.map((s) => s.name).join(" · ")}</p>
          </section>
        </div>

        {(languages?.length || certifications?.length) ? (
          <div className="grid grid-cols-2 gap-8">
            {languages && languages.length > 0 && (
              <section>
                <h2 className="font-[family-name:var(--font-playfair-display)] text-sm font-semibold text-slate-900">
                  Dillər
                </h2>
                <div className="mt-1 h-px w-8 bg-amber-600/60" />
                <p className="mt-3 text-neutral-600">
                  {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
                </p>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section>
                <h2 className="font-[family-name:var(--font-playfair-display)] text-sm font-semibold text-slate-900">
                  Sertifikatlar
                </h2>
                <div className="mt-1 h-px w-8 bg-amber-600/60" />
                <p className="mt-3 text-neutral-600">
                  {certifications.map((c) => c.name).join(" · ")}
                </p>
              </section>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
