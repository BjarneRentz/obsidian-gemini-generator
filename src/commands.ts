import { Editor, Notice } from "obsidian";
import GeminiGenerator from "./main"
import { GeminiClient } from "./gemini-client";
import { ProcessingSettings } from "./response-processing/response-processor";
import { buildPipeline } from "./response-processing/processing-pipeline";
import { substituePrompt } from "./prompt-substituer";


function buildGenerateNoteCommand(plugin : GeminiGenerator) {
    
    const geminiClient = new GeminiClient(plugin.settings);

    return {
        id: "generate-note",
        name: "Generate note with Gemini",
        editorCallback: async (editor: Editor) => {
            
            const pipeline = buildPipeline(plugin.settings, editor);
            
            const title = plugin.app.workspace.getActiveFile()?.basename;
            if (!title) {
                new Notice("Could not get filename", 1500);
                return;
            }

            const notice = new Notice("🔥 Generating", 0);

            editor.setCursor(editor.lastLine());

            const prompt = substituePrompt(plugin.settings.defaultPrompt, title);

            const result = await geminiClient.generateNote(prompt);

            if(!result){
                notice.setMessage("❌ An error occured during the Google Gemini Request")
                return;
            }

            const settings = <ProcessingSettings>{noteTitle: title};

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                pipeline.process(chunkText, settings);
            }

            pipeline.reset();
            notice.setMessage("✅ Finished");

            setTimeout(() => notice.hide(), 1500);
        }
    }
}

export const getEditorCommands = (plugin : GeminiGenerator) => [
        buildGenerateNoteCommand(plugin)
    ];