# Quality Gates Configuration

This document outlines the quality gates and automated checks in this project.

## Quality Gates Overview

The project implements a multi-layered quality gate system to maintain high code standards:

### 1. **Local Development** (Pre-commit Hooks)
- ESLint checks on staged files
- Prettier formatting validation
- TypeScript type checking

### 2. **CI/CD Pipeline** (GitHub Actions)
- TypeScript strict type checking
- Prettier code formatting compliance
- ESLint with zero max-warnings policy
- E2E test execution (3 browsers)
- Report generation and artifacts

## NPM Scripts for Quality Gates

### Quick Quality Check
```bash
npm run qa
# Runs: typecheck → format:check → lint → tests
```

### Individual Checks
```bash
# Type checking
npm run typecheck

# Code formatting
npm run format:check    # Check formatting
npm run format:fix      # Auto-fix formatting

# Linting
npm run lint            # Check with ESLint (zero warnings)
npm run lint:fix        # Auto-fix linting issues

# Testing
npm test                # Run all tests
npm run test:chrome     # Chrome only
npm run test:firefox    # Firefox only
npm run test:webkit     # WebKit only
```

## GitHub Actions Workflow

### Quality Gates Job
1. **TypeScript Type Check** — `npm run typecheck`
   - Ensures all TypeScript files compile without errors
   - Runs in strict mode
   - Must pass before tests run

2. **Prettier Code Format** — `npm run format:check`
   - Validates code matches Prettier rules
   - Consistent formatting across team
   - Must pass before tests run

3. **ESLint (Zero Warnings)** — `npm run lint`
   - Checks TypeScript code for issues
   - **Zero max-warnings policy** — any warning blocks merge
   - Enforces best practices
   - Must pass before tests run

### Test Job
- Depends on: Quality Gates job
- Runs E2E tests on 3 browsers in parallel
- Must pass before merge to main/develop

### Report Merging Job
- Combines reports from all browser runs
- Creates unified HTML report
- Uploads artifacts (30-day retention)

## ESLint Configuration

**File:** `eslint.config.js`

### Key Rules
- ✅ `@typescript-eslint/no-explicit-any` — Error (strict typing)
- ✅ `@typescript-eslint/no-unused-vars` — Error (clean code)
- ✅ `eqeqeq` — Error (use === not ==)
- ✅ `no-var` — Error (use const/let)
- ✅ `prefer-const` — Error (const before let)
- ✅ `no-console` — Warn (except warn/error)
- ✅ `no-debugger` — Error (remove debug statements)

### Ignored Paths
- `node_modules/`
- `playwright-report/`
- `test-results/`

## Prettier Configuration

**File:** `.prettierrc.json`

```json
{
  "semi": true,              // Semicolons required
  "singleQuote": true,       // Single quotes in strings
  "printWidth": 100,         // Line length limit
  "trailingComma": "es5",    // Trailing commas
  "tabWidth": 2,            // 2-space indentation
  "arrowParens": "always"   // Parentheses on arrow function params
}
```

## TypeScript Configuration

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,         // Full strict mode
    "target": "ES2020",
    "module": "ESNext"
  }
}
```

## Setting Up Pre-commit Hooks (Optional)

For local enforcement before pushing:

```bash
# 1. Install Husky
npm install husky --save-dev
npx husky install

# 2. Create pre-commit hook
npx husky add .husky/pre-commit "npm run format:fix && npm run lint:fix"

# 3. Create pre-push hook
npx husky add .husky/pre-push "npm run qa"
```

## Troubleshooting Quality Gate Failures

### ESLint Errors
```bash
# View all issues
npm run lint

# Auto-fix fixable issues
npm run lint:fix

# If still failing, manually review and fix issues identified by lint
```

### Prettier Formatting
```bash
# Check what's wrong
npm run format:check

# Auto-fix all formatting
npm run format:fix
```

### TypeScript Errors
```bash
# View type errors
npm run typecheck

# Fix by reviewing error messages and updating code
# Common fixes:
# - Add explicit return types to functions
# - Remove 'any' type annotations
# - Fix unused variables
```

### Test Failures
```bash
# Run tests in debug mode
npm run test:debug

# Run in UI mode (interactive)
npm run test:ui

# Check specific browser
npm run test:chrome -- --headed
```

## Quality Gate Policies

### Zero Warnings Policy
- ESLint configured with `--max-warnings 0`
- Any warning causes build failure
- Helps maintain code quality over time
- Prevents small issues from accumulating

### Strict TypeScript
- `strict: true` in tsconfig.json
- No implicit any types
- Full type safety
- Prevents runtime errors

### Code Formatting
- Prettier enforced for consistency
- Reduces style debates
- Improves PR review experience

## CI/CD Integration

### Branch Protection Rules (Recommended GitHub Settings)
```
Main & Develop Branches:
✅ Require status checks to pass before merging
  - quality-gates job
  - test job
✅ Require code reviews before merging
✅ Dismiss stale pull request approvals
✅ Require branches to be up to date before merging
```

## Future Enhancements

- [ ] SonarQube integration for code metrics
- [ ] Code coverage reporting
- [ ] Security scanning (dependabot)
- [ ] Performance budgets (Lighthouse)
- [ ] Automated release notes

## Related Documentation

- [ESLint Configuration](https://eslint.org/docs/latest/rules/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Husky Pre-commit Hooks](https://typicode.github.io/husky/)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
