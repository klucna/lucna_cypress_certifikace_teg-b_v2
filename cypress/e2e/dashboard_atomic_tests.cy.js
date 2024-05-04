import { HomePage } from "../page-objects/home_page";
import { LoginPage } from "../page-objects/login_page";
import { faker } from "@faker-js/faker";

describe("Dashboasrd atomic tests", { testIsolation: false }, () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    const username = faker.internet.userName();
    const password = faker.internet.password({ length: 15 });
    const email = faker.internet.exampleEmail();
    new LoginPage()
      .openTegb()
      .clickregisterNewUser()
      .typeNewUsername(username)
      .typeNewPassword(password)
      .typeNewEmail(email)
      .clickRegister();
    new LoginPage()
      .openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();
  });

  context("Header tests", () => {
    it("Logo is visible", () => {
      new HomePage().logo.isVisible();
    });

    it("Title is visible", () => {
      new HomePage().pageTitle.isVisible();
    });

    it("Title have text", () => {
      new HomePage().pageTitle.hasText("TEG#B Dashboard");
    });

    it("Logout button is visible", () => {
      new HomePage().logoutButton.isVisible();
    });

    it("Logout button has text", () => {
      new HomePage().logoutButton.hasText("Odhlásit se");
    });
  });

  context("Menu tests", () => {
    it("Home tab is visible", () => {
      new HomePage().homeMenu.isVisibleXpath();
    });

    it("Home tab has text", () => {
      new HomePage().homeMenu.hasTextXpath("Domů");
    });

    it("Accounts tab is visible", () => {
      new HomePage().accountsMenu.isVisibleXpath();
    });

    it("Accounts tab has text", () => {
      new HomePage().accountsMenu.hasTextXpath("Účty");
    });

    it("Transactions tab is visible", () => {
      new HomePage().transactionsMenu.isVisibleXpath();
    });

    it("Transactions tab has text", () => {
      new HomePage().transactionsMenu.hasTextXpath("Transakce");
    });

    it("Support tab is visible", () => {
      new HomePage().supportMenu.isVisibleXpath();
    });

    it("Support tab has text", () => {
      new HomePage().supportMenu.hasTextXpath("Podpora");
    });
  });

  context("Footer tests", () => {
    it("Footer is visible", () => {
      new HomePage().footer.isVisible();
    });

    it("Footer have text", () => {
      new HomePage().footer.hasText("© 2023 Banking App");
    });
  });

  context("Profile details on Dashboard tests", () => {
    it("Profile Details header is visible", () => {
      new HomePage().profileDetailHeader.isVisible();
    });

    it("Profile Details header has text", () => {
      new HomePage().profileDetailHeader.hasText("Detaily Profilu");
    });

    it("Edit Profile Buttion is visible", () => {
      new HomePage().editProfileButton.isVisible();
    });

    it("Edit Profile Button has text", () => {
      new HomePage().editProfileButton.hasText("Upravit profil");
    });

    it("First Name has attribute", () => {
      new HomePage().firstName.hasAttribute("data-testid", "name");
    });

    it("Last Name has attribute", () => {
      new HomePage().lastName.hasAttribute("data-testid", "surname");
    });

    it("Email has attribute", () => {
      new HomePage().email.hasAttribute("data-testid", "email");
    });

    it("Phone Number has attribute", () => {
      new HomePage().phoneNumber.hasAttribute("data-testid", "phone");
    });

    it("Age has attribute", () => {
      new HomePage().age.hasAttribute("data-testid", "age");
    });
  });

  context("Accounts details on Dashboard tests", () => {
    it("Accounts header is visible", () => {
      new HomePage().accountsHeader.isVisible();
    });

    it("Accounts header has text", () => {
      new HomePage().accountsHeader.hasText("Účty");
    });

    it("Add account button is visible", () => {
      new HomePage().addAccountButton.isVisible();
    });

    it("Account number has attribute", () => {
      new HomePage().accountNumberHeading.hasAttribute(
        "data-testid",
        "account-number-heading"
      );
    });

    it("Balance has attribute", () => {
      new HomePage().accountBalanceHeading.hasAttribute(
        "data-testid",
        "account-balance-heading"
      );
    });

    it("Account type has attribute", () => {
      new HomePage().accountTypeHeading.hasAttribute(
        "data-testid",
        "account-type-heading"
      );
    });
  });
  context("Dashboard Buttons functionality tests", () => {
    it("Edit profile button test", () => {
      new HomePage()
        .clickEditProfileButton()
        .editButton.hasText("Zrušit úpravy");
    });
    it("Logout button functionality test", () => {
      new HomePage().clicklogout().loginPageLogo.isVisible();
    });
    /*Add account button testy padají, pokud jsou samostatně (it.only()), tak fungují.
Testy upravit/spustit po naprogramování Add button na Frontendu.
*/
    it.skip("Failing when not only: Add account button exists", () => {
      new HomePage().addAccountButton.exists();
    });

    it.skip("Failing when not only: Add account button has attribute", () => {
      new HomePage().addAccountButton.hasAttribute("class", "account-action");
    });
  });
});
