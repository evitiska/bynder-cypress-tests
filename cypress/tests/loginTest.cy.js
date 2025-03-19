import LoginPage from "../e2e/pages/LoginPage";
import DashboardPage from "../e2e/pages/DashboardPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe("Login functionality tests", () => {
  beforeEach(() => {
    loginPage.navigate();
    loginPage.acceptCookiesButton().click();
    loginPage.loginForm().should("be.visible");
  });

  it("User can navigate to the login page and check all main elements on the page", () => {
    loginPage.loginFormTitle().should("be.visible");
    loginPage.loginFormTitle().should("contain.text", "Wave");
    loginPage.email().should("be.visible");
    loginPage.email().should("have.attr", "placeholder", "Email/Username");
    loginPage.password().should("be.visible");
    loginPage.password().should("have.attr", "placeholder", "Password");
    loginPage.loginButton().should("be.visible");
    loginPage.loginButton().shouldHaveTextAfterTrimming("Login");
    loginPage.forgotPasswordLink().should("be.visible");
    loginPage.forgotPasswordLink().shouldHaveTextAfterTrimming("Lost password?");
    loginPage.logo().should("be.visible");
    loginPage.logo().shouldHaveTextAfterTrimming("Bynder");
    loginPage.languageDropdown().should("be.visible");
    loginPage.languageDropdown().should("contain.text", "Language");
    loginPage.supportButton().should("be.visible");
    loginPage.supportButton().shouldHaveTextAfterTrimming("Support");
    loginPage.cookiesPreferencesButton().should("be.visible");
    loginPage.cookiesPreferencesButton().shouldHaveTextAfterTrimming("Cookies");
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

  it("User cannot access the dashboard by directly navigating through the link", () => {
    dashboardPage.navigate();
    cy.url().should("include", "/login/redirectToken/");
    loginPage.loginForm().should("be.visible");
  });

  it("User can change the language of the login page", () => {
    loginPage.forgotPasswordLink().should("be.visible");
    loginPage.forgotPasswordLink().shouldHaveTextAfterTrimming("Lost password?");
    loginPage.languageDropdown().should("be.visible");
    loginPage.languageDropdown().click();
    loginPage.selectLanguageFromDD("Nederlands (Nederland)");
    loginPage.loginForm().should("be.visible");
    loginPage.forgotPasswordLink().shouldHaveTextAfterTrimming("Wachtwoord vergeten?");
  });

  // NOTE: The following tests are flaky and therefore skipped.
  // Occasionaly, the tests fail because the browser is redirected to a /verify page that has a captcha.
  // The tests are valid and usually pass, just not always.
  // I requested a specific user agent or other tool to prevent the captcha from appearing, but I did not receive a response.
  // Another option would be to use an intercept to check if the browser is redirected to /verify, but that would not help in satisfying the test assertion.
  
  it.skip("User cannot login with invalid password", () => {
    loginPage.login(Cypress.env('USERNAME'), 'invalidpassword');
    loginPage.loginErrorMessage().should("be.visible")
    loginPage.loginErrorMessage().should("have.text", "\n\tYou have entered an incorrect username or password.\n");
  });

  it.skip("User cannot login with invalid username", () => {
    loginPage.login('invalidusername', Cypress.env('PASSWORD'));
    loginPage.loginErrorMessage().should("be.visible")
    loginPage.loginErrorMessage().should("have.text", "\n\tYou have entered an incorrect username or password.\n");
  });
});