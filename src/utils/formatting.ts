// Funções utilitárias de formatação

export const formatDate = (date: string, language: "pt" | "en"): string => {
	const dateObj = new Date(date);

	if (language === "pt") {
		return dateObj.toLocaleDateString("pt-BR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	return dateObj.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const formatDateRange = (
	startDate: string,
	endDate: string | undefined,
	language: "pt" | "en",
): string => {
	const start = formatDate(startDate, language);
	const end = endDate
		? formatDate(endDate, language)
		: language === "pt"
			? "Presente"
			: "Present";

	return `${start} - ${end}`;
};

export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
};

export const parseQueryString = (
	queryString: string,
): Record<string, string> => {
	const params: Record<string, string> = {};

	new URLSearchParams(queryString).forEach((value, key) => {
		params[key] = value;
	});

	return params;
};

export const buildQueryString = (params: Record<string, string>): string => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			searchParams.append(key, value);
		}
	});

	return searchParams.toString();
};
