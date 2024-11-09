before(() => {
  cy.defaultLogin();
});

describe('settings for workflows', () => {
  it('can enable an disable workflows', () => {
    cy.visit('/admin/workflowSettings');
    cy.contains('Execution of workflows is allowed:')
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
  });
});
