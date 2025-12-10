export class BasePage {
  constructor() {
    this.url = "/";
  }
  navigate() {
    cy.visit(this.url, {
      auth: {
        username: Cypress.env("authUsername"),
        password: Cypress.env("authPassword"),
      },
    });
  }
}
