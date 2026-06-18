import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {
  VALID_CREDENTIALS,
  INVALID_CREDENTIALS,
  EXPECTED_MESSAGES,
} from '../test-data/credentials';

/**
 * ============================================================
 * Login Page - Automated Test Suite
 * Application: https://practicetestautomation.com/practice-test-login/
 * Framework: Playwright + TypeScript
 * Author: Ajay Gangwar | Senior SDET
 * Assignment: Noventiq – Senior SDET
 * ============================================================
 *
 * AUTOMATED TEST COVERAGE (4 required + 2 bonus):
 *   TC_POS_001 - Successful login with valid credentials          @smoke
 *   TC_POS_002 - Logout functionality after successful login      @smoke
 *   TC_NEG_001 - Login with invalid username                      @regression
 *   TC_NEG_002 - Login with invalid password                      @regression
 *   TC_NEG_003 - Login with both fields empty (bonus)             @regression
 *   TC_NEG_004 - SQL Injection in username field (bonus/security) @regression
 * ============================================================
 */

test.describe('Login Page - Functional Test Suite', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // ─────────────────────────────────────────────────────────────
  // POSITIVE TEST CASES
  // ─────────────────────────────────────────────────────────────

  test.describe('Positive Scenarios', () => {

    /**
     * TC_POS_001
     * Title: Successful login with valid credentials
     * Priority: P0 | Tags: @smoke @regression
     */
    test('TC_POS_001 - Successful login with valid credentials @smoke', async ({ page }) => {
      // Step 1: Enter valid username
      await loginPage.enterUsername(VALID_CREDENTIALS.username);

      // Step 2: Enter valid password
      await loginPage.enterPassword(VALID_CREDENTIALS.password);

      // Step 3: Click Submit
      await loginPage.clickSubmit();

      // Step 4: Validate URL redirected to success page
      await expect(page).toHaveURL(/.*logged-in-successfully.*/);

      // Step 5: Validate success heading is visible
      await loginPage.assertLoginSuccess();

      // Step 6: Confirm "Congratulations" text presence
      await expect(page.locator('p').first()).toBeVisible();
    });

    /**
     * TC_POS_002
     * Title: Logout functionality after successful login
     * Priority: P1 | Tags: @smoke @regression
     */
    test('TC_POS_002 - Logout functionality after successful login @smoke', async ({ page }) => {
      // Step 1-3: Login with valid credentials
      await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);

      // Step 4: Wait for success page
      await expect(page).toHaveURL(/.*logged-in-successfully.*/);

      // Step 5: Click Logout button
      await loginPage.logoutButton.click();

      // Step 6: Verify redirect back to login page
      await expect(page).toHaveURL(/.*practice-test-login.*/);

      // Step 7: Verify login form is visible again
      await loginPage.assertStillOnLoginPage();
    });

    /**
     * TC_POS_003 (Manual)
     * Title: Password field masks input characters
     * Priority: P1
     * Note: Automated check included below for extra coverage.
     */
    test('TC_POS_003 - Password field should mask input characters @regression', async () => {
      await loginPage.assertPasswordFieldMasked();
    });

  });

  // ─────────────────────────────────────────────────────────────
  // NEGATIVE TEST CASES
  // ─────────────────────────────────────────────────────────────

  test.describe('Negative Scenarios', () => {

    /**
     * TC_NEG_001
     * Title: Login with invalid/wrong username
     * Priority: P0 | Tags: @regression
     */
    test('TC_NEG_001 - Login with invalid username shows error @regression', async () => {
      // Step 1: Enter invalid username
      await loginPage.enterUsername(INVALID_CREDENTIALS.wrongUsername);

      // Step 2: Enter valid password
      await loginPage.enterPassword(VALID_CREDENTIALS.password);

      // Step 3: Click Submit
      await loginPage.clickSubmit();

      // Step 4: Validate error message is shown
      await loginPage.assertErrorMessage(EXPECTED_MESSAGES.invalidUsernameError);

      // Step 5: Confirm still on login page
      await loginPage.assertStillOnLoginPage();
    });

    /**
     * TC_NEG_002
     * Title: Login with invalid/wrong password
     * Priority: P0 | Tags: @regression
     */
    test('TC_NEG_002 - Login with invalid password shows error @regression', async () => {
      // Step 1: Enter valid username
      await loginPage.enterUsername(VALID_CREDENTIALS.username);

      // Step 2: Enter wrong password
      await loginPage.enterPassword(INVALID_CREDENTIALS.wrongPassword);

      // Step 3: Click Submit
      await loginPage.clickSubmit();

      // Step 4: Validate appropriate error message
      await loginPage.assertErrorMessage(EXPECTED_MESSAGES.invalidPasswordError);

      // Step 5: Confirm user remains on login page
      await loginPage.assertStillOnLoginPage();
    });

    /**
     * TC_NEG_003 (Bonus)
     * Title: Login with both fields empty
     * Priority: P1 | Tags: @regression
     */
    test('TC_NEG_003 - Login with empty username and password @regression', async ({ page }) => {
      // Step 1: Leave both fields empty and click Submit
      await loginPage.clickSubmit();

      // Step 2: Validate that an error is shown OR page does not navigate away
      // The application shows "Your username is invalid!" for empty username
      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).toContain('practice-test-login');

      // Either error message appears or form does HTML5 validation
      const errorVisible = await loginPage.errorMessage.isVisible().catch(() => false);
      const usernameHasValidation = await loginPage.usernameInput
        .evaluate((el: HTMLInputElement) => !el.validity.valid)
        .catch(() => false);

      expect(errorVisible || usernameHasValidation).toBe(true);
    });

    /**
     * TC_NEG_004 (Bonus - Security)
     * Title: SQL Injection attempt in username field
     * Priority: P1 | Tags: @regression @security
     */
    test('TC_NEG_004 - SQL Injection in username field should be rejected @regression', async () => {
      // Step 1: Enter SQL injection payload as username
      await loginPage.enterUsername(INVALID_CREDENTIALS.sqlInjection);

      // Step 2: Enter any password
      await loginPage.enterPassword(VALID_CREDENTIALS.password);

      // Step 3: Click Submit
      await loginPage.clickSubmit();

      // Step 4: System should NOT log in — must show error
      await loginPage.assertErrorMessage(EXPECTED_MESSAGES.invalidUsernameError);

      // Step 5: Confirm user is not redirected to success page
      await loginPage.assertStillOnLoginPage();
    });

  });

});
