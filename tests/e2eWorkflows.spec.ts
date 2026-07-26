import { test, expect } from '@playwright/test';
import { LoginPage, HomePage, CartPage, ReceiverPage, ConfirmationPage, CompletePage } from '../pages';

test.describe('work flow', async () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test("happy path, 1 product", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/')
        const homePage: HomePage = await loginPage.login("standard_user", "secret_sauce");
        const products = await homePage.getProductCards();
        await products[0].addRemoveCartButton.click();
        await expect(homePage.cartLogo).toHaveText("1");
        const cartPage: CartPage = await homePage.cartLogoClick();
        expect(await cartPage.getProductList()).toHaveLength(1);
        const receiverPage: ReceiverPage = await cartPage.bottomButtons.nextButtonNavigate(ReceiverPage);
        await receiverPage.inputReceiverInfo("Test", "QA", "0000");
        const confirmationPage: ConfirmationPage = await receiverPage.bottomButtons.nextButtonNavigate(ConfirmationPage);
        expect(await confirmationPage.getProductList()).toHaveLength(1);
        const completePage: CompletePage = await confirmationPage.bottomButtons.nextButtonNavigate(CompletePage);
        const homePage2: HomePage = await completePage.backHomeNavigate();
        expect(homePage2.pageTitle).toHaveText("Products");
    })

    test("happy path, 0 product", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/')
        const homePage: HomePage = await loginPage.login("standard_user", "secret_sauce");
        const products = await homePage.getProductCards();
        const cartPage: CartPage = await homePage.cartLogoClick();
        expect(await cartPage.getProductList()).toHaveLength(0);
        const receiverPage: ReceiverPage = await cartPage.bottomButtons.nextButtonNavigate(ReceiverPage);
        await receiverPage.inputReceiverInfo("Test", "QA", "0000");
        const confirmationPage: ConfirmationPage = await receiverPage.bottomButtons.nextButtonNavigate(ConfirmationPage);
        expect(await confirmationPage.getProductList()).toHaveLength(0);
        const completePage: CompletePage = await confirmationPage.bottomButtons.nextButtonNavigate(CompletePage);
        const homePage2: HomePage = await completePage.backHomeNavigate();
        expect(homePage2.pageTitle).toHaveText("Products");
    })

    test("happy path, 2 product", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/')
        const homePage: HomePage = await loginPage.login("standard_user", "secret_sauce");
        const products = await homePage.getProductCards();
        await products[0].addRemoveCartButton.click();
        await products[1].addRemoveCartButton.click();
        await expect(homePage.cartLogo).toHaveText("2");
        const cartPage: CartPage = await homePage.cartLogoClick();
        expect(await cartPage.getProductList()).toHaveLength(2);
        const receiverPage: ReceiverPage = await cartPage.bottomButtons.nextButtonNavigate(ReceiverPage);
        await receiverPage.inputReceiverInfo("Test", "QA", "0000");
        const confirmationPage: ConfirmationPage = await receiverPage.bottomButtons.nextButtonNavigate(ConfirmationPage);
        expect(await confirmationPage.getProductList()).toHaveLength(2);
        const completePage: CompletePage = await confirmationPage.bottomButtons.nextButtonNavigate(CompletePage);
        const homePage2: HomePage = await completePage.backHomeNavigate();
        expect(homePage2.pageTitle).toHaveText("Products");
    })

    test("Backward paths", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/')
        let homePage: HomePage = await loginPage.login("standard_user", "secret_sauce");
        const products = await homePage.getProductCards();
        await products[0].addRemoveCartButton.click();
        await products[1].addRemoveCartButton.click();
        await expect(homePage.cartLogo).toHaveText("2");
        await products[0].addRemoveCartButton.click();
        await expect(homePage.cartLogo).toHaveText("1");
        let cartPage: CartPage = await homePage.cartLogoClick();
        expect(await cartPage.getProductList()).toHaveLength(1);
        homePage = await cartPage.bottomButtons.backButtonNavigate(HomePage);
        await expect(homePage.getPageTitle).toHaveText("Products");
        cartPage = await homePage.cartLogoClick();
        await expect(cartPage.getPageTitle).toHaveText("Your Cart");
        let receiverPage: ReceiverPage = await cartPage.bottomButtons.nextButtonNavigate(ReceiverPage);
        await expect(cartPage.getPageTitle).toHaveText("Checkout: Your Information");
        cartPage = await receiverPage.bottomButtons.backButtonNavigate(CartPage);
        receiverPage = await cartPage.bottomButtons.nextButtonNavigate(ReceiverPage);
        await receiverPage.inputReceiverInfo("Test", "QA", "0000");
        let confirmationPage: ConfirmationPage = await receiverPage.bottomButtons.nextButtonNavigate(ConfirmationPage);
        homePage = await confirmationPage.bottomButtons.backButtonNavigate(HomePage);
        await expect(homePage.getPageTitle).toHaveText("Products");
    })

})
