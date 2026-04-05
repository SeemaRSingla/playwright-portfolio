# Playwright E2E Test Suite

End-to-end tests for the Sauce Labs demo e-commerce application using Playwright with TypeScript.

## Project Overview

This project includes end-to-end tests for the **Sauce Labs demo e-commerce application** using **Playwright** with **TypeScript**. The test suite covers:

- Authentication tests — Login validation, error handling
- Product management — Browsing, filtering, sorting
- Cart operations — Adding/removing items, persistence
- Checkout flow — Complete purchase workflow, validation
- Multi-browser testing — Chrome, Firefox, Safari (WebKit)
- CI/CD integration — GitHub Actions automation

## Features

### Testing Practices
- Factory function pattern (Helpers) — Type-safe, scalable page interactions
- TypeScript — Type-safe, scalable test code
- Parallel execution — Fast test runs across multiple browsers
- Error handling — Screenshots and videos on failure
- **Quality Gates** — ESLint (zero warnings), Prettier formatting, TypeScript strict mode
- Comprehensive coverage — 20+ test cases across 6 test suites

### Project Structure
```
playwright/
├── fixtures.ts                   # Custom test fixtures
├── e2e/                          # Test specifications
│   ├── login.spec.ts             # Authentication tests
│   ├── products.spec.ts          # Product page tests
│   ├── cart.spec.ts              # Cart management tests
│   ├── checkout.spec.ts          # Checkout flow tests
│   ├── data-driven.spec.ts       # Parametrized test examples
│   └── accessibility.spec.ts     # WCAG a11y compliance tests
├── pages/
│   └── Helpers.ts                # Consolidated helper methods
├── test-data/
│   └── testdata.json             # JSON-based test data
└── utils/
    └── test-data.ts              # Test data imports
```

## Quick Start

### Prerequisites
- Node.js 20.x
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/playwright-portfolio.git
cd playwright-portfolio

# Install dependencies

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run in debug mode
npm run test:debug

# Run in UI mode (interactive)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed
```

## Quality Gates

The project enforces automated quality checks to maintain high code standards:

### Quality Gate Commands

```bash
# Comprehensive quality check (type → format → lint → test)
npm run qa

# Individual checks
npm run typecheck           # TypeScript strict type checking
npm run format:check        # Prettier formatting validation
npm run format:fix          # Auto-fix formatting
npm run lint                # ESLint with zero max-warnings
npm run lint:fix            # Auto-fix linting issues
```

### Quality Gate Policies

| Gate | Tool | Policy | Impact |
|------|------|--------|--------|
| **Type Safety** | TypeScript | Strict mode, no implicit any | Build fails on type errors |
| **Code Formatting** | Prettier | Consistent style | Build fails on format violations |
| **Linting** | ESLint | Zero max-warnings | Any warning blocks merge |

### CI/CD Quality Gates

All quality gates run automatically in GitHub Actions (`.github/workflows/test.yml`):

1. **TypeScript Type Check** — Validates type safety
2. **Prettier Format Check** — Enforces code style
3. **ESLint (Zero Warnings)** — Checks code quality
4. **E2E Tests** — Runs browser tests (only if gates pass)

**Branch Protection:** PRs cannot merge until all quality gates pass.

### Setting Up Local Pre-commit Hooks (Optional)

Enforce quality gates before pushing code:

```bash
# Install Husky
npm install husky --save-dev

# Setup hooks
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "bash scripts/pre-commit-qa.sh"
```

View detailed configuration: [QUALITY_GATES.md](./QUALITY_GATES.md)

## Test Suites

### 1. Login Tests (`login.spec.ts`)
Authentication scenarios:
- - Login form validation
- - Successful login with valid credentials
- - Invalid password rejection
- - Locked user account handling
- - Empty field validation

### 2. Products Tests (`products.spec.ts`)
Product page functionality:
- - Product list display
- - Product information retrieval
- - Add to cart functionality
- - Multiple item management
- - Sorting: Price (low→high, high→low)
- - Sorting: A→Z, Z→A
- - Cart navigation

### 3. Cart Tests (`cart.spec.ts`)
Shopping cart operations:
- - Add and remove items
- - Correct item display
- - Continue shopping navigation
- - Cart persistence after navigation

### 4. Checkout Tests (`checkout.spec.ts`)
Purchase flow validation:
- - Full checkout workflow (login → products → cart → checkout → confirmation)
- - First name validation
- - Last name validation
- - Postal code validation
- - Order completion verification

## Architecture

### Page Object Model Pattern
Each page is represented as a class with:
- **Locators** — CSS selectors for page elements
- **Methods** — User actions (login, addToCart, etc.)
- **Assertions** — Visibility and state checks

Example:
```typescript
export class LoginPage {
  readonly page: Page
  readonly usernameInput = '[data-test="username"]'
  
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username)
    // ... more actions
  }
}
```

## Modular Test Structure

Tests are organized by functionality:
- Each test suite is independent
- Setup/teardown handled via `beforeEach` hooks
- Clear, descriptive test names
- Assertions are semantic and readable

## CI/CD Pipeline

GitHub Actions workflow (`test.yml`):
- Runs on every push and PR
- Tests across 3 browsers (Chrome, Firefox, Safari)
- Generates HTML reports
- Artifacts retained for 30 days

Workflow includes:
1. Setup Node.js environment
2. Install dependencies
3. Install Playwright browsers
4. Run tests in parallel
5. Generate reports
6. Merge and upload artifacts

## 📈 Test Results & Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Report includes:
- - Test duration and status
- - Screenshots on failure
- - Video recordings (on failure)
- - Browser traces for debugging
- - Error messages and stack traces


The test suite demonstrates:
- Clean separation of concerns with Page Objects
- Type safety through TypeScript
- Scalable architecture for test management
- Cross-browser coverage
- CI/CD automation for continuous validation

References for these patterns:
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## 🛠️ Technology Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Playwright | ^1.40.1 | E2E Testing Framework |
| TypeScript | ^5.3.3 | Type-safe test code |
| Node.js | 20.x | Runtime |
| GitHub Actions | Latest | CI/CD Automation |
| axe-playwright | ^1.2.3 | Accessibility Testing |

---

## Advanced Features

### 1. Custom Fixtures (`playwright/fixtures/auth.ts`)
Pre-configured test setup reduces boilerplate:
```typescript
// Without fixture: login setup repeated in each test
test('add to cart', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('user', 'pass')
  // Now test...
})

