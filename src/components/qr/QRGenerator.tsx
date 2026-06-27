"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  Link,
  Type,
  Wifi,
  Mail,
  Phone,
  UserRound,
  Palette,
  Image as ImageIcon,
  Download,
  Sparkles,
  Zap,
  X,
  Ruler,
  ChevronRight,
  ChevronLeft,
  Check,
  Database,
  Eye,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { StylePicker } from "./StylePicker";
import { ColorInput } from "./ColorInput";
import {
  DOT_STYLES,
  CORNER_SQUARE_STYLES,
  CORNER_DOT_STYLES,
  TEMPLATES,
  FONTS,
} from "./constants";
import { useLanguage } from "@/i18n/context";
import type { TranslationKeys } from "@/i18n/translations";
import type QRCodeStyling from "qr-code-styling";

const loadedFonts = new Set<string>();
function loadGoogleFont(fontName: string) {
  if (typeof window === "undefined" || loadedFonts.has(fontName)) return;
  loadedFonts.add(fontName);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}

function findGoogleFont(fontValue: string): string | undefined {
  for (const group of FONTS) {
    for (const font of group.fonts) {
      if (font.value === fontValue && "gfont" in font) {
        return (font as { gfont: string }).gfont;
      }
    }
  }
  return undefined;
}

const STYLE_LABEL_MAP: Record<string, keyof TranslationKeys> = {
  square: "styleSquare",
  dots: "styleCircle",
  dot: "styleCircle",
  rounded: "styleRounded",
  "extra-rounded": "styleExtraRounded",
  classy: "styleClassy",
  "classy-rounded": "styleClassyRounded",
};

const TMPL_LABEL_MAP: Record<string, keyof TranslationKeys> = {
  classic: "tmplClassic",
  ocean: "tmplOcean",
  sunset: "tmplSunset",
  forest: "tmplForest",
  royal: "tmplRoyal",
  dark: "tmplDark",
  neon: "tmplNeon",
  rose: "tmplRose",
};

