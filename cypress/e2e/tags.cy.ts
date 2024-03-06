beforeEach(() => {
  cy.defaultLogin();
});

describe('tags', () => {
  it('should be creatable', () => {
    cy.visit('/tags');
    cy.toggleMode();
    cy.get('#actionBar > :contains("Create Tag")').click();
    cy.get('input[name="name"]').type('test tag');
    cy.get('select[name="org_id"]').select('1');
    cy.get(':has(> input[name="hide_tag"])').click();
    cy.get(':has(> input[name="local_only"])').click();
    cy.get('button[type="submit"]').click(); // save

    // TODO: check if created
  });
});
