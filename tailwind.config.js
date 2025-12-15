/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4bbfc',
          400: '#7a94f9',
          500: '#5a6cf3',
          600: '#4149e7',
          700: '#3538d4',
          800: '#2d30ab',
          900: '#2a2e87',
          950: '#1a1b52',
        },
        dark: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d9d9de',
          300: '#b8b9c1',
          400: '#91929f',
          500: '#747584',
          600: '#5e5f6c',
          700: '#4d4d58',
          800: '#42424b',
          900: '#3a3a41',
          950: '#18181b',
        },
        accent: {
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 40px rgba(90, 108, 243, 0.15)',
      }
    },
  },
  plugins: [],
}

