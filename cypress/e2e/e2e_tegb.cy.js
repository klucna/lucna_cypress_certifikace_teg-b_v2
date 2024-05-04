import { faker } from "@faker-js/faker";
import { LoginPage } from "../page-objects/login_page";
import { LoginApi } from "../api/login_api";
import { HomePage } from "../page-objects/home_page";
import { AccountApi } from "../api/account_api";

describe("Register, Login new User and create Account E2E test Tegb", () => {
  let username, password, email, firstname, lastname, phonenumber;

  beforeEach(() => {
    username = faker.internet.userName();
    password = faker.internet.password({ length: 15 });
    email = faker.internet.exampleEmail();
    firstname = faker.person.firstName();
    lastname = faker.person.lastName();
    phonenumber = faker.phone.number();
    new LoginPage().openTegb();
  });
  it("Create new user with a new account test", () => {
    const loginApi = new LoginApi();
    const accountApi = new AccountApi();
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
      accountApi.createAccount(token, 1000, "Test").then((accountResponse) => {
        expect(accountResponse.status).to.eq(201);
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
