# Test Scenarios for PR Checks

This document provides specific examples you can use to test different aspects of the PR checks sandbox.

## 1. Testing Successful PR Flow

### Changes to make:
1. Add a new function to `src/index.js`:
```javascript
function multiply(a, b) {
    return a * b;
}
module.exports = { greet, calculate, multiply };
```

2. Add corresponding test in `tests/index.test.js`:
```javascript
describe('multiply function', () => {
    test('should multiply two numbers', () => {
        expect(multiply(3, 4)).toBe(12);
    });
});
```

### Expected outcome:
- All checks should pass ✅
- PR can be merged after review

## 2. Testing Linting Failures

### Changes to make:
Add this poorly formatted code to `src/index.js`:
```javascript
function badFunction( ) {
var x=1
    return x
}
```

### Expected outcome:
- Lint check will fail ❌
- PR cannot be merged until fixed

## 3. Testing Test Failures

### Changes to make:
Modify the `greet` function in `src/index.js`:
```javascript
function greet(name) {
    return `Hi, ${name}!`; // Changed from "Hello" to "Hi"
}
```

### Expected outcome:
- Tests will fail ❌
- PR cannot be merged until tests are updated

## 4. Testing Security Scanning

### Changes to make:
Add a file with potential secrets:
```javascript
// src/config.js
const config = {
    apiKey: 'sk-1234567890abcdef', // This looks like a secret
    password: 'super-secret-password',
    token: 'github_pat_abcdef123456'
};
```

### Expected outcome:
- Security scan may flag potential secrets ⚠️
- Manual review recommended

## 5. Testing PR Title Validation

### Valid PR titles:
- `feat: add new multiplication function`
- `fix: resolve calculation edge case`
- `docs: update README with examples`
- `test: add coverage for edge cases`

### Invalid PR titles:
- `update stuff` (no type prefix)
- `WIP: working on feature` (WIP not allowed)
- `Feature request` (wrong format)

### Expected outcome:
- Valid titles pass validation ✅
- Invalid titles fail PR validation ❌

## 6. Testing File Size/Bundle Checks

### Changes to make:
Add a large file or many dependencies:
```bash
npm install lodash moment axios express
```

### Expected outcome:
- Bundle size check may warn about increased size ⚠️
- Review process should consider impact

## 7. Testing Breaking Changes

### Changes to make:
Modify the `calculate` function signature:
```javascript
function calculate(operation, a, b) { // Changed parameter order
    // ... rest of function
}
```

### Expected outcome:
- PR validation should detect potential breaking change ⚠️
- Manual review required

## 8. Testing Auto-merge (Dependabot)

### How to trigger:
1. Enable Dependabot in repository settings
2. Wait for dependency update PRs
3. Observe auto-merge behavior for patch updates

### Expected outcome:
- Patch updates: auto-approved and merged ✅
- Minor/major updates: require manual review ⚠️

## 9. Testing Manual Approval Process

### How to trigger:
1. Create any PR to main branch
2. The "Requires Manual Approval" job will run
3. It will wait for environment approval

### Setup required:
1. Go to Settings → Environments
2. Create `production-approval` environment
3. Add required reviewers
4. Set deployment timeout

### Expected outcome:
- Job waits for manual approval ⏳
- Reviewer must approve in environment settings
- Job completes after approval ✅

## 10. Testing Scheduled Jobs

### How to trigger:
1. Go to Actions tab
2. Select "Scheduled Checks" workflow
3. Click "Run workflow" button

### Expected outcome:
- Dependency audit runs
- Link checker validates documentation
- Health check tests application startup

## Tips for Testing

1. **Create feature branches**: Always test from feature branches to main
2. **Use draft PRs**: Start with draft PRs to avoid triggering all checks immediately
3. **Check Actions tab**: Monitor workflow runs in real-time
4. **Review logs**: Click into failed jobs to see detailed error messages
5. **Test incrementally**: Make small changes to isolate issues
6. **Use PR template**: Fill out the PR template to practice good habits

## Troubleshooting Common Issues

### Workflows not running:
- Check workflow file syntax with YAML validator
- Verify trigger conditions match your scenario
- Ensure workflows are on the default branch

### Checks not required:
- Verify branch protection rules are configured
- Check that check names match workflow job names exactly
- Ensure you're testing on the protected branch

### Environment approval stuck:
- Verify environment exists and is configured
- Check that you have permission to approve deployments
- Look for pending deployments in Settings → Environments
