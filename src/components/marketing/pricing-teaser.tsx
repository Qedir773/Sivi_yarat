import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function PricingTeaser() {
  const { pricing } = dict.home;
  const plans = [pricing.free, pricing.pro] as const;

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            {pricing.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{pricing.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {plans.map((plan, i) => (
            <Card
              key={plan.title}
              className={i === 1 ? "border-primary/50 shadow-lg" : undefined}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  {i === 1 && <Badge>Pro</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button nativeButton={false} render={<Link href="/pricing">{pricing.cta}</Link>} />
        </div>
      </div>
    </section>
  );
}
