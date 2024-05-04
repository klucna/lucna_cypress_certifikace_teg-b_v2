import { customElement } from "../helpers/custom_elements";
import { HomePage } from "./home_page";

export class EditProfilePage {
  constructor() {
    this.firstName = customElement("input[data-testid='chage-name-input']");
    this.lastName = customElement("input[data-testid='chage-surname-input']");
    this.email = customElement("input[data-testid='chage-email-input']");
    this.phoneNumber = customElement("input[data-testid='chage-phone-input']");
    this.age = customElement("input[data-testid='chage-age-input']");
    this.saveButton = customElement(
      "button[data-testid='save-changes-button']"
    );
    this.editButton = customElement(
      "button[data-testid='toggle-edit-profile-button']"
    );
  }

  typeFirstName(firstname) {
    this.firstName.get().type(firstname);
    return this;
  }

  typeLastName(lastname) {
    this.lastName.get().type(lastname);
    return this;
  }

  typeEmail(email) {
    this.email.get().type(email);
    return this;
  }

  typePhoneNumber(phonenumber) {
    this.phoneNumber.get().type(phonenumber);
    return this;
  }

  typeAge(age) {
    this.age.get().type(age);
    return this;
  }

  clickSaveChangesButton() {
   this.saveButton.get().click();
    return new HomePage();
  }
}
