import { test, expect } from '../fixtures'

test.describe('Sauce Labs - Complete Purchase Flow', () => {
  test.beforeEach(async ({ helper }) => {
    await helper.visitLoginPage()
    await helper.loginWithCredentials('standard_user', 'secret_sauce')
    await helper.visitProductsPage()
  })

  test('should complete full checkout flow', async ({ helper, page }) => {
    // Add products
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])
    await helper.addProductToCart(names[1])

    // Navigate to cart
    await helper.navigateToCart()
    await expect(page).toHaveURL(/.*cart/)

    const cartCount = await helper.getCartPageItemCount()
    expect(cartCount).toBe(2)

    // Proceed to checkout
    await helper.proceedToCheckout()
    await expect(page).toHaveURL(/.*checkout-step-one/)

    // Fill checkout info
    await helper.fillCheckoutInformation('John', 'Doe', '12345')
    await helper.clickCheckoutContinue()
    await expect(page).toHaveURL(/.*checkout-step-two/)

    // Complete order
    await helper.clickCheckoutFinish()
    const isComplete = await helper.isCheckoutComplete()
    expect(isComplete).toBe(true)
  })

  test('should handle checkout with missing first name', async ({ helper }) => {
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])
    await helper.navigateToCart()
    await helper.proceedToCheckout()

    await helper.fillCheckoutInformation('', 'Doe', '12345')
    await helper.clickCheckoutContinue()

    const errorMessage = await helper.getCheckoutErrorMessage()
    expect(errorMessage).toContain('First Name is required')
  })

  test('should handle checkout with missing last name', async ({ helper }) => {
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])
    await helper.navigateToCart()
    await helper.proceedToCheckout()

    await helper.fillCheckoutInformation('John', '', '12345')
    await helper.clickCheckoutContinue()

    const errorMessage = await helper.getCheckoutErrorMessage()
    expect(errorMessage).toContain('Last Name is required')
  })

  test('should handle checkout with missing postal code', async ({ helper }) => {
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])
    await helper.navigateToCart()
    await helper.proceedToCheckout()

    await helper.fillCheckoutInformation('John', 'Doe', '')
    await helper.clickCheckoutContinue()

    const errorMessage = await helper.getCheckoutErrorMessage()
    expect(errorMessage).toContain('Postal Code is required')
  })
})
