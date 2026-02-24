import { test, expect } from '../../../src/fixtures/test.fixture';
import { JsonUtils } from '../../../utils/json.utils';

test.describe('Login de usuário', () => {
  test('Login com credenciais corretas', async ({ homePage, loginPage, page }) => {
    // Recuperar dados do último registro para garantir que o usuário existe
    const userData = JsonUtils.getLatestJson('user-data-');

    if (!userData) {
      throw new Error('Nenhum dado de usuário encontrado para realizar o login. Execute o teste de registro primeiro.');
    }

    // 1. Abrir o navegador e 2. Navegar para a url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verificar que a página inicial é visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator(homePage.homeButton)).toBeVisible();

    // 4. Clicar no botão 'Signup / Login'
    await homePage.acessarPaginaLogin();

    // 5. Verificar que 'Login to your account' é visível
    await expect(page.locator(loginPage.loginButton)).toBeVisible();

    // 6. Preencher email e senha corretos
    await loginPage.preencherDadosLogin('sucess@sucess.com', 'sucess123');

    // 7. Clicar no botão 'Login'
    await loginPage.clicarLogin();

    // 8. Verificar que 'Logged in as username' é visível
    expect(await loginPage.validarUsuarioLogado('sucess')).toBeTruthy();
  });

  test('Login com credenciais incorretas', async ({ homePage, loginPage, page }) => {
    // 1. Navegar para a url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 2. Clicar no botão 'Signup / Login'
    await homePage.acessarPaginaLogin();

    // 3. Preencher email e senha incorretos
    await loginPage.preencherDadosLogin('email_invalido@teste.com', 'senha_errada');

    //4. Clicar no botão 'Login'
    await loginPage.clicarLogin();

    //5. Verificar que 'Your email or password is incorrect!' é visível
    await expect(page.locator(loginPage.invalidCredentialsMessage)).toBeVisible();
  });

  test('Logout de usuário', async ({ homePage, loginPage, page }) => {
    // 1. Abrir o navegador e 2. Navegar para a url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verificar que a página inicial é visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator(homePage.homeButton)).toBeVisible();

    // 4. Clicar no botão 'Signup / Login'
    await homePage.acessarPaginaLogin();

    // 5. Verificar que 'Login to your account' é visível
    await expect(page.locator(loginPage.loginButton)).toBeVisible();
    // 6. Preencher email e senha corretos
    await loginPage.preencherDadosLogin('sucess@sucess.com', 'sucess123');

    // 7. Clicar no botão 'Login'
    await loginPage.clicarLogin();

    // 8. Verificar que 'Logged in as username' é visível
    expect(await loginPage.validarUsuarioLogado('sucess')).toBeTruthy();

    // 9. Clicar no botão 'Logout'
    await loginPage.clicarLogout();

    // 10. Verificar que 'Home' é visível
    await expect(page.url()).toBe('https://automationexercise.com/login');
  });

});