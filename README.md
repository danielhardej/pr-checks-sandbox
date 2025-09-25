# PR Checks Sandbox 🧪

A comprehensive test environment for testing pull request checks that run on GitHub Actions, including check runs that require manual approval and various CI/CD scenarios.

## 🎯 Purpose

This repository serves as a sandbox for:
- Testing GitHub Actions workflows for pull requests
- Demonstrating different types of PR checks and validations  
- Testing branch protection rules and required status checks
- Experimenting with automated and manual approval processes
- Learning how to set up comprehensive CI/CD pipelines

## 🏗️ Project Structure

```
pr-checks-sandbox/
├── .github/
│   ├── workflows/           # GitHub Actions workflow files
│   │   ├── ci.yml          # Main CI pipeline (lint, test, build)
│   │   ├── pr-checks.yml   # PR-specific validation checks
│   │   ├── scheduled-checks.yml  # Nightly and scheduled jobs
│   │   └── auto-merge.yml  # Dependabot auto-merge logic
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md  # PR template
├── src/                    # Source code (simple Node.js app)
├── tests/                  # Test files
├── docs/                   # Documentation
└── package.json           # Project configuration
```

## 🚀 Quick Start

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pr-checks-sandbox.git
   cd pr-checks-sandbox
   ```
3. **Customize configuration** (replace placeholders):
   - Update `.github/dependabot.yml` with your GitHub username
   - Modify workflow files if needed for your specific testing scenarios
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run tests locally**:
   ```bash
   npm test
   npm run lint
   npm run build
   ```

## 🔧 GitHub Actions Workflows

### 1. Continuous Integration (`ci.yml`)
**Triggers**: Push to main/develop, PRs to main/develop
- **Lint Code**: ESLint validation
- **Run Tests**: Jest tests on Node.js 16, 18, 20
- **Build Application**: Build and artifact upload
- **Coverage**: Code coverage reporting

### 2. Pull Request Checks (`pr-checks.yml`)
**Triggers**: PR opened/updated on main branch
- **PR Validation**: Semantic PR title validation
- **Security Scan**: npm audit and secret scanning
- **Bundle Size Check**: Package size validation
- **Manual Approval**: Requires environment approval

### 3. Scheduled Checks (`scheduled-checks.yml`)
**Triggers**: Daily at 2 AM UTC, manual dispatch
- **Dependency Audit**: Daily security audit
- **Link Checker**: Documentation link validation
- **Health Check**: Application health monitoring

### 4. Auto-merge (`auto-merge.yml`)
**Triggers**: Dependabot PRs
- **Auto-approve**: Patch version bumps
- **Manual Review**: Major/minor updates

## 🛡️ Setting Up Branch Protection

### Option 1: GitHub Web Interface
1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Configure required settings (see [docs/branch-protection-config.md](docs/branch-protection-config.md))

### Option 2: GitHub CLI
```bash
gh repo set-default YOUR_USERNAME/pr-checks-sandbox

# Main branch protection
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Lint Code","Run Tests (18)","Build Application","PR Validation","Security Scan","Bundle Size Check"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

## 🧪 Testing Scenarios

### Scenario 1: Basic PR Flow
1. Create a feature branch: `git checkout -b feature/test-change`
2. Make changes to `src/index.js`
3. Commit and push: `git push origin feature/test-change`
4. Open a PR to `main` branch
5. Watch the checks run automatically

### Scenario 2: Testing Failing Checks
1. Introduce a linting error in the code
2. Create a PR and observe failed checks
3. Fix the issue and push again
4. Verify checks pass

### Scenario 3: Manual Approval Process
1. Create a PR that triggers the "Requires Manual Approval" job
2. Set up the `production-approval` environment in repository settings
3. Add yourself as a required reviewer for the environment
4. Approve the environment deployment to complete the check

### Scenario 4: Dependabot Testing
1. Enable Dependabot by creating `.github/dependabot.yml`:
   ```yaml
   version: 2
   updates:
     - package-ecosystem: "npm"
       directory: "/"
       schedule:
         interval: "daily"
   ```
2. Wait for Dependabot PRs or manually trigger them
3. Observe auto-merge behavior for patch updates

## 🎨 Customization

### Adding New Checks
1. Create new workflow files in `.github/workflows/`
2. Update branch protection rules to include new required checks
3. Test with a pull request

### Modifying Existing Workflows
1. Edit workflow files as needed
2. Test changes don't break existing functionality
3. Update documentation accordingly

### Environment Setup
For workflows requiring manual approval:
1. Go to **Settings** → **Environments**
2. Create environment: `production-approval`
3. Add required reviewers
4. Configure deployment timeout and protection rules

## 📊 Monitoring and Debugging

### Viewing Workflow Runs
- Go to **Actions** tab in your repository
- Click on any workflow run to see detailed logs
- Use the re-run feature to test fixes

### Common Issues
1. **Failed status checks**: Check the Actions tab for error details
2. **Branch protection bypassed**: Verify settings and required checks
3. **Approval workflows stuck**: Ensure environment is configured correctly

### Debugging Tips
- Use `act` tool to test workflows locally
- Add debug outputs to workflows: `run: echo "Debug: ${{ github.event_name }}"`
- Check workflow permissions if API calls fail

## 🤝 Contributing

This is a sandbox repository - feel free to:
1. Fork and experiment
2. Create issues for improvements
3. Submit PRs to enhance the testing scenarios
4. Share your findings and learnings

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy testing!** 🎉 Use this sandbox to learn, experiment, and master GitHub Actions PR checks.