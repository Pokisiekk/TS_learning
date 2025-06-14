import { Page } from '@playwright/test';
import { NavBarComponent } from '../components/navbar.component';

export class DesktopPage {
  constructor(private page: Page) {}

  navBar = new NavBarComponent(this.page);
  userName = this.page.getByTestId('user-name');
  receiverSelector = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  numberSelector = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');
  topupButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  moneyValue = this.page.locator('#money_value');
  closeButton = this.page.getByTestId('close-button');
  messageLabel = this.page.getByTestId('message-text');

  async makeQuickTransfer(
    receiverId: string,
    amount: string,
    title: string,
  ): Promise<void> {
    await this.receiverSelector.selectOption(receiverId);
    await this.transferAmount.fill(amount);
    await this.transferTitle.fill(title);
    await this.transferButton.click();
    await this.closeButton.click();
  }

  async topupPhone(phoneNumber: string, amount: string): Promise<void> {
    await this.numberSelector.selectOption(phoneNumber);
    await this.topupAmount.fill(amount);
    await this.topupAgreement.click();
    await this.topupButton.click();
    await this.closeButton.click();
  }
}
