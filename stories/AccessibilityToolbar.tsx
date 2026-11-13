import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import './accessibility-toolbar.css';

export type TextScale = 'compact' | 'default' | 'large';

export interface AccessibilityToolbarProps {
  /** Alto contraste controlado pelo pai; se omitido, o componente controla. */
  highContrast?: boolean;
  /** Escala de texto controlada pelo pai. */
  textScale?: TextScale;
  voiceReading?: boolean;
  simplifiedMap?: boolean;
  onHighContrastChange?: (enabled: boolean) => void;
  onTextScaleChange?: (scale: TextScale) => void;
  onVoiceReadingChange?: (enabled: boolean) => void;
  onSimplifiedMapChange?: (enabled: boolean) => void;
  onOpenHelp?: () => void;
  className?: string;
}

interface ToolbarAction {
  id: string;
  icon: IconName;
  label: string;
  ariaLabel: string;
}

const ACTIONS: ToolbarAction[] = [
  { id: 'text-decrease', icon: 'material/remove', label: 'Texto −', ariaLabel: 'Diminuir tamanho do texto' },
  { id: 'text-increase', icon: 'material/text-increase', label: 'Texto +', ariaLabel: 'Aumentar tamanho do texto' },
  { id: 'contrast', icon: 'material/contrast', label: 'Contraste', ariaLabel: 'Ativar alto contraste' },
  { id: 'voice', icon: 'material/volume-up', label: 'Voz', ariaLabel: 'Ativar leitura em voz alta' },
  { id: 'map', icon: 'material/visibility', label: 'Mapa', ariaLabel: 'Ativar mapa simplificado' },
  { id: 'help', icon: 'material/accessibility-new', label: 'Ajuda', ariaLabel: 'Abrir ajuda de acessibilidade' },
];

/**
 * Barra de ferramentas de acessibilidade.
 *
 * Segue as diretrizes de acessibilidade do Material Design e da WCAG 2.1 AA:
 * - `role="toolbar"` com navegação por setas (padrão de toolbar);
 * - alvos de toque de 48 × 56 px (WCAG 2.5.5 / Material 48 dp);
 * - estados de alternância expostos via `aria-pressed`;
 * - mudanças anunciadas em região `aria-live="polite"`;
 * - foco visível de 3 px com halo branco (WCAG 2.4.7 / 1.4.11).
 *
 * Ao ativar "Contraste" ou "Texto", os atributos são aplicados em
 * `document.documentElement`, então todos os tokens de `tokens.css` reagem.
 */
export function AccessibilityToolbar({
  highContrast,
  textScale,
  voiceReading = false,
  simplifiedMap = false,
  onHighContrastChange,
  onTextScaleChange,
  onVoiceReadingChange,
  onSimplifiedMapChange,
  onOpenHelp,
  className,
}: AccessibilityToolbarProps) {
  const [internalContrast, setInternalContrast] = useState(false);
  const [internalScale, setInternalScale] = useState<TextScale>('default');
  const [announcement, setAnnouncement] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const contrast = highContrast ?? internalContrast;
  const scale = textScale ?? internalScale;

  useEffect(() => {
    const root = document.documentElement;
    if (contrast) root.dataset.ajdContrast = 'high';
    else delete root.dataset.ajdContrast;
    return () => {
      delete root.dataset.ajdContrast;
    };
  }, [contrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (scale === 'default') delete root.dataset.ajdText;
    else root.dataset.ajdText = scale;
    return () => {
      delete root.dataset.ajdText;
    };
  }, [scale]);

  const setContrast = (next: boolean) => {
    if (highContrast === undefined) setInternalContrast(next);
    onHighContrastChange?.(next);
    setAnnouncement(next ? 'Alto contraste ativado' : 'Alto contraste desativado');
  };

  const setScale = (next: TextScale) => {
    if (textScale === undefined) setInternalScale(next);
    onTextScaleChange?.(next);
    setAnnouncement(
      next === 'large'
        ? 'Texto ampliado'
        : next === 'compact'
          ? 'Texto reduzido'
          : 'Tamanho de texto padrão',
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = buttonRefs.current.findIndex((node) => node === document.activeElement);
    if (current === -1) return;
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % ACTIONS.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + ACTIONS.length) % ACTIONS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = ACTIONS.length - 1;
    else return;
    event.preventDefault();
    setFocusedIndex(next);
    buttonRefs.current[next]?.focus();
  };

  const isPressed = (id: string) => {
    if (id === 'contrast') return contrast;
    if (id === 'voice') return voiceReading;
    if (id === 'map') return simplifiedMap;
    return false;
  };

  const handleAction = (id: string) => {
    switch (id) {
      case 'text-decrease':
        setScale(scale === 'large' ? 'default' : 'compact');
        break;
      case 'text-increase':
        setScale(scale === 'compact' ? 'default' : 'large');
        break;
      case 'contrast':
        setContrast(!contrast);
        break;
      case 'voice':
        onVoiceReadingChange?.(!voiceReading);
        setAnnouncement(voiceReading ? 'Leitura em voz alta desativada' : 'Leitura em voz alta ativada');
        break;
      case 'map':
        onSimplifiedMapChange?.(!simplifiedMap);
        setAnnouncement(simplifiedMap ? 'Mapa detalhado' : 'Mapa simplificado ativado');
        break;
      case 'help':
        onOpenHelp?.();
        setAnnouncement('Ajuda de acessibilidade aberta');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={['ajd-root', 'ajd-a11y', className].filter(Boolean).join(' ')}
      role="toolbar"
      aria-label="Ferramentas de acessibilidade"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
    >
      {ACTIONS.map((action, index) => {
        const toggle = ['contrast', 'voice', 'map'].includes(action.id);
        const pressed = isPressed(action.id);
        return (
          <button
            key={action.id}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            type="button"
            className="ajd-a11y__button"
            data-action={action.id}
            aria-pressed={toggle ? pressed : undefined}
            aria-label={action.ariaLabel}
            title={action.label}
            tabIndex={index === focusedIndex ? 0 : -1}
            onClick={() => handleAction(action.id)}
            onFocus={() => setFocusedIndex(index)}
          >
            <Icon name={action.icon} size={24} />
            <span className="ajd-a11y__label" aria-hidden="true">
              {action.label}
            </span>
          </button>
        );
      })}
      <p className="ajd-visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
