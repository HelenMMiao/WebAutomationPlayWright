// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly openMenu: Locator;
  protected readonly logo: Locator;
  protected readonly cartButton: Locator;
  protected readonly socialLinks: Locator;
  protected readonly footerCopy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logo = page.locator('.app_logo');
    this.cartButton = page.locator('.shopping_cart_link' );
    this.socialLinks = page.locator('.social').locator('a');
    this.footerCopy = page.locator('.footer_copy');
}

  // Check if header and footer elements are displayed correctly
  async checkHeaderFooterDisplay() {
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
}