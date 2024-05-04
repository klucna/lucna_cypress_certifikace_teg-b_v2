import { faker } from "@faker-js/faker";
import { LoginApi } from "../api/login_api";
import { LoginPage } from "../page-objects/login_page";
import { HomePage } from "../page-objects/home_page";
import accountBalanceData from "../fixtures/accounts_data.json";
import { AccountApi } from "../api/account_api";
/*Bug in app: POST API https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create
Body: {
"statusCode": 500,
"message": "Internal server error"}
2 values taken from accounts_data.json file - add after fixing the bug:
  {
    "startBalance": -196000921
  },
  {
    "startBalance": 298000123
  }*/
describe("DDT Account balance different amounts Tegb tests", () => {
  let username, password, email;
  const loginApi = new LoginApi();
  const accountApi = new AccountApi();

  beforeEach(() => {
    username = faker.internet.userName();
    password = faker.internet.password({ length: 15 });
    email = faker.internet.exampleEmail();
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

      accountBalanceData.forEach((accountBalance) => {
        accountApi.createAccount(token, accountBalance.startBalance, "Test");
      });
    });
  });

  accountBalanceData.forEach((accountBalance) => {
    it(`Account Balance: ${accountBalance.startBalance} Kč`, () => {
      const expectedBalance = accountBalance.startBalance;
      const expectedType = "Test";
      new LoginPage()
        .openTegb()
        .typeUsername(username)
        .typePassword(password)
        .clickLogin();
      cy.wait("@accounts_api");
      new HomePage().accountType.containsText(expectedType);
      new HomePage().accountBalance.containsText(expectedBalance);
    });
  });
});
