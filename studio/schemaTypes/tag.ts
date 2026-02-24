import { defineType, defineField } from "sanity";

export default defineType({
	name: "tag",
	type: "document",
	title: "Tag",
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
			options: { source: "title.pt", maxLength: 64 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Descrição",
		}),
	],
});
