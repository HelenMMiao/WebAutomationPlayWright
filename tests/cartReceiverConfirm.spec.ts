import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ReceiverPage } from '../pages/ReciverPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { addedProducts as expectedProductsList } from '../testdata/addToCart';
import { ReciverInfoError } from '../testdata/receiverInfo';
import { type } from 'node:os';

const productKeyList: number[] = expectedProductsList.map(product => product.id);

const sortedExpectedProductListwithId = [...expectedProductsList].sort((a, b) => a.name.localeCompare(b.name));
const sortedExpectedProductList = sortedExpectedProductListwithId.map(({ id, ...rest }) => rest);

function parsePrice2Num(priceText: string) {
    //Price after $ will be extracted and parsed
    const match = priceText.match(/\$(\d+\.\d{2})$/);
    const priceNum = match ? parseFloat(match[1]) : 0;
    return priceNum
}


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
        expect(sortedActualProductList).toEqual(sortedExpectedProductList);
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


test.describe("Confirmation page", async () => {
    let confirmationPage: ConfirmationPage;
    test.beforeEach(async ({ page }) => {
        confirmationPage = new ConfirmationPage(page);
        await confirmationPage.goto('checkout-step-two.html');
    });
    test("Continue Shopping button", async () => {
        await confirmationPage.bottomButtons.backButton.click();
        await expect(confirmationPage.pageTitle).toHaveText("Products");
    });

    test("Checkout button", async () => {
        await confirmationPage.bottomButtons.nextButton.click();
        await expect(confirmationPage.pageTitle).toHaveText("Checkout: Complete!");
    });

    test("Cart items", async () => {
        const actualProductLocatorList = await confirmationPage.getProductList();
        expect(actualProductLocatorList.length).toBe(expectedProductsList.length)

        const actualProductStrList = await Promise.all(
            actualProductLocatorList.map(async (product) => ({
                name: await product.name.innerText(),
                description: await product.description.innerText(),
                price: await product.price.innerText()
            }))
        );
        const sortedActualProductList = [...actualProductStrList].sort((a, b) => a.name.localeCompare(b.name));
        expect(sortedActualProductList).toEqual(sortedExpectedProductList);
    })

    test("Summary price and Tax", async () => {
        const actualProductLocatorList = await confirmationPage.getProductList();
        expect(actualProductLocatorList.length).toBe(expectedProductsList.length)

        const actualProductPrice = await Promise.all(actualProductLocatorList.map(
            async (product) => {
                const priceText = await product.price.innerText();
                return parsePrice2Num(priceText);
            }))

        const goodsPriceText = await confirmationPage.summaryGoodsPrice.innerText()
        const goodPriceNum = parsePrice2Num(goodsPriceText);
        const taxPriceText = await confirmationPage.summaryTax.innerText()
        const taxPriceNum = parsePrice2Num(taxPriceText);
        const totalPriceText = await confirmationPage.summaryTotalMoney.innerText();
        const totalPriceNum = parsePrice2Num(totalPriceText);

        const expectedGoodsPrice = actualProductPrice.reduce((sum, price) => sum + price, 0);
        const expectedTotalPrice = goodPriceNum + taxPriceNum;
        expect(goodPriceNum).toBe(expectedGoodsPrice);
        expect(totalPriceNum).toBe(expectedTotalPrice);

    })
})