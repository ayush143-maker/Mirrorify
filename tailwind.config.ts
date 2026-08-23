import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1220", soft: "#16203A" },
        paper: { DEFAULT: "#FBF7EE", dark: "#EFE7D6" },
        gold: { DEFAULT: "#D9A441", dark: "#9A6E22" },
        seal: "#B3402F",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 24px 60px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
