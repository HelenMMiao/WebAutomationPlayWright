import { test, expect } from '../fixtures/PageFixtures';

test('Check Login page display all elements', async ({loginPage}) => {
  await loginPage.goto('https://www.saucedemo.com/');
  await expect(loginPage.usernameInput).toBeVisible()
  await expect(loginPage.passwordInput).toBeVisible()
  await expect(loginPage.loginButton).toBeVisible()
  await expect(loginPage.loginPageLogo).toHaveText("Swag Labs")
});

