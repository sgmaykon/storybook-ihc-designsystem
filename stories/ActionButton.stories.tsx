import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ActionButton } from './ActionButton';

const meta = {
  title: 'Ajudivas/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'surface' },
    docs: {
      description: {
        component:
          'Botão de ação do Ajudivas. A hierarquia de cores segue o Figma: CTA/Primária em roxo #6750A4 ' +
          '(6.44:1 com texto branco), Secundária tonal #EADDFF (7.23:1) e Perigo em #DC2626 (4.83:1). ' +
          'Use `lg` (48 px) quando o alvo precisar atender ao mínimo de 48 dp do Material / WCAG 2.5.5.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['cta', 'primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: 'text' },
    iconPosition: { control: 'inline-radio', options: ['start', 'end'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: { onClick: fn(), children: 'Iniciar rota' },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: 'var(--ajd-color-surface)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CTA: Story = {
  args: { variant: 'cta', icon: 'material/navigation' },
};

export const Primaria: Story = {
  args: { variant: 'primary', children: 'Compartilhar rota', icon: 'material/share' },
};

export const Secundaria: Story = {
  args: { variant: 'secondary', children: 'Ver no mapa', icon: 'material/map' },
};

export const Terciaria: Story = {
  args: { variant: 'ghost', children: 'Cancelar' },
};

export const Perigo: Story = {
  args: { variant: 'danger', children: 'Acionar pânico', icon: 'lucide/triangle-alert' },
};

export const Grande: Story = {
  args: { variant: 'cta', size: 'lg', children: 'Iniciar rota', icon: 'material/navigation' },
};

export const Pequena: Story = {
  args: { variant: 'secondary', size: 'sm', children: 'Filtrar' },
};

export const Desabilitada: Story = {
  args: { variant: 'primary', disabled: true, children: 'Aguardando GPS' },
};
