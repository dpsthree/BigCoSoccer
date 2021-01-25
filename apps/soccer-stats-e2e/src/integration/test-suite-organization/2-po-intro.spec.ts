const playerSelection = () => cy.get('select');

const pageHeader = () => cy.get('h1');
const addPlayerButton = () => cy.get(`[e2e='add-player']`);
const playerNameControl = () => cy.get(`[e2e='player-name-control']`);
const playerDetailsName = () => cy.get(`[e2e='player-details-name']`);
const nameChangeControl = () => cy.get(`[e2e='name-change-control']`);
const submitPlayer = () => cy.get(`[e2e='submit-new-player']`);
const players = () => cy.get(`[e2e='player-list-item']`);
const playerComponent = () => cy.get('bsc-player-detail');
const deletePlayer = () => cy.get(`[e2e='delete-player']`);

const addGameButton = () => cy.get(`[e2e='add-game']`);
const nameControl = () => cy.get(`[data-placeholder='Enter name']`);
const locationControl = () =>
  cy.get(`[data-placeholder='Enter location']`);
const dateControl = () =>
  cy.get(`[data-placeholder='Enter game date']`);
const submitGameButton = () => cy.get(`[e2e='submit-new-game']`);
const gameDetailsName = () => cy.get(`[e2e='game-details-name']`);
const playersInGame = () => cy.get(`[e2e='game-player']`);
const shotsInGame = () => cy.get(`[e2e='game-shot']`);
const cardsInGame = () => cy.get(`[e2e='game-card']`);
const addGamePlayerButton = () => cy.get(`[e2e='add-player']`);
const submitGamePlayer = () => cy.get(`[e2e='submit-game-player']`);
const playerList = () => cy.get('bsc-player-list');
const addShotButton = () => cy.get(`[e2e='add-shot']`);
const shotTakerControl = () => cy.get(`[e2e='shot-taker-control']`);
const assistControl = () => cy.get(`[e2e='assist-control']`);
const minuteControl = () => cy.get(`[e2e='minute-control']`);
const scoredControl = () => cy.get(`input[type='checkbox']`);
const submitShot = () => cy.get(`[e2e='submit-new-shot']`);
const shotComponent = () => cy.get('bsc-shot-list');
const addCardButton = () => cy.get(`[e2e='add-card']`);
const playerControl = () => cy.get(`[e2e='card-player-control']`);
const typeControl = () => cy.get(`[e2e='card-type-control']`);
const cardList = () => cy.get('bsc-card-list');

describe('The soccer stats app landing page', () => {
  it('should display a proper heading', () => {
    cy.visit('/');
    pageHeader().should('contain', 'Soccer Stats');
  });
});

describe('The soccer stats app player page ', () => {
  const testPlayerName = 'e2e-player';

  beforeEach(() => {
    cy.request('POST', 'http://localhost:8085/soccer/reset');
  });

  it('should allow player creation', () => {
    cy.visit('/players');
    addPlayerButton().click();
    playerNameControl().type(testPlayerName);
    submitPlayer().click();
    players().should('contain', testPlayerName);
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
      cy.visit(`/players/`);
      cy.contains(testPlayer.name).click();
      playerDetailsName().should('contain', testPlayer.name);
      playerComponent().should('exist');
    });

    it('should allow player name modification', () => {
      const newName = 'e2e-abc';

      cy.visit(`/players/${testPlayer.id}`);

      playerDetailsName().click();
      nameChangeControl()
        .click()
        .type(`{selectAll}${newName}`)
        .blur();
      players().should('contain', newName);
    });

    it('should allow player deletion', () => {
      cy.visit(`/players/${testPlayer.id}`);

      deletePlayer().click();
      players().should('not.contain', testPlayer.name);
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
    addGameButton().click();
    nameControl().type(testGameName);
    locationControl().type('St. Louis');
    dateControl().type('1/1/2025');
    submitGameButton().click();
    cy.contains(testGameName).click();
    gameDetailsName().should('contain', testGameName);
    playersInGame().should('not.exist');
    shotsInGame().should('not.exist');
    cardsInGame().should('not.exist');
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
      playersInGame().should('not.exist');
      [player1.name, player2.name].forEach(name => {
        addGamePlayerButton().click();
        cy.get('option', { timeout: 10000 }).should('exist');
        playerSelection().select(name);
        submitGamePlayer().click();
        playerList().should('contain', name);
      });
      playersInGame().should('have.length', 2);
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

          shotsInGame().should('not.exist');

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
            addShotButton().click();
            shotTakerControl().select(shot.taker);
            assistControl().select(shot.assist);
            minuteControl().type(`{selectAll}${shot.time}`);
            shot.scored
              ? scoredControl().check({ force: true })
              : scoredControl().uncheck({ force: true });
            submitShot().click();
            shotComponent().should('contain', shot.time);
          });

          shotsInGame().should('have.length', 2);
        });
      });

      describe('card management', () => {
        it('should let users add cards to the game', () => {
          cy.visit(`/games/${game.id}`);
          cardsInGame().should('not.exist');
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
            addCardButton().click();
            playerControl().select(card.name);
            typeControl().select(card.type);
            cy.get(`[e2e='submit-new-card']`).click();
            cardList().should('contain', card.name);
          });

          cardsInGame().should('have.length', 2);
        });
      });
    });
  });
});
