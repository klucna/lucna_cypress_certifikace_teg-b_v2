import { customElement } from "../../helpers/custom_elements";
import { BasePage } from "./base_page";

export class MenuSection extends BasePage {
  constructor(path) {
    super(path);
    this.homeMenu = customElement("//aside[@class='dashboard-sidebar']//li[1]");
    this.accountsMenu = customElement(
      "//aside[@class='dashboard-sidebar']//li[2]"
    );
    this.transactionsMenu = customElement(
      "//aside[@class='dashboard-sidebar']//li[3]"
    );
    this.supportMenu = customElement(
      "//aside[@class='dashboard-sidebar']//li[4]"
    );
  }
}
