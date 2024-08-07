beforeEach(() => {
  cy.defaultLogin();
});

const email = 'cypress-test@example.com';
const user_name = 'Cypress Test';

const cardRowRight = (text: string) => `div:has(> span:contains("${text}")) > :last-child`;

describe('User tests', () => {
  it('should be able to navigate to the "new user" page', () => {
    cy.visit('/admin/users');

    cy.toggleMode();

    cy.get('a:contains("Add User")').should('exist').click();

    cy.url().should('include', '/admin/users/new');
  });
  if (Cypress.env('skip') == false) {
    it('should create a new user', () => {
      cy.visit('/admin/users/new');

      cy.get(cardRowRight('Name')).type(user_name);
      cy.get(cardRowRight('Email')).type(email);
      cy.get(cardRowRight('Contact enables')).click();
      cy.get(cardRowRight('Weekly notifications')).click();
      cy.get(cardRowRight('Terms accepted')).click();

      cy.get('button:has(span:contains("Save"))').click();

      cy.url().should('match', /\/admin\/users\/\d+/);

      cy.toggleMode();

      cy.get(cardRowRight('Email')).should('contain.text', email);
      cy.get(cardRowRight('Name')).should('contain.text', user_name);
    });
  }
  if (Cypress.env('skip') == false) {
    it('should edit an existing user', () => {
      cy.visit('/admin/users');

      cy.get('tbody > tr:last-child').click();

      cy.url().should('match', /\/admin\/users\/\d+/);

      cy.toggleMode();

      const newEmail = 'new2@email.test';

      cy.get(cardRowRight('Email')).should('not.be.disabled').clear().type(newEmail);

      cy.get('button:has(span:contains("Save"))').click();

      cy.toggleMode();

      cy.get(cardRowRight('Email')).should('contain.text', newEmail);
    });
  }

  it('should be able to delete the created user', () => {
    cy.visit('/admin/users');
    cy.toggleMode();
    cy.wait(100);
    cy.get('tbody').find('tr').last().as('lastRow');
    cy.get('@lastRow').scrollIntoView();
    cy.wait(100);
    cy.get('@lastRow').click();
    cy.wait(100);
    cy.get('button:contains("Delete User")').should('not.be.disabled').click();
  });
});
