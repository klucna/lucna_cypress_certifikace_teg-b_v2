import { customElement } from "../helpers/custom_elements";
import { HomePage } from "./home_page";

export class EditProfilePage {
  constructor() {
    this.firstName = "input[data-testid='chage-name-input']";
    this.lastName = "input[data-testid='chage-surname-input']";
    this.email = "input[data-testid='chage-email-input']";
    this.phoneNumber = "input[data-testid='chage-phone-input']";
    this.age = "input[data-testid='chage-age-input']";
    this.saveButton = "button[data-testid='save-changes-button']";
    this.editButton = customElement(
      "button[data-testid='toggle-edit-profile-button']"
    );
  }

  typeFirstName(firstname) {
    cy.get(this.firstName).type(firstname);
    return this;
  }

  typeLastName(lastname) {
    cy.get(this.lastName).type(lastname);
    return this;
  }

  typeEmail(email) {
    cy.get(this.email).type(email);
    return this;
  }

  typePhoneNumber(phonenumber) {
    cy.get(this.phoneNumber).type(phonenumber);
    return this;
  }

  typeAge(age) {
    cy.get(this.age).type(age);
    return this;
  }

  clickSaveChangesButton() {
    cy.get(this.saveButton).click();
    return new HomePage();
  }
}
