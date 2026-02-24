import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductsApiService {
    readonly request: APIRequestContext;
    readonly baseUrl: string = 'https://automationexercise.com/api';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllProducts(): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/productsList`);
    }

    async searchProduct(keyword: string): Promise<APIResponse> {
        // A API do Automation Exercise espera parâmetros de formulário para POST
        return this.request.post(`${this.baseUrl}/`, {
            form: {
                search_product: keyword
            }
        });
    }
    
    


    async verifyLogin(email: string, password: string): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/verifyLogin`, {
            form: {
                email: email,
                password: password
            }
        });
    }

    async verifyLoginWithoutEmail(password: string): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/verifyLogin`, {
            form: {
                password: password
            }
        });
    }

    async postAllProducts(): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/productsList`);
    }

    

    
}
