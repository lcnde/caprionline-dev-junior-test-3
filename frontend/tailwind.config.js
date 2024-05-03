const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    colors: {
      'custom-blue-500': '#3086BD',
      'custom-gray-900': '#1E2126',
      'custom-gray-600': '#4F5052',
    },
    extend: {}
  },
  plugins: [
    flowbite.plugin()
  ]
}
