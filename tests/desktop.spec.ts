import { test, expect } from '@playwright/test';

test.describe('My desktop page', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    const eightCharacters = 'testerrr';

    await page.goto(url);
    await page.getByTestId('login-input').fill(eightCharacters);
    await page.getByTestId('password-input').fill(eightCharacters);
    await page.getByTestId('login-button').click();
  });

  test('Make payment', async ({ page }) => {
    const receiverId = '3';
    const receiverName = 'Michael Scott';
    const amount = '200';
    const title = 'Pożyczka';

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(amount);
    await page.locator('#widget_1_transfer_title').fill(title);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${receiverName} - ${amount},00PLN - ${title}`,
    );
  });

  test('Phone top-up', async ({ page }) => {
    const phoneNumber = '500 xxx xxx';
    const amount = '50';

    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
    await page.locator('#widget_1_topup_amount').fill(amount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.getByTestId('message-text')).toHaveText(
      `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumber}`,
    );
  });
});
