class BasePage {
  navigate() {
    cy.visit("/");
  }

  acceptCookiesButton() {
    // There is no common class or id for the buttons, so we have to find by text.
    // I found discrepancies between running locally and on CI - likely related to region issues.
    // I found variations of 'Accept', 'Accept All', and 'Save'.
    return cy.contains('button', 'Accept')
  }

  languageDropdown() {
    return cy.get(".admin-options");
  }

  selectLanguageFromDD(language) {
    this.languageDropdown().find(".admin-option").contains(language).click();
  }

  supportButton() {
    return cy.get("#custom-support-form-button");
  }

  cookiesPreferencesButton() {
    return cy.get("#cookie-preferences-button");
  }
}

export default BasePage;