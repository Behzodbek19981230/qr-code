"use client";

import dynamic from "next/dynamic";

const QRGenerator = dynamic(() => import("@/components/qr/QRGenerator"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-40">
      <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
    </div>
  ),
});

export default function QRGeneratorWrapper() {
  return <QRGenerator />;
}
