/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FFFFFF',
          lightGrey: '#F5F6F8',
          card: '#F9FAFB',
          navy: '#111827',
          purple: '#7047EB',
          purpleHover: '#5B34DB',
          blue: '#3478E5',
          blueHover: '#2563EB',
          border: '#E5E7EB',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'corporate': '0 4px 20px -2px rgba(17, 24, 39, 0.05)',
        'corporate-lg': '0 10px 30px -4px rgba(17, 24, 39, 0.08)',
        'accent': '0 4px 14px 0 rgba(112, 71, 235, 0.25)',
      },
    },
  },
  plugins: [],
}
