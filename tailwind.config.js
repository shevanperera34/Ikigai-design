/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { base: '#0b0b14' },
      boxShadow: { insetTop: 'inset 0 1px 0 rgba(255,255,255,.06)' },
    },
  },
  plugins: [],
}
