import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { RouteSheet, type RouteKind } from './RouteSheet';

const meta = {
  title: 'Ajudivas/RouteSheet',
  component: RouteSheet,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'ink' },
    docs: {
      description: {
        component:
          'Painel inferior de rotas (Figma "Painel inferior de rotas", node 1037:513). ' +
          'Compara a rota segura (recomendada, roxa) com a alternativa (alerta, vermelha). ' +
          'No protótipo, escolher a alternativa troca a variante para "Rota Insegura" e "Iniciar rota" navega para o mapa em acompanhamento.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'inline-radio',
      options: ['segura', 'insegura'],
      description: 'Property 1 do Figma.',
    },
    onSelect: { action: 'select' },
    onStart: { action: 'start' },
    onClose: { action: 'close' },
  },
  args: { onSelect: fn(), onStart: fn(), onClose: fn() },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: '#211d29' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RouteSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Variante "Rota Segura": recomendada selecionada. */
export const RotaSegura: Story = { args: { selected: 'segura' } };

/** Variante "Rota Insegura": alternativa com alerta selecionada. */
export const RotaInsegura: Story = { args: { selected: 'insegura' } };

function RouteFlow() {
  const [selected, setSelected] = useState<RouteKind>('segura');
  const [started, setStarted] = useState<RouteKind | null>(null);

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center', padding: 32, background: '#211d29' }}>
      <RouteSheet
        selected={selected}
        onSelect={setSelected}
        onStart={(kind) => setStarted(kind)}
      />
      {started && (
        <p
          role="status"
          style={{
            margin: 0,
            font: '500 12px var(--ajd-font-family)',
            color: '#f3edf7',
          }}
        >
          Rota iniciada: {started === 'segura' ? 'segura' : 'alternativa'} — acompanhamento em segundo plano (RF06).
        </p>
      )}
    </div>
  );
}

/** Seleção entre as duas rotas e início do trajeto. */
export const Interativo: Story = {
  render: () => <RouteFlow />,
};
