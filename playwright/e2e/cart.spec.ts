import { test, expect } from '../fixtures'

test.describe('Sauce Labs - Cart Management Tests', () => {
  test.beforeEach(async ({ helper }) => {
    await helper.visitLoginPage()
    await helper.loginWithCredentials('standard_user', 'secret_sauce')
    await helper.visitProductsPage()
  })

  test('should add and remove items from cart', async ({ helper }) => {
    const names = await helper.getProductNames()

    // Add items
    await helper.addProductToCart(names[0])
    await helper.addProductToCart(names[1])
    await helper.addProductToCart(names[2])

    const cartCount = await helper.getCartItemCount()
    expect(cartCount).toBe(3)

    // Navigate to cart
    await helper.navigateToCart()

    // Remove one item
    await helper.removeItemFromCart(0)
    const cartItems = await helper.getCartPageItemCount()
    expect(cartItems).toBe(2)
  })

  test('should display correct items in cart', async ({ helper }) => {
    const names = await helper.getProductNames()
    const selectedProducts = [names[0], names[2]]

    // Add specific products
    for (const name of selectedProducts) {
      await helper.addProductToCart(name)
    }

    // Verify in cart
    await helper.navigateToCart()
    const cartItems = await helper.getCartItemNames()

    for (const product of selectedProducts) {
      expect(cartItems).toContain(product)
    }
  })

  test('should allow continuing shopping from cart', async ({ helper, page }) => {
    const names = await helper.getProductNames()
    await helper.addProductToCart(names[0])

    await helper.navigateToCart()
    await helper.continueShopping()

    await expect(page).toHaveURL(/.*inventory/)
  })

  test('should maintain cart after navigation', async ({ helper }) => {
    const names = await helper.getProductNames()

    // Add items
    await helper.addProductToCart(names[0])
    let cartCount = await helper.getCartItemCount()
    expect(cartCount).toBe(1)

    // Navigate away and back
    await helper.visitProductsPage()
    cartCount = await helper.getCartItemCount()
    expect(cartCount).toBe(1)
  })
})
