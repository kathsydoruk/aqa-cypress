import BaseElements from "../Elements/baseElements";

class Header {
  #baseElements = new BaseElements();
  get btnHome() {
    return this.#baseElements.getElement('nav.header_nav a[routerlink="/"]');
  }
  get btnAbout() {
    return this.#baseElements.getElement(
      'nav.header_nav button[appscrollto="aboutSection"]'
    );
  }
  get btnContacts() {
    return this.#baseElements.getElement(
      'nav.header_nav button[appscrollto="contactsSection"]'
    );
  }
  get btnGuestLogIn() {
    return this.#baseElements.getElement("button.header-link.-guest");
  }
  get btnSignIn() {
    return this.#baseElements.getElement("button.header_signin");
  }
  get btnSignUp() {
    return this.#baseElements.getElement("button.hero-descriptor_btn");
  }
}

class Footer {
  #baseElements = new BaseElements();

  // === Socials ===
  get facebook() {
    return this.#baseElements.getElement('a[href*="facebook"]');
  }

  get telegram() {
    return this.#baseElements.getElement('a[href*="t.me"]');
  }

  get youtube() {
    return this.#baseElements.getElement('a[href*="youtube"]');
  }

  get instagram() {
    return this.#baseElements.getElement('a[href*="instagram"]');
  }

  get linkedin() {
    return this.#baseElements.getElement('a[href*="linkedin"]');
  }

  // === Contacts ===
  get linkWebsite() {
    return this.#baseElements.getElement('a.contacts_link[href*="ithillel.ua"]');
  }

  get linkEmail() {
    return this.#baseElements.getElement('a.contacts_link[href^="mailto"]');
  }
}

export const header = new Header();
export const footer = new Footer();
