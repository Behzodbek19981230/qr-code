"use client";

import dynamic from "next/dynamic";

const QRGenerator = dynamic(() => import("@/components/qr/QRGenerator"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin-slow" />
      </div>
      <p className="text-sm text-zinc-500 animate-pulse">Loading...</p>
    </div>
  ),
});

export default function QRGeneratorWrapper() {
  return <QRGenerator />;
}
