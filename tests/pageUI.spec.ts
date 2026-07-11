import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage  } from '../pages/HomePage';


test.describe('Page UI test, fresh session', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  // Test to check if all elements on the login page are displayed correctly
  test('Check Login page display all elements', async ({page}) => {
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
  test('Check Home page display all elements', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.goto("/inventory.html");
    const productCards = await homePage.getProductCards();
    
    // Check if all product cards are displayed correctly, with price format and add/remove cart button 
    expect(productCards.length).toBeGreaterThan(0);
    for (const product of productCards){
        expect(product.image).toBeVisible();
        expect(product.name).toBeVisible();
        expect(product.description).toBeVisible();
        expect(product.price).toHaveText(/^\$\d+(\.\d{2})$/); // Check if price is in the format $xx.xx
        expect(product.addRemoveCartButton).toHaveText("Add to cart");
    }
    // Check if header and footer elements are displayed correctly
    await homePage.checkHeaderFooterDisplay();
    // Check if the products title, menu options, and filter options are displayed correctly
    await expect.soft(homePage.productsTitle).toHaveText("Products");
    expect.soft(await homePage.openMenuOptions()).toEqual(["All Items", "About", "Logout", "Reset App State"]);
    expect.soft(await homePage.productsFilterOptions()).toEqual(["Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)"]);
    
  });


})

