import { Icon } from './Icon';
import type { IconName } from './icons';
import './nav-bar.css';

export type NavDestination = 'inicio' | 'feed' | 'panico' | 'contatos' | 'ajustes';

interface NavItem {
  id: NavDestination;
  label: string;
  icon: IconName;
  /** O destino "Pânico" tem tratamento visual próprio (botão elevado). */
  danger?: boolean;
}

const ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: 'lucide/house' },
  { id: 'feed', label: 'Feed', icon: 'lucide/message-square' },
  { id: 'panico', label: 'Pânico', icon: 'lucide/triangle-alert', danger: true },
  { id: 'contatos', label: 'Contatos úteis', icon: 'material/call' },
  { id: 'ajustes', label: 'Ajustes', icon: 'lucide/settings' },
];

export interface NavBarProps {
  /** Destino ativo (Figma: Property 1 = Default | Feed). */
  active?: NavDestination;
  onNavigate?: (destination: NavDestination) => void;
  className?: string;
}

/**
 * Menu de navegação inferior (Figma: "NavBar", 1029:2603).
 *
 * RNF01: os cinco destinos ficam na metade inferior da tela e têm alvo de
 * toque de 70 × 76 px; o pânico é o maior alvo (56 px de diâmetro, elevado).
 */
export function NavBar({ active = 'inicio', onNavigate, className }: NavBarProps) {
  return (
    <nav
      className={['ajd-root', 'ajd-navbar', className].filter(Boolean).join(' ')}
      aria-label="Navegação principal"
    >
      <ul className="ajd-navbar__surface">
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="ajd-navbar__item">
              <button
                type="button"
                className="ajd-navbar__button"
                data-destination={item.id}
                data-active={isActive || undefined}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.danger ? 'Acionar pânico' : undefined}
                onClick={() => onNavigate?.(item.id)}
              >
                {isActive && !item.danger && (
                  <span className="ajd-navbar__indicator" aria-hidden="true" />
                )}
                <span
                  className={
                    item.danger ? 'ajd-navbar__panic' : 'ajd-navbar__icon'
                  }
                >
                  <Icon name={item.icon} size={item.danger ? 29 : 24} />
                </span>
                <span className="ajd-navbar__label">{item.label}</span>
                {item.danger && (
                  <span className="ajd-visually-hidden">
                    Aciona o modo pânico e abre o discador de emergência
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <span className="ajd-navbar__gesture" aria-hidden="true" />
    </nav>
  );
}
