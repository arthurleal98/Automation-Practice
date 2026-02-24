import { test, expect } from '@playwright/test';
import { UsersApiService } from '../../src/services/users.service';

test.describe('Testes de API - Usuários', () => {
  let apiService: UsersApiService;

  test.beforeEach(async ({ request }) => {
    apiService = new UsersApiService(request);
  });

  function generateUser() {
    const timestamp = Date.now();
    return {
      name: 'API User Test',
      email: `api_test_${timestamp}@example.com`,
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
  }

  test('POST - Criar conta de usuário', async () => {
    const user = generateUser();

    const response = await apiService.createAccount(user);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });

  test('POST - Verificar login com dados válidos', async () => {
    const user = generateUser();

    await apiService.createAccount(user);

    const response = await apiService.verifyLogin(user.email, user.password);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('POST - Verificar login com email inválido', async () => {
    const response = await apiService.verifyLogin('invalid@email.com', 'wrongpass');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('DELETE - Excluir conta de usuário', async () => {
    const user = generateUser();

    await apiService.createAccount(user);

    const response = await apiService.deleteAccount(user.email, user.password);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!');
  });

  test('GET - Buscar detalhes do usuário por email', async () => {
    const user = generateUser();

    await apiService.createAccount(user);

    const response = await apiService.getUserDetailByEmail(user.email);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(user.email);
  });
});