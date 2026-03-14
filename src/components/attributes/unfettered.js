Crafty.c('Unfettered', {
  init: function() {

  },

  passThroughWalls: function(x, y) {
    if (HeroQuest.Board.at(x,y).type === "door") return true;
    if (HeroQuest.Board.at(x,y).type === "wall") return true;

    return HeroQuest.Board.map[x] != null && HeroQuest.Board.map[x][y] != null && !HeroQuest.Board.occupied(x,y);
  }
});