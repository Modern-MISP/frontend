beforeEach(() => {
  cy.defaultLogin();
  cy.visit('/events/');
  cy.get('tbody').children().first().click();
  cy.get('a:contains("Event Attributes")').click();
});
if (Cypress.env('skip') == false) {
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
});

describe('Freetext import tool', () => {
  it('should return as many attributes as were entered', () => {

    cy.toggleMode();

    cy.get('button:contains(Freetext Import Tool)').should('exist').click();

    cy.get('#freetext-import').should('exist');

    cy.get('textarea')
      .focus()
      .type('https://test.url{enter}3961eae797dbb7ff909385fc739be743{enter}file.type');

    cy.intercept('GET', '/users/**').as('getAttributes');

    cy.get('button:contains(Submit)').click();

    /*cy.wait('@getAttributes').then(interception => {
      expect(interception.response.statusCode).to.eq(200);
    });*/

    cy.wait(1000);

    cy.get('span:contains(Freetext Import)').should('exist');

    cy.get('tr:contains("https://test.url")').should('exist', { timeout: 10000 });
    cy.get('tr:contains("3961eae797dbb7ff909385fc739be743")').should('exist');
    cy.get('tr:contains("file.type")').should('exist');

    cy.get('button:contains(Close Freetext Import Tool)').click();

    cy.get('#freetext-import').should('not.exist');
  });
});
