import { z } from "zod";

/**
 * Server-side environment variable schema.
 * Validated once on first import; throws at startup if invalid.
 *
 * NOTE: This file is server-only — never import from client components.
 * Public (NEXT_PUBLIC_*) vars live in `publicEnv.ts`.
 */
const serverSchema = z.object({
  // Admin panel üçün gizli açar. Təyin olunmasa admin route-ları 403 qaytarır.
  // Production üçün minimum 32 simvol tövsiyə olunur — lakin local dev-də
  // qısa token-lərə də icazə verilir (min 4).
  ADMIN_SECRET: z.string().min(4).optional(),

  // OpenRouter API açarı (Gemini + digər modellər üçün). Pulsuz açar:
  // https://openrouter.ai/keys
  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_MODEL: z.string().default("google/gemma-4-31b-it:free"),

  // Köhnə Google Gemini direct açarı (artıq istifadə olunmur, lakin
  // köhnə açarları olan developerlər üçün saxlanılıb).
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `[env] Invalid server environment variables:\n${issues}\n` +
        `Check .env.example for the expected shape.`,
    );
  }
  cached = parsed.data;
  return cached;
}
