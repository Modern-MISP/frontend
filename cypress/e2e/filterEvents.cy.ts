beforeEach(() => {
  cy.defaultLogin();
});
describe('filter Events', () => {
  beforeEach(() => {
    cy.visit('/events');
  });
  it('can add filter', () => {
    addValueFilter();
  });
  it('can add fast filter', () => {
    const filterToggle = cy.get('button:contains("My Organization")');
    filterToggle.should('not.have.class', 'text-sky');
    filterToggle.click();
    filterToggle.should('have.class', 'text-sky');
  });

  it('displays fast filter values inside of filter section and filter pill preview', () => {
    const filterToggle = cy.get('button:contains("My Organization")');
    filterToggle.click();

    cy.get('main main').within(() => {
      // Pill should be included in the filter section
      cy.get('#filterRow').within(() => {
        cy.get('[id=pill]:contains("org")').should('exist');
      });

      cy.get('button:contains("Filter")').click();
      // Pill should be included in the filter card, when filter are open
      cy.get('#filter').within(() => {
        cy.get('[id=pill]:contains("org")').should('exist');
      });
    });
  });

  it('can remove filter', () => {
    addValueFilter();

    cy.get('#filterRow').within(() => {
      cy.get('[id=pill]:contains("eventinfo")').should('exist');
      cy.get('[id=pill]:contains("eventinfo")').find('button').click();
      cy.get('[id=pill]:contains("eventinfo")').should('not.exist');
    });
  });

  it('can add more filter', () => {
    cy.get('main main').within(() => {
      const filterToggle = cy.get('button:contains("Filter")');
      filterToggle.click();

      // Add two filter and test if they are added
      cy.get('#filter').within(() => {
        cy.get("input[placeholder='Value']").type('test');
        cy.get("button:contains('Add')").click();
        cy.get('select').select('Published');
        cy.get('label:first').click();
        cy.get("button:contains('Add')").click();
        cy.get("[id='pill']").should('have.length', 2);
      });
    });
  });
});

function addValueFilter() {
  const filterToggle = cy.get('button:contains("Filter")');
  filterToggle.should('not.have.class', 'text-sky');
  filterToggle.click();
  filterToggle.should('have.class', 'text-sky');

  cy.get('select:contains("Value")').first().select('Event Information');

  cy.wait(100);

  cy.get('input').last().type('test');

  cy.get("button:contains('Add')").click();

  filterToggle.click();

  if (Cypress.env('legacy')) {
    cy.get('body').then(($body) => {
      if ($body.find('tbody').length > 0) {
        cy.get('tbody')
          .find('tr')
          .each(($el) => {
            cy.wrap($el).invoke('text').contains('test', { matchCase: false });
          });
      } else {
        // Handle the case where tbody does not exist
        cy.log('tbody does not exist');
      }
    });
  }
}
