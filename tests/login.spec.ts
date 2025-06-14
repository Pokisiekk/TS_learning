import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
  });

  test(
    'Login with correct credentials',
    { tag: ['@login', '@smoke'] },
    async ({ page }) => {
      const eightCharacters = loginData.eightCharacters;
      const expectedUser = 'Jan Demobankowy';
      const desktopPage = new DesktopPage(page);

      await loginPage.login(eightCharacters);

      await expect(desktopPage.userName).toHaveText(expectedUser);
    },
  );

  test('Login with incorrect username', { tag: '@login' }, async ({ page }) => {
    const fourCharacters = loginData.fourCharacters;
    const expectedWarning = 'identyfikator ma min. 8 znaków';

    await loginPage.loginInput.fill(fourCharacters);
    await loginPage.loginInput.blur();

    await expect(loginPage.loginError).toHaveText(expectedWarning);
  });

  test('Login with incorrect password', { tag: '@login' }, async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const fourCharacters = loginData.fourCharacters;
    const expectedWarning = 'hasło ma min. 8 znaków';

    await loginPage.loginInput.fill(eightCharacters);
    await loginPage.passwordInput.fill(fourCharacters);
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedWarning);
  });
});
