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

const password = 'password';
const email2 = 'cypress-test@example.com';
const user_name2 = 'Cypress Test';

const cardRowRight2 = (text: string) => `div:has(> span:contains("${text}")) > :last-child`;

describe('change password', () => {
  before(() => {
    cy.defaultLogin();
    cy.visit('/admin/users/new');

    cy.get(cardRowRight2('Name')).type(user_name2);
    cy.get(cardRowRight2('Email')).type(email2);
    cy.get(cardRowRight2('Password')).clear().type(password);
    cy.get(cardRowRight2('Contact enables')).click();
    cy.get(cardRowRight2('Weekly notifications')).click();
    cy.get(cardRowRight2('Terms accepted')).click();

    cy.get('button:has(span:contains("Save"))').click();

    cy.url().should('match', /\/admin\/users\/\d+/);

    cy.clearAllSessionStorage();
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email2);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login/setPassword');
  });

  after(() => {
    cy.clearAllSessionStorage();
    cy.defaultLogin();
    cy.visit('/admin/users');
    cy.toggleMode();

    cy.get('tbody > tr:last-child').click();
    cy.url().should('match', /\/admin\/users\/\d+/);
    cy.get('button:has(span:contains("Delete"))').click();
  });

  it('should not allow to set the unsafe password', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('input[name="old-password"]').type(password);
    cy.get('input[name="password"]').type('password123');
    cy.wait(1000);
    cy.get('input[name="password-repeat"]').type('password123', { force: true });
    cy.wait(1000);
    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          'Your password was exposed by a data breach on the Internet.'
        );
      });

    cy.url().should('include', '/login/setPassword');
  });

  it('should allow to set the safe password', () => {
    cy.get('input[name="old-password"]').type(password);
    cy.get('input[name="password"]').type('DiesesWortIstSoLangDamitIchsMirGutMerkenKann');
    cy.wait(1000);
    cy.get('input[name="password-repeat"]').type('DiesesWortIstSoLangDamitIchsMirGutMerkenKann', {
      force: true
    });
    cy.wait(1000);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/events');
  });
});
