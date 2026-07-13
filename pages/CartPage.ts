
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartpageProductComponent } from "../components/product";
import { BackNextComponent } from "../components/bottomButtons/BackNextComponent";

export class CartPage extends BasePage {
    public readonly cartListHeaderLabel: Locator;
    public readonly cartListHeaderDesciption: Locator;
    public readonly bottomButtons: BackNextComponent;

    constructor(page: Page) {
        super(page);
        // Maps to the column values in the row
        this.cartListHeaderLabel = page.getByText('QTY');
        this.cartListHeaderDesciption = page.getByText('Description');
        this.bottomButtons = new BackNextComponent(page.locator('body'));
    }

    async getCartListItems(): Promise<CartpageProductComponent[]> {
        const cartItems = await this.page.locator('.cart_item').all();
        return cartItems.map(product => new CartpageProductComponent(product));

    }
}