import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);
    this.totalCheckoutLocator = page.getByTestId('checkout');
    this.emptyCartMessageLocator = page.getByText('No coffee, go add some.');
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }

  async assertItemInCart(itemName, unitDetails, totalCost) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    const itemNameLocator = item.locator('div').nth(0);
    const itemUnitLocator = item.locator('div').nth(1);
    const itemTotalCostLocator = item.locator('div').nth(3);

    await expect(itemNameLocator).toContainText(itemName);
    await expect(itemUnitLocator).toContainText(unitDetails);
    await expect(itemTotalCostLocator).toContainText(totalCost);
  }

  async assertItemNotInCart(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    await expect(item).toHaveCount(0);
  }

  async assertCartIsEmpty() {
    await expect(this.emptyCartMessageLocator).toBeVisible();
  }

  async assertTotalCost(expectedTotal) {
    await expect(this.totalCheckoutLocator).toContainText(`Total: ${expectedTotal}`);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async assertItemNotVisible(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    await expect(item).toBeHidden();
  }

  async assertItemVisible(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    await expect(item).toBeVisible();
  }

  async emptyCartMessageVisible() {
    await expect(this.emptyCartMessageLocator).toBeVisible();
  }

  async removeItemFromCart(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    const removeButton = item.getByRole('button', { name: `Remove all ${itemName}` });
    await removeButton.click();
  }

  async removeOneItemFromCart(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    const removeButton = item.getByRole('button', { name: `Remove one ${itemName}` });
    await removeButton.click();
  }

  async addOneItemToCart(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    const addButton = item.getByRole('button', { name: `Add one ${itemName}` });
    await addButton.click();
  }

  async getItemQuantity(itemName) {
    const item = this.cartListLocator.getByRole('listitem').filter({
      hasText: itemName,
    });
    const quantityLocator = item.locator('div').nth(2);
    const quantityText = await quantityLocator.textContent();
    return parseInt(quantityText, 10);
  }
}
