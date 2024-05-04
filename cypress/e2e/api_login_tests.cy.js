import { LoginPage } from "../page-objects/login_page";

describe("Login API test Tegb", () => {
  beforeEach(() => {
    new LoginPage()
      .openTegb()
      .typeUsername(Cypress.env("tegb_username"))
      .typePassword(Cypress.env("tegb_password"))
      .clickLogin();
  });

  it("access_token is present in Login API and status is 201", () => {
    cy.wait("@login_api").then((loginApi) => {
      cy.wrap(loginApi).its("response.body.access_token").should("exist");
      cy.wrap(loginApi).its("response.statusCode").should("eq", 201);
    });
  });
});
