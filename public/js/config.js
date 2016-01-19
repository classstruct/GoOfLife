define([], function() {
  return {
    // render settings
    deadCellColor: '#ffffff',
    defaultAccentColor: '#000000',
    cellSize: 3,
    cellSpacing: 1,
    tickBarHeight: 5,

    // grid settings
    gridWidth: 300,
    gridHeight: 300,

    M:25,
    T:2000,
    boardWidth: 5,
    boardHeight: 10,

    // game settings
    generationDuration: 2000,
    giveCellsEvery: 1, // generations
    timeBetweenUpdates: 10000,

    // player settings
    cellsPerPlayer: 1000,
    lastSeenTimeout: 180000,

    // chat settings
    chatLogLength: 175,
    chatMessageLength: 140
  };
});