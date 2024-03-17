beforeEach(() => {
  cy.defaultLogin();
});

describe('Remote Server', () => {
  it('should be able to navigate to the "new server" page', () => {
    cy.visit('/admin/servers');
    cy.toggleMode();

    cy.get('a:contains("Add Server")').should('exist').click();

    cy.url().should('include', '/admin/servers/new');
  });

  it('should be able to add a new server', () => {
    cy.visit('/admin/servers/new');

    // This data will not do anything. It's just a placeholder.
    cy.get('input[name="url"]').type('https://test.com');
    cy.get('input[name="name"]').type('Testing instance');
    cy.get('input[name="remote_org_id"]').type('1');
    cy.get('input[name="authkey"]').type('Vee0ohl0ahQuoop0tahdeiphaichaghooc0oof2a'); // Not any real key. Just a random string with length 40.
    cy.get('button:contains("Save")').should('exist').click();
    cy.url().should('match', /\/admin\/servers\/\d+/);
    cy.toggleMode();

    cy.get('div:contains("Testing instance")').should('exist');
    cy.get('div:contains("https://test.com")').should('exist');
  });

  it('should be able to add able to delete a server', () => {
    cy.visit('/admin/servers');
    cy.toggleMode();
    cy.get('tbody').find('tr').last().click();
    cy.get('button:contains("Delete Server")').click();
  });
});
