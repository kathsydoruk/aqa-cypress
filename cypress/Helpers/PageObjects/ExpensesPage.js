import BaseElements from "../Elements/baseElements.js";

class ExpensesPage {
  #baseElements = new BaseElements();

  // ===== Page =====
  get addExpenseBtn() {
    return this.#baseElements.getByText("button", "Add an expense");
  }

  // ===== Modal =====
  get vehicleSelect() {
    return this.#baseElements.getElement(
      "app-add-expense-modal select#addExpenseCar"
    );
  }

  get reportDateInput() {
    return this.#baseElements.getElement(
      "app-add-expense-modal input#addExpenseDate"
    );
  }

  get mileageInput() {
    return this.#baseElements.getElement(
      "app-add-expense-modal input#addExpenseMileage"
    );
  }

  get litersInput() {
    return this.#baseElements.getElement(
      "app-add-expense-modal input#addExpenseLiters"
    );
  }

  get totalCostInput() {
    return this.#baseElements.getElement(
      "app-add-expense-modal input#addExpenseTotalCost"
    );
  }

  get submitExpenseBtn() {
    return this.#baseElements.getByText("app-add-expense-modal button", "Add");
  }

  get cancelExpenseBtn() {
    return this.#baseElements.getByText(
      "app-add-expense-modal button",
      "Cancel"
    );
  }

  // ===== Page (Expenses list) =====
  get carDropdownButton() {
    return this.#baseElements.getElement("#carSelectDropdown");
  }

  get carDropdownMenu() {
    return this.#baseElements.getElement(
      'ul[aria-labelledby="carSelectDropdown"]'
    );
  }

  get carDropdownItems() {
    return this.#baseElements.getElement(
      'ul[aria-labelledby="carSelectDropdown"] li'
    );
  }

  get expensesTable() {
    return this.#baseElements.getElement("table.expenses_table");
  }

  get expenseRows() {
    return this.#baseElements.getElement("table.expenses_table tbody tr");
  }

  // ===== Actions =====
  addExpense({ mileage, liters, totalCost }) {
    this.mileageInput.clear().type(mileage);
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(totalCost);

    this.submitExpenseBtn.click();
  }

  selectCarOnExpensesPage(carName) {
    this.carDropdownButton.should("be.visible").click();
    this.carDropdownMenu.should("be.visible");
    this.carDropdownItems.contains(carName).should("be.visible").click();
    this.carDropdownButton.should("contain.text", carName);
  }

  getExpenseRowByMileage(mileage) {
    return this.expenseRows.contains(String(mileage)).closest("tr");
  }

  assertExpenseRow({ date, mileage, liters, totalCost }) {
    this.getExpenseRowByMileage(mileage)
      .should("be.visible")
      .within(() => {
        
        cy.contains(String(mileage)).should("exist");
        cy.contains(String(liters)).should("exist");
        cy.contains(String(totalCost)).should("exist");
      });
  }
}

export const expensesPage = new ExpensesPage();
