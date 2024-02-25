const routes = ['/events', '/settings', '/events/2', '/events/2/graph', '/admin/users'];

describe('auth redirects', () => {
  it('should redirect if not authenticated', () => {
    for (const route of routes) {
      cy.visit(route);
      cy.wait(100);
      cy.url().should('include', '/login');
    }
  });

  it('should redirect to /events if authenticated', () => {
    cy.defaultLogin();
    cy.visit('/');
  });

  it('should allow navigation if authenticated', () => {
    cy.defaultLogin();
    for (const route of routes) {
      cy.visit(route);
      cy.wait(100);
      cy.url().should('include', route);
    }
  });
});

describe('login', () => {
  it('should login with default token', () => {
    cy.visit('/login');
    cy.get('input[name="token"]').type(Cypress.env('adminToken'));
    cy.get('button').click();
    cy.url().should('include', '/event');
  });
});
