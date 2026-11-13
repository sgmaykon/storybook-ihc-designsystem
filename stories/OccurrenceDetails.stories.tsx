import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { OccurrenceDetails } from './OccurrenceDetails';

const meta = {
  title: 'Ajudivas/OccurrenceDetails',
  component: OccurrenceDetails,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'ink' },
    docs: {
      description: {
        component:
          'Balão de detalhes da ocorrência (Figma "Detalhes da ocorrência", node 1016:759). ' +
          'No protótipo ele é ancorado no marcador do mapa e fecha com o X (voltar). ' +
          'Exibe avaliação comunitária (RF09), contagem de relatos, foto noturna e fatores de risco (RF03).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'inline-radio',
      options: ['grave', 'medio'],
      description: 'Property 1 do Figma: Grave (vermelho) ou Médio (laranja).',
    },
    rating: { control: { type: 'range', min: 1, max: 5, step: 1 } },
    reportCount: { control: 'number' },
    reportedAgo: { control: 'text' },
    anchorX: { control: { type: 'range', min: 0, max: 330, step: 1 } },
    onClose: { action: 'close' },
  },
  args: { onClose: fn() },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: '#211d29' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OccurrenceDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Gravidade alta: rua pouco iluminada, 2 estrelas, 14 relatos. */
export const Grave: Story = {
  args: { severity: 'grave' },
};

/** Gravidade média: aglomeração de homens, 3 estrelas, 6 relatos. */
export const Medio: Story = {
  args: { severity: 'medio' },
};

/** Balão em uso: fecha e reabre, simulando o toque no marcador do mapa. */
function OccurrenceFlow() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'center', padding: 32, background: '#211d29' }}>
      {open ? (
        <OccurrenceDetails severity="grave" onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            border: 0,
            borderRadius: 999,
            padding: '12px 20px',
            background: 'var(--ajd-color-primary)',
            color: '#fff',
            font: '700 14px var(--ajd-font-family)',
            cursor: 'pointer',
          }}
        >
          Abrir detalhes da ocorrência
        </button>
      )}
    </div>
  );
}

export const Interativo: Story = {
  render: () => <OccurrenceFlow />,
};
