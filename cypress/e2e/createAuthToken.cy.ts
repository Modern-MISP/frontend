beforeEach(() => {
  cy.defaultLogin();
});

describe('authToken', () => {
  it('should be able to navigate to the page', () => {
    cy.visit('/admin/keys');
    cy.toggleMode();

    cy.get('a:contains("Add Key")').should('exist').click();

    cy.url().should('include', '/admin/keys/new');
  });

  it('should be able to create a new token', () => {
    cy.visit('/admin/keys/new');
    cy.get('button:contains("Save")').should('exist').click();

    cy.url().should('match', /\/admin\/keys\/\d+/);
  });

  it('should be able to create a new token with comment', () => {
    cy.visit('/admin/keys/new');
    cy.get('input[name="comment"]').type('test comment');
    cy.get('button:contains("Save")').should('exist').click();

    cy.url().should('match', /\/admin\/keys\/\d+/);
    cy.toggleMode();

    cy.get('div:contains("test comment")').should('exist');
  });
});
