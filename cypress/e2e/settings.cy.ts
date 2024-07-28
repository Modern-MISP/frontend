beforeEach(() => {
  cy.defaultLogin();
});

describe('Settings Page Tests', () => {
  beforeEach(() => {
    cy.visit('/settings');
  });

  it('should open the Information page when Information is clicked and display user information', () => {
    cy.contains('Information').click();

    cy.url().should('include', '/settings/information');
    cy.contains('User Information');
    cy.contains(
      'Detailed information about your user account. Only the name can be changed by you. For other changes, please contact your administrator.'
    );

    cy.contains('Name');
    cy.contains('Role');
    cy.contains('Organisation');
    cy.contains('Created');
    cy.contains('Last Login');

    cy.get('button:contains(Cancel)').click();
    cy.url().should('include', '/settings');
  });

  it('should open the Visual Settings page when Visual Settings is clicked and display visual settings', () => {
    cy.contains('Visual Settings').click();

    cy.url().should('include', '/settings/visual');
    cy.contains('Visual Settings');
    cy.contains('Change your personal design settings here.');

    cy.contains('Change your personal design settings here.');
    cy.contains('Menu is open per default');
    cy.contains('Theme');
    cy.get('select').select('Mocha');
    cy.get('select').select('Macchiato');
    cy.get('select').select('Frappe');
    cy.get('select').select('Latte');
    cy.get('select').select('Brighter Latte');
    cy.get('select').select('Brightest Latte');

    cy.contains('Menu is open per default')
      .parent()
      .find('input[type="checkbox"]')
      .uncheck({ force: true });
    cy.contains('Save').click();
    cy.reload();
    cy.contains('Menu is open per default')
      .parent()
      .find('input[type="checkbox"]')
      .should('not.be.checked');

    cy.contains('Menu is open per default')
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
    cy.contains('Save').click();
    cy.reload();
    cy.contains('Menu is open per default')
      .parent()
      .find('input[type="checkbox"]')
      .should('be.checked');

    cy.get('button:contains(Cancel)').click();
    cy.url().should('include', '/settings');
  });

  it('should open the Security Settings page when Security Settings is clicked and display security settings', () => {
    cy.contains('Security Settings').click();

    cy.url().should('include', '/settings/security');
    cy.contains('ID');
    cy.contains('Key');
    cy.contains('Comment');
    cy.contains('Expiration');
    cy.contains('Last used');
    cy.contains('Last seen Ip');
    cy.contains('Ip count');
    cy.contains('Email');

    cy.get('button:contains(Cancel)').click();
    cy.url().should('include', '/settings');
  });

  it('should add a new auth key and delete it afterward', () => {
    cy.contains('Security Settings').click();

    cy.url().should('include', '/settings/security');
    cy.contains('ID');
    cy.contains('Key');
    cy.contains('Comment');
    cy.contains('Expiration');
    cy.contains('Last used');
    cy.contains('Last seen Ip');
    cy.contains('Ip count');
    cy.contains('Email');

    cy.contains('Add Key').click();

    cy.get('input[name="comment"]').type('cypress_test');
    cy.contains('Save').click();
    cy.contains('I have noted down my key').click();
    cy.contains('cypress_test').should('exist');
    cy.contains('cypress_test').click();
    cy.contains('Delete').click();
    cy.contains('cypress_test').should('not.exist');

    cy.get('button:contains(Cancel)').click();
    cy.url().should('include', '/settings');
  });
});
