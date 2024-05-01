import { customElement } from "../helpers/custom_elements";
import { HomePage } from "./home_page";
import { RegisterPage } from "./register_page";

export class LoginPage {
  constructor() {
    this.tegbUrl = Cypress.env("tegb_url");
    this.usernameInput = "input[data-testid='username-input']";
    this.passwordInput = "input[data-testid='password-input']";
    this.loginButton = "button[data-testid='submit-button']";
    this.lostPasswordButton = "button[data-testid='registration-link']";
    this.registerButton = "button[data-testid='register-button']";
    this.loginPageLogo = customElement(".title");
    cy.intercept("/tegb/login").as("login_api");
  }

  openTegb() {
    cy.visit(this.tegbUrl);
    return this;
  }

  typeUsername(username) {
    cy.get(this.usernameInput).type(username);
    return this;
  }

  typePassword(password) {
    cy.get(this.passwordInput).type(password);
    return this;
  }

  clickLogin() {
    cy.get(this.loginButton).click();
    return new HomePage();
  }

  clickregisterNewUser() {
    cy.get(this.registerButton).click();
    return new RegisterPage();
  }
}
