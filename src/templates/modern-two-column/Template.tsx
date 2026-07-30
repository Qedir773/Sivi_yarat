import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  Languages as LanguagesIcon,
  FileText,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import type { CVData } from "@/types/cv";
import {
  TemplateSection,
  formatDateRange,
  Avatar,
  WebsiteQrCode,
} from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full bg-white text-[11px] leading-snug text-neutral-800">
      <aside className="flex w-[36%] shrink-0 flex-col gap-5 bg-slate-900 p-6 text-slate-200">
        <Avatar
          photoUrl={personalInfo.photoUrl}
          fullName={personalInfo.fullName}
          className="size-20 ring-2 ring-cyan-400/40"
        />
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-lg leading-tight font-semibold text-pretty text-white">
            {personalInfo.fullName}
          </h1>
          <p className="mt-0.5 text-cyan-400">{personalInfo.title}</p>
        </div>

        <TemplateSection title="Əlaqə" titleClassName="text-slate-400" divider={false}>
          <div className="space-y-1.5 break-words">
            <p className="flex items-center gap-1.5">
              <Mail className="size-3 shrink-0 text-cyan-400" />
              <span className="break-all">{personalInfo.email}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="size-3 shrink-0 text-cyan-400" /> {personalInfo.phone}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="size-3 shrink-0 text-cyan-400" /> {personalInfo.location}
            </p>
            {personalInfo.website && (
              <p className="flex items-center gap-1.5">
                <Globe className="size-3 shrink-0 text-cyan-400" /> {personalInfo.website}
              </p>
            )}
          </div>
        </TemplateSection>

        <TemplateSection
          title="Bacarıqlar"
          icon={Sparkles}
          titleClassName="text-slate-400"
          iconClassName="bg-white/10 text-cyan-400"
          divider={false}
        >
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-slate-100 ring-1 ring-white/10"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </TemplateSection>

        {languages && languages.length > 0 && (
          <TemplateSection title="Dillər" titleClassName="text-slate-400" divider={false}>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5">
                    <LanguagesIcon className="size-3 shrink-0 text-cyan-400" /> {lang.name}
                  </span>
                  <span className="text-slate-400">{lang.level}</span>
                </div>
              ))}
            </div>
          </TemplateSection>
        )}

        {personalInfo.website && (
          <div className="mt-auto flex justify-center">
            <WebsiteQrCode website={personalInfo.website} size={56} className="ring-2 ring-white/10" />
          </div>
        )}
      </aside>

      <main className="flex-1 space-y-5 p-6">
        {summary && (
          <TemplateSection
            title="Haqqında"
            icon={FileText}
            titleClassName="text-slate-900 font-[family-name:var(--font-poppins)]"
            iconClassName="bg-cyan-100 text-cyan-700"
          >
            <p className="text-neutral-600">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection
          title="İş Təcrübəsi"
          icon={Briefcase}
          titleClassName="text-slate-900 font-[family-name:var(--font-poppins)]"
          iconClassName="bg-cyan-100 text-cyan-700"
        >
          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="relative border-l-2 border-slate-200 pl-4 break-inside-avoid"
              >
                <span className="absolute top-1 -left-[5px] size-2 rounded-full bg-cyan-500 ring-2 ring-white" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="font-semibold text-neutral-900">{exp.role}</p>
                  <span className="text-[10px] tabular-nums text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-cyan-700">{exp.company}</p>
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

        <TemplateSection
          title="Təhsil"
          icon={GraduationCap}
          titleClassName="text-slate-900 font-[family-name:var(--font-poppins)]"
          iconClassName="bg-cyan-100 text-cyan-700"
        >
          <div className="space-y-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="relative border-l-2 border-slate-200 pl-4 break-inside-avoid"
              >
                <span className="absolute top-1 -left-[5px] size-2 rounded-full bg-cyan-500 ring-2 ring-white" />
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
      </main>
    </div>
  );
}
