Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:8085/soccer/reset');
});

Cypress.Commands.add('resetDBWithExec', () => {
  cy.exec('npm run reset-sport-db');
});
