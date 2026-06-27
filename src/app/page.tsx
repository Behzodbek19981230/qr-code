import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "QR Code Generator — Free Online QR Code Creator | Bepul QR Kod",
  description:
    "Free QR code generator. Create custom QR codes for URL, text, Wi-Fi, email, phone, VCard. Circle, rounded, classic styles. Gradient, logo, download PNG/SVG. Bepul QR kod yaratish. Бесплатный генератор QR-кодов.",
  keywords: [
    "QR code generator", "QR code maker", "free QR code", "QR code online",
    "URL QR code", "Wi-Fi QR code", "VCard QR", "custom QR code",
    "QR code with logo", "QR code gradient", "QR code styles",
    "download QR code", "PNG QR", "SVG QR",
    "QR kod", "QR kod yaratish", "bepul QR kod", "QR kod generator",
    "генератор QR кодов", "QR код бесплатно", "создать QR код",
    "QR kod oluşturucu", "QR Code erstellen", "générateur QR code",
    "generador código QR", "二维码生成器", "QRコード作成",
    "QR 코드 생성기", "مولد رموز QR",
  ],
  authors: [{ name: "QR Code Generator" }],
  creator: "QR Code Generator",
  publisher: "QR Code Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["uz_UZ", "ru_RU", "tr_TR", "de_DE", "fr_FR", "es_ES", "zh_CN", "ja_JP", "ko_KR", "ar_SA"],
    title: "QR Code Generator — Free Online QR Code Creator",
    description: "Free QR code generator with custom styles, gradients, logos. Create QR codes for URL, text, Wi-Fi, email, phone, VCard. Download PNG, JPG, SVG.",
    siteName: "QR Code Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator — Free Online QR Code Creator",
    description: "Free QR code generator with custom styles, gradients, logos. Create QR codes for URL, Wi-Fi, VCard and more.",
  },
  alternates: {
    canonical: "/",
    languages: {
      "uz": "/",
      "ru": "/",
      "en": "/",
      "tr": "/",
      "de": "/",
      "fr": "/",
      "es": "/",
      "zh": "/",
      "ja": "/",
      "ko": "/",
      "ar": "/",
      "x-default": "/",
    },
  },
  category: "technology",
  other: {
    "google": "notranslate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator",
  alternateName: ["QR Kod Generator", "Генератор QR-кодов", "QR Kod Oluşturucu", "QR-Code Generator", "Générateur QR Code", "Generador QR", "二维码生成器", "QRコードジェネレーター", "QR 코드 생성기", "مولد QR"],
  description: "Free online QR code generator. Create custom QR codes for URL, text, Wi-Fi, email, phone, VCard with custom styles, gradients, and logos.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "URL QR codes", "Text QR codes", "Wi-Fi QR codes", "Email QR codes",
    "Phone QR codes", "VCard QR codes", "Custom dot styles", "Gradient colors",
    "Logo embedding", "PNG download", "JPG download", "SVG download",
    "49+ fonts", "8 color templates",
  ],
  inLanguage: ["en", "uz", "ru", "tr", "de", "fr", "es", "zh", "ja", "ko", "ar"],
  isAccessibleForFree: true,
  browserRequirements: "Requires JavaScript",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
