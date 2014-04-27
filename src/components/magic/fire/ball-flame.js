Crafty.c('BallOfFlame', {
  init: function() {
    // Type of spell.
    this.school = 'Fire';

    // Has the spell been cast already?
    this.used = false;

    this.name = 'Ball Of Flame';

    this.id = "BallOfFlame";
    // Type indicates targeted or area spell.
    this.type = 'target';
    this.restriction = false;
    // Duration indicates if the spell effect is persistant or not.
    this.duration = 'instant';
    this.effectType = 'elemental';
    this.description = 'This spell may be cast on any one monster, enveloping them in a ball of searing flames that deal 2 body points in damage. The monster rolls two dice, and may reduce the damage by 1 for each 5 or 6 rolled.';
  },

  cast: function(target) {
    if (!target.getAttribute('monster')) {
      Crafty.console.log('system', target.getAttribute('name') + ' cannot be targeted by ' + this.name);
      return false;
    }

    this.used = true;

    var saves = 2,
        damage = 0;

    // The target rolled a six and thus saved.
    // Maybe move this into the character?
    while (saves-- > 0) {
      if ((Math.random() * 6 + 1 | 0) === 6) {
        continue;
      }

      target.trigger('TakeDamage', -1);
      damage += 1;
    }


    Crafty.console.writeLine('system', this.name + ' cast upon ' + target.getAttribute('name') + ', who suffered ' + damage + ' body points of damage.');

    return true;
  },
});
