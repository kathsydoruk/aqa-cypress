import BaseElements from "../Elements/baseElements";

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

  // ===== Actions =====
  addExpense({ mileage, liters, totalCost }) {
    
    this.mileageInput.clear().type(mileage);
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(totalCost);

    this.submitExpenseBtn.click();
  }
}

export const expensesPage = new ExpensesPage();
