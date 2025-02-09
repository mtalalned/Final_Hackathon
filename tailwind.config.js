// /** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",  // Ensure paths are correct here.
    ],
    theme: {
      extend: {},
    },
    plugins: [
      daisyui,  // Include DaisyUI if you're using it
    ],
  };
  