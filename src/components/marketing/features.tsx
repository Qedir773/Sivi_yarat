import {
  Gift,
  LayoutTemplate,
  Eye,
  FileDown,
  ShieldCheck,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

const icons: LucideIcon[] = [
  Gift,
  LayoutTemplate,
  Eye,
  FileDown,
  ShieldCheck,
  Languages,
];

export function Features() {
  const { features } = dict.home;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          {features.title}
        </h2>
        <p className="mt-3 text-muted-foreground">{features.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Card key={item.title} className="border-border/60">
              <CardContent className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
