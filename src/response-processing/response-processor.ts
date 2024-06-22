export interface IResponseProcessor {
    /**
     * Process the response
     * @param text Input to process
     * @param processingInputs Settings to apply when processing
     */
    process (text: string, processingInputs: ProcessingSettings): void;

    /**
     * Resets the internal state.
     */
    reset(): void;

}


export interface ProcessingSettings {
    noteTitle: string
}