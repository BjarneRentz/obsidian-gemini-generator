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


			containerEl.createEl("h3", { text: "Prompts" });
			containerEl.createEl("p", { 
				text: "In here you can customize the default prompt used for generation of the note. Use {TITLE} to insert the title of the note." 
			});

			new Setting(containerEl)
            .setName("Default Prompt")
            .setDesc("Set the default prompt for generation")
            .addTextArea((textArea) => textArea
                .setPlaceholder("Enter your default prompt")
                .setValue(this.plugin.settings.defaultPrompt)
                .onChange(async (value) => {
                    this.plugin.settings.defaultPrompt = value;
                    await this.plugin.saveSettings();
                })
				.inputEl.addClass("default-prompt-textarea")
            );
	}
}
