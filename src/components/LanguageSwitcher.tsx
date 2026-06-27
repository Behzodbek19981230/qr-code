"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import { LOCALES } from "@/i18n/translations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LOCALES.find(l => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-zinc-300 text-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-200"
      >
        <Globe className="w-4 h-4 text-violet-400" />
        <span className="hidden sm:inline">{current?.flag} {current?.name}</span>
        <span className="sm:hidden">{current?.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/15 bg-[#141428] backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in-up">
          <div className="max-h-[360px] overflow-y-auto py-1">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLocale(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  locale === l.code
                    ? "bg-violet-500/15 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="flex-1 text-left">{l.name}</span>
                {locale === l.code && <Check className="w-4 h-4 text-violet-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
