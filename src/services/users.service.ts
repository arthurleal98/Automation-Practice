import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserData, ApiResponse } from '../types/api';

/**
 * Serviço de API para operações relacionadas a usuários.
 * Encapsula chamadas HTTP, deixando os testes mais legíveis.
 */
export class UsersApiService {
    readonly request: APIRequestContext;
    readonly baseUrl: string = 'https://automationexercise.com/api';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Cria um novo usuário utilizando os dados fornecidos.
     */
    async createAccount(userData: UserData): Promise<APIResponse> {
        // o objeto "form" aqui mapeia explicitamente os campos esperados pela API
        return this.request.post(`${this.baseUrl}/createAccount`, {
            form: {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                title: userData.title,
                birth_date: userData.birth_date,
                birth_month: userData.birth_month,
                birth_year: userData.birth_year,
                firstname: userData.firstname,
                lastname: userData.lastname,
                company: userData.company,
                address1: userData.address1,
                address2: userData.address2,
                country: userData.country,
                zipcode: userData.zipcode,
                state: userData.state,
                city: userData.city,
                mobile_number: userData.mobile_number
            }
        });
    }

    /**
     * Apaga uma conta existente.
     */
    async deleteAccount(email: string, password: string): Promise<APIResponse> {
        return this.request.delete(`${this.baseUrl}/deleteAccount`, {
            form: {
                email,
                password
            }
        });
    }

    async updateAccount(userData: Partial<UserData>): Promise<APIResponse> {
        return this.request.put(`${this.baseUrl}/updateAccount`, {
            form: userData
        });
    }

    async getUserDetailByEmail(email: string): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/getUserDetailByEmail`, {
            params: { email }
        });
    }

    async verifyLogin(email: string, password: string): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/verifyLogin`, {
            form: { email, password }
        });
    }

    async searchAccountByEmail(email: string): Promise<APIResponse> {
        // atenção: rota original contém typo "seach" , mas não estava sendo usada
        return this.request.get(`${this.baseUrl}/searchAccountByEmail`, {
            params: { email }
        });
    }

    /**
     * Helper simplificado para criar um usuário de teste com valores padrão.
     */
    async createTestUser(email?: string): Promise<APIResponse> {
        const testUserData: UserData = {
            name: 'API User Test',
            email: email || `api_user_${Date.now()}@test.com`,
            password: 'password123',
            title: 'Mr',
            birth_date: '10',
            birth_month: '05',
            birth_year: '1990',
            firstname: 'API',
            lastname: 'Test',
            company: 'QA Corp',
            address1: 'Street 1',
            address2: 'Apt 2',
            country: 'United States',
            zipcode: '90001',
            state: 'California',
            city: 'Los Angeles',
            mobile_number: '1234567890'
        };

        return this.createAccount(testUserData);
    }
}

