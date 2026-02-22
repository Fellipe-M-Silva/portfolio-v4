# Diretrizes do Projeto: Portfólio de Product Designer

Você é um assistente de IA auxiliando no desenvolvimento do frontend do meu portfólio de Product Design. Seu objetivo é escrever um código limpo, modular e focado em excelência de UX/UI.

## 1. Stack Tecnológica

- **Core:** React, Vite, TypeScript.
- **Roteamento:** `react-router-dom` (v6+).
- **Internacionalização:** `react-i18next` e `i18next`.
- **Analytics:** `@vercel/analytics/react`.
- **Estilização:** CSS Tradicional (Arquivos `.css` separados). Sem Tailwind, sem Styled Components, sem CSS Modules (a menos que explicitamente solicitado).

## 2. Regras de Estilização e Estética (MUITO IMPORTANTE)

- **Zero Estilos Inline:** É estritamente proibido usar a propriedade `style={{}}` dentro dos arquivos `.tsx`.
- **Separação de Preocupações:** Todo componente ou página DEVE ter seu próprio arquivo `.css` de mesmo nome importado no topo (ex: `Header.tsx` importa `./Header.css`).
- **Nomenclatura:** Use classes descritivas e semânticas (BEM ou similar, ex: `.portfolio-card`, `.nav-link-active`).
- **Estética Geral:** O design deve ser simples, priorizando o conteúdo (os estudos de caso). Use bastante _whitespace_ (respiro), tipografia legível e bordas sutis. Menos é mais. O foco está na arquitetura de informação.
- **Tema de cores:** A cor primária é #ffc91f, mas quero que as cores do projeto sejam `okclh`. as cores de fundo são neutras e pouco saturadas.
- **Tipografia:** A fonte por enquanto será a Inter. Para detalhes como tags, chips e botões, penso em usar a Source Code Pro.

## 3. Diretrizes de Internacionalização (i18n)

- NENHUM texto estático deve ser hardcoded na interface.
- Todo texto de UI (botões, menus, títulos de seção fixa) deve usar o hook `useTranslation()` e a função `t()`.
- Os arquivos de tradução estão localizados em `src/locales/pt.json` e `src/locales/en.json`.
- Sempre que criar um componente novo que contenha texto, atualize automaticamente o formato JSON de ambos os idiomas na sua resposta.

## 4. Acessibilidade (a11y) e Alto Contraste

- Como Product Designer, acessibilidade é prioridade.
- Use HTML semântico (`<main>`, `<article>`, `<nav>`, `<section>`, `<button>` para ações, `<a>` para navegação).
- **Alto Contraste / Temas:** Prepare o CSS para suportar variáveis (Custom Properties) na raiz (`:root`).
- Estruture as cores usando variáveis CSS (ex: `--bg-primary`, `--text-primary`, `--border-color`).
- Para a versão de modo escuro, utilize _media query_ para identificar o modo. O sistema deve suportar o tema do navegador/sistema, mas o usuário pode mudar entre sistema, claro e escuro
- Para a versão de alto contraste, utilize _media queries_ como `@media (prefers-contrast: more)` para sobrescrever essas variáveis, garantindo proporções de contraste AAA.
- Nunca remova o _focus outline_ (`outline: none`) sem fornecer uma alternativa visual clara (`:focus-visible`).
- Toda animação deve respeitar `prefers-reduced-motion`. Use classe utilitária ou media query no CSS.

## 5. Criação de Componentes (Padrão)

Sempre que for solicitado a criar um novo componente, siga esta estrutura:

1.  **Tipagem:** Defina as props usando uma `interface` TypeScript.
2.  **Exportação:** Use _named exports_ (`export function NomeComponente`) em vez de _default exports_.
3.  **Estrutura da resposta:** Forneça sempre os dois arquivos na sua resposta: o `.tsx` e o `.css` correspondente.

## 6. Eventos e Analytics

- Rastreie intenções do usuário (não dados sensíveis/pessoais).
- Para interações importantes (ex: download de CV, clique para página de contato, links externos), use a função `track` do `@vercel/analytics/react`.
- Exemplo: `track('clique_nome_do_evento', { propriedade: 'valor' });`.

## 7. Tom e Resolução de Problemas

- Responda de forma concisa e direta. Forneça o código funcional sem excesso de explicações genéricas.
- Se houver duas maneiras de resolver um problema, prefira a mais legível e nativa do React/Navegador em vez de instalar uma nova biblioteca.

## 8. Integração com Headless CMS (Sanity.io)

- **Pacotes Adicionais:** `@sanity/client` (para buscar os dados) e `@portabletext/react` (para renderizar o conteúdo rico).
- **Separação de Conteúdo:** Textos fixos da UI (botões, nav) vêm do `react-i18next`. Textos dinâmicos (Estudos de Caso, Projetos) vêm do Sanity.
- **Consultas (GROQ):** Ao solicitar a criação de uma página de projeto, a consulta GROQ deve SEMPRE filtrar os dados com base no idioma atual do usuário (`i18n.language`). Exemplo: buscar `title.pt` ou `title.en`.
- **Portable Text:** Ao renderizar o corpo do estudo de caso, NUNCA tente usar `dangerouslySetInnerHTML`. Use sempre o componente `<PortableText />`.
- **Mapeamento de Componentes (Portable Text):** Ao criar componentes customizados para o Sanity (ex: `ImageSlider`, `FigmaEmbed`), eles DEVEM seguir a mesma regra de estilização: arquivo `.tsx` limpo e importação de um arquivo `.css` próprio. Nada de estilos inline nos blocos do Sanity.
