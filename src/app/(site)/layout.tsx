import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

/**
 * V1 chrome — applies to every route under (site)/*, including the
 * homepage, /templates, /my-cvs, /pricing, /faq, etc. V2 routes are
 * isolated under (v2)/ and use their own layout, so V1 chrome never
 * leaks into the V2 experience.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid-bg flex min-h-screen flex-1">
      <TooltipProvider>
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </TooltipProvider>
    </div>
  );
}
