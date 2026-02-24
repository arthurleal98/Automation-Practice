import { test, expect } from '../../../src/fixtures/test.fixture';
import * as fs from 'fs';
import * as path from 'path';
import { JsonUtils } from '../../../utils/json.utils';
import { DataUtils } from '../../../src/utils/data.utils';
import { UserData } from '../../../src/types/api';

test.describe.serial('User Registration and Deletion', () => {
  test('User registration flow', async ({ homePage, loginPage, page }) => {

    // Gerar dados de usuário usando o utilitário; em seguida adaptamos o
    // formato para o formulário da UI.
    const random = DataUtils.generateUser();
    const userData: any = {
      nome: random.name,
      email: random.email,
      password: random.password,
      nascimento: {
        dia: random.birth_date,
        // remove leading zeros because select options are not zero-padded
        mes: String(Number(random.birth_month)),
        ano: random.birth_year,
      },
      endereco: {
        primeiroNome: random.firstname,
        ultimoNome: random.lastname,
        empresa: random.company,
        endereco1: random.address1,
        endereco2: random.address2,
        pais: random.country,
        estado: random.state,
        cidade: random.city,
        cep: random.zipcode,
        celular: random.mobile_number,
      },
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
    await loginPage.clickSignup();

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
    await loginPage.clickCreateAccount();

    // 14. Verificar que 'ACCOUNT CREATED!' é visível
    await loginPage.validarMensagemContaCriada();

    // 15. Clicar no botão 'Continue'
    await loginPage.clicarContinuar();

    // 16. Verificar que 'Logged in as username' é visível
    expect(await loginPage.isUserLoggedIn(userData.nome)).toBeTruthy();

    // Salvar dados gerados em JSON
    await JsonUtils.writeJson(userData, `user-data-${Date.now()}.json`);
    
  });

  test('User deletion flow', async ({ homePage, loginPage, page }) => {

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
    await loginPage.fillLoginDetails(userData.email, userData.password);

    // 7. Clicar no botão 'Login'
    await loginPage.clickLogin();

    // 8. Verificar que 'Logged in as username' é visível
    await loginPage.isUserLoggedIn(userData.nome);

    // 9. Clicar no botão 'Delete Account'  
    await loginPage.clickDeleteAccount();

    // 10. Verificar que 'ACCOUNT DELETED!' é visível
    await expect(page.locator(loginPage.accountDeletedHeader)).toBeVisible();

    // Exclusão do arquivo JSON após teste de exclusão
    const outputDir = path.join(__dirname, '../../../generated-data');
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    
  });
}); 