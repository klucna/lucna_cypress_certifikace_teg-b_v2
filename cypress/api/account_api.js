export class AccountApi {
  createAccount(token, balance, type) {
    return cy.request({
      method: "POST",
      url: Cypress.env("tegb_be_url") + "tegb/accounts/create",
      headers: {
        authorization: "Bearer " + token,
      },
      body: {
        startBalance: balance,
        type: type,
      },
    });
  }
}
