import { defineType, defineField } from "sanity";

export default defineType({
	name: "careerItem",
	type: "document",
	title: "Item de Curriculo",
	fields: [
		defineField({
			name: "title",
			type: "localizedString",
			title: "Titulo",
		}),
		defineField({
			name: "location",
			type: "localizedString",
			title: "Instituicao",
			description: "Pode ser empresa, universidade ou laboratorio",
		}),
		defineField({
			name: "startYear",
			type: "number",
			title: "Ano de inicio",
			validation: (Rule) => Rule.required().min(1900),
		}),
		defineField({
			name: "endYear",
			type: "number",
			title: "Ano de fim",
			validation: (Rule) =>
				Rule.custom((value, context) => {
					const parent = context.parent as {
						isPresent?: boolean;
						startYear?: number;
						category?: string;
					};

					// Research items don't require endYear
					if (parent?.category === "research") {
						return true;
					}

					if (parent?.isPresent) {
						return value
							? "End year should be empty when Present is checked"
							: true;
					}

					if (!value) {
						return "End year is required unless Present is checked";
					}

					if (parent?.startYear && value < parent.startYear) {
						return "End year must be greater than or equal to start year";
					}

					return true;
				}),
		}),
		defineField({
			name: "endDate",
			type: "date",
			title: "Data de fim",
			description: "Data específica de finalização (opcional)",
			hidden: ({ parent }) => {
				const category = (parent as any)?.category;
				return category === "research";
			},
		}),
		defineField({
			name: "isPresent",
			type: "boolean",
			title: "Presente",
			initialValue: false,
			description: "Marque se ainda estiver em andamento",
		}),
		defineField({
			name: "type",
			type: "localizedString",
			title: "Tipo",
			description: "Funcao, curso ou tipo de producao",
		}),
		defineField({
			name: "category",
			type: "string",
			title: "Categoria",
			readOnly: true,
			hidden: true,
			validation: (Rule) => Rule.required(),
			options: {
				list: [
					{ title: "Experiencia", value: "experience" },
					{ title: "Educacao", value: "education" },
					{ title: "Pesquisa", value: "research" },
				],
			},
		}),
		defineField({
			name: "description",
			type: "localizedString",
			title: "Descricao",
		}),
		defineField({
			name: "order",
			type: "number",
			title: "Ordem",
			initialValue: 0,
		}),
	],
	preview: {
		select: {
			title: "title.pt",
			location: "location.pt",
			startYear: "startYear",
			endYear: "endYear",
			endDate: "endDate",
			isPresent: "isPresent",
			category: "category",
		},
		prepare({
			title,
			location,
			startYear,
			endYear,
			endDate,
			isPresent,
			category,
		}) {
			const period = isPresent
				? `${startYear ?? ""} - Presente`
				: endYear
					? `${startYear ?? ""} - ${endYear}`
					: `${startYear ?? ""}`;

			const categoryLabel = category
				? category.charAt(0).toUpperCase() + category.slice(1)
				: "";

			return {
				title: title || "(Sem titulo)",
				subtitle: [location, period, categoryLabel]
					.filter(Boolean)
					.join(" · "),
			};
		},
	},
});
