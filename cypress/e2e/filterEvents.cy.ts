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
    cy.get('tbody').find('tr').should('have.length', 50);

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
      cy.get('[id=pill]:contains("value")').should('exist');
      cy.get('[id=pill]:contains("value")').find('button').click();
      cy.get('[id=pill]:contains("value")').should('not.exist');
    });

    cy.get('tbody').find('tr').should('have.length', 50);
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
        cy.get('label').click();
        cy.get("button:contains('Add')").click();
        cy.get("[id='pill']").should('have.length', 2);
      });
    });
  });
});

function addValueFilter() {
  cy.get('tbody').find('tr').first().find('a').first().should('have.text', '1');

  const filterToggle = cy.get('button:contains("Filter")');
  filterToggle.should('not.have.class', 'text-sky');
  filterToggle.click();
  filterToggle.should('have.class', 'text-sky');

  cy.get("input[placeholder='Value']").type('test');

  cy.get("button:contains('Add')").click();

  filterToggle.click();

  cy.get('tbody').find('tr').should('have.length', 3);
}
