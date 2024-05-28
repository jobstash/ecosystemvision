/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '20em',
        'mantine-breakpoint-sm': '22.5em',
        'mantine-breakpoint-md': '40em',
        'mantine-breakpoint-lg': '80em',
        'mantine-breakpoint-xl': '120em',
      },
    },
    tailwindcss: {},
  },
};

export default config;
