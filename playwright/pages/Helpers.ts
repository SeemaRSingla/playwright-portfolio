import { Page } from '@playwright/test'

/**
 * Helper interface - Type-safe definition of all available page interactions
 * Organized by feature area (Login, Products, Cart, Checkout)
 */
export type Helper = {
  // Login methods
  visitLoginPage: () => Promise<void>
  loginWithCredentials: (username: string, password: string) => Promise<void>
  getLoginErrorMessage: () => Promise<string | null>
  isLoginErrorDisplayed: () => Promise<boolean>

  // Products page methods
  visitProductsPage: () => Promise<void>
  getProductCount: () => Promise<number>
  getProductNames: () => Promise<string[]>
  addProductToCart: (productName: string) => Promise<void>
  sortProductsBy: (option: string) => Promise<void>
  getCartItemCount: () => Promise<number>
  navigateToCart: () => Promise<void>
  getProductPrices: () => Promise<number[]>

  // Cart page methods
  visitCartPage: () => Promise<void>
  getCartPageItemCount: () => Promise<number>
  removeItemFromCart: (index: number) => Promise<void>
  getCartItemNames: () => Promise<string[]>
  proceedToCheckout: () => Promise<void>
  continueShopping: () => Promise<void>

  // Checkout page methods
  fillCheckoutInformation: (
    firstName: string,
    lastName: string,
    postalCode: string
  ) => Promise<void>
  clickCheckoutContinue: () => Promise<void>
  clickCheckoutFinish: () => Promise<void>
  getCheckoutErrorMessage: () => Promise<string | null>
  isCheckoutComplete: () => Promise<boolean>
  getCheckoutCompleteMessage: () => Promise<string | null>
}

/**
 * Factory function that creates a Helper instance
 * Returns all page interaction methods bound to a specific page instance
 *
 * @param page - Playwright Page instance
 * @returns Helper object with all available methods
 *
 * @example
 * ```typescript
 * const helper = Helper(page)
 * await helper.visitLoginPage()
 * await helper.loginWithCredentials('user', 'pass')
 * ```
 */
