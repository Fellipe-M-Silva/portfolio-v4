# Integração Sanity.io

Este documento descreve como integrar o Sanity.io para gerenciar conteúdo dinâmico do portfólio.

## 📋 Schema do Sanity (Estrutura de Dados)

### Tipo: `project` (Projeto)

```groq
{
  _type: "project",
  _id: "project-1",

  title: {
    pt: "Título em Português",
    en: "English Title"
  },

  slug: {
    current: "projeto-slug"
  },

  description: {
    pt: "Descrição do projeto em português",
    en: "Project description in English"
  },

  featured: true, // Se deve aparecer na página inicial

  image: {
    asset: { ... },
    alt: "Texto alternativo"
  },

  teamSize: "3 pessoas",
  duration: "6 meses",
  role: "Product Designer",

  content: {
    challenge: {
      pt: "Conteúdo em português",
      en: "English content"
    },
    solution: {
      pt: "...",
      en: "..."
    },
    results: {
      pt: "...",
      en: "..."
    }
  }
}
```

## 🔍 Queries GROQ

### Buscar todos os projetos

```groq
*[_type == "project"] | order(publishedAt desc)
```

### Buscar projetos em destaque

```groq
*[_type == "project" && featured == true] | order(publishedAt desc)[0..2]
```

### Buscar projeto por slug

```groq
*[_type == "project" && slug.current == $slug][0]
{
  ...,
  content,
  image { asset->, alt }
}
```

## 💡 Filtragem por Idioma

Ao implementar a integração, sempre filtre pelos idiomas suportados:

```tsx
import { useTranslation } from "react-i18next";
import { sanityClient } from "@/lib/sanityClient";

export function Projects() {
	const { i18n } = useTranslation();
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const query = `
      *[_type == "project"] | order(publishedAt desc) {
        _id,
        slug,
        title_${i18n.language},
        description_${i18n.language},
        image { asset->, alt }
      }
    `;

		sanityClient.fetch(query).then((data) => setProjects(data));
	}, [i18n.language]);

	// renderizar projetos
}
```

## 🖼️ Processamento de Imagens

Use a API de imagem do Sanity para otimização:

```tsx
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)

// Uso:
<img src={urlFor(project.image).width(400).url()} alt="" />
```

## 📝 Conteúdo Rico (Portable Text)

Para conteúdo com formatação complexa, use `@portabletext/react`:

```tsx
import { PortableText } from "@portabletext/react";

export function ProjectContent({ content }) {
	return (
		<PortableText
			value={content}
			components={{
				block: {
					h2: ({ children }) => <h2>{children}</h2>,
					p: ({ children }) => <p>{children}</p>,
				},
			}}
		/>
	);
}
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
REACT_APP_SANITY_PROJECT_ID=xxxxx
REACT_APP_SANITY_DATASET=production
```

Obtenha estes valores no painel do Sanity.

## ✅ Checklist de Integração

- [ ] Criar schema dos projetos no Sanity Studio
- [ ] Publicar alguns projetos de exemplo
- [ ] Atualizar arquivo `sanityClient.ts` com dados de autenticação
- [ ] Implementar query de projetos em `Pages/Projects.tsx`
- [ ] Implementar query de projeto individual em `Pages/ProjectDetail.tsx`
- [ ] Adicionar rendering de imagens e conteúdo rico
- [ ] Testar em desenvolvimento
- [ ] Testar em produção

## 📚 Referências

- [Sanity.io Documentation](https://www.sanity.io/docs)
- [GROQ Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://portabletext.org/)
