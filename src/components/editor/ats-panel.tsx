"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeCv, type AtsResult } from "@/features/ats/analyze";
import type { CVData } from "@/types/cv";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function AtsPanel({ cvData }: { cvData: CVData }) {
  const { ats } = dict.builderPage;
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AtsResult | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ats.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{ats.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="job-description">{ats.jobDescriptionLabel}</Label>
          <Textarea
            id="job-description"
            rows={4}
            placeholder={ats.jobDescriptionPlaceholder}
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
          />
        </div>

        <Button type="button" onClick={() => setResult(analyzeCv(cvData, jobDescription))}>
          {ats.analyze}
        </Button>

        {result ? (
          <div className="space-y-4 rounded-lg border p-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm font-medium">
                <span>{ats.score}</span>
                <span>{result.score}/100</span>
              </div>
              <Progress value={result.score} />
            </div>

            {result.matchedKeywords.length > 0 && (
              <div>
                <p className="mb-1.5 text-sm font-medium">{ats.matchedKeywords}</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchedKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {result.missingKeywords.length > 0 && (
              <div>
                <p className="mb-1.5 text-sm font-medium">{ats.missingKeywords}</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-1.5 text-sm font-medium">{ats.issues}</p>
              {result.issues.length === 0 ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-600" /> {ats.noIssues}
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {result.issues.map((issue) => (
                    <li key={issue.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                      {issue.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
