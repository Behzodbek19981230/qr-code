"use client";

import { cn } from "@/lib/utils";

interface StyleOption {
  value: string;
  label: string;
}

interface StylePickerProps {
  options: readonly StyleOption[];
  value: string;
  onChange: (value: string) => void;
  renderIcon: (value: string) => React.ReactNode;
  columns?: number;
}

export function StylePicker({ options, value, onChange, renderIcon, columns = 3 }: StylePickerProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all duration-200",
            "hover:border-violet-500/50 hover:bg-white/5",
            value === option.value
              ? "border-violet-500 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10"
              : "border-white/10 text-zinc-400"
          )}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            {renderIcon(option.value)}
          </div>
          <span className="text-[11px] font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
