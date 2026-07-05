import { test, expect } from '@playwright/test';

test("Check home page displays", async({page})=>{
    await page.goto("/inventory.html");
    const inventoryItemName = await page.locator(".inventory_item_name").allInnerTexts();
    // console.log(inventoryItemName);
    expect(inventoryItemName).toContain("Sauce Labs Backpack");

})
