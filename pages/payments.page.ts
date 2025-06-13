import { Page } from '@playwright/test';

export class PaymentsPage {
  constructor(private page: Page) {}

  receiverName = this.page.getByTestId('transfer_receiver');
  receiverAccount = this.page.getByTestId('form_account_to');
  transferAmount = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');
  messageLabel = this.page.getByTestId('message-text');
}
