"use client";

import { useState } from "react";
import { Check, Copy, Download, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTextGenerationProvider } from "@/features/ai/registry";
import { downloadBlob } from "@/lib/export/docx-export";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

type GenerationStage = "idle" | "loading-model" | "generating";

function buildPrompt(fields: {
  fullName: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  keyPoints: string;
}) {
  return [
    `Ad Soyad: ${fields.fullName || "—"}`,
    `Müraciət etdiyi vəzifə: ${fields.jobTitle || "—"}`,
    `Şirkət: ${fields.company || "—"}`,
    fields.jobDescription ? `Vakansiya elanı:\n${fields.jobDescription}` : "",
    fields.keyPoints ? `Vurğulanmalı bacarıq/nailiyyətlər:\n${fields.keyPoints}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function CoverLetterGenerator() {
  const { coverLetterPage } = dict;
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [result, setResult] = useState("");
  const [stage, setStage] = useState<GenerationStage>("idle");
  const [copied, setCopied] = useState(false);

  const isBusy = stage !== "idle";

  async function handleGenerate() {
    setStage("loading-model");
    setCopied(false);
    try {
      const provider = getTextGenerationProvider();
      setStage("generating");
      const output = await provider.generate([
        {
          role: "system",
          content:
            "Sən peşəkar HR mütəxəssisisən. İstifadəçinin verdiyi məlumatlara əsasən Azərbaycan dilində qısa, peşəkar və səmimi bir motivasiya məktubu (cover letter) yaz. Yalnız məktubun mətnini qaytar, əlavə izahat və başlıq yazma.",
        },
        { role: "user", content: buildPrompt({ fullName, jobTitle, company, jobDescription, keyPoints }) },
      ]);
      setResult(output);
    } finally {
      setStage("idle");
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    downloadBlob(new Blob([result], { type: "text/plain;charset=utf-8" }), "motivasiya-mektubu.txt");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{coverLetterPage.title}</h1>
        <p className="mt-2 text-muted-foreground">{coverLetterPage.subtitle}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            {coverLetterPage.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{coverLetterPage.aiNotice}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cl-fullname">{coverLetterPage.fullNameLabel}</Label>
              <Input id="cl-fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cl-jobtitle">{coverLetterPage.jobTitleLabel}</Label>
              <Input id="cl-jobtitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cl-company">{coverLetterPage.companyLabel}</Label>
              <Input id="cl-company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cl-jobdesc">{coverLetterPage.jobDescriptionLabel}</Label>
            <Textarea
              id="cl-jobdesc"
              rows={5}
              placeholder={coverLetterPage.jobDescriptionPlaceholder}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cl-keypoints">{coverLetterPage.keyPointsLabel}</Label>
            <Textarea
              id="cl-keypoints"
              rows={3}
              placeholder={coverLetterPage.keyPointsPlaceholder}
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
            />
          </div>

          <Button type="button" onClick={handleGenerate} disabled={isBusy}>
            {isBusy ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {stage === "loading-model"
              ? coverLetterPage.loadingModel
              : stage === "generating"
                ? coverLetterPage.generating
                : coverLetterPage.generate}
          </Button>
        </CardContent>
      </Card>

      {result ? (
        <Card>
          <CardHeader>
            <CardTitle>{coverLetterPage.resultLabel}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea rows={14} value={result} onChange={(e) => setResult(e.target.value)} />
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="text-emerald-600" /> : <Copy />}
                {copied ? coverLetterPage.copied : coverLetterPage.copy}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleDownload}>
                <Download /> {coverLetterPage.download}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
