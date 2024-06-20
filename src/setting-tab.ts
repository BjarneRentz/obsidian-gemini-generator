import {
	App, PluginSettingTab,
	Setting
} from "obsidian";
import GeminiGenerator from "./main";

export class GeminiGeneratorSettingTab extends PluginSettingTab {
	plugin: GeminiGenerator;

	constructor(app: App, plugin: GeminiGenerator) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Api Key")
			.setDesc("Gemini API key")
			.addText((text) => text
				.setPlaceholder("Enter your API key")
				.setValue(this.plugin.settings.apiKey)
				.onChange(async (value) => {
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
