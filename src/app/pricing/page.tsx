import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { getProPrice } from "@/lib/db/settings";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.pricingPage.title,
  description: dict.pricingPage.subtitle,
};

export default function PricingPage() {
  const { pricingPage } = dict;
  const { free, pro } = dict.home.pricing;
  const proPrice = getProPrice();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{pricingPage.title}</h1>
        <p className="mt-3 text-muted-foreground">{pricingPage.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{free.title}</CardTitle>
            <CardDescription>{free.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-3xl font-semibold">0 AZN</p>
            <ul className="space-y-2">
              {free.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 shrink-0 text-emerald-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" nativeButton={false} render={<Link href="/builder">{pricingPage.freeCta}</Link>} />
          </CardFooter>
        </Card>

        <Card className="ring-primary/40">
          <CardHeader>
            <CardTitle className="text-xl">{pro.title}</CardTitle>
            <CardDescription>{pro.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-3xl font-semibold">
              {proPrice.toFixed(2)} <span className="text-base font-normal text-muted-foreground">{pricingPage.perMonth}</span>
            </p>
            <ul className="space-y-2">
              {pro.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 shrink-0 text-emerald-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" disabled>
              {pricingPage.proCta}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">{pricingPage.proNotice}</p>
    </section>
  );
}
