import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { QuantityProductComponent } from "../components/product";
import { BackNextComponent } from "../components/bottomButtons/BackNextComponent";

export class ConfirmationPage extends BasePage {
    public readonly cartListHeaderLabel: Locator;
    public readonly cartListHeaderDesciption: Locator;
    public readonly summaryPaymentLabel: Locator;
    public readonly summaryContractNumber: Locator;
    public readonly summaryDeliveryLabel: Locator;
    public readonly summaryDeliveryName: Locator;
    public readonly summaryPriceLabel: Locator;
    public readonly summaryGoodsPrice: Locator;
    public readonly summaryTax: Locator;
    public readonly summaryTotalMoney: Locator;
    public readonly bottomButtons: BackNextComponent;

    constructor(page: Page) {
        super(page);
        this.cartListHeaderLabel = page.getByText('QTY');
        this.cartListHeaderDesciption = page.getByText('Description');
        this.bottomButtons = new BackNextComponent(page.locator('body'));
        this.summaryPaymentLabel = page.getByTestId('payment-info-label');
        this.summaryContractNumber = page.getByTestId('payment-info-value');
        this.summaryDeliveryLabel = page.getByTestId('shipping-info-label');
        this.summaryDeliveryName = page.getByTestId('shipping-info-value');
        this.summaryPriceLabel = page.getByTestId('total-info-label');
        this.summaryGoodsPrice = page.getByTestId('subtotal-label');
        this.summaryTax = page.getByTestId('tax-label');
        this.summaryTotalMoney = page.getByTestId('total-label');

    }
    async getProductList(): Promise<QuantityProductComponent[]> {
        const addedProducts = await this.page.locator('.cart_list').locator('.cart_item').all();
        return addedProducts.map((product) => new QuantityProductComponent(product));
    }

    // async waitForPageLoad() {
    //     this.page.waitForLoadState('')
    // }

}