import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#4BB462",
          dark: "#3A964C",
          light: "#8AD194",
          foreground: "#FFFFFF",
        },
        accent: "#E6F4EA",
        background: {
          light: "#FFFFFF",
          dark: "#0A0A0A",
        },
        surface: {
          light: "#F8F9FA",
          dark: "#171717",
        },
        foreground: {
          main: "#111827",
          muted: "#6B7280",
          dark: "#F9FAFB",
          "dark-muted": "#9CA3AF",
        },
        border: {
          light: "#E5E7EB",
          dark: "#262626",
        },
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 40px -10px rgba(75, 180, 98, 0.3)",
        "glow-lg": "0 0 60px -10px rgba(75, 180, 98, 0.4)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(circle at 15% 50%, rgba(75, 180, 98, 0.08) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(138, 209, 148, 0.1) 0%, transparent 25%)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(75, 180, 98, 0.15), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