// With fixture: authentication is automatic
import { test } from '../fixtures/auth'

test('add to cart', async ({ page }) => {
  // Page is already authenticated
  await productsPage.addProductToCart('Backpack')
})

### 2. Data-Driven Tests (`playwright/e2e/data-driven.spec.ts`)
Test multiple scenarios with one test template:
```typescript
const scenarios = [
  { username: 'valid_user', shouldSucceed: true },
  { username: '', shouldSucceed: false },
]

scenarios.forEach((scenario) => {
  test(`Login: ${scenario.description}`, async ({ page }) => {
    // Test runs once per scenario
  })
})
```

### 3. Helper Utilities (`playwright/utils/helpers.ts`)
Common operations extracted as reusable functions:
```typescript
// Without helpers: repetitive boilerplate
await page.locator(selector).waitFor({ state: 'visible' })
await page.locator(selector).fill(value)

// With helpers: cleaner test code
await fillField(page, selector, value)
```

Available helpers:
- `waitForElementStable()` — Wait for element visibility + network idle
- `fillField()` — Robust field filling
- `clickElement()` — Click with navigation wait
- `assertElementText()` — Text assertions
- `getAllElementTexts()` — Get multiple texts
- `takeDebugScreenshot()` — Timestamped screenshots
- `assertPageUrl()` — URL validation
- `clearBrowserStorage()` — Clean browser state

### 4. **Accessibility Testing** (`playwright/e2e/accessibility.spec.ts`)
Automated WCAG 2.0 Level AA compliance testing:
```typescript
test('Login page should be accessible', async ({ page }) => {
  await injectAxe(page)
  await checkA11y(page) // Scans for violations
})
```

Covers:
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios
- ARIA labels and roles
- Form field accessibility
- Focus management\n\n### 5. Test Tagging & Organization
Tests are tagged for flexible execution:
```bash
# Run only smoke tests
npm test -- --grep "@smoke"

# Run critical tests only
npm test -- --grep "@critical"

# Run regression but skip slow tests
npm test -- --grep "@regression" --grep -v "@slow"
```

Available Tags:
- `@smoke` — Quick validation tests
- `@critical` — Essential functionality
- `@regression` — Comprehensive scenarios
- `@validation` — Form/input validation
- `@security` — Security-related tests
- `@a11y` — Accessibility tests
- `@wcag2a`, `@wcag2aa` — WCAG compliance levels
- `@slow`, `@fast` — Performance categories

### 6. Documentation

All Page Objects include JSDoc comments:
- Class documentation with examples
- Method descriptions and parameters
- Return type documentation
- Usage examples
- Throws documentation for error cases

```typescript
/**
 * Add a product to cart by name
 * @param productName - Exact name of product to add
 * @throws Error if product with given name is not found
 * @example await productsPage.addProductToCart('Backpack')
 */
async addProductToCart(productName: string) { ... }
```

---

## Running Tests


```bash
```

### Run Specific Test Suites
```bash
# Run data-driven tests
npm test -- data-driven.spec.ts

# Run accessibility tests
npm test -- accessibility.spec.ts --headed

# Run tests with specific tag
npm test -- --grep "@a11y"

# Run in debug mode with UI
npm run test:debug

# Run with UI browser (interactive)
npm run test:ui
```

### Generate Reports
```bash
# View HTML report
npx playwright show-report

# View accessibility test results
npm test -- accessibility.spec.ts --headed
```

---

## Contributing

To extend the test suite:
- Add more test scenarios
- Test different applications
- Extend CI/CD pipeline
- Add performance testing

## License

MIT License

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Sauce Labs Demo App](https://www.saucedemo.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
