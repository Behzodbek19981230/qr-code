import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://qrcode-gen.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          uz: "https://qrcode-gen.vercel.app",
          ru: "https://qrcode-gen.vercel.app",
          en: "https://qrcode-gen.vercel.app",
          tr: "https://qrcode-gen.vercel.app",
          de: "https://qrcode-gen.vercel.app",
          fr: "https://qrcode-gen.vercel.app",
          es: "https://qrcode-gen.vercel.app",
          zh: "https://qrcode-gen.vercel.app",
          ja: "https://qrcode-gen.vercel.app",
          ko: "https://qrcode-gen.vercel.app",
          ar: "https://qrcode-gen.vercel.app",
        },
      },
    },
  ];
}
