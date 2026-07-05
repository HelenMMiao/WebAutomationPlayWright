import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginTestData } from '../testdata/loginDatg';


test.describe('Login functionality test', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  let loginPage: LoginPage;
  // Open the login page before each test
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto('/');
  });

  // Test to check if all elements on the login page are displayed correctly
  test('Check Login page display all elements', async ({}) => {
    await expect.soft(loginPage.usernameInput).toBeVisible()
    await expect.soft(loginPage.passwordInput).toBeVisible()
    await expect.soft(loginPage.loginButton).toBeVisible()
    await expect.soft(loginPage.loginPageLogo).toHaveText("Swag Labs")    
  });

  // Test to check login functionality with valid credentials
  for (const {username, password} of loginTestData.validUsers) {
    test(`Check Login success for user: ${username}, password: ${password}`, async () => {
      await loginPage.login(username, password)
      await expect(loginPage.loginButton).not.toBeVisible();
    });
  }

  // Test to check login functionality with invalid credentials
  for (const {username, password, errorMessage} of loginTestData.invalidUsers) {
    test(`Check Login error for user: ${username}, password: ${password}`, async () => {
      await loginPage.login(username, password)
      await expect(loginPage.loginButton).toBeVisible()
      await expect(loginPage.loginErrorMessage).toHaveText(errorMessage)
    })
  }
})

