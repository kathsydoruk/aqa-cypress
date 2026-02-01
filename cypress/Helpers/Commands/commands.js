import { modals } from "../PageObjects/ModalElements.js";
import { header } from "../PageObjects/PageElements.js";

Cypress.Commands.overwrite(
  "type",
  (originalFn, element, text, options = {}) => {
    if (options.sensitive) {
      options.log = false;

      Cypress.log({
        $el: element,
        name: "type",
        message: "*".repeat(text.length),
      });
    }

    return originalFn(element, text, options);
  }
);

Cypress.Commands.add("login", (email, password) => {
  modals.signInEmailInput.clear().type(email);
  modals.signInPasswordInput.clear().type(password, { sensitive: true });
  modals.signInLoginButton.click();
});

Cypress.Commands.add("getSidCookieHeader", () => {
  return cy
    .getCookie("sid", { timeout: 10000 })
    .should("exist")
    .then((cookie) => {
      return { Cookie: `sid=${cookie.value}` };
    });
});

Cypress.Commands.add(
  "createExpenseApi",
  ({ carId, reportedAt, mileage, liters, totalCost }) => {
    return cy.getSidCookieHeader().then((headers) => {
      return cy.request({
        method: "POST",
        url: "/api/expenses",
        headers,
        body: { carId, reportedAt, mileage, liters, totalCost },
        failOnStatusCode: false,
      });
    });
  }
);

Cypress.Commands.add("deleteCarApi", (carId) => {
  return cy.getSidCookieHeader().then((headers) => {
    return cy.request({
      method: "DELETE",
      url: `/api/cars/${carId}`,
      headers,
      failOnStatusCode: false,
    });
  });
});
