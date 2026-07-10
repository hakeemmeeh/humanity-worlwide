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
      className={`pointer-events-none absolute left-0 right-0 z-[1] leading-[0] ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
      aria-hidden="true"
      style={isTop ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-[50px] w-full md:h-[80px]"
      >
        <path
          d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
