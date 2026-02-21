# Quick Start Guide 🚀

Guia rápido para começar a desenvolver seu portfólio.

## 1️⃣ Preparação Inicial

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto rodará em `http://localhost:3000`

## 2️⃣ Estrutura de Pastas

```
portfolio-v4/
├── src/
│   ├── components/    ← Componentes reutilizáveis (Header, Footer, etc)
│   ├── pages/         ← Páginas principais (Home, Projects, About)
│   ├── lib/           ← Biblioteca Sanity e configurações
│   ├── utils/         ← Funções auxiliares (analytics, formatting)
│   ├── locales/       ← Traduções (pt.json, en.json)
│   ├── types.ts       ← Tipos TypeScript
│   ├── App.tsx        ← Componente raiz com rotas
│   └── main.tsx       ← Entrada da aplicação
├── public/            ← Arquivos estáticos
└── [config files]     ← vite.config.ts, tsconfig.json, package.json
```

## 3️⃣ Adicionar Novas Páginas

### Exemplo: Criar página "Contato"

**1. Criar arquivo de página**

```tsx
// src/pages/Contact.tsx
import { useTranslation } from "react-i18next";
import "./Contact.css";

export function Contact() {
	const { t } = useTranslation();

	return (
		<div className="contact-page">
			<h1>{t("contact.title")}</h1>
			{/* Conteúdo */}
		</div>
	);
}

export default Contact;
```

**2. Criar arquivo de estilo**

```css
/* src/pages/Contact.css */
.contact-page {
	min-height: 100vh;
	padding: var(--spacing-2xl) var(--spacing-lg);
}
```

**3. Adicionar rotas no App.tsx**

```tsx
import Contact from "./pages/Contact";

// Inside <Routes>
<Route path="/contato" element={<Contact />} />;
```

**4. Adicionar tradução em pt.json**

```json
{
	"contact": {
		"title": "Entre em Contato"
	}
}
```

**5. Adicionar em en.json**

```json
{
	"contact": {
		"title": "Get in Touch"
	}
}
```

## 4️⃣ Adicionar Novo Componente

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
	title: string;
	onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
	return <div className="my-component">{title}</div>;
}

export default MyComponent;
```

```css
/* src/components/MyComponent.css */
.my-component {
	padding: var(--spacing-md);
	background-color: var(--color-bg-secondary);
	border-radius: 4px;
}
```

## 5️⃣ Usar Tradução

```tsx
import { useTranslation } from "react-i18next";

export function MyComponent() {
	const { t, i18n } = useTranslation();

	return (
		<>
			<h1>{t("home.title")}</h1>
			<button onClick={() => i18n.changeLanguage("en")}>
				Mudar para inglês
			</button>
		</>
	);
}
```

## 6️⃣ Variáveis CSS

Use variáveis CSS para cores, espaçamento e tipografia:

```css
.my-element {
	color: var(--color-text);
	background-color: var(--color-bg-secondary);
	padding: var(--spacing-lg);
	font-size: var(--font-size-lg);
	border: 1px solid var(--color-border);
	transition: all var(--transition-normal);
}

.my-element:hover {
	color: var(--color-primary);
}
```

### Variáveis Disponíveis

**Cores**

- `--color-primary`, `--color-primary-light`, `--color-primary-dark`
- `--color-bg`, `--color-bg-secondary`
- `--color-text`, `--color-text-secondary`, `--color-text-tertiary`
- `--color-border`

**Espaçamento**

- `--spacing-xs` até `--spacing-2xl` (0.5rem até 4rem)

**Tipografia**

- `--font-family-sans`, `--font-family-mono`
- `--font-size-xs` até `--font-size-3xl`
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

**Animações**

- `--transition-fast`, `--transition-normal`, `--transition-slow`

## 7️⃣ Build e Deploy

```bash
# Build para produção (cria pasta 'dist')
npm run build

# Visualizar build localmente
npm run preview
```

Deploy em Vercel/Netlify é automático se conectado ao GitHub.

## 8️⃣ Integração Sanity

Veja `SANITY_INTEGRATION.md` para detalhes sobre como conectar dados do Sanity.

## ⚡ Dicas Rápidas

- ✅ Use CSS Variables em vez de hardcoded colors
- ✅ Sempre traduzir textos de UI com `useTranslation()`
- ✅ Sem estilos inline (`style={{}}`) - crie arquivo CSS
- ✅ Componentes reutilizáveis vão em `components/`
- ✅ Páginas principais vão em `pages/`
- ✅ Use TypeScript interfaces para props
- ✅ Respeitar `prefers-reduced-motion` para animações
- ✅ Adicionar acessibilidade: semantic HTML, focus-visible, alt-text

## 💬 Estrutura de Tradução

```json
{
	"nav": { "home": "...", "projects": "..." },
	"home": { "title": "...", "description": "..." },
	"projects": { "title": "...", "viewProject": "..." },
	"about": { "title": "...", "downloadCV": "..." }
}
```

Keep it organized! Agrupe palavras-chave relacionadas.

## 🆘 Troubleshooting

**erro: "Cannot find module"**

- Verifique a importação (case-sensitive)
- Execute `npm install`

**Estilos não aplicam**

- Verifique se importou o `.css` no `.tsx`
- Limpe cache: `npm run dev`

**Tradução não muda**

- Verifique o arquivo `pt.json` e `en.json`
- Rode `npm install` novamente se precisar

---

Divirta-se desenvolvendo! 🎉
