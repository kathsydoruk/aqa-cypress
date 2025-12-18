export default class BaseElements {
  getElement(selector) {
    return cy.get(selector);
  }

  getByText(tag, text) {
    return cy.contains(tag, text);
  }

  getWithin(parentSelector, childSelector) {
    return cy.get(parentSelector).find(childSelector);
  }
}