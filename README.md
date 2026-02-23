# Portfólio v4 - Product Designer

Um portfólio moderno e responsivo para Product Designer, construído com React, TypeScript, Vite e integrado com Sanity.io para gerenciamento de conteúdo dinâmico.

## 🎯 Estrutura do Projeto

### Páginas Principais

1. **Início (`/`)** - Hero section com proposta de valor, lista de projetos em destaque e CTA
2. **Projetos (`/projetos`)** - Lista completa de todos os projetos
3. **Projeto Detalhe (`/projetos/:slug`)** - Página de estudo de caso do projeto
4. **Sobre (`/sobre`)** - Informações pessoais, experiência e habilidades

### Estrutura de Arquivos

```
portfolio-v4/
├── public/               # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   ├── pages/           # Páginas principais
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── Projects.tsx
│   │   ├── Projects.css
│   │   ├── ProjectDetail.tsx
│   │   ├── ProjectDetail.css
│   │   ├── About.tsx
│   │   └── About.css
│   ├── lib/             # Bibliotecas e configurações
│   │   └── sanityClient.ts
│   ├── utils/           # Funções utilitárias
│   │   └── analytics.ts
│   ├── locales/         # Arquivos de tradução
│   │   ├── pt.json
│   │   └── en.json
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── guidelines.md        # Diretrizes do projeto
```

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderno e rápido
- **React Router v6** - Roteamento
- **react-i18next** - Internacionalização (Português e Inglês)
- **Sanity.io** - CMS headless para conteúdo dinâmico
- **@vercel/analytics** - Analytics e tracking
- **CSS Tradicional** - Sem Tailwind, sem CSS-in-JS (seguindo as diretrizes)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Copie .env.example para .env.local e adicione suas chaves
cp .env.example .env.local

# Obtenha uma chave gratuita da API OpenWeatherMap em:
# https://openweathermap.org/api
# E adicione como VITE_OPENWEATHER_API_KEY no .env.local

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Pré-visualizar build
npm run preview
```

## 🎨 Design System

### Cores (okclh)

- **Primária**: `oklch(85% 0.15 70)` (#ffc91f)
- **Fundo**: `oklch(98% 0.01 0)` (claro)
- **Texto**: `oklch(20% 0.02 0)` (escuro)

Suporta temas claro, escuro e alto contraste através de media queries.

### Tipografia

- **Sans-serif**: Inter (UI geral)
- **Mono**: Source Code Pro (tags, chips, botões especiais)

## 🌍 Internacionalização

O projeto suporta Português e Inglês. Os textos da UI são traduzidos através do `react-i18next`, enquanto conteúdo dinâmico vem do Sanity.

Alterar idioma: Use o toggle de idioma no header.

## 🔌 Integração Sanity

Configure as variáveis de ambiente:

```env
REACT_APP_SANITY_PROJECT_ID=seu-project-id
REACT_APP_SANITY_DATASET=production
```

O cliente Sanity está configurado em `src/lib/sanityClient.ts` e pronto para fazer queries GROQ.

## 📊 Analytics

Eventos são rastreados automaticamente através da `@vercel/analytics`. Veja `src/utils/analytics.ts` para eventos customizados.

## ♿ Acessibilidade

- HTML semântico
- Suporte a tema escuro/claro automático
- Suporte a alto contraste
- Foco visível em todos os elementos interativos
- Respeito a `prefers-reduced-motion`
- WCAG 2.1 level AA

## 🛠️ Desenvolvimento

### Criar novo componente

```tsx
// MyComponent.tsx
export function MyComponent() {
	return <div>Conteúdo</div>;
}

export default MyComponent;
```

```css
/* MyComponent.css */
.my-component {
	/* estilos */
}
```

Sempre:

1. Use named exports
2. Crie arquivo `.css` separado
3. Use variáveis CSS para cores e espaçamento
4. Adicione tradução em `src/locales/pt.json` e `en.json`

### Padrão de Rota

Ao adicionar nova rota, atualize:

1. `App.tsx` com a nova `<Route>`
2. `src/locales/pt.json` e `en.json` com textos da página
3. Navegação no Header se necessário

## 📝 Próximos Passos

- [ ] Conectar página de Projetos com Sanity
- [ ] Implementar página de Projeto com dados dinâmicos do Sanity
- [ ] Adicionar componente PortableText para conteúdo rico
- [ ] Integrar formulário de contato
- [ ] Configurar deployment (Vercel, Netlify, etc)
- [ ] Otimizar imagens e performance
- [ ] SEO: adicionar meta tags dinâmicas

## 📄 Licença

MIT
