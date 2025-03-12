import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { theme } from '../src/theme';

initialize(); // MSW 초기화

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'blue',
    values: [
      { name: 'blue', value: '#2cc5d2' },
      { name: 'white', value: '#fff' },
    ],
  },
};

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];

export const loaders = [mswLoader]; // `mswLoader`를 `loaders`로 적용
