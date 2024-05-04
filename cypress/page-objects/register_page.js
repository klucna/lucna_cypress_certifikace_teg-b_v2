import { customElement } from "../helpers/custom_elements";
import { HomePage } from "./home_page";
import { LoginPage } from "./login_page";

export class RegisterPage {
  constructor() {
    this.username = customElement("input[data-testid='username-input']");
    this.password = customElement("input[data-testid='password-input']");
    this.email = customElement("input[data-testid='email-input']");
    this.registerButton = customElement("button[data-testid='submit-button']");
    this.backToLoginButton = customElement("button[class='link-button']");
  }

  typeNewUsername(username) {
    this.username.get().type(username);
    return this;
  }

  typeNewPassword(password) {
    this.password.get().type(password);
    return this;
  }

  typeNewEmail(email) {
    this.email.get().type(email);
    return this;
  }

  clickRegister() {
    this.registerButton.get().click();
    return new HomePage();
  }

  clickReturn() {
    this.backToLoginButton.get().click();
    return new LoginPage();
  }
}
