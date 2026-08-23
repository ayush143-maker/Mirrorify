import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#080F1C", soft: "#151F35", line: "#243252" },
        cream: { DEFAULT: "#F8F4EA", dark: "#EDE7D8" },
        gold: { DEFAULT: "#D6A23A", bright: "#E8B84B" },
        graphite: "#101722",
        smoke: "#85858A",
        forest: "#24785F",
        seal: "#B3402F",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 24px 60px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
