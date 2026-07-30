# CV Pro

Pulsuz, local-first, açıq mənbəli komponentlərlə qurulan professional CV Builder.
İş adı **CV Pro** — bütün branding `src/config/site.ts` faylından idarə olunur, ad sonradan asanlıqla dəyişdirilə bilər.

## Məqsəd

İstifadəçi qeydiyyatsız və ödənişsiz saytа daxil olub bir neçə dəqiqəyə professional CV hazırlaya bilsin: şablon seçsin, məlumatlarını daxil etsin, canlı preview görsün, PDF/DOCX export etsin, ATS analizi və AI köməyi (motivasiya məktubu, mətn təkmilləşdirmə, foto fonu silmə, QR kod) alsın. Layihə zero-cost/open-source-first prinsipi ilə qurulur — məcburi ödənişli backend, database, API açarı və ya xarici AI xidməti yoxdur; bütün AI funksiyaları brauzerdə, açıq mənbəli modellərlə işləyir.

## Texnologiya Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui (Base UI əsaslı)
- lucide-react (ikonlar)
- next-themes (dark mode)
- node:sqlite (yerli DB — template pricing/admin-configurable bayraqlar)
- Framer Motion (animasiyalar)
- html2canvas (PNG export)
- React Hook Form + Zod (CV redaktoru formu və validasiya)
- react-easy-crop (foto kəsmə/zoom/rotate)
- docx (DOCX export) + brauzerin native print-to-PDF-i (PDF export)
- Dexie (IndexedDB) — çoxlu CV dəstəyi (/my-cvs)
- dnd-kit (drag & drop sıralama)
- `@huggingface/transformers` (transformers.js) — brauzer-daxili (client-side), açıq mənbəli AI:
  mətn generasiyası (`onnx-community/Qwen2.5-0.5B-Instruct`) və foto fonu silmə (`Xenova/modnet`),
  hər ikisi Apache-2.0, sıfır server xərci, API açarı tələb etmir
- `qrcode` — CV şablonlarında portfolio/LinkedIn linki üçün QR kod

Növbəti fazalarda əlavə olunacaq: Zustand (admin panel state), real Payment Provider inteqrasiyası.

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
  templates/      Hər qovluq bir CV şablonu (bax: src/templates/README.md)
                  <id>/template.json + Template.tsx — avtomatik aşkarlanır,
                  registry faylı redaktə etmək lazım deyil
  components/
    ui/           shadcn/ui primitiv komponentləri (Button, Dialog, Sheet, s.)
    layout/       Header, Footer, ThemeProvider və s.
    templates/    shared.tsx (bütün şablonlar üçün ortaq bloklar, o cümlədən WebsiteQrCode) +
                  gallery.tsx + qr-code.tsx (brauzerdaxili QR kod, "qrcode" paketi)
    editor/       cv-editor.tsx (orkestrator), photo-crop-dialog.tsx (+ foto fonu silmə),
                  ats-panel.tsx, ai-enhance-button.tsx — "AI ilə Gücləndir" mətn təkmilləşdirici
    forms/        Hər CVData bölməsi üçün ayrıca form komponenti (RHF+Zod),
                  sortable-field-list.tsx — dnd-kit drag & drop sıralama sarğısı
    admin/        admin-panel.tsx — şablon Free/Pro toggle + Pro qiymət redaktəsi
    my-cvs/       my-cvs-manager.tsx — çoxlu CV siyahısı (yarat/aç/kopyala/sil)
    cover-letter/ cover-letter-generator.tsx — AI Motivasiya Məktubu Generatoru
    cv/           CV render komponentləri (gələcək faza)
  features/       Domain-səviyyəli məntiq
    ats/          analyze.ts — client-side ATS bal hesablama (completeness + açar söz uyğunluğu)
    ai/           types.ts + registry.ts (provider abstraksiyası) + providers/
                  local-text-generation-provider.ts — @huggingface/transformers,
                  onnx-community/Qwen2.5-0.5B-Instruct, tamamilə brauzerdə, API açarı yoxdur
  lib/
    db/           node:sqlite client + template_pricing və site_settings (Pro qiymət) sorğuları
    templates/    Filesystem auto-discovery (discovery.ts) + dinamik komponent loader
    storage/      cv-draft.ts (tək draft, localStorage) + cv-database.ts (Dexie/IndexedDB,
                  çoxlu adlandırılmış CV)
    validation/   Zod sxemləri (cv-schema.ts) + form<->CVData çevrilməsi
    image/        crop-image.ts (canvas əsaslı foto kəsmə/döndürmə) +
                  remove-background.ts (@huggingface/transformers, Xenova/modnet)
    export/       docx-export.ts — CVData -> Word sənədi
    mock/         Şablon preview-ları üçün nümunə CV datası
    security, utils
  app/
    admin/        actions.ts (Server Actions) + page.tsx
    my-cvs/       page.tsx — /my-cvs route
    cover-letter/ page.tsx — /cover-letter route
  store/          Zustand store-ları (gələcək faza)
  types/          Paylaşılan TypeScript tipləri
  config/         site.ts və digər config-driven ayarlar
  locales/        az.json, tr.json, en.json, ru.json + i18n helper-lər
  hooks/          Paylaşılan React hook-lar
