/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#05070a', // Deeper black
        surface: 'rgba(13, 17, 23, 0.8)',
        surfaceLight: 'rgba(22, 27, 34, 0.8)',
        royal: {
          500: '#0052FF',
          600: '#0041CC',
          700: '#003199',
        },
        primary: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        secondary: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'], // More modern heading font
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #0052FF 0%, #8b5cf6 50%, #06b6d4 100%)',
        'premium-gradient-hover': 'linear-gradient(135deg, #0041CC 0%, #7c3aed 50%, #0891b2 100%)',
        'glass-mesh': 'radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.1) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(139, 92, 246, 0.1) 0, transparent 50%)',
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(0, 82, 255, 0.3)',
        'glow-premium': '0 0 40px rgba(139, 92, 246, 0.25)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse_slow: {
          '0%, 100%': { opacity: '0.4', scale: '1' },
          '50%': { opacity: '1', scale: '1.05' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse_slow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
