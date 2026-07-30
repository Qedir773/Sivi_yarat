import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function HowItWorks() {
  const { howItWorks } = dict.home;

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            {howItWorks.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{howItWorks.subtitle}</p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="text-center sm:text-left">
              <div className="mx-auto flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground sm:mx-0">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
