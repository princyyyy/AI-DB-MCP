import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import * as db from '../utils/dbUtils';

test('Verify product count in UI matches DB', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  const uiProducts = await products.getProductList();
  await test.info().attach('ui-screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
  const dbQuery = 'SELECT * FROM products';
  const dbProducts = await db.getAllProducts() as any[];
  await test.info().attach('db-query', {
    body: Buffer.from(dbQuery, 'utf-8'),
    contentType: 'text/plain',
  });
  await test.info().attach('db-result.json', {
    body: Buffer.from(JSON.stringify(dbProducts, null, 2), 'utf-8'),
    contentType: 'application/json',
  });
  await test.info().attach('ui-db-matched.json', {
    body: Buffer.from(JSON.stringify({ uiCount: uiProducts.length, dbCount: dbProducts.length }, null, 2), 'utf-8'),
    contentType: 'application/json',
  });
  expect(uiProducts.length).toBe(dbProducts.length);
});
