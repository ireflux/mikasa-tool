import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#eff6ff',
          light2: '#dbeafe',
        },
        surface: '#ffffff',
        canvas: '#f8fafc',
        border: {
          DEFAULT: '#e2e8f0',
          hover: '#cbd5e1',
        },
        content: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
        },
      },
      borderRadius: {
        'card': '10px',
        'btn': '6px',
        'tag': '4px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08)',
        'dropdown': '0 4px 12px rgba(0,0,0,0.08)',
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

