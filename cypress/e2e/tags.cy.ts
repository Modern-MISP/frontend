beforeEach(() => {
  cy.defaultLogin();
});

describe('tags', () => {
  it('should be creatable', () => {
    const name = `test tag ${crypto.randomUUID()}`;
    cy.visit('/tags');
    cy.toggleMode();
    cy.get('#actionBar > :contains("Create Tag")').click();
    cy.get('input[name="name"]').type(name);
    cy.get('select[name="org_id"]').select('1');
    cy.get(':has(> input[name="hide_tag"])').click();
    cy.get(':has(> input[name="local_only"])').click();
    cy.get('button[type="submit"]').click(); // save

    cy.toggleMode();

    cy.get('[slot="filter"] input').type(name); // search tag
    cy.get('tbody tr:first').click();

    const check = (label, text) => {
      cy.get(`main main div:has(> span:first:contains(${label})) > :last-child`).should(
        'contain.text',
        text
      );
    };
    check('Name', name);
    check('Exportable', 'No');
    check('Hidden', 'Yes');
    check('Local only', 'Yes');
    check('Restricted to Org', 'Yes');
    check('Restricted to User', 'No');
  });
});
