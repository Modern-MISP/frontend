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
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/event');
  });
});

describe('login password', () => {
  it('should login with password', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[name="password"]').type(Cypress.env('adminPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/event');
  });

  it('should fail login with wrong password', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[name="password"]').type('wrong-password');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should alert "Please Contact your Administrator to reset your password."', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.visit('/login');
    cy.get('a[href="/login"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          'Please Contact your Administrator to reset your password.'
        );
      });
  });
});

describe('add tag to event', () => {
  beforeEach(() => {
    cy.defaultLogin();
    cy.visit('/events/2/galaxies');
    cy.toggleMode();
  });
});
