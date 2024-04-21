// create a base HTTP service that can be used to make HTTP requests
export default class BaseHttp {
    private static instance: BaseHttp;
    private headers = {
        'Content-Type': 'application/json'
    };
    baseUrl: string;
    private constructor(baseUrl:string, headers:any) { 
        this.baseUrl = baseUrl;
        this.headers= headers
    }
  
    static getInstance(baseUrl?:string,headers?:any): BaseHttp {
        if(!baseUrl) throw new Error('baseUrl is required');
        
        if (!BaseHttp.instance) {
            BaseHttp.instance = new BaseHttp(baseUrl,headers);
        }
        return BaseHttp.instance;
    }

    async get(url: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}${url}`);
        return response.json();
    }
    async post(url: string, data: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        return response.json();
    }
}