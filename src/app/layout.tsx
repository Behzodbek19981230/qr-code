import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Code Generator — Har xil stildagi QR kodlar",
  description:
    "Bepul QR kod yaratish konstruktori. URL, matn, Wi-Fi, email, telefon, VCard. Doira, yumaloq, klassik stillar. Gradient, logo, yuklab olish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
