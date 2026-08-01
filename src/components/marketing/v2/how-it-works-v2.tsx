"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn3D, PopIn, StaggerContainer, StaggerItem } from "@/components/motion/primitives";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

const EASE = [0.22, 1, 0.36, 1] as const;

export function HowItWorksV2() {
  const { howItWorks } = dict.home;

  return (
    <section className="v2-section-dark relative border-y border-[color:var(--v2-border)]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn3D className="lg:col-span-5" as="div">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              BÖLMƏ 03 — PROSES
            </span>
            <h2
              className="v2-heading v2-gold-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl"
              style={{ fontStyle: "italic" }}
            >
              <span className="text-3d-gold">{howItWorks.title}</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--v2-muted)]">
              {howItWorks.subtitle}
            </p>

            <div className="mt-12 hidden v2-eyebrow text-[color:var(--v2-muted)] lg:block">
              <span>4 addım · ~5 dəq</span>
            </div>
          </FadeIn3D>

          <StaggerContainer as="ol" className="space-y-10 lg:col-span-7 lg:pl-12 perspective-far">
            {howItWorks.steps.map((step, i) => (
              <StaggerItem key={step.title} variant="up" as="li">
                <div className="grid grid-cols-12 gap-6 border-t border-[color:var(--v2-border)] pt-8">
                  <div className="col-span-2">
                    <PopIn delay={i * 0.05}>
                      <motion.span
                        className="v2-heading block text-4xl font-medium"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "var(--v2-gold-bright)",
                          WebkitTextFillColor: "transparent",
                          filter:
                            "drop-shadow(0 0 18px oklch(0.78 0.16 85 / 0.45))",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </PopIn>
                  </div>

                  <div className="col-span-10">
                    <h3 className="v2-heading text-2xl font-medium leading-snug text-[color:var(--v2-foreground)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-[color:var(--v2-muted)] sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  {i < howItWorks.steps.length - 1 && (
                    <div className="col-span-12 -mt-4 ml-2 text-[color:var(--v2-muted)] lg:hidden">
                      <ArrowDown className="size-4" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
