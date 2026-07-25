import { test, expect } from '@playwright/test'
import { CompletePage } from '../pages/CompletePage'

let completePage: CompletePage;

// let completePage: CompletePage;
test("Complete page", async ({ page }) => {
    completePage = new CompletePage(page);
    completePage.goto();
    await completePage.backHomeButton.click()
    await expect(completePage.pageTitle).toHaveText("Products");

})

