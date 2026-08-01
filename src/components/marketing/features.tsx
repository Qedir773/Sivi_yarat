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

export function Features() {
  const { features } = dict.home;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        {/* Section header — asymmetric editorial */}
        <div className="grid grid-cols-1 gap-8 border-b border-border/60 pb-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="font-mono-label flex items-center gap-2 text-muted-foreground">
              <span className="neon-dot" />
              Bölmə 02 — Niyə biz?
            </span>
            <h2 className="font-heading neon-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {features.title}
            </h2>
          </div>
          <p className="font-heading text-2xl italic leading-snug text-muted-foreground text-balance lg:col-span-7 lg:col-start-6 lg:text-3xl">
            {features.subtitle}
          </p>
        </div>

        {/* Editorial mosaic — mixed sizes, no centered card grid */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, description, Icon, span }, i) => (
            <article
              key={title}
              className={`group relative bg-background p-8 transition-colors hover:bg-secondary/50 ${span}`}
            >
              {/* Numbered corner */}
              <span className="absolute top-6 right-6 font-mono-label text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex size-11 items-center justify-center rounded-md border bg-background text-foreground transition-colors group-hover:border-amber group-hover:text-amber-foreground">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>

              <h3 className="font-heading mt-8 text-2xl font-medium leading-snug">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}