import { useState, useEffect } from "react";
import { sanityClient } from "@/lib/sanityClient";
import { Project, CareerItem, ResumeData } from "@/types";

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
					   },
					   tags[]-> {
						   _id,
						   title,
						   slug
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
					   },
					   tags[]-> {
						   _id,
						   title,
						   slug
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

/**
 * Hook para buscar todos os career items e agrupá-los por categoria
 */
export function useResume() {
	const [state, setState] = useState<{
		data: ResumeData;
		isLoading: boolean;
		error: Error | null;
	}>({
		data: {
			experience: [],
			education: [],
			research: [],
		},
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		let isMounted = true;

		const fetchResume = async () => {
			try {
				// Tenta obter do sessionStorage
				const cached = sessionStorage.getItem("resumeData");
				if (cached) {
					const parsed = JSON.parse(cached);
					setState({
						data: parsed,
						isLoading: false,
						error: null,
					});
					return;
				}

				const query = `*[_type == "careerItem"] | order(order asc) {
					_id,
					title,
					location,
					startYear,
					endYear,
					isPresent,
					type,
					category,
					description,
					order
				}`;

				const careerItems = await sanityClient.fetch(query);

				if (isMounted) {
					// Agrupar items por categoria
					const groupedData: ResumeData = {
						experience: careerItems.filter(
							(item) => item.category === "experience",
						),
						education: careerItems.filter(
							(item) => item.category === "education",
						),
						research: careerItems.filter(
							(item) => item.category === "research",
						),
					};

					// Salva no sessionStorage
					sessionStorage.setItem(
						"resumeData",
						JSON.stringify(groupedData),
					);

					setState({
						data: groupedData,
						isLoading: false,
						error: null,
					});
				}
			} catch (error) {
				if (isMounted) {
					setState({
						data: {
							experience: [],
							education: [],
							research: [],
						},
						isLoading: false,
						error:
							error instanceof Error
								? error
								: new Error("Unknown error"),
					});
				}
			}
		};

		fetchResume();

		return () => {
			isMounted = false;
		};
	}, []);

	return state;
}
