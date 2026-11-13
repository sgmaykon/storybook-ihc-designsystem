/**
 * Tokens tipados + tabela de contraste calculada (WCAG 2.1).
 * Os valores espelham `tokens.css` e o arquivo Figma "Projeto IHC".
 */

export interface ColorToken {
  /** Nome do token CSS (sem o prefixo --ajd-) */
  token: string;
  /** Papel semântico */
  role: string;
  /** Hex do arquivo Figma */
  hex: string;
  /** Onde é usado no design */
  usage: string;
  /** Contraste medido sobre #FFFFFF (texto/ícone) */
  onWhite: number;
  /** Contraste medido sobre #F3EDF7 (superfície padrão) */
  onSurface: number;
}

export const colorTokens: ColorToken[] = [
  {
    token: 'color-primary',
    role: 'Primária / Ação principal (CTA)',
    hex: '#6750A4',
    usage: 'Botões primários, ícone ativo, links, "Rota segura"',
    onWhite: 6.44,
    onSurface: 5.6,
  },
  {
    token: 'color-on-primary',
    role: 'Texto em botão primário',
    hex: '#FFFFFF',
    usage: 'Texto e ícones dentro de botões roxos (CTA)',
    onWhite: 1,
    onSurface: 4.35,
  },
  {
    token: 'color-highlight-bg',
    role: 'Fundo de destaque',
    hex: '#EADDFF',
    usage: 'Selo "Recomendada", pílula do item ativo da NavBar',
    onWhite: 1.25,
    onSurface: 1.05,
  },
  {
    token: 'color-highlight-text',
    role: 'Texto de destaque',
    hex: '#4F378B',
    usage: 'Texto sobre #EADDFF (7.23:1) em selos, badges e pílulas',
    onWhite: 9.33,
    onSurface: 8.11,
  },
  {
    token: 'color-surface',
    role: 'Superfície do app',
    hex: '#F3EDF7',
    usage: 'Fundo das telas, NavBar, header',
    onWhite: 1.14,
    onSurface: 1,
  },
  {
    token: 'color-surface-raised',
    role: 'Superfície elevada',
    hex: '#FFFFFF',
    usage: 'Cards, barras de pesquisa, bottom sheets',
    onWhite: 1,
    onSurface: 1.14,
  },
  {
    token: 'color-outline',
    role: 'Divisória',
    hex: '#E7E1F0',
    usage: 'Linhas entre sugestões, borda de card não selecionado',
    onWhite: 1.28,
    onSurface: 1.12,
  },
  {
    token: 'color-outline-strong',
    role: 'Borda de seleção',
    hex: '#D0BCFF',
    usage: 'Contorno do card "Rota segura" selecionado',
    onWhite: 1.7,
    onSurface: 1.48,
  },
  {
    token: 'color-text-primary',
    role: 'Texto principal',
    hex: '#211D29',
    usage: 'Display e títulos (Bold 700), métricas (SemiBold 600), corpo (Regular 400)',
    onWhite: 16.5,
    onSurface: 14.36,
  },
  {
    token: 'color-text-secondary',
    role: 'Texto secundário',
    hex: '#625B71',
    usage: 'Descrições e placeholders (Regular 400), rótulos NavBar e legendas (Medium 500)',
    onWhite: 6.45,
    onSurface: 5.61,
  },
  {
    token: 'color-danger',
    role: 'Perigo (preenchimento)',
    hex: '#DC2626',
    usage: 'Botão de pânico, marcador de ocorrência grave, ícone',
    onWhite: 4.83,
    onSurface: 4.24,
  },
  {
    token: 'color-danger-strong',
    role: 'Perigo (texto)',
    hex: '#B91C1C',
    usage: 'Texto de perigo sobre branco, hover do botão de pânico',
    onWhite: 6.47,
    onSurface: 5.68,
  },
  {
    token: 'color-danger-highlight-bg',
    role: 'Fundo de destaque de perigo',
    hex: '#FEE2E2',
    usage: 'Selo "Cuidado", contador de relatos graves',
    onWhite: 1.13,
    onSurface: 1.01,
  },
  {
    token: 'color-danger-highlight-text',
    role: 'Texto de destaque de perigo',
    hex: '#991B1B',
    usage: 'Texto sobre #FEE2E2 (6.80:1) em selos e contadores',
    onWhite: 8.31,
    onSurface: 7.29,
  },
  {
    token: 'color-warning',
    role: 'Atenção (preenchimento)',
    hex: '#E46962',
    usage: 'Marcador de ocorrência média, ícone de alerta',
    onWhite: 3.23,
    onSurface: 2.81,
  },
  {
    token: 'color-warning-strong',
    role: 'Atenção (texto)',
    hex: '#9A3412',
    usage: 'Substitui #E46962 quando o elemento é texto pequeno (7.31:1)',
    onWhite: 7.31,
    onSurface: 6.36,
  },
  {
    token: 'color-warning-highlight-bg',
    role: 'Fundo de destaque de atenção',
    hex: '#FEEFE2',
    usage: 'Contador de relatos de gravidade média',
    onWhite: 1.11,
    onSurface: 1.01,
  },
  {
    token: 'color-warning-highlight-text',
    role: 'Texto de destaque de atenção',
    hex: '#994D1B',
    usage: 'Texto sobre #FEEFE2 (5.44:1) em contadores médios',
    onWhite: 6.12,
    onSurface: 5.37,
  },
];

