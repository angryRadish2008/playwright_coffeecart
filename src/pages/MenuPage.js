import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByLabel('Cart page');
    this.promoMessage = page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    this.acceptPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/');
  }

  async addToCart(coffeeName) {
    await this.page.getByTestId(coffeeName).click();
  }

  async viewCart() {
    await this.page.getByLabel('Cart page').click();
  }

  async assertTotalCost(expectedTotal) {
    const totalLocator = this.page.getByTestId('checkout');
    await expect(totalLocator).toContainText(`${expectedTotal}`);
  }

  async correctCostOfCoffee(coffeeName, expectedCost) {
    const coffeeLocator = this.page.getByTestId(coffeeName);
    const parent = this.page.getByRole('listitem').filter({ has: coffeeLocator });
    await expect(parent).toContainText(`${expectedCost}`);
  }

  async assertPromoModalMessage(expectedMessage) {
    await expect(this.promoMessage).toBeVisible();
  }

  async acceptPromo() {
    await this.acceptPromoButton.click();
  }

  async declinePromo() {
    const declinePromoButton = this.page.getByRole('button', { name: "Nah, I'll skip." });
    await declinePromoButton.click();
  }
}
