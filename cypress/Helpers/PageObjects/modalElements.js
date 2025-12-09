import BaseElements from "../Elements/baseElements";

class Modals {
  #baseElements = new BaseElements();
  get modalSingIn() {
    return this.#baseElements.getElement("app-signin-modal");
  }
  
  get modalSingUp() {
    return this.#baseElements.getElement("app-signup-modal");
  }

  get titleSignUp() {
    return this.#baseElements.getElement("h4.modal-title");
  }
}

export const modals = new Modals();
