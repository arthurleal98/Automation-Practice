import { BasePage } from "./base-page.page";

export class ProductPage extends BasePage {
    readonly productsHeader: string = 'h2:has-text("All Products")';
    readonly searchInput: string = '#search_product';
    readonly itemsList: string = '//*[@class="product-image-wrapper"]';
    readonly productName: string = '//*[@class="product-information"]//h2';
    readonly productCategory: string = 'p:has-text("Category:")'
    readonly productPrice: string = '//*[@class="product-information"]//span[contains(text(), "Rs.")]';
    readonly productAvailability: string = 'b:has-text("Availability:")'
    readonly productCondition: string = 'b:has-text("Condition:")';
    readonly productBrand: string = 'b:has-text("Brand:")';
    readonly searchInputField: string = '#search_product';
    readonly submitSearchButton: string = '#submit_search';

    constructor(page: any) {
        super(page);
    }

    async pesquisarProduto(nomeProduto: string): Promise<void> {
        await this.preencher(this.page.locator(this.searchInputField), nomeProduto);
        await this.clicar(this.page.locator(this.submitSearchButton));
    }
    
    async obterNomeProduto(): Promise<string> {
        return await this.page.locator(this.productName).innerText();
    }

    async obterCategoriaProduto(): Promise<string> {
        return await this.page.locator(this.productCategory).innerText();
    }

    async obterPrecoProduto(): Promise<string> {
        return await this.page.locator(this.productPrice).innerText();
    }
    async obterDisponibilidadeProduto(): Promise<string> {
        return await this.page.locator(this.productAvailability).innerText();
    }
    async obterCondicaoProduto(): Promise<string> {
        return await this.page.locator(this.productCondition).innerText();
    }

    async obterMarcaProduto(): Promise<string> {
        return await this.page.locator(this.productBrand).innerText();
    }


    async existemProdutos(): Promise<boolean> {
        try {
          if (await this.page.locator(this.itemsList).count() > 0) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      }
    
    async clicarViewProduct(index: number): Promise<void> {
        const viewProductButton = `(${this.itemsList})[${index}]//a[text()="View Product"]`;
        await this.clicar(this.page.locator(viewProductButton));
    }


    async estaNaPaginaProdutos(): Promise<boolean> {
        try {
            await this.page.locator(this.productsHeader);
            return true;
        } catch (error) {
            return false;
        }
    }

    async estouNaPaginaProdutos(): Promise<boolean> {
        try {
            await this.page.locator(this.productsHeader);
            return true;
        } catch (error) {
            return false;
        }
    }

    
} 