/*
 * DICE
 * Defines ranomized multi-sided polygonal playing interfaces.
**/


/*
 * Standard hero quest combat die used by monsters and heroes alike
 * This die is also used to determine the outcome of many actions,
 * like disarming traps, saving throws, etc.
**/

Crafty.c('CombatDie', {
  _faces: ['skull', 'shield', 'skull', 'skull', 'shield', 'blackShield'],

  init: function() {
    this._sides = this._faces.length;
  },

  roll: function(action) {
    var i = 0, rolls = [];

    // TODO: Make this a map
    for(i; i < action; i++) {
      var roll = this._faces[(Math.random() * this._sides) | 0];
      rolls.push(roll);
    }

    return rolls;
  }
});

/*
 * Six sided die.  Used primarily for movement, but also occoasianlly for saving throws.
**/

Crafty.c('Die', {
  _sides: 6,
  init: function() {
    this.bind('RemoveComponent', function() {
			this.unbind('RemoveComponent');
    });
  },

  roll: function() {
    // The result of a single 'roll'
    var outcome = Math.floor(Math.random() * this._sides + 1);

    // Tell the parent component a roll has finished.
    this.trigger('moveRoll', { value: outcome });
  },
});

Crafty.c('MovementDie', {
  _sides: 6,
  init: function() {
    this.bind('RemoveComponent', function() {
			this.unbind('RemoveComponent');
    });
  },

  roll: function() {
    // Check if the unit is an NPC. If they are, return their set number of moves.
    if (this.has('NPC')) {
      return this.trigger('moveRoll', {
        value: this.stats.get('moves')
      });
    }

    // Otherwise we have a player character, so roll as many dice as they have defined.
    var outcome = 0;

    for (var i = 0; i < +this.stats.get('moves'); i++) {
      outcome += Math.floor(Math.random() * this._sides + 1);
    }

    // Tell the parent component a roll has finished.
    this.trigger('moveRoll', { value: outcome });
  }
});
