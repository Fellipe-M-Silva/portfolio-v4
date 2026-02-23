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
			name: "image",
			type: "image",
			title: "Image",
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
