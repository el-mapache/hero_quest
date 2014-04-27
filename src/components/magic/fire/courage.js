Crafty.c('Courage', {
  init: function() {
    // Type of spell.
    this.school = 'Fire';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Courage';

    this.id = "Courage";
    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';
    this.effectType = 'elemental';
    this.description = 'This spell may be cast on any one hero, embuing them with bravery and enhancing their combat skills. They may roll 2 extra attack dice as long an enemy unit lies within their line of sight.'
  },

  cast: function(target) {
    if (target.getAttribute('monster')) {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }

    target.stats.addModifier(this.id, this.modifier());

    target.bind('AfterMove', TL.bind(this.shouldCancelEffect, target, this.id));
    target.bind('AfterAttack', TL.bind(this.shouldCancelEffect, target, this.id));

    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name'));

    return true;
  },

  shouldCancelEffect: function(modifierId) {
    var self = this,
        nothingInLOS = false;

    HeroQuest.radius(this.at(), 8, function(x,y) {
      // Ignore units and yourself when doing LOS checks.
      if (x +','+y === self.reportPosition() || Board.at(x,y).has('Unit')) {
        return false;
      }

      return Board.occupied(x, y);
    }, function(x, y, intensity) {
      // There is an enemy somewhere in the unit's LOS, so stop the check.
      if (Board.at(x, y).has('NPC')) {
        nothingInLOS = false;
        return true;
      } else {
        // A unit hasnt yet been found in this unit's LOS, so set flag and
        // continue to look for units.
        nothingInLOS = true;
      }
    });

    // No enemy remains within LOS, cancel effect.
    if (nothingInLOS) {
      self.stats.removeModifier(modifierId);
      self.unbind('AfterMove', self.shouldCancelEffect);
      self.unbind('AfterAttack', self.shouldCancelEffect);
    }
  },

  modifier: function() {
    return {
      add: {
        'attack': 2
      }
    };
  }
});
