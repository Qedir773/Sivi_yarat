"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutTemplate,
  FolderOpen,
  FileText,
  CreditCard,
  Compass,
  HelpCircle,
  Home,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/v2", label: "Ana səhifə", Icon: Home },
  { href: "/v2/templates", label: "Şablonlar", Icon: LayoutTemplate },
  { href: "/v2/my-cvs", label: "CV-lərim", Icon: FolderOpen },
  { href: "/v2/cover-letter", label: "Motivasiya Məktubu", Icon: FileText },
  { href: "/v2/pricing", label: "Qiymətlər", Icon: CreditCard },
  { href: "/v2/how-it-works", label: "Necə işləyir", Icon: Compass },
  { href: "/v2/faq", label: "FAQ", Icon: HelpCircle },
];

function NavLink({ href, label, Icon, pathname }: {
  href: string;
  label: string;
  Icon: typeof Home;
  pathname: string;
}) {
  const isActive = href === "/v2" ? pathname === "/v2" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
        isActive ? "v2-nav-active" : "text-[color:var(--v2-muted)] hover:text-[color:var(--v2-foreground)]",
      )}
    >
      {isActive ? (
        <motion.span
          layoutId="v2-sidebar-active"
          className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-[color:var(--v2-gold-bright)]"
          style={{
            boxShadow:
              "0 0 12px color-mix(in oklch, var(--v2-gold) 70%, transparent), 0 0 24px color-mix(in oklch, var(--v2-gold) 35%, transparent)",
          }}
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
        />
      ) : null}
      <Icon
        className={cn(
          "size-4 shrink-0 transition-all",
          isActive ? "text-[color:var(--v2-gold-bright)]" : "group-hover:text-[color:var(--v2-gold)]",
        )}
        strokeWidth={isActive ? 2.25 : 1.75}
      />
      <span className={cn("font-medium", isActive && "text-[color:var(--v2-gold-bright)]")}>
        {label}
      </span>
    </Link>
  );
}

export function SidebarV2() {
  const pathname = usePathname();
  return (
    <aside className="v2-sidebar sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
      <div className="relative z-10 flex h-full flex-col">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 pt-6 pb-8">
          <span
            className="relative flex size-8 items-center justify-center rounded-md"
            style={{
              background:
                "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
              boxShadow:
                "0 0 0 1px color-mix(in oklch, var(--v2-gold) 40%, transparent), 0 0 18px color-mix(in oklch, var(--v2-gold) 35%, transparent)",
            }}
          >
            <Sparkles
              className="size-4"
              strokeWidth={2.25}
              style={{ color: "var(--v2-bg-deeper)" }}
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="v2-heading text-lg font-medium tracking-tight text-3d-gold-soft">
              {siteConfig.shortName}
            </span>
            <span className="v2-eyebrow text-[color:var(--v2-muted)]">
              v2 · Midnight
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3">
          <p className="v2-eyebrow px-3 pb-2 pt-1 text-[color:var(--v2-muted)]">
            Naviqasiya
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              Icon={item.Icon}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* Exit V2 */}
        <div className="px-3 pb-5">
          <Link
            href="/"
            className="group flex items-center justify-between rounded-md border px-3 py-2.5 text-sm transition-all"
            style={{
              borderColor: "color-mix(in oklch, var(--v2-gold) 35%, transparent)",
              background: "color-mix(in oklch, var(--v2-gold) 8%, transparent)",
            }}
          >
            <span className="flex flex-col leading-tight">
              <span
                className="v2-eyebrow"
                style={{
                  background:
                    "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "var(--v2-gold-bright)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ÇIXIŞ
              </span>
              <span className="v2-heading font-medium text-[color:var(--v2-foreground)]">
                V1-ə qayıt
              </span>
            </span>
            <ArrowRight className="size-4 text-[color:var(--v2-gold)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
