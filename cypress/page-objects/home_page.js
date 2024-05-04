import { customElement } from "../helpers/custom_elements";
import { HeaderSection } from "./common/header_section";
import { EditProfilePage } from "./edit_profile_page";

export class HomePage extends HeaderSection {
  constructor() {
    super("dashboard");
    this.profileDetailHeader = customElement(
      "h2[data-testid='profile-details-title']"
    );
    this.editProfileButton = customElement(
      "button[data-testid='toggle-edit-profile-button']"
    );
    this.firstName = customElement("div[data-testid='name']");
    this.lastName = customElement("div[data-testid='surname']");
    this.email = customElement("div[data-testid='email']");
    this.phoneNumber = customElement("div[data-testid='phone']");
    this.age = customElement("div[data-testid='age']");
    this.addAccountButton = customElement("button[class='account-action']");
    this.accountsHeader = customElement("h2[data-testid='accounts-title']");
    this.addAccountButton = customElement("button[class='account-action']");
    this.accountNumberHeading = customElement(
      "table[class='accounts-table'] tr[class='account-heading'] th[data-testid='account-number-heading']"
    );
    this.accountBalanceHeading = customElement(
      "table[class='accounts-table'] tr[class='account-heading'] th[data-testid='account-balance-heading']"
    );
    this.accountTypeHeading = customElement(
      "table[class='accounts-table'] tr[class='account-heading'] th[data-testid='account-type-heading']"
    );
    this.accountRow = customElement(
      "table[class='accounts-table'] tr[class='account-row']"
    );
    this.accountBalance = customElement(
      "table[class='accounts-table'] tr[class='account-row'] td[data-testid='account-balance']"
    );
    this.accountType = customElement(
      "table[class='accounts-table'] tr[class='account-row'] td[data-testid='account-type']"
    );
  }

  clickEditProfileButton() {
    this.editProfileButton.get().click();
    return new EditProfilePage();
  }

  firstNameContainText(firstname) {
    this.firstName.containsText(firstname);
    return this;
  }

  lastNameContainText(lastname) {
    this.lastName.containsText(lastname);
    return this;
  }

  emailContainText(email) {
    this.email.containsText(email);
    return this;
  }

  phoneNumberContainNumber(phonenumber) {
    this.phoneNumber.containsText(phonenumber);
    return this;
  }

  ageContainNumber(age) {
    this.age.containsText(age);
    return this;
  }

  accountRowIsVisible() {
    this.accountRow.isVisible();
    return this;
  }

  accountBalanceContainsText(startBalance) {
    this.accountBalance.containsText(startBalance);
    return this;
  }

  accountTypeContainsText(type) {
    this.accountType.containsText(type);
    return this;
  }
}
