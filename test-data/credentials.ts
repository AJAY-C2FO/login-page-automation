/**
 * Test Data - Login Credentials
 * Centralized test data management for maintainability.
 * Source: https://practicetestautomation.com/practice-test-login/
 */

export const VALID_CREDENTIALS = {
  username: 'student',
  password: 'Password123',
};

export const INVALID_CREDENTIALS = {
  wrongUsername: 'wronguser',
  wrongPassword: 'wrongpassword',
  emptyString: '',
  sqlInjection: "' OR '1'='1",
  xssPayload: '<script>alert("xss")</script>',
  whitespaceOnly: '   ',
  longString: 'a'.repeat(256),
};

export const EXPECTED_MESSAGES = {
  successHeading: 'Logged In Successfully',
  invalidUsernameError: 'Your username is invalid!',
  invalidPasswordError: 'Your password is invalid!',
  successPageUrl: 'logged-in-successfully',
};
