before(() => {
  cy.defaultLogin();
});

describe('settings for workflows', () => {
  it('can enable an disable workflows', () => {
    cy.visit('/admin/workflowSettings');
    cy.contains('checkbox').should('be.visible');
    cy.get('checkbox').click();
  });
});
