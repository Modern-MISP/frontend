beforeEach(() => {
  cy.defaultLogin();
});

const email = 'cypress-test@example.com';

const cardRowRight = (text: string) => `div:has(> span:contains("${text}")) > :last-child`;

describe('User tests', () => {
  it('should be able to navigate to the "new user" page', () => {
    cy.visit('/admin/users');

    cy.toggleMode();

    cy.get('a:contains("Add User")').should('exist').click();

    cy.url().should('include', '/admin/users/new');
  });

  it('should create a new user', () => {
    cy.visit('/admin/users/new');

    cy.get(cardRowRight('Email')).type(email);
    cy.get(cardRowRight('Contact enables')).click();
    cy.get(cardRowRight('Weekly notifications')).click();
    cy.get(cardRowRight('Terms accepted')).click();

    cy.get('button:has(span:contains("Save"))').click();

    cy.url().should('match', /\/admin\/users\/\d+/);

    cy.toggleMode();

    cy.get(cardRowRight('Email')).should('contain.text', email);
  });

  it('should edit an existing user', () => {
    cy.visit('/admin/users');

    cy.get('tbody').find('tr').last().click();

    cy.toggleMode();

    const appendedText = 'aaa';

    cy.get(cardRowRight('Email')).should('not.be.disabled').type(appendedText);

    cy.get('button:has(span:contains("Save"))').click();

    cy.toggleMode();

    cy.get(cardRowRight('Email')).should('contain.text', email + appendedText);
  });

  it('should be able to delete the created user', () => {
    cy.visit('/admin/users');
    cy.toggleMode();
    cy.get('tbody').find('tr').last().click();
    cy.get('button:contains("Delete User")').click();
  });
});
