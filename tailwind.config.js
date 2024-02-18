/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      cursor: {
        inherit: 'inherit'
      }
    }
  },
  plugins: [require('@catppuccin/tailwindcss')]
};
