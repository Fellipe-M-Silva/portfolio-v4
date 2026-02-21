import { useTranslation } from "react-i18next";

export interface LocalizedString {
	pt: string;
	en: string;
}

/**
 * Hook que extrai a string na linguagem atual do i18next
 * @param str - Objeto com {pt: string, en: string} ou string simples
 * @returns String na linguagem atual
 */
export function useLocalizedString(
	str: LocalizedString | string | undefined,
): string {
	const { i18n } = useTranslation();

	if (!str) return "";

	// Se for string simples, retorna diretamente
	if (typeof str === "string") return str;

	// Se for objeto bilíngue, extrai a linguagem correta
	const lang = i18n.language as keyof LocalizedString;
	return (str[lang] || str["pt"] || "") as string;
}

/**
 * Função auxiliar para extrair string localizada sem hook
 * Útil para casos onde você já tem acesso à linguagem
 * @param str - Objeto com {pt: string, en: string} ou string simples
 * @param lang - Linguagem ('pt' ou 'en')
 * @returns String na linguagem especificada
 */
export function getLocalizedString(
	str: LocalizedString | string | undefined,
	lang: string = "pt",
): string {
	if (!str) return "";

	if (typeof str === "string") return str;

	return (str[lang as keyof LocalizedString] || str["pt"] || "") as string;
}
