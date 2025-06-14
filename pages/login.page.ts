import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginError = this.page.getByTestId('error-login-id');
  passwordError = this.page.getByTestId('error-login-password');

  async login(eightCharacters: string): Promise<void> {
    await this.loginInput.fill(eightCharacters);
    await this.passwordInput.fill(eightCharacters);
    await this.loginButton.click();
  }
}
