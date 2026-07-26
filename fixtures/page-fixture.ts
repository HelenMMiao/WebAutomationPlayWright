import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { CartPage } from '../pages/cart-page';
import { ReceiverPage } from '../pages/receiver-page';
import { ConfirmationPage } from '../pages/confirmation-page';
import { CompletePage } from '../pages/complete-page';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;
    receiverPage: ReceiverPage;
    confirmationPage: ConfirmationPage;
    completePage: CompletePage;
}

export { expect } from '@playwright/test';

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/');
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto('/inventory.html');
        await use(homePage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await cartPage.goto('/cart.html');
        await use(cartPage);
    },
    receiverPage: async ({ page }, use) => {
        const receiverPage = new ReceiverPage(page);
        await receiverPage.goto('/checkout-step-one.html');
        await use(receiverPage);
    },
    confirmationPage: async ({ page }, use) => {
        const confirmationPage = new ConfirmationPage(page);
        await confirmationPage.goto('/checkout-step-two.html');
        await use(confirmationPage);
    },
    completePage: async ({ page }, use) => {
        const completePage = new CompletePage(page);
        await completePage.goto('/checkout-complete.html');
        await use(completePage);
    },

})