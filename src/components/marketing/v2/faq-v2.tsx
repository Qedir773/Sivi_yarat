"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PopIn } from "@/components/motion/primitives";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

const EASE = [0.22, 1, 0.36, 1] as const;

export function FaqV2() {
  const { faq } = dict.home;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, x: -40, rotateY: 14 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              BÖLMƏ 06 — FAQ
            </span>
            <h2
              className="v2-heading v2-gold-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl"
              style={{ fontStyle: "italic" }}
            >
              <span className="text-3d-gold-soft">{faq.title}</span>
            </h2>
            <div className="mt-6 flex items-center gap-3 text-sm text-[color:var(--v2-muted)]">
              <PopIn>
                <span
                  className="v2-eyebrow rounded-sm px-2 py-1"
                  style={{
                    background:
                      "color-mix(in oklch, var(--v2-gold) 12%, transparent)",
                    color: "var(--v2-gold-bright)",
                  }}
                >
                  {faq.items.length} sual
                </span>
              </PopIn>
              <span aria-hidden className="text-[color:var(--v2-border-strong)]">·</span>
              <span>Yeni sualın yaranıbsa — bizə yaz</span>
            </div>
          </motion.div>

          <div className="lg:col-span-8 lg:pl-8">
            <Accordion
              className="border-t border-[color:var(--v2-border)]"
            >
              {faq.items.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={String(i)}
                  className="border-[color:var(--v2-border)]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16, rotateX: -8 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.55,
                      ease: EASE,
                      delay: Math.min(i * 0.06, 0.4),
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <AccordionTrigger className="py-6 text-left hover:no-underline">
                      <span className="flex items-baseline gap-6">
                        <PopIn delay={i * 0.05}>
                          <span
                            className="v2-eyebrow shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "var(--v2-gold-bright)",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </PopIn>
                        <span className="v2-heading text-lg font-medium leading-snug text-[color:var(--v2-foreground)] sm:text-xl">
                          {item.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="ml-12 max-w-prose text-base leading-relaxed text-[color:var(--v2-muted)]">
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </motion.div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
