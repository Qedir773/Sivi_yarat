import {
  Mail,
  Phone,
  MapPin,
  Link2,
  Terminal,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Languages as LanguagesIcon,
  ExternalLink,
} from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, formatDateRange, Avatar } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages, projects } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full flex-col bg-white font-[family-name:var(--font-inter)] text-[11px] leading-snug text-neutral-800">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-6 text-slate-100">
        <div className="flex items-center gap-4">
          <Avatar
            photoUrl={personalInfo.photoUrl}
            fullName={personalInfo.fullName}
            className="rounded-lg bg-slate-800 text-emerald-400 ring-1 ring-slate-700"
          />
          <div>
            <h1 className="flex items-center gap-1.5 text-lg font-semibold text-pretty text-white">
              <Terminal className="size-4 shrink-0 text-emerald-400" />
              {personalInfo.fullName}
            </h1>
            <p className="mt-0.5 text-emerald-400">{personalInfo.title}</p>
          </div>
        </div>
        <div className="space-y-1 text-right text-[10px] text-slate-300">
          <p className="inline-flex items-center gap-1.5">
            <Mail className="size-3 shrink-0" /> {personalInfo.email}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Phone className="size-3 shrink-0" /> {personalInfo.phone}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="size-3 shrink-0" /> {personalInfo.location}
          </p>
          {personalInfo.website && (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 font-[family-name:var(--font-fira-code)] text-emerald-300">
              <Link2 className="size-3 shrink-0" />
              {personalInfo.website}
            </p>
          )}
        </div>
      </header>

      <div className="flex-1 space-y-4 p-6">
        {summary && (
          <TemplateSection
            title="Profil"
            titleClassName="text-slate-900 font-[family-name:var(--font-fira-code)]"
          >
            <p className="text-neutral-600">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection
          title="Texniki Bacarıqlar"
          titleClassName="text-slate-900 font-[family-name:var(--font-fira-code)]"
        >
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-emerald-600/30 bg-emerald-50 px-2.5 py-1 font-[family-name:var(--font-fira-code)] text-[10px] text-emerald-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </TemplateSection>

        <TemplateSection
          title="İş Təcrübəsi"
          icon={Briefcase}
          titleClassName="text-slate-900 font-[family-name:var(--font-fira-code)]"
          iconClassName="bg-slate-900 text-emerald-400"
        >
          <div className="space-y-3">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="relative border-l-2 border-slate-200 pl-3 break-inside-avoid"
              >
                <span className="absolute top-1 -left-[5px] size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="font-semibold text-neutral-900">
                    {exp.role} <span className="text-emerald-700">@ {exp.company}</span>
                  </p>
                  <span className="font-[family-name:var(--font-fira-code)] text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
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

        {projects && projects.length > 0 && (
          <TemplateSection
            title="Layihələr"
            icon={FolderGit2}
            titleClassName="text-slate-900 font-[family-name:var(--font-fira-code)]"
            iconClassName="bg-slate-900 text-emerald-400"
          >
            <div className="grid grid-cols-2 gap-2">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="break-inside-avoid rounded-lg border border-neutral-200 p-2.5"
                >
                  <p className="flex items-center gap-1 font-semibold text-neutral-900">
                    {proj.name}
                    {proj.url && (
                      <ExternalLink className="size-3 shrink-0 text-emerald-600" />
                    )}
                  </p>
                  {proj.description && (
                    <p className="mt-0.5 text-neutral-600">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </TemplateSection>
        )}

        <div className="grid grid-cols-2 gap-6">
          <TemplateSection
            title="Təhsil"
            icon={GraduationCap}
            titleClassName="text-slate-900 font-[family-name:var(--font-fira-code)]"
            iconClassName="bg-slate-900 text-emerald-400"
          >
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <p className="font-semibold text-neutral-900">{edu.degree}</p>
                  <p className="text-neutral-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </TemplateSection>
          {languages && languages.length > 0 && (
            <TemplateSection
              title="Dillər"
              icon={LanguagesIcon}
              titleClassName="text-slate-900 font-[family-name:var(--font-fira-code)]"
              iconClassName="bg-slate-900 text-emerald-400"
            >
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
