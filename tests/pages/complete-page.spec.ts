import { test, expect } from '../../fixtures/page-fixture';

// let completePage: CompletePage;
test("Complete page", async ({ completePage }) => {
    await completePage.backHomeButton.click()
    await expect(completePage.pageTitle).toHaveText("Products");

})

