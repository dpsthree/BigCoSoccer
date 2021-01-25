const routes = [
  {
    method: 'GET',
    url: 'http://localhost:8085/soccer/players',
    response: {
      statusCode: 200,
      fixture: 'initial-players.json',
      delay: 500
    },

    alias: 'players'
  },
  {
    method: 'POST',
    url: 'http://localhost:8085/soccer/players',
    response: {
      statusCode: 200,
      body: { id: 'StubID', name: 'Stub Name' }
    },

    alias: 'addPlayer'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/players/abcdef`,
    response: {
      statusCode: 200,
      fixture: 'joe-blake.json'
    },

    alias: 'joeBlack'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/players/gfdsdf`,
    response: {
      statusCode: 200,
      fixture: 'john-wolf.json'
    },

    alias: 'johnWolf'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/players/ltzspyA`,
    response: {
      statusCode: 200,
      fixture: 'jack-balbes.json'
    },

    alias: 'jackBalbes'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/players/qeoVMhY`,
    response: {
      statusCode: 200,
      fixture: 'bill-nye.json'
    },

    alias: 'billNye'
  },
  {
    method: 'PUT',
    url: `http://localhost:8085/soccer/players/**`,
    response: {
      statusCode: 200,
      body: {}
    },

    alias: 'playerUpdate'
  },
  {
    method: 'DELETE',
    url: `http://localhost:8085/soccer/players/**`,
    response: {
      statusCode: 200,
      body: {}
    },

    alias: 'playerDeleted'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/games`,
    response: {
      statusCode: 200,
      fixture: 'games.json'
    },

    alias: 'games'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/games/**`,
    response: {
      statusCode: 200,
      fixture: 'game-details.json'
    },

    alias: 'gameDetails'
  },
  {
    method: 'PUT',
    url: `http://localhost:8085/soccer/games/**`,
    response: {
      statusCode: 200,
      body: {}
    },

    alias: 'editGame'
  },
  {
    method: 'POST',
    url: `http://localhost:8085/soccer/games`,
    response: {
      statusCode: 200,
      body: {}
    },

    alias: 'addGame'
  },
  {
    method: 'DELETE',
    url: `http://localhost:8085/soccer/games/**`,
    response: {
      statusCode: 200,
      body: {}
    },

    alias: 'deleteGame'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/shotsongoal?player=**`,
    response: {
      statusCode: 200,
      body: []
    },

    alias: 'shotsForPlayer'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/shotsongoal?game=**`,
    response: {
      statusCode: 200,
      body: []
    },

    alias: 'shotsForGame'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/shotsongoal?assist=**`,
    response: {
      statusCode: 200,
      body: []
    },

    alias: 'assistsForPlayer'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/cards?player=**`,
    response: {
      statusCode: 200,
      body: []
    },

    alias: 'cardsForPlayer'
  },
  {
    method: 'GET',
    url: `http://localhost:8085/soccer/cards?game=**`,
    response: {
      statusCode: 200,
      body: []
    },

    alias: 'cardsForGame'
  },
  {
    method: 'POST',
    url: `http://localhost:8085/soccer/cards`,
    response: {
      statusCode: 200,
      body: {}
    },

    alias: 'addCard'
  }
];

export function establishMocks() {
  // cy.server({ force404: true });

  routes.forEach(routeDetails => {
    cy.intercept(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      routeDetails.method as any,
      routeDetails.url,
      routeDetails.response
    ).as(routeDetails.alias);
  });
}
