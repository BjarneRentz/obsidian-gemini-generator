import { Editor } from "obsidian";
import { ProcessingSettings, IResponseProcessor } from "./response-processor";

/**
 * Writes the input to the current active editor.
 */
export class EditorWriter implements IResponseProcessor {


    private readonly editor : Editor;

    constructor(editor : Editor) {
        this.editor = editor;
    }
    reset(): void {}

    process(input: string, processingSettings: ProcessingSettings): void {
        this.editor.setCursor(this.editor.lastLine());

        this.editor.replaceRange(input, this.editor.getCursor());
        this.editor.setCursor(this.editor.lastLine());
    }
    
}