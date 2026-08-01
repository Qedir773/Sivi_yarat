import {
  Gift,
  LayoutTemplate,
  Eye,
  FileDown,
  ShieldCheck,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

const items: { title: string; description: string; Icon: LucideIcon; span: string }[] = [
  {
    title: dict.home.features.items[0].title,
    description: dict.home.features.items[0].description,
    Icon: Gift,
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: dict.home.features.items[1].title,
    description: dict.home.features.items[1].description,
    Icon: LayoutTemplate,
    span: "lg:col-span-1",
  },
  {
    title: dict.home.features.items[2].title,
    description: dict.home.features.items[2].description,
    Icon: Eye,
    span: "lg:col-span-1",
  },
  {
    title: dict.home.features.items[3].title,
    description: dict.home.features.items[3].description,
    Icon: FileDown,
    span: "lg:col-span-1",
  },
  {
    title: dict.home.features.items[4].title,
    description: dict.home.features.items[4].description,
    Icon: ShieldCheck,
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: dict.home.features.items[5].title,
    description: dict.home.features.items[5].description,
    Icon: Languages,
    span: "lg:col-span-1",
  },
];

export function FeaturesV2() {
  const { features } = dict.home;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-8 border-b border-[color:var(--v2-border)] pb-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              BÖLMƏ 02 — NİYƏ BİZ?
            </span>
            <h2
              className="v2-heading v2-gold-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl"
              style={{ fontStyle: "italic" }}
            >
              <span className="text-3d-gold-soft">{features.title}</span>
            </h2>
          </div>
          <p
            className="v2-heading text-2xl italic leading-snug text-[color:var(--v2-muted)] text-balance lg:col-span-7 lg:col-start-6 lg:text-3xl"
          >
            {features.subtitle}
          </p>
        </div>

        {/* Mosaic */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-[color:var(--v2-border)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, description, Icon, span }, i) => (
            <article
              key={title}
              className={`v2-card v2-card-hover group relative p-8 ${span}`}
            >
              <span className="v2-eyebrow absolute top-6 right-6 text-[color:var(--v2-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div
                className="flex size-11 items-center justify-center rounded-md border text-[color:var(--v2-gold)] transition-colors"
                style={{
                  borderColor: "color-mix(in oklch, var(--v2-gold) 40%, transparent)",
                  background: "color-mix(in oklch, var(--v2-gold) 8%, transparent)",
                }}
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </div>

              <h3 className="v2-heading mt-8 text-2xl font-medium leading-snug text-[color:var(--v2-foreground)]">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[color:var(--v2-muted)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
