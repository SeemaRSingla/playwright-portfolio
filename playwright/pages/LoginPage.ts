import { Page, expect } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput = '[data-test="username"]'
  readonly passwordInput = '[data-test="password"]'
  readonly loginButton = '[data-test="login-button"]'
  readonly errorMessage = '[data-test="error"]'

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/')
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username)
    await this.page.fill(this.passwordInput, password)
    await this.page.click(this.loginButton)
    await this.page.waitForLoadState('networkidle')
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.page.textContent(this.errorMessage)
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.page.isVisible(this.errorMessage)
  }
}
