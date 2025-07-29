export interface GeminiGeneratorSettings {
	apiKey: string;
	removeHeadlineEnabled : boolean;
	defaultPrompt: string;
}export const DEFAULT_SETTINGS: GeminiGeneratorSettings = {
	apiKey: "",
	removeHeadlineEnabled : false,
	defaultPrompt: "Write a me an Obsidian Markdown Note for a Note with the title: {TITLE} \n You are writing directly in Obsidian thus you do not need an extra markdown environment. Also do not use any properties",
};

