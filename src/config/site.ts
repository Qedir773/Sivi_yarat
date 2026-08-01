export type Locale = "az" | "tr" | "en" | "ru";

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  defaultLocale: Locale;
  supportedLocales: Locale[];
  currency: "AZN";
  contactEmail: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  nav: {
    label: string;
    href: string;
  }[];
  footerLinks: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "CV Pro",
  shortName: "CV Pro",
  description:
    "Hazır professional CV şablonlarından istifadə edərək CV-ni onlayn hazırla və PDF formatında əldə et.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cvpro.example.com",
  defaultLocale: "az",
  supportedLocales: ["az", "tr", "en", "ru"],
  currency: "AZN",
  contactEmail: "info@cvpro.example.com",
  social: {},
  nav: [
    { label: "nav.templates", href: "/templates" },
    { label: "nav.myCvs", href: "/my-cvs" },
    { label: "nav.coverLetter", href: "/cover-letter" },
    { label: "nav.pricing", href: "/pricing" },
    { label: "nav.howItWorks", href: "/how-it-works" },
    { label: "nav.faq", href: "/faq" },
  ],
  footerLinks: [
    { label: "footer.privacy", href: "/privacy" },
    { label: "footer.terms", href: "/terms" },
    { label: "footer.faq", href: "/faq" },
    { label: "footer.contact", href: "/contact" },
  ],
};
