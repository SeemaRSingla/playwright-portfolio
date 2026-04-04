# Playwright E2E Testing Portfolio

A comprehensive Playwright testing portfolio showcasing modern E2E testing practices, automation strategies, and test architecture.

## 📋 Project Overview

This project demonstrates end-to-end testing of the **Sauce Labs demo e-commerce application** using **Playwright** with **TypeScript**. It includes a complete test suite covering:

- ✅ **Authentication Tests** — Login validation, error handling
- ✅ **Product Management** — Browsing, filtering, sorting
- ✅ **Cart Operations** — Adding/removing items, persistence
- ✅ **Checkout Flow** — Complete purchase workflow, validation
- ✅ **Multi-browser Testing** — Chrome, Firefox, Safari (WebKit)
- ✅ **CI/CD Integration** — GitHub Actions automation

## 🎯 Key Features

### Testing Practices
- **Page Object Model (POM)** — Clean, maintainable test architecture
- **TypeScript** — Type-safe, scalable test code
- **Parallel Execution** — Fast test runs across multiple browsers
- **Error Handling** — Screenshots and videos on failure
- **Comprehensive Coverage** — 20+ test cases across 4 test suites

### Test Organization
```
playwright/
├── e2e/                          # Test specifications
│   ├── login.spec.ts             # Authentication tests (6 tests)
│   ├── products.spec.ts          # Product page tests (8 tests)
│   ├── cart.spec.ts              # Cart management tests (4 tests)
│   └── checkout.spec.ts          # Checkout flow tests (5 tests)
└── pages/                        # Page Object Models
    ├── LoginPage.ts
    ├── ProductsPage.ts
    ├── CartPage.ts
    └── CheckoutPage.ts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (I used 20.x)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/playwright-portfolio.git
cd playwright-portfolio

# Install dependencies
npm install

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

## 📊 Test Suites

### 1. Login Tests (`login.spec.ts`)
Tests authentication scenarios:
- ✓ Login form validation
- ✓ Successful login with valid credentials
- ✓ Invalid password rejection
- ✓ Locked user account handling
- ✓ Empty field validation

### 2. Products Tests (`products.spec.ts`)
Tests product page functionality:
- ✓ Product list display
- ✓ Product information retrieval
- ✓ Add to cart functionality
- ✓ Multiple item management
- ✓ Sorting: Price (low→high, high→low)
- ✓ Sorting: A→Z, Z→A
- ✓ Cart navigation

### 3. Cart Tests (`cart.spec.ts`)
Tests shopping cart operations:
- ✓ Add and remove items
- ✓ Correct item display
- ✓ Continue shopping navigation
- ✓ Cart persistence after navigation

### 4. Checkout Tests (`checkout.spec.ts`)
Tests complete purchase flow:
- ✓ Full checkout workflow (login → products → cart → checkout → confirmation)
- ✓ First name validation
- ✓ Last name validation
- ✓ Postal code validation
- ✓ Order completion verification

## 🏗️ Architecture

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

### Modular Test Structure
Tests are organized by functionality:
- Each test suite is independent
- Setup/teardown handled via `beforeEach` hooks
- Clear, descriptive test names
- Assertions are semantic and readable

## 🔄 CI/CD Pipeline

**GitHub Actions Workflow** (`test.yml`):
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
- ✓ Test duration and status
- ✓ Screenshots on failure
- ✓ Video recordings (on failure)
- ✓ Browser traces for debugging
- ✓ Error messages and stack traces

## 🎓 Why This Portfolio?

### Demonstrates Professional QA Skills:
1. **Best Practices** — POM, TypeScript, modular design
2. **Real Workflows** — Complete e-commerce scenarios
3. **Scale & Quality** — 20+ tests, comprehensive coverage
4. **Modern Tools** — Playwright, GitHub Actions, HTML reports
5. **Code Quality** — Type-safe, well-organized, maintainable
6. **Multi-browser** — Cross-platform testing capability
7. **CI/CD** — Automated testing pipeline

### Interview Talking Points:
- *"I structured tests using Page Object Model for maintainability"*
- *"Tests run in parallel across 3 browsers in ~2 minutes via GitHub Actions"*
- *"Each test is independent and focused on one user scenario"*
- *"I use TypeScript for type safety and better code organization"*
- *"Tests include proper error handling with screenshots/videos on failure"*

## 🛠️ Technology Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Playwright | ^1.40.1 | E2E Testing Framework |
| TypeScript | ^5.3.3 | Type-safe test code |
| Node.js | 20.x | Runtime |
| GitHub Actions | Latest | CI/CD Automation |

## 🤝 Contributing

This is a portfolio project. Feel free to fork and:
- Add more test scenarios
- Test different applications
- Extend CI/CD pipeline
- Add performance testing
- Implement custom fixtures

## 📝 License

MIT License - feel free to use this as a template

## 👤 Author

**Your Name**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Sauce Labs Demo App](https://www.saucedemo.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## 🚦 Project Status

✅ **Complete & Ready for Interview**
- All tests passing
- CI/CD configured
- Documentation complete
- Ready to showcase

---

**Last Updated:** April 4, 2026
