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
    await productPage.clicarViewProduct(1);

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
    await productPage.pesquisarProduto(nomeProduto);

    //7. Clicar em ver detalhes do produto pesquisado
    await productPage.clicarViewProduct(1);

  });
});