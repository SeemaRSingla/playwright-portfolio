import { Page, expect } from '@playwright/test'

export class ProductsPage {
  readonly page: Page
  readonly productContainer = '[data-test="inventory-list"]'
  readonly productItems = '[data-test="inventory-item"]'
  readonly sortDropdown = '[data-test="product_sort_container"]'
  readonly addToCartButton = '[data-test="add-to-cart"]'
  readonly cartBadge = '[data-test="shopping-cart-badge"]'
  readonly cartLink = '[data-test="shopping-cart-link"]'

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/inventory.html')
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productItems).count()
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents()
  }

  async addProductToCart(productName: string) {
    const productElement = this.page.locator(this.productItems).filter({ hasText: productName })
    await productElement.locator(this.addToCartButton).click()
  }

  async sortBy(option: string) {
    await this.page.selectOption(this.sortDropdown, option)
    await this.page.waitForLoadState('networkidle')
  }

  async getCartCount(): Promise<number> {
    const badge = await this.page.textContent(this.cartBadge)
    return badge ? parseInt(badge) : 0
  }

  async goToCart() {
    await this.page.click(this.cartLink)
    await this.page.waitForLoadState('networkidle')
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents()
    return prices.map((price) => parseFloat(price.replace('$', '')))
  }
}
