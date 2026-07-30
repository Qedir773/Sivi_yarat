import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createTranslator } from "@/lib/i18n";

const t = createTranslator();

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        {siteConfig.description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          render={<Link href="/builder">{t("common.getStarted")}</Link>}
        />
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/templates">{t("common.browseTemplates")}</Link>}
        />
      </div>
    </div>
  );
}
