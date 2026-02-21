import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const THEME_KEY = "portfolio-theme";

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => {
		// Recuperar tema salvo
		const saved = localStorage.getItem(THEME_KEY) as Theme | null;
		return saved || "system";
	});

	useEffect(() => {
		// Salvar tema
		localStorage.setItem(THEME_KEY, theme);

		// Determinar tema efetivo
		let effectiveTheme: "light" | "dark" =
			theme === "system"
				? window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light"
				: theme;

		// Aplicar classe na raiz
		const html = document.documentElement;
		html.setAttribute("data-theme", effectiveTheme);

		if (effectiveTheme === "dark") {
			html.classList.add("dark-mode");
			html.classList.remove("light-mode");
		} else {
			html.classList.add("light-mode");
			html.classList.remove("dark-mode");
		}
	}, [theme]);

	// Escutar mudanças de preferência do sistema
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			if (theme === "system") {
				const html = document.documentElement;
				const effectiveTheme = mediaQuery.matches ? "dark" : "light";
				html.setAttribute("data-theme", effectiveTheme);

				if (effectiveTheme === "dark") {
					html.classList.add("dark-mode");
					html.classList.remove("light-mode");
				} else {
					html.classList.add("light-mode");
					html.classList.remove("dark-mode");
				}
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	return { theme, setTheme };
}
