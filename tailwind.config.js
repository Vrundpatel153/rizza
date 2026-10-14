/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rizza: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#5832E6',
          700: '#4823D4',
          800: '#3c18b8',
          900: '#2d0e91',
        },
        surface: {
          light: '#FFFFFF',
          soft: '#FAF9FE',
          subtle: '#F4F2FA',
          border: '#ECE8F7',
          borderLight: '#F0EDFA',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 20px -2px rgba(85, 75, 140, 0.05), 0 2px 6px -1px rgba(85, 75, 140, 0.03)',
        'glass-hover': '0 10px 30px -4px rgba(88, 50, 230, 0.12), 0 4px 12px -2px rgba(88, 50, 230, 0.08)',
        'purple-glow': '0 6px 20px rgba(88, 50, 230, 0.35)',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
