import {type Locator} from "@playwright/test";

export abstract class BaseProductComponent {
    readonly root: Locator;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.name = root.locator('.inventory_item_name');
        this.description = root.locator('.inventory_item_desc');
        this.price = root.locator('.inventory_item_price');
    }
}