import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'

test.describe('Sauce Labs - Products Page Tests', () => {
  let loginPage: LoginPage
  let productsPage: ProductsPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productsPage.goto()
  })

  test('should display products list', async () => {
    const count = await productsPage.getProductCount()
    expect(count).toBeGreaterThan(0)
  })

  test('should display product names', async () => {
    const names = await productsPage.getProductNames()
    expect(names.length).toBeGreaterThan(0)
    expect(names[0]).toBeTruthy()
  })

  test('should add product to cart', async () => {
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])

    const cartCount = await productsPage.getCartCount()
    expect(cartCount).toBe(1)
  })

  test('should add multiple products to cart', async () => {
    const names = await productsPage.getProductNames()

    await productsPage.addProductToCart(names[0])
    await productsPage.addProductToCart(names[1])

    const cartCount = await productsPage.getCartCount()
    expect(cartCount).toBe(2)
  })

  test('should sort products by price low to high', async () => {
    await productsPage.sortBy('lohi')
    const prices = await productsPage.getProductPrices()

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
    }
  })

  test('should sort products by price high to low', async () => {
    await productsPage.sortBy('hilo')
    const prices = await productsPage.getProductPrices()

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1])
    }
  })

  test('should sort products A to Z', async () => {
    await productsPage.sortBy('az')
    const names = await productsPage.getProductNames()

    const sortedNames = [...names].sort()
    expect(names).toEqual(sortedNames)
  })

  test('should navigate to cart', async ({ page }) => {
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])

    await productsPage.goToCart()
    await expect(page).toHaveURL(/.*cart/)
  })
})
