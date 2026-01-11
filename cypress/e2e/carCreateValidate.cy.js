import { BasePage } from "../Helpers/PageObjects/BasePage";
import { header } from "../Helpers/PageObjects/pageElements";
import { modals } from "../Helpers/PageObjects/modalElements";
import { garagePage } from "../Helpers/PageObjects/garagePage";
import { expensesPage } from "../Helpers/PageObjects/expensesPage";
import "../Helpers/Commands/commands";

describe("API checks examples", () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.navigate();

    header.btnSignIn.click();
    modals.modalSingIn.should("be.visible");
    modals.titleModal.should("contain", "Log in");

    cy.login(Cypress.env("testUserEmail"), Cypress.env("testUserPassword"));

    cy.intercept("POST", "**/api/cars").as("createCar");
    garagePage.addCar("BMW", "X6", "120000");

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body).to.have.property("status", "ok");
      expect(response.body.data).to.include({
        brand: "BMW",
        model: "X6",
        mileage: 120000,
      });
      expect(response.body.data.id, "car id").to.be.a("number");
      cy.wrap(response.body.data.id).as("carId");
    });
  });

  afterEach(() => {
    cy.get("@carId").then((carId) => {
      cy.deleteCarApi(carId).then((res) => {
        expect([200, 204]).to.include(res.status);
      });
    });
  });

  it("TC15 check new car in the list by API", () => {
    cy.get("@carId").then((carId) => {
      cy.getSidCookieHeader().then((headers) => {
        cy.request({
          method: "GET",
          url: "/api/cars",
          headers,
        }).then((carsRes) => {
          expect(carsRes.status).to.eq(200);

          const cars = carsRes.body.data;
          const found = cars.find((c) => Number(c.id) === carId);

          expect(found, "created car exists in list").to.exist;
          expect(found.brand).to.eq("BMW");
          expect(found.model).to.eq("X6");
          expect(found.mileage).to.eq(120000);
        });
      });
    });
  });

  it("TC16 create expenses for new car by API", () => {
    cy.get("@carId").then((carId) => {
      cy.createExpenseApi({
        carId,
        reportedAt: new Date().toISOString(),
        mileage: 125000,
        liters: 50,
        totalCost: 200,
      }).then((expRes) => {
        console.log("EXPENSE STATUS:", expRes.status);
        console.log("EXPENSE BODY:", expRes.body);

        expect([200, 201]).to.include(expRes.status);
        expect(expRes.body.status).to.eq("ok");
      });
    });
    cy.get("@carId").then((carId) => {
      cy.intercept("GET", `**/api/expenses?carId=${carId}*`).as("getExpenses");

      header.fuelExpenses.should("be.visible").click();
      cy.url().should("include", "/panel/expenses");

      cy.wait("@getExpenses").its("response.statusCode").should("eq", 200);
      expensesPage.assertExpenseRow({
        mileage: 125000,
        liters: "50L",
        totalCost: "200.00 USD",
      });
    });
  });
});
