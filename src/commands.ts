import { Editor, Notice } from "obsidian";
import GeminiGenerator from "./main"
import { GeminiClient } from "./gemini-client";


function generateNote(plugin : GeminiGenerator, geminiClient : GeminiClient) {
    
    return {
        id: "generate-note",
        name: "Generate Note with Gemini",
        editorCallback: async (editor: Editor) => {
            
            const title = plugin.app.workspace.getActiveFile()?.basename;
            if (!title) {
                new Notice("Could not get filename", 1500);
                return;
            }

            const notice = new Notice("🔥 Generating", 0);

            editor.setCursor(editor.lastLine());

            const prompt = `Write a me an Obsidian Markdown Note without the Title on:${title} `;
            
            const result = await geminiClient.generateNote(prompt);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                editor.replaceRange(chunkText, editor.getCursor());
                editor.setCursor(editor.lastLine());
            }

            notice.setMessage("✅ Finished");

            setTimeout(() => notice.hide(), 1500);
        }
    }
}

export const getEditorCommands = (plugin : GeminiGenerator) => {

    const geminiClient = new GeminiClient(plugin.settings);

    return [
        generateNote(plugin, geminiClient)
    ];

}