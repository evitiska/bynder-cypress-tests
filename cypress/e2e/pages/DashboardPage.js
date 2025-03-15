import BasePage from './BasePage';

class DashboardPage extends BasePage {
  navigate() {
    cy.visit('/account/dashboard/');
  }

  dashboardCarousel() {
    return cy.get('.collection-stream > #carousel-holder');
  }

  profileLink() {
    return cy.get('.admin-dropdown.profile');
  }

  profileDropdown() {
    return cy.get('.admin-dropdown > .single');
  }

  logoutButton() {
    return cy.get('.logout');
  }
}
export default DashboardPage;
