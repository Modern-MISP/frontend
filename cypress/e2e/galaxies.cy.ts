before(() => {
  cy.defaultLogin();
});

describe('galaxies', () => {
  it('should be reachable via side menu', () => {
    cy.visit('/events');
    cy.get('aside > nav').find('a[href="/galaxies"]').click();
    cy.url().should('include', '/galaxies');
    cy.get('table').should('exist');
    cy.get('table > thead').should('exist');
    cy.get('table > tbody').should('exist');
  });
});
