import { defineType, defineField } from "sanity";

export default defineType({
	name: "projectContent",
	type: "object",
	title: "Project Content",
	fields: [
		defineField({
			name: "challenge",
			type: "localizedString",
			title: "Challenge",
		}),
		defineField({
			name: "solution",
			type: "localizedString",
			title: "Solution",
		}),
		defineField({
			name: "results",
			type: "localizedString",
			title: "Results",
		}),
	],
});
