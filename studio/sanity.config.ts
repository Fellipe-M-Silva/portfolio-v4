import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { deskStructure } from "./deskStructure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

if (!projectId || !dataset) {
	throw new Error(
		"Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET",
	);
}

export default defineConfig({
	name: "default",
	title: "Portfolio Studio",
	projectId,
	dataset,
	plugins: [deskTool({ structure: deskStructure })],
	schema: {
		types: schemaTypes,
		templates: (prev) => [
			...prev,
			{
				id: "careerItem-experience",
				title: "Experience",
				schemaType: "careerItem",
				value: { category: "experience" },
			},
			{
				id: "careerItem-education",
				title: "Education",
				schemaType: "careerItem",
				value: { category: "education" },
			},
			{
				id: "careerItem-research",
				title: "Research",
				schemaType: "careerItem",
				value: { category: "research" },
			},
		],
	},
});
