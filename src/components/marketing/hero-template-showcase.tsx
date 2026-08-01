"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sampleCV, samplePhotoUrls } from "@/lib/mock/sample-cv";
import { getTemplateComponent } from "@/lib/templates/component-loader";

const ROTATE_INTERVAL_MS = 3500;

/** Auto-rotates through every real CV template (via the same dynamic-loader +
 * sample data the /templates gallery previews use) so homepage visitors see
 * the actual product instead of a generic static mockup card. */
export function HeroTemplateShowcase({ templateIds }: { templateIds: string[] }) {
  const [index, setIndex] = useState(0);
  // Pause auto-rotate on hover/focus so a curious visitor can inspect a
  // template without the carousel jumping away from them.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (templateIds.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % templateIds.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [templateIds.length, paused]);

  if (templateIds.length === 0) return null;

  const activeId = templateIds[index];
  const data = {
    ...sampleCV,
    personalInfo: {
      ...sampleCV.personalInfo,
      photoUrl: samplePhotoUrls[index % samplePhotoUrls.length],
    },
  };

  return (
    <div
      className="mx-auto w-full max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/10">
        <div
          key={activeId}
          className="absolute top-0 left-0 w-[154%] origin-top-left scale-[0.65] transition-opacity duration-300"
        >
          {/* getTemplateComponent caches its dynamic() wrapper per template id
              (see component-loader.tsx), so this returns a stable reference for
              a given id — same safe pattern already used in gallery.tsx. */}
          {/* eslint-disable react-hooks/static-components */}
          {(() => {
            const TemplateComponent = getTemplateComponent(activeId);
            return <TemplateComponent data={data} />;
          })()}
          {/* eslint-enable react-hooks/static-components */}
        </div>
      </div>

      {templateIds.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {templateIds.map((id, i) => (
            <button
              key={id}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-5 bg-primary" : "w-1.5 bg-muted hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
