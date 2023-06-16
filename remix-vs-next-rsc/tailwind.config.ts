import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "translate-y": "translateY 0.3s ease-in",
      },
      keyframes: {
        translateY: {
          from: { transform: "translateY(-5px)" },
          to: { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;
