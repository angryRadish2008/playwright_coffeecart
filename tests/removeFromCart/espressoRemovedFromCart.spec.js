import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso removed from Cart after clicking Remove', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addToCart('Espresso');
  await menuPage.viewCart();
  await cartPage.waitForLoading();
  await cartPage.removeItemFromCart('Espresso');
  await cartPage.emptyCartMessageVisible();
});
