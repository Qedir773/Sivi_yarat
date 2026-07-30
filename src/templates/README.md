# CV şablon qovluqları

Hər alt-qovluq bir CV şablonudur və avtomatik aşkarlanır — heç bir registry
faylını redaktə etmək lazım deyil. Yeni şablon əlavə etmək üçün:

```
src/templates/
  <template-id>/
    template.json   # metadata (aşağıda)
    Template.tsx     # default export: (props: { data: CVData }) => JSX
```

## `template.json`

```json
{
  "id": "modern-01",
  "name": "Modern Blue",
  "category": "modern",
  "primaryColor": "#0047FF",
  "secondaryColor": "#FFD700",
  "sidebar": "left",
  "photo": true,
  "columns": 2,
  "atsCompatible": true,
  "premium": false
}
```

- `id` qovluq adı ilə eyni olmalıdır (`src/lib/templates/discovery.ts` uyğunsuzluğu sükutla ötürür).
- `category` sərbəst mətndir — yeni kateqoriya üçün kod dəyişikliyi lazım deyil (`/templates` səhifəsi filtrləri məlumatdan avtomatik qurur).
- `premium` yalnız ilk seed üçün defolt qiymətdir — sonra `data/cvpro.db`-dəki `template_pricing` cədvəli əsas mənbədir (admin panel gələndə buradan idarə olunacaq).

## `Template.tsx`

Sadə, tipli React komponenti — sabit mətn yoxdur, hər şey `data: CVData`-dan gəlir:

```tsx
import type { CVData } from "@/types/cv";
import { TemplateSection, Avatar, formatDateRange } from "@/components/templates/shared";

export default function Template({ data }: { data: CVData }) {
  return <div>{data.personalInfo.fullName}</div>;
}
```

Təkrarlanan bölmələr (`experience`, `education`, `skills` və s.) adi `.map()` ilə göstərilir. Ümumi tikinti blokları (`TemplateSection`, `Avatar`, `SkillBar`, `SkillDots`, `formatDateRange`) `@/components/templates/shared`-dən idxal olunur.

Qovluğu atmaq kifayətdir — dev serverində dərhal, production-da növbəti build-də şablon `/templates` qalereyasında görünür.