export default function QRGenerator() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("url");

  const [url, setUrl] = useState("https://example.com");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const [emailAddr, setEmailAddr] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phone, setPhone] = useState("");
  const [vcardFirst, setVcardFirst] = useState("");
  const [vcardLast, setVcardLast] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardOrg, setVcardOrg] = useState("");
  const [vcardUrl, setVcardUrl] = useState("");

  const [dotStyle, setDotStyle] = useState("square");
  const [cornerSquareStyle, setCornerSquareStyle] = useState("square");
  const [cornerDotStyle, setCornerDotStyle] = useState("square");

  const [template, setTemplate] = useState("classic");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [useGradient, setUseGradient] = useState(false);
  const [gradType, setGradType] = useState("linear");
  const [gradColor1, setGradColor1] = useState("#7b2ff7");
  const [gradColor2, setGradColor2] = useState("#00d2ff");
  const [gradRotation, setGradRotation] = useState(45);
  const [useCornerColor, setUseCornerColor] = useState(false);
  const [cornerSqColor, setCornerSqColor] = useState("#7b2ff7");
  const [cornerDotColor, setCornerDotColor] = useState("#00d2ff");

  const [qrSize, setQrSize] = useState(300);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(22);
  const [logoMargin, setLogoMargin] = useState(5);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [bottomText, setBottomText] = useState("");
  const [textSize, setTextSize] = useState(18);
  const [textFont, setTextFont] = useState("'Segoe UI', sans-serif");

  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const [generated, setGenerated] = useState(false);
  const [qrData, setQrData] = useState("");

  const steps = useMemo(() => [
    { id: 1, label: t.stepData, shortLabel: t.stepData, icon: Database, desc: t.stepDataDesc },
    { id: 2, label: t.stepStyle, shortLabel: t.stepStyle, icon: Sparkles, desc: t.stepStyleDesc },
    { id: 3, label: t.stepColor, shortLabel: t.stepColor, icon: Palette, desc: t.stepColorDesc },
    { id: 4, label: t.stepResult, shortLabel: t.stepResult, icon: Eye, desc: t.stepResultDesc },
  ], [t]);

  const sl = useCallback((v: string) => t[STYLE_LABEL_MAP[v] || "styleSquare"], [t]);

  const getQRData = useCallback(() => {
    switch (activeTab) {
      case "url": return url || "https://example.com";
      case "text": return text || "Hello World";
      case "wifi": return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};;`;
      case "email": return `mailto:${emailAddr}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "phone": return `tel:${phone}`;
      case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardLast};${vcardFirst}\nFN:${vcardFirst} ${vcardLast}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardOrg}\nURL:${vcardUrl}\nEND:VCARD`;
      default: return "";
    }
  }, [activeTab, url, text, wifiSsid, wifiPassword, wifiEncryption, wifiHidden, emailAddr, emailSubject, emailBody, phone, vcardFirst, vcardLast, vcardPhone, vcardEmail, vcardOrg, vcardUrl]);

  const generateQR = useCallback(async () => {
    const data = getQRData();
    setQrData(data);
    const QRCodeStylingLib = (await import("qr-code-styling")).default;

    const dotsOptions: Record<string, unknown> = { type: dotStyle };
    if (useGradient) {
      dotsOptions.gradient = { type: gradType, rotation: (gradRotation * Math.PI) / 180, colorStops: [{ offset: 0, color: gradColor1 }, { offset: 1, color: gradColor2 }] };
    } else {
      dotsOptions.color = fgColor;
    }

    const cornersSquareOptions: Record<string, unknown> = { type: cornerSquareStyle };
    if (useCornerColor) cornersSquareOptions.color = cornerSqColor;
    else if (useGradient) cornersSquareOptions.gradient = dotsOptions.gradient;
    else cornersSquareOptions.color = fgColor;

    const cornersDotOptions: Record<string, unknown> = { type: cornerDotStyle };
    if (useCornerColor) cornersDotOptions.color = cornerDotColor;
    else if (useGradient) cornersDotOptions.gradient = dotsOptions.gradient;
    else cornersDotOptions.color = fgColor;

    const config: Record<string, unknown> = {
      width: qrSize, height: qrSize, data, margin: 8,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions, cornersSquareOptions, cornersDotOptions,
      backgroundOptions: { color: bgColor },
      imageOptions: { hideBackgroundDots: true, imageSize: logoSize / 100, margin: logoMargin, crossOrigin: "anonymous" },
    };
    if (logoUrl) config.image = logoUrl;
    if (qrRef.current) qrRef.current.innerHTML = "";

    const qr = new QRCodeStylingLib(config);
    qrInstanceRef.current = qr;
    if (qrRef.current) qr.append(qrRef.current);
    setGenerated(true);
  }, [getQRData, dotStyle, cornerSquareStyle, cornerDotStyle, useGradient, gradType, gradRotation, gradColor1, gradColor2, fgColor, bgColor, useCornerColor, cornerSqColor, cornerDotColor, qrSize, logoUrl, logoSize, logoMargin]);

  const downloadQR = useCallback(async (extension: "png" | "jpeg" | "svg") => {
    if (!qrInstanceRef.current) return;
    if (!bottomText) { qrInstanceRef.current.download({ name: "qrcode", extension: extension === "jpeg" ? "jpeg" : extension }); return; }
    const qrCanvas = qrRef.current?.querySelector("canvas");
    if (!qrCanvas) { qrInstanceRef.current.download({ name: "qrcode", extension }); return; }
    const padding = 20; const textPadding = textSize + 16;
    const totalW = qrSize + padding * 2; const totalH = qrSize + padding * 2 + textPadding;
    const canvas = document.createElement("canvas"); canvas.width = totalW; canvas.height = totalH;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = bgColor; ctx.fillRect(0, 0, totalW, totalH);
    ctx.drawImage(qrCanvas, padding, padding, qrSize, qrSize);
    ctx.fillStyle = useGradient ? gradColor1 : fgColor;
    ctx.font = `${textSize}px ${textFont}`; ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(bottomText, totalW / 2, qrSize + padding + 8);
    const link = document.createElement("a");
    link.href = canvas.toDataURL(extension === "jpeg" ? "image/jpeg" : "image/png", 0.95);
    link.download = `qrcode.${extension === "jpeg" ? "jpg" : extension}`; link.click();
  }, [bottomText, textSize, textFont, qrSize, bgColor, fgColor, useGradient, gradColor1]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onload = (ev) => setLogoUrl(ev.target?.result as string); reader.readAsDataURL(file); }
  };

  const handleTemplateSelect = (tmpl: (typeof TEMPLATES)[number]) => {
    setTemplate(tmpl.name); setFgColor(tmpl.fg); setBgColor(tmpl.bg);
  };

  const handleFontChange = (val: string) => {
    setTextFont(val); const gfont = findGoogleFont(val); if (gfont) loadGoogleFont(gfont);
  };

  useEffect(() => { generateQR(); }, []);

  const goNext = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const goPrev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const inputClass = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all duration-200";

  const dotStylesT = useMemo(() => DOT_STYLES.map(s => ({ ...s, label: sl(s.value) })), [sl]);
  const cornerSqStylesT = useMemo(() => CORNER_SQUARE_STYLES.map(s => ({ ...s, label: sl(s.value) })), [sl]);
  const cornerDotStylesT = useMemo(() => CORNER_DOT_STYLES.map(s => ({ ...s, label: sl(s.value) })), [sl]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div key="step-1" className="step-content space-y-5">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="url"><Link className="w-4 h-4" /> URL</TabsTrigger>
                <TabsTrigger value="text"><Type className="w-4 h-4" /> {t.tabText}</TabsTrigger>
                <TabsTrigger value="wifi"><Wifi className="w-4 h-4" /> Wi-Fi</TabsTrigger>
                <TabsTrigger value="email"><Mail className="w-4 h-4" /> Email</TabsTrigger>
                <TabsTrigger value="phone"><Phone className="w-4 h-4" /> {t.tabPhone}</TabsTrigger>
                <TabsTrigger value="vcard"><UserRound className="w-4 h-4" /> VCard</TabsTrigger>
              </TabsList>
              <TabsContent value="url">
                <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelWebAddress}</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className={inputClass} />
              </TabsContent>
              <TabsContent value="text">
                <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelText}</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.placeholderText} className={`${inputClass} min-h-[100px] resize-y`} />
              </TabsContent>
              <TabsContent value="wifi">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelSsid}</label>
                    <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder={t.placeholderSsid} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelPassword}</label>
                      <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder={t.placeholderPassword} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelEncryption}</label>
                      <Select value={wifiEncryption} onValueChange={setWifiEncryption}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">{t.encOpen}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox checked={wifiHidden} onCheckedChange={(c) => setWifiHidden(!!c)} id="wifi-hidden" />
                    <label htmlFor="wifi-hidden" className="text-sm text-zinc-400 cursor-pointer">{t.labelHiddenNetwork}</label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="email">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelEmailAddress}</label>
                    <input type="email" value={emailAddr} onChange={(e) => setEmailAddr(e.target.value)} placeholder={t.placeholderEmail} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelSubject}</label>
                    <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder={t.placeholderSubject} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelMessageBody}</label>
                    <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder={t.placeholderBody} className={`${inputClass} min-h-[80px] resize-y`} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="phone">
                <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelPhoneNumber}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className={inputClass} />
              </TabsContent>
              <TabsContent value="vcard">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelFirstName}</label>
                      <input type="text" value={vcardFirst} onChange={(e) => setVcardFirst(e.target.value)} placeholder={t.labelFirstName} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelLastName}</label>
                      <input type="text" value={vcardLast} onChange={(e) => setVcardLast(e.target.value)} placeholder={t.labelLastName} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelPhone}</label>
                    <input type="tel" value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} placeholder="+998 90 123 45 67" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelEmail}</label>
                    <input type="email" value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} placeholder={t.placeholderEmail} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelOrganization}</label>
                    <input type="text" value={vcardOrg} onChange={(e) => setVcardOrg(e.target.value)} placeholder={t.placeholderOrg} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelWebsite}</label>
                    <input type="url" value={vcardUrl} onChange={(e) => setVcardUrl(e.target.value)} placeholder="https://example.com" className={inputClass} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      case 2:
        return (
          <div key="step-2" className="step-content space-y-6">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-3 block">{t.labelDotShape}</label>
              <StylePicker options={dotStylesT} value={dotStyle} onChange={setDotStyle} renderIcon={(v) => {
                const icons: Record<string, React.ReactNode> = {
                  square: <svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" fill="currentColor" /></svg>,
                  dots: <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="currentColor" /></svg>,
                  rounded: <svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" /></svg>,
                  "extra-rounded": <svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="11" fill="currentColor" /></svg>,
                  classy: <svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" fill="currentColor" transform="rotate(45 16 16) scale(0.72)" /></svg>,
                  "classy-rounded": <svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" transform="rotate(45 16 16) scale(0.72)" /></svg>,
                }; return icons[v];
              }} />
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-3 block">{t.labelCornerFrame}</label>
              <StylePicker options={cornerSqStylesT} value={cornerSquareStyle} onChange={setCornerSquareStyle} renderIcon={(v) => {
                const icons: Record<string, React.ReactNode> = {
                  square: <svg viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="5" /></svg>,
                  dot: <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="5" /></svg>,
                  "extra-rounded": <svg viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="10" fill="none" stroke="currentColor" strokeWidth="5" /></svg>,
                }; return icons[v];
              }} />
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-3 block">{t.labelCornerDot}</label>
              <StylePicker options={cornerDotStylesT} value={cornerDotStyle} onChange={setCornerDotStyle} columns={2} renderIcon={(v) => {
                const icons: Record<string, React.ReactNode> = {
                  square: <svg viewBox="0 0 32 32"><rect x="8" y="8" width="16" height="16" fill="currentColor" /></svg>,
                  dot: <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="currentColor" /></svg>,
                }; return icons[v];
              }} />
            </div>
          </div>
        );
      case 3:
        return (
          <div key="step-3" className="step-content space-y-5">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-3 block">{t.labelTemplates}</label>
              <div className="grid grid-cols-4 gap-2">
                {TEMPLATES.map((tmpl) => (
                  <button key={tmpl.name} onClick={() => handleTemplateSelect(tmpl)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                      template === tmpl.name ? "border-violet-500 bg-violet-500/10 text-white" : "border-white/10 text-zinc-500 hover:border-violet-500/40 hover:text-white"
                    }`}>
                    <span className="text-xl">{tmpl.emoji}</span>
                    <span className="text-[10px] font-medium">{t[TMPL_LABEL_MAP[tmpl.name] || "tmplClassic"]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-400">{t.labelGradient}</label>
              <Switch checked={useGradient} onCheckedChange={setUseGradient} />
            </div>
            {useGradient && (
              <div className="space-y-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 animate-fade-in-up">
                <div className="flex gap-2">
                  {(["linear", "radial"] as const).map((g) => (
                    <button key={g} onClick={() => setGradType(g)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                        gradType === g ? "bg-violet-500/20 border-violet-500 text-white border" : "border border-white/15 text-zinc-500 hover:text-white"
                      }`}>
                      {g === "linear" ? t.labelLinear : t.labelRadial}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ColorInput label={t.labelColor1} value={gradColor1} onChange={setGradColor1} />
                  <ColorInput label={t.labelColor2} value={gradColor2} onChange={setGradColor2} />
                </div>
                {gradType === "linear" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-zinc-400">{t.labelAngle}</label>
                      <span className="text-xs font-mono text-zinc-500">{gradRotation}°</span>
                    </div>
                    <Slider value={[gradRotation]} onValueChange={([v]) => setGradRotation(v)} min={0} max={360} step={5} />
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <ColorInput label={t.labelQrColor} value={fgColor} onChange={(v) => { setFgColor(v); setTemplate(""); }} />
              <ColorInput label={t.labelBgColor} value={bgColor} onChange={(v) => { setBgColor(v); setTemplate(""); }} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-400">{t.labelCornerColor}</label>
              <Switch checked={useCornerColor} onCheckedChange={setUseCornerColor} />
            </div>
            {useCornerColor && (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 animate-fade-in-up">
                <ColorInput label={t.labelFrameColor} value={cornerSqColor} onChange={setCornerSqColor} />
                <ColorInput label={t.labelDotColor} value={cornerDotColor} onChange={setCornerDotColor} />
              </div>
            )}
            <div className="h-px bg-white/10" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mb-4">
                <Ruler className="w-4 h-4 text-violet-400" /> {t.labelSize}
              </h4>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-medium text-zinc-400">{t.labelQrSize}</label>
                <span className="text-xs font-mono text-zinc-500">{qrSize}px</span>
              </div>
              <Slider value={[qrSize]} onValueChange={([v]) => setQrSize(v)} min={150} max={500} step={10} />
            </div>
          </div>
        );
      case 4:
        return (
          <div key="step-4" className="step-content space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mb-4">
                <ImageIcon className="w-4 h-4 text-violet-400" /> {t.labelLogo}
              </h4>
              <div className="flex items-center gap-3">
                <button onClick={() => logoInputRef.current?.click()}
                  className="flex-1 rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] py-4 text-sm text-zinc-400 hover:border-violet-500/50 hover:text-white transition-all">
                  {t.labelChooseImage}
                </button>
                <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                {logoUrl && (
                  <>
                    <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-lg object-cover border border-white/15" />
                    <button onClick={() => { setLogoUrl(null); if (logoInputRef.current) logoInputRef.current.value = ""; }}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-medium text-zinc-400">{t.labelLogoSize}</label>
                <span className="text-xs font-mono text-zinc-500">{logoSize}%</span>
              </div>
              <Slider value={[logoSize]} onValueChange={([v]) => setLogoSize(v)} min={10} max={40} step={1} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-medium text-zinc-400">{t.labelLogoMargin}</label>
                <span className="text-xs font-mono text-zinc-500">{logoMargin}px</span>
              </div>
              <Slider value={[logoMargin]} onValueChange={([v]) => setLogoMargin(v)} min={0} max={20} step={1} />
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelBottomText}</label>
              <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder={t.placeholderBottomText} className={inputClass} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-medium text-zinc-400">{t.labelTextSize}</label>
                <span className="text-xs font-mono text-zinc-500">{textSize}px</span>
              </div>
              <Slider value={[textSize]} onValueChange={([v]) => setTextSize(v)} min={12} max={32} step={1} />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-2 block">{t.labelTextFont}</label>
              <Select value={textFont} onValueChange={handleFontChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FONTS.map((group) => (
                    <SelectGroup key={group.group}>
                      <SelectLabel>{group.group === "Dekorativ" ? t.fontDecorative : group.group}</SelectLabel>
                      {group.fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              {bottomText && (
                <div className="mt-3 p-3 rounded-lg border border-white/10 text-center text-zinc-400"
                  style={{ fontFamily: textFont, fontSize: `${Math.min(textSize, 20)}px` }}>
                  {bottomText}
                </div>
              )}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in-up">
      {/* Mobile Step Bar */}
      <div className="lg:hidden mb-6">
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <button onClick={() => setCurrentStep(step.id)} className="flex flex-col items-center gap-1.5 group">
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30 scale-110"
                        : isCompleted ? "bg-violet-500/20 text-violet-400"
                        : "bg-white/5 text-zinc-500 group-hover:bg-white/10 group-hover:text-zinc-300"
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      {isActive && <div className="absolute inset-0 rounded-xl bg-violet-500/20 animate-ping" />}
                    </div>
                    <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}>{step.shortLabel}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`w-6 sm:w-10 h-0.5 mx-1 rounded-full transition-colors duration-300 -mt-4 ${currentStep > step.id ? "bg-violet-500" : "bg-white/10"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Desktop Vertical Step Bar */}
        <div className="hidden lg:flex flex-col items-center shrink-0 w-[200px]">
          <div className="sticky top-8 glass-card rounded-2xl p-5 w-full space-y-1">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id}>
                  <button onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                      isActive ? "bg-violet-500/15 text-white" : isCompleted ? "text-violet-400 hover:bg-white/5" : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                    }`}>
                    <div className={`relative w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30" : isCompleted ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-zinc-500 group-hover:bg-white/10"
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <div className="text-left min-w-0">
                      <div className={`text-sm font-medium truncate ${isActive ? "text-white" : ""}`}>{step.label}</div>
                      <div className="text-[10px] text-zinc-500 truncate">{step.desc}</div>
                    </div>
                  </button>
                  {i < steps.length - 1 && (
                    <div className="flex justify-start ml-[26px] py-1">
                      <div className={`w-0.5 h-4 rounded-full transition-colors duration-300 ${currentStep > step.id ? "bg-violet-500" : "bg-white/10"}`} />
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-3 mt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500">{t.labelProgress}</span>
                <span className="text-[10px] font-mono text-violet-400">{currentStep}/4</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${(currentStep / 4) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  {(() => { const StepIcon = steps[currentStep - 1].icon; return (
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center"><StepIcon className="w-5 h-5 text-violet-400" /></div>
                  ); })()}
                  <div>
                    <h3 className="text-base font-semibold text-white">{steps[currentStep - 1].label}</h3>
                    <p className="text-xs text-zinc-500">{steps[currentStep - 1].desc}</p>
                  </div>
                  <span className="ml-auto text-xs font-mono text-zinc-600 lg:hidden">{currentStep}/4</span>
                </div>
                {renderStepContent()}
              </div>
              <div className="flex items-center gap-3 mt-5">
                {currentStep > 1 && (
                  <button onClick={goPrev} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-zinc-400 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200">
                    <ChevronLeft className="w-4 h-4" /> {t.btnBack}
                  </button>
                )}
                <div className="flex-1" />
                {currentStep < 4 ? (
                  <button onClick={goNext} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                    {t.btnNext} <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={generateQR} className="btn-glow flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-cyan-500 text-white text-sm font-semibold animate-gradient-x">
                    <Zap className="w-4 h-4" /> {t.btnGenerate}
                  </button>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-8 space-y-5 self-start">
              <div className="preview-card glass-card rounded-2xl p-6 flex flex-col items-center gap-5 animate-pulse-glow">
                <h3 className="text-sm font-semibold text-zinc-300 w-full flex items-center gap-2">
                  <Eye className="w-4 h-4 text-violet-400" /> {t.previewTitle}
                </h3>
                <div className="rounded-2xl p-5 flex flex-col items-center justify-center w-full transition-all duration-500" style={{ backgroundColor: generated ? bgColor : "transparent" }}>
                  {!generated ? (
                    <div className="border-2 border-dashed border-white/15 rounded-2xl w-full h-[250px] flex items-center justify-center animate-border-glow">
                      <p className="text-zinc-500 text-sm">{t.previewPlaceholder}</p>
                    </div>
                  ) : (
                    <div className="animate-fade-in-scale">
                      <div ref={qrRef} className="flex items-center justify-center [&>canvas]:max-w-full [&>canvas]:h-auto" />
                      {bottomText && (
                        <p className="mt-3 text-center transition-all duration-300" style={{ fontFamily: textFont, fontSize: `${textSize}px`, color: useGradient ? gradColor1 : fgColor }}>
                          {bottomText}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
                  {(["png", "jpeg", "svg"] as const).map((fmt) => (
                    <button key={fmt} disabled={!generated} onClick={() => downloadQR(fmt)}
                      className="download-btn flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 bg-white/5 text-zinc-400 text-sm font-medium hover:border-violet-500/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
                      <Download className="w-3.5 h-3.5" /> {fmt === "jpeg" ? "JPG" : fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">{t.qrDataTitle}</h3>
                <pre className="text-xs text-zinc-500 font-mono bg-black/20 rounded-xl p-3 whitespace-pre-wrap break-all max-h-[120px] overflow-y-auto">
                  {qrData || t.qrDataEmpty}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
