before(() => {
  cy.defaultLogin();
});

describe('settings for workflows', () => {
  it('can enable an disable workflows', function () {
    if (Cypress.env('legacy') === true) {
      this.skip();
    }
    cy.visit('/admin/workflowSettings');
    cy.contains('Execution of workflows is allowed:')
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
  });
});
