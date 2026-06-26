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

const FEATURES = [
  {
    icon: QrCode,
    title: "6 xil QR turi",
    desc: "URL, matn, Wi-Fi, email, telefon va VCard",
  },
  {
    icon: Sparkles,
    title: "Har xil stillar",
    desc: "Doira, yumaloq, klassik va boshqa nuqta shakllari",
  },
  {
    icon: Palette,
    title: "Gradient ranglar",
    desc: "Chiziqli va doiraviy gradientlar, shablonlar",
  },
  {
    icon: Smartphone,
    title: "Logo qo'shish",
    desc: "Markazga rasm joylash, hajm va marginni sozlash",
  },
  {
    icon: Download,
    title: "PNG, JPG, SVG",
    desc: "Yuqori sifatli formatda yuklab olish",
  },
  {
    icon: UserRound,
    title: "49+ shriftlar",
    desc: "Google Fonts va tizim shriftlari bilan matn",
  },
];

const QR_TYPES = [
  { icon: QrCode, label: "URL" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Mail, label: "Email" },
  { icon: Phone, label: "Telefon" },
  { icon: UserRound, label: "VCard" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[128px]" />
      </div>

      {/* Hero */}
      <header className="relative pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Bepul & ochiq kodli
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              QR Code
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Har xil turdagi va stildagi QR kodlarni yarating. Doira, yumaloq, gradient —
            barcha sozlamalar bir joyda.
          </p>

          {/* Quick type badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {QR_TYPES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 text-sm"
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
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-violet-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/15 transition-colors">
                  <f.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative px-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* Generator Section */}
      <section className="relative px-6 py-16" id="generator">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              QR kod yaratish
            </h2>
            <p className="text-zinc-500">
              Ma&apos;lumotni kiriting, stilni tanlang va yuklab oling
            </p>
          </div>

          <QRGeneratorWrapper />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <QrCode className="w-4 h-4" />
            <span>QR Code Generator &copy; {new Date().getFullYear()}</span>
          </div>
          <p className="text-xs text-zinc-600">
            Barcha QR kodlar brauzeringizda yaratiladi. Hech qanday ma&apos;lumot serverga yuborilmaydi.
          </p>
        </div>
      </footer>
    </div>
  );
}
