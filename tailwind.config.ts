import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /^(text|border|bg)-skill(([1-9]|1[0-3]))(fg)?$/,
    },
    // Tech hover colors
    ...Array.from({ length: 12 }, (_, i) => `hover:border-skill${i + 1}-hover`),
    ...Array.from({ length: 12 }, (_, i) => `hover:text-skill${i + 1}-hover`),
    ...Array.from({ length: 12 }, (_, i) => `hover:bg-skill${i + 1}-hover`),
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '640px',
      lg: '1280px',
    },
    extend: {
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        spin: 'spin 2.4s linear infinite',
        spin2: 'spin 0.4s linear infinite',
        'spin-slow': 'spin 220s linear infinite',
        gradient: 'animatedgradient 6s ease infinite alternate',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      borderRadius: {
        '20': '20px',
      },
      backgroundImage: {
        custom:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(197, 197, 197, 0.434343) 28%, rgba(153, 153, 153, 0) 49.5%)',
        'custom-mobile':
          'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(197, 197, 197, 0.434343) 49.56%)',
      },
      fontSize: {
        '10': '10px',
        '13': '13px',
        '14': '14px',
        '27': '27px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
      },
      colors: {
        white: 'rgb(var(--color-white) / <alpha-value>)',
        'base-dark': 'rgb(var(--color-base-dark) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        'darker-gray': 'rgb(var(--color-darker-gray) / <alpha-value>)',
        'base-black': 'var(--color-base-black)',
        'dark-gray': 'rgb(var(--color-dark-gray)  / <alpha-value>)',
        'app-bg': 'rgb(var( --color-bg-app))',
        'light-gray': 'rgb(var(--color-light-gray))',
        'cool-gray': 'rgb(var(--color-cool-gray))',
        'medium-gray': 'rgb(var(--color-medium-gray))',
        labels: 'rgb(var(--color-labels) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
        divider: 'rgb(var(--color-border) / <alpha-value>)',
        'grantee-item': 'rgb(var(--color-grantee-item) / <alpha-value>)',
        'gradient-1': 'rgb(var(--color-gradient-1) / <alpha-value>)',
        'gradient-2': 'rgb(var(--color-gradient-2) / <alpha-value>)',
        innovate: 'rgb(var(--color-innovate) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        accent2: 'rgb(var(--color-accent2) / <alpha-value>)',
        skill1: '#F7FD36',
        skill2: '#CAE402',
        skill3: '#E2BF2B',
        skill4: '#FFE2AD',
        skill5: '#FFE6E2',
        skill6: '#DEF8EE',
        skill7: '#77CBBE',
        skill8: '#F79A7E',
        skill9: '#FB7D43',
        skill10: '#ECC6F7',
        skill11: '#F3A5F2',
        skill12: '#EC88E1',
        skill1fg: '#635C00',
        skill2fg: '#374100',
        skill3fg: '#4E4000',
        skill4fg: '#694500',
        skill5fg: '#803F36',
        skill6fg: '#1B513F',
        skill7fg: '#0A3F37',
        skill8fg: '#6B2611',
        skill9fg: '#5F2507',
        skill10fg: '#4A1B54',
        skill11fg: '#691C67',
        skill12fg: '#591252',
        'skill1-hover': '#FFD700',
        'skill2-hover': '#FFA500',
        'skill3-hover': '#6079E0',
        'skill4-hover': '#FFC0CB',
        'skill5-hover': '#FF6347',
        'skill6-hover': '#A1A8BC',
        'skill7-hover': '#CCB7C9',
        'skill8-hover': '#5293A6',
        'skill9-hover': '#4FA7D0',
        'skill10-hover': '#597452',
        'skill11-hover': '#548B55',
        'skill12-hover': '#599F61',
        'skill1fg-hover': '#B9BEFF',
        'skill2fg-hover': '#E7E8FF',
        'skill3fg-hover': '#C8D2FF',
        'skill4fg-hover': '#B5CEFF',
        'skill5fg-hover': '#A5D2D9',
        'skill6fg-hover': '#F3E2ED',
        'skill7fg-hover': '#FAE8EF',
        'skill8fg-hover': '#B4E4F3',
        'skill9fg-hover': '#BCE5FA',
        'skill10fg-hover': '#CBECC4',
        'skill11fg-hover': '#B5EBB6',
        'skill12fg-hover': '#C0F2C5',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        grotesk: ['var(--font-space-grotesk)'],
      },
    },
  },
  darkMode: 'class',
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    heroui({
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
      themes: {
        dark: {
          colors: {
            default: {
              50: '#1E1E1E',
              100: '#353535',
              200: '#4D4D4D',
              300: '#656565',
              400: '#7D7D7D',
              500: '#959595',
              600: '#ADADAD',
              700: '#C5C5C5',
              800: '#DDDDDD',
              900: '#F5F5F5',
              DEFAULT: '#1E1E1E',
            },
            focus: '#14996b',
          },
        },
      },
    }),
  ],
};
export default config;
