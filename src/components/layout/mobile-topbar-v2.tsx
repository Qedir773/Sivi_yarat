"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Menu,
  X,
} from "lucide-react";
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

export function MobileTopbarV2() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 lg:hidden"
        style={{
          borderColor: "color-mix(in oklch, var(--v2-gold) 18%, transparent)",
          background:
            "color-mix(in oklch, var(--v2-bg-deeper) 92%, transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link href="/v2" className="flex items-center gap-2.5">
          <span
            className="relative flex size-7 items-center justify-center rounded-md"
            style={{
              background:
                "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
            }}
          >
            <Sparkles className="size-3.5" style={{ color: "var(--v2-bg-deeper)" }} />
          </span>
          <span className="v2-heading text-base font-medium text-3d-gold-soft">
            {siteConfig.shortName}
          </span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
          aria-expanded={open}
          aria-controls="v2-mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-md transition-colors"
          style={{
            background: "color-mix(in oklch, var(--v2-gold) 12%, transparent)",
            color: "var(--v2-gold-bright)",
          }}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="v2-mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ background: "rgba(0, 0, 0, 0.55)" }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="v2-mobile-nav"
              id="v2-mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="V2 naviqasiya"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto p-5 lg:hidden"
              style={{
                background:
                  "linear-gradient(180deg, var(--v2-bg-deeper), var(--v2-bg))",
                borderRight:
                  "1px solid color-mix(in oklch, var(--v2-gold) 22%, transparent)",
              }}
            >
              <div className="mb-6 flex items-center gap-2.5">
                <span
                  className="relative flex size-8 items-center justify-center rounded-md"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
                  }}
                >
                  <Sparkles
                    className="size-4"
                    style={{ color: "var(--v2-bg-deeper)" }}
                  />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="v2-heading text-lg font-medium text-3d-gold-soft">
                    {siteConfig.shortName}
                  </span>
                  <span className="v2-eyebrow" style={{ color: "var(--v2-muted)" }}>
                    v2 · Midnight
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                <p
                  className="v2-eyebrow px-3 pb-2 pt-1"
                  style={{ color: "var(--v2-muted)" }}
                >
                  Naviqasiya
                </p>
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/v2"
                      ? pathname === "/v2"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "v2-nav-active"
                          : "hover:bg-[color-mix(in_oklch,var(--v2-gold)_10%,transparent)]",
                      )}
                    >
                      <item.Icon
                        className={cn(
                          "size-4 shrink-0",
                          isActive
                            ? "text-[color:var(--v2-gold-bright)]"
                            : "text-[color:var(--v2-muted)] group-hover:text-[color:var(--v2-gold)]",
                        )}
                        strokeWidth={isActive ? 2.25 : 1.75}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "font-medium",
                          isActive
                            ? "text-[color:var(--v2-gold-bright)]"
                            : "text-[color:var(--v2-foreground)]",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 border-t pt-5"
                style={{ borderColor: "color-mix(in oklch, var(--v2-gold) 18%, transparent)" }}
              >
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
                        WebkitTextFillColor: "transparent",
                        color: "var(--v2-gold-bright)",
                      }}
                    >
                      ÇIXIŞ
                    </span>
                    <span className="v2-heading font-medium text-[color:var(--v2-foreground)]">
                      V1-ə qayıt
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 text-[color:var(--v2-gold)] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
