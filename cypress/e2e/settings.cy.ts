before(() => {
  cy.defaultLogin();
});
describe('settings check', () => {
  it('can change the theme', () => {
    cy.visit('/settings');
    cy.get('select').select('frappe');
    cy.get('select').select('macchiato');
    cy.get('select').select('frappe');
    cy.get('select').select('latte');
    cy.get('select').select('latte lighter');
    cy.get('select').select('latte bright');
  });
});
