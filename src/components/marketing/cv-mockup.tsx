import { Mail, Phone, MapPin } from "lucide-react";

interface CvMockupProps {
  name: string;
  role: string;
  experienceLabel: string;
  educationLabel: string;
  skillsLabel: string;
}

function Bar({ width }: { width: string }) {
  return <div className={`h-2 rounded-full bg-muted ${width}`} />;
}

export function CvMockup({
  name,
  role,
  experienceLabel,
  educationLabel,
  skillsLabel,
}: CvMockupProps) {
  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border bg-card p-6 shadow-2xl shadow-primary/10">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="truncate font-semibold">{name}</p>
          <p className="truncate text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Mail className="size-3" /> aysel@example.com
        </span>
        <span className="inline-flex items-center gap-1">
          <Phone className="size-3" /> +994 50 000 00 00
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3" /> Bakı
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <section>
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary uppercase">
            {experienceLabel}
          </p>
          <div className="space-y-1.5">
            <Bar width="w-4/5" />
            <Bar width="w-3/5" />
            <Bar width="w-2/3" />
          </div>
        </section>

        <section>
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary uppercase">
            {educationLabel}
          </p>
          <div className="space-y-1.5">
            <Bar width="w-3/4" />
            <Bar width="w-1/2" />
          </div>
        </section>

        <section>
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary uppercase">
            {skillsLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["w-14", "w-10", "w-16", "w-12"].map((width, i) => (
              <div key={i} className={`h-5 rounded-full bg-muted ${width}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
