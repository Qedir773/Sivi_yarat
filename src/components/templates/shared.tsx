import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function formatDateRange(
  startDate: string,
  endDate?: string,
  current?: boolean,
  presentLabel = "Hazırda",
) {
  return `${startDate} — ${current || !endDate ? presentLabel : endDate}`;
}

export function TemplateSection({
  title,
  children,
  className,
  titleClassName,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={cn("space-y-2", className)}>
      <h3
        className={cn(
          "text-[11px] font-semibold tracking-[0.12em] uppercase",
          titleClassName,
        )}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

export function SkillDots({
  level = 3,
  max = 5,
  className,
}: {
  level?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full",
            i < level ? "bg-current" : "bg-current/20",
          )}
        />
      ))}
    </div>
  );
}

export function SkillBar({
  level = 3,
  max = 5,
  className,
}: {
  level?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("h-1 w-full rounded-full bg-current/15", className)}>
      <div
        className="h-full rounded-full bg-current"
        style={{ width: `${(level / max) * 100}%` }}
      />
    </div>
  );
}
