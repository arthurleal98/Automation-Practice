import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { BasePage } from '../pages/base-page.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';

type MyFixtures = {
  homePage: HomePage;
  basePage: BasePage;
  loginPage: LoginPage;
  productPage: ProductPage;
};

export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export { expect } from '@playwright/test';
