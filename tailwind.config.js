/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#f7f8fc',
          100: '#eef0f6',
          200: '#dde2ee',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sidebar: {
          bg: '#0d1526',
          hover: 'rgba(255,255,255,0.08)',
          active: 'rgba(255,255,255,0.13)',
          border: 'rgba(255,255,255,0.07)',
          text: '#94a3b8',
          heading: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'elevated': '0 4px 12px rgba(0,0,0,0.08)',
        'dropdown': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
