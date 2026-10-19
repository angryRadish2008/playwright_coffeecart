import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Espresso cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();
  await menuPage.correctCostOfCoffee('Espresso', '$10.00');
});