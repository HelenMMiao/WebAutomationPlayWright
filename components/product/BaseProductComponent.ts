import { type Locator, expect } from "@playwright/test";

export class BaseProductComponent {
    readonly root: Locator;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.name = this.root.locator('.inventory_item_name');
        this.description = this.root.locator('.inventory_item_desc');
        this.price = this.root.locator('.inventory_item_price');
    }

    async verifyPriceFormat(): Promise<void> {
        await expect(this.price).toHaveText(/^\$\d+(\.\d{2})$/);
    }

}

