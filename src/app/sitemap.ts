import { MetadataRoute } from "next";

const BASE = "https://werudigital.co.ke";

const PRESENTER_SLUGS = [
  "nelly-githinji", "martin-gichunge", "mc-tash", "makena-wa-matiri",
  "edward-mutembei", "munene-wa-kagwi", "mwenda-h-pilot", "ajelyne-george",
  "stella-karimi", "empress-rita-natty", "betty", "ntinyari-kinyua",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const presenterPages: MetadataRoute.Sitemap = PRESENTER_SLUGS.map((slug) => ({
    url: `${BASE}/presenters/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE,                    lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/tv`,            lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/radio`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: new Date(), changeFrequency: "hourly",  priority: 0.8 },
    { url: `${BASE}/podcast`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/quiz`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/presenters`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/studios`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/gallery`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/advertise`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...presenterPages,
  ];
}
