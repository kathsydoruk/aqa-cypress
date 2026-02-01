import { BasePage } from "../Helpers/PageObjects/BasePage.js";
import { header } from "../Helpers/PageObjects/PageElements.js";
import { modals } from "../Helpers/PageObjects/ModalElements.js";
import "../Helpers/Commands/commands";

describe("Sign Up Form functionality check", () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.navigate();
    header.btnSignUp.should("be.visible").click();
    modals.modalSingUp.should("be.visible");
    modals.titleModal.should("contain", "Registration");
  });

  it("TC6 Shows required errors for all mandatory fields when they are empty", () => {
    modals.signUpNameInput.click().blur();
    modals.signUpLastNameInput.click().blur();
    modals.signUpEmailInput.click().blur();
    modals.signUpPasswordInput.click().blur();
    modals.signUpRepeatPasswordInput.click().blur();

    modals
      .getErrorByText("Name required")
      .should("be.visible")
      .should("have.css", "color", "rgb(220, 53, 69)");
    modals.signUpNameInput.should("have.class", "is-invalid");

    modals
      .getErrorByText("Last name required")
      .should("be.visible")
      .should("have.css", "color", "rgb(220, 53, 69)");
    modals.signUpLastNameInput.should("have.class", "is-invalid");

    modals
      .getErrorByText("Email required")
      .should("be.visible")
      .should("have.css", "color", "rgb(220, 53, 69)");
    modals.signUpEmailInput.should("have.class", "is-invalid");

    modals
      .getErrorByText("Password required")
      .should("be.visible")
      .should("have.css", "color", "rgb(220, 53, 69)");
    modals.signUpPasswordInput.should("have.class", "is-invalid");

    modals
      .getErrorByText("Re-enter password required")
      .should("be.visible")
      .should("have.css", "color", "rgb(220, 53, 69)");
    modals.signUpRepeatPasswordInput.should("have.class", "is-invalid");

    //Register button is disabled if data incorrect
    modals.signUpRegisterButton.should("be.disabled");
  });

  it("TC7 Validates Name field length and characters set", () => {
    // Too short Name
    modals.signUpNameInput.clear().type("q").blur();
    modals
      .getErrorByText("Name has to be from 2 to 20 characters long")
      .should("be.visible");
    modals.signUpNameInput.should("have.class", "is-invalid");

    // Too long Name
    const longName = "qwertyqwertyqwertyqwe";
    modals.signUpNameInput.clear().type(longName).blur();
    modals
      .getErrorByText("Name has to be from 2 to 20 characters long")
      .should("be.visible");

    // Valid Name
    modals.signUpNameInput.clear().type("John").blur();
    modals
      .getErrorByText("Name has to be from 2 to 20 characters long")
      .should("not.exist");
    modals.getErrorByText("Name required").should("not.exist");
    modals.signUpNameInput.should("not.have.class", "is-invalid");
  });

  it("TC8 Validates Last Name field length and characters set", () => {
    // Too short Last Name
    modals.signUpLastNameInput.clear().type("q").blur();
    modals
      .getErrorByText("Last name has to be from 2 to 20 characters long")
      .should("be.visible");

    // Too long Last Name
    const longLastName = "qwertyqwertyqwertyqwe";
    modals.signUpLastNameInput.clear().type(longLastName).blur();
    modals
      .getErrorByText("Last name has to be from 2 to 20 characters long")
      .should("be.visible");

    // Valid Last Name
    modals.signUpLastNameInput.clear().type("Doe").blur();
    modals
      .getErrorByText("Last name has to be from 2 to 20 characters long")
      .should("not.exist");
    modals.getErrorByText("Last name required").should("not.exist");
    modals.signUpLastNameInput.should("not.have.class", "is-invalid");
  });

  it("TC9 Validates Email format and required rule", () => {
    // Empty email
    modals.signUpEmailInput.clear().blur();
    modals.getErrorByText("Email required").should("be.visible");
    modals.signUpEmailInput.should("have.class", "is-invalid");

    // Wrong email format
    modals.signUpEmailInput.clear().type("wrong-email").blur();
    modals.getErrorByText("Email is incorrect").should("be.visible");

    // Correct email
    modals.signUpEmailInput.clear().type("valid.email@example.com").blur();
    modals.getErrorByText("Email required").should("not.exist");
    modals.getErrorByText("Email is incorrect").should("not.exist");
    modals.signUpEmailInput.should("not.have.class", "is-invalid");
  });

  it("TC10 Validates Password complexity (length, digit, upper and lower case)", () => {
    // Too short Password
    modals.signUpPasswordInput.clear().type("Qwerty1").blur();
    modals
      .getErrorByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .should("be.visible");

    // No digit Password
    modals.signUpPasswordInput.clear().type("Qwertyui").blur();
    modals
      .getErrorByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .should("be.visible");

    // No capital letter
    modals.signUpPasswordInput.clear().type("qwertyu1").blur();
    modals
      .getErrorByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .should("be.visible");

    // No lowercase letter
    modals.signUpPasswordInput.clear().type("QWERTYU1").blur();
    modals
      .getErrorByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .should("be.visible");

    // Valid password
    modals.signUpPasswordInput.clear().type("ValidPass1").blur();
    modals.getErrorByText("Password required").should("not.exist");
    modals
      .getErrorByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .should("not.exist");
    modals.signUpPasswordInput.should("not.have.class", "is-invalid");
  });

  it("TC11 Validates that Re-enter password matches Password", () => {
    // Fill valid password
    modals.signUpPasswordInput.clear().type("Password1").blur();

    // Empty repeat
    modals.signUpRepeatPasswordInput.clear().blur();
    modals.getErrorByText("Re-enter password required").should("be.visible");

    // Not matching password
    modals.signUpRepeatPasswordInput.clear().type("passworD1").blur();
    modals.getErrorByText("Passwords do not match").should("be.visible");

    // Matching password
    modals.signUpRepeatPasswordInput.clear().type("Password1").blur();
    modals.getErrorByText("Re-enter password required").should("not.exist");
    modals.getErrorByText("Passwords do not match").should("not.exist");
    modals.signUpRepeatPasswordInput.should("not.have.class", "is-invalid");
  });

  it("TC12 Enables Register button only when all data is valid and creates a new user", () => {
    modals.signUpRegisterButton.should("be.disabled");

    const uniqueEmail = `test+${Date.now()}@test.co`;
    const password = "Password1";

    cy.intercept("POST", "**/api/auth/signup").as("signupRequest");

    modals.signUpNameInput.clear().type("John");
    modals.signUpLastNameInput.clear().type("Doe");
    modals.signUpEmailInput.clear().type(uniqueEmail);
    modals.signUpPasswordInput.clear().type(password, { sensitive: true });
    modals.signUpRepeatPasswordInput
      .clear()
      .type(password, { sensitive: true });

    modals.signUpRegisterButton.should("not.be.disabled");
    modals.signUpRegisterButton.click();
    cy.wait("@signupRequest").then(({ request, response }) => {
      expect(request.body.email).to.eq(uniqueEmail);
      expect(response.statusCode).to.eq(201);
      expect(response.body.status).to.eq("ok");
      expect(response.body.data).to.have.property("userId");
    });

    cy.url().should("include", "/panel/garage");
    header.garagePageTitle
      .should("contain.text", "Garage")
      .should("be.visible");
    header.garagePageMsg
      .should("contain.text", "You don’t have any cars in your garage")
      .should("be.visible");
    header.garageProfile
      .should("contain.text", "My profile")
      .should("be.visible");
    modals.modalSingUp.should("not.exist");
  });
});
