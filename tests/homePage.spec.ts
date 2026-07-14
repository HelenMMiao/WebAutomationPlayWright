import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage';

let homePage: HomePage;
//Open home page before sorting products
test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto("/inventory.html");
});

test.describe('Home page products sort', () => {
    //Sort by name ascending
    test("Sort products by Name (A to Z)", async () => {
        homePage.productsSort.selectOption("Name (A to Z)");
        const productList = await homePage.getProductCards();
        const productNameList = await Promise.all(
            productList.map(async (product) => {
                return (await product.name.innerText());
            })
        );
        const expectedSortedNameList = [...productNameList].sort();
        expect(productNameList).toEqual(expectedSortedNameList);
    })

    //Sort by name ascending
    test("Sort products by Name (Z to A)", async () => {
        await homePage.productsSort.selectOption("Name (Z to A)");
        const productList = await homePage.getProductCards();
        const productNameList = await Promise.all(
            productList.map(async (product) => {
                return (await product.name.innerText());
            })
        );
        const expectedSortedNameList = [...productNameList].sort().reverse();
        expect(productNameList).toEqual(expectedSortedNameList);
    })

    //Sort by name ascending
    test("Sort products by Price (low to high))", async () => {
        await homePage.productsSort.selectOption("Price (low to high)");
        const productList = await homePage.getProductCards();
        const productPriceList = await Promise.all(
            productList.map(async (product) => {
                return Number.parseFloat((await product.price.innerText()).slice(1,));
            })
        );

        const sortedPrice = [...productPriceList].sort(function (a, b) { return a - b });

        expect(productPriceList).toEqual(sortedPrice);
    })

    //Sort by name ascending
    test("Sort products by Price (high to low)", async () => {
        await homePage.productsSort.selectOption("Price (high to low)");

        const productList = await homePage.getProductCards();
        const productPriceList = await Promise.all(
            productList.map(async (product) => {
                return Number.parseFloat((await product.price.innerText()).slice(1,));
            })
        );

        const sortedPrice = [...productPriceList].sort(function (a, b) { return b - a });

        expect(productPriceList).toEqual(sortedPrice);
    })

}

);

//Check product's button works
test("Add to cart and Remove Button works", async () => {
    const toBeAddedProducts = [0, 1, 4];
    const productList = await homePage.getProductCards();
    let addedProducts = 0;
    for (const idx of toBeAddedProducts) {
        await productList[idx].addRemoveCartButton.click();
        await expect(productList[idx].addRemoveCartButton).toHaveText("Remove")
        addedProducts += 1;
        await expect(homePage.cartLogo).toHaveText(`${addedProducts}`);
    }

    for (const idx of toBeAddedProducts) {
        await productList[idx].addRemoveCartButton.click();
        await expect(productList[idx].addRemoveCartButton).toHaveText("Add to cart")
        addedProducts -= 1;
        if (addedProducts === 0) {
            expect(await homePage.cartLogo.innerText()).toBeFalsy;
        } else {
            await expect(homePage.cartLogo).toHaveText(`${addedProducts}`);
        }
    }

})
