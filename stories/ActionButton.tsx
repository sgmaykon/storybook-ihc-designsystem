import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import './action-button.css';

export type ActionButtonVariant = 'cta' | 'primary' | 'secondary' | 'ghost' | 'danger';
export type ActionButtonSize = 'sm' | 'md' | 'lg';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Hierarquia de ação (ver "Cores" nos tokens). */
  variant?: ActionButtonVariant;
  /** sm = 32 px · md = 40 px (padrão do Figma) · lg = 48 px (alvo Material). */
  size?: ActionButtonSize;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  children: ReactNode;
}

/**
 * Botão de ação do Ajudivas.
 *
 * - `cta`: ação principal de uma tela (ex.: "Iniciar rota") — roxo preenchido.
 * - `primary`: ação primária padrão — roxo preenchido.
 * - `secondary`: ação alternativa — roxo tonal (#EADDFF).
 * - `ghost`: ação terciária — apenas texto/ícone roxo.
 * - `danger`: ação destrutiva/emergência — vermelho preenchido.
 */
export function ActionButton({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  fullWidth = false,
  children,
  className,
  type = 'button',
  ...rest
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={[
        'ajd-root',
        'ajd-button',
        `ajd-button--${variant}`,
        `ajd-button--${size}`,
        fullWidth ? 'ajd-button--full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && iconPosition === 'start' && <Icon name={icon} size={18} />}
      <span className="ajd-button__label">{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} size={18} />}
    </button>
  );
}
