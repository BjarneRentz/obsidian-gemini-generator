export const substituePrompt = (prompt: string, title: string) : string => {
    const titleRegex = /\{TITLE\}/g;
    const substitutedPrompt = prompt.replace(titleRegex, title);
    return substitutedPrompt;
}