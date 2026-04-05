import { test, expect } from '../fixtures'

test.describe('Sauce Labs - Login Tests', () => {
  test.beforeEach(async ({ helper }) => {
    await helper.visitLoginPage()
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('[data-test="username"]')).toBeVisible()
    await expect(page.locator('[data-test="password"]')).toBeVisible()
    await expect(page.locator('[data-test="login-button"]')).toBeVisible()
  })

  test('should login successfully with valid credentials', async ({ helper, page }) => {
    await helper.loginWithCredentials('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/.*inventory/)
  })

  test('should reject invalid password', async ({ helper }) => {
    await helper.loginWithCredentials('standard_user', 'wrong_password')
    const errorMessage = await helper.getLoginErrorMessage()
    expect(errorMessage).toContain('Username and password do not match')
  })

  test('should show error for locked out user', async ({ helper }) => {
    await helper.loginWithCredentials('locked_out_user', 'secret_sauce')
    const errorMessage = await helper.getLoginErrorMessage()
    expect(errorMessage).toContain('locked out')
  })

  test('should display error message for empty username', async ({ helper }) => {
    await helper.loginWithCredentials('', 'secret_sauce')
    const errorMessage = await helper.getLoginErrorMessage()
    expect(errorMessage).toContain('Username is required')
  })

  test('should show error for empty password', async ({ helper }) => {
    await helper.loginWithCredentials('standard_user', '')
    const errorMessage = await helper.getLoginErrorMessage()
    expect(errorMessage).toContain('Password is required')
  })
})
