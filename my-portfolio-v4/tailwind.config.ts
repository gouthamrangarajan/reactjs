import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.3s ease-in",
        "slide-down": "slide-down 0.3s var(--ease-spring-3)",
        "slide-up": "slide-up 0.3s var(--ease-spring-3)",
        "contact-message": "contact-message 0.3s var(--ease-spring-3)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-2rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(2rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "contact-message": {
          from: {
            opacity: "0",
            transform: "scaleY(0)",
            transformOrigin: "top",
          },
          to: { opacity: "1", transform: "scaleY(1)", transformOrigin: "top" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
} satisfies Config;
