"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLoginForm({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = use(searchParams);
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, next: params.next }),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string; redirect?: string };
        if (!res.ok || !data.ok) {
          setError(data.error ?? "Giriş uğursuz oldu");
          return;
        }
        router.push(data.redirect ?? "/admin");
        router.refresh();
      } catch {
        setError("Şəbəkə xətası");
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-xl border border-border/60 bg-background p-8 shadow-sm"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="size-5" aria-hidden="true" />
          </span>
          <h1 className="text-lg font-semibold tracking-tight">Admin girişi</h1>
          <p className="text-center text-sm text-muted-foreground">
            Davam etmək üçün admin token-i daxil edin.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="admin-token" className="text-sm font-medium">
            Token
          </label>
          <input
            id="admin-token"
            name="token"
            type="password"
            autoComplete="current-password"
            required
            minLength={1}
            maxLength={256}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={isPending || token.length === 0} className="w-full">
          {isPending ? "Yoxlanılır…" : "Daxil ol"}
        </Button>
      </form>
    </div>
  );
}
