import { BasePage } from "./base-page.page";

export class HomePage extends BasePage {
    readonly singupLoginButton: string = 'a[href="/login"]';
    readonly productsButton: string = 'a[href="/products"]';
    readonly cartButton: string = 'a[href="/view_cart"]';
    readonly contactUsButton: string = 'a[href="/contact_us"]';
    readonly homeButton: string = 'a[href="/"]:has-text("Home")';



    constructor(page: any) {
        super(page);
    };

    async estaNaPaginaInicial(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.singupLoginButton);
            return true;
        } catch (error) {            return false;        }
       
    }

    async acessarPaginaInicial(): Promise<void> {
        await this.navigate(this.baseUrl);
    }

    async acessarPaginaLogin(): Promise<void> {
        await this.clicar(this.page.locator(this.singupLoginButton));
    }

    async acessarPaginaProdutos(): Promise<void> {
        await this.clicar(this.page.locator(this.productsButton));
    }

    async acessarPaginaCarrinho(): Promise<void> {
        await this.clicar(this.page.locator(this.cartButton));
    }

    async acessarPaginaContato(): Promise<void> {
        await this.clicar(this.page.locator(this.contactUsButton)); 
    }

    async acessarPaginaHome(): Promise<void> {
        await this.clicar(this.page.locator(this.homeButton));
    }

    }