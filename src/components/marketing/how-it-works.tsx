"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn3D, PopIn, StaggerContainer, StaggerItem } from "@/components/motion/primitives";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

const EASE = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const { howItWorks } = dict.home;

  return (
    <section className="relative border-y bg-foreground text-background">
      {/* Inverted: dark editorial spread */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn3D className="lg:col-span-5" as="div">
            <span className="font-mono-label flex items-center gap-2 text-neon">
              <span className="size-1.5 rounded-full bg-neon glow-neon" />
              Bölmə 03 — Proses
            </span>
            <h2 className="font-heading neon-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {howItWorks.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-background/70">
              {howItWorks.subtitle}
            </p>

            <div className="mt-12 hidden font-mono-label text-background/40 lg:block">
              <span>4 addım · ~5 dəq</span>
            </div>
          </FadeIn3D>

          <StaggerContainer as="ol" className="space-y-10 lg:col-span-7 lg:pl-12 perspective-far">
            {howItWorks.steps.map((step, i) => (
              <StaggerItem key={step.title} variant="up" as="li">
                <div className="grid grid-cols-12 gap-6 border-t border-background/15 pt-8">
                  <div className="col-span-2">
                    <PopIn delay={i * 0.05}>
                      <motion.span
                        className="font-heading block text-4xl font-medium text-amber"
                        style={{ textShadow: "0 0 20px oklch(0.78 0.16 75 / 0.35)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </PopIn>
                  </div>

                  <div className="col-span-10">
                    <h3 className="font-heading text-2xl font-medium leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-background/70 sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  {i < howItWorks.steps.length - 1 && (
                    <div className="col-span-12 -mt-4 ml-2 text-background/25 lg:hidden">
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