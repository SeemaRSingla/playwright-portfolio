import { test, expect } from '../fixtures'

test.describe('Sauce Labs - Products Page Tests', () => {
  test.beforeEach(async ({ helper }) => {
    await helper.visitLoginPage()
    await helper.loginWithCredentials('standard_user', 'secret_sauce')
    await helper.visitProductsPage()
  })

  test('should display products list', async ({ helper }) => {
    const count = await helper.getProductCount()
    expect(count).toBeGreaterThan(0)
  })

  test('should display product names', async ({ helper }) => {
    const names = await helper.getProductNames()
    expect(names.length).toBeGreaterThan(0)
    expect(names[0]).toBeTruthy()
  })

  test('should add product to cart', async ({ helper }) => {
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])

    const cartCount = await helper.getCartItemCount()
    expect(cartCount).toBe(1)
  })

  test('should add multiple products to cart', async ({ helper }) => {
    const names = await helper.getProductNames()

    await helper.addProductToCart(names[0])
    await helper.addProductToCart(names[1])

    const cartCount = await helper.getCartItemCount()
    expect(cartCount).toBe(2)
  })

  test('should sort products by price low to high', async ({ helper }) => {
    await helper.sortProductsBy('lohi')
    const prices = await helper.getProductPrices()

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
    }
  })

  test('should sort products by price high to low', async ({ helper }) => {
    await helper.sortProductsBy('hilo')
    const prices = await helper.getProductPrices()

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1])
    }
  })

  test('should sort products A to Z', async ({ helper }) => {
    await helper.sortProductsBy('az')
    const names = await helper.getProductNames()

    const sortedNames = [...names].sort()
    expect(names).toEqual(sortedNames)
  })

  test('should navigate to cart', async ({ helper, page }) => {
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])

    await helper.navigateToCart()
    await expect(page).toHaveURL(/.*cart/)
  })
})
