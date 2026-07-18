import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ReceiverPage } from '../pages/ReciverPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { CompletePage } from '../pages/CompletePage';

test.describe('Page UI test, fresh session', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    // Test to check if all elements on the login page are displayed correctly
    test('Check Login page display all elements', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/');
        await expect.soft(loginPage.usernameInput).toBeVisible()
        await expect.soft(loginPage.passwordInput).toBeVisible()
        await expect.soft(loginPage.loginButton).toBeVisible()
        await expect.soft(loginPage.loginPageLogo).toHaveText("Swag Labs")
    });


})

test.describe('Page UI test, logged in session', () => {
    // Test to check if all elements on the home page are displayed correctly
    test('Check Home page display all elements', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto("/inventory.html");
        const productCards = await homePage.getProductCards();

        // Check if all product cards are displayed correctly, with price format and add/remove cart button 
        expect(productCards.length).toBeGreaterThan(0);
        for (const product of productCards) {
            expect(product.image).toBeVisible();
            expect(product.name).toBeVisible();
            expect(product.description).toBeVisible();
            product.verifyPriceFormat(); // Check if price is in the format $xx.xx
            expect(product.addRemoveCartButton).toHaveText("Add to cart");
        }
        // Check if header and footer elements are displayed correctly
        await homePage.checkHeaderFooterDisplay();
        // Check if the products title, menu options, and filter options are displayed correctly
        await expect.soft(homePage.getPageTitle).toHaveText("Products");
        expect.soft(await homePage.openMenuOptions()).toEqual(["All Items", "About", "Logout", "Reset App State"]);
        expect.soft(await homePage.productsSortOptions()).toEqual(["Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)"]);


    });

    //Test to check purchase UI pages with products added into Cart
    test.describe('Products are added into Cart', () => {

        //Check Cart page UI displays with added products
        test.beforeEach(async ({ context }) => {
            // Add Internal Ids for Backpack [4] and Bike Light [0]
            await context.addInitScript(() => {
                window.localStorage.setItem('cart-contents', JSON.stringify([4, 0]))
            })
        });

        test('Check Cart page display all elements', async ({ page }) => {
            const cartPage = new CartPage(page);
            await cartPage.goto("/cart.html");
            const addedProductList = await cartPage.getCartListItems();

            // Check if all product list displayed correctly, with price format and add/remove cart button 
            expect(addedProductList.length).toBeGreaterThan(0);
            for (const product of addedProductList) {
                expect(await product.getItemQty()).toBeGreaterThan(0);
                expect(product.name).toBeVisible();
                expect(product.description).toBeVisible();
                product.verifyPriceFormat();
                expect(product.removeButton).toBeVisible();
            }
            // Check if header and footer elements are displayed correctly
            await cartPage.checkHeaderFooterDisplay();
            // Check if the title and buttons are displayed correctly
            await expect.soft(cartPage.getPageTitle).toHaveText("Your Cart");
            await cartPage.bottomButtons.checkBackButton("Continue Shopping");
            await cartPage.bottomButtons.checkNextButton("Checkout");
        });

        test('Check Receiver Info page display all elements', async ({ page }) => {
            const receiverPage = new ReceiverPage(page);
            receiverPage.goto('checkout-step-one.html');
            // Check if header and footer elements are displayed correctly
            await receiverPage.checkHeaderFooterDisplay();
            // Check if the title is displayed correctly
            await expect.soft(receiverPage.getPageTitle).toHaveText("Checkout: Your Information");

            // Check if main page elements are displayed correctly
            expect(receiverPage.firstName).toBeVisible();
            expect(receiverPage.lastName).toBeVisible();
            expect(receiverPage.zipCode).toBeVisible();

            //Check if bottom buttons are displayed correctly
            await receiverPage.bottomButtons.checkBackButton("Cancel");
            await receiverPage.bottomButtons.checkNextButton("Continue");
        })

        test('Check Confirmation Page display all elements', async ({ page }) => {
            const confirmationPage = new ConfirmationPage(page);
            await confirmationPage.goto('/checkout-step-two.html');


            // Check if header, footer, title are displayed correctly
            await confirmationPage.checkHeaderFooterDisplay();
            await expect.soft(confirmationPage.getPageTitle).toHaveText("Checkout: Overview")

            // Check if all product list displayed correctly, with price format
            const addedProductList = await confirmationPage.getProductList();
            expect(addedProductList.length).toBeGreaterThan(0);
            for (const product of addedProductList) {
                expect(await product.getItemQty()).toBeGreaterThan(0);
                expect(product.name).toBeVisible();
                expect(product.description).toBeVisible();
                product.verifyPriceFormat();
            }

            // Check if all summary info displayed
            await expect(confirmationPage.summaryPaymentLabel).toHaveText("Payment Information:");
            await expect(confirmationPage.summaryContractNumber).toHaveText("SauceCard #31337");
            await expect(confirmationPage.summaryDeliveryLabel).toHaveText("Shipping Information:");
            await expect(confirmationPage.summaryDeliveryName).toHaveText("Free Pony Express Delivery!");
            await expect(confirmationPage.summaryPriceLabel).toHaveText("Price Total");
            await expect(confirmationPage.summaryGoodsPrice).toHaveText(/^Item total:\s*\$(\d+\.\d{2})$/);
            await expect(confirmationPage.summaryTax).toHaveText(/^Tax:\s*\$(\d+\.\d{2})$/);
            await expect(confirmationPage.summaryTotalMoney).toHaveText(/^Total:\s*\$(\d+\.\d{2})$/);

            //Check bottom buttons displayed
            await confirmationPage.bottomButtons.checkBackButton("Cancel");
            await confirmationPage.bottomButtons.checkNextButton("Finish");
        })

        test('Check Complete page display all elements', async ({ page }) => {
            const completePage = new CompletePage(page);
            completePage.goto('checkout-complete.html');
            // Check if header and footer elements are displayed correctly
            await completePage.checkHeaderFooterDisplay();
            // Check if the title is displayed correctly
            await expect.soft(completePage.getPageTitle).toHaveText("Checkout: Complete!");

            // Check if main page elements are displayed correctly
            expect(completePage.completeLogo).toBeVisible();
            expect(completePage.completeHeader).toBeVisible();
            expect(completePage.completeMessage).toBeVisible();

            //Check if bottom buttons are displayed correctly
            await expect(completePage.backHomeButton).toBeVisible();
        })
    })
})


