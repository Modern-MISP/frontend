beforeEach(() => {
  cy.defaultLogin();
});

describe('Export button in Galaxies', () => {
  it('should be able to navigate to the Galaxies page and find Export botton', () => {
    cy.visit('/galaxies/');
    cy.toggleMode();
    cy.get('button:contains("Export")').should('exist');
  });
});
