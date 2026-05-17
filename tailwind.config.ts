import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand)",
          hover: "var(--color-brand-hover)",
          pressed: "var(--color-brand-pressed)",
        },
        bg: "var(--color-bg)",
        "bg-soft": "var(--color-bg-soft)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        ink: "var(--color-text-primary)",
        "ink-soft": "var(--color-text-secondary)",
        "ink-muted": "var(--color-text-muted)",
        line: "var(--color-border)",
        "line-strong": "var(--color-border-strong)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        sherpa: {
          bg: "var(--color-bg)",
          ink: "var(--color-text-primary)",
          muted: "var(--color-text-muted)",
          lime: "var(--color-sherpa-lime)",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
        button: "var(--shadow-button)",
        "sherpa-button": "var(--shadow-button)",
        "sherpa-button-sm": "var(--shadow-button)",
        "sherpa-button-lg": "var(--shadow-button-lg)",
        "sherpa-nav": "var(--shadow-nav)",
      },
      borderRadius: {
        soft: "var(--radius-soft)",
        panel: "var(--radius-panel)",
        "sherpa-xs": "var(--radius-sherpa-xs)",
        "sherpa-pill": "var(--radius-sherpa-pill)",
        capsule: "999px",
      },
      transitionTimingFunction: {
        sherpa: "var(--ease-standard)",
      },
      transitionDuration: {
        fast: "160ms",
        medium: "240ms",
        slow: "420ms",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(204, 243, 95, 0.12), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.9), rgba(244,247,239,0.7))",
        "brand-glow":
          "linear-gradient(135deg, rgba(204,243,95,0.24), rgba(33,40,18,0.04) 45%, rgba(255,255,255,0.72))",
        "sherpa-hero":
          "linear-gradient(180deg, var(--color-sherpa-hero-start) 0%, var(--color-sherpa-hero-end) 800px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseLine: {
          "0%": { opacity: "0.3", transform: "scaleX(0.92)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
          "100%": { opacity: "0.3", transform: "scaleX(0.92)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        pulseLine: "pulseLine 1.8s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
