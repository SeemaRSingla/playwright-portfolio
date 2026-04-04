import { Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartItems = '[data-test="cart-list"]'
  readonly cartItem = '[data-test="cart-item"]'
  readonly checkoutButton = '[data-test="checkout"]'
  readonly continueShoppingButton = '[data-test="continue-shopping"]'
  readonly removeButton = '[data-test="remove"]'
  readonly cartBadge = '[data-test="shopping-cart-badge"]'

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/cart.html')
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator(this.cartItem).count()
  }

  async removeItem(index: number) {
    const items = await this.page.locator(this.removeButton).all()
    await items[index].click()
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents()
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton)
    await this.page.waitForLoadState('networkidle')
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton)
    await this.page.waitForLoadState('networkidle')
  }
}
