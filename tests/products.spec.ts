import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import * as db from '../utils/dbUtils';

test.describe('SauceDemo Product UI↔DB Validation', () => {
  test.beforeEach(async () => {
    // DB should be initialized before each test (run SQL externally or via MCP)
  });

  test('TC01: Verify all products are displayed after login', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    const uiProducts = await products.getProductList();
    // Take UI screenshot
    await test.info().attach('ui-screenshot', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    // DB query and attach result
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
    // Optionally, save DB result screenshot (as text image)
    // Log matched data
    const matched = dbProducts.map(dbProd => {
      const match = uiProducts.find(u => u.name === dbProd.name && u.price === dbProd.price.toString());
      return { db: dbProd, ui: match };
    });
    await test.info().attach('ui-db-matched.json', {
      body: Buffer.from(JSON.stringify(matched, null, 2), 'utf-8'),
      contentType: 'application/json',
    });
    expect(uiProducts.length).toBe(dbProducts.length);
    for (const dbProd of dbProducts) {
      expect(uiProducts).toContainEqual(expect.objectContaining({
        name: dbProd.name,
        description: dbProd.description,
        price: dbProd.price.toString(),
      }));
    }
  });

  test('TC02: Verify product details match DB for Sauce Labs Backpack', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await products.openProduct('Sauce Labs Backpack');
    const uiDetails = await products.getProductDetails();
    const dbDetails = await db.getProductByName('Sauce Labs Backpack');
    expect(uiDetails.name).toBe(dbDetails.name);
    expect(uiDetails.description).toBe(dbDetails.description);
    expect(uiDetails.price).toBe(dbDetails.price.toString());
  });

  // ...repeat for all other test cases in test_cases.csv...
});
