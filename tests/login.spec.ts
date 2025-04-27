import { test, expect } from '@playwright/test';

test.describe('Login to Demobank', () => {
  const url = 'https://demo-bank.vercel.app/'
  const eightCharacters = 'testerrr'
  const fourCharacters = 'test'

  test('Login with correct credentials', async ({ page }) => {
    const expectedUser = 'Jan Demobankowy'

    await page.goto(url);
    await page.getByTestId('login-input').fill(eightCharacters);
    await page.getByTestId('password-input').fill(eightCharacters);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });

  test('Login with incorrect username', async ({ page }) => {
    const expectedWarning = 'identyfikator ma min. 8 znaków'

    await page.goto(url);
    await page.getByTestId('login-input').fill(fourCharacters);
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText(expectedWarning);
  });

  test('Login with incorrect password', async ({ page }) => {
    const expectedWarning = 'hasło ma min. 8 znaków'

    await page.goto(url);
    await page.getByTestId('login-input').fill(eightCharacters);
    await page.getByTestId('password-input').fill(fourCharacters);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(expectedWarning);
  });

});