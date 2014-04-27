window.HeroQuest = window.HeroQuest || {};

(function(window) {
  var hq = window.HeroQuest.CONSTANTS = {};

  hq.TILE_SIZE = 16;
  hq.BOARD_WIDTH = 36;
  hq.BOARD_HEIGHT = 27;
  hq.BOARD_AREA = hq.BOARD_HEIGHT * hq.BOARD_WIDTH;

  hq.VIEWPORT_WIDTH = 1280;
  hq.VIEWPORT_HEIGHT = 735;

  hq.TOTAL_WIDTH = hq.BOARD_WIDTH * hq.TILE_SIZE;
  hq.TOTAL_HEIGHT = hq.BOARD_HEIGHT * hq.TILE_SIZE;

  return hq;
})(window);
