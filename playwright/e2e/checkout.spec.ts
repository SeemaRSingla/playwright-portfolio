import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'

test.describe('Sauce Labs - Complete Purchase Flow', () => {
  let loginPage: LoginPage
  let productsPage: ProductsPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productsPage.goto()
  })

  test('should complete full checkout flow', async ({ page }) => {
    // Add products
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])
    await productsPage.addProductToCart(names[1])

    // Navigate to cart
    await productsPage.goToCart()
    await expect(page).toHaveURL(/.*cart/)

    const cartCount = await cartPage.getCartItemCount()
    expect(cartCount).toBe(2)

    // Proceed to checkout
    await cartPage.proceedToCheckout()
    await expect(page).toHaveURL(/.*checkout-step-one/)

    // Fill checkout info
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345')
    await checkoutPage.clickContinue()
    await expect(page).toHaveURL(/.*checkout-step-two/)

    // Complete order
    await checkoutPage.clickFinish()
    const isComplete = await checkoutPage.isCheckoutComplete()
    expect(isComplete).toBe(true)
  })

  test('should handle checkout with missing first name', async () => {
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])
    await productsPage.goToCart()
    await cartPage.proceedToCheckout()

    await checkoutPage.fillCheckoutInfo('', 'Doe', '12345')
    await checkoutPage.clickContinue()

    const errorMessage = await checkoutPage.getErrorMessage()
    expect(errorMessage).toContain('First Name is required')
  })

  test('should handle checkout with missing last name', async () => {
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])
    await productsPage.goToCart()
    await cartPage.proceedToCheckout()

    await checkoutPage.fillCheckoutInfo('John', '', '12345')
    await checkoutPage.clickContinue()

    const errorMessage = await checkoutPage.getErrorMessage()
    expect(errorMessage).toContain('Last Name is required')
  })

  test('should handle checkout with missing postal code', async () => {
    const names = await productsPage.getProductNames()
    await productsPage.addProductToCart(names[0])
    await productsPage.goToCart()
    await cartPage.proceedToCheckout()

    await checkoutPage.fillCheckoutInfo('John', 'Doe', '')
    await checkoutPage.clickContinue()

    const errorMessage = await checkoutPage.getErrorMessage()
    expect(errorMessage).toContain('Postal Code is required')
  })
})
