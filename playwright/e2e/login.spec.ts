import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Sauce Labs - Login Tests', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('[data-test="username"]')).toBeVisible()
    await expect(page.locator('[data-test="password"]')).toBeVisible()
    await expect(page.locator('[data-test="login-button"]')).toBeVisible()
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/.*inventory/)
  })

  test('should reject invalid password', async () => {
    await loginPage.login('standard_user', 'wrong_password')
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain('Username and password do not match')
  })

  test('should show error for locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce')
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain('locked out')
  })

  test('should display error message for empty username', async () => {
    await loginPage.login('', 'secret_sauce')
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain('Username is required')
  })

  test('should show error for empty password', async () => {
    await loginPage.login('standard_user', '')
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain('Password is required')
  })
})
