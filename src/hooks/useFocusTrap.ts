import { useEffect, useRef } from "react";

interface UseFocusTrapOptions {
	isActive: boolean;
	onClose: () => void;
}

export function useFocusTrap({ isActive, onClose }: UseFocusTrapOptions) {
	const containerRef = useRef<HTMLDivElement>(null);
	const initialFocusDone = useRef(false);

	useEffect(() => {
		if (!isActive) {
			initialFocusDone.current = false;
			return;
		}

		const container = containerRef.current;
		if (!container) return;

		// Aplicar inert no conteúdo principal e nos controles do header (exceto o menu mobile)
		const main = document.querySelector("main");
		const headerControls = document.querySelector(".header-controls");
		const desktopNav = document.querySelector(".nav-links.desktop-only");

		const previousInertState = main ? main.hasAttribute("inert") : false;
		const previousHeaderControlsInert = headerControls
			? headerControls.hasAttribute("inert")
			: false;
		const previousDesktopNavInert = desktopNav
			? desktopNav.hasAttribute("inert")
			: false;

		if (main) {
			main.setAttribute("inert", "");
		}
		if (headerControls && !container.closest(".header-controls")) {
			headerControls.setAttribute("inert", "");
		}
		if (desktopNav) {
			desktopNav.setAttribute("inert", "");
		}

		// Focus no primeiro elemento apenas uma vez quando abre
		if (!initialFocusDone.current) {
			const focusableElements = container.querySelectorAll<HTMLElement>(
				"button.dropdown-item:not([disabled]), a[href], button:not([disabled])",
			);

			setTimeout(() => {
				if (focusableElements.length > 0) {
					focusableElements[0].focus();
				}
			}, 10);

			initialFocusDone.current = true;
		}

		// Gerenciar navegação por teclado
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
				return;
			}

			if (e.key === "Tab") {
				const focusableElements =
					container.querySelectorAll<HTMLElement>(
						"button.dropdown-item:not([disabled]), a[href], button:not([disabled])",
					);

				if (focusableElements.length === 0) return;

				const firstElement = focusableElements[0];
				const lastElement =
					focusableElements[focusableElements.length - 1];

				// Tab circula do último para o primeiro
				if (!e.shiftKey && document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
					return;
				}

				// Shift+Tab circula do primeiro para o último
				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
					return;
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Cleanup
		return () => {
			document.removeEventListener("keydown", handleKeyDown);

			// Restaurar estado inert anterior
			if (main && !previousInertState) {
				main.removeAttribute("inert");
			}
			if (headerControls && !previousHeaderControlsInert) {
				headerControls.removeAttribute("inert");
			}
			if (desktopNav && !previousDesktopNavInert) {
				desktopNav.removeAttribute("inert");
			}
		};
	}, [isActive, onClose]);

	return containerRef;
}