data/
  cvpro.db        Runtime SQLite faylı (gitignored, ilk işə düşmədə seed olunur)
```

## Branding / Config

Sayt adı, açıqlama, default dil, valyuta (AZN), naviqasiya və footer linkləri `src/config/site.ts`-dən idarə olunur — komponentlərin içində hardcode edilmir.

## Çoxdillilik

Bütün istifadəçiyə görünən mətnlər `src/locales/*.json` açar-dəyər cütləri ilə saxlanılır və `src/lib/i18n.ts`-dəki tipli `createTranslator()` vasitəsilə oxunur. Default dil: Azərbaycan (`az`). Dəstəklənən dillər: `az`, `tr`, `en`, `ru`.

## Local-first / Privacy

İki paralel saxlama rejimi var, ikisi də tamamilə lokaldır (server-ə heç nə göndərilmir): birbaşa `/builder`-ə keçəndə (məs. `/templates`-dən) tək CV `localStorage`-da (`cvpro:draft`) avtomatik saxlanılır; `/my-cvs`-dən adlandırılmış bir CV açılanda (`?cv=<id>`) isə həmin CV Dexie/IndexedDB-də ayrıca qeyd kimi saxlanılır — bu, çoxlu adlandırılmış CV-yə imkan verir. Foto yükləmə brauzerdə base64 data URL kimi işlənir, üçüncü tərəfə göndərilmir.

## Ödəniş / Pro sistemi

İlkin versiyada real ödəniş provideri qoşulmayıb. `PaymentProvider` adapter pattern (gələcək faza) yalnız development üçün Mock Payment Provider ilə işləyəcək — real ödəniş etmir. Qiymətlər (AZN) hardcode edilməyəcək, admin panel konfiqurasiyasından oxunacaq.

## Environment Variables

Hazırda məcburi environment variable yoxdur. `.env.example` faylı gələcək inteqrasiyalar üçün nümunə saxlayır — real secret dəyər saxlamayın.

## Faza Statusu

- [x] Phase 1 — Project setup
- [x] Phase 2 — Landing page
- [x] Phase 3 — Template system
- [x] Phase 4 — CV data editor (React Hook Form + Zod), canlı preview, localStorage autosave
- [x] Phase 5 — PDF export (print-to-PDF), DOCX export (docx), foto kəsmə/zoom/rotate (react-easy-crop)
- [x] Phase 6 — Genişləndirilmiş ATS analizi (client-side bal + açar söz uyğunluğu), Pro qiymət (DB-driven) + Pricing səhifəsi, Admin panel (/admin)
- [x] Phase 7 — Dexie/IndexedDB ilə çoxlu CV dəstəyi (/my-cvs: yarat/aç/kopyala/sil), form bölmələrində drag & drop sıralama (dnd-kit)
- [x] Phase 8 — Client-side AI modulları: Motivasiya Məktubu Generatoru (/cover-letter), "AI ilə Gücləndir" mətn təkmilləşdirici (Xülasə + Təcrübə təsviri), foto fonunu silmə (foto kəsmə dialoqunda), QR kod (professional-1 şablonunda, portfolio linki üçün) — hamısı brauzerdaxili, sıfır server xərci
- [ ] Phase 9+ — real Payment Provider inteqrasiyası, Zustand (admin panel state)
