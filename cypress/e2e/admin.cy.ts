beforeEach(() => {
  cy.defaultLogin();
});

describe('Admin Tests', () => {
  it('should be able to navigate to the auth key page', () => {
    cy.visit('/admin/keys');

    cy.url().should('include', '/admin/keys');
  });

  it('should block not logged in users from accessing the admin page', () => {
    cy.logout();

    cy.visit('/admin', { failOnStatusCode: false });

    cy.url().should('include', '/login');
  });
});
