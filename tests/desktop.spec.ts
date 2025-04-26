import { test, expect } from '@playwright/test';

test.describe('My desktop page', () => {

  test('Make payment', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerrr');
    await page.getByTestId('password-input').fill('testerrr');
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption('3');
    await page.locator('#widget_1_transfer_amount').fill('200');
    await page.locator('#widget_1_transfer_title').fill('Pożyczka');
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Michael Scott - 200,00PLN - Pożyczka');
  });

});