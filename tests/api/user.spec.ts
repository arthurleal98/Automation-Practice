import { test, expect } from '@playwright/test';
import { UsersApiService } from '../../src/services/users.service';
import { UserData, ApiResponse } from '../../src/types/api';
import { DataUtils } from '../../src/utils/data.utils';

test.describe('Testes de API - Usuários', () => {
  let apiService: UsersApiService;

  test.beforeEach(async ({ request }) => {
    apiService = new UsersApiService(request);
  });

  // helper to generate realistic user data with possibilidade de overrides
  function generateUser(overrides?: Partial<UserData>): UserData {
    return DataUtils.generateUser(overrides);
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
    const user: UserData = generateUser();

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
    const user: UserData = generateUser();

    await apiService.createAccount(user);

    const response = await apiService.deleteAccount(user.email, user.password);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!');
  });

  test('GET - Buscar detalhes do usuário por email', async () => {
    const user: UserData = generateUser();

    await apiService.createAccount(user);

    const response = await apiService.getUserDetailByEmail(user.email);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(user.email);
  });
});