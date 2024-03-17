/**
 * Most of the component test should be done inside of addTagToEvent.cy.ts. It basically uses the same components and the same logic.
 * As result we can just test the basic functionality and expect the rest to be tested inside of addTagToEvent.cy.ts
 *
 */
describe('add tag to event', () => {
  beforeEach(() => {
    cy.defaultLogin();
    cy.visit('/events/2/galaxies');
    cy.toggleMode();
  });

  it('should be able to select cluster and save them', () => {
    cy.get('div:contains("Galaxies") > button').last().click();
    cy.get('h1:contains("Add Galaxy Cluster")').parent().as('addGalaxyDialog');

    const firstCluster = 'Aguila';
    cy.get('@addGalaxyDialog').within(() => {
      cy.get('select').eq(1).select('2');
      cy.get("input[placeholder='Cluster']").as('clusterInput');
      cy.get('@clusterInput').type(firstCluster);
      cy.get('@clusterInput').type('{enter}');
      cy.get(`[id=pill]:contains("${firstCluster}")`).should('have.length', 1);
    });
    cy.get('h3:contains("Those elements will be added:")')
      .parent()
      .within(() => {
        cy.get('[id=pill]').should('have.length', 1);
        cy.get(`#pill:contains("${firstCluster}")`).should('exist');
        cy.get('button').click();
      });
  });

  it('should be able to delete cluster', () => {
    cy.get('h1:contains("Galaxies")')
      .parent()
      .within(() => {
        // Mark the cluster to deletion
        cy.get('#pill button').first().click();

        // Delete it
        cy.get('h3:contains("Those elements will be deleted:")')
          .parent()
          .within(() => {
            cy.get('button').last().click();
          });
        cy.get('#pill').should('not.exist');
      });
  });
});
