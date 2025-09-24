import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontSize: { xs: "0.825rem" },
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          600: "#0284c7",
          700: "#0369a1",
        },
      },
    },
  },
  plugins: [],
}
export default config
