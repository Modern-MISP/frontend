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
    cy.visit('/admin/keys');
    cy.toggleMode();
    cy.contains('Add Key').click();

    cy.contains('Save').click();

    cy.get('#authkey-popup', { timeout: 10000 }).should('be.visible');

    cy.get('#authkey-popup p strong')
      .invoke('text')
      .then((authKey) => {
        const first4 = authKey.slice(0, 4);
        const last4 = authKey.slice(-4);

        cy.log(`Auth Key: ${authKey}`);
        cy.log(`First 4 characters: ${first4}`);
        cy.log(`Last 4 characters: ${last4}`);

        cy.contains('I have noted down my key').click();

        cy.contains(first4).parent().contains(last4).click();

        cy.contains('Delete').click();
      });
  });

  it('should be able to create a new token with comment', () => {
    cy.visit('/admin/keys');
    cy.toggleMode();
    cy.contains('Add Key').click();

    cy.get('input[name="comment"]').type('cypress_test');
    cy.contains('Save').click();

    cy.get('#authkey-popup', { timeout: 10000 }).should('be.visible');

    cy.get('#authkey-popup p strong')
      .invoke('text')
      .then((authKey) => {
        const first4 = authKey.slice(0, 4);
        const last4 = authKey.slice(-4);

        cy.log(`Auth Key: ${authKey}`);
        cy.log(`First 4 characters: ${first4}`);
        cy.log(`Last 4 characters: ${last4}`);

        cy.contains('I have noted down my key').click();
        cy.contains('cypress_test');

        cy.contains(first4).parent().contains(last4).click();

        cy.contains('Delete').click();
      });
  });
});
