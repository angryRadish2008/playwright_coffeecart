import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Cappuccino cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();
  await menuPage.correctCostOfCoffee('Cappuccino', '$19.00');
});
