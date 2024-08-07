import { v4 as uuidv4 } from 'uuid';

beforeEach(() => {
  cy.defaultLogin();
});

describe('tags', () => {
  describe('create', () => {
    it('should save correctly', () => {
      const name = `test tag ${uuidv4()}`;
      cy.visit('/tags');
      cy.wait(1000);
      cy.toggleMode();
      cy.get('#actionBar > :contains("Create Tag")').click();
      cy.get('input[name="name"]').type(name);
      cy.get('select[name="org_id"]').select('1');
      cy.get(':has(> input[name="hide_tag"])').click();
      cy.get(':has(> input[name="local_only"])').click();
      cy.get('button[type="submit"]').click(); // save

      cy.toggleMode();
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

const filter = (text: string) => `div:has(> Button:contains("${text}")) > :last-child`;

describe('Tags with Filters', () => {
  it('should be able to open the filter', () => {
    cy.visit('/tags');
    cy.get(filter('Filter')).click();
    cy.get('h1:contains("Add Filter")').should('exist');
  });

  it('should be able to use the filter', () => {
    cy.visit('/tags');
    cy.get(filter('Filter')).click();
    cy.get('select:contains("Hidden")').select('Hidden');
    const addFilter = cy.get('div:contains("Add Filter")');
    addFilter.get('button:contains("Add")').click();
    const filterSet = cy
      .get('div:has(> h1:contains("Current Filter")) > :last-child')
      .children()
      .first();
    filterSet.should('exist');
    filterSet.children().first().contains('hidden');
    cy.get('div:has(> span:contains("false")) > :last-child').first().should('exist').click();
    cy.get('div:has(> h1:contains("Current Filter")) > :last-child')
      .children()
      .should('have.length', 0);
  });
});
