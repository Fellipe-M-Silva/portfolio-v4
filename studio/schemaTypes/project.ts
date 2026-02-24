import { defineType, defineField } from "sanity";

export default defineType({
	name: "project",
	type: "document",
	title: "Project",
	fields: [
		defineField({
			name: "title",
			type: "localizedString",
			title: "Title",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "title.pt", maxLength: 96 },
		}),
		defineField({
			name: "description",
			type: "localizedString",
			title: "Description",
		}),
		defineField({
			name: "featured",
			type: "boolean",
			title: "Featured",
			initialValue: false,
		}),
		defineField({
			name: "thumbnail",
			type: "image",
			title: "Thumbnail",
			options: { hotspot: true },
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt Text",
				}),
			],
		}),
		defineField({
			name: "thumbnailExtra",
			type: "image",
			title: "Thumbnail Extra",
			options: { hotspot: true },
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt Text",
				}),
			],
		}),
		defineField({
			name: "tags",
			type: "array",
			title: "Tags",
			of: [{ type: "reference", to: [{ type: "tag" }] }],
			description: "Tags bilíngues relacionadas ao projeto.",
		}),
		defineField({
			name: "shortDescription",
			type: "localizedString",
			title: "Short Description",
		}),
		defineField({
			name: "link",
			type: "url",
			title: "Link",
		}),
		defineField({
			name: "externalRepo",
			type: "url",
			title: "Repositório Externo",
			description:
				"Link para o repositório do projeto (GitHub, GitLab, etc)",
		}),
		defineField({
			name: "liveDemo",
			type: "url",
			title: "Live Demo",
			description: "Link para uma demonstração ao vivo do projeto.",
		}),
		defineField({
			name: "teamSize",
			type: "string",
			title: "Team Size",
		}),
		defineField({
			name: "duration",
			type: "string",
			title: "Duration",
		}),
		defineField({
			name: "role",
			type: "string",
			title: "Role",
		}),
		defineField({
			name: "content",
			type: "projectContent",
			title: "Content",
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
			title: "Published At",
		}),
	],
});
