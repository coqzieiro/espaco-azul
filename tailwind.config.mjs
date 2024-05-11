/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2E3B69",
          secondary: "#B2CEEF",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      {
        contrast: {
          primary: "#00f",
          secondary: "#f3f",
		  "primary-content": "#fff",
		  "secondary-content": "#000",
          accent: "#37cdbe",
          neutral: "#000",
          "base-100": "#000",
        },
      },
    ],
  },
};
