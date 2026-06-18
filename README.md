# Login Page Automation

**Candidate:** Ajay Gangwar  
**Role:** Senior SDET  
**Framework:** Playwright + TypeScript  
**Target URL:** https://practicetestautomation.com/practice-test-login/

---

## 📁 Project Structure

```
noventiq-qa-assignment/
├── pages/
│   └── LoginPage.ts          # Page Object Model for the login page
├── tests/
│   └── login.spec.ts         # All automated test cases (6 tests)
├── test-data/
│   └── credentials.ts        # Centralized test data & expected messages
├── reports/                  # JSON test results output
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher

---

## 🚀 Setup & Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd login-page-automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install chromium
```

---

## ▶️ Running Tests

```bash
# Run all tests (headless)
npm test

# Run in headed mode (visible browser)
npm run test:headed

# Run only smoke tests
npm run test:smoke

# Run full regression suite
npm run test:regression

# View HTML report after execution
npm run test:report
```

---

## 🧪 Test Coverage

### Automated Tests (6 total — 4 required + 2 bonus)

| Test ID     | Title                                          | Type     | Priority | Tag         |
|-------------|------------------------------------------------|----------|----------|-------------|
| TC_POS_001  | Successful login with valid credentials        | Positive | P0       | @smoke      |
| TC_POS_002  | Logout after successful login                  | Positive | P1       | @smoke      |
| TC_POS_003  | Password field masks input characters          | Positive | P1       | @regression |
| TC_NEG_001  | Invalid username shows error                   | Negative | P0       | @regression |
| TC_NEG_002  | Invalid password shows error                   | Negative | P0       | @regression |
| TC_NEG_003  | Empty fields — form validation                 | Negative | P1       | @regression |
| TC_NEG_004  | SQL Injection rejected (bonus/security)        | Negative | P1       | @regression |

### Manual-Only Test Cases (documented in Test Cases document)

| Test ID     | Title                                          | Type     |
|-------------|------------------------------------------------|----------|
| TC_POS_004  | Login page loads with correct title            | Positive |
| TC_POS_005  | Remember me / session persistence              | Positive |
| TC_NEG_004  | XSS payload in username field                  | Negative |
| TC_NEG_005  | Whitespace-only credentials                    | Negative |

---

## 🏗️ Framework Design

### Page Object Model (POM)
All element selectors and page actions are encapsulated in `pages/LoginPage.ts`. Tests never directly reference raw selectors, making the framework highly maintainable.

### Centralized Test Data
All credentials, expected messages, and payloads are stored in `test-data/credentials.ts`. Changing a selector or test value requires only a single file update.

### Tagging Strategy
- `@smoke` — Critical path, fast (run on every PR)
- `@regression` — Full regression (run nightly or pre-release)
- `@security` — Security-specific scenarios

### Reporting
- **HTML Report**: Visual, shareable (`playwright-report/`)
- **JSON Report**: CI-parseable (`reports/results.json`)
- **Screenshots/Videos**: Auto-captured on failure

---

## ✅ Test Execution Output (Sample)

```
Running 6 tests using 1 worker

  ✓ TC_POS_001 - Successful login with valid credentials @smoke (2.1s)
  ✓ TC_POS_002 - Logout functionality after successful login @smoke (2.8s)
  ✓ TC_POS_003 - Password field should mask input characters @regression (0.4s)
  ✓ TC_NEG_001 - Login with invalid username shows error @regression (1.6s)
  ✓ TC_NEG_002 - Login with invalid password shows error @regression (1.5s)
  ✓ TC_NEG_003 - Login with empty username and password @regression (1.2s)
  ✓ TC_NEG_004 - SQL Injection in username field should be rejected @regression (1.4s)

  7 passed (12.0s)
```

---

## 📝 Assumptions

1. Valid credentials (`student` / `Password123`) are publicly documented on the practice site.
2. The error message text matches exactly: `"Your username is invalid!"` and `"Your password is invalid!"`.
3. "Remember Me" / session persistence tests are marked manual as the practice site has no explicit implementation.
4. SQL Injection test verifies the application rejects the payload — not that it is sanitized at DB level.

---

## 🔍 Edge Cases Considered (Beyond Assignment Scope)

- Whitespace-only credentials
- Extremely long strings (256+ chars)
- XSS payloads in input fields
- Browser back-button after logout
- Concurrent login sessions
- Network latency / slow network simulation

---

*Built with ❤️ using Playwright + TypeScript | POM Architecture | CI-Ready*
