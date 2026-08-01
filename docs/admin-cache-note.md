# Admin panel — server actions və cache

## Problem (2026-08-02)

Admin panel-də şablon sırasını dəyişəndə (drag-drop) və ya Pro toggle edəndə dəyişiklik DB-yə yazılırdı, amma `/templates` və `/v2/templates` public səhifələri köhnə sıranı göstərirdi. Səhifəni manual refresh etsən də köhnə qalırdı.

## Səbəb

`src/app/admin/actions.ts` server action-unda `revalidateTag("templates", "max")` çağırılırdı, amma bu layihədə **heç bir data fetching** `cacheTag("templates")` çağırmır, `'use cache'` direktivi yoxdur, `unstable_cache` ilə sarılmır.

`/templates` və `/v2/templates` server component-ləri `getTemplateOrder()`-u birbaşa SQLite-dan oxuyur. Next.js bu səhifələri **statik** olaraq build vaxtı render edib `.next/server/app/{,v2/}templates.html` fayllarına yazır. `revalidateTag` heç bir cache-ə toxunmur (uyğun tag yoxdur), statik HTML isə heç vaxt yenilənmir.

Build çıxışı:
```
.next/server/app/templates.html       ← statik, heç vaxt dəyişmir
.next/server/app/v2/templates.html    ← statik, heç vaxt dəyişmir
```

## Həll

`revalidateTag` əvəzinə `revalidatePath` istifadə et — page-level (Full Route) cache-ini birbaşa invalidate edir, heç bir tag tələb etmir.

```ts
function refreshTemplatePages() {
  revalidatePath("/templates");
  revalidatePath("/v2/templates");
}
```

Hər 3 server action (`updateTemplateOrder`, `updateTemplatePricing`, `updateProPrice`) bu helper-i çağırır.

## Əlavə olunan UX feedback

Admin panel-də əvvəl yalnız price input-da "Yadda saxlanıldı" görünürdü. İndi:

- Şablonlar card-ında sıra dəyişəndə → yaşıl **"Yadda saxlanıldı"**
- Pro toggle edəndə → yaşıl **"Yadda saxlanıldı"**
- Server xətası (auth, validation) → qırmızı **"Yadda saxlanmadı — sessiyanız bitmiş ola bilər, səhifəni yeniləyin."**

## Niyə bu baş verdi?

`revalidateTag` yalnız **`'use cache'` direktivli** və ya `unstable_cache(..., { tags: [...] })` ilə sarılmış funksiyaları invalidate edir. Bu layihədə həmin iki mexanizmdən heç biri istifadə olunmur — bütün data fetching birbaşa SQLite-dan sync oxunur. Bu da o deməkdir ki, səhifələr default olaraq static render olunur və yalnız `revalidatePath` onlara çata bilir.

Gələcəkdə hər hansı digər data source əlavə edəndə: əgər `fetch()` ilə uzaq API oxunursa və ya `unstable_cache` ilə sarınmış funksiya varsa, `revalidateTag` istifadə etmək olar. Əks halda `revalidatePath` həmişə doğru seçimdir.
