import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarV2 } from "@/components/layout/sidebar-v2";
import { MobileTopbarV2 } from "@/components/layout/mobile-topbar-v2";
import { FooterV2 } from "@/components/layout/footer-v2";

export const metadata: Metadata = {
  title: "V2 — Midnight Gold",
  description: "Versiya 2 — dərin navy + 3D qızılı.",
};

/**
 * Group layout for the V2 showcase. This wraps every route under /v2/*.
 * Importantly, it does NOT render V1's chrome — V1's <Sidebar /> /
 * <Footer /> live in the route default layout, so any URL inside this
 * group skips them entirely. That gives V2 a clean, standalone shell.
 */
export default function V2GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-version="v2" className="v2-grid-bg flex min-h-screen flex-1">
      <TooltipProvider>
        <SidebarV2 />
        <div className="flex min-w-0 flex-1 flex-col">
          <MobileTopbarV2 />
          <main className="flex-1">{children}</main>
          <FooterV2 />
        </div>
      </TooltipProvider>
    </div>
  );
}
