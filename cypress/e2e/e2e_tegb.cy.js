import { faker } from "@faker-js/faker";
import { LoginPage } from "../page-objects/login_page";
import { LoginApi } from "../api/login_api";
import { HomePage } from "../page-objects/home_page";

describe("Register and Login new User E2E test Tegb", () => {
  beforeEach(() => {
    new LoginPage().openTegb();
  });
  it("Create new user with a new account test", () => {
    const username = faker.internet.userName();
    const password = faker.internet.password({ length: 15 });
    const email = faker.internet.exampleEmail();
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const phonenumber = faker.phone.number();
    const loginApi = new LoginApi();
    cy.intercept("/tegb/profile").as("profile_api");
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
          startBalance: 1000,
          type: "Test",
        },
      });
      new LoginPage()
        .openTegb()
        .typeUsername(username)
        .typePassword(password)
        .clickLogin();
      cy.wait("@profile_api");
      cy.wait("@accounts_api");
      new HomePage()
        .clickEditProfileButton()
        .typeFirstName(firstname)
        .typeLastName(lastname)
        .typeEmail(email)
        .typePhoneNumber(phonenumber)
        .typeAge(85)
        .clickSaveChangesButton();
      new HomePage()
        .firstNameContainText(firstname)
        .lastNameContainText(lastname)
        .emailContainText(email)
        .phoneNumberContainNumber(phonenumber)
        .ageContainNumber(85)
        .accountRowIsVisible()
        .accountBalanceContainsText(1000.0)
        .accountTypeContainsText("Test");
      new HomePage().clicklogout();
    });
  });
});
