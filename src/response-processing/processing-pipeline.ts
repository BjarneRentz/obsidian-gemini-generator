import { GeminiGeneratorSettings } from "src/settings";
import { RemoveHeadlineProcessor } from "./remove-headline-processor";
import { EditorWriter } from "./editor-writer";
import { Editor } from "obsidian";
import { IResponseProcessor } from "./response-processor";


export const buildPipeline = (settings: GeminiGeneratorSettings, editor: Editor) : IResponseProcessor => {
    const editorWriter = new EditorWriter(editor);
    if (settings.removeHeadlineEnabled) {
        console.info("RemoveHeadlineProcessor enabled");
        return new RemoveHeadlineProcessor(editorWriter);
    }
    return editorWriter;

}
