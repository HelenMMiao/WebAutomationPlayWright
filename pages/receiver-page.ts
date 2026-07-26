import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { BackNextComponent } from "../components/bottomButtons/back-next-component";
import { ConfirmationPage } from "./confirmation-page";

export class ReceiverPage extends BasePage {
    public readonly firstName: Locator;
    public readonly lastName: Locator;
    public readonly zipCode: Locator;
    public readonly bottomButtons: BackNextComponent;
    public readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.zipCode = page.getByPlaceholder("Zip/Postal Code");
        this.bottomButtons = new BackNextComponent(page.locator('body'));
        this.errorMessage = page.getByTestId("error");
    }

    async inputReceiverInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
    }
}