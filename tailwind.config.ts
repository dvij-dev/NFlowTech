import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // WCAG AA compliant palette (darkened from original #208CCC)
          blue: '#1A6B9C',
          'blue-light': '#E8F4FA',
          'blue-dark': '#0F4A6E',
          navy: '#0A1628',
          black: '#111111',
          white: '#FCFCFC',
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F5',
            200: '#E9ECEF',
            300: '#DEE2E6',
            400: '#ADB5BD',
            500: '#6C757D',
            600: '#495057',
            700: '#343A40',
            800: '#212529',
            900: '#111111',
          },
        },
        accent: {
          green: '#0D8A3A',
          amber: '#D4890A',
          red: '#C0392B',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'content': '72rem',
        'narrow': '42rem',
        'wide': '84rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
