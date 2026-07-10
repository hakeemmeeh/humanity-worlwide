import { Counter } from "@/components/Counter";
import type { Stat } from "@/types";

interface StatBlockProps {
  stat: Stat;
  variant?: "light" | "dark";
}

export function StatBlock({ stat, variant = "light" }: StatBlockProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`border-l-4 border-teal py-2 pl-5 ${
        isDark ? "text-white" : "text-navy"
      }`}
    >
      <div
        className={`font-display text-4xl font-semibold md:text-5xl ${
          isDark ? "text-white" : "text-navy"
        }`}
      >
        <Counter
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
        />
      </div>
      <p
        className={`mt-2 font-semibold ${
          isDark ? "text-white" : "text-navy"
        }`}
      >
        {stat.label}
      </p>
      {stat.description && (
        <p
          className={`mt-1 text-sm leading-relaxed ${
            isDark ? "text-white/70" : "text-ink/70"
          }`}
        >
          {stat.description}
        </p>
      )}
    </div>
  );
}
