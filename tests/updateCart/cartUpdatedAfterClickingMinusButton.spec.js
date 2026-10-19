import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking minus for drinks', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);
  await menuPage.open();
  await menuPage.addToCart('Cappuccino');
  await menuPage.addToCart('Espresso');
  await menuPage.viewCart();
  await cartPage.waitForLoading();
  await cartPage.addOneItemToCart('Cappuccino');
  await cartPage.addOneItemToCart('Espresso');
  await cartPage.removeOneItemFromCart('Cappuccino');
  await cartPage.removeOneItemFromCart('Espresso');
  await cartPage.assertItemInCart('Cappuccino', '$19.00 x 1', '$19.00');
  await cartPage.assertItemInCart('Espresso', '$10.00 x 1', '$10.00');
});
