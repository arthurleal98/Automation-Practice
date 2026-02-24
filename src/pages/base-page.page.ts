
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
  async reloadPage(): Promise<void> {
    await this.recarregarPagina();
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
  async click(locator: Locator): Promise<void> {
    await this.clicar(locator);
  }

  async preencher(locator: Locator, texto: any): Promise<void> {
    await this.clicar(locator);
    await locator.clear();
    await locator.fill(texto);
    await this.page.waitForTimeout(300);
  }
  async fill(locator: Locator, text: string): Promise<void> {
    await this.preencher(locator, text);
  }

  async digitarCaracteres(locator: Locator, texto: string, delay: number = 50): Promise<void> {
    await this.clicar(locator);
    await locator.clear();
    await this.page.waitForTimeout(100);
    await locator.pressSequentially(texto, { delay });
    await this.page.waitForTimeout(300);
  }
  async typeCharacters(locator: Locator, text: string, delay: number = 50): Promise<void> {
    await this.digitarCaracteres(locator, text, delay);
  }

  async scrollAteElemento(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }
  async scrollToElement(locator: Locator): Promise<void> {
    await this.scrollAteElemento(locator);
  }

  async obterTextoDoLocator(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }
  async getText(locator: Locator): Promise<string> {
    return this.obterTextoDoLocator(locator);
  }

  async obterTextoInterno(locator: Locator): Promise<string> {
    return await locator.innerText();
  }
  async getInnerText(locator: Locator): Promise<string> {
    return this.obterTextoInterno(locator);
  }

  async selecionarOpcao(locator: Locator, valor: string): Promise<void> {
    await locator.selectOption(valor);
  }
  async selectOption(locator: Locator, value: string): Promise<void> {
    await this.selecionarOpcao(locator, value);
  }

  async marcar(locator: Locator): Promise<void> {
    await locator.check();
  }
  async check(locator: Locator): Promise<void> {
    await this.marcar(locator);
  }

  async esperarEstarVisivel(locator: Locator, timeout: number = 200000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }
  async waitForVisible(locator: Locator, timeout: number = 200000): Promise<void> {
    await this.esperarEstarVisivel(locator, timeout);
  }

  async textoEstaVisivel(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
  async isVisible(locator: Locator): Promise<boolean> {
    return this.textoEstaVisivel(locator);
  }}