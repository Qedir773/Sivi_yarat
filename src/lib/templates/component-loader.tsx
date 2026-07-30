"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { CVData } from "@/types/cv";

type TemplateComponent = ComponentType<{ data: CVData }>;

const componentCache = new Map<string, TemplateComponent>();

/**
 * Lazily resolves the `Template.tsx` default export for a given template id
 * via a bundler-analyzable dynamic import (works with both webpack and
 * Turbopack context-module resolution). Cached so the same component
 * reference is reused across renders instead of remounting.
 */
export function getTemplateComponent(id: string): TemplateComponent {
  const cached = componentCache.get(id);
  if (cached) return cached;

  const Component = dynamic(() => import(`../../templates/${id}/Template`)) as TemplateComponent;
  componentCache.set(id, Component);
  return Component;
}
