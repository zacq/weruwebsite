import { MetadataRoute } from "next";

const BASE = "https://werutv.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                    lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/tv`,            lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/radio`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: new Date(), changeFrequency: "hourly",  priority: 0.8 },
    { url: `${BASE}/studios`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/presenters`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
