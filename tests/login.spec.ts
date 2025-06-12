import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const expectedUser = 'Jan Demobankowy';
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(eightCharacters);
    await loginPage.passwordInput.fill(eightCharacters);
    await loginPage.loginButton.click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });

  test('Login with incorrect username', async ({ page }) => {
    const fourCharacters = loginData.fourCharacters;
    const expectedWarning = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(fourCharacters);
    await loginPage.loginInput.blur();

    await expect(loginPage.loginError).toHaveText(expectedWarning);
  });

  test('Login with incorrect password', async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const fourCharacters = loginData.fourCharacters;
    const expectedWarning = 'hasło ma min. 8 znaków';
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(eightCharacters);
    await loginPage.passwordInput.fill(fourCharacters);
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedWarning);
  });
});
