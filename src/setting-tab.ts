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

		new Setting(containerEl).setName('Response Processing').setHeading();

		new Setting(containerEl)
			.setName("Remove note title")
			.setDesc("❗This feature is under active development, if you encounter bugs, please report them. If enabled, removes headlines with the same title as the note.")
			.addToggle(toogle => toogle
				.setValue(this.plugin.settings.removeHeadlineEnabled)
				.onChange(async (newValue) => {
					this.plugin.settings.removeHeadlineEnabled = newValue;
					await this.plugin.saveSettings();
				})
			);

	}
}
