import { Mail, Phone, MapPin } from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange, Avatar } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, education, experience, skills, languages, projects } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col gap-4 bg-white p-8 text-[11px] leading-snug text-neutral-800">
      <header className="flex items-center gap-4 rounded-2xl bg-emerald-50 p-4">
        <Avatar
          photoUrl={personalInfo.photoUrl}
          fullName={personalInfo.fullName}
          className="size-14 bg-emerald-100 text-emerald-900"
        />
        <div>
          <h1 className="text-lg font-bold text-emerald-900">{personalInfo.fullName}</h1>
          <p className="text-emerald-700">{personalInfo.title}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-emerald-800">
            <span className="inline-flex items-center gap-1">
              <Mail className="size-3" /> {personalInfo.email}
            </span>
            <span className="inline-flex items-center gap-1">
              <Phone className="size-3" /> {personalInfo.phone}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" /> {personalInfo.location}
            </span>
          </div>
        </div>
      </header>

      {summary && <p className="text-neutral-600">{summary}</p>}

      <TemplateSection title="Təhsil" titleClassName="text-emerald-700">
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-baseline justify-between rounded-lg bg-neutral-50 p-2">
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

      {projects && projects.length > 0 && (
        <TemplateSection title="Layihələr" titleClassName="text-emerald-700">
          <div className="space-y-1.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <p className="font-semibold text-neutral-900">{proj.name}</p>
                {proj.description && <p className="text-neutral-600">{proj.description}</p>}
              </div>
            ))}
          </div>
        </TemplateSection>
      )}

      {experience.length > 0 && (
        <TemplateSection title="Təcrübə / Təcrübəçilik" titleClassName="text-emerald-700">
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-neutral-900">
                    {exp.role} <span className="text-neutral-400">— {exp.company}</span>
                  </p>
                  <span className="text-[10px] text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TemplateSection>
      )}

      <div className="grid grid-cols-2 gap-6">
        <TemplateSection title="Bacarıqlar" titleClassName="text-emerald-700">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </TemplateSection>
        {languages && languages.length > 0 && (
          <TemplateSection title="Dillər" titleClassName="text-emerald-700">
            <p className="text-neutral-600">
              {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
            </p>
          </TemplateSection>
        )}
      </div>
    </div>
  );
}
