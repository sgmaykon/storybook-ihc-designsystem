import { Icon } from './Icon';
import { SearchBar, type SearchBarState, type SearchSuggestion } from './SearchBar';
import './app-header.css';

export interface AppHeaderProps {
  /** Hora exibida na status bar (decorativa). */
  time?: string;
  brand?: string;
  city?: string;
  searchState?: SearchBarState;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onSearchSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** Disparado ao focar/tocar a barra — no protótipo troca para "Em edição". */
  onSearchFocus?: () => void;
  className?: string;
}

/**
 * Header + pesquisa (Figma: "header + pesquisa", 1018:2148).
 * Status bar Android (decorativa) + identidade do app + barra de pesquisa.
 */
export function AppHeader({
  time = '21:41',
  brand = 'Ajudivas',
  city = 'São Carlos',
  searchState = 'repouso',
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSearchSuggestionSelect,
  onSearchFocus,
  className,
}: AppHeaderProps) {
  return (
    <header className={['ajd-root', 'ajd-header', className].filter(Boolean).join(' ')}>
      <div className="ajd-header__top">
        <div className="ajd-header__status" aria-hidden="true">
          <span className="ajd-header__time">{time}</span>
          <span className="ajd-header__connectivity">
            <Icon name="material/wifi" size={14} />
            <Icon name="material/signal-cellular-alt" size={14} />
            <Icon name="material/battery-full" size={14} className="ajd-header__battery" />
          </span>
        </div>

        <div className="ajd-header__bar">
          <div className="ajd-header__identity">
            <Icon name="lucide/shield-check" size={28} className="ajd-header__logo" />
            <span className="ajd-header__brand">{brand}</span>
          </div>
          <p className="ajd-header__city">
            <Icon name="lucide/map-pin" size={15} />
            <span>{city}</span>
          </p>
        </div>
      </div>

      <div className="ajd-header__search" onFocus={onSearchFocus}>
        <SearchBar
          state={searchState}
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          onSuggestionSelect={onSearchSuggestionSelect}
        />
      </div>
    </header>
  );
}
