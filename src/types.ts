// Tipos para o portfólio

export interface LocalizedString {
	pt: string;
	en: string;
}

export interface Project {
	_id: string;
	_type: "project";
	title: LocalizedString;
	slug: {
		current: string;
	};
	description: LocalizedString;
	featured: boolean;
	image?: {
		asset: {
			url: string;
			_id: string;
		};
		alt: string;
	};
	teamSize: string;
	duration: string;
	role: string;
	content: {
		challenge: LocalizedString;
		solution: LocalizedString;
		results: LocalizedString;
	};
	publishedAt?: string;
}

export interface SanityImage {
	asset: {
		_id: string;
		url: string;
	};
	alt?: string;
	crop?: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	hotspot?: {
		x: number;
		y: number;
		height: number;
		width: number;
	};
}

export interface ExperienceItem {
	company: string;
	position: string;
	startDate: string;
	endDate?: string;
	description: LocalizedString;
}

export interface CareerItem {
	_id: string;
	_type: "careerItem";
	title: LocalizedString;
	location: LocalizedString;
	startYear: number;
	endYear?: number;
	isPresent?: boolean;
	type: LocalizedString;
	category: "experience" | "education" | "research";
	description?: LocalizedString;
	order: number;
}

export interface ResumeData {
	experience: CareerItem[];
	education: CareerItem[];
	research: CareerItem[];
}

export interface Skill {
	name: string;
	category: string;
}

export type Language = "pt" | "en";
