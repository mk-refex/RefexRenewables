import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['sans-serif'],
      },
      colors: {
        orange: {
          50: '#fef5f0',
          100: '#fde8dc',
          200: '#fbd0b9',
          300: '#f9b08b',
          400: '#f5885b',
          500: '#df6420',
          600: '#c5541a',
          700: '#a44416',
          800: '#853717',
          900: '#6d2f16',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
