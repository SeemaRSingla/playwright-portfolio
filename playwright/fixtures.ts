import { test as base, Page } from '@playwright/test'
import { Helper } from './pages/Helpers'

/**
 * Custom fixture for authenticated user sessions
 * Provides pre-logged-in page state using the Helper factory pattern
 */
type AuthenticatedPage = {
  page: Page
  helper: ReturnType<typeof Helper>
}

export const test = base.extend<AuthenticatedPage>({
  /**
   * Fixture: Page instance (no pre-authentication)
   * Tests handle their own login flow via beforeEach
   */
  page: async ({ page }, use) => {
    await use(page)
  },

  /**
   * Fixture: Helper instance bound to the page
   */
  helper: async ({ page }, use) => {
    const helper = Helper(page)
    await use(helper)
  },
})

export { expect } from '@playwright/test'
