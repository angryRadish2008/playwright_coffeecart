import { test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';

test('Empty cart shows correct message', async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.open();
  await cartPage.assertCartIsEmpty();
});
