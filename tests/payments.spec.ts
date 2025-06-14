import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentsPage } from '../pages/payments.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Payments', () => {
  let paymentsPage: PaymentsPage;

  test.beforeEach(async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const loginPage = new LoginPage(page);
    const desktoppage = new DesktopPage(page);
    paymentsPage = new PaymentsPage(page);

    await page.goto('/');
    await loginPage.login(eightCharacters);
    await desktoppage.navBar.paymentsOption.click();
  });

  test(
    'Single Payment',
    { tag: ['@payment', '@integration'] },
    async ({ page }) => {
      const receiverName = 'Jan Nowak';
      const receiverAccount = '13 4324 3564 6453 2143 2143 43255';
      const amount = '17';
      const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${receiverName}`;

      await paymentsPage.makeTransfer(receiverName, receiverAccount, amount);

      await expect(paymentsPage.messageLabel).toHaveText(expectedMessage);
    },
  );
});
