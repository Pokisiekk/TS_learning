import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('My desktop page', () => {
  test.beforeEach(async ({ page }) => {
    const eightCharacters = loginData.eightCharacters;
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(eightCharacters);
    await loginPage.passwordInput.fill(eightCharacters);
    await loginPage.loginButton.click();
  });

  test('Make payment', async ({ page }) => {
    const receiverId = '3';
    const receiverName = 'Michael Scott';
    const amount = '200';
    const title = 'Pożyczka';
    const expectedMessage = `Przelew wykonany! ${receiverName} - ${amount},00PLN - ${title}`;
    const desktopPage = new DesktopPage(page);

    await desktopPage.receiverSelector.selectOption(receiverId);
    await desktopPage.transferAmount.fill(amount);
    await desktopPage.transferTitle.fill(title);
    await desktopPage.transferButton.click();
    await desktopPage.closeButton.click();

    await expect(desktopPage.messageLabel).toHaveText(expectedMessage);
  });

  test('Phone top-up', async ({ page }) => {
    const phoneNumber = '500 xxx xxx';
    const amount = '50';
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumber}`;
    const desktopPage = new DesktopPage(page);

    await desktopPage.numberSelector.selectOption(phoneNumber);
    await desktopPage.topupAmount.fill(amount);
    await desktopPage.topupAgreement.click();
    await desktopPage.topupButton.click();
    await desktopPage.closeButton.click();

    await expect(desktopPage.messageLabel).toHaveText(expectedMessage);
  });

  test('Balance check after phone top-up', async ({ page }) => {
    const phoneNumber = '500 xxx xxx';
    const amount = '50';
    const desktopPage = new DesktopPage(page);
    const initBalance = await desktopPage.moneyValue.innerText();
    const expectedBalance = Number(initBalance) - Number(amount);

    await desktopPage.numberSelector.selectOption(phoneNumber);
    await desktopPage.topupAmount.fill(amount);
    await desktopPage.topupAgreement.click();
    await desktopPage.topupButton.click();
    await desktopPage.closeButton.click();

    await expect(desktopPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
