// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    public readonly page: Page;
    public readonly openMenu: Locator;
    public readonly logo: Locator;
    public readonly cartLogo: Locator;
    public readonly socialLinks: Locator;
    public readonly footerCopy: Locator;
    public readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logo = page.locator('.app_logo');
        this.cartLogo = page.locator('.shopping_cart_link');
        this.socialLinks = page.locator('.social').locator('a');
        this.footerCopy = page.locator('.footer_copy');
        this.pageTitle = page.locator(".title");
    }

    // Check if header and footer elements are displayed correctly
    async checkHeaderFooterDisplay(): Promise<void> {
        await expect.soft(this.openMenu).toBeVisible();
        await expect.soft(this.logo).toHaveText("Swag Labs");
        await expect.soft(this.cartLogo).toBeVisible();
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
        const addedToCart1 = await this.cartLogo.innerText();
        await this.openMenu.click();
        await this.page.getByRole('link', { name: 'All Items' }).click();
        expect(this.page).toHaveURL(/inventory\.html$/);
        const addedToCart2 = await this.cartLogo.innerText();
        expect(addedToCart1).toEqual(addedToCart2);
        await this.page.getByRole('button', { name: 'Close Menu' }).click();
    }

    async selectSubMenu(subMenu: string) {
        await this.openMenu.click();
        await this.page.getByRole('link', { name: subMenu }).click();
    }

    async cartLogoClick(): Promise<void> {
        await this.cartLogo.click();
    }

    async checkURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}