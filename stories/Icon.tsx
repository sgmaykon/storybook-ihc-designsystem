import type { CSSProperties } from 'react';
import { ICONS, type IconName } from './icons';
import './icon.css';

export interface IconProps {
  /** Nome no registro, ex.: "material/call" ou "lucide/house". */
  name: IconName;
  /** Tamanho em px (o Figma usa 14–29 px). */
  size?: number;
  /**
   * Rótulo acessível. Quando omitido o ícone é decorativo (`aria-hidden`),
   * o que é o correto quando há texto ao lado.
   */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Ícone monocromático. A cor vem de `currentColor`, então basta definir
 * `color` no elemento pai.
 */
export function Icon({ name, size = 24, label, className, style }: IconProps) {
  const url = ICONS[name];

  if (!url) {
    if (import.meta.env.DEV) {
      console.warn(`[Ajudivas] Ícone não encontrado: ${name}`);
    }
    return null;
  }

  return (
    <span
      className={['ajd-icon', className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        '--ajd-icon-size': `${size}px`,
        '--ajd-icon-url': `url("${url}")`,
        ...style,
      } as CSSProperties}
    />
  );
}
