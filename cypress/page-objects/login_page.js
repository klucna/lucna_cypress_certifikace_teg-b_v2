import { customElement } from "../helpers/custom_elements";
import { HomePage } from "./home_page";
import { RegisterPage } from "./register_page";

export class LoginPage {
  constructor() {
    this.tegbUrl = Cypress.env("tegb_url");
    this.usernameInput = customElement("input[data-testid='username-input']");
    this.passwordInput = customElement("input[data-testid='password-input']");
    this.loginButton = customElement("button[data-testid='submit-button']");
    this.lostPasswordButton = customElement(
      "button[data-testid='registration-link']"
    );
    this.registerButton = customElement(
      "button[data-testid='register-button']"
    );
    this.loginPageLogo = customElement(".title");
    cy.intercept("/tegb/login").as("login_api");
  }

  openTegb() {
    cy.visit(this.tegbUrl);
    return this;
  }

  typeUsername(username) {
    this.usernameInput.get().type(username);
    return this;
  }

  typePassword(password) {
    this.passwordInput.get().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.get().click();
    return new HomePage();
  }

  clickregisterNewUser() {
    this.registerButton.get().click();
    return new RegisterPage();
  }
}
