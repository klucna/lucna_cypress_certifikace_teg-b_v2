import { HomePage } from "./home_page";
import { LoginPage } from "./login_page";

export class RegisterPage {
  constructor() {
    this.username = "input[data-testid='username-input']";
    this.password = "input[data-testid='password-input']";
    this.email = "input[data-testid='email-input']";
    this.registerButton = "button[data-testid='submit-button']";
    this.backToLoginButton = "button[class='link-button']";
  }

  typeNewUsername(username) {
    cy.get(this.username).type(username);
    return this;
  }

  typeNewPassword(password) {
    cy.get(this.password).type(password);
    return this;
  }

  typeNewEmail(email) {
    cy.get(this.email).type(email);
    return this;
  }

  clickRegister() {
    cy.get(this.registerButton).click();
    return new HomePage();
  }

  clickReturn() {
    cy.get(this.backToLoginButton).click();
    return new LoginPage();
  }
}
