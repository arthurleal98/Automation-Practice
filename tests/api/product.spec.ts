import { test, expect } from '@playwright/test';
import { ProductsApiService } from '../../src/services/products.service';

test.describe('Testes de API - Produtos', () => {

    test('GET - Listar todos os produtos', async ({ request }) => {
        const apiService = new ProductsApiService(request);
        
        const response = await apiService.getAllProducts();
        
        // Validações básicas de status HTTP
        expect(response.status()).toBe(200);
        
        // Parse do JSON
        const responseBody = await response.json();
        
        // Validações do corpo da resposta (baseado na doc do Automation Exercise)
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.products.length).toBeGreaterThan(0);
    });

    test('POST - Tentar criar produto (Método não permitido)', async ({ request }) => {
        const apiService = new ProductsApiService(request);
        
        const response = await apiService.postAllProducts();
        
        // 1. O status HTTP retornado é 200, pois o servidor processou a requisição
        expect(response.status()).toBe(200);
        
        // 2. O erro real (405) está dentro do corpo do JSON
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe("This request method is not supported.");
    });

    test('POST - Pesquisar produto', async ({ request }) => {
        const apiService = new ProductsApiService(request);
        
        const response = await apiService.searchProduct('top');
        
        // Validações básicas de status HTTP
        expect(response.status()).toBe(200);
        // Parse do JSON

        const responseBody = await response.json();
        
        // Validações do corpo da resposta
        expect(responseBody.responseCode).toBe(200);
       
    });

    //contém bug da API, pois o endpoint não valida a presença do parâmetro obrigatório search_product
    test('POST - API 6: POST To Search Product without search_product parameter', async ({ request }) => {
        const apiService = new ProductsApiService(request);
        
        const response = await apiService.searchProduct('');
        
        // Validações básicas de status HTTP
        expect(response.status()).toBe(200);
        // Parse do JSON
        const responseBody = await response.json();
        
        // Validações do corpo da resposta  
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe("search_product parameter is required");
     });


});