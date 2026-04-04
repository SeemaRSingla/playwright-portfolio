import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { CartPage } from '../pages/CartPage'

test.describe('Sauce Labs - Cart Management Tests', () => {
  let loginPage: LoginPage
  let productsPage: ProductsPage
  let cartPage: CartPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)
    cartPage = new CartPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productsPage.goto()
  })

  test('should add and remove items from cart', async () => {
    const names = await productsPage.getProductNames()

    // Add items
    await productsPage.addProductToCart(names[0])
    await productsPage.addProductToCart(names[1])
    await productsPage.addProductToCart(names[2])

    let cartCount = await productsPage.getCartCount()
    expect(cartCount).toBe(3)

    // Navigate to cart
    await productsPage.goToCart()

    // Remove one item
    await cartPage.removeItem(0)
    const cartItems = await cartPage.getCartItemCount()
    expect(cartItems).toBe(2)
  })

  test('should display correct items in cart', async () => {
    const names = await productsPage.getProductNames()
    const selectedProducts = [names[0], names[2]]

    // Add specific products
    for (const name of selectedProducts) {
      await productsPage.addProductToCart(name)
    }

    // Verify in cart
    await productsPage.goToCart()
    const cartItems = await cartPage.getCartItemNames()

    for (const product of selectedProducts) {
      expect(cartItems).toContain(product)
    }
  })

  test('should allow continuing shopping from cart', async ({ page }) => {
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])

    await productsPage.goToCart()
    await cartPage.continueShopping()

    await expect(page).toHaveURL(/.*inventory/)
  })

  test('should maintain cart after navigation', async () => {
    const names = await productsPage.getProductNames()

    // Add items
    await productsPage.addProductToCart(names[0])
    let cartCount = await productsPage.getCartCount()
    expect(cartCount).toBe(1)

    // Navigate away and back
    await productsPage.goto()
    cartCount = await productsPage.getCartCount()
    expect(cartCount).toBe(1)
  })
})
