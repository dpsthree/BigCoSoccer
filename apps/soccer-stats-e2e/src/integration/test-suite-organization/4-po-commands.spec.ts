import { pageHeader } from '../../support/POs/app.po';
import {
  addCardToGame,
  addGame,
  addPlayerToCurrentGame,
  addPlayersToGameOnServer,
  addShotToGame,
  cardList,
  cardsInGame,
  createGameOnServer,
  createPlayerOnServer,
  deleteCurrentGame,
  gameDetailsName,
  playerList,
  playersInGame,
  selectGame,
  shotComponent,
  shotsInGame
} from '../../support/POs/game.po';
import {
  addPlayer,
  deletePlayerButton,
  playerComponent,
  playerDetailsName,
  players,
  showPlayer,
  updateName
} from '../../support/POs/player.po';

describe('The soccer stats app landing page', () => {
  it('should display a proper heading', () => {
    cy.visit('/');
    pageHeader().should('contain', 'Soccer Stats');
  });
});

describe('The soccer stats app player page ', () => {
  const testPlayerName = 'e2e-game';

  beforeEach(() => {
    cy.request('POST', 'http://localhost:8085/soccer/reset');
  });

  it('should allow player creation', () => {
    cy.visit('/players');
    addPlayer(testPlayerName);
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
      showPlayer(testPlayer.name);
      playerDetailsName().should('contain', testPlayer.name);
      playerComponent().should('exist');
    });

    it('should allow player name modification', () => {
      const newName = 'e2e-abc';

      cy.visit(`/players/${testPlayer.id}`);

      updateName(newName);
      players().should('contain', newName);
    });

    it('should allow player deletion', () => {
      cy.visit(`/players/${testPlayer.id}`);

      deletePlayerButton().click();
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
    addGame(testGameName);
    selectGame(testGameName);
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
    const testGameName = 'e2e-game';

    beforeEach(() => {
      createPlayerOnServer('e2e-player-1').then(res => {
        player1 = res.body;
      });
      createPlayerOnServer('e2e-player-2').then(
        res => (player2 = res.body)
      );
      createGameOnServer(testGameName).then(res => (game = res.body));
    });

    it('should allow game deletion', () => {
      cy.visit(`/games/${game.id}`);
      deleteCurrentGame();
      cy.contains(testGameName).should('not.exist');
    });

    it('should let users add a player to a game', () => {
      cy.visit(`/games/${game.id}`);
      playersInGame().should('not.exist');
      addPlayerToCurrentGame(player1.name);
      playerList().should('contain', player1.name);
      addPlayerToCurrentGame(player2.name);
      playerList().should('contain', player2.name);
      playersInGame().should('have.length', 2);
    });

    describe('stat management', () => {
      beforeEach(() => {
        addPlayersToGameOnServer(game, player1.id, player2.id);
      });

      describe('shot management', () => {
        it('should let users add shots to the game', () => {
          const shot1Time = '12';
          const shot2Time = '13';

          cy.visit(`/games/${game.id}`);

          shotsInGame().should('not.exist');
          addShotToGame(player1.name, player2.name, shot1Time, true);
          shotComponent().should('contain', shot1Time);
          addShotToGame(player2.name, player1.name, shot2Time, false);
          shotComponent().should('contain', shot2Time);

          shotsInGame().should('have.length', 2);
        });
      });

      describe('card management', () => {
        it('should let users add cards to the game', () => {
          cy.visit(`/games/${game.id}`);
          const card1Type = 'red';
          const card2Type = 'yellow';

          cardsInGame().should('not.exist');

          addCardToGame(player1.name, card1Type);
          cardList().should('contain', player1.name);

          addCardToGame(player2.name, card2Type);
          cardList().should('contain', player2.name);

          cardsInGame().should('have.length', 2);
        });
      });
    });
  });
});
