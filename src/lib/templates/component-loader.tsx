"use client";

import { lazy, Suspense, type ComponentType } from "react";
import type { CVData } from "@/types/cv";

type TemplateComponent = ComponentType<{ data: CVData }>;

const componentCache = new Map<string, TemplateComponent>();

/**
 * Lazily resolves the `Template.tsx` default export for a given template id
 * via React.lazy (client-only — templates render to a virtual DOM, not the
 * server tree). Cached so the same component reference is reused across
 * renders instead of remounting.
 *
 * Wraps with Suspense fallback so callers don't need to. Templates render
 * inside an A4-sized box; the skeleton preserves that footprint to avoid
 * layout shift.
 */
export function getTemplateComponent(id: string): TemplateComponent {
  const cached = componentCache.get(id);
  if (cached) return cached;

  const LazyTemplate = lazy(async () => {
    const mod = await import(`../../templates/${id}/Template`);
    return { default: mod.default as TemplateComponent };
  });

  const Wrapped: TemplateComponent = (props) => (
    <Suspense
      fallback={
        <div className="flex aspect-[210/297] w-full items-center justify-center bg-muted/30 text-xs text-muted-foreground">
          Şablon yüklənir…
        </div>
      }
    >
      <LazyTemplate {...props} />
    </Suspense>
  );

  componentCache.set(id, Wrapped);
  return Wrapped;
}
