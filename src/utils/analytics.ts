import { track } from "@vercel/analytics/react";

export const trackEvent = (
	eventName: string,
	properties?: Record<string, string | number | boolean>,
) => {
	track(eventName, properties);
};

export const trackProjectClick = (projectSlug: string) => {
	trackEvent("project_click", { project: projectSlug });
};

export const trackCVDownload = () => {
	trackEvent("cv_download");
};

export const trackContactClick = () => {
	trackEvent("contact_click");
};

export const trackExternalLink = (url: string) => {
	trackEvent("external_link", { url });
};
