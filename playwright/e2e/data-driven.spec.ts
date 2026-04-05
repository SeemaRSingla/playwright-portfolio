import { test, expect } from '../fixtures'
import { TEST_USERS } from '../utils/test-data'

/**
 * Data-Driven Tests - Demonstrates parametrized testing with multiple scenarios
 * Shows senior-level testing practices for comprehensive coverage with minimal code duplication
 */

// Test data for login scenarios
const loginScenarios = [
  {
    username: TEST_USERS.standard_user.username,
    password: TEST_USERS.standard_user.password,
    shouldSucceed: true,
    description: 'Standard user with valid credentials',
    tags: ['@smoke', '@critical'],
  },
  {
    username: TEST_USERS.standard_user.username,
    password: 'wrong_password',
    shouldSucceed: false,
    expectedError: 'Username and password do not match',
    description: 'Invalid password',
    tags: ['@regression'],
  },
  {
    username: TEST_USERS.locked_out_user.username,
    password: TEST_USERS.locked_out_user.password,
    shouldSucceed: false,
    expectedError: 'locked out',
    description: 'Locked out user',
    tags: ['@regression', '@security'],
  },
  {
    username: '',
    password: TEST_USERS.standard_user.password,
    shouldSucceed: false,
    expectedError: 'Username is required',
    description: 'Empty username field',
    tags: ['@regression', '@validation'],
  },
  {
    username: TEST_USERS.standard_user.username,
    password: '',
    shouldSucceed: false,
    expectedError: 'Password is required',
    description: 'Empty password field',
    tags: ['@regression', '@validation'],
  },
]

test.describe('Data-Driven Login Tests @authentication', () => {
  loginScenarios.forEach((scenario) => {
    test(`Login flow: ${scenario.description} ${scenario.tags.join(' ')}`, async ({
      helper,
      page,
    }) => {
      await helper.visitLoginPage()

      // Execute login
      await helper.loginWithCredentials(scenario.username, scenario.password)

      if (scenario.shouldSucceed) {
        // Assert successful navigation
        await expect(page).toHaveURL(/.*inventory/)
      } else {
        // Assert error message
        const errorMessage = await helper.getLoginErrorMessage()
        expect(errorMessage).toContain(scenario.expectedError)
      }
    })
  })
})

// Test data for checkout validation scenarios
const checkoutValidationScenarios = [
  {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
    expectedError: 'First Name is required',
    description: 'Missing first name',
    tags: ['@validation'],
  },
  {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
    expectedError: 'Last Name is required',
    description: 'Missing last name',
    tags: ['@validation'],
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
    expectedError: 'Postal Code is required',
    description: 'Missing postal code',
    tags: ['@validation'],
  },
  {
    firstName: '',
    lastName: '',
    postalCode: '',
    expectedError: 'First Name is required',
    description: 'All fields missing',
    tags: ['@validation', '@edge-case'],
  },
]

test.describe('Data-Driven Checkout Validation @payment', () => {
  checkoutValidationScenarios.forEach((scenario) => {
    test(`Checkout validation: ${scenario.description} ${scenario.tags.join(' ')}`, async ({
      helper,
    }) => {
      // Setup: login and navigate to checkout
      await helper.visitLoginPage()
      await helper.loginWithCredentials(
        TEST_USERS.standard_user.username,
        TEST_USERS.standard_user.password
      )
      await helper.visitProductsPage()

      const names = await helper.getProductNames()
      await helper.addProductToCart(names[0])
      await helper.navigateToCart()

      await helper.proceedToCheckout()

      // Execute: fill checkout form with test data
      await helper.fillCheckoutInformation(
        scenario.firstName,
        scenario.lastName,
        scenario.postalCode
      )
      await helper.clickCheckoutContinue()

      // Assert: verify error message
      const errorMessage = await helper.getCheckoutErrorMessage()
      expect(errorMessage).toContain(scenario.expectedError)
    })
  })
})