export type ContrastLevel = 'AA' | 'AA-large' | 'Decorativo' | 'Falha';

export interface ContrastPair {
  foreground: string;
  background: string;
  ratio: number;
  /** Exigência aplicada */
  requirement: string;
  level: ContrastLevel;
  note: string;
}

/** Pares texto/fundo e componentes visuais realmente usados no Design System. */
export const contrastPairs: ContrastPair[] = [
  {
    foreground: 'color-text-primary #211D29',
    background: 'color-surface-raised #FFFFFF',
    ratio: 16.5,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Títulos e corpo sobre cards.',
  },
  {
    foreground: 'color-text-primary #211D29',
    background: 'color-surface #F3EDF7',
    ratio: 14.36,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Texto do header sobre a superfície do app.',
  },
  {
    foreground: 'color-text-secondary #625B71',
    background: 'color-surface-raised #FFFFFF',
    ratio: 6.45,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Placeholder da busca e descrições.',
  },
  {
    foreground: 'color-text-secondary #625B71',
    background: 'color-surface #F3EDF7',
    ratio: 5.61,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Rótulos da NavBar sobre a superfície.',
  },
  {
    foreground: 'color-primary #6750A4',
    background: 'color-surface-raised #FFFFFF',
    ratio: 6.44,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Links, rótulo ativo da NavBar, texto da sugestão.',
  },
  {
    foreground: 'color-primary #6750A4',
    background: 'color-surface #F3EDF7',
    ratio: 5.6,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Ícones e rótulos sobre a NavBar.',
  },
  {
    foreground: 'color-on-primary #FFFFFF',
    background: 'color-primary #6750A4',
    ratio: 6.44,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Botão "Iniciar rota" e botões primários.',
  },
  {
    foreground: 'color-highlight-text #4F378B',
    background: 'color-highlight-bg #EADDFF',
    ratio: 7.23,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Texto do selo "Recomendada" sobre o fundo de destaque.',
  },
  {
    foreground: 'color-primary #6750A4 (original do Figma)',
    background: 'color-highlight-bg #EADDFF',
    ratio: 5.0,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'O selo do Figma já passa AA; o token forte é margem extra.',
  },
  {
    foreground: 'color-danger-highlight-text #991B1B',
    background: 'color-danger-highlight-bg #FEE2E2',
    ratio: 6.8,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Selo "Cuidado" e contador de relatos graves.',
  },
  {
    foreground: 'color-danger-strong #B91C1C',
    background: 'color-surface-raised #FFFFFF',
    ratio: 6.47,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Texto de perigo sobre branco e hover do botão de pânico.',
  },
  {
    foreground: 'color-danger #DC2626',
    background: 'color-surface-raised #FFFFFF',
    ratio: 4.83,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Estrelas de avaliação graves (17 px) e ícones de perigo.',
  },
  {
    foreground: 'color-on-primary #FFFFFF',
    background: 'color-danger #DC2626',
    ratio: 4.83,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Botão de pânico e marcador grave (ícone branco).',
  },
  {
    foreground: 'color-warning-strong #9A3412',
    background: 'color-surface-raised #FFFFFF',
    ratio: 7.31,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Texto de atenção e estrelas de avaliação médias sobre cards.',
  },
  {
    foreground: 'color-warning-strong #9A3412',
    background: 'color-surface #F3EDF7',
    ratio: 6.36,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Texto de atenção sobre a superfície padrão do app.',
  },
  {
    foreground: 'color-warning-highlight-text #994D1B',
    background: 'color-warning-highlight-bg #FEEFE2',
    ratio: 5.44,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'AA',
    note: 'Contador de relatos de gravidade média.',
  },
  {
    foreground: 'color-danger #DC2626',
    background: 'color-danger-highlight-bg #FEE2E2',
    ratio: 3.95,
    requirement: 'Ícones / Gráficos ≥ 3:1 (WCAG 1.4.11)',
    level: 'AA-large',
    note: 'Restrito a ícones e preenchimento gráfico; para texto usa-se #991B1B (6.80:1).',
  },
  {
    foreground: 'color-warning #E46962',
    background: 'color-surface-raised #FFFFFF',
    ratio: 3.23,
    requirement: 'Ícones / Gráficos ≥ 3:1 (WCAG 1.4.11)',
    level: 'AA-large',
    note: 'Restrito ao marcador de mapa e ícones grandes; para texto usa-se #9A3412 (7.31:1).',
  },
  {
    foreground: 'color-outline-strong #D0BCFF',
    background: 'color-surface #F3EDF7',
    ratio: 1.48,
    requirement: 'Isento (WCAG 1.4.11 — decorativo)',
    level: 'Decorativo',
    note: 'Borda decorativa redundante: a seleção já é indicada por fundo branco, selo e aria-checked.',
  },
  {
    foreground: 'color-outline #E7E1F0',
    background: 'color-surface-raised #FFFFFF',
    ratio: 1.28,
    requirement: 'Isento (WCAG 1.4.11 — decorativo)',
    level: 'Decorativo',
    note: 'Divisória visual decorativa; nenhum controle depende exclusivamente dela.',
  },
];

