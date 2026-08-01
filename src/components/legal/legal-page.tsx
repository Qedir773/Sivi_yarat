import type { ReactNode } from "react";

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalPageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
  extra?: ReactNode;
}

export function LegalPage({ title, intro, sections, extra }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-base text-muted-foreground sm:text-lg">{intro}</p>
      </header>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <section key={index} className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
              {section.body}
            </p>
          </section>
        ))}

        {extra}
      </div>
    </div>
  );
}
