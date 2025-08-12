import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import * as db from '../utils/dbUtils';

test.describe('SauceDemo Cart UI↔DB Validation', () => {
  const cartCases = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
  ];

  for (const name of cartCases) {
    test(`Verify adding '${name}' to cart reflects correct details`, async ({ page }) => {
      const login = new LoginPage(page);
      const products = new ProductsPage(page);
      await login.goto();
      await login.login('standard_user', 'secret_sauce');
      await products.addToCart(name);
      await products.goToCart();
      const cartDetails = await products.getCartDetails();
      await test.info().attach('ui-screenshot', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
      const dbQuery = `SELECT * FROM products WHERE name = '${name.replace(/'/g, "''")}'`;
      const dbDetails = await db.getProductByName(name);
      await test.info().attach('db-query', {
        body: Buffer.from(dbQuery, 'utf-8'),
        contentType: 'text/plain',
      });
      await test.info().attach('db-result.json', {
        body: Buffer.from(JSON.stringify(dbDetails, null, 2), 'utf-8'),
        contentType: 'application/json',
      });
      await test.info().attach('ui-db-matched.json', {
        body: Buffer.from(JSON.stringify({ ui: cartDetails, db: dbDetails }, null, 2), 'utf-8'),
        contentType: 'application/json',
      });
      expect(cartDetails.name).toBe(dbDetails.name);
      expect(cartDetails.price).toBe(dbDetails.price.toString());
    });
  }
});
