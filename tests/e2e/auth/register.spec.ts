import { test, expect } from '../../../src/fixtures/test.fixture';
import * as fs from 'fs';
import * as path from 'path';
import { JsonUtils } from '../../../utils/json.utils';

test.describe('Registro de usuário e exclusão', () => {
  test('Registro de usuário', async ({ homePage, loginPage, page }) => {

    // Massa de dados organizada
    const userData = {
      nome: 'Teste',
      email: `teste${Date.now()}@exemplo.com`,
      password: 'senha123',
      nascimento: { dia: '10', mes: '5', ano: '1990' },
      endereco: {
        primeiroNome: 'Arthur', ultimoNome: 'Teste',
        empresa: 'QA Automation', endereco1: 'Rua de Teste, 123',
        endereco2: 'Apto 101', pais: 'United States',
        estado: 'California', cidade: 'Los Angeles',
        cep: '90001', celular: '1234567890'
      }
    };
    
    // 1. Abrir o navegador e 2. Navegar para a url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verificar que a página inicial é visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator(homePage.homeButton)).toBeVisible();

    // 4. Clicar no botão 'Signup / Login'
    await homePage.acessarPaginaLogin();

    // 5. Verificar que 'New User Signup!' é visível
    await expect(page.locator(loginPage.signupHeader)).toBeVisible();

    // 6. Preencher nome e email para registro
    await loginPage.preencherDadosIniciaisSignup(userData.nome, userData.email);

    // 7. Clicar no botão 'Signup'
    await loginPage.clicarSignup();

    // 8. Verificar que 'ENTER ACCOUNT INFORMATION' é visível
    await expect(page.locator(loginPage.accountInfoTitle)).toBeVisible();

    // 9. Preencher detalhes de conta: Título, senha, data de nascimento
    await loginPage.preencherInformacoesConta(
      userData.password, 
      userData.nascimento.dia, 
      userData.nascimento.mes, 
      userData.nascimento.ano
    );

    // 10. Selecionar as opções de newsletter e ofertas especiais
    await loginPage.selecionarCheckboxes();
    
    // 12. Preencher detalhes de endereço
    await loginPage.preencherDetalhesEndereco(
        userData.endereco.primeiroNome, userData.endereco.ultimoNome,
        userData.endereco.empresa, userData.endereco.endereco1,
        userData.endereco.endereco2, userData.endereco.pais,
        userData.endereco.estado, userData.endereco.cidade,
        userData.endereco.cep, userData.endereco.celular
    );

    // 13. Clicar no botão 'Create Account'
    await loginPage.clicarCriarConta();

    // 14. Verificar que 'ACCOUNT CREATED!' é visível
    await loginPage.validarMensagemContaCriada();

    // 15. Clicar no botão 'Continue'
    await loginPage.clicarContinuar();

    // 16. Verificar que 'Logged in as username' é visível
    expect(await loginPage.validarUsuarioLogado(userData.nome)).toBeTruthy();

    // Salvar dados gerados em JSON
    await JsonUtils.writeJson(userData, `user-data-${Date.now()}.json`);
    
  });

  test('Exclusão de usuário', async ({ homePage, loginPage, page }) => {

      // Recuperar dados do último registro
    const userData = JsonUtils.getLatestJson('user-data-');

    // 1. Abrir o navegador e 2. Navegar para a url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verificar que a página inicial é visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator(homePage.homeButton)).toBeVisible();
    
    // 4. Clicar no botão 'Signup / Login'
    await homePage.acessarPaginaLogin();

    // 5. Verificar que 'Login to your account' é visível
    await expect(page.locator(loginPage.loginButton)).toBeVisible();

    // 6. Preencher email e senha para login  
    await loginPage.preencherDadosLogin(userData.email, userData.password);

    // 7. Clicar no botão 'Login'
    await loginPage.clicarLogin();

    // 8. Verificar que 'Logged in as username' é visível
    await loginPage.validarUsuarioLogado(userData.nome);

    // 9. Clicar no botão 'Delete Account'  
    await loginPage.clicarDeletarConta();

    // 10. Verificar que 'ACCOUNT DELETED!' é visível
    await expect(page.locator(loginPage.accountDeletedHeader)).toBeVisible();

    // Exclusão do arquivo JSON após teste de exclusão
    const outputDir = path.join(__dirname, '../../../generated-data');
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    
  });
}); 