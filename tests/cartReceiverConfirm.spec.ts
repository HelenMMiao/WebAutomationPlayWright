import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ReceiverPage } from '../pages/ReciverPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { addedProducts as expectedProductsList } from '../testdata/addToCart';
import { ReciverInfoError } from '../testdata/receiverInfo';

const productKeyList: number[] = expectedProductsList.map(product => product.id);

test.beforeEach(async ({ context }) => {
    await context.addInitScript(
        (ids) => {
            window.localStorage.setItem('cart-contents', JSON.stringify(ids));
        },
        productKeyList
    );
})

test.describe("Cart Page", () => {
    let cartPage: CartPage;
    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        await cartPage.goto('/cart.html');
    });
    test("Make sure cart item displays correctly", async () => {
        const actualProductLocatorList = await cartPage.getCartListItems();
        expect(actualProductLocatorList.length).toBe(expectedProductsList.length)

        const actualProductStrList = await Promise.all(
            actualProductLocatorList.map(async (product) => ({
                name: await product.name.innerText(),
                description: await product.description.innerText(),
                price: await product.price.innerText()
            }))
        );
        const sortedActualProductList = [...actualProductStrList].sort((a, b) => a.name.localeCompare(b.name));
        const sortedExpectedProductList = [...expectedProductsList].sort((a, b) => a.name.localeCompare(b.name));
        const sortedTrimmedExpectedProductList = sortedExpectedProductList.map(({ id, ...rest }) => rest);
        expect(sortedActualProductList).toEqual(sortedTrimmedExpectedProductList);
    });

    test("Continue Shopping button", async () => {
        await cartPage.bottomButtons.backButton.click();
        await expect(cartPage.pageTitle).toHaveText("Products");
    });

    test("Checkout button", async () => {
        await cartPage.bottomButtons.nextButton.click();
        await expect(cartPage.pageTitle).toHaveText("Checkout: Your Information");
    });
});


test.describe("Receiver Page", () => {
    let receiverPage: ReceiverPage;
    test.beforeEach(async ({ page }) => {
        receiverPage = new ReceiverPage(page);
        await receiverPage.goto('/checkout-step-one.html');
    });

    test("Cancel button", async () => {
        await receiverPage.bottomButtons.backButton.click();
        await expect(receiverPage.pageTitle).toHaveText("Your Cart");
    });


    test("Error input", async () => {
        // Check correct error message when missing some input
        for (const { firstName, lastName, zipCode, errorMessage } of ReciverInfoError) {
            await receiverPage.firstName.fill(firstName);
            await receiverPage.lastName.fill(lastName);
            await receiverPage.zipCode.fill(zipCode);
            await receiverPage.bottomButtons.nextButton.click();

            expect(receiverPage.errorMessage).toHaveText(errorMessage);
            await expect(receiverPage.firstName.locator("xpath=following-sibling::*[1]")).toBeVisible();
            await expect(receiverPage.lastName.locator("xpath=following-sibling::*[1]")).toBeVisible();
            await expect(receiverPage.zipCode.locator("xpath=following-sibling::*[1]")).toBeVisible();

        }

    });

    test("Clear error button", async () => {
        await receiverPage.bottomButtons.nextButton.click();
        await receiverPage.errorMessage.getByRole("button").click();
        expect(receiverPage.errorMessage).not.toBeVisible();
        await expect(receiverPage.firstName.locator("xpath=following-sibling::*[1]")).not.toBeVisible();
        await expect(receiverPage.lastName.locator("xpath=following-sibling::*[1]")).not.toBeVisible();
        await expect(receiverPage.zipCode.locator("xpath=following-sibling::*[1]")).not.toBeVisible();

    });

    test("Continue button works", async () => {
        await receiverPage.firstName.fill("Black");
        await receiverPage.lastName.fill("Pink");
        await receiverPage.zipCode.fill("1234");
        await receiverPage.bottomButtons.nextButton.click();
        await expect(receiverPage.pageTitle).toHaveText("Checkout: Overview");
    });
})

