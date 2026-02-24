import { useState, useEffect } from "react";
import { sanityClient } from "@/lib/sanityClient";
import { getLocalizedString } from "@/utils/i18n";

export interface Category {
	_id: string;
	title: { pt: string; en: string };
	slug: { current: string };
}

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;
		sanityClient
			.fetch(
				`*[_type == "category"] | order(title.pt asc) {
          _id,
          title,
          slug
        }`,
			)
			.then((data) => {
				if (isMounted) {
					setCategories(data);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				if (isMounted) {
					setError(
						err instanceof Error ? err : new Error("Unknown error"),
					);
					setIsLoading(false);
				}
			});
		return () => {
			isMounted = false;
		};
	}, []);

	return { categories, isLoading, error };
}
