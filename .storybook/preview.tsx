import '../src/app/globals.css';

import type { Preview } from '@storybook/react';
import { NextUIProvider } from '@/shared/providers/next-ui-provider';

const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    default: 'default',
    values: [{ name: 'default', value: '#141317' }],
  },
  nextjs: {
    appDirectory: true,
  },
};

const decorators: Preview['decorators'] = [
  (Story) => (
    <NextUIProvider>
      <Story />
    </NextUIProvider>
  ),
];

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
