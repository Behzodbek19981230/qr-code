export const DOT_STYLES = [
  { value: "square", label: "Kvadrat", icon: "square" },
  { value: "dots", label: "Doira", icon: "circle" },
  { value: "rounded", label: "Yumaloq", icon: "rounded" },
  { value: "extra-rounded", label: "Ko'p yumaloq", icon: "extra-rounded" },
  { value: "classy", label: "Klassik", icon: "classy" },
  { value: "classy-rounded", label: "Klassik yumaloq", icon: "classy-rounded" },
] as const;

export const CORNER_SQUARE_STYLES = [
  { value: "square", label: "Kvadrat" },
  { value: "dot", label: "Doira" },
  { value: "extra-rounded", label: "Yumaloq" },
] as const;

export const CORNER_DOT_STYLES = [
  { value: "square", label: "Kvadrat" },
  { value: "dot", label: "Doira" },
] as const;

export const TEMPLATES = [
  { name: "classic", label: "Klassik", emoji: "⬛", fg: "#000000", bg: "#ffffff" },
  { name: "ocean", label: "Okean", emoji: "🌊", fg: "#0066cc", bg: "#e8f4fd" },
  { name: "sunset", label: "Quyosh", emoji: "🌅", fg: "#cc3300", bg: "#fff5e6" },
  { name: "forest", label: "O'rmon", emoji: "🌲", fg: "#006633", bg: "#e8f5e9" },
  { name: "royal", label: "Royal", emoji: "👑", fg: "#4a0080", bg: "#f3e5f5" },
  { name: "dark", label: "Qorong'i", emoji: "🌙", fg: "#ffffff", bg: "#1a1a2e" },
  { name: "neon", label: "Neon", emoji: "💚", fg: "#00ff88", bg: "#0a0a0a" },
  { name: "rose", label: "Atirgul", emoji: "🌹", fg: "#e91e63", bg: "#fce4ec" },
] as const;

export const FONTS = [
  {
    group: "Sans-serif",
    fonts: [
      { value: "'Segoe UI', sans-serif", label: "Segoe UI" },
      { value: "Arial, sans-serif", label: "Arial" },
      { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
      { value: "Verdana, sans-serif", label: "Verdana" },
      { value: "Tahoma, sans-serif", label: "Tahoma" },
      { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
      { value: "'Century Gothic', sans-serif", label: "Century Gothic" },
      { value: "Calibri, sans-serif", label: "Calibri" },
      { value: "Impact, sans-serif", label: "Impact" },
    ],
  },
  {
    group: "Serif",
    fonts: [
      { value: "Georgia, serif", label: "Georgia" },
      { value: "'Times New Roman', serif", label: "Times New Roman" },
      { value: "'Palatino Linotype', serif", label: "Palatino" },
      { value: "'Book Antiqua', serif", label: "Book Antiqua" },
      { value: "Garamond, serif", label: "Garamond" },
      { value: "Cambria, serif", label: "Cambria" },
    ],
  },
  {
    group: "Monospace",
    fonts: [
      { value: "'Courier New', monospace", label: "Courier New" },
      { value: "'Lucida Console', monospace", label: "Lucida Console" },
      { value: "Consolas, monospace", label: "Consolas" },
      { value: "Monaco, monospace", label: "Monaco" },
    ],
  },
  {
    group: "Dekorativ",
    fonts: [
      { value: "cursive", label: "Cursive" },
      { value: "fantasy", label: "Fantasy" },
      { value: "'Comic Sans MS', cursive", label: "Comic Sans" },
    ],
  },
  {
    group: "Google Fonts",
    fonts: [
      { value: "'Roboto', sans-serif", label: "Roboto", gfont: "Roboto" },
      { value: "'Open Sans', sans-serif", label: "Open Sans", gfont: "Open+Sans" },
      { value: "'Montserrat', sans-serif", label: "Montserrat", gfont: "Montserrat" },
      { value: "'Poppins', sans-serif", label: "Poppins", gfont: "Poppins" },
      { value: "'Lato', sans-serif", label: "Lato", gfont: "Lato" },
      { value: "'Raleway', sans-serif", label: "Raleway", gfont: "Raleway" },
      { value: "'Playfair Display', serif", label: "Playfair Display", gfont: "Playfair+Display" },
      { value: "'Oswald', sans-serif", label: "Oswald", gfont: "Oswald" },
      { value: "'Dancing Script', cursive", label: "Dancing Script", gfont: "Dancing+Script" },
      { value: "'Pacifico', cursive", label: "Pacifico", gfont: "Pacifico" },
      { value: "'Lobster', cursive", label: "Lobster", gfont: "Lobster" },
      { value: "'Great Vibes', cursive", label: "Great Vibes", gfont: "Great+Vibes" },
      { value: "'Bebas Neue', sans-serif", label: "Bebas Neue", gfont: "Bebas+Neue" },
      { value: "'Abril Fatface', serif", label: "Abril Fatface", gfont: "Abril+Fatface" },
      { value: "'Righteous', sans-serif", label: "Righteous", gfont: "Righteous" },
      { value: "'Permanent Marker', cursive", label: "Permanent Marker", gfont: "Permanent+Marker" },
      { value: "'Satisfy', cursive", label: "Satisfy", gfont: "Satisfy" },
      { value: "'Sacramento', cursive", label: "Sacramento", gfont: "Sacramento" },
      { value: "'Cinzel', serif", label: "Cinzel", gfont: "Cinzel" },
      { value: "'Anton', sans-serif", label: "Anton", gfont: "Anton" },
    ],
  },
] as const;
