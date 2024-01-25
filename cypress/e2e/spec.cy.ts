describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1920, 1080);

    cy.visit('localhost:4173/settings');
    // I know it's not recommended to just wait an arbitrary time,
    // but this is the only way I found for the page to fully render before doing stuff
    cy.wait(100);
    cy.screenshot('settings', { overwrite: true });
    // cy.get('body > div > div:first').screenshot('settings', { overwrite: true });

    cy.visit('localhost:4173/event/list');
    cy.wait(100);
    cy.screenshot('event-list', { overwrite: true });
    // cy.get('body > div > div:first').screenshot('event-list', { overwrite: true });
  });
});
