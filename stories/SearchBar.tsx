import { useId, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import './search-bar.css';

export type SearchBarState = 'repouso' | 'edicao' | 'pesquisado';

export interface SearchSuggestion {
  id: string;
  label: string;
  hint?: string;
  icon?: IconName;
}

export interface SearchBarProps {
  /** Estado visual definido no Figma (symbol Estado=...). */
  state?: SearchBarState;
  /** Texto exibido no campo. */
  value?: string;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  /** Nome acessível do campo de busca. */
  label?: string;
  /** Rótulo do bloco de sugestões. */
  suggestionsLabel?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  className?: string;
}

export const defaultSuggestions: SearchSuggestion[] = [
  { id: 'sao-carlos', label: 'São Carlos', hint: 'Histórico recente', icon: 'lucide/map-pin' },
  { id: 'ufscar', label: 'UFSCar', hint: 'Histórico recente', icon: 'lucide/map-pin' },
  { id: 'casa', label: 'Casa', hint: 'Histórico recente', icon: 'lucide/house' },
];

/**
 * Barra de pesquisa (Figma: "Ajudivas / Barra de pesquisa", 1012:321).
 *
 * Estados: `repouso` (placeholder), `edicao` (campo focado + sugestões) e
 * `pesquisado` (termo já submetido).
 */
export function SearchBar({
  state = 'repouso',
  value,
  placeholder = 'Para onde você vai com segurança?',
  suggestions = defaultSuggestions,
  label = 'Para onde você vai com segurança?',
  suggestionsLabel = 'Sugestões recentes',
  onChange,
  onSubmit,
  onSuggestionSelect,
  className,
}: SearchBarProps) {
  const inputId = useId();
  const listId = `${inputId}-listbox`;
  const titleId = `${inputId}-title`;

  const [uncontrolledValue, setUncontrolledValue] = useState(value ?? '');
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = value ?? uncontrolledValue;
  const showSuggestions = state === 'edicao' && !dismissed && suggestions.length > 0;

  const expanded = useMemo(() => showSuggestions, [showSuggestions]);

  const handleChange = (next: string) => {
    if (value === undefined) setUncontrolledValue(next);
    onChange?.(next);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (activeIndex >= 0 && showSuggestions) {
      selectSuggestion(suggestions[activeIndex]);
      return;
    }
    setDismissed(true);
    onSubmit?.(currentValue);
  };

  const selectSuggestion = (suggestion: SearchSuggestion | undefined) => {
    if (!suggestion) return;
    if (value === undefined) setUncontrolledValue(suggestion.label);
    onChange?.(suggestion.label);
    onSuggestionSelect?.(suggestion);
    setDismissed(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setDismissed(true);
      setActiveIndex(-1);
      return;
    }
    if (!showSuggestions) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => {
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        const next = index + delta;
        if (next < 0) return suggestions.length - 1;
        if (next >= suggestions.length) return 0;
        return next;
      });
    }
  };

  return (
    <div className={['ajd-root', 'ajd-search', `ajd-search--${state}`, className].filter(Boolean).join(' ')}>
      <form className="ajd-search__field" role="search" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          id={inputId}
          className="ajd-search__input"
          type="search"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            showSuggestions && activeIndex >= 0 ? `${inputId}-option-${activeIndex}` : undefined
          }
          aria-label={label}
          autoComplete="off"
          placeholder={placeholder}
          value={currentValue}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="ajd-search__action" type="submit" aria-label="Buscar">
          <Icon name="lucide/search" size={24} />
        </button>
      </form>

      {showSuggestions && (
        <div className="ajd-search__suggestions">
          <p className="ajd-search__suggestions-title" id={titleId}>
            {suggestionsLabel}
          </p>
          <ul className="ajd-search__list" role="listbox" id={listId} aria-labelledby={titleId}>
            {suggestions.map((suggestion, index) => (
              <li key={suggestion.id} className="ajd-search__item" role="none">
                <button
                  id={`${inputId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className="ajd-search__option"
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className="ajd-search__option-icon" aria-hidden="true">
                    <Icon name={suggestion.icon ?? 'lucide/map-pin'} size={16} />
                  </span>
                  <span className="ajd-search__option-text">
                    <span className="ajd-search__option-label">{suggestion.label}</span>
                    {suggestion.hint && (
                      <span className="ajd-search__option-hint">{suggestion.hint}</span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
