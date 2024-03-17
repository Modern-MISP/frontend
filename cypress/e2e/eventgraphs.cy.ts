before(() => {
  cy.defaultLogin();
});

describe('eventgraphs', () => {
  it('should add new attribute from Event-Graph', () => {
    const now = Date.now();
    let eventId = 34;
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
});
