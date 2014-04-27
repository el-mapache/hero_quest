/* GRID COMPONENT
 *
 * Define our grid in terms of the size of the game's map.
 *
 * @method {#at} Given an x and y point on the board, places the object there,
 * offsetting by the height and width or each tile. If no arguments are provided,
 * it returns the current position of the entity occupying the space.
 * An optional boolean flag can be passed to record the entitie's position in
 * a global map that the board can reference.
**/


Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: HeroQuest.CONSTANTS.TILE_SIZE,
      h: HeroQuest.CONSTANTS.TILE_SIZE
    });
  },

  /* @param occupy: Boolean value indicating if the place entity should 'occupy' the tile */
  at: function(x, y, occupy) {
    if(typeof x === "undefined" && typeof y === "undefined") {
      return {
        x: parseInt((this.x / this.w), 10),
        y: parseInt((this.y / this.h), 10)
      };
    }

    this.attr({
      x: x * HeroQuest.CONSTANTS.TILE_SIZE,
      y: y * HeroQuest.CONSTANTS.TILE_SIZE
    });

    if (occupy) {
      Board.occupy(x, y, this[0]);
    }

    return this;
  },

  /*
   * Unregister an entity from a position on the board.
   *
   * @param {x} Integer x coordinante of the component.
   * @param {y} Integer y coordinate of the component.
   *
   * @return undefined
  **/
  vacate: function(x, y) {
    Board.unoccupy(x, y);
  }
});
