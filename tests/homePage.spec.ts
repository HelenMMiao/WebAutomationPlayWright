import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage';

let homePage: HomePage;
//Open home page before sorting products
test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto("/inventory.html");
});

test.describe('Check products sorting function works well', () => {
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
    test.only("Sort products by Name (Z to A)", async () => {
        await homePage.productsSort.selectOption("Name (Z to A)");
        const productList = await homePage.getProductCards();
        const productNameList = await Promise.all(
            productList.map(async (product) => {
                return (await product.name.innerText());
            })
        );
        console.log(productNameList);
        const expectedSortedNameList = [...productNameList].sort().reverse();
        expect(productNameList).toEqual(expectedSortedNameList);
    })

    //Sort by name ascending
    test("Sort products by Price (low to high))", async () => {
        homePage.productsSort.selectOption("Price (low to high)");
        homePage.productsSort.selectOption("Name (A to Z)");

        const productList = await homePage.getProductCards();
        const productPriceTxtList = await Promise.all(
            productList.map(async (product) => {
                return Number.parseFloat((await product.price.innerText()).slice(1,));
            })
        );
        expect(1).toEqual(2);
        console.log(productPriceTxtList);
        // const productPriceNumList = productPriceTxtList.map((price)=>{
        //     price.
        // });
    })

    //Sort by name ascending
    test("Sort products by Price (high to low)", async () => {
        homePage.productsSort.selectOption("Price (high to low)");
        homePage.productsSort.selectOption("Name (A to Z)");

        const productList = await homePage.getProductCards();
        const productPriceTxtList = await Promise.all(
            productList.map(async (product) => {
                return Number.parseFloat((await product.price.innerText()).slice(1,));
            })
        );
        expect(1).toEqual(2);
        console.log(productPriceTxtList);
        // const productPriceNumList = productPriceTxtList.map((price)=>{
        //     price.
        // });
    })

}

)