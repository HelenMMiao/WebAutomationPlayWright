// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly openMenu: Locator;
    protected readonly logo: Locator;
    protected readonly cartButton: Locator;
    protected readonly socialLinks: Locator;
    protected readonly footerCopy: Locator;
    protected readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logo = page.locator('.app_logo');
        this.cartButton = page.locator('.shopping_cart_link');
        this.socialLinks = page.locator('.social').locator('a');
        this.footerCopy = page.locator('.footer_copy');
        this.pageTitle = page.locator(".title");
    }

    // Check if header and footer elements are displayed correctly
    async checkHeaderFooterDisplay(): Promise<void> {
        await expect.soft(this.openMenu).toBeVisible();
        await expect.soft(this.logo).toHaveText("Swag Labs");
        await expect.soft(this.cartButton).toBeVisible();
        const socialMediaNames = await this.socialLinks.allInnerTexts();
        expect.soft(socialMediaNames).toEqual(["Twitter", "Facebook", "LinkedIn"]);
        const footerCopyText = await this.footerCopy.textContent();
        expect.soft(footerCopyText).toContain("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
    }

    async goto(url: string) {
        await this.page.goto(url)
    }

    get getPageTitle(): Locator {
        return this.pageTitle;
    }

    async checkOpenMenuAllItems() {
        await this.openMenu.click();
        const addedToCart1 = await this.cartButton.innerText();
        await this.openMenu.click();
        await this.page.getByRole('link', { name: 'All Items' }).click();
        expect(this.page).toHaveURL(/inventory\.html$/);
        const addedToCart2 = await this.cartButton.innerText();
        expect(addedToCart1).toEqual(addedToCart2);
        await this.page.getByRole('button', { name: 'Close Menu' }).click();
    }

    async checkOpenMenuAbout() {
        await this.page.getByRole('link', { name: 'About' }).click();
        expect.soft(this.page).toHaveURL('https://saucelabs.com');
        await this.page.goBack();
    }

    async checkOpenMenuLogout() {
        await this.openMenu.click();
        await this.page.getByRole('link', { name: 'Logout' }).click();
        expect.soft(this.page).toHaveURL('https://www.saucedemo.com');

        await this.page.getByPlaceholder("Username").fill("standard_user");
        await this.page.getByPlaceholder("Password").fill("secret_sauce");
        await this.page.getByRole('button', { name: 'Login' }).click();
        await expect(this.page.locator('.title')).toHaveText('Products');
    }

    async checkOpenMenuResetState() {
        await this.openMenu.click();
        await this.page.getByRole('link', { name: 'Reset App State' }).click();
        expect.soft(this.page).toHaveURL(/inventory\.html$/);
        await this.page.getByRole('button', { name: 'Close Menu' }).click();
        expect(await this.cartButton.innerText()).toBeFalsy();
        await this.page.getByRole('button', { name: 'Close Menu' }).click();

    }

    async cartLogoClick(): Promise<void> {
        await this.cartButton.click();
    }
}