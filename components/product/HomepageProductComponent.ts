import { type Locator, expect } from "@playwright/test";
import { BaseProductComponent } from "./BaseProductComponent";

export class HomepageProductComponent extends BaseProductComponent {
    readonly image: Locator;
    readonly addRemoveCartButton: Locator;

    constructor(root: Locator) {
        super(root);
        this.image = root.locator('img');
        this.addRemoveCartButton = root.locator('button');
    }
}
