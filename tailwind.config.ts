import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Lato", "Arial", "sans-serif"],
        serif: ["var(--font-heading)", "Vollkorn", "Times New Roman", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          primary: "#43B02A",
          "primary-dark": "#2c7e1f",
          accent: "#CB2C30",
          "accent-dark": "#9a2326",
          charcoal: "#584446",
          neutral: "#2C2A29",
          cream: "#FBF9F4",
          sand: "#F4F2EC",
          yellow: "#FFCD00",
          sky: "#4EC3E0",
          mint: "#C4D600",
        },
      },
      boxShadow: {
        brand: "0 24px 60px rgba(44, 42, 41, 0.08)",
      },
      borderRadius: {
        brand: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
