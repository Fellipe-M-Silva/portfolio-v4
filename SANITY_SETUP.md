# Setup Sanity - Resumo Rápido

## ✅ Configuração Concluída

### Arquivo `.env.local`

```env
REACT_APP_SANITY_PROJECT_ID=vlt14qpd
REACT_APP_SANITY_DATASET=production
```

### Cliente Sanity (`src/lib/sanityClient.ts`)

- ✅ Criado e configurado
- ✅ Funções de otimização de imagem incluídas:
    - `urlFor()` - URL básica
    - `urlForOptimized(source, width, height)` - Com dimensões
    - `urlForWebP()` - Formato WebP

### Hooks Prontos (`src/hooks/useProjects.ts`)

- ✅ `useProjects()` - Todos os projetos
- ✅ `useFeaturedProjects(limit?)` - Projetos em destaque
- ✅ `useProject(slug)` - Projeto individual

### Queries GROQ (`src/lib/queries.ts`)

- ✅ ALL_PROJECTS_QUERY
- ✅ FEATURED_PROJECTS_QUERY
- ✅ PROJECT_BY_SLUG_QUERY
- ✅ ABOUT_PAGE_QUERY
- ✅ NEXT_PROJECT_QUERY
- ✅ PREVIOUS_PROJECT_QUERY

---

## 🚀 Próximo Passo: Usar nos Componentes

### Exemplo 1: Página de Projetos Dinâmica

```tsx
import { useFeaturedProjects } from "@/hooks/useProjects";
import { urlFor } from "@/lib/sanityClient";

export function Home() {
	const { data: projects, isLoading, error } = useFeaturedProjects(3);

	if (isLoading) return <div>Carregando...</div>;
	if (error) return <div>Erro ao carregar projetos</div>;

	return (
		<div className="projects-grid">
			{projects.map((project) => (
				<div key={project._id}>
					<img src={urlFor(project.image)} alt={project.image?.alt} />
					<h3>{project.title}</h3>
					<p>{project.description}</p>
				</div>
			))}
		</div>
	);
}
```

### Exemplo 2: Detalhe de Projeto

```tsx
import { useProject } from "@/hooks/useProjects";
import { urlForOptimized } from "@/lib/sanityClient";

export function ProjectDetail() {
	const { slug } = useParams<{ slug: string }>();
	const { data: project, isLoading } = useProject(slug);

	if (isLoading) return <div>Carregando...</div>;
	if (!project) return <div>Projeto não encontrado</div>;

	return (
		<>
			<img
				src={urlForOptimized(project.image, 1200, 600)}
				alt={project.image?.alt}
			/>
			<h1>{project.title}</h1>
			<p>Equipe: {project.teamSize}</p>
			{/* ... resto do conteúdo */}
		</>
	);
}
```

---

## 📋 O Que Testar Primeiro

1. [ ] Instalar `@sanity/image-url` se não estiver (já está em package.json)
2. [ ] Verificar conexão: Abrir DevTools → Network e fazer uma requisição
3. [ ] Atualizar `src/pages/Home.tsx` com `useFeaturedProjects()`
4. [ ] Atualizar `src/pages/Projects.tsx` com `useProjects()`
5. [ ] Atualizar `src/pages/ProjectDetail.tsx` com `useProject(slug)`

---

## 🔗 Links Úteis

- [GROQ Cheat Sheet](https://www.sanity.io/docs/groq#syntax-and-operators)
- [Image URL Builder](https://www.sanity.io/docs/image-url)
- [Sanity React Client](https://www.sanity.io/docs/client@3)

---

**Próximas ações:**

1. Atualizar páginas para usar os hooks
2. Testar carregamento de dados
3. Implementar Portable Text para conteúdo rico
4. Adicionar skeleton loaders/placeholders
