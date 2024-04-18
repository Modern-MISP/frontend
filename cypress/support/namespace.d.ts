declare namespace Cypress {
  interface Chainable {
    login(token: string): Chainable<void>;
    defaultLogin(): Chainable<void>;
    toggleMode(): Chainable<void>;
  }
}
