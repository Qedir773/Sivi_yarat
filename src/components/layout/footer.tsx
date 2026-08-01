import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createTranslator, type TranslationKey } from "@/lib/i18n";

const t = createTranslator();

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="neon-dot" />
          © {year} {siteConfig.shortName}. {t("footer.rights")}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {siteConfig.footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-neon"
            >
              {t(item.label as TranslationKey)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
