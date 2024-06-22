import { Plugin } from "obsidian";

import { GeminiGeneratorSettings } from "./settings";
import { DEFAULT_SETTINGS } from "./settings";
import { getEditorCommands } from "./commands";
import { GeminiGeneratorSettingTab } from "./setting-tab";

export default class GeminiGenerator extends Plugin {
	settings: GeminiGeneratorSettings;

	
	async onload() {
		await this.loadSettings();		

		this.addEditorCommands();
		
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new GeminiGeneratorSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private addEditorCommands() {
		for (const command of getEditorCommands(this)) {
			this.addCommand(command);
		}
	}
}