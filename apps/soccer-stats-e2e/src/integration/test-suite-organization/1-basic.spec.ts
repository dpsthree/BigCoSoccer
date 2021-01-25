describe('The soccer stats app landing page', () => {
  it('should display a proper heading', () => {
    cy.visit('/');
    cy.get('h1').contains('Soccer Stats');
  });
});

// Each top-level describe would typically go in its own spec file
describe('The soccer stats app player page ', () => {
  const testPlayerName = `e2e-player`;

  beforeEach(() => {
    cy.request('POST', 'http://localhost:8085/soccer/reset');
  });

  it('should allow player creation', () => {
    cy.visit('/players');
    cy.get(`[e2e='add-player']`).click();
    cy.get('input').type(testPlayerName);
    cy.get(`[e2e='submit-new-player']`).click();
    cy.get(`[e2e='player-list-item']`).should(
      'contain',
      testPlayerName
    );
  });

  describe('editing capabilities', () => {
    let testPlayer: any;
    beforeEach(() => {
      cy.request('POST', 'localhost:8085/soccer/players', {
        name: testPlayerName
      }).then(res => {
        testPlayer = res.body;
      });
    });

    it('should display player details', () => {
      cy.visit(`/players`);

      cy.contains(testPlayer.name).click();
      cy.get(`[e2e='player-details-name']`).should(
        'contain',
        testPlayer.name
      );
      cy.get('bsc-player-detail').should('exist');
    });

    it('should allow player name modification', () => {
      const newName = 'e2e-abc';

      cy.visit(`/players/${testPlayer.id}`);

      cy.get(`[e2e='player-details-name']`).click();
      cy.get('input').click().type(`{selectAll}${newName}`).blur();
      cy.get(`[e2e='player-list-item']`).should('contain', newName);
    });

    it('should allow player deletion', () => {
      cy.visit(`/players/${testPlayer.id}`);

      cy.get(`[e2e='delete-player']`).click();
      cy.get(`[e2e='player-list-item']`).should(
        'not.contain',
        testPlayer.name
      );
    });
  });
});

describe('The soccer stats app game management page', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:8085/soccer/reset');
  });

  it('should start with no players, shots, or cards on new games', () => {
    const testGameName = 'e2e-test-game';
    cy.visit(`/games`);
    cy.get(`[e2e='add-game']`).click();
    cy.get(`[data-placeholder='Enter name']`).type(testGameName);
    cy.get(`[data-placeholder='Enter location']`).type('St. Louis');
    cy.get(`[data-placeholder='Enter game date']`).type('1/1/2025');
    cy.get(`[e2e='submit-new-game']`).click();
    cy.contains(testGameName).click();
    cy.get(`[e2e='game-details-name']`).should(
      'contain',
      testGameName
    );
    cy.get(`[e2e='game-player']`).should('not.exist');
    cy.get(`[e2e='game-shot']`).should('not.exist');
    cy.get(`[e2e='game-card']`).should('not.exist');
    cy.reload();
    cy.contains(testGameName).should('exist');
  });

  describe('player and game management', () => {
    let game: any;
    let player1: any;
    let player2: any;
    const testGameName = `e2e-game`;

    beforeEach(() => {
      cy.request('POST', 'localhost:8085/soccer/players', {
        name: `e2e-player-1`
      }).then(res => {
        player1 = res.body;
      });
      cy.request('POST', 'localhost:8085/soccer/players', {
        name: `e2e-player-2`
      }).then(res => (player2 = res.body));

      cy.request('POST', 'localhost:8085/soccer/games', {
        name: testGameName,
        date: '2025-01-01',
        location: 'St. Louis',
        players: []
      }).then(res => (game = res.body));
    });

    it('should allow game deletion', () => {
      cy.visit(`/games/${game.id}`);
      cy.get(`[e2e='delete-game']`).click();
      cy.contains(testGameName).should('not.exist');
    });

    it('should let users add a player to a game', () => {
      cy.visit(`/games/${game.id}`);
      cy.get(`[e2e='game-player']`).should('not.exist');
      [player1.name, player2.name].forEach(name => {
        cy.get(`[e2e='add-player']`).click();
        cy.get('option', { timeout: 10000 }).should('exist');
        cy.get('select').select(name);
        cy.get(`[e2e='submit-game-player']`).click();
        cy.get('bsc-player-list').should('contain', name);
      });
      cy.get(`[e2e='game-player']`).should('have.length', 2);
    });

    describe('stat management', () => {
      beforeEach(() => {
        cy.request('PUT', `localhost:8085/soccer/games/${game.id}`, {
          ...game,
          players: [player1.id, player2.id]
        });
      });

      describe('shot management', () => {
        it('should let users add shots to the game', () => {
          cy.visit(`/games/${game.id}`);

          cy.get(`[e2e='game-shot']`).should('not.exist');

          [
            {
              taker: player1.name,
              assist: player2.name,
              time: '12',
              scored: true
            },
            {
              taker: player2.name,
              assist: player1.name,
              time: '13',
              scored: false
            }
          ].forEach(shot => {
            cy.get(`[e2e='add-shot']`).click();
            cy.get(`[e2e='shot-taker-control']`).select(shot.taker);
            cy.get(`[e2e='assist-control']`).select(shot.assist);
            cy.get(`[e2e='minute-control']`).type(
              `{selectAll}${shot.time}`
            );
            shot.scored
              ? cy.get(`input[type='checkbox']`).check({ force: true })
              : cy
                  .get(`input[type='checkbox']`)
                  .uncheck({ force: true });
            cy.get(`[e2e='submit-new-shot']`).click();
            cy.get('bsc-shot-list').should('contain', shot.time);
          });

          cy.get(`[e2e='game-shot']`).should('have.length', 2);
        });
      });

      describe('card management', () => {
        it('should let users add cards to the game', () => {
          cy.visit(`/games/${game.id}`);
          cy.get(`[e2e='game-card']`).should('not.exist');
          [
            {
              name: player1.name,
              type: 'red'
            },
            {
              name: player2.name,
              type: 'yellow'
            }
          ].forEach(card => {
            cy.get(`[e2e='add-card']`).click();
            cy.get(`[e2e='card-player-control']`).select(card.name);
            cy.get(`[e2e='card-type-control']`).select(card.type);
            cy.get(`[e2e='submit-new-card']`).click();
            cy.get('bsc-card-list').should('contain', card.name);
          });

          cy.get(`[e2e='game-card']`).should('have.length', 2);
        });
      });
    });
  });
});
