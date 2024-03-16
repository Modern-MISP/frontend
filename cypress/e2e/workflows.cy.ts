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

  it('can add connection', () => {
    cy.visit('/workflows/1');
    cy.toggleMode();
    cy.get('#actionBar > button:contains("Save")').should('be.disabled');
    const sourceHandle = cy.get('.svelte-flow__node-trigger .svelte-flow__handle');
    sourceHandle.drag('.svelte-flow__node:contains("Webhook") .svelte-flow__handle-left');
    cy.get('#actionBar > button:contains("Save")').should('not.be.disabled');
    cy.get('.svelte-flow__edge[data-id="xy-edge__1output_1-3input_1"]').should('exist');
  });
});
