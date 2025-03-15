class BasePage {
  navigate() {
    cy.visit("/");
  }

  cookieBanner() {
    return cy.get(".osano-cm-window__dialog");
  }

  acceptCookiesButton() {
    return cy.get(".osano-cm-accept-all");
  }

  acceptCookies() {
    this.acceptCookiesButton().click();
  }

  languageDropdown() {
    return cy.get(".admin-options");
  }

  selectLanguageFromDD(language) {
    this.languageDropdown().find(".admin-option").contains(language).click();
  }
}
export default BasePage;
