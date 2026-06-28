import { Page, Locator} from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly baseURL: string;

    constructor(page: Page, baseURL = '') {
        this.page = page;
        this.baseURL = baseURL;
    }

}