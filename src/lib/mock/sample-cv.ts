import type { CVData } from "@/types/cv";

export const samplePhotoUrls = [
  "/sample-photos/sample-photo-1.jpg",
  "/sample-photos/sample-photo-2.jpg",
  "/sample-photos/sample-photo-3.jpg",
];

export const sampleCV: CVData = {
  personalInfo: {
    fullName: "Aysel Məmmədova",
    title: "Marketinq Meneceri",
    email: "aysel.mammadova@example.com",
    phone: "+994 50 123 45 67",
    location: "Bakı, Azərbaycan",
    website: "aysel-mammadova.com",
  },
  summary:
    "6 illik təcrübəyə malik marketinq meneceri. Rəqəmsal kampaniyaların planlaması, komanda idarəetməsi və brend strategiyası sahəsində güclü nəticələr göstərmişəm.",
  experience: [
    {
      id: "exp-1",
      company: "Bakı Tech MMC",
      role: "Marketinq Meneceri",
      location: "Bakı",
      startDate: "2022-03",
      current: true,
      description:
        "Rəqəmsal marketinq strategiyasının qurulması və komandanın idarə olunması.",
      highlights: [
        "İllik marketinq büdcəsini 30% səmərəli idarə etdim",
        "Sosial media auditoriyasını 2 ildə 4 dəfə artırdım",
        "5 nəfərlik marketinq komandasına rəhbərlik etdim",
      ],
    },
    {
      id: "exp-2",
      company: "Caspian Digital",
      role: "Marketinq Mütəxəssisi",
      location: "Bakı",
      startDate: "2019-06",
      endDate: "2022-02",
      description: "Kampaniya planlaması və analitika üzrə məsuliyyət daşıdım.",
      highlights: [
        "10+ uğurlu rəqəmsal kampaniya həyata keçirdim",
        "E-poçt marketinqində açılma faizini 18%-ə qaldırdım",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Bakı Dövlət Universiteti",
      degree: "Magistr",
      field: "Biznes İdarəetməsi",
      startDate: "2017-09",
      endDate: "2019-06",
    },
    {
      id: "edu-2",
      institution: "Azərbaycan Dövlət İqtisad Universiteti",
      degree: "Bakalavr",
      field: "Marketinq",
      startDate: "2013-09",
      endDate: "2017-06",
    },
  ],
  skills: [
    { id: "sk-1", name: "Rəqəmsal Marketinq", level: 5 },
    { id: "sk-2", name: "SEO / SEM", level: 4 },
    { id: "sk-3", name: "Komanda İdarəetməsi", level: 4 },
    { id: "sk-4", name: "Google Analytics", level: 4 },
    { id: "sk-5", name: "Sosial Media Strategiyası", level: 5 },
    { id: "sk-6", name: "Büdcə Planlaması", level: 3 },
  ],
  languages: [
    { id: "lang-1", name: "Azərbaycan dili", level: "Ana dili" },
    { id: "lang-2", name: "İngilis dili", level: "C1" },
    { id: "lang-3", name: "Rus dili", level: "B2" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Brend Yenidənqurma Kampaniyası",
      description: "Şirkətin vizual kimliyinin və mesajlaşma strategiyasının yenilənməsi.",
    },
  ],
  certifications: [
    { id: "cert-1", name: "Google Analytics Sertifikatı", issuer: "Google", date: "2023" },
    { id: "cert-2", name: "HubSpot Content Marketing", issuer: "HubSpot", date: "2022" },
  ],
};
