import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { HomePage } from "./home-page";

export class CompletePage extends BasePage {
    public readonly completeLogo: Locator;
    public readonly completeHeader: Locator;
    public readonly completeMessage: Locator;
    public readonly backHomeButton: Locator;


    constructor(page: Page) {
        super(page);
        this.completeLogo = page.getByAltText('Pony Express');
        this.completeHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
        this.completeMessage = page.locator('.complete-text');
        this.backHomeButton = page.getByRole('button', { name: "Back Home" });
    }

    async backHomeNavigate(): Promise<HomePage> {
        await this.backHomeButton.click();
        return new HomePage(this.page);
    }
}