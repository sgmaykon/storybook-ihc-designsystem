import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import photoGrave from './assets/photos/rua-pouco-iluminada.jpg';
import photoMedia from './assets/photos/aglomeracao-de-homens.jpg';
import './occurrence-details.css';

export type OccurrenceSeverity = 'grave' | 'medio';

export interface RiskFactor {
  icon: IconName;
  label: string;
}

export interface OccurrenceDetailsProps {
  /** `grave` = vermelho · `medio` = laranja (Figma: Property 1). */
  severity?: OccurrenceSeverity;
  title?: string;
  /** Avaliação de 1 a 5 estrelas. */
  rating?: number;
  reportCount?: number;
  reportedAgo?: string;
  photoSrc?: string;
  photoAlt?: string;
  riskFactors?: RiskFactor[];
  /** Posição horizontal (px) da seta do balão, relativa ao card. */
  anchorX?: number;
  onClose?: () => void;
  className?: string;
}

const defaults: Record<
  OccurrenceSeverity,
  Required<Pick<OccurrenceDetailsProps, 'title' | 'rating' | 'reportCount' | 'reportedAgo' | 'photoSrc' | 'photoAlt' | 'riskFactors' | 'anchorX'>>
> = {
  grave: {
    title: 'Rua pouco iluminada',
    rating: 2,
    reportCount: 14,
    reportedAgo: 'Relatado há 1 hora',
    photoSrc: photoGrave,
    photoAlt: 'Foto noturna de rua com pouca iluminação pública',
    riskFactors: [
      { icon: 'lucide/lightbulb-off', label: 'Pouca iluminação' },
      { icon: 'lucide/sprout', label: 'Mato alto' },
    ],
    anchorX: 124,
  },
  medio: {
    title: 'Aglomeração de Homens',
    rating: 3,
    reportCount: 6,
    reportedAgo: 'Relatado há 1 dia',
    photoSrc: photoMedia,
    photoAlt: 'Foto noturna de rua com aglomeração de pessoas e motocicletas',
    riskFactors: [{ icon: 'material/person', label: 'Muitos homens' }],
    anchorX: 207,
  },
};

const starText = (rating: number) => '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));

/**
 * Detalhes da ocorrência (Figma: "Detalhes da ocorrência", 1016:759).
 * Balão ancorado no mapa com título, avaliação, relatos, foto e fatores de risco.
 */
export function OccurrenceDetails({
  severity = 'grave',
  title,
  rating,
  reportCount,
  reportedAgo,
  photoSrc,
  photoAlt,
  riskFactors,
  anchorX,
  onClose,
  className,
}: OccurrenceDetailsProps) {
  const preset = defaults[severity];
  const resolved = {
    title: title ?? preset.title,
    rating: Math.min(5, Math.max(1, rating ?? preset.rating)),
    reportCount: reportCount ?? preset.reportCount,
    reportedAgo: reportedAgo ?? preset.reportedAgo,
    photoSrc: photoSrc ?? preset.photoSrc,
    photoAlt: photoAlt ?? preset.photoAlt,
    riskFactors: riskFactors ?? preset.riskFactors,
    anchorX: anchorX ?? preset.anchorX,
  };

  return (
    <div
      className={['ajd-root', 'ajd-occurrence', `ajd-occurrence--${severity}`, className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--ajd-occurrence-anchor': `${resolved.anchorX}px` } as CSSProperties}
    >
      <div className="ajd-occurrence__card" role="group" aria-label={`Detalhes da ocorrência: ${resolved.title}`}>
        <div className="ajd-occurrence__header">
          <h2 className="ajd-occurrence__title">{resolved.title}</h2>
          <button
            type="button"
            className="ajd-occurrence__close"
            onClick={onClose}
            aria-label="Fechar detalhes da ocorrência"
          >
            <Icon name="lucide/x" size={20} />
          </button>
        </div>

        <div className="ajd-occurrence__meta">
          <p
            className="ajd-occurrence__rating"
            role="img"
            aria-label={`Avaliação da comunidade: ${resolved.rating} de 5 estrelas`}
          >
            <Icon name="lucide/triangle-alert" size={18} className="ajd-occurrence__rating-icon" />
            <span aria-hidden="true">{starText(resolved.rating)}</span>
          </p>
          <p className="ajd-occurrence__reports">
            {resolved.reportCount} relatos de mulheres
          </p>
        </div>

        <figure className="ajd-occurrence__photo">
          <img src={resolved.photoSrc} alt={resolved.photoAlt} loading="lazy" />
          <figcaption className="ajd-occurrence__photo-caption">{resolved.reportedAgo}</figcaption>
        </figure>

        <ul className="ajd-occurrence__factors" aria-label="Fatores de risco">
          {resolved.riskFactors.map((factor) => (
            <li key={factor.label} className="ajd-occurrence__factor">
              <Icon name={factor.icon} size={18} />
              <span>{factor.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <span className="ajd-occurrence__anchor" aria-hidden="true" />
    </div>
  );
}
