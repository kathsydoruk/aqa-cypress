import { BasePage } from "../Helpers/PageObjects/BasePage.js";
import { header } from "../Helpers/PageObjects/PageElements.js";
import { modals } from "../Helpers/PageObjects/ModalElements.js";
import { garagePage } from "../Helpers/PageObjects/GaragePage.js";
import { expensesPage } from "../Helpers/PageObjects/ExpensesPage.js";
import "../Helpers/Commands/commands.js";

describe("Garage and Fuel Expenses flow", () => {
  const basePage = new BasePage();
  const carName = "BMW X6";

  beforeEach(() => {
    basePage.navigate();

    header.btnSignIn.click();
    modals.modalSingIn.should("be.visible");
    modals.titleModal.should("contain", "Log in");

    cy.login(Cypress.env("testUserEmail"), Cypress.env("testUserPassword"));
  });

  afterEach(() => {
    basePage.navigate();
    garagePage.removeCar(carName);
  });

  it("TC14 Adds a car and adds fuel expenses to it", () => {
    garagePage.addCar("BMW", "X6", "120000");
    garagePage.getCarName(carName).should("be.visible");

    garagePage.getAddFuelExpenseButton(carName).click();

    expensesPage.submitExpenseBtn.should("be.disabled");

    expensesPage.addExpense({
      mileage: "125000",
      liters: "50",
      totalCost: "2000",
    });

    cy.contains("50").should("exist");
    cy.contains("2000").should("exist");
  });
});
