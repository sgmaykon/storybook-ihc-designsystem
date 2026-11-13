import type { Preview } from '@storybook/react-vite';

import '../stories/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        surface: { name: 'Surface · #F3EDF7', value: '#F3EDF7' },
        white: { name: 'Branco · #FFFFFF', value: '#FFFFFF' },
        ink: { name: 'Tinta · #211D29', value: '#211D29' },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    docs: {
      toc: true,
    },

    options: {
      storySort: {
        order: [
          'Ajudivas',
          ['Visão geral', 'Design tokens', 'Padrões de uso', 'Acessibilidade', 'Interações', 'Icons'],
        ],
      },
    },
  },
};

export default preview;
