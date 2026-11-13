import { Icon } from './Icon';
import './occurrence-marker.css';

export type MarkerSeverity = 'grave' | 'media';

export interface OccurrenceMarkerProps {
  /** `grave` = vermelho · `media` = laranja (Figma: Property 1). */
  severity?: MarkerSeverity;
  /** Texto exibido sob o marcador. */
  label?: string;
  /** Rótulo acessível; por padrão inclui a gravidade. */
  ariaLabel?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Marcador de ocorrência no mapa (Figma: "Ocorrencia", 1016:798).
 */
export function OccurrenceMarker({
  severity = 'grave',
  label = 'Ocorrência',
  ariaLabel,
  selected = false,
  onClick,
  className,
}: OccurrenceMarkerProps) {
  const severityLabel = severity === 'grave' ? 'grave' : 'média';
  const interactive = typeof onClick === 'function';

  const content = (
    <>
      <span className="ajd-marker__halo">
        <span className="ajd-marker__badge">
          <Icon name="lucide/triangle-alert" size={20} />
        </span>
      </span>
      <span className="ajd-marker__label">{label}</span>
    </>
  );

  const classes = [
    'ajd-root',
    'ajd-marker',
    `ajd-marker--${severity}`,
    selected ? 'ajd-marker--selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!interactive) {
    return (
      <span className={classes} role="img" aria-label={ariaLabel ?? `${label} — gravidade ${severityLabel}`}>
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel ?? `${label} — gravidade ${severityLabel}`}
      aria-pressed={selected || undefined}
    >
      {content}
    </button>
  );
}
