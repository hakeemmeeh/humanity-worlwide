export function HandsMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Hands forming a star — brand motif */}
      <g opacity="0.9">
        {/* Center star */}
        <path d="M100 30 L110 70 L150 70 L118 92 L130 132 L100 108 L70 132 L82 92 L50 70 L90 70 Z" />
        {/* Left hand */}
        <path
          d="M25 120 C15 100 20 75 40 65 C50 60 55 70 52 80 C48 70 42 68 38 75 C32 85 35 105 45 115 C40 118 30 125 25 120Z"
          opacity="0.7"
        />
        {/* Right hand */}
        <path
          d="M175 120 C185 100 180 75 160 65 C150 60 145 70 148 80 C152 70 158 68 162 75 C168 85 165 105 155 115 C160 118 170 125 175 120Z"
          opacity="0.7"
        />
        {/* Bottom hands */}
        <path
          d="M70 155 C60 145 65 130 80 125 C90 122 95 132 92 140 C88 135 82 138 80 145 C75 150 72 158 70 155Z"
          opacity="0.6"
        />
        <path
          d="M130 155 C140 145 135 130 120 125 C110 122 105 132 108 140 C112 135 118 138 120 145 C125 150 128 158 130 155Z"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
