import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/legal/legal-page";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.legal.contact.title,
  description: dict.legal.contact.intro,
};

export default function V2ContactPage() {
  const items = [
    { Icon: Mail, label: dict.legal.contact.emailLabel, value: dict.legal.contact.emailValue },
    { Icon: Clock, label: dict.legal.contact.responseLabel, value: dict.legal.contact.responseValue },
    { Icon: MessageSquare, label: dict.legal.contact.supportLabel, value: dict.legal.contact.supportValue },
  ];

  return (
    <LegalPage
      title={dict.legal.contact.title}
      intro={dict.legal.contact.intro}
      sections={[]}
      extra={
        <div className="mt-8 grid gap-4 sm:grid-cols-1">
          {items.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-xl border p-5"
              style={{
                borderColor: "color-mix(in oklch, var(--v2-gold) 25%, transparent)",
                background: "color-mix(in oklch, var(--v2-gold) 5%, transparent)",
              }}
            >
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklch, var(--v2-gold) 20%, transparent), transparent)",
                  color: "var(--v2-gold-bright)",
                }}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <p className="v2-eyebrow" style={{ color: "var(--v2-muted)" }}>
                  {label}
                </p>
                <p className="v2-heading text-base font-medium" style={{ color: "var(--v2-foreground)" }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
