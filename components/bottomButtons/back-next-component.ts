import { Page, Locator, expect } from '@playwright/test';

export class BackNextComponent {
    readonly root: Locator;
    readonly backButton: Locator;
    readonly nextButton: Locator;

    constructor(root: Locator) {
        this.root = root
        this.backButton = root.locator('.back');
        this.nextButton = root.locator(".btn_action");
    }

    async checkBackButton(expectedText: string): Promise<void> {
        await expect.soft(this.backButton.getByAltText('Go back')).toBeVisible();
        expect(this.backButton).toHaveText(expectedText);
    }

    async checkNextButton(expectedText: string): Promise<void> {
        expect(this.nextButton).toHaveText(expectedText);
    }

    async backButtonNavigate<T>(TargetPage: new (page: Page) => T): Promise<T> {
        await this.backButton.click();
        const page = this.root.page();
        return new TargetPage(page);
    }
    async nextButtonNavigate<T>(TargetPage: new (page: Page) => T): Promise<T> {
        await this.nextButton.click();
        const page = this.root.page();
        return new TargetPage(page);
    }

}