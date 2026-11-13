import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconGallery } from './IconGallery';

const meta = {
  title: 'Ajudivas/Icons',
  component: IconGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Biblioteca de ícones do Ajudivas. 97 ícones **Google Material Symbols Rounded** (wght 300, FILL 0, ' +
          '24 px — Apache 2.0) + 14 ícones originais da Home em **Lucide** (ISC), exatamente como no catálogo ' +
          '"Ajudivas / Catálogo de ícones" do Figma (node 1010:15). ' +
          'Todos herdam a cor do texto (`currentColor`) e o tamanho via prop `size`.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Catálogo completo, agrupado como no Figma. */
export const Catalogo: Story = {};

/** Apenas os grupos usados nos componentes desta entrega. */
export const Essenciais: Story = {
  args: {
    groups: ['mapa', 'seguranca', 'acessibilidade', 'home'],
  },
};
