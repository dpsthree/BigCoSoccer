import { pageHeader } from '../../support/POs/app.po';
import {
  addCardToGame,
  addGame,
  addPlayerToCurrentGame,
  addPlayersToGameUsingApp,
  addShotToGame,
  cardList,
  cardsInGame,
  deleteCurrentGame,
  gameDetailsName,
  playerList,
  playersInGame,
  removeE2EGames,
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
  removeE2EPlayers,
  showPlayer,
  updateName
} from '../../support/POs/player.po';

function rollbackChanges() {
  removeE2EGames();
  removeE2EPlayers();
}

describe('The soccer stats app landing page', () => {
  it('should display a proper heading', () => {
    cy.visit('/');
    pageHeader().should('contain', 'Soccer Stats');
  });
});

describe('The soccer stats app player page ', () => {
  const testPlayerName = 'e2e-player';

  beforeEach(() => {
    rollbackChanges();
  });

  describe('editing capabilities', () => {
    beforeEach(() => addPlayer(testPlayerName));

    it('should allow player name modification', () => {
      const newName = 'e2e-abc';

      cy.visit(`/players/`);
      showPlayer(testPlayerName);
      updateName(newName);
      players().should('contain', newName);
    });

    it('should allow player deletion', () => {
      cy.visit(`/players/`);
      showPlayer(testPlayerName);
      deletePlayerButton().click();
      players().should('not.contain', testPlayerName);
    });
  });
});

describe('The soccer stats app game management page', () => {
  const playerOneName = 'e2e-player-1';
  const playerTwoName = 'e2e-player-2';
  const testGameName = 'e2e-game';
  beforeEach(() => {
    rollbackChanges();
    cy.visit('/players');
    addPlayer(playerOneName);
    addPlayer(playerTwoName);
    cy.visit(`/games/`);
    addGame(testGameName);
  });

  describe('player and game management', () => {
    beforeEach(() => {
      cy.visit(`/games/`);
      selectGame(testGameName);
    });

    it('should allow game deletion', () => {
      deleteCurrentGame();
      cy.contains(testGameName).should('not.exist');
    });

    it('should let users add a player to a game', () => {
      playersInGame().should('not.exist');
      addPlayerToCurrentGame(playerOneName);
      playerList().should('contain', playerOneName);
      addPlayerToCurrentGame(playerTwoName);
      playerList().should('contain', playerTwoName);
      playersInGame().should('have.length', 2);
    });

    describe('stat management', () => {
      beforeEach(() => {
        addPlayersToGameUsingApp(
          testGameName,
          playerOneName,
          playerTwoName
        );
      });

      describe('shot management', () => {
        it('should let users add shots to the game', () => {
          const shot1Time = '12';
          const shot2Time = '13';

          shotsInGame().should('not.exist');
          addShotToGame(
            playerOneName,
            playerTwoName,
            shot1Time,
            true
          );
          shotComponent().should('contain', shot1Time);
          addShotToGame(
            playerTwoName,
            playerOneName,
            shot2Time,
            false
          );
          shotComponent().should('contain', shot2Time);

          shotsInGame().should('have.length', 2);
        });
      });

      describe('card management', () => {
        it('should let users add cards to the game', () => {
          const card1Type = 'red';
          const card2Type = 'yellow';

          cardsInGame().should('not.exist');

          addCardToGame(playerOneName, card1Type);
          cardList().should('contain', playerOneName);

          addCardToGame(playerTwoName, card2Type);
          cardList().should('contain', playerTwoName);

          cardsInGame().should('have.length', 2);
        });
      });
    });
  });
});
