export default class BaseElements {
  getElement(selector) {
    return cy.get(selector);
  }
  getByText(text) {
    return cy.contains(text);
  }
}
