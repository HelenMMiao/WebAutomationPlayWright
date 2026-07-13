import { type Locator, expect } from "@playwright/test";
import { QuantityProductComponent } from "./QuantityProductComponent";

export class CartpageProductComponent extends QuantityProductComponent {
    public readonly removeButton: Locator;
    constructor(root: Locator) {
        super(root);
        this.removeButton = root.getByRole('button', { name: 'Remove' });
    }
}

