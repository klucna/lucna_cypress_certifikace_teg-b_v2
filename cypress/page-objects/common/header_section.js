import { customElement } from "../../helpers/custom_elements";
import { LoginPage } from "../login_page";
import { MenuSection } from "./menu_section";

export class HeaderSection extends MenuSection {
  constructor(path) {
    super(path);
    this.logoutButton = customElement(".logout-link");
    this.pageTitle = customElement(".app-title");
    this.logo = customElement("img[data-testid='logo-img']");
    this.footer = customElement("[class='dashboard-footer']");
  }

  clicklogout() {
    this.logoutButton.get().click();
    return new LoginPage();
  }
}
