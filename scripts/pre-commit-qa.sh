#!/usr/bin/env bash

# Pre-commit QA checks
# Install with: npx husky add .husky/pre-commit "bash scripts/pre-commit-qa.sh"

set -e

echo "🔍 Running pre-commit quality checks..."

# Check formatting
if ! npm run format:check 2>/dev/null; then
  echo "❌ Prettier formatting issues found"
  echo "   Fix with: npm run format:fix"
  exit 1
fi
echo "✅ Code formatting: OK"

# Check linting
if ! npm run lint 2>/dev/null; then
  echo "❌ ESLint issues found"
  echo "   Fix with: npm run lint:fix"
  exit 1
fi
echo "✅ ESLint: OK"

# Type check
if ! npm run typecheck 2>/dev/null; then
  echo "❌ TypeScript type errors found"
  echo "   Review: npm run typecheck"
  exit 1
fi
echo "✅ TypeScript types: OK"

echo "✅ All pre-commit checks passed!"
