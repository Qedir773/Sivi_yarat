# CV Pro

Pulsuz, local-first, açıq mənbəli komponentlərlə qurulan professional CV Builder.
İş adı **CV Pro** — bütün branding `src/config/site.ts` faylından idarə olunur, ad sonradan asanlıqla dəyişdirilə bilər.

## Məqsəd

İstifadəçi qeydiyyatsız və ödənişsiz saytа daxil olub bir neçə dəqiqəyə professional CV hazırlaya bilsin: şablon seçsin, məlumatlarını daxil etsin, canlı preview görsün və PDF export etsin. Əlavə funksiyalar (DOCX, geniş ATS, iş elanı uyğunluğu, QR kod və s.) Pro paket altında təklif olunur. Layihə zero-cost/open-source-first prinsipi ilə qurulur — məcburi ödənişli backend, database və ya API yoxdur.

## Texnologiya Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui (Base UI əsaslı)
- lucide-react (ikonlar)
- next-themes (dark mode)

Növbəti fazalarda əlavə olunacaq: React Hook Form + Zod (formlar), Zustand (state), Dexie/IndexedDB (local storage), jsPDF (PDF export), docx (DOCX export), dnd-kit (drag & drop).

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## Arxitektura

```
src/
  app/            Next.js route-ları (App Router)
  components/
    ui/           shadcn/ui primitiv komponentləri
    layout/       Header, Footer, ThemeProvider və s.
    cv/           CV render komponentləri (gələcək faza)
    templates/    8 CV şablonu (Professional/Modern/Minimal/ATS/Akademik/Kreativ/Tələbə/IT) + qalereya
    editor/       Builder editor komponentləri (gələcək faza)
    forms/        Form bölmələri (gələcək faza)
    pricing/      Pricing UI (gələcək faza)
    admin/        Admin panel UI (gələcək faza)
  features/       Domain-səviyyəli məntiq (cv, templates, export, ats, pricing, ads)
  lib/mock/       Şablon preview-ları üçün nümunə CV datası
  lib/            db, validation, export, security, utils
  store/          Zustand store-ları (gələcək faza)
  types/          Paylaşılan TypeScript tipləri
  config/         site.ts və digər config-driven ayarlar
  locales/        az.json, tr.json, en.json, ru.json + i18n helper-lər
  hooks/          Paylaşılan React hook-lar
```

## Branding / Config

Sayt adı, açıqlama, default dil, valyuta (AZN), naviqasiya və footer linkləri `src/config/site.ts`-dən idarə olunur — komponentlərin içində hardcode edilmir.

## Çoxdillilik

Bütün istifadəçiyə görünən mətnlər `src/locales/*.json` açar-dəyər cütləri ilə saxlanılır və `src/lib/i18n.ts`-dəki tipli `createTranslator()` vasitəsilə oxunur. Default dil: Azərbaycan (`az`). Dəstəklənən dillər: `az`, `tr`, `en`, `ru`.

## Local-first / Privacy

Sistem server database tələb etmir — istifadəçi CV-ləri brauzerdə (IndexedDB) saxlanılacaq (gələcək faza). Foto yükləmə və CV məlumatları üçüncü tərəfə göndərilmir.

## Ödəniş / Pro sistemi

İlkin versiyada real ödəniş provideri qoşulmayıb. `PaymentProvider` adapter pattern (gələcək faza) yalnız development üçün Mock Payment Provider ilə işləyəcək — real ödəniş etmir. Qiymətlər (AZN) hardcode edilməyəcək, admin panel konfiqurasiyasından oxunacaq.

## Environment Variables

Hazırda məcburi environment variable yoxdur. `.env.example` faylı gələcək inteqrasiyalar üçün nümunə saxlayır — real secret dəyər saxlamayın.

## Faza Statusu

- [x] Phase 1 — Project setup
- [x] Phase 2 — Landing page
- [x] Phase 3 — Template system
- [ ] Phase 4+ — CV data editor, local storage, PDF/DOCX export, ATS, pricing, admin panel
