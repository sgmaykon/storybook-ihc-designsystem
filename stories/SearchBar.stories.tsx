import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SearchBar } from './SearchBar';

const meta = {
  title: 'Ajudivas/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'surface' },
    docs: {
      description: {
        component:
          'Barra de pesquisa do Ajudivas (Figma "Ajudivas / Barra de pesquisa", node 1012:321). ' +
          'Três estados: `repouso`, `edicao` (com sugestões recentes) e `pesquisado`. ' +
          'A busca é o ponto de partida do fluxo de rotas (RF02).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'inline-radio',
      options: ['repouso', 'edicao', 'pesquisado'],
      description: 'Estado visual definido no Figma (Estado=...).',
    },
    value: { control: 'text' },
    onChange: { action: 'change' },
    onSubmit: { action: 'submit' },
    onSuggestionSelect: { action: 'suggestion' },
  },
  args: {
    onChange: fn(),
    onSubmit: fn(),
    onSuggestionSelect: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 358, padding: 24, background: 'var(--ajd-color-surface)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Campo sem foco, apenas com o placeholder. */
export const Repouso: Story = {
  args: { state: 'repouso' },
};

/** Campo em edição com três sugestões de histórico. */
export const EmEdicao: Story = {
  args: { state: 'edicao', value: '' },
};

/** Busca concluída: termo preenchido, sem sugestões. */
export const Pesquisado: Story = {
  args: { state: 'pesquisado', value: 'Casa da Vânia' },
};

function SearchBarFlow() {
  const [state, setState] = useState<'repouso' | 'edicao' | 'pesquisado'>('repouso');
  const [value, setValue] = useState('');

  return (
    <div style={{ width: 358, display: 'grid', gap: 16, padding: 24, background: 'var(--ajd-color-surface)' }}>
      <SearchBar
        state={state}
        value={value}
        onChange={(next) => {
          setValue(next);
          setState('edicao');
        }}
        onSuggestionSelect={(suggestion) => {
          setValue(suggestion.label);
          setState('pesquisado');
        }}
        onSubmit={() => setState('pesquisado')}
      />
      <p style={{ font: '500 12px var(--ajd-font-family)', color: 'var(--ajd-color-on-surface-variant)', margin: 0 }}>
        Digite o endereço
      </p>
    </div>
  );
}

/** Fluxo real: repouso → edição → pesquisado, com teclado e leitor de tela. */
export const Interativo: Story = {
  render: () => <SearchBarFlow />,
};
