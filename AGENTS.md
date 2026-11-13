# AGENTS.md — Design System (Projeto IHC)

Instruções para agentes de IA (OpenCode, etc.) trabalhando neste repositório.

## Contexto do projeto

Design system em **React 19 + TypeScript + Vite**, com **Storybook 10** como ferramenta de documentação e desenvolvimento. Os componentes são especificados em um arquivo Figma — o Figma é a **fonte da verdade** para design; o código deve refleti-lo.

- **Arquivo Figma (fonte da verdade):** [Projeto-IHC](https://www.figma.com/design/h2E2rFkNY3qruR8t0gIyAl/Projeto-IHC)
  - `fileKey`: `h2E2rFkNY3qruR8t0gIyAl`
  - Página "Componentes": node `1012:320`
- **Design Rationale (referência de decisões de design):** [Design-Rationale](https://www.figma.com/design/Ctc2yORJssKaYprWGqxIaC/Design-Rationale)
  - `fileKey`: `Ctc2yORJssKaYprWGqxIaC`
  - Consultar ao implementar componentes para entender motivações e decisões de design.

## Comandos

```sh
npm run dev              # Vite dev server
npm run build            # tsc + vite build
npm run storybook        # Storybook dev em http://localhost:6006
npm run build-storybook  # build estático do Storybook (saída: storybook-static/)
```

Testes usam Vitest com browser mode (Playwright), via addon-vitest do Storybook.

## Estrutura

- `stories/` — componentes e suas stories (padrão `Componente.tsx` + `Componente.stories.ts` + `componente.css`)
- `.storybook/` — configuração do Storybook
- `storybook-static/` — build gerado, **não versionar nem editar**

## Componentes no Figma (página "Componentes", node 1012:320)

Roadmap esperado de implementação — cada item vira um componente em `stories/`:

| Componente (frame Figma) | Variantes (symbols) | node |
|---|---|---|
| Ajudivas / Barra de pesquisa | Estado = Em edição, Repouso, Pesquisado | `1012:321` (variants: `1012:322`, `1012:350`, `1012:354`) |
| Detalhes da ocorrência | Property 1 = Grave, Médio | `1016:759` (variants: `1016:758`, `1016:760`) |
| Ocorrencia | Property 1 = Grave, Média | `1016:798` (variants: `1016:797`, `1016:799`) |
| header + pesquisa | — | `1018:2148` |
| NavBar | Property 1 = Default, Feed | `1029:2603` (variants: `1018:1982`, `1029:2604`) |
| Painel inferior de rotas | Property 1 = Rota Segura, Rota Insegura | `1037:513` (variants: `1037:512`, `1037:514`) |

Convenções de variantes no Figma: `Estado=...` e `Property 1=...` mapeiam para props booleanas/unions em React (ex.: `severity: "grave" | "médio"`, `state: "repouso" | "edicao" | "pesquisado"`).

## Convenções

- TypeScript estrito; seguir `tsconfig.json`.
- Um arquivo `.tsx` + uma `.stories.ts` + um `.css` por componente em `stories/`.
- Nomes de componentes em inglês no código quando razoável (ex.: `SearchBar`, `OccurrenceCard`, `NavBar`), refletindo o nome do Figma.
- Usar o MCP do Figma (`get_design_context`) ao implementar um componente para obter o código de referência da variante.
- Não modificar `node_modules/` ou `storybook-static/`.
