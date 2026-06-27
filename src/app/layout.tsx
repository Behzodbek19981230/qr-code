import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/i18n/context";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://qrcode-gen.vercel.app"),
  title: {
    default: "QR Code Generator — Free Online QR Code Creator",
    template: "%s | QR Code Generator",
  },
  description:
    "Free QR code generator. Create custom QR codes for URL, text, Wi-Fi, email, phone, VCard with custom styles, gradients, logos. Download PNG, JPG, SVG.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
