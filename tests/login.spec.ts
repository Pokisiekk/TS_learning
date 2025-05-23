import { test, expect } from '@playwright/test';

test.describe('Login to Demobank', () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    const eightCharacters = 'testerrr';
    const expectedUser = 'Jan Demobankowy';

    await page.getByTestId('login-input').fill(eightCharacters);
    await page.getByTestId('password-input').fill(eightCharacters);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });

  test('Login with incorrect username', async ({ page }) => {
    const fourCharacters = 'test';
    const expectedWarning = 'identyfikator ma min. 8 znaków';

    await page.getByTestId('login-input').fill(fourCharacters);
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedWarning,
    );
  });

  test('Login with incorrect password', async ({ page }) => {
    const eightCharacters = 'testerrr';
    const fourCharacters = 'test';
    const expectedWarning = 'hasło ma min. 8 znaków';

    await page.getByTestId('login-input').fill(eightCharacters);
    await page.getByTestId('password-input').fill(fourCharacters);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedWarning,
    );
  });
});
