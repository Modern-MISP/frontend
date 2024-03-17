import { v4 as uuidv4 } from 'uuid';

beforeEach(() => {
  cy.defaultLogin();
});

describe('tags', () => {
  describe('create', () => {
    it('should save correctly', () => {
      const name = `test tag ${uuidv4()}`;
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

      cy.url().should('match', /\/tags\/\d+/);

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

    it('should be closable via action bar', () => {
      cy.visit('/tags');
      cy.toggleMode();
      cy.get('form').should('not.exist');
      cy.get('#actionBar > :contains("Create Tag")').click();
      cy.get('form').should('exist');
      cy.get('#actionBar > :contains("Close Create Tag")').click();
      cy.get('form').should('not.exist');
    });

    it('should be closable via cancel button', () => {
      cy.visit('/tags');
      cy.toggleMode();
      cy.get('form').should('not.exist');
      cy.get('#actionBar > :contains("Create Tag")').click();
      cy.get('form').should('exist');
      cy.get('form button:contains("Cancel")').click();
      cy.get('form').should('not.exist');
    });
  });
});
