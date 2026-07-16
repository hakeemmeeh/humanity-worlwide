import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#12304F",
          deep: "#0C2238",
          soft: "#1B3A5C",
        },
        teal: {
          DEFAULT: "#2CADA3",
          text: "#1F8C84",
          soft: "#E4F4F2",
        },
        coral: {
          DEFAULT: "#E1723C",
          dark: "#C85F2D",
          soft: "#FBEDE4",
        },
        sand: {
          DEFAULT: "#F7F3EC",
          deep: "#EFE8DC",
        },
        ink: "#1E252B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        card: "0 2px 24px rgba(18,48,79,0.08)",
        "card-hover": "0 8px 32px rgba(18,48,79,0.12)",
      },
      maxWidth: {
        content: "1200px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
