import BaseElements from "../Elements/baseElements";

class GaragePage {
  #baseElements = new BaseElements();

  // ===== Page =====
  get addCarBtn() {
    return this.#baseElements.getByText("button", "Add car");
  }

  // ===== Add car modal =====
  get carBrandSelect() {
    return this.#baseElements.getElement(
      "app-add-car-modal select#addCarBrand"
    );
  }

  get carModelSelect() {
    return this.#baseElements.getElement(
      "app-add-car-modal select#addCarModel"
    );
  }

  get carMileageInput() {
    return this.#baseElements.getElement(
      "app-add-car-modal input#addCarMileage"
    );
  }

  get saveCarBtn() {
    return this.#baseElements.getByText("app-add-car-modal button", "Add");
  }

  get cancelCarBtn() {
    return this.#baseElements.getByText("app-add-car-modal button", "Cancel");
  }

  // ===== Car card (created car) =====
  getCarContainer(carName) {
    return this.#baseElements
      .getByText("p.car_name", carName)
      .closest("li.car-item");
  }

  getCarName(carName) {
    return this.getCarContainer(carName).find("p.car_name");
  }

  getEditCarButton(carName) {
    return this.getCarContainer(carName).find("button.car_edit");
  }

  getAddFuelExpenseButton(carName) {
    return this.getCarContainer(carName).find("button.car_add-expense");
  }

  getMileageInput(carName) {
    return this.getCarContainer(carName).find('input[type="number"]');
  }

  getUpdateMileageButton(carName) {
    return this.getCarContainer(carName).contains("button", "Update");
  }

  // ===== Remove car modal =====
  get removeCarFromEditBtn() {
    return this.#baseElements.getByText(
      "app-edit-car-modal button",
      "Remove car"
    );
  }
  get confirmRemoveCarBtn() {
    return this.#baseElements.getElement(
      "app-remove-car-modal button.btn-danger"
    );
  }

  get cancelRemoveCarBtn() {
    return this.#baseElements.getByText(
      "app-remove-car-modal button",
      "Cancel"
    );
  }

  // ===== Actions =====
  addCar(brand, model, mileage) {
    this.addCarBtn.click();
    this.carBrandSelect.select(brand);
    this.carModelSelect.select(model);
    this.carMileageInput.clear().type(mileage);
    this.saveCarBtn.click();
  }

  removeCar(carName) {
    this.getEditCarButton(carName).should("be.visible").click();
    this.removeCarFromEditBtn.should("be.visible").click();
    this.confirmRemoveCarBtn.should("be.visible").click();
  }
}

export const garagePage = new GaragePage();
