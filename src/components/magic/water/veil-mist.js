Crafty.c('VeilOfMist', {
  init: function() {
    // Type of spell.
    this.school = 'Water';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Veil Of Mist';

    this.id = "VeilOfMist";

    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';

    this.effectType = 'elemental';
    this.description = 'This spell may be cast on any one hero. When cast, the hero becomes enveloped in a thick swirling vapor, allowing them to pass through squares occupied by monsters.';
  },

  cast: function(target) {
    if (target.getAttribute('monster')) {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }

    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name') + '.');

    target.passThroughWalls = function(x, y) {
      if (Board.at(x,y).type === "door") return true;
      if (Board.at(x,y).type === "wall") return true;
      return Board.map[x] != null && Board.map[x][y] != null && !Board.occupied(x,y);
    };

    target.bind('AfterMove', TL.bind(this.cancelEffect, this, target));

    this.used = true;

    return true;
  },

  cancelEffect: function(target) {
    delete Crafty(target.getAttribute('name')).passThroughWalls;
    target.unbind('AfterMove', this.cancelEffect);
  }
});
