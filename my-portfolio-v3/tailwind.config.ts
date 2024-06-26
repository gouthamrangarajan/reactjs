import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-down": "slide-down 0.3s ease-in",
        "slide-up": "slide-up 0.3s ease-in",
        "contact-message": "contact-message 0.3s ease-in",
      },
      keyframes: {
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
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
