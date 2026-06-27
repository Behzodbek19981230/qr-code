"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, LOCALES, type Locale, type TranslationKeys } from "./translations";

const TIMEZONE_LOCALE: Record<string, Locale> = {
  "Asia/Tashkent": "uz", "Asia/Samarkand": "uz",
  "Europe/Moscow": "ru", "Europe/Samara": "ru", "Europe/Volgograd": "ru", "Europe/Kaliningrad": "ru",
  "Asia/Yekaterinburg": "ru", "Asia/Omsk": "ru", "Asia/Novosibirsk": "ru", "Asia/Krasnoyarsk": "ru",
  "Asia/Irkutsk": "ru", "Asia/Yakutsk": "ru", "Asia/Vladivostok": "ru", "Asia/Magadan": "ru", "Asia/Kamchatka": "ru",
  "Europe/Minsk": "ru", "Asia/Almaty": "ru", "Asia/Aqtobe": "ru", "Asia/Aqtau": "ru", "Asia/Atyrau": "ru", "Asia/Oral": "ru",
  "Asia/Bishkek": "ru", "Asia/Dushanbe": "ru", "Asia/Ashgabat": "ru",
  "Europe/Istanbul": "tr",
  "Asia/Tokyo": "ja",
  "Asia/Seoul": "ko",
  "Asia/Shanghai": "zh", "Asia/Chongqing": "zh", "Asia/Harbin": "zh", "Asia/Urumqi": "zh", "Asia/Hong_Kong": "zh", "Asia/Taipei": "zh",
  "Europe/Berlin": "de", "Europe/Vienna": "de", "Europe/Zurich": "de",
  "Europe/Paris": "fr", "Europe/Brussels": "fr",
  "Europe/Madrid": "es", "Atlantic/Canary": "es", "America/Mexico_City": "es", "America/Bogota": "es",
  "America/Argentina/Buenos_Aires": "es", "America/Santiago": "es", "America/Lima": "es",
  "Asia/Riyadh": "ar", "Asia/Dubai": "ar", "Asia/Qatar": "ar", "Asia/Bahrain": "ar", "Asia/Kuwait": "ar",
  "Africa/Cairo": "ar", "Africa/Tripoli": "ar", "Africa/Tunis": "ar", "Africa/Algiers": "ar", "Africa/Casablanca": "ar",
};

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem("qr-locale");
  if (saved && saved in translations) return saved as Locale;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_LOCALE[tz]) return TIMEZONE_LOCALE[tz];
  } catch {}

  try {
    const langs = navigator.languages || [navigator.language];
    for (const lang of langs) {
      const code = lang.split("-")[0].toLowerCase();
      if (code in translations) return code as Locale;
    }
  } catch {}

  return "en";
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    const info = LOCALES.find(l => l.code === locale);
    document.documentElement.dir = info?.dir || "ltr";
  }, [locale, mounted]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("qr-locale", l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
