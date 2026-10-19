import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino removed from Cart after clicking Remove', async ({ page }) => {
    const menuPage = new MenuPage(page);
    const cartPage = new CartPage(page);

    await menuPage.open();
    await menuPage.addToCart('Cappuccino');
    await menuPage.viewCart();
    await cartPage.waitForLoading();
    await cartPage.removeItemFromCart('Cappuccino');
    await cartPage.emptyCartMessageVisible();
});