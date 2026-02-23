/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SANITY_PROJECT_ID: string;
	readonly VITE_SANITY_DATASET: string;
	readonly VITE_OPENWEATHER_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
