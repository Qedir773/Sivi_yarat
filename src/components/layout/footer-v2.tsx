import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createTranslator, type TranslationKey } from "@/lib/i18n";

const t = createTranslator();

export function FooterV2() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-[color:var(--v2-border)]"
      style={{ background: "linear-gradient(180deg, transparent, var(--v2-bg-deeper))" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-sm text-[color:var(--v2-muted)]">
          <span className="v2-gold-dot" />
          <span>
            © {year} {siteConfig.shortName}. {t("footer.rights")}
          </span>
          <span className="v2-eyebrow text-[color:var(--v2-gold)]">— v2</span>
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {siteConfig.footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[color:var(--v2-muted)] transition-colors hover:text-[color:var(--v2-gold)]"
            >
              {t(item.label as TranslationKey)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