export const Helper = (page: Page): Helper => {
  // ====================
  // Login Page Locators
  // ====================
  const usernameInput = page.locator('[data-test="username"]')
  const passwordInput = page.locator('[data-test="password"]')
  const loginButton = page.locator('[data-test="login-button"]')
  const loginErrorMessage = page.locator('[data-test="error"]')

  // ====================
  // Products Page Locators
  // ====================
  const productContainer = page.locator('[data-test="inventory-list"]')
  const productItems = page.locator('[data-test="inventory-item"]')
  const sortDropdown = page.locator('[data-test="product_sort_container"]')
  const cartLink = page.locator('[data-test="shopping-cart-link"]')
  const productNames = page.locator('[data-test="inventory-item-name"]')
  const productPrices = page.locator('[data-test="inventory-item-price"]')

  // ====================
  // Cart Page Locators
  // ====================
  const cartItems = page.locator('[data-test="cart-item"]')
  const checkoutButton = page.locator('[data-test="checkout"]')
  const continueShoppingButton = page.locator('[data-test="continue-shopping"]')
  const removeButtons = page.locator('[data-test="remove"]')

  // ====================
  // Checkout Page Locators
  // ====================
  const firstNameInput = page.locator('[data-test="firstName"]')
  const lastNameInput = page.locator('[data-test="lastName"]')
  const postalCodeInput = page.locator('[data-test="postalCode"]')
  const continueButton = page.locator('[data-test="continue"]')
  const finishButton = page.locator('[data-test="finish"]')
  const checkoutCompleteContainer = page.locator('[data-test="checkout-complete-container"]')

  // ====================
  // Login Methods
  // ====================

  const visitLoginPage = async (): Promise<void> => {
    await page.goto('/')
  }

  const loginWithCredentials = async (username: string, password: string): Promise<void> => {
    await usernameInput.waitFor({ state: 'visible', timeout: 30000 })
    await usernameInput.fill(username)

    await passwordInput.waitFor({ state: 'visible', timeout: 30000 })
    await passwordInput.fill(password)

    await loginButton.waitFor({ state: 'visible', timeout: 30000 })
    await loginButton.click({ timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  const getLoginErrorMessage = async (): Promise<string | null> => {
    return await page.textContent('[data-test="error"]')
  }

  const isLoginErrorDisplayed = async (): Promise<boolean> => {
    return await loginErrorMessage.isVisible()
  }

  // ====================
  // Products Page Methods
  // ====================

  const visitProductsPage = async (): Promise<void> => {
    await page.goto('/inventory.html')
    await productContainer.waitFor({ state: 'visible', timeout: 30000 })
    await productItems.first().waitFor({ state: 'visible', timeout: 30000 })
  }

  const getProductCount = async (): Promise<number> => {
    return await productItems.count()
  }

  const getProductNames = async (): Promise<string[]> => {
    return await productNames.allTextContents()
  }

  const addProductToCart = async (productName: string): Promise<void> => {
    await productContainer.waitFor({ state: 'visible', timeout: 30000 })

    // Find all inventory items
    const items = page.locator('[data-test="inventory-item"]')
    const itemCount = await items.count()

    // Find the item with matching product name
    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i)
      const name = await item.locator('[data-test="inventory-item-name"]').textContent()

      if (name?.trim() === productName.trim()) {
        // Found the product, click its add to cart button
        const addButton = item.locator('[data-test="add-to-cart"]')
        await addButton.waitFor({ state: 'visible', timeout: 30000 })
        await addButton.click()
        return
      }
    }

    // If we get here, product was not found
    throw new Error(`Product "${productName}" not found in inventory`)
  }

  const sortProductsBy = async (option: string): Promise<void> => {
    const selectElement = sortDropdown.locator('select')
    await selectElement.waitFor({ state: 'visible', timeout: 30000 })
    await selectElement.selectOption(option, { timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  const getCartItemCount = async (): Promise<number> => {
    const badge = await page.textContent('[data-test="shopping-cart-badge"]')
    return badge ? parseInt(badge) : 0
  }

  const navigateToCart = async (): Promise<void> => {
    await cartLink.waitFor({ state: 'visible', timeout: 30000 })
    await cartLink.click({ timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  const getProductPrices = async (): Promise<number[]> => {
    const prices = await productPrices.allTextContents()
    return prices.map((price) => parseFloat(price.replace('$', '')))
  }

  // ====================
  // Cart Page Methods
  // ====================

  const visitCartPage = async (): Promise<void> => {
    await page.goto('/cart.html')
  }

  const getCartPageItemCount = async (): Promise<number> => {
    return await cartItems.count()
  }

  const removeItemFromCart = async (index: number): Promise<void> => {
    const items = await removeButtons.all()
    await items[index].waitFor({ state: 'visible', timeout: 30000 })
    await items[index].click({ timeout: 30000 })
  }

  const getCartItemNames = async (): Promise<string[]> => {
    return await page.locator('[data-test="inventory-item-name"]').allTextContents()
  }

  const proceedToCheckout = async (): Promise<void> => {
    await checkoutButton.waitFor({ state: 'visible', timeout: 30000 })
    await checkoutButton.click({ timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  const continueShopping = async (): Promise<void> => {
    await continueShoppingButton.waitFor({ state: 'visible', timeout: 30000 })
    await continueShoppingButton.click({ timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  // ====================
  // Checkout Page Methods
  // ====================

  const fillCheckoutInformation = async (
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> => {
    await firstNameInput.waitFor({ state: 'visible', timeout: 30000 })
    await firstNameInput.fill(firstName)

    await lastNameInput.waitFor({ state: 'visible', timeout: 30000 })
    await lastNameInput.fill(lastName)

    await postalCodeInput.waitFor({ state: 'visible', timeout: 30000 })
    await postalCodeInput.fill(postalCode)
  }

  const clickCheckoutContinue = async (): Promise<void> => {
    await continueButton.waitFor({ state: 'visible', timeout: 30000 })
    await continueButton.click({ timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  const clickCheckoutFinish = async (): Promise<void> => {
    await finishButton.waitFor({ state: 'visible', timeout: 30000 })
    await finishButton.click({ timeout: 30000 })
    await page.waitForLoadState('networkidle')
  }

  const getCheckoutErrorMessage = async (): Promise<string | null> => {
    return await page.textContent('[data-test="error"]')
  }

  const isCheckoutComplete = async (): Promise<boolean> => {
    return await checkoutCompleteContainer.isVisible()
  }

  const getCheckoutCompleteMessage = async (): Promise<string | null> => {
    return await page.textContent('[data-test="checkout-complete-container"]')
  }

  // ====================
  // Return Helper Object
  // ====================

  return {
    // Login
    visitLoginPage,
    loginWithCredentials,
    getLoginErrorMessage,
    isLoginErrorDisplayed,
    // Products
    visitProductsPage,
    getProductCount,
    getProductNames,
    addProductToCart,
    sortProductsBy,
    getCartItemCount,
    navigateToCart,
    getProductPrices,
    // Cart
    visitCartPage,
    getCartPageItemCount,
    removeItemFromCart,
    getCartItemNames,
    proceedToCheckout,
    continueShopping,
    // Checkout
    fillCheckoutInformation,
    clickCheckoutContinue,
    clickCheckoutFinish,
    getCheckoutErrorMessage,
    isCheckoutComplete,
    getCheckoutCompleteMessage,
  }
}
