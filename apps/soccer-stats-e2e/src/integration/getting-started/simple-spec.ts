describe('The soccer stats app landing page', () => {
  it('should display a proper heading', () => {
    cy.visit('/');
    cy.get('h1').contains('Soccer Stats');
  });
});

describe('The soccer stats app player page ', () => {
  it('should allow player creation', () => {
    cy.visit('/players');
    cy.get(`[e2e='add-player']`).click();
    cy.get('input').type('Player One');
    cy.get(`[e2e='submit-new-player']`).click();
    cy.get(`[e2e='player-list-item']`).should(
      'contain',
      'Player One'
    );
  });

  it('should display player details', () => {
    cy.visit(`/players`);

    cy.contains('Player One').click();
    cy.get(`[e2e='player-details-name']`).should(
      'contain',
      'Player One'
    );
    cy.get('bsc-player-detail').should('exist');
  });

  it('should allow player name modification', () => {
    cy.visit('/players');
    cy.contains('Player One').click();
    cy.get(`[e2e='player-details-name']`).click();
    cy.get('input').click().type(`{selectAll}moddedName`).blur();
    cy.get(`[e2e='player-list-item']`).should(
      'contain',
      'moddedName'
    );
  });

  it('should allow player deletion', () => {
    cy.visit('/players');
    cy.contains('moddedName').click();
    cy.get(`[e2e='delete-player']`).click();
    cy.get(`[e2e='player-list-item']`).should(
      'not.contain',
      'moddedName'
    );
  });
});
