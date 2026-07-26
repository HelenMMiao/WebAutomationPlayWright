import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home-page';
import { CartPage } from '../../pages/cart-page';

// All Items and Reset function when products are added into cart
test.describe('Added Cart', () => {

    test.beforeEach(async ({ context }) => {
        // Add Internal Ids for Backpack [4] and Bike Light [0]
        await context.addInitScript(() => {
            window.localStorage.setItem('cart-contents', JSON.stringify([4, 0]))
        })
    });

    test("All Items", async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto("/cart.html");
        const productsInCartBefore = await cartPage.cartLogo.innerText();
        expect(productsInCartBefore).toBeTruthy;
        await cartPage.selectSubMenu("All Items");
        await cartPage.checkURL("https://www.saucedemo.com/inventory.html");
        expect(await cartPage.cartLogo.innerText()).toEqual(productsInCartBefore);
    })

    test("Reset App State", async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto("/cart.html");
        const productsInCartBefore = await cartPage.cartLogo.innerText();
        expect(productsInCartBefore).toBeTruthy;
        await cartPage.selectSubMenu("Reset App State");
        await cartPage.checkURL("https://www.saucedemo.com/cart.html");
        expect(await cartPage.cartLogo.innerText()).toBeFalsy;
    })
}

);

// All Items and Reset function when products are empty into cart
test.describe('Empty Cart', () => {
    test("All Items", async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto("/cart.html");
        const productsInCartBefore = await cartPage.cartLogo.innerText();
        expect(productsInCartBefore).toBeFalsy;
        await cartPage.selectSubMenu("All Items");
        await cartPage.checkURL("https://www.saucedemo.com/inventory.html");
        expect(await cartPage.cartLogo.innerText()).toEqual(productsInCartBefore);
    })

    test("Reset App State", async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto("/cart.html");
        const productsInCartBefore = await cartPage.cartLogo.innerText();
        expect(productsInCartBefore).toBeFalsy;
        await cartPage.selectSubMenu("Reset App State");
        await cartPage.checkURL("https://www.saucedemo.com/cart.html");
        expect(await cartPage.cartLogo.innerText()).toBeFalsy;
    })

}

);

//About link
test("About", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto("/inventory.html");
    await homePage.selectSubMenu('About');
    await homePage.checkURL('https://saucelabs.com');
})

//Logout link
test("Logout", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto("/inventory.html");
    await homePage.selectSubMenu('Logout');
    await homePage.checkURL('https://www.saucedemo.com');
})
