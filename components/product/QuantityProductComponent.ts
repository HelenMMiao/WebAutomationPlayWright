import { type Locator, expect } from "@playwright/test";
import { BaseProductComponent } from "./BaseProductComponent";

export class QuantityProductComponent extends BaseProductComponent {
    public readonly cartItemQuantity: Locator;
    constructor(root: Locator) {
        super(root);
        this.cartItemQuantity = root.locator('.cart_quantity');
    }

    async getItemQty(): Promise<number> {
        const itemQtyTextValue = await this.cartItemQuantity.innerText();
        const itemQtyInt = parseInt(itemQtyTextValue, 10);
        return itemQtyInt;
    }

}
