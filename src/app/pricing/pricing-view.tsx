"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Card3D, FadeIn3D, PopIn, StaggerContainer, StaggerItem } from "@/components/motion/primitives";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function PricingView({ proPrice }: { proPrice: number }) {
  const { pricingPage } = dict;
  const { free, pro } = dict.home.pricing;

  return (
    <section className="relative perspective-far">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <FadeIn3D as="div">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono-label flex items-center justify-center gap-2 text-muted-foreground">
              <span className="neon-dot-magenta" />
              Qiymət
            </span>
            <h1 className="font-heading neon-underline mx-auto mt-3 inline-block text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              {pricingPage.title}
            </h1>
            <p className="mt-4 text-muted-foreground">{pricingPage.subtitle}</p>
          </div>
        </FadeIn3D>

        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 perspective-far">
          {/* Free plan */}
          <StaggerItem variant="up">
            <Card3D className="h-full rounded-2xl border bg-card p-8" intensity={8}>
              <div className="flex items-baseline gap-3">
                <h2 className="font-heading text-3xl font-medium leading-none">
                  {free.title}
                </h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{free.description}</p>
              <PopIn delay={0.1}>
                <p className="mt-6 mb-6 text-4xl font-semibold leading-none tracking-tight">
                  0 <span className="text-base font-normal text-muted-foreground">AZN</span>
                </p>
              </PopIn>
              <ul className="space-y-2.5">
                {free.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" strokeWidth={2.25} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full"
                nativeButton={false}
                render={<Link href="/builder">{pricingPage.freeCta}</Link>}
              />
            </Card3D>
          </StaggerItem>

          {/* Pro plan — featured with neon glow */}
          <StaggerItem variant="up">
            <Card3D
              className="relative h-full rounded-2xl border border-neon/40 bg-card p-8 shadow-[0_0_40px_-12px_oklch(0.78_0.18_200/0.45)] glow-neon"
              intensity={8}
              glow
            >
              <span className="absolute -top-3 right-6 rounded-full bg-neon px-3 py-1 font-mono-label text-neon-foreground">
                Pro
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-heading text-3xl font-medium leading-none">{pro.title}</h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{pro.description}</p>
              <PopIn delay={0.15}>
                <p className="mt-6 mb-6 text-4xl font-semibold leading-none tracking-tight">
                  {proPrice.toFixed(2)}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    {pricingPage.perMonth}
                  </span>
                </p>
              </PopIn>
              <ul className="space-y-2.5">
                {pro.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-neon" strokeWidth={2.25} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full bg-neon text-neon-foreground hover:bg-neon/90"
                disabled
              >
                {pricingPage.proCta}
              </Button>
            </Card3D>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn3D className="mt-10 text-center" as="div">
          <p className="text-sm text-muted-foreground">{pricingPage.proNotice}</p>
        </FadeIn3D>
      </div>
    </section>
  );
}