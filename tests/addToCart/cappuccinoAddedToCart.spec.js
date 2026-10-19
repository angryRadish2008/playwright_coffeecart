import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addToCart('Cappuccino');
  await menuPage.viewCart();
  await cartPage.waitForLoading();

  await cartPage.assertItemInCart('Cappuccino', '$19.00 x 1', '$19.00');
})