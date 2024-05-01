export class LoginApi {
  login(username, password) {
    return cy.request({
      method: "POST",
      url: Cypress.env("tegb_be_url") + "tegb/login",
      body: {
        username: username,
        password: password,
      },
    });
  }
}
