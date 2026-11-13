import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { NavBar, type NavDestination } from './NavBar';

const meta = {
  title: 'Ajudivas/NavBar',
  component: NavBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'ink' },
    docs: {
      description: {
        component:
          'Menu inferior (Figma "NavBar", node 1029:2603). Variantes Default (Início ativo) e Feed (Feed ativo). ' +
          'Atende RNF01: todos os destinos ficam na metade inferior da tela, com alvo de toque de 70 × 76 px.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'inline-radio',
      options: ['inicio', 'feed', 'panico', 'contatos', 'ajustes'],
    },
    onNavigate: { action: 'navigate' },
  },
  args: { onNavigate: fn() },
  decorators: [
    (Story) => (
      <div style={{ padding: 48, background: '#211d29' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Variante Default do Figma. */
export const Default: Story = { args: { active: 'inicio' } };

/** Variante Feed do Figma. */
export const Feed: Story = { args: { active: 'feed' } };

/** Foco no botão de pânico (elevado, 56 px, vermelho). */
export const Panico: Story = { args: { active: 'panico' } };

function NavBarFlow() {
  const [active, setActive] = useState<NavDestination>('inicio');
  return <NavBar active={active} onNavigate={setActive} />;
}

/** Navegação real entre os cinco destinos. */
export const Interativo: Story = {
  render: () => <NavBarFlow />,
};
