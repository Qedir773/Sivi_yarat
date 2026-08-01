"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FadeIn3D, PopIn } from "@/components/motion/primitives";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

const EASE = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const { faq } = dict.home;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky sidebar header with 3D entrance */}
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, x: -40, rotateY: 14 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="font-mono-label flex items-center gap-2 text-muted-foreground">
              <span className="neon-dot-violet" />
              Bölmə 06 — FAQ
            </span>
            <h2 className="font-heading neon-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {faq.title}
            </h2>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <PopIn>
                <span className="font-mono-label rounded-sm bg-neon/10 px-2 py-1 text-neon">
                  {faq.items.length} sual
                </span>
              </PopIn>
              <span aria-hidden className="text-border">·</span>
              <span>Yeni sualın yaranıbsa — bizə yaz</span>
            </div>
          </motion.div>

          {/* Accordion — Base UI requires AccordionItem as a direct child
              of Accordion.Root, so motion goes INSIDE each item instead
              of wrapping the AccordionItem externally. */}
          <div className="lg:col-span-8 lg:pl-8">
            <Accordion className="border-t">
              {faq.items.map((item, i) => (
                <AccordionItem key={item.question} value={String(i)}>
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
                          <span className="font-mono-label shrink-0 text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </PopIn>
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