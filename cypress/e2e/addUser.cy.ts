beforeEach(() => {
  cy.defaultLogin();
});

describe('User tests', () => {
  it('should be able to navigate to the "new user" page', () => {
    cy.visit('/admin/users');
    cy.toggleMode();

    cy.get('a:contains("Add User")').should('exist').click();

    cy.url().should('include', '/admin/users/new');
  });

  it('should be able to add a new user', () => {
    cy.visit('/admin/users/new');

    cy.get('input[name="email"]').type('test@test.com');
    // Toggle disabled
    cy.get('span:contains("Is disabled")').parent().find('label').click();
    cy.get('button:contains("Save")').should('exist').click();
    cy.url().should('match', /\/admin\/users\/\d+/);
    cy.toggleMode();

    cy.get('div:contains("test@test.com")').should('exist');
    cy.get('span:contains("Is disabled")')
      .parent()
      .within(() => {
        cy.get("span:contains('Yes')").should('exist');
      });
  });

  it('should be able to add able to delete the created user', () => {
    cy.visit('/admin/users');
    cy.toggleMode();
    cy.get('tbody').find('tr').last().click();
    cy.get('button:contains("Delete User")').click();
  });
});
