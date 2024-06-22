export interface GeminiGeneratorSettings {
	apiKey: string;
	removeHeadlineEnabled : boolean;
}export const DEFAULT_SETTINGS: GeminiGeneratorSettings = {
	apiKey: "",
	removeHeadlineEnabled : true
};

