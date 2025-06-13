import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentsPage } from '../pages/payments.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Payments', () => {
  test.beforeEach(async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const loginPage = new LoginPage(page);
    const desktoppage = new DesktopPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(eightCharacters);
    await loginPage.passwordInput.fill(eightCharacters);
    await loginPage.loginButton.click();
    await desktoppage.navBar.paymentsOption.click();
  });

  test('Single Payment', async ({ page }) => {
    const receiverName = 'Jan Nowak';
    const receiverAccount = '13 4324 3564 6453 2143 2143 43255';
    const amount = '17';
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${receiverName}`;
    const paymentsPage = new PaymentsPage(page);

    await paymentsPage.receiverName.fill(receiverName);
    await paymentsPage.receiverAccount.fill(receiverAccount);
    await paymentsPage.transferAmount.fill(amount);
    await paymentsPage.transferButton.click();
    await paymentsPage.closeButton.click();

    await expect(paymentsPage.messageLabel).toHaveText(expectedMessage);
  });
});
