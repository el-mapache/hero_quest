Crafty.c('Sleep', {
  init: function() {
    // Type of spell.
    this.school = 'Water';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Sleep';

    this.id = "Sleep";

    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';

    this.effectType = 'elemental';
    this.description = 'This spell may be cast on any one monster. The target immediately falls into a deep sleep. This effect may be broken immediately or on a future turn if the monster rolls a saving throw of 6. The target rolls one die for each of it\s mind points.  Undead may not be targeted with this spell.';
  },

  cast: function(target) {
    if (!target.getAttribute('monster') || target.getAttribute('type') === 'undead') {
      Crafty.console.writeLine('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }

    this.used = true;

    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name') + '.');

    // Attempt to cancel
    if (this.trySavingThrow(target)) return true;

    Crafty.console.writeLine('system', target.getAttribute('name') + ' has fallen asleep.');

    // Look up the player who controls this unit for future save attempts.
    var owner = Crafty(target.getAttribute('owner')),
        target = target;

    // lock the target.
    target._locked = true;

    owner.bind('BeforeTurn', TL.bind(this.cancelEffect, this, owner, target));

    return true;
  },

  trySavingThrow: function(target) {
    // See if the target can resist the spell immediately.
    var itr = target.stats.get('mind');
    var savingThrow = (Math.random() * 6 + 1 | 0);

    while (itr-- > 0) {
      // the spell was resisted, return.
      if (savingThrow === 6) {
        Crafty.console.writeLine('system', target.getAttribute('name') + ' has successfully resisted your spell!');
        return true;
      }
    }

    Crafty.console.writeLine('system', target.getAttribute('name') + ' has failed to resist the spell.');
  },

  cancelEffect: function(owner, target) {
    // Check at the beginning of each turn if the target is able to resist the spell.
    if (this.trySavingThrow(target)) {
      owner.unbind('BeforeTurn', this.cancelEffect);
    }
  }
});
