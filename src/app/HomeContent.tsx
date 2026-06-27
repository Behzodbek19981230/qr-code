"use client";

import {
  QrCode,
  Palette,
  Smartphone,
  Download,
  Sparkles,
  Wifi,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import QRGeneratorWrapper from "@/components/qr/QRGeneratorWrapper";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DynamicSEO } from "@/components/DynamicSEO";
import { useLanguage } from "@/i18n/context";

export default function HomeContent() {
  const { t } = useLanguage();

  const FEATURES = [
    { icon: QrCode, title: t.featTypesTitle, desc: t.featTypesDesc },
    { icon: Sparkles, title: t.featStylesTitle, desc: t.featStylesDesc },
    { icon: Palette, title: t.featGradientTitle, desc: t.featGradientDesc },
    { icon: Smartphone, title: t.featLogoTitle, desc: t.featLogoDesc },
    { icon: Download, title: "PNG, JPG, SVG", desc: t.featDownloadDesc },
    { icon: UserRound, title: t.featFontsTitle, desc: t.featFontsDesc },
  ];

  const QR_TYPES = [
    { icon: QrCode, label: "URL" },
    { icon: Wifi, label: "Wi-Fi" },
    { icon: Mail, label: "Email" },
    { icon: Phone, label: t.qrPhone },
    { icon: UserRound, label: "VCard" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] overflow-x-hidden">
      <DynamicSEO />

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-[-5%] right-[15%] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[128px] animate-float-delayed" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] animate-float-slow" />
      </div>

      {/* Language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Hero */}
      <header className="relative pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-sm font-medium mb-8 animate-border-glow">
            <Sparkles className="w-4 h-4 animate-bounce-subtle" />
            {t.heroBadge}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            <span className="bg-linear-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              QR Code
            </span>
            <br />
            <span className="text-gradient-animated">Generator</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-300">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up delay-500">
            {QR_TYPES.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="qr-badge flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 text-sm cursor-default"
                style={{ animationDelay: `${0.6 + i * 0.08}s` }}
              >
                <Icon className="w-4 h-4 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="relative px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="feature-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative px-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent animate-divider-shimmer" />
        </div>
      </div>

      {/* Generator */}
      <section className="relative px-4 sm:px-6 py-16" id="generator">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.genTitle}</h2>
            <p className="text-zinc-500">{t.genSubtitle}</p>
          </div>
          <QRGeneratorWrapper />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] py-8 px-6 mt-8 animate-fade-in-up">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <QrCode className="w-4 h-4" />
            <span>QR Code Generator &copy; {new Date().getFullYear()}</span>
          </div>
          <p className="text-xs text-zinc-600">{t.footerPrivacy}</p>
        </div>
      </footer>
    </div>
  );
}
