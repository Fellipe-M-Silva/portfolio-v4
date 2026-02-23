import { defineType, defineField } from "sanity";

export default defineType({
	name: "localizedString",
	type: "object",
	title: "Texto localizado",
	fields: [
		defineField({
			name: "pt",
			type: "string",
			title: "Portugues",
		}),
		defineField({
			name: "en",
			type: "string",
			title: "Ingles",
		}),
	],
});
