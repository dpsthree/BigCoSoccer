import { pageHeader } from '../../support/POs/app.po';
import {
  addGame,
  addPlayerToCurrentGame,
  cardsInGame,
  createGameOnServer,
  createPlayerOnServer,
  deleteCurrentGame,
  gameDetailsName,
  playerList,
  playersInGame,
  selectGame,
  shotsInGame
} from '../../support/POs/game-2.po';
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
  const testPlayerName = 'e2e-player';

  beforeEach(() => {
    cy.resetDBWithExec();
  });

  it('should allow player creation', () => {
    cy.visit('/players');
    addPlayer(testPlayerName);
    players().should('contain', testPlayerName);
  });

  describe('editing capabilities', () => {
    beforeEach(() => {
      cy.exec('node src/support/db-scripts/set-testing-player.js', {
        env: { PLAYER: testPlayerName }
      });
    });

    it('should display player details', () => {
      cy.visit(`/players/`);
      showPlayer(testPlayerName);
      playerDetailsName().should('contain', testPlayerName);
      playerComponent().should('exist');
    });

    it('should allow player name modification', () => {
      const newName = 'e2e-abc';

      cy.visit('/players');
      showPlayer(testPlayerName);

      updateName(newName);
      players().should('contain', newName);
    });

    it('should allow player deletion', () => {
      cy.visit('/players');
      showPlayer(testPlayerName);

      deletePlayerButton().click();
      players().should('not.contain', testPlayerName);
    });
  });
});

describe('The soccer stats app game management page', () => {
  beforeEach(() => {
    cy.resetDBWithExec();
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
    const testGameName = 'e2e-game';
    const playerOneName = 'e2e-player-1';
    const playerTwoName = 'e2e-player-2';

    beforeEach(() => {
      createPlayerOnServer(playerOneName);
      createPlayerOnServer(playerTwoName);
      createGameOnServer(testGameName);
    });

    it('should allow game deletion', () => {
      cy.visit(`/games`);
      selectGame(testGameName);
      deleteCurrentGame();
      cy.contains(testGameName).should('not.exist');
    });

    it('should let users add a player to a game', () => {
      cy.visit(`/games`);
      selectGame(testGameName);
      playersInGame().should('not.exist');
      addPlayerToCurrentGame(playerOneName);
      playerList().should('contain', playerOneName);
      addPlayerToCurrentGame(playerTwoName);
      playerList().should('contain', playerTwoName);
      playersInGame().should('have.length', 2);
    });

    // Restoring the following becomes more trouble
    // than they are worth with this particular setup
    // describe('stat management', () => {
    //   beforeEach(function () {
    //     addPlayersToGameOnServer(
    //       this.game,
    //       this.player1.id,
    //       this.player2.id
    //     );
    //   });

    //   describe('shot management', () => {
    //     it('should let users add shots to the game', function () {
    //       const shot1Time = '12';
    //       const shot2Time = '13';

    //       cy.visit(`/games/${this.game.id}`);

    //       shotsInGame().should('not.exist');
    //       addShotToGame(
    //         this.player1.name,
    //         this.player2.name,
    //         shot1Time,
    //         true
    //       );
    //       shotComponent().should('contain', shot1Time);
    //       addShotToGame(
    //         this.player2.name,
    //         this.player1.name,
    //         shot2Time,
    //         false
    //       );
    //       shotComponent().should('contain', shot2Time);

    //       shotsInGame().should('have.length', 2);
    //     });
    //   });

    //   describe('card management', () => {
    //     it('should let users add cards to the game', function () {
    //       cy.visit(`/games/${this.game.id}`);
    //       const card1Type = 'red';
    //       const card2Type = 'yellow';

    //       cardsInGame().should('not.exist');

    //       addCardToGame(this.player1.name, card1Type);
    //       cardList().should('contain', this.player1.name);

    //       addCardToGame(this.player2.name, card2Type);
    //       cardList().should('contain', this.player2.name);

    //       cardsInGame().should('have.length', 2);
    //     });
    //   });
    // });
  });
});
