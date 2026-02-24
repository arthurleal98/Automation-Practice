import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResponse, ProductSearchResult } from '../types/api';

/**
 * Encapsula chamadas � API de produtos.
 * Usa interfaces definidas em src/types/api.ts para tipagem mais segura.
 */
export class ProductsApiService {
    readonly request: APIRequestContext;
    readonly baseUrl: string = 'https://automationexercise.com/api';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Retorna todos os produtos dispon�veis.
     */
    async getAllProducts(): Promise<APIResponse> {
        // note: caller can further cast to ApiResponse<ProductSearchResult> after parsing
        return this.request.get(`${this.baseUrl}/productsList`);
    }

    /**
     * Realiza busca por palavra-chave.
     */
    async searchProduct(keyword: string): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/searchProduct`, {
            form: { search_product: keyword }
        });
    }

    /**
     * Chamadas adicionais n�o utilizadas em testes foram removidas para
     * manter a classe enxuta. Se necess�rio, podem ser reimplementadas com
     * tipagem apropriada.
     */

    /** A API n�o permite POST em /productsList; este m�todo � usado apenas
     * nos testes para validar o comportamento de m�todo n�o permitido. */
    async postAllProducts(): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/productsList`);
    }
}
