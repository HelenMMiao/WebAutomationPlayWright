import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BackNextComponent } from "../components/bottomButtons/BackNextComponent";

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
}