import { Page } from '@playwright/test';
import { NavBarComponent } from '../components/navbar.component';

export class PaymentsPage {
  constructor(private page: Page) {}

  navBar = new NavBarComponent(this.page);
  receiverName = this.page.getByTestId('transfer_receiver');
  receiverAccount = this.page.getByTestId('form_account_to');
  transferAmount = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');
  messageLabel = this.page.getByTestId('message-text');

  async makeTransfer(
    receiverName: string,
    receiverAccount: string,
    amount: string,
  ): Promise<void> {
    await this.receiverName.fill(receiverName);
    await this.receiverAccount.fill(receiverAccount);
    await this.transferAmount.fill(amount);
    await this.transferButton.click();
    await this.closeButton.click();
  }
}
