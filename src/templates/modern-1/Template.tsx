import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Contact as ContactIcon,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Languages as LanguagesIcon,
} from "lucide-react";
import type { CVData } from "@/types/cv";
import { TemplateSection, SkillDots, formatDateRange, Avatar } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  const { personalInfo, summary, experience, education, skills, languages } = data;

  return (
    <div className="flex aspect-[1/1.414] w-full bg-white text-[11px] leading-snug text-neutral-800 shadow-sm">
      <aside className="flex w-[36%] flex-col gap-6 bg-gradient-to-b from-blue-700 to-blue-600 p-6 text-blue-50">
        <Avatar
          photoUrl={personalInfo.photoUrl}
          fullName={personalInfo.fullName}
          className="size-20 border-2 border-white/30 bg-white/15 text-white shadow-md"
        />
        <div>
          <h1 className="text-xl leading-tight font-bold text-white">{personalInfo.fullName}</h1>
          <p className="mt-0.5 text-blue-100">{personalInfo.title}</p>
        </div>

        <TemplateSection title="Əlaqə" icon={ContactIcon} titleClassName="text-blue-100">
          <div className="space-y-1.5 text-blue-50">
            <p className="flex items-center gap-1.5">
              <Mail className="size-3 shrink-0" /> <span className="break-all">{personalInfo.email}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="size-3 shrink-0" /> {personalInfo.phone}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="size-3 shrink-0" /> {personalInfo.location}
            </p>
            {personalInfo.website && (
              <p className="flex items-center gap-1.5">
                <Globe className="size-3 shrink-0" /> {personalInfo.website}
              </p>
            )}
          </div>
        </TemplateSection>

        <TemplateSection title="Bacarıqlar" icon={Sparkles} titleClassName="text-blue-100">
          <div className="space-y-1.5">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-blue-50">{skill.name}</span>
                <SkillDots level={skill.level} className="text-white" />
              </div>
            ))}
          </div>
        </TemplateSection>

        {languages && languages.length > 0 && (
          <TemplateSection title="Dillər" icon={LanguagesIcon} titleClassName="text-blue-100">
            <div className="space-y-1 text-blue-50">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-blue-200">{lang.level}</span>
                </div>
              ))}
            </div>
          </TemplateSection>
        )}
      </aside>

      <main className="flex-1 space-y-5 p-6">
        {summary && (
          <TemplateSection title="Xülasə" icon={FileText} titleClassName="text-blue-600">
            <p className="text-neutral-600">{summary}</p>
          </TemplateSection>
        )}

        <TemplateSection title="İş Təcrübəsi" icon={Briefcase} titleClassName="text-blue-600">
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-100 pl-3">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-neutral-900">{exp.role}</p>
                  <span className="text-[10px] text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-blue-600">{exp.company}</p>
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

        <TemplateSection title="Təhsil" icon={GraduationCap} titleClassName="text-blue-600">
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-blue-100 pl-3">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold text-neutral-900">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                  <span className="text-[10px] text-neutral-400">
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
