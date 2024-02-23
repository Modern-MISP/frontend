before(() => {
  cy.defaultLogin();
});

describe('galaxies', () => {
  it('should be reachable via side menu', () => {
    cy.visit('/events');
    cy.get('aside > nav').find('a[href="/galaxies"]').click();
    cy.wait(100);
    cy.url().should('include', '/galaxies');
  });
});
