import {
  Mail,
  Phone,
  MapPin,
  Globe,
  UserCircle,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Languages as LanguagesIcon,
} from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange, Avatar } from "./shared";

export function ItTemplate({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, projects } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white text-[11px] leading-snug text-neutral-800">
      <header className="flex items-center justify-between bg-slate-900 p-6 text-slate-100">
        <div className="flex items-center gap-4">
          <Avatar
            photoUrl={personalInfo.photoUrl}
            fullName={personalInfo.fullName}
            className="rounded-lg bg-slate-800 text-cyan-400 ring-1 ring-slate-700"
          />
          <div>
            <h1 className="text-xl font-bold text-white">{personalInfo.fullName}</h1>
            <p className="text-cyan-400">{personalInfo.title}</p>
          </div>
        </div>
        <div className="space-y-1 text-right text-[10px] text-slate-300">
          <p className="inline-flex items-center gap-1">
            {personalInfo.email} <Mail className="size-3" />
          </p>
          <p className="inline-flex items-center gap-1">
            {personalInfo.phone} <Phone className="size-3" />
          </p>
          <p className="inline-flex items-center gap-1">
            {personalInfo.location} <MapPin className="size-3" />
          </p>
          {personalInfo.website && (
            <p className="inline-flex items-center gap-1">
              {personalInfo.website} <Globe className="size-3" />
            </p>
          )}
        </div>
      </header>

      <div className="flex-1 space-y-4 p-6">
        {summary && (
          <TemplateSection title="Profil" icon={UserCircle} titleClassName="text-slate-900">
            <p className="text-neutral-600">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection title="Texniki Bacarıqlar" icon={Code2} titleClassName="text-slate-900">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </TemplateSection>

        <TemplateSection title="İş Təcrübəsi" icon={Briefcase} titleClassName="text-slate-900">
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-neutral-900">
                    {exp.role} <span className="text-cyan-600">@ {exp.company}</span>
                  </p>
                  <span className="font-mono text-[10px] text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
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

        {projects && projects.length > 0 && (
          <TemplateSection title="Layihələr" icon={FolderGit2} titleClassName="text-slate-900">
            <div className="space-y-1">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="font-semibold text-neutral-900">
                    {proj.name}
                    {proj.url && <span className="ml-1 font-mono text-cyan-600">↗</span>}
                  </p>
                  {proj.description && <p className="text-neutral-600">{proj.description}</p>}
                </div>
              ))}
            </div>
          </TemplateSection>
        )}

        <div className="grid grid-cols-2 gap-6">
          <TemplateSection title="Təhsil" icon={GraduationCap} titleClassName="text-slate-900">
            <div className="space-y-1">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold text-neutral-900">{edu.degree}</p>
                  <p className="text-neutral-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </TemplateSection>
          {languages && languages.length > 0 && (
            <TemplateSection title="Dillər" icon={LanguagesIcon} titleClassName="text-slate-900">
              <p className="text-neutral-600">
                {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
              </p>
            </TemplateSection>
          )}
        </div>
      </div>
    </div>
  );
}
