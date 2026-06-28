import { Page, Locator, expect} from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}

    get usernameInput() {return this.page.getByPlaceholder("Username")}
    get passwordInput() {return this.page.getByPlaceholder("Password")}
    get loginButton() {return this.page.getByRole("button", {name: "Login"})}
    get loginPageLogo() {return this.page.locator(".login_logo")}

    async goto(url: string) {
        await this.page.goto(url)
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }


}