Crafty.c('PassThroughWalls', {
  init: function() {
    this.school = 'Earth';
    this.used = false;
    this.name = 'Pass Through Rock';
    this.id = 'PassThroughRock';
    this.type = 'target';
    this.restriction = 'hero';
    this.duration = 'persistant';
    this.effectType = 'elemental';
    this.description = 'Casting this spell allows a hero to pass through solid rock as though it were air. The effect last only for the hero\'s next move. If the hero fails to move out of the rock before the end of their turn, they will be trapped forever.';
  },

  cast: function(target) {
    if (target.getAttribute('moster')) {
      Crafty.console.writeLine('system', 'Only heroes may be targeted by ' + this.currentSpell.name);
      return false;
    }

    var id = this.id;

    target.passThroughWalls = function(x, y) {
      if (Board.at(x,y).type === "door") return true;
      if (Board.at(x,y).type === "wall") return true;
      return Board.map[x] != null && Board.map[x][y] != null && !Board.occupied(x,y);
    };

    target.bind('AfterMove', TL.bind(this.cancelEffect, this, target));

    this.used = true;

    Crafty.console.writeLine('system', this.name + " cast upon " + target.getAttribute('name') + ".");

    return true;
  },

  cancelEffect: function(target) {
    delete Crafty(target.getAttribute('name')).passThroughWalls;
    target.unbind('AfterMove', this.cancelEffect);
  }
});
