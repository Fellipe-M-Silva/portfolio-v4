import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = "2024-02-21";

if (!projectId || !dataset) {
	throw new Error(
		"Missing Sanity configuration. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to .env.local",
	);
}

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});

const builder = createImageUrlBuilder({
	projectId,
	dataset,
});

export const urlFor = (source: any) => {
	try {
		return builder.image(source).url();
	} catch (error) {
		console.error("Error building image URL:", error);
		return "/placeholder.jpg";
	}
};

export const urlForOptimized = (
	source: any,
	width: number = 800,
	height?: number,
) => {
	try {
		let img = builder.image(source).width(width);
		if (height) {
			img = img.height(height);
		}
		return img.url();
	} catch (error) {
		console.error("Error building optimized image URL:", error);
		return "/placeholder.jpg";
	}
};

export const urlForWebP = (source: any, width: number = 800) => {
	try {
		return builder.image(source).width(width).format("webp").url();
	} catch (error) {
		console.error("Error building WebP URL:", error);
		return "/placeholder.jpg";
	}
};

export default sanityClient;
