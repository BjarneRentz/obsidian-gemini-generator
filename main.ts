import {
	App,
	Editor,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

import { GoogleGenerativeAI } from "@google/generative-ai";

interface MyPluginSettings {
	apiKey: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	apiKey: "",
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		const genAi = new GoogleGenerativeAI(this.settings.apiKey);
		const model = genAi.getGenerativeModel({
			model: "gemini-1.5-flash-latest",
		});

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "generate-note",
			name: "Generate Note with Gemini",
			editorCallback: async (editor: Editor) => {
				const title = this.app.workspace.getActiveFile()?.basename;
				if (!title) {
					new Notice("Could not get filename", 1500);
				}

				editor.setCursor(editor.lastLine());

				const prompt = `Write a me an Obsidian Markdown Note without the Title on:${title} `;
				const result = await model.generateContentStream(prompt);

				for await (const chunk of result.stream) {
					const chunkText = chunk.text();
					editor.replaceRange(chunkText, editor.getCursor());
					editor.setCursor(editor.lastLine());
				}

				new Notice("✅ Finished", 1500);
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("API-Key")
			.setDesc("Gemini Api-Key")
			.addText((text) =>
				text
					.setPlaceholder("Enter your API-Keysecret")
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
