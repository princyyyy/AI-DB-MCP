import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async getProductList() {
    return await this.page.$$eval('.inventory_item', items => items.map(item => ({
      name: item.querySelector('.inventory_item_name')?.textContent?.trim() || '',
      description: item.querySelector('.inventory_item_desc')?.textContent?.trim() || '',
      price: item.querySelector('.inventory_item_price')?.textContent?.replace('$','').trim() || '',
      image_url: item.querySelector('.inventory_item_img img')?.getAttribute('src') || ''
    })));
  }

  async openProduct(name: string) {
    await this.page.click(`.inventory_item_name:text("${name}")`);
  }

  async getProductDetails() {
    return {
      name: await this.page.textContent('.inventory_details_name'),
      description: await this.page.textContent('.inventory_details_desc'),
      price: (await this.page.textContent('.inventory_details_price'))?.replace('$','').trim(),
      image_url: await this.page.getAttribute('.inventory_details_img', 'src')
    };
  }

  async addToCart(name: string) {
    await this.page.click(`button[data-test="add-to-cart-${name.toLowerCase().replace(/[^a-z0-9]/g,'-')}"]`);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async getCartDetails() {
    return {
      name: await this.page.textContent('.inventory_item_name'),
      price: (await this.page.textContent('.inventory_item_price'))?.replace('$','').trim(),
      quantity: await this.page.textContent('.cart_quantity')
    };
  }
}
