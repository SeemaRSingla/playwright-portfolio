import { Page, expect } from '@playwright/test'

/**
 * Common helper utilities for E2E tests
 * Reduces code duplication and improves maintainability
 */

/**
 * Wait for element to be visible and stable (no animation)
 * @param page - Playwright page object
 * @param selector - CSS selector or locator
 * @param timeout - Optional timeout in ms (default: 30000)
 */
export async function waitForElementStable(page: Page, selector: string, timeout = 30000) {
  const locator = page.locator(selector)
  await locator.waitFor({ state: 'visible', timeout })
  await page.waitForLoadState('networkidle')
  await locator.boundingBox() // Ensures element is in viewport and ready
}

/**
 * Fill form field with wait for visibility
 * @param page - Playwright page object
 * @param selector - CSS selector for input field
 * @param value - Value to fill
 * @param timeout - Optional timeout in ms
 */
export async function fillField(page: Page, selector: string, value: string, timeout = 30000) {
  const field = page.locator(selector)
  await field.waitFor({ state: 'visible', timeout })
  await field.fill(value)
}

/**
 * Click element with wait for visibility and loadState
 * @param page - Playwright page object
 * @param selector - CSS selector
 * @param timeout - Optional timeout in ms
 */
export async function clickElement(page: Page, selector: string, timeout = 30000) {
  const element = page.locator(selector)
  await element.waitFor({ state: 'visible', timeout })
  await element.click({ timeout })
  await page.waitForLoadState('networkidle')
}

/**
 * Assert element contains exact text
 * @param page - Playwright page object
 * @param selector - CSS selector
 * @param expectedText - Expected text content
 */
export async function assertElementText(page: Page, selector: string, expectedText: string) {
  const locator = page.locator(selector)
  await expect(locator).toContainText(expectedText)
}

/**
 * Get all text from elements matching selector
 * @param page - Playwright page object
 * @param selector - CSS selector
 * @returns Array of text content
 */
export async function getAllElementTexts(page: Page, selector: string): Promise<string[]> {
  return await page.locator(selector).allTextContents()
}

/**
 * Take screenshot for debugging/comparison
 * @param page - Playwright page object
 * @param name - Descriptive name for screenshot
 * @returns Path to saved screenshot
 */
export async function takeDebugScreenshot(page: Page, name: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `debug-${name}-${timestamp}.png`
  await page.screenshot({ path: `test-results/${filename}` })
  return filename
}

/**
 * Verify page URL contains expected path
 * @param page - Playwright page object
 * @param urlPattern - URL pattern or regex
 */
export async function assertPageUrl(page: Page, urlPattern: string | RegExp) {
  await expect(page).toHaveURL(urlPattern)
}

/**
 * Clear all browser storage (cookies, localStorage, sessionStorage)
 * @param page - Playwright page object
 */
export async function clearBrowserStorage(page: Page) {
  await page.context().clearCookies()
  await page.evaluate(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
}
