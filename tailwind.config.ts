import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(text|border|bg)-skill(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '640px',
      lg: '1280px',
    },
    extend: {
      borderRadius: {
        '20': '20px',
      },
      backgroundImage: {
        'custom': 'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(197, 197, 197, 0.434343) 28%, rgba(153, 153, 153, 0) 49.5%)',
        'custom-mobile': 'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(197, 197, 197, 0.434343) 49.56%)',
      },
      fontSize: {
        '10': '10px',
        '13': '13px',
        '14': '14px',
        '27': '27px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px'
      },
      colors: {
        white: 'rgb(var(--color-white) / <alpha-value>)',
        'base-dark': 'var(--color-base-dark)',
        'dark-gray': 'var(--color-dark-gray)',
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
        'innovate' : 'rgb(var(--color-innovate) / <alpha-value>)',
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
      },
      fontFamily: {
        ['inter-tight']: ['var(--font-inter-tight)'],
        grotesk: ['var(--font-space-grotesk)'],
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        spin: 'spin 2.4s linear infinite',
        spin2: 'spin 0.4s linear infinite',
        'spin-slow': 'spin 220s linear infinite',
      },
    },
  },
  darkMode: 'class',
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    nextui({
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
          },
        },
      },
    }),
  ],
};
export default config;
