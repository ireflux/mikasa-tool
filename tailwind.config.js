import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a73e8',
          hover: '#0b57d0',
          light: '#e8f0fe',
          light2: '#d3e3fd',
        },
        surface: '#ffffff',
        canvas: '#f8faff',
        border: {
          DEFAULT: 'rgba(31,31,31,0.08)',
          hover: 'rgba(31,31,31,0.16)',
        },
        content: {
          primary: '#1f1f1f',
          secondary: '#444746',
          muted: '#5f6368',
        },
      },
      borderRadius: {
        'card': '16px',
        'btn': '12px',
        'tag': '999px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(60,64,67,0.08)',
        'card-hover': '0 12px 32px rgba(60,64,67,0.12)',
        'dropdown': '0 8px 24px rgba(60,64,67,0.14)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    screens: {
      // 自定义响应式尺寸
      'c-xs': {'max': '768px'},
      'c-sm': {'min': '768px'}, //相当远默认的md
      'c-md': {'min': '992px'},
      'c-lg': {'min': '1200px'},
      ...defaultTheme.screens,
    },
    animation: {
      fold: 'fold 1s infinite',
      'fade-in': 'fade-in 0.3s ease-out',
      'fade-in-up': 'fade-in-up 0.4s ease-out both',
      'slide-in-right': 'slide-in-right 0.3s ease-out',
      'scale-in': 'scale-in 0.2s ease-out',
      'stagger-fade-in': 'stagger-fade-in 0.4s ease-out both',
    },
    keyframes: {
      fold: {
        '0%, 100%': { 
          opacity: 0
        },  
        '50%': { 
          opacity: 1
        }  
      },
      'fade-in': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      'fade-in-up': {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-in-right': {
        '0%': { opacity: 0, transform: 'translateX(15px)' },
        '100%': { opacity: 1, transform: 'translateX(0)' },
      },
      'scale-in': {
        '0%': { opacity: 0, transform: 'scale(0.95)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
      'stagger-fade-in': {
        '0%': { opacity: 0, transform: 'translateY(12px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    }
  },
  plugins: [],
}

