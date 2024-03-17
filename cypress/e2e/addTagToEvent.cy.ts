describe('add tag to event', () => {
  beforeEach(() => {
    cy.defaultLogin();
    cy.visit('/events/2');
    cy.toggleMode();
  });
  it('should be able to select tags from the picker and they should show on the right side', () => {
    cy.get('div:contains("Tags") > button').click();
    cy.get('h1:contains("Add Tags")').parent().as('addTagDialog');

    cy.get('@addTagDialog').within(() => {
      cy.get("input[placeholder='Tags']").as('tagsInput');

      const firstTag = 'white';
      cy.get('@tagsInput').type(firstTag);
      cy.get(`[id=pill]:contains("${firstTag}")`).should('have.length', 2);

      cy.get('@tagsInput').type('{enter}');

      const secondTagPrefix = 'Fl';
      cy.get('@tagsInput').type(secondTagPrefix);

      cy.get(`[id=pill]:contains("${secondTagPrefix}")`).should('have.length', 6);

      cy.get(`[id=pill]:contains("FruitFly")`).click();

      cy.get('[id=pill]').should('have.length', 2);
    });
    cy.get('h3:contains("Those elements will be added:")')
      .parent()
      .within(() => {
        cy.get('[id=pill]').should('have.length', 2);
        cy.get('#pill:contains("white")').should('exist');
        cy.get('#pill:contains("FruitFly")').should('exist');
      });
  });

  it('should be able to save tags', () => {
    cy.get('div:contains("Tags") > button').click();
    cy.get('h1:contains("Add Tags")').parent().as('addTagDialog');

    cy.get('h1:contains("Tags")')
      .eq(1)
      .parent()
      .find('[id=pill]')
      .its('length')
      .then((initialLength) => {
        cy.get('@addTagDialog').within(() => {
          cy.get("input[placeholder='Tags']").as('tagsInput');

          const firstTag = 'green';
          cy.get('@tagsInput').type(firstTag);

          cy.get(`[id=pill]:contains("${firstTag}")`).should('have.length', 1);
          cy.get('@tagsInput').type('{enter}');
          const secondTagPrefix = 'Fl';
          cy.get('@tagsInput').type(secondTagPrefix);
          cy.get(`[id=pill]:contains("${secondTagPrefix}")`).should('have.length', 6);
          cy.get(`[id=pill]:contains("FruitFly")`).click();

          cy.get('[id=pill]').should('have.length', 2);
        });
        cy.get('h3:contains("Those elements will be added:")')
          .parent()
          .within(() => {
            cy.get('[id=pill]').should('have.length', 2);
            cy.get('button').click();
          });
        cy.get('h1:contains("Tags")')
          .eq(1)
          .parent()
          .within(() => {
            cy.get('[id=pill]').should('have.length', initialLength + 2);
          });
      });
  });
  it('should be able to delete tags', () => {
    cy.get('h1:contains("Tags")')
      .eq(1)
      .parent()
      .find('[id=pill]')
      .its('length')
      .then((initialLength) => {
        cy.get('h1:contains("Tags")')
          .parent()
          .within(() => {
            // Delete both tags
            cy.get('#pill button').first().click();
            cy.get('#pill button').first().click();
            // Restore one tag
            cy.get('h3:contains("Those elements will be deleted:")')
              .parent()
              .within(() => {
                cy.get('[id=pill]').should('have.length', 2);
                cy.get('#pill button').first().click();
                cy.get('[id=pill]').should('have.length', 1);
                // cy.get('button').click();
              });

            // Remove it again
            cy.get('#pill button').first().click();

            // Finally delete them
            cy.get('h3:contains("Those elements will be deleted:")')
              .parent()
              .within(() => {
                cy.get('button').last().click();
              });

            cy.get('[id=pill]').should('have.length', initialLength);
          });
      });
  });
});
