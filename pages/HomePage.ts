import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomepageProductComponent } from "../components/product";

export class HomePage extends BasePage {
    public readonly productsSort: Locator;
    public readonly productCardsRoot: Locator;


    constructor(page: Page) {
        super(page);
        this.productsSort = page.locator(".product_sort_container");
        this.productCardsRoot = page.locator(".inventory_list");
    }

    async getProductCards(): Promise<HomepageProductComponent[]> {
        const productCards = await this.productCardsRoot.locator('.inventory_item').all();
        return productCards.map(productLocator => new HomepageProductComponent(productLocator));
    }

    async openMenuOptions() {
        await this.openMenu.click();
        const menuItemsNames: string[] = await this.page.locator('.bm-item.menu-item').allInnerTexts();
        return menuItemsNames;
    }

    async productsSortOptions() {
        const productFilterOptions: string[] = await this.productsSort.locator('option').allInnerTexts();
        return productFilterOptions;
    }



}