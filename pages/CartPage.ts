
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartItemProductQuantityAndButtonComponent } from "../components/PurchasingProductComponent";
import { BasePageSwitchButtons } from "./BasePageSwitchButtons";

export class CartPage extends BasePageSwitchButtons {
    public readonly cartListHeaderLabel: Locator;
    public readonly cartListHeaderDesciption: Locator;

    constructor(page: Page) {
        super(page);
        // Maps to the column values in the row
        this.cartListHeaderLabel = page.getByText('QTY');
        this.cartListHeaderDesciption = page.getByText('Description');
    }

    async getCartListItems(): Promise<CartItemProductQuantityAndButtonComponent[]> {
        const cartItems = await this.page.locator('.cart_item').all();
        return cartItems.map(product => new CartItemProductQuantityAndButtonComponent(product));

    }
}