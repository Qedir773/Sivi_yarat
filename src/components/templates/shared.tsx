import type { ComponentType, ReactNode } from "react";
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
  icon: Icon,
  children,
  className,
  titleClassName,
  iconClassName,
  divider = true,
}: {
  title: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  divider?: boolean;
}) {
  return (
    <section className={cn("space-y-2", className)}>
      <h3
        className={cn(
          "flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase",
          divider && "border-b border-current/20 pb-1",
          titleClassName,
        )}
      >
        {Icon && (
          <span
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full bg-current/15",
              iconClassName,
            )}
          >
            <Icon className="size-2.5" />
          </span>
        )}
        {title}
      </h3>
      {children}
    </section>
  );
}

export function initialsOf(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  photoUrl,
  fullName,
  className,
  textClassName,
}: {
  photoUrl?: string;
  fullName: string;
  className?: string;
  textClassName?: string;
}) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={fullName}
        className={cn("size-16 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex size-16 items-center justify-center rounded-full text-xl font-bold",
        className,
      )}
    >
      <span className={textClassName}>{initialsOf(fullName)}</span>
    </div>
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
