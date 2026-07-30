import type { CVData } from "@/types/cv";
import { formatDateRange } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col gap-4 bg-white p-8 text-[11px] leading-normal text-black shadow-sm ring-1 ring-black/5">
      <header>
        <h1 className="text-lg font-bold">{personalInfo.fullName}</h1>
        <p>{personalInfo.title}</p>
        <p className="text-neutral-700">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
          {personalInfo.website ? ` | ${personalInfo.website}` : ""}
        </p>
      </header>

      {summary && (
        <section>
          <h2 className="border-b border-black font-bold uppercase">Xülasə</h2>
          <p className="mt-1">{summary}</p>
        </section>
      )}

      <section>
        <h2 className="border-b border-black font-bold uppercase">İş Təcrübəsi</h2>
        <div className="mt-1 space-y-2">
          {experience.map((exp) => (
            <div key={exp.id}>
              <p className="font-bold">
                {exp.role}, {exp.company} ({formatDateRange(exp.startDate, exp.endDate, exp.current)})
              </p>
              {exp.highlights && (
                <ul className="list-disc pl-5">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="border-b border-black font-bold uppercase">Təhsil</h2>
        <div className="mt-1 space-y-1">
          {education.map((edu) => (
            <p key={edu.id}>
              {edu.degree}
              {edu.field ? `, ${edu.field}` : ""} — {edu.institution} (
              {formatDateRange(edu.startDate, edu.endDate, edu.current)})
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="border-b border-black font-bold uppercase">Bacarıqlar</h2>
        <p className="mt-1">{skills.map((s) => s.name).join(", ")}</p>
      </section>

      {languages && languages.length > 0 && (
        <section>
          <h2 className="border-b border-black font-bold uppercase">Dillər</h2>
          <p className="mt-1">{languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="border-b border-black font-bold uppercase">Sertifikatlar</h2>
          <p className="mt-1">
            {certifications.map((c) => `${c.name}${c.issuer ? ` — ${c.issuer}` : ""}`).join(", ")}
          </p>
        </section>
      )}
    </div>
  );
}