/** Combinações do Figma original proibidas para texto pequeno e seus substitutos no Design System. */
export const forbiddenContrastPairs: ContrastPair[] = [
  {
    foreground: 'color-warning #E46962 (como texto pequeno)',
    background: 'color-surface-raised #FFFFFF',
    ratio: 3.23,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'Falha',
    note: 'Substituído no Design System por --ajd-color-warning-strong #9A3412 (7.31:1 — Passa AA).',
  },
  {
    foreground: 'color-warning #E46962 (isolado sobre lilás)',
    background: 'color-surface #F3EDF7',
    ratio: 2.81,
    requirement: 'Não-texto ≥ 3:1',
    level: 'Falha',
    note: 'No mapa o marcador usa borda e sombra próprias; para texto usa-se #9A3412 (6.36:1 — Passa AA).',
  },
  {
    foreground: 'color-danger #DC2626 (como texto pequeno)',
    background: 'color-danger-highlight-bg #FEE2E2',
    ratio: 3.95,
    requirement: 'Texto normal ≥ 4.5:1',
    level: 'Falha',
    note: 'Substituído em textos de selo por --ajd-color-danger-highlight-text #991B1B (6.80:1 — Passa AA).',
  },
];

export interface TypeToken {
  token: string;
  size: string;
  weight: string;
  lineHeight: string;
  usage: string;
}

