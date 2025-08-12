import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import * as db from '../utils/dbUtils';

test('Verify all product prices in UI match DB', async ({ page }) => {
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
  const matched = dbProducts.map(dbProd => {
    const uiProd = uiProducts.find(p => p.name === dbProd.name);
    return { db: dbProd, ui: uiProd };
  });
  await test.info().attach('ui-db-matched.json', {
    body: Buffer.from(JSON.stringify(matched, null, 2), 'utf-8'),
    contentType: 'application/json',
  });
  for (const dbProd of dbProducts) {
    const uiProd = uiProducts.find(p => p.name === dbProd.name);
    expect(uiProd?.price).toBe(dbProd.price.toString());
  }
});
