"use client";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="space-y-2 group">
      <label className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white/15 bg-transparent p-0.5 [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 transition-all duration-200 hover:scale-110 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
          />
        </div>
        <span className="text-xs font-mono text-zinc-500 transition-colors duration-200 group-hover:text-zinc-400">{value}</span>
      </div>
    </div>
  );
}
