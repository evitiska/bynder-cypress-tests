import BasePage from './BasePage';

class LoginPage extends BasePage {
    navigate() {
        cy.visit('/login');
    }

    loginForm() {
        return cy.get('#login > .login-container');
    }

    loginFormTitle() {
        return cy.get('.account-logo');
    }

    email() {
        return cy.get('#inputEmail');
    }

    password() {
        return cy.get('#inputPassword');
    }

    loginButton() {
        return cy.get('.login-btn');
    }

    loginErrorMessage() {
        return cy.get('.cbox_messagebox_error');
    }

    loginNotificationMessage() {
        return cy.get('.cbox_messagebox_info');
    }

    forgotPasswordLink() {
        return cy.get('.lost-password');
    }

    logo() {
        return cy.get('.admin-bar-logo');
    }

    login(email, password) {
        this.email().clear().type(email);
        this.password().clear().type(password);
        this.loginButton().click();
    }
}
export default LoginPage;