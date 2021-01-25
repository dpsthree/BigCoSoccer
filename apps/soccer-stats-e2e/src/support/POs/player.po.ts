export const addPlayerButton = () => cy.get(`[e2e='add-player']`);
export const playerDetailsName = () =>
  cy.get(`[e2e='player-details-name']`);
export const playerNameControl = () =>
  cy.get(`[e2e='player-name-control']`);
export const submitPlayer = () => cy.get(`[e2e='submit-new-player']`);
export const players = () => cy.get(`[e2e='player-list-item']`);
export const nameChangeControl = () =>
  cy.get(`[e2e='name-change-control']`);

export const playerComponent = () => cy.get('bsc-player-detail');
export const deletePlayerButton = () =>
  cy.get(`[e2e='delete-player']`);

export const addPlayer = (name: string) => {
  addPlayerButton().click();
  playerNameControl().type(name);
  submitPlayer().click();
  playerNameControl().should('not.be.exist');
};

export const showPlayer = (name: string) => cy.contains(name).click();

export const updateName = (name: string) => {
  playerDetailsName().click();
  nameChangeControl().click().type(`{selectAll}${name}`).blur();
};

// Beware: Dragons, dragons everywhere
export function removeE2EPlayers() {
  cy.visit('/players');
  // Verify that the DOM is in a
  // stable enough state to proceed.
  // The conditional checking code inside
  // does not have retry/wait capabilities
  players().should('be.visible');
  // Start from the body to give ourselves the wide scope
  // possible to find what we need
  cy.get('body').then($body => {
    // Body contains all text
    // So check to see if any e2e artifacts
    // are present before attempting to remove them
    if ($body.text().includes('e2e-')) {
      // In order to operate on all of them we need
      // to use "get" instead of "contains".
      // The following shows how to select an
      // an item containing text with just css
      cy.get('[e2e="player-list-item"]:contains(e2e-)')
        .each(player => {
          // Since we will be deleting each element
          // we need to make sure to requery for them
          // otherwise the each will lose its place
          cy.contains(player.text()).click();
          deletePlayerButton().click();
        })
        .then(() => {
          // Verify that all players are deleted
          // This needs to happen inside of the then
          // associated with the each to be sure that
          // we don't attempt to check this in the
          // middle of the async delete process
          cy.contains('e2e-').should('not.exist');
        });
    }
  });
}
