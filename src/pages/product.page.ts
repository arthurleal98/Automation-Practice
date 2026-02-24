import { BasePage } from "./base-page.page";

export class ProductPage extends BasePage {
    // locators
    readonly productsHeader: string = 'h2:has-text("All Products")';
    readonly searchInput: string = '#search_product';
    readonly itemsList: string = '//*[@class="product-image-wrapper"]';
    readonly productName: string = '//*[@class="product-information"]//h2';
    readonly productCategory: string = 'p:has-text("Category:")';
    readonly productPrice: string = '//*[@class="product-information"]//span[contains(text(), "Rs.")]';
    readonly productAvailability: string = 'b:has-text("Availability:")';
    readonly productCondition: string = 'b:has-text("Condition:")';
    readonly productBrand: string = 'b:has-text("Brand:")';
    readonly searchInputField: string = '#search_product';
    readonly submitSearchButton: string = '#submit_search';

    constructor(page: any) {
        super(page);
    }

    /**
     * Busca um produto pelo nome usando a caixa de busca da página.
     */
    async searchForProduct(productName: string): Promise<void> {
        await this.preencher(this.page.locator(this.searchInputField), productName);
        await this.clicar(this.page.locator(this.submitSearchButton));
    }

    // alias em português para compatibilidade
    async pesquisarProduto(nomeProduto: string): Promise<void> {
        await this.searchForProduct(nomeProduto);
    }
    
    async getProductName(): Promise<string> {
        return await this.page.locator(this.productName).innerText();
    }

    async obterNomeProduto(): Promise<string> {
        return this.getProductName();
    }

    async getProductCategory(): Promise<string> {
        return await this.page.locator(this.productCategory).innerText();
    }

    async obterCategoriaProduto(): Promise<string> {
        return this.getProductCategory();
    }

    async getProductPrice(): Promise<string> {
        return await this.page.locator(this.productPrice).innerText();
    }

    async obterPrecoProduto(): Promise<string> {
        return this.getProductPrice();
    }

    async getProductAvailability(): Promise<string> {
        return await this.page.locator(this.productAvailability).innerText();
    }

    async obterDisponibilidadeProduto(): Promise<string> {
        return this.getProductAvailability();
    }

    async getProductCondition(): Promise<string> {
        return await this.page.locator(this.productCondition).innerText();
    }

    async obterCondicaoProduto(): Promise<string> {
        return this.getProductCondition();
    }

    async getProductBrand(): Promise<string> {
        return await this.page.locator(this.productBrand).innerText();
    }

    async obterMarcaProduto(): Promise<string> {
        return this.getProductBrand();
    }

    async hasProducts(): Promise<boolean> {
        try {
          return (await this.page.locator(this.itemsList).count()) > 0;
        } catch {
          return false;
        }
    }

    async existemProdutos(): Promise<boolean> {
        return this.hasProducts();
    }

    async clickViewProduct(index: number): Promise<void> {
        const viewProductButton = `(${this.itemsList})[${index}]//a[text()="View Product"]`;
        await this.clicar(this.page.locator(viewProductButton));
    }

    async clicarViewProduct(index: number): Promise<void> {
        await this.clickViewProduct(index);
    }
}
