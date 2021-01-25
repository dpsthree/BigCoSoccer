declare namespace Cypress {
  interface Chainable {
    resetDB(): Chainable<Response>;
    resetDBWithExec(): Chainable<Exec>;
  }
}
