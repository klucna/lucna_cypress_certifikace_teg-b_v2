import { LoginPage } from "../page-objects/login_page";

describe("Login API test Tegb", () => {
  beforeEach(() => {
    new LoginPage().openTegb();
  });

  it("Login API have status 201", () => {
    new LoginPage()
      .typeUsername(Cypress.env("tegb_username"))
      .typePassword(Cypress.env("tegb_password"))
      .clickLogin();
    cy.wait("@login_api").its("response.statusCode").should("eq", 201);
  });

  it("access_token is present in Login API", () => {
    new LoginPage()
      .typeUsername(Cypress.env("tegb_username"))
      .typePassword(Cypress.env("tegb_password"))
      .clickLogin();
    cy.wait("@login_api").its("response.body.access_token").should("exist");
  });

  //přidala jsem možnost zápisu v jednom testu, nevím, co je lepší praxe
  it("access_token is present in Login API and status is 201", () => {
    new LoginPage()
      .typeUsername(Cypress.env("tegb_username"))
      .typePassword(Cypress.env("tegb_password"))
      .clickLogin();
    cy.wait("@login_api").then((loginApi) => {
      cy.wrap(loginApi).its("response.body.access_token").should("exist");
      cy.wrap(loginApi).its("response.statusCode").should("eq", 201);
    });
  });
});
