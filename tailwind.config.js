/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-vibrant": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-sunset": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "gradient-ocean": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      },
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
      },
    },
  },
  plugins: [],
};
