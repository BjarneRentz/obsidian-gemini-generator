import { GenerateContentStreamResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GeminiGeneratorSettings } from "./settings";

export class GeminiClient {
    private pluginSettings : GeminiGeneratorSettings

    private genAi : GoogleGenerativeAI
    private model: GenerativeModel


    constructor(settings: GeminiGeneratorSettings){
        this.pluginSettings = settings;
        this.genAi = new GoogleGenerativeAI(this.pluginSettings.apiKey);
        this.model = this.genAi.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
        });
    }

    private checkApiKey() {
        if(!this.genAi.apiKey) {
            this.genAi = new GoogleGenerativeAI(this.pluginSettings.apiKey);
            this.model = this.genAi.getGenerativeModel({
                model: "gemini-1.5-flash-latest",
            });
        }
    }

    public async generateNote (prompt: string) : Promise<GenerateContentStreamResult| undefined> {
        this.checkApiKey();
        
        try
        {
            return await this.model.generateContentStream(prompt);
        }
        catch (error) {
            console.error("Could not perfrom request to Gemini API", error)
            return undefined;
        }
    
    }
}