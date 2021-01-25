export const addGameButton = () => cy.get(`[e2e='add-game']`);
export const nameControl = () =>
  cy.get(`[data-placeholder='Enter name']`);
export const locationControl = () =>
  cy.get(`[data-placeholder='Enter location'`);
export const dateControl = () =>
  cy.get(`[data-placeholder='Enter game date'`);
export const submitGameButton = () =>
  cy.get(`[e2e='submit-new-game']`);
export const gameDetailsName = () =>
  cy.get(`[e2e='game-details-name']`);
export const playersInGame = () => cy.get(`[e2e='game-player']`);
export const shotsInGame = () => cy.get(`[e2e='game-shot']`);
export const cardsInGame = () => cy.get(`[e2e='game-card']`);
export const addGamePlayerButton = () => cy.get(`[e2e='add-player']`);
export const playerSelection = () => cy.get('select');
export const submitGamePlayer = () =>
  cy.get(`[e2e='submit-game-player']`);
export const playerList = () => cy.get('bsc-player-list');
export const addShotButton = () => cy.get(`[e2e='add-shot']`);
export const shotTakerControl = () =>
  cy.get(`[e2e='shot-taker-control']`);
export const assistControl = () => cy.get(`[e2e='assist-control']`);
export const minuteControl = () => cy.get(`[e2e='minute-control']`);
export const scoredControl = () => cy.get(`input[type='checkbox']`);
export const submitShot = () => cy.get(`[e2e='submit-new-shot']`);
export const shotComponent = () => cy.get('bsc-shot-list');
export const addCardButton = () => cy.get(`[e2e='add-card']`);
export const playerControl = () =>
  cy.get(`[e2e='card-player-control']`);
export const typeControl = () => cy.get(`[e2e='card-type-control']`);
export const cardList = () => cy.get('bsc-card-list');

export const addGame = (name: string) => {
  addGameButton().click();
  nameControl().type(name);
  locationControl().type('St. Louis');
  dateControl().type('1/1/2025');
  submitGameButton().click();
};

export const selectGame = (name: string) => cy.contains(name).click();

export const createPlayerOnServer = (name: string) =>
  cy.request('POST', 'localhost:8085/soccer/players', {
    name
  });

export const createGameOnServer = (name: string) =>
  cy.request('POST', 'localhost:8085/soccer/games', {
    name,
    date: '2025-01-01',
    location: 'St. Louis',
    players: []
  });

export const deleteCurrentGame = () =>
  cy.get(`[e2e='delete-game']`).click();

export const addPlayerToCurrentGame = (name: string) => {
  addGamePlayerButton().click();
  cy.get('option', { timeout: 10000 }).should('exist');
  cy.get('select').select(name);
  submitGamePlayer().click();
};

export const addPlayersToGameOnServer = (
  game: any,
  ...players: string[]
) => {
  cy.request('PUT', `localhost:8085/soccer/games/${game.id}`, {
    ...game,
    players
  });
};

export const addPlayersToGameUsingApp = (
  gameName: string,
  ...players: string[]
) => {
  cy.visit(`/games/`);
  selectGame(gameName);
  players.forEach(player => {
    addPlayerToCurrentGame(player);
    cy.contains('[e2e="game-player"]', player);
  });
};

export const addShotToGame = (
  taker: string,
  assist: string,
  time: string,
  scored: boolean
) => {
  addShotButton().click();
  shotTakerControl().select(taker);
  assistControl().select(assist, { timeout: 10000 });
  minuteControl().type(`{selectAll}${time}`);
  scored
    ? scoredControl().check({force: true})
    : scoredControl().uncheck({ force: true });
  submitShot().click();
};

export const addCardToGame = (
  name: string,
  type: 'red' | 'yellow'
) => {
  addCardButton().click();
  playerControl().select(name);
  typeControl().select(type);
  cy.get(`[e2e='submit-new-card']`).click();
};

// Beware: Dragons, dragons everywhere
export const removeE2EGames = () => {
  cy.visit('/games');
  cy.get('[e2e="game-list-item"]').should('be.visible');
  cy.get('body').then($body => {
    if ($body.text().includes('e2e-')) {
      cy.get('[e2e="game-list-item"]:contains(e2e-)')
        .each(game => {
          cy.contains(game.text()).click();
          deleteCurrentGame();
        })
        .then(() => {
          cy.contains('e2e-').should('not.exist');
        });
    }
  });
};
