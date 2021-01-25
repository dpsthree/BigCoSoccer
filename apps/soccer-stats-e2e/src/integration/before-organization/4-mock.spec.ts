import { establishMocks } from '../../support/mocks/app-mocks';
import { pageHeader } from '../../support/POs/app.po';
import {
  addCardToGame,
  addGame,
  addPlayerToCurrentGame,
  addShotToGame,
  deleteCurrentGame,
  shotsInGame
} from '../../support/POs/game.po';
import {
  addPlayer,
  deletePlayerButton,
  playerComponent,
  playerDetailsName,
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
    establishMocks();
  });

  it('should allow player creation', () => {
    cy.visit('/players');
    addPlayer(testPlayerName);
    // verify that the request was well formed and sent
    cy.wait('@addPlayer');
    cy.wait('@players');
    // can't verify UI response because data didn't persist
  });

  describe('editing capabilities', () => {
    const playerIdForEditing = 'qeoVMhY';

    it('should display player details', () => {
      cy.visit(`/players/${playerIdForEditing}`);
      playerDetailsName().should('contain', 'Bill Nye');
      playerComponent().should('exist');
    });

    it('should allow player name modification', () => {
      cy.visit(`/players/${playerIdForEditing}`);
      updateName('e2e-abc');
      cy.wait('@playerUpdate');
      cy.wait('@players');
      // Cant verify peristance
    });

    it('should allow player deletion', () => {
      cy.visit(`/players/${playerIdForEditing}`);
      deletePlayerButton().click();
      cy.wait('@playerDeleted');
      cy.wait('@players');
      // again, no persistance checking
    });
  });
});

describe('The soccer stats app game management page', () => {
  beforeEach(() => {
    establishMocks();
  });

  it('should start with no players, shots, or cards on new games', () => {
    const testGameName = 'e2e-test-game';
    cy.visit(`/games`);
    addGame(testGameName);
    cy.wait('@addGame');
    cy.wait('@games');
    // Can't select the new game because it wasn't persisted
    // selectGame(testGameName);
    // gameDetailsName().should('contain', testGameName);
    // playersInGame().should('not.exist');
    // shotsInGame().should('not.exist');
    // cardsInGame().should('not.exist');
    // cy.reload();
    // cy.contains(testGameName).should('exist');
  });

  describe('player and game management', () => {
    const testGameId = 'asdnasdas';

    it('should allow game deletion', () => {
      cy.visit(`/games/${testGameId}`);
      deleteCurrentGame();
      cy.wait('@deleteGame');
      cy.wait('@games');
    });

    it('should let users add a player to a game', () => {
      cy.visit(`/games/${testGameId}`);
      addPlayerToCurrentGame('Kyle Cordes');
      cy.wait('@editGame');
      cy.wait('@players');
    });

    describe('shot management', () => {
      it('should let users add shots to the game', () => {
        cy.visit(`/games/${testGameId}`);

        shotsInGame().should('not.exist');
        addShotToGame('Jack Balbes', 'Joe Blake', '12', true);
      });
    });

    describe('card management', () => {
      it('should let users add cards to the game', () => {
        cy.visit(`/games/${testGameId}`);
        addCardToGame('Jack Balbes', 'red');
        cy.wait('@addCard');
      });
    });
  });
});
