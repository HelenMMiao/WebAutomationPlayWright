import { type Page, type Locator } from "@playwright/test";
import { BasePageSwitchButtons } from "./BasePageSwitchButtons";

export class ReceiverPage extends BasePageSwitchButtons {
    public readonly firstName: Locator;
    public readonly lastName: Locator;
    public readonly zipCode: Locator;
    public readonly cancelButton: Locator;
    public readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.zipCode = page.getByPlaceholder("Zip/Postal Code");
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }
}