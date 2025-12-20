import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"]
      },
      colors: {
        night: "#060606",
        blood: "#9b111e",
        ember: "#ff3c38",
        smoke: "#d1d1d1",
        shadow: "#111111"
      },
      boxShadow: {
        neon: "0 0 30px rgba(255,60,56,0.35)"
      },
      backgroundImage: {
        noise: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80')"
      }
    }
  },
  plugins: []
};

export default config;




