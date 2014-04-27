Crafty.c('Unfettered', {
  init: function() {

  },

  passThroughWalls: function(x, y) {
    if (Board.at(x,y).type === "door") return true;
    if (Board.at(x,y).type === "wall") return true;

    return Board.map[x] != null && Board.map[x][y] != null && !Board.occupied(x,y);
  }
});