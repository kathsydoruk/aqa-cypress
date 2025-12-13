import { BasePage } from "../Helpers/PageObjects/BasePage";
import { header } from "../Helpers/PageObjects/pageElements";
import { modals } from "../Helpers/PageObjects/modalElements";
import "../Helpers/Commands/commands";

describe("Sign In Form functionality check", () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.navigate();
    header.btnSignIn.should("be.visible").click();
    modals.modalSingIn.should("be.visible");
    modals.titleModal.should("contain", "Log in");
  });

  it("TC13 User can register with existed user", () => {
    cy.login("q1@test.co", "Qwertyu1");
    cy.url().should("include", "/panel/garage");
    cy.contains("Log in").should("not.exist");
    header.garagePageTitle
      .should("contain.text", "Garage")
      .should("be.visible");
    header.garageProfile
      .should("contain.text", "My profile")
      .should("be.visible")
      .click();
    header.garageDropdownProfile
      .should("contain.text", "Profile")
      .should("be.visible")
      .click();
    cy.url().should("include", "/panel/profile");
    header.profilePageTitle
      .should("contain.text", "Profile")
      .should("be.visible");
    header.profilePageUserName
      .should("contain.text", "qwerty qwerty")
      .should("be.visible");
  });
});
