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
  Plus,
  Menu,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { createTranslator, type TranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const t = createTranslator();

interface NavItem {
  href: string;
  labelKey: TranslationKey;
  Icon: typeof Home;
}

// Main nav — includes the 6 sections + Home + Create CV (CTAs)
const navItems: NavItem[] = [
  { href: "/", labelKey: "common.getStarted" as TranslationKey, Icon: Home }, // overridden below to "Ana səhifə"
  { href: "/templates", labelKey: "nav.templates", Icon: LayoutTemplate },
  { href: "/my-cvs", labelKey: "nav.myCvs", Icon: FolderOpen },
  { href: "/cover-letter", labelKey: "nav.coverLetter", Icon: FileText },
  { href: "/pricing", labelKey: "nav.pricing", Icon: CreditCard },
  { href: "/how-it-works", labelKey: "nav.howItWorks", Icon: Compass },
  { href: "/faq", labelKey: "nav.faq", Icon: HelpCircle },
];

const sectionLabels: Record<string, string> = {
  "/": "Ana səhifə",
  "/templates": t("nav.templates"),
  "/my-cvs": t("nav.myCvs"),
  "/cover-letter": t("nav.coverLetter"),
  "/pricing": t("nav.pricing"),
  "/how-it-works": t("nav.howItWorks"),
  "/faq": t("nav.faq"),
};

/** Single sidebar nav item — used in both desktop rail and mobile sheet. */
function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate?: () => void }) {
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  const label = sectionLabels[item.href] ?? item.labelKey;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
        isActive
          ? "bg-neon/10 text-neon"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      {/* Active indicator: glowing neon dot + bar */}
      {isActive ? (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-neon glow-neon"
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
        />
      ) : null}

      <item.Icon
        className={cn(
          "size-4 shrink-0 transition-all",
          isActive ? "text-neon text-glow" : "group-hover:text-foreground",
        )}
        strokeWidth={isActive ? 2.25 : 1.75}
      />
      <span className={cn("font-medium", isActive && "text-glow")}>{label}</span>
    </Link>
  );
}

/** Desktop sidebar — fixed left rail with neon grid background. */
function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 grid-neon lg:block">
      <div className="relative z-10 flex h-full flex-col">
        {/* Logo / brand */}
        <div className="flex items-center gap-2.5 px-5 pt-6 pb-8">
          <span className="relative flex size-8 items-center justify-center rounded-md bg-neon/15 text-neon glow-neon">
            <Sparkles className="size-4" strokeWidth={2.25} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-lg font-medium tracking-tight text-glow">
              {siteConfig.shortName}
            </span>
            <span className="font-mono-label text-muted-foreground/70">v0.1 · 2026</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3">
          <p className="font-mono-label px-3 pb-2 pt-1 text-muted-foreground/60">Naviqasiya</p>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Bottom: theme toggle + create CTA + V2 preview link */}
        <div className="space-y-2 px-3 pb-5 pt-3">
          <Button
            size="sm"
            className="w-full justify-center bg-neon text-neon-foreground hover:bg-neon/90 glow-neon"
            nativeButton={false}
            render={
              <Link href="/builder" className="gap-2">
                <Plus className="size-4" />
                {t("nav.createCv")}
              </Link>
            }
          />

          {/* V2 preview — clearly visible teaser to the alternative skin */}
          <Link
            href="/v2"
            className="group flex items-center justify-between rounded-md border border-amber/30 bg-amber/5 px-3 py-2 text-xs transition-all hover:border-amber hover:bg-amber/10"
          >
            <span className="flex flex-col leading-tight">
              <span className="font-mono-label text-amber-foreground">YENİ</span>
              <span className="font-heading text-sm font-medium text-foreground">
                V2 Midnight
              </span>
            </span>
            <ArrowRight className="size-4 text-amber-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="flex items-center justify-between px-2 pt-1">
            <span className="font-mono-label text-muted-foreground/60">Rejim</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}

/** Mobile top bar with hamburger sheet — keeps the same nav links. */
function MobileTopbar({ pathname }: { pathname: string }) {
  return (
    <header className="sticky top-0 z-40 grid-neon border-b border-sidebar-border lg:hidden">
      <div className="relative z-10 flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex size-7 items-center justify-center rounded-md bg-neon/15 text-neon glow-neon">
            <Sparkles className="size-3.5" strokeWidth={2.25} />
          </span>
          <span className="font-heading text-base font-medium text-glow">{siteConfig.shortName}</span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              aria-label={t("common.openMenu")}
              aria-controls="mobile-nav-sheet"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              id="mobile-nav-sheet"
              side="right"
              className="grid-neon w-72 border-sidebar-border"
            >
              <div className="relative z-10">
                <SheetHeader>
                  <SheetTitle className="font-heading text-glow">{siteConfig.shortName}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 pt-2">
                  {navItems.map((item) => (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={<NavLink item={item} pathname={pathname} />}
                    />
                  ))}
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/builder"
                        className={cn(
                          buttonVariants(),
                          "mt-3 w-full justify-center bg-neon text-neon-foreground hover:bg-neon/90 glow-neon",
                        )}
                      >
                        <Plus className="size-4" />
                        {t("nav.createCv")}
                      </Link>
                    }
                  />
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/v2"
                        className="mt-2 flex items-center justify-between rounded-md border border-amber/30 bg-amber/5 px-3 py-2 text-sm transition-colors hover:border-amber hover:bg-amber/10"
                      >
                        <span className="flex flex-col leading-tight">
                          <span className="font-mono-label text-amber-foreground">YENİ</span>
                          <span className="font-heading font-medium">V2 Midnight</span>
                        </span>
                        <ArrowRight className="size-4 text-amber-foreground" />
                      </Link>
                    }
                  />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/** Public component — sidebar on desktop, topbar on mobile. */
export function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <DesktopSidebar pathname={pathname} />
      <MobileTopbar pathname={pathname} />
    </>
  );
}