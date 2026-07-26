import { test, expect } from '../../fixtures/page-fixture';
import { loginTestData } from '../../testdata/loginData';


test.describe('Login functionality test', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    // Test to check login functionality with valid credentials
    for (const { username, password } of loginTestData.validUsers) {
        test(`Check Login success for user: ${username}, password: ${password}`, async ({ loginPage }) => {
            const homePage = await loginPage.login(username, password)
            expect(homePage.getPageTitle).toHaveText("Products");
        });
    }

    // Test to check login functionality with invalid credentials
    for (const { username, password, errorMessage } of loginTestData.invalidUsers) {
        test(`Check Login error for user: ${username}, password: ${password}`, async ({ loginPage }) => {
            await loginPage.login(username, password)
            await expect(loginPage.loginButton).toBeVisible()
            await expect(loginPage.loginErrorMessage).toHaveText(errorMessage)
        })
    }
})
