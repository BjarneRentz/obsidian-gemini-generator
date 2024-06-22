import { ProcessingSettings, IResponseProcessor } from "./response-processor";

export class RemoveHeadlineProcessor implements IResponseProcessor {

    private readonly next : IResponseProcessor;

    private headlineRemoved = false;
    private buffer = "";

    private regex? : RegExp;// = new RegExp('(#)+( )+(Test)(\n)');

    constructor(next: IResponseProcessor) {
        this.next = next;
    }


    reset(): void {
        this.headlineRemoved = false;
        this.regex = undefined;
        this.buffer = "";

        this.next.reset();
    }

    process(text: string, processingInputs: ProcessingSettings): void {
        if(!this.regex) {
            this.regex = new RegExp(`(#)+( )+(${processingInputs.noteTitle})(\n)`)
        }
        
        if(this.headlineRemoved) {
            this.next.process(text, processingInputs);

        } else {
            // Append partial response to the buffer
            this.buffer += text;
            const regexMatch = this.buffer.match(this.regex);
            if(regexMatch) {
                const replaced = this.buffer.replace(this.regex, "");
                this.buffer = "";
                this.headlineRemoved = true;
                this.next.process(replaced, processingInputs);
            }
        }

    }
    
}

