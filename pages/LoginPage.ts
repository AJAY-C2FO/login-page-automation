import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model
 * Encapsulates all selectors and actions for the Practice Test Login page.
 * URL: https://practicetestautomation.com/practice-test-login/
 */
export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successHeading: Locator;
  readonly logoutButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput  = page.locator('#username');
    this.passwordInput  = page.locator('#password');
    this.submitButton   = page.locator('#submit');
    this.errorMessage   = page.locator('#error');
    this.successHeading = page.locator('h1');
    this.logoutButton   = page.locator('.wp-block-button a');
    this.pageTitle      = page.locator('h2');
  }

  /** Navigate to the login page */
  async navigate(): Promise<void> {
    await this.page.goto('/practice-test-login/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Fill username field */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  /** Fill password field */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  /** Click the Submit button */
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Perform a complete login action.
   * @param username - Username string
   * @param password - Password string
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSubmit();
  }

  /** Assert that login was successful */
  async assertLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/.*logged-in-successfully.*/);
    await expect(this.successHeading).toContainText('Logged In Successfully');
    await expect(this.logoutButton).toBeVisible();
  }

  /** Assert error message text */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /** Assert that the login form is still displayed (not navigated away) */
  async assertStillOnLoginPage(): Promise<void> {
    await expect(this.submitButton).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
  }

  /** Check that username field is present and interactable */
  async assertUsernameFieldVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.usernameInput).toBeEnabled();
  }

  /** Check that password field masks input */
  async assertPasswordFieldMasked(): Promise<void> {
    const inputType = await this.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  }

  /** Get the current URL */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /** Get error message text */
  async getErrorMessageText(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}
