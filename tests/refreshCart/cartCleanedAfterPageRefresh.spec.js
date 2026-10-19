import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import {CartPage} from '../../src/pages/CartPage';

test('Cart cleaned after page refresh', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);
  await menuPage.open();
  await menuPage.addToCart('Espresso');
  await menuPage.viewCart();
  await cartPage.waitForLoading();
  await cartPage.assertItemInCart('Espresso', '$10.00 x 1', '$10.00');
  await page.reload();
  await cartPage.emptyCartMessageVisible();
});
