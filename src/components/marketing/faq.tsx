import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function Faq() {
  const { faq } = dict.home;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky sidebar header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <span className="font-mono-label text-muted-foreground">
              Bölmə 06 — FAQ
            </span>
            <h2 className="font-heading mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {faq.title}
            </h2>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-mono-label">
                {faq.items.length} sual
              </span>
              <span aria-hidden className="text-border">·</span>
              <span>Yeni sualın yaranıbsa — bizə yaz</span>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8 lg:pl-8">
            <Accordion className="border-t">
              {faq.items.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={String(i)}
                  className="border-b"
                >
                  <AccordionTrigger className="py-6 text-left hover:no-underline">
                    <span className="flex items-baseline gap-6">
                      <span className="font-mono-label shrink-0 text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-lg font-medium leading-snug sm:text-xl">
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="ml-12 max-w-prose text-base leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}