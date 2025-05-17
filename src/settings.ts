export interface GeminiGeneratorSettings {
	apiKey: string;
	removeHeadlineEnabled : boolean;
	defaultPrompt: string;
}export const DEFAULT_SETTINGS: GeminiGeneratorSettings = {
	apiKey: "",
	removeHeadlineEnabled : false,
	defaultPrompt: "Write a me an Obsidian Markdown Note without the Title on {TITLE}",
};

