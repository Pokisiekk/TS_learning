import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payments', () => {
  test.beforeEach(async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(eightCharacters);
    await loginPage.passwordInput.fill(eightCharacters);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Single Payment', async ({ page }) => {
    const receiverName = 'Jan Nowak';
    const receiverAccount = '13 4324 3564 6453 2143 2143 43255';
    const amount = '17';
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${receiverName}`;

    await page.getByTestId('transfer_receiver').fill(receiverName);
    await page.getByTestId('form_account_to').fill(receiverAccount);
    await page.getByTestId('form_amount').fill(amount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
