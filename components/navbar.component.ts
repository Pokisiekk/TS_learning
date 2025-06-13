import { Page } from '@playwright/test';

export class NavBarComponent {
  constructor(private page: Page) {}

  paymentsOption = this.page.getByRole('link', { name: 'płatności' });
}
