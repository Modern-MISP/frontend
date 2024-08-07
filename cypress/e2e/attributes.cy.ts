beforeEach(() => {
  cy.defaultLogin();
});

describe('filter attributes', () => {
  beforeEach(() => {
    cy.visit('/attributes');
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

    cy.get('tbody')
      .find('tr')
      .each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .should('contain', 'domain');
          });
    });
});