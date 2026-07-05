import {test as setup, expect} from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({page}) => {
    // Perform login .
    await page.goto('/');
    await page.getByPlaceholder("Username").fill('standard_user');
    await page.getByPlaceholder("Password").fill('secret_sauce');
    await page.getByRole("button", {name: "Login"}).click();

    // Wait until page loaded and receives the cookies
    await page.waitForURL('/inventory.html'); 
    await expect(page.locator('.title')).toHaveText('Products');
    // await page.waitForLoadState('load');

    // Store the authentication state into a file
    await page.context().storageState({path: authFile});

})