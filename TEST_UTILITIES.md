# Features Reference

## File Structure

```
playwright/
├── e2e/
│   ├── login.spec.ts              # Original tests
│   ├── products.spec.ts           # Original tests
│   ├── cart.spec.ts               # Original tests
│   ├── checkout.spec.ts           # Original tests
│   ├── data-driven.spec.ts        # NEW - Parametrized tests
│   └── accessibility.spec.ts      # NEW - Accessibility testing
├── fixtures/
│   └── auth.ts                    # NEW - Custom fixtures
├── pages/
│   ├── LoginPage.ts               # Updated with JSDoc
│   ├── ProductsPage.ts            # Updated with JSDoc
│   ├── CartPage.ts                # Updated with JSDoc
│   └── CheckoutPage.ts            # Updated with JSDoc
└── utils/
    ├── test-data.ts               # Existing
    └── helpers.ts                 # NEW - Helper utilities
```

---

## Features

### 1. Custom Fixtures
**File:** `playwright/fixtures/auth.ts`

Remove login setup boilerplate from tests:

```typescript
// Without fixture: login setup repeated in each test
test('add to cart', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('user', 'pass')
  // Now do the actual test...
})

// With fixture: login is automatic
import { test } from '../fixtures/auth'

test('add to cart', async ({ page }) => {
  // page is already authenticated
  await page.goto('/inventory.html')
})
```

---

### 2. Data-Driven Tests
**File:** `playwright/e2e/data-driven.spec.ts`

Test multiple scenarios with one test template:

```typescript
const scenarios = [
  { username: 'valid_user', password: 'correct', shouldSucceed: true },
  { username: 'valid_user', password: 'wrong', shouldSucceed: false },
]

scenarios.forEach((scenario) => {
  test(`Login: ${scenario.description}`, async ({ page }) => {
    // Test runs once per scenario
  })
})
```

---

### 3. Helper Utilities
**File:** `playwright/utils/helpers.ts`

Common patterns are extracted into reusable functions:

| Function | Purpose |
|----------|---------|
| `waitForElementStable()` | Element visible + network idle |
| `fillField()` | Safe field filling |
| `clickElement()` | Click + wait for navigation |
| `assertElementText()` | Semantic text check |
| `getAllElementTexts()` | Get multiple texts |
| `takeDebugScreenshot()` | Timestamped screenshot |
| `assertPageUrl()` | URL validation |
| `clearBrowserStorage()` | Clean state |

Usage example:

```typescript
import { fillField, clickElement } from '../utils/helpers'

test('my test', async ({ page }) => {
  await fillField(page, '[data-test="username"]', 'user')
  await clickElement(page, '[data-test="login-button"]')
})
```

---

### 4. Accessibility Testing
**File:** `playwright/e2e/accessibility.spec.ts`

Automated WCAG compliance checks:

```bash
npm test -- accessibility.spec.ts
```

---

### 5. Documentation
**Files:** `LoginPage.ts`, `ProductsPage.ts`, `CartPage.ts`, `CheckoutPage.ts`

JSDoc comments on all Page Objects:

```typescript
/**
 * Add a product to cart by name
 * @param productName - Exact name of product to add
 * @throws Error if product not found
 */
async addProductToCart(productName: string) { ... }
```

JSDoc provides IDE autocomplete, parameter documentation, and usage examples.

---

## Commands Reference

```bash
# Install new dependencies
npm install

# Run all tests with new features
npm test

# Run specific test suite
npm test -- data-driven.spec.ts
npm test -- accessibility.spec.ts

# Run tests by tag
npm test -- --grep "@smoke"
npm test -- --grep "@a11y"
npm test -- --grep "@validation"

# Run with UI (interactive)
npm run test:ui

# Run in debug mode
npm run test:debug

# Run headed (see browser)
npm run test:headed

# Single browser
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

---

## Using These Features

### Custom Fixtures:
Fixtures reduce setup overhead by pre-configuring common states. Instead of repeating authentication in each test, the fixture handles it automatically.

### Data-Driven Tests:
Parametrized testing avoids code duplication. Instead of writing multiple nearly-identical tests for different scenarios, one test template is used with different data sets.

### Helper Utilities:
Extract common patterns into reusable functions to follow the DRY principle and improve readability across the test suite.

### Accessibility Testing:
Automate WCAG compliance checks to catch accessibility issues early in testing.

### Code Quality:
JSDoc comments provide IDE autocomplete and make the codebase self-documenting.

---

## Getting Started

1. Install dependencies: `npm install`
2. Run data-driven tests: `npm test -- data-driven.spec.ts`
3. Run accessibility tests: `npm test -- accessibility.spec.ts`
4. View report: `npx playwright show-report`

---

## Resources

- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Data-Driven Testing](https://playwright.dev/docs/test-parameterize)
- [Accessibility Testing with Axe](https://github.com/abhinaba-ghosh/axe-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [WCAG 2.0 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** April 5, 2026
**Status:** Complete
