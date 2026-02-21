/**
 * GROQ Queries para o Sanity
 */

// Buscar todos os projetos
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    _createdAt,
    slug,
    title,
    description,
    featured,
    image {
      asset -> {
        _id,
        url
      },
      alt
    }
  }
`;

// Buscar projetos em destaque (máx 3)
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(publishedAt desc)[0..2] {
    _id,
    _createdAt,
    slug,
    title,
    description,
    image {
      asset -> {
        _id,
        url
      },
      alt
    }
  }
`;

// Buscar projeto por slug
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    description,
    featured,
    publishedAt,
    teamSize,
    duration,
    role,
    image {
      asset -> {
        _id,
        url
      },
      alt
    },
    challenge,
    solution,
    results,
    body,
  }
`;

// Buscar página About
export const ABOUT_PAGE_QUERY = `
  *[_type == "about"][0] {
    _id,
    intro,
    bio,
    experience[] {
      _key,
      company,
      position,
      startDate,
      endDate,
      description
    },
    skills[] {
      _key,
      name,
      category
    }
  }
`;

// Buscar próximo projeto (para navegação)
export const NEXT_PROJECT_QUERY = `
  *[_type == "project" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
    _id,
    slug,
    title
  }
`;

// Buscar projeto anterior (para navegação)
export const PREVIOUS_PROJECT_QUERY = `
  *[_type == "project" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
    _id,
    slug,
    title
  }
`;

export default {
	ALL_PROJECTS_QUERY,
	FEATURED_PROJECTS_QUERY,
	PROJECT_BY_SLUG_QUERY,
	ABOUT_PAGE_QUERY,
	NEXT_PROJECT_QUERY,
	PREVIOUS_PROJECT_QUERY,
};
