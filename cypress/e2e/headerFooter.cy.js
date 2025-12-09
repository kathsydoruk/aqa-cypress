import { BasePage } from "../Helpers/PageObjects/BasePage";
import { header } from "../Helpers/PageObjects/pageElements";
import { footer } from "../Helpers/PageObjects/pageElements";
import { modals } from "../Helpers/PageObjects/modalElements";

describe("Header navigation and Sign up button", () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.navigate();
  });

  it("TC1 Headers buttons are visible and clickable", () => {
    header.btnHome.should("be.visible").click();
    header.btnAbout.should("be.visible").click();
    header.btnContacts.should("be.visible").click();
  });

  it("TC2 Guest log in button redirection to the guest page", () => {
    header.btnGuestLogIn.should("be.visible").click();
    cy.url().should("include", "/panel/garage");
  });

  it("TC3 Sign In modal should open after clicking Sign In button", () => {
    header.btnSignIn.should("be.visible").click();
    modals.modalSingIn.should("be.visible");
  });

  it("TC4 Sign up button opens the registration modal", () => {
    header.btnSignUp.should("be.visible").click();
    modals.modalSingUp.should("be.visible");
    modals.titleSignUp.should("contain", "Registration");
  });

  it("TC5 Footer links elements are presented ", () => {
    footer.facebook.should("be.visible").and("have.attr", "href");
    footer.telegram.should("be.visible");
    footer.youtube.should("be.visible");
    footer.instagram.should("be.visible");
    footer.linkedin.should("be.visible");

    footer.linkWebsite.should("contain", "ithillel.ua");
    footer.linkEmail.should("contain", "support@ithillel.ua");
  });
});
