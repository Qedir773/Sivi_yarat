"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";
import { SummaryForm } from "@/components/forms/summary-form";
import { ExperienceForm } from "@/components/forms/experience-form";
import { EducationForm } from "@/components/forms/education-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { LanguagesForm } from "@/components/forms/languages-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { CertificationsForm } from "@/components/forms/certifications-form";
import {
  cvFormSchema,
  emptyFormValues,
  formValuesToCVData,
  type CVFormValues,
} from "@/lib/validation/cv-schema";
import { loadDraft, saveDraft } from "@/lib/storage/cv-draft";
import { getSavedCv, updateSavedCvData } from "@/lib/storage/cv-database";
import { getTemplateComponent } from "@/lib/templates/component-loader";
import { generateCvDocx, downloadBlob } from "@/lib/export/docx-export";
import { AtsPanel } from "@/components/editor/ats-panel";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function CvEditor({ templateId, cvId }: { templateId: string; cvId?: string }) {
  const { builderPage } = dict;

  const { control, register, reset } = useForm<CVFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: emptyFormValues(),
    mode: "onBlur",
  });

  const [isExportingDocx, setIsExportingDocx] = useState(false);

  // In single-draft mode (no cvId) this is the one global localStorage draft;
  // in multi-CV mode (cvId present, from /my-cvs) each CV is its own Dexie record.
  const hasLoadedDraft = useRef(false);
  useEffect(() => {
    hasLoadedDraft.current = false;
    if (cvId) {
      getSavedCv(cvId).then((cv) => {
        if (cv) reset(cv.data);
        hasLoadedDraft.current = true;
      });
    } else {
      const draft = loadDraft();
      if (draft) reset(draft);
      hasLoadedDraft.current = true;
    }
  }, [reset, cvId]);

  // react-hook-form types watch results as DeepPartial for safety; defaultValues
  // guarantee every field is actually populated at runtime.
  const values = useWatch({ control, defaultValue: emptyFormValues() }) as CVFormValues;

  useEffect(() => {
    if (!hasLoadedDraft.current) return;
    const timeout = setTimeout(() => {
      if (cvId) {
        updateSavedCvData(cvId, values);
      } else {
        saveDraft(values);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [values, cvId]);

  const cvData = formValuesToCVData(values);

  async function handleDownloadDocx() {
    setIsExportingDocx(true);
    try {
      const blob = await generateCvDocx(cvData);
      const filename = `${cvData.personalInfo.fullName || "cv"}.docx`;
      downloadBlob(blob, filename);
    } finally {
      setIsExportingDocx(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        {cvId ? (
          <Link
            href="/my-cvs"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {dict.nav.myCvs}
          </Link>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{builderPage.title}</h1>
        <p className="mt-2 text-muted-foreground">{builderPage.subtitle}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <PersonalInfoForm control={control} register={register} />
          <SummaryForm register={register} />
          <ExperienceForm control={control} register={register} />
          <EducationForm control={control} register={register} />
          <SkillsForm control={control} register={register} />
          <LanguagesForm control={control} register={register} />
          <ProjectsForm control={control} register={register} />
          <CertificationsForm control={control} register={register} />
          <AtsPanel cvData={cvData} />
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              {builderPage.actions.livePreview}
            </p>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => window.print()}>
                <FileText /> {builderPage.actions.downloadPdf}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleDownloadDocx}
                disabled={isExportingDocx}
              >
                <Download /> {builderPage.actions.downloadDocx}
              </Button>
            </div>
          </div>
          <div id="cv-print-area" className="overflow-hidden rounded-xl border shadow-sm">
            {/* getTemplateComponent caches by id in a module-level map, so the same
                templateId always resolves to the identical component reference —
                safe despite the rule's generic "don't build components in render" check. */}
            {/* eslint-disable react-hooks/static-components */}
            {(() => {
              const TemplateComponent = getTemplateComponent(templateId);
              return <TemplateComponent data={cvData} />;
            })()}
            {/* eslint-enable react-hooks/static-components */}
          </div>
        </div>
      </div>
    </section>
  );
}
