import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginTestData } from '../testdata/loginDatg';


test.describe('Login functionality test', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    let loginPage: LoginPage;
    // Open the login page before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto('/');
    });

    // Test to check login functionality with valid credentials
    for (const { username, password } of loginTestData.validUsers) {
        test(`Check Login success for user: ${username}, password: ${password}`, async () => {
            const homePage = await loginPage.login(username, password)
            expect(homePage.getPageTitle).toHaveText("Products");
        });
    }

    // Test to check login functionality with invalid credentials
    for (const { username, password, errorMessage } of loginTestData.invalidUsers) {
        test(`Check Login error for user: ${username}, password: ${password}`, async () => {
            await loginPage.login(username, password)
            await expect(loginPage.loginButton).toBeVisible()
            await expect(loginPage.loginErrorMessage).toHaveText(errorMessage)
        })
    }
})
