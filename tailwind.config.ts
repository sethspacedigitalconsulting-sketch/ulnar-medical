import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#122954",
          deep: "#080f1e",
          mid: "#1a3a6e",
          light: "#1e4080",
        },
        rose: {
          clinical: "#F4B9B9",
          deep: "#e8a0a0",
          light: "#fadadada",
        },
        gold: {
          clinical: "#FFD43A",
          deep: "#e6bc00",
          light: "#ffe880",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #080f1e 0%, #122954 50%, #0d1f3f 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFD43A 0%, #e6bc00 100%)",
        "rose-gradient": "linear-gradient(135deg, #F4B9B9 0%, #e8a0a0 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
