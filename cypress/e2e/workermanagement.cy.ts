beforeEach(() => {
  cy.defaultLogin();
});

describe('Workermanagement tests', () => {
  it('should be reachable via side menu', () => {
    if (!Cypress.env('legacy')) {
      cy.visit('/events');
      cy.get('aside > nav').find('a[href="/admin"]').click();
      cy.wait(100);
      cy.get('aside > nav').find('a[href="/admin/workerManagement"]').click();
      cy.wait(3000); // this page is slow to load
      cy.url().should('include', '/admin/workerManagement');
      cy.get('table').should('exist');
      cy.get('table > thead').should('exist');
      cy.get('table > tbody').should('exist');
      cy.get('table > tbody > tr').should('exist');
    }
  });
  it('reachable from url', () => {
    if (!Cypress.env('legacy')) {
      cy.visit('/admin/workerManagement');
      cy.wait(3000); // this page is slow to load
      cy.url().should('include', '/admin/workerManagement');
      cy.get('table').should('exist');
      cy.get('table > thead').should('exist');
      cy.get('table > tbody').should('exist');
      cy.get('table > tbody > tr').should('exist');
    }
  });
  it('test single worker view to logs link', () => {
    if (!Cypress.env('legacy')) {
      cy.visit('/admin/workerManagement');
      // click on entry in list or open url directly
      cy.get('table tbody tr:first').click();
      cy.wait(300);
      // check if rerout to logs is working
      cy.get('button:has(span:contains("Logs"))').click();
      cy.wait(500);
      cy.url().should('include', '/logs');
    }
  });
  it('test pause unpause of workers', () => {
    if (!Cypress.env('legacy')) {
      cy.visit('/admin/workerManagement');
      cy.wait(3000); // this page is slow to load
      cy.toggleMode();
      cy.wait(100); // wait for toggle
      //select first worker
      cy.get('table tbody tr:first').click();
      cy.wait(300);
      cy.get('button:has(span:contains("Pause Workers"))').click();
      cy.wait(1000); // this page is slow to load
      cy.get('table > thead').should('exist');
      cy.get('table > tbody').should('exist');

      cy.get('button:has(span:contains("Unpause Workers"))').click();
      cy.wait(1000); // this page is slow to load
      cy.get('table > thead').should('exist');
      cy.get('table > tbody').should('exist');
    }
  });
});
