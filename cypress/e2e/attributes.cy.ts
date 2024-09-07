beforeEach(() => {
  cy.defaultLogin();
});

describe('filter attributes', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/attributes/restSearch').as('attributes_rest_search');
    cy.visit('/attributes');
    cy.wait(['@events_index', '@events_index', '@users_view_me', '@users_view_me']);
    cy.wait('@attributes_rest_search');
  });

  it('filter page should open', () => {
    cy.url().should('include', '/attributes');
    cy.get('button:contains("Filter")').should('exist').click();
    cy.get('h1:contains("Add Filter")').should('exist');
  });

  it('can add filter', () => {
    cy.get('button:contains("Filter")').click();

    cy.get('select').first().select('Type');
    cy.get('select').last().select('domain');

    cy.get('button:contains("Add")').click();
    cy.get('button:contains("Filter")').click();

    if (Cypress.env('legacy')) {
      cy.get('body').then(($body) => {
        if ($body.find('tbody').length > 0 && !$body.find('tbody').hasClass('bg-black')) {
          cy.get('tbody')
            .find('tr')
            .each(($el) => {
              if (!$el.hasClass('bg-blue')) {
                cy.wrap($el)
                  .invoke('text')
                  .should('match', /(^$|^.*domain.*$)/);
              }
            });
        }
      });
    }
  });
});
