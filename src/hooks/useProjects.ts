import { useState, useEffect } from "react";
import { sanityClient } from "@/lib/sanityClient";
import { Project } from "@/types";

type UseProjectsState = {
	data: Project[];
	isLoading: boolean;
	error: Error | null;
};

/**
 * Hook para buscar todos os projetos
 */
export function useProjects() {
	const [state, setState] = useState<UseProjectsState>({
		data: [],
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		let isMounted = true;

		const fetchProjects = async () => {
			try {
				const query = `*[_type == "project"] | order(publishedAt desc) {
          _id,
          slug,
          title,
          description,
          featured,
          publishedAt,
          image {
            asset -> {
              _id,
              url
            },
            alt
          }
        }`;

				const projects = await sanityClient.fetch(query);

				if (isMounted) {
					setState({
						data: projects,
						isLoading: false,
						error: null,
					});
				}
			} catch (error) {
				if (isMounted) {
					setState({
						data: [],
						isLoading: false,
						error:
							error instanceof Error
								? error
								: new Error("Unknown error"),
					});
				}
			}
		};

		fetchProjects();

		return () => {
			isMounted = false;
		};
	}, []);

	return state;
}

/**
 * Hook para buscar projetos em destaque
 */
export function useFeaturedProjects(limit: number = 3) {
	const [state, setState] = useState<UseProjectsState>({
		data: [],
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		let isMounted = true;

		const fetchFeatured = async () => {
			try {
				const query = `*[_type == "project" && featured == true] | order(publishedAt desc)[0..${limit - 1}] {
          _id,
          slug,
          title,
          description,
          publishedAt,
          image {
            asset -> {
              _id,
              url
            },
            alt
          }
        }`;

				const projects = await sanityClient.fetch(query);

				if (isMounted) {
					setState({
						data: projects,
						isLoading: false,
						error: null,
					});
				}
			} catch (error) {
				if (isMounted) {
					setState({
						data: [],
						isLoading: false,
						error:
							error instanceof Error
								? error
								: new Error("Unknown error"),
					});
				}
			}
		};

		fetchFeatured();

		return () => {
			isMounted = false;
		};
	}, [limit]);

	return state;
}

/**
 * Hook para buscar um projeto por slug
 */
export function useProject(slug: string | undefined) {
	const [state, setState] = useState<{
		data: Project | null;
		isLoading: boolean;
		error: Error | null;
	}>({
		data: null,
		isLoading: !slug,
		error: null,
	});

	useEffect(() => {
		if (!slug) {
			setState({
				data: null,
				isLoading: false,
				error: new Error("Slug not provided"),
			});
			return;
		}

		let isMounted = true;

		const fetchProject = async () => {
			try {
				const query = `*[_type == "project" && slug.current == $slug][0] {
          _id,
          slug,
          title,
          description,
          publishedAt,
          teamSize,
          duration,
          role,
          image {
            asset -> {
              _id,
              url
            },
            alt
          },
          challenge,
          solution,
          results,
          body
        }`;

				const project = await sanityClient.fetch(query, { slug });

				if (isMounted) {
					if (!project) {
						setState({
							data: null,
							isLoading: false,
							error: new Error("Project not found"),
						});
					} else {
						setState({
							data: project,
							isLoading: false,
							error: null,
						});
					}
				}
			} catch (error) {
				if (isMounted) {
					setState({
						data: null,
						isLoading: false,
						error:
							error instanceof Error
								? error
								: new Error("Unknown error"),
					});
				}
			}
		};

		fetchProject();

		return () => {
			isMounted = false;
		};
	}, [slug]);

	return state;
}

// Hook para buscar dados da página About
export function useAbout() {
	const [state, setState] = useState<{
		data: {
			_id: string;
			bio?: {
				pt: string;
				en: string;
			};
			experience?: Array<{
				_key: string;
				company: string;
				position: string;
				startDate: string;
				endDate?: string;
				description?: {
					pt: string;
					en: string;
				};
			}>;
			skills?: Array<{
				_key: string;
				name: string;
				category: string;
			}>;
		} | null;
		isLoading: boolean;
		error: Error | null;
	}>({
		data: null,
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		let isMounted = true;

		const fetchAbout = async () => {
			try {
				const query = `*[_type == "about"][0] {
          _id,
          bio,
          experience[] {
            _key,
            company,
            position,
            startDate,
            endDate,
            description
          },
          skills[] {
            _key,
            name,
            category
          }
        }`;

				const data = await sanityClient.fetch(query);

				if (isMounted) {
					setState({
						data,
						isLoading: false,
						error: null,
					});
				}
			} catch (error) {
				if (isMounted) {
					console.error("Error fetching about:", error);
					setState({
						data: null,
						isLoading: false,
						error:
							error instanceof Error
								? error
								: new Error("Unknown error"),
					});
				}
			}
		};

		fetchAbout();

		return () => {
			isMounted = false;
		};
	}, []);

	return state;
}
