import { faker } from "@faker-js/faker";
import { LoginApi } from "../api/login_api";
import { LoginPage } from "../page-objects/login_page";
import { HomePage } from "../page-objects/home_page";
import accountBalanceData from "../fixtures/accounts_data.json";

describe("DDT Account balance Tegb tests", () => {
  accountBalanceData.forEach((accountBalance) => {
    it(`Account Balance: ${accountBalance.startBalance} Kč`, () => {
      const username = faker.internet.userName();
      const password = faker.internet.password({ length: 15 });
      const email = faker.internet.exampleEmail();
      const loginApi = new LoginApi();
      cy.intercept("/tegb/accounts").as("accounts_api");
      new LoginPage()
        .openTegb()
        .clickregisterNewUser()
        .typeNewUsername(username)
        .typeNewPassword(password)
        .typeNewEmail(email)
        .clickRegister();
      new LoginPage().openTegb();
      loginApi.login(username, password).then((response) => {
        expect(response.status).to.eq(201);
        const token = response.body.access_token;
        cy.request({
          method: "POST",
          url: Cypress.env("tegb_be_url") + "tegb/accounts/create",
          headers: {
            authorization: "Bearer " + token,
          },
          body: {
            startBalance: accountBalance.startBalance,
            type: "Test",
          },
        });
      });
      new LoginPage()
        .openTegb()
        .typeUsername(username)
        .typePassword(password)
        .clickLogin();
      cy.wait("@accounts_api");
      const expectedBalance = accountBalance.startBalance;
      const expectedType = "Test";
      new HomePage().accountType.containsText(expectedType);
      new HomePage().accountBalance.containsText(expectedBalance);
    });
  });
});
