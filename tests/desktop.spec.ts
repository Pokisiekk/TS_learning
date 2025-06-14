import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('My desktop page', () => {
  let desktopPage: DesktopPage;

  test.beforeEach(async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const loginPage = new LoginPage(page);
    desktopPage = new DesktopPage(page);

    await page.goto('/');
    await loginPage.login(eightCharacters);
  });

  test('Make payment', async ({ page }) => {
    const receiverId = '3';
    const receiverName = 'Michael Scott';
    const amount = '200';
    const title = 'Pożyczka';
    const expectedMessage = `Przelew wykonany! ${receiverName} - ${amount},00PLN - ${title}`;

    await desktopPage.makeQuickTransfer(receiverId, amount, title);

    await expect(desktopPage.messageLabel).toHaveText(expectedMessage);
  });

  test('Phone top-up', async ({ page }) => {
    const phoneNumber = '500 xxx xxx';
    const amount = '50';
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumber}`;

    await desktopPage.topupPhone(phoneNumber, amount);

    await expect(desktopPage.messageLabel).toHaveText(expectedMessage);
  });

  test('Balance check after phone top-up', async ({ page }) => {
    const phoneNumber = '500 xxx xxx';
    const amount = '50';
    const initBalance = await desktopPage.moneyValue.innerText();
    const expectedBalance = Number(initBalance) - Number(amount);

    await desktopPage.topupPhone(phoneNumber, amount);

    await expect(desktopPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
