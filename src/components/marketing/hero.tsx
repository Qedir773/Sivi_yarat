import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { createTranslator } from "@/lib/i18n";
import { CvMockup } from "@/components/marketing/cv-mockup";

const t = createTranslator();
const dict = getDictionary(siteConfig.defaultLocale);

export function Hero() {
  const { hero } = dict.home;

  return (
    <section className="overflow-hidden border-b bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground text-balance">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button
              size="lg"
              render={<Link href="/builder">{t("common.getStarted")}</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              render={
                <Link href="/templates">{t("common.browseTemplates")}</Link>
              }
            />
          </div>
        </div>

        <CvMockup
          name={hero.mockupName}
          role={hero.mockupRole}
          experienceLabel={hero.mockupExperience}
          educationLabel={hero.mockupEducation}
          skillsLabel={hero.mockupSkills}
        />
      </div>
    </section>
  );
}
