beforeEach(() => {
  cy.defaultLogin();
});

describe('Freetext import tool', () => {
  it('should return as many attributes as were entered', () => {
    cy.visit('/events/1/attributes');

    cy.url().should('include', 'attributes');

    cy.toggleMode();

    cy.get('#freetext-import').should('not.exist');

    cy.get('button:contains(Freetext Import Tool)').should('exist').click();

    cy.get('#freetext-import').should('exist');

    cy.get('textarea')
      .focus()
      .type('https://test.url{enter}3961eae797dbb7ff909385fc739be743{enter}file.type');

    cy.get('button:contains(Submit)').click();

    cy.get('#freetext-import tbody').children().should('have.length', 3);

    cy.get('button:contains(Close Freetext Import Tool)').click();

    cy.get('#freetext-import').should('not.exist');
  });
});
