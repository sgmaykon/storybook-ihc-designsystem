import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { OccurrenceMarker } from './OccurrenceMarker';

const meta = {
  title: 'Ajudivas/OccurrenceMarker',
  component: OccurrenceMarker,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'surface' },
    docs: {
      description: {
        component:
          'Marcador de ocorrência exibido no mapa (Figma "Ocorrencia", node 1016:798). ' +
          'Grave usa o vermelho #DC2626; média usa o laranja #E46962. No protótipo, o toque abre o balão de detalhes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'inline-radio', options: ['grave', 'media'] },
    label: { control: 'text' },
    selected: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div style={{ padding: 40, background: 'var(--ajd-color-surface)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OccurrenceMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grave: Story = { args: { severity: 'grave' } };

export const Media: Story = { args: { severity: 'media' } };

export const Selecionado: Story = { args: { severity: 'grave', selected: true } };

/** Sem `onClick` o marcador é estático (role="img"). */
export const Estatico: Story = {
  args: { severity: 'media', onClick: undefined },
};

function MarkersOnMap() {
  const [selected, setSelected] = useState<'grave' | 'media'>('grave');

  return (
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 240,
        borderRadius: 24,
        background:
          'repeating-linear-gradient(45deg, #e7e1f0 0 12px, #f3edf7 12px 24px)',
      }}
    >
      <div style={{ position: 'absolute', left: 8, top: 8 }}>
        <OccurrenceMarker
          severity="grave"
          selected={selected === 'grave'}
          onClick={() => setSelected('grave')}
        />
      </div>
      <div style={{ position: 'absolute', right: 8, bottom: 8 }}>
        <OccurrenceMarker
          severity="media"
          selected={selected === 'media'}
          onClick={() => setSelected('media')}
        />
      </div>
    </div>
  );
}

/** Dois marcadores no mapa: seleção por toque e por teclado. */
export const NoMapa: Story = {
  render: () => <MarkersOnMap />,
};
