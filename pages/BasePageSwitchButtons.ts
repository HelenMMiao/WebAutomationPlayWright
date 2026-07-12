// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export abstract class BasePageSwitchButtons extends BasePage {
    protected readonly backButton: Locator;
    protected readonly nextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.backButton = page.locator('.back');
        this.nextButton = page.locator(".btn_action");
    }

    async checkBackButton(expectedText: string): Promise<void> {
        await expect.soft(this.backButton.getByAltText('Go back')).toBeVisible();
        expect(this.backButton).toHaveText(expectedText);
    }

    async checkNextButton(expectedText: string): Promise<void> {
        expect(this.nextButton).toHaveText(expectedText);
    }

}