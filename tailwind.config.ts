import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "on-accent": "var(--on-accent)",
        caution: "var(--caution)",
        "caution-soft": "var(--caution-soft)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [],
};

export default config;
