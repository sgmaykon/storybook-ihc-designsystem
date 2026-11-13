import { useState } from 'react';
import { Icon } from './Icon';
import { iconGroups, iconLabel, type IconName } from './icons';
import './icon-gallery.css';

export interface IconGalleryProps {
  /** Filtra os grupos exibidos. */
  groups?: string[];
}

/**
 * Catálogo navegável dos ícones (página "Icons" do Figma).
 * Cada ícone é renderizado a partir do SVG original, tingido por `currentColor`.
 */
export function IconGallery({ groups }: IconGalleryProps) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const visibleGroups = iconGroups
    .filter((group) => !groups || groups.includes(group.id))
    .map((group) => ({
      ...group,
      icons: group.icons.filter((name) => !normalized || name.toLowerCase().includes(normalized)),
    }))
    .filter((group) => group.icons.length > 0);

  const total = visibleGroups.reduce((sum, group) => sum + group.icons.length, 0);

  return (
    <div className="ajd-root ajd-gallery">
      <div className="ajd-gallery__toolbar">
        <label className="ajd-gallery__search">
          <Icon name="material/search" size={20} />
          <span className="ajd-visually-hidden">Filtrar ícones</span>
          <input
            type="search"
            placeholder="Filtrar ícones (ex.: call, shield, rota)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <span className="ajd-gallery__count" role="status">
          {total} ícones
        </span>
      </div>

      {visibleGroups.map((group) => (
        <section key={group.id} className="ajd-gallery__group" aria-labelledby={`group-${group.id}`}>
          <header className="ajd-gallery__group-header">
            <h3 id={`group-${group.id}`}>{group.label}</h3>
            <p>{group.description}</p>
          </header>
          <ul className="ajd-gallery__grid">
            {group.icons.map((name) => (
              <li key={name} className="ajd-gallery__item">
                <span className="ajd-gallery__tile">
                  <Icon name={name} size={24} label={iconLabel(name)} />
                </span>
                <span className="ajd-gallery__name">{iconLabel(name)}</span>
                <span className="ajd-gallery__source">
                  {name.startsWith('lucide/') ? 'Lucide' : 'Material'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="ajd-gallery__group" aria-labelledby="group-sizes">
        <header className="ajd-gallery__group-header">
          <h3 id="group-sizes">Tamanhos usados no produto</h3>
          <p>14 px (status bar) · 15 px (cidade) · 18 px (fatores) · 20 px (alerta) · 24 px (padrão) · 29 px (pânico)</p>
        </header>
        <div className="ajd-gallery__sizes">
          {[14, 15, 18, 20, 24, 29, 32].map((size) => (
            <span key={size} className="ajd-gallery__size">
              <Icon name="material/call" size={size} />
              <span>{size}px</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export type { IconName };
