interface ShapeDividerProps {
  position?: "top" | "bottom";
  color?: string;
  className?: string;
}

export function ShapeDivider({
  position = "bottom",
  color = "#F7F3EC",
  className = "",
}: ShapeDividerProps) {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-10 leading-[0] ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
      aria-hidden="true"
      style={isTop ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[120px]"
      >
        <path
          d="M0,120 C480,10 960,10 1440,120 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
