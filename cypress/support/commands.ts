/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// Cypress.Commands.add("login", () => {
//     cy.window().invoke("localStorage").set
// })
// -- This is a parent command --
Cypress.Commands.add('login', (token: string) => {
  cy.session(token, () => {
    cy.visit('/login');
    cy.get('input[name="token"]').type(token);
    cy.get('button').click();
    cy.wait(100);
    cy.url().should('include', '/event');
  });
});

Cypress.Commands.add('defaultLogin', () => {
  cy.login(Cypress.env('adminToken'));
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
