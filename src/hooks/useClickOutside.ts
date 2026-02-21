import { useEffect, useRef } from "react";

/**
 * Hook para fechar modal/dropdown quando clicar fora
 * @param onClickOutside Callback quando clicar fora
 */
export function useClickOutside(onClickOutside: () => void) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClickOutside();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClickOutside]);

	return ref;
}
