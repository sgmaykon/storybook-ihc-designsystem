import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AccessibilityToolbar } from './AccessibilityToolbar';

const meta = {
  title: 'Ajudivas/AccessibilityToolbar',
  component: AccessibilityToolbar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'surface' },
    docs: {
      description: {
        component:
          'Barra de acessibilidade (WCAG 2.1 AA + diretrizes do Google Material). ' +
          'Botões de 48 × 56 px, `role="toolbar"`, navegação por setas, `aria-pressed` nos estados e ' +
          'anúncios em `aria-live`. "Contraste" e "Texto" aplicam atributos em `document.documentElement` ' +
          'e todos os componentes reagem pelos tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    highContrast: { control: 'boolean' },
    textScale: { control: 'inline-radio', options: ['compact', 'default', 'large'] },
    voiceReading: { control: 'boolean' },
    simplifiedMap: { control: 'boolean' },
    onHighContrastChange: { action: 'contrast' },
    onTextScaleChange: { action: 'text-scale' },
    onOpenHelp: { action: 'help' },
  },
  args: {
    onHighContrastChange: fn(),
    onTextScaleChange: fn(),
    onOpenHelp: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: 'var(--ajd-color-surface)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccessibilityToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Barra no estado padrão. */
export const Default: Story = {};

/** Alto contraste controlado por prop. */
export const AltoContraste: Story = {
  args: { highContrast: true, textScale: 'large' },
};

function ToolbarInContext() {
  const [highContrast, setHighContrast] = useState(false);
  const [scale, setScale] = useState<'compact' | 'default' | 'large'>('default');

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        width: 366,
        padding: 16,
        borderRadius: 24,
        background: 'var(--ajd-color-surface)',
        fontFamily: 'var(--ajd-font-family)',
      }}
    >
      <AccessibilityToolbar
        highContrast={highContrast}
        textScale={scale}
        onHighContrastChange={setHighContrast}
        onTextScaleChange={setScale}
      />
      <div
        style={{
          padding: 16,
          borderRadius: 16,
          background: 'var(--ajd-color-surface-raised)',
          boxShadow: 'var(--ajd-shadow-1)',
        }}
      >
        <h3
          style={{
            margin: '0 0 4px',
            fontSize: 'var(--ajd-font-size-title)',
            color: 'var(--ajd-color-on-surface)',
          }}
        >
          Escolha sua rota
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--ajd-font-size-label)',
            color: 'var(--ajd-color-on-surface-variant)',
          }}
        >
          Compare distância, tempo e segurança antes de iniciar. Ative o alto contraste e o texto ampliado
          para ver os tokens reagirem.
        </p>
      </div>
    </div>
  );
}

/** Em contexto: os botões alteram os tokens do contêiner de demonstração. */
export const EmContexto: Story = {
  render: () => <ToolbarInContext />,
};
