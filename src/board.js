/*
 * BOARD
 *
 * Simple game board class.
 * Board sizes are read only.
 *
 * The generate method creates an in memory representation of each square on the
 * game board; each slot is toggled between true and false depending on whether or
 * not the square is currently occupied.
 *
**/

/*
 * y = ind/cols
 * x = ind%cols
 * transition to one dimensional array
**/

Crafty.c('Board', {
  // The in-memory representation of the map. An array of objects.
  map: [],
  fogMap: {},

  init: function() {
    //this.requires('HTML');
    this.attr({z: 100, h: 430, w: 576});
    // this.css({
    //   "box-shadow": "black -3px 0px 44px",
    //   "margin": "0 auto"
    // });
  },

  outOfBounds: function(x, y) {
    if (x > HeroQuest.CONSTANTS.BOARD_WIDTH - 1 || x < 0 ||
        y > HeroQuest.CONSTANTS.BOARD_HEIGHT - 1 || y < 0) {
      return true;
    }

    return false;
  },

  generate: function() {
    window.Board = this;
    var width = HeroQuest.CONSTANTS.BOARD_WIDTH;
    var height = HeroQuest.CONSTANTS.BOARD_HEIGHT;

    this.map = new Array(width);

    for(var x = 0; x < width; x++) {
      // At each x position, create a second array spanning the height of the board
      this.map[x] = new Array(height);
      for(var y = 0; y < height; y++) {
        this.map[x][y] = {
          pointer: null,
          occupied: false,
          floorPntr: null
        }
      }
    }

    return this;
  },

  occupy: function(x, y, entityId) {
    this.map[x][y].occupied = true;
    this.map[x][y].pointer = entityId;
  },

  unoccupy: function(x, y) {
    this.map[x][y].occupied = false;
    this.map[x][y].pointer = null;
  },

  occupied: function(x, y) {
    if (this.outOfBounds(x, y)) return;
    return this.map[x][y].occupied;
  },

  at: function(x, y) {
    if (this.outOfBounds(x, y)) return null;
    return Crafty(this.map[x][y].pointer);
  },

  loadLevel: function(levelComponent) {
    this.level = levelComponent;
    var layers = levelComponent.layers;
    var zone = layers[3];
    delete layers[3];

    for (var layer in layers) {
      // The current layer we are rendering.
      var l = layers[layer];

      for (var y = 0; y < l.length; y++) {
        for (var x = 0; x < l[y].length; x++) {
          var space = l[y][x];

          if (space !== 0 && space.indexOf('*') !== -1) {
            // We are making a special subclass of a standard character,
            // like a boss. These are defined in the level files.
            tile = levelComponent.subclass(space, {x: x, y: y}, zone[y][x]);
          } else {
            // loop through every tile and make an entity.
            tile = TileDictionary.generateTile(l[y][x], {x: x, y: y}, zone[y][x]);
          }

          // this.fogMap[x+','+y] = Crafty.e('Color, Grid, 2D, Canvas')
          //                             .attr({h: 16, w: 16, z: 0})
          //                             .at(x,y)
          //                             .color('black');

          if (tile && tile.has('Unit')) Board._addToUnit(tile);

          if (tile && !tile.has('Solid')) Board.map[x][y].floorPntr = tile[0];
        }
      }
    }
  },

  _addToUnit: function(tile) {
    // Board triggers a register event.
    tile.bind('Destroy', Board.onUnitRemove);
    this.trigger('RegisterUnit', tile);
  },

  onUnitRemove: function(unit) {
    Board.trigger('Destroy', unit);
  }
});
