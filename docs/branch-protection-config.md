# Branch Protection Rules Configuration

This document outlines the recommended branch protection rules for the PR checks sandbox.

## Main Branch Protection

### Required Settings:
- **Require pull request reviews before merging**: ✅
  - Required number of reviewers: 1
  - Dismiss stale reviews when new commits are pushed: ✅
  - Require review from code owners: ✅ (if CODEOWNERS file exists)

- **Require status checks to pass before merging**: ✅
  - Require branches to be up to date before merging: ✅
  - Required status checks:
    - `Lint Code`
    - `Run Tests (18)`
    - `Build Application`
    - `PR Validation`
    - `Security Scan`
    - `Bundle Size Check`

- **Require conversation resolution before merging**: ✅

- **Require signed commits**: ❌ (optional)

- **Require linear history**: ❌ (allows merge commits)

- **Include administrators**: ❌ (admins can bypass rules)

- **Allow force pushes**: ❌

- **Allow deletions**: ❌

## Development Branch Protection (Optional)

For `develop` branch:
- **Require pull request reviews before merging**: ✅
  - Required number of reviewers: 1
- **Require status checks to pass before merging**: ✅
  - Required status checks: `Lint Code`, `Run Tests (18)`

## GitHub CLI Commands

To set up branch protection rules via GitHub CLI:

```bash
# Main branch protection
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Lint Code","Run Tests (18)","Build Application","PR Validation","Security Scan","Bundle Size Check"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null

# Develop branch protection (lighter requirements)
gh api repos/{owner}/{repo}/branches/develop/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Lint Code","Run Tests (18)"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

## Environment Protection Rules

Create an environment called `production-approval` in repository settings:
1. Go to Settings → Environments
2. Create environment: `production-approval`
3. Add required reviewers
4. Set deployment timeout: 30 minutes
5. This environment is used by the "Requires Manual Approval" job in PR checks
