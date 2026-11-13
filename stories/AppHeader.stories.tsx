import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AppHeader } from './AppHeader';

const meta = {
  title: 'Ajudivas/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'ink' },
    docs: {
      description: {
        component:
          'Header + pesquisa (Figma "header + pesquisa", node 1018:2148). Compõe a status bar do Android, ' +
          'a identidade do app e a `SearchBar`. No protótipo, tocar na barra muda para o estado "Em edição".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    searchState: {
      control: 'inline-radio',
      options: ['repouso', 'edicao', 'pesquisado'],
    },
    onSearchFocus: { action: 'focus' },
    onSearchChange: { action: 'change' },
    onSearchSubmit: { action: 'submit' },
  },
  args: { onSearchFocus: fn(), onSearchChange: fn(), onSearchSubmit: fn() },
  decorators: [
    (Story) => (
      <div style={{ background: '#211d29', padding: '0 0 24px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estado padrão da Home: busca em repouso. */
export const Default: Story = {};

/** Busca aberta com sugestões recentes. */
export const BuscaEmEdicao: Story = {
  args: { searchState: 'edicao' },
};

function HeaderFlow() {
  const [state, setState] = useState<'repouso' | 'edicao' | 'pesquisado'>('repouso');
  const [value, setValue] = useState('');

  return (
    <AppHeader
      searchState={state}
      searchValue={value}
      onSearchFocus={() => setState('edicao')}
      onSearchChange={setValue}
      onSearchSuggestionSelect={(suggestion) => {
        setValue(suggestion.label);
        setState('pesquisado');
      }}
      onSearchSubmit={(next) => {
        setValue(next);
        setState('pesquisado');
      }}
    />
  );
}

/** Fluxo do protótipo: repouso → em edição → pesquisado. */
export const Interativo: Story = {
  render: () => <HeaderFlow />,
};
