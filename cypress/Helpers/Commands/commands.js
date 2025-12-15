import { modals } from "../PageObjects/modalElements";
import { header } from "../PageObjects/pageElements";

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
