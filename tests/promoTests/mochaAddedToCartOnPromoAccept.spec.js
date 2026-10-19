import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo accepting', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addToCart('Cappuccino');
  await menuPage.addToCart('Espresso');
  await menuPage.addToCart('Americano');
  await menuPage.assertPromoModalMessage();
  await menuPage.acceptPromo();
  await menuPage.viewCart();
  await cartPage.waitForLoading();
  await cartPage.assertItemInCart('Cappuccino', '$19.00 x 1', '$19.00');
  await cartPage.assertItemInCart('Espresso', '$10.00 x 1', '$10.00');
  await cartPage.assertItemInCart('Americano', '$7.00 x 1', '$7.00');
  await cartPage.assertItemInCart('(Discounted) Mocha', '$4.00 x 1', '$4.00');
  await cartPage.assertTotalCost('$40.00');
});
