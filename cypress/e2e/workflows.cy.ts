beforeEach(() => {
  cy.defaultLogin();
});

describe('workflows', () => {
  it('can add module', () => {
    cy.visit('/workflows/1');
    cy.get('.svelte-flow__node:contains("Attach warninglist")').should('not.exist');
    cy.toggleMode();
    cy.get('#actionBar > button:contains("Save")').should('be.disabled');
    const card = cy.get(
      'main .flex-col .flex-row > [draggable=true]:contains("Attach warninglist")'
    );
    card.drag('.svelte-flow__pane');
    cy.get('#actionBar > button:contains("Save")').should('not.be.disabled');
    // internal data of workflow has been modified successfully

    cy.get('.svelte-flow__node:contains("Attach warninglist")').should('exist');
  });
});
