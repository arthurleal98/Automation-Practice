import { test, expect } from '../../../src/fixtures/test.fixture';
import { JsonUtils } from '../../../utils/json.utils';
import{ HomePage } from '../../../src/pages/home.page';
import { ProductPage } from '../../../src/pages/product.page';

test.describe('Product Details', () => {
  test('Verify all details on product detail page', async ({ homePage, productPage, page }) => {
    // 1. Launch browser and 2. Navigate to url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator(homePage.homeButton)).toBeVisible();

    // 4. Click on 'Products' button
    await homePage.acessarPaginaProdutos();

    // 5. Verificar que a página de produtos é exibida com sucesso
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await expect(page.locator(productPage.productsHeader)).toBeVisible();

    // 6. Clicar em ver detalhes do primeiro produto
    await productPage.clickViewProduct(1);

    //7. Verificar que está na página de detalhes do produto
    await expect(page).toHaveTitle(/Automation Exercise - Product Details/);



  });

  test('Pesquisar produto e verificar detalhes', async ({ homePage, productPage, page }) => {
    // 1. Launch browser and 2. Navigate to url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verificar que home page é visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator(homePage.homeButton)).toBeVisible();

    // 4. Clicar no botão 'Products'
    await homePage.acessarPaginaProdutos();

    // 5. Verificar que a página de produtos é exibida com sucesso
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await expect(page.locator(productPage.productsHeader)).toBeVisible();

    // 6. Pesquisar por um produto específico usando a barra de pesquisa
    const nomeProduto = 'Blue Top';
    await productPage.searchForProduct(nomeProduto);

    //7. Clicar em ver detalhes do produto pesquisado
    await productPage.clickViewProduct(1);

  });
});

test('Verificar detalhes do produto pesquisado', async ({ homePage, productPage, page }) => {
    // 1. Abrir o navegador e 2. Navegar para a url 'http://automationexercise.com'
    await homePage.acessarPaginaInicial();

    // 3. Verificar que a página inicial é visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);

    // 4. Clicar no botão 'Products'
    await homePage.acessarPaginaProdutos();

    // 5. Verificar que a página de todos os produtos é exibida com sucesso
    await expect(page.locator(productPage.productsHeader)).toBeVisible();

    // 6. Inserir o nome do produto na barra de pesquisa e clicar no botão de pesquisa
    const nomeProduto = 'Blue Top';
    await productPage.searchForProduct(nomeProduto);

    // 7. Verificar que 'SEARCHED PRODUCTS' é visível
    await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();

    // 8. Verificar que o produto pesquisado é visível
    await expect(page.locator(productPage.itemsList)).toContainText(nomeProduto);

    // 9. Clicar em 'View Product' do primeiro resultado
    await productPage.clickViewProduct(1);

    // 10. Verificar detalhes: nome, categoria, preço, disponibilidade, condição e marca
    expect(await productPage.getProductName()).toContain(nomeProduto);
    expect(await productPage.getProductCategory()).toBeDefined();
    expect(await productPage.getProductPrice()).toBeDefined();
    expect(await productPage.getProductAvailability()).toBeDefined();
    expect(await productPage.getProductCondition()).toBeDefined();
    expect(await productPage.getProductBrand()).toBeDefined();
  });
