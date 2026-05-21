import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',           // next-themes sets class="dark" on <html>
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',       // main brand — indigo
          600: '#4f46e5',
          700: '#4338ca',
          foreground: '#ffffff',
        },
        secondary: {
          500: '#8b5cf6',       // violet accent
          foreground: '#ffffff',
        },
        success:  { 100: '#dcfce7', 600: '#16a34a', 800: '#166534' },
        warning:  { 100: '#fef9c3', 600: '#ca8a04', 800: '#854d0e' },
        danger:   { 100: '#fee2e2', 600: '#dc2626', 800: '#991b1b' },
        info:     { 100: '#dbeafe', 600: '#2563eb', 800: '#1e40af' },
        pending:  { 100: '#fef3c7', 600: '#d97706', 800: '#92400e' },
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
      },
    },
  },
  plugins: [],
}

export default config