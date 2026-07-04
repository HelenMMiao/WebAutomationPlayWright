import { type Page, type Locator} from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly loginErrorMessage: Locator;
    public readonly loginPageLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", {name: "Login"});
        this.loginErrorMessage = page.locator('[data-test="error"]');
        this.loginPageLogo = page.locator(".login_logo");

    }

    async goto(url: string) {
        await this.page.goto(url)
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }

}