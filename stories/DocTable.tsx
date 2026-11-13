import type { ReactNode } from 'react';

export interface DocTableProps {
  /** Cabeçalhos das colunas. */
  head: ReactNode[];
  /** Linhas; cada célula pode ser texto ou JSX. */
  rows: ReactNode[][];
}

/**
 * Converte `código` e **negrito** em elementos React dentro de células de
 * texto, já que o compilador MDX deste projeto não processa Markdown dentro
 * de JSX.
 */
function renderInline(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/**
 * Tabela para as páginas MDX de documentação.
 *
 * O compilador MDX deste projeto não habilita tabelas GFM, então as tabelas
 * são montadas em JSX para manter o mesmo visual em todas as páginas.
 */
export function DocTable({ head, rows }: DocTableProps) {
  return (
    <table>
      <thead>
        <tr>
          {head.map((cell, index) => (
            <th key={index}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                {typeof cell === 'string'
                  ? renderInline(cell, `${rowIndex}-${cellIndex}`)
                  : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
