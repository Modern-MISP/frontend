beforeEach(() => {
  cy.defaultLogin();
});

describe('eventgraphs', () => {
  it('should add new attribute from Event-Graph', () => {
    const now = Date.now();
    const eventId = 34;
    const distribution = {
      id: '3', // all communities
      name: 'All communities'
    };
    const attribute = {
      value: 'test value @ ' + now,
      comment: 'test @ ' + now,
      distribution: distribution,
      category: 'Antivirus detection',
      type: 'comment'
    };

    cy.visit('events/' + eventId + '/graph');
    cy.toggleMode(); // enter edit mode

    cy.get('label:contains("Add attribute")').should('exist').click();

    cy.get('input[name="value"]').type(attribute.value);
    cy.get('input[name="comment"]').type(attribute.comment);
    cy.get('select[name="distribution"]').select(attribute.distribution.id);
    cy.get('select[name="category"]').select(attribute.category);
    cy.get('select[name="type"]').select(attribute.type);
    cy.get('button:contains(Save)').click();

    cy.wait(2000); // wait enough time to save

    cy.url().should('include', '/attributes/');

    cy.toggleMode(); // enter view mode

    const check = (field: string, value: string, elementType: string) =>
      cy
        .get(`form div:has(> span:first-child:contains("${field}")) ${elementType}:last`)
        .should('have.text', value);

    check('Event', eventId.toString(), 'a');
    check('Category', attribute.category, 'span');
    check('Type', attribute.type, 'span');
    check('Value', attribute.value, 'div');
    check('Comment', attribute.comment, 'span');
    check('Distribution', attribute.distribution.name, 'span');
  });

  it('should drag and drop unreferenced attribute and add new reference to an Event-Graph', () => {
    const eventId = 34;

    const reference = {
      type: 'causes'
    };

    const object = {
      name: 'object',
      abbreviation: 'o',
      id: '92'
    };

    cy.visit('events/' + eventId + '/graph');
    cy.toggleMode(); // enter edit mode

    cy.get('button:contains("Unreferenced Attributes")').click(); // open

    const card = cy.get('.attribute-node:first'); // select first unreference attribute

    card.drag('.svelte-flow__pane'); // drop in graph

    cy.get('button:contains("Unreferenced Attributes")').click(); // close

    cy.get(
      'div:has(> span:first-child:contains("Reference Type for new references")) select'
    ).select(reference.type); // select reference type

    const sourceHandle = cy.get(`div[id="${object.name}-${object.id}"] .svelte-flow__handle-right`); // object's right handle
    const destinationHandleSelector = 'div[data-id^="unreferenced"] .svelte-flow__handle-left'; // unreferenced attribute's left handle
    sourceHandle.drag(destinationHandleSelector); // connect both nodes

    cy.reload();

    cy.get(
      `.svelte-flow__edge[aria-label^="Edge from ${object.abbreviation}-${object.id} to"]`
    ).should('exist');
  });
});
