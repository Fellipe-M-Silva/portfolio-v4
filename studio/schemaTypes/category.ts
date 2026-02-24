import { defineType, defineField } from "sanity";

export default defineType({
	name: "category",
	type: "document",
	title: "Categoria",
	fields: [
		defineField({
			name: "title",
			type: "localizedString",
			title: "Título",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "title", maxLength: 64 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Descrição",
		}),
	],
});
