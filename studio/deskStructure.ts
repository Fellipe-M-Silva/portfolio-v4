import type { StructureBuilder } from "sanity/desk";

export const deskStructure = (S: StructureBuilder) =>
	S.list()
		.title("Content")
		.items([
			S.documentTypeListItem("project").title("Projects"),
			S.divider(),
			S.listItem()
				.title("Experience")
				.schemaType("careerItem")
				.child(
					S.documentList()
						.title("Experience")
						.filter(
							'_type == "careerItem" && category == "experience"',
						)
						.initialValueTemplates([
							S.initialValueTemplateItem("careerItem-experience"),
						])
						.defaultOrdering([
							{ field: "order", direction: "asc" },
						]),
				),
			S.listItem()
				.title("Education")
				.schemaType("careerItem")
				.child(
					S.documentList()
						.title("Education")
						.filter(
							'_type == "careerItem" && category == "education"',
						)
						.initialValueTemplates([
							S.initialValueTemplateItem("careerItem-education"),
						])
						.defaultOrdering([
							{ field: "order", direction: "asc" },
						]),
				),
			S.listItem()
				.title("Research")
				.schemaType("careerItem")
				.child(
					S.documentList()
						.title("Research")
						.filter(
							'_type == "careerItem" && category == "research"',
						)
						.initialValueTemplates([
							S.initialValueTemplateItem("careerItem-research"),
						])
						.defaultOrdering([
							{ field: "order", direction: "asc" },
						]),
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() !== "project" && item.getId() !== "careerItem",
			),
		]);
