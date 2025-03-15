import LoginPage from "../e2e/pages/LoginPage";
import DashboardPage from "../e2e/pages/DashboardPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe("Login functionality tests", () => {
  beforeEach(() => {
    loginPage.navigate();
    loginPage.cookieBanner().should("be.visible");
    loginPage.acceptCookies();
    loginPage.loginForm().should("be.visible");
  });

  it("Registered user can successfully log in and log out", () => {
    loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
    cy.url().should("include", "/account/dashboard");
    dashboardPage.dashboardCarousel().should("be.visible");
    dashboardPage.profileLink().should("be.visible");
    dashboardPage.profileLink().click();
    dashboardPage.profileDropdown().should("be.visible");
    dashboardPage.logoutButton().should("be.visible");
    dashboardPage.logoutButton().click();
    cy.url().should("include", "/login");
    loginPage.loginForm().should("be.visible");
    loginPage.loginNotificationMessage().should("be.visible");
    loginPage.loginNotificationMessage().should("have.text", "\n\tYou have successfully logged out.\n");
  });

  it("User cannot login with invalid password", () => {
    loginPage.login(Cypress.env('USERNAME'), 'fdhjkgkld;');
    loginPage.loginErrorMessage().should("be.visible");
    loginPage.loginErrorMessage().should("have.text", "\n\tYou have entered an incorrect username or password.\n");
  });

  // flaky - no error message displayed
  // it("User cannot login with invalid email", () => {
  //   loginPage.navigate();
  //   loginPage.loginForm().should("be.visible");
  //   loginPage.login('sssssss@', Cypress.env('PASSWORD'));
  //   loginPage.loginErrorMessage().should("be.visible");
  //   loginPage.loginErrorMessage().should("have.text", "\n\tYou have entered an incorrect username or password.\n");
  // });

  it("User cannot access the dashboard by directly navigating through the link", () => {
    dashboardPage.navigate();
    cy.url().should("include", "/login/redirectToken/");
    loginPage.loginForm().should("be.visible");
  });

  it("User can change the language of the login page", () => {
    loginPage.forgotPasswordLink().should("be.visible");
    loginPage.forgotPasswordLink().should("contain.text", "Lost password?");
    loginPage.languageDropdown().should("be.visible");
    loginPage.languageDropdown().click();
    loginPage.selectLanguageFromDD("Nederlands (Nederland)");
    loginPage.loginForm().should("be.visible");
    loginPage.forgotPasswordLink().should("contain.text", "Wachtwoord vergeten?");
  });

});