export const typeTokens: TypeToken[] = [
  {
    token: 'display',
    size: '28 px',
    weight: '700 Bold',
    lineHeight: '1.15',
    usage: 'Wordmark "Ajudivas" no header',
  },
  {
    token: 'title-lg',
    size: '22 px',
    weight: '600 SemiBold',
    lineHeight: '1.15',
    usage: 'Título do card de detalhes da ocorrência',
  },
  {
    token: 'title',
    size: '18 px',
    weight: '700 Bold',
    lineHeight: '1.35',
    usage: 'Título do painel de rotas',
  },
  {
    token: 'body',
    size: '14 px',
    weight: '400 / 500 / 700',
    lineHeight: '1.35',
    usage: 'Corpo, itens de sugestão, botões',
  },
  {
    token: 'label',
    size: '12 px',
    weight: '600 SemiBold / 700',
    lineHeight: '1.35',
    usage: 'Badges, "Sugestões recentes", valores de métrica',
  },
  {
    token: 'label-sm',
    size: '11 px',
    weight: '500 Medium',
    lineHeight: '1.18',
    usage: 'Rótulos da NavBar e descrição da rota',
  },
  {
    token: 'caption',
    size: '10 px',
    weight: '400 / 600',
    lineHeight: '1.35',
    usage: 'Micro-legendas: selo, "Relatado há…", métricas',
  },
];

export const spacingTokens = [
  { token: 'space-1', value: '2px', usage: 'Separação entre título e legenda' },
  { token: 'space-2', value: '4px', usage: 'Gap entre ícone e texto de cidade' },
  { token: 'space-3', value: '6px', usage: 'Gap entre ícone e fator de risco' },
  { token: 'space-4', value: '8px', usage: 'Gap interno de barras e cabeçalhos' },
  { token: 'space-5', value: '10px', usage: 'Padding vertical de itens de sugestão' },
  { token: 'space-6', value: '12px', usage: 'Padding de cards e bottom sheet' },
  { token: 'space-7', value: '16px', usage: 'Padding de cards e margem lateral' },
  { token: 'space-9', value: '20px', usage: 'Padding horizontal da barra do app' },
  { token: 'space-10', value: '24px', usage: 'Padding da status bar' },
  { token: 'space-11', value: '32px', usage: 'Raio do menu inferior' },
];

export const radiusTokens = [
  { token: 'radius-xs', value: '8px', usage: 'Selo de foto ("Relatado há…")' },
  { token: 'radius-sm', value: '12px', usage: 'Badge de relatos, foto da ocorrência' },
  { token: 'radius-md', value: '14px', usage: 'Selo "Recomendada" / "Cuidado"' },
  { token: 'radius-lg', value: '16px', usage: 'Card de sugestões, indicador ativo' },
  { token: 'radius-xl', value: '18px', usage: 'Marcador de alerta (36 px)' },
  { token: 'radius-2xl', value: '20px', usage: 'Opções de rota' },
  { token: 'radius-3xl', value: '24px', usage: 'Card de ocorrência, botão "Iniciar rota"' },
  { token: 'radius-4xl', value: '32px', usage: 'Barra de pesquisa, NavBar' },
  { token: 'radius-pill', value: '999px', usage: 'Botões pílula' },
];

export const elevationTokens = [
  { token: 'shadow-1', value: '0 3px 12px rgba(33,29,41,.12)', usage: 'Barra de pesquisa, botão de pânico' },
  { token: 'shadow-2', value: '0 4px 16px rgba(33,29,41,.15)', usage: 'Card de detalhes da ocorrência' },
  { token: 'shadow-3', value: '0 8px 12px rgba(33,29,41,.15)', usage: 'Painel inferior de rotas' },
  { token: 'shadow-suggestions', value: '0 4px 6px rgba(33,29,41,.08)', usage: 'Dropdown de sugestões' },
];

/** Utilitário WCAG 2.1 — razão de contraste entre duas cores hex. */
export function contrastRatio(hexA: string, hexB: string): number {
  const luminance = (hex: string) => {
    const channels = hex
      .replace('#', '')
      .match(/../g)!
      .map((pair) => parseInt(pair, 16) / 255)
      .map((channel) =>
        channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4),
      );
    const [r, g, b] = channels;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const l1 = luminance(hexA);
  const l2 = luminance(hexB);
  return Number((((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2)));
}
