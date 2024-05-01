import { customElement } from "../../helpers/custom_elements";
import { BasePage } from "./base_page";

export class FooterSection extends BasePage {
  constructor(path) {
    super(path);
    this.footer = customElement("[class='dashboard-footer']");
  }
}
