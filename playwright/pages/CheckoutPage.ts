import { Page } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly firstNameInput = '[data-test="firstName"]'
  readonly lastNameInput = '[data-test="lastName"]'
  readonly postalCodeInput = '[data-test="postalCode"]'
  readonly continueButton = '[data-test="continue"]'
  readonly finishButton = '[data-test="finish"]'
  readonly cancelButton = '[data-test="cancel"]'
  readonly errorMessage = '[data-test="error"]'
  readonly checkoutCompleteContainer = '[data-test="checkout-complete-container"]'

  constructor(page: Page) {
    this.page = page
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName)
    await this.page.fill(this.lastNameInput, lastName)
    await this.page.fill(this.postalCodeInput, postalCode)
  }

  async clickContinue() {
    await this.page.click(this.continueButton)
    await this.page.waitForLoadState('networkidle')
  }

  async clickFinish() {
    await this.page.click(this.finishButton)
    await this.page.waitForLoadState('networkidle')
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.page.textContent(this.errorMessage)
  }

  async isCheckoutComplete(): Promise<boolean> {
    return await this.page.isVisible(this.checkoutCompleteContainer)
  }

  async getCompleteMessage(): Promise<string | null> {
    return await this.page.textContent(this.checkoutCompleteContainer)
  }
}
