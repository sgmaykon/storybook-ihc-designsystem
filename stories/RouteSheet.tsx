import { useId } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import './route-sheet.css';

export type RouteKind = 'segura' | 'insegura';

export interface RouteOption {
  id: RouteKind;
  title: string;
  description: string;
  badge: string;
  distance: string;
  duration: string;
  icon: IconName;
}

export interface RouteSheetProps {
  /** Opção selecionada (Figma: Property 1 = Rota Segura | Rota Insegura). */
  selected?: RouteKind;
  title?: string;
  description?: string;
  safeRoute?: Partial<RouteOption>;
  unsafeRoute?: Partial<RouteOption>;
  onSelect?: (kind: RouteKind) => void;
  onStart?: (kind: RouteKind) => void;
  onClose?: () => void;
  className?: string;
}

const SAFE: RouteOption = {
  id: 'segura',
  title: 'Rota segura',
  description: 'Mais iluminação e menor risco',
  badge: 'Recomendada',
  distance: '1,8 km',
  duration: '24 min',
  icon: 'material/near-me',
};

const UNSAFE: RouteOption = {
  id: 'insegura',
  title: 'Rota alternativa',
  description: 'Mais curta, com alerta de perigo',
  badge: 'Cuidado',
  distance: '1,6 km',
  duration: '22 min',
  icon: 'material/directions-walk',
};

function RouteOptionCard({
  option,
  kind,
  selected,
  onSelect,
}: {
  option: RouteOption;
  kind: RouteKind;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className="ajd-route__option"
      data-kind={kind}
      data-selected={selected || undefined}
      onClick={onSelect}
    >
      <span className="ajd-route__option-top">
        <span className="ajd-route__option-summary">
          <span className="ajd-route__option-icon" aria-hidden="true">
            <Icon name={option.icon} size={18} />
          </span>
          <span className="ajd-route__option-text">
            <span className="ajd-route__option-title">{option.title}</span>
            <span className="ajd-route__option-description">{option.description}</span>
          </span>
        </span>
        <span className="ajd-route__badge" aria-hidden="true">
          {option.badge}
        </span>
      </span>

      <span className="ajd-route__metrics">
        <span className="ajd-route__metric">
          <span className="ajd-route__metric-label">Distância</span>
          <span className="ajd-route__metric-value">{option.distance}</span>
        </span>
        <span className="ajd-route__metric">
          <span className="ajd-route__metric-label">Tempo</span>
          <span className="ajd-route__metric-value">{option.duration}</span>
        </span>
      </span>
    </button>
  );
}

/**
 * Painel inferior de rotas (Figma: "Painel inferior de rotas", 1037:513).
 * Compara a rota segura (recomendada) com a alternativa de risco.
 */
export function RouteSheet({
  selected = 'segura',
  title = 'Escolha sua rota',
  description = 'Compare distância, tempo e segurança antes de iniciar.',
  safeRoute,
  unsafeRoute,
  onSelect,
  onStart,
  onClose,
  className,
}: RouteSheetProps) {
  const safe = { ...SAFE, ...safeRoute };
  const unsafe = { ...UNSAFE, ...unsafeRoute };
  const titleId = `${useId()}-route-title`;

  return (
    <section
      className={['ajd-root', 'ajd-route', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <div className="ajd-route__header">
        <div className="ajd-route__heading">
          <h2 className="ajd-route__title" id={titleId}>
            {title}
          </h2>
          <p className="ajd-route__description">{description}</p>
        </div>
        <button
          type="button"
          className="ajd-route__close"
          onClick={onClose}
          aria-label="Fechar painel de rotas"
        >
          <Icon name="lucide/circle-x" size={18} />
        </button>
      </div>

      <div className="ajd-route__options" role="radiogroup" aria-label="Opções de rota">
        <RouteOptionCard
          option={safe}
          kind="segura"
          selected={selected === 'segura'}
          onSelect={() => onSelect?.('segura')}
        />
        <RouteOptionCard
          option={unsafe}
          kind="insegura"
          selected={selected === 'insegura'}
          onSelect={() => onSelect?.('insegura')}
        />
      </div>

      <button type="button" className="ajd-route__start" onClick={() => onStart?.(selected)}>
        <Icon name="material/navigation" size={18} />
        <span>Iniciar rota</span>
        <span className="ajd-visually-hidden">
          {selected === 'segura' ? 'Iniciar a rota segura recomendada' : 'Iniciar a rota alternativa com alerta'}
        </span>
      </button>
    </section>
  );
}
