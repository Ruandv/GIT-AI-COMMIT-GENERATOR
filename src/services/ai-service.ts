
import MissingVariableException from "../exceptions/missingVariableException";
import BaseHttp from "./baseHttp";

// generate a service that will call the AI model to generate a commit message this must inherit from the baseHttp service
export default class AiService {
    private static instance: AiService;
    private static baseUrl = process.env.AI_SERVICE_URL;
    private static baseService: BaseHttp; 

    private constructor() {
        if (!process.env.AI_SERVICE_SECRET) {
            throw new MissingVariableException('AI_SERVICE_SECRET');
        } 

        AiService.baseService = BaseHttp.getInstance(AiService.baseUrl, {
            'Content-Type': 'application/json',
            'x-secret': process.env.AI_SERVICE_SECRET
        });
        
    }

    static getInstance(): AiService {
        if (!AiService.instance) {
            AiService.instance = new AiService();
        }
        return AiService.instance;
    }

    async generateCommitMessage(diffFileData: string): Promise<any> {
        const body = {
            prompt: diffFileData,
            historyId: 'rdv' + Math.random().toString(36).substring(7),
            config: { language: 'english' }
        }

        return await AiService.baseService.post(`/api/llm/generateCommit`, body);
    }
}