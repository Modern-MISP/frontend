beforeEach(() => {
  cy.defaultLogin();
});

//TODO add if for legacy mode
describe('Workermanagement tests', () => {
  if (!Cypress.env('legacy')) {
    it('should be reachable via side menu', () => {
      //cy.visit('/events');
      //cy.get('button:has(span:contains("Admin"))').click();
      //cy.wait(100);
      //cy.get('aside > nav').find('a[href="/admin/workermanagement"]').click();
      //cy.wait(3000); // this page is slow to load
      //cy.url().should('include', '/admin/workermanagement');
      //cy.get('table').should('exist');
      //cy.get('table > thead').should('exist');
      //cy.get('table > tbody').should('exist');
    });
    it('reachable from url', () => {
      //cy.visit('/admin/workermanagement');

      //cy.wait(3000); // this page is slow to load

      //cy.url().should('include', '/admin/workermanagement');
      //cy.get('table').should('exist');
      //cy.get('table > thead').should('exist');
      //cy.get('table > tbody').should('exist');
    });
    it('test single worker view to logs', () => {
      //cy.visit('/admin/workermanagement');

      // click on entry in list or open url directly
      //cy.get('table tbody tr:first').click();
      //cy.wait(300);
      // check if rerout to logs is working
      //cy.get('button:has(span:contains("Show Logs"))').click();

      //cy.wait(500);

      //cy.url().should('include', '/logs');
    });
    it('test pause unpause of workers', () => {
      //cy.visit('/admin/workermanagement');

      //cy.wait(3000); // this page is slow to load

      //cy.toggleMode();

      //cy.wait(100); // wait for toggle

      //select first worker
      //cy.get('table tbody tr:first').click();
      //cy.wait(300);

      //cy.get('button:has(span:contains("Pause Workers"))').click();

      //cy.wait(1000); // this page is slow to load

      //cy.get(cardRowRight('Queues')).should('be.empty');

      //cy.get('button:has(span:contains("Unpause Workers"))').click();

      //cy.wait(1000); // this page is slow to load

      //cy.get(cardRowRight('Queues')).should('not.be.empty');
    });
  }
});
