beforeEach(() => {
    cy.defaultLogin();
  });

  describe('Admin Tests', () => {
    it('should be able to navigate to the auth key page', () => {
        cy.visit('/admin/keys');

        cy.url().should('include', '/admin/keys');
    });
});
