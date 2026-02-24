
import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://automationexercise.com/';
    
  }

  async recarregarPagina(): Promise<void> {
    await this.page.reload();
  }


  async navigate(path: string): Promise<void> {
    await this.page.goto(`${path}`);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async clicar(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 60000 });
    await locator.click({ timeout: 30000 });
    await this.page.waitForTimeout(200);
  }

  async preencher(locator: Locator, texto: any): Promise<void> {
    await this.clicar(locator);
    await locator.clear();
    await locator.fill(texto);
    await this.page.waitForTimeout(300);
  }

  async digitarCaracteres(locator: Locator, texto: string, delay: number = 50): Promise<void> {
    await this.clicar(locator);
    await locator.clear();
    await this.page.waitForTimeout(100);
    await locator.pressSequentially(texto, { delay });
    await this.page.waitForTimeout(300);
  }

  async scrollAteElemento(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async obterTextoDoLocator(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async obterTextoInterno(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async selecionarOpcao(locator: Locator, valor: string): Promise<void> {
    await locator.selectOption(valor);
  }

  async marcar(locator: Locator): Promise<void> {
    await locator.check();
  }

  async esperarEstarVisivel(locator: Locator, timeout: number = 200000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  async textoEstaVisivel(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}