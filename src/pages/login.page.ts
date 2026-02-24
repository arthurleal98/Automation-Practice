import { BasePage } from "./base-page.page";

export class LoginPage extends BasePage {
    // Signup Locators
    readonly signupNameInput: string = 'input[data-qa="signup-name"]';
    readonly signupEmailInput: string = 'input[data-qa="signup-email"]';
    readonly signupButton: string = 'button[data-qa="signup-button"]';
    readonly signupHeader: string = '.signup-form h2';

    // Login Locators
    readonly loginEmailInput: string = 'input[data-qa="login-email"]';
    readonly loginPasswordInput: string = 'input[data-qa="login-password"]';
    readonly loginButton: string = 'button[data-qa="login-button"]';

    // Account Information Locators
    readonly accountInfoTitle: string = 'b:has-text("Enter Account Information")';
    readonly genderMaleRadio: string = '#id_gender1';
    readonly passwordInput: string = 'input[data-qa="password"]';
    readonly daysSelect: string = 'select[data-qa="days"]';
    readonly monthsSelect: string = 'select[data-qa="months"]';
    readonly yearsSelect: string = 'select[data-qa="years"]';
    readonly newsletterCheckbox: string = '#newsletter';
    readonly optinCheckbox: string = '#optin';
    readonly firstNameInput: string = 'input[data-qa="first_name"]';
    readonly lastNameInput: string = 'input[data-qa="last_name"]';
    readonly companyInput: string = 'input[data-qa="company"]';
    readonly address1Input: string = 'input[data-qa="address"]';
    readonly address2Input: string = 'input[data-qa="address2"]'
    readonly countrySelect: string = 'select[data-qa="country"]';
    readonly stateInput: string = 'input[data-qa="state"]'
    readonly cityInput: string = 'input[data-qa="city"]'
    
    readonly zipcodeInput: string = 'input[data-qa="zipcode"]';
    readonly mobileNumberInput: string = 'input[data-qa="mobile_number"]';
    readonly createAccountButton: string = 'button[data-qa="create-account"]';
    readonly signInButton: string = 'button[data-qa="login-button"]';
    readonly accountCreatedHeader: string = 'b:has-text("Account Created!")';
    readonly continueButton: string = 'a[data-qa="continue-button"]';
    readonly deleteAccountButton: string = 'a[href="/delete_account"]';
    readonly accountDeletedHeader: string = 'b:has-text("Account Deleted!")';
    readonly invalidCredentialsMessage: string = 'p:has-text("Your email or password is incorrect!")';
    readonly logoutButton: string = 'a[href="/logout"]';



    constructor(page: any) {
        super(page);
    }

    async clicarLogout(): Promise<void> {
        await this.clicar(this.page.locator(this.logoutButton));
    }

    // English aliases for the most frequently used actions
    async clickLogout(): Promise<void> {
        await this.clicarLogout();
    }



    async preencherDadosIniciaisSignup(nome: string, email: string): Promise<void> {
        await this.preencher(this.page.locator(this.signupNameInput), nome);
        await this.preencher(this.page.locator(this.signupEmailInput), email);
    }

    async clicarSignup(): Promise<void> {
        await this.clicar(this.page.locator(this.signupButton));
    }

    async clickSignup(): Promise<void> {
        await this.clicarSignup();
    }

    async preencherInformacoesConta(password: string, day: string, month: string, year: string): Promise<void> {
        await this.marcar(this.page.locator(this.genderMaleRadio));
        await this.preencher(this.page.locator(this.passwordInput), password);
        await this.selecionarOpcao(this.page.locator(this.daysSelect), day);
        await this.selecionarOpcao(this.page.locator(this.monthsSelect), month);
        await this.selecionarOpcao(this.page.locator(this.yearsSelect), year);
    }

    async selecionarCheckboxes(): Promise<void> {
        await this.marcar(this.page.locator(this.newsletterCheckbox));
        await this.marcar(this.page.locator(this.optinCheckbox));
    }

    async preencherDetalhesEndereco(
        firstName: string, 
        lastName: string, 
        company: string, 
        address1: string, 
        address2: string, 
        country: string, 
        state: string, 
        city: string, 
        zipcode: string, 
        mobileNumber: string
    ): Promise<void> {
        await this.preencher(this.page.locator(this.firstNameInput), firstName);
        await this.preencher(this.page.locator(this.lastNameInput), lastName);
        await this.preencher(this.page.locator(this.companyInput), company);
        await this.preencher(this.page.locator(this.address1Input), address1);
        await this.preencher(this.page.locator(this.address2Input), address2);
        await this.selecionarOpcao(this.page.locator(this.countrySelect), country);
        await this.preencher(this.page.locator(this.stateInput), state);
        await this.preencher(this.page.locator(this.cityInput), city);
        await this.preencher(this.page.locator(this.zipcodeInput), zipcode);
        await this.preencher(this.page.locator(this.mobileNumberInput), mobileNumber);
    }

    async clicarCriarConta(): Promise<void> {
        await this.clicar(this.page.locator(this.createAccountButton));
    }

    async clickCreateAccount(): Promise<void> {
        await this.clicarCriarConta();
    }

    async preencherDadosLogin(email: string, password: string): Promise<void> {
        await this.preencher(this.page.locator(this.loginEmailInput), email);
        await this.preencher(this.page.locator(this.loginPasswordInput), password);
    }

    async fillLoginDetails(email: string, password: string): Promise<void> {
        await this.preencherDadosLogin(email, password);
    }

    async clicarLogin(): Promise<void> {
        await this.clicar(this.page.locator(this.loginButton));
    }

    async clickLogin(): Promise<void> {
        await this.clicarLogin();
    }

    async validarMensagemContaCriada(): Promise<void> {
        await this.esperarEstarVisivel(this.page.locator(this.accountCreatedHeader));
    }

    async clicarContinuar(): Promise<void> {
        await this.clicar(this.page.locator(this.continueButton));
    }

    async validarUsuarioLogado(nome: string): Promise<boolean> {
        try {
        const loggedInLocator = `//li//a//b[text()="${nome}"]`;
        await this.esperarEstarVisivel(this.page.locator(loggedInLocator));
        return true;
    } catch (error) {
        return false;
    }
    }

    async isUserLoggedIn(name: string): Promise<boolean> {
        return this.validarUsuarioLogado(name);
    }

    async clicarDeletarConta(): Promise<void> {
        await this.clicar(this.page.locator(this.deleteAccountButton));
    }

    async clickDeleteAccount(): Promise<void> {
        await this.clicarDeletarConta();
    }

    async validarMensagemContaDeletada(): Promise<void> {
        await this.esperarEstarVisivel(this.page.locator(this.accountDeletedHeader));
    }

    async expectAccountDeletedMessage(): Promise<void> {
        await this.validarMensagemContaDeletada();
    }
}