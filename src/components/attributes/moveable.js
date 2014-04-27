Crafty.c('Moveable', {
  init: function() {},

  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },

  stopMovement: function() {
    this._speed = 0;
    this.stop();

    if(this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
});
