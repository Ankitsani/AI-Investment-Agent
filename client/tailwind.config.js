/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090d16',
        darkCard: '#111827',
        accentPrimary: '#6366f1', // Indigo
        accentSecondary: '#10b981', // Emerald
      },
      boxShadow: {
        'neon-indigo': '0 0 15px rgba(99, 102, 241, 0.4)',
        'neon-emerald': '0 0 15px rgba(16, 185, 129, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
