import { BasePage } from "./base-page.page";

export class HomePage extends BasePage {
    readonly signupLoginButton: string = 'a[href="/login"]';
    readonly productsButton: string = 'a[href="/products"]';
    readonly cartButton: string = 'a[href="/view_cart"]';
    readonly contactUsButton: string = 'a[href="/contact_us"]';
    readonly homeButton: string = 'a[href="/"]:has-text("Home")';



    constructor(page: any) {
        super(page);
    };

    async estaNaPaginaInicial(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.signupLoginButton);
            return true;
        } catch (error) {            return false;        }
       
    }
    async isOnHomePage(): Promise<boolean> {
        return this.estaNaPaginaInicial();
    }

    async acessarPaginaInicial(): Promise<void> {
        await this.navigate(this.baseUrl);
    }
    async visitHomePage(): Promise<void> {
        await this.acessarPaginaInicial();
    }

    async acessarPaginaLogin(): Promise<void> {
        await this.clicar(this.page.locator(this.signupLoginButton));
    }
    async goToLoginPage(): Promise<void> {
        await this.acessarPaginaLogin();
    }

    async acessarPaginaProdutos(): Promise<void> {
        await this.clicar(this.page.locator(this.productsButton));
    }
    async goToProductsPage(): Promise<void> {
        await this.acessarPaginaProdutos();
    }

    async acessarPaginaCarrinho(): Promise<void> {
        await this.clicar(this.page.locator(this.cartButton));
    }
    async goToCartPage(): Promise<void> {
        await this.acessarPaginaCarrinho();
    }

    async acessarPaginaContato(): Promise<void> {
        await this.clicar(this.page.locator(this.contactUsButton)); 
    }
    async goToContactPage(): Promise<void> {
        await this.acessarPaginaContato();
    }

    async acessarPaginaHome(): Promise<void> {
        await this.clicar(this.page.locator(this.homeButton));
    }
    async goToHome(): Promise<void> {
        await this.acessarPaginaHome();
    }

    }